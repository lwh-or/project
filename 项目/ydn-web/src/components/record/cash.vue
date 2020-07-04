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
                        <span>数量</span>
                        <span>{{item.quantity}}</span>
                    </div>
                    <div>
                        <span>时间</span>
                        <span>{{formatTime(item.createtime)}}</span>
                    </div>
                    <div>
                        <span>状态</span>
                        <span>{{item.status}}</span>
                    </div>
                </div>
                <div class="set flex_between address">
                    <div>
                        <span>{{router_name=='recharge'?'充值':'提现'}}地址</span>
                        <span>{{item.address}}</span>
                    </div>
                </div>
                <div class="remark f-12" v-show="router_name=='withdraw'&&item.remark">备注：<span>{{item.remark}}</span></div>
            </div>
        </van-list>
    </div>
</template>

<script>
    export default {
        name:'cash',
        data() {
            return {
                router_name:'',
                loading: false,
                finished: false,
                page_num:1,
                page_all:1,
                list:[]
            }
        },
        methods:{
            formatTime(timestamp){
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
            format(status){
                if(status=='finish'){
                    return '已完成'
                }else if(status=='cancel'){
                    return '已取消'
                }else if(status=='wait'){
                    return '待处理'
                }else if(status=='nopass'){
                    return '已拒绝'
                }
            },
            getRecord(){
                this.$http.get(`user/asset/log?log_type=${this.router_name}&page=${this.page_num}`)
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
        beforeRouteUpdate (to, from, next) {
            // ...
            this.router_name = to.query.type;
            this.list = [];
            this.page_num=1;
            this.getRecord();
            next();
        },
        created(){
            this.router_name = this.$route.query.type;
        }
    }
</script>

<style scoped>
.main{
    padding: 0 .8rem;
}
.set{
    padding: .266667rem 0;
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
    width: 15%;
    line-height: .96rem;
    padding: 0 .266667rem;
    white-space: wrap;
}
.set>div:nth-child(2){
    width: 35%;
}
.set>div:nth-child(3){
    width: 35%;
}
.set>div:nth-child(4){
    text-align: right;
}
.address>div{
    width: 100%;
}
.item{
    padding: .266667rem 0;
    border-bottom: .053333rem solid #DCDCDC;
}
.remark{
    color: #999;
    padding: .266667rem;
}
.remark span{
    color: #0D6096;
}
</style>