<template>
    <div class="main">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <div class="item" v-for="item in list" :key="item.id">
                <div class="set flex_between">
                    <div>
                        <span>币种</span>
                        <span>{{item.coin}}</span>
                    </div>
                    <div>
                        <span>兑换数量</span>
                        <span>{{item.quantity}}</span>
                    </div>
                    <div>
                        <span>时间</span>
                        <span>{{format(item.createtime)}}</span>
                    </div>
                </div>
                <div class="set flex_between">
                    <div>
                        <span>兑换币种</span>
                        <span>{{item.to_coin}}</span>
                    </div>
                    <div>
                        <span>换得数量</span>
                        <span>{{item.to_quantity}}</span>
                    </div>
                    <div>
                        <span>状态</span>
                        <span>{{item.status}}</span>
                    </div>
                </div>
            </div>
        </van-list>
    </div>
</template>

<script>
    export default {
        name:'exchangeRecord',
        data() {
            return {
                loading: false,
                finished: false,
                page_num:1,
                page_all:1,
                list:[]
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
                return M + '/' + d + ' ' + h + ':' + m + ':' + s;
            },
            getRecord(){
                this.$http.get(`user/asset/log?log_type=${this.$route.query.type}&page=${this.page_num}`)
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
                },500);
                this.loading=false;
                if(this.page_num>this.page_all){
                    this.finished=true;
                }
            }
        },
        created(){
            this.getRecord();
        }
    }
</script>

<style scoped>
.main{
    padding: 0 .8rem;
}
.set{
    padding: .266667rem 0;
    justify-content: flex-start;
    align-items: flex-start;
}
.set span{
    display: block;
}
.set>div>span:first-child{
    font-size: .64rem;
    color: #999999;
}
.set>div>span:last-child{
    font-size: .746667rem;
}
.set>div{
    width: 33.33%;
    line-height: .96rem;
    padding: 0 .266667rem;
}
.set>div:nth-child(3){
    text-align: right;
}
.item{
    padding: .266667rem 0;
    border-bottom: .053333rem solid #DCDCDC;
}
</style>