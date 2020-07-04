
<template>
  <ui-container>
    <div slot="header">
      <el-breadcrumb separator-class="el-icon-arrow-right" separator=">">
        <el-breadcrumb-item >分类管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/product/category' }">分类列表</el-breadcrumb-item>
        <el-breadcrumb-item>编辑分类</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="c_wrap">
      <el-form  label-width="120px">
        <el-form-item label="父分类" class="parent_select">
          <el-row :gutter="20">
            <el-col :span="8">
              <span v-if="categoryMaintenance.parentCategoryNo !==''">
                <el-tag size="small" effect="plain">
                  <span class="level">{{categoryMaintenance.parentCategoryLevel}}</span>
                  {{categoryMaintenance.parentCategoryName}}</el-tag>
              </span>
              <span v-else>
                父分类为一级分类
              </span>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
        </el-form-item>
        <el-form-item label="分类编号">
          <el-input  size="mini" :disabled="true" v-model="categoryMaintenance.categoryNo" placeholder="分类编号"></el-input>
        </el-form-item>
         <el-form-item label="分类名称">
          <el-input  size="mini" v-model="categoryMaintenance.categoryName" placeholder="请输入分类名称"></el-input>
        </el-form-item>
         <el-form-item label="分类级别">
               <el-tag size="small" effect="plain">{{categoryMaintenance.categoryLevel | foramtCategoryLevel}}</el-tag>
        </el-form-item>
        <el-form-item label="分类图标">
                         <el-upload class="upload-demo"
                     action="/none"
                     list-type="picture"
                     :on-change="changeFile"
                     :file-list="fileList"
                     :multiple="false"
                     :auto-upload="false"
                     :http-request="addFile"
                     :on-remove="removeList"
                     :limit="2"
                     ref="upload"
                     >
            <el-button size="small"
                       type="primary"
                       icon="el-icon-upload">选择上传文件</el-button>
            <span slot="tip"
                  class="el-upload__tip c_upload_tip">只能上传jpg/png文件，且不超过500kb</span>
                  </el-upload>
        </el-form-item>
        <!-- <el-form-item label="排序">
              <el-input-number v-model="categoryMaintenance.pos" :min="1" :max="100" label="描述文字"></el-input-number>
              <el-input-number v-model="categoryMaintenance.pos"  :min="1" :max="100" size="small"></el-input-number>
        </el-form-item> -->
        <el-form-item label="排序">
           <template>
          <el-input-number v-model="categoryMaintenance.pos"  :min="1" :max="100" label="描述文字"></el-input-number>
        </template>
        </el-form-item>
        <el-form-item label="导航栏展示">
            <el-radio-group v-model="categoryMaintenance.dis" size="small" >
            <el-radio :label="1" border>是</el-radio>
            <el-radio :label="2" border>否</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="分类描述" >
             <el-input type="textarea" :row="3" v-model="categoryMaintenance.memo"  maxlength="100" show-word-limit></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="cateMaintenance">提交</el-button>
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
      categoryMaintenance: {},
      fileList: [],
      showList: false
    }
  },
  filters: {
    foramtCategoryLevel: foramtCategoryLevel
  },
  mounted () {
    this.categoryDetailInquiry()
  },
  methods: {
    // 查询详情
    async categoryDetailInquiry () {
      let params = this.$route.query
      let categoryInquiry = {
        categoryNo: params.categoryNo
      }
      const { $api, $message } = this
      try {
        const {data} = await $api.product.productCategoryDetailInquiry(categoryInquiry)
        this.categoryMaintenance = data
        this.fileList.push({
          url: data.categoryUrl
        })
      } catch (error) {
        $message.error(error.replyText)
      } finally {
        this.submitLoad = false
      }
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
      this.categoryMaintenance.parentCategoryNo = data.categoryNo
      this.categoryMaintenance.parentCategoryName = data.categoryName
      this.categoryMaintenance.parentCategoryLevel = data.categoryLevel
    },
    async cateMaintenance () {
      this.$refs.upload.submit()
      const { $api, $message } = this
      if (this.showList) {
        let formData = new FormData()
        formData.append('file', this.fileList[0])
        formData.append('channel', 'ALIYUN')
        formData.append('uploadKey', 'oss_category')
        const { attachmentNos } = await $api.advert.shopcrmFileUpload(formData)
        this.categoryMaintenance.iconAttachmentNos = attachmentNos
      } else {
        this.categoryMaintenance.iconAttachmentNos = []
      }
      try {
        console.log(this.categoryMaintenance)
        let {transactionStatus} = await $api.product.categoryMaintenance(this.categoryMaintenance)
        if (!transactionStatus.success) {
          $message.error('维护失败:' + transactionStatus.replyText)
        } else {
          $message.success('维护成功')
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
    },
    beforeAvatarUpload (file, fileList) {
      let testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'jpg'
      const extension2 = testmsg === 'png'
      if (!extension && !extension2) {
        this.$message.error('上传图片只能是 JPG、PNG 格式!')
        this.showList = false
        // 手动清楚图片
        this.fileList.splice(0, 1)
        return false
      }
      const isLtSize = file.size / 1024 > 500
      if (isLtSize) {
        this.$message.error('上传图片大小不能超过 500kb!')
        this.showList = false
        this.fileList.splice(0, 1)
        return false
      }
      if (this.fileList.length) {
        this.fileList.push(fileList[1])
        this.fileList.splice(0, 1)
      } else {
        this.fileList.push(fileList[0])
      }
      console.log(this.fileList)
      this.showList = true
      return true
    },
    changeFile (file, fileList) {
      this.beforeAvatarUpload(file, fileList)
    },
    addFile (file) {
      this.fileList[0] = file.file
    },
    removeList () {
      this.fileList.splice(0, 1)
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
