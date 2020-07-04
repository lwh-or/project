
<template>
  <ui-container>
    <!--header start-->
    <div slot="header">
      <el-breadcrumb separator-class="el-icon-arrow-right" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>品牌管理</el-breadcrumb-item>
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
      <div class="search-content c_search_content">
          <el-form :model="brandListInquiry" class="lianshang-form">
            <el-row >
              <el-col  :md="5" >
               <el-form-item label="品牌名称" label-width="78px">
                  <el-input  disable size="mini" v-model="brandListInquiry.brandName" placeholder="品牌名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
              <div class="hdader-option item_line_height item_btn_margin">
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
      <div class="table_header_bar item_header_bar">
         <el-row type="flex" class="row-bg">
            <el-col :span="18"><div>
              <i class="fa fa-table"/>
              <span  class="item_border_left">数据列表</span></div>
            </el-col>
            <el-col :span="6" :offset="20">
              <el-button size="small" class="addStyle" @click="handleAdd">+ 添加</el-button>
            </el-col>
        </el-row>
      </div>
       <div class="table_content">
     <el-table
     border
     size="mini"
    :data="brandList"
    style="width: 100%">
     <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="品牌ID"
      prop="brandNo"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      label="品牌名称"
      prop="brandName">
    </el-table-column>
    <el-table-column
      label="品牌首字母"
      prop="startLetter">
    </el-table-column>
    <el-table-column
      label="品牌中文名"
      prop="brandChineseName">
    </el-table-column>
    <el-table-column
      label="排序"
      prop="pos">
    </el-table-column>
    <el-table-column
      label="产地"
      prop="madeIn">
    </el-table-column>
    <!-- 品牌展示 -->
    <!-- <el-table-column
      label="是否显示">
      <template slot-scope="scope">
        <el-switch
          v-model="scope.row.dis"
          active-color="#409EFF"
          inactive-color="#dcdfe6">
        </el-switch>
      </template>
    </el-table-column> -->
    <el-table-column
      label="操作"
      width="120">
      <template slot-scope="props">
        <el-button type="text" size="small" @click="handleDetail(props.row.brandNo)">编辑</el-button>
        <!-- <el-button type="text" size="small" @click="handleDel(props.row)">删除</el-button> -->
        <el-button type="text" size="small" @click="open(props.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="pagination">
    <el-pagination
      :current-page="brandListInquiry.page.pageNum"
        background
        @current-change="changePageInquiry"
      :page-size="brandListInquiry.page.pageSize"
        layout="total, prev, pager, next"
      :total="brandListInquiry.page.count">
      </el-pagination>
    </div>
  </div>
  </div>
     <!--table start-->
  </ui-container>
</template>
<script type="text/javascript">
export default {
  name: 'brandList',
  data () {
    return {
      brandListInquiry: {
        brandName: '',
        status: 1,
        page: {
          count: 0,
          pageSize: 10,
          pageNum: 1,
          orderBy: 'cod_pos desc',
          returnCount: true,
          offset: 0,
          limit: 0
        }
      },
      brandList: []
    }
  },
  methods: {
    async fetchData () {
      const { $api, $message } = this
      try {
        let {dataList, page} = await $api.product.productBrandListInquiry(this.brandListInquiry)
        dataList.map(item => {
          if (item.dis === 1) {
            item.dis = true
          } else {
            item.dis = false
          }
        })
        this.brandList = Object.freeze(dataList)
        if (page) this.brandListInquiry.page = page
      } catch (error) {
        $message.error(error.replyText)
      } finally {
        this.submitLoad = false
      }
    },
    async search () {
      this.initPage()
      this.fetchData()
    },
    changePageInquiry: function (currentPage) {
      this.brandListInquiry.page.pageNum = currentPage
      this.fetchData()
    },
    // 重置 分页
    initPage () {
      this.brandListInquiry.page.pageNum = 1
      this.brandListInquiry.page.count = 1
    },
    // brandDetail: function (brandNo) {
    //   let path = '/product/brand/detail'
    //   this.$router.push({
    //     path: path,
    //     query: {
    //       brandNo: brandNo
    //     }
    //   })
    // },
    // 是否显示的点击事件
    handleChange (row) {
      console.log(row)
    },
    // 添加
    handleAdd () {
      let path = '/product/brand/addition'
      this.$router.push({
        path: path
        // query: {
        //   brandNo: applyNo
        // }
      })
    },
    // 编辑
    handleDetail (val) {
      let path = '/product/brand/maintenance'
      this.$router.push({
        path: path,
        query: {
          brandNo: val
        }
      })
    },
    open (val) {
      this.$confirm('是否删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleDel(val)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 删除
    async handleDel (val) {
      val.status = 2
      val.dis = val.dis ? 1 : 0
      const { $api, $message } = this
      try {
        await $api.product.productBrandMaintenance(val)
        this.initPage()
        this.fetchData()
      } catch (error) {
        $message.error(error.replyText)
      } finally {
        this.submitLoad = false
      }
    }
  },
  mounted () {
    this.fetchData()
  }
}
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss" scoped>
.c_search_content {
  margin: 20px 0 0;
}
</style>
