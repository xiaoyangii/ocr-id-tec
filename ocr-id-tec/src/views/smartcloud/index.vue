<template>
  <div class="smartcloud">
    <div class="smartcloud_left">
      <div class="left_head">
        <div class="left_head_return">
          <img src="@/assets/images/return.png" alt="" @click="$router.go(-1)">
        </div>
        <div class="left_head_title">
          <img src="@/assets/images/ku.png" alt="">
          <div class="left_head_title_text">
            文献库
          </div>
        </div>
      </div>
      <div class="left_body">
        <div class="left_body_nav">默认仓库</div>  
      </div>
    </div>
    <div class="smartcloud_right">
      <div class="right_head">
        <div class="right_head_title">文件归档</div>
        <div class="right_head_btnbox">
          <button class="btn_add">检索添加</button>
          <el-upload
            class="upload-demo"
            ref="upload"
            action="http://orcsystem.v2.idcfengye.com/Article/InsertArticle"
            :limit="1"
            :on-exceed="handleExceed"
            :http-request="uploadFile"
            accept=".pdf"
            >
            <button class="btn_upload">本地上传</button>
          </el-upload>
          <button class="btn_import">导入库</button>
        </div>
        <div class="content_boxx" v-show="hasSlected">
          <button class="content_boxx_button2" @click="cancel()">取消</button>
          <button class="content_boxx_button1" @click="deleteRecord()">还原</button>
          <div class="content_boxx_num">已选 <span>{{ total }}</span> 项</div>
        </div>
        <div class="right_head_index">文献库 > 默认仓库</div>
      </div>
      <div class="right_body">
        <div class="right_body_head">
          <div class="right_body_head_title">标题</div>
          <div class="right_body_head_time">修改时间</div>
          <div class="right_body_head_size">文件大小</div>
        </div>
        <div class="right_body_body">
          <kuCard v-for="item in fileList" :key="item.id" :item="item"></kuCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import kuCard from '@/components/kuCard.vue'
import '@/assets/style/confirm.less'
import { getRepoArticle, insertRepoArticle } from '@/api/article.js'
export default {
  name: 'smartcloud',
  components: { kuCard },
  data () {
    return {
      fileList: [
        {
          id: 1,
          title: "某医院血液科24种抗肿瘤药超说明书用药评价",
          isSlected: false,
          date: "2023/4/9 13:18",
          size: "17.2"
        },
        {
          id: 2,
          title: "新医科背景下的康复医学教育改革思考",
          isSlected: false,
          date: "2023/3/8 13:11",
          size: "17.3"
        },
        {
          id: 3,
          title: "实验动物智能化综合管理系统开发及应用",
          isSlected: false,
          date: "2023/3/2 14:15",
          size: "13.3"
        },
        {
          id: 4,
          title: "医学人文视域下医学史的学科价值和发展路径探析",
          isSlected: false,
          date: "2023/3/7 18:54",
          size: "12.3"
        },
        {
          id: 5,
          title: "医学生物化学与分子生物学实验教学的改革与实践 ",
          isSlected: false,
          date: "2023/3/8 13:55",
          size: "14.5"
        },
        {
          id: 6,
          title: "临床医学专业新发传染病防控课程设置的思考 ",
          isSlected: false,
          date: "2023/3/9 13:14",
          size: "12.2"
        },
        {
          id: 7,
          title: "SWOT视角下医学出版的数字化转型研究",
          isSlected: false,
          date: "2023/5/8 12:33",
          size: "16.2"
        },
        {
          id: 8,
          title: "基于渐进式的深度学习医学图像分割方法研究",
          isSlected: false,
          date: "2023/2/12 15:21",
          size: "16.1"
        },
        {
          id: 9,
          title: "基于元学习的医学图像分割与分类算法研究",
          isSlected: false,
          date: "2023/6/12 19:35",
          size: "10.8"
        },
        {
          id: 10,
          title: "基于聚类分析的医学图像分割综述",
          isSlected: false,
          date: "2023/3/21 16:29",
          size: "10.3"
        },
        {
          id: 11,
          title: "基于形变模型的医学图像分割综述",
          isSlected: false,
          date: "2023/4/25 17:18",
          size: "17.3"
        }
      ],
      formDate: new FormData(),
    }
  },
  computed: {
    listId() {
      let arr = []
      this.fileList.forEach((item) => {
        if(item.isSlected === true) {
          arr.push(item.id)
        }
      })
      return arr
    },
    total() {
      let count = 0;
      this.fileList.forEach((item) => {
        if(item.isSlected === true) {
          count++
        }
      });
      return count;
    },
    // 监视fileList每个对象的isSlected是否为true，如果有一个为true，hasSlected为true
    hasSlected() {
      let flag = false
      this.fileList.forEach((item) => {
        if(item.isSlected === true) {
          flag = true
          return
        }
      })
      return flag
    },
  },
  methods: {
    cancel() {
      // 取消选中的回收站记录
      this.fileList.forEach((item) => {
        item.isSlected = false
      })
    },
    deleteRecord() {
      // 利用elementUI弹出消息确认框询问是否确定删除,如果确定，清空recycleList,并发起请求，删除后台数据
      this.$confirm('此操作将永久删除选中的文章, 是否继续?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        this.fileList = this.fileList.filter((item) => {
          return item.isSlected === false
        })
        this.$message({
          message: "删除选中的文章成功",
          type: "success"
        })
        // 发起axios请求，删除所有历史记录，后台数据也要删除
        // await deleteMultiRecyclebin(localStorage.getItem('loginId'), this.listId)
        // .then(res => {
        //   console.log(res)
        //   this.$message({
        //     message: "删除选中的文章成功",
        //     type: "success"
        //   })
        //   // 删除选中的历史记录,并且重新渲染
        //   this.fileList = this.fileList.filter((item) => {
        //     return item.isSlected === false;
        //   })
        // .catch(err => {
        //   this.$message({
        //     message: "删除选中的文章失败" + err,
        //     type: "error"
        //   })
        // })
      }).catch(() => {
        this.cancel()
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    async getKuList() {
      await getRepoArticle(localStorage.getItem('loginId'))
      .then(res => {
        console.log(res)
        this.$message({
          message: "获取文献库列表成功",
          type: "success"
        })
      })
      .catch(err => {
        this.$message({
          message: "获取文献库列表失败" + err,
          type: "success"
        })
      })
    },
    handleExceed() {
      this.$message({
        message: "最多上传1个文件",
        type: "warn"
      })
    },
    async uploadFile(file) {
      console.log("uploadfile")
      console.log(file)
      //参数file文件就是传入的文件流，添加进formDate中
      this.formDate.append("files", file.file)
      await insertRepoArticle(this.formDate)
      .then(res => {
        console.log(res)
        this.$message({
          message: "上传成功",
          type: "success"
        })
      })
      .catch(err => {
        this.$message({
          message: "上传失败" + err,
          type: "error"
        })
      })
    },
  },
  created () {
    this.getKuList()
    this.formDate.append('telephone', localStorage.getItem('loginId'))
  },
}
</script>
<style scoped lang='less'>
.smartcloud {
  background-color: #fff;
  width: 100vw;
  height: calc(100vh - 80px);
}
.smartcloud_left {
  width: 15vw;
  height: 100%;
  float: left;
  border-right: 3px solid #E5E5E5;
}
.left {
  &_head {
    float: left;
    height: 17vh;
    width: 100%;
    &_return {
      height: 10vh;
      width: 100%;
      img {
        width: 30px;
        height: 30px;
        margin: 21px 30px;
        scale: 1.2;
        cursor: pointer;
      }
    }
    &_title {
      width: 100%;
      height: 7vh;
      color: #013480;
      font-size: 22px;
      text-align: center;
      font-weight: 700;
      padding-left: 80px;
      background: #EBF5FF;
      &_text {
        float: left;
        line-height: 7vh;
      }
      img {
        float: left;
        margin-top: 21px;
        margin-right: 15px;
      }
    }
  }
  &_body {
    float: left;
    height: calc(100% - 17vh);
    width: 100%;
    &_nav {
      float: left;
      text-align: center;
      height: 5vh;
      line-height: 5vh;
      width: 100%;
      color: #000;
      font-size: 18px;
      font-weight: 700;
      background-color: #dbdbdb;
    }
  }
}
.smartcloud_right {
  width: 85vw;
  height: 100%;
  margin-left: 15vw;
}
.right {
  &_head {
    height: 23vh;
    width: 100%;
    padding: 0 112px;
    &_title {
      float: left;
      margin-top: 50px;
      color: #000;
      font-size: 36px;
      font-weight: 700;
    }
    &_btnbox {
      float: left;
      height: 8vh;
      width: 100%;
      padding-top: 28px;
      button {
        float: left;
        width: 117px;
        height: 44px;
        margin-right: 15px;
        border-radius: 10px;
        border: 1px solid #1559DD;
        background-color: #fff;
        color: #1559DD;
        font-size: 20px;
        cursor: pointer;
      }
      .btn_import {
        background: #013480;
        color: #fff;
        margin-right: 0;
      }
    }
    &_index {
      float: left;
      height: 3vh;
      width: 100%;
      margin-top: 17px;
      color: #9B9595;
      font-size: 20px;
    }
  }
  &_body {
    float: left;
    width: 100%;
    height: 68.7vh;
    padding-top: 10px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none
    }
    &_head {
      width: 100%;
      height: 3vh;
      padding: 0 198px;
      border-bottom: 2px solid #E3E2E2;
      div {
        float: left;
        color: #9B9595;
        font-size: 20px;
        font-weight: 500;
      }
      &_time {
        margin-left: 600px;
      }
      &_size {
        margin-left: 200px;
      }
    }
    &_body {
      width: 100%;
      height: calc(100% - 3vh);
    }
  }
}
.upload-demo {
  float: left;
}
::v-deep .el-upload-list {
  display: none;
}
.content_boxx {
  position: absolute;
  top: 250px;
  right: 80px;
  width: 40%;
  height: 10%;
  &_num {
    height: 44px;
    line-height: 44px;
    float: right;
    color: #000;
    font-size: 22px;
    text-align: center;
    span {
      color: #1559DD;
    }
  }
  &_button1 {
    float: right;
    margin-left: 20px;
    width: 69px;
    height: 44px;
    border-radius: 6px;
    border: none;
    background: #013480;
    color: #FFF;
    font-size: 18px;
    cursor: pointer;
  }
  &_button2 {
    float: right;
    margin-left: 10px;
    width: 69px;
    height: 44px;
    border-radius: 6px;
    background: #D9D9D9;
    border: none;
    color: #FFF;
    font-size: 18px;
    cursor: pointer;
  }
}
</style>
