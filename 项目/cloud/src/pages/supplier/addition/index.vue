
<template>
  <ui-container>
    <!--header start-->
    <div slot="header">
      <el-breadcrumb separator-class="el-icon-arrow-right" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">供应商管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/supplier' }">供应商列表</el-breadcrumb-item>
        <el-breadcrumb-item>添加供应商</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="table_wrapper c_wrapper">
      <el-form :model="supplierInquiry" class="lianshang-form c_form" :rules="rules" ref="ruleForm">
        <div class="c_item">
          <h3>基本信息</h3>
          <el-row>
            <el-col :span="12">
              <el-form-item label="供应商名称：" label-width="120px" prop="supplierName">
                <el-input   size="mini" v-model="supplierInquiry.supplierName" placeholder="请输入供应商名称" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="供应商等级：" label-width="120px" prop="supplierLeve">
                <el-select v-model="supplierInquiry.supplierLeve" placeholder="请选择供应商等级" size="mini">
                  <el-option
                    v-for="item in supplierLeveList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="供应商地址：" label-width="120px" prop="supplierAddr">
            <el-input   size="mini" v-model="supplierInquiry.supplierAddr" placeholder="请输入供应商地址" clearable></el-input>
          </el-form-item>
          <el-form-item label="合作状态：" label-width="120px" prop="supplierStatus">
            <el-radio-group v-model="supplierInquiry.supplierStatus" size="mini">
              <el-radio :label="0">未开始合作</el-radio>
              <el-radio :label="1">合作中</el-radio>
              <el-radio :label="2">停止合作</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <div class="c_item">
          <h3>转账信息</h3>
          <el-row>
            <el-col :span="12">
              <el-form-item label="开户银行：" label-width="120px" prop="supplierBank">
                <el-select v-model="supplierInquiry.supplierBank" placeholder="请选择" size="mini" clearable>
                  <el-option
                    v-for="item in supplierBankList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="银行账号：" label-width="120px" prop="supplierBankNo">
                  <el-input   size="mini" v-model="supplierInquiry.supplierBankNo" placeholder="请输入银行账号" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="c_item">
          <h3>资质凭证</h3>
          <el-upload
          ref="upload"
          :action="uploadUrl"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :on-error="handleError"
          :data="pathType"
          :before-upload="beforeAvatarUpload"
          >
          <i class="el-icon-plus"></i>
        </el-upload>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过10M</div>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        </div>
        <div class="c_item">
          <h3>联系信息</h3>
          <el-row>
            <el-col :span="12">
              <el-form-item label="联系人名称：" label-width="120px" prop="supplierContantName">
                <el-input   size="mini" v-model="supplierInquiry.supplierContantName" placeholder="请输入联系人名称" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系人手机：" label-width="120px" prop="supplierContantPhone">
                <el-input   size="mini" v-model="supplierInquiry.supplierContantPhone" placeholder="请输入联系人手机" clearable maxlength="11"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系人职位：" label-width="120px">
                <el-input   size="mini" v-model="supplierInquiry.personAddress" placeholder="请输入联系人职位" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系人地址：" label-width="120px">
                <el-input   size="mini" v-model="supplierInquiry.personPost" placeholder="请输入联系人地址" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider v-if="showNewlyAdded"></el-divider>
          <el-row v-if="showNewlyAdded">
            <el-col :span="12">
              <el-form-item label="联系人名称：" label-width="120px" prop="supplierContantName">
                <el-input   size="mini" v-model="supplierInquiry.supplierContantName2" placeholder="请输入联系人名称" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系人手机：" label-width="120px" prop="supplierContantPhone">
                <el-input   size="mini" v-model="supplierInquiry.supplierContantPhone2" placeholder="请输入联系人手机" clearable maxlength="11"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系人职位：" label-width="120px">
                <el-input   size="mini" v-model="supplierInquiry.personAddress2" placeholder="请输入联系人职位" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系人地址：" label-width="120px">
                <el-input   size="mini" v-model="supplierInquiry.personPost2" placeholder="请输入联系人地址" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-col v-if="showNewlyAdded" :span="1" class="brand-reduce"><el-button type="text" icon="el-icon-remove-outline" @click="handlereduce">取消新增联系人</el-button></el-col>
            <el-col :span="1" class="brand-add"><el-button type="text" icon="el-icon-circle-plus-outline" @click="handleAdd">新增联系人</el-button></el-col>
          </el-row>
        </div>
        <div class="c_item">
          <h3>退货信息</h3>
          <el-row>
            <el-col :span="12">
              <el-form-item label="收货人：" label-width="120px" prop="returnPerson">
                <el-input   size="mini" v-model="supplierInquiry.returnPerson" placeholder="请输入供应商退货收货人：" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="收货电话号码：" label-width="120px" prop="returnMobile">
                <el-input   size="mini" v-model="supplierInquiry.returnMobile" placeholder="请输入供应商收货人电话：" clearable maxlength="11"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="供应商退货地址：" label-width="120px" prop="returnAddress">
                <el-input   size="mini" v-model="supplierInquiry.returnAddress" placeholder="请输入供应商退货地址：" clearable ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <el-row type="flex" justify="center">
            <el-col :span="6">
              <el-button type="primary" size="mini" plain @click="resetForm('ruleForm')">取消</el-button>
              <el-button type="primary" size="mini" @click="submitForm('ruleForm')">确认保存</el-button>
            </el-col>
        </el-row>
      </el-form>
    </div>
    <el-dialog
    title="提示"
    :visible.sync="dialogVisible2"
    width="30%"
    >
    <span>联系人最多添加为两个</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible2 = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
    </span>
    </el-dialog>
     <!--table start-->
  </ui-container>
</template>
<script type="text/javascript">
import {isTel, isBankNo} from '../../../common/verify.js'
var validPhone = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入电话号码'))
  } else if (!isTel(value)) {
    callback(new Error('请输入正确的11位手机号码'))
  } else {
    callback()
  }
}
var validBankNo = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入银行卡账号'))
  } else if (!isBankNo(value)) {
    callback(new Error('请输入正确的银行卡账号'))
  } else {
    callback()
  }
}
export default {
  name: 'supplierList',
  data () {
    return {
      supplierInquiry: {
        supplierName: '',
        supplierLeve: 1,
        supplierAddr: '',
        supplierStatus: '',
        supplierBank: '',
        supplierBankNo: '',
        qualifications: [],
        supplierContantName: '',
        supplierContantPhone: '',
        personPost: '',
        personAddress: '',
        supplierContantName2: '',
        supplierContantPhone2: '',
        personPost2: '',
        personAddress2: '',
        returnPerson: '',
        returnMobile: '',
        returnAddress: ''
      },
      supplierLeveList: [
        {value: 1, label: 'A'},
        {value: 2, label: 'B'},
        {value: 3, label: 'C'},
        {value: 4, label: 'D'}
      ],
      supplierBankList: [
        {value: 0, label: '对公账号'},
        {value: 1, label: '个人账号'}
      ],
      supplierList: [],
      uploadUrl: '/api/shopcrm/file/upload',
      pathType: {
        channel: 'ALIYUN',
        uploadKey: 'oss_supplier'
      },
      dialogImageUrl: '',
      dialogVisible: false,
      d: false,
      contactList: [1],
      rules: {
        supplierName: [
          { required: true, message: '请输入供应商名称', trigger: 'blur' }
        ],
        supplierLeve: [
          {required: true, message: '请选择供应商等级', trigger: 'change'}
        ],
        supplierAddr: [
          { required: true, message: '请输入供应商地址', trigger: 'blur' },
          { min: 1, max: 30, message: '供应商地址不能超过30个字', trigger: 'blur' }
        ],
        supplierStatus: [
          { required: true, message: '请选择合作状态', trigger: 'change' }
        ],
        supplierBank: [
          { required: true, message: '请输入开户银行', trigger: 'blur' }
        ],
        supplierBankNo: [
          { required: true, validator: validBankNo, trigger: 'blur' }
        ],
        supplierContantName: [
          { required: true, message: '请输入联系人名称', trigger: 'blur' }
        ],
        supplierContantPhone: [
          { required: true, validator: validPhone, trigger: 'blur' }
        ],
        returnPerson: [
          { required: true, message: '请输入供应商退货收货人', trigger: 'blur' }
        ],
        returnMobile: [
          { required: true, message: '请输入供应商收货人电话', trigger: 'blur' }
        ],
        returnAddress: [
          { required: true, message: '请输入供应商退货地址', trigger: 'blur' }
        ]
      },
      showNewlyAdded: false,
      dialogVisible2: false
    }
  },
  filters: {
    typeStatus (val) {
      return val === 1 ? '已审核' : '待审核'
    }
  },
  methods: {
    // 看大图
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 删除图片
    handleRemove () {
      // console.log(fileList)
      let fileList = this.$refs.upload.uploadFiles
      console.log(fileList)
      let temp = []
      fileList.map(item => {
        temp.push(item.response.attachmentDataList[0].attachmentNo)
      })
      this.supplierInquiry.qualifications = temp
    },
    // 上传成功
    handleSuccess (file) {
      this.$message({
        message: '上传图片成功',
        type: 'success'
      })
      this.supplierInquiry.qualifications.push(file.attachmentNos[0])
    },
    beforeAvatarUpload (file, fileList) {
      let testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'jpg'
      const extension2 = testmsg === 'png'
      if (!extension && !extension2) {
        this.$message.error('上传图片只能是 JPG、PNG 格式!')
        this.showList = false
        // 手动清楚图片
        fileList.splice(0)
        return false
      }
      const isLtSize = file.size / 1024 > 10000
      if (isLtSize) {
        this.$message.error('上传图片大小不能超过 500kb!')
        this.showList = false
        fileList.splice(0)
        return false
      }
      this.showList = true
      return true
    },
    // 上传失败
    handleError () {
      this.$message.error('上传图片失败')
    },
    // 新增联系人
    handleAdd () {
      if (this.showNewlyAdded) {
        this.dialogVisible2 = true
      }
      this.showNewlyAdded = true
    },
    // 取消新增联系人
    handlereduce () {
      this.showNewlyAdded = false
    },
    // 提交
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!')
          let params = {
            supplierWebsit: '',
            supplierStatus: this.supplierInquiry.supplierStatus,
            supplierName: this.supplierInquiry.supplierName,
            supplierLevel: this.supplierInquiry.supplierLeve,
            supplierAddress: this.supplierInquiry.supplierAddr,
            personList: [{
              desc: '',
              personAddress: this.supplierInquiry.personAddress,
              personName: this.supplierInquiry.supplierContantName,
              personPost: this.supplierInquiry.personPost,
              personTel: this.supplierInquiry.supplierContantPhone,
              recordNo: '',
              supplierNo: ''
            }],
            desc: '',
            bankType: this.supplierInquiry.supplierBank,
            bankNumber: this.supplierInquiry.supplierBankNo,
            qualifications: this.supplierInquiry.qualifications,
            returnPerson: this.supplierInquiry.returnPerson,
            returnAddress: this.supplierInquiry.returnAddress,
            returnMobile: this.supplierInquiry.returnMobile
          }
          const personData = {
            desc: '',
            personAddress: this.supplierInquiry.personAddress2,
            personName: this.supplierInquiry.supplierContantName2,
            personPost: this.supplierInquiry.personPost2,
            personTel: this.supplierInquiry.supplierContantPhone2,
            recordNo: '',
            supplierNo: ''
          }
          if (this.showNewlyAdded) {
            params.personList.push(personData)
          }
          this.pushData(params)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 提交数据
    async pushData (data) {
      const { $api, $message } = this
      try {
        const {transactionStatus} = await $api.supplier.supplierAddition(data)
        if (transactionStatus.success) {
          this.$refs['ruleForm'].resetFields()
          this.supplierInquiry.qualifications = []
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.$refs.upload.clearFiles()
          let path = '/supplier'
          this.$router.push({
            path: path
          })
        } else {
          this.$message(transactionStatus.replyText)
        }
      } catch (error) {
        $message.error(error.replyText)
      } finally {
        this.submitLoad = false
      }
    },
    // 取消
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.supplierInquiry.qualifications = []
      this.$refs.upload.clearFiles()
    }
  }
}
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss" scoped>
.c_form {
  width: 100%;
  .c_item {
    padding: 20px;
    border: 1px solid #e4e4e4;
    box-sizing: border-box;
    margin-bottom: 20px;
  }
  h3{
    font-size: 18px;
    margin-bottom: 20px;
  }
}
.c_wrapper {
  padding-bottom: 20px;
}
/deep/ .brand-reduce{
  margin-right: 150px;
}
/deep/ .brand-add{
  margin-right: 330px;
}
</style>
