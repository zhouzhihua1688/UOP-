
new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        tableData: [],
        diaMsg: '',

        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10,
        userId: '',

        qCustNo: '',//查询
        qFundId: '',//查询

        sendData: {
            strDt: '',
            endDt: '',
            fundId: '',
            branchCode: '',
            intervalLimit: '',
            maxDay: '',
            maxSingle: '',
            minSingle: '',
            apkind: '',
            custNo: '',
            serialNo: '',
        },
        deleteInfo: {
            serialNo: ''
        },
        modifyS: false,
        fileStatus: false,
        filePath: '',
    },
    created: function () {
        var _this = this;




    },
    mounted: function () {
        var dialogs = ['info', 'add', 'deleteDialog', 'addfile'];
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
            var params = {};
            var _this = this;
            params.custNo = this.qCustNo;
            params.fundId = this.qFundId;
            params.pageNo = currentIndex + 1;
            params.pageSize = this.pageMaxNum;
            $.post({
                url: '/businessMgmt/IPOMgmtEC/whiteList/getList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.tableData = result.data.limitWhites;
                        _this.currentIndex = result.data.pageNum - 1;
                        _this.totalPage = result.data.pages;
                        _this.userId = result.data.userId;
                        console.log(result)
                    } else {
                        _this.tableData = [];
                        _this.currentIndex = 0;
                        _this.totalPage = 0;
                        _this.showDialog('', 'info', false, result.msg);
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
        addDialog: function () {
            for (const key in this.sendData) {
                this.sendData[key] = ''
            }
            this.modifyS = false;
            this.showDialog('', 'add', false);
        },
        add: function () {
            var _this = this;
            if (!this.sendData.custNo) {
                this.showDialog('add', 'info', false, '客户编号必填');
                return;
            }
            var params = {
                strDt: new Date(this.sendData.strDt).toISOString(),
                endDt: new Date(this.sendData.endDt).toISOString(),
                fundId: this.sendData.fundId,
                branchCode: this.sendData.branchCode,
                interval: this.sendData.intervalLimit,
                maxDay: this.sendData.maxDay,
                maxSingle: this.sendData.maxSingle,
                apkind: this.sendData.apkind,
                custNo: this.sendData.custNo,
                status: 'N',
                oprId: this.userId,
            };
            $.post({
                url: '/businessMgmt/IPOMgmtEC/whiteList/add.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('add', 'info', false, result.msg);
                        for (const key in _this.sendData) {
                            _this.sendData[key] = ''
                        }
                        _this.getTableData(0);
                        console.log(result)
                    } else {
                        _this.showDialog('add', 'info', true, result.msg);
                    }
                }
            });
        },
        deleteDialog: function (val) {
            this.deleteInfo.serialNo = val;
            this.showDialog('', 'deleteDialog', true);
        },
        deleteData: function () {
            var _this = this;
            var params = {
                serialNo: this.deleteInfo.serialNo,
                oprId: this.userId,
            };
            $.post({
                url: '/businessMgmt/IPOMgmtEC/whiteList/delete.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('deleteDialog', 'info', false, result.msg);
                        _this.getTableData(0);
                        console.log(result)
                    } else {
                        _this.showDialog('deleteDialog', 'info', true, result.msg);
                    }
                }
            });
        },
        modifyDialog: function (item) {
            this.sendData.strDt = item.strDt
            this.sendData.endDt = item.endDt
            this.sendData.fundId = item.fundId
            this.sendData.minSingle = item.minSingle
            this.sendData.intervalLimit = item.intervalLimit
            this.sendData.maxDay = item.maxDay
            this.sendData.maxSingle = item.maxSingle
            this.sendData.custNo = item.custNo
            this.sendData.serialNo = item.serialNo
            this.modifyS = true;
            this.showDialog('', 'add', false);
        },
        modify: function () {
            var _this = this;
            var params = {
                strDt: new Date(this.sendData.strDt).toISOString(),
                endDt: new Date(this.sendData.endDt).toISOString(),
                serialNo: this.sendData.serialNo,
                minSingle: this.sendData.minSingle,
                intervalLimit: this.sendData.intervalLimit,
                maxDay: this.sendData.maxDay,
                maxSingle: this.sendData.maxSingle,
                oprId: this.userId,
            };
            $.post({
                url: '/businessMgmt/IPOMgmtEC/whiteList/modify.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('add', 'info', false, result.msg);
                        for (const key in _this.sendData) {
                            _this.sendData[key] = ''
                        }
                        _this.getTableData(0);
                        console.log(result)
                    } else {
                        _this.showDialog('add', 'info', true, result.msg);
                    }
                }
            });
        },
        uploadView: function () {
            this.showDialog('', 'addfile', false);
            this.fileStatus = true;
        },
        select: function () {
            document.getElementById("uploadFileInput").click();
        },
        showFileName: function (event) {
            if (event.target.files[0]) {
                this.filePath = event.target.files[0].name
            } else {
                this.filePath = ''
            }
        },
        fileUpload: function () {
            var _this = this;
            var filePath = this.filePath;
            var afterFile = filePath.indexOf('.');
            afterFile = filePath.substr(afterFile - 0 + 1) //获取文件后缀名
            afterFile = afterFile.toLocaleLowerCase() //转为小写
            if (afterFile != 'csv') {
                _this.showDialog('addfile', 'info', true, '只能上传csv文件表格');
                return;
            }

            if (this.filePath != '') {
                var fileElementId = 'uploadFileInput';
                $.ajaxFileUpload({
                    url: '/businessMgmt/IPOMgmtEC/whiteList/ExcelUpload.ajax',
                    type: 'POST',
                    dataType: 'json',
                    secureuri: false,
                    fileElementId: fileElementId,
                    success: function (result) {
                        if (result.error == 0) {
                            _this.getTableData(0)
                            _this.filePath = ''
                            _this.fileStatus = false
                            _this.showDialog('addfile', 'info', false, result.msg)
                        } else {
                            _this.showDialog('addfile', 'info', true, result.msg)
                        }
                    }
                });
            }
        },
    },

    filters: {
        setApkind: function (val) {
            if (val == '024') {
                return '赎回';
            } else if (val == '022') {
                return '申购';
            } else {
                return val;
            }
        }
    },
    components: {
        'date-picker': VueBootstrapDatetimePicker
    }
});