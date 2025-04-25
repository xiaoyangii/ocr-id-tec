const { queryDB } = require('../../utils/common.js')
const client = require('../index.js')

// 批量导入 期刊 - journal表
async function bulkJournal() {
  try {
    const sql = `SELECT * FROM journal`
    const journals = await queryDB(sql, [])
    const body = journals.flatMap(journal => [
      { index: { _index: 'journal', _id: journal.journal_id } },
      {
        journal_id: journal.journal_id,
        journal_name: journal.journal_name,
        create_time: journal.create_time,
        download_nums: journal.download_nums,
        album_id: journal.album_id,
        album_name: journal.album_name,
        topic_id: journal.topic_id,
        topic_name: journal.topic_name
      }
    ])
    const res = await client.bulk({ refresh: true, body })
    if (res.errors) {
      console.log('批量导入数据错误:', res.errors)
    } else {
      console.log('成功批量导入数据')
    }
  } catch (err) {
    console.error('批量导入数据错误:', err)
  }
}

bulkJournal()