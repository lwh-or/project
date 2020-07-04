<template>
    <div>
        <div class="slide_wrap" @click="close">
            <div class="slide_content animated slideInUp">
                <div class="slide_title flex_center f-16">选择币种</div>
                <div class="list">
                    <div class="list_item f-16 flex_between" v-for="item in list" :key="item.symbol" @click="changeCoin(item)">
                        <div class="flex_center">
                            <div class="coin">{{item.symbol}}</div>
                            <div class="f-12" v-if="type=='transfer'">余额：{{item.quantity}}</div>
                        </div>
                        <div class="flex_center">
                            <span class="f-14 stop_trade" v-show="type=='recharge'&&item.is_recharge==0">暂停充值</span>
                            <span class="f-14 stop_trade" v-show="type=='withdraw'&&item.is_out==0">暂停提现</span>
                            <img src="../../../static/images/home/dui@2x.png" alt="" v-show="current==item.symbol">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'coinList',
        props:['type','coin'],
        data() {
            return {
                current:'VVC',
                list:[]
            }
        },
        methods:{
            close(){
                this.$emit('slider-close',true)
            },
            getCoinList(){
                this.$http.get('user/coins')
                .then(res=>{
                    if(res.data.status==200){
                        this.list = res.data.data;
                    }
                })
            },
            changeCoin(item){
                if(this.type=='recharge'&&item.is_recharge==0){
                    return;
                }
                if(this.type=='withdraw'&&item.is_withdraw==0){
                    return;
                }
                if(this.type=='transfer'&&item.is_transfer==0){
                    return;
                }
                this.$emit('coin-info',item);
            }
        },
        created(){
            this.getCoinList();
            this.current=this.coin
        }
    }
</script>

<style scoped>
.slide_wrap{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.6);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2000;
}
.slide_content{
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    background: white;
}
.slide_title{
    height: 2.666667rem;
    border-bottom: 1px solid #DCDCDC;
}
.list{
    padding: 0 .8rem;
}
.list_item img{
    height: .8rem;
    margin-left: .266667rem;
    display: block;
}
.list_item{
    height: 2.666667rem;
    border-bottom: 1px solid #DCDCDC;
}
.list>div:last-child{
    border: 0;
}
.list_item .f-12{
    color: #999999;
}
.coin{
    width: 5.333333rem;
}
.stop_trade{
    color: #0D6096;
}
</style>