
<template>
  <ui-container>
    <!--header start-->
    <div slot="header">
      <el-breadcrumb separator-class="el-icon-arrow-right"
                     separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">广告管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/om/advert' }">广告列表</el-breadcrumb-item>
        <el-breadcrumb-item>添加广告</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--header end-->
    <!--addition start-->
    <div class="addition_wrap">
        <el-form  label-width="80px" size="mini" :model="advertAddition" :rules="addRules" ref="advertAdditionForm">
          <div class="header-title">广告基本信息</div>
          <el-form-item label="广告标题:"  prop="advertTitle">
            <el-input v-model="advertAddition.advertTitle"  placeholder="请输入广告标题"></el-input>
          </el-form-item>
          <el-form-item label="终端类型:" prop="advertTerminal">
            <el-select v-model="advertAddition.advertTerminal"  placeholder="请选择终端类型">
            <el-option label="小程序" value="1"></el-option>
            <el-option label="PC" value="2"></el-option>
            <el-option label="H5" value="3"></el-option>
          </el-select>
          </el-form-item>
          <el-form-item label="使用场景:" prop="usageScenario">
             <el-select v-model="advertAddition.usageScenario" placeholder="请选择使用场景">
            <el-option label="Banner" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="排序:" prop="pos">
            <el-input v-model="advertAddition.pos"  placeholder="请输入pos" type="number"></el-input>
          </el-form-item>
           <el-form-item label="广告链接:">
            <el-input v-model="advertAddition.advertUrl"></el-input>
          </el-form-item>
          <el-form-item label="上线/下线:" prop="status">
            <el-radio-group size="medium" v-model="advertAddition.status">
              <el-radio :label="1">上线</el-radio>
              <el-radio :label="2">下线</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="广告图片:" prop="fileList">
            <el-upload
              action="/none"
              :multiple="false"
              list-type="picture"
              :auto-upload="false"
              :http-request="addFile"
              :on-exceed="fileMaxTip"
              :on-remove="removeList"
              :on-change="changeFile"
              :file-list="fileList"
              :limit="2"
              ref="upload">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip">只能上传jpg/png文件，且不超过50kb</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="生效时间:" prop="advertTime">
            <el-date-picker
            v-model="advertAddition.advertTime"
            type="datetimerange"
            range-separator="至"
            @input="getInvoiceData"
            value-format="yyyy-MM-dd HH:mm:ss"
            start-placeholder="生效开始时间"
            end-placeholder="生效结束时间">
          </el-date-picker>
          </el-form-item>
          <el-form-item label="说明:">
             <el-input type="textarea"
             v-model="advertAddition.desc"
             maxlength="200"
            show-word-limit>
            </el-input>
          </el-form-item>
          <el-form-item size="large">
            <el-button type="primary" @click="uploadFile">保存</el-button>
          </el-form-item>
        </el-form>
    </div>
    <!--addition end-->
  </ui-container>
</template>
<script type="text/javascript">
export default {
  name: 'AdvertAddition',
  data () {
    return {
      advertAddition: {
        fileList: [],
        advertTerminal: null,
        advertTitle: '',
        advertUrl: '',
        imgAttachmentNos: [],
        datAdvertEnd: '',
        datAdvertStart: '',
        desc: '',
        usageScenario: null,
        pos: 1,
        advertTime: [],
        status: 2
      },
      addRules: {
        advertTitle: [
          { required: true, message: '请输入广告标题', trigger: 'blur' },
          { min: 3, max: 32, message: '长度在 3 到 32 个字符', trigger: 'blur' }
        ],
        advertTerminal: [
          { required: true, message: '请选择终端类型', trigger: 'change' }
        ],
        usageScenario: [
          { required: true, message: '请选择使用场景', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ],
        pos: [
          { required: true, message: '请输入排序', trigger: 'blur' }
        ],
        fileList: [
          { required: true, message: '请选择文件', trigger: 'change' }
        ],
        advertTime: [
          { required: true }
        ]
      },
      fileList: [],
      showList: false
    }
  },
  methods: {
    getInvoiceData (vm) {
      this.advertAddition.advertTime = vm
      this.$forceUpdate()
    },
    addFile (file) {
      this.advertAddition.fileList[0] = file.file
    },
    removeList () {
      this.fileList.splice(0, 1)
    },
    beforeAvatarUpload (file, fileList) {
      let testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'jpg'
      const extension2 = testmsg === 'png'
      if (!extension && !extension2) {
        this.$message.error('上传图片只能是 JPG、PNG 格式!')
        this.showList = false
        // 手动清楚图片
        this.fileList.splice(0, 1)
        return false
      }
      const isLtSize = file.size / 1024 > 50
      if (isLtSize) {
        this.$message.error('上传图片大小不能超过 50kb!')
        this.showList = false
        this.fileList.splice(0, 1)
        return false
      }
      if (this.fileList.length) {
        this.fileList.push(fileList[1])
        this.fileList.splice(0, 1)
      } else {
        this.fileList.push(fileList[0])
      }
      console.log(this.fileList)
      this.showList = true
      return true
    },
    changeFile (file, fileList) {
      this.beforeAvatarUpload(file, fileList)
    },
    uploadFile () {
      this.$refs.upload.submit()
      this.$refs['advertAdditionForm'].validate(async (valid) => {
        if (valid) {
          if (this.advertAddition.fileList.length > 0) {
            this.pushFileData()
          }
        }
      })
    },
    fileMaxTip () {
      const { $message } = this
      $message.error('广告图只能选择一张,请删除后添加!')
    },
    async pushFileData () {
      try {
        const { $api, $message } = this
        if (this.showList) {
          console.log(this.fileList[0])
          let formData = new FormData()
          formData.append('file', this.fileList[0].raw)
          formData.append('channel', 'ALIYUN')
          formData.append('uploadKey', 'oss_advert')
          const { attachmentNos } = await $api.advert.shopcrmFileUpload(formData)
          console.log(attachmentNos)
          this.advertAddition.imgAttachmentNos = attachmentNos
          this.advertAddition.fileList = null
          this.advertAddition.datAdvertEnd = this.advertAddition.advertTime[0]
          this.advertAddition.datAdvertStart = this.advertAddition.advertTime[1]
          const { transactionStatus } = await $api.advert.shopcrmAdvertAddition(this.advertAddition)
          if (!transactionStatus.success) {
            $message.error('保存失败:' + transactionStatus.replyText)
          } else {
            $message.success('保存成功')
            let path = '/om/advert'
            this.$router.push({
              path: path
            })
          }
        } else {
          $message.error('文件上传失败')
        }
      } catch (error) {
      } finally {
        this.submitLoad = false
      }
    },
    async additionAdvert () {
    }
  }
}
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss" scoped>
</style>
