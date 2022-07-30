
new Vue({
    el: '#content',
    data: {
        diaMsg: '',
        fundInfo: {
            fundnm: '',//产品简称	   info
            displayorder: '',//显示顺序       info
            yield: '',//预期收益	       info
        },
        fundExtension: {
            trancustodyFlg: '',//是否支持转场内     EXDO
            trusteename: '',//托管人		            EXDO
            breakcontractratio: '',//违约退出费率		    EXDO
            custserviceratio: '',//客户服务费			    EXDO

            subrate: '',//认购费            	    EXDO
            managerratio: '',//固定管理费     	    EXDO
            investbroker: '',//投资经理       	    EXDO

            currentrate: '',//申购费      	    EXDO
            trusteeratio: '',//托管费	        EXDO
            quitrate: '',//退出费               EXDO

            investtype: '',//投资方向

        },
        fundDetail: {
            onsaleflag: '',//是否上架  

            recordday: '',//备案日
            fundtypeBig: '',//产品大类

            isShowOnsaleEnddate: '',//是否展示募集结束时间 is_show_onsale_enddate
            onsaletime: '',//上架时间 时间
            onsaledate: '',//上架时间 日期
            onsaleenddate: '',//募集结束时间


            fundperiod: '',//产品期限 input
            fundperiodunit: '',//产品期限 select
            fundperiodsplit: '',//期限拆分
            isrecommend: '',//是否推荐
            purchaseOpendDate: '',//申购开放日期  purchase_opend_date
            recommendintro: '',//营销信息
            navpubtype: '',//净值公布类型

            expectincomedesc: '',//收益类型
            recommendtype: '',//推荐标签
            redeemOpendDate: '',//赎回开放日期
            openflag: '',//信息披露对象

            mipType: '',//基金支持定投类型配置	
            renewtag: '',//是否支持续约	
            reservedtahead4opendt: '',//预约赎回功能提前开放	
            allowbidcancel: '',//是否允许申购撤单	



            detailtemplate: '',//详情模板
            capitallevel: '',//杠杆分级	
            targetcustomer: '',//适合人群		
            quotaDesc: '',//购买限制			
            fundopenruledesc: '',//参与退出规则		


            achievementdata: '',//业绩提成
            riskreserveamt: '',//风险准备金
            incomedistbute: '',//收益分配
            investtarget: '',//投资目标
            investscope: '',//投资范围
            onsignriskinfo: '',//产品在线签约的风险提示	
            contract: '',//协议风险配置	
            tips: '',//文案配置
            stoplossdes: '',//止损要求	
            onsignriskinputtag: '',//客户手工输入风险揭示

            ecflag: '',//保有量归属电商
            crmenddate: '',//CRM推送的产品到期日
            balancedetailtemplate: '',//份额详细模板
            crmenddatedesc: '',//修改到期日


            // attachcontract: '',//附件   产品合同
            // attachriskexp: '',//附件   认购风险申明书	
            // deposit: '',//附件   保证金协议		
            // attachaddendum: '',//附件   补充协议			
            // attachbanner: '',//附件   Banner			
            // attachcustomdetail: '',//附件   上传自定义详情(仅支持zip格式)	
            // onepage: '',//附件   一页通	
            // attachinvestexp: '',//附件   投资说明书	
            // attachpdtprom: '',//附件   产品宣传册	
            // commitment: '',//附件   承诺函		
            // attachpledge: '',//附件   质押借款协议		
            // attachbannermob: '',//附件   Banner(手机)		
            // attachcustomdetailm: '',//附件   上传手机自定义详情(仅支持zip格式)	


            url: '',//产品链接
            suggestion: '',//投资建议	


            pledgetype: '',//质押类型	
            pssbanbegindate: '',//禁止质押开始时间	
            pssbanbegintime: '',//禁止质押开始时间	
            refyearrate: '',//参考年利率	
            penaltydayrate: '',//罚息日利率

            pledgeratio: '',//质押可贷比例	
            pssbanenddate: '',//禁止质押截止时间	
            pssbanendtime: '',//禁止质押截止时间	
            psswarnposition: '',//预警线

            lendingperiod: '',//最长借款期限（天）	
            lenddayrate: '',//贷款日利率		
            psscloseposition: '',//平仓线	


            activitytype: '',//活动类型
            activitybegindate: '',//活动开始时间
            activityenddate: '',//活动结束时间


            onsalestatus: '',//产品购买状态
            ispaly: '',//轮播显示配置
            remainamttag: '',//剩余额度显示	
            rushbuydesc: '',//开抢文案	
            sharecarrydate: '',//份额起息日	
            needredeemrangetag: '',//赎回极差控制开关	
            balancerefyielddesc: '',//份额明细中的预期收益率	
            // '空':'',//高端产品类型	
            sharedetailremark: '',//客户持有份额的备注说明

            salecusttype: '',//可购买客户	
            countdowndesc: '',//倒计时文案	
            reservecodetag: '',//流水号通道显示	
            rushbuytime: '',//开抢时间	
            rushbuydate: '',//开抢时间	
            sharenextcarrydate: '',//份额到期日		
            redeemrangeamt: '',//赎回极差		
            singletermtag: '',//产品期数类型		
            // '空':'',//是否面向特定客户	

            countdownflag: '',//倒计时显示配置
            countdownendtime: '',//倒计时结束时间
            countdownenddate: '',//倒计时结束时间
            rushbuytag: '',//开抢标志
            expectyield: '',//预期收益率（营销信息）
            buyerlimitnum: '',//购买人数限制
            targetcustomerselect: '',//适合人群
            actionwhenmatured: '',//产品到期TA操作
        },
        operate: '',
        userid: '',
        dataFlag: '',//数据来源
        service_id: '',
        update_timestamp: '',
        selectOption: {
            investtypeList: []
        },
        initialData: {},
        local_id: '',

        alwaysClick: true,//阻止连续点击

    },
    created: function () {
        $.post({//投资方向
            url: '/businessMgmt/IPOMgmtEC/IPOMgmt/modifySelectOption.ajax',
            data: {
                pmst: 'SYSTEM',
                pmkey: 'INVESTTYPE'
            },
            success: function (result) {
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
        var _this = this;
        this.dataFlag = this.getUrlParam('address')
        this.service_id = this.getUrlParam('service_id')

    },
    mounted: function () {
        var dialogs = ['info', 'modifyInfo', ''];
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

        this.showInitialData({ service_id: this.getUrlParam('service_id'), local_id: this.getUrlParam('local_id') })
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
        //主表格分页方法

        showInitialData: function (item) {
            var params = {};
            var _this = this;
            if (this.dataFlag == 'local') {
                _this.local_id = item.local_id
                params = {
                    local_id: item.local_id,
                    service_id: item.service_id
                }
                $.post({
                    url: '/businessMgmt/IPOMgmtEC/IPOMgmt/modifyLocalData.ajax',
                    data: params,
                    success: function (result_parent) {
                        if (result_parent.error === 0) {
                            console.log(result_parent)
                            if (result_parent.data) {
                                // if (!result_parent.data.content.fundDetail) {
                                //     _this.operate = '1'
                                // } else {
                                //     _this.operate = '2'
                                // }
                                // if (result_parent.data.content === null) {
                                var lineParams = {
                                    fundIdList: item.service_id
                                }
                                $.post({
                                    url: '/businessMgmt/IPOMgmtEC/IPOMgmt/modifyLineData.ajax',
                                    data: lineParams,
                                    success: function (result) {
                                        if (result.error === 0) {
                                            if (result.data) {
                                                if (!result.data[0].fundDetail) {
                                                    _this.operate = '1'
                                                } else {
                                                    _this.operate = '2'
                                                }
                                                _this.setModilyData(result.data[0])
                                                _this.update_timestamp = result_parent.data.update_timestamp
                                                if (result_parent.data.content) {
                                                    _this.setModilyData(result_parent.data.content, true)
                                                }
                                            }
                                        } else {
                                            _this.showDialog('', 'info', true, result.msg);
                                        }
                                    }
                                });
                                // }



                            }
                        } else {
                            _this.showDialog('', 'info', true, result_parent.msg);
                        }
                    }
                });
            } else {
                params.fundIdList = item.service_id
                $.post({
                    url: '/businessMgmt/IPOMgmtEC/IPOMgmt/modifyLineData.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            if (result.data) {
                                if (!result.data[0].fundDetail) {
                                    _this.operate = '1'
                                } else {
                                    _this.operate = '2'
                                }
                                _this.setModilyData(result.data[0])
                            }
                        } else {
                            _this.showDialog('', 'info', true, result.msg);
                        }
                    }
                });
            }

        },
        setModilyData: function (item, again) {
            // moment(issue).format("HHmmss")
            if (item.fundDetail) {

                for (var key in this.fundDetail) {
                    if (item.fundDetail[key] !== undefined) {
                        this.fundDetail[key] = item.fundDetail[key]
                    }
                }
            }
            if (item.fundExtension) {

                for (var key in this.fundExtension) {
                    if (item.fundExtension[key] !== undefined) {
                        this.fundExtension[key] = item.fundExtension[key]
                    }
                }
            }
            if (item.fundInfo) {

                for (var key in this.fundInfo) {
                    if (item.fundInfo[key] !== undefined) {
                        this.fundInfo[key] = item.fundInfo[key]
                    }
                }
            }
            if (!again) {
                this.initialData = JSON.parse(JSON.stringify(item))
                // this.initialData.fundInfo = JSON.parse(JSON.stringify(this.fundInfo))
                // this.initialData.fundDetail = JSON.parse(JSON.stringify(this.fundDetail))
                // this.initialData.fundExtension = JSON.parse(JSON.stringify(this.fundExtension))
            }
        },
        dataCheck: function () {
            // if (/^[0]{1}$|^[1-9][\d]*$/.test(this.fundDetail.reservedtahead4opendt)) {
            //     this.showDialog('', 'info', false, '预约赎回功能提前开放配置只能为非负整数');
            //     return false;
            // }
            // if (this.fundDetail.onsaleflag == 1) {
            //     if (!this.fundDetail.onsaletime) {
            //         this.showDialog('', 'info', false, '上架时间不能为空！');
            //         return false;
            //     }
            // }
            // var reg = /^(\d{1,}(|(\.{1}\d{0,4})))$|^(\.{1}\d{1,4})$/;
            // if (!this.fundDetail.subrate.match(reg)) {
            //     this.showDialog('', 'info', false, '认购费格式错误');
            //     return false;
            // }
            // if (!this.fundDetail.currentrate.match(reg)) {
            //     this.showDialog('', 'info', false, '申购费格式错误');
            //     return false;
            // }
            // if (!this.fundDetail.quitrate.match(reg)) {
            //     this.showDialog('', 'info', false, '退出费格式错误');
            //     return false;
            // }
            // if (!this.fundDetail.breakcontractratio.match(reg)) {
            //     this.showDialog('', 'info', false, '违约退出费格式错误');
            //     return false;
            // }
            // if (!this.fundDetail.managerratio.match(reg)) {
            //     this.showDialog('', 'info', false, '固定管理费格式错误');
            //     return false;
            // }
            // if (!this.fundDetail.trusteeratio.match(reg)) {
            //     this.showDialog('', 'info', false, '托管费格式错误');
            //     return false;
            // }
            // if (!this.fundDetail.custserviceratio.match(reg)) {
            //     this.showDialog('', 'info', false, '客户服务费格式错误');
            //     return false;
            // }
            // if (!this.fundDetail.yield.match(reg)) {
            //     this.showDialog('', 'info', false, '预期收益格式错误');
            //     return false;
            // }
            // if (!this.fundDetail.pledgeratio.match(reg)) {
            //     this.showDialog('', 'info', false, '质押可贷比例格式错误');
            //     return false;
            // }
            // if (!this.fundDetail.lendingperiod.match(reg)) {
            //     this.showDialog('', 'info', false, '最长借款期限（天）格式错误');
            //     return false;
            // }
            // if (!this.fundDetail.redeemrangedmt.match(reg)) {
            //     this.showDialog('', 'info', false, '赎回极差格式错误');
            //     return false;
            // }
            var fundDetail = JSON.parse(JSON.stringify(this.fundDetail));
            var fundInfo = JSON.parse(JSON.stringify(this.fundInfo));
            var fundExtension = JSON.parse(JSON.stringify(this.fundExtension));
            var change = {
                fundInfo: {},
                fundDetail: {},
                fundExtension: {}
            };
            var regDate = /[\d]{4}-[\d]{2}-[\d]{2}/
            var regTime = /[\d]{2}:[\d]{2}:[\d]{2}/
            if (this.initialData.fundDetail) {
                for (var key in fundDetail) {
                    if (regDate.test(fundDetail[key])) {
                        fundDetail[key] = fundDetail[key].replace(/-/g, '')
                    }
                    if (regTime.test(fundDetail[key])) {
                        fundDetail[key] = fundDetail[key].replace(/:/g, '')
                    }
                    if (typeof fundDetail[key] === 'string') {
                        fundDetail[key] = fundDetail[key].replace(/[\s]/g, '')
                    }
                    if (this.initialData.fundDetail[key] != fundDetail[key]) {
                        if (this.initialData.fundDetail[key] != null || fundDetail[key] != '') {
                            if (!change.fundDetail.serialno) {
                                change.fundDetail.serialno = this.initialData.fundDetail.serialno
                            }
                            change.fundDetail[key] = fundDetail[key]
                        }
                    }
                }
            } else {
                for (var key in fundDetail) {
                    if (fundDetail[key] != null && fundDetail[key] != undefined && fundDetail[key] != '') {
                        change.fundDetail[key] = fundDetail[key]
                    }
                }
            }
            for (var key in fundInfo) {
                if (this.initialData.fundInfo[key] != fundInfo[key]) {
                    if (this.initialData.fundInfo[key] != null || fundInfo[key] != '') {
                        if (!change.fundInfo.serialno) {
                            change.fundInfo.serialno = this.initialData.fundInfo.serialno
                        }
                        change.fundInfo[key] = fundInfo[key]
                    }
                }
            }
            for (var key in fundExtension) {
                if (this.initialData.fundExtension[key] != fundExtension[key]) {
                    if (this.initialData.fundExtension[key] != null || fundExtension[key] != '') {
                        if (!change.fundExtension.serialno) {
                            change.fundExtension.serialno = this.initialData.fundExtension.serialno
                        }
                        change.fundExtension[key] = fundExtension[key]
                    }
                }
            }
            return change;
        },
        modify: function () {

            var _this = this;
            var change = this.dataCheck()
            // return console.log(change)
            if (this.alwaysClick) {
                this.alwaysClick = false;
                if (!change) {
                    _this.alwaysClick = true;
                    return;
                }

                var params = {}
                if (JSON.stringify(change.fundInfo) == '{}' && JSON.stringify(change.fundDetail) == '{}' && JSON.stringify(change.fundExtension) == '{}') {
                    params.modifyData = null
                } else {
                    params.modifyData = JSON.stringify(change);
                }
                // params.initialData = JSON.stringify(this.initialData)
                params.operate = this.operate
                params.service_id = this.service_id
                params.local_id = this.local_id
                params.update_timestamp = this.update_timestamp
                $.post({
                    url: '/businessMgmt/IPOMgmtEC/IPOMgmt/modifyModify.ajax',
                    data: params,
                    success: function (result) {
                        _this.alwaysClick = true;
                        if (result.error === 0) {
                            console.log(result)
                            _this.showDialog('', 'modifyInfo', false, result.msg);
                        } else {
                            _this.showDialog('', 'info', true, result.msg);
                        }
                    }
                });
            }
        }
    },
    components: {
        'date-picker': VueBootstrapDatetimePicker
    }
});

