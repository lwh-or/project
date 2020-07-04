<template>
    <div class="bgb">
        <topBar :title="title"></topBar>
        <div class="main">
            <div class="f-16">{{name}}</div>
            <div class="f-12">{{time}}</div>
            <div class="f-14 content" ref="desc" v-html="content">{{content}}</div>
        </div>
    </div>
</template>

<script>
import topBar from '../common/topBar'
    export default {
        name:'information',
        components:{
            topBar,
        },
        data() {
            return {
                title:'公告详情',
                name:'',
                time:'',
                content:''
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
                return y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s;
            },
            getDetail(){
                this.$http.get(`notice/detail?id=${this.$route.query.id}`)
                .then(res=>{
                    if(res.data.status==200){
                        var data = res.data.data;
                        this.name = data.title;
                        this.time = this.formatTime(data.createtime);
                        this.content = data.content;
                        this.$nextTick(()=>{
                            this.$refs.desc.querySelectorAll('img').forEach(el => {
                                el.style.maxWidth='100%';
                            });
                        })
                    }
                })
            }
        },
        created(){
            this.getDetail();
        }
    }
</script>

<style scoped>
.main{
    padding: .8rem;
}
.main .f-12{
    color: #BBBBBB;
    padding: .533333rem 0;
}
.content{
    line-height: 1.066667rem;
}
</style>