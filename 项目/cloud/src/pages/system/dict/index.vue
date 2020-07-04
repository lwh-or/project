
<template>
  <ui-container>
    <!--header start-->
    <div slot="header">
      <el-breadcrumb separator-class="el-icon-arrow-right" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>数据字典管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
     <!--header end-->
     <!--search start-->
    <div slot="search" class="search-wrapper">
      <div class="search_header_bar">
          <el-row type="flex" class="row-bg">
            <el-col :span="6"><div>
              <i class="fa fa-search"/>
              <span>筛选查询</span></div>
            </el-col>
            <el-col :span="18">
              <div class="hdader-option">
                <el-button type="primary" size="mini" icon="el-icon-search" @click="searchApply">查询</el-button>
              </div>
            </el-col>
        </el-row>
      </div>
      <div class="search-content">
          <el-form :model="sysDictInquiry" class="lianshang-form">
            <el-row >
              <el-col  :md="6" >
               <el-form-item label="字典名称" label-width="120px">
                  <el-input  disable size="mini" placeholder="请输入字典名称" v-model="sysDictInquiry.dictName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          </div>
    </div>
    <!--search end-->
    <!--table start-->
    <div class="table_wrapper">
      <div class="table_header_bar">
         <el-row type="flex" class="row-bg">
            <el-col :span="6"><div>
              <i class="fa fa-table"/>
              <span>数据列表</span></div>
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
    :data="dictList"
    style="width: 100%">
     <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="字典编号"
      prop="dictNo">
    </el-table-column>
     <el-table-column
      label="字典名称"
      prop="dictName">
    </el-table-column>
      <el-table-column
      label="字典KEY"
      prop="dictKey">
    </el-table-column>
     <el-table-column
      label="字典Code"
      prop="code">
    </el-table-column>
     <el-table-column
      label="字典Value"
      prop="val">
    </el-table-column>
     <el-table-column
      label="排序"
      prop="pos">
    </el-table-column>
     <el-table-column
      label="状态"
      prop="status">
    </el-table-column>
  </el-table>
  <div class="pagination">
         <el-pagination
            :current-page="sysDictInquiry.page.pageNum"
             background
             @current-change="changePageInquiry"
            :page-size="sysDictInquiry.page.pageSize"
             layout="total, prev, pager, next"
            :total="sysDictInquiry.page.count">
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
      sysDictInquiry: {
        dictName: '',
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
      dictList: []
    }
  },
  methods: {
    async fetchData () {
      const { $api, $message } = this
      try {
        let {dataList, page} = await $api.system.dictList(this.sysDictInquiry)
        this.dictList = Object.freeze(dataList)
        if (page) this.sysDictInquiry.page = page
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
      this.sysDictInquiry.page.pageNum = currentPage
      this.fetchData()
    },
    initPage () {
      this.sysDictInquiry.page.pageNum = 1
      this.sysDictInquiry.page.count = 1
    }
  },
  mounted () {
    this.fetchData()
  }
}
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
</style>
