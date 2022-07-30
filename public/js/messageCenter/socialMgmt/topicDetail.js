var vm = new Vue({
    el: '#content',
    data: function () {
        this.baseUrl = '/messageCenter/socialMgmt/topic';
        return {
            // 主页面相关数据
            tableData: [],
            diaMsg: '',
            //主表格分页数据
            currentIndex: 0,
            maxSpace: 5,
            totalPage: 0,
            pageMaxNum: 10,
            //分类
            classifyList: [],
            // 查询
            topicName: '',
            topicId: '',
            
            total:0,
            //删除
            delId: ''
        }
    },
    mounted: function () {
        var dialogs = ['info', 'del'];
        dialogs.forEach(function (id) {
            $('#' + id).on('shown.bs.modal', function () {
                var $this = $(this);
                var dialog = $this.find('.modal-dialog');
                var top = ($(window).height() - dialog.height()) / 2;
                dialog.css({
                    marginTop: top
                });
            });
        });

        this.getTableData(0)
        this.topicId = this.getUrlParam('topicId')
        this.topicName= this.getUrlParam('topicName')

    },
    computed: {
        pageList: function () {
            var arr = [];
            if (this.totalPage <= 2 * this.maxSpace) {
                for (var i = 0; i < this.totalPage; i++) {
                    arr.push(i + 1);
                }
                return arr;
            }
            if (this.currentIndex > this.maxSpace && this.totalPage - this.currentIndex > this.maxSpace) {
                for (var i = this.currentIndex - this.maxSpace; i < this.currentIndex + this.maxSpace; i++) {
                    arr.push(i + 1);
                }
            } else if (this.currentIndex <= this.maxSpace && this.totalPage - this.currentIndex > this.maxSpace) {
                for (var i = 0; i < this.currentIndex + (2 * this.maxSpace - this.currentIndex); i++) {
                    arr.push(i + 1);
                }
            } else if (this.currentIndex > this.maxSpace && this.totalPage - this.currentIndex <= this.maxSpace) {
                var space = this.totalPage - this.currentIndex;
                for (var i = this.currentIndex - (2 * this.maxSpace - space); i < this.totalPage; i++) {
                    arr.push(i + 1);
                }
            } else {
                for (var i = 0; i < this.totalPage; i++) {
                    arr.push(i + 1);
                }
            }
            return arr;
        }
    },
    watch: {
        pageMaxNum: function () {
            this.getTableData(0);
        }
    },
    methods: {
        classifyText: function (id) {
            var flag = this.classifyList.filter(function (item) {
                return item.id == id
            })[0];
            if (flag) {
                return flag.name
            } else {
                return id;
            }
        },
        getUrlParam: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg); //匹配目标参数
            if (r != null) return decodeURIComponent(r[2]);
            return '';
        },
        getTableData: function (currentIndex) {
            var params = {
                pageNum: currentIndex + 1,
                pageSize: this.pageMaxNum,
                topicId: this.getUrlParam('topicId'),
                // valid: 0
            };
            $.post({
                url: `${this.baseUrl}/topicTableData.ajax`,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.currentIndex = currentIndex;
                        this.total=result.data.total
                        this.totalPage = Math.ceil(result.data.total / params.pageSize);
                        this.tableData = result.data.rows;
                    } else {
                        this.currentIndex = 0;
                        this.totalPage = 0;
                        this.tableData = [];
                        this.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
    
        updateStatus: function (item) {
            $.post({
                url: `${this.baseUrl}/topicModify.ajax`,
                data: {
                    postId: item.postId,
                    status: item.status == 1 ? 5 : 1
                },
                success: function (result) {
                    if (result.error === 0) {
                        this.getTableData(0)
                        this.showDialog("", "info", false, '修改状态成功')
                    } else {
                        this.showDialog("", "info", true, result.msg)
                    }
                }.bind(this)
            });
        },
        updateLevel: function (item) {
            $.post({
                url: `${this.baseUrl}/levelModify.ajax`,
                data: {
                    postId: item.postId,
                    isTop: item.level == 1 ? 0 : 1
                },
                success: function (result) {
                    if (result.error === 0) {
                        this.getTableData(0)
                        this.showDialog("", "info", false, '修改状态成功')
                    } else {
                        this.showDialog("", "info", true, result.msg)
                    }
                }.bind(this)
            });
        },
        HTMLDecode: function (text) {
            var temp = document.createElement("div");
            temp.innerHTML = text;
            var output = temp.innerText || temp.textContent;
            temp = null;
            return output;
        },
        showAdd: function () {
            this.modifyStatus = false;
            this.showDialog('', 'add')
        },
        del: function () {
            $.post({
                url: `${this.baseUrl}/del.ajax`,
                data: {
                    id: this.delId
                },
                success: function (result) {
                    if (result.error === 0) {
                        this.getTableData(0)
                        this.showDialog("del", "info", false, result.msg)
                    } else {
                        this.showDialog("del", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
        deleteDialog: function (item) {
            this.delId = item.id;
            this.showDialog("", "del", false, '确定删除吗？');
        },
        showDialog: function (dia1, dia2, callback, msg) {
            if (msg) {
                this.diaMsg = msg;
            } else {
                msg = '输入条件错误';
            }
            if (!dia1) {
                $('#' + dia2).modal('show');
            } else if (!dia2) {
                $('#' + dia1).modal('hide');
            } else if (!callback) {
                $('#' + dia1).on("hidden.bs.modal", function () {
                    $('#' + dia2).modal('show');
                    $('#' + dia1).off().on("hidden", "hidden.bs.modal");
                });
                $('#' + dia1).modal('hide');
            } else {
                $('#' + dia1).on("hidden.bs.modal", function () {
                    $('#' + dia2).on("hidden.bs.modal", function () {
                        $('#' + dia1).modal("show");
                        $('#' + dia2).off().on("hidden", "hidden.bs.modal");
                    });
                    $('#' + dia2).modal("show");
                    $('#' + dia1).off().on("hidden", "hidden.bs.modal");
                });
                $('#' + dia1).modal('hide');
            }
        },
        //主表格分页方法
        prev: function () {
            if (this.currentIndex <= 0) {
                return;
            }
            this.getTableData(this.currentIndex - 1);
        },
        next: function () {
            if (this.currentIndex >= this.totalPage - 1) {
                return;
            }
            this.getTableData(this.currentIndex + 1);
        },
        changeIndex: function (index) {
            if (index - 1 === this.currentIndex) return;
            this.getTableData(index - 1);
        },
        toFirst: function () {
            this.getTableData(0);
        },
        toLast: function () {
            this.getTableData(this.totalPage - 1);
        }
    }
});