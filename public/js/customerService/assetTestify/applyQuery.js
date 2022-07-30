new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        tableData: [],
        diaMsg: '',

        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10,

        // 查询
        // startTime: moment(new Date(new Date() - 14 * 24 * 3600 * 1000)).format("YYYY-MM-DD HH:mm:ss"),
        startTime: '',
        endTime: '',
        idno: '',
        //处理申请弹窗
        showData: {}

    },
    mounted: function () {
        var dialogs = ['info', 'showApply'];
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
        },
        address: function () {
            // var str = '' + this.showData.province + this.showData.city + this.showData.area + this.showData.addr
            var str = '' + this.showData.address;
            return str.replace(/null/g, '')
        },
        assetDateText() {
            return function (date) {
                if (Object.prototype.toString.call(date) === "[object String]") {
                    return date.slice(0, 4) + '/' + date.slice(4, 6) + '/' + date.slice(6);
                }
            }
        }
    },
    watch: {
        pageMaxNum: function () {
            this.getTableData(0);
        }
    },
    methods: {
        getTableData: function (currentIndex) {
            var params = {
                status: '',
                startTime: String(this.startTime).replace(/-/g, ""),
                endTime: String(this.endTime).replace(/-/g, ""),
                idNo: this.idno,
                pageNo: currentIndex + 1,
                pageSize: this.pageMaxNum
            };
            $.post({
                url: '/customerService/assetTestify/applyQuery/getList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0 && result.data && result.data.list) {
                        // this.tableData = result.data.results;
                        // this.totalPage = result.data.totalPage;
                        this.tableData = result.data.list;
                        this.currentIndex = result.data.pageNo - 1;
                        (this.currentIndex == 0) && (this.totalCount = result.data.totalCount);
                        this.totalPage = Math.round(this.totalCount/this.pageMaxNum);
                    } else {
                        this.tableData = [];
                        this.currentIndex = 0;
                        this.totalPage = 0;
                        this.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
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
        showApply: function (item) {
            this.showData = item;
            this.showDialog('', 'showApply')
        },
        update: function (applyStatus) {
            if (this.showData.deliveryway !== '0') {
                if (applyStatus === 'S') {
                    if (!this.showData.companyCode) {
                        return this.showDialog('showApply', 'info', true, '请输入快递公司')
                    }
                    if (!this.showData.expressNo) {
                        return this.showDialog('showApply', 'info', true, '请输入快递单号')
                    }
                    // if (!this.showData.note) {
                    //     return this.showDialog('showApply', 'info', true, '请输入备注说明')
                    // }
                } else if (applyStatus === 'F') {
                    if (!this.showData.note) {
                        return this.showDialog('showApply', 'info', true, '请输入备注说明')
                    }
                }
            }
            var params = this.showData;
            params.applyStatus = applyStatus
            $.post({
                url: '/customerService/assetTestify/applyQuery/update.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.showDialog("showApply", "info", false, result.msg)
                        this.getTableData(0);
                    } else {
                        this.showDialog("showApply", "info", false, result.msg)
                    }
                }.bind(this)
            });
        }
    },
    components: {
        'date-picker': VueBootstrapDatetimePicker
    },
    filters: {
        deliveryWayText: function (value) {
            if ("0" === value) {
                return "发送扫描件";
            } else if ("1" === value) {
                return "快递原件";
            } else if ("2" === value) {
                return "快递原件和发送扫描件";
            }
            return value;
        }
    }
});