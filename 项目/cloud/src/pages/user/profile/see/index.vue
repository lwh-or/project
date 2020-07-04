<template>
  <ui-container>
    <!--header start-->
    <div slot="header">
      <el-breadcrumb separator-class="el-icon-arrow-right" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">用户中心</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/user/profile' }">用户列表</el-breadcrumb-item>
        <el-breadcrumb-item >用户详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div slot="search" class="search-wrapper">
      <div class="search_personal">
        <div class="sp_head">
          <div>
            <img src="./img/1.jpg" alt="">
            <p>13577777777</p>
            <button>普通会员</button>
          </div>
        </div>
        <div class="sp_middle">
          <div class="sp_middle_l">
            <div><p>用户ID</p></div>
            <div><p>昵称</p></div>
            <div><p>生日</p></div>
            <div><p>城市</p></div>
          </div>
          <div class="sp_middle_l sp_middle_r">
            <div><p>8447466</p></div>
            <div><p>Windir</p></div>
            <div><p>1984年6月22日</p></div>
            <div><p>广东省深圳市</p></div>
          </div>
        </div>
        <div class="sp_middle">
           <div class="sp_middle_l">
            <div><p>职业</p></div>
            <div><p>性别</p></div>
            <div><p>注册时间</p></div>
            <div><p>用户来源</p></div>
          </div>
          <div class="sp_middle_l sp_middle_r">
            <div><p>N/A</p></div>
            <div><p>男</p></div>
            <div><p>2017-07-24 17:25:38</p></div>
            <div><p>PC端</p></div>
          </div>
        </div>
      </div>
    </div>
     <div class="search-wrapper">
       <!-- 统计信息 -->
       <div class="information">
          <div class="title"><span></span><p>统计信息</p></div>
          <template>
            <el-table
              :data="tableData"
              border
              style="width: 100%">
              <el-table-column
                prop="date"
                label="日期"
                width="180">
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="180">
              </el-table-column>
              <el-table-column
                prop="address"
                label="地址">
              </el-table-column>
            </el-table>
          </template>
       </div>
         <!-- 收货地址 -->
       <div class="information">
          <div class="title"><span></span><p>收货地址</p></div>
          <template>
            <el-table
              :data="tableData"
              border
              style="width: 100%">
              <el-table-column
                prop="date"
                label="日期"
                width="180">
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="180">
              </el-table-column>
              <el-table-column
                prop="address"
                label="地址">
              </el-table-column>
            </el-table>
          </template>
       </div>
         <!-- 订单记录 -->
       <div class="information">
          <div class="title"><span></span><p>订单记录</p></div>
          <template>
            <el-table
              :data="tableData"
              border
              style="width: 100%">
              <el-table-column
                prop="date"
                label="日期"
                width="180">
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="180">
              </el-table-column>
              <el-table-column
                prop="address"
                label="地址">
              </el-table-column>
            </el-table>
          </template>
       </div>
     </div>
  </ui-container>
</template>
<script>
export default {
  name: 'seeDetails',
  data () {
    return {
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
      }]
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
  .search-wrapper{
    .search_personal{
      width: 80%;
      height: 180px;
      margin: 0 auto;
      border: 1px solid #C0C0C0;
      display: flex;
      .sp_head{
        width: 20%;
        height: 100%;
        background-color:#EAF1F6;
        border-right: 1px solid #C0C0C0;
        div{
          width: 50%;
          margin: 0 auto;
          img{
          width: 100px;
          height: 100px;
          border-radius: 50%;
          margin: 10px auto 0;
          display: block;
          }
          p{
            color: #A9A9A9;
            font-size: 14px;
            text-align: center;
            margin-top: 10px;
          }
          button{
            width: 80px;
            height: 22px;
            border: 0;
            background-color: red;
            border-radius: 20px;
            display: block;
            margin: 10px auto 0;
            color: white;
          }
        }
      }
      .sp_middle{
        width: 40%;
        height: 100%;
        display: flex;
        .sp_middle_l{
          width: 25%;
          height: 100%;
          background-color: #EAF1F6;
          border-right: 1px solid #C0C0C0;
          div{
            width: 100%;
            height: 45px;
            text-align: right;
            line-height: 45px;
            color:#808080;
            padding-right: 30px;
            border-bottom: 1px solid #C0C0C0;
          }
          div:last-child{
            border-bottom: 0px;
          }
        }
        .sp_middle_r{
          width: 75%;
          background-color: white;
          div{
            text-align: left;
            padding-left: 30px;
          }
        }
      }
    }
    .information{
      width: 80%;
      margin: 0 auto;
      .title{
        font-size: 16px;
        margin-top: 50px;
        margin-bottom: 20px;
        display: flex;
        span{
          height: 15px;
          width: 5px;
          margin-right: 10px;
          background-color: rebeccapurple;
          display: inline-block;
        }
      }
    }
  }
</style>
