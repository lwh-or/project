<template>
    <div style="padding-top: 46px">
        <van-nav-bar
                :title="title"
                left-text="返回"
                left-arrow
                fixed
                :border="false"
                @click-left="$router.go(-1)"
        />

        <van-list
                v-model="loading"
                :finished="finished"
                :error.sync="error"
                finished-text="没有更多了"
                error-text="请求失败，点击重新加载"
                @load="onLoad"
        >
            <el-table
                    :data="list"
                    :show-header="false"
                    size="mini"
                    class="miner-orders--outputs"
            >
                <el-table-column>
                    <template slot-scope="scope">
                        <van-cell title="币种" :label="scope.row.miner.symbol"/>
                    </template>
                </el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                        <van-cell title="数量" :label="scope.row.quantity"/>
                    </template>
                </el-table-column>
                <el-table-column width="110">
                    <template slot-scope="scope">
                        <van-cell title="时间" :label="moment(scope.row.created_at).format('MM/DD HH:mm:ss')"/>
                    </template>
                </el-table-column>
                <el-table-column align="right">
                    <van-cell title="状态" label="已到账"/>
                </el-table-column>
            </el-table>
        </van-list>
    </div>
</template>

<script>
    import moment from 'moment';

    export default {
        name: "Outputs",
        data() {
            return {
                title: '',
                list: [],
                refreshing: false,
                loading: false,
                finished: false,
                error: false,
                pagination: {
                    page: 1,
                    limit: 10
                },
                moment
            }
        },
        created() {
            this.title = `矿机 ${this.$route.query.number} 产出记录`;
        },
        methods: {
            onLoad() {
                this.$http.get(`/miner-orders/${this.$route.params.id}/miner_output`, {
                    params: this.pagination
                }).then(response => {
                    this.loading = false;

                    if (response.data.data.length) {
                        response.data.data.map(item => {
                            this.list.push(item);
                        });

                        this.pagination.page++;
                    } else {
                        this.finished = true;
                    }
                }).catch(() => {
                    this.loading = false;
                    this.error = true;
                })
            },
        }
    }
</script>

<style lang="less" scoped>
    .miner-orders--outputs {
        .van-cell {
            font-size: 12px;
            padding: 0;
        }
    }
</style>