new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        tableData: [],
        currentIndex: 0,
        maxSpace: 5,
        pageMaxNum: 10,
        diaMsg: '',
        // 查询
        custNo: '',
        result: '',
        status: '0',
        startDate: '',
        endDate: '',
        modifyData: {
            note: '',
            result: '',
            serialNo: '',
        }
    },
    mounted: function () {
        var dialogs = ['info', 'notice'];
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
    },
    computed: {
        //主表格分页
        middleData: function () {
            var middleData = [];
            var pageMaxNum = parseInt(this.pageMaxNum);
            if (this.tableData.length <= pageMaxNum) {
                middleData.push(this.tableData);
                return middleData;
            } else {
                var i = 0;
                while ((i + 1) * pageMaxNum < this.tableData.length) {
                    middleData.push(this.tableData.slice(i * pageMaxNum, (i + 1) * pageMaxNum));
                    i++;
                }
                middleData.push(this.tableData.slice(i * pageMaxNum, this.tableData.length));
                return middleData;
            }
        },
        viewData: function () {
            var currentIndex = parseInt(this.currentIndex);
            return this.middleData[currentIndex];
        },
        pageList: function () {
            var arr = [];
            if (this.middleData.length <= 2 * this.maxSpace) {
                for (var i = 0; i < this.middleData.length; i++) {
                    arr.push(i + 1);
                }
                return arr;
            }
            if (this.currentIndex > this.maxSpace && this.middleData.length - this.currentIndex > this.maxSpace) {
                for (var i = this.currentIndex - this.maxSpace; i < this.currentIndex + this.maxSpace; i++) {
                    arr.push(i + 1);
                }
            } else if (this.currentIndex <= this.maxSpace && this.middleData.length - this.currentIndex > this.maxSpace) {
                for (var i = 0; i < this.currentIndex + (2 * this.maxSpace - this.currentIndex); i++) {
                    arr.push(i + 1);
                }
            } else if (this.currentIndex > this.maxSpace && this.middleData.length - this.currentIndex <= this.maxSpace) {
                var space = this.middleData.length - this.currentIndex;
                for (var i = this.currentIndex - (2 * this.maxSpace - space); i < this.middleData.length; i++) {
                    arr.push(i + 1);
                }
            } else {
                for (var i = 0; i < this.middleData.length; i++) {
                    arr.push(i + 1);
                }
            }
            return arr;
        },

    },
    watch: {
        pageMaxNum: function () {
            this.currentIndex = 0;
        }
    },
    methods: {
        saveModify: function () {
            if (!this.modifyData.result) {
                return this.showDialog("notice", "info", true, '请选择处理结果');
            }
            var params = {
                serialNo: this.modifyData.serialNo,
                result: this.modifyData.result,
                note: this.modifyData.note,
            };
            $.post({
                url: '/customerService/accountQuery/firstTradeInspect/modify.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.search()
                        this.showDialog("notice", "info", false, result.msg)
                    } else {
                        this.showDialog("notice", "info", true, result.msg)
                    }
                }.bind(this)
            });
        },
        showModifyDidlog: function (item) {
            this.modifyData.note = item.note;
            this.modifyData.result = item.result;
            this.modifyData.serialNo = item.serialNo;
            this.showDialog("", "notice");
        },
        search: function () {

            var params = {
                custNo: this.custNo,
                result: this.result,
                // status: this.status,
            };
            var url = '/customerService/accountQuery/firstTradeInspect/processed.ajax';
            if (this.status === '0') {
                url = '/customerService/accountQuery/firstTradeInspect/unprocessed.ajax';
            }

            $.post({
                url: url,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.currentIndex = 0;
                        this.tableData = result.data;
                        this.totalPage = 2;
                    } else {
                        this.currentIndex = 0;
                        this.tableData = [];
                        this.totalPage = 0;
                        this.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
        //主表格分页方法
        prev: function () {
            this.currentIndex <= 0 ? 0 : this.currentIndex--;
        },
        next: function () {
            this.currentIndex >= this.middleData.length - 1 ? this.middleData.length - 1 : this.currentIndex++;
        },
        changeIndex: function (index) {
            this.currentIndex = index - 1;
        },
        toFirst: function () {
            this.currentIndex = 0;
        },
        toLast: function () {
            this.currentIndex = this.middleData.length - 1;
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


    },
    filters: {
        statusDisplay(value) {
            if (value == '1') {
                return '已处理'
            } else if (value == '0') {
                return '待处理'
            }
            return value;
        },
        resultDisplay(value) {
            if (value == '1') {
                return '通过'
            } else if (value == '2') {
                return '不通过'
            } else if (value == '3') {
                return '忽略'
            } else if (value == '4') {
                return '无需处理'
            }
            return value;
        },
        typeDisplay(value) {
            if (value == '1') {
                return '首次大额验证失败'
            } else if (value == '0') {
                return '大额验证失败'
            }
            return value;
        }
    },
    components: {
        'date-picker': VueBootstrapDatetimePicker
    },
});