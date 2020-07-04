
<template>
  <ui-container>
    <!--header start-->
    <div slot="header">
      <el-breadcrumb separator-class="el-icon-arrow-right" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">商品管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/merchant/apply' }">规格参数</el-breadcrumb-item>
        <el-breadcrumb-item>规格参数详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--header end-->
    <div slot="default" class="apply_detail_wrapper">
      <div class="card_item border">
        <div class="header_bar">
          <i class="fa fa-search" />
          <span>组信息</span>
        </div>
         <div class="c_wrap">
          <el-form  label-width="120px">
            <el-form-item label="组编号:">
              <div>{{categoryDetail.groupNo}}</div>
            </el-form-item>
            <el-form-item label="组名称:">
               <div>{{categoryDetail.groupName}}</div>
            </el-form-item>
            <el-form-item label="关联分类:">
               <el-tag
                  class="tag"
                  v-for="tag in categoryDetail.categoryList"
                  :key="tag.categoryNo"
                  type="success">
                  {{tag.categoryName}}
                </el-tag>
            </el-form-item>
             <el-form-item label="关联参数:">
               <el-tabs  type="border-card">
                  <el-tab-pane :label="tag" v-for="tag in categoryDetail.paramlist" :key="tag"></el-tab-pane>
                </el-tabs>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </ui-container>
</template>
<script type="text/javascript">
export default {
  name: 'merchantApplyDetail',
  data () {
    return {
      categoryDetailInquiry: {
        groupNo: ''
      },
      categoryDetail: {}
    }
  },
  methods: {
    async fetchDetailData () {
      const { $api, $message } = this
      try {
        let { data } = await $api.product.categorySpecGroupDetail(
          this.categoryDetailInquiry
        )
        this.categoryDetail = data
      } catch (error) {
        $message.error(error.replyText)
      } finally {
      }
    },
    goBack () {
      this.$router.back(-1)
    }
  },
  mounted: function () {
    this.categoryDetailInquiry.groupNo = this.$route.query.groupNo
    this.categoryDetailInquiry.applyNo = this.$route.query.groupNo
    if (this.categoryDetailInquiry.groupNo) {
      this.fetchDetailData()
    }
  }
}
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
.c_tip {
    font-size: 12px;
    line-height: 18px;
    color: #999;
  }
  .c_upload_tip {
    margin-left: 10px;
  }
  .c_wrap {
    width: 600px;
    margin: 20px 0;
    .tag{
      margin: 0px 18px 0px 0px;
    }
  }
  .c_wrap >>> .el-input--mini .el-input__inner {
    width: 300px;
  }
  .el-form-item {
    margin-bottom: 10px;
  }
</style>
