
<template>
  <ui-container>
    <!--header start-->
    <div slot="header">
      <el-breadcrumb separator-class="el-icon-arrow-right" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">客户管理</el-breadcrumb-item>
        <el-breadcrumb-item>客户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
     <!--header end-->
     <!--search start-->
    <div slot="search" class="search-wrapper">
      <div class="search_header_bar">
          <el-row type="flex" class="row-bg">
            <el-col :span="6"><div>
              <i class="fa fa-search"/>
              <span  class="item_border_left">筛选查询</span></div>
            </el-col>
        </el-row>
      </div>
      <div class="search-content">
          <el-form :model="customerInquiry" class="lianshang-form">
            <el-row >
              <el-col  :md="5" >
               <el-form-item label="姓名" label-width="48px">
                  <el-input  disable size="mini" placeholder="请输入姓名"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="18">
              <div class="hdader-option item_line_height item_btn_margin">
                <el-button type="primary" size="mini" icon="el-icon-search" @click="searchApply">查询</el-button>
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
            <el-col :span="6"><div>
              <i class="fa fa-table"/>
              <span  class="item_border_left">数据列表</span></div>
            </el-col>
        </el-row>
      </div>
       <div class="table_content">
     <el-table
     border
     size="mini"
    :data="customerList"
    style="width: 100%">
     <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="用户编号"
      prop="customerNo">
    </el-table-column>
    <el-table-column
      label="名字"
      prop="customerName">
    </el-table-column>
    <el-table-column
      label="头像">
        <template slot-scope="scope">
            <el-avatar :src="scope.row.photoUrl"></el-avatar>
        </template>
    </el-table-column>
    <el-table-column
      label="昵称"
      prop="customerNickname">
    </el-table-column>
    <el-table-column
      label="手机"
      prop="customerMobile">
    </el-table-column>
    <el-table-column
      label="邮箱"
      prop="customerMail">
    </el-table-column>
        <el-table-column
      label="邀请码"
      prop="invite">
    </el-table-column>
    <el-table-column
      label="用户等级"
      prop="customerLevel">
    </el-table-column>
  </el-table>
  <div class="pagination">
         <el-pagination
            :current-page="customerInquiry.page.pageNum"
             background
             @current-change="changePageInquiry"
            :page-size="customerInquiry.page.pageSize"
             layout="total, prev, pager, next"
            :total="customerInquiry.page.count">
            </el-pagination>
        </div>
  </div>
  </div>
     <!--table start-->
  </ui-container>
</template>
<script type="text/javascript">
export default {
  name: 'systemUser',
  data () {
    return {
      customerInquiry: {
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
      customerList: []
    }
  },
  methods: {
    async fetchData () {
      const { $api, $message } = this
      try {
        let {dataList, page} = await $api.customer.customerPageList(this.customerInquiry)
        this.customerList = Object.freeze(dataList)
        if (page) this.customerInquiry.page = page
      } catch (error) {
        $message.error(error.replyText)
      } finally {
        this.submitLoad = false
      }
    },
    async searchApply () {
      this.initPage()
      this.fetchData()
    },
    changePageInquiry: function (currentPage) {
      this.customerInquiry.page.pageNum = currentPage
      this.fetchData()
    },
    initPage () {
      this.customerInquiry.page.pageNum = 1
      this.customerInquiry.page.count = 1
    }
  },
  mounted () {
    this.fetchData()
  }
}
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
</style>
