
<template>
  <ui-container>
    <!--header start-->
    <div slot="header">
      <el-breadcrumb separator-class="el-icon-arrow-right" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
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
      <div class="search-content">
          <el-form :model="squListInquiry" class="lianshang-form">
            <el-row >
              <el-col  :md="5" >
               <el-form-item label="输入搜索" label-width="78px">
                  <el-input  disable size="mini" v-model="squListInquiry.productName" placeholder="商品名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col  :md="6" >
                <el-form-item label="商品分类" label-width="120px">
                  <el-select v-model="squListInquiry.categoryNo" clearable placeholder="请选择商品分类" size="mini">
                    <el-option
                      v-for="item in classifyList"
                      :key="item.categoryNo"
                      :label="item.categoryName"
                      :value="item.categoryNo">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col  :md="5" >
                <el-form-item label="商品品牌" label-width="120px">
                  <el-select v-model="squListInquiry.brandNo" clearable placeholder="请选择商品品牌" size="mini">
                    <el-option
                      v-for="item in commodityBrandList"
                      :key="item.brandNo"
                      :label="item.brandName"
                      :value="item.brandNo">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4">
              <div class="hdader-option  item_line_height item_btn_margin">
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
              <el-button size="small" class="addStyle" @click="handleAdd">+ 添加商品</el-button>
            </el-col>
        </el-row>
      </div>
       <div class="table_content">
     <el-table
     border
     size="mini"
    :data="squList"
    style="width: 100%">
     <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="商品编号"
      prop="productNo"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      label="商品图片"
      prop="attachmentUrl"
      show-overflow-tooltip>
      <template slot-scope="scope">
      <el-image v-if="scope.row.attachmentUrl" :src="scope.row.attachmentUrl" alt="" fit="contain" :preview-src-list="[scope.row.attachmentUrl]" style="height: 100px"></el-image>
    </template>
    </el-table-column>
    <el-table-column
      label="商品名称"
      prop="productTitle"
      show-overflow-tooltip>
    </el-table-column>
      <el-table-column
      label="价格/货号"
      prop="minPriceSales,thdNo"
      show-overflow-tooltip>
        <template slot-scope="scope">
          <div>
            <!-- <p>价格：{{scope.row.minPriceSales}}</p> -->
            <p>货号：{{scope.row.thdNo}}</p>
          </div>
        </template>
    </el-table-column>
    <!-- 商品状态 1=待上架;2=已上架;4=已下架;8=已删除 -->
    <!-- 是否热门  1=热门   2=非热门 -->
    <el-table-column
      width="150"
      label="标签"
      prop="status,productNo"
      show-overflow-tooltip>
        <template slot-scope="scope">
          <div>
            上架：
          <el-switch
            v-model="scope.row.status"
            active-value="2"
            inactive-value="4"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changeSwitch(scope.row)"
            >
          </el-switch>
          </div>
         <div>
           热门：
          <el-switch
            v-model="scope.row.hotStatus"
            active-value="1"
            inactive-value="2"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="hotSwitch(scope.row)"
            >
          </el-switch></div>
        </template>
    </el-table-column>
    <el-table-column
      width="50"
      label="排序"
      prop="pos"
      show-overflow-tooltip>
    </el-table-column>
    <!-- SKU库存 -->
     <!-- <el-table-column
      width="100"
      label="SKU库存"
      prop="productNo"
      show-overflow-tooltip>
        <template slot-scope="scope">
          <span @click="showcategorySku(scope.row.productNo)" style="color:#2ECC71;cursor: pointer" class="scope_icon el-icon-edit-outline"></span>
        </template>
    </el-table-column> -->
      <el-table-column
      label="销量"
      width="60"
      prop="numSales"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      label="审核状态"
      prop="auditStatus">
      <template slot-scope="scope">
        <p>{{scope.row.auditStatus | auditStatus}}</p>
        <p style="color:#2ECC71;cursor: pointer" class="auditDetails" @click="dialogTableVisible = true">审核详情</p>
      </template>
    </el-table-column>
    <el-table-column
      prop="auditStatus"
      label="操作"
      width="100">
      <template slot-scope="props">
        <el-button type="text" size="small" @click="handleAudit(props.row.productNo)" :disabled="props.row.auditStatus === '2' ? true : false">审核</el-button>
        <el-button type="text" size="small" @click="handleDetail(props.row.productNo)">编辑</el-button>
        <el-button class="btn" type="text" size="small" @click="handleLog(props.row.productNo)">日志</el-button>
        <el-button type="text" size="small" @click="handleDel(props.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="pagination">
    <el-pagination
      :current-page="squListInquiry.page.pageNum"
        background
        @current-change="changePageInquiry"
      :page-size="squListInquiry.page.pageSize"
        layout="total, prev, pager, next"
      :total="squListInquiry.page.count">
      </el-pagination>
    </div>
  </div>
  </div>
  <el-dialog title="审核商品" :visible.sync="dialogFormVisible" @close="handleOutCanel">
    <el-form :model="form" :rules="rulesFormOut" ref="form">
      <el-form-item label="" label-width="120px">
        <el-radio-group v-model="form.auditStatus">
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="4">审核不通过</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="驳回详情" label-width="120px" v-if="form.auditStatus == 4" prop="desc">
        <el-input type="textarea" v-model="form.memo" placeHolder="请输入不能超过20个字符的驳回原因" maxlength="20" show-word-limit size="mini"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleOutCanel">取 消</el-button>
      <el-button type="primary" @click="handleOutPush('form')">确 定</el-button>
    </div>
  </el-dialog>
  <!-- 编辑货品信息 -->
  <el-dialog title="修改收货人信息" width="30%" :visible.sync="dialogSkuList">
  <div slot="footer" class="dialog-footer">
    <div class="search-content">
      <el-form :model="skuListInquiry" class="lianshang-form">
        <el-row >
           <el-col :md="6"><el-form-item label="商品编号:">{{skuListInquiry.productNo}}</el-form-item></el-col>
          <!-- <el-col  :md="6" >
            <el-form-item label="输入搜索" label-width="78px">
              <el-input  disable size="mini" v-model="skuListInquiry.productNo" placeholder="商品编号"></el-input>
            </el-form-item>
          </el-col> -->
        </el-row>
      </el-form>
    </div>
    <el-table
     border
     size="mini"
    :data="skuList"
    style="width: 100%">
      <el-table-column
      :label="item.paramName"
      v-for="(item, index) in ownFeat"
      :key='index'
      >
        <template slot-scope="scope">
        {{scope.row.ownFeat[index].vals}}
      </template>
      </el-table-column>
      <el-table-column
        label="货号"
        prop="thdNo"
        >
      </el-table-column>
      <el-table-column
        label="SKU编号"
        prop="specsNo"
        >
      </el-table-column>
      <el-table-column
        label="商城指导价"
        prop="priceSales"
        >
      </el-table-column>
      <el-table-column
        label="惊喜价"
        prop="priceCost"
        >
      </el-table-column>
      </el-table>
     <div class="pagination">
        <el-pagination
          :current-page="skuListInquiry.page.pageNum"
            background
            @current-change="changeSkuInquiry"
          :page-size="skuListInquiry.page.pageSize"
            layout="total, prev, pager, next"
          :total="skuListInquiry.page.count">
        </el-pagination>
      </div>
      <el-button @click="dialogSkuList = false">取 消</el-button>
      <el-button type="primary" @click="dialogSkuList = false">确 定</el-button>
    </div>
    </el-dialog>
    <!-- 审核详情 -->
    <el-dialog title="审核详情" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column property="date" label="日期" width="150"></el-table-column>
        <el-table-column property="name" label="姓名" width="200"></el-table-column>
        <el-table-column property="address" label="地址"></el-table-column>
      </el-table>
    </el-dialog>
  </ui-container>
</template>
<script type="text/javascript">
export default {
  name: 'squList',
  data () {
    return {
      dialogTableVisible: false,
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
      squListInquiry: {
        productName: '',
        categoryNo: '',
        brandNo: '',
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
      squList: [],
      classifyList: [], // 商品分类
      commodityBrandList: [], // 商品品牌
      dialogFormVisible: false,
      dialogSkuList: false,
      form: {
        auditStatus: 2,
        memo: '',
        productNo: ''
      },
      rulesFormOut: {
        memo: [
          { required: true, message: '请输入驳回原因', trigger: 'blur' }
        ]
      },
      skuListInquiry: {
        productNo: '',
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
      skuList: [],
      ownFeat: []
    }
  },
  filters: {
    auditStatus (val) {
      let arr = {
        1: '未审核',
        2: '已审核',
        4: '拒绝'
      }
      return arr[val]
    },
    productStatusFilter (val) {
      let arr = {
        '1': '待上架',
        '2': '已上架',
        '4': '已下架',
        '8': '已删除'
      }
      return arr[val]
    }
  },
  methods: {
    async fetchData () {
      const { $api, $message } = this
      try {
        let {dataList, page} = await $api.product.productPageInquiry(this.squListInquiry)
        this.squList = Object.freeze(dataList)
        if (page) this.squListInquiry.page = page
      } catch (error) {
        $message.error(error.replyText)
      } finally {
        this.submitLoad = false
      }
    },
    search () {
      this.initPage()
      this.fetchData()
    },
    changePageInquiry: function (currentPage) {
      this.squListInquiry.page.pageNum = currentPage
      this.fetchData()
    },
    changeSkuInquiry: function (currentPage) {
      this.skuListInquiry.page.pageNum = currentPage
      this.showcategorySku(this.skuListInquiry.productNo)
    },
    // 重置 分页
    initPage () {
      this.squListInquiry.page.pageNum = 1
      this.squListInquiry.page.count = 1
    },
    // 添加
    handleAdd () {
      let path = '/product/productList/addition'
      this.$router.push({
        path: path
        // query: {
        //   brandNo: applyNo
        // }
      })
    },
    // 日志
    handleLog (productNo) {
      let path = '/product/productList/log'
      this.$router.push({
        path: path,
        query: {
          productNo: productNo
        }
      })
    },
    // 编辑
    handleDetail (val) {
      let path = '/product/productList/maintenance'
      this.$router.push({
        path: path,
        query: {
          productNo: val
        }
      })
    },
    // 商品分类
    async shopInitData () {
      const { $api, $message } = this
      let params = {
        categoryLevel: '',
        categoryName: '',
        dis: '',
        page: {
          count: 0,
          pageSize: 9999,
          pageNum: 1,
          orderBy: '',
          returnCount: true,
          offset: 0,
          limit: 0
        }
      }
      try {
        let {dataList} = await $api.product.productCategoryInquiry(params)
        this.classifyList = Object.freeze(dataList)
      } catch (error) {
        $message.error(error.replyText)
      } finally {
        this.submitLoad = false
      }
    },
    // 商品品牌
    async commodityBrand () {
      const { $api, $message } = this
      let params = {
        brandChineseName: '',
        brandName: '',
        brandNo: '',
        madeIn: '',
        startLetter: '',
        page: {
          count: 0,
          pageSize: 9999,
          pageNum: 1,
          orderBy: '',
          returnCount: true,
          offset: 0,
          limit: 0
        }
      }
      try {
        let {dataList} = await $api.product.productBrandListInquiry(params)
        this.commodityBrandList = Object.freeze(dataList)
      } catch (error) {
        $message.error(error.replyText)
      } finally {
        this.submitLoad = false
      }
    },
    // 点击审核
    handleAudit (productNo) {
      this.dialogFormVisible = true
      this.form.productNo = productNo
    },
    // 弹框取消
    handleOutCanel () {
      this.dialogFormVisible = false
      this.form.audit = 0
      this.form.desc = ''
    },
    // 弹框提交
    handleOutPush (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.auditPush()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 提交审核
    async auditPush () {
      const { $api, $message } = this
      let params = {
        productNo: this.form.productNo,
        memo: this.form.memo,
        auditStatus: this.form.auditStatus
      }
      try {
        let {data} = await $api.product.productMaintenance(params)
        console.log(data)
        this.dialogFormVisible = false
        this.form.auditStatus = 2
        this.form.memo = ''
        this.form.productNo = ''
      } catch (error) {
        $message.error(error.replyText)
      } finally {
        this.submitLoad = false
      }
    },
    openStatus (title, row) {
      this.$confirm(title, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.codeState(row)
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消修改'
        })
      })
    },
    async changeSwitch (row) {
      // 上架成功
      if (Number(row.status) === 2) {
        const title = '您是否确定要上架？'
        this.openStatus(title, row)
      } else { // 上架失败
        const title = '您是否确定要下架？'
        this.openStatus(title, row)
      }
    },
    hotSwitch (row) {
      // 修改热门
      if (Number(row.hotStatus) === 1) {
        const title = '您是否确定要修改商品热门状态？'
        this.openStatus(title, row)
      } else { // 上架失败
        const title = '您是否确定要取消商品热门状态？'
        this.openStatus(title, row)
      }
    },
    async codeState (row) {
      // 修改商品状态
      const params = {
        hotStatus: row.hotStatus,
        productNo: row.productNo,
        productStatus: row.status
      }
      const data = await this.$api.product.productstatus(params)
      if (data.transactionStatus.success) {
        this.initPage()
        this.fetchData()
      }
    },
    async showcategorySku (productNo) {
      this.dialogSkuList = true
      // 查询商品SKU列表信息
      this.skuListInquiry.productNo = productNo
      const {dataList, page} = await this.$api.product.categorySku(this.skuListInquiry)
      this.skuList = dataList
      this.skuListInquiry.page = page
      // 数据转换
      this.skuList.forEach((item, index) => {
        this.ownFeat = JSON.parse(item.ownFeat)
        this.skuList[index].ownFeat = JSON.parse(item.ownFeat)
      })
    }
  },
  mounted () {
    this.fetchData()
    this.shopInitData()
    this.commodityBrand()
  }
}
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss" scoped>
.lianshang-form .el-form-item {
  margin-bottom: 0px !important;
  // margin-top: 10px;
}
.btn {
  margin: 0px !important;
}
.el-button{
  color:#2ECC71 !important;
}
.scope_icon {
  font-size: 30px;
}
</style>
