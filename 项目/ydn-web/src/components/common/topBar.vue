<template>
    <div class="common_top">
        <div>
            <!-- <div class="back" @click="back"><img src="../../../static/images/common/fan@2x.png" alt=""></div> -->
            <div class="top_title f-18">{{title}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'topBar',
        props:['title','url'],
        methods:{
            back(){
                if(this.url){
                    this.$router.push(this.url);
                }else{
                    this.$router.go(-1);
                }
            }
        }
    }
</script>

<style scoped>
.common_top{
    width: 100%;
    height: 2.346667rem;
    background: white;
    box-shadow: 0 0 5px 2px rgba(0,0,0,.1);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
}
.common_top img{
    height: .8rem;
    display: block;
}
.common_top>div{
    height: 2.346667rem;
    position: relative;
}
.top_title{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.back{
    padding: 0 .8rem;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}
</style>