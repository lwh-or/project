<template>
<ui-container>
  <div slot="header">
    <el-breadcrumb separator-class="el-icon-arrow-right" separator=">">
      <el-breadcrumb-item :to="{ path: '/' }">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item  :to="{ path: '/customer/order' }">订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单详情</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div slot="search" class="search-wrapper">
    <!-- 订单信息 -->
    <div class="search_content">
      <p class="search_content_title"><span class="fa-search" ></span>订单信息</p>
      <div class="search_content_text">
        <p><span class="top item_label">ID:</span><span>{{orderDetail.orderNo}}</span></p>
        <p><span class="top item_label">订单编号：</span>{{orderDetail.orderNo}}</p>
        <p><span class="top item_label">订单状态：</span><span :class="colorStatus[orderDetail.orderStatus]">{{orderStatus[orderDetail.orderStatus]}}</span></p>
      </div>
      <div class="search_content_text">
        <p><span class="top item_label">实付金额:</span>{{orderDetail.amtPayTotal}}(含快递：0.00)</p>
        <p><span class="top item_label">下单时间：</span> {{orderDetail.datOrder}}</p>
        <p></p>
      </div>
      <div class="search_content_text">
        <p><span class="top item_label">收货人:</span>{{orderDetail.contactPerson}}</p>
        <p><span class="top item_label">联系电话：</span>{{orderDetail.mobile}}</p>
        <p class="item_code"><span id="item_code_name" class="top item_label">收货地址：</span><span class="item_line">{{orderDetail.addressProvince}}{{orderDetail.addressCity}}{{orderDetail.addressDistrict}}{{orderDetail.addressStreet}}{{orderDetail.addressDetail}}</span></p>
        <!-- <div class="search_content_modify" @click="dialogFormVisible = true"><p>修改</p></div> -->
      </div>
      <div class="item_display">
      <div class="search_content_message">
        <p><span class="top item_label">留言：</span></p>
        <p style="width:462px">{{orderDetail.desc}}</p>
      </div>
      <div class="hdader-option">
        <el-button type="primary" size="mini" @click="dialogFormVisible = true">修改</el-button>
      </div>
      </div>
    </div>
    <div class="search_userFrom search_content" >
      <p class="search_content_title"><span class="fa-search" ></span>用户信息</p>
      <div class="search_content_text" style="margin-bottom:0">
        <p><span class="top item_label">昵称：</span>{{orderDetail.contactPerson}}</p>
        <p><span class="top item_label">手机号码：</span>{{orderDetail.mobile}}</p>
        <p><span class="top item_label"></span></p>
      </div>
    </div>
    <!-- 用户信息 -->
    <div class="search_content search_commodity" >
      <p class="search_content_title"><span class="fa-search" ></span>商品信息</p>
      <div v-if="orderDetail.subOrders && orderDetail.subOrders.length > 0">
         <div  v-for="(record,index) in orderDetail.subOrders" :key="index">
          <div class="search_content_text">
            <p><span class="top item_label">子订单号：</span>{{record.recordNo}}  <el-link type="primary" class="item_closeOrder" @click="closeOrder = true">关闭订单</el-link></p>
            <p><span class="top item_label">订单状态：</span><span :class="colorStatus[record.orderStatus]">{{subsetStatus[record.orderStatus]}}</span></p>
            </div>
            <!-- <div class="search_content_modify" @click="closeOrder = true"> -->
              <!-- <p>关闭订单</p> -->

          <!-- </div> -->
          <div class="search_content_text">
            <p><span class="top item_label">SPUID:</span><span>{{record.specsNo}}</span></p>
            <p><span class="top item_label">货号：</span>{{record.thdNo}}</p>
            <p ><span id="item_code_name" class="top item_label">商品名称：</span><span class="item_line">{{record.productTitle}}</span></p>
          </div>
          <div class="search_content_text">
            <p><span class="top item_label">所属类目:</span><span>{{record.ownFeatStr}}</span></p>
            <p><span class="top item_label">品牌：</span>{{record.brandName}}</p>
            <p></p>
          </div>
          <div class="search_content_text" >
            <p><span class="top item_label">SKUID:</span><span>{{record.supplierNo}}</span></p>
            <p><span class="top item_label">SKU编号：</span>{{record.supplierNo}}</p>
            <p><span class="top item_label">规格：</span><span >{{record.ownSpecStr}}</span></p>
          </div>
          <div class="search_content_text" >
            <p><span class="top item_label">店铺ID:</span><span>{{record.storeNo}}</span></p>
            <p><span class="top item_label">店铺名称：</span>{{record.storeName}}</p>
            <p><span class="top item_label">店铺等级：</span><span >{{record.storeLevelName}}</span></p>
          </div>
          <div class="search_content_text" >
            <p><span class="top item_label">惊喜价:</span><span>{{record.amtPrice}}</span></p>
            <p><span class="top item_label">商户价：</span>{{record.amtSale}}</p>
            <p><span class="top item_label">成交价：</span><span >{{record.amtPay}}</span></p>
          </div>
          <div class="search_content_text" >
            <p><span class="top item_label">数量:</span><span>{{record.num}}</span></p>
            <p><span class="top item_label">采购价:</span>{{record.amtAgency}}</p>
            <p></p>
          </div>
          <div class="search_content_text" >
            <p><span class="top item_label">供应商:</span><span>{{record.supplierName}}</span></p>
            <p><span class="top item_label">合计：</span>{{record.amtPay}}</p>
            <p><span class="top item_label">物流单号：</span>{{record.expressNo}}</p>
          </div>
        </div>
        <p class="openAll" v-show="showOpenAll" @click="openAll">展开全部</p>
        <p class="openAll" v-show="!showOpenAll" @click="closeAll">收起</p>
      </div>
      <div class="no_data" v-else>
        暂无数据
      </div>
    </div>
    <!-- 支付信息 -->
     <div class="search_userFrom search_content" >
      <p class="search_content_title"><span class="fa-search" ></span>支付信息</p>
      <div class="search_content_text" >
        <p><span class="top item_label">流水号：</span>{{orderDetail.payRecordNo}}</p>
        <p><span class="top item_label">支付方式：</span>{{orderDetail.payTypeDesc}}</p>
        <p><span class="top item_label">支付确定时间:</span><span>{{orderDetail.datPayConfirm}}</span></p>
      </div>
      <div class="search_content_text" style="margin-bottom:0">
        <p><span class="top item_label">支付申请时间:</span><span>{{orderDetail.datPayApply}}</span></p>
        <p></p>
        <p></p>
      </div>
    </div>
    <!-- 发票信息 -->
     <div class="search_userFrom search_content" >
      <p class="search_content_title"><span class="fa-search" ></span>发票信息<i class="el-icon-warning-outline"></i><span class="search_content_s">角度看flask老夫艰苦撒旦解放撒旦</span></p>
      <div class="search_content_text" >
        <p><span class="top item_label">发票类型:</span><span>105621</span></p>
        <p><span class="top item_label">抬头类型：</span>12121211211212</p>
        <p><span class="top item_label">抬头名称：</span>13599999999</p>
      </div>
    </div>
    <!-- 操作记录 -->
    <div class="search_userFrom search_content" >
      <p class="search_content_title"><span class="fa-search" ></span>操作记录</p>
      <div >
          <template>
            <el-table
              :data="tableData"
              class="item_font_size"
              style="width: 100%">
              <el-table-column
                prop="date"
                label="操作者"
                width="180">
              </el-table-column>
              <el-table-column
                prop="name"
                label="子订单"
                width="180">
              </el-table-column>
              <el-table-column
                prop="address"
                label="操作时间">
              </el-table-column>
              <el-table-column
                prop="address"
                label="备注">
              </el-table-column>
            </el-table>
          </template>
      </div>
    </div>
  </div>
    <!-- 修改收货人信息 -->
  <el-dialog title="修改收货人信息" width="30%" :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules">
      <el-form-item label="收货人姓名" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" :label-width="formLabelWidth" prop="phone">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="所在区域" :label-width="formLabelWidth" prop="ragion">
        <el-cascader v-model="form.ragion" :options="areaList" :props="optionProps" filterable ref="myCascader"></el-cascader>
      </el-form-item>
      <el-form-item label="详细地址" :label-width="formLabelWidth" prop="address">
        <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 4}" v-model="form.address" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
   <!-- 关闭订单 -->
  <el-dialog title="关闭订单" width="40%" :visible.sync="closeOrder">
    <el-form :model="form" :rules="rules">
      <el-form-item label="操作备注" :label-width="formLabelWidth" prop="address">
        <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 4}" v-model="form.address" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeOrder = false">取 消</el-button>
      <el-button type="primary" @click="closeOrder = false">确 定</el-button>
    </div>
  </el-dialog>
</ui-container>
</template>
<script>
// 城市数据
import rawCitiesData from '../../../../../static/js/city-data.js'
export default {
  name: 'Details',
  data () {
    return {
      showcommodity: false,
      showOpenAll: true,
      dialogFormVisible: false, // 修改收货人信息
      closeOrder: false, // 订单状态
      formLabelWidth: '120px',
      areaList: rawCitiesData,
      orderDetail: [], // 订单列表数据
      orderStatus: { // 订单状态
        1: '待支付',
        2: '待发货',
        4: '待收货',
        8: '已完成',
        16: '取消'
      },
      colorStatus: { // 订单样式
        1: 'sub_pai',
        2: 'sub_delivered',
        4: 'sub_receipt',
        8: 'sub_complete',
        16: 'sub_cancel'
      },
      subsetStatus: { // 子级订单状态
        1: '代付款',
        2: '代发货',
        4: '待收货',
        8: '售后'
      },
      subsetStytle: { // 子级订单状态样式

      },
      optionProps: { // 配置节点
        value: 'code',
        label: 'name',
        children: 'sub'
      },
      rules: {
        name: [
          { required: true, message: '请输入收货人姓名', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' }
        ],
        ragion: [
          { required: true, message: '请输入所在区域', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ]
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      form: {
        name: '',
        phone: '',
        ragion: '',
        address: ''
      }
    }
  },
  methods: {
    openAll () {
      this.showcommodity = true
      this.showOpenAll = false
    },
    closeAll () {
      this.showcommodity = false
      this.showOpenAll = true
    },
    async getDetails (orderNo) {
      try {
        let {data} = await this.$api.customer.details({orderNo: orderNo})
        this.orderDetail = Object.freeze(data)
      } catch (error) {
        this.$message.error(error.replyText)
      } finally {
      }
    }
  },
  mounted () {
    let params = this.$route.query
    this.getDetails(params.orderNo)
  }
}
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss" scoped>
  .search_content_title {
    font-size: 14px;
    margin-bottom: 30px;
    color: #000;
    font-weight: bold;
    .fa-search {
      width: 4px;
      height: 12px;
      background-color: royalblue;
      display: inline-block;
      margin-right: 8px;
    }
  }
  .item_display{
    display: flex;
  }
  .item_flex{
    display: flex;
    justify-content: flex-end;
    margin-right: 60px;
  }
.item_font_size{
  font-size: 12px;
}
.el-link.is-underline:hover:after{
  border: none;
}
.item_closeOrder{
  width: 70px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  font-size: 12px;
  background: #409EFF;
  color: #fff;
  border-radius: 5px;
  margin: 0px 20px;
}
.search_content {
  // width: 100%;
  // margin: auto;
  margin-left: 40px;
  padding: 25px 0;
  border-bottom: 1px solid#F5F5F5;
  .search_content_text {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    position: relative;
    .sub_pai{
      color: #FFD700;
    }
    .sub_delivered{
      color:#FF0000
    }
    .sub_receipt{
      color: #FF8C00;
    }
    .sub_complete{
      color: #ccc;
    }
    .top{
      display: inline-block;
      text-align: left;
      width: 88px;
    }
    p{
      width:34%;
    }
    // .search_content_modify{
    //   position: absolute;
    //   right: -250px;
    //   color:#1E90FF;
    //   cursor: pointer;
    // }
    .item_label{
      color: #8D9399;
    }
    .item_code{
      display: flex;
      #item_code_name {
        display: inline-block;
        width: 99px;
      }
      .item_line {
       display: inline-block;
       width: 200px;
     }
    }
  }
  .search_content_message{
    width: 67%;
    display: flex;
    p{
    line-height: 20px;
    }
    .top{
      display: inline-block;
      text-align: left;
      width: 60px;
    }
  }
}
.openAll{
  width: 100%;
  text-align: center;
  color: #00BFFF;
  margin-top: 30px;
  cursor: pointer;
}
.search_commodity{
  .payment{
    color: sandybrown;
  }
}
.commodity_con{
  padding-bottom: 15px;
  border-bottom: 1px solid #F5F5F5;
}
.commodity_con2{
  margin-top: 10px;
}
.search_content_s{
  color: #ccc;
  font-size: 8px;
  margin-left: 10px;
}
/deep/ .el-dialog__header{
  background-color: #ccc;
}
.no_data{
  text-align: center;
  font-size: 16px;
  color: #A9A9A9;
}
</style>
