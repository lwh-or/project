
<template>
  <ui-container>
    <!--header start-->
    <div slot="header">
      <el-breadcrumb separator-class="el-icon-arrow-right" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
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
          <el-form :model="sysUserInquiry" class="lianshang-form">
            <el-row >
            <el-col  :md="5" >
               <el-form-item label="姓名" label-width="50px">
                  <el-input  disable size="mini" placeholder="请输入姓名"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="18">
              <div class="hdader-option item_line_height item_btn_margin">
                <el-button type="primary" size="mini" icon="el-icon-search" @click="searchApply">查询</el-button>
                 <el-col :span="6" :offset="20">
                  <el-button size="small" class="addStyle" @click="userAdd">+ 新增</el-button>
                </el-col>
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
    :data="userList"
    style="width: 100%">
     <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="用户编号"
      prop="userNo">
    </el-table-column>
    <el-table-column
      label="用户名"
      prop="userName">
    </el-table-column>
     <el-table-column
      label="姓名"
      prop="name">
    </el-table-column>
     <el-table-column
      label="电话"
      prop="tel">
    </el-table-column>
     <el-table-column
      label="邮箱"
      prop="mail">
    </el-table-column>
     <el-table-column
      label="头像">
      <template slot-scope="scope">
          <el-avatar :src="scope.row.avatar"></el-avatar>
      </template>
    </el-table-column>
     <el-table-column
      label="用户类型"
      prop="userType">
    </el-table-column>
  </el-table>
  <div class="pagination">
         <el-pagination
            :current-page="sysUserInquiry.page.pageNum"
             background
             @current-change="changePageInquiry"
            :page-size="sysUserInquiry.page.pageSize"
             layout="total, prev, pager, next"
            :total="sysUserInquiry.page.count">
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
      sysUserInquiry: {
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
      userList: []
    }
  },
  methods: {
    async fetchData () {
      const { $api, $message } = this
      try {
        let {dataList, page} = await $api.system.userList(this.sysUserInquiry)
        this.userList = Object.freeze(dataList)
        if (page) this.sysUserInquiry.page = page
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
      this.sysUserInquiry.page.pageNum = currentPage
      this.fetchData()
    },
    initPage () {
      this.sysUserInquiry.page.pageNum = 1
      this.sysUserInquiry.page.count = 1
    },
    // 添加
    userAdd () {
      let path = '/system/user/adduser'
      this.$router.push({
        path: path
      })
    }
  },
  mounted () {
    this.fetchData()
  }
}
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
</style>
