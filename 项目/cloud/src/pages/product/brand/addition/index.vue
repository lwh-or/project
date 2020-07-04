
<template>
  <ui-container>
    <div slot="header">
      <el-breadcrumb separator-class="el-icon-arrow-right"
                     separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">商品管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/product/brand' }">品牌管理</el-breadcrumb-item>
        <el-breadcrumb-item>添加品牌</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- <div slot="search">
      <el-card class="box-card">
          <el-form :model="form" class="lianshang-form">
            <el-row >
              <el-col  :md="6" >
               <el-form-item label="申请人" :label-width="formLabelWidth">
                  <el-input  disable size="mini" v-model="form.company" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col  :md="6" >
               <el-form-item label="申请人" :label-width="formLabelWidth">
                  <el-input  disable size="mini" v-model="form.company" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col  :md="6" >
                <el-form-item label="申请日期" :label-width="formLabelWidth">
                    <div class="block">
                      <el-date-picker
                        size="small"
                        v-model="form.time"
                        :default-time="['12:00:00']">
                      </el-date-picker>
                    </div>
                  </el-form-item>
              </el-col>
              <el-col  :md="6" >
                <el-form-item label="单据状态" :label-width="formLabelWidth">
                  <el-select size="small" v-model="form.documentsState" placeholder="请选择单据状态">
                    <el-option label="全部" value="shanghai"></el-option>
                    <el-option label="保存" value="Save"></el-option>
                    <el-option label="审核" value="Audited"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="action_content">
                <div class="default_action">
                  <el-button type="" size="mini" icon="el-icon-plus">新增</el-button>
                  <el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
                  <el-button type="primary" size="mini" icon="el-icon-search">搜索</el-button>
                </div>
          </div>
        </el-card>
    </div> -->
    <div class="c_wrap">
      <el-form :model="ruleForm"
               :rules="rules"
               ref="ruleForm"
               label-width="120px">
        <!-- <el-form-item label="品牌ID" prop="brandNo">
          <el-input v-model="ruleForm.brandNo" disabled></el-input>
        </el-form-item> -->
        <el-form-item label="品牌名称"
                      prop="brandName">
          <el-input v-model="ruleForm.brandName"
                    size="mini"></el-input>
        </el-form-item>
        <el-form-item label="品牌首字母"
                      prop="startLetter">
          <el-input v-model="ruleForm.startLetter"
                    size="mini"></el-input>
        </el-form-item>
        <el-form-item label="品牌中文名"
                      prop="brandChineseName">
          <el-input v-model="ruleForm.brandChineseName"
                    size="mini"></el-input>
        </el-form-item>
        <el-form-item label="产地"
                      prop="madeIn">
          <el-input v-model="ruleForm.madeIn"
                    size="mini"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO"
                      prop="brandLogo">
          <el-upload class="upload-demo"
                     :action="uploadUrl"
                     :before-upload="beforeAvatarUpload"
                     :data="pathType"
                     :on-success="successFile"
                     list-type="picture"
                     :limit="1">

            <el-button size="small"
                       type="primary"
                       icon="el-icon-upload">选择上传文件</el-button>
            <span slot="tip"
                  class="el-upload__tip c_upload_tip">只能上传jpg/png文件，且不超过50kb</span>
          </el-upload>
        </el-form-item>
        <!-- <el-form-item label="品牌专区大图"
                      prop="brandImage">
          <el-upload class="upload-demo"
                     :action="uploadUrl"
                     :before-upload="beforeAvatarUpload"
                     :on-success="successFileBig"
                     :data="pathType"
                     list-type="picture"
                     :limit="1">
            <el-button size="small"
                       type="primary"
                       icon="el-icon-upload">选择上传文件</el-button>
            <span slot="tip"
                  class="el-upload__tip c_upload_tip">只能上传jpg/png文件，且不超过50kb</span>
          </el-upload>
        </el-form-item> -->
        <el-form-item label="品牌故事"
                      prop="brandHistory">
          <el-input type="textarea"
                    v-model="ruleForm.brandHistory"
                    :rows="6"
                    maxlength="200"
                    show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="排序"
                      prop="pos">
          <el-input v-model.number="ruleForm.pos"
                    size="mini"></el-input>
        </el-form-item>
        <!-- <el-form-item label="是否显示"
                      prop="dis">
          <el-radio-group v-model="ruleForm.dis">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
          </el-radio-group>
          <div class="c_tip">当品牌下还没有商品的时候，分类页的品牌区将不会显示该品牌</div>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary"
                     @click="submitForm('ruleForm')"
                     size="mini">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </ui-container>
</template>
<script type="text/javascript">
// var validImage = (rule, value, callback) => {
//   console.log(value)
//   if (!value) {
//     callback(new Error('请上传Logo图片'))
//   } else {
//     callback()
//   }
// }
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
      ruleForm: {
        brandChineseName: '',
        brandDesc: '', // 描述
        brandHistory: '', // 故事
        brandName: '',
        brandShortName: '',
        brandWebsite: '',
        dis: 1,
        logoAttachmentNos: [],
        madeIn: '',
        mainPicAttachmentNos: [],
        pos: '',
        startLetter: ''
      },
      files: [],
      rules: {
        brandEnName: [
          { required: true, message: '请输入品牌英文名称', trigger: 'blur' }
        ],
        brandName: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' },
          { min: 1, max: 20, message: '品牌名称不能超过20个字', trigger: 'blur' }
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
        //   { required: true, validator: validImage, trigger: 'blur' }
        // ]
      }
    }
  },
  mounted () {
    // console.log(process.env.API_ROOT)
  },
  methods: {
    // 提交
    submitForm (formName) {
      if (this.ruleForm.logoAttachmentNos.length === 0) {
        return this.$message.error('请上传Logo图片')
      }
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
      console.log(this.ruleForm)
      const { $api, $message } = this
      try {
        let { transactionStatus } = await $api.product.productBrandAddition(this.ruleForm)
        if (transactionStatus.success) {
          $message.success('新增成功')
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
        $message.error(error.replyText)
      } finally {
        this.submitLoad = false
      }
    },
    beforeAvatarUpload (file) {
      let testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'jpg'
      const extension2 = testmsg === 'png'
      if (!extension && !extension2) {
        this.$message.error('上传图片只能是 JPG、PNG 格式!')
        return false
      }
      const isLtSize = file.size / 1024 > 50
      if (isLtSize) {
        this.$message.error('上传图片大小不能超过 50kb!')
        return false
      }
      return true
    },
    successFile (file) {
      this.ruleForm.logoAttachmentNos = file.attachmentNos
    },
    successFileBig (file) {
      this.ruleForm.mainPicAttachmentNos = file.attachmentNos
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
