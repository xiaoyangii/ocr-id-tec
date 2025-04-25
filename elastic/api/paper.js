const client = require('../index.js')
const { queryDB } = require('../../utils/common.js')
const { search_fields } = require('../fields/paper.js')

const indexName = 'paper'

// multi_match 的type参数
// best_fields: 默认值，将所有字段的值合并在一起，然后计算相关性
// most_fields: 将所有字段的值合并在一起，但不计算相关性
// cross_fields: 将所有字段的值视为一个长字符串，计算相关性
// phrase: 将所有字段的值视为一个长字符串，计算短语匹配相关性
// phrase_prefix: 将所有字段的值视为一个长字符串，计算短语匹配相关性，支持前缀匹配
// bool_prefix: 将所有字段的值视为一个长字符串，计算布尔匹配相关性，支持前缀匹配

/**
 * 根据关键字在多字段中检索文档
 * @param {string} keywords - 检索的关键字
 * @param {string} year - 发表年份
 * @param {number} pageSize - 每次返回的数量
 * @param {string} scrollTime - 滚动上下文持续时间
 * @returns {Promise<Array>} - 包含搜索结果的 Promise
 */
async function search(keywords = '', year = '', topic_name = '', pageSize = 20, scrollId = null, scrollTime = '30m') {
  try {
    let mustQueries = []
    let shouldQueries = []
    let filterQueries = []

    if (keywords) {
      // 先按空格分割多个关键词组
      const keywordGroups = keywords.split(/\s+/)
      // console.log(keywordGroups)
      for (const group of keywordGroups) {
        const subQueries = []
        const parts = group.split(/([+|])/).filter(part => part.trim()!== '')
        let currentOperator = 'AND'
        // console.log(parts)
        for (let i = 0; i < parts.length; i++) {
          const part = parts[i]
          if (part === '+') {
            currentOperator = 'AND'
          } else if (part === '|') {
            currentOperator = 'OR'
          } else {
            const query = {
              multi_match: {
                query: part.trim(),
                fields: search_fields
              }
            }
            subQueries.push(query)
          }
        }

        if (subQueries.length > 0) {
          if (subQueries.length === 1) {
            mustQueries.push(subQueries[0])
          } else {
            const boolSubQuery = {
              bool: {}
            }
            if (currentOperator === 'AND') {
              boolSubQuery.bool.must = subQueries
            } else {
              boolSubQuery.bool.should = subQueries
              boolSubQuery.bool.minimum_should_match = 1
            }
            mustQueries.push(boolSubQuery)
          }
        }
      }
    }

    if (year) {
      filterQueries.push({
        range: {
          paper_publish_time: {
            gte: `${year}-01-01`,
            lte: `${year}-12-31`
          }
        }
      })
    }

    if (topic_name) {
      filterQueries.push({
        term: {
          "topic_name.keyword": topic_name
        }
      })
    }

    let query
    if (mustQueries.length === 0 && shouldQueries.length === 0 && filterQueries.length === 0) {
      query = {
        match_all: {}
      }
    } else {
      const boolQuery = {
        must: mustQueries,
        filter: filterQueries
      }
      if (shouldQueries.length > 0) {
        boolQuery.should = shouldQueries
        boolQuery.minimum_should_match = 1
      }
      query = {
        bool: boolQuery
      }
    }

    let searchRes
    if(scrollId) {
      searchRes = await client.scroll({
        scroll_id: scrollId,
        scroll: scrollTime
      })
    } else {
      searchRes = await client.search({
        index: indexName,
        body: {
          query,
          size: pageSize,
          highlight: {
            fields: {
              "paper_name": {},
              "paper_abstract": {},
              "paper_keywords": {},
              "journal_name": {}
            },
            pre_tags: ["<span style='background-color:#F4F92B'>"],
            post_tags: ["</span>"]
          }
        },
        scroll: scrollTime
      })
    }
    console.log(query)
    const results = searchRes.hits.hits.map(hit => {
      const source = hit._source
      if (hit.highlight) {
        Object.keys(hit.highlight).forEach(field => {
          source[field] = hit.highlight[field][0]
        })
      }
      return source
    })
    const hasMore = searchRes.hits.hits.length > 0
    // console.log(searchRes)
    // console.log(results)
    return {
      results,
      scrollId: searchRes._scroll_id,
      hasMore
    }
  } catch (error) {
    console.error('搜索文档时出错:', error)
    return {
      results: [],
      scrollId: null,
      hasMore: false
    }
  }
}

// 批量导入 论文 - paper表
async function bulkPaper() {
  try {
    const sql = `SELECT * FROM paper`
    const papers = await queryDB(sql, [])
    const body = papers.flatMap(paper => [
      { index: { _index: 'paper', _id: paper.paper_id } },
      {
        paper_id: paper.paper_id,
        paper_name: paper.paper_name,
        paper_abstract: paper.paper_abstract,
        paper_keywords: paper.paper_keywords,
        paper_author: paper.paper_author,
        paper_institution: paper.paper_institution,
        paper_publish_time: paper.paper_publish_time,
        paper_path: paper.paper_path,
        journal_id: paper.journal_id,
        journal_name: paper.journal_name,
        album_id: paper.album_id,
        album_name: paper.album_name,
        topic_id: paper.topic_id,
        topic_name: paper.topic_name
      }
    ])
    const res = await client.bulk({ refresh: true, body })
    if (res.errors) {
      console.log('批量导入数据错误:', res)
    } else {
      console.log('成功批量导入数据')
    }
  } catch (err) {
    console.error('批量导入数据错误:', err)
  }
}

// 创建索引
async function createPaperIndex() {
  try {
    const exists = await client.indices.exists({
      index: indexName
    })

    if (exists) {
      console.log('索引已经存在')
      return
    }

    const res = await client.indices.create({
      index: indexName,
      body: {
        settings: {
          analysis: {
            analyzer: {
              index_analyzer: {
                type: "ik_max_word"
              },
              search_analyzer: {
                type: "ik_smart"
              }
            }
          }
        },
        mappings: {
          properties: {
            paper_id: {
              type: 'keyword',
              index: false 
            },
            paper_name: {
              type: 'text',
              analyzer: 'index_analyzer',
              search_analyzer: 'search_analyzer'
            },
            paper_abstract: {
              type: 'text',
              analyzer: 'index_analyzer',
              search_analyzer: 'search_analyzer'
            },
            paper_keywords: {
              type: 'keyword'
            },
            paper_author: {
              type: 'keyword'
            },
            paper_institution: {
              type: 'text',
              index: false
            },
            paper_publish_time: {
              type: 'date',
              format: 'yyyy-MM-dd'
            },
            paper_path: {
              type: 'text',
              index: false
            },
            journal_id: {
              type: 'keyword',
              index: false
            },
            journal_name: {
              type: 'text',
              analyzer: 'index_analyzer',
              search_analyzer: 'search_analyzer'
            },
            album_id: {
              type: 'keyword',
              index: false
            },
            album_name: {
              type: 'text',
              index: false
            },
            topic_id: {
              type: 'keyword',
              index: false
            },
            topic_name: {
              type: 'text',
              analyzer: 'index_analyzer',
              search_analyzer: 'search_analyzer',
              fields: {
                keyword: {
                  type: 'keyword'
                }
              }
            }
          }
        }
      }
    })
    if(res.acknowledged) {
      console.log('创建索引成功', res)
    }
  } catch (error) {
    console.error('创建索引时出错:', error)
  }
}

// search("慢性肾脏病|高血压 心脏", "")
// bulkPaper()
// createPaperIndex()

module.exports = {
  search,
  bulkPaper,
  createPaperIndex
}