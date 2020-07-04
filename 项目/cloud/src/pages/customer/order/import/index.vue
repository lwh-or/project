
<template>
  <ui-container>
    <!--header start-->
    <div slot="header">
      <el-breadcrumb separator-class="el-icon-arrow-right" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">客户管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/customer/order'}">订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>订单导入</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
     <!--header end-->
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
              <el-form :model="orderImportInquiry" class="lianshang-form">
                <el-row >
                <el-col  :md="5" >
                  <el-form-item label="批次号" label-width="50px">
                      <el-input  v-model="orderImportInquiry.batchNo" disable size="mini" placeholder="请输入批次号"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="2">
                  <div class="hdader-option item_line_height item_btn_margin">
                    <el-button type="primary" size="mini" icon="el-icon-search" @click="searchApply">查询</el-button>
                  </div>
                </el-col>
                 <el-col :span="1">
                  <div class="hdader-option item_line_height item_btn_margin">
                    <el-button
                      type="primary"
                      size="mini"
                      @click="disOrderExport"
                      >导入订单</el-button
                    >
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
                <el-col :span="20"><div>
                  <i class="fa fa-table"/>
                  <span  class="item_border_left">数据列表</span></div>
                </el-col>
                <el-col :span="2">
            <div>
            </div>
          </el-col>
            </el-row>
          </div>
          <div class="table_content">
        <el-table
        border
        size="mini"
        :data="orderList"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
          <el-table-column
          label="批次号"
          prop="batchNo">
        </el-table-column>
        <el-table-column
          label="订单编号"
          prop="orderNo">
        </el-table-column>
         <el-table-column
          label="子订单编号"
          prop="recordNo">
        </el-table-column>
         <el-table-column
          label="快递机构"
          prop="expressOrg">
           </el-table-column>
           <el-table-column
          label="快递单号"
          prop="expressNo">
        </el-table-column>
      </el-table>
      <div class="pagination">
            <el-pagination
                :current-page="orderImportInquiry.page.pageNum"
                background
                @current-change="changePageInquiry"
                :page-size="orderImportInquiry.page.pageSize"
                layout="total, prev, pager, next"
                :total="orderImportInquiry.page.count">
                </el-pagination>
            </div>
      </div>
      </div>
    <template>
          <el-drawer
            title="供应商订单导出"
            :visible.sync="orderImport.show"
            :with-header="false"
            direction="rtl">
            <div class="export__form">
               <el-form :model="orderImport" ref="orderImport"
               label-width="120px">
        <el-form-item label="导入类型">
          <el-input v-model="orderImport.userId"
                    size="mini"></el-input>
        </el-form-item>
        <el-form-item label="文件">
          <el-upload
              action="/none"
              :multiple="false"
              :auto-upload="false"
              :http-request="addFile"
              :on-exceed="fileMaxTip"
              :on-remove="removeList"
              :on-change="changeFile"
              :file-list="fileList"
              :limit="1"
              ref="upload">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip">只能上传xls/xlsx文件，且不超过100M</div>
            </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button @click="orderImport.show = false">取 消</el-button>
                <el-button type="primary" @click="pushFileData">导 入</el-button>
        </el-form-item>
      </el-form>
            </div>
          </el-drawer>
      </template>
     <!--table start-->
  </ui-container>
</template>
<script type="text/javascript">
export default {
  name: 'systemUser',
  data () {
    return {
      fileList: [],
      orderImport: {
        userId: '',
        show: false
      },
      orderImportInquiry: {
        batchNo: '',
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
      orderList: []
    }
  },
  methods: {
    addFile (file) {
      this.fileList[0] = file.file
    },
    removeList () {
      this.fileList.splice(0, 1)
    },
    changeFile (file, fileList) {
      this.fileList.push(fileList[0])
    },
    fileMaxTip () {
      const { $message } = this
      $message.error('只能选择一个文件上传!')
    },
    disOrderExport () {
      this.orderImport.show = true
    },
    async pushFileData () {
      this.$refs.upload.submit()
      try {
        const { $api, $message } = this
        let formData = new FormData()
        console.log(this.fileList)
        formData.append('file', this.fileList[0])
        formData.append('userId', this.orderImport.userId)
        formData.append('optionType', 1)
        const { transactionStatus, batchNo } = await $api.order.ordeImport(formData)
        if (!transactionStatus.success) {
          $message.error('导入失败:' + transactionStatus.replyText)
        } else {
          this.orderImportInquiry.batchNo = batchNo
          $message.success('导入成功')
          this.orderImport.show = false
          this.fetchOrderData()
        }
      } catch (error) {
      } finally {
      }
    },
    async fetchOrderData () {
      const { $api, $message } = this
      try {
        let {dataList, page} = await $api.order.orderImportPageListInquiry(this.orderImportInquiry)
        this.orderList = Object.freeze(dataList)
        if (page) this.orderImportInquiry.page = page
      } catch (error) {
        $message.error(error.replyText)
      }
    },
    async searchApply () {
      this.initPage()
      this.fetchOrderData()
    },
    changePageInquiry: function (currentPage) {
      this.orderImportInquiry.page.pageNum = currentPage
      this.fetchOrderData()
    },
    initPage () {
      this.orderImportInquiry.page.pageNum = 1
      this.orderImportInquiry.page.count = 1
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
  }
}
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
</style>
