new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        tableData: [],
        diaMsg: '',
        // 新建弹窗相关数据
        channelCode: "",
        channelName: "",
        branchCode: "",
        acceptMode: "",
        platformAppId:"",
        platformCode: "",
        platformAppSecret: "",
        platformKindCode: "",
        openOfficialAcct:"",
        status:"",
        isUpdate: false,
        // 查询
        channel_code:'',
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        pageMaxNum: '10',
        condition: '',
    },
    mounted: function () {
        var dialogs = ['info', 'add','revise', 'del'];
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
        // 假分页
        pageMaxNum: {
            handler: function (val, oldval) {
                this.currentIndex= 0;
            }
        },
        condition: {
            handler: function (val, oldval) {
                this.currentIndex= 0;
            }
        },
    },
    methods: {
        getTableData: function (currentIndex) {
            var _this = this;
            var params = {};
            params.channel_code = this.channel_code;
            // params.page = currentIndex + 1;
            // params.rows = this.pageMaxNum;
            if(this.channel_code==""){
                $.post({
                    url: '/operationMgmt/channelMgmt/externalChannel/getTableData.ajax',
                    // data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.tableData =result.data.tableData;
                        }
                        else {
                            _this.tableData = [];
                            _this.showDialog('', 'info', false, result.msg);
                        }
                    }
                });
            }else{
                console.log("channel_code:",this.channel_code)
                $.post({
                    url: '/operationMgmt/channelMgmt/externalChannel/getSingleData.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.tableData = [];
                            _this.tableData.push(result.data.tableData);
                        }
                        else {
                            _this.tableData = [];
                            _this.showDialog('', 'info', false, result.msg);
                        }
                    }
                });
            }
        },
        showAdd: function () {
            var _this = this;
            this.channelCode="",
            this.channelName= "",
            this.branchCode= "",
            this.acceptMode= "",
            this.platformAppId="",
            this.platformCode= "",
            this.platformAppSecret= "",
            this.platformKindCode= "",
            this.openOfficialAcct= "",
            this.status="",
            this.showDialog('', 'add');
        },
        saveParam:function(){
            var _this = this;
            var params = {};
            params.channelCode = this.channelCode;
            params.channelName = this.channelName;
            params.branchCode = this.branchCode;
            params.acceptMode = this.acceptMode;
            params.platformAppId = this.platformAppId;
            params.platformCode = this.platformCode;
            params.platformAppSecret = this.platformAppSecret;
            params.platformKindCode = this.platformKindCode;
            params.openOfficialAcct = this.openOfficialAcct;
            params.status = this.status;
            console.log(params)
            $.post({
                url: '/operationMgmt/channelMgmt/externalChannel/saveParam.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0);
                        _this.showDialog('add', 'info', false, result.msg);
                    }else{
                        _this.showDialog('add', 'info', true, result.msg);
                    }
                }
            });
        },
        showUpdate: function (item) {
            var _this = this;
            this.channelCode = item.channelCode;
            this.channelName = item.channelName;
            this.branchCode = item.branchCode;
            this.acceptMode =item.acceptMode;
            this.platformAppId = item.platformAppId;
            this.platformCode = item.platformCode;
            this.platformAppSecret = item.platformAppSecret;
            this.platformKindCode = item.platformKindCode;
            this.openOfficialAcct = item.openOfficialAcct;
            this.status = item.status;
            this.showDialog('', 'revise');
        },
        update:function(){
            var _this = this;
            var params = {};
            params.channelCode = this.channelCode;
            params.channelName = this.channelName;
            params.branchCode = this.branchCode;
            params.acceptMode = this.acceptMode;
            params.platformAppId = this.platformAppId;
            params.platformCode = this.platformCode;
            params.platformAppSecret = this.platformAppSecret;
            params.platformKindCode = this.platformKindCode;
            params.openOfficialAcct = this.openOfficialAcct;
            params.status = this.status;
            $.post({
                url: '/operationMgmt/channelMgmt/externalChannel/update.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0);
                    }
                    _this.showDialog('revise', 'info', false, result.msg);
                }
            });
        },
        showDelete: function (item) {
            var _this = this
            // var hasCheck = false;
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
            this.channelCode= item.channelCode;
            this.showDialog('', 'del');
        },
        deleteParam: function () {
            var _this = this;
            var params = {};
            params.channel_code = this.channelCode;
            $.post({
                url: '/operationMgmt/channelMgmt/externalChannel/deleteParam.ajax',
                data: params,
                traditional: true,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0);
                    }
                    _this.showDialog('del', 'info', false, result.msg);
                }
            });
            // var ids = [];
            // for (var i = 0; i < this.tableData.length; i++) {
            //     if (this.tableData[i].check) {
            //         ids.push(this.tableData[i].id);
            //     }
            // }
            // var _this = this;
            // $.post({
            //     url: '/operationMgmt/userMgmt/user/deleteUser.ajax',
            //     data: {ids: ids.join(',')},
            //     success: function (result) {
            //         if (result.error === 0) {
            //             _this.getTableData(0);
            //         }
            //         _this.showDialog('del', 'info', false, result.msg);
            //     }
            // });

        },
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
    }
});