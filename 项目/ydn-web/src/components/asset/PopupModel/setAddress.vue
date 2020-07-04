<template>
  <div class="address">
    <!-- 添加提币地址 -->
    <!-- 头部 -->
    <Header>
      <img @click="$router.push('/withdraw')" src="/static/images/asset/icon-arrows@2x.png" slot="left" style="width: 1.387rem; height: 1.387rem; display:block;" />
      <div slot="title" style="color:#fff;">提币地址</div>
    </Header>

    <div class="address_con" v-show="addressList.length > 0">
      <van-swipe-cell v-for="item in addressList" :key="item.id">
        <!-- <van-card desc="描述信息" title="ETH币安地址" class="goods-card" /> -->
        <div class="address-card">
          <div>
            <img src="../../../../static/images/miner/arr_diz.png" alt="" />
            <p>{{ item.note }}</p>
          </div>
          <p>{{ item.address }}</p>
        </div>

        <template #right>
          <div class="code-img" @click="deleteRess(item.id)">
            <img class="delete_img" src="../../../../static/images/miner/deleteArr.png" alt="" />
          </div>
        </template>
      </van-swipe-cell>
    </div>

    <div v-if="addressList.length === 0" class="jilu">
      <img src="../../../../static/images/miner/dizhi_bj.png" alt="" />
      <p>暂无记录</p>
    </div>
    <!-- <div class="f-16 pur-btn" @click="addRess">确定</div> -->
    <van-dialog v-model="showBox" show-cancel-button @confirm="determineRess">
      <p class="dialog_text">提示</p>
      <div class="dialog-text">是否确认删除地址？</div>
    </van-dialog>
    <div class="f-16 pur-btn" @click="$router.push('/address')">新增地址</div>
  </div>
</template>
<script>
export default {
  name: 'SetAddress',
  data() {
    return {
      address: '',
      node: '',
      showBox: false,
      addressList: [],
      ressID: ''
    }
  },
  watch: {
    // '$route' (to, from) {
    //   this.getAddress()
    // }
  },
  mounted() {
    console.log(3333333);
    
    this.getAddress()
  },
  methods: {
    //删除地址
    determineRess() {
      this.$http.delete('user/withdraw/address?id=' + this.ressID).then(res => {
        console.log(res)

        if (res.data.status == 200) {
          this.$toast('删除地址成功')
          this.getAddress()
        } else {
          this.$toast(res.data.msg)
        }
      })
    },
    //查询提币地址
    getAddress() {
      const data = {
        symbol: 'ydn',
        page: 100
      }
      this.$http.get('user/withdraw/address', data).then(res => {
        console.log(res)
        if (res.data.status == 200) {
          this.addressList = res.data.data.data
        }
      })
    },
    deleteRess(id) {
      console.log(id)
      this.showBox = true
      this.ressID = id
    }
  }
}
</script>
<style lang="less" scoped>
.address {
  height: 100%;
  overflow-y: scroll;
  padding-bottom: 1.067rem;
}
.address_con {
  width: 80%;
  padding-top: 0.533333rem;
  // height: ;
  margin: auto;
  .address-card {
    height: 4.693333rem;
    border-bottom: 1px solid #333333;
    margin-right: 10px;
    div {
      display: flex;
      img {
        width: 14px;
        height: 20px;
        margin-right: 1.066667rem;
      }
      p {
        font-size: 14px;
      }
    }
    p {
      margin-bottom: 0.8rem;
      // padding-right: .106667rem;
      width: 16.266667rem;
      word-break: break-all;
    }
  }
}
.delete-button {
  height: 100%;
}
.van-card__content {
  height: 4.8rem;
  min-height: 4.693333rem;
}
.van-swipe-cell__right {
  width: 6.293333rem;
  background-color: red;
}
.code-img {
  width: 100px;
  height: 100%;
  background-color: #ff4e5f;
  position: relative;
  .delete_img {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    // transform: translate(-50%, -50%);
    width: 1.706667rem;
    height: 1.76rem;
    margin: auto;
  }
}
.dialog_text {
  text-align: center;
  width: 100%;
  color: #000000;
  font-size: 1.066667rem;
  margin: 2.293333rem 0 1.28rem 0;
  font-weight: bold;
}
.dialog-text {
  width: 100%;
  text-align: center;
  color: #000;
  padding-bottom: 1.6rem;
}
.pur-btn {
  width: 305px;
  text-align: center;
  height: 45px;
  background: linear-gradient(
    180deg,
    rgba(11, 226, 182, 1) 0%,
    rgba(41, 172, 173, 1) 100%
  );
  border-radius: 6px;
  margin: auto;
  line-height: 45px;
  color: white;
  margin-top: 1.546667rem;
}
.jilu {
  width: 100%;
  text-align: center;
  margin-top: 4.266667rem;
  img {
    width: 4.426667rem;
    height: 5.813333rem;
    margin: auto;
  }
  p {
    color: #666666;
    font-size: 1.066667rem;
    margin-top: 1.28rem;
  }
}
</style>
