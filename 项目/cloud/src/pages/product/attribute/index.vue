
<template>
  <ui-container>
    <!--header start-->
    <div slot="header">
      <el-breadcrumb separator-class="el-icon-arrow-right" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>属性查询</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
     <!--header end-->
     <!--search start-->
    <div slot="search" class="search-wrapper">
      <div class="search_header_bar">
          <el-row type="flex" class="row-bg">
            <el-col :span="6"><div>
              <i class="fa fa-search"/>
              <span class="item_border_left">筛选查询</span></div>
            </el-col>
        </el-row>
      </div>
      <div class="search-content c_search_content">
          <el-form :model="featuresInquiry" class="lianshang-form">
            <el-row >
              <el-col  :md="5" >
               <el-form-item label="分类名称" label-width="70px">
                  <el-input size="mini"  placeholder="分类名称" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
              <div class="hdader-option item_line_height item_btn_margin">
                <el-button type="primary" size="mini" icon="el-icon-search" @click="search">查询</el-button>
              </div>
            </el-col>
            </el-row>
          </el-form>
          </div>
    </div>
    <!--search end-->
    <!--table start-->
    <div class="table_wrapper">
      <div class="table_header_bar item_header_bar">
         <el-row type="flex" class="row-bg">
            <el-col :span="18"><div>
              <i class="fa fa-table"/>
              <span class="item_border_left">数据列表</span></div>
            </el-col>
            <el-col :span="6" :offset="20">
              <el-button size="small" class="addStyle" @click="handleAdd">+ 新增</el-button>
            </el-col>
        </el-row>
      </div>
       <div class="table_content">
        <el-table
          border
          size="mini"
          :data="featuresList"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="编号"
            width="100"
            prop="keyNo">
          </el-table-column>
          <el-table-column
            label="名称"
            prop="keyName">
          </el-table-column>
          <el-table-column
            label="值">
            <template slot-scope="scope">
              <template v-if="scope.row.txtVal">
                <el-tag size="mini" effect="plain" class="param_item" v-for="(item,index) in scope.row.txtVal.split(',')" :key="index">{{item}}</el-tag>
              </template>
          </template>
          </el-table-column>
          <el-table-column
            label="是否允许手动录入"
            prop="automatic"
            :formatter="foramtProductAutomatic">
          </el-table-column>
          <el-table-column
            label="操作"
            width="120">
            <template slot-scope="props">
              <el-button type="text" size="small" @click="handleDetail(props.row.keyNo)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            :current-page="featuresInquiry.page.pageNum"
              background
              @current-change="changePageInquiry"
            :page-size="featuresInquiry.page.pageSize"
              layout="total, prev, pager, next"
            :total="featuresInquiry.page.count">
            </el-pagination>
          </div>
       </div>
    </div>
     <!--table start-->
  </ui-container>
</template>
<script type="text/javascript">
// eslint-disable-next-line no-unused-vars
import { numericStatus, featuresKeyType, foramtProductAutomatic } from '../../../format/format'
export default {
  name: 'classifyList',
  data () {
    return {
      featuresInquiry: {
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
      featuresList: []
    }
  },
  methods: {
    async fetchData () {
      const { $api, $message } = this
      try {
        let {dataList, page} = await $api.product.featuresPageListInquiry(this.featuresInquiry)

        this.featuresList = Object.freeze(dataList)
        if (page) this.featuresInquiry.page = page
      } catch (error) {
        $message.error(error.replyText)
      } finally {
        this.submitLoad = false
      }
    },
    async search () {
      this.initPage()
      this.fetchData()
    },
    changePageInquiry: function (currentPage) {
      this.featuresInquiry.page.pageNum = currentPage
      this.fetchData()
    },
    // 重置 分页
    initPage () {
      this.featuresInquiry.page.pageNum = 1
      this.featuresInquiry.page.count = 1
    },
    // 添加
    handleAdd () {
      let path = '/product/attribute/addition'
      this.$router.push({
        path: path
      })
    },
    // 编辑
    handleDetail (val) {
      console.log(val)
      let path = '/product/attribute/maintenance'
      this.$router.push({
        path: path,
        query: {
          keyNo: val
        }
      })
    },
    // 删除
    async handleDel (val) {
      console.log(val)
      // val.status = 2
      // const { $api, $message } = this
      // try {
      //   await $api.product.productAttrMaintenance(val)
      //   this.initPage()
      //   this.fetchData()
      // } catch (error) {
      //   $message.error(error.replyText)
      // } finally {
      //   this.submitLoad = false
      // }
    },
    foramtProductAutomatic
  },
  mounted () {
    this.fetchData()
  },
  filters: {
    numericStatus: numericStatus,
    featuresKeyType: featuresKeyType
  }
}
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss" scoped>
.c_search_content {
  margin: 20px 0 0;
}
.c_search_content >>> .el-form-item__content {
  line-height: 40px;
}
.c_search_content >>> .el-form-item__label {
  line-height: 40px;
}
</style>
