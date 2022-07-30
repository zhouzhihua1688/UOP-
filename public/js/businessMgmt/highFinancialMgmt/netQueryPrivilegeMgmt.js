
new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        tableData: [],
        diaMsg:'',
        custName:"",
        custIdno:"",
        status:"",
        custNo:'',
        // 新增数据 查询字段
        custNos:'',
        custIdList:{},
        statusList:'',
        // 修改数据
        statuss:'',
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10,
    },
    mounted: function () {
        var dialogs = ['info', 'add', 'revise'];
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
        this.getTableData(0);
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
            params.custName =this.custName;
            params.custIdno =this.custIdno;
            params.status =this.status;
            params.pageNum = currentIndex + 1;
            params.pageSize = this.pageMaxNum;
            $.post({
                url: '/businessMgmt/highFinancialMgmt/netQueryPrivilegeMgmt/getTableData.ajax',
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
        },
        // 新增数据
        showAdd:function(){
            var _this = this;
            this.custNos = "";
            this.custIdList.custNo = "";
            this.custIdList.idNo= "";
            this.custIdList.invNm= "";
            this.statusList="";
            this.showDialog('', 'add',"false");
        },
        // 查询证件号
        search:function(){
            var _this=this
            var params={};
            params.idNo=this.custNos;
            var reg =/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;

            if(!reg.test(params.idNo)){
                return _this.showDialog('add', 'info', true,'证件号码必须为18位有效证件!');
            }
            $.post({
                url: '/businessMgmt/highFinancialMgmt/netQueryPrivilegeMgmt/search.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.custIdList=result.data.body
                        _this.getTableData(0)
                    }
                    else {
                        _this.showDialog('add', 'info', false, result.msg);
                    }
                }
            });
        },
        saveParam:function () {
            var _this = this;
            if(!this.custNos){
                return _this.showDialog('add', 'info', true,'证件号码不能为空!');
            }
            var params={};
            var custArr=[]
            params.custNo =this.custIdList.custNo;
            params.status =this.statusList;
            _this.tableData.map(item =>{
                custArr.push(item.custNo)
            })
            if(custArr.indexOf(params.custNo.toString()) != -1){
                return _this.showDialog('add', 'info', true,'该用户已经被授予权限!');
            }
            $.post({
                url: '/businessMgmt/highFinancialMgmt/netQueryPrivilegeMgmt/saveParam.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0);
                        _this.showDialog('add', 'info', false, result.msg);
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        // 修改数据
        showUpdate:function (item) {
            var _this = this;
            this.custNo=item.custNo;
            this.statuss=item.status;
            this.showDialog('', 'revise');
        },
        update: function () {
            var _this = this;
            var params = {};
            params.custNo =this.custNo
            params.status = this.statuss;
            $.post({
                url: '/businessMgmt/highFinancialMgmt/netQueryPrivilegeMgmt/update.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0);
                        // _this.showDialog('revise', 'info', false, result.msg);
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
    },
    filters: {
        status: function (item) {
            if (item =="0") {
                return "普通"
            } else if (item =="1") {
                return "白名单"
            } else if (item =="2") {
                return "黑名单"
            }
        },
    }

});

