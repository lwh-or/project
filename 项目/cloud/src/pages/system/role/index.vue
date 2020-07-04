
<template>
  <ui-container>
    <!--header start-->
    <div slot="header">
      <el-breadcrumb separator-class="el-icon-arrow-right" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色管理</el-breadcrumb-item>
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
      <div class="search-content">
          <el-form :model="sysRoleInquiry" class="lianshang-form">
            <el-row >
              <el-col  :md="5" >
               <el-form-item label="姓名" label-width="48px">
                  <el-input  disable size="mini" placeholder="请输入姓名"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
              <div class="hdader-option  item_line_height item_btn_margin">
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
            <el-col :span="18">
              <div>
              </div>
            </el-col>
        </el-row>
      </div>
       <div class="table_content">
     <el-table
     border
     size="mini"
    :data="roleList"
    style="width: 100%">
     <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="角色编号"
      prop="roleNo">
    </el-table-column>
    <el-table-column
      label="角色名称"
      prop="roleName">
    </el-table-column>
  </el-table>
  <div class="pagination">
         <el-pagination
            :current-page="sysRoleInquiry.page.pageNum"
             background
             @current-change="changePageInquiry"
            :page-size="sysRoleInquiry.page.pageSize"
             layout="total, prev, pager, next"
            :total="sysRoleInquiry.page.count">
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
      sysRoleInquiry: {
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
      roleList: []
    }
  },
  methods: {
    async fetchData () {
      const { $api, $message } = this
      try {
        let {dataList, page} = await $api.system.roleList(this.sysRoleInquiry)
        this.roleList = Object.freeze(dataList)
        if (page) this.sysRoleInquiry.page = page
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
      this.sysRoleInquiry.page.pageNum = currentPage
      this.fetchData()
    },
    initPage () {
      this.sysRoleInquiry.page.pageNum = 1
      this.sysRoleInquiry.page.count = 1
    }
  },
  mounted () {
    this.fetchData()
  }
}
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
</style>
