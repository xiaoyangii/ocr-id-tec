<template>
  <div class="bulkimport">
    <div class="bulkimport_head">
      <div class="bulkimport_head_title">上传文件</div>
      <div class="bulkimport_head_img" @click="toImg()">上传图片文件</div>
      <div class="bulkimport_head_confirm" @click="onSubmit()">确认上传</div>
      <div class="bulkimport_head_doc" @click="toDoc()">查看我的文件归档</div>
    </div>
    <div class="bulkimport_body">
      <el-upload
        class="upload-demo"
        ref="upload"
        drag
        action="http://orcsystem.v2.idcfengye.com/Article/InsertArticle"
        :limit="4"
        :on-exceed="handleExceed"
        :on-change="onChange"
        :before-upload="beforeUpload"
        :http-request="uploadFile"
        :on-progress="onProgress"
        :auto-upload="false"
        accept=".pdf"
        multiple
        >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">拖拽上传你的<em>PDF</em>文件</div>
      </el-upload>
    </div>
    <div class="bulkimport_foot">
      <div class="process_card" v-for="(item) in pdfList" :key="item.id">
        <div class="process_card_left">
          <img src="@/assets//images/pdf.png" alt="">
        </div>
        <div class="process_card_right">
          <div class="process_card_right_title">{{ item.name }}</div>
          <el-progress :percentage="uploadprogressPercentage" :show-text="false"></el-progress>
          <div class="process_card_right_size">{{ (item.size/1024/1024).toFixed(2) }}MB</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { uploadPdfFile } from '@/api/file.js'
import axios from 'axios'
export default {
  name: 'bulkImport',
  components: {},
  data () {
    return {
      pdfList: [],
      formDate: new FormData(),
      uploadprogressPercentage: 0
    }
  },
  methods: {
    toImg() {
      this.$router.push('/home/retrievalengine/bulkimportimg')
    },
    toDoc() {
      this.$router.push('/home/smartcloud')
    },
    async onSubmit() {
      this.$refs.upload.submit()
      this.formDate.append('telephone', localStorage.getItem('loginId'))
      this.$message({
        message: "上传中",
        type: "success"
      })
      await axios({
        url: 'http://120.77.149.32:8999/Picture/InsertArticle',
        method: "post",
        data: this.formDate,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: progress => {
          if (progress.event.lengthComputable) {
            this.uploadprogressPercentage = parseInt((progress.loaded / progress.total) * 100) // 进度条百分比
          }
        },
      })
      .then(res => {
        this.$message({
          message: "上传成功",
          type: "success"
        })
      })
      .catch(err => {
        this.$message({
          message: err.msg,
          type: "error"
        })
      })
    },
    beforeUpload(file) {
      console.log("beforeupload")
      console.log(file)
    },
    onChange(file, fileList) {
      console.log("onchange")
      this.pdfList.push(file)
      console.log(fileList)
    },
    handleExceed() {
      this.$message({
        message: "最多上传4个文件",
        type: "warn"
      })
    },
    onProgress(event, file, fileList) {
      console.log("onprogress")
      console.log(event, file, fileList)
    },
    uploadFile(file) {
      console.log("uploadfile")
      console.log(file)
      //参数file文件就是传入的文件流，添加进formDate中
      this.formDate.append("files", file.file)
    },
  },
  created () {},
}
</script>
<style scoped lang='less'>
.bulkimport {
  height: 91.7vh;
  width: 85.1vw;
  .px2vw(padding-right, 170);
  .px2vw(padding-left, 170);
  background-color: #fff;
}
.bulkimport_head {
  float: left;
  height: 15vh;
  width: 67.4vw;
  &_title {
    text-align: center;
    .px2vh(margin-top, 58);
    color: #000;
    .px2font(37);
    font-weight: 700;
  }
  &_confirm {
    float: left;
    .px2vw(margin-left, 30);
    .px2vh(margin-top, 17);
    color: #000;
    .px2font(22);
    font-weight: 700;
    letter-spacing: 0.12vw;
    cursor: pointer;
  }
  &_img {
    float: left;
    .px2vh(margin-top, 17);
    color: #1559DD;
    .px2font(22);
    font-weight: 700;
    letter-spacing: 0.12vw;
    cursor: pointer;
  }
  &_doc {
    float: right;
    .px2vh(margin-top, 17);
    color: #1559DD;
    .px2font(22);
    font-weight: 700;
    letter-spacing: 0.12vw;
    cursor: pointer;
  }
}
.bulkimport_body {
  .px2vh(padding-top, 17);
  float: left;
  height: 40.7vh;
  width: 67.4vw;
}
.bulkimport_foot{
  .px2vh(padding-top, 17);
  float: left;
  height: 35.5vh;
  width: 67.4vw;
  overflow-y: scroll;
  &::-webkit-scrollbar {
		display: none
	}
  .process_card {
    float: left;
    .px2vh(height, 100);
    width: 100%;
    .px2vh(margin-bottom, 17);
    &_left {
      float: left;
      height: 100%;
      .px2vw(width, 86);
      img {
        .px2vh(height, 98.5);
        .px2vw(width, 86);
      }
    }
    &_right {
      float: left;
      height: 100%;
      .px2vw(width, 1207.9);
      &_title {
        .px2vh(margin-bottom, 15);
        color: #000;
        .px2font(20);
        font-weight: 700;
        letter-spacing: 0.1vw;
      }
      &_size {
        .px2vh(margin-top, 17);
        color: #9B9595;
        .px2font(16);
        font-weight: 700;
      }
    }
  }
}
::v-deep .el-upload-dragger {
  .px2vw(width, 1295);
  .px2vh(height, 425);
  .px2vh(line-height, 50);
  border: 0.15vw dashed #9B9595;
  background: rgba(235, 245, 255, 0.40)
}
::v-deep .el-icon-upload {
  .px2font(120);
  .px2vh(margin-top, 140);
  .px2vh(margin-bottom, 50);
}
.el-upload__text {
  color: #000;
  .px2font(28);
  letter-spacing: 0.15vw;
}
.el-progress-bar {
  background-color: #fff;
}
::v-deep .el-upload-list {
  display: none;
}
::v-deep .el-upload-dragger .el-icon-upload {
  .px2vh(line-height, 60);
}
::v-deep .el-progress-bar__outer {
  .px2vh(height, 11) !important;
}
</style>
