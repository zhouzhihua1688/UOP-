
var vm = new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        tableData: {},
        diaMsg: '',


        status: '',
        appSerialId: '',
        type: '',
        projectId: '',
        container: '',
        storageType: ''
        // content: ''
    },
    created: function () {
        this.appSerialId = this.getUrlParam('appSerialId')
        this.type = this.getUrlParam('type')

    },
    mounted: function () {
        var dialogs = ['info', 'passinfo', 'operate'];
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
    // watch: {
    //     tableData: function (newval) {
    //         if (newval.custName) {
    //             this.content = '亲爱的' + newval.custName + '，您的变更银行卡申请审批失败，申请材料不正确，请重新申请，如有疑问请致电4008889918详询。'
    //         }
    //     }
    // },
    methods: {
        getTableData: function (currentIndex) {
            if (this.appSerialId === '') {
                return this.showDialog('', 'info', false, 'appSerialId为空')
            }
            var params = {
                appSerialId: this.appSerialId
            };
            $.post({
                url: '/customerService/bankCardAudit/businessHandle~businessReview~applyRecord/getList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.tableData = result.data;
                        this.projectId = result.data.projectId;
                        this.container = result.data.container;
                        this.storageType = result.data.storageType;
                    } else {
                        this.tableData = {};
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



        getUrlParam: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg); //匹配目标参数
            if (r != null) return unescape(r[2]);
            return ''; //返回参数值
        },
        operate: function (status, text) {
            this.status = status;
            this.showDialog('', 'operate', false, '确定' + text + '吗？')
        },
        audit: function (status) {
            if (this.appSerialId === '') {
                return this.showDialog('', 'info', false, 'appSerialId为空')
            }
            var params = {
                pass: status,
                remark: this.tableData.remark,
                appSerialId: this.appSerialId
            };
            var url = '/customerService/bankCardAudit/businessHandle~businessReview~applyRecord/auditHandle.ajax';
            if (this.type === 'review') {
                url = '/customerService/bankCardAudit/businessHandle~businessReview~applyRecord/auditReview.ajax';
            }
            $.post({
                url: url,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.showDialog("operate", "passinfo", false, result.msg)
                    } else {
                        this.showDialog("operate", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
        // sendSms: function () {
        //     var params = {
        //         content: this.content,
        //         appSerialId: this.appSerialId
        //     };
        //     $.post({
        //         url: '/customerService/bankCardAudit/businessHandle~businessReview~applyRecord/sendSms.ajax',
        //         data: params,
        //         success: function (result) {
        //             this.showDialog("", "passinfo", false, result.msg)
        //         }.bind(this)
        //     });
        // },
        goBack: function () {
            window.history.back()
        },
        fullView: function (elem) {
            if (elem.toElement.webkitRequestFullScreen) {
                elem.toElement.webkitRequestFullScreen();
            } else if (elem.toElement.mozRequestFullScreen) {
                elem.toElement.mozRequestFullScreen();
            } else if (elem.toElement.requestFullScreen) {
                elem.toElement.requestFullScreen();
            }
        },
        getImg: function (address) {
            if (this.storageType === "1") {
                return '/customerService/bankCardAudit/businessHandle~businessReview~applyRecord/imgObs.ajax?projectId=' + this.projectId + '&container=' + this.container + '&objectName=' + address
            } else {
                return '/customerService/bankCardAudit/businessHandle~businessReview~applyRecord/img.ajax?fileName=' + address
            }
        }
    }
});