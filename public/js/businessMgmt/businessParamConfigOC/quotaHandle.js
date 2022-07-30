
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
        apkind: "",
        apkindAll: '*', //新增弹框的参数
        subApkind: "",
        subApkindAll: "*", //新增弹框的参数
        // 交易类型
        tradeType: '',
        tradeTypeAll: ['*'], //新增弹框的参数
        // 银行编号
        bankNo: "",
        //额度类型
        quotaType: ["*"],
        // 网点
        branchCode: "",
        branchCodeAll: "*", //新增弹框的参数
        // 渠道
        channel: "",
        // channelAll: '*', //新增弹框的参数
        channelAll: ['*'], //新增弹框的参数
        addChannelList: [{
                pmnm: '柜台',
                pmco: "0"
            }, {
                pmnm: '网上',
                pmco: "2"
            },
            {
                pmnm: '企业版',
                pmco: "7"
            }, {
                pmnm: '第三方',
                pmco: "6"
            }
        ],
        // 客户编号
        custNo: "",
        // 客户类型
        custType: ["*"],
        //最大限额
        maxQuota: "",
        //最小限额
        minQuota: "",
        // 账户类型
        accoType: '',
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
        channels: '',
        // 下拉列表数据
        apkindArr: [], //业务类型数据
        subApkindArr: [], //子业务类型数据
        tradeList: [],
        channelList: [],
        custList: [],
        quotaList: [],
        branchList: [],
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
        apkindList: [], // 获取业务类型列表数据做转换
        // 子业务类型列表数据
        subApkindList: [],
        // type:1,
    },
    // 获取本地Mysql所有Id
    created: function () {
        // this.getlocalList()
        // this.getTableData(0,this.type);
        this.userName();
        this.channelTypeList();
        this.tradeTypeList()
        this.custTypeList()
        this.quotaTypeList()
        this.branchCodeList()

        this.$watch('tradeTypeFilter');
        this.$watch('quotaTypeFilter');
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
        this.getTableData(0, this.type);

        //下拉列表自带搜索功能
        var fundArr = ['fundNameList', "fundAddList"];
        fundArr.forEach(function (value) {
            $('#' + value).chosen({
                search_contains: true,
                no_results_text: '未找到相关基金信息',
                disable_search_threshold: 6,
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

        tradeTypeFilter: function () {
            console.log('tradeTypeFilter--tradeList=', this.tradeList)
            let _this = this;
            this.tableData.forEach(function (item, index) {
                // console.log('item=', item)
                // console.log('index=', index)
                if (_this.tradeList && _this.tradeList.length > 0) {
                    item.tradeTypeLabel = [];
                    _this.tradeList.filter(function (currentValue, index2, arr) {
                        if (item.tradeType.split(',').indexOf(currentValue.pmco) > -1 || item.tradeType === '*') {
                            item.tradeTypeLabel.push(currentValue.pmnm)
                        }
                    })
                    item.tradeTypeLabel = item.tradeTypeLabel.join(',');
                }
            })
            return;
        },

        quotaTypeFilter: function () {
            console.log('quotaTypeFilter--quotaList=', this.quotaList)
            let _this = this;
            this.tableData.forEach(function (item, index) {
                // console.log('item=', item)
                // console.log('index=', index)
                if (_this.quotaList && _this.quotaList.length > 0) {
                    item.quotaTypeLabel = [];
                    _this.quotaList.filter(function (currentValue, index2, arr) {
                        if (item.quotaType.split(',').indexOf(currentValue.pmco) > -1 || item.quotaType === '*') {
                            item.quotaTypeLabel.push(currentValue.pmnm)
                        }
                    })
                    item.quotaTypeLabel = item.quotaTypeLabel.join(',');
                }
            })
            return;
        },

    },
    watch: {
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
        fundList: function () {
            var _this = this;
            $.post({
                url: '/businessMgmt/businessParamConfigOC/quotaHandle/fundList.ajax',
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
                            // $('#' + value).html(value === '' ? ('<option value="">全部基金</option>' + str) : str);
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


        // // 业务类型
        apkinds: function (item) {
            var _this = this
            var params = {}
            // params.pmv = item;
            params.pmst = "SYSTEM"
            params.pmkey = "TAPKIND"
            // if (params.pmv != "") {
            $.post({
                url: '/businessMgmt/businessParamConfigOC/quotaHandle/apkinds.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.apkindList = result.data.body
                        let ArrList = []

                        // _this.tradeList.forEach(item => {
                        //     for (let apkindItem of _this.apkindList) {
                        //         if (item.pmco === apkindItem.pmv3) {
                        //              apkindArr.push(apkindItem)
                        //         }
                        //     }
                        // });

                        // _this.tradeList.filter(function (item) {

                        for (let apkindItem of _this.apkindList) {
                            if (item === apkindItem.pmv3) {
                                ArrList.push(apkindItem)
                            }
                        }
                        _this.apkindArr = ArrList //获取业务类型的数据
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
            // }
            return;
        },

        // apkinds: function (item) {
        //     var _this = this
        //     var params = {}
        //     // params.pmv = item;
        //     params.pmst="SYSTEM"
        //     params.pmkey="TAPKIND"
        //     // if (params.pmv != "") {
        //     $.post({
        //         url: '/businessMgmt/businessParamConfigOC/quotaHandle/apkinds.ajax',
        //         data: params,
        //         success: function (result) {
        //             if (result.error === 0) {
        //                 let arr1=[]
        //                 _this.apkindList=result.data
        //
        //                 _this.tradeList.forEach(item => {
        //                     for (let apkindItem of _this.apkindList) {
        //                         if (item.pmco === apkindItem.pmv3) {
        //                             arr1.push(apkindItem[i].pmnm)
        //
        //                         }
        //                     }
        //                 });
        //                 console.log(arr1)
        //             }
        //             else {
        //                 _this.showDialog('', 'info', false, result.msg);
        //             }
        //         }
        //     });
        //     // }
        //     return;
        // },

        // 子业务类型
        subApkinds: function (item) {
            var _this = this
            var params = {}
            params.pmst = "SYSTEM"
            params.pmkey = "SUBAPKIND"
            $.post({
                url: '/businessMgmt/businessParamConfigOC/quotaHandle/subApkinds.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.subApkindList = result.data.body

                        let subApkindArrList = []

                        for (let subApkindItem of _this.subApkindList) {

                            if (item === subApkindItem.pmv2) {
                                subApkindArrList.push(subApkindItem)
                            }
                        }

                        _this.subApkindArr = subApkindArrList
                        console.log(_this.subApkindArr)
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        // 获取信息
        userName: function () {
            var _this = this;
            var operator;
            $.post({
                url: '/businessMgmt/businessParamConfigOC/quotaHandle/userName.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        operator = result.data
                    }
                    _this.operator = operator
                }
            });
        },
        // // 获取本地库所有ID
        // getlocalList: function () {
        //     var _this = this, arr;
        //     $.post({
        //         url: '/businessMgmt/businessParamConfigOC/quotaHandle/getTableData.ajax',
        //         data: {
        //             type: 1,
        //             product: '',
        //             reviewStatus: "",
        //             tradeType: "",
        //             apkind: "",
        //             channel: ''
        //         },
        //         success: function (result) {
        //             if (result.error === 0) {
        //                 arr = result.data.map(function (item) {
        //                     return item.id
        //                 })
        //                 _this.arrId = arr;
        //                 console.log("******",_this.arrId)
        //             }
        //             else {
        //                 _this.showDialog('', 'info', false, result.msg);
        //             }
        //         }
        //     });
        // },
        // //获取客户类型下拉列表数据类型
        custTypeList: function () {
            var _this = this;
            var params = {};
            params.pmst = "COMMONSERVICE";
            params.pmkey = "CUSTTYPE";
            $.post({
                url: '/businessMgmt/businessParamConfigOC/quotaHandle/custTypeList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.custList = result.data.body
                    }
                }
            });
        },
        // // 获取查询交易类型下拉列表数据类型
        tradeTypeList: function () {
            var _this = this;
            var params = {};
            params.pmst = "COMMONSERVICE";
            params.pmkey = "QUOTA_TRADETYPE";
            $.post({
                url: '/businessMgmt/businessParamConfigOC/quotaHandle/tradeTypeList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.tradeList = result.data.body

                    }
                }
            });
        },
        // // 获取查询渠道类型下拉列表数据类型
        channelTypeList: function () {
            var _this = this;
            var params = {};
            params.pmst = "COMMONSERVICE";
            // params.pmst = "SYSTEM";
            params.pmkey = "CHANNEL";
            $.post({
                url: '/businessMgmt/businessParamConfigOC/quotaHandle/channelTypeList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.channelList = result.data.body
                    }
                }
            });
        },
        // // 获取额度类型
        quotaTypeList: function () {
            var _this = this;
            var params = {};
            params.pmst = "SYSTEM";
            params.pmkey = "QUOTATYPE";
            $.post({
                url: '/businessMgmt/businessParamConfigOC/quotaHandle/quotaTypeList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.quotaList = result.data.body
                    }
                }
            });
        },
        // //获取网点类型下拉列表数据类型
        branchCodeList: function () {
            var _this = this;
            var params = {};
            params.pmst = "SYSTEM";
            params.pmkey = "BRANCHCODE";
            $.post({
                url: '/businessMgmt/businessParamConfigOC/quotaHandle/branchCodeList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.branchList = result.data.body
                    }
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
                this.isUpdate = true; //显示真分页
                this.showMysql = false //显示假分页
                params.product = this.product;
                params.tradeType = this.tradeTypes;
                params.apkind = this.apkindes;
                params.channel = this.channels;
                params.pageNo = currentIndex + 1;
                params.pageSize = this.pageMaxNum;
                $.post({
                    url: '/businessMgmt/businessParamConfigOC/quotaHandle/getTableData.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            // _this.tableData = result.data;
                            _this.tableData = result.data.tableData;
                            _this.currentIndex = result.data.pageNo - 1;
                            _this.totalPage = result.data.totalSize;
                            console.log(_this.tableData)
                        } else {
                            _this.tableData = [];
                            _this.currentIndex = 0;
                            _this.totalPage = 0;
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
                this.currentIndex2 = 0;
                params.reviewStatus = this.reviewStatus; //复核状态
                params.product = this.product;
                params.channel = this.channels;
                params.tradeType = this.tradeTypes;
                params.apkind = this.apkindes;
                $.post({
                    url: '/businessMgmt/businessParamConfigOC/quotaHandle/getTableData.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.tableData = result.data;
                            console.log(_this.tableData)
                        } else {
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
            this.saveproduct = "";
            $('#fundAddList').val('');
            $('#fundAddList').trigger('chosen:updated');
            this.custType = ["*", "0", "1", "2"];
            this.tradeTypeAll = ["00", "01"];
            // this.apkindAll = "";
            // this.subApkindAll = "";
            this.quotaType = ["D"];
            // this.branchCodeAll = "";
            // this.channelAll = "";
            this.channelAll = ["0"];
            this.bankNo = "";
            this.maxQuota = "9999999999.99";
            this.minQuota = "0";
            this.startTime = "";
            this.endTime = "";
            this.remark = "";
            // 获取规则编号
            // $.post({
            //     url: '/businessMgmt/businessParamConfigOC/quotaHandle/ruleId.ajax',
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
            if (!this.tradeTypeAll) {
                this.showDialog('add', 'info', true, '交易类型不能为空');
                return false;
            }
            if (!this.quotaType) {
                this.showDialog('add', 'info', true, '额度类型不能为空');
                return false;
            }
            if (!this.channelAll) {
                this.showDialog('add', 'info', true, '渠道不能为空');
                return false;
            }
            if (!$("#endTime_local").val()) {
                this.showDialog('add', 'info', true, '结束时间不能为空');
                return false;
            }
            if (!$("#startTime_local").val()) {
                this.showDialog('add', 'info', true, '开始时间不能为空');
                return false;
            }
            if (isNaN(Number(this.maxQuota)) || this.maxQuota === '' || !/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/.test(this.maxQuota)) {
                this.showDialog('add', 'info', true, '未填写起始金额或填写格式有误');
                return false;
            }
            if (this.maxQuota < 0) {
                this.showDialog('add', 'info', true, '最大交易额不能为负数');
                return false;
            }
            if (isNaN(Number(this.minQuota)) || this.minQuota === '' || !/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/.test(this.minQuota)) {
                this.showDialog('add', 'info', true, '未填写结束金额或填写格式有误');
                return false;
            }
            if (this.minQuota < 0) {
                this.showDialog('add', 'info', true, '最小交易额不能为负数');
                return false;
            }
            return true;
        },
        // 保存添加数据按钮
        saveParam: function () {
            var _this = this;
            if (this.diaInfoCheck()) {
                var params = {};
                var custType = this.custType.indexOf('*') > -1 ? '*' : this.custType.join(',');
                var quotaType = this.quotaType.indexOf('*') > -1 ? '*' : this.quotaType.join(',');
                var tradeTypeAll = this.tradeTypeAll.indexOf('*') > -1 ? '*' : this.tradeTypeAll.join(',');
                var channelAll = this.channelAll.indexOf('*') > -1 ? '*' : this.channelAll.join(',');
               
             
                params.type = this.type; //状态参数
                params.id = this.ruleId;
                params.operator = this.operator;
                params.product = this.saveproduct;
                params.apkind = this.apkindAll;
                params.subApkind = this.subApkindAll;
                params.tradeType = tradeTypeAll;
                params.bankNo = this.bankNo;
                params.quotaType = quotaType;
                params.custType = custType;
                params.branchCode = this.branchCodeAll;
               
                // params.channel = this.channelAll; 
                // 因为下拉框改为复选框
                params.channel = channelAll;
                params.remark = this.remark;
                params.maxQuota = this.maxQuota;
                params.minQuota = this.minQuota;
                params.startTime = this.$refs.startTime.value
                params.endTime = this.$refs.endTime.value

                params.accoType = "*" //默认

                console.log(params)
                $.post({
                    url: '/businessMgmt/businessParamConfigOC/quotaHandle/saveParam.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.getTableData(0, params.type);
                            this.saveproduct = ""
                            _this.tradeTypeAll = "00";
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
            if (isNaN(Number(this.minQuota))) {
                this.showDialog('revise', 'info', true, '最小交易额不能为空且为数字');
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
            // var hasCheck = false;
            this.operate = item.operate;
            // 判断业务接口数据与数据库有没有相同数据
            if (this.type == 0) {
                if (this.arrId.indexOf(item.id.toString()) != -1) {
                    _this.oneId = item.id
                    // this.showDialog('', 'info', true, '数据库已有此条数据,请在本地数据里做修改操作');
                    // return;
                } else {
                    _this.oneId = ''
                }
            }
            // if (_this.type == 1 && item.delete_flag == 'T') {
            //     this.showDialog('', 'info', true, '该数据已是删除状态,等待复核');
            //     return
            // }
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
            // this.mysqlId = item.mySQLId  //获取数据库表字段ID

            this.id = item.id;
            // this.product = "";
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
            this.showDialog('', 'revise');

        },
        serviceSave: function () {
            var _this = this;
            if (this.reviseCheck()) {
                var params = {};
                params.type = this.type;
                // params.myqsql = this.mysqlId; //数据表字段id
                params.oneId = _this.oneId; //根据id插入或者修改数据
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

                params.accoType = "*" //默认

                params.operate = this.operate
                params.updateTime = moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss");

                params.arrId = _this.arrId
                params.delete_flag = this.delete_flag
                console.log(params)
                $.post({
                    url: '/businessMgmt/businessParamConfigOC/quotaHandle/serviceSave.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            // _this.getlocalList()
                            _this.getTableData(0, params.type);
                        }
                        _this.showDialog('revise', 'info', false, result.msg);
                    }
                });
            }
        },

        // 点击修改本地数据按钮
        localUpdate: function (item) {
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
            this.mysqlId = item.mySQLId //获取数据库表字段ID
            this.id = item.id;
            // this.product = "";
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
            this.showDialog('', 'revise');

        },
        localRevise: function () {
            var _this = this;
            if (this.reviseCheck()) {
                var params = {};
                params.type = this.type;
                params.myqsql = this.mysqlId; //数据表字段id
                params.oneId = _this.oneId; //根据id插入或者修改数据
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

                params.accoType = "*" //默认

                params.operate = this.operate
                params.updateTime = moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss");

                params.arrId = _this.arrId
                params.delete_flag = this.delete_flag
                console.log(params)
                $.post({
                    url: '/businessMgmt/businessParamConfigOC/quotaHandle/localRevise.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            // _this.getlocalList()
                            _this.getTableData(0, params.type);
                        }
                        _this.showDialog('revise', 'info', false, result.msg);
                    }
                });
            }
        },

        // 提交操作
        showSubmit: function (item) {
            var _this = this;
            this.mysqlId = item.mySQLId //获取数据库表字段ID

            this.id = item.id;
            // this.product = "";
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
                url: '/businessMgmt/businessParamConfigOC/quotaHandle/submitCheck.ajax',
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
            if (this.type == 0) {
                if (this.arrId.indexOf(item.id.toString()) != -1 && item.status == '0') {
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
            // for (var i = 0; i < this.tableData.length; i++) {
            //     if (this.tableData[i].check) {
            //         hasCheck = true;

            //     }
            // }
            // if (!hasCheck) {
            //     this.showDialog('', 'info', false, '未选择任何用户');
            //     return;
            // }
            this.id = item.id; //后端接口id
            this.mysqlId = item.mySQLId //获取数据库表字段ID

            // this.product = "";
            this.mysqlProduct = item.product; //为mysql执行修改传值
            this.tradeType = item.tradeType;
            this.apkind = item.apkind;
            this.bankNo = item.bankNo;
            this.branchCode = item.branchCode;
            this.channel = item.channel;
            this.custType = item.custType;
            this.maxQuota = item.maxQuota;
            this.startTime = item.startTime;
            this.endTime = item.endTime;
            this.minQuota = item.minQuota;
            this.remark = item.remark;
            this.subApkind = item.subApkind;
            this.quotaType = item.quotaType;
            this.operate = item.operate
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
            params.type = this.type; //状态参数
            params.myqsql = this.mysqlId; //数据表字段id
            params.oneId = _this.oneId; //根据id插入或者修改数据
            params.operator = this.operator

            params.id = this.id //后端产品id
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
            params.startTime = this.startTime;
            params.endTime = this.endTime;

            params.accoType = "*" //默认

            params.operate = this.operate
            console.log(params)
            $.post({
                url: '/businessMgmt/businessParamConfigOC/quotaHandle/deleteParam.ajax',
                // data: {ids: ids.join(',')},
                data: params,
                traditional: true,
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
            var _this = this
            // var hasCheck = false;
            // 判断业务接口数据与数据库有没有相同数据
            if (this.type == 0) {
                if (this.arrId.indexOf(item.id.toString()) != -1 && item.status == '0') {
                    _this.oneId = item.id
                    // this.showDialog('', 'info', true, '数据库已有此条数据,请在本地数据里做删除操作');
                    // return
                } else {
                    _this.oneId = ''
                }
            }
            this.id = item.id; //后端接口id
            this.mysqlId = item.mySQLId //获取数据库表字段ID

            // this.product = "";
            this.mysqlProduct = item.product; //为mysql执行修改传值
            this.tradeType = item.tradeType;
            this.apkind = item.apkind;
            this.bankNo = item.bankNo;
            this.branchCode = item.branchCode;
            this.channel = item.channel;
            this.custType = item.custType;
            this.maxQuota = item.maxQuota;
            this.startTime = item.startTime;
            this.endTime = item.endTime;
            this.minQuota = item.minQuota;
            this.remark = item.remark;
            this.subApkind = item.subApkind;
            this.quotaType = item.quotaType;

            this.operate = item.operate

            this.showDialog('', 'del2');

        },
        deleteUser2: function () {
            var _this = this;
            var params = {};
            params.type = this.type; //状态参数
            params.myqsql = this.mysqlId; //数据表字段id
            params.oneId = this.oneId; //根据id插入或者修改数据
            params.operator = this.operator

            params.id = this.id //后端产品id
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
            params.startTime = this.startTime;
            params.endTime = this.endTime;

            params.accoType = "*" //默认
            params.operate = this.operate
            $.post({
                url: '/businessMgmt/businessParamConfigOC/quotaHandle/deleteLocal.ajax',
                data: params,
                traditional: true,
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
            this.mysqlId = item.mySQLId //获取数据库表字段ID
            this.id = item.id;
            // this.product = "";
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
            if (this.operate == 3) {
                this.showDialog('', 'delAgain');

            } else if ((this.operate != 3)) {
                this.showDialog('', 'revise');
            }
        },
        deleteAgain: function () {
            var _this = this;
            var params = {};
            params.type = this.type; //状态参数
            params.myqsql = this.mysqlId; //数据表字段id
            params.oneId = this.oneId; //根据id插入或者修改数据
            params.operator = this.operator

            params.id = this.id //后端产品id
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
            params.startTime = this.startTime;
            params.endTime = this.endTime;
            params.operate = this.operate

            params.accoType = "*" //默认
            $.post({
                url: '/businessMgmt/businessParamConfigOC/quotaHandle/deleteAgain.ajax',
                data: params,
                traditional: true,
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
            console.log(str)
            if (value === 'now') {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, this.getNowTime() + ' $4:$5:$6');
            } else if (value === 'future') {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '2099-12-31 $4:$5:$6' + '');
            } else if (value == 0) {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1-$2-$3 00:00:00');
            } else if (value == 9) {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1-$2-$3 09:00:00');
            } else if (value == 15) {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1-$2-$3 15:00:00');
            }
            console.log(str)
            $('#startTime_' + type).val(str);
        },
        setEndTime: function (value, type) {
            var str = $('#endTime_' + type).val();
            if (value === 'now') {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, this.getNowTime() + ' $4:$5:$6');
            } else if (value === 'future') {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '2099-12-31 $4:$5:$6' + '');
            } else if (value == 0) {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1-$2-$3 00:00:00');
            } else if (value == 9) {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1-$2-$3 09:00:00');
            } else if (value == 15) {
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
        setCustType: function (key) {
            var custKeys = this.custList.map(function (item) {
                return item.pmco;
            });
            if (key === '*') {
                if (this.custType.indexOf('*') > -1) {
                    this.custType = [];
                } else {
                    this.custType = ['*'].concat(custKeys);
                }
            } else if (key !== '*') {
                if (this.custType.indexOf('*') > -1) {
                    this.custType.splice(this.custType.indexOf('*'), 1);
                }
            }
            var _this = this;
            setTimeout(function () {
                if (_this.custType.indexOf('*') === -1 && _this.custType.length === custKeys.length) {
                    _this.custType.push('*');
                }
            }, 0);
        },

        setChannelType: function (key) {
            var custKeys = this.addChannelList.map(function (item) {
                return item.pmco;
            });
            if (key === '*') {
                if (this.channelAll.indexOf('*') > -1) {
                    this.channelAll = [];
                } else {
                    this.channelAll = ['*'].concat(custKeys);
                }
            } else if (key !== '*') {
                if (this.channelAll.indexOf('*') > -1) {
                    // this.custType.splice(this.custType.indexOf('*'), 1);
                    this.channelAll.splice(this.channelAll.indexOf('*'), 1);
                }
            }
            var _this = this;
            setTimeout(function () {
                if (_this.channelAll.indexOf('*') === -1 && _this.channelAll.length === custKeys.length) {
                    _this.channelAll.push('*');
                }
            }, 0);
        },
        // setQuotaType: function (key) {
        //     if (key === '*') {
        //         this.quotaType = ['*'];
        //     }
        //     else if (key !== '*' && this.quotaType.indexOf('*') > -1) {
        //         this.quotaType.splice(this.quotaType.indexOf('*'), 1);
        //     }
        // },
        setQuotaType: function (key) {
            console.log( this.quotaList)
            var custKeys = this.quotaList.map(function (item) {
                return item.pmco;
            });
            if (key === '*') {
                if (this.quotaType.indexOf('*') > -1) {
                    this.quotaType = [];
                } else {
                    this.quotaType = ['*'].concat(custKeys);
                }
            } else if (key !== '*') {
                if (this.quotaType.indexOf('*') > -1) {
                    this.quotaType.splice(this.quotaType.indexOf('*'), 1);
                }
            }
            var _this = this;
            setTimeout(function () {
                if (_this.quotaType.indexOf('*') === -1 && _this.quotaType.length === custKeys.length) {
                    _this.quotaType.push('*');
                }
            }, 0);
        },
        setTradeTypeAll: function (key) {
            var custKeys = this.tradeList.map(function (item) {
                return item.pmco;
            });
            if (key === '*') {
                if (this.tradeTypeAll.indexOf('*') > -1) {
                    this.tradeTypeAll = [];
                } else {
                    this.tradeTypeAll = ['*'].concat(custKeys);
                }
            } else if (key !== '*') {
                if (this.tradeTypeAll.indexOf('*') > -1) {
                    this.tradeTypeAll.splice(this.tradeTypeAll.indexOf('*'), 1);
                }
            }
            var _this = this;
            setTimeout(function () {
                if (_this.tradeTypeAll.indexOf('*') === -1 && _this.tradeTypeAll.length === custKeys.length) {
                    _this.tradeTypeAll.push('*');
                }
            }, 0);
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

        //主表格真分页方法
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
        // tradeType: function (item) {
        //     if (item === "00" || item === "申购") {
        //         return "申购"
        //     } else if (item === "01" || item === "认购") {
        //         return "认购"
        //     } else if (item === "02" || item === "赎回") {
        //         return "赎回"
        //     } else if (item === "03" || item === "定投") {
        //         return "定投"
        //     } else if (item === "04" || item === "分红") {
        //         return "分红"
        //     } else if (item === "05" || item === "转换") {
        //         return "转换"
        //     } else if (item === "09" || item === "其它") {
        //         return "其它"
        //     }else {
        //         return "*"
        //     }
        // },
        // quotaType: function (item) {
        //     console.log('quotaType filters--quotaList=', this.quotaList)
        //     console.log('quotaType filters--item=', item)
        //     // item = item.toUpperCase()
        //     if (item === "S") {
        //         return "单笔限额"
        //     } else if (item === "D") {
        //         return "日限额"
        //     } else if (item === "M") {
        //         return "月限额"
        //     } else if (item === "T") {
        //         return "总限额"
        //     } else {
        //         return "*"
        //     }
        // },
        custType: function (item) {
            if (item == "0") {
                return "企业"
            } else if (item == "1") {
                return "个人"
            } else if (item == "2") {
                return "产品"
            } else {
                return "*"
            }
        },
        newChannel:function(item){

        },

        channel: function (item) {
            // console.log('渠道字段'+ item)
            let itemArr=item.split(',')
          
            item = item.toUpperCase()
            console.log(itemArr)
            
            itemArr.forEach((item,i)=>{
                console.log(item)
            //     if (item == "0") {
            //     return "柜台"
            // } else if (item === "1") {
            //     return "电话"
            // } else if (item === "2") {
            //     return "PC"
            // } else if (item === "4") {
            //     return "H5"
            // } else if (item === "5") {
            //     return "IVR"
            // } else if (item === "6") {
            //     return "第三方"
            // } else if (item === "7") {
            //     return "企业"
            // } else if (item === "8") {
            //     return "证通"
            // } else if (item === "9") {
            //     return "其他"
            // } else if (item === "A") {
            //     return "蚂蚁小程序"
            // } else if (item === "M") {
            //     return "APP"
            // } else if (item === "W") {
            //     return "微信"
            // } else if (item === "X") {
            //     return "微信小程序"
            // } else if (item === "C") {
            //     return "CRM"
            // } else if (item === "P") {
            //     return "机构服务平台"
            // } else if (item === "OL") {
            //     return "网上(含PC/H5/APP)"
            // } else {
            //     return item
            // }
            })
            if (item === "0") {
                return "柜台"
            } else if (item === "1") {
                return "电话"
            } else if (item === "2") {
                return "PC"
            } else if (item === "4") {
                return "H5"
            } else if (item === "5") {
                return "IVR"
            } else if (item === "6") {
                return "第三方"
            } else if (item === "7") {
                return "企业"
            } else if (item === "8") {
                return "证通"
            } else if (item === "9") {
                return "其他"
            } else if (item === "A") {
                return "蚂蚁小程序"
            } else if (item === "M") {
                return "APP"
            } else if (item === "W") {
                return "微信"
            } else if (item === "X") {
                return "微信小程序"
            } else if (item === "C") {
                return "CRM"
            } else if (item === "P") {
                return "机构服务平台"
            } else if (item === "OL") {
                return "网上(含PC/H5/APP)"
            } else {
                return item
            }
            
        }
    }
});