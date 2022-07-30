Vue.component('selectChosen', {
    template: `
        <select class="chosen-select form-control" ref="sele">
                <option value="">请选择</option>
                <option :value="item[keyName[0]]"
                 v-for="(item,index) in list">
                 {{item[keyName[0]]}}-{{item[keyName[1]]}}
                </option>
        </select>
        `,
    model: {
        prop: "value",
        event: "change",
    },
    props: {
        value: {
            validator: () => true,
        },
        list: {
            type: [Object, Array],
            default: () => [],
        },
        keyName:{
            type:Array,
            default:()=> ['','']
        }
    },
    watch: {
        value(newval) {
            $(this.$refs.sele).val(newval).trigger("chosen:updated");
        }
    },
    mounted() {
        $(this.$refs.sele).chosen({
            search_contains: true,
            no_results_text: '未找到',
            disable_search_threshold: 6,
            width: '210px'
        });
        $(this.$refs.sele).on('change', function (e, params) {
            this.$emit('change', params ? params.selected : '')
        }.bind(this));
    },
    updated() {
        $(this.$refs.sele).trigger("chosen:updated");
    },
})

new Vue({
    el: '#content',
    data: {
        s_partnerid: "",
        s_fundid: "",
        s_status: "",

        diaMsg: "",
        tableData: [],
        //   表格分页
        currentIndex: 0,
        pageMaxNum: '20',
        condition: "",
        fbStatus: "",

    //    系统名称：HOP,PSP,IAO,FISP
        systems:["psp","hop","iao","fisp"],
        //选择的系统
        system:"psp",
        //状态数组 PSP: 0-无效,R-认购,1-有效  HOP: N-有效，C -无效
        statusDetails:{
            psp:[
                {code:"1",msg:"有效"},
                {code:"R",msg:"认购"},
                {code:"0",msg:"无效"}
            ],
            hop:[
                {code:"N",msg:"有效"},
                {code:"C",msg:"无效"}
            ],
            iao:[
                {code:"N",msg:"有效"},
                {code:"C",msg:"无效"}
            ],
            fisp:[
                {code:"N",msg:"有效"},
                {code:"C",msg:"无效"}
            ]
        },
        //显示
        statusList:[
            {code:"1",msg:"有效"},
            {code:"R",msg:"认购"},
            {code:"0",msg:"无效"}
        ],

        //hop的合作方
        hopPartnerList:[],

        //psp合作方
        pspPartnerList:[],

        //psp更新对象
        pspForm:{
            partnerid :'',
            partnerName :'',
            fundid :'',
            fundname :'',
            tano  :'',
            melonmd :'',
            updateby:'',
            status :'',
            updatetime:''
        },
        //hop更新新增对象
        hopForm:{
            branchCode:'',
            partnerName :'',
            fundId:'',
            fundName :'',
            distributorCode:'247',
            taNo:'',
            status:'',
            userNm:'',
            updateTimestamp:''
        },

        iaoForm:{
            partnerAgencyNo:'',
            partnerBranchCode:'',
            groupId:'',
            partnerGroupId:'',
            status:'',
            userNm:'',
            updateTimestamp:''
        },

        //fisp更新新增对象
        fispForm:{
            distributorCode:'247',
            branchCode:'247',
            fundId:'',
            fundName:'',
            taNo:'',
            status:'',
            userNm:'',
            updateTimestamp:''
        },
        //新增页面系统值
        addSystem:'',
        //psp 确认删除
        delPspConfirm:{
            partnerid: '',
            fundid: ''
        },
        //HOP 确认删除
        delHopConfirm:{
            distributorCode:'',
            branchCode:'',
            fundId:''
        },
        delIaoConfirm:{
            partnerAgencyNo:'',
            partnerBranchCode:'',
            groupId:''
        },
        //fisp 确认删除
        delFispConfirm:{
            distributorCode:'',
            branchCode:'',
            fundId:''
        }
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
            var currentIndex = parseInt(this.currentIndex);
            return this.middleData[currentIndex];
        }
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
        },
        system:{
            handler:function (val,oldVal) {
                //更换系统 切换状态码
                if (val ==='psp') {
                    this.statusList =this.statusDetails.psp;
                }else if (val ==='hop'){
                    this.statusList = this.statusDetails.hop;
                }else if (val ==='iao'){
                    this.statusList = this.statusDetails.iao
                }else if (val ==='fisp'){
                    this.statusList = this.statusDetails.fisp
                }
                //选择状态为全部
                this.s_status ="";

                console.log(val)
                //查询
                this.search();

            }
        },
        addSystem:{
            handler: function (val, oldval) {
                if (val ==='psp') {
                    $('#showAddHop').modal('hide');
                    $('#showAddIao').modal('hide');
                    $('#showAddPsp').modal('show');
                    $('#showAddFisp').modal('hide');
                }else if (val ==='hop'){
                    $('#showAddIao').modal('hide');
                    $('#showAddPsp').modal('hide');
                    $('#showAddHop').modal('show');
                    $('#showAddFisp').modal('hide');
                }else if (val ==='iao'){
                    $('#showAddPsp').modal('hide');
                    $('#showAddHop').modal('hide');
                    $('#showAddIao').modal('show');
                    $('#showAddFisp').modal('hide');
                }else if (val ==='fisp'){
                    $('#showAddPsp').modal('hide');
                    $('#showAddHop').modal('hide');
                    $('#showAddIao').modal('hide');
                    $('#showAddFisp').modal('show');
                }

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

        _this.validAddPspForm();
        _this.validUpdatePspForm();
        _this.validAddHopForm();
        _this.validupdateHopForm();
        _this.validAddIaoForm();
        _this.validupdateIaoForm();
        _this.validAddFispForm();
        _this.validupdateFispForm();
        /*初始化数据*/
        _this.search();
        console.log('invoke parnter');
        _this.getHopPartnerList();
        _this.getPspPartnerList();

    },
    methods: {

        search: function () {
            var _this = this;
            //根据系统查询
           if (_this.system ==='psp'){
               _this.searchPsp();
           } else if (_this.system==='hop'){
               _this.searchHop();
           } else if (_this.system==='iao'){
               _this.searchIao();
           } else if (_this.system==='fisp'){
               _this.searchFisp();
           }
        },

        /*查询psp产品*/
        searchPsp:function(){
            var _this = this;
            var params = {};
            params.partnerid = _this.s_partnerid;
            params.fundid = _this.s_fundid;
            if (_this.s_status != "") {
                params.status = _this.s_status;
            }
            console.log(params);
            $.get({
                url: '/thirdPartyOperation/products/pspfund/searchPsp.ajax',
                data: params,
                success: function (result) {
                    console.log(params)
                    console.log(result)
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

        /*查询hop产品*/
        searchHop:function(){
            var _this = this;
            var params = {};
            params.branchCode = _this.s_partnerid;
            params.fundid = _this.s_fundid;
            if (_this.s_status != "") {
                params.status = _this.s_status;
            }
            console.log(params);
            $.get({
                url: '/thirdPartyOperation/products/pspfund/searchHop.ajax',
                data: params,
                success: function (result) {
                    console.log(result)
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

        searchIao:function(){
            var _this = this;
            var params = {};
            params.partnerAgencyNo = _this.s_partnerid;
            params.groupId = _this.s_fundid;
            if (_this.s_status != "") {
                params.status = _this.s_status;
            }
            console.log(params);
            $.get({
                url: '/thirdPartyOperation/products/pspfund/searchIao.ajax',
                data: params,
                success: function (result) {
                    console.log(result)
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

        /*查询fisp产品*/
        searchFisp:function(){
            var _this = this;
            var params = {};
            params.branchCode = _this.s_partnerid;
            params.fundid = _this.s_fundid;
            if (_this.s_status != "") {
                params.status = _this.s_status;
            }
            console.log(params);
            $.get({
                url: '/thirdPartyOperation/products/pspfund/searchFisp.ajax',
                data: params,
                success: function (result) {
                    console.log(result)
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

        // dialog表格校验
        validAddPspForm: function () {
            //绑定验证器
            return $("#addPspForm").validate({
                rules: {
                    partnerid: {
                        required: true,
                        rangelength:[10,10],
                    },
                    fundid:{
                        required:true,
                        maxlength:6,
                    },
                    fundname:{
                        required:true,
                    },
                    tano:{
                        required:true,
                        maxlength:4,
                    },
                    status:{
                        required:true,
                    },
                    melonmd:{
                        maxlength:4,
                    }
                },
                messages: {
                    partnerid: {
                        required: "渠道编号不能为空!",
                        rangelength: "必须为10位的字符！",
                    },
                    fundid: {
                        required: "产品ID不能为空!",
                        maxlength: "不得超过6位字符！",
                    },
                    fundname:{
                        required:"产品名称不能为空！",
                    },
                    tano:{
                        required:"tano不能为空！",
                        maxlength:"不得超过4位",
                    },
                    status:{
                        required:"状态值不能为空！",
                    },
                    melonmd:{
                        maxlength:"不得超过4位",
                    }
                },

                submitHandler:function() {
                    return false;
                },
            });

        },

        validUpdatePspForm:function(){
            //绑定验证器
            return $("#updatePspForm").validate({
                rules: {

                    fundname:{
                        required:true,
                    },
                    tano:{
                        required:true,
                        maxlength:4,
                    },
                    status:{
                        required:true,
                    },
                    melonmd:{
                        maxlength:4,
                    }
                },
                messages: {
                    fundname:{
                        required:"产品名称不能为空！",
                    },
                    tano:{
                        required:"tano不能为空！",
                        maxlength:"不得超过4位",
                    },
                    status:{
                        required:"状态值不能为空！",
                    },
                    melonmd:{
                        maxlength:"不得超过4位",
                    }
                },

                submitHandler:function() {
                    return false;
                },
            });
        },

        /*hop校验*/
        validAddHopForm: function () {
            //绑定验证器
            return $("#addHopForm").validate({
                rules: {
                    branchCode: {
                        required: true,
                        maxlength:6,
                    },
                    fundId:{
                        required:true,
                        maxlength:6,
                    },
                    distributorCode:{
                        required:true,
                        maxlength:10
                    },
                    taNo:{
                        required:true,
                        maxlength:2,
                    },
                    status:{
                        required:true,
                    },
                },
                messages: {
                    branchCode: {
                        required: "渠道编号不能为空!",
                        maxlength: "不得超过6位字符！"
                    },
                    fundId: {
                        required: "产品ID不能为空!",
                        maxlength: "不得超过6位字符！",
                    },
                    distributorCode:{
                        required:"销售机构代码不能为空！",
                        maxlength:"不得超过10位字符！"
                    },
                    taNo:{
                        required:"tano不能为空！",
                        maxlength:"不得超过2位",
                    },
                    status:{
                        required:"状态值不能为空！",
                    }
                },

                submitHandler:function() {
                    return false;
                },
            });

        },

        validupdateHopForm: function () {
            //绑定验证器
            return $("#updateHopForm").validate({
                rules: {

                    distributorCode:{
                        required:true,
                        maxlength:10
                    },
                    taNo:{
                        required:true,
                        maxlength:2,
                    },
                    status:{
                        required:true,
                    },
                },
                messages: {

                    distributorCode:{
                        required:"销售机构代码不能为空！",
                        maxlength:"不得超过10位字符！"
                    },
                    taNo:{
                        required:"tano不能为空！",
                        maxlength:"不得超过2位",
                    },
                    status:{
                        required:"状态值不能为空！",
                    }
                },

                submitHandler:function() {
                    return false;
                },
            });

        },

        validAddIaoForm: function () {
            //绑定验证器
            return $("#addIaoForm").validate({
                rules: {
                    partnerAgencyNo: {
                        required: true,
                        maxlength:9,
                    },
                    groupId:{
                        required:true,
                        maxlength:6,
                    },
                    partnerBranchCode:{
                        required:true,
                        maxlength:24
                    },
                    status:{
                        required:true,
                    },
                },
                messages: {
                    partnerAgencyNo: {
                        required: "合作方销售机构代码不能为空!",
                        maxlength: "不得超过9位字符！"
                    },
                    groupId: {
                        required: "策略代码不能为空!",
                        maxlength: "不得超过6位字符！",
                    },
                    partnerBranchCode:{
                        required:"合作方销售机构网点不能为空！",
                        maxlength:"不得超过24位字符！"
                    },
                    status:{
                        required:"状态值不能为空！",
                    }
                },

                submitHandler:function() {
                    return false;
                },
            });

        },

        validupdateIaoForm: function () {
            //绑定验证器
            return $("#updateIaoForm").validate({
                rules: {
                    partnerAgencyNo:{
                        required:true,
                        maxlength:9
                    },
                    groupId:{
                        required:true,
                        maxlength:6,
                    },
                    partnerBranchCode:{
                        required:true,
                        maxlength:24
                    },
                    status:{
                        required:true,
                    },
                },
                messages: {
                    partnerAgencyNo: {
                        required: "合作方销售机构代码不能为空!",
                        maxlength: "不得超过9位字符！"
                    },
                    groupId: {
                        required: "策略代码不能为空!",
                        maxlength: "不得超过6位字符！",
                    },
                    partnerBranchCode:{
                        required:"合作方销售机构网点不能为空！",
                        maxlength:"不得超过24位字符！"
                    },
                    status:{
                        required:"状态值不能为空！",
                    }
                },

                submitHandler:function() {
                    return false;
                },
            });

        },

        /*fisp校验*/
        validAddFispForm: function () {
            //绑定验证器
            return $("#addFispForm").validate({
                rules: {
                    distributorCode:{
                        required:true,
                        maxlength:10
                    },
                    branchCode: {
                        required: true,
                        maxlength:6,
                    },
                    fundId:{
                        required:true,
                        maxlength:6,
                    },
                    taNo:{
                        required:true,
                        maxlength:2,
                    },
                    status:{
                        required:true,
                    },
                },
                messages: {
                    distributorCode:{
                        required:"销售机构代码不能为空！",
                        maxlength:"不得超过10位字符！"
                    },
                    branchCode: {
                        required: "渠道编号不能为空!",
                        maxlength: "不得超过6位字符！"
                    },
                    fundId: {
                        required: "产品ID不能为空!",
                        maxlength: "不得超过6位字符！",
                    },
                    taNo:{
                        required:"tano不能为空！",
                        maxlength:"不得超过2位",
                    },
                    status:{
                        required:"状态值不能为空！",
                    }
                },

                submitHandler:function() {
                    return false;
                },
            });

        },

        validupdateFispForm: function () {
            //绑定验证器
            return $("#updateFispForm").validate({
                rules: {

                    distributorCode:{
                        required:true,
                        maxlength:10
                    },
                    taNo:{
                        required:true,
                        maxlength:2,
                    },
                    status:{
                        required:true,
                    },
                },
                messages: {

                    distributorCode:{
                        required:"销售机构代码不能为空！",
                        maxlength:"不得超过10位字符！"
                    },
                    taNo:{
                        required:"tano不能为空！",
                        maxlength:"不得超过2位",
                    },
                    status:{
                        required:"状态值不能为空！",
                    }
                },

                submitHandler:function() {
                    return false;
                },
            });

        },

        showAdd: function () {
            this.addSystem = this.system;
            this.pspForm={};
            this.pspForm.status="1";
            this.hopForm={};
            this.hopForm.distributorCode='247'
            this.hopForm.status="N";
            this.iaoForm={};
            this.iaoForm.status="N";
            this.fispForm={};
            this.fispForm.distributorCode='247'
            this.fispForm.branchCode='247'
            this.fispForm.status="N";
            if (this.system ==='psp') {
                $('#showAddPsp').modal('show');
            }else if (this.system==='hop'){
                $('#showAddHop').modal('show');

            }else if (this.system==='iao'){
                $('#showAddIao').modal('show');
            }else if (this.system==='fisp'){
                $('#showAddFisp').modal('show');
            }

        },

        getHopPartnerList: function () {
            var _this = this;
            console.log('/thirdPartyOperation/products/pspfund/getHopPartnerList.ajax getreq');
            $.get({
                url: '/thirdPartyOperation/products/pspfund/getHopPartnerList.ajax',
                success: function (result) {
                    console.log('result',result)
                    if (result.error == 0) {
                        this.hopPartnerList = result.data;
                        console.log('hopPartnerList:',this.hopPartnerList);
                    }
                }.bind(this)
            });
        },

        getPspPartnerList: function () {
            var _this = this;
            console.log('/thirdPartyOperation/products/pspfund/getPspPartnerList.ajax getreq');
            $.get({
                url: '/thirdPartyOperation/products/pspfund/getPspPartnerList.ajax',
                success: function (result) {
                    console.log('result',result)
                    if (result.error == 0) {
                        this.pspPartnerList = result.data;
                        console.log('pspPartnerList:',this.pspPartnerList);
                    }
                }.bind(this)
            });
        },

        addPsp: function () {
            var _this = this;
            if (!_this.validAddPspForm().form()) return;
            var params = _this.pspForm;
            console.log(params);

            $('#showAddPsp').modal('hide');
            $.post({
                url: '/thirdPartyOperation/products/pspfund/addPsp.ajax',
                data: params,
                success: function (result) {
                    console.log(params);
                    console.log(result);
                    if (result.error == 0) {
                        if (result.data.isSuccess) {
                            _this.showDialog('', 'info', false, '保存成功！');
                            _this.search();
                        }else {
                            _this.showDialog('', 'info', false, result.data.errMsg);
                        }
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    };
                },
                error: function () {
                    _this.showDialog('', 'info', false, '数据获取失败');
                }
            });


        },

        addHop:function(){
            var _this = this;
            if (!_this.validAddHopForm().form()) return;
            var params = _this.hopForm;

            console.log(params);

            $.post({
                url: '/thirdPartyOperation/products/pspfund/addHop.ajax',
                data: params,
                success: function (result) {
                    console.log(result);
                    $('#showAddHop').modal('hide');
                    if (result.error == 0) {
                        console.log(result)
                        _this.showDialog('', 'info', false, '保存成功！');
                        _this.search();

                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    };
                },
                error: function () {
                    _this.showDialog('', 'info', false, '数据获取失败');
                }
            });
        },

        addIao:function(){
            var _this = this;
            if (!_this.validAddIaoForm().form()) return;
            var params = _this.iaoForm;

            console.log(params);

            $.post({
                url: '/thirdPartyOperation/products/pspfund/addIao.ajax',
                data: params,
                success: function (result) {
                    console.log(result);
                    $('#showAddIao').modal('hide');
                    if (result.error == 0) {
                        console.log(result)
                        _this.showDialog('', 'info', false, '保存成功！');
                        _this.search();

                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    };
                },
                error: function () {
                    _this.showDialog('', 'info', false, '数据获取失败');
                }
            });
        },

        addFisp:function(){
            var _this = this;
            if (!_this.validAddFispForm().form()) return;
            var params = _this.fispForm;

            console.log(params);

            $.post({
                url: '/thirdPartyOperation/products/pspfund/addFisp.ajax',
                data: params,
                success: function (result) {
                    console.log(result);
                    $('#showAddFisp').modal('hide');
                    if (result.error == 0) {
                        console.log(result)
                        _this.showDialog('', 'info', false, '保存成功！');
                        _this.search();

                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    };
                },
                error: function () {
                    _this.showDialog('', 'info', false, '数据获取失败');
                }
            });
        },

        //去更新PSP
        showUpdatePsp: function (item) {
            _this = this;
            _this.pspForm =item;
            _this.showDialog('', 'showUpdatePsp');
        },
        //去更新Hop
        showUpdateHop: function (item) {
            _this = this;
            _this.hopForm =item;
            _this.showDialog('', 'showUpdateHop');
        },
        showUpdateIao: function (item) {
            _this = this;
            _this.iaoForm =item;
            _this.showDialog('', 'showUpdateIao');
        },
        //去更新fisp
        showUpdateFisp: function (item) {
            _this = this;
            _this.fispForm =item;
            _this.showDialog('', 'showUpdateFisp');
        },
        /*更新psp*/
        updatePsp: function () {
            _this=this;
            if (!_this.validUpdatePspForm().form()) return;
            var params = _this.pspForm;
            console.log(params);

            $.post({
                url: '/thirdPartyOperation/products/pspfund/updatePsp.ajax',
                data: params,
                success: function (result) {
                    console.log(params);
                    console.log(result);
                    _this.showDialog('showUpdatePsp', '');
                    if (result.error == 0) {
                        if (result.data.isSuccess) {
                            _this.showDialog('', 'info', false, '修改成功！')
                            _this.search();
                        }else {
                            _this.showDialog('', 'info', false, result.data.errMsg);
                        }
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                },
                error: function () {
                    _this.showDialog('', 'info', false, '数据获取失败');
                }
            });

        },
        /*更新hop*/
        updateHop: function () {
            _this=this;
            if (!_this.validupdateHopForm().form()) return;
            var params = _this.hopForm;
            console.log(params);

            $.post({
                url: '/thirdPartyOperation/products/pspfund/updateHop.ajax',
                data: params,
                success: function (result) {
                    console.log(result);
                    if (result.error == 0) {
                        _this.showDialog('showUpdateHop', '');
                        _this.showDialog('', 'info', false, '修改成功！')
                        _this.search();

                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                },
                error: function () {
                    _this.showDialog('', 'info', false, '数据获取失败');
                }
            });

        },
        /*更新iao*/
        updateIao: function () {
            _this=this;
            if (!_this.validupdateIaoForm().form()) return;
            var params = _this.iaoForm;
            console.log(params);

            $.post({
                url: '/thirdPartyOperation/products/pspfund/updateIao.ajax',
                data: params,
                success: function (result) {
                    console.log(result);
                    if (result.error == 0) {
                        _this.showDialog('showUpdateIao', '');
                        _this.showDialog('', 'info', false, '修改成功！')
                        _this.search();

                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                },
                error: function () {
                    _this.showDialog('', 'info', false, '数据获取失败');
                }
            });

        },
        /*更新fisp*/
        updateFisp: function () {
            _this=this;
            if (!_this.validupdateFispForm().form()) return;
            var params = _this.fispForm;
            console.log(params);

            $.post({
                url: '/thirdPartyOperation/products/pspfund/updateFisp.ajax',
                data: params,
                success: function (result) {
                    console.log(result);
                    if (result.error == 0) {
                        _this.showDialog('showUpdateFisp', '');
                        _this.showDialog('', 'info', false, '修改成功！')
                        _this.search();

                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                },
                error: function () {
                    _this.showDialog('', 'info', false, '数据获取失败');
                }
            });

        },
        /*删除确认框 PSP*/
        todelPsp: function (partnerid, fundid) {
            _this = this;
            _this.delPspConfirm.partnerid = partnerid;
            _this.delPspConfirm.fundid = fundid;
            _this.showDialog('', 'showDeletePsp');
        },
        /*删除确认框 Hop*/
        todelHop: function (distributorCode, branchCode,fundId) {
            _this = this;
            _this.delHopConfirm.distributorCode = distributorCode;
            _this.delHopConfirm.branchCode = branchCode;
            _this.delHopConfirm.fundId = fundId;
            _this.showDialog('', 'showDeleteHop');
        },
        todelIao: function (partnerAgencyNo, partnerBranchCode,groupId) {
            _this = this;
            _this.delIaoConfirm.partnerAgencyNo = partnerAgencyNo;
            _this.delIaoConfirm.partnerBranchCode = partnerBranchCode;
            _this.delIaoConfirm.groupId = groupId;
            _this.showDialog('', 'showDeleteIao');
        },
        /*删除确认框 fisp*/
        todelFisp: function (distributorCode, branchCode,fundId) {
            _this = this;
            _this.delFispConfirm.distributorCode = distributorCode;
            _this.delFispConfirm.branchCode = branchCode;
            _this.delFispConfirm.fundId = fundId;
            _this.showDialog('', 'showDeleteFisp');
        },
        /*删除Psp*/
        deletePsp: function () {
            _this = this;
            var params = _this.delPspConfirm;
            console.log(params);

            $.get({
                url: '/thirdPartyOperation/products/pspfund/deletePsp.ajax',
                data: params,
                success: function (result) {
                    console.log(params);
                    console.log(result);
                    if (result.error == 0) {
                        if (result.data.isSuccess) {
                            _this.showDialog('', 'info', false, '删除成功！')
                            _this.search();
                        }else {
                            _this.showDialog('', 'info', false, result.data.errMsg);
                        }

                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                },
                error: function () {
                    _this.showDialog('', 'info', false, '数据获取失败');
                }

            });
        },
        /*删除Hop*/
        deleteHop: function () {
            _this = this;
            var params = _this.delHopConfirm;
            console.log(params);

            $.get({
                url: '/thirdPartyOperation/products/pspfund/deleteHop.ajax',
                data: params,
                success: function (result) {
                    console.log(params);
                    console.log(result);
                    if (result.error == 0) {
                        _this.showDialog('', 'info', false, '删除成功！')
                        _this.search();
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                },
                error: function () {
                    _this.showDialog('', 'info', false, '数据获取失败');
                }

            });
        },

        deleteIao: function () {
            _this = this;
            var params = _this.delIaoConfirm;
            console.log(params);

            $.get({
                url: '/thirdPartyOperation/products/pspfund/deleteIao.ajax',
                data: params,
                success: function (result) {
                    console.log(params);
                    console.log(result);
                    if (result.error == 0) {
                        _this.showDialog('', 'info', false, '删除成功！')
                        _this.search();
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                },
                error: function () {
                    _this.showDialog('', 'info', false, '数据获取失败');
                }

            });
        },

        /* 删除Fisp */
        deleteFisp: function () {
            _this = this;
            var params = _this.delFispConfirm;
            console.log(params);

            $.get({
                url: '/thirdPartyOperation/products/pspfund/deleteFisp.ajax',
                data: params,
                success: function (result) {
                    console.log(params);
                    console.log(result);
                    if (result.error == 0) {
                        _this.showDialog('', 'info', false, '删除成功！')
                        _this.search();
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                },
                error: function () {
                    _this.showDialog('', 'info', false, '数据获取失败');
                }

            });
        },

        //导出excel   --0824
        exportExcel: function () {
            if (this.viewData.length === 0) {
                return this.showDialog('', 'info', false, '列表为空');
            }
            var elt = document.getElementById('simple-table');
            var wb = XLSX.utils.table_to_book(elt, { sheet: 'Sheet JS', raw:true});

            XLSX.writeFile(wb, '合作方上架基金列表.xlsx');
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

        formatTime: function (timestamp) {
            if(timestamp){
                var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
                var Y = date.getFullYear() + '-';
                var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
                var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
                var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
                var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
                return Y + M + D + h + m + s;
            }else{
                return '-';
            }

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
        }
    }

});