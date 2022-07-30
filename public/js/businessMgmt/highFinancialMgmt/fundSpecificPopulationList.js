
new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        tableData: [],
        diaMsg: '',
        fundId:'',
        fundName:"",
        custNo:"",

        oldCustNo:'',
        newCustNo:'',
        // 查询下拉数据
        nameList:[],
        // 新增参数
        fundIds:'',
        custNos:'',
        custNames:'',
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10,

        filePath: '', //导入

    },
    mounted: function () {
        var dialogs = ['info', 'del', 'add','revise'];
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
        //下拉列表自带搜索功能
        var fundArr = ['fundNameList','fundAllList'];
        fundArr.forEach(function (value) {
            $('#' + value).chosen({
                search_contains: true,
                no_results_text: '未找到相关产品信息',
                disable_search_threshold: 6,
                width: '220px'
            });
        });
        $('#fundNameList').on('change', function (e, params) {
            _this.fundIds = params ? params.selected : '';
        });
        $('#fundAllList').on('change', function (e, params) {
            _this.fundIds = params ? params.selected : '';
        });
        this.getTableData(0);
        this.fundList(0);
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
        checkAll: function () {
            if (this.tableData.length == 0) {
                return false;
            }
            for (var i = 0; i < this.tableData.length; i++) {
                if (!this.tableData[i].check) {
                    return false;
                }
            }
            return true;
        }
    },
    watch: {
        pageMaxNum: function () {
            this.getTableData(0);
        }
    },
    methods: {
        getTableData: function (currentIndex) {
            var _this = this;
            var params = {};
            params.fundId=this.fundIds;
            params.pageNum=currentIndex + 1;
            params.pageSize=this.pageMaxNum;
            console.log(params)
            $.post({
                url: '/businessMgmt/highFinancialMgmt/fundSpecificPopulationList/getTableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
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
        },
        // 下拉列表-产品名称
        fundList:function(currentIndex){
            var _this = this;
            var params = {};
            params.pageNum =currentIndex + 1;
            params.pageSize =this.pageMaxNum+9980;
            $.post({
                url: '/businessMgmt/highFinancialMgmt/fundSpecificPopulationList/fundList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.nameList = result.data.listData;
                        _this.currentIndex = result.data.pageNum - 1;
                        _this.totalPage = result.data.totalSize;

                        // 下拉列表
                        var str = '<option value="">全部</option>';
                        _this.nameList.forEach(function (item) {
                            str += '<option value="' + item.fundId + '">'+item.fundId+"-"+item.fundName + '</option>';
                        });
                        var fundArr = ['fundNameList','fundAllList'];
                        fundArr.forEach(function (value) {
                            $('#' + value).html(value === '' ? ('<option value="">全部基金</option>' + str) : str);
                            $('#' + value).trigger('chosen:updated');
                        });
                    }
                    else {
                        _this.nameList = [];
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },

        // 新增数据
        showAdd:function () {
            var _this = this;
            this.fundIds = "";
            $('#fundAllList').val('');
            $('#fundAllList').trigger('chosen:updated');
            this.custNos = "";
            this.showDialog('', 'add',"false");
        },
        saveParam:function () {
            var _this = this;
            var params={};
            params.fundId =this.fundIds;
            params.custNo =this.custNos;
            console.log(params)
            if(params.custNo.length!==10){
                _this.showDialog('add', 'info',true,"客户编号长度不能小10位");
                return;
            }
            $.post({
                url: '/businessMgmt/highFinancialMgmt/fundSpecificPopulationList/saveParam.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0);
                        _this.showDialog('add', 'info', false, result.msg);
                    }
                    else {
                        _this.showDialog('add', 'info', false, result.msg);
                    }
                }
            });
        },
        // 删除数据
        showDelete:function (item) {
            var _this = this;
            this.fundId =item.fundId;
            this.custNo=item.custNo;
            this.showDialog('', 'del');
        },
        deleteList:function () {
            var _this=this;
            var params={};
            params.fundId = this.fundId
            params.custNo = this.custNo
            console.log(params)
            $.post({
                url: '/businessMgmt/highFinancialMgmt/fundSpecificPopulationList/deleteParam.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                    _this.getTableData(0);
                    _this.showDialog('del', 'info', false, result.msg);
                    }
                    _this.showDialog('del', 'info', false, result.msg);
                }
            });
        },
        // 修改数据
        showUpdate:function (item) {
            var _this = this;
            this.fundId=item.fundId;
            this.fundName=item.fundName;
            this.oldCustNo=item.custNo;
            this.showDialog('', 'revise');
        },

        update: function () {
            var _this = this;
            var params = {};
            params.fundId =this.fundId
            params.fundName = this.fundName;
            params.oldCustNo = this.oldCustNo;
            params.newCustNo = this.newCustNo;
            $.post({
                url: '/businessMgmt/highFinancialMgmt/fundSpecificPopulationList/update.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0);
                        _this.showDialog('revise', 'info', false, result.msg);
                    }
                    _this.showDialog('revise', 'info', false, result.msg);
                }
            });
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
    }
});

