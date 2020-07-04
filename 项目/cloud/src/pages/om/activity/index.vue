
<template>
  <ui-container>
    <!--header start-->
    <div slot="header">
      <el-breadcrumb separator-class="el-icon-arrow-right"
                     separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">运营管理</el-breadcrumb-item>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--header end-->
    <!--search start-->
    <div slot="search"
         class="search-wrapper">
      <div class="search_header_bar">
        <el-row type="flex"
                class="row-bg">
          <el-col :span="6">
            <div>
              <i class="fa fa-search" />
              <span class="item_border_left">筛选查询</span></div>
          </el-col>
        </el-row>
      </div>
      <div class="search-content">
        <el-form :model="activityInquiry"
                 class="lianshang-form">
          <el-row>
            <el-col :md="5">
              <el-form-item label="活动编号"
                            label-width="60px">
                <el-input size="mini"
                          v-model="activityInquiry.activityNo"
                          placeholder="请输入活动编号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="18">
            <div class="hdader-option item_line_height item_btn_margin">
              <el-button type="primary"
                         size="mini"
                         icon="el-icon-search"
                         @click="searchApply">查询</el-button>
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
        <el-row type="flex"
                class="row-bg">
          <el-col :span="18">
            <div>
              <i class="fa fa-table" />
              <span class="item_border_left">数据列表</span></div>
          </el-col>
          <el-col :span="6"
                  :offset="20">
            <el-button size="small"
                       class="addStyle"
                       @click="handleAdd">+ 添加</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="table_content">
        <el-table border
                  size="mini"
                  :data="activityList"
                  style="width: 100%">
          <el-table-column type="selection"
                           width="55">
          </el-table-column>
          <el-table-column label="编号"
                           prop="activityNo">
          </el-table-column>
          <el-table-column label="活动名称"
                           prop="activityName">
          </el-table-column>
          <el-table-column label="活动显示名称"
                           prop="activityDname">
          </el-table-column>
           <el-table-column label="ICON">
            <template slot-scope="scope">
              <el-image :src="scope.row.activityIcon" style="width: 60px; height: 60px" />
            </template>
          </el-table-column>
           <el-table-column label="背景颜色"
            prop="bgCls">
          </el-table-column>
             <el-table-column label="宣传图">
            <template slot-scope="scope">
              <el-image :src="scope.row.activityImg"  />
            </template>
          </el-table-column>
          <el-table-column label="上线/下线"
                           prop="pos"
                           :formatter="foramtActivityPos">
          </el-table-column>
          <el-table-column label="显示"
                           prop="dis"
                           :formatter="foramtActivityDis">
          </el-table-column>
          <el-table-column label="活动链接"
                           prop="activityUrl">
          </el-table-column>
          <!-- start -->
          <el-table-column label="商品数量"
                           prop="productCount">
          </el-table-column>
          <!-- end -->
          <el-table-column label="备注"
                           prop="memo">
          </el-table-column>
          <el-table-column
            label="操作"
            width="180">
            <template slot-scope="props">
              <el-button type="text" size="small" @click="goodsMaintain(props.row.activityNo)">商品维护</el-button>
              <el-button type="text" size="small" @click="activityMaintain(props.row.activityNo)">活动维护</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination :current-page="activityInquiry.page.pageNum"
                         background
                         @current-change="changePageInquiry"
                         :page-size="activityInquiry.page.pageSize"
                         layout="total, prev, pager, next"
                         :total="activityInquiry.page.count">
          </el-pagination>
        </div>
      </div>
    </div>
    <!--table start-->
    <!-- 商品维护 -->
    <el-dialog :visible.sync="centerDialogVisible" width="80%" center>
       <template slot="title" >
          <div slot="search" class="search-wrapper">
            <div class="search_header_bar">
              <el-row type="flex" class="row-bg">
                <el-col :span="2" style="text-align:left;">
                  <div>
                    <i class="fa fa-search" />
                    <span class="item_border_left">添加活动商品</span></div>
                </el-col>
                <el-col :span="22">
                </el-col>
              </el-row>
            </div>
            <div class="search-content">
              <el-form :model="activityQuerySku" class="lianshang-form">
                <el-row>
                  <el-col :md="6">
                    <el-form-item label="请输入SKU" label-width="100px">
                      <el-input size="mini" v-model="activityQuerySku.key" placeholder="请输入SPU"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="18">
                  <div class="hdader-option item_line_height item_btn_margin">
                    <el-button type="primary" size="medium" icon="el-icon-plus" @click="appendActivityGoods">添加</el-button>
                    <el-button type="primary" size="medium" icon="el-icon-s-release" @click="deleteAllActivityGoods">批量删除</el-button>
                  </div>
                </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
      </template>
      <div class="el-dialogModel">
          <div class="table_content">
            <el-table border size="mini" :data="activityQuerySkuList"  @selection-change="handleSelectionChange" style="width: 100%">
              <el-table-column type="selection" width="55">
              </el-table-column>
              <el-table-column label="商品编号" prop="productNo">
              </el-table-column>
              <el-table-column label="商品图片">
                <template slot-scope="scope">
                  <el-image :src="scope.row.productImgUrl" style="width: 60px; height: 60px" />
                </template>
              </el-table-column>
              <el-table-column label="商品标题" prop="productTitle">
              </el-table-column>
              <el-table-column
                label="操作"
                width="80">
                <template slot-scope="props">
                  <el-button type="text" size="small" @click="deleteActivityGoods('normal',props.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination :current-page="activityQuerySku.page.pageNum"
                            background
                            @current-change="changeActivityQuerySku"
                            :page-size="activityQuerySku.page.pageSize"
                            layout="total, prev, pager, next"
                            :total="activityQuerySku.page.count">
              </el-pagination>
            </div>
        </div>
      </div>
      <template slot="footer" class="dialog-footer">
        <el-button type="primary"  @click="centerDialogVisible = false">取消</el-button>
      </template>
    </el-dialog>
  </ui-container>
</template>
<script type="text/javascript">
import { foramtActivityPos, foramtActivityDis } from '../../../format/format'
export default {
  name: 'systemUser',
  data () {
    return {
      activityInquiry: {
        activityNo: '',
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
      activityQuerySku: {
        activityNo: '',
        productNoList: [],
        key: '',
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
      centerDialogVisible: false,
      activityrDialogVisible: false,
      activityList: [],
      activityQuerySkuList: []
    }
  },
  methods: {
    async fetchData () {
      const { $api, $message } = this
      try {
        let { dataList, page } = await $api.activity.shopcrmActivityPageListInquiry(this.activityInquiry)
        console.log(dataList)
        this.activityList = Object.freeze(dataList)
        if (page) this.activityInquiry.page = page
      } catch (error) {
        $message.error(error.replyText)
      } finally {
        this.centerDialogVisible = false
      }
    },
    handleCheck (id) {
      let path = '/om/activity/activityDetails'
      this.$router.push({
        path: path,
        query: {
          activityNo: id
        }
      })
    },
    handleAdd () {
      let path = '/om/activity/addition'
      this.$router.push({
        path: path
      })
    },
    activityMaintain (id) {
      let path = '/om/activity/maintenance'
      this.$router.push({
        path: path,
        query: {
          activityNo: id
        }
      })
    },
    async searchApply () {
      this.initPage()
      this.fetchData()
    },
    changePageInquiry: function (currentPage) {
      this.activityInquiry.page.pageNum = currentPage
      this.fetchData()
    },
    changeActivityQuerySku (currentPage) {
      const { activityNo } = this.activityQuerySku
      this.activityQuerySku.page.pageNum = currentPage
      this.queryactivityList(activityNo)
    },
    initPage () {
      this.activityInquiry.page.pageNum = 1
      this.activityInquiry.page.count = 1
    },
    goodsMaintain (activityNo) {
      this.centerDialogVisible = true
      this.activityQuerySku.activityNo = activityNo
      this.queryactivityList(activityNo)
    },
    async queryactivityList (activityNo) {
      const { $api, $message } = this
      this.activityQuerySku.activityNo = activityNo
      try {
        let { dataList, page } = await $api.activity.shopcrmActivityProductPageListInquiry(this.activityQuerySku)
        this.activityQuerySkuList = Object.freeze(dataList)
        if (page) this.activityQuerySku.page = page
      } catch (error) {
        $message.error(error.replyText)
      } finally {}
    },
    async appendActivityGoods () {
      const { key, productNoList, activityNo } = this.activityQuerySku
      const { $api, $message } = this
      if (!key) {
        return null
      }
      productNoList.push(key)
      try {
        let { transactionStatus } = await $api.activity.shopcrmActivityProductAddition({activityNo, productNoList})
        if (transactionStatus.success) {
          this.activityQuerySku.key = ''
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.queryactivityList(activityNo)
        } else {
          this.$message(transactionStatus.replyText)
        }
      } catch (error) {
        $message.error(error.replyText)
      } finally {
        this.activityQuerySku.productNoList = []
      }
    },
    async deleteActivityGoods (prop, row) {
      const { $api, $message } = this
      let data = null
      if (prop === 'normal') {
        const { productNo, activityNo } = row
        data = {
          activityNo,
          maintenanceType: 2,
          productNoList: []
        }
        data.productNoList.push(productNo)
      } else {
        data = {
          activityNo: this.activityQuerySku.activityNo,
          maintenanceType: 2,
          productNoList: this.activityQuerySku.productNoList
        }
      }
      try {
        let { transactionStatus } = await $api.activity.shopcrmActivityProductMaintenance(data)
        if (transactionStatus.success) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.queryactivityList(this.activityQuerySku.activityNo)
        } else {
          this.$message(transactionStatus.replyText)
        }
      } catch (error) {
        $message.error(error.replyText)
      } finally {
        this.activityQuerySku.productNoList = []
      }
    },
    handleSelectionChange (arr) {
      this.activityQuerySku.productNoList = Array.from(arr).map(prod => {
        return prod.productNo
      })
    },
    deleteAllActivityGoods () {
      this.deleteActivityGoods('All')
    },
    foramtActivityPos,
    foramtActivityDis
  },
  mounted () {
    this.fetchData()
  }
}
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
.el-table{
  /deep/ .cell{
    text-align: center;
  }
}
.el-dialog--center{
  text-align: right;
}
</style>
