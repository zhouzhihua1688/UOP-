
new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        tableData: [],
        diaMsg: '',
        fundId:"",
        fundName:'',
        currentLimitEnt:'',
        fundData:[],

        fundIdList:'all',
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10,
        totalRecord:'',
    },
    mounted: function () {
        var dialogs = ['info', 'add', 'query'];
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
        var fundArr = ['fundNameList'];
        fundArr.forEach(function (value) {
            $('#' + value).chosen({
                search_contains: true,
                no_results_text: '未找到相关产品信息',
                disable_search_threshold: 6,
                width: '220px',
            });
        });
        $('#fundNameList').on('change', function (e, params) {
            _this.fundIdList = params ? params.selected : '';
        });

        this.getTableData(0);
        this.fundList(0)
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
            var params = {};
            var _this = this;
            params.fundId = this.fundIdList;
            params.pageNum = currentIndex + 1;
            params.pageSize = this.pageMaxNum;
            console.log(params)
            $.post({
                url: '/businessMgmt/highFinancialCompany/enterpriseQuotaMgmt/getTableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.tableData = result.data.tableData;
                        _this.currentIndex = result.data.pageNo - 1;
                        _this.totalPage = result.data.totalSize;
                    } else {
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
                url: '/businessMgmt/highFinancialCompany/enterpriseQuotaMgmt/fundList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.nameList = result.data.listData;
                        _this.currentIndex = result.data.pageNum - 1;
                        _this.totalPage = result.data.totalSize;

                        // 下拉列表
                        var str = '<option value="all">全部</option>';
                        _this.nameList.forEach(function (item) {
                            str += '<option value="' + item.fundId + '">'+item.fundId+"-"+item.fundName + '</option>';
                        });
                        var fundArr = ['fundNameList'];
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
        // 预约明细查询
        query:function(item,currentIndex){
            var _this=this;
            var params={}
            params.fundId=item.fundId
            params.pageNo =currentIndex + 1;
            params.pageSize =this.pageMaxNum+9980;
            $.post({
                url: '/businessMgmt/highFinancialCompany/enterpriseQuotaMgmt/query.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.fundData = result.data.tableData;
                        // _this.currentIndex = result.data.pageNo - 1;
                        // _this.totalPage = result.data.totalSize;
                        _this.totalRecord=result.data.totalRecord;
                    }
                    else {
                        _this.fundData = [];
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
            _this.showDialog('', 'query');
        },
        // 新增额度
        showAdd:function(item){
           var _this=this;
            this.fundId=item.fundId;
            this.fundName=item.fundName;
            this.currentLimitEnt=item.currentLimitEnt
            _this.showDialog('', 'add');
        },
        saveParam:function(){
           var _this=this;
           var params={}
           params.fundId=this.fundId;
           params.fundName=this.fundName;
           params.currentlimitEnt=this.currentLimitEnt;
           $.post({
                url: '/businessMgmt/highFinancialCompany/enterpriseQuotaMgmt/saveParam.ajax',
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
        //修改额度
        showUpdate:function(item){
            var _this=this;
            this.fundId=item.fundId;
            this.fundName=item.fundName;
            this.currentLimitEnt=item.currentLimitEnt
            _this.showDialog('', 'modify');
        },
        update:function(){
            var _this=this;
            var params={}
            params.fundId=this.fundId;
            params.fundName=this.fundName;
            params.currentlimitEnt=this.currentLimitEnt;
            $.post({
                url: '/businessMgmt/highFinancialCompany/enterpriseQuotaMgmt/update.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0);
                        _this.showDialog('modify', 'info', false, result.msg);
                    }
                    else {
                        _this.showDialog('modify', 'info', false, result.msg);
                    }
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
    },
    // 证件类型
    filters: {
        idTp: function (item) {
            // item = item.toUpperCase()
            if (item === "0") {
                return "身份证"
            } else if (item === "1") {
                return "护照"
            } else if (item === "4") {
                return "港澳居民来往内地通行证"
            } else if (item === "5") {
                return "户口本"
            }else if (item === "6") {
                return "外籍护照"
            }else if (item === "7") {
                return "其他"
            }else if (item === "A") {
                return "台胞证"
            }else if (item === "B") {
                return "外国人永久居住证"
            }else {
                return "*"
            }
        },
    }
});

