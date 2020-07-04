<template>
  <div>
    <Header :list="list" />
    <Hello ref="hello" />
    <Wath ref="wath" />
    <Selected ref="selected" />
    <Matrix ref="matrix" />
    <Ship ref="ship" />
    <Settled ref="settled" />
    <Contact ref="contact" />
  </div>
</template>
<script>
import Header from "../components/header";
import Hello from "../components/Hello";
import Wath from "../components/wath";
import Selected from "../components/selected";
import Matrix from "../components/matrix";
import Ship from "../components/ship";
import Settled from "../components/settled";
import Contact from "../components/contact";
export default {
  name: "home",
  data() {
    return {
      list: []
    };
  },
  components: {
    Hello,
    Wath,
    Selected,
    Matrix,
    Ship,
    Settled,
    Contact,
    Header
  },
  mounted() {
    let list = [];
    if (this.$refs) {
      const arr = Object.keys(this.$refs);
      arr.forEach(item => {
        return list.push(this.$refs[item].$el.getBoundingClientRect().top);
      });
    }
    this.list = list;
  }
};
</script>

<style lang="scss" scoped></style>
