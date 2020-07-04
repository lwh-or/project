
<template>
  <ui-container>
    <!--header start-->
    <div slot="header">
      <el-breadcrumb separator-class="el-icon-arrow-right" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">客户管理</el-breadcrumb-item>
        <el-breadcrumb-item>售后管理</el-breadcrumb-item>
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
        <el-form :model="serveInquiry" class="lianshang-form">
          <el-row >
          <el-col  :md="5" >
              <el-form-item label="售后编号">
                <el-input  disable size="mini" placeholder="请输入售后编号"></el-input>
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
        :data="serveList"
        @row-click="tableRowClick"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="售后编号"
          prop="serveNo">
        </el-table-column>
        <el-table-column
          label="订单号"
          prop="orderNo">
        </el-table-column>
        <el-table-column
          label="子订单号"
          prop="recordNo">
        </el-table-column>
        <el-table-column
          label="客户编号"
          prop="customerNo">
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
          label="退货联系人"
          prop="datFinish">
        </el-table-column>
        <el-table-column
          label="退货地址"
          prop="addressProvince">
        </el-table-column>
        <el-table-column
          label="退货快递公司"
          prop="expressOrg">
        </el-table-column>
        <el-table-column
          label="快递单号"
          prop="expressNo">
        </el-table-column>
        <el-table-column
          label="店铺编号"
          prop="storeNo">
        </el-table-column>
        <el-table-column
          label="退款编号"
          prop="refundNo">
        </el-table-column>
            <el-table-column
          label="供应商编号"
          prop="supplierNo">
        </el-table-column>
          <el-table-column
          label="售后状态"
          prop="status">
        </el-table-column>
        <el-table-column
          label="操作"
          prop="serveNo">
          <template slot-scope="scope">
            <el-button type="text" size="small"  @click.stop="viewDetails(scope)">退货/退款</el-button>
            <el-button type="text" style="margin-left: 0" size="small"  @click.stop="asleDetails(scope)">售后确认</el-button>
            <!-- <p class="details" @click.native.stop="viewDetails(scope)"></p> -->
            <!-- <p class="details" @click.native.stop="asleDetails(scope)"></p> -->
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          :current-page="serveInquiry.page.pageNum"
            background
            @current-change="changePageInquiry"
          :page-size="serveInquiry.page.pageSize"
            layout="total, prev, pager, next"
          :total="serveInquiry.page.count">
        </el-pagination>
      </div>
  </div>
  </div>
     <!--table start-->
     <el-dialog
      title="单号信息树状图"
      :visible.sync="dialogVisible">
      <div style="height: 100%;">
        <el-steps direction="vertical" :active="1"  space="20%" finish-status="success">
          <div v-for="(e, i) of logDataList" :key="i" class="w_waer">
            <el-step >
             <template slot="title">
               {{ e.nodeTxt }}
             </template>
            </el-step>
             <div class="timer">
               {{ e.timeStr }}
             </div>
          </div>
        </el-steps>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  <!-- 售后处理方式 -->
  <el-dialog title="售后处理方式" width="30%" :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules" ref="serveForm">
      <el-form-item label="售后服务编号" :label-width="formLabelWidth" prop="serveNo">
        <el-input v-model="form.serveNo" disabled autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="售后处理方式" :label-width="formLabelWidth" prop="processMode">
        <el-select v-model="form.processMode" placeholder="请选择售后处理方式">
          <el-option label="退货/退款" :value="1"></el-option>
          <el-option label="仅退款" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="审核结果" :label-width="formLabelWidth" prop="result">
        <el-radio-group v-model="form.result">
          <el-radio :label="1">成功</el-radio>
          <el-radio :label="2">拒绝</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="审核意见" :label-width="formLabelWidth" prop="idea">
        <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 2}" v-model="form.idea" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitFrom('serveForm')">确 定</el-button>
    </div>
  </el-dialog>
  </ui-container>
</template>
<script type="text/javascript">
export default {
  name: 'systemUser',
  data () {
    return {
      serveInquiry: {
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
      dialogVisible: false,
      serveList: [],
      logDataList: [],
      dialogFormVisible: false,
      formLabelWidth: '120px',
      rules: {
        processMode: [
          { required: true, message: '请选择售后处理方式', trigger: 'change' }
        ],
        result: [
          { required: true, message: '请选择审核结果', trigger: 'change' }
        ],
        idea: [
          { required: true, message: '请输入审核意见', trigger: 'blur' }
        ]
      },
      form: {
        processMode: 1,
        serveNo: '',
        idea: '',
        result: 1
      }
    }
  },
  methods: {
    async fetchData () {
      const { $api, $message } = this
      try {
        let {dataList, page} = await $api.customer.servePageListInquiry(this.serveInquiry)
        this.serveList = Object.freeze(dataList)
        if (page) this.serveInquiry.page = page
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
      this.serveInquiry.page.pageNum = currentPage
      this.fetchData()
    },
    initPage () {
      this.serveInquiry.page.pageNum = 1
      this.serveInquiry.page.count = 1
    },
    tableRowClick (row) {
      const { expressNo, expressOrg } = row
      if (expressNo && expressOrg) {
        this.shopExpressLogListInquiry({ expressNo, expressOrg })
        this.dialogVisible = true
      }
    },
    cellClick (row) {
      console.log(row)
    },
    async shopExpressLogListInquiry ({ expressNo, expressOrg }) {
      const { $api, $message } = this
      try {
        let { dataList } = await $api.customer.shopExpressLogListInquiry({ expressNo, expressOrg })
        this.logDataList = dataList
      } catch (error) {
        $message.error(error.replyText)
      } finally {
      }
    },
    viewDetails (scope) {
      this.form.serveNo = scope.row.serveNo
      this.dialogFormVisible = true
    },
    async pushApply () {
      const {transactionStatus} = await this.$api.customer.serveApproved(this.form)
      if (transactionStatus.success) {
        this.$message.success('新增成功')
        this.searchApply()
        this.dialogFormVisible = false
      } else {
        this.$message.error(transactionStatus.replyText)
        this.dialogFormVisible = false
      }
    },
    submitFrom (fromName) {
      this.$refs[fromName].validate((valid) => {
        // 验证
        if (valid) {
          this.pushApply()
        } else {
          return false
        }
      })
    },
    async asleDetails (scope) {
      let errortext = ''
      this.$confirm('确认收到或将给客户退款处理退款,您确认收到货啦吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const params = {
          serveNo: scope.row.serveNo
        }
        const {transactionStatus} = await this.$api.customer.serveReturn(params)
        if (transactionStatus.success) {
          this.$message({
            type: 'success',
            message: '修改成功!'
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
        // this.$message({
        //   type: 'info',
        //   message: errortext
        // })
      })
    }
  },
  mounted () {
    this.fetchData()
  }
}
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
.w_waer{
  position: relative;
}
.w_waer{
 &:last-of-type{
   /deep/ .el-step__line{
     display: none;
   }
 }
}
.el-step.is-vertical{
  width: 80%;
  margin-left: 150px;
}
.timer{
  position: absolute;
  top: 4px;
  left: 0;
}
.el-step__title{
  font-size: 14px;
}
.details{
  cursor: pointer;
}
</style>
