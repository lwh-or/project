
<template>
  <ui-container>
    <!--header start-->
    <div slot="header">
      <el-breadcrumb separator-class="el-icon-arrow-right" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">商品管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path: '/product/productList'}">商品列表</el-breadcrumb-item>
        <el-breadcrumb-item>商品日志</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="table_wrapper">
      <div class="table_header_bar">
         <el-row type="flex" class="row-bg">
            <el-col :span="18"><div>
              <i class="fa fa-table"/>
              <span>数据列表</span></div>
            </el-col>
        </el-row>
      </div>
       <div class="table_content">
     <el-table
     border
     size="mini"
    :data="squList"
    style="width: 100%">
     <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="编号"
      prop="productNo"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      label="销售价格"
      prop="productTitle"
      show-overflow-tooltip>
    </el-table-column>
      <el-table-column
      label="促销价格"
      prop="productSubTitle"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      label="赠送积分"
      prop="status">
      <template slot-scope="scope">
        {{scope.row.status | productStatusFilter}}
      </template>
    </el-table-column>
    <el-table-column
      label="积分购买金额"
      prop="productTitle"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      label="上下架"
      prop="productTitle"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      label="审核状态"
      prop="productTitle"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      label="操作信息"
      prop="productTitle"
      show-overflow-tooltip>
    </el-table-column>
  </el-table>
  <div class="pagination">
    <el-pagination
      :current-page="squListInquiry.page.pageNum"
        background
        @current-change="changePageInquiry"
      :page-size="squListInquiry.page.pageSize"
        layout="total, prev, pager, next"
      :total="squListInquiry.page.count">
      </el-pagination>
    </div>
  </div>
  </div>
     <!--table start-->
  </ui-container>
</template>
<script type="text/javascript">
export default {
  name: 'productListLog',
  data () {
    return {
      squListInquiry: {
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
      squList: []
    }
  },
  methods: {
    async fetchData () {
      const { $api, $message } = this
      try {
        let {dataList, page} = await $api.product.productPageInquiry(this.squListInquiry)
        this.squList = Object.freeze(dataList)
        if (page) this.squListInquiry.page = page
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
      this.spuListInquiry.page.pageNum = currentPage
      this.fetchData()
    },
    // 重置 分页
    initPage () {
      this.spuListInquiry.page.pageNum = 1
      this.spuListInquiry.page.count = 1
    }
  },
  mounted () {
    this.fetchData()
  }
}
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss" scoped>
.lianshang-form .el-form-item {
  margin-bottom: 0px !important;
  margin-top: 10px;
}
</style>
