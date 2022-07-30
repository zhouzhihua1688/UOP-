new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        index: -1,
        searchCondition: '',
        experienceCouponList: [],
        tableData: [{
            experienceCouponId: '',
            experienceCouponName: '',
            custNo: '',
            source: '人工发送',
            sourceDetail: '',
        }],
        diaMsg: '',
    },
    computed: {
        experienceCoupon_filter: function () {
            var _this = this;
            return this.experienceCouponList.filter(function (item) {
                return item.experienceCouponId.indexOf(_this.searchCondition) > -1 || item.experienceCouponName.indexOf(_this.searchCondition) > -1;
            });
        }
    },
    mounted: function () {
        var dialogs = ['info', 'send'];
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
        this.getList();
    },
    methods: {
        // 获取红包列表
        getList: function () {
            var _this = this;
            $.post({
                url: '/awardMgmt/experienceGold/sendMgmt/getList.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        _this.experienceCouponList = result.data.rows;
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        addRow: function () {
            this.tableData.push({
                experienceCouponId: '',
                experienceCouponName: '',
                custNo: '',
                source: '人工发送',
                sourceDetail: '',
            });
        },
        deleteRow: function (index) {
            this.tableData.splice(index, 1);
        },
        showSelect: function (index) {
            this.index = index;
            this.searchCondition = '';
            this.showDialog('', 'select');
        },
        select: function (item) {
            this.tableData[this.index].experienceCouponId = item.experienceCouponId;
            this.tableData[this.index].experienceCouponName = item.experienceCouponName;
            this.showDialog('select');
        },
        showSend: function () {
            this.showDialog('', 'send');
        },
        send: function () {
            if (this.tableData.length === 0) {
                this.showDialog('send', 'info', false, '列表长度为0,不存在有效数据');
                return;
            }
            for (var i = 0; i < this.tableData.length; i++) {
                if (!this.tableData[i].experienceCouponId) {
                    this.showDialog('send', 'info', false, '列表未选择体验金券编号');
                    return;
                }
                if (!this.tableData[i].custNo) {
                    this.showDialog('send', 'info', false, '列表未填写客户号');
                    return;
                }
                if (!this.tableData[i].sourceDetail) {
                    this.showDialog('send', 'info', false, '列表未填写来源详情');
                    return;
                }
            }
            var _this = this;
            $.post({
                url: '/awardMgmt/experienceGold/sendMgmt/send.ajax',
                data: {
                    experienceCouponInfo: JSON.stringify(this.tableData)
                },
                success: function (result) {
                    if (result.error === 0) {
                        _this.tableData = [{
                            experienceCouponId: '',
                            experienceCouponName: '',
                            custNo: '',
                            source: '人工发送',
                            sourceDetail: '',
                        }];
                        _this.showDialog('send', 'info', false, result.msg);
                    }
                    else {
                        _this.showDialog('send', 'info', false, result.msg);
                    }
                }
            });
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
        }
    }
});
