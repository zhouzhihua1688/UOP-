Vue.directive('time', { //自定义指令
    inserted: function () {
        $('.date-timepicker').datetimepicker({
            format: 'YYYY-MM-DD HH:mm:ss', //use this option to display seconds
            icons: {
                time: 'fa fa-clock-o',
                date: 'fa fa-calendar',
                up: 'fa fa-chevron-up',
                down: 'fa fa-chevron-down',
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-arrows ',
                clear: 'fa fa-trash',
                close: 'fa fa-times'
            }
        }).next().on(ace.click_event, function () {
            $(this).prev().focus();
        });
    }
})



var vm = new Vue({
    el: '#content',
    data: {
        sendData: {},
        userName: '', //管理员
        diaMsg: "", //info弹窗

        activeAll: [], //所有活动
        moduleAll: [], //所有模型
        cutAll: '', //所有切点
        componentAll: '', //所有组件
        LargeDataAll: [], //关联推送数据源配置
        awardDataAll: [], //直接发奖配置
        infoDataAll: [], //活动短信配置
        shareDataAll: [], //活动分享配置
        safetyClassAll: [], //所有安全等级
        userGroupList: [], //分组配置
        seatNoList: [], //渠道发奖配置
        eventList: [], //事件类型


        actId: '', //活动id
        moduleId: '', //模型id
        cutId: '', //切点id
        cutKey: '', //切点key
        cutIndex: '', //切点数组下标
        // componentKey: '', //组件Key
        // componentId: '', //组件Id
        componentIndex: '', //组件数组下标


        componentTab: ['组件执行成功文案配置', '关联推送数据源', '直接发奖配置', '活动短信配置', '活动分享配置'], //tab页
        rule: {
            ruleStatic2: false, //弹窗2状态
            ruleStatic3: false, //弹窗3状态
            hint: false, //提示弹窗
        },
        setRulePublic: { //组件规则公共部分
            // ruleComplexSalienc: '', //规则优先级
            notMatchMsgSalience: '', //提示优先级
            ruleNotMatchReturnMsg: '', //提示信息
        },
        ruleLog: {
            rule1: {
                notMatchMsgSalience: '', //提示优先级
                ruleNotMatchReturnMsg: '', //提示信息
                ruleId: 1,
                securityLevel: '' //安全等级
            },
            rule2: {
                notMatchMsgSalience: '', //提示优先级
                ruleNotMatchReturnMsg: '', //提示信息
                monthOfDay: '*', //日
                weekOfDay: '*', //周
                month: '*', //月
                ruleId: 2,
                year: '*', //年
                intervalTimeFrom: '', //开始时间
                intervalTimeTo: '', //结束时间
                dateFormatStr: 'yyyyMMddHHmmss', //日期格式
            },
            rule3: { //用户分组规则
                notMatchMsgSalience: '', //提示优先级
                ruleNotMatchReturnMsg: '', //提示信息
                ruleId: 3,
                groupId: '', //分组配置
                inGroupFlag: '' //是否在分组
            },
            rule4: { //参与次数规则
                notMatchMsgSalience: '', //提示优先级
                ruleNotMatchReturnMsg: '', //提示信息
                dayType: '1', //参与类型
                ruleId: 4,
                chancesOfDay: '', //每天参与次数
                chancesOfTotal: '', //每天参与次数
                actTotalChangesOfPerDay: '', //每天总共参与次数
                actTotalChangeOfAll: '', //总共次数
                actPerTotalOfPerWeek: '', //每人每周参与次数
                actPerTotalOfPerMonth: '', //每人每月参与次数
                actTotalChangeOfPerWeek: '', //每周总共参与次数
            },
            rule5: { //发奖次数规则
                notMatchMsgSalience: '', //提示优先级
                ruleNotMatchReturnMsg: '', //提示信息
                totalRewardCount: '', //总奖励次数
                ruleId: 5,
                dayRewardCount: '', //每天奖励次数
            },
            rule6: { //用户资产规则
                notMatchMsgSalience: '', //提示优先级
                ruleNotMatchReturnMsg: '', //提示信息
                ruleId: 6,
                assetRange: '' //资产配置
            },
            rule7: { //签到天数规则
                notMatchMsgSalience: '', //提示优先级
                ruleNotMatchReturnMsg: '', //提示信息
                checkInType: '1', //签到类型
                checkInPeriod: 'W', //签到周期
                ruleId: 7,
                // awardPkgId: '', //签到奖励
                totalDays: '', //签到天数
            },
            rule8: { //大数据清算规则
                notMatchMsgSalience: '', //提示优先级
                ruleNotMatchReturnMsg: '', //提示信息
                ruleId: 8,
                conditionExpr: '', //条件表达式
                formulaExpression: '', //计算公式
            },
            rule10: { //渠道发奖规则
                notMatchMsgSalience: '', //提示优先级
                ruleNotMatchReturnMsg: '', //提示信息
                ruleId: 10,
                seatNo: '', //渠道发奖配置
            },
            rule11: { //日期类型规则
                notMatchMsgSalience: '', //提示优先级
                ruleNotMatchReturnMsg: '', //提示信息
                ruleId: 11,
                dateType: '', //日期类型
            },
            rule12: { //异步注册消息来源规则
                notMatchMsgSalience: '', //提示优先级
                ruleNotMatchReturnMsg: '', //提示信息
                ruleId: 12,
                registerSource: '', //异步注册消息来源
            },
            rule13: { //事件编码规则
                notMatchMsgSalience: '', //提示优先级
                ruleNotMatchReturnMsg: '', //提示信息
                ruleId: 13,
                eventType: '', //事件类型
                apKind: '', //业务编码
                subApKind: '', //子业务编码
            },
            rule14: { //事件编码规则
                notMatchMsgSalience: '', //提示优先级
                ruleNotMatchReturnMsg: '', //提示信息
                ruleId: 14,
                checkTakePart: false
            },
            rule15: { //MGM发奖次数规则
                notMatchMsgSalience: '', //提示优先级
                ruleNotMatchReturnMsg: '', //提示信息
                totalRewardCount: '', //总奖励次数
                ruleId: 15,
                dayRewardCount: '', //每天奖励次数
                timePeriod:'',   //发奖周期
                timePeriodRewardCount:''  //周期发奖次数
            },
            rule16: { //MGM发奖次数规则
                notMatchMsgSalience: '', //提示优先级
                ruleNotMatchReturnMsg: '', //提示信息
                everydayOfTotal: '', //每天每人每个对象关注次数
                ruleId: 16,
                followOfTotal: '', //每人每个对象总关注次数
                dayOfTotal: '', //每天每人整个活动关注总次数
                actOfTotal: '', //活动每人总关注次数
            },
            rule17: { //助力次数规则
                notMatchMsgSalience: '', //提示优先级
                ruleNotMatchReturnMsg: '', //提示信息
                chancesOfTotal: '', //助力总次数
                ruleId: 17
            },
            rule18: { //用户是否绑卡规则
                notMatchMsgSalience: '', //提示优先级
                ruleNotMatchReturnMsg: '', //提示信息
                bindCardFlag: '0', //是否绑过卡
                ruleId: 18
            },
            rule19: { //增加参与次数规则
                notMatchMsgSalience: '', //提示优先级
                ruleNotMatchReturnMsg: '', //提示信息
                takePartChancesTotalOfDay: '', 
                takePartChancesTotal: '', 
                ruleId: 19
            },
            rule20: { //验证邀请次数规则
                notMatchMsgSalience: '', //提示优先级
                ruleNotMatchReturnMsg: '', //提示信息
                mgmCountToal: '', //达标成功邀请次数
                ruleId: 20
            }
        },
        redShow: false, //规则权重 必填提示信息

        sessionRuleId: '', //待添加ruleId
        sessionJoinInd: '', //数据位置


        ruleType: { //设置规则类型
            ruleUseType: '1', //规则类型
            allowInFlag: '1', //能否参与
            awardPkgId: '', //奖励包id
            bonusAmt: '', //红包金额
            pointProductId: '', //商品ID
            pointsCount: '', //积分数量
            ruleComplexSalience: '', //规则权重
        },
        id: '', //根据id判断修改还是新增

        baseData: '', //修改时使用
        baseDataStatus: true, //修改时使用

        MsgLog: '', //提示弹窗


    },
    created: function () {
        var _this = this;
        $.post({ //活动接口
            url: '/marketingActive/activeRun/activeSetting/addActiveAll.ajax',
            success: function (result) {
                if (result.error === 0) {
                    _this.activeAll = result.data;
                    _this.userName = result.userName;
                } else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });

        $.post({ //模型接口
            url: '/marketingActive/activeRun/activeSetting/addModuleAll.ajax',
            success: function (result) {
                if (result.error === 0) {
                    _this.moduleAll = result.data;
                } else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });

        $.post({ //关联推送数据源配置
            url: '/marketingActive/activeRun/activeSetting/addComponentLargeData.ajax',
            success: function (result) {
                if (result.error === 0) {
                    _this.LargeDataAll = result.data;
                } else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });

        $.post({ //活动短信配置
            url: '/marketingActive/activeRun/activeSetting/addInfoData.ajax',
            success: function (result) {
                if (result.error === 0) {
                    _this.infoDataAll = result.data;
                } else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });

        $.post({ //活动分享配置
            url: '/marketingActive/activeRun/activeSetting/addShareData.ajax',
            success: function (result) {
                if (result.error === 0) {
                    _this.shareDataAll = result.data;
                } else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });
        $.post({ //eventList
            url: '/marketingActive/activeRun/activeSetting/addEventData.ajax',
            success: function (result) {
                if (result.error === 0) {
                    _this.eventList = result.data;
                } else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });


        $.post({ //所有安全等级
            url: '/marketingActive/activeRun/activeSetting/addSecureData.ajax',
            success: function (result) {
                if (result.error === 0) {
                    _this.safetyClassAll = result.data
                    console.log(result.data)
                } else {
                    _this.showDialog('', 'info', false, '获取安全等级数据失败');
                }
            }
        });
        $.post({ //所有活动投放渠道
            url: '/marketingActive/activeRun/activeSetting/addRoad.ajax',
            success: function (result) {
                if (result.error === 0) {
                    _this.seatNoList = result.data.rows
                    console.log('所有活动投放渠道', result.data.rows)
                } else {
                    _this.showDialog('', 'info', false, '获取安全等级数据失败');
                }
            }
        });



    },
    mounted: function () {
        var dialogs = ['', '', ''];
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
        if (this.getUrlParam('actId') != '') {
            this.actId = this.getUrlParam('actId')
            this.getChangeData(this.actId)
        } //else {
        //     this.changeNum = false
        // }
    },
    computed: {
        check: function () { //选中
            return function (list, key) {
                if (list.indexOf(key + '') == -1) {
                    return false
                } else {
                    return true
                }
            }
        },
        site: function () {
            var _this = this;
            return function (cmpId) {
                var num;
                _this.sendData.activityBaseComponentsList.forEach(function (item, ind) {
                    if (item.componentId == cmpId && _this.cutId == item.belongCutinPointId) {
                        return num = ind
                    }
                })
                return num;
            }
        },
        ruleSelectName: function () {
            var _this = this;
            return function (item) {
                var arr = [];
                item.ruleIndexList.forEach(function (num, key) {
                    for (var key in _this.ruleLog) {
                        if (num == _this.ruleLog[key].id) {
                            if (_this.ruleLog[key].ruleId == '1') {
                                arr.push('安全等级规则')
                            } else if (_this.ruleLog[key].ruleId == '2') {
                                arr.push('活动参与周期规则')
                            } else if (_this.ruleLog[key].ruleId == '3') {
                                arr.push('用户分组规则')
                            } else if (_this.ruleLog[key].ruleId == '4') {
                                arr.push('活动参与次数规则')
                            } else if (_this.ruleLog[key].ruleId == '5') {
                                arr.push('发奖次数规则')
                            } else if (_this.ruleLog[key].ruleId == '6') {
                                arr.push('用户资产规则')
                            } else if (_this.ruleLog[key].ruleId == '7') {
                                arr.push('签到天数规则')
                            } else if (_this.ruleLog[key].ruleId == '8') {
                                arr.push('大数据清算规则')
                            } else if (_this.ruleLog[key].ruleId == '10') {
                                arr.push('渠道发奖规则')
                            } else if (_this.ruleLog[key].ruleId == '11') {
                                arr.push('日期类型规则')
                            } else if (_this.ruleLog[key].ruleId == '12') {
                                arr.push('异步注册消息来源规则')
                            } else if (_this.ruleLog[key].ruleId == '13') {
                                arr.push('事件编码规则')
                            } else if (_this.ruleLog[key].ruleId == '14') {
                                arr.push('是否验证参与规则')
                            } else if (_this.ruleLog[key].ruleId == '15') {
                                arr.push('MGM发奖次数规则')
                            } else if (_this.ruleLog[key].ruleId == '16') {
                                arr.push('活动对象关注次数规则')
                            } else if (_this.ruleLog[key].ruleId == '17') {
                                arr.push('助力次数规则')
                            } else if (_this.ruleLog[key].ruleId == '18') {
                                arr.push('用户是否绑卡规则')
                            }else if (_this.ruleLog[key].ruleId == '19') {
                                arr.push('增加参与次数规则')
                            }else if (_this.ruleLog[key].ruleId == '20') {
                                arr.push('验证邀请次数规则')
                            }
                        }
                    }

                })
                return arr;
            }
        }
    },
    methods: {
        getChangeData: function (actid) { //根据actId获取修改数据
            var _this = this;
            $.post({ //修改数据接口
                url: '/marketingActive/activeRun/activeSetting/addActGetData.ajax',
                data: {
                    actId: actid
                },
                success: function (result) {
                    if (result.error === 0) {
                        _this.moduleId = result.data.activityRuleConfig.moduleId;
                        _this.id = result.data.id;
                        _this.baseData = result.data;

                        console.log(result)
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
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
        getUrlParam: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg); //匹配目标参数
            if (r != null) return unescape(r[2]);
            return ''; //返回参数值
        },
        keep: function () {
            var _this = this;
            var url;
            var params = JSON.parse(JSON.stringify(this.sendData))
            for (var i = 0; i < params.activityBaseComponentsList.length; i++) {

                if (params.activityBaseComponentsList[i].ruleComplexConfigList == null || params.activityBaseComponentsList[i].ruleComplexConfigList.length == 0) {
                    params.activityBaseComponentsList[i].ruleComplexConfigList == []
                    delete params.activityBaseComponentsList[i].ruleIndexList;
                    delete params.activityBaseComponentsList[i].ruleLog;
                    delete params.activityBaseComponentsList[i].ruleLogKey;
                    delete params.activityBaseComponentsList[i].ruleLogName;
                    delete params.activityBaseComponentsList[i].ruleSelect;
                    delete params.activityBaseComponentsList[i].ruleLogStatus;
                    delete params.activityBaseComponentsList[i].ruleChange;
                    delete params.activityBaseComponentsList[i].ruleChangeStatus;
                } else {
                    delete params.activityBaseComponentsList[i].ruleIndexList;
                    delete params.activityBaseComponentsList[i].ruleLog;
                    delete params.activityBaseComponentsList[i].ruleLogKey;
                    delete params.activityBaseComponentsList[i].ruleLogName;
                    delete params.activityBaseComponentsList[i].ruleSelect;
                    delete params.activityBaseComponentsList[i].ruleLogStatus;
                    delete params.activityBaseComponentsList[i].ruleChange;
                    delete params.activityBaseComponentsList[i].ruleChangeStatus;

                }
            }
            params.activityBaseComponentsList.forEach(function (item) {
                item.ruleComplexConfigList.forEach(function (ruleItem) {
                    for (const key in ruleItem) {
                        if (ruleItem[key] && ruleItem[key].ruleId != undefined) {
                            if (ruleItem[key].id != undefined) {
                                ruleItem[key].ruleId = ruleItem[key].id;
                                delete ruleItem[key].id
                            }
                        }

                    }

                })
            })

            var sendParams = {
                actId: this.actId,
                activityRuleConfig: params,
                modifyBy: this.userName,
                id: this.id
            }
            console.log(sendParams)
            // return;
            sendParams.activityRuleConfig = JSON.stringify(sendParams.activityRuleConfig)

            if (this.id != '') {
                url = '/marketingActive/activeRun/activeSetting/addChangeData.ajax'
            } else {
                url = '/marketingActive/activeRun/activeSetting/addKeepData.ajax' //保存
            }
            console.log('this.id ', this.id)
            // return;
            $.post({
                url: url,
                data: sendParams,
                traditional: true,
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('', 'overInfo', false, result.msg);
                        console.log(result)
                    } else {
                        _this.showDialog('', 'overInfo', false, result.msg);
                        console.log(result)
                    }
                }
            });
        },
        getComponent: function (cut, cutk, cutInd) {
            this.cutIndex = cutInd;
            this.cutKey = cutk //赋值切点key
            this.cutId = cut;

            var _this = this;
            this.componentAll = [] //清空组件

            var params = {
                moduleId: this.moduleId,
                cutinPointId: cut,
            }
            $.post({ //切点接口
                url: '/marketingActive/activeRun/activeSetting/addComponentAll.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        // --------------------------------------------------------------------------------------
                        _this.componentAll = result.data;
                        console.log('result.data', result.data)

                        result.data.componentRulesRlDtos.forEach(function (item, indexs) {
                            item.mcpBaseRuleTemplates.forEach(function (ids) {
                                for (var key in _this.ruleLog) {
                                    if (ids.ruleTemplateKey == _this.ruleLog[key].ruleId) {
                                        _this.ruleLog[key].id = ids.id

                                    }
                                }
                            })


                            if (_this.sendData.activityBaseComponentsList.length >= 1) {
                                var sta = _this.sendData.activityBaseComponentsList.some(function (val) {
                                    return (val.componentId == item.mcpActComponentConfig.componentId) && (val.belongCutinPointId == result.data.mcpActCutinPointConfig.cutinPointId);
                                })
                                if (!sta) {
                                    _this.sendData.activityBaseComponentsList.push({
                                        belongCutinPointId: result.data.mcpActCutinPointConfig.cutinPointId,
                                        belongCutinPointKey: result.data.mcpActCutinPointConfig.cutionPointKey,
                                        componentId: item.mcpActComponentConfig.componentId,
                                        componentKey: item.mcpActComponentConfig.componentKey,
                                        successMsg: '', //组件执行成功文案配置
                                        shareConfigId: '', //活动分享配置
                                        messageConfigId: '', //活动短信配置
                                        readConfigId: '', //关联推送数据源配置
                                        awardPkgId: '', //直接发奖配置
                                        ruleComplexConfigList: [], //组件规则群
                                        ruleLog: JSON.parse(JSON.stringify(_this.ruleLog)),
                                        ruleLogKey: '',
                                        ruleLogId: '',
                                        ruleLogName: '',
                                        ruleLogStatus: false,
                                        ruleIndexList: [],
                                        ruleSelect: [],
                                        ruleChange: '',
                                        ruleChangeStatus: false,

                                    })
                                }
                            } else {
                                _this.sendData.activityBaseComponentsList.push({
                                    belongCutinPointId: result.data.mcpActCutinPointConfig.cutinPointId,
                                    belongCutinPointKey: result.data.mcpActCutinPointConfig.cutionPointKey,
                                    componentId: item.mcpActComponentConfig.componentId,
                                    componentKey: item.mcpActComponentConfig.componentKey,
                                    successMsg: '', //组件执行成功文案配置
                                    shareConfigId: '', //活动分享配置
                                    messageConfigId: '', //活动短信配置
                                    readConfigId: '', //关联推送数据源配置
                                    awardPkgId: '', //直接发奖配置
                                    ruleComplexConfigList: [], //组件规则群
                                    ruleLog: JSON.parse(JSON.stringify(_this.ruleLog)),
                                    ruleLogKey: '',
                                    ruleLogId: '',
                                    ruleLogName: '',
                                    ruleLogStatus: false,
                                    ruleIndexList: [],
                                    ruleSelect: [],
                                    ruleChange: '',
                                    ruleChangeStatus: false,
                                })
                            }
                        })

                        if (_this.id != '' && _this.baseDataStatus) {

                            _this.sendData.activityBaseComponentsList.forEach(function (item, ind) {
                                _this.baseData.activityRuleConfig.activityBaseComponentsList.forEach(function (baseItem, baseInd) {

                                    if (item.componentId == baseItem.componentId && item.belongCutinPointId == baseItem.belongCutinPointId) {

                                        if (baseItem.ruleComplexConfigList == null) {
                                            baseItem.ruleComplexConfigList = []
                                        }

                                        for (var key in baseItem) {
                                            item[key] = baseItem[key] //获取的数据赋值到本地
                                        }

                                        item.ruleComplexConfigList.forEach(function (ruleItem) {
                                            for (var keys1 in ruleItem) {

                                                for (var keys in _this.ruleLog) {

                                                    if (ruleItem[keys1] && ruleItem[keys1].ruleId) {
                                                        if (ruleItem[keys1].ruleId == _this.ruleLog[keys].id) {
                                                            if (ruleItem[keys1].id == undefined) { //未赋值的才进行赋值
                                                                ruleItem[keys1].id = JSON.parse(JSON.stringify(ruleItem[keys1].ruleId))
                                                                ruleItem[keys1].ruleId = JSON.parse(JSON.stringify(_this.ruleLog[keys].ruleId))
                                                            }


                                                        }

                                                    }

                                                }

                                            }


                                        })


                                        _this.baseDataStatus = false //不可以修改
                                    }
                                })
                            })
                        }
                        // --------------------------------------------------------------------------------------
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });


        },

        ruleDialog: function (ruleName, ruleKey, rules, ruleId) {
            this.sessionRuleId = ruleId + '';
            rules.ruleLogKey = ruleKey;
            rules.ruleLogId = ruleId;
            rules.ruleLogName = ruleName;
            rules.ruleLogStatus = true; //打开弹窗
        },
        skipNextOne: function (item, key) {
            if (item.ruleIndexList.indexOf(this.sessionRuleId) == -1) { //添加勾选
                item.ruleIndexList.push(this.sessionRuleId)
                item.ruleIndexList = item.ruleIndexList.sort(function (a, b) {
                    return a - b
                }) //排序
            }
            var regsDate;
            if (item.ruleLogKey == 2) {
                if (item.ruleLog.rule2.dateFormatStr == 'HHmmss') {
                    regsDate = /^[012][0-9][0-5][0-9][0-5][0-9]$/
                } else {
                    regsDate = /^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})(((0[13578]|1[02])(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)(0[1-9]|[12][0-9]|30))|(02(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))0229))([0-1]?[0-9]|2[0-3])([0-5][0-9])([0-5][0-9])$/
                }
                console.log(item)
                if (!regsDate.test(item.ruleLog.rule2.intervalTimeFrom) && !regsDate.test(item.ruleLog.rule2.intervalTimeTo)) {

                    this.diaMsg = '日期格式错误'
                    this.MsgLog = item
                    this.rule.hint = true; //弹窗
                    item.ruleLogStatus = false //弹窗
                    return;
                }
            }

            item.ruleLogStatus = false //关闭弹窗
        },
        cancel: function (item) {
            if (item.ruleIndexList.indexOf(this.sessionRuleId) != -1) { //取消勾选
                item.ruleIndexList.splice(item.ruleIndexList.indexOf(this.sessionRuleId), 1)
                item.ruleIndexList = item.ruleIndexList.sort(function (a, b) {
                    return a - b
                }) //排序
            }
            if (item.ruleIndexList.length <= item.ruleSelect.length) {
                if (item.ruleIndexList.length != 0) {
                    item.ruleSelect.splice(item.ruleIndexList.length - 1, 1)
                }
            }
            item.ruleLogStatus = false //关闭弹窗
        },
        ruleListAdd: function (item) {
            var _this = this;
            if (item.ruleIndexList.length != 0) {
                var obj = {
                    baseRuleList: []
                };
                item.ruleIndexList.forEach(function (val, ind) {
                    for (var key in _this.ruleLog) {
                        if (val == _this.ruleLog[key].id) {
                            obj.baseRuleList.push({
                                ruleId: val,
                                notMatchMsgSalience: item.ruleLog[key].notMatchMsgSalience,
                                ruleNotMatchReturnMsg: item.ruleLog[key].ruleNotMatchReturnMsg,
                            })
                            if (key == 'rule1') {
                                obj.securityRankRule = item.ruleLog[key]
                            } else if (key == 'rule2') {
                                obj.timePeriodRule = item.ruleLog[key]
                            } else if (key == 'rule3') {
                                obj.userGroupRule = item.ruleLog[key]
                            } else if (key == 'rule4') {
                                obj.takePartChanceRule = item.ruleLog[key]
                            } else if (key == 'rule5') {
                                obj.rewardChanceRule = item.ruleLog[key]
                            } else if (key == 'rule6') {
                                obj.assertRangeRule = item.ruleLog[key]
                            } else if (key == 'rule7') {
                                obj.signRule = item.ruleLog[key]
                            } else if (key == 'rule8') {
                                obj.bigDataExpressionRule = item.ruleLog[key]
                            } else if (key == 'rule10') {
                                obj.seatRule = item.ruleLog[key]
                            } else if (key == 'rule11') {
                                obj.dateTypeRule = item.ruleLog[key]
                            } else if (key == 'rule12') {
                                obj.asyncRegisterSoureRule = item.ruleLog[key]
                            } else if (key == 'rule13') {
                                obj.eventCodeRule = item.ruleLog[key]
                            } else if (key == 'rule14') {
                                obj.isTakePartRule = item.ruleLog[key]
                            } else if (key == 'rule15') {
                                obj.mgmRewardChanceRule = item.ruleLog[key]
                            } else if (key == 'rule16') {
                                obj.followChanceRule = item.ruleLog[key]
                            } else if (key == 'rule17') {
                                obj.assistChanceRule = item.ruleLog[key]
                            } else if (key == 'rule18') {
                                obj.bindcardRule = item.ruleLog[key]
                            }else if (key == 'rule19') {
                                obj.addTakePartChanceRule = item.ruleLog[key]
                            }else if (key == 'rule20') {
                                obj.mgmSuccessCountRule = item.ruleLog[key]
                            }
                        }
                    }

                })
                if (item.ruleChangeStatus) {
                    item.ruleComplexConfigList[item.ruleChange] = obj //相同时添加
                } else {
                    item.ruleComplexConfigList.push(obj)
                }
                this.rule.ruleStatic2 = true; //打开弹窗
            } else {
                this.showDialog('', 'info', false, '请选择组件规则')
                return;
            }
        },
        setRulesRelation: function (item) {
            if (item.ruleIndexList.length - 1 == item.ruleSelect.length) {
                var str = ''
                item.ruleIndexList.forEach(function (val, ind) {
                    if (item.ruleSelect[ind]) {
                        str += 'result_' + val + item.ruleSelect[ind]
                    } else {
                        str += 'result_' + val
                    }
                })
            } else {
                alert('请选择组件关系')
                return;
            }

            // return
            if (item.ruleChangeStatus) {
                item.ruleComplexConfigList[item.ruleChange].rulesRelation = str;
            } else {

                item.ruleComplexConfigList[item.ruleComplexConfigList.length - 1].rulesRelation = str; //相同时添加
            }
            // item.ruleChangeStatus = false;

            this.rule.ruleStatic2 = false; //关闭弹窗
            this.rule.ruleStatic3 = true; //打开
        },
        setRuleType: function (item) { //规则类型 弹窗3
            if (this.ruleType.ruleComplexSalience == '') {
                this.redShow = true; //必填提示
                return;
            }
            for (var key in this.ruleType) {
                if (item.ruleChangeStatus) {

                    item.ruleComplexConfigList[item.ruleChange][key] = this.ruleType[key];
                } else {

                    item.ruleComplexConfigList[item.ruleComplexConfigList.length - 1][key] = this.ruleType[key];
                }

                this.ruleType[key] = ''
            }
            this.ruleType.ruleUseType = '1'
            item.ruleChangeStatus = false;
            item.ruleIndexList = []
            item.ruleSelect = []
            item.ruleLogKey = ''
            item.ruleLogId = ''
            item.ruleLogName = ''
            item.ruleLog = JSON.parse(JSON.stringify(this.ruleLog))
            this.rule.ruleStatic3 = false; //关闭弹窗

            this.redShow = false //隐藏必填提示;
        },

        showData: function (item, val, ruleIndex) { //点击修改数据
            console.log('ruleIndex', ruleIndex)
            item.ruleChange = ruleIndex;
            item.ruleChangeStatus = true; //可以修改
            item.ruleLog = JSON.parse(JSON.stringify(this.ruleLog)); //清空数据
            console.log('item', item)
            var num = []
            val.baseRuleList.forEach(function (rule, ind) {
                num.push(rule.ruleId + '');
            })
            item.ruleIndexList = num; //赋值选择项
            var nums = val.rulesRelation

            var regs2 = /result_[0-9]+/g;
            var a = nums.split(regs2)

            for (var i = 0; i < a.length; i++) {
                if (a[i] == '') {
                    a.splice(i, 1)
                    i--;
                }

            }
            item.ruleSelect = a //赋值拼接
            console.log('val', val)
            for (var key in val) {
                if (val[key] != null && val[key].ruleId) {
                    item.ruleLog['rule' + val[key].ruleId] = val[key]
                }

            }
            if (val.ruleUseType == 1) {
                this.ruleType.ruleUseType = val.ruleUseType
                this.ruleType.ruleComplexSalience = val.ruleComplexSalience
                this.ruleType.allowInFlag = val.allowInFlag
            } else if (val.ruleUseType == 2) {
                this.ruleType.ruleUseType = val.ruleUseType
                this.ruleType.ruleComplexSalience = val.ruleComplexSalience
                this.ruleType.awardPkgId = val.awardPkgId
                this.ruleType.bonusAmt = val.bonusAmt
                this.ruleType.pointsCount = val.pointsCount
            } else if (val.ruleUseType == 3) {
                this.ruleType.ruleUseType = val.ruleUseType
                this.ruleType.ruleComplexSalience = val.ruleComplexSalience
                this.ruleType.pointProductId = val.pointProductId
            } else if (val.ruleUseType == 4) {
                this.ruleType.ruleUseType = val.ruleUseType
                this.ruleType.ruleComplexSalience = val.ruleComplexSalience
            }
        },
        deleteRuleList: function (item, ind) {
            item.ruleComplexConfigList.splice(ind, 1)
        },
        dialogItem: function (item) {
            item.ruleLogStatus = true;
            this.rule.hint = false;
        },
        
    },

    watch: {
        moduleId: function (newvla, oldval) {
            // this.numAllCheck = []
            // this.rulesRelation = []
            // this.nameAllCheck = {}
            // this.sessionCheck = ''
            // this.sessionCheckObj = ''
            this.componentAll = [] //清空组件
            this.setRuleIds = [] //清空
            this.cutId = '' //清空切点

            var _this = this;
            var params = {
                moduleId: newvla
            }
            $.post({ //切点接口
                url: '/marketingActive/activeRun/activeSetting/addCutAll.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.cutAll = result.data
                        console.log(result)

                        _this.cutAll.mcpActCutinPointConfigs.forEach(function (cutIds) {
                            var params1 = {
                                moduleId: newvla,
                                cutinPointId: cutIds.cutinPointId,
                            }
                            $.post({ //切点接口
                                url: '/marketingActive/activeRun/activeSetting/addComponentAll.ajax',
                                data: params1,
                                success: function (result) {
                                    if (result.error === 0) {
                                        result.data.componentRulesRlDtos.forEach(function (item, indexs) {
                                            item.mcpBaseRuleTemplates.forEach(function (ids) {
                                                for (var key in _this.ruleLog) {
                                                    if (ids.ruleTemplateKey == _this.ruleLog[key].ruleId) {
                                                        _this.ruleLog[key].id = ids.id

                                                    }
                                                }
                                            })
                                            _this.sendData.activityBaseComponentsList.push({
                                                belongCutinPointId: result.data.mcpActCutinPointConfig.cutinPointId,
                                                belongCutinPointKey: result.data.mcpActCutinPointConfig.cutionPointKey,
                                                componentId: item.mcpActComponentConfig.componentId,
                                                componentKey: item.mcpActComponentConfig.componentKey,
                                                successMsg: '', //组件执行成功文案配置
                                                shareConfigId: '', //活动分享配置
                                                messageConfigId: '', //活动短信配置
                                                readConfigId: '', //关联推送数据源配置
                                                awardPkgId: '', //直接发奖配置
                                                ruleComplexConfigList: [], //组件规则群
                                                ruleLog: JSON.parse(JSON.stringify(_this.ruleLog)),
                                                ruleLogKey: '',
                                                ruleLogId: '',
                                                ruleLogName: '',
                                                ruleLogStatus: false,
                                                ruleIndexList: [],
                                                ruleSelect: [],
                                                ruleChange: '',
                                                ruleChangeStatus: false,
                                            })
                                        })
                                    } else {
                                        _this.showDialog('', 'info', false, result.msg);
                                    }
                                }
                            });
                        })
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
            this.sendData = { //模型id改变时，清空sendData
                activityBaseComponentsList: [],
                moduleId: newvla
            }
        },
        actId: function (newval) {
            var _this = this;
            $.post({ //奖励接口
                url: '/marketingActive/activeRun/activeSetting/addAwardData.ajax',
                data: {
                    actId: newval
                },
                success: function (result) {
                    if (result.error === 0) {
                        _this.awardDataAll = result.data;
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });

            $.post({ //分组配置接口
                url: '/marketingActive/activeRun/activeSetting/addUserGroup.ajax',
                data: {
                    actId: newval
                },
                success: function (result) {
                    if (result.error === 0) {
                        _this.userGroupList = result.data
                    } else {
                        _this.showDialog('', 'info', false, '获取客户分群服务数据失败');
                    }
                }
            });
        },
        // 

        // 
    },
    components: {
        vueSelect: vueSelect
    },
    filters: {
        setName: function (val) {
            if (val) {
                var regs2 = /result_/g;
                var a = val.split(regs2);
                a = a.join('');
                a = a.split(/[&|]+/g)
                for (var key in vm.ruleLog) {
                    if (vm.ruleLog[key].id != undefined) {

                        a.forEach(function (value) {
                            if (vm.ruleLog[key].id == value) {

                                if (vm.ruleLog[key].ruleId == 1) {
                                    val = val.replace('result_' + vm.ruleLog[key].id, '安全等级规则')
                                }
                                if (vm.ruleLog[key].ruleId == 2) {
                                    val = val.replace('result_' + vm.ruleLog[key].id, '活动参与周期规则')
                                }
                                if (vm.ruleLog[key].ruleId == 3) {
                                    val = val.replace('result_' + vm.ruleLog[key].id, '用户分组规则')
                                }
                                if (vm.ruleLog[key].ruleId == 4) {
                                    val = val.replace('result_' + vm.ruleLog[key].id, '活动参与次数规则')
                                }
                                if (vm.ruleLog[key].ruleId == 5) {
                                    val = val.replace('result_' + vm.ruleLog[key].id, '发奖次数规则')
                                }
                                if (vm.ruleLog[key].ruleId == 6) {
                                    val = val.replace('result_' + vm.ruleLog[key].id, '用户资产规则')
                                }
                                if (vm.ruleLog[key].ruleId == 7) {
                                    val = val.replace('result_' + vm.ruleLog[key].id, '签到天数规则')
                                }
                                if (vm.ruleLog[key].ruleId == 8) {
                                    val = val.replace('result_' + vm.ruleLog[key].id, '大数据清算规则')
                                }
                                if (vm.ruleLog[key].ruleId == 10) {
                                    val = val.replace('result_' + vm.ruleLog[key].id, '渠道发奖规则')
                                }
                                if (vm.ruleLog[key].ruleId == 11) {
                                    val = val.replace('result_' + vm.ruleLog[key].id, '日期类型规则')
                                }
                                if (vm.ruleLog[key].ruleId == 12) {
                                    val = val.replace('result_' + vm.ruleLog[key].id, '异步注册消息来源规则')
                                }
                                if (vm.ruleLog[key].ruleId == 13) {
                                    val = val.replace('result_' + vm.ruleLog[key].id, '事件编码规则')
                                }
                                if (vm.ruleLog[key].ruleId == 14) {
                                    val = val.replace('result_' + vm.ruleLog[key].id, '是否验证参与规则')
                                }
                                if (vm.ruleLog[key].ruleId == 15) {
                                    val = val.replace('result_' + vm.ruleLog[key].id, 'MGM发奖次数规则')
                                }
                                if (vm.ruleLog[key].ruleId == 16) {
                                    val = val.replace('result_' + vm.ruleLog[key].id, '活动对象关注次数规则')
                                }
                                if (vm.ruleLog[key].ruleId == 17) {
                                    val = val.replace('result_' + vm.ruleLog[key].id, '助力次数规则')
                                }
                                if (vm.ruleLog[key].ruleId == 18) {
                                    val = val.replace('result_' + vm.ruleLog[key].id, '用户是否绑卡规则')
                                }
                                if (vm.ruleLog[key].ruleId == 19) {
                                    val = val.replace('result_' + vm.ruleLog[key].id, '增加参与次数规则')
                                }
                                if (vm.ruleLog[key].ruleId == 20) {
                                    val = val.replace('result_' + vm.ruleLog[key].id, '验证邀请次数规则')
                                }
                            }

                        })


                    }

                }

            }
            return val;
        }
    }

});