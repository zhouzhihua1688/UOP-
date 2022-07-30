new Vue({
    el: '#content',
    data: {
        checkDate: '--',
        canClose: false,
        isPause: false, // 是否是暂停状态
        allClosed: false,  // 所有系统是否都为已收市
        sysName: '',
        remark: '',
        // 主页面相关数据
        tableData: [],
        diaMsg: '',
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        pageMaxNum: 10,
        condition: ''
    },
    mounted: function () {
        var dialogs = ['info', 'close', 'listClose'];
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
        this.search();
    },
    computed: {
        //主表格分页
        middleData: function () {
            var middleData = [];
            var filterData = [];
            var pageMaxNum = parseInt(this.pageMaxNum);
            var _this = this;
            this.tableData.forEach(function (jsonObj) {
                var valueArr = [];
                for (var prop in jsonObj) {
                    valueArr.push(jsonObj[prop]);
                }
                for (var i = 0, len = valueArr.length; i < len; i++) {
                    if (valueArr[i]) {
                        if (valueArr[i].toString().indexOf(_this.condition) != -1) {
                            filterData.push(jsonObj);
                            break;
                        }
                    }
                }
            });
            if (filterData.length <= pageMaxNum) {
                middleData.push(filterData);
                return middleData;
            }
            else {
                var i = 0;
                while ((i + 1) * pageMaxNum < filterData.length) {
                    middleData.push(filterData.slice(i * pageMaxNum, (i + 1) * pageMaxNum));
                    i++;
                }
                middleData.push(filterData.slice(i * pageMaxNum, filterData.length));
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
        allSystemCanClose: function () {
            return this.allClosed && !this.isPause && this.canClose;
        }
    },
    watch: {
        pageMaxNum: function () {
            this.currentIndex = 0;
        },
        condition: function () {
            this.currentIndex = 0;
        }
    },
    methods: {
        search: function () {
            var _this = this;
            $.post({
                url: '/businessMgmt/closingMgmt/closingMgmt/getList.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        _this.checkDate = result.data.checkDate;
                        _this.isPause = result.data.isPause;
                        _this.canClose = result.data.canClose;
                        _this.allClosed = result.data.allClosed;
                        _this.tableData = result.data.list;
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        pause: function () {
            if (this.isPause) {
                this.showDialog('', 'info', false, '已是暂停状态');
                return;
            }
            var _this = this;
            $.post({
                url: '/businessMgmt/closingMgmt/closingMgmt/pause.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('', 'info', false, '暂停成功');
                        _this.search();
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        recover: function () {
            if (!this.isPause) {
                this.showDialog('', 'info', false, '已是收市状态');
                return;
            }
            var _this = this;
            $.post({
                url: '/businessMgmt/closingMgmt/closingMgmt/recover.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('', 'info', false, '恢复成功');
                        _this.search();
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        showClose: function () {
            this.showDialog('', 'close', false);
        },
        close: function () {
            var _this = this;
            $.post({
                url: '/businessMgmt/closingMgmt/closingMgmt/close.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('close', 'info', false, '收市成功');
                        _this.search();
                    }
                    else {
                        _this.showDialog('close', 'info', false, result.msg);
                    }
                }
            });
        },
        showListClose: function (item) {
            this.sysName = item.sysName;
            this.remark = '';
            this.showDialog('', 'listClose', false);
        },
        listClose: function () {
            if (!this.sysName) {
                this.showDialog('listClose', 'info', true, '未选择子系统');
                return;
            }
            var _this = this;
            $.post({
                url: '/businessMgmt/closingMgmt/closingMgmt/listClose.ajax',
                data: {
                    sysName: _this.sysName,
                    remark: _this.remark
                },
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('listClose', 'info', false, '强制收市成功');
                        _this.search();
                    }
                    else {
                        _this.showDialog('listClose', 'info', false, result.msg);
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
        }
    }
});