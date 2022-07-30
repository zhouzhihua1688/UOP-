new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        // 规则编号
        id: '',
        // 产品
        product: "",
        accoTypes:'',
        // 保存弹窗产品
        saveproduct: "",
        // 业务类型
        apkind: "",
        subApkind: "",
        // 银行编号
        bankNo: "",
        //额度类型
        quotaType: "",
        // 交易类型
        tradeType: '',
        // 网点
        branchCode: "",
        // 渠道
        channel: "",
        // 客户编号
        custNo: "",
        // 客户类型
        custType: "",
        //最大限额
        maxQuota: "",
        //最小限额
        minQuota: "",
        startTime: "",
        endTime: "",
        remark: "",
        status: "",
        // 查询:交易类型参数
        tradeTypes: '',
        // 查询:子业务类型参数
        apkindes: '',

        isUpdate: false,
        //隐藏假分页节点元素
        showMysql: false,
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
        apkindArr:[],    //业务类型数据
        channelList:[],
        // 全选
        allCheck: false,
        // 以下操作Mysql数据库参数
        // 复核状态
        reviewStatus:2,
        // 数据库id
        mysqlId: "",
        // 数据类型(0:业务,1:Mysql数据库)
        type: "1",
        mysqlStatus: '',
        mysqlProduct: "",
        delete_flag: "",
        // 获取数据库产品所有ID
        arrId: [],
        oneId: '',
        operator: "",
        apkindList: [],// 获取业务类型列表数据做转换
        // 对比数据
        tableData2: [],
        // 驳回备注
        revise_remark:'',
        update_timestamp:"",
        // type:1
    },

    created: function () {
        // this.getlocalList()
        // this.getTableData(0,this.type);
        this.channelTypeList();
        this.tradeTypeList()
        this.select2()
        this.getTableData(0, this.type);
    },
    mounted: function () {
        var dialogs = ['info', 'del', 'add', "update", "revise",'reviewReject'];
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
        //下拉列表自带搜索功能
        var fundArr = ['fundNameList'];
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
            this.getServiceData(0, this.type);
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
                url: '/businessMgmt/businessParamConfig/quotaReview/fundList.ajax',
                success: function (result) {
                    if (result.error === 0) {

                        // 下拉列表
                        var str = '';
                        result.data.fundList.forEach(function (item) {
                            str += '<option value="' + item.fundId + '">' + item.fundId + ' ' + item.fundName + '</option>';
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
        // 业务类型
        apkinds: function (item) {
            var _this = this
            var params = {}
            // params.pmv = item;
            params.pmst="SYSTEM"
            params.pmkey="TAPKIND"
            // if (params.pmv != "") {
            $.post({
                url: '/businessMgmt/businessParamConfig/quotaHandle/apkinds.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.apkindList=result.data.body
                        let ArrList=[]

                        for (let apkindItem of _this.apkindList) {
                            if (item=== apkindItem.pmv3) {
                                ArrList.push(apkindItem)
                            }
                        }
                        _this.apkindArr=ArrList  //获取业务类型的数据
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
            // }
            return;
        },
        // 获取查询交易类型下拉列表数据类型
        tradeTypeList: function () {
            var _this = this;
            var params = {};
            params.pmst="COMMONSERVICE";
            params.pmkey="QUOTA_TRADETYPE";
            $.post({
                url: '/businessMgmt/businessParamConfig/quotaReview/tradeTypeList.ajax',
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
                url: '/businessMgmt/businessParamConfig/quotaReview/channelTypeList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.channelList = result.data.body
                    }
                }
            });
        },
        // getTableData: function (currentIndex, type) {
        //     var _this = this;
        //     var params = {};
        //     //传过去的状态参数
        //     params.type = type;
        //     if (type == 0) {
        //         this.isUpdate = true;  //显示真分页
        //         this.showMysql = false//显示假分页
        //         params.product = this.product;
        //         params.tradeType = this.tradeTypes;
        //         params.apkind = this.apkindes;
        //         params.channel = this.channels;
        //         params.pageNo = currentIndex + 1;
        //         params.pageSize = this.pageMaxNum;
        //         console.log(params)
        //         $.post({
        //             url: '/businessMgmt/businessParamConfig/quotaReview/getTableData.ajax',
        //             data: params,
        //             success: function (result) {
        //                 if (result.error === 0) {
        //                     // _this.tableData = result.data;
        //                     _this.tableData = result.data.tableData;
        //                     _this.currentIndex = result.data.pageNo - 1;
        //                     _this.totalPage = result.data.totalSize;
        //                 }
        //                 else {
        //                     _this.tableData = [];
        //                     _this.currentIndex = 0;
        //                     _this.totalPage = 0;
        //                     _this.showDialog('', 'info', false, result.msg);
        //                 }
        //             }
        //         });
        //     }
        //
        //     if (type == 1) {
        //         var _this = this;
        //         // 真假分页切换
        //         this.isUpdate = false;
        //         this.showMysql = true;
        //         this.currentIndex2 = 0;
        //         params.reviewStatus = this.reviewStatus;
        //         params.product = this.product;
        //         params.tradeType = this.tradeTypes;
        //         params.apkind = this.apkindes;
        //         params.channel = this.channels;
        //         $.post({
        //             url: '/businessMgmt/businessParamConfig/quotaReview/getTableData.ajax',
        //             data: params,
        //             success: function (result) {
        //                 if (result.error === 0) {
        //                     _this.tableData = result.data;
        //                     console.log(_this.tableData)
        //                 }
        //                 else {
        //                     _this.showDialog('', 'info', false, result.msg);
        //                 }
        //             }
        //         });
        //     }
        // },

        // 获取服务端数据
        getServiceData: function (currentIndex, type) {
            var _this = this;
            var params = {};
            //传过去的状态参数
            params.type = type;
            console.log(type)
            if (type== 0) {
                this.isUpdate = true;  //显示真分页
                this.showMysql = false//显示假分页
                params.product = this.product;
                params.accoType = this.accoTypes;
                params.tradeType = this.tradeTypes;
                params.apkind = this.apkindes;
                params.channel = this.channels;
                params.pageNo = currentIndex + 1;
                params.pageSize = this.pageMaxNum;
                $.post({
                    url: '/businessMgmt/businessParamConfig/quotaReview/getServiceData.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            // _this.tableData = result.data;
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
        },

        // 获取经办数据
        getTableData: function (currentIndex, type) {
            var _this = this;
            var params = {};
            //传过去的状态参数
            params.type = type;
            console.log(type)
            if (type == 1) {
                var _this = this;
                // 真假分页切换
                this.isUpdate = false;
                this.showMysql = true;
                this.currentIndex2 = 0;
                params.reviewStatus = this.reviewStatus;
                params.product = this.product;
                params.accoType = this.accoTypes;
                params.tradeType = this.tradeTypes;
                params.apkind = this.apkindes;
                params.channel = this.channels;
                console.log(params)
                $.post({
                    url: '/businessMgmt/businessParamConfig/quotaReview/getTableData.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.tableData = result.data;
                            console.log(_this.tableData)
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
            // 做对比请求数据
            var _this = this;
            document.getElementById("type1").click();
            $.post({
                url: '/businessMgmt/businessParamConfig/quotaReview/getServiceData.ajax',
                data: {
                    type:0,
                    // product: '',
                    // reviewStatus: ""
                    pageNo: 1,
                    pageSize: 9999
                },
                success: function (result) {
                    if (result.error === 0) {
                        _this.tableData2 = result.data.tableData;
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        // 获取本地数据库产品的Id
        // getlocalList: function () {
        //     var _this = this, arr;
        //     $.post({
        //         url: '/businessMgmt/businessParamConfig/quotaReview/getTableData.ajax',
        //         data: {
        //             type: 0,
        //             // product: '',
        //             // reviewStatus: ""
        //             pageNo: 1,
        //             pageSize: 9999
        //         },
        //         success: function (result) {
        //             if (result.error === 0) {
        //                 arr = result.data.tableData.map(function (item) {
        //                     return item.id
        //                 })
        //                 _this.arrId = arr;
        //                 // result.data.tableData;//为新增,修改,删除刷新调用
        //             }
        //             else {
        //                 _this.showDialog('', 'info', false, result.msg);
        //             }
        //         }
        //     });
        // },
        // 添加按钮弹窗
        showAdd: function () {
            var _this = this;

            this.id = "";
            this.saveproduct = "";
            this.custType = "";
            this.tradeType = "";
            this.apkind = "";
            this.subApkind = "";
            this.quotaType = "";
            this.branchCode = "";
            this.channel = "";
            this.bankNo = "";
            this.maxQuota = "";
            this.minQuota = "";
            this.startTime = "";
            this.endTime = "";
            this.remark = "";
            this.showDialog('', 'add');
        },

        // 新增必填弹框
        diaInfoCheck: function () {
            var _this = this;
            if (!this.maxQuota) {
                this.showDialog('add', 'info', true, '最大限额不能为空');
                return false;
            }
            if (!this.minQuota) {
                this.showDialog('add', 'info', true, '最小限额不能为空');
                return false;
            }
            if (!$("#startTime").val()) {
                this.showDialog('add', 'info', true, '开始时间不能为空');
                return false;
            }
            if (!$("#endTime").val()) {
                this.showDialog('add', 'info', true, '结束时间不能为空');
                return false;
            }
            return true;
        },

        // 保存添加数据按钮
        saveParam: function () {
            var _this = this;
            // if (this.diaInfoCheck()) {
            var params = {};
            params.type = this.type;//状态参数
            params.id = this.id;
            params.product = this.saveproduct;
            params.tradeType = this.tradeType;
            params.apkind = this.apkind;
            params.subApkind = this.subApkind
            params.bankNo = this.bankNo;
            params.branchCode = this.branchCode;
            params.channel = this.channel;
            params.custType = this.custType;
            params.quotaType = this.quotaType;
            params.remark = this.remark;
            params.maxQuota = this.maxQuota;
            params.minQuota = this.minQuota;
            params.startTime = $("#startTime").val();
            params.endTime = $("#endTime").val();
            $.post({
                url: '/businessMgmt/businessParamConfig/quotaReview/saveParam.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0, this.type);
                        this.saveproduct = ""
                    }
                    _this.showDialog('add', 'info', false, result.msg);
                }
            });
            // this.tableData.push(params);
            // }
        },

        // 修改必填弹框
        reviseCheck: function () {
            var _this = this;
            if (!this.id) {
                this.showDialog('revise', 'info', true, '规则编号不能为空');
                return false;
            }
            if (!this.maxQuota) {
                this.showDialog('revise', 'info', true, '最大限额不能为空');
                return false;
            }
            if (!this.minQuota) {
                this.showDialog('revise', 'info', true, '最小限额不能为空');
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

        // 修改更新数据
        showUpdate: function (item) {
            var _this = this;
            var hasCheck = false;
            // for (var i = 0; i < this.tableData.length; i++) {
            //     if (this.tableData[i].check) {
            //         hasCheck = true;
            //         break;
            //     }
            // }
            // if (!hasCheck) {
            //     this.showDialog('', 'info', false, '未选择任何用户');
            //     return;
            // }
            // this.showDialog('', 'update');
            this.mysqlId = item.mySQLId  //获取数据库表字段ID

            this.id = item.id;
            this.product = "";
            this.mysqlProduct = item.product; //为mysql执行修改传值
            this.apkind = "";
            this.quotaType = "";
            this.branchCode = "";
            this.channel = "";
            this.custType = "";
            this.maxQuota = "";
            this.startTime = "";
            this.endTime = "";
            this.minQuota = "";
            this.remark = "";
            this.tradeType = "";
            this.subApkind = "";
            this.bankNo = "";
            this.showDialog('', 'revise');
        },
        update: function () {
            var _this = this;
            // if (this.reviseCheck()) {
            var params = {};
            params.type = this.type;
            params.myqsql = this.mysqlId; //数据表字段id
            params.id = this.id;
            params.product = this.mysqlProduct;
            params.maxQuota = $(".maxQuota").val();
            params.startTime = $(".startTime").val();
            params.endTime = $(".endTime").val();
            params.minQuota = $(".minQuota").val();

            $.post({
                url: '/businessMgmt/businessParamConfig/quotaReview/update.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0, this.type);
                    }
                    _this.showDialog('revise', 'info', false, result.msg);
                }
            });
            // }
        },
        // 删除
        showDelete: function (item) {
            var hasCheck = false;
            this.id = item.id; //后端接口id
            this.mysqlId = item.mySQLId  //获取数据库表字段ID
            for (var i = 0; i < this.tableData.length; i++) {
                if (this.tableData[i].check) {
                    hasCheck = true;

                }
            }
            // if (!hasCheck) {
            //     this.showDialog('', 'info', false, '未选择任何用户');
            //     return;
            // }
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
            params.myqsql = this.mysqlId; //数据表字段id
            params.id = this.id//后端产品id
            $.post({
                url: '/businessMgmt/businessParamConfig/quotaReview/deleteParam.ajax',
                // data: {ids: ids.join(',')},
                data: params,
                traditional: true,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0, this.type);
                    }
                    _this.showDialog('del', 'info', false, result.msg);
                }
            });
        },

        // Mysql审核通过---执行数据库和业务接口新增,修改,删除数据操作
        reviewPass: function (item) {
            // var hasCheck = false;
            // var num = 0;
            // for (var i = 0; i < this.tableData.length; i++) {
            //     if (this.tableData[i].check) {
            //         hasCheck = true;
            //         num++;
            //     }
            // }
            // if (num > 1) {
            //     this.showDialog('', 'info', false, '只能选择一条数据');
            //     return;
            // }
            // if (!hasCheck) {
            //     this.showDialog('', 'info', false, '请选择执行此条操作');
            //     return;
            // }

            var _this = this;
            var params = {};
            params.type = this.type;
            params.myqsql = item.mySQLId; //数据表字段id
            params.delete_flag = item.delete_flag //当前状态
            params.operator = item.operator
            // 产品参数
            params.id = item.id
            params.product = item.product;
            params.tradeType = item.tradeType;
            params.apkind = item.apkind;
            params.subApkind = item.subApkind
            params.bankNo = item.bankNo;
            params.branchCode = item.branchCode;
            params.channel = item.channel;
            params.custType = item.custType;
            params.quotaType = item.quotaType;
            params.remark = item.remark;
            params.maxQuota = item.maxQuota;
            params.minQuota = item.minQuota;
            params.startTime = item.startTime;
            params.endTime = item.endTime;
            params.operate = item.operate;

            params.accoType = item.accoType;
            // params.accoType="*"
            params.reviewerTime=moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss");//复核时间
            params.updateTime = moment(item.update_timestamp).format("YYYY-MM-DD HH:mm:ss");
            console.log(params)
            if (this.type == 1) {
                var id = parseInt(item.id)
                console.log(params.operate)
                if (params.operate!=1) {
                    console.log("有数据")
                    $.post({
                        url: '/businessMgmt/businessParamConfig/quotaReview/reviewPass.ajax',
                        data: params,
                        success: function (result) {
                            if (result.error === 0) {
                                _this.getTableData(0, params.type);

                            }
                            _this.showDialog('', 'info', false, result.msg);
                        }
                    })
                }else {
                    console.log("无数据")
                    $.post({
                        url: '/businessMgmt/businessParamConfig/quotaReview/SavePass.ajax',
                        data: params,
                        success: function (result) {
                            if (result.error === 0) {
                                _this.getTableData(0, params.type);

                            }
                            _this.showDialog('', 'info', false, result.msg);
                        }
                    });
                }
            }
        },

        // Mysql审核驳回
        rejects:function (item) {
            var _this = this;
            // var hasCheck = false;
            // var num = 0;
            // for (var i = 0; i < this.tableData.length; i++) {
            //     if (this.tableData[i].check) {
            //         hasCheck = true;
            //         num++;
            //     }
            // }
            // if (num > 1) {
            //     this.showDialog('', 'info', false, '只能选择一条数据');
            //     return;
            // }
            // if (!hasCheck) {
            //     this.showDialog('', 'info', false, '请选择执行此条操作');
            //     return;
            // }

            this.itemData = JSON.stringify(item);
            this.revise_remark= '';
            this.showDialog('', 'reviewReject', false);
            this.myqsql = item.mySQLId; //数据表字段id
            this.operator = item.operator; //数据表字段id
            this.update_timestamp=item.update_timestamp;
            console.log(this.itemData)
        },
        reviewReject: function (item) {
            var _this = this;
            // var params = {};
            var params = JSON.parse(this.itemData);
            params.type = this.type;
            params.myqsql =this.myqsql; //数据表字段id
            params.operator = this.operator
            // // 产品参数
            // params.id = item.id
            // params.product = item.product;
            // params.tradeType = item.tradeType;
            // params.apkind = item.apkind;
            // params.subApkind = item.subApkind
            // params.bankNo = item.bankNo;
            // params.branchCode = item.branchCode;
            // params.channel = item.channel;
            // params.custType = item.custType;
            // params.quotaType = item.quotaType;
            // params.remark = item.remark;
            // params.maxQuota = item.maxQuota;
            // params.minQuota = item.minQuota;
            // params.startTime = item.startTime;
            // params.endTime = item.endTime;

            params.accoType="*"

            params.reviewerTime=moment(new Date()).format("YYYY-MM-DD HH:mm:ss");//复核时间
            params.update_timestamp=moment(this.update_timestamp).format("YYYY-MM-DD HH:mm:ss");
            params.revise_remark = this.revise_remark;
            console.log(params)
            $.post({
                url: '/businessMgmt/businessParamConfig/quotaReview/reviewReject.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0, params.type);
                    }
                    _this.showDialog('reviewReject', 'info', false, result.msg);
                }
            });
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
        //主表格真分页方法
        prev: function () {
            if (this.currentIndex <= 0) {
                return;
            }
            this.getServiceData(this.currentIndex - 1, this.type);
        },
        next: function () {
            if (this.currentIndex >= this.totalPage - 1) {
                return;
            }
            this.getServiceData(this.currentIndex + 1, this.type);
        },
        changeIndex: function (index) {
            this.getServiceData(index - 1, this.type);
        },
        toFirst: function () {
            this.getServiceData(0, this.type);
        },
        toLast: function () {
            this.getServiceData(this.totalPage - 1, this.type);
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
            } else {
                return "*"
            }
        },
        quotaType: function (item) {
            // item = item.toUpperCase()
            if (item === "S") {
                return "单笔限额"
            } else if (item === "D") {
                return "日限额"
            } else if (item === "M") {
                return "月限额"
            } else if (item === "T") {
                return "总限额"
            } else {
                return "*"
            }
        },
        custType: function (item) {
            if (item==0) {
                return "企业"
            } else if (item ==1) {
                return "个人"
            } else if (item==2) {
                return "产品"
            }else {
                return "*"
            }
        },
        channel: function (item) {
            item = item.toUpperCase()
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
        },
        accoType: function (item) {
            if (item) {
                return item.replace(/01/g, '企业年金账户')
            }
        },
    }
});