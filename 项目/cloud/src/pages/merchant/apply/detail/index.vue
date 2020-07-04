
<template>
  <ui-container>
    <!--header start-->
    <div slot="header">
      <el-breadcrumb separator-class="el-icon-arrow-right" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">商户管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/merchant/apply' }">开店申请</el-breadcrumb-item>
        <el-breadcrumb-item>申请详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--header end-->
    <div slot="default" class="apply_detail_wrapper">
      <div class="card_item">
        <div class="header_bar item_header_bar">
          <i class="fa fa-search" />
          <span class="item_border_left">开店人信息</span>
        </div>
        <div>
          <el-table :data="applyDetail.applyRecordList" border size="mini" :span-method="objectSpanMethod">
            <el-table-column label="申请人" >
               <template>
                {{applyDetail.customerMobile}}
              </template>
            </el-table-column>
            <el-table-column prop="applyerName" label="姓名" ></el-table-column>
            <el-table-column label="店铺等级" >
              <template slot-scope="scope">
                {{scope.row.applyerStoreLevel | storeLevel}}
              </template>
            </el-table-column>
            <el-table-column prop="applyerTel" label="手机" ></el-table-column>
            <el-table-column prop="applyerCardId" label="证件号码" ></el-table-column>
          </el-table>
        </div>
      </div>
      <div class="card_item border">
        <div class="header_bar  item_header_bar">
          <i class="fa fa-search" />
          <span class="item_border_left">付款信息</span>
        </div>
        <div class="card_item">
          <div class="content">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-row :gutter="20">
                  <el-col :span="12">
                    <span class="item_label">付款人姓名：</span><span>{{applyDetail.payerName}}</span>
                  </el-col>
                  <el-col :span="12">
                    <span class="item_label"> 付款人手机：</span>{{applyDetail.payerTel}}
                  </el-col>
                </el-row>
              </el-col>
              </el-row>
              <el-row :gutter="20" class="attachment_list">
               <el-card shadow="always" v-for="(attachment, index) in applyDetail.attachmentList" :key="index" class="attachment_img">
                <el-image
                class="small-img"
                :src="attachment.attachmentUrl"
                :preview-src-list="attachmenttUrlList">
                </el-image>
                </el-card>
            </el-row>
          </div>
        </div>
      </div>
      <div class="card_item border">
        <div class="header_bar item_header_bar">
          <i class="fa fa-search" />
          <span class="item_border_left">发票信息</span>
        </div>
        <div class="card_item">
          <div class="content">
            <el-row :gutter="20">
              <el-col :span="12">
                <span class="item_label">邮箱</span>：{{applyDetail.applyerMail}}
              </el-col>
              <el-col :span="12">
                <span class="item_label">收件地址：</span>{{applyDetail.addressDetail}}
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div class="card_item border">
        <div class="header_bar item_header_bar">
          <i class="fa fa-search" />
          <span class="item_border_left">审核信息</span>
        </div>
        <div class="card_item">
          <div class="content">
              <template v-if="applyDetail.status === 1">
               <el-form ref="maintenanceForm" :model="applyMaintenance" label-width="80px"  :rules="rules">
                  <el-form-item label="意见:" prop="status">
                    <el-radio-group v-model="applyMaintenance.status"  @change="passApply">
                      <el-radio label="2">通过</el-radio>
                      <el-radio label="4">不通过</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="描述:" prop="desc">
                    <el-input type="textarea" v-model="applyMaintenance.desc"  placeholder='请输入不能超过20字的驳回原因'></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary"  @click="maintenmance" :loading="submitLoad">提交</el-button>
                    <el-button @click="goBack">取消</el-button>
                  </el-form-item>
              </el-form>
              </template>
              <template v-else>
                <el-form  label-width="80px" >
                  <el-form-item label="意见:">
                    {{applyDetail.status | applyStatus}}
                  </el-form-item>
                  <el-form-item label="描述:">
                    {{applyDetail.desc}}
                  </el-form-item>
              </el-form>
              </template>
          </div>
        </div>
      </div>
    </div>
  </ui-container>
</template>
<script type="text/javascript">
import { applyStatus, storeLevel } from '../../../../format/format'
export default {
  name: 'merchantApplyDetail',
  data () {
    return {
      submitLoad: false,
      applyDetailInquiry: {
        applyNo: ''
      },
      applyDetail: {},
      attachmenttUrlList: [],
      applyMaintenance: {
        applyNo: '',
        desc: '',
        status: null
      },
      rules: {
        desc: [{required: true, message: '审核说明不能为空', trigger: 'blur'}],
        status: [{required: true, message: '审核意见不能为空', trigger: 'blur'}]
      }
    }
  },
  methods: {
    async fetchDetailData () {
      const { $api, $message } = this
      try {
        let {data} = await $api.merchant.storeApplyDetail(this.applyDetailInquiry)
        this.applyDetail = data
        if (this.applyDetail) {
          const attachmentList = data.attachmentList
          for (let index in attachmentList) {
            this.attachmenttUrlList.push(attachmentList[index].attachmentUrl)
          }
        }
      } catch (error) {
        $message.error(error.replyText)
      } finally {
      }
    },
    goBack () {
      this.$router.back(-1)
    },
    passApply (val) {
      val === '2' ? this.applyMaintenance.desc = '审核通过' : this.applyMaintenance.desc = ''
    },
    async maintenmance () {
      const { $refs, $api, $message, $router } = this
      $refs.maintenanceForm.validate(async (valid) => {
        if (!valid) return false
        this.submitLoad = true
        try {
          await $api.merchant.storeApplyMaintenance(this.applyMaintenance)
          $message.success('提交成功')
          $router.back(-1)
        } catch (error) {
          $message.error(error.replyText)
        } finally {
          this.submitLoad = false
        }
      })
    },
    objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
      const {length} = this.applyDetail.applyRecordList
      if (length && length > 0 && columnIndex === 0) {
        if (rowIndex % length === 0) {
          return {
            rowspan: length,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    }
  },
  filters: {
    applyStatus: applyStatus,
    storeLevel: storeLevel
  },
  mounted: function () {
    this.applyDetailInquiry.applyNo = this.$route.query.applyNo
    this.applyMaintenance.applyNo = this.$route.query.applyNo
    if (this.applyDetailInquiry.applyNo) {
      this.fetchDetailData()
    }
  }
}
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
</style>
