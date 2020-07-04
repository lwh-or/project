
<template>
  <ui-container>
    <!--header start-->
    <div slot="header">
      <el-breadcrumb separator-class="el-icon-arrow-right" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>规格组管理</el-breadcrumb-item>
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
          <el-form :model="categorySpecGroupInquiry" class="lianshang-form">
            <el-row >
              <el-col  :md="5" >
               <el-form-item label="组名称" label-width="60px">
                  <el-input size="mini"  placeholder="组名称" v-model="categorySpecGroupInquiry.groupName" clearable></el-input>
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
      <div class="table_header_bar  item_header_bar">
         <el-row type="flex" class="row-bg">
            <el-col :span="18"><div>
              <i class="fa fa-table"/>
              <span class="item_border_left">数据列表</span></div>
            </el-col>
            <el-col :span="6" :offset="20">
              <el-button size="small" class="addStyle" @click="handleAdd">+ 添加</el-button>
            </el-col>
        </el-row>
      </div>
       <div class="table_content">
     <el-table
     border
     size="mini"
    :data="groupList">
     <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="编号"
      width="100"
      prop="groupNo">
    </el-table-column>
     <el-table-column
      label="名称"
       width="160"
      prop="groupName">
    </el-table-column>
    <el-table-column
      label="参数">
      <template slot-scope="scope">
         <div  v-for="(item,index) in scope.row.groupValList" :key="index">
              <span class="param_name">
                <el-tag size="mini" class="param_opiton" type="danger">{{item.useType | paramUseType}}</el-tag>
                <el-tag size="mini" class="param_opiton" type="danger">{{item.paramType | paramType}}</el-tag>
                <i class="iconfont icon-xitong">{{item.paramName}}</i>
               </span>
              <template v-if="item.vals">
                <el-tag size="mini" effect="plain" class="param_item"  v-for="(_item,index) in item.vals.split(',')" :key="index">{{_item}}</el-tag>
              </template>
         </div>
      </template>
    </el-table-column>
     <el-table-column
      label="绑定分类数(个)">
       <template slot-scope="scope">
         <el-link type="primary">{{scope.row.categoryCount}}</el-link>
      </template>
    </el-table-column>
  <el-table-column
      label="操作"
      width="180">
      <template slot-scope="props">
        <!-- <el-button type="text" size="small" @click="groupDetail(props.row.groupNo)">查看</el-button> -->
        <el-button type="text" size="small" @click="handleDetail(props.row.groupNo)">编辑</el-button>
        <!-- <el-button type="text" size="small" @click="handleDel(props.row.groupNo)">删除</el-button> -->
      </template>
    </el-table-column>
  </el-table>
  <div class="pagination">
    <el-pagination
      :current-page="categorySpecGroupInquiry.page.pageNum"
        background
        @current-change="changePageInquiry"
      :page-size="categorySpecGroupInquiry.page.pageSize"
        layout="total, prev, pager, next"
      :total="categorySpecGroupInquiry.page.count">
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
      categorySpecGroupInquiry: {
        groupName: '',
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
      groupList: []
    }
  },
  methods: {
    async fetchData () {
      const { $api, $message } = this
      try {
        const {dataList, page} = await $api.product.categorySpecGroupLIstInquiry(this.categorySpecGroupInquiry)
        this.groupList = Object.freeze(dataList)
        if (page) this.categorySpecGroupInquiry.page = page
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
      this.categorySpecGroupInquiry.page.pageNum = currentPage
      this.fetchData()
    },
    // 重置 分页
    initPage () {
      this.categorySpecGroupInquiry.page.pageNum = 1
      this.categorySpecGroupInquiry.page.count = 1
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
    handleAdd () {
      let path = '/product/parameter/group/addition'
      this.$router.push({
        path: path
        // query: {
        //   brandNo: applyNo
        // }
      })
    },
    // 编辑
    handleDetail (val) {
      let path = '/product/parameter/group/maintenance'
      this.$router.push({
        path: path,
        query: {
          brandNo: val
        }
      })
    },
    // 删除
    async handleDel (val) {
      val.status = 2
      val.dis = val.dis ? 1 : 0
      const { $api, $message } = this
      try {
        await $api.product.productBrandMaintenance(val)
        this.initPage()
        this.fetchData()
      } catch (error) {
        $message.error(error.replyText)
      } finally {
        this.submitLoad = false
      }
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
