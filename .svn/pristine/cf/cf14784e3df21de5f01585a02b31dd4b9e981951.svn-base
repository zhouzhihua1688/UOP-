new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        tableData: [],

        diaMsg: '',
        // 查询条件
        fundId: '',
        managerId: '',
        managerName:'',
        managerName2:'',
        scenario: '',   //场景
        fundRiskLevel: '',   //风险等级
        markeList:'',        //营销优先级
        operationModeFund: '',//运作方式
        mdlId: '',          //模型ID
        mdlVer: '',
        systemList:[],          //推荐系统
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        // totalPage: 0,
        pageMaxNum: 10,
        condition: '',
        scenarioList: [],   //适用场景
        gradeList: [],     //等级列表
        modelList: [],     //运作方式列表
        termList: [],      //产品期限列表
        managerDetailList: [],//经理信息
        fundDetailList: [],   //基金信息
        getModelNameList: [],  //模型名称
        customerQueryList: [],  //客群输出数据
        custDailyList:[],     //输出客户日志
        lookUpList:[],        //点击查看-显示弹窗数据
        riskList:[],         //客户风险等级
        priorityList:[],      //推荐优先级
        takeDataList:[],
        callList:[],          //外呼项目列表
        grouplist:[],         //获取客群ID
        expCustSerialNo:'',   //流水号
        custGrpId:'',
        prjId:'',              //推送系统项目ID
        remark:'',
    },
    computed: {
        //主表格分页
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
            var currentIndex = parseInt(this.currentIndex);
            return this.middleData[currentIndex];
        },
    },
    watch: {
        pageMaxNum: {
            handler: function (val, oldval) {
                this.currentIndex= 0;
            }
        },
        condition: {
            handler: function (val, oldval) {
                this.currentIndex= 0;
            }
        },
    },
    mounted: function () {
        var _this = this;
        var dialogs = ['info', 'add', 'downLoad', 'push','details'];
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

        // 下载-推送多选
        $('#systemList').chosen({     //客户风险评级
            search_contains: true,
            no_results_text: '未找到该数据',
            disable_search_threshold: 6,
            width: '150px'
        });
        $('#systemList').on('change', function (e, params) {
            if(params && params.selected){
                if(this.systemList.indexOf(params.selected) === -1){ // 未选
                    this.systemList.push(params.selected);
                }

                if(!this.systemList.includes('NCRM')&&this.systemList.length==1){
                    _this.prjId='';
                    console.log("1",this.systemList);
                    $("#ncrmId").attr("disabled","disabled").css("background-color","#eee");
                    $("#groupId").removeAttr("disabled").css("background-color","#fff");
                }else if(!this.systemList.includes('CUSTGRP')&&this.systemList.length==1){
                    _this.custGrpId='';
                    console.log("2",this.systemList);
                    $("#groupId").attr("disabled","disabled").css("background-color","#eee");
                    $("#ncrmId").removeAttr("disabled").css("background-color","#fff");
                }else{
                    console.log("3",this.systemList);
                    $("#ncrmId,#groupId").removeAttr("disabled").css("background-color","#fff");
                }

            }
            if(params && params.deselected){
                if(this.systemList.indexOf(params.deselected) > -1){ // 已选
                    var index = this.systemList.indexOf(params.deselected);
                    this.systemList.splice(index,1);
                }
                if(!this.systemList.includes('NCRM')&&this.systemList.length==1){
                    _this.prjId='';
                    console.log("1",this.systemList);
                    $("#ncrmId").attr("disabled","disabled").css("background-color","#eee");
                    $("#groupId").removeAttr("disabled").css("background-color","#fff");
                }else if(!this.systemList.includes('CUSTGRP')&&this.systemList.length==1){
                    _this.custGrpId='';
                    console.log("2",this.systemList);
                    $("#groupId").attr("disabled","disabled").css("background-color","#eee");
                    $("#ncrmId").removeAttr("disabled").css("background-color","#fff");
                }else{
                    console.log("3",this.systemList);
                    $("#ncrmId,#groupId").removeAttr("disabled").css("background-color","#fff");
                }
            }
        }.bind(this));

        $('#riskList,#riskList2').chosen({     //客户风险评级
            search_contains: true,
            no_results_text: '未找到该数据',
            disable_search_threshold: 6,
            width: '150px'
        });
        $('#riskList,#riskList2').on('change', function (e, params) {
            if(params && params.selected){
                if(this.riskList.indexOf(params.selected) === -1){ // 未选
                    this.riskList.push(params.selected);
                }
            }
            if(params && params.deselected){
                if(this.riskList.indexOf(params.deselected) > -1){ // 已选
                    var index = this.riskList.indexOf(params.deselected);
                    this.riskList.splice(index,1);
                }
            }
        }.bind(this));

        $('#priorityList,#priorityList2').chosen({     //推荐优先级
            search_contains: true,
            no_results_text: '未找到该数据',
            disable_search_threshold: 6,
            width: '150px'
        });
        $('#priorityList,#priorityList2').on('change', function (e, params) {
            if(params && params.selected){
                if(this.priorityList.indexOf(params.selected) === -1){ // 未选
                    this.priorityList.push(params.selected);
                }
            }
            if(params && params.deselected){
                if(this.priorityList.indexOf(params.deselected) > -1){ // 已选
                    var index = this.priorityList.indexOf(params.deselected);
                    this.priorityList.splice(index,1);
                }
            }
        }.bind(this));
        this.scenarioData();
        this.modelData();
        this.termData();
        this.gradeData();
        this.getGroupId();
        this.outCall();
        this.queryCustDaily();
    },
    methods: {
        // 获取客群ID
        getGroupId: function () {
            var _this = this;
            var params = {};
            params.status = '1';   //生效的客群
            $.post({
                url: '/clientMgmt/labelApplication/customerQueryOut/getGroupParam.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.grouplist = result.data.body;
                        console.log(_this.grouplist)
                    } else {
                        _this.showDialog('', 'info', true, result.msg);
                    }
                }
            });
        },

        // 获取外呼项目
        outCall: function () {
            var _this = this;
            var params = {};
            params.interfacecode = 'I_wh_GetProjects';
            params.apikey = '5c4073e917064d64b6b94eb4ff56037e';
            $.post({
                url: '/clientMgmt/labelApplication/customerQueryOut/getCallParam.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.callList = result.data.data;
                        console.log("外呼项目:",result.data.data);
                    } else {
                        _this.showDialog('', 'info', true, result.msg);
                    }
                }
            });
        },
        // 适用场景列表
        scenarioData: function () {
            var _this = this;
            var params = {};
            params.pmst = 'ICIF';
            params.pmkey = 'SCENARIO';
            $.post({
                url: '/clientMgmt/labelApplication/customerQueryOut/scenarioParam.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.scenarioList = result.data.body;
                    } else {
                        _this.showDialog('', 'info', true, result.msg);
                    }
                }
            });
        },
        modelData: function () {  //运作方式
            var _this = this;
            var params = {};
            params.pmst = 'ICIF';
            params.pmkey = 'PRD_ATTR_01';
            // params.pmco='000101';
            $.post({
                url: '/clientMgmt/labelApplication/customerQueryOut/scenarioParam.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.modelList = result.data.body;
                        console.log("_this.modelList", _this.modelList);
                    } else {
                        _this.showDialog('', 'info', true, result.msg);
                    }
                }
            });
        },
        termData: function () {  //产品期限
            var _this = this;
            var params = {};
            params.pmst = 'ICIF';
            params.pmkey = 'PRD_ATTR_02';
            // params.pmco='000201';
            $.post({
                url: '/clientMgmt/labelApplication/customerQueryOut/scenarioParam.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.termList = result.data.body;
                        console.log("_this.termList", _this.termList);
                    } else {
                        _this.showDialog('', 'info', true, result.msg);
                    }
                }
            });
        },
        gradeData: function () {  //风险等级
            var _this = this;
            var params = {};
            params.pmst = "SYSTEM";
            params.pmkey = "FUNDRISKLEVEL";
            $.post({
                url: '/clientMgmt/labelApplication/customerQueryOut/scenarioParam.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.gradeList = result.data.body;
                        console.log("_this.gradeList", _this.gradeList);
                    } else {
                        _this.showDialog('', 'info', true, result.msg);
                    }
                }
            });
        },

        // getTableData: function (currentIndex) {
        //     var params = {};
        //     var _this = this;
        //     params.pageNo = currentIndex + 1;
        //     params.pageSize = this.pageMaxNum;
        //
        //     $.post({
        //         url: '/clientMgmt/information/informationQuery/getTableData.ajax',
        //         data: params,
        //         success: function (result) {
        //             if (result.error === 0) {
        //                 // 后端分页 展示
        //                 _this.tableData = result.data.tableData;
        //                 _this.totalPage = result.data.totalSize;
        //                 _this.currentIndex = result.data.pageNo - 1;
        //             } else {
        //                 _this.tableData = [];
        //                 _this.currentIndex = 0;
        //                 _this.totalPage = 0;
        //                 _this.showDialog('', 'info', false, result.msg);
        //             }
        //         }
        //     });
        // },
        // 查询属性
        searchList: function () {
            var _this = this;
            this.scenario="";
            this.mdlId="";
            this.fundRiskLevel='';
            this.managerName='';
            this.managerName2='';
            if (!this.fundId) {
                this.showDialog('', 'info', true, '请输入查询条件查询');
                return false;
            }
            _this.searchManageDetail(this.fundId);
            _this.searchFundDetail(this.fundId);
            this.showDialog('', 'add');
        },
        // 经理信息
        searchManageDetail: function (fundId) {
            var _this = this;
            var params = {};
            params.fundId = fundId;
            $.post({
                url: '/clientMgmt/labelApplication/customerQueryOut/managerParam.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.managerDetailList = result.data.body;
                        result.data.body.forEach(function (item) {
                            _this.managerId = item.managerId;   //经理信息
                            _this.managerName = item.managerName;   //经理信息
                        })
                    } else {
                        _this.showDialog('add', 'info', false, result.msg);
                    }
                }
            });
        },
        // 基金信息
        searchFundDetail: function (fundId) {
            var _this = this;
            var params = {};
            params.fundId = fundId;
            $.post({
                url: '/clientMgmt/labelApplication/customerQueryOut/detailsParam.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.fundDetailList = result.data.body;
                        _this.fundRiskLevel = result.data.body.fundRiskLevel; //风险等级
                        if (result.data.body.operationModeFund == '' || result.data.body.operationModeFund == null) {
                            _this.operationModeFund = ""; //运作方式
                        } else {
                            _this.operationModeFund = result.data.body.operationModeFund; //运作方式
                        }

                    } else {
                        _this.showDialog('add', 'info', false, result.msg);
                    }
                }
            });
        },
        checkModelName: function () {
            var _this = this;
            // var params = {};
            // params.scenario=this.scenario;
            if (!this.operationModeFund) {
                this.showDialog('add', 'info', true, '运作方式不能为空');
                return false;
            }
            var obj = {    //产品运作方式
                prdAttr: "000101",
                prdAttrValue: this.operationModeFund
            };
            var arr = [];
            arr.push(obj);

            // params.prdAtts=[];
            // params.prdAtts=JSON.stringify(arr);
            // console.log(params);
            $.post({
                url: '/clientMgmt/labelApplication/customerQueryOut/getModelName.ajax',
                data: {
                    scenario: this.scenario,
                    prdAtts: JSON.stringify(arr)
                },
                success: function (result) {
                    if (result.error === 0) {
                        _this.getModelNameList = result.data.body;
                        console.log("_this.getModelNameList",result.data.body)
                        // _this.showDialog('add', 'info', true, result.msg);
                    } else {
                        _this.showDialog('add', 'info', true, result.msg);
                    }
                }
            });
        },
        // 查询必填
        diaInfoCheck: function () {
            var _this = this;
            if (!this.operationModeFund) {
                this.showDialog('add', 'info', true, '运作方式不能为空');
                return false;
            }
            if (!this.fundRiskLevel) {
                this.showDialog('add', 'info', true, '产品风险等级不能为空');
                return false;
            }
            if (!this.managerName) {
                this.showDialog('add', 'info', true, '基金经理不能为空');
                return false;
            }
            // if (!$("#startDate").val()) {
            //     this.showDialog('add', 'info', true, '发车日期不能为空');
            //     return false;
            // }
            if (!this.markeList) {
                this.showDialog('add', 'info', true, '营销优先级不能为空');
                return false;
            }
            if (!this.scenario) {
                this.showDialog('add', 'info', true, '适用场景不能为空');
                return false;
            }
            if (!this.mdlId) {
                this.showDialog('add', 'info', true, '模型名称不能为空');
                return false;
            }
            return true;
        },
        // 点击客群查询按钮-输出数据
        customerQuery: function () {
            var _this = this;
            if (this.diaInfoCheck()) {
                var params = {};
                if(this.managerName2==''){
                    params.fundMgrs = JSON.stringify([this.managerName]);
                }else{
                    params.fundMgrs = JSON.stringify([this.managerName,this.managerName2]);
                }
                params.mdlId = this.mdlId;
                var mdlId = this.mdlId;
                _this.getModelNameList.forEach(function (item) {
                    if (item.mdlId == mdlId) {
                        params.mdlVer = item.mdlVer;
                    }
                })
                // for(var i in _this.getModelNameList){
                //     if(_this.getModelNameList[i].mdlId==mdlId){
                //         params.mdlVer=_this.getModelNameList[i].mdlVer;
                //         console.log(params.mdlVer)
                //     }
                // }
                params.prdId = this.fundId;
                params.scenario = this.scenario;
                params.prdRiskLvl= this.fundRiskLevel;   //风险等级
                params.marketLvl = this.markeList;   //营销优先级
                console.log("params", params);
                $.post({
                    url: '/clientMgmt/labelApplication/customerQueryOut/customerParam.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.customerQueryList = result.data.body;
                            console.log("_this.customerQueryList", result.data.body);
                            _this.expCustSerialNo = result.data.body;
                            _this.queryCustDaily(mdlId, params.mdlVer);  // 调用客群模型输出客户日志接口
                            _this.showDialog('add', 'info', false, result.msg);
                        } else {
                            _this.showDialog('add', 'info', true, result.msg);
                        }
                    }
                });
            }
        },
        // 查询客群模型输出客户日志
        queryCustDaily: function (mdlId,mdlVer) {
            var _this = this;
            var params = {};
            // params.expDt = "20210629",
            params.mdlId = mdlId;
            params.mdlVer =mdlVer;
            console.log(params);
            $.post({
                url: '/clientMgmt/labelApplication/customerQueryOut/queryCustDaily.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.tableData = result.data.body.logs;
                        console.log("_this.tableData",result.data.body.logs);
                    } else {
                        _this.showDialog('add', 'info', false, result.msg);
                    }
                }
            });
        },

        // 下载按钮
        downUp: function (item) {
            var _this = this;
            console.log(item);
            this.fundRiskLevel='';      //清空-防止存留
            this.markeList='';         //清空-防止存留
            _this.priorityList=[];   //清空-防止存留
            _this.riskList=[];       //清空-防止存留
            _this.expCustSerialNo=item.serialNo;
            this.fundRiskLevel=item.prdRiskLvl;
            this.markeList=item.marketLvl;
            this.mdlId=item.mdlId;
            this.mdlVer=item.mdlVer;
            var listArr=[          //客户风险等级
                {
                    value:'谨慎型（C0）',
                    name:'谨慎型（C0）'
                },
                {
                    value:'保守型（C1）',
                    name:'保守型（C1）'
                },
                {
                    value:'稳健型（C2）',
                    name:'稳健型（C2）'
                },
                {
                    value:'平衡型（C3）',
                    name:'平衡型（C3）'
                },
                {
                    value:'进取型（C4）',
                    name:'进取型（C4）'
                },
                {
                    value:'积极型（C5）',
                    name:'积极型（C5）'
                },
                {
                    value:'未知',
                    name:'未知'
                }
            ]
            var priorityArr=[
                {
                    value:'1',
                    name:'优先级1'
                },
                {
                    value:'2',
                    name:'优先级2'
                },
                {
                    value:'3',
                    name:'优先级3'
                },
                {
                    value:'4',
                    name:'优先级4'
                },
                {
                    value:'5',
                    name:'优先级5'
                },
                {
                    value:'6',
                    name:'优先级6'
                },
            ]
            // 客户风险评级
            var str = '<option value=""></option>';
            listArr.forEach(function (item) {
                str += '<option value="' + item.value + '">'+ item.name + '</option>';
            });
            if(this.fundRiskLevel=="0"){   //R1
                this.riskList=['保守型（C1）','稳健型（C2）','平衡型（C3）','进取型（C4）','积极型（C5）']
            }
            if(this.fundRiskLevel=="1"){    //R2
                this.riskList=['稳健型（C2）','平衡型（C3）','进取型（C4）','积极型（C5）']
            }
            if(this.fundRiskLevel=="2"){   //R3
                this.riskList=['平衡型（C3）','进取型（C4）','积极型（C5）']
            }
            if(this.fundRiskLevel=="3"){   //R4
                this.riskList=['进取型（C4）','积极型（C5）']
            }
            if(this.fundRiskLevel=="4"){  //R5
                this.riskList=['积极型（C5）']
            }
            $('#riskList').html(str);
            $('#riskList').val(this.riskList);
            $('#riskList').trigger('chosen:updated');
            // 优先级
            var str2 = '<option value=""></option>';
            priorityArr.forEach(function (item) {
                str2 += '<option value="' + item.value + '">'+ item.name + '</option>';
            });
            if(this.markeList=="6"){
                this.priorityList=['1','2','3','4','5','6']
            }
            if(this.markeList=="5"){
                this.priorityList=['2','3','4','5','6']
            }
            if(this.markeList=="4"){
                this.priorityList=['3','4','5','6']
            }
            if(this.markeList=="3"){
                this.priorityList=['4','5','6']
            }
            if(this.markeList=="2"){
                this.priorityList=['5','6']
            }
            if(this.markeList=="1"){
                this.priorityList=['6']
            }
            $('#priorityList').html(str2);
            $('#priorityList').val(_this.priorityList);
            $('#priorityList').trigger('chosen:updated');

            this.showDialog('', 'downLoad');
        },

        takeData:function(){        //通过客群模型输出客群
            var _this = this;
            var params = {};
            params.recmLvl=[];    //客户推荐级别
            params.riskLvl =[];   //客户风险评级
            params.expCustSerialNo=_this.expCustSerialNo;
            params.recmLvl=this.priorityList;
            params.riskLvl=this.riskList;
            params.mdlId=this.mdlId;
            params.mdlVer=this.mdlVer;
            console.log(params);
            $.post({
                url: '/clientMgmt/labelApplication/customerQueryOut/takeDateParam.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.takeDataList = result.data.body;
                        console.log(_this.takeDataList)
                        _this.showDialog('downLoad', 'info', false, result.msg);
                    } else {
                        _this.showDialog('downLoad', 'info', false, result.msg);
                    }
                }
            });

        },

        //查看--页面数据-点击查看按钮-查询客群模型输出客群日志
        lookUp: function (item) {
            var _this = this;
            var params = {};
            params.expCustSerialNo=item.serialNo;
            params.expTp="000202";
            console.log(params);
            $.post({
                url: '/clientMgmt/labelApplication/customerQueryOut/lookUpParam.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.lookUpList = result.data.body.sort((a, b) => {
                            return b.expTm - a.expTm
                        });
                        console.log(result.data.body)
                    } else {
                        _this.showDialog('details', 'info', false, result.msg);
                    }
                }
            });
            this.showDialog('', 'details');
        },
        // 下载
        downLoad: function (item) {
            var _this = this;
            // var params = {};
            // params.dataFile=item.dataFile;
            // console.log(params);
            // $.post({
            //     url: '/clientMgmt/labelApplication/customerQueryOut/exportAll.ajax',
            //     data: params,
            //     success: function (result) {
            //         if (result.error === 0) {
            //             // _this.lookUpList = result.data.body;
            //             // console.log(result.data.body)
            //         } else {
            //             _this.showDialog('details', 'info', false, result.msg);
            //         }
            //     }
            // });
            // var url=item.dataFile;
            // var s=url.substring(url.lastIndexOf('//')+1);

            var pos =item.dataFile.lastIndexOf('/');
            var dataFile=encodeURIComponent(item.dataFile.substring(pos + 1));    //获取文件名,不需要路径
            console.log(dataFile);
            var url = '/clientMgmt/labelApplication/customerQueryOut/exportAll.ajax?dataFile='+ dataFile+'&expDt='+item.expDt+'&serialNo='+item.serialNo;
            window.location.href = url;
        },
        // downLoad:function(protocolAdd){
        //     var _this = this;
        //     var url = '/clientMgmt/labelApplication/customerQueryOut/exportAll.ajax?protocolAdd='+protocolAdd;
        //     window.location.href = url;
        // },
        // 推送
        pushUp: function (item) {
            console.log(item);
            var _this = this;
            this.fundRiskLevel='';      //清空-防止存留
            this.markeList='';         //清空-防止存留
            _this.priorityList=[];   //清空-防止存留
            _this.riskList=[];       //清空-防止存留
            this.fundRiskLevel=item.prdRiskLvl;
            this.markeList=item.marketLvl;
            this.mdlId=item.mdlId;
            this.mdlVer=item.mdlVer;
            var systemArr=[
                {
                    value:'NCRM',
                    name:'NCRM'
                },
                {
                    value:'CUSTGRP',
                    name:'CUSTGRP'
                }
            ]
            var listArr=[          //客户风险等级
                {
                    value:'谨慎型（C0）',
                    name:'谨慎型（C0）'
                },
                {
                    value:'保守型（C1）',
                    name:'保守型（C1）'
                },
                {
                    value:'稳健型（C2）',
                    name:'稳健型（C2）'
                },
                {
                    value:'平衡型（C3）',
                    name:'平衡型（C3）'
                },
                {
                    value:'进取型（C4）',
                    name:'进取型（C4）'
                },
                {
                    value:'积极型（C5）',
                    name:'积极型（C5）'
                },
                {
                    value:'未知',
                    name:'未知'
                }
            ]
            var priorityArr=[
                {
                    value:'1',
                    name:'优先级1'
                },
                {
                    value:'2',
                    name:'优先级2'
                },
                {
                    value:'3',
                    name:'优先级3'
                },
                {
                    value:'4',
                    name:'优先级4'
                },
                {
                    value:'5',
                    name:'优先级5'
                },
                {
                    value:'6',
                    name:'优先级6'
                },
            ]
            // 客户风险评级
            var str = '<option value=""></option>';
            listArr.forEach(function (item) {
                str += '<option value="' + item.value + '">'+ item.name + '</option>';
            });
            if(this.fundRiskLevel=="0"){   //R1
                this.riskList=['保守型（C1）','稳健型（C2）','平衡型（C3）','进取型（C4）','积极型（C5）']
            }
            if(this.fundRiskLevel=="1"){    //R2
                this.riskList=['稳健型（C2）','平衡型（C3）','进取型（C4）','积极型（C5）']
            }
            if(this.fundRiskLevel=="2"){   //R3
                this.riskList=['平衡型（C3）','进取型（C4）','积极型（C5）']
            }
            if(this.fundRiskLevel=="3"){   //R4
                this.riskList=['进取型（C4）','积极型（C5）']
            }
            if(this.fundRiskLevel=="4"){  //R5
                this.riskList=['积极型（C5）']
            }
            $('#riskList2').html(str);
            $('#riskList2').val(this.riskList);
            $('#riskList2').trigger('chosen:updated');

            //推荐系统
            var str1 = '<option value=""></option>';
            systemArr.forEach(function (item) {
                str1 += '<option value="' + item.value + '">'+ item.name + '</option>';
            });
            $('#systemList').html(str1);
            $('#systemList').val(_this.systemList);
            $('#systemList').trigger('chosen:updated');

            // 优先级
            var str2 = '<option value=""></option>';
            priorityArr.forEach(function (item) {
                str2 += '<option value="' + item.value + '">'+ item.name + '</option>';
            });
            if(this.markeList=="6"){
                this.priorityList=['1','2','3','4','5','6']
            }
            if(this.markeList=="5"){
                this.priorityList=['2','3','4','5','6']
            }
            if(this.markeList=="4"){
                this.priorityList=['3','4','5','6']
            }
            if(this.markeList=="3"){
                this.priorityList=['4','5','6']
            }
            if(this.markeList=="2"){
                this.priorityList=['5','6']
            }
            if(this.markeList=="1"){
                this.priorityList=['6']
            }
            $('#priorityList2').html(str2);
            $('#priorityList2').val(_this.priorityList);
            $('#priorityList2').trigger('chosen:updated');
            _this.expCustSerialNo=item.serialNo;
            this.showDialog('', 'push');
        },

        putPush:function(){        //通过客群模型输出客群
            var _this = this;
            var params = {};
            params.recmLvl=[];    //客户推荐级别
            params.riskLvl =[];   //客户风险评级
            params.pushToSys=[];  //推送系统

            params.expCustSerialNo=_this.expCustSerialNo;
            params.pushToSys=this.systemList;
            params.recmLvl=this.priorityList;
            params.riskLvl=this.riskList;
            params.remark=this.remark;
            params.custGrpId=this.custGrpId;
            params.prjId=this.prjId;
            params.mdlId=this.mdlId;
            params.mdlVer=this.mdlVer;
            console.log(params);
            $.post({
                url: '/clientMgmt/labelApplication/customerQueryOut/pushParams.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        // _this.takeDataList = result.data.body;
                        console.log(result.data.body);
                        _this.showDialog('push', 'info', false, result.msg);
                    } else {
                        _this.showDialog('push', 'info', false, result.msg);
                    }
                }
            });
        },
        //推送查看
        lookUpPush: function (item) {
            var _this = this;
            var params = {};
            params.expCustSerialNo=item.serialNo;
            params.expTp="000201";
            console.log(params);
            $.post({
                url: '/clientMgmt/labelApplication/customerQueryOut/lookUpParam.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.lookUpList = result.data.body.sort((a, b) => {
                            return b.expTm - a.expTm
                        });
                        console.log(result.data.body);
                    } else {
                        _this.showDialog('details', 'info', false, result.msg);
                    }
                }
            });
            this.showDialog('', 'details');
        },
        // 重新导入查询
        againImport:function(item){
            var _this = this;
            var params = {};
            params.serialNo=item.serialNo;
            $.post({
                url: '/clientMgmt/labelApplication/customerQueryOut/againImport.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.queryCustDaily();
                        _this.showDialog('', 'info', false, result.msg);
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        chooseSystem:function(system){
            var _this = this;
            if(system=='NCRM'){
                $("#groupId").attr("disabled","disabled").css("background-color","#eee");
                $("#ncrmId").removeAttr("disabled").css("background-color","#fff");
            }
            if(system=='CUSTGRP'){
                $("#ncrmId").attr("disabled","disabled").css("background-color","#eee");
                $("#groupId").removeAttr("disabled").css("background-color","#fff");
            }
            console.log('system',system)
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
        //主表格分页方法
        prev: function () {
            this.currentIndex<= 0 ? 0 : this.currentIndex--;
        },
        next: function () {
            this.currentIndex>= this.middleData.length - 1 ? this.middleData.length - 1 : this.currentIndex++;
        },
        changeIndex: function (index) {
            this.currentIndex= index - 1;
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
        }
    },
    filters: {
        evalDate: function (item) {
            if (item) {
                return item.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')
            }
        },
        evalTime: function (item) {
            if (item) {
                return item.replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3')
            }
        },
        expSt: function (item) {
            if (item) {
                return item.replace(/S/g, '成功').replace(/F/g, '失败').replace(/P/g, '处理中').replace(/N/g, '待处理');
            }
        },
        expTp: function (item) {
            if (item) {
                return item.replace(/000202/g, '下载客群(000202)').replace(/000201/g, '推送客群(000201)').replace(/000101/g, '查询客群(000101)');
            }
        },
    }
});
