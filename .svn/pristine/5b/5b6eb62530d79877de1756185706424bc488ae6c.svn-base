new Vue({
    el: '#content',
    data: {
        //查询条件
        modelName: '',
        //主页面相关数据
        tableData: [],
        modelblockStatus: [],
        modelId: '',
        blockId: '',
        // 子模块修改时能否保存
        isSave: '',
        eventCount: 0,
        eventCount2: 0,
        //父级dialog数据
        diamodelName: '',
        diamodelDesc: '',
        diamodelKey: '',

        userId: '',
        isUpdate: false,
        isUpdate1: false,
        updateId: '',
        updateId1: '',
        updateOpen1:false,
        loadingStatus: '数据获取中...',
        diaMsg: '',
        // 子级dialog数据
        // 与或flag //与为true或为false
        logicFlag: true,
        warnData: [],
        eventData: [],
        eventForNodeIds: [],
        selectForNodeIds: [],
        dialogShow:false,
        nodeList: [],
        groupList: [],
        userDataFrom: {},
        rewardsList: [],
        msgRuleList: [],
        badgeList: [],
        cycle: 'day',
        warnCycle: 'day',
        // 布局需要数据
        layoutIdList: [],
        layoutData: [],
        selectContent: [],
        positionList: [],
        positionDetailList: [],
        linkDataInfoList: [],
        resSelect: [],
        dialayoutId: '',
        diafuncId: '',
        diafuncName: '', //暂用
        diacontentTp: '', //暂用
        diaposition: '',
        diaeventId: '',
        diablockName: '',
        diastepNumber: '',
        diablockDesc: '',
        diatriggerType: '1',
        diatargetUserDataTp: '1',
        diatriggerTargetType: '2',
        diatakeEffectType: '01',
        diatriggerTargetContent: '',
        diablockRuleDefindedBy: '1',
        // 弹窗提醒所需要的数据
        popupData: [],
        channelList: [],
        pageByChannelList: [],
        linkDataInfoList1: [],
        targetContentType: {},
        popSelect: [],
        diachannelType:'',
        diapageSceneKey:'',
        diatargetContentType:'',
        // 表达式
        // diatriggerConditionExpression:'',
        // diatriggerConditionExpression1:'',
        diauserParticipationCycle: 0,
        diaeachCycleParticipationTimes: 0,
        diauserParticipationCycle1: 0,
        diaeachCycleParticipationTimes1: 0,
        diastartTime: '',
        diaendTime: '',
        diatargetUserGroups: '',
        diatriggerCron: '',

        diacontentPositionTp: '0',
        msgScene: '', //消息场景
        // warn dialog
        warn: {
            createBy: '',
            modifyBy: '',
            targetBlockId: "",
            warnContent: "",
            warnCron: "",
            warnPhone: "",
            cronCn: ''
        },
        layoutInit: {
            contentId: '',
            contentPosition: 0,
            validateType: 0,
            validateDay: '',
            createBy: '',
            endTime: '',
            funcId: '',
            layoutId: '',
            modifyBy: '',
            position: 0,
            startTime: ''
        },
        popupInit: {
            targetContentId: '',
            contentPosition: 0,
            validateType: 0,
            validateDay: '',
            displayTimesTp:'',
            startTime: '',
            endTime: '',
            modifyBy: '',
        },
        // 推荐系统关联信息映射
        urlList: {
            index: 'res-template-market-index',
            fund: 'res-fund-recommend-config',
            advice: 'res-advice-info-config',
            funcbtn: 'res-pagefuncbtn-config',
            adImg: 'res-adv-Image',
            notice: 'res-notice-config',
            webanner: 'res-webanner-config',
            weprod: 'res-product-config',
            activity: 'res-weixin-activity-config',
            custombtn: 'res-appfuncbtn-info',
            loadpage: 'res-loadpage-config',
            fundgroup: 'res-fund-group-config',
            manager: 'res-fund-manager-config',
            wx_fund: 'res-wx-fund-config',
            wx_funcbtn: 'res-wx-funcbtn-info',
            wx_adImg: 'res-wx-adv-image',
            product: 'res-template-products',
            wx_product: 'res-wx-product',
            wap_advice: 'res-wap-adviceinfo',
            tags: 'res-template-tags-config',
            coupon: 'res-coupon-config',
            leavemsg: 'res-template-leavemsg',
            popup: 'res-template-popup',
            privilege:'res-template-privilege',
            survey:'res-template-survey'
        },
        regFlag : true,
        // 删除子块.父块数据
        deleteSubId:'',
        deleteModelId:'',
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 8,
    },
    computed: {
        pageList: function () {
            var arr = [];
            if (this.totalPage <= 2 * this.maxSpace) {
                for (var i = 0; i < this.totalPage; i++) {
                    arr.push(i + 1);
                }
                return arr;
            }
            if (this.currentIndex > this.maxSpace && this.totalPage - this.currentIndex > this.maxSpace) {
                for (var i = this.currentIndex - this.maxSpace; i < this.currentIndex + this.maxSpace; i++) {
                    arr.push(i + 1);
                }
            } else if (this.currentIndex <= this.maxSpace && this.totalPage - this.currentIndex > this.maxSpace) {
                for (var i = 0; i < this.currentIndex + (2 * this.maxSpace - this.currentIndex); i++) {
                    arr.push(i + 1);
                }
            } else if (this.currentIndex > this.maxSpace && this.totalPage - this.currentIndex <= this.maxSpace) {
                var space = this.totalPage - this.currentIndex;
                for (var i = this.currentIndex - (2 * this.maxSpace - space); i < this.totalPage; i++) {
                    arr.push(i + 1);
                }
            } else {
                for (var i = 0; i < this.totalPage; i++) {
                    arr.push(i + 1);
                }
            }
            return arr;
        },
        diatriggerConditionExpression: function () {
            // console.log('123123213');
            var str = '';
            var operator = this.logicFlag ? '&&' : '||';
            this.eventForNodeIds.forEach(function (item) {
                if (item.key1 && item.key2 && item.key3) {
                    str += operator + item.key1 + item.key2 + item.key3;
                }
                // item.isShow=false;
            })
            str = str.slice(2);
            return str;
        },
        diaexpContainedParams: function () {
            // console.log('123123213');
            var str = '';
            this.eventForNodeIds.forEach(function (item) {
                if (item.key1 && item.key2 && item.key3) {
                    str += item.key1 + ',';
                }
            })
            str = str.substring(0, str.length - 1);
            return str;
        }
    },
    watch: {
        pageMaxNum: function () {
            this.getTableData(0);
        },
        diaeventId: {
            handler(newValue, oldValue) {
                this.eventForNodeIds=[];
                var nodeIds = [];
                var eventForNodeIds = [];
                this.eventData.forEach(function (item) {
                    if (item.eventId == newValue) {
                        nodeIds = item.eventConditionParams ? (item.eventConditionParams).toString().split(',') : [];
                    }
                })

                for (var i = 0; i < nodeIds.length; i++) {
                    this.nodeList.forEach(function (item) {
                        if (item.pkey == nodeIds[i]) {
                            eventForNodeIds.push(item);
                        }
                    })
                }
                this.selectForNodeIds = eventForNodeIds;
            }
        },
        dialayoutId:{
            handler: function (newValue, oldValue){
                if(oldValue && newValue){
                    this.diaposition = '';
                    this.diafuncId = '';
                    this.layoutData = [];
                    this.resSelect = [];
                    $("#recommend").val([]).trigger('change');
                }
                this.getSubmenuList();
            }
        },
        diaposition:{
            handler: function (newValue, oldValue){
                if(oldValue && newValue){
                    this.diafuncId = '';
                    this.layoutData = [];
                    this.resSelect = [];
                    $("#recommend").val([]).trigger('change');
                }
                this.getSubmenuList();
            }
        },
        diafuncId: {
            handler: function (newValue, oldValue) {
                this.positionDetailList.forEach(function (item) {
                    if (item.FUNCMODID == newValue) {
                        this.diacontentTp = item.CONTENTTP
                    }
                }.bind(this))
            }
        },
        diacontentTp: function () {
            this.linkDataInfoList = [];
            this.resSelect = [];
            this.linkDataInfo()
        },
        modelblockStatus: function () {
            this.getTableData(this.currentIndex);
        },
        // 变更channelType查询页面
        diachannelType:{
            handler:function(newValue,oldValue){
                if(!this.updateId1){
                    this.getPageByChannel(newValue);
                }else if((this.updateId1&&this.updateOpen1)){
                    this.updateOpen1=false;
                }else if((this.updateId1&&!this.updateOpen1)){
                    this.getPageByChannel(newValue);
                }
            }
        },
        // 弹窗提醒处的contentTp
        diatargetContentType:function(){
            if(!this.isUpdate1){
                this.linkDataInfoList1 = [];
                this.popSelect = [];
                this.linkDataInfo1();
            }
        },
        diacontentPositionTp: {
            handler: function (newValue, oldValue) {
                if (this.layoutData && this.layoutData.length > 0) {
                    this.layoutData.forEach(function (item) {
                        item.contentPositionTp = newValue;
                    })
                }

            }
        }
    },
    mounted: function () {
        var _this = this;
        var dialogs = ['info','info1', 'add', 'warn','deleteSubItem','deleteModel'];
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
        // 删除数组指定index
        Array.prototype.delete = function (delIndex) {
            var temArray = [];
            for (var i = 0; i < this.length; i++) {
                if (i != delIndex) {
                    temArray.push(this[i]);
                }
            }
            return temArray;
        }
        $('#timingTime2,#warnTime2').datetimepicker({
            format: 'HH:mm', //use this option to display seconds
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
        $('#timingTime1,#warnTime1').datetimepicker({
            format: 'YYYY-MM-DD HH:mm', //use this option to display seconds
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
        $('.fuelux-wizard-container')
            .ace_wizard({
                // step: 1, //optional argument. wizard will jump to step "2" at first
                // buttons: '.wizard-actions:eq(0)'
            })
        $(".triggerType p").on('click', function () {
            if ($(this).index() == 0) {
                $(".triggerType p").eq(0).addClass('btn-info').siblings().removeClass('btn-info');
                $(".type1").show();
                $(".type2").hide();
                _this.diatriggerType = '1';
            } else {
                $(".triggerType p").eq(1).addClass('btn-info').siblings().removeClass('btn-info');
                $(".type2").show();
                $(".type1").hide();
                _this.diatriggerType = '2';
            }
        })
        $(".targetUserDataTp p").on('click', function () {
            if ($(this).index() == 0) {
                $(".targetUserDataTp p").eq(0).addClass('btn-info').siblings().removeClass('btn-info');
                $(".userType1").show();
                $(".userType2").hide();
                _this.diatargetUserDataTp = '1';
            } else {
                $(".targetUserDataTp p").eq(1).addClass('btn-info').siblings().removeClass('btn-info');
                $(".userType2").show();
                $(".userType1").hide();
                _this.diatargetUserDataTp = '2';
            }
        })
        $("input[type=radio][name=triggerType]").on('click', function () {
            // console.log('11111111')
            if ($(this).val() == 1) {
                _this.diatakeEffectType = '01',
                    $(".radioOne").show();
                $(".radioTwo").hide();
            } else {
                _this.diatakeEffectType = '02',
                    $(".radioOne").hide();
                $(".radioTwo").show();
            }
        })

        $(".viewTranslate button").on('click', function () {
            if ($(this).index() == 0) {
                $(".viewTranslate button").eq(0).addClass('btn-primary').siblings().removeClass('btn-primary')
                $(".grids").show();
                $(".lists").hide();
            } else {
                $(".viewTranslate button").eq(1).addClass('btn-primary').siblings().removeClass('btn-primary')
                $(".lists").show();
                $(".grids").hide();
            }
        })
        $(".triggerTargetType p").on('click', function () {
            if ($(this).index() == 0) {
                $(".triggerTargetType p").eq(0).addClass('btn-info').siblings().removeClass('btn-info');
                $(".targetType1").show();
                $(".targetType2").hide();
                $(".targetType3").hide();
                $(".targetType4").hide();
                $(".targetType5").hide();
                $(".targetType6").hide();
                _this.diatriggerTargetType = '2'
            } else if ($(this).index() == 1) {
                $(".triggerTargetType p").eq(1).addClass('btn-info').siblings().removeClass('btn-info');
                $(".targetType2").show();
                $(".targetType1").hide();
                $(".targetType3").hide();
                $(".targetType4").hide();
                $(".targetType5").hide();
                $(".targetType6").hide();
                _this.diatriggerTargetType = '1'
            } else if($(this).index() == 2) {
                $(".triggerTargetType p").eq(2).addClass('btn-info').siblings().removeClass('btn-info');
                $(".targetType3").show();
                $(".targetType1").hide();
                $(".targetType2").hide();
                $(".targetType4").hide();
                $(".targetType5").hide();
                $(".targetType6").hide();
                _this.diatriggerTargetType = '3'
            }else if($(this).index() == 3){
                $(".triggerTargetType p").eq(3).addClass('btn-info').siblings().removeClass('btn-info');
                $(".targetType4").show();
                $(".targetType1").hide();
                $(".targetType2").hide();
                $(".targetType3").hide();
                $(".targetType5").hide();
                $(".targetType6").hide();
                _this.diatriggerTargetType = '4'
            }else if($(this).index() == 4){
                $(".triggerTargetType p").eq(4).addClass('btn-info').siblings().removeClass('btn-info');
                $(".targetType5").show();
                $(".targetType1").hide();
                $(".targetType2").hide();
                $(".targetType3").hide();
                $(".targetType4").hide();
                $(".targetType6").hide();
                _this.diatriggerTargetType = '5'
            }else{
                $(".triggerTargetType p").eq(5).addClass('btn-info').siblings().removeClass('btn-info');
                $(".targetType6").show();
                $(".targetType1").hide();
                $(".targetType2").hide();
                $(".targetType3").hide();
                $(".targetType4").hide();
                $(".targetType5").hide();
                _this.diatriggerTargetType = '6'
            }
        })
        $('.select2').css('width', '400px').select2({
            allowClear: true
        })
        $('#msgCenter').css('width', '300px').select2({
            allowClear: true
        })
        $('#badge').css('width', '300px').select2({
            allowClear: true
        })
        $('#awardMgmt').css('width', '300px').select2({
            allowClear: true
        })
        $('#weekTime').css('width', '100px').select2({
            allowClear: true
        })
        $('#monthday').css('width', '100px').select2({
            allowClear: true
        })
        $('#warnWeekTime').css('width', '100px').select2({
            allowClear: true
        })
        $('#warnMonthday').css('width', '100px').select2({
            allowClear: true
        })
        $('#pageSceneKey').css('width', '100px').select2({
            allowClear: true
        })
        $('#pageSceneKey').on('select2:select', function (e) {
           
            // console.log($('#pageSceneKey').select2('data'));
            // _this.diapageSceneKey = e.params.data.id
        })
        $('#recommend').select2({
            allowClear: true
        })
        $('#recommend').on('select2:close', function (e) {
            _this.selectBanner();
        })
        $('#popup').select2({
            allowClear: true
        })
        $('#popup').on('select2:close', function (e) {
            _this.selectBanner1();
        })
        $('#userGroup').on('select2:close', function (e) {
            _this.diatargetUserGroups = $('#userGroup').val();
        })
        $('#targetUserDataFrom').on('select2:close', function (e) {
            _this.diatargetUserDataFrom = $('#targetUserDataFrom').val();
        })
        // $('#msgCenter').on('select2:close',function(e){
        //     _this.diatriggerTargetContent=e.params.data.id
        // })
        $('#layoutId').css('width', '200px').select2({})
        $('#layoutId').on('select2:select', function (e) {
            // console.log(e);
            _this.dialayoutId = e.params.data.id
        })
        // select2搜索框初始化重写
        $.fn.modal.Constructor.prototype.enforceFocus = function () {};
     
        // 事件list请求
        $.post({
            url: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/eventList.ajax',
            data: {
                pageNo: '1',
                pageSize: '999999'
            },
            success: function (result) {
                if (result.error === 0) {
                    _this.eventData = result.data.rows
                } else {
                    _this.eventData = [];
                }
            }
        });
        // 参数节点请求
        $.post({
            url: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/nodeList.ajax',
            data: {
                pageNo: '1',
                pageSize: '999999'
            },
            success: function (result) {
                if (result.error === 0) {
                    _this.nodeList = result.data.rows
                } else {
                    _this.nodeList = [];
                }
            }
        });
        // 客群list请求
        $.post({
            url: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/groupList.ajax',
            data: {
                pageNo: '1',
                pageSize: '999999'
            },
            success: function (result) {
                if (result.error === 0) {
                    _this.groupList = result.data;
                } else {
                    _this.groupList = [];
                }
            }
        });
        // 业务获取list请求
        $.post({
            url: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/userDataFrom.ajax',
            data: {
                pageNo: '1',
                pageSize: '999999'
            },
            success: function (result) {
                if (result.error === 0) {
                    _this.userDataFrom = result.data;
                } else {
                    _this.userDataFrom = {};
                }
            }
        });
        // 奖励系统list请求
        $.post({
            url: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/rewardsList.ajax',
            data: {
                pageNo: '1',
                pageSize: '999999'
            },
            success: function (result) {
                if (result.error === 0) {
                    // console.log(result);
                    _this.rewardsList = result.data.rows;
                } else {
                    _this.rewardsList = [];
                }
            }
        });
        // 消息中心list
        $.post({
            url: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/msgRuleList.ajax',
            data: {
                ruleSource: 'AOS'
            },
            success: function (result) {
                if (result.error === 0) {
                    // console.log(result);
                    _this.msgRuleList = result.data;
                } else {
                    _this.msgRuleList = [];
                }
            }
        });
        // 徽章list
        $.post({
            url: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/badgeList.ajax',
            data: {
                badgeSts: 'N'
            },
            success: function (result) {
                if (result.error === 0) {
                    // console.log(result);
                    _this.badgeList = result.data;
                } else {
                    _this.badgeList = [];
                }
            }
        });
        //queryLayoutID   
        $.post({
            url: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/layoutIdList.ajax',
            data: {
                pageNo: '1',
                pageSize: '999999'
            },
            success: function (result) {
                if (result.error === 0) {
                    console.log(result);
                    _this.layoutIdList = result.data;
                } else {
                    _this.layoutIdList = [];
                }
            }
        });
        //渠道列表数据请求
        $.post({
            url: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/channelList.ajax',
            success: function (result) {
                if (result.error === 0) {
                    _this.channelList = result.data.rows;
                } else {
                    _this.channelList = [];
                }
            }
        });
        // 弹窗提醒列表 contentTp数据请求
        $.post({
            url: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/queryContentTp.ajax',
            success: function (result) {
                if (result.error === 0) {
                    _this.targetContentType = result.data;
                } else {
                    _this.targetContentType = {};
                }
            }
        });
        var blockId = '';
        var modelId = '';
        var modelStatus = '';
        blockId = this.getUrlParam('blockId');
        modelId = this.getUrlParam('modelId');
        modelStatus = this.getUrlParam('modelStatus');
        if (blockId && modelId) {
            // console.log(blockId,modelId);
            $.post({
                url: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/queryModelBlock.ajax',
                data: {
                    blockId: blockId,
                    modelId: modelId
                },
                success: function (result) {
                    if (result.error === 0) {
                        console.log(result);
                        if (result.data.rows && result.data.rows.length > 0) {
                            _this.showUpdate1(result.data.rows[0], modelStatus);
                        }
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        }
        this.getTableData(0);
    },
    methods: {
        // 根据渠道type获取平台页面list
        getPageByChannel:function(id,pageSceneKey){
            var _this=this;
            var params={channelType:id};
            $.post({
                url: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/pageByChannel.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.pageByChannelList=result.data;
                        if(pageSceneKey){
                            setTimeout(function(){
                                ($("#pageSceneKey").val(pageSceneKey).trigger('change'));
                            },100)
                        }
                    } else {
                        _this.pageByChannelList = [];
                        _this.showDialog('add', 'info', true, result.msg);
                    }
                }
            });
        },
        // 与或开关切换
        andOrSwitch: function () {
            this.logicFlag = !this.logicFlag;
        },
        //list
        getTableData: function (currentIndex, pageSize) {
            var params = {};
            var _this = this;
            params.modelName = this.modelName;
            params.pageNo = currentIndex + 1;
            pageSize && (params.pageSize = pageSize);
            !pageSize && (params.pageSize = this.pageMaxNum);
            (this.modelblockStatus.length > 0) && (params.blockStatus = (this.modelblockStatus).join(','))
            console.log(params, '---modelblock---');
            _this.loadingStatus = '数据获取中...';
            $.post({
                url: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/searchModelList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.userId = result.data.userId;
                        if (result.data.rows && result.data.rows.length > 0) {
                            _this.tableData = result.data.rows;
                            _this.currentIndex = result.data.pageNum - 1;
                            _this.totalPage = result.data.pages;
                        } else {
                            _this.tableData = [];
                            _this.currentIndex = 0;
                            _this.totalPage = 0;
                            _this.loadingStatus = '没有数据';
                        }
                    } else {
                        _this.tableData = [];
                        _this.currentIndex = 0;
                        _this.totalPage = 0;
                        _this.showDialog('', 'info', false, result.msg);
                        _this.loadingStatus = '没有数据';
                    }
                }
            });
        },
        // 获取funcID  position接口
        getSubmenuList: function (callback) {
            var _this = this;
            var params = {};
            params.layoutId = this.dialayoutId;
            this.diaposition && (params.position = this.diaposition);
            $.post({
                url: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/querySubmenuList.ajax',
                data: params,
                success: function (result) {
                    console.log(result, 'submenu');
                    if (result.error === 0) {
                        !_this.diaposition && (_this.positionList = result.data[0]);
                        _this.diaposition && (_this.positionDetailList = result.data[0]);
                        // _this.contentTp = result.data[0].contentTp;
                        // _this.diafuncId = _this.positionDetailList.length > 0 ? _this.positionDetailList[0].FUNCMODID : '';
                        _this.diafuncName = _this.positionDetailList.length > 0 ? _this.positionDetailList[0].FUNCMODNAME : '';
                        // _this.diacontentTp = _this.positionDetailList.length > 0 ? _this.positionDetailList[0].CONTENTTP : ''
                        callback && callback();
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });

        },
        //获取关联数据信息
        linkDataInfo: function () {
            var _this = this;
            var params = {};
            params.urlJoin = this.urlList[this.diacontentTp];
            // params.channelId=this.channelId;
            // console.log(params.urlJoin);
            if (!params.urlJoin) {
                _this.showDialog('checkThemeContent', 'info', true, "未能查询到相应contentTp的映射关系");
                return false;
            }
            $.post({
                url: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/linkDataInfo.ajax',
                data: params,
                success: function (result) {
                    console.log(result.data.rows, 'product');
                    if (result.error === 0) {
                        if (result.data.rows.length > 0) {
                            //将关联数据信息整理统一格式由select展示
                            result.data.rows.forEach(function (item) {
                                if (_this.diacontentTp == "fund") {
                                    _this.linkDataInfoList.push({
                                        value: item.fundconfigId,
                                        name: item.fundconfigId + ':' + item.fundTitle
                                    })
                                } else if (_this.diacontentTp == "advice") {
                                    _this.linkDataInfoList.push({
                                        value: item.advconfigId,
                                        name: item.advconfigId + ':' + item.adviceTitle
                                    })
                                } else if (_this.diacontentTp == "funcbtn") {
                                    _this.linkDataInfoList.push({
                                        value: item.funcBtnId,
                                        name: item.funcBtnId + ':' + item.funcBtnName
                                    })
                                } else if (_this.diacontentTp == "adImg") {
                                    _this.linkDataInfoList.push({
                                        value: item.adImgId,
                                        name: item.remark == null ? '' : item.adImgId + ":" + item.remark
                                    })
                                } else if (_this.diacontentTp == "notice") {
                                    _this.linkDataInfoList.push({
                                        value: item.noticeId,
                                        name: item.noticeId + ':' + item.noticeValue
                                    });
                                } else if (_this.diacontentTp == "webanner") {
                                    _this.linkDataInfoList.push({
                                        value: item.weBannerId,
                                        name: item.weBannerId + ':' + item.remark
                                    });
                                } else if (_this.diacontentTp == "weprod") {
                                    _this.linkDataInfoList.push({
                                        value: item.weProdId,
                                        name: item.sceneName
                                    });
                                } else if (_this.diacontentTp == "activity") {
                                    _this.linkDataInfoList.push({
                                        value: item.id,
                                        name: item.id + ":" + item.title
                                    });

                                } else if (_this.diacontentTp == "custombtn") {
                                    _this.linkDataInfoList.push({
                                        value: item.btnId,
                                        name: item.btnName + ':' + item.btnKey
                                    });

                                } else if (_this.diacontentTp == "loadpage") {
                                    _this.linkDataInfoList.push({
                                        value: item.loadPageConfigId,
                                        name: item.remark
                                    });
                                } else if (_this.diacontentTp == "fundgroup") {
                                    _this.linkDataInfoList.push({
                                        value: item.fundGroupConfigId,
                                        name: item.fundGroupTitle
                                    });
                                } else if (_this.diacontentTp == "manager") {
                                    _this.linkDataInfoList.push({
                                        value: item.managerConfigId,
                                        name: item.managerConfigId + ":" + item.managerName
                                    });
                                } else if (_this.diacontentTp == "wx_fund") {
                                    _this.linkDataInfoList.push({
                                        value: item.fundconfigId,
                                        name: item.fundTitle
                                    });
                                } else if (_this.diacontentTp == "wx_funcbtn") {
                                    _this.linkDataInfoList.push({
                                        value: item.btnId,
                                        name: item.btnName
                                    });
                                } else if (_this.diacontentTp == "wx_adImg") {
                                    _this.linkDataInfoList.push({
                                        value: item.adImgId,
                                        name: item.adImgId + ':' + item.remark
                                    });
                                } else if (_this.diacontentTp == "wx_product") {
                                    _this.linkDataInfoList.push({
                                        value: item.prdConfigId,
                                        name: item.prdConfigId + ':' + item.prdTitle
                                    });
                                } else if (_this.diacontentTp == "index") {
                                    _this.linkDataInfoList.push({
                                        value: item.indexConfigId,
                                        name: (item.indexConfigId + ":" + item.indexName)
                                    });
                                } else if (_this.diacontentTp == "product") {
                                    _this.linkDataInfoList.push({
                                        value: item.prdConfigId,
                                        name: (item.prdConfigId + ":" + item.prdTitle + ":" + item.remark)
                                    });
                                } else if (_this.diacontentTp == "coupon") {
                                    _this.linkDataInfoList.push({
                                        value: item.couponconfigid,
                                        name: (item.couponconfigid + ":" + item.couponno)
                                    });
                                } else if (_this.diacontentTp == "tags") {
                                    _this.linkDataInfoList.push({
                                        value: item.tagConfigId,
                                        name: (item.tagConfigId + ":" + item.tagName)
                                    });
                                } else if (_this.diacontentTp == "wap_advice") {
                                    _this.linkDataInfoList.push({
                                        value: item.advconfigId,
                                        name: (item.advconfigId + ":" + item.adviceDesc)
                                    });
                                } else if (_this.diacontentTp == "leavemsg") {
                                    _this.linkDataInfoList.push({
                                        value: item.msgConfigId,
                                        name: (item.msgConfigId + ":" + item.remark)
                                    });
                                } else if (_this.diacontentTp == "popup") {
                                    _this.linkDataInfoList.push({
                                        value: item.popupConfigId,
                                        name: (item.popupConfigId + ":" + item.popTitle)
                                    });
                                }
                                else if (_this.diacontentTp == "privilege") {
                                    _this.linkDataInfoList.push({
                                        value: item.privilegeConfigId,
                                        name: (item.privilegeConfigId+":"+item.remark)
                                    });
                                }
                                else if (_this.diacontentTp == "survey") {
                                    _this.linkDataInfoList.push({
                                        value: item.surveyConfigId,
                                        name: (item.surveyConfigId+":"+item.surveyDesc)
                                    });
                                }
                            })

                            if (_this.layoutData && _this.layoutData.length > 0) {
                                for (var i = 0; i < _this.layoutData.length; i++) {
                                    // console.log(resSelect,'layout');
                                    _this.linkDataInfoList.forEach(function (iLink) {
                                        if (iLink.value == _this.layoutData[i].contentId) {
                                            _this.resSelect.push(iLink.value);
                                            _this.layoutData[i].text = iLink.name;
                                            _this.$set(_this.layoutData[i], 'text', iLink.name)
                                        }
                                    })
                                }
                            }
                            setTimeout(function () {
                                $('#recommend').val(_this.resSelect).trigger('change');
                            }, 0)

                        }
                    } else {
                        _this.linkDataInfoList = [];
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            })
        },
        //弹窗提醒获取关联数据信息
        linkDataInfo1: function () {
            var _this = this;
            var params = {};
            params.urlJoin = this.urlList[this.diatargetContentType];
            if (!params.urlJoin) {
                _this.showDialog('checkThemeContent', 'info', true, "未能查询到相应contentTp的映射关系");
                return false;
            }
            $.post({
                url: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/linkDataInfo.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        if (result.data.rows.length > 0) {
                            //将关联数据信息整理统一格式由select展示
                            result.data.rows.forEach(function (item) {
                                if (_this.diatargetContentType == "fund") {
                                    _this.linkDataInfoList1.push({
                                        value: item.fundconfigId,
                                        name: item.fundconfigId + ':' + item.fundTitle
                                    })
                                } else if (_this.diatargetContentType == "advice") {
                                    _this.linkDataInfoList1.push({
                                        value: item.advconfigId,
                                        name: item.advconfigId + ':' + item.adviceTitle
                                    })
                                } else if (_this.diatargetContentType == "funcbtn") {
                                    _this.linkDataInfoList1.push({
                                        value: item.funcBtnId,
                                        name: item.funcBtnId + ':' + item.funcBtnName
                                    })
                                } else if (_this.diatargetContentType == "adImg") {
                                    _this.linkDataInfoList1.push({
                                        value: item.adImgId,
                                        name: item.remark == null ? '' : item.adImgId + ":" + item.remark
                                    })
                                } else if (_this.diatargetContentType == "notice") {
                                    _this.linkDataInfoList1.push({
                                        value: item.noticeId,
                                        name: item.noticeId + ':' + item.noticeValue
                                    });
                                } else if (_this.diatargetContentType == "webanner") {
                                    _this.linkDataInfoList1.push({
                                        value: item.weBannerId,
                                        name: item.weBannerId + ':' + item.remark
                                    });
                                } else if (_this.diatargetContentType == "weprod") {
                                    _this.linkDataInfoList1.push({
                                        value: item.weProdId,
                                        name: item.sceneName
                                    });
                                } else if (_this.diatargetContentType == "activity") {
                                    _this.linkDataInfoList1.push({
                                        value: item.id,
                                        name: item.id + ":" + item.title
                                    });

                                } else if (_this.diatargetContentType == "custombtn") {
                                    _this.linkDataInfoList1.push({
                                        value: item.btnId,
                                        name: item.btnName + ':' + item.btnKey
                                    });

                                } else if (_this.diatargetContentType == "loadpage") {
                                    _this.linkDataInfoList1.push({
                                        value: item.loadPageConfigId,
                                        name: item.remark
                                    });
                                } else if (_this.diatargetContentType == "fundgroup") {
                                    _this.linkDataInfoList1.push({
                                        value: item.fundGroupConfigId,
                                        name: item.fundGroupTitle
                                    });
                                } else if (_this.diatargetContentType == "manager") {
                                    _this.linkDataInfoList1.push({
                                        value: item.managerConfigId,
                                        name: item.managerConfigId + ":" + item.managerName
                                    });
                                } else if (_this.diatargetContentType == "wx_fund") {
                                    _this.linkDataInfoList1.push({
                                        value: item.fundconfigId,
                                        name: item.fundTitle
                                    });
                                } else if (_this.diatargetContentType == "wx_funcbtn") {
                                    _this.linkDataInfoList1.push({
                                        value: item.btnId,
                                        name: item.btnName
                                    });
                                } else if (_this.diatargetContentType == "wx_adImg") {
                                    _this.linkDataInfoList1.push({
                                        value: item.adImgId,
                                        name: item.adImgId + ':' + item.remark
                                    });
                                } else if (_this.diatargetContentType == "wx_product") {
                                    _this.linkDataInfoList1.push({
                                        value: item.prdConfigId,
                                        name: item.prdConfigId + ':' + item.prdTitle
                                    });
                                } else if (_this.diatargetContentType == "index") {
                                    _this.linkDataInfoList1.push({
                                        value: item.indexConfigId,
                                        name: (item.indexConfigId + ":" + item.indexName)
                                    });
                                } else if (_this.diatargetContentType == "product") {
                                    _this.linkDataInfoList1.push({
                                        value: item.prdConfigId,
                                        name: (item.prdConfigId + ":" + item.prdTitle + ":" + item.remark)
                                    });
                                } else if (_this.diatargetContentType == "coupon") {
                                    _this.linkDataInfoList1.push({
                                        value: item.couponconfigid,
                                        name: (item.couponconfigid + ":" + item.couponno)
                                    });
                                } else if (_this.diatargetContentType == "tags") {
                                    _this.linkDataInfoList1.push({
                                        value: item.tagConfigId,
                                        name: (item.tagConfigId + ":" + item.tagName)
                                    });
                                } else if (_this.diatargetContentType == "wap_advice") {
                                    _this.linkDataInfoList1.push({
                                        value: item.advconfigId,
                                        name: (item.advconfigId + ":" + item.adviceDesc)
                                    });
                                } else if (_this.diatargetContentType == "leavemsg") {
                                    _this.linkDataInfoList1.push({
                                        value: item.msgConfigId,
                                        name: (item.msgConfigId + ":" + item.remark)
                                    });
                                } else if (_this.diatargetContentType == "popup") {
                                    _this.linkDataInfoList1.push({
                                        value: item.popupConfigId,
                                        name: (item.popupConfigId + ":" + item.popTitle)
                                    });
                                }
                                else if (_this.diatargetContentType == "privilege") {
                                    _this.linkDataInfoList1.push({
                                        value: item.privilegeConfigId,
                                        name: (item.privilegeConfigId+":"+item.remark)
                                    });
                                }
                                else if (_this.diatargetContentType == "survey") {
                                    _this.linkDataInfoList1.push({
                                        value: item.surveyConfigId,
                                        name: (item.surveyConfigId+":"+item.surveyDesc)
                                    });
                                }
                            })
                            if (_this.popupData && _this.popupData.length > 0) {
                                for (var i = 0; i < _this.popupData.length; i++) {
                                    // console.log(resSelect,'layout');
                                    _this.linkDataInfoList1.forEach(function (iLink) {
                                        if (iLink.value == _this.popupData[i].targetContentId) {
                                            _this.popSelect.push(iLink.value);
                                            _this.popupData[i].text = iLink.name;
                                            _this.$set(_this.popupData[i], 'text', iLink.name)
                                        }
                                    })
                                }
                            }
                            setTimeout(function () {
                                $('#popup').val(_this.popSelect).trigger('change');
                            }, 0)

                        }
                    } else {
                        _this.linkDataInfoList1 = [];
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            })
        },
        // 获取warningList
        getwarnList: function (blockId) {
            var _this = this;
            $.post({
                url: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/warnList.ajax',
                data: {
                    targetBlockId: blockId
                },
                success: function (result) {
                    if (result.error === 0) {
                        // console.log(result);
                        _this.warnData = result.data.rows;
                    } else {
                        _this.warnData = [];
                    }
                }
            });
        },
        // 获取布局信息
        getResList: function (item) {
            var _this = this;
            var items = item.split(',');
            $.post({
                url: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/resList.ajax',
                data: {
                    ids: JSON.stringify(items)
                },
                success: function (result) {
                    if (result.error === 0 && result.data.length>0) {
                        console.log(result, 'res');
                        _this.layoutData = result.data;

                        $("#layoutId").val(result.data[0].layoutId ? result.data[0].layoutId : '').trigger('change');
                        _this.dialayoutId = result.data[0].layoutId;
                        _this.getSubmenuList(function () {
                            _this.diaposition = result.data[0].position;
                        });

                        setTimeout(function () {
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
                            var selectList = [];
                            _this.layoutData.forEach(function (item, index) {
                                $('#layStartTime' + index).val(item.startTime);
                                $('#layEndTime' + index).val(item.endTime);
                                selectList.push(item.contentId)
                            })
                            $('#recommend').val(selectList).trigger('change');
                            _this.diacontentPositionTp = _this.layoutData[0].contentPositionTp ? _this.layoutData[0].contentPositionTp : '';
                            _this.diafuncId = _this.layoutData[0].funcId ? _this.layoutData[0].funcId : '';
                            _this.diacontentTp = _this.layoutData[0].themeContentType ? _this.layoutData[0].themeContentType : '';
                            if (_this.layoutData && _this.layoutData.length > 0) {
                                for (var i = 0; i < _this.layoutData.length; i++) {
                                    // console.log(resSelect,'layout');
                                    _this.linkDataInfoList.forEach(function (iLink) {
                                        if (iLink.value == _this.layoutData[i].contentId) {
                                            _this.resSelect.push(iLink.value);
                                            _this.layoutData[i].text = iLink.name;
                                            _this.$set(_this.layoutData[i], 'text', iLink.name)
                                        }
                                    })
                                }
                            }
                        }, 10)
                    } else {
                        _this.layoutData = [];
                    }
                }
            });
        },
        // 获取弹窗提醒信息
        getPopList: function (item) {
            var _this = this;
            var items = item.split(',');
            console.log(item);
            $.post({
                url: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/popList.ajax',
                data: {
                    ids: JSON.stringify(items)
                },
                success: function (result) {
                    if (result.error === 0) {
                        console.log(result, 'popupData');
                        _this.popupData = result.data;
                        if(result.data.length>0){
                            _this.diachannelType=result.data[0].channelType;
                            _this.diapageSceneKey=result.data[0].pageSceneKey;
                            _this.diatargetContentType=result.data[0].targetContentType;
                            _this.linkDataInfo1();
                            var pageSceneKey=_this.diapageSceneKey.split(',');
                            _this.getPageByChannel( _this.diachannelType,pageSceneKey);
                        }
                        setTimeout(function () {
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
                            console.log(_this.diapageSceneKey);
                            // var selectList = [];
                            _this.popupData.forEach(function (item, index) {
                                $('#popStartTime' + index).val(item.startTime);
                                $('#popEndTime' + index).val(item.endTime);
                                // selectList.push(item.targetContentId)
                            })
                            // $('#popup').val(selectList).trigger('change');
                            if (_this.popupData && _this.popupData.length > 0) {
                                for (var i = 0; i < _this.popupData.length; i++) {
                                    _this.linkDataInfoList1.forEach(function (iLink) {
                                        if (iLink.value == _this.popupData[i].targetContentId) {
                                            _this.popSelect.push(iLink.value);
                                            _this.popupData[i].text = iLink.name;
                                            _this.$set(_this.popupData[i], 'text', iLink.name)
                                        }
                                    })
                                }
                            }
                        }, 10)
                    } else {
                        _this.popupData = [];
                    }
                }
            });
        },
        // 获取block下的eventId
        getEventConfig: function (item) {
            var _this = this;
            $.post({
                url: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/getEventConfig.ajax',
                data: {
                    blockId: item
                },
                success: function (result) {
                    if (result.error === 0 && result.data.length>0) {
                        console.log(result, 'events');
                        _this.diaeventId = result.data[0].eventId ? result.data[0].eventId : '';
                        var arr = null;
                        if (result.data[0].triggerConditionExpression && (result.data[0].triggerConditionExpression.indexOf('||') != -1)) {
                            arr = result.data[0].triggerConditionExpression ? result.data[0].triggerConditionExpression.split('||') : [];
                            _this.logicFlag = false;
                        } else {
                            arr = result.data[0].triggerConditionExpression ? result.data[0].triggerConditionExpression.split('&&') : [];
                            _this.logicFlag = true;
                        }
                        console.log(arr);
                        var eventForNodeIds = [];
                        arr.forEach(function (item) {
                            // console.log(item,'item');
                            if (item.indexOf('==') != -1) {
                                console.log(item.split('==')[0], ',0--');
                                console.log(item.split('==')[1], ',1--');
                                eventForNodeIds.push({
                                    key1: item.split('==')[0],
                                    key2: '==',
                                    key3: item.split('==')[1],
                                })
                            } else if (item.indexOf('>') != -1 && item.indexOf('>=') == -1) {
                                eventForNodeIds.push({
                                    key1: item.split('>')[0],
                                    key2: '>',
                                    key3: item.split('>')[1],
                                })
                            } else if (item.indexOf('<') != -1 && item.indexOf('<=') == -1) {
                                eventForNodeIds.push({
                                    key1: item.split('<')[0],
                                    key2: '<',
                                    key3: item.split('<')[1],
                                })
                            } else if (item.indexOf('>=') != -1) {
                                eventForNodeIds.push({
                                    key1: item.split('>=')[0],
                                    key2: '>=',
                                    key3: item.split('>=')[1],
                                })
                            } else if (item.indexOf('<=') != -1) {
                                eventForNodeIds.push({
                                    key1: item.split('<=')[0],
                                    key2: '<=',
                                    key3: item.split('<=')[1],
                                })
                            } else if (item.indexOf('!=') != -1) {
                                eventForNodeIds.push({
                                    key1: item.split('!=')[0],
                                    key2: '!=',
                                    key3: item.split('!=')[1],
                                })
                            }
                        })
                        setTimeout(()=>{
                            _this.eventForNodeIds = eventForNodeIds;
                        },0)
                    } else {
                        // _this.layoutData=[];
                        _this.diaeventId = '';
                    }
                }
            });
        },

        //新增活动配置
        setAddData: function (obj) {
            this.diamodelName = obj.modelName ? obj.modelName : '';
            this.diamodelDesc = obj.modelDesc ? obj.modelDesc : '';
            this.diamodelKey = obj.modelKey ? obj.modelKey : '';
            $("#startTime").val(obj.startTime ? ((obj.startTime).toString().slice(0, 10)) : '');
            $("#endTime").val(obj.endTime ? ((obj.endTime).toString().slice(0, 10)) : '');
        },
        showAdd: function () {
            this.isUpdate = false;
            this.updateId = '';
            this.setAddData({});
            this.showDialog('', 'add');
        },
        showUpdate: function (item) {
            this.isUpdate = true;
            this.updateId = item.modelId;
            this.setAddData(item);
            this.showDialog('', 'add');
        },
        add: function () {
            var _this = this;
            var params = {};
            params.modelName = this.diamodelName;
            params.modelDesc = this.diamodelDesc;
            params.modelKey = this.diamodelKey;
            params.startTime = $("#startTime").val();
            params.endTime = $("#endTime").val();
            this.isUpdate && (params.modelId = this.updateId) && (params.modifyBy = this.userId);
            !this.isUpdate && (params.createBy = this.userId);
            var url = '/automatedOperation/operatePlanMgmt/operatePlanMgmt/';
            url += this.isUpdate ? 'update.ajax' : 'add.ajax';
            $.post({
                url: url,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(_this.currentIndex);
                    }
                    _this.showDialog('add', 'info', false, result.msg);
                }
            });
        },

        //新增子计划配置
        setAddData1: function (obj) {

            this.diablockName = obj.blockName ? obj.blockName : '';
            this.diastepNumber = obj.stepNumber ? obj.stepNumber : '';
            this.diablockDesc = obj.blockDesc ? obj.blockDesc : '';
            this.diatriggerType = obj.triggerType ? obj.triggerType : '1';
            this.diatargetUserDataTp = obj.targetUserDataTp ? obj.targetUserDataTp : '1';
            // 触发型字段
            this.diaeventId = obj.eventId ? obj.eventId : '';
            this.diablockRuleDefindedBy = obj.blockRuleDefindedBy ? obj.blockRuleDefindedBy : '1';
            // this.diatriggerConditionExpression = obj.triggerConditionExpression ? obj.triggerConditionExpression : '';  表达式在修改时配置
            this.diauserParticipationCycle = obj.userParticipationCycle ? obj.userParticipationCycle : '';
            this.diaeachCycleParticipationTimes = obj.eachCycleParticipationTimes ? obj.eachCycleParticipationTimes : '';
            this.diauserParticipationCycle1 = obj.userParticipationCycle ? obj.userParticipationCycle : '';
            this.diaeachCycleParticipationTimes1 = obj.eachCycleParticipationTimes ? obj.eachCycleParticipationTimes : '';
            $("#triggerTime1").val(obj.startTime ? ((obj.startTime).toString().slice(0, 10)) : '');
            $("#triggerTime2").val(obj.endTime ? ((obj.endTime).toString().slice(0, 10)) : '');
            // 定时型字段
            this.diatakeEffectType = obj.takeEffectType ? obj.takeEffectType : '01';
            this.diatriggerCron = obj.triggerCron ? obj.triggerCron : '';
            $("#timingTime3").val(obj.startTime ? ((obj.startTime).toString().slice(0, 10)) : '');
            $("#timingTime4").val(obj.endTime ? ((obj.endTime).toString().slice(0, 10)) : '');
            // 受众用户
            $("#userGroup").val(obj.targetUserGroups ? obj.targetUserGroups.split(',') : []).trigger('change');
            $("#targetUserDataFrom").val(obj.targetUserDataFrom ? obj.targetUserDataFrom.split(',') : []).trigger('change');
            // 触达配置
            this.diatriggerTargetType = obj.triggerTargetType ? obj.triggerTargetType : '2';
            // 消息0  //奖励
            this.diatriggerTargetContent = obj.triggerTargetContent ? obj.triggerTargetContent : '';
            $("#awardMgmt").val(obj.triggerTargetContent ? obj.triggerTargetContent : '').trigger('change');
            $("#msgCenter").val(obj.triggerTargetContent ? obj.triggerTargetContent : '').trigger('change');
            $("#badge").val(obj.triggerTargetContent ? obj.triggerTargetContent : '').trigger('change');
            // 

            // 布局   
            // this.layoutData = obj.aosResConfigs ? obj.aosResConfigs : [];
            // $("#recommend").val(obj.targetUserGroups?obj.targetUserGroups.split(','):[]).trigger('change');
            $("#layoutId").val(obj.layoutId ? obj.layoutId : '').trigger('change');
            this.diaposition = obj.position ? obj.position : '';
            this.diafuncName = '';
            // 
            // $("#timingTime1").val(obj.triggerCron ? obj.triggerCron : '');
            // 弹窗提醒
            // this.diachannelType = obj.channelType ? obj.channelType : '';
            // this.diatargetContentType = obj.diatargetContentType ? obj.diatargetContentType : '';
            // $("#pageSceneKey").val(obj.pageSceneKey ? obj.pageSceneKey : '').trigger('change');
        },
        showAdd1: function (item) {
            // 重置与或条件
            this.eventForNodeIds = [];
            this.logicFlag = true;
            this.regFlag = true;
            //显示隐藏
            this.isSave = '1';
            $(".triggerType p").eq(0).addClass('btn-info').siblings().removeClass('btn-info')
            $(".type1").show();
            $(".type2").hide();
            $(".targetUserDataTp p").eq(0).addClass('btn-info').siblings().removeClass('btn-info')
            $(".userType1").show();
            $(".userType2").hide();
            this.diatakeEffectType = '01',
            $(".radioOne").show();
            $(".radioTwo").hide();
            this.triggerTargetType = '2',
            $(".triggerTargetType p").eq(0).addClass('btn-info').siblings().removeClass('btn-info')
            $(".targetType1").show();
            $(".targetType2").hide();
            $(".targetType3").hide();
            $(".targetType4").hide();
            $(".targetType5").hide();
            $(".targetType6").hide();
            // cron表达式选框赋值清空
            this.cycle = 'day';
            $("#timingTime1").val('');
            $("#timingTime2").val('');
            $('#weekTime').val([]).trigger('change');
            $('#monthday').val([]).trigger('change');
            $("#recommend").val([]).trigger('change');
            $("#popup").val([]).trigger('change');
            this.warnData = [];
            this.layoutData = [];
            this.popupData = [];
            this.diafuncId = '';
            this.diaposition = '';
            this.dialayoutId = '';
            this.modelId = item.modelId;
            this.isUpdate1 = false;
            this.updateId1 = '';
            this.diachannelType = '1';
            this.diatargetContentType = '';
            this.diapageSceneKey = '';
            this.msgScene = '';
            $("#pageSceneKey").val([]).trigger('change');
            this.setAddData1({});
            this.showDialog('', 'createBlockView');
        },
        showUpdate1: function (item, modelStatus) {
            console.log(item,'updateitem');
            this.eventForNodeIds = [];
            this.logicFlag = true;
            this.regFlag = true;
            this.updateOpen1=true;
            // $('#recommend').val(this.resSelect).trigger('change');
            this.cycle = 'day';
            this.isSave = '';
            this.isSave = modelStatus;
            this.resSelect = [];
            this.popSelect = [];
            this.linkDataInfoList = [];
            this.linkDataInfoList1 = [];
            this.diafuncId = '';
            this.diaposition = '';
            this.dialayoutId = '';
            this.warnData = [];
            this.layoutData = [];
            this.msgScene = '';
            $("#timingTime1").val('');
            $("#timingTime2").val('');
            $('#weekTime').val([]).trigger('change');
            $('#monthday').val([]).trigger('change');
            $("#recommend").val([]).trigger('change');
            $("#popup").val([]).trigger('change');
            
            this.linkDataInfo();
            
            this.modelId = item.modelId;
            this.getEventConfig(item.blockId);
            if (item.triggerType == '1') {
                $(".triggerType p").eq(0).addClass('btn-info').siblings().removeClass('btn-info')
                $(".type1").show();
                $(".type2").hide();

            } else {
                $(".triggerType p").eq(1).addClass('btn-info').siblings().removeClass('btn-info')
                $(".type2").show();
                $(".type1").hide();
                this.getwarnList(item.blockId);
                // this.getEventConfig(item.blockId);
            }
            if (item.targetUserDataTp == '1') {
                $(".targetUserDataTp p").eq(0).addClass('btn-info').siblings().removeClass('btn-info')
                $(".userType1").show();
                $(".userType2").hide();

            } else {
                $(".targetUserDataTp p").eq(1).addClass('btn-info').siblings().removeClass('btn-info')
                $(".userType2").show();
                $(".userType1").hide();
            }
            this.diatakeEffectType = item.takeEffectType;
            if (item.takeEffectType == '01') {
                $(".radioOne").show();
                $(".radioTwo").hide();
                item.triggerCron && ($('#timingTime1').val(this.translateCronToDate(item.triggerCron).result))
            } else {
                $(".radioOne").hide();
                $(".radioTwo").show();
                item.triggerCron && (this.cycle = this.translateCronToDate(item.triggerCron).cycle)
                item.triggerCron && ($("#weekTime").val(this.translateCronToDate(item.triggerCron).weekTime).trigger('change'))
                item.triggerCron && ($("#monthday").val(this.translateCronToDate(item.triggerCron).monthday).trigger('change'))
                item.triggerCron && ($("#timingTime2").val(this.translateCronToDate(item.triggerCron).result).trigger('change'))
            }
            if (item.triggerTargetType == '2') {
                $(".triggerTargetType p").eq(0).addClass('btn-info').siblings().removeClass('btn-info')
                $(".targetType1").show();
                $(".targetType2").hide();
                $(".targetType3").hide();
                $(".targetType4").hide();
                $(".targetType5").hide();
                $(".targetType6").hide();
            } else if (item.triggerTargetType == '1') {
                $(".triggerTargetType p").eq(1).addClass('btn-info').siblings().removeClass('btn-info')
                $(".targetType2").show();
                $(".targetType1").hide();
                $(".targetType3").hide();
                $(".targetType4").hide();
                $(".targetType5").hide();
                $(".targetType6").hide();
            }
            else if (item.triggerTargetType == '4') {
                $(".triggerTargetType p").eq(3).addClass('btn-info').siblings().removeClass('btn-info')
                $(".targetType4").show();
                $(".targetType2").hide();
                $(".targetType1").hide();
                $(".targetType3").hide();
                $(".targetType5").hide();
                $(".targetType6").hide();
            }
            else if(item.triggerTargetType == '3'){
                $(".triggerTargetType p").eq(2).addClass('btn-info').siblings().removeClass('btn-info')
                $(".targetType3").show();
                $(".targetType1").hide();
                $(".targetType2").hide();
                $(".targetType4").hide();
                $(".targetType5").hide();
                $(".targetType6").hide();
            }else if(item.triggerTargetType == '5'){
                $(".triggerTargetType p").eq(4).addClass('btn-info').siblings().removeClass('btn-info')
                $(".targetType5").show();
                $(".targetType1").hide();
                $(".targetType2").hide();
                $(".targetType4").hide();
                $(".targetType3").hide();
                $(".targetType6").hide();
            }else{
                $(".triggerTargetType p").eq(5).addClass('btn-info').siblings().removeClass('btn-info')
                $(".targetType6").show();
                $(".targetType1").hide();
                $(".targetType2").hide();
                $(".targetType4").hide();
                $(".targetType3").hide();
                $(".targetType5").hide();
            }
            if (item.triggerTargetType == '1') {
                this.getResList(item.triggerTargetContent);
            }else if(item.triggerTargetType == '4'){
                this.getPopList(item.triggerTargetContent);
            }else if(item.triggerTargetType == '5'){
                this.msgScene = item.triggerTargetContent; 
            }
            this.blockId = item.blockId;
            // this.diatriggerConditionExpression = obj.triggerConditionExpression ? obj.triggerConditionExpression : '';
            this.isUpdate1 = true;
            this.updateId1 = item.blockId;
            this.setAddData1(item);
            this.showDialog('', 'createBlockView');
        },
        add1: function () {
            if (!this.diablockName) {
                this.showDialog('createBlockView', 'info', true, '任务名称必填');
                return;
            }
            if (!this.diastepNumber) {
                this.showDialog('createBlockView', 'info', true, '展示位置必填');
                return;
            }
            if (!this.msgScene && this.diatriggerTargetType == '5') {
                this.showDialog('createBlockView', 'info', true, '消息场景必填');
                return;
            }
            if (this.diatakeEffectType == '01') {
                this.diatriggerCron = this.translateDateToCron({
                    triggerType: 1,
                    timingTime: $("#timingTime1").val()
                });
                // 入参格式: {triggerType,timingTime,cycle,weekTime,monthday}
            } else {
                this.diatriggerCron = this.translateDateToCron({
                    triggerType: 2,
                    timingTime: $("#timingTime2").val(),
                    cycle: this.cycle,
                    weekTime: $('#weekTime').val(),
                    monthday: $('#monthday').val()
                });
            }
            if(this.eventForNodeIds&&this.eventForNodeIds.length>0){
                var reg = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/g;
                for(item of this.eventForNodeIds){
                    if(reg.test(item.key3)&&this.regFlag){
                        return this.showDialog('createBlockView','info1',true,'触发事件条件中存在中文字符：'+item.key3+',请确认');
                    }
                }
            }
            var _this = this;
            var params = {};
            params.modelId = this.modelId;
            params.blockDesc = this.diablockDesc;
            params.blockName = this.diablockName;
            params.stepNumber = this.diastepNumber;
            params.modelId = this.modelId;
            params.triggerType = this.diatriggerType;
            if (this.diatriggerType == '1') {
                params.eventId = this.diaeventId;
                params.triggerConditionExpression = this.diatriggerConditionExpression;
                params.expContainedParams = this.diaexpContainedParams;
                params.blockRuleDefindedBy = this.diablockRuleDefindedBy;
                params.userParticipationCycle = this.diauserParticipationCycle;
                params.eachCycleParticipationTimes = this.diaeachCycleParticipationTimes;
                params.startTime = $("#triggerTime1").val();
                params.endTime = $("#triggerTime2").val();
                params.takeEffectType = '00';
            } else {
                params.eventId = this.diaeventId;
                params.triggerConditionExpression = this.diatriggerConditionExpression;
                params.expContainedParams = this.diaexpContainedParams;
                params.blockRuleDefindedBy = this.diablockRuleDefindedBy;
                params.takeEffectType = this.diatakeEffectType;
                params.userParticipationCycle = this.diauserParticipationCycle1;
                params.eachCycleParticipationTimes = this.diaeachCycleParticipationTimes1;
                if (this.diatakeEffectType == '01') {
                    params.triggerCron = this.diatriggerCron;
                } else {
                    params.triggerCron = this.diatriggerCron;
                    params.startTime = $("#timingTime3").val();
                    params.endTime = $("#timingTime4").val();
                }
                params.aosBlockWarnConfigs = this.warnData;
            }
            params.targetUserDataTp = this.diatargetUserDataTp;
            if (this.diatargetUserDataTp == '1') {
                params.targetUserGroups =$("#userGroup").val()? $("#userGroup").val().join(','):'';
            }else{
                params.targetUserDataFrom =$("#targetUserDataFrom").val()? $("#targetUserDataFrom").val().join(','):'';
            }
           

            params.triggerTargetType = this.diatriggerTargetType;
            if (this.diatriggerTargetType == '2') {
                params.triggerTargetContent = $("#msgCenter").val();
            }
            else if(this.diatriggerTargetType == '6'){
                params.triggerTargetContent = $("#badge").val();
            } 
            else if (this.diatriggerTargetType == '1') {
                if (this.layoutData && this.layoutData.length > 0) {
                    this.layoutData.forEach(function (item, index) {
                        if (item.validateType == '0') {
                            item.startTime = $('#layStartTime' + index).val();
                            item.endTime = $('#layEndTime' + index).val();
                            delete item.validateDay;
                        } else if (item.validateType == '1'||item.validateType == '2') {
                            delete item.startTime;
                            delete item.endTime;
                        }
                    })
                }
                params.aosResConfigs = JSON.stringify(this.layoutData);
            } else if (this.diatriggerTargetType == '4') {
                if (this.popupData && this.popupData.length > 0) {
                    this.popupData.forEach(function (item, index) {
                        if (item.validateType == '0') {
                            item.startTime = $('#popStartTime' + index).val();
                            item.endTime = $('#popEndTime' + index).val();
                            delete item.validateDay;
                        } else if (item.validateType == '1'||item.validateType == '2') {
                            delete item.startTime;
                            delete item.endTime;
                        }
                    })
                }
                params.aosTriggerPopupNoticesConfigs = JSON.stringify(this.popupData);
                params.channelType=this.diachannelType;
                _this.diapageSceneKey=[];
                $('#pageSceneKey').select2('data').forEach(function (item) {  
                    _this.diapageSceneKey.push(item.id);
                })
                params.pageSceneKey=Object.prototype.toString.call(this.diapageSceneKey)== '[object Array]'?this.diapageSceneKey.join(','):this.diapageSceneKey;
                params.targetContentType=this.diatargetContentType;
            }
            else if(this.diatriggerTargetType == '5'){
                params.triggerTargetContent = this.msgScene;
            } 
            else {
                params.triggerTargetContent = $("#awardMgmt").val();
            }
            params.blockStatus = '0';
            this.isUpdate1 && (params.blockId = this.updateId1) && (params.modifyBy = this.userId) && (params.modelId = this.modelId);
            !this.isUpdate1 && (params.createBy = this.userId);
            console.log(params, 'for first req');
            var url = '/automatedOperation/operatePlanMgmt/operatePlanMgmt/';
            url += this.isUpdate1 ? 'update1.ajax' : 'add1.ajax';
            $.post({
                url: url,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(_this.currentIndex);
                    }
                    _this.showDialog('createBlockView', 'info', false, result.msg);
                }
            });
        },
        // 模型发布  
        releaseModel: function (item) {
            var _this = this;
            $.post({
                url: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/release.ajax',
                data: {
                    modelId: item.modelId
                },
                success: function (result) {
                    console.log(result);
                    if (result.error === 0) {
                        _this.getTableData(_this.currentIndex);
                    }
                    _this.showDialog('', 'info', false, result.msg);
                }
            });
        },
        // 模型下线
        offline: function (item) {
            var _this = this;
            $.post({
                url: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/offline.ajax',
                data: {
                    modelId: item.modelId
                },
                success: function (result) {
                    console.log(result);
                    if (result.error === 0) {
                        _this.getTableData(_this.currentIndex);
                    }
                    _this.showDialog('', 'info', false, result.msg);
                }
            });
        },
        // 新增warn
        addWarn: function () {
            this.warn = {
                    createBy: this.userId,
                    modifyBy: this.userId,
                    warnContent: "",
                    warnCron: "",
                    warnPhone: ""
                },
                // this.warnTime1 = '';
                this.warnCycle = 'day';
            $("#warnTime2").val('');
            $("#warnTime1").val('');
            $("#warnWeekTime").val([]).trigger('change');
            $("#warnMonthday").val([]).trigger('change');
            // console.log(this.warn);
            setTimeout(function () {
                $('#warnWeekTime').css('width', '100px').select2({
                    allowClear: true
                })
                $('#warnMonthday').css('width', '100px').select2({
                    allowClear: true
                })
            }, 0)
            this.showDialog('createBlockView', 'warn', true);
        },
        addWarnData: function () {
            var cycleType = this.warnCycle == 'day' ? '每天' : this.warnCycle == 'week' ? '每周' : '每月';
            var week = '';
            var month = '';
            if ($("#warnWeekTime").val() && $("#warnWeekTime").val().length > 0) {
                week = $("#warnWeekTime").val().join(',');
            } else {
                week = ''
            }
            if ($("#warnMonthday").val() && $("#warnMonthday").val().length > 0) {
                month = $("#warnMonthday").val().join(',');
            } else {
                month = ''
            }
            var hours = $("#warnTime2").val();
            var once = $('#warnTime1').val();
            if (this.diatakeEffectType == '02') {
                this.warn.cronCn = cycleType + week + month + '的' + hours;
                this.warn.warnCron = this.translateDateToCron({
                    triggerType: 2,
                    timingTime: $("#warnTime2").val(),
                    cycle: this.warnCycle,
                    weekTime: $('#warnWeekTime').val(),
                    monthday: $('#warnMonthday').val()
                });
            } else {
                this.warn.cronCn = once;
                this.warn.warnCron = this.translateDateToCron({
                    triggerType: 1,
                    timingTime: $("#warnTime1").val()
                });
            }
            this.warnData.push(this.warn);
        },
        warnModify: function (item, index) {
            this.showDialog('createBlockView', 'warn', true);
            var warnCronData = this.translateCronToDate(item.warnCron);
            console.log(warnCronData, 'warnCronData');
            // return;
            if (warnCronData.triggerType == '1') {
                $("#warnTime1").val(warnCronData.result);
            } else {
                this.warnCycle = warnCronData.cycle;
                if (this.warnCycle == 'week') {
                    $('#warnWeekTime').val(warnCronData.weekTime).trigger('change');
                } else if (this.warnCycle == 'month') {
                    $('#warnMonthday').val(warnCronData.monthday).trigger('change');
                }
                $("#warnTime2").val(warnCronData.result);
            }
            this.warn = {
                    createBy: this.userId,
                    modifyBy: this.userId,
                    // targetBlockId: "",
                    warnContent: item.warnContent,
                    warnCron: item.warnCron,
                    warnPhone: item.warnPhone,
                    cronCn: item.cronCn
                },


                this.warnData.splice(index, 1);
        },
        warnDelete: function (index) {
            this.warnData.splice(index, 1);
        },
        cronCnTranslate: function (cronStr) {
            var cronStrData = this.translateCronToDate(cronStr);
            var str = '';
            var day = cronStrData.cycle == 'day' ? '每天' : cronStrData.cycle == 'week' ? '每周' : '每月';
            var week = cronStrData.weekTime ? cronStrData.weekTime.join(',') : '';
            var month = cronStrData.monthday ? cronStrData.monthday.join(',') : '';
            var hours = cronStrData.result;
            str = day + week + month + '的' + hours;
            return str;
        },
        removeChild:function(index){
            this.eventForNodeIds.splice(index,1);
        },
        // 跳转
        jumpOtherPage: function (item, blockItem, modelStatus) {
            console.log(blockItem);
            var url = null;
            item == 'msg' && (url = '/messageCenter/ruleMgmt/ruleMgmt.html?openNewDialog="1"');
            if (item == 'banner') {
                var contentTp;
                this.diacontentTp&&(!this.diatargetContentType)&&(contentTp=this.diacontentTp);
                this.diatargetContentType&&(!this.diacontentTp)&&(contentTp=this.diatargetContentType);
                switch (contentTp) {
                    case 'adImg':
                        url = '/recommendSystem/recommendSystemTemplateConfig/imgAdContentConfig.html?openNewDialog="1"';
                        break;
                    case 'index':
                        url = '/recommendSystem/recommendSystemTemplateConfig/thermalIndexConfig.html?openNewDialog="1"';
                        break;
                    case 'fund':
                        url = '/recommendSystem/recommendSystemTemplateConfig/fundRecommendContentConfig.html?openNewDialog="1"';
                        break;
                    case 'advice':
                        url = '/recommendSystem/recommendSystemTemplateConfig/informationContentConfig.html?openNewDialog="1"';
                        break;
                    case 'funcbtn':
                        url = '/recommendSystem/recommendSystemTemplateConfig/homePgButtonConfig.html?openNewDialog="1"';
                        break;
                    case 'notice':
                        url = '/recommendSystem/recommendSystemTemplateConfig/informTemplateConfig.html?openNewDialog="1"';
                        break;
                    case 'webanner':
                        url = '/recommendSystem/recommendSystemTemplateConfig/appletImgRecommend.html?openNewDialog="1"';
                        break;
                    case 'weprod':
                        url = '/recommendSystem/recommendSystemTemplateConfig/appletProductRecommend.html?openNewDialog="1"';
                        break;
                    case 'activity':
                        url = '/recommendSystem/recommendSystemTemplateConfig/wxActivityConfig.html?openNewDialog="1"';
                        break;
                    case 'custombtn':
                        url = '/recommendSystem/recommendSystemTemplateConfig/AppBaseConfig.html?openNewDialog="1"';
                        break;
                    case 'loadpage':
                        url = '/recommendSystem/recommendSystemTemplateConfig/loadPageConfigMgmt.html?openNewDialog="1"';
                        break;
                    case 'fundgroup':
                        url = '/recommendSystem/recommendSystemTemplateConfig/combineContentConfig.html?openNewDialog="1"';
                        break;
                    case 'manager':
                        url = '/recommendSystem/recommendSystemTemplateConfig/fundManagerContentConfig.html?openNewDialog="1"';
                        break;
                    case 'wx_fund':
                        url = '/recommendSystem/recommendSystemTemplateConfig/wxFundRecommend.html?openNewDialog="1"';
                        break;
                    case 'wx_funcbtn':
                        url = '/recommendSystem/recommendSystemTemplateConfig/wxBaseConfig.html?openNewDialog="1"';
                        break;
                    case 'wx_adImg':
                        url = '/recommendSystem/recommendSystemTemplateConfig/wxImgAdConfig.html?openNewDialog="1"';
                        break;
                    case 'product':
                        url = '/recommendSystem/recommendSystemTemplateConfig/productTemplateConfig.html?openNewDialog="1"';
                        break;
                    case 'wx_product':
                        url = '/recommendSystem/recommendSystemTemplateConfig/wxProductTemplateConfig.html?openNewDialog="1"';
                        break;
                    case 'wap_advice':
                        url = '/recommendSystem/recommendSystemTemplateConfig/wapInformationTemplateConfig.html?openNewDialog="1"';
                        break;
                    case 'tags':
                        url = '/recommendSystem/recommendSystemTemplateConfig/labelTemplateConfig.html?openNewDialog="1"';
                        break;
                    case 'leavemsg':
                        url = '/recommendSystem/recommendSystemTemplateConfig/messageTemplateConfig.html?openNewDialog="1"';
                        break;
                    case 'popup':
                        url = '/recommendSystem/recommendSystemTemplateConfig/popUpsConfig.html?openNewDialog="1"';
                        break;
                    case 'privilege':
                    url = '/recommendSystem/recommendSystemTemplateConfig/privilegeConfig.html?openNewDialog="1"';
                        break;
                    case 'survey':
                        url = '/recommendSystem/recommendSystemTemplateConfig/questionnaireSurvey.html?openNewDialog="1"';
                        break;
                }
            }
            // item == 'banner' && (url = '/recommendSystem/recommendSystemTemplateConfig/imgAdContentConfig.html');
            item == 'check' && (url = '/automatedOperation/operatePlanMgmt/operatePlanMgmt.html?pageType=Check&blockId=' + blockItem.blockId + '&modelId=' + blockItem.modelId + '&nodeExeCustCount=' + blockItem.nodeExeCustCount + '&modelStatus=' + modelStatus);
            item == 'awardMgmt' && (url = '/awardMgmt/awardSetting/awardTable.html?openNewDialog="1"');
            item == 'page' && (url = '/recommendSystem/recommendViewMgmt/platformPageMgmt.html?openNewDialog="1"');
            window.open(url);
        },
        getUrlParam: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg); //匹配目标参数
            if (r != null) return unescape(r[2]);
            return '';
        },
        // selectBanner
        selectBanner: function () {
            var _this = this;
            // this.layoutData = [];
            console.log($('#recommend').select2('data'));
            if ($('#recommend').select2('data').length > 0) {
                $('#recommend').select2('data').forEach(function (item, index) {
                    console.log(item.id, 'selectid');
                    _this.layoutInit = {
                        contentId: "",
                        contentPosition: 0,
                        validateType: 0,
                        validateDay: '',
                        createBy: _this.userId,
                        endTime: '',
                        funcId: _this.diafuncId,
                        layoutId: _this.dialayoutId,
                        modifyBy: _this.userId,
                        position: _this.diaposition,
                        contentPositionTp: _this.diacontentPositionTp,
                        themeContentType: _this.diacontentTp,
                        startTime: ''
                    };

                    _this.layoutInit.contentId = item.id;
                    _this.layoutInit.text = item.text;
                    var obj = _this.layoutData.filter(function (layoutItem) {
                        return layoutItem.contentId == item.id;
                    })[0];
                    if (!obj) {
                        _this.layoutData.push(_this.layoutInit);
                    }

                })
                setTimeout(function () {
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
                }, 10)
            }



        },
        selectBanner1: function () {
            var _this = this;
            // this.layoutData = [];
            console.log($('#popup').select2('data'));
            if ($('#popup').select2('data').length > 0) {
                $('#popup').select2('data').forEach(function (item, index) {
                    console.log(item.id, 'selectid');
                    _this.popupInit = {
                        targetContentId: "",
                        contentPosition: 0,
                        validateType: 0,
                        validateDay: '',
                        displayTimesTp:1,
                        startTime: '',
                        endTime: '',
                        modifyBy: _this.userId
                    };

                    _this.popupInit.targetContentId = item.id;
                    _this.popupInit.text = item.text;
                    console.log('_this.popupInit',_this.popupInit);
                    var obj = _this.popupData.filter(function (popupItem) {
                        return popupItem.targetContentId == item.id;
                    })[0];
                    if (!obj) {
                        _this.popupData.push(_this.popupInit);
                    }

                })
                setTimeout(function () {
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
                }, 10)
            }
        },
        deletePopconfig:function(index){
            var selectList = [];
            this.popupData.splice(index, 1);
            this.popupData.forEach(function (item, index) {
                selectList.push(item.targetContentId)
            })
            $('#popup').val(selectList).trigger('change');
        },
        deleteResconfig: function (index) {
            var selectList = [];
            this.layoutData.splice(index, 1);
            this.layoutData.forEach(function (item, index) {
                selectList.push(item.contentId)
            })
            $('#recommend').val(selectList).trigger('change');
        },
        // isEnable
        blockIsEnable: function (item) {
            var _this = this;
            var params = {};
            params.enable = item.enable == '0' ? '1' : '0';
            params.modifyBy = this.userId;
            params.blockId = item.blockId;
            $.post({
                url: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/blockIsEnable.ajax',
                data: params,
                success: function (result) {
                    console.log(result);
                    if (result.error === 0) {
                        _this.getTableData(_this.currentIndex);
                    }
                    _this.showDialog('', 'info', false, result.msg);
                }
            });
        },
        eventShow: function () {
            this.eventForNodeIds.push({
                key1: '',
                key2: '',
                key3: '',
                pkey: '',
            })
            // if(!this.updateId1){
            //     // this.eventCount++
            //     this.eventForNodeIds.push({
            //         key1:'',
            //         key2:'',
            //         key3:'',
            //         pkey:'',
            //         isShow:true
            //     })
            // }else{
            //     this.eventCount2++
            // } 
        },
        refreshList: function (item) {
            if (item == 'msg') {
                $.post({
                    url: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/msgRuleList.ajax',
                    data: {
                        ruleSource: 'AOS'
                    },
                    success: function (result) {
                        if (result.error === 0) {
                            _this.msgRuleList = result.data;
                        } else {
                            _this.msgRuleList = [];
                        }
                    }
                });
            } else if (item == 'layout') {
                this.linkDataInfoList = [];
                this.resSelect = [];
                this.linkDataInfo();
            }
            else if (item == 'popPage') {
                this.getPageByChannel(this.diachannelType);
            }
            else if (item == 'popup') {
                this.linkDataInfoList1 = [];
                this.popSelect = [];
                this.linkDataInfo1();
            }
             else {
                $.post({
                    url: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/rewardsList.ajax',
                    data: {
                        pageNo: '1',
                        pageSize: '999999'
                    },
                    success: function (result) {
                        if (result.error === 0) {
                            _this.rewardsList = result.data.rows;
                        } else {
                            _this.rewardsList = [];
                        }
                    }
                });
            }
        },
        // 删除子块
        deleteSubItem:function(item){
            this.deleteSubId=item.blockId;
            this.showDialog('', 'deleteSubItem', false, '确认删除子任务：'+item.blockName+'?');
        },
        deleteSubConfirm:function(){
            var _this = this;
            $.post({
                url: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/deleteSubitem.ajax',
                data: {
                    blockId: this.deleteSubId
                },
                success: function (result) {
                    console.log(result);
                    if (result.error === 0) {
                        _this.getTableData(_this.currentIndex);
                    }
                    _this.showDialog('', 'info', false, result.msg);
                }
            });
        },
        // 删除父块
        deleteModel:function(item){
            console.log(item);
            this.deleteModelId=item.modelId;
            this.showDialog('', 'deleteModel', false, '确认删除任务：'+item.modelName+'?');
        },
        deleteModelConfirm:function(){
            var _this = this;
            $.post({
                url: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/deleteModel.ajax',
                data: {
                    modelId: this.deleteModelId
                },
                success: function (result) {
                    console.log(result);
                    if (result.error === 0) {
                        _this.getTableData(_this.currentIndex);
                    }
                    _this.showDialog('', 'info', false, result.msg);
                }
            });
        },
        //主表格分页方法
        check: function (item) {
            item.check = !item.check;
        },
        allCheck: function () {
            var _this = this;
            var flag = this.checkAll;
            this.tableData.forEach(function (item) {
                item.check = !flag;
            });
        },
        prev: function () {
            if (this.currentIndex <= 0) {
                return;
            }
            this.getTableData(this.currentIndex - 1);
        },
        next: function () {
            if (this.currentIndex >= this.totalPage - 1) {
                return;
            }
            this.getTableData(this.currentIndex + 1);
        },
        changeIndex: function (index) {
            this.getTableData(index - 1);
        },
        toFirst: function () {
            this.getTableData(0);
        },
        toLast: function () {
            this.getTableData(this.totalPage - 1);
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
        },
        inSelected: function (item, arr, prop) {
            var _index = -1;
            arr.forEach(function (value, index) {
                if (item[prop] == value[prop]) {
                    _index = index;
                }
            });
            return _index;
        },
        formatTime: function (timestamp) {
            if (timestamp) {
                var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
                var Y = date.getFullYear() + '-';
                var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
                var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
                var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
                var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
                return Y + M + D + h + m + s;
            } else {
                return '-';
            }

        },
        overflowHide: function (val) {
            var str = '';
            if (val) {
                str = val.toString();
                if (str.length > 10) {
                    str = str.substring(0, 10) + '...'
                }
            } else {
                str = '-'
            }
            return str;
        },
        stringTimeFat: function (val) {
            if (val) {
                return val.slice(0, 19);
            } else {
                return ''
            }
        },
        backTimeFat: function (val) {
            if (val) {
                val = val.toString();
                var arr = val.split("-");
                var brr = arr[arr.length - 1].split('.');
                try {
                    arr[1] = arr[1].length > 1 ? arr[1] : '0' + arr[1];
                    brr[0] = brr[0].length > 1 ? brr[0] : '0' + brr[0];
                    brr[1] = brr[1].length > 1 ? brr[1] : '0' + brr[1];
                    brr[2] = brr[2].length > 1 ? brr[2] : '0' + brr[2];
                    brr[3] = brr[3].trim().length > 1 ? brr[3].trim() : '0' + brr[3].trim();
                    val = arr[0] + '-' + arr[1] + '-' + brr[0] + ' ' + brr[1] + ':' + brr[2] + ':' + brr[3]
                } catch (err) {
                    val = val.toString();
                }
            } else {
                val = '-'
            }
            return val;
        },
        translateDateToCron: function (dateInfo) { // 入参格式: {triggerType,timingTime,cycle,weekTime,monthday}
            var triggerType = dateInfo.triggerType; // 1: 单次 2: 重复
            if (!triggerType) {
                return '未传triggerType,无法确认触发类型';
            }
            var timingTime = dateInfo.timingTime;
            if (triggerType == 1) {
                if (!/\d{4}-\d{2}-\d{2} \d{2}:\d{2}/.test(timingTime)) {
                    return 'timingTime格式有误';
                }
                var year = Number(timingTime.split(' ')[0].split('-')[0]);
                var month = Number(timingTime.split(' ')[0].split('-')[1]);
                var day = Number(timingTime.split(' ')[0].split('-')[2]);
                var hour = Number(timingTime.split(' ')[1].split(':')[0]);
                var minutes = Number(timingTime.split(' ')[1].split(':')[1]);
                return '0 ' + minutes + ' ' + hour + ' ' + day + ' ' + month + ' ? ' + year;
            } else if (triggerType == 2) {
                var cycle = dateInfo.cycle;
                if (!cycle) {
                    return '未传cycle,无法确认触发类型';
                }
                var hour = Number(timingTime.split(':')[0]);
                var minutes = Number(timingTime.split(':')[1]);
                if (cycle == 'day') {
                    return '0 ' + minutes + ' ' + hour + ' ' + '* * ?';
                } else if (cycle == 'week') {
                    var weekTime = dateInfo.weekTime.join(',');
                    return '0 ' + minutes + ' ' + hour + ' ' + '? * ' + weekTime;
                } else if (cycle == 'month') {
                    var monthday = dateInfo.monthday.join(',');
                    return '0 ' + minutes + ' ' + hour + ' ' + monthday + ' * ?';
                } else {
                    return '未知错误,请检查入参';
                }
            } else {
                return '未知错误,请检查入参';
            }
        },
        translateCronToDate: function (cron) {
            var fixZero = function (number) {
                return number < 10 ? '0' + number : number;
            };
            var cronArr = cron.split(' ');
            if (cronArr.length === 7) {
                return {
                    triggerType: 1,
                    result: cronArr[6] + '-' + fixZero(cronArr[4]) + '-' + fixZero(cronArr[3]) + ' ' + fixZero(cronArr[2]) + ':' + fixZero(cronArr[1])
                };
            } else if (cronArr.length === 6) {
                var obj = {
                    triggerType: 2
                };
                if (cronArr[cronArr.length - 1] !== '?') {
                    obj.cycle = 'week';
                    obj.weekTime = cronArr[cronArr.length - 1].split(',');
                } else {
                    if (cronArr[cronArr.length - 3] === '*') {
                        obj.cycle = 'day';
                    } else {
                        obj.cycle = 'month';
                        obj.monthday = cronArr[cronArr.length - 3].split(',');
                    }
                }
                obj.result = fixZero(cronArr[2]) + ':' + fixZero(cronArr[1]);
                return obj;
            } else {
                return '未知错误,请检查入参';
            }
        }
    },
    components: {
        'date-picker': VueBootstrapDatetimePicker
    },
});