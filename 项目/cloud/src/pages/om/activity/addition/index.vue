
<template>
  <ui-container>
    <!--header start-->
    <div slot="header">
      <el-breadcrumb separator-class="el-icon-arrow-right"
                     separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">广告管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/om/activity' }">活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>添加活动</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--header end-->
    <!--addition start-->
    <div class="addition_wrap">
        <el-form  label-width="80px" size="mini" :model="activityAddition" :rules="addRules" ref="activityAdditionForm">
          <div class="header-title">活动基本信息</div>
          <el-form-item label="名称:"  prop="activityName">
            <el-input v-model="activityAddition.activityName"  placeholder="请输入活动名称"></el-input>
          </el-form-item>
           <el-form-item label="显示名称:"  prop="activityDname">
            <el-input v-model="activityAddition.activityDname"  placeholder="请输入活动显示名称"></el-input>
          </el-form-item>
          <el-form-item label="终端类型:" prop="activityTerminal">
            <el-select   placeholder="请选择终端类型" v-model="activityAddition.activityTerminal">
            <el-option label="小程序" value="1"></el-option>
            <el-option label="PC" value="2"></el-option>
            <el-option label="H5" value="3"></el-option>
          </el-select>
          </el-form-item>
           <el-form-item label="活动类型:" prop="activityTypeNo">
            <el-select   placeholder="请选择" v-model="activityAddition.activityTypeNo">
            <el-option
                v-for="classify in activityClassifys"
                :key="classify.activityTypeNo"
                :label="classify.activityName"
                :value="classify.activityTypeNo">
              </el-option>
          </el-select>
          </el-form-item>
          <el-form-item label="排序:" prop="pos">
            <el-input v-model="activityAddition.pos"  placeholder="请输入排序" type="number"></el-input>
          </el-form-item>
          <el-form-item label="背景颜色值:">
            <el-input v-model="activityAddition.bgCls"  placeholder="请输入背景颜色值"></el-input>
          </el-form-item>
           <el-form-item label="活动链接:" prop="activityUrl">
            <el-input v-model="activityAddition.activityUrl"></el-input>
          </el-form-item>
          <el-form-item label="是否显示:" prop="dis">
            <el-radio-group size="medium" v-model="activityAddition.dis">
              <el-radio  label="1">显示</el-radio>
              <el-radio  label="2">不显示</el-radio>
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
                <p>1、只能上传jpg/png文件，且不超过50kb</p>
                <p>2、默认第一张为icon,第二张为活动主图</p>
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="生效时间:" prop="activityTime">
            <el-date-picker
            v-model="activityAddition.activityTime"
            type="datetimerange"
            range-separator="至"
            value-format="yyyy-MM-dd HH:mm:ss"
            start-placeholder="生效开始时间"
            end-placeholder="生效结束时间">
          </el-date-picker>
          </el-form-item>
          <el-form-item label="说明:">
             <el-input type="textarea"
             v-model="activityAddition.memo"
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
  name: 'activityAddition',
  data () {
    return {
      activityClassifys: [],
      activityAddition: {
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
      addRules: {
        activityName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 32, message: '长度在 3 到 32 个字符', trigger: 'blur' }
        ],
        activityDname: [
          { required: true, message: '请输入活动显示名称', trigger: 'change' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        activityUrl: [
          { required: true, message: '请选择使用场景', trigger: 'change' }
        ],
        dis: [
          { required: true, message: '请选择是否显示', trigger: 'change' }
        ],
        pos: [
          { required: true, message: '请输入排序', trigger: 'blur' }
        ],
        activityTypeNo: [
          { required: true, message: '请选择活动类型', trigger: 'change' }
        ],
        activityTerminal: [
          { required: true, message: '请选择活动终端', trigger: 'change' }
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
    this.fetchActivityClassify()
  },
  methods: {
    fileMainMaxTip () {
      const { $message } = this
      $message.error('最多选择两张图片,请删除后添加!')
    },
    addMainFile (file) {
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
      const isLtSize = file.size / 1024 > 50
      if (isLtSize) {
        this.$message.error('上传图片大小不能超过 50kb!')
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
      console.log(this.activityAddition)
      this.$refs['activityAdditionForm'].validate(async (valid) => {
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
    async fetchActivityClassify () {
      const { $api, $message } = this
      try {
        let { dataList } = await $api.activity.activityClassifyListInquiry({})
        this.activityClassifys = Object.freeze(dataList)
        console.log(this.activityClassifys)
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
        formData.append('file', this.fileList[x].raw)
      }
      formData.append('channel', 'ALIYUN')
      formData.append('uploadKey', 'oss_activity')
      try {
        const { $api, $message } = this
        const { attachmentNos } = await $api.advert.shopcrmFileUpload(formData)
        if (attachmentNos.length < 2) {
          this.$message('请选择两张图片')
          return
        }
        this.activityAddition.mainImageAttachmentNos = attachmentNos
        if (attachmentNos.length > 0) {
          this.activityAddition.mainFileList = null
          const { transactionStatus } = await $api.activity.shopcrmActivityAddition(this.activityAddition)
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
