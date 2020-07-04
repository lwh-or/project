<template>
  <div class="address">
    <!-- 添加提币地址 -->
    <!-- 头部 -->
    <Header>
      <img
        @click="$router.push('/setAddress')"
        src="/static/images/asset/icon-arrows@2x.png"
        slot="left"
        style="width: 1.387rem; height: 1.387rem; display:block; margin-left: 1.067rem;"
      />
      <div slot="title" style="color:#fff;">新增地址</div>
    </Header>

    <div class="address_con">
      <div class="address_t">
        <div>
          <p>地址</p>
          <img src="../../../../static/images/miner/shao.png" alt="" />
        </div>
        <input type="text" v-model="address" placeholder="请输入或者粘贴地址" />
      </div>
      <div class="address_t">
        <div>
          <p>地址名称</p>
        </div>
        <input type="text" v-model="node" placeholder="请输入或者粘贴地址" />
      </div>
    </div>
    <div class="f-16 pur-btn" @click="addRess">确定</div>
  </div>
</template>
<script>
export default {
  name: "Address",
  data() {
    return {
      address: "",
      node: "",
    };
  },
  methods: {
    addRess() {
      if (!this.address) {
        this.$toast("请输入地址");
        return;
      } else if (!this.node) {
        this.$toast("请输入地址名称");
        return;
      } else {
        const data = {
          symbol: "ydn",
          address: this.address,
          note: this.node,
        };
        this.$http.post("user/withdraw/address", data).then((res) => {
          if (res.data.status == 200) {
            // var list = res.data.data
            this.$toast(res.data.msg);
            this.$router.push('/setAddress');
             this.node = ''
             this.address = ''
          } else {
            this.$toast(res.data.msg);
          }
        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
.address_con {
  width: 80%;
  padding-top: 0.533333rem;
  // height: ;
  margin: auto;
  .address_t {
    div {
      display: flex;
      justify-content: space-between;
      p {
        margin: 0.533333rem 0;
      }
      img {
        width: 14px;
        height: 14px;
      }
    }
  }
  input {
    width: 100%;
    background-color: #000;
    padding-bottom: 0.533333rem;
    border: 0;
    border-bottom: 1px solid #333333;
  }
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
</style>
