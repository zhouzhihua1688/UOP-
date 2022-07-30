
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
        invnm: '',
        idNo: '',
        mobielNo: '',
        startDate: '',
        endDate: ''


    },
    mounted: function () {
        var dialogs = ['info', 'review'];
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
        }
    },
    methods: {
        getTableData: function (currentIndex) {

            var params = {
                invnm: this.invnm,
                mobielNo: this.mobielNo,
                startDate: this.startDate,
                endDate: this.endDate,
                idNo: this.idNo,
                pageNo: currentIndex + 1,
                pageSize: this.pageMaxNum,
                appStatus: 0
            };
            $.post({
                url: '/customerService/modifyPhoneNum/businessHandle/getList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.tableData = result.data.results;
                        this.currentIndex = result.data.pageNo - 1;
                        this.totalPage = result.data.totalPage;
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
        widowsGoTo: function (appSerialId) {
            window.location.href = '/customerService/modifyPhoneNum/businessHandle.html?pageType=review&type=handle&appSerialId=' + appSerialId;
        },
        //导出excel
        exportExcel: function () {
            if (!this.startDate && !this.endDate) {
                return this.showDialog("", "info", false, '请输入时间，最大跨度365天');
            } else if (!this.startDate && this.endDate) {
                return this.showDialog("", "info", false, '请输入起始时间，最大跨度365天');
            } else if (this.startDate && !this.endDate) {
                return this.showDialog("", "info", false, '请输入截止时间，最大跨度365天');
            } else {
                var start = new Date(this.startDate).getTime();
                var end = new Date(this.endDate).getTime();
                if (end - start > (365 * 24 * 3600 * 1000)) {
                    return this.showDialog("", "info", false, '最大跨度365天');
                } else if (end - start < 0) {
                    return this.showDialog("", "info", false, '截止时间应大于起始时间');
                }
            }
            var url = '/customerService/modifyPhoneNum/businessHandle/exportExcel.ajax?invnm=' + this.invnm + '&idNo=' + this.idNo + '&mobielNo=' + this.mobielNo+ '&startDate=' + this.startDate + '&endDate=' + this.endDate;
            window.location.href = url;
        },
    },
    components: {
        'date-picker': VueBootstrapDatetimePicker
    }
});