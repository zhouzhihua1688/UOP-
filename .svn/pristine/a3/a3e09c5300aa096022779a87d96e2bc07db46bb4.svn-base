
new Vue({
    el: '#content',
    data: {
        diaMsg: '',
        fundInfo: {
            displayorder: '',//显示顺序         info
            yield: '',//预期收益	        info
            fundid: '',//基金代码        info
            tano: '',//注册登记代码      info
            shareclass: '',//基金等级         info
            currencytype: '',//货币类型        info
            fundnm: '',//基金简称	        info
            sharetype: '',//收费方式	        info
        },

        circleList: [{
            accptmd: '',//渠道标志
            fundst: '',//基金状态
            issuedate: '',//发行日期
            dssubenddate: '',//认购结束日期
            biddate: '',//开放日期
            issuetime: '',//发行时间
            dssubendtime: '',//认购结束时间
            bidtime: '',//开放时间
        }],
        fundExtension: {
            trancustodyFlg: '',//是否支持转场内  
            trusteename: '',//托管人		     
            breakcontractratio: '',//违约退出费率
            custserviceratio: '',//客户服务费	
            fundrisklevel: '',//基金风险等级   
            facevalue: '',//基金面值     
            navfracmode: '',//基金净值小数处理方式  
            ackbidday: '',//申购确认日期  
            melonmd: '',//分红方式     
            subrate: '',//认购费            	 
            managerratio: '',//固定管理费     	 
            investbroker: '',//投资经理       	 
            displayfundtp: '',//公募基金展示类别 
            navfracnum: '',//基金净值小数位数  
            investarea: '',//投资区域     
            producttype: '',//产品类型    
            fundchinesenm: '',//基金中文全称   
            currentrate: '',//申购费      	    
            trusteeratio: '',//托管费	       
            quitrate: '',//退出费               
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

            investtype: '',//产品类型	= 投资方向


            transferdays: '',//资金到账日期
            deliverydays: '',//资金交付日期
            melonmddays: '',//分红划款日期
            biddays: '',//申购划款日期
        },
        fundDetail: {
            recordday: '',//备案日
            fundtypeBig: '',//产品大类
            onsaleflag: '',//是否上架  
            isShowOnsaleEnddate: '',//是否展示募集结束时间 is_show_onsale_enddate
            onsaletime: '',//上架时间
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


            attachcontract: '',//附件   产品合同
            attachriskexp: '',//附件   认购风险申明书	
            deposit: '',//附件   保证金协议		
            attachaddendum: '',//附件   补充协议			
            attachbanner: '',//附件   Banner			
            attachcustomdetail: '',//附件   上传自定义详情(仅支持zip格式)	
            onepage: '',//附件   一页通	
            attachinvestexp: '',//附件   投资说明书	
            attachpdtprom: '',//附件   产品宣传册	
            commitment: '',//附件   承诺函		
            attachpledge: '',//附件   质押借款协议		
            attachbannermob: '',//附件   Banner(手机)		
            attachcustomdetailm: '',//附件   上传手机自定义详情(仅支持zip格式)	



            url: '',//产品链接
            suggestion: '',//投资建议	
            pledgetype: '',//质押类型	
            pssbanbegindate: '',//禁止质押开始时间	
            refyearrate: '',//参考年利率	
            penaltydayrate: '',//罚息日利率
            pledgeratio: '',//质押可贷比例	
            pssbanenddate: '',//禁止质押截止时间	
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
            sharenextcarrydate: '',//份额到期日		
            redeemrangeamt: '',//赎回极差		
            singletermtag: '',//产品期数类型		
            // '空':'',//是否面向特定客户	
            countdownflag: '',//倒计时显示配置
            countdownendtime: '',//倒计时结束时间
            rushbuytag: '',//开抢标志
            expectyield: '',//预期收益率（营销信息）
            buyerlimitnum: '',//购买人数限制
            targetcustomerselect: '',//适合人群
            actionwhenmatured: '',//产品到期TA操作
        },
        selectOption: {//选项
            investtypeList: [],

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
    created: function () {
        var _this = this;

        $.post({//注册登记代码
            url: '/businessMgmt/IPOMgmtFD/IPOMgmtFundDetail/detailSelectOption.ajax',
            data: {
                pmst: 'SYSTEM',
                pmkey: 'TANO'
            },
            success: function (result) {
                _this.num++;
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
            url: '/businessMgmt/IPOMgmtFD/IPOMgmtFundDetail/detailSelectOption.ajax',
            data: {
                pmst: 'SYSTEM',
                pmkey: 'DISPLAYFUNDTP'
            },
            success: function (result) {
                _this.num++;
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
            url: '/businessMgmt/IPOMgmtFD/IPOMgmtFundDetail/detailSelectOption.ajax',
            data: {
                pmst: 'SYSTEM',
                pmkey: 'PRODUCTTYPE'
            },
            success: function (result) {
                _this.num++;
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
            url: '/businessMgmt/IPOMgmtFD/IPOMgmtFundDetail/detailSelectOption.ajax',
            data: {
                pmst: 'SYSTEM',
                pmkey: 'CURRENCYTYPE'
            },
            success: function (result) {
                _this.num++;
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
            url: '/businessMgmt/IPOMgmtFD/IPOMgmtFundDetail/detailSelectOption.ajax',
            data: {
                pmst: 'SYSTEM',
                pmkey: 'FUNDRISKLEVEL'
            },
            success: function (result) {
                _this.num++;
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
            url: '/businessMgmt/IPOMgmtFD/IPOMgmtFundDetail/detailSelectOption.ajax',
            data: {
                pmst: 'SYSTEM',
                pmkey: 'NAVFRACMODE'
            },
            success: function (result) {
                _this.num++;
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
            url: '/businessMgmt/IPOMgmtFD/IPOMgmtFundDetail/detailSelectOption.ajax',
            data: {
                pmst: 'SYSTEM',
                pmkey: 'MELONMD'
            },
            success: function (result) {
                _this.num++;
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
            url: '/businessMgmt/IPOMgmtFD/IPOMgmtFundDetail/detailSelectOption.ajax',
            data: {
                pmst: 'SYSTEM',
                pmkey: 'FUNDTP'
            },
            success: function (result) {
                _this.num++;
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
        $.post({//产品类型
            url: '/businessMgmt/IPOMgmtFD/IPOMgmtFundDetail/detailSelectOption.ajax',
            data: {
                pmst: 'SYSTEM',
                pmkey: 'INVESTTYPE'
            },
            success: function (result) {
                _this.num++;
                if (result.error === 0) {
                    console.log('产品类型', result)
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
    watch: {
        num: function (newval) {
            if (newval === 9) {
                var _this = this;
                $.post({
                    url: '/businessMgmt/IPOMgmtFD/IPOMgmtFundDetail/detailGetData.ajax',
                    data: {
                        local_id: this.getUrlParam('local_id'),
                        service_id: this.getUrlParam('service_id')
                    },
                    success: function (result) {
                        if (result.error === 0) {
                            _this.showObjData(result.data[1].fundDetail, 'fundDetail')
                            _this.showObjData(result.data[1].fundExtension, 'fundExtension')
                            _this.showObjData(result.data[1].fundInfo, 'fundInfo')
                            _this.showArrData(result.data[1].circleList, 'circleList')

                            if (result.data[0].content) {
                                _this.contrast(result.data[0].content.fundExtension, 'fundExtension')
                            }
                        } else {
                            _this.showDialog('', 'info', false, result.msg);
                        }
                    }
                });
            }
        }
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
            if (JSON.stringify(item) == '{}' || JSON.stringify(item) == 'null') {
                return;
            }
            for (var value in item) {
                if (this[key][value] !== undefined) {
                    if (item[value] == '') {
                        this[key][value] += '<span class="modify">' + '该值被清空' + '</span>'
                    } else {
                        this[key][value] += '<span class="modify">' + item[value] + '</span>'
                    }
                }
            }
        },
        showObjData: function (item, key) {
            if (JSON.stringify(item) == '{}' || JSON.stringify(item) == 'null') {
                return;
            }
            for (var value in this[key]) {
                if (item[value] !== undefined) {
                    this[key][value] = item[value]
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

