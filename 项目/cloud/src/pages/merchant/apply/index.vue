
<template>
  <ui-container>
    <!--header start-->
    <div slot="header">
      <el-breadcrumb separator-class="el-icon-arrow-right" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">商户管理</el-breadcrumb-item>
        <el-breadcrumb-item>开店申请</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
     <!--header end-->
     <!--search start-->
    <div slot="search" class="search-wrapper item_fontSize">
      <div class="search_header_bar">
          <el-row type="flex" class="row-bg">
            <el-col :span="6"><div>
              <i class="fa fa-search"/>
              <span class="item_border_left">筛选查询</span></div>
            </el-col>

        </el-row>
      </div>
      <div class="search-content">
          <el-form :model="storeApplyInquiry" class="lianshang-form">
            <el-row >
              <el-col  :md="5" >
               <el-form-item label="账号" label-width="50px">
                  <el-input  disable size="mini" v-model="storeApplyInquiry.customerMobile" placeholder="请输入账号"></el-input>
                </el-form-item>
              </el-col>
              <el-col  :md="7" >
                <el-form-item label="状态" label-width="120px">
                  <el-select size="small" v-model="storeApplyInquiry.status" placeholder="请选择申请状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="已申请" value="1"></el-option>
                    <el-option label="成功" value="2"></el-option>
                    <el-option label="已拒绝" value="4"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
              <div class="hdader-option item_line_height ">
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
              <span class="item_border_left">数据列表</span></div>
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
    :data="applyList"
    style="width: 100%">
     <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="申请人账号"
      prop="customerMobile">
    </el-table-column>
    <el-table-column
      label="付款人"
      prop="payerName">
    </el-table-column>
     <el-table-column
      label="付款人电话"
      prop="payerTel">
    </el-table-column>
     <el-table-column
      label="开店总数"
      prop="shopStoreQuantity">
    </el-table-column>
     <el-table-column
      label="凭证数量"
      prop="attachmentQuantity">
    </el-table-column>
     <el-table-column
      label="申请人邮箱"
      prop="applyerMail">
    </el-table-column>
     <el-table-column
      label="发票收货地址"
      prop="addressProvince,addressCity,addressDistrict,addressStreet,addressDetail">
      <template slot-scope="scope">
        {{scope.row.addressProvince}} {{scope.row.addressCity}} {{scope.row.addressDistrict}} {{scope.row.addressStreet}} {{scope.row.addressDetail}}
      </template>
    </el-table-column>
    <el-table-column
      label="状态">
      <template slot-scope="scope">
        {{scope.row.status | applyStatus}}
      </template>
    </el-table-column>
    <el-table-column
      label="操作"
      width="80">
      <template slot-scope="props">
        <el-button type="text" size="small" @click="applyDetail(props.row.applyNo)">查看</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="pagination">
    <el-pagination
      :current-page="storeApplyInquiry.page.pageNum"
        background
        @current-change="changePageInquiry"
      :page-size="storeApplyInquiry.page.pageSize"
        layout="total, prev, pager, next"
      :total="storeApplyInquiry.page.count">
      </el-pagination>
    </div>
  </div>
  </div>
     <!--table start-->
  </ui-container>
</template>
<script type="text/javascript">
import { applyStatus } from '../../../format/format'
export default {
  name: 'merchantApply',
  data () {
    return {
      storeApplyInquiry: {
        payerName: '',
        payerTel: '',
        customerMobile: '',
        status: null,
        page: {
          count: 0,
          pageSize: 10,
          pageNum: 1,
          orderBy: 'apply.dat_create desc',
          returnCount: true,
          offset: 0,
          limit: 0
        }
      },
      applyList: []
    }
  },
  methods: {
    async fetchData () {
      const { $api, $message } = this
      try {
        let {dataList, page} = await $api.merchant.storeApplyList(this.storeApplyInquiry)
        this.applyList = Object.freeze(dataList)
        if (page) this.storeApplyInquiry.page = page
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
      this.storeApplyInquiry.page.pageNum = currentPage
      this.fetchData()
    },
    // 重置 分页
    initPage () {
      this.storeApplyInquiry.page.pageNum = 1
      this.storeApplyInquiry.page.count = 1
    },
    applyDetail: function (applyNo) {
      let path = '/merchant/apply/detail'
      this.$router.push({
        path: path,
        query: {
          applyNo: applyNo
        }
      })
    }
  },
  mounted () {
    this.fetchData()
  },
  filters: {
    applyStatus: applyStatus
  }
}
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
</style>
