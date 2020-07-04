<template>
  <ui-container>
    <!--header start-->
    <div slot="header">
      <el-breadcrumb separator-class="el-icon-arrow-right" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--header end-->
    <!--search start-->
    <div slot="search" class="search-wrapper">
      <div class="search_header_bar">
        <el-row type="flex" class="row-bg">
          <el-col :span="5"
            ><div>
              <i class="fa fa-search" />
              <span class="item_border_left">筛选查询</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="search-content">
        <el-form class="lianshang-form">
          <el-row>
            <el-col :md="4">
              <el-form-item label="输入搜索:" label-width="70px">
                <el-input
                  v-model="customerInquiry.customerNo"
                  size="mini"
                  placeholder="订单编号/商品货号"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="5">
              <el-form-item label="收货人:" label-width="120px">
                <el-input
                  disable
                  size="mini"
                  placeholder="收货人姓名/手机号码"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="5">
              <el-form-item label="提交时间:" label-width="120px">
                <!-- <el-input  disable size="mini" placeholder="请选择时间"></el-input> -->
                <el-date-picker
                  v-model="submitTime"
                  type="date"
                  prefix-icon="el-icon-time"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :md="5">
              <el-form-item label="供应商:" label-width="120px">
                <template>
                  <el-select
                    v-model="value1"
                    collapse-tags
                    multiple
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </template>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <div class="hdader-option item_line_height item_btn_margin">
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-search"
                  @click="changeOrder"
                  >查询</el-button
                >
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <!--search end-->
    <!--table start-->
    <div id="customer" class="table_wrapper">
      <div class="table_header_bar item_header_bar">
        <el-row type="flex" class="row-bg">
          <el-col :span="18"
            ><div>
              <i class="fa fa-table" />
              <span class="item_border_left">数据列表</span>
            </div>
          </el-col>
          <el-col :span="2">
            <div>
              <el-button
                  type="primary"
                  size="mini"
                  @click="disSupplierOrderExport"
                  >供应商订单导出</el-button
                >
            </div>
          </el-col>
           <el-col :span="2">
            <div>
              <el-button
                  type="primary"
                  size="mini"
                  @click="disOmOrderExport"
                  >运营订单导出</el-button
                >
            </div>
          </el-col>
          <el-col :span="2">
            <div>
              <el-button
                  type="primary"
                  size="mini"
                  @click="$router.push('/customer/order/import')"
                  >订单导入 </el-button
                >
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="table_content item_table_none">
        <el-table style="width: 100%" row-key="id" border empty-text="">
          <el-table-column
            prop="orderNo,mobile"
            label="商品信息"
            align="center"
            width="330"
          >
          </el-table-column>
          <el-table-column prop="name" label="店铺" align="center" width="180">
          </el-table-column>
          <el-table-column prop="address" align="center" label="商户价">
          </el-table-column>
          <el-table-column prop="address" align="center" label="成交价">
          </el-table-column>
          <el-table-column
            prop="address"
            align="center"
            width="100"
            label="数量"
          >
          </el-table-column>
          <el-table-column prop="address" align="center" label="合计">
          </el-table-column>
          <el-table-column prop="address" align="center" label="供应商">
          </el-table-column>
          <el-table-column prop="address" align="center" label="订单状态">
          </el-table-column>
          <el-table-column label="操作" align="center" prop="tel">
            <span
              class="order_details"
              @click="$router.push('/customer/order/details')"
              >查看详情>></span
            >
          </el-table-column>
        </el-table>
        <!-- 内容 -->
        <div class="orderContent">
          <div
            class="order_con"
            v-for="(item, index) in customerList"
            :key="index"
          >
            <!-- 父级订单 -->
            <div class="order_Parent">
              <div class="op_top">
                <div class="item_order_left">
                  <span class="item_order_width">订单编号：</span
                  ><span>{{ item.orderNo }} </span>
                </div>
                <div class="item_order_left">
                  <span class="item_order_width">下单时间：</span
                  ><span>{{ item.datOrder }}</span>
                </div>
                <div class="item_order_left">
                  <span class="item_order_width">实付金额：</span>
                  <span>￥{{ item.amtPayTotal }}</span>
                </div>
                <div class="item_order_left">
                  <span class="item_order_width">订单状态：</span>
                  <span>{{ orderStatus[item.orderStatus] }}</span>
                </div>
              </div>
              <div class="op_bottom">
                <div class="item_order_left">
                  <span class="item_order_width">卖家ID：</span
                  ><span>{{ item.customerNo }} </span>
                </div>
                <div class="item_order_left information">
                  <span
                    >收货信息：{{ item.addressProvince }}{{ item.addressCity
                    }}{{ item.addressDistrict }}{{ item.addressStreet
                    }}{{ item.addressDetail }} &nbsp;&nbsp;&nbsp;{{
                      item.contactPerson
                    }}&nbsp;&nbsp;&nbsp;{{item.mobile}}</span
                  >
                </div>
              </div>
              <!-- 待支付 -->
              <div class="sub_comm_see">
                <div class="hdader-option header_detail_see">
                  <el-button
                    type="primary"
                    size="mini"
                    @click="handleModify(item.orderNo)"
                    >查看详情</el-button
                  >
                </div>
              </div>
              <!-- 待发货 -->
              <!-- <div
                class="sub_comm_see sub_comm_success"
                v-else-if="item.orderStatus === 2"
              >
                <el-button
                  type="primary"
                  size="mini"
                  @click="handleModify(item.orderNo)"
                  >查看详情</el-button
                >
              </div> -->
              <!-- 待收货 -->
              <!-- <div class="sub_comm_see" v-else-if="item.orderStatus === 4">
                <el-button
                  type="primary"
                  size="mini"
                  @click="handleModify(item.orderNo)"
                  >查看详情</el-button
                >
              </div> -->
              <!-- 已完成 -->
              <!-- <div class="sub_comm_see" v-else-if="item.orderStatus === 8">
                <div class="hdader-option header_detail_see">
                  <el-button
                    type="primary"
                    size="mini"
                    @click="handleModify(item.orderNo)"
                    >查看详情</el-button
                  >
                </div>
              </div> -->
              <!-- 取消 -->
              <!-- <div class="sub_comm_see" v-else-if="item.orderStatus === 16">
                <div class="hdader-option header_detail_see">
                  <el-button
                    type="primary"
                    size="mini"
                    @click="handleModify(item.orderNo)"
                    >查看详情</el-button
                  >
                </div>
              </div> -->
              <!-- 运营订单导出 -->
              <!-- <div class="sub_comm_see" >
                <div class="hdader-option header_detail_see">
                  <el-button
                    type="primary"
                    size="mini"
                    @click="handleModify(item.orderNo)"
                    >运营订单导出</el-button
                  >
                </div>
              </div> -->
            </div>
            <!-- 子订单 -->
            <div v-if="item.orderRecords.length > 0">
              <div
                class="order_Sub"
                v-for="(item2, index) in item.orderRecords"
                :key="index"
              >
                <!-- 子订单编号 -->
                <div class="sub_number">
                  <span>子订单号: {{ item2.recordNo }}</span>
                </div>
                <!-- 订单内容 -->
                <div class="sub_content">
                  <!-- 商品信息 -->
                  <div class="sub_comm">
                    <img :src="item2.productImgUrl" alt="" />
                    <div class="sub_comm_con">
                      <span>{{ item2.productTitle }}</span>
                      <span>规格：{{ item2.ownFeatStr }}</span>
                      <span>sku编码：{{ item2.specsNo }}</span>
                    </div>
                  </div>
                  <!-- 店铺 -->
                  <div class="sub_item sub_shop">
                    <span>{{ item2.storeName }}-LV4</span>
                  </div>
                  <!-- 商户价 -->
                  <div class="sub_item sub_price">
                    <span>￥{{ item2.amtPay }}</span>
                  </div>
                  <!-- 成交价 -->
                  <div class="sub_item sub_deal">
                    <span>￥{{ item2.amtPay }}</span>
                    <span>(惊喜价：￥{{ item2.amtPay }})</span>
                  </div>
                  <!-- 数量 -->
                  <div class="sub_item sub_num">
                    <span>{{ item2.num }}</span>
                  </div>
                  <!-- 合计 -->
                  <div class="sub_item sub_all">
                    <span>￥{{ item2.amtPay }}</span>
                  </div>
                  <!-- 供应商 -->
                  <div class="sub_item sub_deal">
                    <span>{{ item2.supplierName }}</span>
                    <span>(采购价：￥{{ item2.amtPay }})</span>
                  </div>
                  <!-- 订单状态 -->
                  <div class="sub_item sub_state">
                    <span :class="colorStatus[item2.orderStatus]">{{
                      orderStatus[item2.orderStatus]
                    }}</span>
                  </div>
                  <!-- 操作 -->
                  <div
                    class="sub_item sub_operation"
                    :class="[item2.orderStatus == 2 ? 'operation' : '']"
                  >
                    <!-- 暂时点不了 -->
                    <p class="sub_delete">删除</p>
                    <p
                      v-if="item2.orderStatus == 2"
                      class="goods"
                      @click="showGoods(item2.recordNo)"
                    >
                      发货
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 分页 -->
        <div class="pagination">
          <el-pagination
            :current-page="customerInquiry.page.pageNum"
            background
            @current-change="changePageInquiry"
            :page-size="customerInquiry.page.pageSize"
            layout="total, prev, pager, next"
            :total="customerInquiry.page.count"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- 发货 -->
    <el-dialog title="商品发货" width="30%" :visible.sync="dialogFormVisible">
      <el-form :model="sendObj" ref="expressForm" :rules="rules">
        <el-form-item
          label="订单编号"
          :label-width="formLabelWidth"
          prop="serveNo"
        >
          <el-input
            v-model="sendObj.recordNo"
            disabled
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="快递单号"
          :label-width="formLabelWidth"
          prop="expressNo"
        >
          <el-input
            v-model="sendObj.expressNo"
            placeholder="请输入快递单号"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="快递公司"
          :label-width="formLabelWidth"
          prop="expressOrgNo"
        >
          <el-select v-model="sendObj.expressOrgNo" placeholder="请选择快递公司">
            <el-option
              v-for="(item, index) in expressList"
              :key="index"
              :label="item.orgName"
              :value="item.orgCode"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitFrom('expressForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 供应商订单导出 -->
    <template>
      <div class="item_width">
        <el-drawer
          title="供应商订单导出"
          :visible.sync="exportSpOrder.show"
          :with-header="false"
           direction="rtl">
          <div class="export__form">
            <el-form :model="exportSpOrder">
              <h1 class="item_export">供应商订单导出</h1>
              <el-form-item label="供应商名称:" class="item_supplier">
                <el-input v-model="exportSpOrder.supplierNo" autocomplete="off" class="item_export_from "></el-input>
              </el-form-item>
              <el-form-item label="订单开始时间:" class="item_supplier">
                 <el-date-picker
                  v-model="exportSpOrder.datStart"
                  type="datetime"
                  placeholder="选择开始时间"
                  default-time="00:00:00">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="订单结束时间:" class="item_supplier">
                 <el-date-picker
                  v-model="exportSpOrder.datEnd"
                  type="datetime"
                  placeholder="选择结束时间"
                  default-time="23:59:59">
                </el-date-picker>
              </el-form-item>
            </el-form>
            <div class="demo-drawer__footer">
              <el-button @click="exportSpOrder.show = false" class="item_cancel">取 消</el-button>
              <el-button type="primary" @click="spOrderExport" class="item_cancel">导 出</el-button>
            </div>
          </div>
        </el-drawer>
      </div>
    </template>
    <!-- 运营订单导出 -->
    <template>
        <el-drawer
          title="运营订单导出"
          :visible.sync="exportOmOrder.show"
          :with-header="false"
           direction="rtl">
          <div class="export__form">
            <el-form :model="exportOmOrder">
              <h1 class="item_export">运营订单导出</h1>
              <el-form-item label="供应商名称:" class="item_supplier">
                <el-input v-model="exportOmOrder.customerNo" autocomplete="off" class="item_export_from "></el-input>
              </el-form-item>
              <el-form-item label="订单开始时间:" class="item_supplier">
                 <el-date-picker
                  v-model="exportOmOrder.datStart"
                  type="datetime"
                  placeholder="选择开始时间"
                  class="item_font_sixe"
                  default-time="00:00:00">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="订单结束时间:"  class="item_supplier">
                 <el-date-picker
                  v-model="exportOmOrder.datEnd"
                  type="datetime"
                  placeholder="选择结束时间"
                  default-time="23:59:59">
                </el-date-picker>
              </el-form-item>
            </el-form>
            <div class="demo-drawer__footer">
              <el-button @click="exportOmOrder.show = false" class="item_cancel">取 消</el-button>
              <el-button type="primary" @click="omOrderExport" class="item_cancel">导 出</el-button>
            </div>
          </div>
        </el-drawer>
    </template>
  </ui-container>
</template>
<script type="text/javascript">
export default {
  name: 'orderList',
  data () {
    return {
      exportSpOrder: {
        show: false,
        supplierNo: '',
        datStart: '',
        datEnd: ''
      },
      exportOmOrder: {
        show: false,
        customerNo: '',
        datStart: '',
        datEnd: ''
      },
      customerInquiry: {
        customerNo: '',
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
      orderStatus: {
        1: '待支付',
        2: '待发货',
        4: '待收货',
        8: '已完成',
        16: '取消'
      },
      colorStatus: {
        1: 'sub_pai',
        2: 'sub_delivered',
        4: 'sub_receipt',
        8: 'sub_complete',
        16: 'sub_cancel'
      },
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value1: [],
      display: '0',
      customerList: [],
      submitTime: '',
      dialogFormVisible: false,
      formLabelWidth: '120px',
      sendCargoObj: {
        sendCargoList: []
      },
      sendObj: {
        recordNo: '',
        expressNo: '',
        expressOrgNo: ''
      },
      expressList: [],
      rules: {
        expressNo: [
          { required: true, message: '请输入快递单号', trigger: 'blur' }
        ],
        expressOrgNo: [
          { required: true, message: '请选择快递公司', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    // 供应商订单导出
    disSupplierOrderExport () {
      this.exportSpOrder.show = true
    },
    // 供应商订单导出
    async spOrderExport () {
      const datEnd = this.parseTime(this.exportSpOrder.datEnd)
      const datStart = this.parseTime(this.exportSpOrder.datStart)
      const comTime = this.compareTime(datStart, datEnd)
      if (comTime) {
        const exportURL = 'api/shopcrm/supplier/order/export' + '?supplierNo=' + this.exportSpOrder.supplierNo + '&datEnd=' + datEnd + '&datStart=' + datStart
        const fileName = 'supplier.xlsx'
        if ('download' in document.createElement('a')) { // 支持a标签download的浏览器
          const link = document.createElement('a') // 创建a标签
          link.download = fileName // a标签添加属性
          link.style.display = 'none'
          link.href = exportURL
          link.target = '_self'
          document.body.appendChild(link)
          link.click() // 执行下载
          URL.revokeObjectURL(link.href) // 释放url
          document.body.removeChild(link) // 释放标签
        } else { // 其他浏览器
          // navigator.msSaveBlob(blob, fileName)
        }
        this.$message({
          message: '导出成功',
          type: 'success'
        })
        this.exportSpOrder.supplierNo = ''
        this.exportSpOrder.datStart = ''
        this.exportSpOrder.datEnd = ''
        this.exportSpOrder.show = false
      } else {
        this.exportSpOrder.supplierNo = ''
        this.exportSpOrder.datStart = ''
        this.exportSpOrder.datEnd = ''
        this.exportSpOrder.show = false
      }
      // window.open(exportURL)
      // window.location.href = exportURL
    },
    // 时间格式转换
    parseTime (d) {
      if (!d) {
        this.$message('开始时间或结束时间不能为空')
      } else {
        const newDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
        return newDate
      }
    },
    // 判断开始时间是否大于结束时间函数
    compareTime (startDate, endDate) {
      if (startDate.length > 0 && endDate.length > 0) {
        var startDateTemp = startDate.split(' ')
        var endDateTemp = endDate.split(' ')
        var arrStartDate = startDateTemp[0].split('-')
        var arrEndDate = endDateTemp[0].split('-')
        var arrStartTime = startDateTemp[1].split(':')
        var arrEndTime = endDateTemp[1].split(':')
        var allStartDate = new Date(arrStartDate[0], arrStartDate[1], arrStartDate[2], arrStartTime[0], arrStartTime[1], arrStartTime[2])
        var allEndDate = new Date(arrEndDate[0], arrEndDate[1], arrEndDate[2], arrEndTime[0], arrEndTime[1], arrEndTime[2])
        if (allStartDate.getTime() >= allEndDate.getTime()) {
          this.$message('开始时间不能大于结束时间')
          this.exportSpOrder.datStart = ''
          this.exportSpOrder.datEnd = ''
          return false
        } else {
          return true
        }
      } else {
        this.$message('开始时间或结束时间不能为空')
        return false
      }
    },
    // 运营订单导出
    disOmOrderExport () {
      this.exportOmOrder.show = true
    },
    // 运营订单导出
    async omOrderExport () {
      const datEnd = this.parseTime(this.exportOmOrder.datEnd)
      const startEnd = this.parseTime(this.exportOmOrder.datStart)
      const comTime = this.compareTime(startEnd, datEnd)
      if (comTime) {
        const exportURL = '/api/shopcrm/om/order/export' + '?customerNo=' + this.exportOmOrder.customerNo + '&datEnd=' + datEnd + '&datStart=' + startEnd
        const fileName = 'customer.xlsx'
        if ('download' in document.createElement('a')) { // 支持a标签download的浏览器
          const link = document.createElement('a') // 创建a标签
          link.download = fileName // a标签添加属性
          link.style.display = 'none'
          link.href = exportURL
          link.target = '_self'
          document.body.appendChild(link)
          link.click() // 执行下载
          URL.revokeObjectURL(link.href) // 释放url
          document.body.removeChild(link) // 释放标签
        } else { // 其他浏览器
          // navigator.msSaveBlob(blob, fileName)
        }
        this.$message({
          message: '导出成功',
          type: 'success'
        })
        this.exportOmOrder.customerNo = ''
        this.exportOmOrder.datEnd = ''
        this.exportOmOrder.datStart = ''
        this.exportOmOrder.show = false
      } else {
        this.exportOmOrder.customerNo = ''
        this.exportOmOrder.datEnd = ''
        this.exportOmOrder.datStart = ''
        this.exportOmOrder.show = false
      }
      // window.open(exportURL)
    },
    getInvoiceData (vm) {
      this.supply.advertTime = vm
      this.$forceUpdate()
    },
    showGoods (recordNo) {
      this.sendObj.recordNo = recordNo
      this.dialogFormVisible = true
    },
    submitFrom (expressForm) {
      this.$refs[expressForm].validate(valid => {
        if (valid) {
          this.pushCargo()
        } else {
          return false
        }
      })
    },
    // 确定发货
    async pushCargo () {
      this.sendCargoObj.sendCargoList.push(this.sendObj)
      const { transactionStatus } = await this.$api.customer.cargo(
        this.sendCargoObj
      )
      if (transactionStatus.success) {
        this.$message({
          type: 'success',
          message: '发货成功!'
        })
        this.changeOrder()
      } else {
        this.$message({
          type: 'error',
          message: transactionStatus.replyText
        })
      }
      // 重置表单
      this.$refs.expressForm.resetFields()
      this.dialogFormVisible = false
    },
    // 查询快递信息
    async showExpress () {
      const { $api, $message } = this
      try {
        const { dataList } = await $api.customer.express({})
        this.expressList = Object.freeze(dataList)
      } catch (error) {
        $message.error(error.replyText)
      }
    },
    displayCheck (flat) {
      this.display = flat
    },
    // 获取订单数据
    async fetchOrderData () {
      const { $api, $message } = this
      try {
        let { dataList, page } = await $api.customer.orderPageList(
          this.customerInquiry
        )
        this.customerList = Object.freeze(dataList)
        if (page) this.customerInquiry.page = page
      } catch (error) {
        $message.error(error.replyText)
      } finally {
        this.submitLoad = false
      }
    },
    // 条件查询
    changeOrder () {
      this.initPage()
      this.fetchOrderData()
    },
    changePageInquiry: function (currentPage) {
      this.customerInquiry.page.pageNum = currentPage
      this.fetchOrderData()
    },
    initPage () {
      this.customerInquiry.page.pageNum = 1
      this.customerInquiry.page.count = 1
    }, // 详情
    handleModify (orderNo) {
      let path = '/customer/order/details'
      this.$router.push({
        path: path,
        query: {
          orderNo: orderNo
        }
      })
    }
  },
  mounted () {
    this.fetchOrderData()
    this.showExpress()
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
.order_details {
  cursor: pointer;
}
/deep/ #customer {
  .table_content {
    .is-scrolling-none {
      display: none !important;
    }
  }
}

#customer .el-container .el-container .container-main{
  padding: 10px !important;
}
.el-input--small .el-input__inner{
  width: 108px !important;
}
.goods {
  color: #ff8c00;
}
.sub_delete {
  color: #696969;
}
// #customer .is-scrolling-none {
//   display: none !important;
// }
.orderContent .order_con .order_Sub .sub_content .sub_comm .sub_comm_con span {
  font-size: 12px !important;
}
.orderContent .order_con .order_Sub .sub_content .sub_item {
  font-size: 12px !important;
}
.orderContent .order_con .order_Sub .sub_number {
  border: none !important;
}
.orderContent .order_con .order_Sub .sub_content {
  border-bottom: none !important;
}
.orderContent .order_con .order_Parent {
  margin-top: 0 !important;
  height: 68px !important;
}
.order_con {
  border: 1px solid #eaf1f6;
}
.item_order_left {
  width: 25%;
  display: flex;
  span {
    margin-right: 0 !important;
  }
}
.information {
  width: 40%;
}
.search_content[data-v-fdb331d2] {
  width: 100% !important;
}
.item_order_width {
  width: 64px;
}
.sub_comm_see {
  top: 28% !important;
}
.sub_operation {
  cursor: pointer;
}
/deep/.ui-widget-container .container-main {
  width: 100% !important;
}
#customer{
  width: 100%;
}
.orderContent {
  width: 100%;

  // height: 600px;
  .order_con:first-child {
    margin-top: 10px;
  }
  .order_con {
    width: 100%;
    margin-top: 30px;
    .order_Parent {
      width: 100%;
      height: 60px;
      background-color: #F5FBFF;
      font-size: 12px;
      color: #808080;
      padding-top: 10px;
      margin-top: 10px;
      position: relative;
      .sub_comm_see {
        position: absolute;
        top: 50%;
        right: 50px;
        color: #1e90ff;
      }
      .sub_comm_success {
        top: 25%;
        span {
          display: block;
          margin-bottom: 5px;
        }
      }
      .op_top {
        width: 89.5%;
        display: flex;
        padding-left: 30px;
        // justify-content: space-around;
        span {
          display: block;
          margin-right: 100px;
        }
        // span:first-child{
        //   width: 190px;
        // }
      }
      .op_bottom {
        width: 89.5%;
        display: flex;
        margin-top: 10px;
        padding-left: 30px;
        // justify-content: space-around;
        span {
          display: block;
          margin-right: 100px;
        }
        //  span:first-child{
        //   width: 190px;
        // }
      }
    }
    .order_Sub {
      width: 100%;
      margin-top: 10px;
      // background-color:#A9A9A9;
      .sub_number {
        font-size: 12px;
        color: #808080;
        border-bottom: 1px solid #ebebeb;
        padding-bottom: 5px;
        span {
          margin-left: 30px;
        }
      }
      .sub_content {
        width: 100%;
        height: 100px;
        margin-top: 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid #ebebeb;
        display: flex;
        .sub_item {
          width: 180px;
          height: 100%;
          text-align: center;
          line-height: 100px;
          font-size: 16px;
          color: #3f3f3f;
        }
        .sub_item {
          line-height: 100px;
        }
        .operation {
          line-height: 40px;
        }
        .sub_shop {
          width: 180px;
        }
        .sub_price {
          width: 181px;
        }
        .sub_num {
          width: 100px;
        }
        .sub_deal {
          width: 180px;
          margin-top: 32px;
          line-height: 20px;
          span {
            display: block;
          }
          span:last-child {
            color: #8d9399;
            font-size: 12px;
          }
        }
        .sub_state {
          .sub_pai {
            color: #ffd700;
          }
          .sub_delivered {
            color: #ff0000;
          }
          .sub_receipt {
            color: #ff8c00;
          }
          .sub_complete {
            color: #ccc;
          }
        }
        .sub_comm {
          width: 330px;
          height: 100%;
          display: flex;
          // margin-left: 30px;
          padding-left: 30px;
          img {
            height: 100%;
            width: 100px;
          }
          .sub_comm_con {
            display: flex;
            flex-wrap: wrap;
            margin-left: 10px;
            span {
              width: 100%;
              display: block;
              font-size: 12px;
              color: #8d9399;
            }
            span:first-child {
              font-size: 14px;
              color: #3f3f3f;
              line-height: 15px;
            }
          }
        }
      }
    }
  }
}
</style>
