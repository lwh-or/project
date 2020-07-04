
<template>
  <ui-container>
    <!--header start-->
    <div slot="header">
      <el-breadcrumb separator-class="el-icon-arrow-right" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">供应商管理</el-breadcrumb-item>
        <el-breadcrumb-item>供应商列表</el-breadcrumb-item>
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
          <el-form :model="supplierInquiry" class="lianshang-form">
            <el-row >
              <el-col  :md="5" >
               <el-form-item label="供应商名称：" label-width="95px">
                  <el-input  disable size="mini" v-model="supplierInquiry.supplierName" placeholder="请输入供应商名称" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col  :md="7" :offset="1">
               <el-form-item label="审核状态：" label-width="120px">
                  <el-select v-model="supplierInquiry.status" placeholder="请选择状态" size="mini" clearable>
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4">
              <div class="hdader-option item_line_height lianshang-form el-form-item">
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
              <el-button size="small" class="addStyle" @click="handleAdd">+ 添加供应商</el-button>
            </el-col>
        </el-row>
      </div>
       <div class="table_content">
     <el-table
     border
     size="mini"
    :data="supplierList"
    style="width: 100%">
     <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="供应商编码"
      prop="supplierNo" show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      label="供应商名称"
      prop="supplierName">
    </el-table-column>
    <el-table-column
      label="供应商等级"
      prop="">
      <template slot-scope="scope">
        {{scope.row.supplierLevel | supplierLeveFilter}}
      </template>
    </el-table-column>
    <el-table-column
      label="开户银行"
      prop="bankType">
      <template slot-scope="scope">
        {{scope.row.bankType | bankTypeFilter}}
      </template>
    </el-table-column>
    <el-table-column
      label="银行卡号"
      prop="bankNumber">
    </el-table-column>
    <el-table-column
      label="合作状态"
      prop="supplierStatus">
      <template slot-scope="scope">
        {{ scope.row.supplierStatus | cooperationFilter}}
      </template>
    </el-table-column>
    <el-table-column
      label="审核状态"
      prop="status">
      <template slot-scope="props">
        <p>{{props.row.status | typeStatus}}</p>
        <p class="details" @click="dialogTableVisible=true" v-if="props.row.status === 1 || props.row.status === 4">审核详情</p>
        <!-- <el-button type="text" size="small" v-if="props.row.supplierStatus">审核详情</el-button> -->
      </template>
    </el-table-column>
    <el-table-column
        label="操作"
        width="100">
        <template slot-scope="props">
          <el-button type="text" size="small" @click="handleModify(props.row.supplierNo)">供应商维护</el-button>
          <!-- <el-button type="text" size="small" @click="handleMaintenance(props.row.supplierNo)">供应商维护</el-button> -->
        </template>
      </el-table-column>
  </el-table>
  <div class="pagination">
    <el-pagination
      :current-page="supplierInquiry.page.pageNum"
        background
        @current-change="changePageInquiry"
      :page-size="supplierInquiry.page.pageSize"
        layout="total, prev, pager, next"
      :total="supplierInquiry.page.count">
      </el-pagination>
    </div>
  </div>
  </div>
     <!--table start-->
  <el-dialog title="审核详情" :visible.sync="dialogTableVisible">
    <el-table :data="gridData">
      <el-table-column property="date" label="审核时间" width="150"></el-table-column>
      <el-table-column property="name" label="审核人员" width="200"></el-table-column>
      <el-table-column property="address" label="审核结果 "></el-table-column>
      <el-table-column property="address" label="反馈详情 "></el-table-column>
    </el-table>
  </el-dialog>
  </ui-container>
</template>
<script type="text/javascript">
export default {
  name: 'supplierList',
  data () {
    return {
      gridData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      dialogTableVisible: false,
      supplierInquiry: {
        supplierName: '',
        supplierStatus: '',
        status: '',
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
      options: [
        {value: 1, label: '已审核'},
        {value: 2, label: '待审核'}
      ],
      supplierList: []
    }
  },
  filters: {
    typeStatus (val) {
      let arr = {
        1: '已审核',
        2: '待审核',
        4: '拒绝'
      }
      return arr[val]
    },
    supplierLeveFilter (val) {
      let arr = {
        1: 'A',
        2: 'B',
        3: 'C',
        4: 'D'
      }
      return arr[val]
    },
    bankTypeFilter (val) {
      let arr = {
        0: '对公账号',
        1: '个人账号'
      }
      return arr[val]
    },
    cooperationFilter (val) {
      let arr = {
        0: '未开始合作',
        1: '合作中',
        2: '停止合作'
      }
      return arr[val]
    }
  },
  methods: {
    async fetchData () {
      const { $api, $message } = this
      try {
        let {dataList, page} = await $api.supplier.supplierListInquiry(this.supplierInquiry)
        this.supplierList = Object.freeze(dataList)
        if (page) this.supplierInquiry.page = page
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
      this.supplierInquiry.page.pageNum = currentPage
      this.fetchData()
    },
    // 重置 分页
    initPage () {
      this.supplierInquiry.page.pageNum = 1
      this.supplierInquiry.page.count = 1
    },
    handleAdd: function (supplierNo) {
      let path = '/supplier/addition'
      this.$router.push({
        path: path
      })
    },
    // 详情
    handleModify (id) {
      let path = '/supplier/maintenance'
      this.$router.push({
        path: path,
        query: {
          supplierNo: id
        }
      })
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
.details{
  color: #3CB371;
  cursor: pointer;
}
</style>
