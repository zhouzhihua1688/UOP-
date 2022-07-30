new Vue({
    el: '#content',
    data: {
        diaMsg: '',

        approve: {},
        onLine: {},

       
        fundId: '',
        status: ''
    },
    watch: {

    },
    created: function () {
        this.fundId = this.getUrlParam('fundId')
        this.status = this.getUrlParam('fundStatus')
        this.getTableData()

    },
    mounted: function () {
        var dialogs = ['info', 'reviewInfo', 'goBackInfo'];
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

    },
    methods: {
        getUrlParam: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg); //匹配目标参数
            if (r != null) return unescape(r[2]);
            return ''; //返回参数值
        },
        getTableData: function () {
            var params = {
                fundId: this.fundId,
                approveStatus: this.status
            };
            $.post({
                url: '/businessMgmt/IPOMgmtOCReview/IPOLimit/detailTableData.ajax ',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        this.onLine = result.data[0].onLine
                        this.approve = result.data[0].approve
                    } else {
                        this.showDialog('', 'info', false, result.msg);
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
        goBack: function () {
            window.history.back()
        },
        showReviewDialog: function (status, text) {
            if (this.fundId === '') {
                this.showDialog('', 'info', false, '基金为空');
                return;
            }
            this.status = status;
            this.showDialog('', 'reviewInfo', false, '确定' + text + '基金' + this.fundId + '吗？');

        },
        review: function () {
            var params = {
                fundId: this.fundId,
                approveStatus: this.status
            };
            $.post({
                url: '/businessMgmt/IPOMgmtOCReview/IPOLimit/detailReview.ajax ',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        if (result.data) {
                            this.showDialog('reviewInfo', 'goBackInfo', false, '复核成功');
                        } else {
                            this.showDialog('reviewInfo', 'info', false, '复核失败');
                        }
                    } else {
                        this.showDialog('reviewInfo', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },
        contrast: function (newVal, oldVal) {
            if (this.getUrlParam('fundStatus') !== 'N') {
                return oldVal
            }
            if (newVal !== oldVal) {
                if (newVal === null || newVal === undefined) {
                    if (oldVal !== null && oldVal !== undefined) {
                        return oldVal;
                    } else {
                        return '-'
                    }

                } else {
                    if (oldVal !== null && oldVal !== undefined) {
                        return `<del style='color:red;display: block'>${oldVal}</del><p style='color:green'>${newVal}</p>`;
                    } else {
                        return `<p style='color:green'>${newVal}</p>`;
                    }

                }
            } else {
                return newVal
            }
        }
    },

});