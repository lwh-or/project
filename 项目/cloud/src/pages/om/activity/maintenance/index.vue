
<template>
  <ui-container>
    <!--header start-->
    <div slot="header">
      <el-breadcrumb separator-class="el-icon-arrow-right"
                     separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">广告管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/om/activity' }">活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动维护</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--header end-->
    <!--Maintenance start-->
    <div class="maintenance_wrap">
        <el-form  label-width="90px" size="mini" :model="activityMaintenance" :rules="maintenanceRules" ref="activityMaintenanceForm">
          <div class="header-title">活动基本信息</div>
          <el-form-item label="主题名称:"  prop="activityName">
            <el-input v-model="activityMaintenance.activityName"  placeholder="请输入活动名称"></el-input>
          </el-form-item>
           <el-form-item label="活动类型:" prop="activityTypeNo">
            <el-select   placeholder="请选择" v-model="activityMaintenance.activityTypeNo">
            <el-option
                v-for="classify in activityClassifys"
                :key="classify.activityTypeNo"
                :label="classify.activityName"
                :value="classify.activityTypeNo">
              </el-option>
          </el-select>
          </el-form-item>
          <el-form-item label="背景颜色值:" prop="bgCls">
            <el-input v-model="activityMaintenance.bgCls"  placeholder="请输入背景颜色值"></el-input>
          </el-form-item>
          <el-form-item label="上线/下线:" prop="dis">
            <el-radio-group size="medium" v-model="activityMaintenance.dis">
              <el-radio  :label="1">显示</el-radio>
              <el-radio  :label="2">不显示</el-radio>
            </el-radio-group>
          </el-form-item>
           <el-form-item label="活动图:" >
            <el-upload
              action="/none"
              list-type="picture"
              :on-change="changeFile"
              :file-list="fileList"
              :auto-upload="false"
              :multiple="false"
              :on-exceed="fileMainMaxTip"
              :on-remove="removeFile"
              :limit="2"
              ref="mainUpload">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip">
                <p>1、只能上传jpg/png文件，且不超过1M</p>
                <p>2、默认第一张为icon,第二张为活动主图</p>
              </div>
            </el-upload>
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
  name: 'activityMaintenance',
  data () {
    return {
      activityClassifys: [],
      activityMaintenance: {
        mainFileList: [],
        activityName: '',
        activityDname: '',
        activityIcon: '',
        activityTerminal: '',
        activityTypeNo: '',
        activityUrl: '',
        activityTime: '',
        activityStartTime: '',
        activityEndTime: '',
        dis: null,
        bgCls: '#f80',
        mainImageAttachmentNos: [],
        memo: '',
        pos: 1
      },
      maintenanceRules: {
        activityName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 32, message: '长度在 3 到 32 个字符', trigger: 'blur' }
        ],
        dis: [
          { required: true, message: '请选择是否显示', trigger: 'change' }
        ],
        activityTypeNo: [
          { required: true, message: '请选择活动类型', trigger: 'change' }
        ],
        bgCls: [
          { required: true, message: '请输入背景颜色值', trigger: 'change' }
        ]
      },
      showList: false,
      fileList: []
    }
  },
  created () {
    this.fileList = []
  },
  mounted () {
    const { activityNo } = this.$route.query
    this.fetchActivityInfo(activityNo)
    this.fetchActivityClassify()
  },
  methods: {
    fileMainMaxTip () {
      const { $message } = this
      $message.error('最多选择两张图片,请删除后添加!')
    },
    changeFile (file, fileList) {
      this.beforeAvatarUpload(file, fileList)
    },
    removeFile (file, fileList) {
      this.fileList = fileList
    },
    beforeAvatarUpload (file, fileList) {
      let testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'jpg'
      const extension2 = testmsg === 'png'
      if (!extension && !extension2) {
        this.$message.error('上传图片只能是 JPG、PNG 格式!')
        if (this.fileList.length >= 1) {
          this.fileList.splice(1, 1)
        } else {
          this.fileList.splice(0, 1)
        }
        this.showList = false
        return false
      }
      const isLtSize = file.size / 1024 > 1024
      if (isLtSize) {
        this.$message.error('上传图片大小不能超过 1M!')
        if (this.fileList.length >= 1) {
          this.fileList.splice(1, 1)
        } else {
          this.fileList.splice(0, 1)
        }
        this.showList = false
        return false
      }
      this.fileList = fileList
      this.showList = true
      return true
    },
    uploadFile () {
      // this.activityAddition.mainFileList = []
      this.$refs.mainUpload.submit()
      console.log(this.activityMaintenance)
      this.$refs['activityMaintenanceForm'].validate(async (valid) => {
        if (this.fileList.length > 0) {
          if (valid) {
            this.pushFileData()
          } else {
            console.log(111)
          }
        } else {
          this.$message.error('请选择图片')
        }
      })
    },
    async fetchActivityInfo (activityNo) {
      const { $api, $message } = this
      try {
        let { transactionStatus, data } = await $api.activity.shopcrmActivityDetailInquiry({activityNo})
        if (transactionStatus.success) {
          this.activityMaintenance = data
        }
      } catch (error) {
        $message.error(error.replyText)
      } finally {
        this.submitLoad = false
      }
    },
    async fetchActivityClassify () {
      const { $api, $message } = this
      try {
        let { dataList } = await $api.activity.activityClassifyListInquiry({})
        this.activityClassifys = Object.freeze(dataList)
      } catch (error) {
        $message.error(error.replyText)
      } finally {
        this.submitLoad = false
      }
    },
    async pushFileData () {
      let formData = new FormData()
      console.log(this.fileList)
      for (let x = 0; x < this.fileList.length; x++) {
        console.log(this.fileList[x].raw)
        formData.append('file', this.fileList[x].raw)
      }
      formData.append('channel', 'ALIYUN')
      formData.append('uploadKey', 'oss_activity')
      console.log(formData, '=============')
      try {
        const { $api, $message } = this
        const { attachmentNos } = await $api.advert.shopcrmFileUpload(formData)
        console.log(attachmentNos, '--------------')
        if (attachmentNos.length < 2) {
          this.$message('请选择两张图片')
          return
        }
        this.activityMaintenance.iconAttachmentNos = [attachmentNos[0]]
        this.activityMaintenance.mainImageAttachmentNos = [attachmentNos[1]]
        // this.
        if (attachmentNos.length > 0) {
          this.activityMaintenance.mainFileList = null
          const { transactionStatus } = await $api.activity.shopcrmActivityMaintenance(this.activityMaintenance)
          if (!transactionStatus.success) {
            $message.error('保存失败:' + transactionStatus.replyText)
          } else {
            $message.success('保存成功')
            let path = '/om/activity'
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
    }
  }
}
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss" scoped>
</style>
