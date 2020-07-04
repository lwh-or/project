
<template>
  <ui-container>
    <!--header start-->
    <div slot="header">
      <el-breadcrumb separator-class="el-icon-arrow-right"
                     separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">广告管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/om/advert' }">广告列表</el-breadcrumb-item>
        <el-breadcrumb-item>广告维护</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--header end-->
    <!--addition start-->
    <div class="maintenance_wrap">
        <el-form  label-width="90px" size="mini" :model="advertMaintenance" :rules="addRules" ref="advertMaintenanceForm">
          <div class="header-title">广告基本信息</div>
          <el-form-item label="广告标题:"  prop="advertTitle">
            <el-input v-model="advertMaintenance.advertTitle"  placeholder="请输入广告标题"></el-input>
          </el-form-item>
          <el-form-item label="终端类型:" prop="advertTerminal">
            <el-select v-model="advertMaintenance.advertTerminal"  placeholder="请选择终端类型">
            <el-option label="小程序" :value="1"></el-option>
            <el-option label="PC" :value="2"></el-option>
            <el-option label="H5" :value="3"></el-option>
          </el-select>
          </el-form-item>
          <el-form-item label="使用场景:" prop="advertTerminal">
             <el-select v-model="advertMaintenance.usageScenario" placeholder="请选择使用场景">
            <el-option label="Banner" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="排序:" prop="pos">
            <el-input v-model.number="advertMaintenance.pos"  placeholder="请输入pos" type="number"></el-input>
          </el-form-item>
           <el-form-item label="广告链接:">
            <el-input v-model="advertMaintenance.advertUrl"></el-input>
          </el-form-item>
          <el-form-item label="上线/下线:" prop="status">
            <el-radio-group size="medium" v-model="advertMaintenance.status">
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
              :http-request="my_pictureFileUpload"
              :on-exceed="fileMaxTip"
              :on-remove="removeList"
              :on-change="changeFile"
              :file-list="fileList"
              :limit="1"
              ref="upload">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip">只能上传jpg/png文件，且不超过50kb</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="生效时间:" prop="advertTime">
            <el-date-picker
              v-model="advertMaintenance.advertTime"
              @input="getInvoiceData"
              type="datetimerange"
              range-separator="至"
              value-format="yyyy-MM-dd HH:mm:ss"
              start-placeholder="生效开始时间"
              end-placeholder="生效结束时间">
           </el-date-picker>
          </el-form-item>
          <el-form-item label="说明:">
             <el-input type="textarea"
             v-model="advertMaintenance.desc"
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
  name: 'advertMaintenance',
  data () {
    return {
      advertMaintenance: {
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
  mounted () {
    const { advertNo } = this.$route.query
    this.fetchAdvertInfo(advertNo)
  },
  methods: {
    getInvoiceData (vm) {
      this.advertMaintenance.advertTime = vm
      this.$forceUpdate()
    },
    async fetchAdvertInfo (advertNo) {
      const { $api, $message } = this
      try {
        let { transactionStatus, data } = await $api.advert.shopcrmadvertDetailInquiry({advertNo})
        if (transactionStatus.success) {
          this.advertMaintenance = data
          if (data.datAdvertEnd !== '' || data.datAdvertStart !== '') {
            this.advertMaintenance.advertTime = []
            this.advertMaintenance.advertTime.push(data.datAdvertEnd, data.datAdvertStart)
          }
          const imgDate = {
            status: 'success',
            uid: data.advertNo,
            url: data.imageUrl
          }
          // console.log(imgDate)
          this.fileList.push(imgDate)
        }
      } catch (error) {
        $message.error(error.replyText)
      } finally {
        this.submitLoad = false
      }
    },
    addFile (val) {
      this.fileList.push(val.file)
    },
    my_pictureFileUpload () {
      this.pushFileData()
    },
    removeList (file, fileList) {
      this.fileList = fileList
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
      this.fileList = fileList
      // console.log(this.fileList, fileList)
      this.showList = true
      return true
    },
    changeFile (file, fileList) {
      this.beforeAvatarUpload(file, fileList)
    },
    uploadFile () {
      this.$refs['advertMaintenanceForm'].validate((valid) => {
        this.$refs.upload.submit()
      })
    },
    fileMaxTip () {
      const { $message } = this
      $message.error('广告图只能选择一张,请删除后添加!')
    },
    async pushFileData () {
      try {
        const { $api, $message } = this
        const { raw } = this.fileList.pop()
        if (this.showList) {
          let formData = new FormData()
          formData.append('file', raw)
          formData.append('channel', 'ALIYUN')
          formData.append('uploadKey', 'oss_advert')
          const { attachmentNos } = await $api.advert.shopcrmFileUpload(formData)
          this.advertMaintenance.addImgAttachmentNos = attachmentNos
          this.advertMaintenance.fileList = null
          this.advertMaintenance.datAdvertEnd = this.advertMaintenance.advertTime[0]
          this.advertMaintenance.datAdvertStart = this.advertMaintenance.advertTime[1]
          const { transactionStatus } = await $api.advert.shopcrmAdvertMaintenance(this.advertMaintenance)
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
