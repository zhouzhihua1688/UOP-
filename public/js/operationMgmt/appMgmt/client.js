new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        searchField: '',
        isUpdate: false,
        tableData: [],
        diaMsg: '',
        // 新建弹窗相关数据
        diaClientId: '',
        diaResourceIds: '',
        diaClientSecret: '',
        diaScope: '',
        diaAuthorizedGrantTypes: '',
        diaWebServiceRedirectUri: '',
        diaAuthorities: '',
        diaAccessTokenValidity: '',
        diaRefreshTokenValidity: '',
        diaAutoapprove: '',
        diaTenantId: '',
        diaStatus: '',
        diaPurpose: '',
        diaAdditionalInformation: '',
        //查看客户端所有应用数据
        clientApp: [],
        //关联客户端应用数据
        relevantClientId: '',
        allAppList: [],
        selectedAppList: [],
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10
    },
    mounted: function () {
        var dialogs = ['info', 'del', 'relevantApp'];
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
            params.searchField = this.searchField;
            params.page = currentIndex + 1;
            params.rows = this.pageMaxNum;
            $.post({
                url: '/operationMgmt/appMgmt/client/getTableData.ajax',
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
            this.diaClientId = obj.clientId ? obj.clientId : '';
            this.diaResourceIds = obj.resourceIds ? obj.resourceIds : '';
            this.diaClientSecret = obj.clientSecret ? obj.clientSecret : '';
            this.diaScope = obj.scope ? obj.scope : '';
            this.diaAuthorizedGrantTypes = obj.authorizedGrantTypes ? obj.authorizedGrantTypes : '';
            this.diaWebServiceRedirectUri = obj.webServerRedirectUri ? obj.webServerRedirectUri : '';
            this.diaAuthorities = obj.authorities ? obj.authorities : '';
            this.diaAccessTokenValidity = obj.accessTokenValidity ? obj.accessTokenValidity : '';
            this.diaRefreshTokenValidity = obj.refreshTokenValidity ? obj.refreshTokenValidity : '';
            this.diaAutoapprove = obj.autoapprove ? obj.autoapprove : '';
            this.diaTenantId = obj.tenantId ? obj.tenantId : '';
            this.diaStatus = obj.status ? obj.status : '';
            this.diaPurpose = obj.purpose ? obj.purpose : '';
            this.diaAdditionalInformation = obj.additionalInformation ? obj.additionalInformation : '';
        },
        showAdd: function () {
            this.isUpdate = false;
            this.setAddData({});
            this.showDialog('', 'add');
        },
        showUpdate: function (item) {
            this.isUpdate = true;
            this.setAddData(item);
            this.showDialog('', 'add');
        },
        showDelete: function (clientId) {
            this.deleteId = clientId;
            this.showDialog('', 'del');
        },
        deleteUser: function () {
            var _this = this;
            $.post({
                url: '/operationMgmt/appMgmt/client/delete.ajax',
                data: {clientId: this.deleteId},
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0);
                    }
                    _this.showDialog('del', 'info', false, result.msg);
                }
            });

        },
        diaInfoCheck: function () {
            if (!this.diaClientId) {
                this.showDialog('add', 'info', true, '客户端编号不能为空');
                return false;
            }
            if (!this.diaClientSecret) {
                this.showDialog('add', 'info', true, '客户端密钥不能为空');
                return false;
            }
            if (!this.diaScope) {
                this.showDialog('add', 'info', true, '范围不能为空');
                return false;
            }
            if (!this.diaAuthorizedGrantTypes) {
                this.showDialog('add', 'info', true, '权限授予类型不能为空');
                return false;
            }
            if (!this.diaAuthorities) {
                this.showDialog('add', 'info', true, '权限不能为空');
                return false;
            }
            return true;
        },
        add: function () {
            var _this = this;
            if (this.diaInfoCheck()) {
                var params = {};
                params.clientId = this.diaClientId;
                params.resourceIds = this.diaResourceIds;
                params.clientSecret = this.diaClientSecret;
                params.scope = this.diaScope;
                params.authorizedGrantTypes = this.diaAuthorizedGrantTypes;
                params.webServiceRedirectUri = this.diaWebServiceRedirectUri;
                params.authorities = this.diaAuthorities;
                params.accessTokenValidity = this.diaAccessTokenValidity;
                params.refreshTokenValidity = this.diaRefreshTokenValidity;
                params.autoapprove = this.diaAutoapprove;
                params.tenantId = this.diaTenantId;
                params.status = this.diaStatus;
                params.purpose = this.diaPurpose;
                params.additionalInformation = this.diaAdditionalInformation;
                var url = this.isUpdate ? '/operationMgmt/appMgmt/client/update.ajax' : '/operationMgmt/appMgmt/client/add.ajax';
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
        checkApp: function (clientId) {
            var _this = this;
            $.post({
                url: '/operationMgmt/appMgmt/client/checkApp.ajax',
                data: {clientId: clientId},
                success: function (result) {
                    _this.clientApp = result.error === 0 ? result.data : [];
                    _this.showDialog('', 'checkApp');
                }
            });

        },
        relevantApp: function (clientId) {
            this.relevantClientId = clientId;
            var _this = this;
            $.post({
                url: '/operationMgmt/appMgmt/client/checkApp.ajax',
                data: {clientId: clientId},
                async: false,
                success: function (result) {
                    _this.selectedAppList = result.error === 0 ? result.data : [];
                }
            });
            this.showDialog('', 'relevantApp');
        },
        removeSelectedApp: function (index) {
            this.selectedAppList.splice(index, 1);
        },
        showAllApp: function () {
            var _this = this;
            if (this.allAppList.length === 0) {
                console.log(1);
                $.post({
                    url: '/operationMgmt/appMgmt/client/getAllApp.ajax',
                    async: false,
                    success: function (result) {
                        _this.allAppList = result.error === 0 ? result.data : [];
                    }
                });
            }
            this.allAppList.forEach(function (item) {
                item.check = false;
            });
            this.selectedAppList.forEach(function (item2) {
                _this.allAppList.forEach(function (item1) {
                    if (item1.id == item2.id) {
                        item1.check = true;
                    }
                });
            });
            this.showDialog('relevantApp', 'allAppList', true);
        },
        appAdd: function (item) {
            item.check = !item.check;
        },
        saveApp: function () {
            var _this = this;
            this.selectedAppList = [];
            this.allAppList.forEach(function (item) {
                if (item.check) {
                    _this.selectedAppList.push(item);
                }
            });
            this.showDialog('allAppList');
        },
        relevantClientApp: function () {
            var _this = this;
            var params = {};
            var appIds = [];
            this.selectedAppList.forEach(function (item) {
                appIds.push(item.id);
            });
            params.clientId = this.relevantClientId;
            params.appIds = JSON.stringify(appIds);
            $.post({
                url: '/operationMgmt/appMgmt/client/relevantClientApp.ajax',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        _this.showDialog('relevantApp', 'info', false, result.msg);
                    }
                    else {
                        _this.showDialog('relevantApp', 'info', true, result.msg);
                    }
                }
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