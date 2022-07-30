new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        tableData: [],
        diaMsg: '',
        // 查询条件
        mdlId:'',    //模型ID
        mdlVer:'',  //模型版本号,
        mdlNms:'',
        // 新增字段
        mdlDesc:'', //模型描述
        mdlNm:'', //模型名称
        mdlSt:'', //模型状态
        mdlTp:'', //模型类型
        prds:'', //适用产品
        recoms:'', //推荐级别配置
        scenario:'', //适用场景
        scenarioList:[], //适用场景列表
        prdAttrValue:'', //运作方式
        prdAttrValue1:'',
        prdAttrValue2:'',
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10,
        condition: '',
        // 详情
        checkDatils: {},
        lableList:[],
        priorityList:[],
        flag:false,
        //比较
        value:'',
        value2:'',
        value3:'',
        compare:'',  //比较
        compare2:'',
        compare3:'',
        compareValueEnd: "",
        compareValueStr: "",
        compareValueEnd1: "",
        compareValueStr1: "",
        compareValueEnd2: "",
        compareValueStr2: "",
        one:'',
        one2:'',
        one3:'',
        versionList:[],  //版本记录
        highCustomer:'',  //自定义字段-是不是高净值客户
        gradeList:[],     //获取等级列表
        modelList:[],     //获取运作方式列表
        termList:[],      //获取产品期限列表
        labelCategoryList:[], //标签类别
        labelNameList:[],     //标签名称
        listData:[],          //获取模型信息
        prdAttrValueList: [],   //运作方式列表-赋值取值
        qixianList:[],            //期限列表-赋值取值
        fengxianList:[],           //风险等级列表-赋值取值
        tagIdIndex:'',
    },
    computed: {
        //主表格分页
        //主表格假分页
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
        var dialogs = ['info','normal'];
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
        $('#prdAttrValueList').chosen({
            search_contains: true,
            no_results_text: '未找到该数据',
            disable_search_threshold: 6,
            width: '150px'
        });
        $('#prdAttrValueList').on('change', function (e, params) {
            if(params && params.selected){
                if(this.prdAttrValueList.indexOf(params.selected) === -1){ // 未选
                    this.prdAttrValueList.push(params.selected);
                }
                console.log(this.prdAttrValueList)
                if(this.prdAttrValueList.includes("10001")){
                    // $("#qixian").hide();
                    // $("#qixianRed").hide();
                    // $("#qixianList_chosen").hide();
                    this.qixianList=[];
                }
            }
            if(params && params.deselected){
                if(this.prdAttrValueList.indexOf(params.deselected) > -1){ // 已选
                    var index = this.prdAttrValueList.indexOf(params.deselected);
                    this.prdAttrValueList.splice(index,1);
                }
                console.log(_this.qixianList);
                if(!this.prdAttrValueList.includes("10001")){
                    // $("#qixian").show();
                    // $("#qixianRed").show();
                    // $("#qixianList_chosen").show();

                    $('#qixianList').val(this.qixianList);
                    $('#qixianList').trigger('chosen:updated');
                }
            }
        }.bind(this));

        $('#prdAttrValueList1,#prdAttrValueList2,#prdAttrValueList3,#prdAttrValueList4').chosen({
            search_contains: true,
            no_results_text: '未找到该数据',
            disable_search_threshold: 6,
            width: '150px'
        });
        $('#prdAttrValueList1,#prdAttrValueList2,#prdAttrValueList3,#prdAttrValueList4').on('change', function (e, params) {
            if(params && params.selected){
                if(this.prdAttrValueList.indexOf(params.selected) === -1){ // 未选
                    this.prdAttrValueList.push(params.selected);
                }
                console.log(this.prdAttrValueList)
                if(this.prdAttrValueList.includes("10001")){
                    // $("#qixian").hide();
                    // $("#qixianRed").hide();
                    // $("#qixianList_chosen").hide();
                    this.qixianList=[];
                }
            }
            if(params && params.deselected){
                if(this.prdAttrValueList.indexOf(params.deselected) > -1){ // 已选
                    var index = this.prdAttrValueList.indexOf(params.deselected);
                    this.prdAttrValueList.splice(index,1);
                }
                console.log(_this.qixianList);
                if(!this.prdAttrValueList.includes("10001")){
                    // $("#qixian").show();
                    // $("#qixianRed").show();
                    // $("#qixianList_chosen").show();

                    $('#qixianList').val(this.qixianList);
                    $('#qixianList').trigger('chosen:updated');
                    $('#qixianList2').val(this.qixianList);
                    $('#qixianList2').trigger('chosen:updated');
                    $('#qixianList3').val(this.qixianList);
                    $('#qixianList3').trigger('chosen:updated');
                    $('#qixianList4').val(this.qixianList);
                    $('#qixianList4').trigger('chosen:updated');
                }
            }
        }.bind(this));

        $('#qixianList,#qixianList1,#qixianList2,#qixianList3,#qixianList4').chosen({     //期限
            search_contains: true,
            no_results_text: '未找到该数据',
            disable_search_threshold: 6,
            width: '150px'
        });
        $('#qixianList,#qixianList1,#qixianList2,#qixianList3,#qixianList4').on('change', function (e, params) {
            if(params && params.selected){
                if(this.qixianList.indexOf(params.selected) === -1){ // 未选
                    this.qixianList.push(params.selected);
                }
            }
            if(params && params.deselected){
                if(this.qixianList.indexOf(params.deselected) > -1){ // 已选
                    var index = this.qixianList.indexOf(params.deselected);
                    this.qixianList.splice(index,1);
                }
            }
        }.bind(this));

        $('#fengxianList,#fengxianList1,#fengxianList2,#fengxianList3,#fengxianList4').chosen({     //期限
            search_contains: true,
            no_results_text: '未找到该数据',
            disable_search_threshold: 6,
            width: '150px'
        });
        $('#fengxianList,#fengxianList1,#fengxianList2,#fengxianList3,#fengxianList4').on('change', function (e, params) {
            if(params && params.selected){
                if(this.fengxianList.indexOf(params.selected) === -1){ // 未选
                    this.fengxianList.push(params.selected);
                }
            }
            if(params && params.deselected){
                if(this.fengxianList.indexOf(params.deselected) > -1){ // 已选
                    var index = this.fengxianList.indexOf(params.deselected);
                    this.fengxianList.splice(index,1);
                }
            }
        }.bind(this));
        this.scenarioData();
        this.modelData();
        this.termData();
        this.gradeData();
        this.labelCategoryData();
        this.labelNameData();
        this.getTableData();
    },
    methods: {
        // 适用场景列表
        scenarioData:function(){
            var _this=this;
            var params = {};
            params.pmst ='ICIF';
            params.pmkey ='SCENARIO';
            $.post({
                url: '/clientMgmt/labelApplication/modelConfigurationMgmt/scenarioParam.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.scenarioList=result.data.body;
                    }else {
                        _this.showDialog('', 'info', true, result.msg);
                    }
                }
            });
        },
        modelData:function(){  //运作方式
            var _this=this;
            var params = {};
            params.pmst ='ICIF';
            params.pmkey ='PRD_ATTR_01';
            // params.pmco='000101';
            $.post({
                url: '/clientMgmt/labelApplication/modelConfigurationMgmt/scenarioParam.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.modelList=result.data.body;
                        console.log("_this.modelList",_this.modelList);
                        var str = '<option value=""></option>';
                        _this.modelList.forEach(function (item) {
                            str += '<option value="' + item.pmco + '">' + item.pmco + '-' + item.pmnm + '</option>';
                        });
                        $('#prdAttrValueList').html(str);
                        $('#prdAttrValueList').val(this.prdAttrValueList);
                        $('#prdAttrValueList').trigger('chosen:updated');
                        $('#prdAttrValueList1,#prdAttrValueList2,#prdAttrValueList3,#prdAttrValueList4').html(str);
                        $('#prdAttrValueList1,#prdAttrValueList2,#prdAttrValueList3,#prdAttrValueList4').val(this.prdAttrValueList);
                        $('#prdAttrValueList1,#prdAttrValueList2,#prdAttrValueList3,#prdAttrValueList4').trigger('chosen:updated');

                    }else {
                        _this.showDialog('', 'info', true, result.msg);
                    }
                }
            });
        },
        termData:function(){  //产品期限
            var _this=this;
            var params = {};
            params.pmst ='ICIF';
            params.pmkey ='PRD_ATTR_02';
            // params.pmco='000201';
            $.post({
                url: '/clientMgmt/labelApplication/modelConfigurationMgmt/scenarioParam.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.termList=result.data.body;
                        console.log("_this.termList",_this.termList);

                        var str = '<option value=""></option>';
                        _this.termList.forEach(function (item) {
                            str += '<option value="' + item.pmco + '">' + item.pmco + '-' + item.pmnm + '</option>';
                        });
                        $('#qixianList,#qixianList1,#qixianList2,#qixianList3,#qixianList4').html(str);
                        $('#qixianList,#qixianList1,#qixianList2,#qixianList3,#qixianList4').val(this.qixianList);
                        $('#qixianList,#qixianList1,#qixianList2,#qixianList3,#qixianList4').trigger('chosen:updated');
                    }else {
                        _this.showDialog('', 'info', true, result.msg);
                    }
                }
            });
        },
        gradeData:function(){  //风险等级
            var _this=this;
            var params = {};
            params.pmst="SYSTEM";
            params.pmkey="FUNDRISKLEVEL";
            $.post({
                url: '/clientMgmt/labelApplication/modelConfigurationMgmt/scenarioParam.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.gradeList=result.data.body;
                        console.log("_this.gradeList",_this.gradeList);

                        var str = '<option value=""></option>';
                        _this.gradeList.forEach(function (item) {
                            str += '<option value="' + item.pmco + '">' + item.pmco + '-' + item.pmnm + '</option>';
                        });
                        $('#fengxianList,#fengxianList1,#fengxianList2,#fengxianList3,#fengxianList4').html(str);
                        $('#fengxianList,#fengxianList1,#fengxianList2,#fengxianList3,#fengxianList4').val(this.fengxianList);
                        $('#fengxianList,#fengxianList1,#fengxianList2,#fengxianList3,#fengxianList4').trigger('chosen:updated');
                    }else {
                        _this.showDialog('', 'info', true, result.msg);
                    }
                }
            });
        },
        labelCategoryData:function(){  //标签类别
            var _this=this;
            var params = {};
            params.pmst ='ICIF';
            params.pmkey ='CUST_TAG_TP';
            $.post({
                url: '/clientMgmt/labelApplication/modelConfigurationMgmt/scenarioParam.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.labelCategoryList=result.data.body;
                        console.log("_this.labelCategoryList",_this.labelCategoryList);
                    }else {
                        _this.showDialog('', 'info', true, result.msg);
                    }
                }
            });
        },
        labelNameData:function(){  //标签名称
            var _this=this;
            var params = {};
            params.tagScenario='CGM';   //20211112新添加查询参数
            $.post({
                url: '/clientMgmt/labelApplication/modelConfigurationMgmt/lableNameParam.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.labelNameList=result.data.body;
                        console.log("_this.labelNameList",_this.labelNameList);
                    }else {
                        _this.showDialog('', 'info', true, result.msg);
                    }
                }
            });
        },
        // 主表格数据
        getTableData: function (currentIndex) {
            var params = {};
            var _this = this;
            _this.tableData=[];
            params.pageNo =1;
            params.pageSize ="9999";
            params.mdlNm = this.mdlNms;
            params.mdlSt = this.mdlSt;
            // if (!this.mdlNm) {
            //     this.showDialog('', 'info', true, '请输入查询条件查询');
            //     return false;
            // }
            // if (!this.mdlSt) {
            //     this.showDialog('', 'info', true, '请输入查询条件查询');
            //     return false;
            // }
            $.post({
                url: '/clientMgmt/labelApplication/modelConfigurationMgmt/getTableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        // 后端分页 展示
                        _this.currentIndex = 0;
                        _this.tableData=result.data.tableData.custGrpMdlLeasts;
                        console.log("_this.tableData",_this.tableData)

                        // _this.totalPage = result.data.totalSize;
                        // _this.currentIndex = result.data.pageNo - 1;
                    } else {
                        _this.tableData = [];
                        _this.currentIndex = 0;
                        // _this.totalPage = 0;
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        addSubList:function(){
            var _this=this;
            _this.lableList.push({
                tagTp:"",
                tagId:"",
                tagWeight:'',
            })
        },

        delList: function (index) {
            console.log(index)
            var _this=this;
            _this.lableList.splice(index, 1);
        },

        addPriority:function(){
            var _this=this;
            _this.priorityList.push({
                recomLvl: "",
                recomScoreEnd:'',
                recomScoreStr:''
            })
        },
        delPriority: function (index) {
            console.log(index)
            var _this=this;
            _this.priorityList.splice(index, 1);
        },
        choosePrdAttr:function(value){
            var _this=this;
            console.log(value)
            if(value=='10001'){   //如果为10001持有期，则不能选择期限
               $(".qixian").attr("disabled","disabled").css("background-color","#eee");
                this.prdAttrValue1="";
            }else{
                $(".qixian").removeAttr("disabled").css("background-color","#fff");
            }
        },

        chooseList:function(value,index){
            var _this=this;
            console.log(value);
            console.log(index);
            this.compareValueEnd="";
            this.compareValueStr="";
            if(index==1) {
                if (value == ">") {
                    this.one = "大于:";
                } else if (value == "<") {
                    this.one = "小于:";
                } else if (value == "=") {
                    this.one = "等于:";
                } else if (value ==">=") {
                    this.one = "大于等于:";
                } else if (value =="<=") {
                    this.one = "小于等于:";
                } else if (value =="btw") {
                    this.one = "介于:";
                } else {
                    return;
                }
            }
        },
        chooseList2:function(value,index){
            var _this=this;
            this.compareValueEnd1="";
            this.compareValueStr1="";
            console.log(value);
            console.log(index);
            if(index==2) {
                if (value == ">") {
                    this.one2 = "大于:";
                } else if (value == "<") {
                    this.one2 = "小于:";
                } else if (value == "=") {
                    this.one2 = "等于:";
                } else if (value ==">=") {
                    this.one2 = "大于等于:";
                } else if (value =="<=") {
                    this.one2 = "小于等于:";
                } else if (value =="btw") {
                    this.one2 = "介于:";
                } else {
                    return;
                }
            }
        },
        chooseList3:function(value,index){
            var _this=this;
            this.compareValueEnd2="";
            this.compareValueStr2="";
            console.log(value);
            console.log(index);
            if(index==3) {
                if (value == ">") {
                    this.one3="大于:";
                } else if (value=="<") {
                    this.one3="小于:";
                } else if (value=="=") {
                    this.one3 = "等于:";
                } else if (value ==">=") {
                    this.one3 = "大于等于:";
                } else if (value =="<=") {
                    this.one3 = "小于等于:";
                } else if (value =="btw") {
                    this.one3 = "介于:";
                } else {
                  return;
                }
            }
        },

        // 标签类别和标签名称只能二选一
        chooseTagTp:function(tagTp,index){
            var _this = this;
            console.log(tagTp);
            console.log(index);
            // if(tagTp!=""){
            //     $(".chooseTagId").eq(index).attr("disabled","disabled").css("background-color","#eee");
            // }
        },
        chooseTagId:function(tagId,index){
            var _this = this;
            console.log(tagId);
            console.log(index);
            // if(tagId!=""){
            //     $(".chooseTagTp").eq(index).attr("disabled","disabled").css("background-color","#eee");
            // }
        },
        // 修改
        chooseTagTp1:function(tagTp,index){
            var _this = this;
            console.log(tagTp);
            console.log(index);
            // if(tagTp!=""){
            //     $(".chooseTagId1").eq(index).attr("disabled","disabled").css("background-color","#eee");
            // }
        },
        chooseTagId1:function(tagId,index){
            var _this = this;
            console.log(tagId);
            // if(tagId!=""){
            //     $(".chooseTagTp1").eq(index).attr("disabled","disabled").css("background-color","#eee");
            // }
        },

        chooseTagTp2:function(tagTp,index){
            var _this = this;
            console.log(tagTp);
            // if(tagTp!=""){
            //     $(".chooseTagId2").eq(index).attr("disabled","disabled").css("background-color","#eee");
            // }
        },
        chooseTagId2:function(tagId,index){
            var _this = this;
            console.log(tagId);
            // if(tagId!=""){
            //     $(".chooseTagTp2").eq(index).attr("disabled","disabled").css("background-color","#eee");
            // }
        },
        chooseTagTp3:function(tagTp,index){
            var _this = this;
            console.log(tagTp);
            // if(tagTp!=""){
            //     $(".chooseTagId3").eq(index).attr("disabled","disabled").css("background-color","#eee");
            // }
        },
        chooseTagId3:function(tagId,index){
            var _this = this;
            console.log(tagId);
            // if(tagId!=""){
            //     $(".chooseTagTp3").eq(index).attr("disabled","disabled").css("background-color","#eee");
            // }
        },
        // 新增数据
        showAdd:function(){
            var _this = this;
            this.scenario="";
            this.mdlNm="";
            this.mdlDesc='';
            this.prdAttrValue="";
            this.prdAttrValue1="";
            this.prdAttrValue2="";
            this.compare="";
            this.compare2="";
            this.compare3="";
            this.compareValueStr="";
            this.compareValueEnd="";
            this.compareValueStr1="";
            this.compareValueEnd1="";
            this.compareValueStr2="";
            this.compareValueEnd2="";
            this.highCustomer="";
            _this.lableList=[];
            _this.priorityList=[];

            this.prdAttrValueList = [];
            this.qixianList=[];
            this.fengxianList=[];
            // $('#prdAttrValueList').html('<option value=""></option>');
            $('#prdAttrValueList').val('');
            $('#prdAttrValueList').trigger('chosen:updated');
            $('#qixianList').val('');
            $('#qixianList').trigger('chosen:updated');
            $('#fengxianList').val('');
            $('#fengxianList').trigger('chosen:updated');
            this.showDialog('', 'add');

        },
        // 新增必填弹框
        diaInfoCheck: function () {
            var _this = this;
            if (!this.scenario) {
                this.showDialog('add', 'info', true, '适用场景不能为空');
                return false;
            }
            if (!this.mdlNm) {
                this.showDialog('add', 'info', true, '模型名称不能为空');
                return false;
            }
            if(this.mdlDesc!=""){
                var text2 = $("#mdlDesc").val();
                //中文字数统计
                str2= (text2.replace(/\w/g,"")).length;
                //非汉字的个数
                abcnum2 = text2.length-str2;
                total2 = str2+abcnum2;
                if(total2 >100){
                    _this.showDialog('add', 'info', true, '您输入的模型描述字数已超100个字符!');
                    return false
                }
            }
            // if (!this.prdAttrValue) {
            //     this.showDialog('add', 'info', true, '产品运作方式不能为空');
            //     return false;
            // }
            // if(this.prdAttrValue!="10001"){
            //     if (!this.prdAttrValue1) {
            //         this.showDialog('add', 'info', true, '期限不能为空');
            //         return false;
            //     }
            // }
            // if (!this.prdAttrValue2) {
            //     this.showDialog('add', 'info', true, '风险等级不能为空');
            //     return false;
            // }

            if (!this.compare) {
                this.showDialog('add', 'info', true, '注册距今天数不能为空');
                return false;
            }
            if (!this.compare2) {
                this.showDialog('add', 'info', true, '近半年登陆次数不能为空');
                return false;
            }
            if (!this.compare3) {
                this.showDialog('add', 'info', true, '近一年登陆次数不能为空');
                return false;
            }
            if (!this.highCustomer) {
                this.showDialog('add', 'info', true, '是否是高净值客户不能为空');
                return false;
            }
            // var req= /^-?\d+(\.\d{1,4})?$/;
            for(var i in _this.lableList){
                console.log(_this.lableList[i].tagWeight);
                if(!/^-?\d+(\.\d{1,4})?$/.test(_this.lableList[i].tagWeight)){
                    this.showDialog('add', 'info', true, '权重小数点不能超过4位');
                    return false;
                }
            }

            for(var i in _this.priorityList){
                console.log(_this.priorityList[i].recomLvl);
                if(_this.priorityList[i].recomLvl>=10){
                    this.showDialog('add', 'info', true, '推荐优先级最大不能超过9');
                    return false;
                }
            }
            return true;
        },
        saveParam:function(){
            var _this = this;
            if (this.diaInfoCheck()) {
                var params = {}
                params.mdlDesc = this.mdlDesc;//模型描述
                    params.mdlNm = this.mdlNm;   //模型名称
                    params.mdlSt = 'N';  //模型状态
                    params.mdlTp = "";      //模型类型-----待定
                    params.scenario = this.scenario;//模型适用场景
                    console.log("运作方式:",_this.prdAttrValueList);
                    console.log("期限列表:",_this.qixianList);
                    console.log("风险等级列表:",_this.fengxianList);
                    var obj=[];
                    var qixian=[];
                    var fengxian=[];
                    for(var i=0;i<_this.prdAttrValueList.length;i++) {  //产品运作方式
                        obj.push({
                                prdAttr: "000101",
                                prdAttrValue:_this.prdAttrValueList[i]
                            }
                        )
                        if(_this.prdAttrValueList.length>1&&_this.prdAttrValueList[i]=='10001'){
                            _this.showDialog('add', 'info', true, "所选的运作方式里存在’开放式'不能选择期限,请单独选择10001开放式");
                            return false;
                        }
                    }
                    if(!_this.prdAttrValueList.includes('10001')&&_this.qixianList.length==0){
                            _this.showDialog('add', 'info', true, "请选择期限");
                            return false;
                    }


                    for(var i=0;i<_this.qixianList.length;i++) {  //期限
                        qixian.push({
                                prdAttr: "000201",
                                prdAttrValue:_this.qixianList[i]
                            }
                        )
                    }
                    for(var i=0;i<_this.fengxianList.length;i++) {  //风险等级
                        fengxian.push({
                                prdAttr: "000301",
                                prdAttrValue:_this.fengxianList[i]
                            }
                        )
                    }

                    // var obj={    //产品运作方式
                    //     prdAttr: "000101",
                    //     prdAttrValue: this.prdAttrValue
                    // };

                    // var obj2= {   //期限
                    //     prdAttr: "000201",
                    //     prdAttrValue: this.prdAttrValue1
                    // };
                    // var obj3={   //等级
                    //     prdAttr: "000301",
                    //     prdAttrValue: this.prdAttrValue2
                    // };
                params.prds = [];               //产品属性
                var obj3=obj.concat(qixian);    //合并期限对象数组
                var obj4=obj3.concat(fengxian); //合并风险对象数组
                params.prds=obj4;

                // if(this.prdAttrValue!="10001"){    //如果为10001持有期，则不能选择期限
                //     params.prds.push(obj2);
                // }
                // params.prds.push(obj3);

                params.custTags = [            //比较关系
                    {
                        compare: this.compare,
                        compareValueEnd: this.compareValueEnd,
                        compareValueStr: this.compareValueStr,
                        tagId: "vaccoreq_num"     //距今天注册数
                    },
                    {
                        compare: this.compare2,
                        compareValueEnd: this.compareValueEnd1,
                        compareValueStr: this.compareValueStr1,
                        tagId: "app_rect6mlogcnt"   //近半年登陆次数
                    },
                    {
                        compare: this.compare3,
                        compareValueEnd: this.compareValueEnd2,
                        compareValueStr: this.compareValueStr2,
                        tagId: "app_rect12mlogcnt"     //近一年登陆次数
                    },
                    {
                        compare:'eqs',
                        compareValueEnd:"",
                        compareValueStr: this.highCustomer,
                        tagId: "hnwcustflag"     //是否是高净值客户
                    }
                ];
                // if(this.compare!=""){
                //     params.custTags.push(obj);
                // }
                // if(this.compare2!=""){
                //     params.custTags.push(obj2);
                // }
                // if(this.compare2!=""){
                //     params.custTags.push(obj3);
                // }
                // params.custTags.push(obj);
                // params.custTags.push(obj2);
                // params.custTags.push(obj3);

                params.formulas = _this.lableList;   //标签类别,权重
                params.recoms = _this.priorityList;  //上线，下限，优先级

                params.terminal = {
                    accptBranchCode: "247",
                    accptMd: "COUNTER",
                    clientVersion: "",
                    deviceId: "",
                    imei: "",
                    imsi: "",
                    ip: "",
                    mac: "",
                    model: "",
                    os: "",
                    udid: "",
                    userAgent: "",
                    uuid: ""
                }


                console.log(params)
                $.post({
                    url: '/clientMgmt/labelApplication/modelConfigurationMgmt/saveParam.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.getTableData(0);
                            _this.showDialog('add', 'info', false, result.msg);
                        } else {
                            _this.showDialog('add', 'info', true, result.msg);
                        }
                    }
                });
            }
        },

        // 查看
        showDetail:function(item){
            var _this = this;
            var params={}
            _this.listData=[];
            params.mdlId=item.mdlId;
            params.mdlVer=item.mdlVer;
            _this.prdAttrValueList=[];
            _this.qixianList=[];
            _this.fengxianList=[];
            // $('#prdAttrValueList1').html('<option value=""></option>');
            // $('#prdAttrValueList1').val('');
            $('#prdAttrValueList1').trigger('chosen:updated');
            $('#qixianList1').trigger('chosen:updated');
            $('#fengxianList1').trigger('chosen:updated');
            $.post({
                url: '/clientMgmt/labelApplication/modelConfigurationMgmt/queryLableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.listData.push(result.data.tableData);

                        console.log("_this.listData",_this.listData);
                        _this.listData.forEach(function(itemDate){
                            itemDate.prds.forEach(function(itemPrds){
                                if(itemPrds.prdAttr=="000101"){
                                    _this.prdAttrValueList.push(itemPrds.prdAttrValue);  //运作方式
                                }
                                if(itemPrds.prdAttr=="000201"){
                                    _this.qixianList.push(itemPrds.prdAttrValue);       //期限
                                }
                                if(itemPrds.prdAttr=="000301"){
                                    _this.fengxianList.push(itemPrds.prdAttrValue);       //期限
                                }

                            })
                            console.log(_this.prdAttrValueList);
                            console.log(_this.qixianList);
                            console.log(_this.fengxianList);

                            _this.scenario=itemDate.scenario;
                            _this.mdlNm=itemDate.mdlNm;
                            _this.mdlDesc=itemDate.mdlDesc;

                            // if(itemDate.prds.length<=2){
                            //     _this.prdAttrValue=itemDate.prds[0].prdAttrValue;
                            //     _this.prdAttrValue2=itemDate.prds[1].prdAttrValue;
                            // }else {
                            //     _this.prdAttrValue = itemDate.prds[0].prdAttrValue;
                            //     _this.prdAttrValue1 = itemDate.prds[1].prdAttrValue;
                            //     _this.prdAttrValue2 = itemDate.prds[2].prdAttrValue;
                            // }

                            $('#prdAttrValueList1').val(_this.prdAttrValueList);
                            $('#prdAttrValueList1').trigger('chosen:updated');
                            $('#qixianList1').val(_this.qixianList);
                            $('#qixianList1').trigger('chosen:updated');
                            $('#fengxianList1').val(_this.fengxianList);
                            $('#fengxianList1').trigger('chosen:updated');

                            console.log(itemDate.custTags);
                            itemDate.custTags.forEach(function(itemTag){ //分类显示
                                if(itemTag.tagId==="vaccoreq_num"){  // //距今天注册数
                                    _this.compare=itemTag.compare;
                                    _this.compareValueStr=itemTag.compareValueStr;
                                    _this.compareValueEnd=itemTag.compareValueEnd;
                                    if (itemTag.compare == ">") {
                                        _this.one = "大于:";
                                    } else if (itemTag.compare == "<") {
                                        _this.one = "小于:";
                                    } else if (itemTag.compare == "=") {
                                        _this.one = "等于:";
                                    } else if (itemTag.compare ==">=") {
                                        _this.one = "大于等于:";
                                    } else if (itemTag.compare =="<=") {
                                        _this.one = "小于等于:";
                                    } else if (itemTag.compare =="btw") {
                                        _this.one = "介于:";
                                    } else {
                                        return;
                                    }
                                }
                                if(itemTag.tagId==="app_rect6mlogcnt"){   //近半年登陆次数
                                    _this.compare2=itemTag.compare;
                                    _this.compareValueStr1=itemTag.compareValueStr;
                                    _this.compareValueEnd1=itemTag.compareValueEnd;
                                    if (itemTag.compare == ">") {
                                        _this.one2 = "大于:";
                                    } else if (itemTag.compare == "<") {
                                        _this.one2 = "小于:";
                                    } else if (itemTag.compare == "=") {
                                        _this.one2 = "等于:";
                                    } else if (itemTag.compare ==">=") {
                                        _this.one2 = "大于等于:";
                                    } else if (itemTag.compare =="<=") {
                                        _this.one2 = "小于等于:";
                                    } else if (itemTag.compare =="btw") {
                                        _this.one2 = "介于:";
                                    } else {
                                        return;
                                    }
                                }
                                if(itemTag.tagId==="app_rect12mlogcnt"){    //近一年登陆次数
                                    _this.compare3=itemTag.compare;
                                    _this.compareValueStr2=itemTag.compareValueStr;
                                    _this.compareValueEnd2=itemTag.compareValueEnd;
                                    if (itemTag.compare == ">") {
                                        _this.one3 = "大于:";
                                    } else if (itemTag.compare == "<") {
                                        _this.one3 = "小于:";
                                    } else if (itemTag.compare == "=") {
                                        _this.one3 = "等于:";
                                    } else if (itemTag.compare ==">=") {
                                        _this.one3 = "大于等于:";
                                    } else if (itemTag.compare =="<=") {
                                        _this.one3 = "小于等于:";
                                    } else if (itemTag.compare =="btw") {
                                        _this.one3 = "介于:";
                                    } else {
                                        return;
                                    }
                                }
                                if(itemTag.tagId==="hnwcustflag"){      //是否是高净值客户
                                    _this.highCustomer=itemTag.compareValueStr;
                                }

                            })

                            _this.lableList=itemDate.formulas;
                            _this.priorityList=itemDate.recoms;
                        })

                    } else {
                        // _this.tableData = [];
                        _this.showDialog('details', 'info', false, result.msg);
                    }
                }
            });




            // this.compare=item.custTags[0].compare;

            // this.compare2=item.custTags[1].compare;

            // this.compare3=item.custTags[2].compare;

            // this.highCustomer=item.custTags[3].compareValueStr;
            // this.compareValueStr=item.custTags[0].compareValueStr;
            // this.compareValueEnd=item.custTags[0].compareValueEnd;
            // this.compareValueStr1=item.custTags[1].compareValueStr;
            // this.compareValueEnd1=item.custTags[1].compareValueEnd;
            // this.compareValueStr2=item.custTags[2].compareValueStr;
            // this.compareValueEnd2=item.custTags[2].compareValueEnd;


            this.showDialog('', 'details');
        },
        // 修改
        showUpdate:function(item){
            var _this = this;
            this.mdlId=item.mdlId;
            this.mdlVer=item.mdlVer;
            var params={}
            _this.listData=[];
            _this.prdAttrValueList=[];
            _this.qixianList=[];
            _this.fengxianList=[];
            $('#prdAttrValueList2').trigger('chosen:updated');
            $('#qixianList2').trigger('chosen:updated');
            $('#fengxianList2').trigger('chosen:updated');
            params.mdlId=item.mdlId;
            params.mdlVer=item.mdlVer;
            // 根据模型ID和版本号查询
            $.post({
                url: '/clientMgmt/labelApplication/modelConfigurationMgmt/queryLableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.listData.push(result.data.tableData);

                        console.log("_this.listData",_this.listData);
                        _this.listData.forEach(function(itemDate){
                            _this.scenario=itemDate.scenario;
                            _this.mdlNm=itemDate.mdlNm;
                            _this.mdlDesc=itemDate.mdlDesc;

                            itemDate.prds.forEach(function(itemPrds){
                                if(itemPrds.prdAttr=="000101"){
                                    _this.prdAttrValueList.push(itemPrds.prdAttrValue);  //运作方式
                                }
                                if(itemPrds.prdAttr=="000201"){
                                    _this.qixianList.push(itemPrds.prdAttrValue);       //期限
                                }
                                if(itemPrds.prdAttr=="000301"){
                                    _this.fengxianList.push(itemPrds.prdAttrValue);       //期限
                                }

                            })

                            console.log(_this.prdAttrValueList);
                            console.log(_this.qixianList);
                            console.log(_this.fengxianList);
                            $('#prdAttrValueList2').val(_this.prdAttrValueList);
                            $('#prdAttrValueList2').trigger('chosen:updated');
                            $('#qixianList2').val(_this.qixianList);
                            $('#qixianList2').trigger('chosen:updated');
                            $('#fengxianList2').val(_this.fengxianList);
                            $('#fengxianList2').trigger('chosen:updated');

                            console.log(itemDate.custTags);
                            itemDate.custTags.forEach(function(itemTag){ //分类显示
                                if(itemTag.tagId==="vaccoreq_num"){  // //距今天注册数
                                    _this.compare=itemTag.compare;
                                    _this.compareValueStr=itemTag.compareValueStr;
                                    _this.compareValueEnd=itemTag.compareValueEnd;
                                    if (itemTag.compare == ">") {
                                        _this.one = "大于:";
                                    } else if (itemTag.compare == "<") {
                                        _this.one = "小于:";
                                    } else if (itemTag.compare == "=") {
                                        _this.one = "等于:";
                                    } else if (itemTag.compare ==">=") {
                                        _this.one = "大于等于:";
                                    } else if (itemTag.compare =="<=") {
                                        _this.one = "小于等于:";
                                    } else if (itemTag.compare =="btw") {
                                        _this.one = "介于:";
                                    } else {
                                        return;
                                    }
                                }
                                if(itemTag.tagId==="app_rect6mlogcnt"){   //近半年登陆次数
                                    _this.compare2=itemTag.compare;
                                    _this.compareValueStr1=itemTag.compareValueStr;
                                    _this.compareValueEnd1=itemTag.compareValueEnd;
                                    if (itemTag.compare == ">") {
                                        _this.one2 = "大于:";
                                    } else if (itemTag.compare == "<") {
                                        _this.one2 = "小于:";
                                    } else if (itemTag.compare == "=") {
                                        _this.one2 = "等于:";
                                    } else if (itemTag.compare ==">=") {
                                        _this.one2 = "大于等于:";
                                    } else if (itemTag.compare =="<=") {
                                        _this.one2 = "小于等于:";
                                    } else if (itemTag.compare =="btw") {
                                        _this.one2 = "介于:";
                                    } else {
                                        return;
                                    }
                                }
                                if(itemTag.tagId==="app_rect12mlogcnt"){    //近一年登陆次数
                                    _this.compare3=itemTag.compare;
                                    _this.compareValueStr2=itemTag.compareValueStr;
                                    _this.compareValueEnd2=itemTag.compareValueEnd;
                                    if (itemTag.compare == ">") {
                                        _this.one3 = "大于:";
                                    } else if (itemTag.compare == "<") {
                                        _this.one3 = "小于:";
                                    } else if (itemTag.compare == "=") {
                                        _this.one3 = "等于:";
                                    } else if (itemTag.compare ==">=") {
                                        _this.one3 = "大于等于:";
                                    } else if (itemTag.compare =="<=") {
                                        _this.one3 = "小于等于:";
                                    } else if (itemTag.compare =="btw") {
                                        _this.one3 = "介于:";
                                    } else {
                                        return;
                                    }
                                }
                                if(itemTag.tagId==="hnwcustflag"){      //是否是高净值客户
                                    _this.highCustomer=itemTag.compareValueStr;
                                }

                            })

                            _this.lableList=itemDate.formulas;
                            _this.priorityList=itemDate.recoms;

                        })

                    } else {
                        // _this.tableData = [];
                        _this.showDialog('revise', 'info', false, result.msg);
                    }
                }
            });
            _this.showDialog('', 'revise');

            // this.mdlId=item.mdlId;
            // this.mdlVer=item.mdlVer;
            // this.scenario=item.scenario;
            // this.mdlNm=item.mdlNm;
            // this.mdlDesc=item.mdlDesc;
            // if(item.prds.length<=2){
            //     this.prdAttrValue=item.prds[0].prdAttrValue;
            //     this.prdAttrValue2=item.prds[1].prdAttrValue;
            // }else{
            //     this.prdAttrValue=item.prds[0].prdAttrValue;
            //     this.prdAttrValue1=item.prds[1].prdAttrValue;
            //     this.prdAttrValue2=item.prds[2].prdAttrValue;
            // }
            // _this.lableList=item.formulas;
            // _this.priorityList=item.recoms;
            // item.custTags.forEach(function(item){ //分类显示
            //     if(item.tagId==="vaccoreq_num"){  // //距今天注册数
            //         _this.compare=item.compare;
            //         _this.compareValueStr=item.compareValueStr;
            //         _this.compareValueEnd=item.compareValueEnd;
            //         if (item.compare == ">") {
            //             _this.one = "大于:";
            //         } else if (item.compare == "<") {
            //             _this.one = "小于:";
            //         } else if (item.compare == "=") {
            //             _this.one = "等于:";
            //         } else if (item.compare ==">=") {
            //             _this.one = "大于等于:";
            //         } else if (item.compare =="<=") {
            //             _this.one = "小于等于:";
            //         } else if (item.compare =="btw") {
            //             _this.one = "介于:";
            //         } else {
            //             return;
            //         }
            //     }
            //     if(item.tagId==="app_rect6mlogcnt"){   //近半年登陆次数
            //         _this.compare2=item.compare;
            //         _this.compareValueStr1=item.compareValueStr;
            //         _this.compareValueEnd1=item.compareValueEnd;
            //         if (item.compare == ">") {
            //             _this.one2 = "大于:";
            //         } else if (item.compare == "<") {
            //             _this.one2 = "小于:";
            //         } else if (item.compare == "=") {
            //             _this.one2 = "等于:";
            //         } else if (item.compare ==">=") {
            //             _this.one2 = "大于等于:";
            //         } else if (item.compare =="<=") {
            //             _this.one2 = "小于等于:";
            //         } else if (item.compare =="btw") {
            //             _this.one2 = "介于:";
            //         } else {
            //             return;
            //         }
            //     }
            //     if(item.tagId==="app_rect12mlogcnt"){    //近一年登陆次数
            //         _this.compare3=item.compare;
            //         _this.compareValueStr2=item.compareValueStr;
            //         _this.compareValueEnd2=item.compareValueEnd;
            //         if (item.compare == ">") {
            //             _this.one3 = "大于:";
            //         } else if (item.compare == "<") {
            //             _this.one3 = "小于:";
            //         } else if (item.compare == "=") {
            //             _this.one3 = "等于:";
            //         } else if (item.compare ==">=") {
            //             _this.one3 = "大于等于:";
            //         } else if (item.compare =="<=") {
            //             _this.one3 = "小于等于:";
            //         } else if (item.compare =="btw") {
            //             _this.one3 = "介于:";
            //         } else {
            //             return;
            //         }
            //     }
            //     if(item.tagId==="hnwcustflag"){      //是否是高净值客户
            //         _this.highCustomer=item.compareValueStr;
            //     }
            // })

            // this.compare=item.custTags[0].compare;
            // this.compare2=item.custTags[1].compare;
            // this.compare3=item.custTags[2].compare;
            // this.highCustomer=item.custTags[3].compareValueStr;
            // this.compareValueStr=item.custTags[0].compareValueStr;
            // this.compareValueEnd=item.custTags[0].compareValueEnd;
            // this.compareValueStr1=item.custTags[1].compareValueStr;
            // this.compareValueEnd1=item.custTags[1].compareValueEnd;
            // this.compareValueStr2=item.custTags[2].compareValueStr;
            // this.compareValueEnd2=item.custTags[2].compareValueEnd;

        },
        update: function () {
            var _this = this;
            var params = {};
            params.mdlId=this.mdlId;
            params.mdlVer=this.mdlVer;
            params.mdlDesc=this.mdlDesc;//模型描述
            params.mdlNm=this.mdlNm;   //模型名称
            params.mdlSt='N';  //模型状态
            params.mdlTp="";      //模型类型-----待定
            params.scenario=this.scenario;//模型适用场景

            console.log("运作方式:",_this.prdAttrValueList);
            console.log("期限列表:",_this.qixianList);
            console.log("风险等级列表:",_this.fengxianList);
            var obj=[];
            var qixian=[];
            var fengxian=[];
            for(var i=0;i<_this.prdAttrValueList.length;i++) {  //产品运作方式
                obj.push({
                        prdAttr: "000101",
                        prdAttrValue:_this.prdAttrValueList[i]
                    }
                )
                if(_this.prdAttrValueList.length>1&&_this.prdAttrValueList[i]=='10001'){
                    _this.showDialog('revise', 'info', true, "所选的运作方式里存在’开放式'不能选择期限,请单独选择10001开放式");
                    return false;
                }
            }
            if(!_this.prdAttrValueList.includes('10001')&&_this.qixianList.length==0){
                _this.showDialog('revise', 'info', true, "请选择期限");
                return false;
            }


            for(var i=0;i<_this.qixianList.length;i++) {  //期限
                qixian.push({
                        prdAttr: "000201",
                        prdAttrValue:_this.qixianList[i]
                    }
                )
            }
            for(var i=0;i<_this.fengxianList.length;i++) {  //风险等级
                fengxian.push({
                        prdAttr: "000301",
                        prdAttrValue:_this.fengxianList[i]
                    }
                )
            }

            params.prds = [];               //产品属性
            var obj3=obj.concat(qixian);    //合并期限对象数组
            var obj4=obj3.concat(fengxian); //合并风险对象数组
            params.prds=obj4;


            // params.prds = [];               //产品属性
            // params.prds.push(obj);
            // if(this.prdAttrValue!="10001"){    //如果为10001持有期，则不能选择期限
            //     params.prds.push(obj2);
            // }
            // params.prds.push(obj3);

                // params.prds=[
                //     {
                //         prdAttr: "000101",
                //         prdAttrValue: this.prdAttrValue
                //     },
                //     {
                //         prdAttr: "000201",
                //         prdAttrValue: this.prdAttrValue1
                //     },
                //     {
                //         prdAttr: "000301",
                //         prdAttrValue:this.prdAttrValue2
                //     }
                // ]

            params.custTags=[            //比较关系
                {
                    compare: this.compare,
                    compareValueEnd: this.compareValueEnd,
                    compareValueStr: this.compareValueStr,
                    tagId: "vaccoreq_num"     //距今天注册数
                },
                {
                    compare: this.compare2,
                    compareValueEnd: this.compareValueEnd1,
                    compareValueStr: this.compareValueStr1,
                    tagId: "app_rect6mlogcnt "   //近半年登陆次数
                },
                {
                    compare: this.compare3,
                    compareValueEnd: this.compareValueEnd2,
                    compareValueStr: this.compareValueStr2,
                    tagId: "app_rect12mlogcnt "     //近一年登陆次数
                },
                {
                    compare:'eqs',
                    compareValueEnd:"",
                    compareValueStr:this.highCustomer,
                    tagId: "hnwcustflag"     //是否是高净值客户
                }

            ],

            params.formulas=_this.lableList;   //标签类别,权重
            params.recoms=_this.priorityList;  //上线，下限，优先级

            params.terminal={
                accptBranchCode: "247",
                accptMd: "COUNTER",
                clientVersion: "",
                deviceId: "",
                imei: "",
                imsi: "",
                ip: "",
                mac: "",
                model: "",
                os: "",
                udid: "",
                userAgent: "",
                uuid: ""
            }

            console.log(params);
            $.post({
                url: '/clientMgmt/labelApplication/modelConfigurationMgmt/update.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0);
                        _this.showDialog('revise', 'info', false, result.msg);
                    }
                    _this.showDialog('revise', 'info', true, result.msg);
                }
            });
        },

        // 复制
        showCopy:function(item){
            var _this = this;
            this.mdlId=item.mdlId;
            this.mdlVer=item.mdlVer;
            var params={}
            _this.listData=[];
            _this.prdAttrValueList=[];
            _this.qixianList=[];
            _this.fengxianList=[];
            $('#prdAttrValueList3').trigger('chosen:updated');
            $('#qixianList3').trigger('chosen:updated');
            $('#fengxianList3').trigger('chosen:updated');
            params.mdlId=item.mdlId;
            params.mdlVer=item.mdlVer;
            $.post({
                url: '/clientMgmt/labelApplication/modelConfigurationMgmt/queryLableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.listData.push(result.data.tableData);

                        console.log("_this.listData",_this.listData);
                        _this.listData.forEach(function(itemDate){
                            _this.scenario=itemDate.scenario;
                            _this.mdlNm=itemDate.mdlNm;
                            _this.mdlDesc=itemDate.mdlDesc;

                            itemDate.prds.forEach(function(itemPrds){
                                if(itemPrds.prdAttr=="000101"){
                                    _this.prdAttrValueList.push(itemPrds.prdAttrValue);  //运作方式
                                }
                                if(itemPrds.prdAttr=="000201"){
                                    _this.qixianList.push(itemPrds.prdAttrValue);       //期限
                                }
                                if(itemPrds.prdAttr=="000301"){
                                    _this.fengxianList.push(itemPrds.prdAttrValue);       //期限
                                }

                            })
                            console.log(_this.prdAttrValueList);
                            console.log(_this.qixianList);
                            console.log(_this.fengxianList);
                            $('#prdAttrValueList3').val(_this.prdAttrValueList);
                            $('#prdAttrValueList3').trigger('chosen:updated');
                            $('#qixianList3').val(_this.qixianList);
                            $('#qixianList3').trigger('chosen:updated');
                            $('#fengxianList3').val(_this.fengxianList);
                            $('#fengxianList3').trigger('chosen:updated');

                            console.log(itemDate.custTags);
                            itemDate.custTags.forEach(function(itemTag){ //分类显示
                                if(itemTag.tagId==="vaccoreq_num"){  // //距今天注册数
                                    _this.compare=itemTag.compare;
                                    _this.compareValueStr=itemTag.compareValueStr;
                                    _this.compareValueEnd=itemTag.compareValueEnd;
                                    if (itemTag.compare == ">") {
                                        _this.one = "大于:";
                                    } else if (itemTag.compare == "<") {
                                        _this.one = "小于:";
                                    } else if (itemTag.compare == "=") {
                                        _this.one = "等于:";
                                    } else if (itemTag.compare ==">=") {
                                        _this.one = "大于等于:";
                                    } else if (itemTag.compare =="<=") {
                                        _this.one = "小于等于:";
                                    } else if (itemTag.compare =="btw") {
                                        _this.one = "介于:";
                                    } else {
                                        return;
                                    }
                                }
                                if(itemTag.tagId==="app_rect6mlogcnt"){   //近半年登陆次数
                                    _this.compare2=itemTag.compare;
                                    _this.compareValueStr1=itemTag.compareValueStr;
                                    _this.compareValueEnd1=itemTag.compareValueEnd;
                                    if (itemTag.compare == ">") {
                                        _this.one2 = "大于:";
                                    } else if (itemTag.compare == "<") {
                                        _this.one2 = "小于:";
                                    } else if (itemTag.compare == "=") {
                                        _this.one2 = "等于:";
                                    } else if (itemTag.compare ==">=") {
                                        _this.one2 = "大于等于:";
                                    } else if (itemTag.compare =="<=") {
                                        _this.one2 = "小于等于:";
                                    } else if (itemTag.compare =="btw") {
                                        _this.one2 = "介于:";
                                    } else {
                                        return;
                                    }
                                }
                                if(itemTag.tagId==="app_rect12mlogcnt"){    //近一年登陆次数
                                    _this.compare3=itemTag.compare;
                                    _this.compareValueStr2=itemTag.compareValueStr;
                                    _this.compareValueEnd2=itemTag.compareValueEnd;
                                    if (itemTag.compare == ">") {
                                        _this.one3 = "大于:";
                                    } else if (itemTag.compare == "<") {
                                        _this.one3 = "小于:";
                                    } else if (itemTag.compare == "=") {
                                        _this.one3 = "等于:";
                                    } else if (itemTag.compare ==">=") {
                                        _this.one3 = "大于等于:";
                                    } else if (itemTag.compare =="<=") {
                                        _this.one3 = "小于等于:";
                                    } else if (itemTag.compare =="btw") {
                                        _this.one3 = "介于:";
                                    } else {
                                        return;
                                    }
                                }
                                if(itemTag.tagId==="hnwcustflag"){      //是否是高净值客户
                                    _this.highCustomer=itemTag.compareValueStr;
                                }

                            })

                            _this.lableList=itemDate.formulas;
                            _this.priorityList=itemDate.recoms;
                        })

                    } else {
                        // _this.tableData = [];
                        _this.showDialog('copy', 'info', false, result.msg);
                    }
                }
            });
            _this.showDialog('', 'copy');

        },

        saveCopy:function(){
            var _this = this;
            // if (this.diaInfoCheck()) {
                var params = {}
                params.mdlDesc = this.mdlDesc;//模型描述
                    params.mdlNm = this.mdlNm;   //模型名称
                    params.mdlSt = 'N';  //模型状态
                    params.mdlTp = "";      //模型类型-----待定
                    params.scenario = this.scenario;//模型适用场景

                console.log("运作方式:",_this.prdAttrValueList);
                console.log("期限列表:",_this.qixianList);
                console.log("风险等级列表:",_this.fengxianList);
                var obj=[];
                var qixian=[];
                var fengxian=[];
                for(var i=0;i<_this.prdAttrValueList.length;i++) {  //产品运作方式
                    obj.push({
                            prdAttr: "000101",
                            prdAttrValue:_this.prdAttrValueList[i]
                        }
                    )
                    if(_this.prdAttrValueList.length>1&&_this.prdAttrValueList[i]=='10001'){
                        _this.showDialog('copy', 'info', true, "所选的运作方式里存在’开放式'不能选择期限,请单独选择10001开放式");
                        return false;
                    }
                }
                if(!_this.prdAttrValueList.includes('10001')&&_this.qixianList.length==0){
                    _this.showDialog('copy', 'info', true, "请选择期限");
                    return false;
                }


                for(var i=0;i<_this.qixianList.length;i++) {  //期限
                    qixian.push({
                            prdAttr: "000201",
                            prdAttrValue:_this.qixianList[i]
                        }
                    )
                }
                for(var i=0;i<_this.fengxianList.length;i++) {  //风险等级
                    fengxian.push({
                            prdAttr: "000301",
                            prdAttrValue:_this.fengxianList[i]
                        }
                    )
                }
                params.prds = [];               //产品属性
                var obj3=obj.concat(qixian);    //合并期限对象数组
                var obj4=obj3.concat(fengxian); //合并风险对象数组
                params.prds=obj4;

                    // params.prds = [
                    //     {
                    //         prdAttr: "000101",
                    //         prdAttrValue: this.prdAttrValue
                    //     },
                    //     {
                    //         prdAttr: "000201",
                    //         prdAttrValue: this.prdAttrValue1
                    //     },
                    //     {
                    //         prdAttr: "000301",
                    //         prdAttrValue: this.prdAttrValue2
                    //     }
                    // ]

                params.custTags = [            //比较关系
                    {
                        compare: this.compare,
                        compareValueEnd: this.compareValueEnd,
                        compareValueStr: this.compareValueStr,
                        tagId: "vaccoreq_num"     //距今天注册数
                    },
                    {
                        compare: this.compare2,
                        compareValueEnd: this.compareValueEnd1,
                        compareValueStr: this.compareValueStr1,
                        tagId: "app_rect6mlogcnt"   //近半年登陆次数
                    },
                    {
                        compare: this.compare3,
                        compareValueEnd: this.compareValueEnd2,
                        compareValueStr: this.compareValueStr2,
                        tagId: "app_rect12mlogcnt"     //近一年登陆次数
                    },
                    {
                        compare:'eqs',
                        compareValueEnd:"",
                        compareValueStr: this.highCustomer,
                        tagId: "hnwcustflag"     //是否是高净值客户
                    }
                ],

                params.formulas = _this.lableList;   //标签类别,权重
                params.recoms = _this.priorityList;  //上线，下限，优先级

                params.terminal = {
                    accptBranchCode: "247",
                    accptMd: "COUNTER",
                    clientVersion: "",
                    deviceId: "",
                    imei: "",
                    imsi: "",
                    ip: "",
                    mac: "",
                    model: "",
                    os: "",
                    udid: "",
                    userAgent: "",
                    uuid: ""
                }

                console.log(params)
                $.post({
                    url: '/clientMgmt/labelApplication/modelConfigurationMgmt/saveParam.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.getTableData(0);
                            _this.showDialog('copy', 'info', false, result.msg);
                        } else {
                            _this.showDialog('copy', 'info', true, result.msg);
                        }
                    }
                });
            // }
        },

        // 失效
        invalidParam:function(item){
            var _this=this;
            var params={}
            params.mdlId=item.mdlId;
            params.mdlVer=item.mdlVer;
            console.log(params);
            $.post({
                url: '/clientMgmt/labelApplication/modelConfigurationMgmt/invalidParam.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0);
                        _this.showDialog('', 'info', false, result.msg);
                    }else {
                        _this.showDialog('', 'info', true, result.msg);
                    }
                }
            });
        },

        // 设置为正常
        setNormal:function(item){
            var _this = this;
            this.mdlId=item.mdlId;
            this.mdlVer=item.mdlVer;
            var params={}
            _this.listData=[];
            _this.prdAttrValueList=[];
            _this.qixianList=[];
            _this.fengxianList=[];
            $('#prdAttrValueList2').trigger('chosen:updated');
            $('#qixianList2').trigger('chosen:updated');
            $('#fengxianList2').trigger('chosen:updated');
            params.mdlId=item.mdlId;
            params.mdlVer=item.mdlVer;
            // 根据模型ID和版本号查询
            $.post({
                url: '/clientMgmt/labelApplication/modelConfigurationMgmt/queryLableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.listData.push(result.data.tableData);

                        console.log("_this.listData",_this.listData);
                        _this.listData.forEach(function(itemDate){
                            _this.scenario=itemDate.scenario;
                            _this.mdlNm=itemDate.mdlNm;
                            _this.mdlDesc=itemDate.mdlDesc;

                            itemDate.prds.forEach(function(itemPrds){
                                if(itemPrds.prdAttr=="000101"){
                                    _this.prdAttrValueList.push(itemPrds.prdAttrValue);  //运作方式
                                }
                                if(itemPrds.prdAttr=="000201"){
                                    _this.qixianList.push(itemPrds.prdAttrValue);       //期限
                                }
                                if(itemPrds.prdAttr=="000301"){
                                    _this.fengxianList.push(itemPrds.prdAttrValue);       //期限
                                }

                            })

                            console.log(_this.prdAttrValueList);
                            console.log(_this.qixianList);
                            console.log(_this.fengxianList);
                            $('#prdAttrValueList2').val(_this.prdAttrValueList);
                            $('#prdAttrValueList2').trigger('chosen:updated');
                            $('#qixianList2').val(_this.qixianList);
                            $('#qixianList2').trigger('chosen:updated');
                            $('#fengxianList2').val(_this.fengxianList);
                            $('#fengxianList2').trigger('chosen:updated');

                            console.log(itemDate.custTags);
                            itemDate.custTags.forEach(function(itemTag){ //分类显示
                                if(itemTag.tagId==="vaccoreq_num"){  // //距今天注册数
                                    _this.compare=itemTag.compare;
                                    _this.compareValueStr=itemTag.compareValueStr;
                                    _this.compareValueEnd=itemTag.compareValueEnd;
                                    if (itemTag.compare == ">") {
                                        _this.one = "大于:";
                                    } else if (itemTag.compare == "<") {
                                        _this.one = "小于:";
                                    } else if (itemTag.compare == "=") {
                                        _this.one = "等于:";
                                    } else if (itemTag.compare ==">=") {
                                        _this.one = "大于等于:";
                                    } else if (itemTag.compare =="<=") {
                                        _this.one = "小于等于:";
                                    } else if (itemTag.compare =="btw") {
                                        _this.one = "介于:";
                                    } else {
                                        return;
                                    }
                                }
                                if(itemTag.tagId==="app_rect6mlogcnt"){   //近半年登陆次数
                                    _this.compare2=itemTag.compare;
                                    _this.compareValueStr1=itemTag.compareValueStr;
                                    _this.compareValueEnd1=itemTag.compareValueEnd;
                                    if (itemTag.compare == ">") {
                                        _this.one2 = "大于:";
                                    } else if (itemTag.compare == "<") {
                                        _this.one2 = "小于:";
                                    } else if (itemTag.compare == "=") {
                                        _this.one2 = "等于:";
                                    } else if (itemTag.compare ==">=") {
                                        _this.one2 = "大于等于:";
                                    } else if (itemTag.compare =="<=") {
                                        _this.one2 = "小于等于:";
                                    } else if (itemTag.compare =="btw") {
                                        _this.one2 = "介于:";
                                    } else {
                                        return;
                                    }
                                }
                                if(itemTag.tagId==="app_rect12mlogcnt"){    //近一年登陆次数
                                    _this.compare3=itemTag.compare;
                                    _this.compareValueStr2=itemTag.compareValueStr;
                                    _this.compareValueEnd2=itemTag.compareValueEnd;
                                    if (itemTag.compare == ">") {
                                        _this.one3 = "大于:";
                                    } else if (itemTag.compare == "<") {
                                        _this.one3 = "小于:";
                                    } else if (itemTag.compare == "=") {
                                        _this.one3 = "等于:";
                                    } else if (itemTag.compare ==">=") {
                                        _this.one3 = "大于等于:";
                                    } else if (itemTag.compare =="<=") {
                                        _this.one3 = "小于等于:";
                                    } else if (itemTag.compare =="btw") {
                                        _this.one3 = "介于:";
                                    } else {
                                        return;
                                    }
                                }
                                if(itemTag.tagId==="hnwcustflag"){      //是否是高净值客户
                                    _this.highCustomer=itemTag.compareValueStr;
                                }

                            })

                            _this.lableList=itemDate.formulas;
                            _this.priorityList=itemDate.recoms;

                        })

                    } else {
                        // _this.tableData = [];
                        _this.showDialog('normal', 'info', false, result.msg);
                    }
                }
            });
            _this.showDialog("",'normal',false,'确定恢复为正常!');
        },
        setRight: function () {
            var _this = this;
            var params = {};
            params.mdlId=this.mdlId;
            params.mdlVer=this.mdlVer;
            params.mdlDesc=this.mdlDesc;//模型描述
            params.mdlNm=this.mdlNm;   //模型名称
            params.mdlSt='N';  //模型状态-N正常，C-失效
            params.mdlTp="";      //模型类型-----待定
            params.scenario=this.scenario;//模型适用场景

            console.log("运作方式:",_this.prdAttrValueList);
            console.log("期限列表:",_this.qixianList);
            console.log("风险等级列表:",_this.fengxianList);
            var obj=[];
            var qixian=[];
            var fengxian=[];
            for(var i=0;i<_this.prdAttrValueList.length;i++) {  //产品运作方式
                obj.push({
                        prdAttr: "000101",
                        prdAttrValue:_this.prdAttrValueList[i]
                    }
                )
                if(_this.prdAttrValueList.length>1&&_this.prdAttrValueList[i]=='10001'){
                    _this.showDialog('normal', 'info', true, "所选的运作方式里存在’开放式'不能选择期限,请单独选择10001开放式");
                    return false;
                }
            }
            if(!_this.prdAttrValueList.includes('10001')&&_this.qixianList.length==0){
                _this.showDialog('normal', 'info', true, "请选择期限");
                return false;
            }


            for(var i=0;i<_this.qixianList.length;i++) {  //期限
                qixian.push({
                        prdAttr: "000201",
                        prdAttrValue:_this.qixianList[i]
                    }
                )
            }
            for(var i=0;i<_this.fengxianList.length;i++) {  //风险等级
                fengxian.push({
                        prdAttr: "000301",
                        prdAttrValue:_this.fengxianList[i]
                    }
                )
            }

            params.prds = [];               //产品属性
            var obj3=obj.concat(qixian);    //合并期限对象数组
            var obj4=obj3.concat(fengxian); //合并风险对象数组
            params.prds=obj4;


            // params.prds = [];               //产品属性
            // params.prds.push(obj);
            // if(this.prdAttrValue!="10001"){    //如果为10001持有期，则不能选择期限
            //     params.prds.push(obj2);
            // }
            // params.prds.push(obj3);

            // params.prds=[
            //     {
            //         prdAttr: "000101",
            //         prdAttrValue: this.prdAttrValue
            //     },
            //     {
            //         prdAttr: "000201",
            //         prdAttrValue: this.prdAttrValue1
            //     },
            //     {
            //         prdAttr: "000301",
            //         prdAttrValue:this.prdAttrValue2
            //     }
            // ]

            params.custTags=[            //比较关系
                {
                    compare: this.compare,
                    compareValueEnd: this.compareValueEnd,
                    compareValueStr: this.compareValueStr,
                    tagId: "vaccoreq_num"     //距今天注册数
                },
                {
                    compare: this.compare2,
                    compareValueEnd: this.compareValueEnd1,
                    compareValueStr: this.compareValueStr1,
                    tagId: "app_rect6mlogcnt "   //近半年登陆次数
                },
                {
                    compare: this.compare3,
                    compareValueEnd: this.compareValueEnd2,
                    compareValueStr: this.compareValueStr2,
                    tagId: "app_rect12mlogcnt "     //近一年登陆次数
                },
                {
                    compare:'eqs',
                    compareValueEnd:"",
                    compareValueStr:this.highCustomer,
                    tagId: "hnwcustflag"     //是否是高净值客户
                }

            ],

            params.formulas=_this.lableList;   //标签类别,权重
            params.recoms=_this.priorityList;  //上线，下限，优先级

            params.terminal={
                accptBranchCode: "247",
                accptMd: "COUNTER",
                clientVersion: "",
                deviceId: "",
                imei: "",
                imsi: "",
                ip: "",
                mac: "",
                model: "",
                os: "",
                udid: "",
                userAgent: "",
                uuid: ""
            }

            console.log(params);
            $.post({
                url: '/clientMgmt/labelApplication/modelConfigurationMgmt/update.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0);
                        _this.mdlNm="";
                        _this.showDialog('normal', 'info', false, result.msg);
                    }
                    _this.showDialog('normal', 'info', false, result.msg);
                }
            });
        },

        // 版本记录
        versionRecord:function(item){
            var _this=this;
            this.mdlId=item.mdlId;
            this.mdlVer=item.mdlVer;
            var params={}
            params.mdlId=item.mdlId;
            console.log(params);
            $.post({
                url: '/clientMgmt/labelApplication/modelConfigurationMgmt/versionRecord.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        console.log(result.data);
                        _this.versionList=result.data;
                    }else {
                        _this.showDialog('version', 'info', true, result.msg);
                    }
                }
            });
            this.showDialog('', 'version');
        },
        showLook:function(item){   //版本回退查看
            var _this=this;
            // _this.mdlId=item.mdlId;
            // _this.mdlVer=item.mdlVer;
            var params={}
            _this.showDialog('version', 'backVersion', false);
            _this.listData=[];
            params.mdlId=item.mdlId;
            params.mdlVer=item.mdlVer;
            _this.prdAttrValueList=[];
            _this.qixianList=[];
            _this.fengxianList=[];
            $('#prdAttrValueList4').trigger('chosen:updated');
            $('#qixianList4').trigger('chosen:updated');
            $('#fengxianList4').trigger('chosen:updated');
            console.log(params);
            $.post({
                url: '/clientMgmt/labelApplication/modelConfigurationMgmt/queryLableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.listData.push(result.data.tableData);

                        console.log("_this.listData",_this.listData);
                        _this.listData.forEach(function(itemDate){
                            _this.scenario=itemDate.scenario;
                            _this.mdlNm=itemDate.mdlNm;
                            _this.mdlDesc=itemDate.mdlDesc;

                            itemDate.prds.forEach(function(itemPrds){
                                if(itemPrds.prdAttr=="000101"){
                                    _this.prdAttrValueList.push(itemPrds.prdAttrValue);  //运作方式
                                }
                                if(itemPrds.prdAttr=="000201"){
                                    _this.qixianList.push(itemPrds.prdAttrValue);       //期限
                                }
                                if(itemPrds.prdAttr=="000301"){
                                    _this.fengxianList.push(itemPrds.prdAttrValue);       //期限
                                }

                            })
                            console.log(_this.prdAttrValueList);
                            console.log(_this.qixianList);
                            console.log(_this.fengxianList);
                            $('#prdAttrValueList4').val(_this.prdAttrValueList);
                            $('#prdAttrValueList4').trigger('chosen:updated');
                            $('#qixianList4').val(_this.qixianList);
                            $('#qixianList4').trigger('chosen:updated');
                            $('#fengxianList4').val(_this.fengxianList);
                            $('#fengxianList4').trigger('chosen:updated');

                            console.log(itemDate.custTags);
                            itemDate.custTags.forEach(function(itemTag){ //分类显示
                                if(itemTag.tagId==="vaccoreq_num"){  // //距今天注册数
                                    _this.compare=itemTag.compare;
                                    _this.compareValueStr=itemTag.compareValueStr;
                                    _this.compareValueEnd=itemTag.compareValueEnd;
                                    if (itemTag.compare == ">") {
                                        _this.one = "大于:";
                                    } else if (itemTag.compare == "<") {
                                        _this.one = "小于:";
                                    } else if (itemTag.compare == "=") {
                                        _this.one = "等于:";
                                    } else if (itemTag.compare ==">=") {
                                        _this.one = "大于等于:";
                                    } else if (itemTag.compare =="<=") {
                                        _this.one = "小于等于:";
                                    } else if (itemTag.compare =="btw") {
                                        _this.one = "介于:";
                                    } else {
                                        return;
                                    }
                                }
                                if(itemTag.tagId==="app_rect6mlogcnt"){   //近半年登陆次数
                                    _this.compare2=itemTag.compare;
                                    _this.compareValueStr1=itemTag.compareValueStr;
                                    _this.compareValueEnd1=itemTag.compareValueEnd;
                                    if (itemTag.compare == ">") {
                                        _this.one2 = "大于:";
                                    } else if (itemTag.compare == "<") {
                                        _this.one2 = "小于:";
                                    } else if (itemTag.compare == "=") {
                                        _this.one2 = "等于:";
                                    } else if (itemTag.compare ==">=") {
                                        _this.one2 = "大于等于:";
                                    } else if (itemTag.compare =="<=") {
                                        _this.one2 = "小于等于:";
                                    } else if (itemTag.compare =="btw") {
                                        _this.one2 = "介于:";
                                    } else {
                                        return;
                                    }
                                }
                                if(itemTag.tagId==="app_rect12mlogcnt"){    //近一年登陆次数
                                    _this.compare3=itemTag.compare;
                                    _this.compareValueStr2=itemTag.compareValueStr;
                                    _this.compareValueEnd2=itemTag.compareValueEnd;
                                    if (itemTag.compare == ">") {
                                        _this.one3 = "大于:";
                                    } else if (itemTag.compare == "<") {
                                        _this.one3 = "小于:";
                                    } else if (itemTag.compare == "=") {
                                        _this.one3 = "等于:";
                                    } else if (itemTag.compare ==">=") {
                                        _this.one3 = "大于等于:";
                                    } else if (itemTag.compare =="<=") {
                                        _this.one3 = "小于等于:";
                                    } else if (itemTag.compare =="btw") {
                                        _this.one3 = "介于:";
                                    } else {
                                        return;
                                    }
                                }
                                if(itemTag.tagId==="hnwcustflag"){      //是否是高净值客户
                                    _this.highCustomer=itemTag.compareValueStr;
                                }

                            })

                            _this.lableList=itemDate.formulas;
                            _this.priorityList=itemDate.recoms;
                        })

                    } else {
                        // _this.tableData = [];
                        _this.showDialog('backVersion', 'info', false, result.msg);
                    }
                }
            });

            // $.post({
            //     url: '/clientMgmt/labelApplication/modelConfigurationMgmt/lookVersion.ajax',
            //     data: params,
            //     success: function (result) {
            //         if (result.error === 0) {
            //             _this.tableData.push(result.data.tableData);
            //             console.log(_this.tableData);
            //         }else {
            //             _this.showDialog('', 'info', true, result.msg);
            //         }
            //     }
            // });
        },
        // 回退到版本
        backVersion: function () {
            var _this = this;
            var params = {};
            params.mdlId=_this.mdlId;
            params.mdlVer=this.mdlVer;
            params.mdlDesc=this.mdlDesc;//模型描述
            params.mdlNm=this.mdlNm;   //模型名称
            params.mdlSt='N';  //模型状态
            params.mdlTp="";      //模型类型-----待定
            params.scenario=this.scenario;//模型适用场景


            console.log("运作方式:",_this.prdAttrValueList);
            console.log("期限列表:",_this.qixianList);
            console.log("风险等级列表:",_this.fengxianList);
            var obj=[];
            var qixian=[];
            var fengxian=[];
            for(var i=0;i<_this.prdAttrValueList.length;i++) {  //产品运作方式
                obj.push({
                        prdAttr: "000101",
                        prdAttrValue:_this.prdAttrValueList[i]
                    }
                )
                if(_this.prdAttrValueList.length>1&&_this.prdAttrValueList[i]=='10001'){
                    _this.showDialog('revise', 'info', true, "所选的运作方式里存在’开放式'不能选择期限,请单独选择10001开放式");
                    return false;
                }
            }
            if(!_this.prdAttrValueList.includes('10001')&&_this.qixianList.length==0){
                _this.showDialog('revise', 'info', true, "请选择期限");
                return false;
            }


            for(var i=0;i<_this.qixianList.length;i++) {  //期限
                qixian.push({
                        prdAttr: "000201",
                        prdAttrValue:_this.qixianList[i]
                    }
                )
            }
            for(var i=0;i<_this.fengxianList.length;i++) {  //风险等级
                fengxian.push({
                        prdAttr: "000301",
                        prdAttrValue:_this.fengxianList[i]
                    }
                )
            }

            params.prds = [];               //产品属性
            var obj3=obj.concat(qixian);    //合并期限对象数组
            var obj4=obj3.concat(fengxian); //合并风险对象数组
            params.prds=obj4;

            // params.prds=[
            //     {
            //         prdAttr: "000101",
            //         prdAttrValue: this.prdAttrValue
            //     },
            //     {
            //         prdAttr: "000201",
            //         prdAttrValue: this.prdAttrValue1
            //     },
            //     {
            //         prdAttr: "000301",
            //         prdAttrValue:this.prdAttrValue2
            //     }
            // ]

            params.custTags=[            //比较关系
                {
                    compare: this.compare,
                    compareValueEnd: this.compareValueEnd,
                    compareValueStr: this.compareValueStr,
                    tagId: "vaccoreq_num"     //距今天注册数
                },
                {
                    compare: this.compare2,
                    compareValueEnd: this.compareValueEnd1,
                    compareValueStr: this.compareValueStr1,
                    tagId: "app_rect6mlogcnt "   //近半年登陆次数
                },
                {
                    compare: this.compare3,
                    compareValueEnd: this.compareValueEnd2,
                    compareValueStr: this.compareValueStr2,
                    tagId: "app_rect12mlogcnt "     //近一年登陆次数
                },
                {
                    compare:'eqs',
                    compareValueEnd:"",
                    compareValueStr:this.highCustomer,
                    tagId: "hnwcustflag"     //是否是高净值客户
                }

            ],

            params.formulas=_this.lableList;   //标签类别,权重
            params.recoms=_this.priorityList;  //上线，下限，优先级

            params.terminal={
                accptBranchCode: "247",
                accptMd: "COUNTER",
                clientVersion: "",
                deviceId: "",
                imei: "",
                imsi: "",
                ip: "",
                mac: "",
                model: "",
                os: "",
                udid: "",
                userAgent: "",
                uuid: ""
            }

            console.log(params)
            $.post({
                url: '/clientMgmt/labelApplication/modelConfigurationMgmt/update.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0);
                        _this.showDialog('version', 'backVersion', false, result.msg);
                    }
                    _this.showDialog('backVersion', 'info', false, result.msg);
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
        mdlSt: function (item) {
            if (item) {
                return item.replace(/N/g, '正常').replace(/C/g, '撤销').replace(/B/g, '待审核').replace(/D/g, '审核未通过')
            }
        },
        scenario: function (item) {
            if (item) {
                return item.replace(/000101/g, 'IPO').replace(/000201/g, 'IPO打开流失').replace(/000301/g, '定开打开流失').replace(/000401/g, '持营')
            }
        },

    }
});
