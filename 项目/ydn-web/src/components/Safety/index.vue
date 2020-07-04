<template>
  <div id="safety">
    <Header>
      <img @click="$router.go(-1)"
           src="/static/images/asset/icon-arrows@2x.png"
           slot="left"
           style="width: 1.387rem; height: 1.387rem; display:block; margin-left: 1.067rem;" />
      <div slot="title"
           style="color:#fff;">{{ $route.meta.title || '安全' }}</div>
    </Header>

    <div class="bigimg">
      <img src="/static/images/safety/Illustration@2x.png">
      <p class="t-1">为了你的资金安全，需要你完成一下步骤方可继续操作</p>
    </div>

    <div class="warpper">
      <van-field left-icon="../../../static/images/safety/autonym@2x.png"
                 error
                 readonly
                 placeholder="完成实名认证">
        <button slot="right-icon"
                class="button">已认证</button>
      </van-field>
      <van-field left-icon="../../../static/images/safety/deal@2x.png"
                 error
                 readonly
                 placeholder="设置交易密码">
        <button slot="right-icon"
                class="button active">去设置</button>
      </van-field>

    </div>
    <div class="b">
      <button class="button way">以后设置</button>
    </div>

  </div>
</template>

<script>
import Vue from 'vue';
import { Field } from 'vant';
Vue.use(Field);
export default {
  name: 'Safety'
}
</script>

<style lang="less" scoped>
#safety {
  .bigimg {
    margin-top: 0.533rem;
    width: 13.387rem;
    height: 9.707rem;
    margin: 0 auto;
    img {
      width: 8rem;
      height: 6.933rem;
      display: block;
      margin: 0 auto;
    }
    .t-1 {
      font-size: 0.747rem;
      color: #ffffff;
      line-height: 1.6rem;
      text-align: center;
    }
  }
  .warpper {
    margin: 0 1.867rem;
    margin-top: 1.813rem;
    margin-bottom: 2.667rem;
  }
}

.van-cell:not(:last-child)::after {
  border-bottom: none;
}

.button {
  width: 3.413rem;
  height: 1.387rem;
  line-height: .387rem;
  font-size: 0.64rem;
  text-align: center;
  border-radius: 1.067rem;
  border: 1px solid #29acad;
  background: transparent;
  color: rgba(41, 172, 173, 1);
}

.button.active {
  background: rgba(41, 172, 173, 1);
  color: #fff;
}
.b {
  
  width: 16.32rem;
  margin: 0 auto;
  text-align: center;
}
.button.way {
  display: inline-block;
  width: 7.573rem;
  height: 2.133rem;
  color: #29acad;
  font-size: .853rem;
}
</style>