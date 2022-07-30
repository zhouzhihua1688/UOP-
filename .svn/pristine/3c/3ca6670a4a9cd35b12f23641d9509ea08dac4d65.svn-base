new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        appId: '',
        searchField: '',
        appInfoList: [],
        resourceInfoList: [],
        isUpdate: false,
        updateId: '',
        tableData: [],
        diaMsg: '',
        // 新建弹窗相关数据
        diaAppId: '',
        diaParentId: '',
        diaResourceType: 0,
        diaResourceTypeList: ['目录', '菜单', '按钮', 'url'],
        diaResourceName: '',
        diaDefaultUrl: '',
        diaOrderNum: '',
        diaPermCode: '',
        diaMethod: 'GET',
        diaMethodList: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        diaWildMatch: 0,
        diaWildMatchList: ['是', '否'],
        // 上传弹窗相关数据
        uploadAppCode: '',
        uploadAppName: '',
        uploadType: '',
        uploadApiDocs: '',
        loadingShow: false,
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10
    },
    mounted: function () {
        var dialogs = ['info', 'del', 'add', 'uploadTxt'];
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
        $('#uploadBtn').click(function () {
            $('#uploadFileInput').click();
        });
        if (this.appInfoList.length == 0) {
            $.post({
                url: '/operationMgmt/resourceMgmt/resource/getAppInfoLIst.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        _this.appInfoList = result.data;
                        if (result.data.length > 0) {
                            _this.appId = result.data[0].appId;
                            _this.getTableData(0);
                        }
                    }
                    else {
                        _this.appInfoList = [];
                    }
                }
            });
        }
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
        },
        diaAppId: function (newValue, oldValue) {
            if (!newValue) {
                this.resourceInfoList = [];
                return;
            }
            var _this = this;
            var params = {};
            params.appId = newValue;
            params.page = 1;
            params.rows = 999999;
            $.post({
                url: '/operationMgmt/resourceMgmt/resource/getResourceInfoList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.resourceInfoList = result.data;
                    }
                    else {
                        _this.resourceInfoList = [];
                    }
                }
            });
        }
    },
    methods: {
        getTableData: function (currentIndex) {
            var params = {};
            var _this = this;
            params.searchField = this.searchField;
            params.appId = this.appId;
            params.page = currentIndex + 1;
            params.rows = this.pageMaxNum;
            $.post({
                url: '/operationMgmt/resourceMgmt/resource/getTableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.tableData = result.data.tableData;
                        _this.currentIndex = result.data.page - 1;
                        _this.totalPage = result.data.total;
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
        setAddData: function (obj) {
            this.diaAppId = obj.appId ? obj.appId : '';
            this.diaParentId = obj.parentId ? obj.parentId : '';
            this.diaResourceType = obj.resourceType ? Number(obj.resourceType) - 1 : 3;
            this.diaResourceName = obj.resourceName ? obj.resourceName : '';
            this.diaMethod = obj.method ? obj.method.toUpperCase() : 'GET';
            this.diaWildMatch = obj.wildMatch ? obj.wildMatch : 0;
            this.diaDefaultUrl = obj.defaultUrl ? obj.defaultUrl : '';
            this.diaOrderNum = obj.orderNum ? obj.orderNum : '';
            this.diaPermCode = obj.permCode ? obj.permCode : '';
        },
        showUpload: function () {
            $('#uploadFileInput').on('change', function () {
                $('#uploadInput').val($(this).val());
            });
            $('#uploadInput').val('');
            $('#uploadFileInput').val('');
            this.uploadAppCode = '';
            this.uploadAppName = '';
            this.uploadType = 0;
            this.uploadApiDocs = '';
            this.showDialog('', 'uploadTxt');
        },
        checkUploadData: function () {
            if (!this.uploadAppCode) {
                this.showDialog('uploadTxt', 'info', true, '应用code不能为空');
                return false;
            }
            if (!this.uploadAppName) {
                this.showDialog('uploadTxt', 'info', true, '应用名称不能为空');
                return false;
            }
            if (this.uploadType == 0 && !$('#uploadFileInput').val()) {
                this.showDialog('uploadTxt', 'info', true, '未选择上传txt文件');
                return false;
            }
            if (this.uploadType == 0) {
                var fileDom = $('#uploadFileInput').get(0);
                var fileName = fileDom.files[0].name;
                var fileType = fileName.split('.')[fileName.split('.').length - 1];
                if (fileType != 'txt') {
                    this.showDialog('uploadTxt', 'info', true, '文件格式错误');
                    return false;
                }
            }
            if (this.uploadType == 1 && !this.uploadApiDocs) {
                this.showDialog('uploadTxt', 'info', true, '未输入要上传的资源名称');
                return false;
            }
            return true;
        },
        uploadResource: function () {
            if(this.checkUploadData()){
                var _this = this;
                if(this.uploadType == 1){
                    var params = {};
                    params.appCode = this.uploadAppCode;
                    params.appName = this.uploadAppName;
                    params.apiDocs = this.uploadApiDocs;
                    $.post({
                        url: '/operationMgmt/resourceMgmt/resource/uploadResourceByInput.ajax',
                        data: params,
                        success: function (result) {
                            if (result.error === 0) {
                                _this.showDialog('uploadTxt', 'info', false, result.msg);
                            }
                            else {
                                _this.showDialog('uploadTxt', 'info', true, result.msg);
                            }
                        },
                        error: function () {
                            _this.showDialog('uploadTxt', 'info', true, '文本太大,请使用文件上传');
                        }
                    });
                }
                if(this.uploadType == 0){
                    var _this = this;
                    var params = {};
                    params.appCode = this.uploadAppCode;
                    params.appName = this.uploadAppName;
                    _this.showDialog('uploadTxt', '');
                    this.loadingShow = true;
                    $.ajaxFileUpload({
                        url: '/operationMgmt/resourceMgmt/resource/uploadResourceByFile.ajax',
                        type: 'POST',
                        data: params,
                        dataType: 'json',
                        fileElementId: 'uploadFileInput',
                        success: function (result) {
                            _this.loadingShow = false;
                            if (result.error === 0) {
                                _this.showDialog('', 'info', false, result.msg);
                            } else {
                                _this.showDialog('', 'info', true, result.msg);
                            }
                        }
                    });
                }
            }

        },
        showAdd: function () {
            this.isUpdate = false;
            this.updateId = '';
            this.setAddData({});
            this.showDialog('', 'add');
        },
        showUpdate: function (item) {
            this.isUpdate = true;
            this.updateId = item.id;
            this.setAddData(item);
            this.showDialog('', 'add');
        },
        showDelete: function () {
            var hasCheck = false;
            for (var i = 0; i < this.tableData.length; i++) {
                if (this.tableData[i].check) {
                    hasCheck = true;
                    break;
                }
            }
            if (!hasCheck) {
                this.showDialog('', 'info', false, '未选择任何资源');
                return;
            }
            this.showDialog('', 'del');
        },
        deleteData: function () {
            var _this = this;
            var ids = [];
            for (var i = 0; i < this.tableData.length; i++) {
                if (this.tableData[i].check) {
                    ids.push(this.tableData[i].id);
                }
            }
            $.post({
                url: '/operationMgmt/resourceMgmt/resource/delete.ajax',
                data: {ids: ids.join(',')},
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0);
                    }
                    _this.showDialog('del', 'info', false, result.msg);
                }
            });

        },
        diaInfoCheck: function () {
            if (!this.diaAppId) {
                this.showDialog('add', 'info', true, '未选择资源所属应用');
                return false;
            }
            if (typeof this.diaResourceType != 'number' && !this.diaResourceType) {
                this.showDialog('add', 'info', true, '资源类型不能为空');
                return false;
            }
            if (!this.diaResourceName) {
                this.showDialog('add', 'info', true, '资源名称不能为空');
                return false;
            }
            if (!this.diaMethod) {
                this.showDialog('add', 'info', true, '方法不能为空');
                return false;
            }
            if (typeof this.diaWildMatch != 'number' && !this.diaWildMatch) {
                this.showDialog('add', 'info', true, '模糊匹配不能为空');
                return false;
            }
            if (!this.diaDefaultUrl) {
                this.showDialog('add', 'info', true, '资源URL不能为空');
                return false;
            }
            return true;
        },
        add: function () {
            var _this = this;
            if (this.diaInfoCheck()) {
                var params = {};
                params.appId = this.diaAppId;
                params.defaultUrl = this.diaDefaultUrl;
                params.orderNum = this.diaOrderNum;
                params.parentId = this.diaParentId;
                params.permCode = this.diaPermCode;
                params.method = this.diaMethod;
                params.wildMatch = this.diaWildMatch;
                params.resourceName = this.diaResourceName;
                params.resourceType = Number(this.diaResourceType) + 1;
                this.isUpdate && (params.id = this.updateId);
                var url = this.isUpdate ? '/operationMgmt/resourceMgmt/resource/update.ajax' : '/operationMgmt/resourceMgmt/resource/add.ajax';
                $.post({
                    url: url,
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.getTableData(0);
                        }
                        _this.showDialog('add', 'info', false, result.msg);
                    }
                });
            }
        },
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