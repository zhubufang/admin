export default {
    data() {
        return {
            loading: false,
            dialogVisible: false,
            dialogTitle: "新增",
            pageShow: true,
            total: 1,
            page: {
                page: 1,
                pageSize: 10
            },
            type: '新增', //是否新增还是编辑
        }
    },
    filters: {
        numToString(value) {
            return value.toString();
        }
    },
    created() {
        this.getList()
    },
    methods: {
        // 获取请求参数
        getParams() {
            return {}
        },
        // 处理列表结果
        getListResult(data) {

        },
        //获取list
        getList() {
            let params = this.getParams()
            this.loading = true
            this.$service({
                ...params
            }).then(res => {
                this.loading = false
                if (res.code === 200) {
                    let data = res.data
                    this.getListResult(data)
                }
            }).catch((error) => {
                this.loading = false
                console.log(error)
            })
        },
        // 处理获取by id 结果
        getDataByIdResult(data) {

        },
        //获取by id
        getDataById(url, method, data) {
            console.log(url, method, data)
            this.$service({
                url,
                method,
                params: {
                    ...data
                }
            }).then(res => {
                if (res.code === 200) {
                    this.getDataByIdResult(res.data)
                }
            })
        },
        //新增
        add(url, method, data) {
            this.$service({
                url,
                method,
                data: {
                    ...data
                }
            }).then(res => {
                if (res.code === 200) {
                    this.getList()
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    })
                }
            })
            this.dialogVisible = false;
        },
        //更新
        update(url, method, data) {
            this.$service({
                url,
                method,
                data: {
                    ...data
                }
            }).then(res => {
                if (res.code === 200) {
                    this.$message({
                        message: '更新成功',
                        type: 'success'
                    })
                    this.getList()
                }
            })
            this.dialogVisible = false;
        },
        //删除
        remove(url, method, data) {
            this.$confirm('是否要删除项?', '提示', {
                confirmButtonText: '删除',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$service({
                    url,
                    method,
                    data: {
                        ...data
                    }
                }).then(res => {
                    if (res.code === 200) {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        })
                        this.getList()
                    }
                })
            }).catch((err) => {
                console.log(err)
            })

        },

        //关闭dialog
        closeDialog() {
            this.dialogVisible = false;
        },

        //分页
        handleCurrentChange(currentPage) {
            this.page.page = currentPage;
            this.getList()
        }

    }
}