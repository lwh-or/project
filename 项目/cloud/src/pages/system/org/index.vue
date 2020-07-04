
<template>
  <ui-container>
    <!--header start-->
    <div slot="header">
      <el-breadcrumb separator-class="el-icon-arrow-right" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>机构管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
     <!--header end-->
     <div class="flex-wrapper">
       <!-- <div class="content_list"> -->
          <!--table start-->
          <div class="table_wrapper c_wrapper">
            <div class="table_header_bar">
              <el-row type="flex" class="row-bg">
                  <el-col :span="6"><div>
                    <i class="fa fa-table"/>
                    <span  class="item_border_left">机构</span></div>
                  </el-col>
              </el-row>
            </div>
            <div class="tree_menu">
              <el-tree
              class="filter-tree"
              node-key="orgNo"
              lazy
              @node-click="selectOrg"
              :props="treeProps"
              :render-content="renderContent"
              ref="tree"
              :load="loadChild">
              </el-tree>
            </div>
          </div>
        <div class="content_list">
          <!--table start-->
          <div class="table_wrapper">
            <div class="table_header_bar item_header_bar">
              <el-row type="flex" class="row-bg">
                  <el-col :span="18"><div>
                    <i class="fa fa-table"/>
                    <span class="item_border_left">用户列表</span></div>
                  </el-col>
              </el-row>
            </div>
            <div class="table_content">
                <el-table
                    border
                    size="mini"
                    :data="userList"
                    style="width: 100%">
                    <el-table-column
                    type="selection"
                    width="55">
                    </el-table-column>
                    <el-table-column
                    label="用户编号"
                    prop="userNo">
                    </el-table-column>
                    <el-table-column
                    label="用户名"
                    prop="userName">
                    </el-table-column>
                    <el-table-column
                    label="姓名"
                    prop="name">
                    </el-table-column>
                    <el-table-column
                    label="电话"
                    prop="tel">
                    </el-table-column>
                     <el-table-column
                      label="邮箱"
                      prop="mail">
                    </el-table-column>
                    <el-table-column
                      label="头像">
                       <template slot-scope="scope">
                         <el-avatar :src="scope.row.avatar"></el-avatar>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="用户类型"
                      prop="userType">
                      </el-table-column>
                </el-table>
            </div>
          </div>
        </div>
     </div>
  </ui-container>
</template>
<script type="text/javascript">
export default {
  name: 'systemUser',
  data () {
    return {
      userList: [],
      treeProps: {
        children: 'children',
        label: 'orgName',
        isLeaf: 'leaf'
      },
      orgUserInquiry: {
        orgNo: '',
        page: {
          count: 0,
          pageSize: 10,
          pageNum: 1,
          orderBy: '',
          returnCount: true,
          offset: 0,
          limit: 0
        }
      }
    }
  },
  methods: {
    async loadChild (node, resolve) {
      let orgListInquiry = {
        parentOrgNo: node.key != null ? node.key : ''
      }
      const { $api, $message } = this
      try {
        let {dataList} = await $api.system.orgList(orgListInquiry)
        dataList.forEach(function (value, index, array) {
          array[index].leaf = array[index].leaf === 'Y' || array[index].leaf === 'y'
        })
        return resolve(dataList)
      } catch (error) {
        $message.error(error.replyText)
      } finally {
      }
    },
    async fetchUserData () {
      const { $api, $message } = this
      try {
        let {dataList, page} = await $api.system.orgUserList(this.orgUserInquiry)
        this.userList = Object.freeze(dataList)
        console.log(dataList)
        if (page) this.orgUserInquiry.page = page
      } catch (error) {
        $message.error(error.replyText)
      } finally {
      }
    },
    renderContent (h, { node, data, store }) {
      return (
        <span class="custom-tree-node c_tree_node">
          <span>{node.label}</span>
          <span>
          </span>
        </span>)
    },
    selectOrg (data, node, v) {
      this.orgUserInquiry.orgNo = data.orgNo
      this.fetchUserData()
    }
  },
  mounted () {
  }
}
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">

.c_tree_node {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.flex-wrapper .tree_menu {
  border:none;
  // padding: 0 10px;
  // box-sizing: border-box;
  // margin-right: 40px;
}
.c_wrapper {
  margin-right: 20px;
  border: 1px solid #ebeef5;
  // padding: 0 10px;
}
.el-tree-node__content {
  padding: 0 10px 0 0;
}
.flex-wrapper {
  height: 100%;
}
.el-tree-node__content {
    height: 30px !important;
}
.el-tree-node__content .c_tree_node {
  font-weight: bold
}
.el-tree-node__children .c_tree_node {
  font-weight: normal
}
</style>
