
<template>
  <ui-container>
    <!--header start-->
    <div slot="header">
      <el-breadcrumb separator-class="el-icon-arrow-right" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
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
          <el-form :model="sysMenuInquiry" class="lianshang-form">
            <el-row >
              <el-col  :md="5" >
               <el-form-item label="菜单名称" label-width="78px">
                  <el-input  disable size="mini" placeholder="请输入菜单名称" v-model="sysMenuInquiry.menuName"></el-input>
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
              <span class="item_border_left">数据列表</span></div>
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
    :data="menuList"
    style="width: 100%">
     <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="菜单编号"
      prop="menuNo">
    </el-table-column>
     <el-table-column
      label="菜单名称"
      prop="menuName">
    </el-table-column>
     <el-table-column
      label="是否是叶节点">
       <template slot-scope="scope">
        {{scope.row.leaf | leaf}}
      </template>
    </el-table-column>
     <el-table-column
      label="父菜单编号"
      prop="parentMenuNo">
    </el-table-column>
    <el-table-column
      width="60px"
      label="图标">
       <template slot-scope="scope">
        <span :class="scope.row.menuIcon" class="iconfont"></span>
      </template>
    </el-table-column>
     <el-table-column
      label="菜单URL"
      prop="menuUrl">
    </el-table-column>
    <el-table-column
      label="是否显示"
      prop="dis">
       <template slot-scope="scope">
        {{scope.row.dis | dis}}
      </template>
    </el-table-column>
    <el-table-column
      label="排序"
      prop="pos">
    </el-table-column>
    <el-table-column
      label="状态">
      <template slot-scope="scope">
        {{scope.row.status | commonStatus}}
      </template>
    </el-table-column>
  </el-table>
  <div class="pagination">
         <el-pagination
            :current-page="sysMenuInquiry.page.pageNum"
             background
             @current-change="changePageInquiry"
            :page-size="sysMenuInquiry.page.pageSize"
             layout="total, prev, pager, next"
            :total="sysMenuInquiry.page.count">
            </el-pagination>
        </div>
  </div>
  </div>
     <!--table start-->
  </ui-container>
</template>
<script type="text/javascript">
import { commonStatus, dis, leaf } from '../../../format/format'
export default {
  name: 'systemUser',
  data () {
    return {
      sysMenuInquiry: {
        menuName: '',
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
      menuList: []
    }
  },
  methods: {
    async fetchData () {
      const { $api, $message } = this
      try {
        let {dataList, page} = await $api.system.menuList(this.sysMenuInquiry)
        this.menuList = Object.freeze(dataList)
        if (page) this.sysMenuInquiry.page = page
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
      this.sysMenuInquiry.page.pageNum = currentPage
      this.fetchData()
    },
    initPage () {
      this.sysMenuInquiry.page.pageNum = 1
      this.sysMenuInquiry.page.count = 1
    }
  },
  mounted () {
    this.fetchData()
  },
  filters: {
    commonStatus: commonStatus,
    dis: dis,
    leaf: leaf
  }
}
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
</style>
