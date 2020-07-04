
<template>
  <ui-container>
    <div slot="header">
      <el-breadcrumb separator-class="el-icon-arrow-right" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">商品管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/product/parameter/group' }">规格组列表</el-breadcrumb-item>
        <el-breadcrumb-item>修改规格组</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="c_wrap" prop="parameterModify">
      <el-form :model="parameterModify" :rules="rules" ref="parameterModify" label-width="120px">
        <el-form-item label="规格组名称" prop="groupName">
          <el-input v-model="parameterModify.groupName" size="mini" placeholder="请输入规格组名称"></el-input>
        </el-form-item>
        <el-form-item label="关联分类" prop="categoryNo">
          <div class="add_tag">
           <el-button type="primary" icon="el-icon-check" @click="showDisTree" size="mini">关联分类</el-button>
            <el-tree
              v-show="disTree"
              class="tree-select"
              node-key="categoryNo"
              lazy
              @check-change="selectCategory"
              :props="treeProps"
              :render-content="renderContent"
              ref="tree"
              :load="loadChild">
              </el-tree>
          </div>
          <div class="select_tag">
           <el-tag
            :key="category.categoryNo"
            v-for="category in parameterModify.categoryNo"
            closable
            size="medium"
            @close="handleCloseCategory(tag)"
            :disable-transitions="false">
            {{category.categoryName}}
          </el-tag>
          </div>
        </el-form-item>
        <div>
        </div>
        <el-form-item label="规格组参数"  prop="groupParamNoList">
          <el-select v-model="parameterModify.groupParamNoList" placeholder="请选择" size="mini" multiple>
            <el-option
              v-for="(item,index) in groupClassifyList"
              :key="index"
              :label="item.paramName"
              :value="item.paramNo">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="featureModify('parameterModify')" size="mini">提交</el-button>
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
      treeProps: {
        children: 'children',
        label: 'categoryName',
        isLeaf: 'leaf'
      },
      disFeature: false,
      feature: '',
      disTree: false,
      // 商品分类参数
      parameterModify: {
        categoryNo: [],
        groupName: '',
        groupParamNoList: '',
        categoryNoList: [],
        groupNo: ''
      },
      groupClassifyList: [], // 规格参数
      ruleForm: {
        groupClassify: ''
      },
      rules: {
        groupName: [
          { required: true, message: '请输入规格组名称', trigger: 'blur' }
        ],
        categoryNo: [
          { required: true, message: '请选择分类', trigger: 'blur' }
        ],
        groupParamNoList: [
          { required: true, message: '请选择参数', trigger: 'blur' }
        ]
      },
      // 商品分类参数
      classifyData: {
        categoryLevel: '',
        categoryName: '',
        dis: '',
        page: {
          count: 0,
          pageSize: 10,
          pageNum: 1,
          orderBy: '',
          returnCount: true,
          offset: 0,
          limit: 0
        }
      },
      classifyListChoose: [],
      paramsData: ''
    }
  },
  mounted () {
    let params = this.$route.query
    this.paramsData = params
    this.checkInfo(params.brandNo)
    this.groupInitData()// 参数列表
  },
  methods: {
    // 提交
    async featureModify (ruleForm) {
      const { $api, $message, parameterModify } = this
      parameterModify.categoryNo.map(item => {
        parameterModify.categoryNoList.push(item.categoryNo)
        parameterModify.categoryNoList = Array.from(new Set(parameterModify.categoryNoList))
      })
      this.$refs[ruleForm].validate(async (valid) => {
        if (valid) {
          try {
            let {transactionStatus} = await $api.product.productParameterMaintenance(this.parameterModify)
            if (!transactionStatus.success) {
              $message.error('修改失败:' + transactionStatus.replyText)
            } else {
              $message.success('修改成功')
              this.$router.push('/product/parameter/group')
            }
          } catch (error) {
            $message.error(error.replyText)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleCloseFeature (tag) {
      this.parameterModify.txtVals.splice(this.parameterModify.txtVals.indexOf(tag), 1)
    },
    handleCloseCategory (tag) {
      this.parameterModify.categoryNo.splice(this.parameterModify.categoryNo.indexOf(tag))
    },
    showFeatureInput () {
      this.disFeature = true
      this.$nextTick(_ => {
        this.$refs.featureInput.$refs.input.focus()
      })
    },
    showDisTree () {
      this.disTree = true
    },
    handleFeatureConfirm () {
      let feature = this.feature
      if (feature) {
        this.parameterModify.txtVals.push(feature)
      }
      this.disFeature = false
      this.feature = ''
    },
    async loadChild (node, resolve) {
      let categoryInquiry = {
        parentCategoryNo: node.key != null ? node.key : ''
      }
      const { $api, $message } = this
      try {
        let {dataList} = await $api.product.productCategoryInquiry(categoryInquiry)
        return resolve(dataList)
      } catch (error) {
        $message.error(error.replyText)
      } finally {
      }
    },
    selectCategory (data) {
      let temp = {
        categoryName: data.categoryName,
        categoryNo: data.categoryNo
      }
      let index = this.parameterModify.categoryNo.findIndex((item) => item.categoryNo === temp.categoryNo)
      if (index !== -1) {
        return null
      }
      this.parameterModify.categoryNo.push(temp)
    },
    renderContent (h, { node, data, store }) {
      return (
        <span class="select_btn">
          <span>{node.label}</span>
          <span>
            <el-button size="mini" icon="el-icon-plus" type="text" on-click={ () => this.selectCategory(data) }>选择</el-button>
          </span>
        </span>)
    },
    // 参数列表
    async groupInitData () {
      const { $api, $message } = this
      try {
        let {dataList} = await $api.product.categoryParamInquiry(this.classifyData)
        this.groupClassifyList = Object.freeze(dataList)
      } catch (error) {
        $message.error(error.replyText)
      } finally {
        this.submitLoad = false
      }
    },
    // 查询数据
    async checkInfo (id) {
      const { $api, $message } = this
      try {
        let {data} = await $api.product.productParameterDetail({groupNo: id})
        let temp = []
        data.paramlist.map(item => {
          temp.push(item.paramNo)
        })
        this.parameterModify.groupName = data.groupName
        this.parameterModify.categoryNo = data.categoryList
        this.parameterModify.groupParamNoList = temp
        this.parameterModify.groupNo = data.groupNo
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
  .maintenance{
    margin-left: -61px;
  }
</style>
