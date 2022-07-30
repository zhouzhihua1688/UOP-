new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        companyId: '',
        companyName: '',
        companyCode: '',
        codeList: [],
        tableData: [],
        tableSelect: [],
        serviceType: '',
        districtCode: '',
        spell: '',
        status: '',
        diaMsg: '',
        searchField: '',
        districtCodeSearch: '',
        // 新增弹窗数据
        addAppCode: '',
        addAppName: '',
        addLongLinkUrl: '',
        addStatus: '0',
        addIsNumber: '1',
        addCreateAccount: '1',
        //确认删除数据
        deleteCode: '',
        // 更新弹窗数据
        updateSerialNo: '',
        updateAppCode: '',
        updateAppName: '',
        updateLongLinkUrl: '',

        // 主表格分页数据
        page: 0,
        total: 0,
        records: 10,
        conditionType: 0,
        currentIndex: 0,
        maxSpace: 5
    },
    computed: {
        allCheck: function () {
            if (this.tableData.length == 0) {
                return false;
            }
            var flag = true;
            this.tableData.forEach(function (item) {
                if (!item.check) {
                    flag = false;
                }
            });
            return flag;
        },
        pageList: function () {
            var arr = [];
            if (this.total <= 2 * this.maxSpace) {
                for (var i = 0; i < this.total; i++) {
                    arr.push(i + 1);
                }
                return arr;
            }
            if (this.currentIndex > this.maxSpace && this.total - this.currentIndex > this.maxSpace) {
                for (var i = this.currentIndex - this.maxSpace; i < this.currentIndex + this.maxSpace; i++) {
                    arr.push(i + 1);
                }
            } else if (this.currentIndex <= this.maxSpace && this.total - this.currentIndex > this.maxSpace) {
                for (var i = 0; i < this.currentIndex + (2 * this.maxSpace - this.currentIndex); i++) {
                    arr.push(i + 1);
                }
            } else if (this.currentIndex > this.maxSpace && this.total - this.currentIndex <= this.maxSpace) {
                var space = this.total - this.currentIndex;
                for (var i = this.currentIndex - (2 * this.maxSpace - space); i < this.total; i++) {
                    arr.push(i + 1);
                }
            } else {
                for (var i = 0; i < this.total; i++) {
                    arr.push(i + 1);
                }
            }
            return arr;
        }
    },
    watch: {
        //地区select切换
        districtCodeSearch: function (val, oldval) {
            this.conditionType = 1;
            var params = {
                rows: this.records,
                districtCodeSearch: this.districtCodeSearch
            };
            this.getTableList(params);
            this.tableSelect=[]

        },
        records: {
            handler: function (val, oldval) {
                var params = {
                    rows: this.records,
                    districtCodeSearch: this.conditionType == 1 ? this.districtCodeSearch : '',
                    searchField: this.conditionType == 2 ? this.searchField : ''
                };
                this.getTableList(params);
                this.tableSelect=[];
            }
        },
        total: function () {
            this.currentIndex = 0;
        }
    },
    mounted: function () {
        var _this = this;
        var dialogs = ['update', '', 'delete', 'info'];
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
        _this.validForm();
        _this.getTableList({
            rows: _this.records
        });
        $.post({
            url: '/cashMgmt/livingPay/companyMgmt/codeList.ajax',
            async: false,
            success: function (result) {
                if (result.error == 0) {
                    _this.codeList = result.data;
                    var optionStr = "";
                    $.each(_this.codeList, function (index, item) {
                        optionStr += "<option value=" + item.districtCode + ">" + item.districtName + '' + item.districtCode + "</option>"
                    });
                    if (!ace.vars['touch']) {
                        $(".chosen-select").append(optionStr);
                        $(".chosen-select").trigger("chosen:updated");
                        $('.chosen-select').chosen({
                            allow_single_deselect: true
                        }).change(function () {
                        });
                        // resize the chosen on window resize
                        $(window)
                            .off('resize.chosen')
                            .on('resize.chosen', function () {
                                $('.chosen-select').each(function () {
                                    var $this = $(this);
                                    $this.next().css({
                                        'width': '100%'
                                    });
                                })

                            }).trigger('resize.chosen');
                        //resize chosen on sidebar collapse/expand
                        $(document).on('settings.ace.chosen', function (e, event_name, event_val) {
                            if (event_name != 'sidebar_collapsed') return;
                            $('.chosen-select').each(function () {
                                var $this = $(this);
                                $this.next().css({
                                    'width': $this.parent().width()
                                });
                            })
                        });
                    }
                } else {
                    // $("#form-field-select-4").hide();
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });
        $.post({
            url: '/cashMgmt/livingPay/companyMgmt/typeList.ajax',
            success: function (result) {
                if (result.error == 0) {
                    var typeList = result.data;
                    var unitObj = document.getElementById("serviceType");
                    if (typeList != null) {
                        for (var i = 0; i < typeList.length; i++) {
                            unitObj.options.add(new Option(typeList[i].serviceName, typeList[i].typeId));
                        }
                    }
                } else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            },
            error: function () {

            }
        });
        _this.getCodeList();
    },
    methods: {
        //主表格分页方法
        selectAll: function () {
            var _this = this;
            if (this.allCheck) {
                this.tableData.forEach(function (item) {
                    item.check = false;
                    var _index = _this.inSelected(item, _this.tableSelect, 'companyId');
                    if (_index > -1) {
                        _this.tableSelect.splice(_index, 1);
                    }
                });
            } else {
                this.tableData.forEach(function (item) {
                    item.check = true;
                    var _index = _this.inSelected(item, _this.tableSelect, 'companyId');
                    if (_index == -1) {
                        _this.tableSelect.push(item);
                    }
                });
            }
        },
        prev: function () {
            this.currentIndex = this.currentIndex <= 0 ? 0 : this.currentIndex - 1;
            var params = {
                _search: 'false',
                nd: '1535696156694',
                rows: this.records,
                page: this.currentIndex + 1,
                sidx: 'companyId',
                sord: 'asc',
                districtCodeSearch: this.conditionType == 1 ? this.districtCodeSearch : '',
                searchField: this.conditionType == 2 ? this.searchField : ''
            };
            this.getTableList(params);
            this.tableSelect = [];
            removeSelect($(".chosen-select"))
        },
        next: function () {
            this.currentIndex = this.currentIndex >= this.total - 1 ? this.total - 1 : this.currentIndex + 1;
            var params = {
                _search: 'false',
                nd: '1535696156694',
                rows: this.records,
                page: this.currentIndex + 1,
                sidx: 'companyId',
                sord: 'asc',
                districtCodeSearch: this.conditionType == 1 ? this.districtCodeSearch : '',
                searchField: this.conditionType == 2 ? this.searchField : ''
            };
            this.getTableList(params);
            this.tableSelect = [];
            removeSelect($(".chosen-select"));
        },
        changeIndex: function (value, index) {
            this.currentIndex = value - 1;
            this.page = value;
            var params = {
                _search: 'false',
                nd: '1535696156694',
                rows: this.records,
                page: this.page,
                sidx: 'companyId',
                sord: 'asc',
                districtCodeSearch: this.conditionType == 1 ? this.districtCodeSearch : '',
                searchField: this.conditionType == 2 ? this.searchField : ''
            };
            this.getTableList(params);
            this.tableSelect = [];
            removeSelect($(".chosen-select"));
        },
        toFirst: function () {
            this.currentIndex = 0;
            var params = {
                _search: 'false',
                nd: '1535696156694',
                rows: this.records,
                page: 1,
                sidx: 'companyId',
                sord: 'asc',
                districtCodeSearch: this.conditionType == 1 ? this.districtCodeSearch : '',
                searchField: this.conditionType == 2 ? this.searchField : ''
            };
            this.getTableList(params);
            this.tableSelect = [];
            removeSelect($(".chosen-select"));
        },
        toLast: function () {
            this.currentIndex = this.total - 1;
            var params = {
                _search: 'false',
                nd: '1535696156694',
                rows: this.records,
                page: this.total,
                sidx: 'companyId',
                sord: 'asc',
                districtCodeSearch: this.conditionType == 1 ? this.districtCodeSearch : '',
                searchField: this.conditionType == 2 ? this.searchField : ''
            };
            this.getTableList(params);
            this.tableSelect = [];
            removeSelect($(".chosen-select"));
        },
        getTableList: function (params) {
            var _this = this;
            $.post({
                url: '/cashMgmt/livingPay/companyMgmt/getList.ajax',
                data: params ? params : {},
                success: function (result) {
                    if (result.error == 0) {
                        var data = result.data;
                        _this.page = data.page;
                        _this.total = data.total;
                        _this.tableData = data.formList;
                        _this.tableSelect.forEach(function (item) {
                            var index = _this.inSelected(item, _this.tableData, 'companyId');
                            if (index > -1) {
                                _this.tableData[index].check = true;
                            }
                        });

                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        select: function (index) {
            var item = this.tableData[index];
            item.check = !item.check;
            var _index = this.inSelected(item, this.tableSelect, 'companyId');
            if (item.check && _index == -1) {
                this.tableSelect.push(item);
            }
            if (!item.check && _index > -1) {
                this.tableSelect.splice(_index, 1);
            }
        },
        //input搜索地区或机构id
        searchInput: function () {
            this.conditionType = 2;
            var params = {
                rows: this.records,
                searchField: this.searchField,
            };
            this.getTableList(params);
            this.tableSelect=[];
        },
        // dialog表格校验
        validForm: function () {
            //绑定验证器
            return $("#companyForm").validate({
                ignore: [],
                rules: {
                    companyName: {
                        required: true,
                    },
                    companyCode: {
                        required: true,
                        rangelength: [9, 9]
                    },
                    serviceType: {
                        required: true,
                    },
                    districtCode: {
                        required: true,
                    },
                    spell: {
                        required: true,
                    },
                    status: {
                        required: true,
                    },
                    isNumber: {
                        required: true,
                    },
                    accountLength: {
                        required: true,
                    },
                    accountNoRule: {
                        required: true,
                    },
                    accountNoName: {
                        required: true,
                    },
                    accountNoRuleTitle: {
                        required: true,
                    },
                    billKeyType: {
                        required: true,
                    },


                },
                messages: {
                    companyName: {
                        required: "请输入机构名称",
                    },
                    companyCode: {
                        required: "请输入机构代码",
                        rangelength: "请输入长度为9位的编码"
                    },
                    serviceType: {
                        required: "请输入机构类型",
                    },
                    districtCode: {
                        required: "请输入城市代码",
                    },
                    spell: {
                        required: "请输入首字母拼写",
                    },
                    status: {
                        required: "请输入是否有效",
                    },
                    isNumber: {
                        required: "请输入户号是否纯数字",
                    },
                    accountLength: {
                        required: "请输入户号长度",
                    },
                    accountNoRule: {
                        required: "请输入户号规则",
                    },
                    accountNoName: {
                        required: "请输入户号名称",
                    },
                    accountNoRuleTitle: {
                        required: "请输入户号规则标题",
                    },
                    billKeyType: {
                        required: "请输入缴费类型",
                    },

                }
            });
        },
        //getCodeList
        getCodeList: function () {

        },
        //boxShow
        boxShow: function () {
            $("#addCompany").modal('show');
            $("#addCompany input").val('');
            $("#addCompany textarea").val('');
            $("#addCompany select").val('');
            $(".chosen-select").val("");
            $(".chosen-select").trigger("chosen:updated");
            this.addStatus = '0';
            this.addIsNumber = '1';
            this.addCreateAccount = '1';
            var _this = this;
            _this.validForm();
        },
        //新增机构
        add: function () {
            var _this = this;
            if (_this.validForm().form()) {
                var companyId = $("#companyId").val();
                var companyName = $("#companyName").val();
                var companyCode = $("#companyCode").val();
                var serviceType = $("#serviceType").val();
                var districtCode = $('.chosen-select').val();
                var spell = $("#spell").val();
                var status = _this.addStatus;
                var isNumber = _this.addIsNumber;
                var createAccount = _this.addCreateAccount;
                var accountLength = $("#accountLength").val();
                var accountNoRule = $("#accountNoRule").val();
                var accountNoName = $("#accountNoName").val();
                var accountNoRuleTitle = $("#accountNoRuleTitle").val();
                var billKeyType = $("#billKeyType").val();
                var beginNum = $("#beginNum").val();
                var queryNum = $("#queryNum").val();
                var filed1 = $("#filed1").val();
                var filed2 = $("#filed2").val();
                var filed3 = $("#filed3").val();
                var filed4 = $("#filed4").val();
                var payfiled1 = $("#payfiled1").val();
                var payfiled2 = $("#payfiled2").val();
                var payfiled3 = $("#payfiled3").val();
                var payfiled4 = $("#payfiled4").val();
                var customerName = $("#customerName").val();
                var payAccount = $("#payAccount").val();
                var pin = $("#pin").val();
                var acType = $("#acType").val();
                var contractNo = $("#contractNo").val();
                var billKeyStart = $("#billKeyStart").val();
                var billKeyEnd = $("#billKeyEnd").val();
                var billDateStart = $("#billDateStart").val();
                var billDateEnd = $("#billDateEnd").val();
                var payAmountStart = $("#payAmountStart").val();
                var payAmountEnd = $("#payAmountEnd").val();
                var saveBillDate = $("#saveBillDate").val();
                var saveContractNo = $("#saveContractNo").val();
                var saveCustomerName = $("#saveCustomerName").val();
                var saveBalance = $("#saveBalance").val();
                var savePayAmount = $("#savePayAmount").val();
                var saveBeginDate = $("#saveBeginDate").val();
                var saveEndDate = $("#saveEndDate").val();
                var savefiled1 = $("#savefiled1").val();
                var savefiled2 = $("#savefiled2").val();
                var savefiled3 = $("#savefiled3").val();
                var savefiled4 = $("#savefiled4").val();
                var accountNoPlaceholder = $("#accountNoPlaceholder").val();
                var accountNoTips = $("#accountNoTips").val();

                var data = {
                    "companyId": companyId,
                    "companyName": companyName,
                    "companyCode": companyCode,
                    "serviceType": serviceType,
                    "districtCode": districtCode,
                    "spell": spell,
                    "status": status,
                    "isNumber": isNumber,
                    "accountLength": accountLength,
                    "accountNoRule": accountNoRule,
                    "accountNoTips": accountNoTips,
                    "accountNoPlaceholder": accountNoPlaceholder,
                    "accountNoName": accountNoName,
                    "accountNoRuleTitle": accountNoRuleTitle,
                    "billKeyType": billKeyType,
                    "createAccount": createAccount,
                    "beginNum": beginNum,
                    "queryNum": queryNum,
                    "filed1": filed1,
                    "filed2": filed2,
                    "filed3": filed3,
                    "filed4": filed4,
                    "payfiled1": payfiled1,
                    "payfiled2": payfiled2,
                    "payfiled3": payfiled3,
                    "payfiled4": payfiled4,
                    "customerName": customerName,
                    "payAccount": payAccount,
                    "pin": pin,
                    "acType": acType,
                    "contractNo": contractNo,
                    "billKeyStart": billKeyStart,
                    "billKeyEnd": billKeyEnd,
                    "billDateStart": billDateStart,
                    "billDateEnd": billDateEnd,
                    "payAmountStart": payAmountStart,
                    "payAmountEnd": payAmountEnd,
                    "saveBillDate": saveBillDate,
                    "saveContractNo": saveContractNo,
                    "saveCustomerName": saveCustomerName,
                    "saveBalance": saveBalance,
                    "savePayAmount": savePayAmount,
                    "saveBeginDate": saveBeginDate,
                    "saveEndDate": saveEndDate,
                    "savefiled1": savefiled1,
                    "savefiled2": savefiled2,
                    "savefiled3": savefiled3,
                    "savefiled4": savefiled4
                };

                $.ajax({
                    type: "POST",
                    async: false,
                    url: "/cashMgmt/livingPay/companyMgmt/utilityCompany.ajax",
                    contentType: 'application/json',
                    dataType: "json",
                    data: JSON.stringify(data),
                    success: function (result) {
                        if (result.error == 0) {
                            $("#addCompany").modal('hide');
                            // $("#grid-table").trigger("reloadGrid");
                            _this.showDialog('', 'info', true, result.msg);
                            _this.getTableList({
                                rows: _this.records
                            });
                            _this.tableSelect = [];
                            _this.currentIndex = 0;
                        } else {
                            $("#addCompany").modal('hide');
                            _this.showDialog('', 'info', false, result.msg);
                        }
                    },
                    error: function (data) {
                        $("#addCompany").modal('hide');
                        _this.showDialog('', 'info', true, '新增失败');
                    }
                });
            } else {
                _this.showDialog('addCompany', 'info', true, '请填写完整');
            }
        },
        //删除机构
        deleteEven: function () {
            var _this = this;
            if (_this.tableSelect.length <= 0) {
                _this.showDialog('', 'info', false, '请至少选择一条数据进行删除');
                return
            }
            var ids = [];
            var codeName = [];
            for (var i = 0; i < _this.tableSelect.length; i++) {
                ids[i] = _this.tableSelect[i].companyId;
                codeName[i] = _this.tableSelect[i].companyName;
            }
            _this.deleteCode = ids;
            var codesDelete = codeName.join();
            _this.showDialog("", "delete", false, '确认删除“' + codesDelete + '”，这些数据吗？');
        },
        confirmDelete: function () {
            var _this = this;
            var ids = _this.deleteCode;
            $.ajax({
                type: "post",
                url: "/cashMgmt/livingPay/companyMgmt/deleteEven.ajax?ids=" + ids,
                async: false,
                dataType: "json",
                success: function (result) {
                    if (result.error == 0) {
                        _this.tableSelect = [];
                        _this.showDialog('delete', 'info', false, result.msg);
                        _this.getTableList({
                            rows: _this.records,
                        })
                        _this.tableSelect=[]
                        _this.currentIndex = 0;
                    } else {
                        _this.showDialog('delete', 'info', false, result.msg);
                    }
                },
                error: function (data) {
                    _this.showDialog('delete', 'info', false, '删除机构失败');
                }
            });
        },
        //修改机构
        companyvo: function () {
            var _this = this;

            if (_this.tableSelect.length <= 0) {
                _this.showDialog('', 'info', false, '请选择一条数据进行编辑');
                return false;
            } else if (_this.tableSelect.length > 1) {
                _this.showDialog('', 'info', false, '请选择一条数据进行编辑');
                return false;
            }
            $("#addCompany").modal('show');
            var rowDateCompanyId = _this.tableSelect[0].companyId;
            $.post({
                //原get方式
                async: false,
                url: "/cashMgmt/livingPay/companyMgmt/companyvo.ajax?companyId=" + rowDateCompanyId,
                dataType: "json",
                success: function (result) {
                    if (result.error == 0) {
                        var data = result.data;
                        $("#companyId").val(data.companyId);
                        $("#companyName").val(data.companyName);
                        $("#companyCode").val(data.companyCode);
                        $("#serviceType").val(data.serviceType);
                        $("#spell").val(data.spell);
                        _this.addStatus = data.status;
                        _this.addIsNumber = data.isNumber;
                        _this.addCreateAccount = data.createAccount;
                        $("#accountLength").val(data.accountLength);
                        $("#accountNoRule").val(data.accountNoRule);
                        $("#accountNoName").val(data.accountNoName);
                        $("#accountNoRuleTitle").val(data.accountNoRuleTitle);
                        $("#billKeyType").val(data.billKeyType);
                        $("#beginNum").val(data.beginNum);
                        $("#queryNum").val(data.queryNum);
                        $("#filed1").val(data.filed1);
                        $("#filed2").val(data.filed2);
                        $("#filed3").val(data.filed3);
                        $("#filed4").val(data.filed4);
                        $("#payfiled1").val(data.payfiled1);
                        $("#payfiled2").val(data.payfiled2);
                        $("#payfiled3").val(data.payfiled3);
                        $("#payfiled4").val(data.payfiled4);
                        $("#customerName").val(data.customerName);
                        $("#payAccount").val(data.payAccount);
                        $("#pin").val(data.pin);
                        $("#acType").val(data.acType);
                        $("#contractNo").val(data.contractNo);
                        $("#billKeyStart").val(data.billKeyStart);
                        $("#billKeyEnd").val(data.billKeyEnd);
                        $("#billDateStart").val(data.billDateStart);
                        $("#billDateEnd").val(data.billDateEnd);
                        $("#payAmountStart").val(data.payAmountStart);
                        $("#payAmountEnd").val(data.payAmountEnd);
                        $("#saveBillDate").val(data.saveBillDate);
                        $("#saveContractNo").val(data.saveContractNo);
                        $("#saveCustomerName").val(data.saveCustomerName);
                        $("#saveBalance").val(data.saveBalance);
                        $("#savePayAmount").val(data.savePayAmount);
                        $("#saveBeginDate").val(data.saveBeginDate);
                        $("#saveEndDate").val(data.saveEndDate);
                        $("#savefiled1").val(data.savefiled1);
                        $("#savefiled2").val(data.savefiled2);
                        $("#savefiled3").val(data.savefiled3);
                        $("#savefiled4").val(data.savefiled4);
                        $("#districtCode").val(data.districtCode);
                        $("#accountNoPlaceholder").val(data.accountNoPlaceholder);
                        $("#accountNoTips").val(data.accountNoTips);
                        var districtCode = data.districtCode;
                        $(".chosen-select").val("");
                        $(".chosen-select").trigger("chosen:updated");
                        chose_mult_set_ini('.chosen-select', districtCode);

                        //初始化
                        $(".chosen-select").chosen();
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        //账单测试
        queryBillTest: function () {
            var _this = this;
            var companyId = $("#companyId").val();
            var billKey = $("#billKeyQBTest").val();
            var data = {
                "companyId": companyId,
                "billKey": billKey
            };

            $.ajax({
                type: "POST",
                async: false,
                url: "/cashMgmt/livingPay/companyMgmt/queryBillTest.ajax",
                contentType: 'application/json',
                dataType: "json",
                data: JSON.stringify(data),
                success: function (result) {
                    if (result.error == 0) {
                        _this.getTableList({
                            rows: _this.records
                        });
                        _this.tableSelect=[]
                        _this.currentIndex = 0;
                        _this.showDialog('addCompany', 'info', true, result.msg);
                    } else {
                        _this.showDialog('addCompany', 'info', true, result.msg);
                    }
                },
                error: function (data) {
                    _this.showDialog('addCompany', 'info', true, '操作失败');
                }
            });
        },
        //支付测试
        billPayTest: function () {
            var _this = this;
            var companyId = $("#companyId").val();
            var billKey = $("#billKeyBPTest").val();
            var payAmount = $("#payAmountBPTest").val();
            var contractNo = $("#contractNoBPTest").val();
            var customerName = $("#customerNameBPTest").val();
            var payAccount = $("#payAccountBPTest").val();
            var pin = $("#pinBPTest").val();
            var acType = $("#acTypeBPTest").val();
            var billDate = $("#billDateBPTest").val();
            var filed1 = $("#filed1BPTest").val();
            var filed2 = $("#filed2BPTest").val();
            var filed3 = $("#filed3BPTest").val();
            var filed4 = $("#filed4BPTest").val();

            var data = {
                "companyId": companyId,
                "billKey": billKey,
                "payAmount": payAmount,
                "contractNo": contractNo,
                "customerName": customerName,
                "payAccount": payAccount,
                "pin": pin,
                "acType": acType,
                "billDate": billDate,
                "filed1": filed1,
                "filed2": filed2,
                "filed3": filed3,
                "filed4": filed4
            };

            $.ajax({
                type: "POST",
                async: false,
                url: "/cashMgmt/livingPay/companyMgmt/billPayTest.ajax",
                contentType: 'application/json',
                dataType: "json",
                data: JSON.stringify(data),
                success: function (result) {
                    if (result.error == 0) {
                        _this.getTableList({
                            rows: _this.records
                        });
                        this.tableSelect=[]
                        _this.currentIndex = 0;
                        _this.showDialog('addCompany', 'info', true, '支付账单测试成功');
                    } else {
                        _this.showDialog('addCompany', 'info', true, result.msg);
                    }
                },
                error: function (data) {
                    _this.showDialog('addCompany', 'info', true, '操作失败');
                }
            });
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
            var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
            var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
            var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
            return Y + M + D + h + m + s;
        }
    }
});

function toUpperCase(obj) {
    obj.value = obj.value.toUpperCase();
}

$("#reset_btn").click(function () {
    $("#companyForm").validate().resetForm();
    $(".chosen-select").val("");
    $(".chosen-select").trigger("chosen:updated");
});

function chose_mult_set_ini(select, values) {
    if(values){
        var arr = values.split(',');
        $(select).val(arr);
        $(select).trigger("chosen:updated");
    }
}

function removeSelect(select) {
    $(select).val("");
    $(select).trigger("chosen:updated");
}