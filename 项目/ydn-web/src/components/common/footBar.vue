<template>
  <div>
    <div class="foot f-12 flex_center">
      <router-link :to="item.link"
                   tag="div"
                   v-for="item in router_list"
                   :key="item.id"
                   class="flex_center">
        <div>
          <img :src="$route.path == item.link ? item.url_on : item.url"
               alt="" />
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "footBar",
  data () {
    return {
      router_list: [
        {
          title: "首页",
          url: "../../../static/images/footerBar/home@2x.png",
          url_on: "../../../static/images/footerBar/home-on@2x.png",
          link: "/",
          id: 1,
        },
        {
          title: "投注",
          url: "../../../static/images/footerBar/cathectic@2x.png",
          url_on: "../../../static/images/footerBar/cathectic-on@2x.png",
          link: "/cathectic",
          id: 2,
        },
        {
          title: "红包",
          url: "../../../static/images/footerBar/red-packet@2x.png",
          url_on: "../../../static/images/footerBar/red-packet-on@2x.png",
          link: "/rpacket",
          id: 3,
        },
        {
          title: "资产",
          url: "../../../static/images/footerBar/asset@2x.png",
          url_on: "../../../static/images/footerBar/asset-on@2x.png",
          link: "/asset",
          id: 4,
        },
        {
          title: "我的",
          url: "../../../static/images/footerBar/mine@2x.png",
          url_on: "../../../static/images/footerBar/mine-on@2x.png",
          link: "/personal",
          id: 5,
        },
      ],
    };
  },
};
</script>

<style scoped>
.foot {
  width: 100%;
  height: 2.666667rem;
  color: #adadad;
  background: #040606;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1);
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1000;
  font-size: 0.427rem;
}
.foot img {
  width: 1.28rem;
  height: 1.28rem;
  display: block;
  margin-bottom: 0.266667rem;
}
.foot > div {
  height: 2.666667rem;
  flex: 1;
  flex-direction: column;
}
.router-link-exact-active {
  color: #0be2b6;
  font-size: 0.427rem;
}
</style>
