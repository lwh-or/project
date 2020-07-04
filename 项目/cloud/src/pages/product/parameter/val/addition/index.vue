
<template>
  <ui-container>
    <div slot="header">
      <el-breadcrumb separator-class="el-icon-arrow-right" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">商品管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/product/parameter/val'}">参数值</el-breadcrumb-item>
        <el-breadcrumb-item>参数值新增</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="c_wrap" label="参数名称"  prop="addParamForm">
      <el-form  :rules="rules" :model="addParamForm"  ref="addParamForm" label-width="120px">
        <el-form-item label="参数名称"   prop="paramName">
          <el-input size="mini" v-model="addParamForm.paramName" placeholder="请输入参数名称"></el-input>
        </el-form-item>
         <el-form-item label="参数类型:" label-width="120px">
            <el-radio-group  size="mini" v-model="addParamForm.paramType">
              <el-radio :label="1">普通</el-radio>
              <el-radio :label="2">特殊</el-radio>
            </el-radio-group>
          </el-form-item>
        <el-form-item label="参数使用方式:" label-width="120px">
            <el-radio-group  size="mini" v-model="addParamForm.useType">
              <el-radio :label="1">单选</el-radio>
              <el-radio :label="2">多选</el-radio>
              <el-radio :label="3">用户自定义</el-radio>
            </el-radio-group>
          </el-form-item>
           <el-form-item label="参数" label-width="120px">
            <el-input type="textarea" :rows="6" maxlength="200"  show-word-limit  v-model="addParamForm.paramVals" placeholder="参数之间请用英文逗号隔开" ></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary"    @click="paramAddition('addParamForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </ui-container>
</template>
<script type="text/javascript">
export default {
  name: 'ProductParameterAddition',
  data () {
    return {
      addParamForm: {
        paramName: '',
        paramVals: '',
        paramType: '',
        useType: '',
        groupList: []
      },
      // 校验
      rules: {
        paramName: [
          { required: true, message: '请输入参数名', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    // 提交
    async paramAddition (ruleForm) {
      const { $api, $message } = this
      this.$refs[ruleForm].validate(async (valid) => {
        if (valid) {
          try {
            const {transactionStatus} = await $api.product.categorySpecParamsAddition(this.addParamForm)
            if (!transactionStatus.success) {
              $message.error('新增失败:' + transactionStatus.replyText)
            } else {
              $message.success('新增成功')
              let path = '/product/parameter/val'
              this.$router.push({
                path: path
              })
            }
          } catch (error) {
            $message.error(error.replyText)
          } finally {
            this.submitLoad = false
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
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
  .el-form-item {
    margin-bottom: 10px;
  }
</style>
