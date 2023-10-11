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
            <el-progress :percentage="item.percentage" :stroke-width="8" :show-text="false"></el-progress>
            <div class="process_card_right_size">{{ (item.size/1024/1024).toFixed(2) }}MB</div>
          </div>
        </div>
      </div>
    </div>
    <div class="bulkimport_right">
      <div class="bulkimport_right_title">文字匹配</div>
      <div class="bulkimport_right_text">{{ this.text }}</div>
      <div class="bulkimport_right_link">在文献库中检索 ></div>
    </div>
  </div>
</template>

<script>
import { uploadImgFile } from '@/api/file.js'
export default {
  name: 'bulkImportImg',
  components: {},
  data () {
    return {
      formDate: new FormData(),
      pdfList: [],
      text: " "
    }
  },
  computed: {
    tel() {
      return localStorage.getItem('loginId')
    }
  },
  watch: {},
  methods: {
    toPdf() {
      this.$router.push('/home/retrievalengine/bulkimport')
    },
    toDoc() {
      this.$router.push('/home/retrievalengine/myFile')
    },
    async onSubmit() {
      this.$refs.upload.submit()
      this.formDate.append('telephone', localStorage.getItem('loginId'))
      await uploadImgFile(this.formDate)
      .then(res => {
        this.text = res.Detail
        this.$message({
          message: "上传成功",
          type: "success"
        });
      })
      .catch(err => {
        this.$message({
          message: "上传失败" + err,
          type: "error"
        });
      })
    },
    beforeUpload(file) {
      console.log("beforeupload")
      console.log(file);
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
      });
    },
    uploadFile(file) {
      console.log("uploadfile");
      console.log(file)
      //参数file文件就是传入的文件流，添加进formDate中
      this.formDate.append("file", file.file)
    },
  },
  created () {},
}
</script>
<style scoped lang='less'>
.bulkimport {
  height: 91.7vh;
  width: 85.1vw;
  padding-left: 85px;
  background-color: #fff;
}
.bulkimport_right {
  float: right;
  height: 91.7vh;
  width: 36vw;
  padding: 42px 40px;
  padding-bottom: 30px;
  border-left: 1px solid #D9D9D9;
  &_title {
    color: #000;
    font-size: 36px;
    font-weight: 700;
  }
  &_text {
    margin-top: 20px;
    width: 609px;
    height: 660px;
    border-radius: 20px;
    background: #b6cadd;
    color: #514D4D;
    font-size: 32px;
    letter-spacing: 3.52px;
    overflow-y: scroll;
    Text-indent: 55px;
    &::-webkit-scrollbar {
      display: none
    }
  }
  &_link {
    float: right;
    margin-top: 10px;
    color: #000;
    font-size: 24px;
    letter-spacing: 2.64px;
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
  width: 40vw; //67.4
  &_title {
    text-align: center;
    margin-top: 50px;
    color: #000;
    font-size: 36px;
    font-weight: 700;
  }
  &_confirm {
    float: left;
    margin-left: 30px;
    margin-top: 15px;
    color: #000;
    font-size: 22px;
    font-weight: 700;
    letter-spacing: 2.42px;
    cursor: pointer;
  }
  &_img {
    float: left;
    margin-top: 15px;
    color: #1559DD;
    font-size: 22px;
    font-weight: 700;
    letter-spacing: 2.42px;
    cursor: pointer;
  }
  &_doc {
    float: right;
    margin-top: 15px;
    color: #1559DD;
    font-size: 22px;
    font-weight: 700;
    letter-spacing: 2.42px;
    cursor: pointer;
  }
}
.bulkimport_body {
  padding-top: 15px;
  float: left;
  height: 40.7vh;
  width: 40vw;
}
.bulkimport_foot{
  padding-top: 15px;
  float: left;
  height: 36vh;
  width: 40vw;
  overflow-y: scroll;
  &::-webkit-scrollbar {
		display: none
	}
  .process_card {
    float: left;
    height: 87px;
    width: 100%;
    margin-bottom: 15px;
    &_left {
      float: left;
      height: 100%;
      width: 86px;
      img {
        height: 86px;
        width: 86px;
      }
    }
    &_right {
      float: left;
      height: 100%;
      width: calc(100% - 86px);
      &_title {
        margin-bottom: 10px;
        color: #000;
        font-size: 23px;
        font-weight: 700;
        letter-spacing: 1.4px;
      }
      &_size {
        margin-top: 13px;
        color: #9B9595;
        font-size: 16px;
        font-weight: 700;
        line-height: 149.482%; /* 17.938px */
      }
    }
  }
}
::v-deep .el-upload-dragger {
  float: left;
  width: 763px;
  height: 373px;
  border: 1px dashed #9B9595;
  background: rgba(235, 245, 255, 0.40)
}
::v-deep .el-icon-upload {
  font-size: 100px;
  margin: 115px 0;
  margin-bottom: 50px;
}
.el-upload__text {
  color: #000;
  font-size: 26px;
  line-height: 149.482%; /* 38.865px */
  letter-spacing: 2.86px;
}
.el-progress-bar {
  background-color: #fff;
}
::v-deep .el-upload-list {
  display: none;
}
</style>
