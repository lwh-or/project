
<template>
  <ui-container>
    <div slot="header">
      <el-breadcrumb separator-class="el-icon-arrow-right"
                     separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">商品管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/system/user' }">用户列表</el-breadcrumb-item>
        <el-breadcrumb-item>添加用户</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="c_wrap">
      <el-form label-width="120px"
               :rules="rules"
               ref="ruleForm"
               :model="userAddition">
        <el-form-item label="用户名称"
                      prop="userName">
          <el-input size="mini"
                    v-model="userAddition.userName"
                    placeholder="请输入用户名称"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称"
                      prop="name">
          <el-input size="mini"
                    v-model="userAddition.name"
                    placeholder="请输入用户昵称"></el-input>
        </el-form-item>
        <el-form-item label="手机号码"
                      prop="tel">
          <el-input size="mini"
                    v-model="userAddition.tel"
                    placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="邮箱"
                      prop="mail">
          <el-input size="mini"
                    v-model="userAddition.mail"
                    placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="用户类型:" prop="userType">
            <el-select v-model="userAddition.userType"  placeholder="请选用户等级">
              <el-option label="普通会员" value="1"></el-option>
              <el-option label="黄金会员" value="2"></el-option>
              <el-option label="砖石会员" value="3"></el-option>
            </el-select>
          </el-form-item>
        <el-form-item label="用户状态" prop="status">
          <el-radio v-model="userAddition.status" :label="1">可用</el-radio>
          <el-radio v-model="userAddition.status" :label="2">禁用</el-radio>
        </el-form-item>
        <el-form-item label="用户头像" >
               <el-upload class="upload-demo"
                     action="/none"
                     list-type="picture"
                     :multiple="false"
                     :before-upload="beforeAvatarUpload"
                     :on-change="changeFile"
                     :auto-upload="false"
                     :on-exceed="fileMaxTip"
                     :limit="1"
                     ref="upload"
                     >
            <el-button size="small"
                       type="primary"
                       icon="el-icon-upload">选择上传文件</el-button>
            <span slot="tip"
                  class="el-upload__tip c_upload_tip">只能上传jpg/png文件，且不超过500kb</span>
                  </el-upload>
        </el-form-item>
        <el-form-item label="用户备注">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入备注"
            v-model="userAddition.memo">
          </el-input>
        </el-form-item>
        <el-row type="flex" justify="center">
          <el-col :span="6">
            <el-button type="primary" size="mini" plain @click="$router.push('/system/user')">取消</el-button>
            <el-button type="primary" size="mini" @click="submitForm('ruleForm')">确认保存</el-button></el-col>
        </el-row>
      </el-form>
    </div>
  </ui-container>
</template>
<script type="text/javascript">
import {isTel, isMail} from '../../../../common/verify.js'
var validPhone = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入电话号码'))
  } else if (!isTel(value)) {
    callback(new Error('请输入正确的11位手机号码'))
  } else {
    callback()
  }
}
var validMail = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入邮箱号码'))
  } else if (!isMail(value)) {
    callback(new Error('请输入正确的邮箱号码'))
  } else {
    callback()
  }
}
export default {
  name: 'ProductAddition',
  data () {
    return {
      radio: 0,
      userAddition: {
        mail: '',
        memo: '',
        name: '',
        status: 1,
        tel: '',
        userName: '',
        userType: '',
        avatarAttachmentNos: [] // 头像
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名称', trigger: 'blur' }
        ],
        name: [
          {required: true, message: '请选输入用户昵称', trigger: 'blur'}
        ],
        tel: [
          { required: true, validator: validPhone, trigger: 'blur' }
        ],
        userType: [
          { required: true, message: '请选择用户类型', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择用户状态', trigger: 'change' }
        ],
        mail: [
          { required: true, validator: validMail, trigger: 'blur' }
        ]
      },
      fileList: []
    }
  },
  methods: {
    submitForm (ruleForm) {
      this.$refs.upload.submit()
      this.$refs[ruleForm].validate(async (valid) => {
        console.log(valid)
        if (valid) {
          this.pushFileData()
        } else {
          console.log(111)
        }
      })
    },
    async pushFileData () {
      if (this.fileList.length > 0) {
        console.log(this.fileList)
        let formData = new FormData()
        formData.append('file', this.fileList[0])
        formData.append('channel', 'ALIYUN')
        formData.append('uploadKey', 'oss_avatar')
        console.log(formData)
        const { attachmentNos } = await this.$api.advert.shopcrmFileUpload(formData)
        this.userAddition.avatarAttachmentNos.push(attachmentNos[0])
      }
      const { $api, $message } = this
      try {
        let { transactionStatus } = await $api.user.addition(this.userAddition)
        console.log(transactionStatus)
        if (!transactionStatus.success) {
          $message.error('新增失败:' + transactionStatus.replyText)
        } else {
          $message.success('新增成功')
          this.$router.push('/system/user')
        }
      } catch (error) {
        $message.error(error.replyText)
      }
    },
    beforeAvatarUpload (file, fileList) {
      let testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'jpg'
      const extension2 = testmsg === 'png'
      if (!extension && !extension2) {
        this.$message.error('上传图片只能是 JPG、PNG 格式!')
        // 手动清楚图片
        fileList.splice(0)
        return false
      }
      const isLtSize = file.size / 1024 > 500
      if (isLtSize) {
        this.$message.error('上传图片大小不能超过 500kb!')
        fileList.splice(0)
        return false
      }
      return true
    },
    changeFile (file, fileList) {
      console.log(file.raw)
      this.fileList.push(file.raw)
    },
    fileMaxTip () {
      const { $message } = this
      $message.error('分类图标只能选择一张,请删除后添加!')
    }
  },
  mounted () {
  }
}
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss" scoped>
.c_tip {
  font-size: 12px;
  line-height: 18px;
  color: #999;
}
.c_upload_tip {
  margin-left: 10px;
}
.c_wrap {
  width: 600px;
  margin: 20px 0;
}
.c_wrap >>> .el-input--mini .el-input__inner {
  width: 300px;
}
.c_tree_node {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
</style>
