new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        tableData: [],
        diaMsg: '',
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        pageMaxNum: 10,
        condition: '',

        accountType: '',
        sceneList: [],
        addData: {
            accountType: '',
            recommendProductType: '',
            recommendProduct: '',
            recommentDesc: '',
            investPeriodEnd: '',
            productYieldField: '',
            investPeriodStart: '',
            riskLevel: '',
            ageStart: '',
            ageEnd: '',
        },
        riskList: [],
        delData: {},
        modifyData: {
            recommentDesc: ''
        }
    },
    created: function () {
        this.queryScene()
        this.queryRisk()
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
            } else if (this.currentIndex <= this.maxSpace && this.middleData.length - this.currentIndex > this.maxSpace) {
                for (var i = 0; i < this.currentIndex + (2 * this.maxSpace - this.currentIndex); i++) {
                    arr.push(i + 1);
                }
            } else if (this.currentIndex > this.maxSpace && this.middleData.length - this.currentIndex <= this.maxSpace) {
                var space = this.middleData.length - this.currentIndex;
                for (var i = this.currentIndex - (2 * this.maxSpace - space); i < this.middleData.length; i++) {
                    arr.push(i + 1);
                }
            } else {
                for (var i = 0; i < this.middleData.length; i++) {
                    arr.push(i + 1);
                }
            }
            return arr;
        },
    },
    watch: {
        pageMaxNum: function () {
            this.currentIndex = 0;
        },
        condition: function () {
            this.currentIndex = 0;
        },
        "addData.recommentDesc": function (newval) {
            if (newval.length > 100) {
                this.addData.recommentDesc = newval.substring(0, 100)
            }
        },
        "modifyData.recommentDesc": function (newval) {
            if (newval && newval.length > 100) {
                this.modifyData.recommentDesc = newval.substring(0, 100)
            }
        }
    },
    mounted: function () {
        var dialogs = ['delete', 'info', 'operate', 'showModify'];
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

        $('#select2ProductList').chosen({
            search_contains: true,
            no_results_text: '未找到',
            disable_search_threshold: 6,
            width: '168px'
        });
        $('#select2ProductList').on('change', function (e, params) {
            this.addData.recommendProduct = params ? params.selected : '';
        }.bind(this));
        $('#modifyProductList').chosen({
            search_contains: true,
            no_results_text: '未找到',
            disable_search_threshold: 6,
            width: '168px'
        });
        $('#modifyProductList').on('change', function (e, params) {
            this.modifyData.recommendProduct = params ? params.selected : '';
        }.bind(this));
        this.getProductList()
    },
    methods: {
        getProductList: function () {
            $.post({
                url: '/publicConfig/familyAffectionAccount/recommendProduct/productList.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        this.productList = result.data;
                        var str = '<option value="">请选择</option>';
                        result.data.forEach(function (item) {
                            str += '<option value="' + item.fundId + '">' + item.fundId + ' - ' + item.fundName + '</option>';
                        });
                        $('#select2ProductList').html(str);
                        $("#select2ProductList").trigger("chosen:updated");
                        $('#modifyProductList').html(str);
                        $("#modifyProductList").trigger("chosen:updated");
                    } else {
                        this.showDialog('', 'info', true, result.msg);
                    }
                }.bind(this)
            });
        },
        showModify: function (item) {
            this.modifyData = Object.assign({}, item)
            $('#modifyProductList').val(item.recommendProduct);
            $("#modifyProductList").trigger("chosen:updated");
            this.showDialog('', 'showModify');
        },
        modify: function () {
            if (!this.modifyData.accountType) {
                this.showDialog('showModify', 'info', true, '请选择场景');
                return;
            }
            if (!this.modifyData.recommendProduct) {
                this.showDialog('showModify', 'info', true, '请选择基金/组合代码');
                return;
            }
            if (!this.modifyData.recommentDesc) {
                this.showDialog('showModify', 'info', true, '请填写推荐文案');
                return;
            }
            var params = {}
            if (this.modifyData.accountType == 2) {
                if (this.modifyData.investPeriodEnd === null || this.modifyData.investPeriodStart === null) {
                    this.showDialog('showModify', 'info', true, '请填写投资时长区间');
                    return;
                }
                if (this.modifyData.investPeriodEnd === '' || this.modifyData.investPeriodStart === '') {
                    this.showDialog('showModify', 'info', true, '请填写投资时长区间');
                    return;
                }
                params = {
                    recommendId: this.modifyData.recommendId,
                    status: 1,
                    templateId: 1,
                    accountType: this.modifyData.accountType,
                    recommendProductType: this.modifyData.recommendProductType,
                    productYieldField: this.modifyData.productYieldField,
                    recommendProduct: this.modifyData.recommendProduct,
                    recommentDesc: this.modifyData.recommentDesc,
                    paramMap: {
                        investPeriodEnd: this.modifyData.investPeriodEnd,
                        investPeriodStart: this.modifyData.investPeriodStart,
                    }
                }
            } else if (this.modifyData.accountType == 3) {
                if (this.modifyData.ageStart === null || this.modifyData.ageEnd === null) {
                    this.showDialog('showModify', 'info', true, '请填写投资人年龄区间');
                    return;
                }
                if (!this.modifyData.riskLevel) {
                    this.showDialog('showModify', 'info', true, '请选择投资人的风险等级');
                    return;
                }
                params = {
                    recommendId: this.modifyData.recommendId,
                    status: 1,
                    templateId: 1,
                    accountType: this.modifyData.accountType,
                    recommendProductType: this.modifyData.recommendProductType,
                    productYieldField: this.modifyData.productYieldField,
                    recommendProduct: this.modifyData.recommendProduct,
                    recommentDesc: this.modifyData.recommentDesc,
                    paramMap: {
                        ageStart: this.modifyData.ageStart,
                        ageEnd: this.modifyData.ageEnd,
                        riskLevel: this.modifyData.riskLevel
                    }
                }
            }
            $.post({
                url: '/publicConfig/familyAffectionAccount/recommendProduct/modifyData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.getTableData()
                        this.showDialog('showModify', 'info', false, result.msg);
                    } else {
                        this.showDialog('showModify', 'info', true, result.msg);
                    }
                }.bind(this)
            });
        },
        add: function () {
            if (!this.addData.accountType) {
                this.showDialog('operate', 'info', true, '请选择场景');
                return;
            }
            if (!this.addData.recommendProduct) {
                this.showDialog('operate', 'info', true, '请选择基金/组合代码');
                return;
            }
            if (!this.addData.recommentDesc) {
                this.showDialog('operate', 'info', true, '请填写推荐文案');
                return;
            }
            var params = {}
            if (this.addData.accountType == 2) {
                if (this.addData.investPeriodEnd === '' || this.addData.investPeriodStart === '') {
                    this.showDialog('operate', 'info', true, '请填写投资时长区间');
                    return;
                }
                params = {
                    status: 1,
                    templateId: 1,
                    accountType: this.addData.accountType,
                    recommendProductType: this.addData.recommendProductType,
                    productYieldField: this.addData.productYieldField,
                    recommendProduct: this.addData.recommendProduct,
                    recommentDesc: this.addData.recommentDesc,
                    paramMap: {
                        investPeriodEnd: this.addData.investPeriodEnd,
                        investPeriodStart: this.addData.investPeriodStart,
                        // "ageStart": 10,
                        // "ageEnd": G 40,
                        // "riskLevel": "1"
                    }
                }
            } else if (this.addData.accountType == 3) {
                if (this.addData.ageStart === '' || this.addData.ageEnd === '') {
                    this.showDialog('operate', 'info', true, '请填写投资人年龄区间');
                    return;
                }
                if (this.addData.riskLevel === '') {
                    this.showDialog('operate', 'info', true, '请选择投资人的风险等级');
                    return;
                }
                params = {
                    status: 1,
                    templateId: 1,
                    accountType: this.addData.accountType,
                    recommendProductType: this.addData.recommendProductType,
                    productYieldField: this.addData.productYieldField,
                    recommendProduct: this.addData.recommendProduct,
                    recommentDesc: this.addData.recommentDesc,
                    paramMap: {
                        ageStart: this.addData.ageStart,
                        ageEnd: this.addData.ageEnd,
                        riskLevel: this.addData.riskLevel
                    }
                }
            }
            $.post({
                url: '/publicConfig/familyAffectionAccount/recommendProduct/add.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.getTableData()
                        this.showDialog('operate', 'info', false, result.msg);
                    } else {
                        this.showDialog('operate', 'info', true, result.msg);
                    }
                }.bind(this)
            });
        },
        queryScene: function () {
            $.post({
                url: '/publicConfig/familyAffectionAccount/recommendProduct/queryScene.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        this.sceneList = result.data.filter(function (item) {
                            return item.typeId != 1;
                        });
                    } else {
                        this.showDialog('', 'info', true, result.msg);
                    }
                }.bind(this)
            });
        },
        queryRisk: function () {
            $.post({
                url: '/publicConfig/familyAffectionAccount/recommendProduct/risk.ajax',

                data: {
                    pmst: 'ICIF',
                    pmkey: 'RISKLEVEL_0002'
                },
                success: function (result) {
                    if (result.error === 0) {
                        this.riskList = result.data;
                    } else {
                        this.showDialog('', 'info', true, result.msg);
                    }
                }.bind(this)
            });
        },
        getTableData: function () {
            if (!this.accountType) {
                this.showDialog('', 'info', false, '请选择');
                return;
            }
            $.post({
                url: '/publicConfig/familyAffectionAccount/recommendProduct/tableData.ajax',
                data: {
                    accountType: this.accountType,
                    templateId: 1
                },
                success: function (result) {
                    if (result.error === 0) {
                        this.currentIndex = 0;
                        this.tableData = result.data;
                    } else {
                        this.showDialog('', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },
        showDelete: function (item) {
            this.delData = {
                accountType: item.accountType,
                templateId: item.templateId,
                recommendId: item.recommendId,
                status: 2
            };
            this.showDialog('', 'delete');
        },
        deleteData: function () {
            $.post({
                url: '/publicConfig/familyAffectionAccount/recommendProduct/del.ajax',
                data: this.delData,
                success: function (result) {
                    if (result.error === 0) {
                        this.getTableData()
                        this.showDialog('delete', 'info', false, result.msg);
                    } else {
                        this.showDialog('delete', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },
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
        riskText: function (value, arr) {
            var risk = arr.filter(function (item) {
                return item.pmco === value;
            });
            if (risk.length > 0) {
                return risk[0].pmnm;
            }
            return value;

        },
        yieldText: function (value) {
            if (value === 'monthlyReturn') {
                return '近1个月';
            } else if (value === 'quarterReturn') {
                return '近3个月';
            } else if (value === 'halfYearReturn') {
                return '近6个月';
            } else if (value === 'yearReturn') {
                return '近1年';
            }
            return value
        }
    }
});