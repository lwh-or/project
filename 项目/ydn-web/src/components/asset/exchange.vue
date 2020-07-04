<template>
    <div class="bgb">
        <topBar :title="title"></topBar>
        <div class="main">
            <div class="title flex_center f-16">
                <div>{{from}}</div>
                <div class="flex_center"><img src="../../../static/images/home/jto@2x.png" alt=""></div>
                <div>{{to}}</div>
            </div>
            <div class="frame">
                <div class="item f-14">
                    <div class="f-14">金额</div>
                    <div class="flex_between">
                        <div><input placeholder="请输入兑换金额" v-model="count"></div>
                        <div>{{from}}</div>
                    </div>
                </div>
                <div class="balance f-12">可用：{{balance}}</div>
                <div class="item f-14">
                    <div class="f-14">{{to}}到账数量</div>
                    <div class="flex_between">
                        <div><input v-model="real_count"></div>
                        <div>{{to}}</div>
                    </div>
                </div>
                <div class="balance f-12">当前汇率：{{rate}}</div>
                <div class="btn f-16 flex_center" @click="submit">提交</div>
            </div>
        </div>
    </div>
</template>

<script>
import topBar from '../common/topBar'
    export default {
        name:'exchange',
        components:{
            topBar,
        },
        data() {
            return {
                title:'兑换',
                balance:'0.00',
                rate:'0',
                from:'HT',
                to:'YDN',
                count:'',
                isClick:true
            }
        },
        computed:{
            real_count(){
                if(!this.count||this.rate==0){
                    return '0.00'
                }
                var a = new this.$BN(this.count);
                var b = new this.$BN(this.rate);
                var c = a.multipliedBy(b);
                return c;
            }
        },
        watch:{
            from(){
                this.getBalance();
            }
        },
        methods:{
            getRate(){
                this.$http.get(`asset/exchange-conf?coin=${this.from}&to_coin=${this.to}`)
                .then(res=>{
                    if(res.data.status==200){
                        this.rate=res.data.data.proportion;
                    }
                })
            },
            changeDirect(){
                var a = this.from;
                this.from = this.to;
                this.to = a;
                this.getRate();
            },
            getBalance(){
                this.$http.get(`user/asset?coin=${this.from}`)
                .then(res=>{
                    if(res.data.status==200){
                        this.balance = res.data.data.quantity;
                    }
                })
            },
            submit(){
                if(this.isClick){
                    if(!this.count){
                        this.$toast('请输入转账金额');
                        return
                    }else if(this.rate==0){
                        this.$toast('暂不支持兑换');
                        return
                    }else{
                        this.isClick=false;
                        this.$http.post('user/asset/exchange',{
                            coin:this.from,
                            to_coin:this.to,
                            ex_num:this.count
                        })
                        .then(res=>{
                            this.isClick=true;
                            if(res.data.status==200){
                                this.$toast(res.data.msg);
                                this.$router.push('/');
                            }else{
                                this.count = '';
                            }
                        })
                    }
                }else{
                    this.$toast('请不要重复提交');
                }
            }
        },
        created(){
            this.getRate();
            this.getBalance();
        }
    }
</script>

<style scoped>
.main{
    width: 90%;
    margin: .8rem auto;
    border: .053333rem solid #DCDCDC;
    border-radius: 2px;
    padding-bottom: 1.6rem;
}
.title{
    height: 2.293333rem;
    padding: 0 .8rem;
    background: #F8F8F8;
    border-bottom: .053333rem solid #DCDCDC;
}
.title>div{
    width: 33.33%;
}
.title>div:nth-child(2){
    text-align: center;
}
.title>div:nth-child(3){
    text-align: right;
}
.title img{
    height: .8rem;
    display: block;
}
.frame{
    padding: 0 .64rem;
}
.frame input{
    border: 0;
    background: transparent;
    outline: none;
}
.item{
    padding: .533333rem 0;
    line-height: 1.493333rem;
    border-bottom: .053333rem solid #DCDCDC;
}
.balance{
    color: #0D6096;
    text-align: right;
    padding: .266667rem 0;
}
.code{
    color: #0D6096;
}
.fee{
    text-align: center;
    line-height: 1.066667rem;
    margin-top: 1.6rem;
    margin-bottom: 1.066667rem;
}
.fee>div:last-child{
    color: #0D6096;
}
::-webkit-input-placeholder{
    color: #999;
}
</style>