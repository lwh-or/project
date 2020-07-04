
<template>
  <ui-container>
    <!--header start-->
    <div slot="header">
      <el-breadcrumb separator-class="el-icon-arrow-right"
                     separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">运营管理</el-breadcrumb-item>
        <el-breadcrumb-item>广告管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--header end-->
    <!--search start-->
    <div slot="search"
         class="search-wrapper">
      <div class="search_header_bar">
        <el-row type="flex"
                class="row-bg">
          <el-col :span="6">
            <div>
              <i class="fa fa-search" />
              <span class="item_border_left">筛选查询</span></div>
          </el-col>
        </el-row>
      </div>
      <div class="search-content">
        <el-form :model="advertInquiry"
                 class="lianshang-form">
          <el-row>
            <el-col :md="5">
              <el-form-item label="广告标题"
                            label-width="60px">
                <el-input
                          v-model="advertInquiry.title"
                          placeholder="请输入姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="18">
            <div class="hdader-option item_line_height item_btn_margin">
              <el-button type="primary"
                      size="mini"
                      icon="el-icon-search"
                      @click="searchApply">查询</el-button>
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
        <el-row type="flex"
                class="row-bg">
          <el-col :span="18">
            <div>
              <i class="fa fa-table" />
              <span class="item_border_left">数据列表</span></div>
          </el-col>
          <el-col :span="6"
                  :offset="20">
            <el-button size="small" class="addStyle"
                       @click="handleAdd">+  新增</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="table_content">
        <el-table border
                  size="mini"
                  :data="advertList"
                  style="width: 100%">
          <el-table-column type="selection"
                           width="55">
          </el-table-column>
          <el-table-column label="广告标题"
                           prop="advertTitle">
          </el-table-column>
          <el-table-column label="广告图片">
            <template slot-scope="scope">
              <el-image :src="scope.row.imageUrl" />
            </template>
          </el-table-column>
          <el-table-column label="广告链接"
                           prop="advertUrl">
          </el-table-column>
           <el-table-column label="使用场景"
                           prop="usageScenario"
                           :formatter="usageScenarioForamt">
          </el-table-column>
          <el-table-column label="终端类型"
                           prop="advertTerminal"
                           :formatter="advertTerminalForamt">
          </el-table-column>
          <el-table-column label="排序"
                           prop="pos">
          </el-table-column>
          <el-table-column label="状态" prop="status" :formatter="advertStatusForamt">
                           <!-- <template slot-scope="scope">
                             <el-switch v-show="scope.row.status === 1"
                              :v-model="value1"
                              inactive-color="#13ce66"
                              disabled>
                            </el-switch>
                            <el-switch v-show="scope.row.status === 2"
                              :v-model="value2"
                              disabled>
                            </el-switch>
                           </template> -->
          </el-table-column>
          <el-table-column label="状态"
                           prop="status"
                           :formatter="statusForamt">
          </el-table-column>
          <el-table-column label="开始时间"
                           prop="datAdvertEnd">
          </el-table-column>
          <el-table-column label="结束时间"
                           prop="datAdvertStart">
          </el-table-column>
          <el-table-column label="描述"
                           prop="desc">
          </el-table-column>
          <el-table-column label="操作" width="80">
            <template slot-scope="props">
              <el-button type="text" size="small" @click="advertMaintain(props.row.advertNo)">广告维护</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination :current-page="advertInquiry.page.pageNum"
                         background
                         @current-change="changePageInquiry"
                         :page-size="advertInquiry.page.pageSize"
                         layout="total, prev, pager, next"
                         :total="advertInquiry.page.count">
          </el-pagination>
        </div>
      </div>
    </div>
  </ui-container>
</template>
<script type="text/javascript">
import { advertTerminalForamt, statusForamt, usageScenarioForamt, advertStatusForamt } from '../../../format/format'
export default {
  name: 'systemUser',
  data () {
    return {
      value1: true,
      value2: false,
      advertInquiry: {
        title: '',
        page: {
          count: 0,
          pageSize: 10,
          pageNum: 1,
          orderBy: 'cod_pos desc',
          returnCount: true,
          offset: 0,
          limit: 0
        }
      },
      advertList: []
    }
  },
  methods: {
    async fetchData () {
      const { $api, $message } = this
      try {
        let { dataList, page } = await $api.advert.shopcrmAdvertPageListInquiry(this.advertInquiry)
        this.advertList = Object.freeze(dataList)
        console.log(dataList)
        if (page) this.advertInquiry.page = page
      } catch (error) {
        $message.error(error.replyText)
      } finally {
        this.submitLoad = false
      }
    },
    handleAdd () {
      let path = '/om/advert/addition'
      this.$router.push({
        path: path
      })
    },
    advertMaintain (advertNo) {
      let path = '/om/advert/maintenance'
      this.$router.push({
        path: path,
        query: {
          advertNo: advertNo
        }
      })
    },
    async searchApply () {
      this.initPage()
      this.fetchData()
    },
    changePageInquiry: function (currentPage) {
      this.advertInquiry.page.pageNum = currentPage
      this.fetchData()
    },
    initPage () {
      this.advertInquiry.page.pageNum = 1
      this.advertInquiry.page.count = 1
    },
    advertTerminalForamt,
    statusForamt,
    usageScenarioForamt,
    advertStatusForamt
  },
  mounted () {
    this.fetchData()
  }
}
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
.addStyle{
  width: 100px !important;
  background-color: #1E9FFF;
  color: #fff;
}
</style>
