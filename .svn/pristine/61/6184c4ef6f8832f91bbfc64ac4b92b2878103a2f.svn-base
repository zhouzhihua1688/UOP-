new Vue({
    el: '#content',
    data: {
        apkind: '',
        spPartner: '',
        partnerAccoNo: '',
        fundId: '',
        subQuty: '',
        workDate: '',
        transactionId: '',
        seqNo: '',
        //状态
        status: "",
        // 合作方渠道号
        tradeBranchcodes: [],
        //业务代码
        tradeApkinds: [],

        tableData: [],
        diaMsg: "",
        //   表格分页
        currentIndex: 0,
        pageMaxNum: '20',
        condition: "",
    },
    computed: {
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
            let currentIndex = parseInt(this.currentIndex);
            return this.middleData[currentIndex];
        },
    },
    watch: {
        pageMaxNum: {
            handler: function (val, oldval) {
                this.currentIndex = 0;
            }
        },
        condition: {
            handler: function (val, oldval) {
                this.currentIndex = 0;
            }
        }
    },
    mounted: function () {
        var _this = this;
        var dialogs = ['', '', '', 'info'];
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

        //初始化数据
        $.get({
            url: '/thirdPartyOperation/channelMaintain/partnerTradeAssist/search.ajax',
            success: function (result) {
                console.log(result);
                if (result.error == 0) {

                    _this.tableData = result.data;

                } else {
                    _this.showDialog('', 'info', false, '数据获取失败');
                }
            },
            error: function () {
                _this.showDialog('', 'info', false, '数据获取失败');
            }
        });

        $('.date-picker').datepicker({
            autoclose: true,
            todayHighlight: true,
            format: 'yyyymmdd',
            language: 'cn'
        })
        //show datepicker when clicking on the icon
            .next().on(ace.click_event, function () {
            $(this).prev().focus();
        });
    },
    methods: {
        //获取当前时间
        getNowDate: function () {
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            if (month < 10) {
                month = "0" + month;
            }
            if (day < 10) {
                day = "0" + day;
            }
            year = year.toString();
            month = month.toString();
            day = day.toString();
            var newDate = year + month + day;
            return newDate;
        },
        //查询接口
        search: function () {
            var _this = this;
            var params = {};
            console.log(params);
            $.get({
                url: '/thirdPartyOperation/channelMaintain/partnerTradeAssist/search.ajax',
                data: params,
                success: function (result) {
                    console.log(result);
                    if (result.error == 0) {

                        _this.tableData = result.data;
                    } else {
                        _this.showDialog('', 'info', false, '数据获取失败');
                    }
                },
                error: function () {
                    _this.showDialog('', 'info', false, '数据获取失败');
                }
            });
        },

        //获取合作方渠道和业务类型
        getTradeInfos: function () {
            var _this = this;
            var params = {};
            console.log(params);
            $.get({
                url: '/thirdPartyOperation/channelMaintain/partnerTradeAssist/tradeinfos.ajax',
                data: params,
                success: function (result) {
                    console.log(result);
                    if (result.error == 0) {

                        _this.tradeBranchcodes = result.data.tradeBranchcodes;
                        _this.tradeApkinds = result.data.tradeApkinds;

                        _this.spPartner = _this.tradeBranchcodes[0];
                        _this.apkind = _this.tradeApkinds[0];

                        console.log("result;", result.data);
                    } else {
                        _this.showDialog('', 'info', false, '数据获取失败');
                    }
                },
                error: function () {
                    _this.showDialog('', 'info', false, '数据获取失败');
                }
            });
        },

        //下单 提示框
        showAdd: function () {
            var _this = this;
            //查询渠道、业务
            _this.getTradeInfos();

            _this.workDate = _this.getNowDate();

            this.showDialog('', 'showAddPage');
        },
        // 提示框
        showAddInfo: function () {
            var _this = this;
            //校验
            if (!_this.validAdd().form()) return;
            this.showDialog('', 'showAddinfoPage');
        },

        //下单
        add: function () {
            var _this = this;
            //校验
            if (!_this.validAdd().form()) return;
            var partnerTradeReq = {
                spPartner: _this.spPartner,
                apkind: _this.apkind,
                partnerAccoNo: _this.partnerAccoNo,
                fundId: _this.fundId,
                subQuty: _this.subQuty,
                workDate: _this.workDate,
            };
            var params = {};
            params.partnerTradeReq = partnerTradeReq;
            console.log("add param :", params);
            $.post({
                url: '/thirdPartyOperation/channelMaintain/partnerTradeAssist/redeem.ajax',
                data: params,
                success: function (result) {
                    console.log(params);
                    console.log(result);
                    if (result.error == 0) {
                        _this.showDialog('showAdd', '');
                        if (result.error == 0) {
                            _this.showDialog('', 'info', false, '下单成功！');
                            // _this.search();
                            //延时刷新
                            setTimeout(function () {
                                window.location.reload();
                            },650);
                        } else {
                            _this.showDialog('showAddPage', 'info', false, result.msg);
                        }
                    } else {
                        _this.showDialog('showAddPage', 'info', false, result.msg);
                    }
                },
                error: function () {
                    _this.showDialog('', 'info', false, '数据获取失败');
                }
            });

        },
        validAdd: function () {
            //绑定验证器
            return $("#addForm").validate({
                //样式为红色
                errorClass:"red",

                rules: {
                    spPartner: {
                        required: true,
                    },
                    apkind: {
                        required: true,
                    },
                    partnerAccoNo: {
                        required: true,
                    },
                    fundId: {
                        required: true,
                    },
                    subQuty: {
                        required: true,
                    },
                    workDate: {
                        required: true,
                    },
                },
                messages: {
                    spPartner: {
                        required: "*",
                    },
                    apkind: {
                        required: "*",
                    },
                    partnerAccoNo: {
                        required: "*",
                    },
                    fundId: {
                        required: "*",
                    },
                    subQuty: {
                        required: "*",
                    },
                    workDate: {
                        required: "*",
                    },

                },
                submitHandler: function () {
                    return false;
                },
            });
        },
        //撤单框
        showCancel: function (seqNo) {
            var _this = this;
            _this.seqNo = seqNo;
            this.showDialog('', 'showCancel');
        },

        //查询
        cancel: function () {
            var _this = this;
            var params = {};
            params.seqNo = _this.seqNo;
            params.operator = "";
            console.log(params);
            $.get({
                url: '/thirdPartyOperation/channelMaintain/partnerTradeAssist/cancel.ajax',
                data: params,
                success: function (result) {
                    console.log(params);
                    console.log(result);
                    if (result.error == 0) {
                        _this.showDialog('', 'pub', false, '撤单成功！');
                        // _this.search();
                        //延时刷新
                        setTimeout(function () {
                            window.location.reload();
                        },500);
                    }
                    else {
                        _this.showDialog('', 'pub', false, result.msg);
                        setTimeout(function () {
                            window.location.reload();
                        },1500);
                    }
                },
                error: function () {
                    _this.showDialog('', 'info', false, '数据获取失败');
                }
            });
        },


        // 主表格分页方法
        prev: function () {
            this.currentIndex <= 0 ? 0 : this.currentIndex--;
        },
        next: function () {
            this.currentIndex >= this.middleData.length - 1 ? this.middleData.length - 1 : this.currentIndex++;
        },
        changeIndex: function (index) {
            this.currentIndex = index - 1;
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
        time: function (obj) {
            if (obj) {
                var date = new Date(obj);
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                var d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                var h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                var minute = date.getMinutes();
                var second = date.getSeconds();
                minute = minute < 10 ? ('0' + minute) : minute;
                second = second < 10 ? ('0' + second) : second;
                return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
            }
        },
        // 下单状态
        statusConverter: function (item) {
            if (item) {
                item = item.toUpperCase();
                if (item === "S") {
                    return "已下单"
                } else if (item === "F") {
                    return "下单失败"
                } else if (item === "C") {
                    return "已撤单"
                } else if (item === "E") {
                    return "撤单失败"
                } else if (item === "R") {
                    return "处理中"
                } else {
                    return item
                }
            }
        },
        // 撤单状态
        cancelstatus: function (item) {
            if (item) {
                item = item.toUpperCase();
                if (item === "C") {
                    return "撤单成功"
                } else if (item === "E") {
                    return "撤单失败"
                } else {
                    return item
                }
            }
        },
    },
});
