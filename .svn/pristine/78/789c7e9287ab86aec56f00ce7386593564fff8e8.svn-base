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
        payType:[],
        tradeType: '',
        // 渠道
        channel: "",
        startTime: "",
        endTime: "",
        createTime: '',
        updateTime: '',
        status: "",
        remark: "",

        // 支付方式全选
        payTypeList:[],
        isUpdate: false,
        //隐藏假分页节点元素
        showMysql: false,
        // 表格数据
        updateId: '',
        tableData: [],
        diaMsg: '',
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10,
        condition: "",
        currentIndex2: 0,
        channels:'',
        // 下拉列表数据
        tradeList:[],
        channelList:[],
        // 全选
        allCheck: false,

        // 以下操作Mysql数据库参数
        // 复核状态
        reviewStatus: "",
        // 数据库id
        mysqlId: "",
        // 数据类型(0:业务,1:Mysql数据库)
        type: "1",
        mysqlStatus: '',
        // mysql传产品值
        mysqlProduct: "",
        // 判断Mysql数据状态
        delete_flag: "",
        operate:'',
        // 获取数据库产品所有ID
        arrId: [],
        oneId: '',
        // 自动获取规则编号Id
        ruleId: "",
        operator: "",
        moment:moment,
        // type:1
    },
    // 获取本地Mysql所有Id
    created: function () {
        // this.getlocalList()
        // this.getTableData(0,this.type);
        this.userName();
        this.tradeTypeList()
        this.channelTypeList()
        this.payList();
    },

    mounted: function () {
        var dialogs = ['info', 'del','del2', 'add', "update", "revise",'subMit','delAgain'];
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
        this.getTableData(0, this.type);

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

        //下拉列表自带搜索功能
        var fundArr = ['fundNameList',"fundAddList"];
        fundArr.forEach(function (value) {
            $('#' + value).chosen({
                search_contains:true,
                no_results_text: '未找到相关基金信息',
                disable_search_threshold:6,
                width: '175px'
            });
        });
        $('#fundNameList').on('change', function (e, params) {
            _this.product = params ? params.selected : '';
        });
        $('#fundAddList').on('change', function (e, params) {
            _this.saveproduct = params ? params.selected : '';
        });
        this.fundList()

    },

    computed: {
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
            let currentIndex = parseInt(this.currentIndex2);
            return this.middleData[currentIndex];
        },
        // 后端真分页
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
            }
            else if (this.currentIndex <= this.maxSpace && this.totalPage - this.currentIndex > this.maxSpace) {
                for (var i = 0; i < this.currentIndex + (2 * this.maxSpace - this.currentIndex); i++) {
                    arr.push(i + 1);
                }
            }
            else if (this.currentIndex > this.maxSpace && this.totalPage - this.currentIndex <= this.maxSpace) {
                var space = this.totalPage - this.currentIndex;
                for (var i = this.currentIndex - (2 * this.maxSpace - space); i < this.totalPage; i++) {
                    arr.push(i + 1);
                }
            }
            else {
                for (var i = 0; i < this.totalPage; i++) {
                    arr.push(i + 1);
                }
            }
            return arr;
        },
    },
    watch: {
        // 真分页
        pageMaxNum: function () {
            this.getTableData(0, this.type);
        },
        // 假分页
        pageMaxNum: {
            handler: function (val, oldval) {
                this.currentIndex2 = 0;
                this.getTableData(0, this.type)
            }
        },
        condition: {
            handler: function (val, oldval) {
                this.currentIndex2 = 0;
            }
        },
    },
    methods: {
         // 获取基金列表
        fundList:function(){
            var _this = this;
            $.post({
                url: '/businessMgmt/businessParamConfig/paymentHandle/fundList.ajax',
                success: function (result) {
                    if (result.error === 0) {

                        // 下拉列表
                        var str = '';
                        result.data.fundList.forEach(function (item) {
                            str += '<option value="' + item.fundId + '">' + item.fundId + ' ' + item.fundName + '</option>';
                        });
                        var fundArr = ["fundAddList"];
                        fundArr.forEach(function (value) {
                            $('#' + value).html('<option value=""></option>' + str);
                            $('#' + value).trigger('chosen:updated');
                        });
                        var fundArr = ['fundNameList'];
                        fundArr.forEach(function (value) {
                            $('#' + value).html('<option value="">全部</option>' + str);
                            $('#' + value).trigger('chosen:updated');
                        });
                    }
                }
            });
        },
        // 获取信息
        userName: function () {
            var _this = this;
            var operator;
            $.post({
                url: '/businessMgmt/businessParamConfig/paymentHandle/userName.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        operator = result.data
                    }
                    _this.operator = operator
                }
            });
        },
        getTableData: function (currentIndex, type) {
            var _this = this;
            var params = {};
            // params.status=this.status;//每次传过去的状态参数(复选框列表)
            //传过去的状态参数(选择数据类型)
            params.type = type;
            if (type == 0) {
                this.isUpdate = true;  //显示真分页
                this.showMysql = false//显示假分页
                params.product = this.product;
                params.channel = this.channels;
                params.pageNo = currentIndex + 1;
                params.pageSize = this.pageMaxNum;
                console.log(params)
                $.post({
                    url: '/businessMgmt/businessParamConfig/paymentHandle/getTableData.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            // _this.tableData = result.data;
                            // 后端分页 展示
                            _this.tableData = result.data.tableData;
                            _this.currentIndex = result.data.pageNo - 1;
                            _this.totalPage = result.data.totalSize;

                        }
                        else {
                            _this.tableData = [];
                            _this.currentIndex = 0;
                            _this.totalPage = 0;
                            _this.showDialog('', 'info', false, result.msg);
                        }
                    }
                });
            }
            if (type == 1) {
                var _this = this;
                // 真假分页切换
                this.isUpdate = false;
                this.showMysql = true;
                this.currentIndex2 = 0;
                params.reviewStatus = this.reviewStatus;
                params.product = this.product;
                params.channel = this.channels;
                console.log(params)
                $.post({
                    url: '/businessMgmt/businessParamConfig/paymentHandle/getTableData.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.tableData = result.data;
                            console.log(_this.tableData )
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
        // 获取本地数据库产品的Id
        // getlocalList: function () {
        //     var _this = this, arr;
        //     $.post({
        //         url: '/businessMgmt/businessParamConfig/paymentHandle/getTableData.ajax',
        //         data: {
        //             type: 1,
        //             product: '',
        //             reviewStatus: "",
        //             channel:''
        //         },
        //         success: function (result) {
        //             if (result.error === 0) {
        //                 arr = result.data.map(function (item) {
        //                     return item.id
        //                 })
        //
        //                 _this.arrId = arr;
        //                 _this.tableData = result.data;//为新增,修改,删除刷新调用
        //             }
        //             else {
        //                 _this.showDialog('', 'info', false, result.msg);
        //
        //             }
        //         }
        //     });
        // },
        // 获取查询交易类型下拉列表数据类型
        tradeTypeList: function () {
            var _this = this;
            var params = {};
            params.pmst="COMMONSERVICE";
            params.pmkey="PAY_TRADETYPE";
            $.post({
                url: '/businessMgmt/businessParamConfig/paymentHandle/tradeTypeList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.tradeList = result.data.body
                    }
                }
            });
        },
        // 获取查询渠道类型下拉列表数据类型
        channelTypeList: function () {
            var _this = this;
            var params = {};
            params.pmst="COMMONSERVICE";
            params.pmkey="CHANNEL";
            $.post({
                url: '/businessMgmt/businessParamConfig/paymentHandle/channelTypeList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.channelList = result.data.body
                    }
                }
            });
        },
        //获取支付方式数据类型
        payList: function () {
            var _this = this;
            var params = {};
            params.pmst = "SYSTEM";
            params.pmkey = "PAY_TYPE";
            $.post({
                url: '/businessMgmt/businessParamConfig/paymentHandle/payList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.payTypeList = result.data.body
                    }
                }
            });
        },
        // 添加按钮弹窗
        showAdd: function () {
            var _this = this;
            this.id = "";
            this.saveproduct = "";
            $('#fundAddList').val('');
            $('#fundAddList').trigger('chosen:updated');
            this.startTime = "";
            this.endTime = "";
            this.createTime = "";
            this.updateTime = "";
            this.payType =[];
            this.tradeType = "";
            this.channel = "";
            this.remark = "";
            // $.post({
            //     url: '/businessMgmt/businessParamConfig/paymentHandle/ruleId.ajax',
            //     success: function (result) {
            //         if (result.error === 0) {
            //             ruleId = result.data.body
            //         }
            //         _this.ruleId = ruleId;
            //     }
            // });
            this.showDialog('', 'add');
        },

        // 新增必填弹框
        diaInfoCheck: function () {
            var _this = this;
            if (!this.saveproduct) {
                this.showDialog('add', 'info', true, '产品代码不能为空');
                return false;
            }
            return true;
        },
        // 添加数据按钮
        saveParam: function () {
            var _this = this;
            if (this.diaInfoCheck()) {
                var params = {};
                var payType = this.payType.indexOf('*') > -1 ? '*' : this.payType.join(',');
                params.type = this.type;//状态参数
                params.id = this.ruleId;
                params.operator = this.operator

                params.product = this.saveproduct;
                params.payType = payType;
                params.tradeType = this.tradeType;
                params.startTime = this.$refs.startTime.value;
                params.endTime = this.$refs.endTime.value;
                // params.createTime = this.$refs.createTime.value;
                // params.updateTime = this.$refs.updateTime.value;
                params.channel = this.channel;
                params.remark = this.remark;
                console.log("***",params)
                $.post({
                    url: '/businessMgmt/businessParamConfig/paymentHandle/saveParam.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.getTableData(0, params.type);
                            this.saveproduct = ""
                        }
                        _this.showDialog('add', 'info', false, result.msg);
                    }
                });
            }
        },

        //点击修改业务数据按钮保存到本地
        serviceUpdate: function (item) {
            var _this = this;
            // var hasCheck = false;
            // 判断业务接口数据与数据库有没有相同数据
            this.operate=item.operate;
            if (this.type == 0) {
                if (this.arrId.indexOf(item.id.toString()) != -1) {   //&&item.status=='0'
                    _this.oneId = item.id
                    // this.showDialog('', 'info', true, '数据库已有此条数据,请在本地数据里做修改操作');
                    // return
                } else {
                    _this.oneId = ''
                }
            }
            // if (_this.type == 1 && item.delete_flag == 'T') {
            //     this.showDialog('', 'info', true, '该数据已是删除状态,等待复核');
            //     return
            // }
            this.mysqlId = item.mySQLId  //获取数据库表字段ID
            this.mysqlProduct = item.product; //为mysql执行修改传值

            this.saveproduct = item.product
            this.id = item.id;
            var payArr=[];
            if(item.payType){
                payArr = item.payType.split(',');
            }
            var resultArr = [];
            for(var i = 0; i < payArr.length; i++){
                if(_this.payTypeList.filter(function (item) {
                    return item.pmco === payArr[i];
                }).length !== 0){
                    resultArr.push(payArr[i]);
                }
            }
            this.payType = resultArr;
            console.log("业务payType:",this.payType)
            this.tradeType = item.tradeType;
            this.startTime = item.startTime;
            this.endTime = item.endTime;
            // this.createTime = item.createTime;
            // this.updateTime = item.updateTime;
            this.channel = item.channel;
            this.remark = item.remark;

            this.operate=item.operate
            this.delete_flag=item.delete_flag
            this.showDialog('', 'revise');
        },
        serviceSave: function () {
            var _this = this;
            var params = {};
            var payType = this.payType.indexOf('*') > -1 ? '*' : this.payType.join(',');
            // params.status=this.status; //状态参数
            params.type = this.type;
            params.myqsql = this.mysqlId; //数据表字段id
            params.oneId = this.oneId; //根据id插入或者修改数据
            params.operator = this.operator

            // 产品参数
            params.id = this.id;
            params.product = this.mysqlProduct;
            params.payType =payType;
            params.tradeType = this.tradeType;
            params.remark = this.remark;
            params.channel = this.channel;
            params.startTime = this.$refs.startTime2.value;
            params.endTime = this.$refs.endTime2.value;
            // params.createTime = this.createTime;
            // params.updateTime = this.updateTime;
            params.operate=this.operate
            params.updateTime=moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss");

            params.arrId=_this.arrId
            params.delete_flag=this.delete_flag
            console.log(params)
            $.post({
                url: '/businessMgmt/businessParamConfig/paymentHandle/serviceSave.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        // _this.getlocalList()
                        _this.getTableData(0, params.type);
                        this.product = "";
                    }
                    _this.showDialog('revise', 'info', false, result.msg);
                }
            });
        },

        localUpdate: function (item) {
            var _this = this;
            // var hasCheck = false;
            // 判断业务接口数据与数据库有没有相同数据
            this.operate=item.operate;
            if (this.type == 0) {
                if (this.arrId.indexOf(item.id.toString()) != -1) {   //&&item.status=='0'
                    _this.oneId = item.id
                    // this.showDialog('', 'info', true, '数据库已有此条数据,请在本地数据里做修改操作');
                    // return
                } else {
                    _this.oneId = ''
                }
            }
            // if (_this.type == 1 && item.delete_flag == 'T') {
            //     this.showDialog('', 'info', true, '该数据已是删除状态,等待复核');
            //     return
            // }
            this.mysqlId = item.mySQLId  //获取数据库表字段ID
            this.mysqlProduct = item.product; //为mysql执行修改传值

            this.saveproduct = item.product
            this.id = item.id;
            console.log("---",item.payType)
            var payArr=[];
            if(item.payType){
                 payArr = item.payType.split(',');
            }
            var resultArr = [];
            for(var i = 0; i < payArr.length; i++){
                if(_this.payTypeList.filter(function (item) {
                    return item.pmco === payArr[i];
                }).length !== 0){
                    resultArr.push(payArr[i]);
                }
            }
            this.payType = resultArr;
            console.log("本地payType:",this.payType)
            this.tradeType = item.tradeType;
            this.startTime = item.startTime;
            this.endTime = item.endTime;
            // this.createTime = item.createTime;
            // this.updateTime = item.updateTime;
            this.channel = item.channel;
            this.remark = item.remark;

            this.operate=item.operate
            this.delete_flag=item.delete_flag
            this.showDialog('', 'revise');
        },
        localRevise: function () {
            var _this = this;
            var params = {};
            var payType = this.payType.indexOf('*') > -1 ? '*' : this.payType.join(',');
            // params.status=this.status; //状态参数
            params.type = this.type;
            params.myqsql = this.mysqlId; //数据表字段id
            params.oneId = this.oneId; //根据id插入或者修改数据
            params.operator = this.operator

            // 产品参数
            params.id = this.id;
            params.product = this.mysqlProduct;
            params.payType = payType;
            params.tradeType = this.tradeType;
            params.remark = this.remark;
            params.channel = this.channel;
            params.startTime = this.$refs.startTime2.value;
            params.endTime = this.$refs.endTime2.value;
            // params.createTime = this.createTime;
            // params.updateTime = this.updateTime;
            params.operate=this.operate
            params.updateTime=moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss");

            params.arrId=_this.arrId
            params.delete_flag=this.delete_flag
            console.log("---",params)
            $.post({
                url: '/businessMgmt/businessParamConfig/paymentHandle/localRevise.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        // _this.getlocalList()
                        _this.getTableData(0, params.type);
                        this.product = "";
                    }
                    _this.showDialog('revise', 'info', false, result.msg);
                }
            });
        },

        //提交数据
        showSubmit: function (item) {
            var _this = this;
            this.mysqlId = item.mySQLId  //获取数据库表字段ID
            this.mysqlProduct = item.product; //为mysql执行修改传值

            this.saveproduct = item.product
            this.id = item.id;
            this.payType = item.payType;
            this.tradeType = item.tradeType;
            this.startTime = item.startTime;
            this.endTime = item.endTime;
            // this.createTime = item.createTime;
            // this.updateTime = item.updateTime;
            this.channel = item.channel;
            this.remark = item.remark;

            this.operate=item.operate
            this.delete_flag=item.delete_flag
            this.showDialog('', 'subMit');
        },
        submitCheck: function () {
            var _this = this;
            var params = {};
            // params.status=this.status; //状态参数
            params.type = this.type;
            params.myqsql = this.mysqlId; //数据表字段id
            params.oneId = this.oneId; //根据id插入或者修改数据
            params.operator = this.operator

            // 产品参数
            params.id = this.id;
            params.product = this.mysqlProduct;
            params.payType = this.payType;
            params.tradeType = this.tradeType;
            params.remark = this.remark;
            params.channel = this.channel;
            params.startTime = this.$refs.startTime2.value;
            params.endTime = this.$refs.endTime2.value;
            // params.createTime = this.createTime;
            // params.updateTime = this.updateTime;
            params.updateTime=moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss");
            params.operate=this.operate

            params.arrId=_this.arrId
            params.delete_flag=this.delete_flag
            $.post({
                url: '/businessMgmt/businessParamConfig/paymentHandle/submitCheck.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        // _this.getlocalList()
                        _this.getTableData(0, params.type);
                        this.product = "";
                    }
                    _this.showDialog('subMit', 'info', false, result.msg);
                }
            });
        },

        //删除业务数据保存到本地
        showDelete: function (item) {
            var _this = this;
            // var hasCheck = false;
            // 判断业务接口数据与数据库有没有相同数据
            if (this.type == 0) {
                if (this.arrId.indexOf(item.id.toString()) != -1&&item.status=='0') {
                    _this.oneId = item.id
                    // this.showDialog('', 'info', true, '数据库已有此条数据,请在本地数据里做删除操作');
                    // return
                } else {
                    _this.oneId = ''
                }
            }
            // if (_this.type == 1 && item.delete_flag == 'T') {
            //     this.showDialog('', 'info', true, '该数据已是删除状态,等待复核');
            //     return
            // }
            this.mysqlId = item.mySQLId  //获取数据库表字段ID

            this.id = item.id;
            this.product = "";
            this.mysqlProduct = item.product; //为mysql执行修改传值

            this.payType = item.payType;
            this.tradeType = item.tradeType;
            this.startTime = item.startTime;
            this.endTime = item.endTime;
            this.createTime = item.createTime;
            this.updateTime = item.updateTime;
            this.channel = item.channel;
            this.remark = item.remark;

            this.operate=item.operate
            this.showDialog('', 'del');
        },
        deleteUser: function () {
            var _this = this;

            var params = {};
            // params.status=this.status; //状态参数
            params.type = this.type;
            params.myqsql = this.mysqlId; //数据表字段id
            params.oneId = this.oneId; //根据id插入或者修改数据
            params.operator = this.operator

            // 产品参数
            params.id = this.id;
            params.product = this.mysqlProduct;

            params.payType = this.payType;
            params.tradeType = this.tradeType;
            params.startTime = this.startTime;
            params.endTime = this.endTime;
            params.createTime = this.createTime;
            params.updateTime = this.updateTime;
            params.channel = this.channel;
            params.remark = this.remark;

            params.operate=this.operate
            $.post({
                url: '/businessMgmt/businessParamConfig/paymentHandle/deleteParam.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        // _this.getlocalList()
                        _this.getTableData(0, params.type);
                        this.product = "";
                    }
                    _this.showDialog('del', 'info', false, result.msg);
                }
            });
        },

        //本地数据撤销操作
        showRevoke: function (item) {
            var _this = this;
            // var hasCheck = false;
            // 判断业务接口数据与数据库有没有相同数据
            if (this.type == 0) {
                if (this.arrId.indexOf(item.id.toString()) != -1&&item.status=='0') {
                    _this.oneId = item.id
                    // this.showDialog('', 'info', true, '数据库已有此条数据,请在本地数据里做删除操作');
                    // return
                } else {
                    _this.oneId = ''
                }
            }
            // if (_this.type == 1 && item.delete_flag == 'T') {
            //     this.showDialog('', 'info', true, '该数据已是删除状态,等待复核');
            //     return
            // }
            this.mysqlId = item.mySQLId  //获取数据库表字段ID

            this.id = item.id;
            this.product = "";
            this.mysqlProduct = item.product; //为mysql执行修改传值

            this.payType = item.payType;
            this.tradeType = item.tradeType;
            this.startTime = item.startTime;
            this.endTime = item.endTime;
            this.createTime = item.createTime;
            this.updateTime = item.updateTime;
            this.channel = item.channel;
            this.remark = item.remark;

            this.operate=item.operate
            this.showDialog('', 'del2');
        },
        deleteUser2: function () {
            var _this = this;

            var params = {};
            // params.status=this.status; //状态参数
            params.type = this.type;
            params.myqsql = this.mysqlId; //数据表字段id
            params.oneId = this.oneId; //根据id插入或者修改数据
            params.operator = this.operator

            // 产品参数
            params.id = this.id;
            params.product = this.mysqlProduct;

            params.payType = this.payType;
            params.tradeType = this.tradeType;
            params.startTime = this.startTime;
            params.endTime = this.endTime;
            params.createTime = this.createTime;
            params.updateTime = this.updateTime;
            params.channel = this.channel;
            params.remark = this.remark;

            params.operate=this.operate
            $.post({
                url: '/businessMgmt/businessParamConfig/paymentHandle/deleteLocal.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        // _this.getlocalList()
                        _this.getTableData(0, params.type);
                        this.product = "";
                    }
                    _this.showDialog('del2', 'info', false, result.msg);
                }
            });
        },

        // 重新提交操作
        showSubmitAgain:function(item){
            var _this = this;
            // var hasCheck = false;
            // 判断业务接口数据与数据库有没有相同数据
            this.operate=item.operate;
            if (this.type == 0) {
                if (this.arrId.indexOf(item.id.toString()) != -1) {   //&&item.status=='0'
                    _this.oneId = item.id
                } else {
                    _this.oneId = ''
                }
            }
            this.mysqlId = item.mySQLId  //获取数据库表字段ID
            this.mysqlProduct = item.product; //为mysql执行修改传值

            this.saveproduct = item.product
            this.id = item.id;

            var payArr=[];
            if(item.payType){
                payArr = item.payType.split(',');
            }
            var resultArr = [];
            for(var i = 0; i < payArr.length; i++){
                if(_this.payTypeList.filter(function (item) {
                    return item.pmco === payArr[i];
                }).length !== 0){
                    resultArr.push(payArr[i]);
                }
            }
            this.payType = resultArr;
            console.log("本地重新提交payType:",this.payType)
            this.tradeType = item.tradeType;
            this.startTime = item.startTime;
            this.endTime = item.endTime;
            // this.createTime = item.createTime;
            // this.updateTime = item.updateTime;
            this.channel = item.channel;
            this.remark = item.remark;
            this.operate=item.operate
            this.delete_flag=item.delete_flag
            if (this.operate==3){
                this.showDialog('', 'delAgain');

            }else if ((this.operate!=3)){
                this.showDialog('', 'revise');
            }
        },
        deleteAgain:function () {
            var _this = this;

            var params = {};
            // params.status=this.status; //状态参数
            params.type = this.type;
            params.myqsql = this.mysqlId; //数据表字段id
            params.oneId = this.oneId; //根据id插入或者修改数据
            params.operator = this.operator
            // 产品参数
            params.id = this.id;
            params.product = this.mysqlProduct;
            params.payType = this.payType;
            params.tradeType = this.tradeType;
            params.startTime = this.startTime;
            params.endTime = this.endTime;
            params.createTime = this.createTime;
            params.updateTime = this.updateTime;
            params.channel = this.channel;
            params.remark = this.remark;
            params.operate=this.operate
            $.post({
                url: '/businessMgmt/businessParamConfig/paymentHandle/deleteAgain.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        // _this.getlocalList()
                        _this.getTableData(0, params.type);
                        this.product = "";
                    }
                    _this.showDialog('delAgain', 'info', false, result.msg);
                }
            });
        },
        // 时间选择
        setStartTime: function (value, type) {
            var str = $('#startTime_' + type).val();
            if (value === 'now') {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, this.getNowTime() + ' $4:$5:$6');
            }
            else if (value === 'future') {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '2099-12-31 $4:$5:$6' + '');
            }
            else if (value == 0) {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1-$2-$3 00:00:00');
            }
            else if (value == 9) {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1-$2-$3 09:00:00');
            }
            else if (value == 15) {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1-$2-$3 15:00:00');
            }
            $('#startTime_' + type).val(str);
        },
        setEndTime: function (value, type) {
            var str = $('#endTime_' + type).val();
            if (value === 'now') {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, this.getNowTime() + ' $4:$5:$6');
            }
            else if (value === 'future') {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '2099-12-31 $4:$5:$6' + '');
            }
            else if (value == 0) {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1-$2-$3 00:00:00');
            }
            else if (value == 9) {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1-$2-$3 09:00:00');
            }
            else if (value == 15) {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1-$2-$3 15:00:00');
            }
            $('#endTime_' + type).val(str);
        },
        getNowTime: function () {
            var d = new Date();
            var fixZero = function (num) {
                return num < 10 ? '0' + num : num;
            };
            return [d.getFullYear(), d.getMonth() + 1, d.getDate()].map(function (value) {
                return fixZero(value)
            }).join('-');
        },
        setpayType: function (key) {
            console.log("key值",key)
            var custKeys = this.payTypeList.map(function (item) {
                return item.pmco;
            });
            if (key === '*') {
                if (this.payType.indexOf('*') > -1) {
                    this.payType = [];
                }
                else {
                    this.payType = ['*'].concat(custKeys);
                }
            }
             else if (key !== '*') {
                if (this.payType.indexOf('*') > -1) {
                    this.payType.splice(this.payType.indexOf('*'), 1);
                }
            }
            // var _this = this;
            // setTimeout(function () {
            //     if (_this.payType.indexOf('*') === -1 && _this.payType.length === custKeys.length) {
            //         _this.payType.push('*');
            //     }
            // }, 0);
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

        // // 单选
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
        //后端主表格真分页方法
        prev: function () {
            if (this.currentIndex <= 0) {
                return;
            }
            this.getTableData(this.currentIndex - 1, this.type);
        },
        next: function () {
            if (this.currentIndex >= this.totalPage - 1) {
                return;
            }
            this.getTableData(this.currentIndex + 1, this.type);
        },
        changeIndex: function (index) {
            this.getTableData(index - 1, this.type);
        },
        toFirst: function () {
            this.getTableData(0, this.type);
        },
        toLast: function () {
            this.getTableData(this.totalPage - 1, this.type);
        },

        //主表格假分页方法
        prev1: function () {
            this.currentIndex2 <= 0 ? 0 : this.currentIndex2--;
        },
        next1: function () {
            this.currentIndex2 >= this.middleData.length - 1 ? this.middleData.length - 1 : this.currentIndex2++;
        },
        changeIndex1: function (index) {
            this.currentIndex2 = index - 1;
        },
    },

    // 类型状态
    filters: {
        tradeType: function (item) {
            if (item === "00" || item === "申购") {
                return "申购"
            } else if (item === "01" || item === "认购") {
                return "认购"
            } else if (item === "02" || item === "赎回") {
                return "赎回"
            } else if (item === "03" || item === "定投") {
                return "定投"
            } else if (item === "04" || item === "分红") {
                return "分红"
            } else if (item === "05" || item === "转换") {
                return "转换"
            }else if (item === "09" || item === "其它") {
                return ""
            }
        },
        payType: function (item) {
            if(item){
                return item.replace(/01/g,'现金宝').replace(/02/g,'银行卡').replace(/03/g,'产品').replace(/,00/g,'').replace(/00,/g,'')
             }
        },
        channel: function (item) {
            // item = item.toUpperCase()
            if (item === "0") {
                return "柜台"
            } else if (item === "1") {
                return "电话"
            } else if (item === "2") {
                // return "PC"
                return "网上"
            }
            else if (item === "4") {
                return "H5"
            }
            else if (item === "5") {
                return "IVR"
            }
            else if (item === "6") {
                return "第三方"
            }
            else if (item === "7") {
                return "企业"
            }
            else if (item === "8") {
                return "证通"
            }
            else if (item === "9") {
                return "其他"
            }
            else if (item === "A") {
                return "蚂蚁小程序"
            }
            else if (item === "M") {
                return "APP"
            }
            else if (item === "W") {
                return "微信"
            }
            else if (item === "X") {
                return "微信小程序"
            }
            else if (item === "C") {
                return "CRM"
            }
            else if (item === "P") {
                return "机构服务平台"
            }
            else if (item === "OL") {
                return "网上(含PC/H5/APP)"
            }
            else {
                return item
            }
        }
    }
});