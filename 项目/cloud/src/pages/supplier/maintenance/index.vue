
<template>
  <ui-container>
    <!--header start-->
    <div slot="header">
      <el-breadcrumb separator-class="el-icon-arrow-right" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">供应商管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/supplier' }">供应商列表</el-breadcrumb-item>
        <el-breadcrumb-item>修改供应商</el-breadcrumb-item>
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
              <el-form-item label="供应商等级：" label-width="120px" prop="supplierLevel">
                <el-select v-model="supplierInquiry.supplierLevel" placeholder="请选择" size="mini">
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
          <el-form-item label="供应商地址：" label-width="120px" prop="supplierAddress">
            <el-input   size="mini" v-model="supplierInquiry.supplierAddress" placeholder="请输入供应商地址" clearable></el-input>
          </el-form-item>
          <el-form-item label="合作状态：" label-width="120px" prop="supplierStatus">
            <el-radio-group v-model="supplierInquiry.supplierStatus">
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
              <el-form-item label="开户银行：" label-width="120px" prop="bankType">
                <el-select v-model="supplierInquiry.bankType" placeholder="请选择" size="mini" clearable>
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
              <el-form-item label="银行账号：" label-width="120px" prop="bankNumber">
                  <el-input   size="mini" v-model="supplierInquiry.bankNumber" placeholder="请输入银行账号" clearable></el-input>
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
          :file-list="fileList"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :on-error="handleError"
          :before-upload="beforeAvatarUpload"
          :data="pathType">
          <i class="el-icon-plus"></i>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过10Mkb!</div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt=''>
        </el-dialog>
        </div>
        <div class="c_item">
          <h3>联系信息</h3>
          <el-row v-for="(item,index) in supplierInquiry.supplierRecordList" :key="index">
            <el-col :span="12">
              <el-form-item label="联系人名称：" label-width="120px" :prop="`supplierRecordList[${index}].personName`" :rules="{ required: true, message: '请输入联系人名称', trigger: 'blur' }">
                <el-input   size="mini" v-model="item.personName" placeholder="请输入联系人名称" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系人手机：" label-width="120px" :prop="`supplierRecordList[${index}].personTel`" :rules="{ required: true,  message: '请输入手机号码', trigger: 'blur' }">
                <el-input   size="mini" v-model="item.personTel" placeholder="请输入联系人手机" clearable maxlength="11"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系人职位：" label-width="120px">
                <el-input   size="mini" v-model="item.personPost" placeholder="请输入联系人职位" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系人地址：" label-width="120px">
                <el-input   size="mini" v-model="item.personAddress" placeholder="请输入联系人地址" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-divider v-if="visibleDivider"></el-divider>
            </el-col>
          </el-row>
          <!-- <el-divider v-if="item.personTel"></el-divider> -->
          <el-row type="flex" justify="center">
            <el-col v-if="showNewlyAdded" :span="11" class="brand-reduce"><el-button type="text" icon="el-icon-remove-outline" @click="handlereduce">取消新增联系人</el-button></el-col>
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
                <el-input  size="mini" v-model="supplierInquiry.returnMobile" placeholder="请输入供应商收货人电话：" clearable maxlength="11"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="供应商退货地址：" label-width="120px" prop="returnAddress">
                <el-input   size="mini" v-model="supplierInquiry.returnAddress" placeholder="请输入供应商退货地址：" clearable ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <el-row type="flex" justify="center" v-if="supplierInquiry.status == 1">
          <el-col :span="6">
            <el-button type="primary" size="mini" @click="submitForm('ruleForm')">确认保存</el-button>
          </el-col>
        </el-row>
        <div class="c_item" v-else-if="supplierInquiry.status == 2">
          <h3>审核</h3>
          <el-form :model="form" :rules="rulesFormOut" ref="form" class="c_audit_form">
            <el-form-item label="审核状态：" label-width="120px">
              <el-radio-group v-model="form.audit">
                <el-radio :label="1">审核通过</el-radio>
                <el-radio :label="2">审核不通过</el-radio>
                <el-radio :label="4">拒绝</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="驳回详情：" label-width="120px" v-if="form.audit !== 1" prop="desc">
              <el-input type="textarea" v-model="form.desc" placeHolder="请输入不能超过20个字符的驳回原因" maxlength="20" show-word-limit size="mini"></el-input>
            </el-form-item>
            <el-row  type="flex" justify="center">
              <el-col :span="2">
                <el-button type="primary" @click="handleOutPush('form')" size="mini">确认审核</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-form>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible2" width="30%">
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
  name: 'supplierListMaintenance',
  data () {
    var validPhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入电话号码'))
      } else if (!isTel(value)) {
        callback(new Error('请输入正确的11位手机号码'))
      } else {
        callback()
      }
    }
    return {
      supplierInquiry: {
        supplierName: '',
        supplierLeve: '',
        supplierAddr: '',
        supplierStatus: '',
        supplierBank: '',
        supplierBankNo: '',
        supplierAttachmentList: [],
        personPost: '',
        personAddress: '',
        supplierNo: '',
        supplierRecordList: [],
        addAttachmentNoList: [],
        delAttachmentNoList: [],
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
      fileList: [],
      supplierList: [],
      uploadUrl: '/api/shopcrm/file/upload',
      pathType: {
        channel: 'ALIYUN',
        uploadKey: 'oss_supplier'
      },
      showNewlyAdded: false,
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
        returnPerson: [
          { required: true, message: '请输入供应商退货收货人', trigger: 'change' }
        ],
        returnMobile: [
          { required: true, message: '请输入供应商收货人电话', trigger: 'blur' }
        ],
        returnAddress: [
          { required: true, message: '请输入供应商退货地址', trigger: 'change' }
        ],
        supplierBankNo: [
          { required: true, validator: validBankNo, trigger: 'blur' }
        ],
        personName: [
          { required: true, message: '请输入联系人名称', trigger: 'blur' }
        ],
        personTel: [
          { required: true, validator: validPhone, trigger: 'blur' }
        ]
      },
      status: '', // 审核状态
      form: {
        audit: 1,
        desc: ''
      },
      rulesFormOut: {
        desc: [
          { required: true, message: '请输入驳回原因', trigger: 'blur' }
        ]
      },
      dialogVisible2: false,
      visibleDivider: false
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
    handleRemove (file, fileList) {
      // let fileList2 = this.$refs.upload.uploadFiles
      // console.log(fileList2)
      if (file.attNo) {
        this.supplierInquiry.delAttachmentNoList.push(file.uid)
      } else {
        console.log(file.response.attachmentNos[0])
        this.supplierInquiry.addAttachmentNoList = this.supplierInquiry.addAttachmentNoList.filter((item) => {
          return item !== file.response.attachmentNos[0]
        })
      }
    },
    // 上传成功
    handleSuccess (file) {
      this.$message({
        message: '上传图片成功',
        type: 'success'
      })
      this.supplierInquiry.addAttachmentNoList.push(file.attachmentNos[0])
      console.log(this.supplierInquiry.addAttachmentNoList)
    },
    // 上传失败
    handleError () {
      this.$message.error('上传图片失败')
    },
    // 新增联系人
    handleAdd () {
      this.visibleDivider = true
      let obj = {
        desc: '',
        personAddress: '',
        personName: '',
        personPost: '',
        personTel: '',
        recordNo: '',
        supplierNo: this.supplierInquiry.supplierNo,
        divider: 1
      }
      if (this.supplierInquiry.supplierRecordList.length === 2) {
        this.dialogVisible2 = true
        return
      }
      this.showNewlyAdded = true
      this.supplierInquiry.supplierRecordList.push(obj)
    },
    // 取消新增联系人
    handlereduce () {
      this.visibleDivider = true
      this.supplierInquiry.supplierRecordList.pop()
      if (this.supplierInquiry.supplierRecordList.length === 1) {
        this.showNewlyAdded = false
      }
    },
    // 提交
    submitForm (formName) {
      console.log(this.supplierInquiry)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!')
          let params = {
            supplierWebsit: '',
            supplierStatus: this.supplierInquiry.supplierStatus,
            supplierName: this.supplierInquiry.supplierName,
            supplierLevel: this.supplierInquiry.supplierLeve,
            supplierAddress: this.supplierInquiry.supplierAddr,
            personList: this.supplierInquiry.supplierRecordList,
            addAttachmentNoList: this.supplierInquiry.addAttachmentNoList,
            delAttachmentNoList: this.supplierInquiry.delAttachmentNoList,
            desc: '',
            bankType: this.supplierInquiry.supplierBank,
            bankNumber: this.supplierInquiry.supplierBankNo,
            attachmentNoList: this.supplierInquiry.attachmentNoList,
            supplierNo: this.supplierInquiry.supplierNo,
            status: this.form.audit,
            returnPerson: this.supplierInquiry.returnPerson,
            returnMobile: this.supplierInquiry.returnMobile,
            returnAddress: this.supplierInquiry.returnAddress
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
        const {transactionStatus} = await $api.supplier.supplierMaintenance(data)
        console.log(transactionStatus)
        if (transactionStatus.success) {
          this.$refs['ruleForm'].resetFields()
          this.supplierInquiry.attachmentNoList = []
          this.$message({
            message: '修改成功',
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
      this.supplierInquiry.attachmentNoList = []
      this.$refs.upload.clearFiles()
    },
    // 查询供应商数据
    async checkData (supplierNo) {
      const { $api, $message } = this
      try {
        let {data} = await $api.supplier.supplierDetail({supplierNo})
        this.supplierInquiry = data
        this.supplierInquiry.supplierNo = data.supplierNo
        this.supplierInquiry.personList = []
        data.supplierAttachmentList.forEach(item => { // ??
          this.fileList.push({
            status: 'success',
            uid: item.supplierAttrNo,
            url: item.attachmentUrl,
            attNo: item.supplierAttrNo
          })
        })
        // this.fileList = datas.supplierAttachmentList
      } catch (error) {
        $message.error(error.replyText)
      } finally {
        this.submitLoad = false
      }
    },
    // 审核提交
    handleOutPush (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.auditPush()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 提交审核
    async auditPush () {
      const { $api, $message } = this
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
        attachmentNoList: this.supplierInquiry.attachmentNoList,
        supplierNo: this.supplierInquiry.supplierNo,
        memo: this.form.desc,
        status: this.form.audit
      }
      console.log(params)
      try {
        await $api.supplier.supplierMaintenance(params)
        this.$refs['ruleForm'].resetFields()
        this.supplierInquiry.attachmentNoList = []
        this.$refs.upload.clearFiles()
        this.form.audit = 1
        this.form.desc = ''
        let path = '/supplier'
        this.$router.push({
          path: path
        })
      } catch (error) {
        $message.error(error.replyText)
      } finally {
        this.submitLoad = false
      }
    },
    beforeAvatarUpload (file, fileList) {
      console.log(111111)
      let testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'jpg'
      const extension2 = testmsg === 'png'
      if (!extension && !extension2) {
        this.$message.error('上传图片只能是 JPG、PNG 格式!')
        // this.showList = false
        // // 手动清楚图片
        // fileList.splice(0)
        return false
      }
      const isLtSize = file.size / 1024 > 10240
      if (isLtSize) {
        this.$message.error('上传图片大小不能超过 10M!')
        // this.showList = false
        // fileList.splice(0)
        return false
      }
      // this.showList = true
      return true
    }
  },
  mounted () {
    let params = this.$route.query
    this.checkData(params.supplierNo)
  }
}
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss" scoped>
.c_form {
  width: 800px;
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
.lianshang-form .c_audit_form .el-form-item {
  margin-bottom: 30px !important;
}
.c_item{
  .el-row{
    &:nth-last-child(2){
      >div:last-of-type{
       display: none;
      }
    }
  }
}
// .el-row
</style>
