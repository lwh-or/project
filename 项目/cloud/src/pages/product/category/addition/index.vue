
<template>
  <ui-container id="sort_category">
    <div slot="header">
      <el-breadcrumb separator-class="el-icon-arrow-right" separator=">">
         <el-breadcrumb-item >分类管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/product/category' }">分类列表</el-breadcrumb-item>
        <el-breadcrumb-item>新增分类</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="wrap-content">
      <el-form  label-width="120px" ref="ruleForm" :rules="rules" :model="categoryAddition">
        <el-form-item label="父分类" class="parent_select">
          <el-row :gutter="20">
            <el-col :span="8">
              <span v-if="categoryAddition.parentCategoryNo !==''">
                <el-tag size="small" effect="plain">
                  <span class="level">{{categoryAddition.parentCategoryLevel}}</span>
                  {{categoryAddition.parentCategoryName}}</el-tag>
              </span>
              <span v-else>
                父分类为一级分类
              </span>
            </el-col>
            <el-col :span="8" >
              <el-popover
                width="400"
                trigger="click">
                <el-tree
                  node-key="categoryNo"
                  lazy
                  @check-change="selectCategory"
                  :props="treeProps"
                  :render-content="renderContent"
                  ref="tree"
                  :load="loadChild">
                  </el-tree>
                <el-button slot="reference" type="text">选择父分类</el-button>
              </el-popover>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
        </el-form-item>
        <el-form-item label="分类编号" prop="categoryNo">
          <el-input  size="mini" v-model="categoryAddition.categoryNo" placeholder="分类编号"></el-input>
        </el-form-item>
         <el-form-item label="分类名称" prop="categoryName">
          <el-input  size="mini" v-model="categoryAddition.categoryName" placeholder="请输入分类名称"></el-input>
        </el-form-item>
         <el-form-item label="分类级别">
               <el-tag size="small" effect="plain">{{categoryAddition.categoryLevel | foramtCategoryLevel}}</el-tag>
        </el-form-item>
        <el-form-item label="分类图标">
               <el-upload class="upload-demo"
                     action="/none"
                     list-type="picture"
                     :multiple="false"
                     :auto-upload="false"
                     :http-request="addFile"
                     :on-exceed="fileMaxTip"
                     :on-change="changeFile"
                     :limit="1"
                     :show-file-list="showList"
                     ref="upload"
                     >
            <el-button size="small"
                       type="primary"
                       icon="el-icon-upload">选择上传文件</el-button>
            <span slot="tip"
                  class="el-upload__tip c_upload_tip">只能上传jpg/png文件，且不超过500kb</span>
                  </el-upload>
        </el-form-item>
        <el-form-item label="排序">
              <el-input-number id="sort_input" v-model="categoryAddition.pos"  :min="1" :max="100" size="small"></el-input-number>
        </el-form-item>
        <el-form-item label="导航栏展示">
            <el-radio-group v-model="categoryAddition.dis" size="small" >
            <el-radio :label="1" border>是</el-radio>
            <el-radio :label="2" border>否</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="分类描述" >
             <el-input type="textarea" :row="3" v-model="categoryAddition.memo"  maxlength="100" show-word-limit></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </ui-container>
</template>
<script type="text/javascript">
import { foramtCategoryLevel } from '../../../../format/format'
export default {
  name: 'categoryAddition',
  data () {
    return {
      treeProps: {
        children: 'children',
        label: 'categoryName',
        isLeaf: 'leaf'
      },
      categoryAddition: {
        categoryLevel: 1,
        categoryName: '',
        categoryNo: '',
        iconAttachmentNos: '',
        dis: 1,
        memo: '',
        parentCategoryNo: '',
        parentCategoryName: '',
        parentCategoryLevel: '',
        pos: 0
      },
      rules: {
        categoryNo: [
          {
            required: true, message: '请输入分类编号', trigger: 'blur'
          }
        ],
        categoryName: [
          {
            required: true, message: '请输入分类名称', trigger: 'blur'
          },
          { min: 1, max: 5, message: '分类名称不能超过5个字', trigger: 'blur' }
        ]
      },
      advertCategory: [],
      fileList: [],
      showList: true
    }
  },
  filters: {
    foramtCategoryLevel: foramtCategoryLevel
  },
  methods: {
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
    renderContent (h, { node, data, store }) {
      if (node.level < 3) {
        return (
          <span class="select_btn">
            <span>{node.label}</span>
            <span>
              <el-button size="mini" class="iconfont icon-zengjia" type="text" on-click={ () => this.selectCategory(data) }>选择</el-button>
            </span>
          </span>
        )
      } else {
        return (
          <span class="select_btn">
            <span>{node.label}</span>
          </span>
        )
      }
    },
    selectCategory (data) {
      this.categoryAddition.parentCategoryNo = data.categoryNo
      this.categoryAddition.parentCategoryName = data.categoryName
      this.categoryAddition.parentCategoryLevel = data.categoryLevel
      this.categoryAddition.categoryNo = data.categoryNo + '-'
      this.categoryAddition.categoryLevel = data.categoryLevel + 1
    },
    // 提交前校验
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        console.log(valid)
        if (valid) {
          this.cateAddition()
        } else {
          return false
        }
      })
    },
    async cateAddition () {
      this.$refs.upload.submit()
      const { $api, $message } = this
      let formData = new FormData()
      formData.append('file', this.fileList[0])
      formData.append('channel', 'ALIYUN')
      formData.append('uploadKey', 'oss_category')
      const { attachmentNos } = await $api.advert.shopcrmFileUpload(formData)
      this.categoryAddition.iconAttachmentNos = attachmentNos
      if (this.categoryAddition.iconAttachmentNos) {
        try {
          let {transactionStatus} = await $api.product.categoryAddition(this.categoryAddition)
          if (!transactionStatus.success) {
            $message.error('新增失败:' + transactionStatus.replyText)
          } else {
            $message.success('新增成功')
            let path = '/product/category'
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
        return this.$message.error('请上传分类图标')
      }
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
      const isLtSize = file.size / 1024 > 500
      if (isLtSize) {
        this.$message.error('上传图片大小不能超过 500kb!')
        this.showList = false
        fileList.splice(0)
        return false
      }
      this.showList = true
      return true
    },
    changeFile (file, fileList) {
      this.beforeAvatarUpload(file, fileList)
    },
    addFile (file) {
      this.fileList[0] = file.file
    },
    fileMaxTip () {
      const { $message } = this
      $message.error('分类图标只能选择一张,请删除后添加!')
    }
  }
}
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss" scoped>
  #sort_category{
    .el-form-item__content{
      #sort_input{
        /deep/ .el-input{
          width: 130px !important;
        }
      }
    }
  }
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
  .level{
    width: 12px;
    height: 12px;
    color:#fff;
    background-color: #f80;
    border-radius: 50%;
    text-align: center;
    display: inline-block;
    /*文字垂直居中*/
    vertical-align: middle;
    line-height: 12px;
}
.parent_select span,.el-button,.level,.select_btn{
  font-size: 12px !important;
}

</style>
