new Vue({
    el: '#content',
    data: {
        //查询条件
        custNo: '',
        modelId: '',
        //主页面相关数据
        tableData: [],
        blockTableData: [],
        modelIdQuery: '',
        userId: '',
        diaMsg: '',
        previewPath: '',
        loadingStatus: '数据获取中...',
        loadingStatus1: '数据获取中...',
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10,
        //主表格分页数据2
        currentIndex1: 0,
        maxSpace1: 5,
        totalPage1: 0,
        pageMaxNum1: 10,
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
        },
        pageList1: function () {
            var arr = [];
            if (this.totalPage1 <= 2 * this.maxSpace1) {
                for (var i = 0; i < this.totalPage1; i++) {
                    arr.push(i + 1);
                }
                return arr;
            }
            if (this.currentIndex1 > this.maxSpace1 && this.totalPage1 - this.currentIndex1 > this.maxSpace1) {
                for (var i = this.currentIndex1 - this.maxSpace1; i < this.currentIndex1 + this.maxSpace1; i++) {
                    arr.push(i + 1);
                }
            } else if (this.currentIndex1 <= this.maxSpace1 && this.totalPage1 - this.currentIndex1 > this.maxSpace1) {
                for (var i = 0; i < this.currentIndex1 + (2 * this.maxSpace1 - this.currentIndex1); i++) {
                    arr.push(i + 1);
                }
            } else if (this.currentIndex1 > this.maxSpace1 && this.totalPage1 - this.currentIndex1 <= this.maxSpace1) {
                var space = this.totalPage1 - this.currentIndex1;
                for (var i = this.currentIndex1 - (2 * this.maxSpace1 - space); i < this.totalPage1; i++) {
                    arr.push(i + 1);
                }
            } else {
                for (var i = 0; i < this.totalPage1; i++) {
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
        pageMaxNum1: function () {
            this.getBlockTableData(0, this.modelIdQuery);
        }
    },
    mounted: function () {
        var _this = this;
        var dialogs = ['info', 'add', 'delete1'];
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
    methods: {
        //list
        getTableData: function (currentIndex) {
            var params = {};
            var _this = this;
            params.pageNo = currentIndex + 1;
            params.pageSize = this.pageMaxNum;
            params.custNo = this.custNo;
            params.modelId = this.modelId;
            params.blockId = this.blockId;
            // console.log(params);
            _this.loadingStatus = '数据获取中...';
            $.post({
                url: '/automatedOperation/taskTrackerQuery/taskTrackerStatusQuery/searchList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.userId = result.data.userId;
                        if (result.data.rows && result.data.rows.length > 0) {
                            _this.tableData = result.data.rows;
                            _this.currentIndex = result.data.pageNum - 1;
                            _this.totalPage = result.data.pages;
                        } else {
                            _this.tableData = [];
                            _this.currentIndex = 0;
                            _this.totalPage = 0;
                            _this.loadingStatus = '没有数据';
                        }

                    } else {
                        _this.tableData = [];
                        _this.currentIndex = 0;
                        _this.totalPage = 0;
                        _this.showDialog('', 'info', false, result.msg);
                        _this.loadingStatus = '没有数据';
                    }
                }
            });
        },
        //dialog中模型子块List
        getBlockTableData: function (currentIndex, modelId) {
            var params = {};
            var _this = this;
            params.pageNo = currentIndex + 1;
            params.pageSize = this.pageMaxNum1;
            params.modelId = modelId;
            _this.loadingStatus1 = '数据获取中...';
            $.post({
                url: '/automatedOperation/taskTrackerQuery/taskTrackerStatusQuery/searchBlockList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        if (result.data.rows && result.data.rows.length > 0) {
                            _this.blockTableData = result.data.rows;
                            _this.currentIndex1 = result.data.pageNum - 1;
                            _this.totalPage1 = result.data.pages;
                        } else {
                            _this.blockTableData = [];
                            _this.currentIndex1 = 0;
                            _this.totalPage1 = 0;
                            _this.loadingStatus1 = '没有数据';
                        }

                    } else {
                        _this.blockTableData = [];
                        _this.currentIndex1 = 0;
                        _this.totalPage1 = 0;
                        _this.showDialog('', 'info', false, result.msg);
                        _this.loadingStatus1 = '没有数据';
                    }
                }
            });
        },
        checkSubBlock: function (item) {
            this.modelIdQuery = item.modelId;
            this.getBlockTableData(0, this.modelIdQuery);
            this.showDialog('', 'blockTable');
        },
        //主表格分页方法
        check: function (item) {
            item.check = !item.check;
        },
        allCheck: function () {
            var _this = this;
            var flag = this.checkAll;
            this.tableData.forEach(function (item) {
                item.check = !flag;
            });
        },
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
        prev1: function () {
            if (this.currentIndex1 <= 0) {
                return;
            }
            this.getBlockTableData(this.currentIndex1 - 1, this.modelIdQuery);
        },
        next1: function () {
            if (this.currentIndex1 >= this.totalPage1 - 1) {
                return;
            }
            this.getBlockTableData(this.currentIndex1 + 1, this.modelIdQuery);
        },
        changeIndex1: function (index) {
            this.getBlockTableData(index - 1, this.modelIdQuery);
        },
        toFirst1: function () {
            this.getBlockTableData(0, this.modelIdQuery);
        },
        toLast1: function () {
            this.getBlockTableData(this.totalPage1 - 1, this.modelIdQuery);
        },
        //公共方法
        showDialog: function (dia1, dia2, callback, msg) {
            if (msg) {
                this.diaMsg = msg;
            }
            else {
                msg = '输入条件错误';
            }
            if (!dia1) {
                $('#' + dia2).modal('show');
            }
            else if (!dia2) {
                $('#' + dia1).modal('hide');
            }
            else if (!callback) {
                $('#' + dia1).on("hidden.bs.modal", function () {
                    $('#' + dia2).modal('show');
                    $('#' + dia1).off().on("hidden", "hidden.bs.modal");
                });
                $('#' + dia1).modal('hide');
            }
            else {
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
        inSelected: function (item, arr, prop) {
            var _index = -1;
            arr.forEach(function (value, index) {
                if (item[prop] == value[prop]) {
                    _index = index;
                }
            });
            return _index;
        },
        formatTime: function (timestamp) {
            if(timestamp){
                var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
                var Y = date.getFullYear() + '-';
                var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
                var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
                var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
                var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
                return Y + M + D + h + m + s;
            }else{
                return '-';
            }

        },
        overflowHide: function (val) {
            var str = '';
            if (val) {
                str = val.toString();
                if (str.length > 10) {
                    str = str.substring(0, 10) + '...'
                }
            } else {
                str = '-'
            }
            return str;
        },
        stringTimeFat: function (val) {
            if (val) {
                return val.slice(0,19);
            } else {
                return ''
            }
        },
        backTimeFat: function (val) {
            if (val) {
                val = val.toString();
                var arr = val.split("-");
                var brr = arr[arr.length - 1].split('.');
                try {
                    arr[1] = arr[1].length > 1 ? arr[1] : '0' + arr[1];
                    brr[0] = brr[0].length > 1 ? brr[0] : '0' + brr[0];
                    brr[1] = brr[1].length > 1 ? brr[1] : '0' + brr[1];
                    brr[2] = brr[2].length > 1 ? brr[2] : '0' + brr[2];
                    brr[3] = brr[3].trim().length > 1 ? brr[3].trim() : '0' + brr[3].trim();
                    val = arr[0] + '-' + arr[1] + '-' + brr[0] + ' ' + brr[1] + ':' + brr[2] + ':' + brr[3]
                }
                catch (err) {
                    val = val.toString();
                }
            } else {
                val = '-'
            }
            return val;
        }
    }
});
