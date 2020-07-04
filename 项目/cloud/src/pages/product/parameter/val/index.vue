
<template>
  <ui-container>
    <!--header start-->
    <div slot="header">
      <el-breadcrumb separator-class="el-icon-arrow-right" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>参数值</el-breadcrumb-item>
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
          <el-form :model="categorySpecParamsInquiry" class="lianshang-form">
            <el-row >
              <el-col  :md="5" >
               <el-form-item label="参数值名称" label-width="86px">
                  <el-input size="mini"  placeholder="参数值名称" v-model="categorySpecParamsInquiry.paramName" clearable></el-input>
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
              <el-button size="small" class="addStyle" @click="handleAddVal">+ 添加</el-button>
            </el-col>
        </el-row>
      </div>
       <div class="table_content">
     <el-table
     border
     size="mini"
     width="100%"
    :data="paramsList">
     <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="编号"
      width="100"
      prop="paramNo">
    </el-table-column>
     <el-table-column
      label="名称"
      prop="paramName">
    </el-table-column>
        <el-table-column
      label="参数">
      <template slot-scope="scope">
          <template v-if="scope.row.paramVals">
            <el-tag size="mini" effect="plain" class="param_item" v-for="(item,index) in scope.row.paramVals.split(',')" :key="index">{{item}}</el-tag>
          </template>
      </template>
    </el-table-column>
    <el-table-column
      label="参数属性"
      prop="useType">
       <template slot-scope="scope">
            {{scope.row.paramType | paramType}} /{{scope.row.useType | paramUseType}}
      </template>
    </el-table-column>
     <el-table-column
      label="绑定组数(个)">
       <template slot-scope="scope">
         <el-link type="primary">{{scope.row.groupCount}}</el-link>
      </template>
    </el-table-column>
     <el-table-column
      label="创建时间"
      prop="datCreate">
    </el-table-column>
      <!-- <el-table-column
      label="最后修改时间"
      prop="datModify">
    </el-table-column> -->
     <el-table-column
      label="操作"
      width="120">
      <template slot-scope="props">
        <el-button type="text" size="small" @click="handleDetail(props.row.paramNo)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="pagination">
    <el-pagination
      :current-page="categorySpecParamsInquiry.page.pageNum"
        background
        @current-change="changePageInquiry"
      :page-size="categorySpecParamsInquiry.page.pageSize"
        layout="total, prev, pager, next"
      :total="categorySpecParamsInquiry.page.count">
      </el-pagination>
    </div>
  </div>
  </div>
     <!--table start-->
  </ui-container>
</template>
<script type="text/javascript">
import { paramType, paramUseType } from '../../../../format/format'
export default {
  name: 'classifyList',
  data () {
    return {
      categorySpecParamsInquiry: {
        paramName: '',
        page: {
          count: 0,
          pageSize: 10,
          pageNum: 1,
          orderBy: 'param.dat_create desc',
          returnCount: true,
          offset: 0,
          limit: 0
        }
      },
      paramsList: []
    }
  },
  methods: {
    async fetchData () {
      const { $api, $message } = this
      try {
        const {dataList, page} = await $api.product.categorySpecParamsPageInquiry(this.categorySpecParamsInquiry)
        this.paramsList = Object.freeze(dataList)
        if (page) this.categorySpecParamsInquiry.page = page
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
      this.categorySpecParamsInquiry.page.pageNum = currentPage
      this.fetchData()
    },
    // 重置 分页
    initPage () {
      this.categorySpecParamsInquiry.page.pageNum = 1
      this.categorySpecParamsInquiry.page.count = 1
    },
    groupDetail: function (groupNo) {
      let path = '/product/parameter/detail'
      this.$router.push({
        path: path,
        query: {
          groupNo: groupNo
        }
      })
    },
    // 添加
    handleAddVal () {
      let path = '/product/parameter/val/addition'
      this.$router.push({
        path: path
      })
    },
    // 编辑
    handleDetail (val) {
      console.log(val)
      let path = '/product/parameter/val/maintenance'
      this.$router.push({
        path: path,
        query: {
          paramNo: val
        }
      })
    }
  },
  filters: {
    paramType: paramType,
    paramUseType: paramUseType
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

.param_name{font-weight: 400; min-width: 80px;}
.param_item{
  margin-right: 3px;
  -webkit-transform: scale(0.90);
}
.param_opiton{
  -webkit-transform: scale(0.80);
}

</style>
