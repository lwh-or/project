<template>
  <header class="header">
    <div class="header-left-logo">
      <h1>
        <img src="../../assets/home/img/logo.png" alt="logo" />
      </h1>
    </div>
    <ul class="header-right-nav">
      <li class="header-right-item f-18" @click="ison(index)" :class="{ on: index === code }" v-for="(item, index) in headerNav" :key="index">
        {{ item }}
      </li>
    </ul>
    <el-dropdown size='small' class="btn" @command="handleCommand">
      <el-button size='small'>
        {{$t('comm.i18')}}<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command='zh-CN'>中文</el-dropdown-item>
        <el-dropdown-item command='en-US'>English</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </header>
</template>
<script>
export default {
  props: {
    list: Array
  },
  data() {
    return {
      headerNav: [
        this.$t('comm.home'),
        this.$t('comm.selected'),
        this.$t('comm.brand'),
        this.$t('comm.settled'),
        this.$t('comm.chan'),
        this.$t('comm.Contactus')
      ],
      on: false,
      code: 0,
      //-- 这里为什么写死? ---//
      scrolly: [0, 1800, 3600, 4500, 5400, 6300, 7200], // 修改这里，你要到达的锚点位置,第一个是默认值，别修改，
      timeId: null
    }
  },
  mounted() {
    window.addEventListener('scroll', this.scroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scroll)
  },
  watch: {
    list() {
      this.scrolly = this.list.map(item => Math.floor(+item))
    }
  },
  methods: {
    // 点击导航栏
    ison(index) {
      let i = 0
      i = index + 1
      if (index === 0) {
        i = 0
      }
      window.scrollTo({
        left: 0,
        top: this.scrolly[i],
        behavior: 'smooth'
      })
    },
    // 滑动方法
    scroll(event) {
      ''

      let top = Math.abs(Math.floor(window.scrollY) - 1)
      if (top > 624 && top < 900) {
        let wath = document.getElementById('wath-le')
        wath.classList.add('animated', 'fadeInRight')
      } else if (top > 1340 && top < 1800) {
        let select = document.getElementById('select')
        select.classList.add('animated', 'fadeInRight')
      } else if (top > 4200 && top < 4600) {
        const tainer = document.getElementById('container')
        const left = document.getElementById('comm-left')
        const right = document.getElementById('comm-right')

        tainer.classList.add('animated', 'bounceInDown')
        left.classList.add('animated', 'bounceInLeft')
        right.classList.add('animated', 'bounceInRight')
      } else if (top > 5300 && top < 6000) {
        const code = document.getElementById('code')
        code.classList.add('animated', 'bounceInUp')
      }
      this.code = this.scrolly.findIndex(
        (item, index) => top > item && top < this.scrolly[index + 1]
      )
    },
    handleCommand(command) {
      localStorage.setItem('locale', command)
      this.$i18n.locale = command
      window.scrollTo({
        left: 0,
        top: 0
      })
      //  location.reload()
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    }
  }
}
</script>

<style scoped lang="less">
@import url('./css/header-mb.less');
@import url('./css/header-pc.less');
</style>
