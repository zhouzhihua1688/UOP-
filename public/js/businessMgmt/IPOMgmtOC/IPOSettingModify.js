
var vm = new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
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
            navfracnum: '',//基金净值小数位数
            investarea: '',//投资区域
            producttype: '',//产品类型
            fundchinesenm: '',//基金中文全称
            fundrisklevel: '',//基金风险等级
            facevalue: '',//基金面值
            navfracmode: '',//基金净值小数处理方式
            ackbidday: '',//申购确认日期
            melonmd: '',//分红方式
            fundtp: '',//基金类别
            issueprice: '',//发行价格
            tanm: '',//注册登记机构名称
            ackredday: '',//赎回确认日期
            directsellingsign: '',//是否在直销发行    不确定
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


        selectOption: {//选项
            tanoList: [],
            displayfundtpList: [],
            producttypeList: [],
            currencytypeList: [],
            fundrisklevelList: [],
            navfracmodeList: [],
            melonmdList: [],
            fundtpList: [],
        },


        setting: [{//circleList
            accptmd: '',//渠道标志
            fundst: '',//基金状态
            issuedate: '',//发行时间
            dssubenddate: '',//认购结束时间
            biddate: '',//开放时间
        }],
        dataFlag: '',//数据来源

        update_timestamp: '',//数据更新时间

        initialData: {},
        fundid: '',//删除
        modifyS: true,//新增修改状态
        local_id: '',//修改时的本地sql ID

        alwaysClick: true,//阻止连续点击
        operate: '',
    },
    created: function () {
        var _this = this;
        this.getUrlParam('address') == '' ? this.operate = 1 : this.getUrlParam('address') == 'copy' ? this.operate = 1 : this.modifyS = false;
        if (this.getUrlParam('address') == 'copy') {
            this.showInitialData({ service_id: this.getUrlParam('service_id') })
        }
        if (!this.modifyS) {
            var dataFlag = this.dataFlag = this.getUrlParam('address')
            var local_id = this.local_id = this.getUrlParam('local_id')
            var service_id = this.fundid = this.getUrlParam('service_id')
            this.showInitialData({ dataFlag: dataFlag, local_id: local_id, service_id: service_id })
        }
        $.post({//注册登记代码
            url: '/businessMgmt/IPOMgmtOC/IPOSetting/modifyselectOption.ajax',
            data: {
                pmst: 'SYSTEM',
                pmkey: 'TANO'
            },
            success: function (result) {
                if (result.error === 0) {
                    _this.selectOption.tanoList = result.data.map(function (item) {
                        return {
                            pmco: item.pmco,
                            pmnm: item.pmnm
                        }
                    })
                    console.log('注册登记代码', result)
                } else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });
        $.post({//公募基金展示类别
            url: '/businessMgmt/IPOMgmtOC/IPOSetting/modifyselectOption.ajax',
            data: {
                pmst: 'SYSTEM',
                pmkey: 'DISPLAYFUNDTP'
            },
            success: function (result) {
                if (result.error === 0) {
                    _this.selectOption.displayfundtpList = result.data.map(function (item) {
                        return {
                            pmco: item.pmco,
                            pmnm: item.pmnm
                        }
                    })
                    console.log('公募基金展示类别', result)
                } else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });
        $.post({//产品类型
            url: '/businessMgmt/IPOMgmtOC/IPOSetting/modifyselectOption.ajax',
            data: {
                pmst: 'SYSTEM',
                pmkey: 'PRODUCTTYPE'
            },
            success: function (result) {
                if (result.error === 0) {
                    _this.selectOption.producttypeList = result.data.map(function (item) {
                        return {
                            pmco: item.pmco,
                            pmnm: item.pmnm
                        }
                    })
                    console.log('产品类型', result)
                } else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });
        $.post({//货币类型
            url: '/businessMgmt/IPOMgmtOC/IPOSetting/modifyselectOption.ajax',
            data: {
                pmst: 'SYSTEM',
                pmkey: 'CURRENCYTYPE'
            },
            success: function (result) {
                if (result.error === 0) {
                    _this.selectOption.currencytypeList = result.data.map(function (item) {
                        return {
                            pmco: item.pmco,
                            pmnm: item.pmnm
                        }
                    })
                    console.log('货币类型', result)
                } else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });
        $.post({//基金风险等级
            url: '/businessMgmt/IPOMgmtOC/IPOSetting/modifyselectOption.ajax',
            data: {
                pmst: 'SYSTEM',
                pmkey: 'FUNDRISKLEVEL'
            },
            success: function (result) {
                if (result.error === 0) {
                    _this.selectOption.fundrisklevelList = result.data.map(function (item) {
                        return {
                            pmco: item.pmco,
                            pmnm: item.pmnm
                        }
                    })
                    console.log('基金风险等级', result)
                } else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });
        $.post({//基金净值小数处理方式
            url: '/businessMgmt/IPOMgmtOC/IPOSetting/modifyselectOption.ajax',
            data: {
                pmst: 'SYSTEM',
                pmkey: 'NAVFRACMODE'
            },
            success: function (result) {
                if (result.error === 0) {
                    _this.selectOption.navfracmodeList = result.data.map(function (item) {
                        return {
                            pmco: item.pmco,
                            pmnm: item.pmnm
                        }
                    })
                    console.log('基金净值小数处理方式', result)
                } else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });
        $.post({//分红方式
            url: '/businessMgmt/IPOMgmtOC/IPOSetting/modifyselectOption.ajax',
            data: {
                pmst: 'SYSTEM',
                pmkey: 'MELONMD'
            },
            success: function (result) {
                if (result.error === 0) {
                    _this.selectOption.melonmdList = result.data.map(function (item) {
                        return {
                            pmco: item.pmco,
                            pmnm: item.pmnm
                        }
                    })
                    console.log('分红方式', result)
                } else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });
        $.post({//基金类别
            url: '/businessMgmt/IPOMgmtOC/IPOSetting/modifyselectOption.ajax',
            data: {
                pmst: 'SYSTEM',
                pmkey: 'FUNDTP'
            },
            success: function (result) {
                if (result.error === 0) {
                    _this.selectOption.fundtpList = result.data.map(function (item) {
                        return {
                            pmco: item.pmco,
                            pmnm: item.pmnm
                        }
                    })
                    console.log('基金类别', result)
                } else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });



    },
    mounted: function () {

        var dialogs = ['info', 'goBack', ''];
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

        modify: function () {
            var params = this.dataCheck();

            if (params === false) {
                return;
            }

            var _this = this;
            var change = {};
            for (var key in params) {
                if (params[key].constructor === Object) {
                    change[key] = {};
                    for (var objkey in params[key]) {
                        if (params[key][objkey] !== _this.initialData[key][objkey]) {
                            change[key][objkey] = params[key][objkey];
                            if (!change[key]['serialno']) {
                                change[key]['serialno'] = _this.initialData[key]['serialno'];
                            }
                        }
                    }
                } else {
                    change[key] = [];
                    _this.initialData[key].forEach(function (item, ind) {
                        var location = params[key].findIndex(function (initem, index) {
                            if (item['accptmd'] == initem['accptmd']) {
                                return true;
                            }
                        })
                        if (location != -1) {
                            var pushObj = {}
                            for (var paramskey in params[key][location]) {
                                if (params[key][location][paramskey] != item[paramskey]) {
                                    pushObj['accptmd'] = item['accptmd']
                                    pushObj['serialno'] = item['serialno']
                                    pushObj[paramskey] = params[key][location][paramskey]
                                }
                            }
                            if (JSON.stringify(pushObj) != '{}') {
                                change[key].push(pushObj)
                            }
                        } else {
                            item.del = true
                            change[key].push(item)
                        }
                    })
                    params[key].forEach(function (item, ind) {
                        var location = _this.initialData[key].some(function (initem, index) {
                            return item['accptmd'] == initem['accptmd'];
                        })
                        if (location === false) {
                            item.add = true;
                            change[key].push(item)
                        }
                    })

                }
            }

            if (JSON.stringify(change.fundInfo) === '{}' && JSON.stringify(change.fundExtension) === '{}' && change.circleList.length === 0) {
                _this.showDialog('', 'goBack', false, '页面所有值与初始值相同，不会复核');
                return;
            }
            params = {
                modifyData: JSON.stringify(change),
                local_id: this.local_id,
                update_timestamp: this.update_timestamp,
                service_id: this.fundid,
                operate: this.operate
            }

            // params.id = this.local_id
            // params.updateTime = this.updateTime
            console.log(params)
            // return;
            if (this.alwaysClick) {
                this.alwaysClick = false;
                $.post({
                    url: '/businessMgmt/IPOMgmtOC/IPOSetting/modifyModify.ajax',
                    data: params,
                    success: function (result) {
                        _this.alwaysClick = true;
                        if (result.error === 0) {
                            console.log(result)
                            _this.showDialog('', 'goBack', false, result.msg);

                        } else {
                            _this.showDialog('', 'info', true, result.msg);
                        }
                    }
                });
            }

        },

        showInitialData: function (item) {
            var params = {};
            var _this = this;
            if (this.dataFlag == 'local') {
                params = {
                    local_id: item.local_id,
                    service_id: item.service_id
                }
                $.post({
                    url: '/businessMgmt/IPOMgmtOC/IPOSetting/modifyLocalData.ajax',
                    data: params,
                    success: function (result_parent) {
                        if (result_parent.error === 0) {
                            _this.update_timestamp = result_parent.data.update_timestamp;

                            $.post({
                                url: '/businessMgmt/IPOMgmtOC/IPOSetting/modifylineData.ajax',
                                data: { service_id: item.service_id },
                                success: function (result) {
                                    if (result.error === 0) {

                                        if (result.data[1] == null) {//新增
                                            _this.modifyS = true
                                            _this.operate = 1
                                            _this.setModilyData(result_parent.data.content.fundExtension, result_parent.data.content.fundInfo, result_parent.data.content.circleList)
                                        } else {//修改
                                            _this.operate = 2
                                            _this.setModilyData(result.data[1], result.data[0], result.data[2])
                                            if (result_parent.data.content) {
                                                _this.setModilyData(result_parent.data.content.fundExtension, result_parent.data.content.fundInfo, result_parent.data.content.circleList, true)
                                            }
                                        }

                                    } else {
                                        _this.showDialog('', 'info', true, result.msg);
                                    }
                                }
                            });


                        } else {
                            _this.showDialog('', 'info', true, result_parent.msg);
                        }
                    }
                });
            } else {
                $.post({
                    url: '/businessMgmt/IPOMgmtOC/IPOSetting/modifylineData.ajax',
                    data: {
                        service_id: item.service_id
                    },
                    success: function (result) {
                        if (result.error === 0) {
                            console.log(result)
                            if(_this.getUrlParam('address') == 'copy'){
                                _this.operate =1
                            }else{
                                _this.operate = 2
                            }
                            _this.setModilyData(result.data[1], result.data[0], result.data[2])
                        } else {
                            _this.showDialog('', 'info', true, result.msg);
                        }
                    }
                });
            }

        },
        setModilyData: function (fundExtension, fundInfo, circleList, again) {//赋值到弹窗
            var _this = this;
            for (var key in fundExtension) {
                for (var inkey in this.fundExtension) {
                    if (key === inkey) {
                        this.fundExtension[key] = fundExtension[key]
                        break;
                    }
                }

            }
            for (var key in this.fundInfo) {
                for (var inkey in fundInfo) {
                    if (key === inkey) {
                        this.fundInfo[inkey] = fundInfo[inkey]
                        break;
                    }
                }
            }

            if (again) {
                circleList.forEach(function (item, ind) {
                    if (!item.del && !item.add) {
                        var location = _this.setting.findIndex(function (initem, index) {
                            if (item['accptmd'] == initem['accptmd']) {
                                return true;
                            }
                        })
                        if (location != -1) {
                            if (item.fundst != undefined) {
                                Vue.set(_this.setting[location], 'fundst', item.fundst)
                            }
                            if (item.accptmd != undefined) {
                                Vue.set(_this.setting[location], 'accptmd', item.accptmd)
                            }
                            if (item.issuedate && item.issuetime) {
                                Vue.set(_this.setting[location], 'issuedate', moment(item.issuedate + ' ' + item.issuetime).format("YYYY-MM-DD HH:mm:ss"))
                            } else if (item.issuedate != undefined && !item.issuetime) {
                                Vue.set(_this.setting[location], 'issuedate', moment(item.issuedate + ' ' + moment(_this.setting[location].issuedate).format("HH:mm:ss")).format("YYYY-MM-DD HH:mm:ss"))
                            } else if (!item.issuedate && item.issuetime != undefined) {
                                Vue.set(_this.setting[location], 'issuedate', moment(moment(_this.setting[location].issuedate).format("YYYY-MM-DD") + ' ' + item.issuetime).format("YYYY-MM-DD HH:mm:ss"))
                            }

                            if (item.dssubenddate && item.dssubendtime) {
                                Vue.set(_this.setting[location], 'dssubenddate', moment(item.dssubenddate + ' ' + item.dssubendtime).format("YYYY-MM-DD HH:mm:ss"))
                            } else if (item.dssubenddate != undefined && !item.dssubendtime) {
                                Vue.set(_this.setting[location], 'dssubenddate', moment(item.dssubenddate + ' ' + moment(_this.setting[location].dssubenddate).format("HH:mm:ss")).format("YYYY-MM-DD HH:mm:ss"))
                            } else if (!item.dssubenddate && item.dssubendtime != undefined) {
                                Vue.set(_this.setting[location], 'dssubenddate', moment(moment(_this.setting[location].dssubenddate).format("YYYY-MM-DD") + ' ' + item.dssubendtime).format("YYYY-MM-DD HH:mm:ss"))
                            }

                            if (item.biddate && item.bidtime) {
                                Vue.set(_this.setting[location], 'biddate', moment(item.biddate + ' ' + item.bidtime).format("YYYY-MM-DD HH:mm:ss"))
                            } else if (item.biddate != undefined && !item.bidtime) {
                                Vue.set(_this.setting[location], 'biddate', moment(item.biddate + ' ' + moment(_this.setting[location].biddate)).format("HH:mm:ss"))
                            } else if (!item.biddate && item.bidtime != undefined) {
                                Vue.set(_this.setting[location], 'biddate', moment(moment(_this.setting[location].biddate).format("YYYY-MM-DD") + ' ' + item.bidtime).format("YYYY-MM-DD HH:mm:ss"))
                            }
                        }

                    } else if (item.del) {
                        delete item.del
                        delete item.add
                        var location = _this.setting.findIndex(function (initem, index) {
                            if (item['accptmd'] == initem['accptmd']) {
                                _this.setting.splice(index, 1)
                                return true;
                            }
                        })
                    } else if (item.add) {
                        delete item.add
                        delete item.del
                        _this.setting.push(item)
                    }
                })
            } else {
                circleList.forEach(function (item, ind) {
                    Vue.set(_this.setting, ind, {
                        accptmd: item.accptmd,//渠道标志
                        fundst: item.fundst,//基金状态
                        issuedate: moment(item.issuedate + ' ' + item.issuetime).format("YYYY-MM-DD HH:mm:ss"),//发行时间
                        dssubenddate: moment(item.dssubenddate + ' ' + item.dssubendtime).format("YYYY-MM-DD HH:mm:ss"),//认购结束时间
                        biddate: moment(item.biddate + ' ' + item.bidtime).format("YYYY-MM-DD HH:mm:ss"),//开放时间
                    })
                })
            }
            if (!again) {
                this.initialData.fundExtension = JSON.parse(JSON.stringify(fundExtension))
                this.initialData.fundInfo = JSON.parse(JSON.stringify(fundInfo))
                this.initialData.circleList = JSON.parse(JSON.stringify(circleList))
            }
        },
        dataCheck: function () {
            var reg = /[\d]{6}/;
            if (this.fundInfo.fundid.length !== 6 || !reg.test(this.fundInfo.fundid)) {
                this.showDialog('', 'info', true, '基金代码只能为6位数值');
                return false;
            }
            if (!this.fundInfo.fundnm) {
                this.showDialog('', 'info', true, '基金简称不能为空');
                return false;
            }
            if (this.fundInfo.fundnm.length > 20) {
                this.showDialog('', 'info', true, '基金名称不能超过20位');
                return false;
            }

            if (!this.fundExtension.fundchinesenm) {
                this.showDialog('', 'info', true, '基金中文全称不能为空');
                return false;
            }
            if (this.fundExtension.fundchinesenm.length > 30) {
                this.showDialog('', 'info', true, '基金中文全称不能超过30位');
                return false;
            }
            if (!this.fundInfo.tano) {
                this.showDialog('', 'info', true, '注册登记代码不能为空');
                return false;
            }
            if (!this.fundInfo.currencytype) {
                this.showDialog('', 'info', true, '货币类型不能为空');
                return false;
            }
            if (!this.fundExtension.fundtp) {
                this.showDialog('', 'info', true, '基金类别不能为空');
                return false;
            }
            if (!this.fundExtension.displayfundtp) {
                this.showDialog('', 'info', true, '公募基金展示类别不能为空');
                return false;
            }

            for (var i = 0; i < this.setting.length; i++) {
                if (this.setting[i].accptmd == '') {
                    this.showDialog('', 'info', true, '渠道标志不能为空');
                    return false;
                }
                if (this.setting[i].dssubenddate == '') {
                    this.showDialog('', 'info', true, '认购结束时间不能为空');
                    return false;
                }
                if (this.setting[i].issuedate == '') {
                    this.showDialog('', 'info', true, '发行时间不能为空');
                    return false;
                }
                for (var j = i + 1; j < this.setting.length; j++) {
                    if (this.setting[i].accptmd == this.setting[j].accptmd) {
                        this.showDialog('', 'info', true, '渠道标志不能相同');
                        return false;
                    }
                }
            }
            var _this = this;

            var fundExtensionKey = ['minsubamt', 'minbidamt', 'minrspamt', 'minaddsubamt', 'maxsubamt', 'maxbidamt', 'minholdamt', 'rangeamt', 'minredamt', 'minconvamt', 'minaddamt',]
            if (fundExtensionKey.some(function (item) {
                if (_this.fundExtension[item] === '' || _this.fundExtension[item] === null) {
                    _this.showDialog('', 'info', true, '交易限额所有字段都必填');
                    return true;
                }

            })) {
                return false;
            }

            var params = {
                fundInfo: {//fundInfo
                    fundid: this.fundInfo.fundid,//基金代码
                    tano: this.fundInfo.tano,//注册登记代码
                    shareclass: this.fundInfo.shareclass,//基金等级
                    currencytype: this.fundInfo.currencytype,//货币类型

                    fundnm: this.fundInfo.fundnm,//基金简称
                    sharetype: this.fundInfo.sharetype,//收费方式
                },
                fundExtension: {//fundExtension
                    fundid: this.fundInfo.fundid,//基金代码

                    minsubamt: this.fundExtension.minsubamt,//最低认购金额
                    minbidamt: this.fundExtension.minbidamt,//最低申购金额
                    minrspamt: this.fundExtension.minrspamt,//最低定投金额
                    minaddsubamt: this.fundExtension.minaddsubamt,//最低追加认购金额

                    maxsubamt: this.fundExtension.maxsubamt,//最高认购金额
                    maxbidamt: this.fundExtension.maxbidamt,//最高申购金额
                    minholdamt: this.fundExtension.minholdamt,//最低持有份额
                    rangeamt: this.fundExtension.rangeamt,//金额级差

                    minredamt: this.fundExtension.minredamt,//最低赎回份额
                    minconvamt: this.fundExtension.minconvamt,//最低转换份额
                    minaddamt: this.fundExtension.minaddamt,//最低追加申购金额

                    displayfundtp: this.fundExtension.displayfundtp,//公募基金展示类别   fundExtension
                    navfracnum: this.fundExtension.navfracnum,//基金净值小数位数       fundExtension
                    investarea: this.fundExtension.investarea,//投资区域           fundExtension
                    producttype: this.fundExtension.producttype,//产品类型          fundExtension

                    fundchinesenm: this.fundExtension.fundchinesenm,//基金中文全称    fundExtension
                    fundrisklevel: this.fundExtension.fundrisklevel,//基金风险等级        fundExtension
                    facevalue: this.fundExtension.facevalue,//基金面值            fundExtension
                    navfracmode: this.fundExtension.navfracmode,//基金净值小数处理方式      fundExtension
                    ackbidday: this.fundExtension.ackbidday,//申购确认日期            fundExtension
                    melonmd: this.fundExtension.melonmd,//分红方式          fundExtension

                    fundtp: this.fundExtension.fundtp,//基金类别           fundExtension
                    issueprice: this.fundExtension.issueprice,//发行价格       fundExtension
                    tanm: this.fundExtension.tanm,//注册登记机构名称         fundExtension
                    ackredday: this.fundExtension.ackredday,//赎回确认日期        fundExtension
                    directsellingsign: this.fundExtension.directsellingsign,//是否在直销发行          fundExtension
                },


            }
            params.circleList = JSON.parse(JSON.stringify(this.setting))
            params.circleList.forEach(function (item) {
                item.fundid = _this.fundInfo.fundid;//基金代码
                var issue = item.issuedate;
                var dssubend = item.dssubenddate;
                var bid = item.biddate;
                item.issuetime = moment(issue).format("HHmmss")//发行时间
                item.issuedate = moment(issue).format("YYYYMMDD")//发行日期
                item.dssubenddate = moment(dssubend).format("YYYYMMDD")//认购结束日期
                item.dssubendtime = moment(dssubend).format("HHmmss")//认购结束时间
                item.biddate = moment(bid).format("YYYYMMDD")//开放日期
                item.bidtime = moment(bid).format("HHmmss")//开放时间

            })
            return params;
        },
        add: function () {
            if (this.alwaysClick) {
                this.alwaysClick = false;
                var params = this.dataCheck();
                if (params === false) {
                    this.alwaysClick = true;
                    return;
                }

                var _this = this;
                params.circleList = JSON.stringify(params.circleList)
                params.fundExtension = JSON.stringify(params.fundExtension)
                params.fundInfo = JSON.stringify(params.fundInfo)
                params.operate = this.operate
                params.local_id = this.local_id
                params.update_timestamp = this.update_timestamp
                $.post({
                    url: '/businessMgmt/IPOMgmtOC/IPOSetting/modifyAdd.ajax',
                    data: params,
                    success: function (result) {
                        _this.alwaysClick = true;
                        if (result.error === 0) {
                            console.log(result)
                            _this.showDialog('', 'goBack', false, result.msg);
                        } else {
                            _this.showDialog('', 'info', true, result.msg);
                        }
                    }
                });
            }
        },
        goBack: function () {
            window.history.back()
        },
        getUrlParam: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg); //匹配目标参数
            if (r != null) return unescape(r[2]);
            return ''; //返回参数值
        },

    },
    components: {
        'date-picker': VueBootstrapDatetimePicker,
        'vueSelect': vueSelect
    }
});


