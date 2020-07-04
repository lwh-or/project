
<template>
  <ui-container>
    <!--header start-->
    <div slot="header">
      <el-breadcrumb separator-class="el-icon-arrow-right" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">系统配置</el-breadcrumb-item>
        <el-breadcrumb-item>运费模板</el-breadcrumb-item>
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
          <el-form :model="sysUserInquiry" class="lianshang-form">
            <el-row >
              <el-col  :md="5" >
               <el-form-item label="用户编号" label-width="78px">
                  <el-input  disable size="mini" placeholder="请输入用户编号"></el-input>
                </el-form-item>
              </el-col>
              <el-col  :md="6" >
               <el-form-item label="订单号" label-width="120px">
                  <el-input  disable size="mini" placeholder="请输入订单号"></el-input>
                </el-form-item>
              </el-col>
              <el-col  :md="6" >
               <el-form-item label="供应商" label-width="120px">
                  <el-input  disable size="mini" placeholder="请输入供应商"></el-input>
                </el-form-item>
              </el-col>
                <el-col :span="6">
              <div class="hdader-option item_line_height item_btn_margin">
                <el-button type="primary" size="mini" icon="el-icon-search">查询</el-button>
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
    :data="orderList"
    style="width: 100%">
     <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="编号"
      prop="userNo">
    </el-table-column>
    <el-table-column
      label="模板名称"
      prop="userName">
    </el-table-column>
     <el-table-column
      label="计价方式"
      prop="name">
    </el-table-column>
     <el-table-column
      label="数量（件）/重量（KG）"
      prop="tel">
    </el-table-column>
    <el-table-column
      label="起步价（元）"
      prop="tel">
    </el-table-column>
    <el-table-column
      label="增加数量（件）/重量（KG）"
      prop="tel">
    </el-table-column>
    <el-table-column
      label="加价"
      prop="tel">
    </el-table-column>
    <el-table-column
      label="添加时间"
      prop="tel">
    </el-table-column>
     <el-table-column
      label="是否启用"
      prop="tel">
    </el-table-column>
     <el-table-column
      label="操作"
      prop="tel">
    </el-table-column>
  </el-table>
  </div>
  </div>
     <!--table start-->
  </ui-container>
</template>
<script type="text/javascript">
export default {
  name: 'orderList',
  data () {
    return {
      orderList: []
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
</style>
