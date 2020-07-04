import Vue from "vue";
import Router from "vue-router";
import footBar from "@/components/common/footBar";

//充提记录
import recharging from "@/components/asset/PopupModel/recharging";
//添加提币地址
import address from "@/components/asset/PopupModel/address";
//提币地址
// 开奖详情
import LotteryDetails from "../view/HistryAward/LotteryDetails";

// 详情页
import Details from "@/components/Details";
//续约矿机
import renews from "@/components/miner/renews";
//新手福利
import benefits from "@/components/miner/benefits";
//购买矿机
import purchase from "@/components/miner/purchase";
//echarts
import echarts from "../../test/echarts/index.vue";
//关于我们
import aboutus from "@/components/personal/change/aboutUs";
//使用设置
import setUp from "@/components/personal/setUp";

//下载界面
// import download from '@/components/download'

//real2
import real2 from '@/components/real/real'
import notice from '@/components/notice'
import noticeDetails from '@/components/notice/details'

//客服中心
import service from '@/components/personal/service'

Vue.use(Router);


const router = new Router({
  routes: [{
      path: "/real2",
      name: "real2",
      component: real2,
      meta: {
        title: "使用设置",
        requireAuth: true,
        isShowfooterBar: false, // 是否显示底部栏
      },
      props: true,
    },
    {
      path: "/service",
      name: "service",
      component: service,
      meta: {
        title: "客服中心",
        requireAuth: true,
        isShowfooterBar: false, // 是否显示底部栏
      },
      props: true,
    },
    {
      path: "/noticeDetails/:id",
      name: "noticeDetails",
      component: noticeDetails,
      meta: {
        title: "公告详情",
        requireAuth: false,
        isShowfooterBar: false, // 是否显示底部栏
        keepAlive: false
      },
      props: true,
    },
    {
      path: "/notice",
      name: "notice",
      component: notice,
      meta: {
        title: "系统公告",
        requireAuth: true,
        isShowfooterBar: false, // 是否显示底部栏
        keepAlive: true
      },
      props: true,
    },
    {
      path: "/",
      name: "home",
      components: {
        default: () => import("@/components/home/home"),
        footBar,
      },
      meta: {
        title: "首页",
        requireAuth: true,
        keepAlive: false, // 是否开启缓存
      },
    },
    {
      path: "/setup",
      name: "setup",
      component: setUp,
      meta: {
        title: "使用设置",
        requireAuth: true,
        isShowfooterBar: false, // 是否显示底部栏
      },
      props: true,
    },
    {
      path: "/renews/:id",
      name: "renews",
      component: renews,
      meta: {
        title: "续约矿机",
        requireAuth: true,
        isShowfooterBar: false, // 是否显示底部栏
      },
      props: true,
    },
    {
      path: "/purchase/:id",
      name: "purchase",
      component: purchase,
      meta: {
        title: "购买矿机",
        requireAuth: true,
        isShowfooterBar: false, // 是否显示底部栏
      },
      props: true,
    },
    {
      path: "/benefits",
      name: "benefits",
      component: benefits,
      meta: {
        title: "新手福利",
        requireAuth: true,
        isShowfooterBar: false, // 是否显示底部栏
      },
      props: true,
    },
    {
      path: "/aboutus",
      name: "aboutus",
      component: aboutus,
      meta: {
        title: "关于我们",
        requireAuth: true,
        isShowfooterBar: false, // 是否显示底部栏
      },
      props: true,
    },
    {
      path: "/transactionBox/:id",
      name: "transactionBox",
      component: () => import("@/components/asset/PopupModel/transactionBox"),
      meta: {
        title: "提币详情",
        requireAuth: true,
        isShowfooterBar: false, // 是否显示底部栏
      },
      props: true,
    },
    {
      path: "/recharging",
      name: "recharging",
      component: recharging,
      meta: {
        title: "充提记录",
        requireAuth: true,
        isShowfooterBar: false, // 是否显示底部栏
      },
      props: true,
    },
    {
      path: "/address",
      name: "address",
      component: address,
      meta: {
        title: "添加提币地址",
        requireAuth: true,
        isShowfooterBar: false, // 是否显示底部栏
      },
      props: true,
    },
    {
      path: "/setAddress",
      name: "setAddress",
      component: () => import("@/components/asset/PopupModel/setAddress"),
      meta: {
        title: "提币地址",
        requireAuth: true,
        isShowfooterBar: false, // 是否显示底部栏
      },
      props: true,
    },
    {
      path: "/asset",
      name: "asset",
      components: {
        default: () => import("@/components/asset/asset"),
        footBar,
      },
      meta: {
        title: "资产",
        requireAuth: true,
        isShowfooterBar: true, // 是否显示底部栏
      },
    },
    {
      path: "/assetdetails/:id",
      name: "assetdetails",
      component: () => import("@/components/assetDetails"),
      meta: {
        title: "详情",
        requireAuth: true,
        isShowfooterBar: false, // 是否显示底部栏
      },
      props: true,
    },
    {
      path: "/details/:item",
      component: Details,
      meta: {
        title: "详情",
      },
    },
    {
      path: "/real",
      name: "real",
      component: () => import("@/components/real"),
      meta: {
        title: "实名验证",
        requireAuth: true,
        isShowfooterBar: false, // 是否显示底部栏
      },
      props: true,
    },
    {
      path: "/rpacket",
      components: {
        default: () => import("@/view/Rpacket"),
        footBar,
      },
      meta: {
        title: "红包",
        requireAuth: true,
        isShowfooterBar: true, // 是否显示底部栏
      },
    },
    {
      path: "/cathectic",
      components: {
        default: () => import("@/view/Cathectic"),
        footBar,
      },
      meta: {
        title: "投注",
        requireAuth: true,
        isShowfooterBar: true, // 是否显示底部栏
      },
    },
    {
      path: "/mecathectic",
      component: () => import("@/view/Cathectic/meCathectic"),
      meta: {
        title: "我的投注",
        requireAuth: true,
      },
    },
    // {
    //   path: "/mecathectic",
    //   component: () => import("@/view/Cathectic/meCathectic/catchectic"),
    //   meta: {
    //     title: "我的投注",
    //     requireAuth: true,
    //   },
    // },
    {
      path: "/candyCurrent",
      name: "candyCurrent",
      component: () => import("@/components/candyCurrent"),
      meta: {
        title: "详情",
      },
    },
    {
      path: "/lotterydetails/:item",
      name: "lotterydetails",
      component: LotteryDetails,
      meta: {
        title: "开奖详情",
      },
    },
    {
      path: "/histryAward",
      name: "histryAward",
      component: () => import("@/view/HistryAward"),
      meta: {
        title: "历史记录",
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/view/Login"),
      meta: {
        title: "登陆",
      },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/view/Register"),
      meta: {
        title: "注册",
      },
    },
    {
      path: "/reset/password",
      name: "forgotPwd",
      component: () => import("@/components/auth/forgotPwd"),
      // meta: { title: '重置登录密码' },
      meta: {
        title: "找回密码",
      },
    },
    {
      path: "/safety",
      name: "safety",
      component: () => import("@/components/Safety"),
      meta: {
        title: "安全设置",
      },
    },
    {
      // 创建交易密码
      path: "/createdeal",
      name: "createdeal",
      component: () => import("@/components/createdeal"),
      meta: {
        title: "创建交易密码",
      },
    },
    {
      path: "/download",
      name: "download",
      component: () => import("@/components/auth/download"),
      meta: {
        title: "下载APP",
      },
    },
    {
      path: "/award/record",
      name: "awardRecord",
      component: () => import("@/components/home/awardRecord"),
      meta: {
        title: "奖励记录",
        requireAuth: true,
      },
    },
    {
      path: "/invite/record",
      name: "inviteRecord",
      component: () => import("@/components/home/inviteRecord"),
      meta: {
        title: "邀请记录",
        requireAuth: true,
      },
    },
    {
      path: "/rules",
      name: "rules",
      component: () => import("@/components/home/rules"),
      meta: {
        title: "YDN规则",
        requireAuth: true,
      },
    },
    {
      path: "/recharge",
      name: "recharge",
      component: () => import("@/components/asset/recharge"),
      meta: {
        title: "充值",
        requireAuth: true,
      },
    },
    {
      path: "/rechargeInfo",
      name: "rechargeInfo",
      component: () => import("@/components/asset/rechargeInfo"),
      meta: {
        title: "充提记录",
        requireAuth: true,
      },
    },
    {
      path: "/withdraw",
      name: "withdraw",
      component: () => import("@/components/asset/withdraw"),
      meta: {
        title: "提现",
        requireAuth: true,
      },
    },
    {
      path: "/exchange",
      name: "exchange",
      component: () => import("@/components/asset/exchange"),
      meta: {
        title: "兑换",
        requireAuth: true,
      },
    },
    {
      path: "/transfer",
      name: "transfer",
      component: () => import("@/components/asset/Transfer"),
      meta: {
        title: "划转",
        requireAuth: true,
      },
    },
    {
      path: "/transferdetails",
      name: "transferdetails",
      component: () => import("@/components/asset/TransferDetails"),
      meta: {
        title: "划转详情",
        requireAuth: true,
      },
    },
    {
      path: "/asset/record",
      name: "assetRecord",
      component: () => import("@/components/record/assetRecord"),
      redirect: {
        path: "asset/record/cash",
        query: {
          type: "recharge",
        },
      },
      children: [{
        path: "cash",
        name: "cash",
        component: () => import("@/components/record/cash"),
        meta: {
          title: "首页",
          requireAuth: true,
          keepAlive: true, // 是否开启缓存
        },
      }, ],
    },
    {
      path: "/miner",
      component: () => import("../components/miner/Index"),
      meta: {
        title: "矿机",
        requireAuth: true,
      },
    },
    {
      path: "/miner/:id/buy",
      component: () => import("../components/miner/Buy"),
      meta: {
        title: "购买矿机",
        requireAuth: true,
      },
    },
    {
      path: "/miner/buy",
      component: () => import("../components/miner/Buy"),
      meta: {
        title: "购买矿机",
        requireAuth: true,
      },
    },
    {
      path: "/miner/list",
      component: () => import("../components/miner/List"),
      meta: {
        title: "我的矿机",
        requireAuth: true,
      },
    },
    {
      path: "/miner/:id",
      component: () => import("../components/miner/Show"),
      meta: {
        title: "详情",
        requireAuth: true,
      },
    },
    {
      path: "/miner/show",
      component: () => import("../components/miner/Show"),
      meta: {
        title: "详情",
        requireAuth: true,
      },
    },
    {
      path: "/miner/:id/outputs",
      component: () => import("../components/miner/Outputs"),
      meta: {
        title: "产出记录",
        requireAuth: true,
      },
    },

    // 划转记录
    {
      path: "/transfers",
      component: () => import("../components/asset/Transfers"),
      meta: {
        title: "划转记录",
        requireAuth: true,
      },
    },
    // 账户安全
    {
      path: "/security",
      component: () => import("../components/personal/security.vue"),
      meta: {
        title: "账户安全",
        requireAuth: true,
      },
    },
    //修改密码
    {
      path: "/changePwd",
      component: () => import("../components/personal/change/changePwd.vue"),
      meta: {
        title: "changePwd",
        requireAuth: true,
      },
    },
    {
      path: "/investment",
      name: "investment",
      component: () => import("@/components/investment/investment"),
      meta: {
        title: "理财",
        requireAuth: true,
      },
    },
    {
      path: "/purchase",
      name: "purchase",
      component: () => import("@/components/investment/purchase"),
      meta: {
        title: "购买",
        requireAuth: true,
      },
    },
    {
      path: "/order",
      name: "order",
      component: () => import("@/components/investment/order"),
      meta: {
        title: "我的订单",
        requireAuth: true,
      },
    },
    {
      path: '/orderDetails',
      name: 'orderDetails',
      component: () => import("@/components/investment/orderDetails"),
      meta: {
        title: "订单详情",
      },
    },
    {
      path: "/personal",
      name: "personal",
      components: {
        default: () => import("@/components/personal/personal"),
        footBar,
      },
      meta: {
        title: "个人中心",
        requireAuth: true,
        isShowfooterBar: true, // 是否显示底部栏
      },
    },
    {
      path: "/invite",
      name: "invite",
      component: () => import("@/components/personal/invite"),
      meta: {
        title: "我的邀请",
        requireAuth: true,
      },
    },
    {
      path: "/invitation",
      name: "invitation",
      component: () => import("@/components/Invitation"),
      meta: {
        title: "邀请好礼",
        requireAuth: true,
      },
    },
    {
      path: "/recharging",
      name: "recharging",
      component: recharging,
      meta: {
        title: "充提记录",
        requireAuth: true,
        isShowfooterBar: false, // 是否显示底部栏
      },
      props: true,
    },
    {
      path: "/address",
      name: "address",
      component: address,
      meta: {
        title: "充提记录",
        requireAuth: true,
        isShowfooterBar: false, // 是否显示底部栏
      },
    },
    {
      path: "/invitationlist",
      name: "invitationlist",
      component: () => import("@/components/Invitation/InvitationList"),
      meta: {
        title: "我的邀请",
        requireAuth: true,
      },
    },
    {
      path: "/echarts",
      name: "echarts",
      components: {
        default: echarts,
        footBar,
      },
      meta: {
        title: "echarts",
        requireAuth: true,
        isShowfooterBar: true, // 是否显示底部栏
      },
      props: true,
    },
    {
      path: "/address",
      name: "address",
      component: address,
      meta: {
        title: "充提记录",
        requireAuth: true,
        isShowfooterBar: false, // 是否显示底部栏
      },
    },
    {
      path: "/invitationlist",
      name: "invitationlist",
      component: () => import("@/components/Invitation/InvitationList"),
      meta: {
        title: "我的邀请",
        requireAuth: true,
      },
    },
  ],
});

// 路由守卫

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title || "YDN";
  if (to.meta.requireAuth === true) {
    //需要登录权限进入的路由
    if (!localStorage.getItem("_token_ydn")) {
      //取不到登录信息
      // store.state
      return next({
        name: "login",
      });
    } else {
      //取得到登录信息，进行下一步
      return next();
    }
  } else {
    //不需要登录权限
    return next();
  }
});

export default router;