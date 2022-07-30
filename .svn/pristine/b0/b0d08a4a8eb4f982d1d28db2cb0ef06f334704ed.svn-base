new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        actName: '',
        deleteId: '',
        tableData: [],
        diaMsg: '',
        // 查看地址弹窗数据
        checkUrl: '',
        qrcode: {},     // 二维码对象
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        pageMaxNum: 10,
        condition: ''
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
            } else {
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
    },
    watch: {
        pageMaxNum: function () {
            this.currentIndex = 0;
        },
        condition: function () {
            this.currentIndex = 0;
        }
    },
    created: function () {
        this.search();
    },
    mounted: function () {
        var dialogs = ['delete', 'info', 'check'];
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
        this.qrcode = new QRCode(document.getElementById('qrcode'), {
            text: '',
            width: 200,
            height: 200,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    },
    methods: {
        //模板管理业务方法
        search: function () {
            var params = {};
            params.actName = this.actName;
            $.post({
                url: '/publicConfig/appointment/applyMgmt/query.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.currentIndex = 0;
                        this.tableData = result.data;
                    } else {
                        this.showDialog('', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },
        showAdd: function () {
            window.location.href = '/publicConfig/appointment/applyMgmt.html?pageType=Operate'
        },
        goUpdate: function (item) {
            window.location.href = '/publicConfig/appointment/applyMgmt.html?pageType=Operate&actId=' + item.actId
        },
        changeStatus: function (item) {
            $.post({
                url: '/publicConfig/appointment/applyMgmt/changeStatus.ajax',
                data: {
                    id: item.id,
                    displayStatus: item.displayStatus == 1 ? 0 : 1,
                },
                success: function (result) {
                    if (result.error === 0) {
                        this.search();
                        this.showDialog('', 'info', false, result.msg);
                    } else {
                        this.showDialog('', 'info', true, result.msg);
                    }
                }.bind(this)
            });
        },
        copyLink: function () {
            this.$refs.copyInput.select();
            document.execCommand('copy');
            this.showDialog('check', 'info', true, '复制成功');
        },
        showDelete: function (item) {
            this.deleteId = item.id;
            this.showDialog('', 'delete');
        },
        showCheck: function (item) {
            this.checkUrl = item.actUrl;
            this.qrcode.clear();
            this.qrcode.makeCode(item.actUrl);
            this.showDialog('', 'check');
        },
        deleteData: function () {
            $.post({
                url: '/publicConfig/appointment/applyMgmt/del.ajax',
                data: {
                    deleteId: this.deleteId
                },
                success: function (result) {
                    if (result.error === 0) {
                        this.search();
                        this.showDialog('delete', 'info', false, result.msg);
                    } else {
                        this.showDialog('delete', 'info', true, result.msg);
                    }
                }.bind(this)
            });
        },
        appointmentTime: function (time1, time2) {
            if (!time1 && !time2) {
                return '不限制';
            }
            return (time1 ? time1 : '--') + ' 至 ' + (time2 ? time2 : '--');
        },
        goDetail: function (item) {
            window.location.href = '/publicConfig/appointment/applyMgmt.html?pageType=Detail&actId=' + item.actId;
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
        //公共方法
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
        }
    }
});
