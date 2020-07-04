
<template>
  <ui-container>
    <div slot="header">
      <el-breadcrumb separator-class="el-icon-arrow-right" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">个人信息</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/user/profile' }">用户列表</el-breadcrumb-item>
        <el-breadcrumb-item>修改用户</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="c_wrap">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
        <el-form-item label="手机号码" prop="brandNo">
          <el-input v-model="ruleForm.brandNo" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="会员等级" prop="brandName">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="性别" prop="startLetter">
          <template>
            <el-radio-group v-model="radio">
              <el-radio :label="3">其他</el-radio>
              <el-radio :label="6">男</el-radio>
              <el-radio :label="9">女</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>
        <el-form-item label="生日" prop="brandChineseName">
          <el-date-picker
            v-model="value1"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="城市 " prop="madeIn">
          <el-input v-model="ruleForm.madeIn" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="职业" prop="brandLogo">
          <el-upload
          class="upload-demo"
          :action="uploadUrl"
          :before-upload="beforeAvatarUpload"
          :data="pathType"
          :on-success="successFile"
          :file-list="fileList"
          list-type="picture"
          :limit="1">
          <el-button size="small" type="primary" icon="el-icon-upload">选择上传文件</el-button>
          <span slot="tip" class="el-upload__tip c_upload_tip">只能上传jpg/png文件，且不超过50kb</span>
        </el-upload>
        </el-form-item>
        <el-form-item label="个性签名" prop="brandHistory">
          <el-input type="textarea" v-model="ruleForm.brandHistory" :rows="6" maxlength="200" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pos">
          <el-input v-model.number="ruleForm.pos" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="pos">
          <el-input v-model.number="ruleForm.pos" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="账户启用状态" prop="dis">
          <el-radio-group v-model="ruleForm.dis">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" size="mini">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </ui-container>
</template>
<script type="text/javascript">
var validSort = (rule, value, callback) => {
  if (!Number.isInteger(value)) {
    callback(new Error('请输入数字值'))
  } else {
    callback()
  }
}
export default {
  name: 'ProductAddition',
  data () {
    return {
      uploadUrl: '/api/shopcrm/file/upload',
      pathType: {
        channel: 'ALIYUN',
        uploadKey: 'oss_brand'
      },
      fileListBig: [],
      fileList: [],
      ruleForm: {
        brandChineseName: '',
        brandDesc: '', // 描述
        brandHistory: '', // 故事
        brandName: '',
        brandShortName: '',
        brandWebsite: '',
        dis: 1,
        logoAttachmentUrl: '',
        madeIn: '',
        mainPicAttachmentUrl: '',
        pos: '',
        startLetter: '',
        logoAttachmentNos: []
      },
      files: [],
      rules: {
        brandEnName: [
          { required: true, message: '请输入品牌英文名称', trigger: 'blur' }
        ],
        brandName: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' }
        ],
        startLetter: [
          { required: true, message: '请输入品牌首字母', trigger: 'blur' }
        ],
        brandChineseName: [
          { required: true, message: '请输入品牌中文名', trigger: 'blur' }
        ],
        madeIn: [
          { required: true, message: '请输入品牌产地', trigger: 'blur' }
        ],
        pos: [
          {required: false, validator: validSort, trigger: 'blur'}
        ]
        // brandLogo: [
        //   { required: true, message: '请输入品牌产地', trigger: 'blur' }
        // ]
      },
      paramsData: '',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      radio: 3,
      value1: ''
    }
  },
  mounted () {
    // console.log(process.env.API_ROOT)
    let params = this.$route.query
    // console.log(params)
    this.paramsData = params
    this.checkData(params.brandNo)
  },
  methods: {
    // 提交
    submitForm (formName) {
      // if (!this.ruleForm.logoAttachmentUrl) {
      //   return this.$message.error('请上传Logo图片')
      // }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.pushData()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 提交数据
    async pushData () {
      console.log(22222222)
      const { $api, $message } = this
      try {
        let {transactionStatus} = await $api.product.productBrandMaintenance(this.ruleForm)
        if (transactionStatus.success) {
          $message.success('修改成功')
          setTimeout(() => {
            this.$refs['ruleForm'].resetFields()
            let path = '/product/brand'
            this.$router.push({
              path: path
            })
          }, 500)
        } else {
          $message.error(transactionStatus.replyText)
        }
      } catch (error) {
        console.log(error)
        $message.error(error.replyText)
      } finally {
        this.submitLoad = false
      }
    },
    beforeAvatarUpload (file) {
      console.log(file)
      let testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'jpg'
      const extension2 = testmsg === 'png'
      if (!extension && !extension2) {
        this.$message.error('上传图片只能是 JPG、PNG 格式!')
        return false
      }
      const isLtSize = file.size > 102400 / 2
      if (isLtSize) {
        this.$message.error('上传图片大小不能超过 50kb!')
        return false
      }
      return true
    },
    successFile (file) {
      console.log(file)
      this.ruleForm['logoAttachmentNos'] = []
      this.ruleForm.logoAttachmentNos.push(file.attachmentNos[0])
      // this.ruleForm.logoAttachmentUrl = file.attachmentDataList[0].attachmentUrl
    },
    successFileBig (file) {
      console.log(file)
      this.ruleForm['mainPicAttachmentNos'] = []
      this.ruleForm.mainPicAttachmentNos.push(file.attachmentDataList[0].attachmentUrl)
    },
    async checkData (val) {
      const { $api, $message } = this
      try {
        let {data} = await $api.product.productBrandDetail({brandNo: val})
        console.log(data)
        this.ruleForm = data
        this.fileList.push({url: data.logoAttachmentUrl})
        this.fileListBig.push({url: data.mainPicAttachmentUrl})
        // this.fileListBig.url = data.mainPicAttachmentUrl
        console.log(this.fileList)
      } catch (error) {
        $message.error(error.replyText)
      } finally {
        this.submitLoad = false
      }
    }
  }
}
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss" scoped>
  .c_tip {
    font-size: 12px;
    line-height: 25px;
  }
  .c_upload_tip {
    margin-left: 10px;
  }
  .c_wrap {
    width: 500px;
    margin: 20px 0;
  }
</style>
