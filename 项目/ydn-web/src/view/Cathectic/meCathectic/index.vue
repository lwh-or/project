<template>
  <div id="meCathectic">
    <Header>
      <img @click="$router.go(-1)" src="/static/images/asset/icon-arrows@2x.png" slot="left" style="width: 1.387rem; height: 1.387rem; display:block;" />
      <div slot="title" style="color:#fff;">我的投注</div>
    </Header>
    <van-list v-model="loading" :finished="finished" error-text="请求失败，点击重新加载" finished-text="没有更多了" @load="onLoad">
      <div class="title flex_center f-16">
        <van-tabs v-model="active" swipeable animated background="#000" color="#29ACAD" title-inactive-color="#fff" title-active-color="#fff" @click="toogleType">
          <van-tab title="全部">
            <div class="main">
              <div class="box-card">
                <div class="list">
                  <!-- 数据渲染 -->
                  <div class="item" v-for="(e, i) of allList" :key="i">
                    <div slot="header" class="clearfix">
                      <span class="private">期号：{{ e.order_sn }}</span>
                    </div>
                    <!-- 这个地方要注意写 -->
                    <el-collapse v-model="activeNames[i].name" @change="handleChange">
                      <el-collapse-item title="投注号码：4515621 ; 3321086..." name="1">
                        <p class="text" v-for="(e, i) of bgList[i]" :key="i">
                          <span v-for="(j, i) of e" :key="i">{{ j }}</span>
                        </p>
                      </el-collapse-item>
                    </el-collapse>

                    <div class="tow">
                      <p>投注时间：{{ e.created_at }}</p>
                      <p>投注数量：{{ e.note_quantity }}</p>
                    </div>
                    <!-- 这里需要将一个投注期数id转递过去 -->
                    <!-- 代开将 --- 已中奖 --- 失败 -->
                    <!-- 根据状态判断进入 -->
                    <template v-if="e.status === 'wait'">
                      <div class="there">
                        <img :src="img.wait" />
                        <span style="color:#0BE2B6">待开奖</span>
                        <img :src="img.green" />
                      </div>
                    </template>

                    <template v-if="e.status === 'winning'">
                      <div class="there">
                        <img :src="img.Winning" />
                        <span style="color:#F7B500">已中奖</span>
                        <img :src="img.yellow" />
                      </div>
                    </template>

                    <template v-if="e.status === 'no-winning'">
                      <div class="there">
                        <img :src="img.noWinning" />
                        <span style="color:#FF4E5F">未中奖</span>
                        <img :src="img.red" />
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </van-tab>
          <van-tab title="待开奖">
            <div class="main">
              <div class="box-card">
                <div class="list">
                  <!-- 数据渲染 -->
                  <div class="item" v-for="(e, i) of waitList" :key="i">
                    <div slot="header" class="clearfix">
                      <span class="private">期号：{{ e.order_sn }}</span>
                    </div>
                    <!-- 这个地方要注意写 -->
                    <el-collapse v-model="activeNames[i].name" @change="handleChange">
                      <el-collapse-item title="投注号码：4515621 ; 3321086..." name="1">
                        <p class="text" v-for="(e, i) of bgList[i]" :key="i">
                          <span v-for="(j, i) of e" :key="i">{{ j }}</span>
                        </p>
                      </el-collapse-item>
                    </el-collapse>

                    <div class="tow">
                      <p>投注时间：{{ e.created_at }}</p>
                      <p>投注数量：{{ e.note_quantity }}</p>
                    </div>
                    <!-- 这里需要将一个投注期数id转递过去 -->
                    <!-- 代开将 --- 已中奖 --- 失败 -->
                    <!-- 根据状态判断进入 -->
                    <template>
                      <div class="there">
                        <img :src="img.wait" />
                        <span style="color:#0BE2B6">待开奖</span>
                        <img :src="img.green" />
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </van-tab>
          <van-tab title="已中奖">
            <div class="main">
              <div class="box-card">
                <div class="list">
                  <!-- 数据渲染 -->
                  <div class="item" v-for="(e, i) of winningList" :key="i">
                    <div slot="header" class="clearfix">
                      <span class="private">期号：{{ e.order_sn }}</span>
                    </div>
                    <!-- 这个地方要注意写 -->
                    <el-collapse v-model="activeNames[i].name" @change="handleChange">
                      <el-collapse-item title="投注号码：4515621 ; 3321086..." name="1">
                        <p class="text" v-for="(e, i) of bgList[i]" :key="i">
                          <span v-for="(j, i) of e" :key="i">{{ j }}</span>
                        </p>
                      </el-collapse-item>
                    </el-collapse>

                    <div class="tow">
                      <p>投注时间：{{ e.created_at }}</p>
                      <p>投注数量：{{ e.note_quantity }}</p>
                    </div>
                    <!-- 这里需要将一个投注期数id转递过去 -->
                    <!-- 代开将 --- 已中奖 --- 失败 -->
                    <!-- 根据状态判断进入 -->
                    <template>
                      <div class="there">
                        <img :src="img.Winning" />
                        <span style="color:#F7B500">已中奖</span>
                        <img :src="img.yellow" />
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </van-tab>
          <van-tab title="未中奖">
            <div class="main">
              <div class="box-card">
                <div class="list">
                  <!-- 数据渲染 -->
                  <div class="item" v-for="(e, i) of nowinning" :key="i">
                    <div slot="header" class="clearfix">
                      <span class="private">期号：{{ e.order_sn }}</span>
                    </div>
                    <!-- 这个地方要注意写 -->
                    <el-collapse v-model="activeNames[i].name" @change="handleChange">
                      <el-collapse-item title="投注号码：4515621 ; 3321086..." name="1">
                        <p class="text" v-for="(e, i) of bgList[i]" :key="i">
                          <span v-for="(j, i) of e" :key="i">{{ j }}</span>
                        </p>
                      </el-collapse-item>
                    </el-collapse>

                    <div class="tow">
                      <p>投注时间：{{ e.created_at }}</p>
                      <p>投注数量：{{ e.note_quantity }}</p>
                    </div>
                    <!-- 这里需要将一个投注期数id转递过去 -->
                    <!-- 代开将 --- 已中奖 --- 失败 -->
                    <!-- 根据状态判断进入 -->
                    <template>
                      <div class="there">
                        <img :src="img.noWinning" />
                        <span style="color:#FF4E5F">未中奖</span>
                        <img :src="img.red" />
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </van-list>
  </div>
</template>

<script>
import red from '../../../../static/images/cathectic/red-right.png'
import green from '../../../../static/images/cathectic/green-right.png'
import yellow from '../../../../static/images/cathectic/yellow-right.png'
import noWinning from '../../../../static/images/cathectic/noWinning.png'
import wait from '../../../../static/images/cathectic/wait.png'
import Winning from '../../../../static/images/cathectic/Winning.png'
import _ from 'lodash'
import Vue from 'vue'
import { DropdownMenu, DropdownItem, Tab, Tabs } from 'vant'
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Tab)
Vue.use(Tabs)

export default {
  name: 'meCathectic',
  data() {
    return {
      title: '奖励记录',
      index: 0,
      url: '/',
      loading: false,
      finished: false,
      page: 1,
      page_all: 1,
      //------------------
      allList: [], //
      waitList: [],
      winningList: [],
      nowinning: [],

      allindex: 1,
      waitIndex: 1,
      winningIndex: 1,
      nowinningIndex: 1,
      //-------------------------
      isOpen: false,
      activeNames: [],
      type: 'all',
      img: {
        red,
        green,
        yellow,
        noWinning,
        wait,
        Winning
      },
      bgList: [],
      typeList: [],
      active: ''
    }
  },
  watch: {},
  methods: {
    toogleType(type, name) {
      var obj = {
        0: 'all',
        1: 'wait',
        2: 'winning',
        3: 'no-winning'
      }

      this.index = type
      this.type = obj[type]
      
      //vant 切换tab 不会 重新触发load
      //这里需要重新更新状态,切换tab是才会重新触发load
      this.loading = false
      this.finished = false

      this.getRecord()
    },
    handleChange(val) {
      console.log(val)
    },
    // toggle(panel) {
    //   this.panel = panel === this.panel ? "" : panel;
    // },
    getRecord() {
      let self = this
      // var obj = {
      //   0: self.allindex++,
      //   1: self.waitIndex++,
      //   2: self.winningIndex++,
      //   3: self.nowinningIndex++
      // }

      var obj = {
        0: self.allindex,
        1: self.waitIndex,
        2: self.winningIndex,
        3: self.nowinningIndex
      }

      if (this.index === 0) {
        self.allindex++
        console.log(obj[this.index])
      } else if (this.index === 1) {
        self.waitIndex++
        console.log(obj[this.index])
      } else if (this.index === 2) {
        self.winningIndex++
        console.log(obj[this.index])
      } else if (this.index === 3) {
        self.nowinningIndex++
        console.log(obj[this.index])
      }

      let index = obj[this.index]

      this.$http
        .get(`/prize-pool/order?page=${index}&type=${this.type}&page_size=5`)
        .then(res => {
          if (res.data.status == 200) {
            var data = res.data.data.data
            if (this.type === 'all') {
              this.allList = [...this.allList, ...data]
              // var arr
              this.allList.forEach(item => {
                this.activeNames.push({ name: '' })
                this.bgList.push(_.chunk(item.note_number, 3))
              })
            } else if (this.type === 'wait') {
              this.waitList = [...this.waitList, ...data]
              this.waitList.forEach(item => {
                this.activeNames.push({ name: '' })
                this.bgList.push(_.chunk(item.note_number, 3))
              })
            } else if (this.type === 'winning') {
              this.winningList = [...this.winningList, ...data]
              // var arr
              this.winningList.forEach(item => {
                this.activeNames.push({ name: '' })
                this.bgList.push(_.chunk(item.note_number, 3))
              })
            } else if (this.type === 'no-winning') {
              // nowinning
              this.nowinning = [...this.nowinning, ...data]
              this.nowinning.forEach(item => {
                this.activeNames.push({ name: '' })
                this.bgList.push(_.chunk(item.note_number, 3))
              })
            }

            this.loading = false
            console.log(data)

            if (data.length === 0) {
              this.finished = true
            }
          }
        })
    },
    getAwarded() {},
    prizeoption() {
      this.$http.get('/prize-pool/option').then(res => {
        if (res.data.status === 200) {
          this.typeList = res.data.data
        }
      })
    },
    onLoad() {
      this.getRecord()
    }
  },
  created() {
    this.prizeoption()
    // this.getRecord();
  }
}
</script>

<style lang="less" scoped>
#meCathectic {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}

.set {
  padding: 0.266667rem 0;
  align-items: flex-start;
  flex-wrap: wrap;
}
.set span {
  display: block;
}
.set > div {
  line-height: 0.96rem;
}
.set > div:last-child {
  text-align: right;
}
.item {
  padding: 0.907rem;
  padding-top: 0;
}

.bottom_border {
  padding-bottom: 0.747rem;
  border-bottom: 1px solid #333333;
}
.margin_top {
  margin-top: 0.8rem;
}
.set.margin_top span {
  font-size: 0.64rem;
  color: #cccccc;
}
.el-card {
  background-color: transparent;
  border: none;
}
.private {
  color: #fff;
  font-size: 0.64rem;
}

.el-card /deep/ .el-card__header {
  border-color: #333333;
  padding: 0.533rem 0rem;
}

.el-card /deep/ .el-card__body {
  padding: 0;
}
#meCathectic {
  .title {
    margin-top: 1.12rem;
    border-bottom: 0.053333rem solid #040606;
    background: #040606;
    color: #ffffff;
    display: flex;
    justify-content: space-around;
  }
  .title > span {
    width: 4.267rem;
    line-height: 1.387rem;
    text-align: center;
    height: 1.387rem;
    border-radius: 0.533rem;
    text-align: center;
    font-size: 0.747rem;
    color: #999999;
  }
  .title > span.active {
    color: #fff;
    background-color: #171818;
  }

  .header_title span {
    display: block;
    color: #e4e4e4;
    font-size: 0.747rem;
  }
  .main {
    width: 17.867rem;
    margin: 0 auto;
    margin-top: 0.693rem;
    .box-card {
      width: 17.813rem;
      margin: 0 auto;
      margin-top: 1.067rem;
      border-radius: 0.32rem;
      .list {
        .item {
          background-color: #171818;
          box-shadow: 0px 2px 4px 0px rgba(51, 51, 51, 1);
          border-radius: 0.32rem;
          font-size: 0.64rem;
          margin-bottom: 0.747rem;
          padding-top: 0.48rem;
          .text {
            text-align: center;
            overflow: hidden;
            padding-left: 0.533rem;
            padding-right: 1.547rem;
            letter-spacing: 2px;
            span {
              float: left;
              margin-right: 1.067rem;
              font-size: 0.747rem;
              &:nth-child(3n + 3) {
                margin-right: 0px;
              }
            }
          }
        }
        > div:nth-child(1) {
          color: #ffffff;
          font-size: 0.747rem;
        }
        .now {
          box-sizing: border-box;
          background-color: #333333;
          background: rgba(51, 51, 51, 1);
          height: 30px;
          line-height: 1.6rem;
          border-radius: 6px;
          font-size: 0.747rem;
          padding-left: 0.533rem;
        }
        .tow {
          margin-top: 0.533rem;
          line-height: 1.8;
          font-size: 0.64rem;
        }
        .there {
          color: #0be2b6;
          font-size: 0.747rem;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          span {
            padding: 0 0.427rem;
          }
          img {
            width: 0.373rem;
            height: 0.587rem;
            display: block;
            &:nth-child(1) {
              width: 0.64rem;
              height: 0.693rem;
              display: block;
            }
          }
        }
      }
    }
  }
}

#meCathectic {
  /deep/ .el-card__header {
    border: none;
    font-size: 0.64rem;
  }
  /deep/ .el-collapse-item__wrap {
    background-color: transparent;
    color: #fff;
    font-size: 0.64rem;
    border-bottom: none;
  }
  /deep/ .el-collapse-item__content {
    color: #fff;
    padding-bottom: 0px;
    font-size: 0.64rem;
  }
  /deep/ .el-collapse-item__header {
    background-color: transparent;
    border-bottom: none;
    color: #fff;
    font-size: 0.64rem;
    padding-left: 0.533rem;
  }
  /deep/ .el-collapse {
    border: none;
    background: rgba(51, 51, 51, 1);
    border-radius: 0.32rem;
    font-size: 0.64rem;
  }
  /deep/ .el-icon-arrow-right:before {
    color: #0be2b6;
    font-size: 0.64rem;
  }
  /deep/ .el-collapse {
    margin-top: 0.693rem;
    font-size: 0.64rem;
  }
  /deep/ .van-tabs {
    width: 100%;
  }
}
</style>
