<template>
    <div class="bgb">   
        <topBar :title="title" :url="url"></topBar>
        <div class="title flex_center f-16">
            <span :class="{active:index==1}" @click="index=1">个人理财收益</span>
            <span :class="{active:index==2}" @click="index=2">推广收益</span>
        </div>
        <div class="main f-12">
            <div class="set flex_center" v-if="index==2">
                <div>来源</div>
                <div>数量</div>
                <div>时间</div>
                <div>状态</div>
            </div>
            <div class="set flex_center" v-else>
                <div>币种</div>
                <div>预计收益数量</div>
                <div>预计收益时间</div>
                <div>状态</div>
            </div>
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :immediate-check="false" @load="onLoad">
                <div class="item set flex_center f-14" v-for="(item,i) in list" :key="i">
                    <div>{{index==1?item.coin:item.from_user}}</div>
                    <div>{{index==1?item.profit:item.quantity}}</div>
                    <div>{{format(index==1?item.finishtime:item.createtime)}}</div>
                    <div>{{index==1?(item.status?'已入账':'待入账'):item.status}}</div>
                </div>
            </van-list>
        </div>
    </div>
</template>

<script>
import topBar from '../common/topBar'
    export default {
        name:'incomeRecord',
        components:{
            topBar,
        },
        data() {
            return {
                title:'理财收益记录',
                index:1,
                url:'/asset',
                loading: false,
                finished: false,
                page_num:1,
                page_all:1,
                list:[]
            }
        },
        watch:{
            index(){
                this.list = [];
                this.page_num = 1;
                // this.finished = false;
                setTimeout(()=>{this.getRecord();},500);
            }
        },
        methods:{
            format(timestamp){
                var time = new Date(timestamp*1000);
                var y = time.getFullYear(); 
                var M = time.getMonth() + 1; 
                var d = time.getDate();
                var h = time.getHours(); 
                var m = time.getMinutes(); 
                var s = time.getSeconds(); 
                if(M<10){
                    M = '0'+M;
                }
                if(d<10){
                    d = '0'+d;
                }
                if(h<10){
                    h = '0'+h;
                }
                if(m<10){
                    m = '0'+m;
                }
                if(s<10){
                    s = '0'+s;
                }
                return M + '/' + d + ' ' + h + ':' + m;
            },
            getRecord(){
                var url = this.index==1?`user/inves/myprofit?page=${this.page_num}`:'user/asset/log?log_type=investment_give'
                this.$http.get(url)
                .then(res=>{
                    if(res.data.status==200){
                        var data = res.data.data;
                        this.list = this.list.concat(data.data);
                        this.page_all = data.last_page;
                        this.page_num++;
                        if(this.page_num>this.page_all){
                            this.finished=true;
                        }
                    }
                })
            },
            onLoad(){
                setTimeout(()=>{
                    this.getRecord();
                    this.loading=false;
                    if(this.page_num>this.page_all){
                        this.finished=true;
                    }
                },500);
            }
        },
        created(){
            this.getRecord();
        }
    }
</script>

<style scoped>
.title{
    border-bottom: .053333rem solid #DCDCDC;
    background: #F8F8F8;
    color: #999999;
}
.title>span{
    flex: 1;
    line-height: 2.4rem;
    text-align: center
}
.active{
    position: relative;
    color: #0D6096;
}
.active::after{
    display: block;
    content: '';
    position: absolute;
    width: 1.6rem;
    width: 1.6rem;
    height: .106667rem;
    background: #0D6096;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
}
.main{
    padding: 0 .8rem;
}
.main>div:first-child{
    color: #999999;
    padding: .533333rem 0;
}
.set>div{
    width: 30%;
    padding: 0 .266667rem;
    white-space: wrap;
    word-break: break-all;
}
.set>div:first-child{
    width: 28%;
}
.set>div:nth-child(2){
    width: 27%;
}
.set>div:last-child{
    width: 14%;
    text-align: right;
}
.set{
    align-items: flex-start;
}
.item{
    padding: .64rem 0;
    border-bottom: .053333rem solid #DCDCDC;
    line-height: .96rem;
}
</style>