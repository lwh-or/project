<template>
  <div id="InvitationList">
    <Header>
      <img @click="$router.go(-1)" src="/static/images/asset/icon-arrows@2x.png" slot="left" style="width: 1.387rem; height: 1.387rem; display:block;" />
      <div slot="title" style="color:#fff;">{{ $route.meta.title }}</div>
    </Header>
    <div class="main">
      <div class="list_y">
        <div>
          <p><span>{{invitationCon.remaining}}</span><span>奖励金额(YDN)</span></p>
          <p><span>{{invitationCon.total}}</span><span>邀请人数(人)</span></p>
        </div>
      </div>
      <!--  -->
      <div class="tab_s">
        <van-tabs swipeable color="#EDB915" title-inactive-color="#fff" title-active-color="#fff" @click="tabs">
          <van-tab title="我的好友">
            <div v-if="logList.length > 0">
              <header class="header">
                <span>被邀请人</span>
                <span>注册时间</span>
                <span>返佣金额</span>
              </header>
              <ul class="list">
                <li v-for="item in logList" :key="item.id">
                  <span>{{item.account}}</span>
                  <span>{{item.createtime | formatData}}</span>
                  <span>{{item.amount}}</span>
                </li>
              </ul>
            </div>
            <div v-else class="no">
              <img src="../../../../static/images/cathectic/no@2x.png" />
              <p>暂无记录</p>
            </div>
          </van-tab>
          <van-tab title="我的奖励">
            <div v-if="bonusList.length > 0">
              <header class="header">
                <span>类型</span>
                <span>数量</span>
                <span>时间</span>
              </header>
              <ul class="list">
                <li v-for="(item,index) in bonusList" :key="index">
                  <span>{{item.behavior}}</span>
                  <span>{{item.quantity}}</span>
                  <span>{{item.createtime | formatData}}</span>
                </li>
              </ul>
            </div>
            <div v-else class="no">
              <img src="../../../../static/images/cathectic/no@2x.png" />
              <p>暂无记录</p>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Tab, Tabs } from 'vant'
Vue.use(Tab)
Vue.use(Tabs)
export default {
  name: 'InvitationList',
  data() {
    return {
      // tabs: [{ name: "我的好友" }, { name: "我的奖励" }],
      logList: [],
      invitationCon: [],
      bonusList: []
    }
  },
  methods: {
    onClick(name, title) {
      alert(name)
    },
    tabs() {},
    getLog() {
      //邀请人信息
      this.$http.get('user/invite/log').then(res => {
        if (res.data.status === 200) {
          this.logList = res.data.data.data
        }
      })

      this.$http.get('user/invite/total').then(res => {
        if (res.data.status === 200) {
          this.invitationCon = res.data.data
        }
      })
      this.$http.get('/user/invite/bonus').then(res => {
        if (res.data.status === 200) {
          this.bonusList = res.data.data
        }
      })
    }
  },
  created() {
    this.getLog()
  }
}
</script>

<style lang="less" scoped>
#InvitationList {
  background: url('../../../../static/images/cathectic/back_list@2x.png')
    #f8f8f8 no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  /deep/ .header {
    background: rgba(0, 0, 0, 0);
  }
  /deep/ .van-nav-bar__placeholder {
    background: rgba(0, 0, 0, 0);
  }
  /deep/.van-nav-bar__placeholder .van-nav-bar {
    border-top: 20px solid rgba(0, 0, 0, 0);
    background: rgba(0, 0, 0, 0);
  }
  /deep/ .van-tab {
    color: rgba(51, 51, 51, 1);
  }
  /deep/ .van-tab__text {
    color: rgba(51, 51, 51, 1);
    font-size: 0.853rem;
  }
  .main {
    padding: 0 1.067rem;
    .list_y {
      margin-top: 2.027rem;
      > div {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        margin-right: 2.133rem;
        p {
          width: 5.333rem;
          display: flex;
          flex-direction: column;
          font-size: 0.747rem;
          text-align: center;
          > span:first-child {
            font-size: 0.96rem;
          }
        }
      }
    }
    .tab_s {
      margin-top: 2.187rem;
      .header {
        color: #666666;
        font-size: 0.747rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 0.8rem 0;
      }
      .list {
        color: #666666;
        li {
          font-size: 0.64rem;
          margin-bottom: 0.8rem;
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
      }
    }
  }
}

#InvitationList {
  /deep/ .van-tabs {
    width: 17.867rem;
    width: 17.867rem;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 4px 0px rgba(224, 224, 224, 1);
    border-radius: 0.32rem;
    overflow: hidden;
  }
}

.no {
  height: 14.4rem;
  margin-top: 1.707rem;
  img {
    width: 5.707rem;
    height: 7.413rem;
    display: block;
    margin: 0 auto;
  }
  p {
    height: 1.493rem;
    font-size: 1.067rem;
    text-align: center;
    font-weight: 400;
    color: rgba(204, 204, 204, 1);
    line-height: 1.493rem;
    margin-top: 1.44rem;
  }
}
</style>
