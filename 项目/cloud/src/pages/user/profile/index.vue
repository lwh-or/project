<template>
  <ui-container>
    <!--header start-->
    <div slot="header">
      <el-breadcrumb separator-class="el-icon-arrow-right" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">用户中心</el-breadcrumb-item>
        <el-breadcrumb-item>个人信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
     <!--header end-->
     <!--search start-->
    <!--table start-->
    <div class="table_wrapper">
  </div>
     <!--table start-->
  </ui-container>
</template>
<script type="text/javascript">
export default {
  name: 'centerUser',
  data () {
    return {
      userInquiry: {
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
      userList: [],
      submitTime: '', // 注册时间
      status: true
    }
  },
  methods: {
    async fetchData () {
      const { $api, $message } = this
      try {
        let {dataList, page} = await $api.user.userList(this.userInquiry)
        this.userList = Object.freeze(dataList)
        console.log(this.userList)
        if (page) this.userInquiry.page = page
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
      this.userInquiry.page.pageNum = currentPage
      this.fetchData()
    },
    initPage () {
      this.userInquiry.page.pageNum = 1
      this.userInquiry.page.count = 1
    },
    // 查看用户详情
    seeDetails () {
      let path = '/user/profile/see'
      this.$router.push({
        path: path
        // query: {
        //   productNo: val
        // }
      })
    },
    // 编辑用户信息
    edit () {
      let path = '/user/profile/maintenance'
      this.$router.push({
        path: path
        // query: {
        //   productNo: val
        // }
      })
    }
  },
  mounted () {
    this.fetchData()
  }
}
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
.center_Operation{
  width: 100%;
  display: flex;
  justify-content: space-around;
  color: #228B22;
  p{
    cursor: pointer;
  }
}
</style>
