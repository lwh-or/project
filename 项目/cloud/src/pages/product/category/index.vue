
<template>
  <ui-container>
    <!--header start-->
    <div slot="header">
      <el-breadcrumb separator-class="el-icon-arrow-right" separator=">">
         <el-breadcrumb-item >分类管理</el-breadcrumb-item>
        <el-breadcrumb-item>分类列表</el-breadcrumb-item>
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
      <div class="search-content c_search_content">
          <el-form :model="brandListInquiry" class="lianshang-form">
            <el-row >
              <el-col  :md="5" >
               <el-form-item label="分类名称" label-width="70px">
                  <el-input size="mini" v-model="brandListInquiry.categoryName" placeholder="分类名称" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col  :md="5" >
                <el-form-item label="状态" label-width="120px" size="mini">
                  <el-select v-model="brandListInquiry.dis" placeholder="请选择状态" clearable>
                    <el-option
                      v-for="item in statusList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4">
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
              <span  class="item_border_left">数据列表</span></div>
            </el-col>
             <el-col :span="6" :offset="20">
              <el-button size="small" class="addStyle" @click="categoryAdd">+ 添加</el-button>
            </el-col>
        </el-row>
      </div>
       <div class="table_content">
     <el-table
     border
     size="mini"
    :data="brandList"
    style="width: 100%">
     <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="分类ID"
      prop="categoryNo"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      label="分类名称"
      prop="categoryName">
    </el-table-column>
    <el-table-column
      label="分类级别"
      prop="categoryLevel">
      <template slot-scope="scope">
        {{scope.row.categoryLevel | foramtCategoryLevel}}
      </template>
    </el-table-column>
    <el-table-column
      label="分类图标"
      prop="categoryUrl">
      <template slot-scope="scope">
        <el-image v-if="scope.row.categoryUrl" :src="scope.row.categoryUrl" alt="" fit="contain" :preview-src-list="[scope.row.categoryUrl]" style="height: 50px"></el-image>
      </template>
    </el-table-column>
    <el-table-column
      label="排序"
      prop="pos">
    </el-table-column>
    <el-table-column
      label="分类备注"
      prop="memo">
    </el-table-column>
    <el-table-column
      label="操作"
      width="120">
        <template slot-scope="props">
        <el-button type="text" size="small" @click="categoryDetail(props.row.categoryNo)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="pagination">
    <el-pagination
      :current-page="brandListInquiry.page.pageNum"
        background
        @current-change="changePageInquiry"
      :page-size="brandListInquiry.page.pageSize"
        layout="total, prev, pager, next"
      :total="brandListInquiry.page.count">
      </el-pagination>
    </div>
  </div>
  </div>
     <!--table start-->
  </ui-container>
</template>
<script type="text/javascript">
import { foramtCategoryLevel } from '../../../format/format'
export default {
  name: 'classifyList',
  data () {
    return {
      brandListInquiry: {
        categoryLevel: '',
        categoryName: '',
        dis: '',
        page: {
          count: 0,
          pageSize: 10,
          pageNum: 1,
          orderBy: 'dat_create desc',
          returnCount: true,
          offset: 0,
          limit: 0
        }
      },
      brandList: [],
      statusList: [
        { value: '1', label: '可见' }, { value: '2', label: '不可见' }
      ]
    }
  },
  filters: {
    foramtCategoryLevel: foramtCategoryLevel
  },
  methods: {
    async fetchData () {
      const { $api, $message } = this
      try {
        let {dataList, page} = await $api.product.categoryPageListInquiry(this.brandListInquiry)
        this.brandList = Object.freeze(dataList)
        this.brandList.map(item => {
          if (item.dis) {
            item.dis = true
          } else {
            item.dis = false
          }
        })
        if (page) this.brandListInquiry.page = page
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
      this.brandListInquiry.page.pageNum = currentPage
      this.fetchData()
    },
    // 重置 分页
    initPage () {
      this.brandListInquiry.page.pageNum = 1
      this.brandListInquiry.page.count = 1
    },
    categoryDetail: function (categoryNo) {
      let path = '/product/category/maintenance'
      this.$router.push({
        path: path,
        query: {
          categoryNo: categoryNo
        }
      })
    },
    // 添加
    categoryAdd () {
      let path = '/product/category/addition'
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
