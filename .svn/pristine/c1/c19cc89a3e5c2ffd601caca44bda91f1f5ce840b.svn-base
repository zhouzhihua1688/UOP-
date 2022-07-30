new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        // 规则编号
        id: '',
        // 产品
        product: "",
        // 保存弹窗产品
        saveproduct: "",
        // 业务类型
        serialno: '',
        // actionType: "",
        actionType:[],
        endDate: "",
        endTime: "",
        groupid: "",
        startDate: "",
        startTime: "",

        remark: "",
        status: "",
        // 查询
        groupids:'',
        groupidList:"",
        isUpdate: false,
        //隐藏假分页节点元素
        showMysql: false,
        updateId: '',
        tableData: [],
        diaMsg: '',
        checkData: [],
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        pageMaxNum: '10',
        condition: '',

        currentIndex2: 0,
        // 全选
        allCheck: false,
        // 复核状态
        reviewStatus: "",
        // 数据库id
        mysqlId: "",
        // 数据类型(0:业务,1:Mysql数据库)
        type: "1",
        mysqlStatus: '',
        // mysql传产品值
        mysqlProduct: "",
        // 获取数据库产品所有ID
        arrId: [],
        oneId: '',
        operator: "",
        // 判断Mysql数据状态
        delete_flag: "",
        operate: '',
        // 自动获取规则编号Id
        ruleId: "",
        // type:1,
    },
    // 获取本地Mysql所有Id
    created: function () {
        // this.getlocalList()
        // this.getTableData(0,this.type);
        this.userName();
    },
    mounted: function () {
        var dialogs = ['info', 'del', 'del2', 'add', "update", "revise", 'subMit', 'delAgain'];
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
        // 时间插件
        $('.date-timepicker').datetimepicker({
            format: 'YYYY-MM-DD HH:mm:ss',//use this option to display seconds
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
        // 组合多选
        var selected = [];
        $('#actionType').multiselect({
            buttonWidth: '165px',
            maxHeight: 300,
            // enableFiltering: true,
            enableHTML: true,
            // includeSelectAllOption: true,//全选
            // selectAllText: '全选',//全选的checkbox名称
            nonSelectedText: '请选择',
            selectAllNumber: false,//true显示allselect（6）,false显示allselect
            selectAllName: 'select-all-name',
            selectAllValue: 'select-all-value',//可以为strig或者数字
            selectAllJustVisible: false,//选择所有的。true为全选可见的
            buttonClass: 'btn btn-white btn-primary',
            buttonText: function (options, select) {
                var once = [];
                $('#actionType option:selected').each(function () {
                    once.push($(this).attr('label'));
                });
                // console.log(options.length);
                // console.log(options.prevObject.length);
                if (options.length === 0) {
                    return this.nonSelectedText;
                } else if (options.length === 1) {
                    return once[0];
                } else if (options.length > 1) {
                    return '已选' + once.length
                }
            },
            templates: {
                button: '<button type="button" class="multiselect dropdown-toggle" data-toggle="dropdown"><span class="multiselect-selected-text"></span> &nbsp;<b class="fa fa-caret-down"></b></button>',
                ul: '<ul class="multiselect-container dropdown-menu"></ul>',
                filter: '<li class="multiselect-item filter"><div class="input-group"><span class="input-group-addon"><i class="fa fa-search"></i></span><input class="form-control multiselect-search" type="text"></div></li>',
                filterClearBtn: '<span class="input-group-btn"><button class="btn btn-default btn-white btn-grey multiselect-clear-filter" type="button"><i class="fa fa-times-circle red2"></i></button></span>',
                li: '<li><a tabindex="0"><label></label></a></li>',
                divider: '<li class="multiselect-item divider"></li>',
                liGroup: '<li class="multiselect-item multiselect-group"><label></label></li>'
            },
            onDropdownHide: function (event) {
                selected = [];
                $('#actionType option:selected').each(function () {
                    selected.push($(this).val());
                });
                // console.log(selected,'selected');
                _this.actionType = $("#actionType").val() ? $("#actionType").val() : [];
            }
        });
        this.getTableData(0, this.type);
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
            }
            else {
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
        pageList: function () {
            var arr = [];
            if (this.middleData.length <= 2 * this.maxSpace) {
                for (var i = 0; i < this.middleData.length; i++) {
                    arr.push(i + 1);
                }
                return arr;
            }
            if (this.currentIndex > this.maxSpace && this.middleData.length - this.currentIndex > this.maxSpace) {
                for (var i = this.currentIndex - this.maxSpace; i < this.currentIndex + this.maxSpace; i++) {
                    arr.push(i + 1);
                }
            }
            else if (this.currentIndex <= this.maxSpace && this.middleData.length - this.currentIndex > this.maxSpace) {
                for (var i = 0; i < this.currentIndex + (2 * this.maxSpace - this.currentIndex); i++) {
                    arr.push(i + 1);
                }
            }
            else if (this.currentIndex > this.maxSpace && this.middleData.length - this.currentIndex <= this.maxSpace) {
                var space = this.middleData.length - this.currentIndex;
                for (var i = this.currentIndex - (2 * this.maxSpace - space); i < this.middleData.length; i++) {
                    arr.push(i + 1);
                }
            }
            else {
                for (var i = 0; i < this.middleData.length; i++) {
                    arr.push(i + 1);
                }
            }
            return arr;
        }
    },
    watch: {
        pageMaxNum: function () {
            this.getTableData(0, this.type);
        },
        // 假分页
        watch: {
            pageMaxNum: function () {
                this.currentIndex = 0;
                this.getTableData(0, this.type)
            },
            condition: function () {
                this.currentIndex = 0;
            }
        },

    },
    methods: {
        // 获取信息
        userName: function () {
            var _this = this;
            var operator;
            $.post({
                url: '/businessMgmt/combinationProductConfig/productTradeHandle/userName.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        operator = result.data
                    }
                    _this.operator = operator
                }
            });
        },

        // 获取表格数据
        getTableData: function (currentIndex, type) {
            var _this = this;
            var params = {};
            //传过去的状态参数
            params.type = type;
            console.log(params)
            // 获取业务数据
            if (type == 0) {
                this.isUpdate = true;  //显示业务端分页
                this.showMysql = false//显示假分页
                this.currentIndex = 0;
                params.groupid = this.groupidList;
                $.post({
                    url: '/businessMgmt/combinationProductConfig/productTradeHandle/getTableData.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            this.pageMaxNum =1;
                            _this.tableData = result.data.tableData.filter(function (item) {
                                return item.groupid.indexOf(params.groupid) > -1
                            })
                        }
                        else {
                            _this.tableData = [];
                            _this.showDialog('', 'info', false, result.msg);
                        }
                    }
                });
            }
            // 获取本地数据
            if (type == 1) {
                var _this = this;
                // 真假分页切换
                this.isUpdate = false;
                this.showMysql = true;
                this.currentIndex = 0;
                params.reviewStatus = this.reviewStatus; //复核状态
                params.groupid = this.groupids;
                var actionType=[{'value':"01","name":"申购"},{'value':"02","name":"赎回"},{'value':"03","name":"定投"},{'value':"04","name":"调仓"},
                    {'value':"05","name":"解散"},{'value':"06","name":"标准转出"},{'value':"07","name":"自定义转出"},{'value':"08","name":"标准转入"},{
                        'value':"09","name":"自定义转入"}];
                //类型多选条件
                _this.dataSummary(actionType, 'value', 'label', 'actionType');
                $.post({
                    url: '/businessMgmt/combinationProductConfig/productTradeHandle/getTableData.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.tableData = result.data
                        }
                        else {
                            _this.showDialog('', 'info', false, result.msg);

                        }
                    }
                });
            }
        },
        // 模拟点击
        select: function () {
            document.getElementById("type0").click();
        },
        select2: function () {
            document.getElementById("type1").click();
        },
        // 添加按钮弹窗
        showAdd: function () {
            var _this = this;
            this.id = "";
            this.groupid = "";
            this.actionType = "";
            this.startDate = $('#startDate').val("");
            this.startTime = "";
            this.endDate = $('#endDate').val("");
            this.endTime = "";
            this.showDialog('', 'add');
        },
        // 新增必填弹框
        diaInfoCheck: function () {
            var _this = this;
            if (!this.groupid) {
                this.showDialog('add', 'info', true, '组合产品不能为空');
                return false;
            }
            if (!this.actionType) {
                this.showDialog('add', 'info', true, '行为类型不能为空');
                return false;
            }
            if (!$("#startDate").val()) {
                this.showDialog('add', 'info', true, '开始时间不能为空');
                return false;
            }
            if (!$("#endDate").val()) {
                this.showDialog('add', 'info', true, '结束时间不能为空');
                return false;
            }
            var startDate=moment($('#startDate').val()).format("YYYYMMDD");
            var endDate=moment($('#endDate').val()).format("YYYYMMDD");
            if (startDate==endDate) {
                this.showDialog('add', 'info', true, '开始时间和结束时间不能相同！');
                return false;
            }
            return true;
        },
        // 保存添加数据按钮
        saveParam: function () {
            var _this = this;
            if (this.diaInfoCheck()) {
                var params = {};
                params.type = this.type;//状态参数

                // params.serialno = this.serialno;
                // params.groupid = this.groupid;
                // params.actionType = this.actionType;
                // params.actionType =this.actionType.join()
                // params.startDate = moment($('#startDate').val()).format("YYYYMMDD");
                // params.startTime = moment($('#startDate').val()).format("HHmmss");
                // params.endDate = moment($('#endDate').val()).format("YYYYMMDD");
                // params.endTime = moment($('#endDate').val()).format("HHmmss");
                // params.operator = this.operator;

                var content = {
                    type:this.type,
                    serialno: this.serialno,
                    groupid: this.groupid,
                    actionType:this.actionType.join(),
                    startDate: moment($('#startDate').val()).format("YYYYMMDD"),
                    startTime: moment($('#startDate').val()).format("HHmmss"),
                    endDate: moment($('#endDate').val()).format("YYYYMMDD"),
                    endTime:  moment($('#endDate').val()).format("HHmmss"),
                    operator: this.operator,
                };
                var params = {};
                params.content = JSON.stringify(content);
                $.post({
                    url: '/businessMgmt/combinationProductConfig/productTradeHandle/saveParam.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.getTableData(0, params.type);
                        }
                        _this.showDialog('add', 'info', false, result.msg);
                    }
                });
            }
        },
        // 修改必填弹框
        reviseCheck: function () {
            var _this = this;
            // if (!this.id) {
            //     this.showDialog('revise', 'info', true, '规则编号不能为空');
            //     return false;
            // }
            if (!this.maxQuota) {
                this.showDialog('revise', 'info', true, '最大交易额不能为空');
                return false;
            }
            if (this.maxQuota < 0) {
                this.showDialog('revise', 'info', true, '最大交易额不能为负数');
                return false;
            }
            if (!this.minQuota) {
                this.showDialog('revise', 'info', true, '最小交易额不能为空');
                return false;
            }
            if (this.minQuota < 0) {
                this.showDialog('revise', 'info', true, '最小交易额不能为负数');
                return false;
            }
            if (!$(".startTime").val()) {
                this.showDialog('revise', 'info', true, '开始时间不能为空');
                return false;
            }
            if (!$(".endTime").val()) {
                this.showDialog('revise', 'info', true, '结束时间不能为空');
                return false;
            }
            return true;
        },
        //点击修改业务数据按钮保存到本地
        serviceUpdate: function (item) {
            var _this = this;
            this.operate = item.operate;
            // 判断业务接口数据与数据库有没有相同数据
            // if (this.type == 0) {
            //     if (this.arrId.indexOf(item.id.toString()) != -1) {
            //         _this.oneId = item.id
            //     } else {
            //         _this.oneId = ''
            //     }
            // }

            this.serialno = item.serialno;
            this.groupid = item.groupid;
            this.actionType = item.actionType;
            this.startDate = $("#startDates").val(item.startDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') + ' ' + item.startTime.replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3'));
            this.startTime = item.startTime;
            this.endDate = $("#endDates").val(item.endDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') + ' ' + item.endTime.replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3'));
            this.endTime = item.endTime;

            this.operate = item.operate
            this.delete_flag = item.delete_flag
            this.showDialog('', 'revise');

        },
        serviceSave: function () {
            var _this = this;
            var params = {};
            params.type = this.type;
            params.oneId = _this.oneId; //根据id插入或者修改数据
            // params.product = this.mysqlProduct;
            params.serialno = this.serialno;
            params.groupid = this.groupid;
            params.actionType = this.actionType;
            params.startDate = moment(this.$refs.startDates.value).format('YYYYMMDD');
            params.startTime = moment(this.$refs.startDates.value).format("HHmmss");
            params.endDate = moment(this.$refs.endDates.value).format('YYYYMMDD');
            params.endTime = moment(this.$refs.endDates.value).format("HHmmss");

            params.operate = this.operate
            params.updateTime = moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss");

            params.arrId = _this.arrId

            params.delete_flag = this.delete_flag
            console.log(params)

            $.post({
                url: '/businessMgmt/combinationProductConfig/productTradeHandle/serviceSave.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0, params.type);
                    }
                    _this.showDialog('revise', 'info', false, result.msg);
                }
            });
        },

        // 点击修改本地数据按钮
        localUpdate: function (item) {
            var _this = this;
            this.operate = item.operate;
            // 判断业务接口数据与数据库有没有相同数据
            // if (this.type == 0) {
            //     if (this.arrId.indexOf(item.id.toString()) != -1 && item.status == '0') {
            //         _this.oneId = item.id
            //     } else {
            //         _this.oneId = ''
            //     }
            // }
            this.mysqlId = item.mySQLId  //获取数据库表字段ID
            this.serialno = item.serialno;
            this.groupid = item.groupid;
            this.actionType = item.actionType;
            this.startDate = $("#startDates").val(item.startDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') + ' ' + item.startTime.replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3'));
            this.startTime = item.startTime;
            this.endDate = $("#endDates").val(item.endDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') + ' ' + item.endTime.replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3'));
            this.endTime = item.endTime;

            this.operate = item.operate
            this.delete_flag = item.delete_flag

            this.showDialog('', 'revise');

        },
        localRevise: function () {
            var _this = this;

            var params = {};
            params.type = this.type;
            params.myqsql = this.mysqlId; //数据表字段id
            params.oneId = _this.oneId; //根据id插入或者修改数据

            params.serialno = this.serialno;
            params.product = this.mysqlProduct;
            params.groupid = this.groupid;
            params.actionType = this.actionType;
            params.startDate = moment(this.$refs.startDates.value).format('YYYYMMDD');
            params.startTime = moment(this.$refs.startDates.value).format("HHmmss");
            params.endDate = moment(this.$refs.endDates.value).format('YYYYMMDD');
            params.endTime = moment(this.$refs.endDates.value).format("HHmmss");

            params.operator = this.operator
            params.operate = this.operate
            params.updateTime = moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss");

            // params.arrId = _this.arrId
            params.delete_flag = this.delete_flag
            console.log(params)
            $.post({
                url: '/businessMgmt/combinationProductConfig/productTradeHandle/localRevise.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0, params.type);
                    }
                    _this.showDialog('revise', 'info', false, result.msg);
                }
            });
        },

        // 提交操作
        showSubmit: function (item) {
            var _this = this;
            this.mysqlId = item.mySQLId  //获取数据库表字段ID

            this.id = item.id;
            this.product = "";
            this.mysqlProduct = item.product; //为mysql执行修改传值
            this.apkind = item.apkind;
            this.subApkind = item.subApkind;
            this.bankNo = item.bankNo;
            this.branchCode = item.branchCode;
            this.channel = item.channel;
            this.custType = item.custType;
            this.tradeType = item.tradeType;
            this.maxQuota = item.maxQuota;
            this.minQuota = item.minQuota;
            this.startTime = item.startTime;
            this.endTime = item.endTime;
            this.remark = item.remark;
            this.quotaType = item.quotaType;

            this.operate = item.operate
            this.delete_flag = item.delete_flag

            this.operate = item.operate
            this.showDialog('', 'subMit');
        },
        submitCheck: function () {
            var _this = this;
            var params = {};
            params.type = this.type;
            params.myqsql = this.mysqlId; //数据表字段id
            params.oneId = this.oneId; //根据id插入或者修改数据
            params.operator = this.operator

            params.id = this.id;
            params.product = this.mysqlProduct;
            params.tradeType = this.tradeType;
            params.apkind = this.apkind;
            params.bankNo = this.bankNo;
            params.branchCode = this.branchCode;
            params.channel = this.channel;
            params.custType = this.custType;
            params.remark = this.remark;
            params.subApkind = this.subApkind;
            params.quotaType = this.quotaType;
            params.maxQuota = this.maxQuota;
            params.minQuota = this.minQuota;
            params.startTime = this.$refs.startTime2.value
            params.endTime = this.$refs.endTime2.value

            params.operate = this.operate
            params.updateTime = moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss");
            params.arrId = _this.arrId
            params.delete_flag = this.delete_flag
            $.post({
                url: '/businessMgmt/businessParamConfig/quotaHandle/submitCheck.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getlocalList()
                        _this.getTableData(0, params.type);
                        _this.product = "";
                    }
                    _this.showDialog('subMit', 'info', false, result.msg);
                }
            });
        },

        //删除业务数据保存到本地
        showDelete: function (item) {
            var _this = this
            // var hasCheck = false;
            // 判断业务接口数据与数据库有没有相同数据
            // if (this.type == 0) {
            //     if (this.arrId.indexOf(item.id.toString()) != -1 && item.status == '0') {
            //         _this.oneId = item.id
            //     } else {
            //         _this.oneId = ''
            //     }
            // }

            // this.id = item.id; //后端接口id
            // this.mysqlId = item.mySQLId  //获取数据库表字段ID
            // this.mysqlProduct = item.product; //为mysql执行修改传值

            this.serialno = item.serialno;
            this.groupid = item.groupid;
            this.actionType = item.actionType;
            this.startDate = $("#startDates").val(item.startDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') + ' ' + item.startTime.replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3'));
            this.startTime = item.startTime;
            this.endDate = $("#endDates").val(item.endDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') + ' ' + item.endTime.replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3'));
            this.endTime = item.endTime;
            this.operate = item.operate
            this.delete_flag = item.delete_flag

            this.showDialog('', 'del');
        },
        deleteUser: function () {
            var _this = this;
            // var ids= [];
            // for (var i = 0; i < this.tableData.length; i++) {
            //     if (this.tableData[i].check) {
            //         ids.push(this.tableData[i].id);
            //     }
            // }
            var params = {};
            params.type = this.type;//状态参数
            // params.myqsql = this.mysqlId; //数据表字段id
            // params.oneId =_this.oneId; //根据id插入或者修改数据


            params.serialno = this.serialno;
            params.product = this.mysqlProduct;
            params.groupid = this.groupid;
            params.actionType = this.actionType;
            params.startDate = moment(this.$refs.startDates.value).format('YYYYMMDD');
            params.startTime = moment(this.$refs.startDates.value).format("HHmmss");
            params.endDate = moment(this.$refs.endDates.value).format('YYYYMMDD');
            params.endTime = moment(this.$refs.endDates.value).format("HHmmss");

            params.operate = this.operate
            console.log(params)
            $.post({
                url: '/businessMgmt/combinationProductConfig/productTradeHandle/deleteParam.ajax',

                data: params,
                traditional: true,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0, params.type);
                    }
                    _this.showDialog('del', 'info', false, result.msg);
                }
            });
        },

        //本地数据撤销操作
        showRevoke: function (item) {
            var _this = this
            // var hasCheck = false;
            // 判断业务接口数据与数据库有没有相同数据
            // if (this.type == 0) {
            //     if (this.arrId.indexOf(item.id.toString()) != -1 && item.status == '0') {
            //         _this.oneId = item.id
            //     } else {
            //         _this.oneId = ''
            //     }
            // }
            this.id = item.id; //后端接口id
            this.mysqlId = item.mySQLId  //获取数据库表字段ID

            this.serialno = item.serialno;
            this.groupid = item.groupid;
            this.actionType = item.actionType;
            this.startDate = $("#startDates").val(item.startDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') + ' ' + item.startTime.replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3'));
            this.startTime = item.startTime;
            this.endDate = $("#endDates").val(item.endDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') + ' ' + item.endTime.replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3'));
            this.endTime = item.endTime;

            this.operate = item.operate

            this.showDialog('', 'del2');

        },
        deleteUser2: function () {
            var _this = this;
            var params = {};
            params.type = this.type;//状态参数
            params.myqsql = this.mysqlId; //数据表字段id
            params.oneId = this.oneId; //根据id插入或者修改数据
            params.operator = this.operator

            params.serialno = this.serialno;
            params.product = this.mysqlProduct;
            params.groupid = this.groupid;
            params.actionType = this.actionType;
            params.startDate = moment(this.$refs.startDates.value).format('YYYYMMDD');
            params.startTime = moment(this.$refs.startDates.value).format("HHmmss");
            params.endDate = moment(this.$refs.endDates.value).format('YYYYMMDD');
            params.endTime = moment(this.$refs.endDates.value).format("HHmmss");

            params.operate = this.operate
            console.log(params)
            $.post({
                url: '/businessMgmt/combinationProductConfig/productTradeHandle/deleteLocal.ajax',
                data: params,
                traditional: true,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0, params.type);
                    }
                    _this.showDialog('del2', 'info', false, result.msg);
                }
            });
        },

        // 重新提交
        showSubmitAgain: function (item) {
            var _this = this;
            // var hasCheck = false;
            this.operate = item.operate;
            // 判断业务接口数据与数据库有没有相同数据
            if (this.type == 0) {
                if (this.arrId.indexOf(item.id.toString()) != -1 && item.status == '0') {
                    _this.oneId = item.id
                    // this.showDialog('', 'info', true, '数据库已有此条数据,请在本地数据里做修改操作');
                    // return;
                } else {
                    _this.oneId = ''
                }
            }
            this.mysqlId = item.mySQLId  //获取数据库表字段ID
            this.id = item.id;

            // this.mysqlProduct = item.product; //为mysql执行修改传值

            this.serialno = item.serialno;
            this.groupid = item.groupid;
            this.actionType = item.actionType;
            this.startDate = $("#startDates").val(item.startDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') + ' ' + item.startTime.replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3'));
            this.startTime = item.startTime;
            this.endDate = $("#endDates").val(item.endDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') + ' ' + item.endTime.replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3'));
            this.endTime = item.endTime;
            this.operate = item.operate
            this.delete_flag = item.delete_flag
            if (this.operate == 3) {
                this.showDialog('', 'delAgain');

            } else if ((this.operate != 3)) {
                this.showDialog('', 'revise');
            }
        },
        deleteAgain: function () {
            var _this = this;
            var params = {};
            params.type = this.type;//状态参数
            params.myqsql = this.mysqlId; //数据表字段id
            params.oneId = this.oneId; //根据id插入或者修改数据
            params.operator = this.operator

            params.id = this.id//后端产品id
            params.serialno = this.serialno;
            params.product = this.mysqlProduct;
            params.groupid = this.groupid;
            params.actionType = this.actionType;
            params.startDate = moment(this.$refs.startDates.value).format('YYYYMMDD');
            params.startTime = moment(this.$refs.startDates.value).format("HHmmss");
            params.endDate = moment(this.$refs.endDates.value).format('YYYYMMDD');
            params.endTime = moment(this.$refs.endDates.value).format("HHmmss");
            params.operate = this.operate
            $.post({
                url: '/businessMgmt/combinationProductConfig/productTradeHandle/deleteAgain.ajax',
                data: params,
                traditional: true,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0, params.type);
                    }
                    _this.showDialog('delAgain', 'info', false, result.msg);
                }
            });
        },
        // 时间选择
        setStartTime: function (value) {
            var str = "";
            if (value === 'now') {
                str = this.getNowTime().replace(/(\d{4})-(\d{2})-(\d{2})-(\d{2})-(\d{2})-(\d{2})/g,'$1-$2-$3 $4:$5:$6');
                $('#startDate').val(str);
            }
            else if (value === 'future') {
                // str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '2099-12-31 $4:$5:$6' + '');
                $('#startDate').val("2099-12-31 23:59:59");
            }
        },
        setEndTime: function (value) {
            var str = "";
            if (value === 'now') {
                str = this.getNowTime().replace(/(\d{4})-(\d{2})-(\d{2})-(\d{2})-(\d{2})-(\d{2})/g,'$1-$2-$3 $4:$5:$6');
                $('#endDate').val(str);
            }
            else if (value === 'future') {
                $('#endDate').val("2099-12-31 23:59:59");
            }
        },
        getNowTime: function () {
            var d = new Date();
            var fixZero = function (num) {
                return num < 10 ? '0' + num : num;
            };
            return [d.getFullYear(), d.getMonth() + 1, d.getDate(),d.getHours(),d.getMinutes(),d.getSeconds()].map(function (value) {
                return fixZero(value)
            }).join('-');
        },
        // 类型多选
        dataSummary: function (asynData,value, label, dom) {
            if (asynData && asynData.length > 0) {
                // vueData = asynData.map(function (item) {
                //     return {
                //         value: item[value],
                //         label: item[label]
                //     }
                // });
                var data = [];
                console.log("asynData",asynData)
                for (var i = 0; i < asynData.length; i++) {
                    data.push({
                        value: asynData[i].value,
                        label: asynData[i].value+"-"+asynData[i].name
                    });
                }
                $("#" + dom).multiselect('dataprovider', data);
            }
        },

        //公共方法
        showDialog: function (dia1, dia2, callback, msg) {
            if (msg) {
                this.diaMsg = msg;
            }
            else {
                msg = '输入条件错误';
            }
            if (!dia1) {
                $('#' + dia2).modal('show');
            }
            else if (!dia2) {
                $('#' + dia1).modal('hide');
            }
            else if (!callback) {
                $('#' + dia1).on("hidden.bs.modal", function () {
                    $('#' + dia2).modal('show');
                    $('#' + dia1).off().on("hidden", "hidden.bs.modal");
                });
                $('#' + dia1).modal('hide');
            }
            else {
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

        // 单选
        // check: function (index) {
        //     index.check = !index.check;
        // },
        // // 用户全选
        // selectAll: function (allCheck) {
        //     var _this = this;
        //     //如果父级被选中，那么子集循环，全被给checked=true
        //     if (!allCheck) {
        //         _this.tableData.forEach(function (item) {
        //             item.check = true;
        //         });
        //     } else {
        //         //相反，如果没有被选中，子集应该全部checked=false
        //         _this.tableData.forEach(function (item) {
        //             item.check = false;
        //         });
        //     }
        // },

        //主表格分页方法
        prev: function () {
            this.currentIndex <= 0 ? 0 : this.currentIndex--;
        },
        next: function () {
            this.currentIndex >= this.middleData.length - 1 ? this.middleData.length - 1 : this.currentIndex++;
        },
        changeIndex: function (index) {
            this.currentIndex = index - 1;
        },
        toFirst: function () {
            this.currentIndex = 0;
        },
        toLast: function () {
            this.currentIndex = this.middleData.length - 1;
        },

        prev1: function () {
            this.currentIndex <= 0 ? 0 : this.currentIndex--;
        },
        next1: function () {
            this.currentIndex >= this.middleData.length - 1 ? this.middleData.length - 1 : this.currentIndex++;
        },
        changeIndex1: function (index) {
            this.currentIndex = index - 1;
        },
        toFirst1: function () {
            this.currentIndex = 0;
        },
        toLast1: function () {
            this.currentIndex = this.middleData.length - 1;
        },
    },
    // 类型状态
    filters: {
        actionType: function (item) {
            if (item) {
                return item.replace(/01/g, '申购').replace(/02/g, '赎回').replace(/03/g, '定投').replace(/04/g, '调仓').replace(/05/g, '解散')
                .replace(/06/g, '标准转出').replace(/07/g, '自定义转出').replace(/08/g, '标准转入').replace(/09/g, '自定义转入');
            }
        },
        startTime:function(item){
            if(item){
               return item.replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3')
            }
        },
        endTime:function(item){
            if(item){
                return item.replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3')
            }
        }
    }
});