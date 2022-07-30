
new Vue({
    el: '#content',
    data: {
        diaMsg: '',

        fundInfo: {
            fundid: '',//基金代码
            tano: '',//注册登记代码
            shareclass: '',//基金等级

            currencytype: '',//货币类型

            fundnm: '',//基金简称
            sharetype: '',//收费方式
        },
        fundExtension: {
            displayfundtp: '',//公募基金展示类别
            investarea: '',//投资区域
            deliverydays: '',//资金交收日期
            transferdays: '',//资金到账日期
            fundchinesenm: '',//基金中文全称
            producttype: '',//产品类型
            fundrisklevel: '',//基金风险等级
            navfracmode: '',//基金净值小数处理方式
            ackbidday: '',//申购确认日期
            melonmd: '',//分红方式
            fundtp: '',//基金类别
            issueprice: '',//发行价格
            tanm: '',//注册登记机构名称
            ackredday: '',//赎回确认日期
            directsellingsign: '',//是否在直销发行    不确定
            facevalue: '',//基金面值
            navfracnum: '',//基金净值小数位数

            minsubamt: '',//最低认购金额
            minbidamt: '',//最低申购金额
            minrspamt: '',//最低定投金额
            minaddsubamt: '',//最低追加认购金额

            maxsubamt: '',//最高认购金额
            maxbidamt: '',//最高申购金额
            minholdamt: '',//最低持有份额
            rangeamt: '',//金额级差

            minredamt: '',//最低赎回份额
            minconvamt: '',//最低转换份额
            minaddamt: '',//最低追加申购金额
        },
        circleList: [{
            accptmd: '',//渠道标志
            fundst: '',//基金状态
            issuedate: '',//发行时间
            dssubenddate: '',//认购结束时间
            biddate: '',//开放时间
        }],
        selectOption: {//选项
            investtypeList: [],

            investareaList: [
                {
                    pmco: '1',
                    pmnm: '境内'
                },
                {
                    pmco: '2',
                    pmnm: '境外'
                },
                {
                    pmco: '3',
                    pmnm: '境内和境外'
                }
            ],
            sharetypeList: [
                {
                    pmco: 'A',
                    pmnm: '前收费'
                },
                {
                    pmco: 'B',
                    pmnm: '后收费'
                },
                {
                    pmco: '*',
                    pmnm: '前后端收费都支持'
                }
            ],
            directsellingsignList: [
                {
                    pmco: 'Y',
                    pmnm: '是'
                },
                {
                    pmco: 'N',
                    pmnm: '否'
                }
            ],
            accptmdList: [
                {
                    pmco: '0',
                    pmnm: '柜台'
                },
                {
                    pmco: '2',
                    pmnm: '网上'
                },
                {
                    pmco: '7',
                    pmnm: '企业版'
                },
                {
                    pmco: '6',
                    pmnm: '第三方'
                }
            ],
            fundstList: [
                {
                    pmco: '0',
                    pmnm: '正常'
                },
                {
                    pmco: 'Z',
                    pmnm: '清盘'
                }
            ],
            tanoList: [],
            displayfundtpList: [],
            producttypeList: [],
            currencytypeList: [],
            fundrisklevelList: [],
            navfracmodeList: [],
            melonmdList: [],
            fundtpList: [],
            lineFundIdList: [],//线上基金名称查询
            localFundIdList: [],//本地基金名称查询
        },
        num: 0
    },
    watch: {
        num: function (newval) {
            if (newval === 9) {
                var _this = this;
                $.post({
                    url: '/businessMgmt/IPOMgmt0C/IPOSetting/detailGetData.ajax',
                    data: {
                        // type: this.getUrlParam('type'),
                        local_id: this.getUrlParam('local_id'),
                        service_id: this.getUrlParam('service_id')
                    },
                    success: function (result) {
                        if (result.error === 0) {
                            if (_this.getUrlParam('operate') == 1) {
                                if (result.data[0].content) {
                                    _this.showObjData(result.data[0].content.fundExtension, 'fundExtension')
                                    _this.showObjData(result.data[0].content.fundInfo, 'fundInfo')
                                    _this.showArrData(result.data[0].content.circleList, 'circleList')
                                } else {
                                    _this.showObjData(result.data[1].fundExtension, 'fundExtension')
                                    _this.showObjData(result.data[1].fundInfo, 'fundInfo')
                                    _this.showArrData(result.data[1].circleList, 'circleList')
                                }
                            } else {
                                _this.showObjData(result.data[1].fundExtension, 'fundExtension')
                                _this.showObjData(result.data[1].fundInfo, 'fundInfo')
                                _this.showArrData(result.data[1].circleList, 'circleList')

                                if (result.data[0].content) {
                                    _this.contrast(result.data[0].content.fundExtension, 'fundExtension')
                                    _this.contrast(result.data[0].content.fundInfo, 'fundInfo')
                                    _this.contrastList(result.data[0].content.circleList, 'circleList')
                                }
                            }
                        } else {
                            _this.showDialog('', 'info', false, result.msg);
                        }
                    }
                });
            }
        }
    },
    created: function () {
        var _this = this;

        $.post({//注册登记代码
            url: '/businessMgmt/IPOMgmt0C/IPOSetting/detailSelectOption.ajax',
            data: {
                pmst: 'SYSTEM',
                pmkey: 'TANO'
            },
            success: function (result) {
                _this.num++
                if (result.error === 0) {
                    _this.selectOption.tanoList = result.data.map(function (item) {
                        return {
                            pmco: item.pmco,
                            pmnm: item.pmnm
                        }
                    })
                } else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });
        $.post({//公募基金展示类别
            url: '/businessMgmt/IPOMgmt0C/IPOSetting/detailSelectOption.ajax',
            data: {
                pmst: 'SYSTEM',
                pmkey: 'DISPLAYFUNDTP'
            },
            success: function (result) {
                _this.num++
                if (result.error === 0) {
                    _this.selectOption.displayfundtpList = result.data.map(function (item) {
                        return {
                            pmco: item.pmco,
                            pmnm: item.pmnm
                        }
                    })

                } else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });
        $.post({//产品类型
            url: '/businessMgmt/IPOMgmt0C/IPOSetting/detailSelectOption.ajax',
            data: {
                pmst: 'SYSTEM',
                pmkey: 'PRODUCTTYPE'
            },
            success: function (result) {
                _this.num++
                if (result.error === 0) {
                    _this.selectOption.producttypeList = result.data.map(function (item) {
                        return {
                            pmco: item.pmco,
                            pmnm: item.pmnm
                        }
                    })

                } else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });
        $.post({//货币类型
            url: '/businessMgmt/IPOMgmt0C/IPOSetting/detailSelectOption.ajax',
            data: {
                pmst: 'SYSTEM',
                pmkey: 'CURRENCYTYPE'
            },
            success: function (result) {
                _this.num++
                if (result.error === 0) {
                    _this.selectOption.currencytypeList = result.data.map(function (item) {
                        return {
                            pmco: item.pmco,
                            pmnm: item.pmnm
                        }
                    })

                } else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });
        $.post({//基金风险等级
            url: '/businessMgmt/IPOMgmt0C/IPOSetting/detailSelectOption.ajax',
            data: {
                pmst: 'SYSTEM',
                pmkey: 'FUNDRISKLEVEL'
            },
            success: function (result) {
                _this.num++
                if (result.error === 0) {
                    _this.selectOption.fundrisklevelList = result.data.map(function (item) {
                        return {
                            pmco: item.pmco,
                            pmnm: item.pmnm
                        }
                    })

                } else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });
        $.post({//基金净值小数处理方式
            url: '/businessMgmt/IPOMgmt0C/IPOSetting/detailSelectOption.ajax',
            data: {
                pmst: 'SYSTEM',
                pmkey: 'NAVFRACMODE'
            },
            success: function (result) {
                _this.num++
                if (result.error === 0) {
                    _this.selectOption.navfracmodeList = result.data.map(function (item) {
                        return {
                            pmco: item.pmco,
                            pmnm: item.pmnm
                        }
                    })

                } else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });
        $.post({//分红方式
            url: '/businessMgmt/IPOMgmt0C/IPOSetting/detailSelectOption.ajax',
            data: {
                pmst: 'SYSTEM',
                pmkey: 'MELONMD'
            },
            success: function (result) {
                _this.num++
                if (result.error === 0) {
                    _this.selectOption.melonmdList = result.data.map(function (item) {
                        return {
                            pmco: item.pmco,
                            pmnm: item.pmnm
                        }
                    })

                } else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });
        $.post({//基金类别
            url: '/businessMgmt/IPOMgmt0C/IPOSetting/detailSelectOption.ajax',
            data: {
                pmst: 'SYSTEM',
                pmkey: 'FUNDTP'
            },
            success: function (result) {
                _this.num++
                if (result.error === 0) {
                    _this.selectOption.fundtpList = result.data.map(function (item) {
                        return {
                            pmco: item.pmco,
                            pmnm: item.pmnm
                        }
                    })

                } else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });
        $.post({//产品类型
            url: '/businessMgmt/IPOMgmt0C/IPOSetting/detailSelectOption.ajax',
            data: {
                pmst: 'SYSTEM',
                pmkey: 'INVESTTYPE'
            },
            success: function (result) {
                _this.num++
                if (result.error === 0) {
                    _this.selectOption.investtypeList = result.data.map(function (item) {
                        return {
                            pmco: item.pmco,
                            pmnm: item.pmnm
                        }
                    })

                } else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });



    },
    mounted: function () {
        var dialogs = ['info', '', ''];
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
        goback: function () {
            window.history.back()
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
        contrast: function (item, key) {
            if (JSON.stringify(item) === '{}' || JSON.stringify(item) === 'null') {
                return;
            }
            for (var value in item) {
                if (this[key][value] !== undefined) {
                    if (item[value] == '') {
                        this[key][value] += '<span class="modify">该值被清空</span>'
                    } else {
                        this[key][value] += '<span class="modify">' + this.case(value, item[value]) + '</span>'
                    }
                }
            }
        },
        case: function (key, value) {
            var str = value;
            if (Array.isArray(this.selectOption[key + 'List'])) {
                this.selectOption[key + 'List'].some(function (item) {
                    if (item.pmco == value) {
                        str = item.pmnm
                        return true;
                    }
                })
            }
            return str;
        },
        contrastList: function (item, key) {
            var _this = this;
            if (Array.isArray(item) && item.length > 0) {

                item.forEach(function (obj, ind) {
                    if (JSON.stringify(obj) != '{}') {
                        if (obj.accptmd == '0') {
                            obj.accptmd = '柜台'
                        } else if (obj.accptmd == '2') {
                            obj.accptmd = '网上'
                        } else if (obj.accptmd == '7') {
                            obj.accptmd = '企业版'
                        } else if (obj.accptmd == '6') {
                            obj.accptmd = '第三方'
                        }
                        if (obj.fundst == '0') {
                            obj.fundst = '正常'
                        } else if (obj.fundst == 'Z') {
                            obj.fundst = '清盘'
                        }
                        if (!obj.del && !obj.add) {
                            var location = _this[key].findIndex(function (initem, index) {
                                if (obj['accptmd'] == initem['accptmd']) {
                                    return true;
                                }
                            })
                            if (location != -1) {
                                for (var objKey in obj) {
                                    if (_this[key][location][objKey] != obj[objKey]) {
                                        _this[key][location][objKey] += '<span class="modify">' + _this.case(objKey, obj[objKey]) + '</span>'

                                    }
                                }
                            }

                        } else if (obj.del) {
                            var location1 = _this[key].findIndex(function (initem, index) {
                                if (obj['accptmd'] == initem['accptmd']) {
                                    return true;
                                }
                            })
                            for (var objKey in obj) {
                                _this[key][location1][objKey] = '<span class="del">' + _this.case(objKey, _this[key][location1][objKey]) + '</span>'
                            }
                        } else if (obj.add) {
                            for (var objKey in obj) {
                                obj[objKey] = '<span class="add">' + _this.case(objKey, obj[objKey]) + '</span>'
                            }
                            _this[key].push(obj)
                        }

                    }
                })


            }
        },
        showObjData: function (item, key) {
            if (JSON.stringify(item) == '{}' || JSON.stringify(item) == 'null') {
                return;
            }
            for (var value in this[key]) {
                if (item[value] !== undefined) {
                    this[key][value] = this.case(value, item[value])
                }
            }

        },
        showArrData: function (item, key) {
            var _this = this;
            if (Array.isArray(item) && item.length > 0) {
                item.forEach(function (obj, ind) {
                    if (JSON.stringify(obj) != '{}') {
                        if (obj.accptmd == '0') {
                            obj.accptmd = '柜台'
                        } else if (obj.accptmd == '2') {
                            obj.accptmd = '网上'
                        } else if (obj.accptmd == '7') {
                            obj.accptmd = '企业版'
                        } else if (obj.accptmd == '6') {
                            obj.accptmd = '第三方'
                        }
                        if (obj.fundst == '0') {
                            obj.fundst = '正常'
                        } else if (obj.fundst == 'Z') {
                            obj.fundst = '清盘'
                        }
                        _this[key][ind] = obj
                    }
                })
            }
        },
        goBack: function () {
            window.history.back()
        }
    }
});
