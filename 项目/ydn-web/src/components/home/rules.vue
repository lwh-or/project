<template>
  <!-- <div class="bgb">
        <topBar :title="title" :url="url"></topBar>
        <div class="main f-14" ref="desc" v-html="rules">{{rules}}</div>
    </div> -->
  <div></div>
</template>

<script>
// import topBar from "../common/topBar";
// import $ from "jquery";
export default {
  name: "rules",
  // components:{
  //     topBar,
  // },
  // data() {
  //     return {
  //         title:'YDN规则',
  //         url:'/',
  //         rules:''
  //     }
  // },
  // methods:{
  //     getRules(){
  //         this.$http.get('candy/current')
  //         .then(res=>{
  //             if(res.data.status==200){
  //                 var data = res.data.data;
  //                 this.rules = data.content;
  //                 this.$nextTick(()=>{
  //                     this.$refs.desc.querySelectorAll('img').forEach(el => {
  //                         el.style.maxWidth='100%';
  //                     });
  //                 })
  //             }
  //         })
  //     }
  // },
  // created(){
  //     this.getRules();
  // }
};
</script>

<style lang="less" scoped></style>
