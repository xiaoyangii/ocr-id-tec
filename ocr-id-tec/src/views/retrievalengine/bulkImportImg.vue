<template>
  <div class="bulkimport">
    <div class="bulkimport_left">
      <div class="bulkimport_head">
        <div class="bulkimport_head_title">上传文件</div>
        <div class="bulkimport_head_img" @click="toPdf()">上传PDF文件</div>
        <div class="bulkimport_head_confirm" @click="onSubmit()">确认上传</div>
        <div class="bulkimport_head_doc" @click="toDoc()">查看我的文件归档</div>
      </div>
      <div class="bulkimport_body">
        <el-upload
          class="upload-demo"
          ref="upload"
          drag
          action=""
          :limit="4"
          :on-exceed="handleExceed"
          :on-change="onChange"
          :before-upload="beforeUpload"
          :http-request="uploadFile"
          :on-progress="onProgress"
          :auto-upload="false"
          accept=".jpg,.png,.jpeg"
          multiple
          >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">拖拽上传你的<em>图片</em>文件</div>
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
    <div class="bulkimport_right">
      <div class="bulkimport_right_title">文字匹配</div>
      <div class="bulkimport_right_text">{{ this.text }}</div>
      <div class="bulkimport_right_link" @click="toSearch()">在文献库中检索 ></div>
    </div>
  </div>
</template>

<script>
import { uploadImgFile } from '@/api/file.js'
import request from '@/utils/request'
export default {
  name: 'bulkImportImg',
  components: {},
  data () {
    return {
      formDate: new FormData(),
      pdfList: [],
      text: "",
      uploadprogressPercentage: 0
    }
  },
  computed: {
    tel() {
      return localStorage.getItem('loginId')
    }
  },
  methods: {
    toPdf() {
      this.$router.push('/home/retrievalengine/bulkimport')
    },
    toDoc() {
      this.$router.push('/home/smartcloud')
    },
    toSearch() {
      this.$router.push({path: '/home/retrievalengine/bibliography', query: { keyWord: this.text }})
    },
    async onSubmit() {
      this.$refs.upload.submit()
      this.formDate.append('telephone', localStorage.getItem('loginId'))
      this.$message({
        message: "上传中",
        type: "success"
      })
      await request({
        url: 'http://120.77.149.32:8999/Picture/InsertPicture',
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
        this.text = res.Detail
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
      console.log("uploadfile");
      console.log(file)
      //参数file文件就是传入的文件流，添加进formDate中
      this.formDate.append("file", file.file)
    },
  },
}
</script>
<style scoped lang='less'>
.bulkimport {
  height: 91.7vh;
  width: 85.1vw;
  .px2vw(padding-left, 85);
  background-color: #fff;
}
.bulkimport_right {
  float: right;
  height: 91.7vh;
  width: 36vw;
  padding: 42px 40px;
  .px2vw(padding-left, 40);
  .px2vw(padding-right, 40);
  .px2vh(padding-top, 45);
  .px2vh(padding-bottom, 35);
  border-left: 0.1vw solid #D9D9D9;
  &_title {
    color: #000;
    .px2font(37);
    font-weight: 700;
  }
  &_text {
    .px2vh(margin-top, 22);
    .px2vw(width, 609);
    .px2vh(height, 770);
    .px2vw(border-radius, 20);
    background: #e0ecf8;
    color: #514D4D;
    .px2font(32);
    .px2vw(letter-spacing, 3.52);
    overflow-y: scroll;
    .px2vw(Text-indent, 55);
    &::-webkit-scrollbar {
      display: none
    }
  }
  &_link {
    float: right;
    .px2vh(margin-top, 11);
    color: #000;
    .px2font(24);
    .px2vw(letter-spacing, 2.64);
    cursor: pointer;
  }
}
.bulkimport_left {
  float: left;
  height: 91.7vh;
  width: 40vw;
}
.bulkimport_head {
  float: left;
  height: 15vh;
  width: 40vw;
  &_title {
    text-align: center;
    .px2vh(margin-top, 57);
    color: #000;
    .px2font(36);
    font-weight: 700;
  }
  &_confirm {
    float: left;
    .px2vw(margin-left, 30);
    .px2vh(margin-top, 17);
    color: #000;
    .px2font(22);
    font-weight: 700;
    .px2vw(letter-spacing, 2.42);
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
  width: 40vw;
}
.bulkimport_foot{
  .px2vh(padding-top, 17);
  float: left;
  height: 36vh;
  width: 40vw;
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
      .px2vw(width, 670);
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
  float: left;
  .px2vw(width, 763);
  .px2vh(height, 425);
  border: 0.1vw dashed #9B9595;
  background: rgba(235, 245, 255, 0.40)
}
::v-deep .el-icon-upload {
  .px2font(100);
  .px2vh(margin-top, 140);
  .px2vh(margin-bottom, 50);
}
.el-upload__text {
  color: #000;
  .px2font(26);
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
