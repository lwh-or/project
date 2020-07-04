
<template>
  <ui-container>
    <!--header start-->
    <div slot="header">
      <el-breadcrumb separator-class="el-icon-arrow-right" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">客户管理</el-breadcrumb-item>
        <el-breadcrumb-item>退款申请</el-breadcrumb-item>
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
          <el-form :model="refundInquiry" class="lianshang-form">
            <el-row >
            <el-col  :md="5" >
               <el-form-item label="退款编号">
                  <el-input  disable size="mini" placeholder="请输入退款编号"></el-input>
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
    :data="refundList"
    style="width: 100%">
     <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="退款申请编号"
      prop="applyNo">
    </el-table-column>
    <el-table-column
      label="子订单编号"
      prop="orderRecordNo">
    </el-table-column>
    <el-table-column
      label="支付编号"
      prop="payRecordNo">
    </el-table-column>
    <el-table-column
      label="退款金额"
      prop="amtRefund">
    </el-table-column>
     <el-table-column
      label="快递公司"
      prop="expressOrg">
    </el-table-column>
     <el-table-column
      label="快递单号"
      prop="expressNo">
    </el-table-column>
    <el-table-column
      label="申请时间"
      prop="datApply">
    </el-table-column>
    <el-table-column
      label="完成时间"
      prop="datFinish">
    </el-table-column>
    <el-table-column
      label="状态"
      prop="status">
      <template slot-scope="scope">
        <p>{{refundState[scope.row.status]}}</p>
      </template>
    </el-table-column>
    <el-table-column
      label="操作"
      prop="status">
        <template slot-scope="scope">
          <!-- <p>{{refundState[scope.row.status]}}</p> -->
          <p :class="refundClass[scope.row.status]" @click="clickRefund(scope)">退款</p>
        </template>
    </el-table-column>
  </el-table>
  <div class="pagination">
         <el-pagination
            :current-page="refundInquiry.page.pageNum"
             background
             @current-change="changePageInquiry"
            :page-size="refundInquiry.page.pageSize"
             layout="total, prev, pager, next"
            :total="refundInquiry.page.count">
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
      refundInquiry: {
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
      refundList: [],
      refundState: {
        1: '申请中',
        2: '成功',
        4: '失败'
      },
      refundClass: {
        1: 'rf_applying',
        2: 'rf_success',
        4: 'rf_error'
      }
    }
  },
  methods: {
    // 退款
    clickRefund (scope) {
      // 退款申请中
      if (scope.row.status === 1) {
        this.asleDetails(scope)
      } else {
        return false
      }
    },
    async asleDetails (scope) {
      let errortext = ''
      this.$confirm('确认收到或将给客户退款处理退款,您确认收到货啦吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const params = {
          refundApplyNo: scope.row.applyNo
        }
        const {transactionStatus} = await this.$api.customer.apply(params)
        if (transactionStatus.success) {
          this.$message({
            type: 'success',
            message: '退款成功!'
          })
          this.searchApply()
        } else {
          errortext = transactionStatus.replyText
          this.$message({
            type: 'info',
            message: errortext
          })
        }
      }).catch(() => {
      })
    },
    async fetchData () {
      const { $api, $message } = this
      try {
        let {dataList, page} = await $api.customer.refundPageListInquiry(this.refundInquiry)
        this.refundList = Object.freeze(dataList)
        if (page) this.refundInquiry.page = page
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
      this.refundInquiry.page.pageNum = currentPage
      this.fetchData()
    },
    initPage () {
      this.refundInquiry.page.pageNum = 1
      this.refundInquiry.page.count = 1
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
.rf_applying{
  color:#FFA500;
  cursor: pointer;
}
.rf_success{
  color: #A9A9A9;
  cursor: pointer;
}
.rf_error {
  color:#FF0000;
  cursor: pointer;
}
</style>
