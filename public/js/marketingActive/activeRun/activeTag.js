new Vue({
    el: '#content',
    data() {

        this.tagName = '';
        return {
            // 主页面相关数据
            tableData: [],
            diaMsg: '',

            //主表格分页数据
            currentIndex: 0,
            maxSpace: 5,
            totalPage: 0,
            pageMaxNum: 10,
            //add
            addData: {
                tagName: '',
            },
            //查看修改
            modifyData: {
                id: '',
                tagName: '',
            },
        }
    },
    mounted: function () {
        var dialogs = ['info', 'addNotice', 'changeNotice', 'deleteDialog'];
        var _this = this;
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
        this.getTableData(0);
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
        },

    },
    methods: {
        getTableData: function (currentIndex) {
            var params = {};
            var _this = this;
            this.tagName && (params.tagName = this.tagName)
            params.pageNo = currentIndex + 1;
            params.pageSize = this.pageMaxNum;
            $.post({
                url: '/marketingActive/activeRun/activeTag/getList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.tableData = result.data.rows;
                        _this.currentIndex = result.data.pageNum - 1;
                        _this.totalPage = result.data.pages;
                        console.log(result)
                    } else {
                        _this.tableData = [];
                        _this.currentIndex = 0;
                        _this.totalPage = 0;
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
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
            this.getTableData(index - 1);
        },
        toFirst: function () {
            this.getTableData(0);
        },
        toLast: function () {
            this.getTableData(this.totalPage - 1);
        },
        add: function () {
            if (!this.addData.tagName) {
                this.showDialog('addNotice', 'info', true, '请填写标签名称');
                return;
            }
            var params = {
                tagName: this.addData.tagName
            };
            $.post({
                url: '/marketingActive/activeRun/activeTag/dataAdd.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.getTableData(0)
                        this.addData.tagName = '';
                        this.showDialog('addNotice', 'info', false, result.msg);
                    } else {
                        this.showDialog('addNotice', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },
        deleteDialog: function (id) {
            this.modifyData.id = id
            this.showDialog("", "deleteDialog")
        },
        deleteData: function () {
            var params = {
                id: this.modifyData.id
            };
            $.post({
                url: '/marketingActive/activeRun/activeTag/dataDelete.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.showDialog('deleteDialog', 'info', false, result.msg);
                        this.modifyData.id='';
                        this.getTableData(0)
                    } else {
                        this.showDialog('deleteDialog', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },
        showView: function (item) {

            this.modifyData.tagName = item.tagName;
            this.modifyData.id = item.id;

            this.showDialog('', 'changeNotice', false)
        },
        changeDate: function () {
            if (!this.modifyData.tagName) {
                this.showDialog('changeNotice', 'info', true, '请填写标签名称');
                return;
            }
            var params = {
                id: this.modifyData.id,
                tagName: this.modifyData.tagName,
            };
            $.post({
                url: '/marketingActive/activeRun/activeTag/dataChange.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.showDialog('changeNotice', 'info', false, result.msg);
                        this.getTableData(0)
                    } else {
                        this.showDialog('changeNotice', 'info', true, result.msg);
                    }
                }.bind(this)
            });
        }
    }
});