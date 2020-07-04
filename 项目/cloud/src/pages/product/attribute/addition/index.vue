
<template>
  <ui-container>
    <div slot="header">
      <el-breadcrumb separator-class="el-icon-arrow-right"
                     separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">商品管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/product/attribute' }">属性列表</el-breadcrumb-item>
        <el-breadcrumb-item>添加属性</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="c_wrap">
      <el-form label-width="120px"
               :rules="rules"
               ref="attributeAddition"
               :model="attributeAddition">
        <el-form-item label="属性名称"
                      prop="keyName">
          <el-input size="mini"
                    v-model="attributeAddition.keyName"
                    placeholder="请输入属性名称"></el-input>
        </el-form-item>
        <el-form-item label="是否允许用户输入"
                      prop="automatic">
          <el-radio-group v-model="attributeAddition.automatic">
             <el-radio label="Y">是</el-radio>
            <el-radio label="N">否</el-radio>
          </el-radio-group>

        </el-form-item>
        <el-form-item label="属性值">
          <div class="add_tag">
            <el-input class="input"
                      v-if="disFeature"
                      v-model="feature"
                      ref="featureInput"
                      size="mini"
                      @blur="handleFeatureConfirm"
                      @keyup.enter.native="handleFeatureConfirm">
            </el-input>
            <el-button v-else
                       type="primary"
                       size="mini"
                       @click="showFeatureInput"
                       class="btn">+添加属性值</el-button>
          </div>
          <div class="select_tag">
            <el-tag :key="tag"
                    v-for="tag in attributeAddition.txtVals"
                    closable
                    size="medium"
                    @close="handleCloseFeature(tag)"
                    :disable-transitions="false">
              {{tag}}
            </el-tag>
          </div>
        </el-form-item>
        <el-form-item label="关联分类">
          <div class="add_tag">
            <el-button type="primary"
                       icon="el-icon-check"
                       @click="showDisTree"
                       size="mini">关联分类</el-button>
            <el-tree v-show="disTree"
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
            <el-tag :key="category.categoryNo"
                    v-for="category in attributeAddition.categorys"
                    closable
                    size="medium"
                    @close="handleCloseCategory(category)"
                    :disable-transitions="false">
              {{category.categoryName}}
            </el-tag>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     size="mini"
                     @click="featureAddition('attributeAddition')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </ui-container>
</template>
<script type="text/javascript">
export default {
  name: 'ProductAddition',
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
      attributeAddition: {
        categorys: [],
        keyName: '',
        keyType: '',
        numeric: '',
        txtVals: [],
        automatic: 'Y'
      },
      // 校验
      rules: {
        keyName: [
          { required: true, message: '请输入属性名', trigger: 'change' },
          { min: 1, max: 12, message: '长度在 1 到 12 个字符', trigger: 'blur' }
        ],
        radiNoe: [
          { required: true, message: '请选择是或否', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    handleCloseFeature (tag) {
      this.attributeAddition.txtVals.splice(this.attributeAddition.txtVals.indexOf(tag), 1)
    },
    handleCloseCategory (tag) {
      this.attributeAddition.categorys.splice(this.attributeAddition.categorys.indexOf(tag), 1)
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
        let index = this.attributeAddition.txtVals.findIndex((text, index) => text === feature)
        if (index !== -1) {
          return null
        }
        this.attributeAddition.txtVals.push(feature)
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
        let { dataList } = await $api.product.productCategoryInquiry(categoryInquiry)
        return resolve(dataList)
      } catch (error) {
        $message.error(error.replyText)
      } finally {
      }
    },
    featureAddition (ruleForm) {
      const { $api, $message } = this
      this.$refs[ruleForm].validate(async (valid) => {
        if (valid) {
          try {
            let { transactionStatus } = await $api.product.featuresAddition(this.attributeAddition)
            console.log(transactionStatus)
            if (!transactionStatus.success) {
              $message.error('新增失败:' + transactionStatus.replyText)
            } else {
              $message.success('新增成功')
              this.$router.push('/product/attribute')
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
    selectCategory (data) {
      let temp = {
        categoryName: data.categoryName,
        categoryNo: data.categoryNo
      }
      let index = this.attributeAddition.categorys.findIndex((text) => text.categoryNo === temp.categoryNo)
      if (index !== -1) {
        return null
      }
      this.attributeAddition.categorys.push(temp)
    },
    renderContent (h, { node, data, store }) {
      return (
        <span class="select_btn">
          <span>{node.label}</span>
          <span>
            <el-button size="mini" class="iconfont icon-zengjia" type="text" on-click={() => this.selectCategory(data)}>添加</el-button>
          </span>
        </span>)
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
