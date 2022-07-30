new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        clientId: '',
        updateId: '',
        deleteId: '',
        tableData: [],
        clientList: [],
        diaMsg: '',
        // 新建弹窗相关数据
        isUpdate: false,
        diaRoleName: '',
        diaAppId: '',
        appList: [],
        resourceIds: [],
        //主表格分页数据
        currentIndex: 0,
        pageMaxNum: 10
    },
    mounted: function () {
        var dialogs = ['info', 'del'];
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
        if (this.clientList.length == 0) {
            $.post({
                url: '/operationMgmt/roleMgmt/role/getAllClient.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        _this.clientList = result.data;
                        if (result.data.length > 0) {
                            _this.clientId = result.data[0];
                        }
                    }
                    else {
                        _this.clientList = [];
                    }
                }
            });
        }
        $('#searchTreeInput').on('change', function (event) {
            var newVal = event.target.value.trim();
            if (!newVal || newVal.indexOf('*') !== -1) {
                $('#tree').treeview('clearSearch');
                $('#tree').removeClass('hidden');
                $('#searchTree').addClass('hidden');
                return;
            }
            var selectTreeArr = $('#tree').treeview('search', [newVal, {
                ignoreCase: true,     // case insensitive
                exactMatch: false,    // like or equals
                revealResults: true,  // reveal matching nodes
            }]);
            $('#searchTree').treeview({
                data: _this.getSearchTreeNode(selectTreeArr),
                color: "#428bca",
                backColor: "#fff",
                multiSelect: true,
                showTags: true
            });
            $('#searchTree').treeview('search', [newVal, {
                ignoreCase: true,     // case insensitive
                exactMatch: false,    // like or equals
                revealResults: true,  // reveal matching nodes
            }]);
            _this.addSearchTreeEvent();
            $('#tree').addClass('hidden');
            $('#searchTree').removeClass('hidden');
        });
    },
    computed: {
        // 主表格分页
        middleData: function () {
            var middleData = [];
            var pageMaxNum = parseInt(this.pageMaxNum);
            var _this = this;
            if (this.tableData.length <= pageMaxNum) {
                middleData.push(this.tableData);
                return middleData;
            }
            else {
                var i = 0;
                while ((i + 1) * pageMaxNum < this.tableData.length) {
                    middleData.push(this.tableData.slice(i * pageMaxNum, (i + 1) * pageMaxNum));
                    i++;
                }
                middleData.push(this.tableData.slice(i * pageMaxNum, this.tableData.length));
                return middleData;
            }
        },
        viewData: function () {
            var currentIndex = parseInt(this.currentIndex);
            return this.middleData[currentIndex];
        }
    },
    watch: {
        diaAppId: function (newVal, oldVal) {
            if (!newVal) {
                return;
            }
            var _this = this;
            $.post({
                url: '/operationMgmt/roleMgmt/role/getResourceList.ajax',
                data: {
                    clientId: newVal,
                    resourceIds: JSON.stringify(this.resourceIds)
                },
                success: function (result) {
                    if (result.error === 0) {
                        $('#tree').treeview({
                            data: result.data.resourceList,
                            color: "#428bca",
                            backColor: "#fff",
                            multiSelect: true,
                            showTags: true
                        });
                        _this.addTreeEvent();
                        _this.appList = result.data.appList;
                    }
                    else {
                        _this.showDialog('add', 'info', false, result.msg);
                    }
                }
            });
        },
        clientId: function (newVal, oldVal) {
            if (!newVal) {
                return;
            }
            var _this = this;
            $.post({
                url: '/operationMgmt/roleMgmt/role/getRoleList.ajax',
                data: {clientId: newVal},
                success: function (result) {
                    if (result.error === 0) {
                        _this.tableData = result.data;
                    }
                    else {
                        _this.tableData = [];
                    }
                }
            });
        },
        pageMaxNum: function () {
            this.currentIndex = 0;
        }
    },
    methods: {
        search: function () {
            this.currentIndex = 0;
            var _this = this;
            $.post({
                url: '/operationMgmt/roleMgmt/role/getRoleList.ajax',
                data: {clientId: this.clientId},
                success: function (result) {
                    if (result.error === 0) {
                        _this.tableData = result.data;
                    }
                    else {
                        _this.tableData = [];
                    }
                }
            });
        },
        showCreate: function () {
            var _this = this;
            if (this.clientList.length == 0) {
                $.post({
                    url: '/operationMgmt/roleMgmt/role/getAllClient.ajax',
                    async: false,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.clientList = result.data;
                        }
                        else {
                            _this.clientList = [];
                        }
                    }
                });
            }
            this.isUpdate = false;
            this.updateId = '';
            this.diaRoleName = '';
            this.diaAppId = '';
            this.resourceIds = [];
            $('#tree').treeview({
                data: {},
                color: "#428bca",
                backColor: "#fff"
            });
            $('#searchTreeInput').val('');
            $('#tree').treeview('clearSearch');
            $('#tree').removeClass('hidden');
            $('#searchTree').addClass('hidden');
            this.showDialog('', 'add');
        },
        showUpdate: function (item) {
            var _this = this;
            if (this.clientList.length == 0) {
                $.post({
                    url: '/operationMgmt/roleMgmt/role/getAllClient.ajax',
                    async: false,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.clientList = result.data;
                        }
                        else {
                            _this.clientList = [];
                        }
                    }
                });
            }
            this.isUpdate = true;
            this.updateId = item.id;
            this.diaRoleName = item.roleName;
            $.post({
                url: '/operationMgmt/roleMgmt/role/getRoleResource.ajax',
                data: {roleId: this.updateId},
                async: false,
                success: function (result) {
                    if (result.error === 0) {
                        _this.resourceIds = result.data;
                    }
                    else {
                        _this.resourceIds = [];
                    }
                }
            });
            this.diaAppId = item.clientId;
            $.post({
                url: '/operationMgmt/roleMgmt/role/getResourceList.ajax',
                data: {
                    clientId: item.clientId,
                    resourceIds: JSON.stringify(this.resourceIds)
                },
                success: function (result) {
                    if (result.error === 0) {
                        $('#tree').treeview({
                            data: result.data.resourceList,
                            color: "#428bca",
                            backColor: "#fff",
                            multiSelect: true,
                            showTags: true
                        });
                        $('#searchTreeInput').val('');
                        $('#tree').treeview('clearSearch');
                        $('#tree').removeClass('hidden');
                        $('#searchTree').addClass('hidden');
                        _this.addTreeEvent();
                        _this.appList = result.data.appList;
                    }
                    else {
                        _this.showDialog('add', 'info', false, result.msg);
                    }
                }
            });
            this.showDialog('', 'add');
        },
        showDelete: function (id) {
            this.deleteId = id;
            this.showDialog('', 'del');
        },
        deleteRole: function () {
            var _this = this;
            $.post({
                url: '/operationMgmt/roleMgmt/role/del.ajax',
                data: {ids: this.deleteId},
                success: function (result) {
                    if (result.error === 0) {
                        $.post({
                            url: '/operationMgmt/roleMgmt/role/getRoleList.ajax',
                            data: {clientId: _this.clientId},
                            success: function (result) {
                                if (result.error === 0) {
                                    _this.tableData = result.data;
                                }
                                else {
                                    _this.tableData = [];
                                }
                            }
                        });
                        _this.showDialog('del', 'info', false, result.msg);
                    }
                    else {
                        _this.showDialog('del', 'info', true, result.msg);
                    }
                }
            });

        },
        formatMenuList: function (menuList) {
            var resourceIds = [];
            menuList.forEach(function (item) {
                if (item.menuId.toString().indexOf('-app') == -1) {
                    resourceIds.push(item.menuId);
                }
            });
            return resourceIds;
        },
        diaInfoCheck: function () {
            if (!this.diaRoleName) {
                this.showDialog('add', 'info', true, '角色名称不能为空');
                return false;
            }
            if (!this.diaAppId) {
                this.showDialog('add', 'info', true, '请选择角色所属客户端');
                return false;
            }
            var menuList = $('#tree').treeview('getSelected');
            if (this.formatMenuList(menuList).length === 0) {
                this.showDialog('add', 'info', true, '未选择有效资源URL');
                return false;
            }
            return true;
        },
        add: function () {
            var _this = this;
            if (this.diaInfoCheck()) {
                var params = {};
                params.roleName = this.diaRoleName;
                params.clientId = this.diaAppId;
                params.resourceIds = JSON.stringify(this.formatMenuList($('#tree').treeview('getSelected')));
                this.updateId && (params.id = this.updateId);
                var url = this.isUpdate ? '/operationMgmt/roleMgmt/role/update.ajax' : '/operationMgmt/roleMgmt/role/add.ajax';
                $.post({
                    url: url,
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.showDialog('add', 'info', false, result.msg);
                        }
                        else {
                            _this.showDialog('add', 'info', true, result.msg);
                        }
                    }
                });
            }
        },
        getSearchTreeNode: function (arr) {
            var selectTreeArr = JSON.parse(JSON.stringify(arr));
            var treeData = [];
            selectTreeArr.forEach(function (item) {
                if (!item.parentMenuId) {
                    item.nodes.forEach(function (item) {
                        item.originNodeId = item.nodeId;
                    });
                    item.state.expanded = true;
                    item.state.selected = false;
                    treeData.push(item);
                }
                else if (item.parentMenuId) {
                    var treeDataIds = treeData.map(function (item) {
                        return parseInt(item.menuId);
                    });
                    if (treeDataIds.indexOf(item.parentMenuId) === -1) {
                        item.originNodeId = item.nodeId;
                        treeData.push({
                            menuId: item.parentMenuId + '-app',
                            parentMenuId: '',
                            text: item.parentMenuName,
                            href: '',
                            nodes: [item],
                            selectable: true,
                            state: {
                                checked: false,
                                disabled: false,
                                expanded: true,
                                selected: false
                            }
                        });
                    }
                    else {
                        var index = treeDataIds.indexOf(item.parentMenuId);
                        var nodesId = treeData[index].nodes.map(function (item) {
                            return item.menuId
                        });
                        if (nodesId.indexOf(item.menuId) === -1) {
                            treeData[index].nodes.push({
                                menuId: item.menuId,
                                parentMenuId: item.parentMenuId,
                                originNodeId: item.nodeId,
                                text: item.text,
                                href: item.href,
                                selectable: true,
                                state: {
                                    checked: item.state.checked,
                                    disabled: item.state.disabled,
                                    expanded: item.state.expanded,
                                    selected: item.state.selected
                                }
                            });
                        }
                    }
                }
            });
            return treeData;
        },
        addSearchTreeEvent: function () {
            $('#searchTree').on('nodeSelected', function (event, data) {
                if (data.originNodeId || data.originNodeId == 0) {
                    $('#tree').treeview('selectNode', [data.originNodeId]);
                }
            });
            $('#searchTree').on('nodeUnselected', function (event, data) {
                if (data.originNodeId || data.originNodeId == 0) {
                    $('#tree').treeview('unselectNode', [data.originNodeId]);
                }
            });
        },
        addTreeEvent: function () {
            $('#tree').on('nodeSelected', function (event, data) {
                if (data.nodes) {
                    $('#tree').treeview('selectNode', [data.nodes.map(function (item) {
                        return item.nodeId
                    })]);
                }
            });
            $('#tree').on('nodeUnselected', function (event, data) {
                if (data.nodes) {
                    $('#tree').treeview('unselectNode', [data.nodes.map(function (item) {
                        return item.nodeId
                    })]);
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
            this.currentIndex <= 0 ? 0 : this.currentIndex--;
        },
        next: function () {
            this.currentIndex >= this.middleData.length - 1 ? this.middleData.length - 1 : this.currentIndex++;
        },
        changeIndex: function (index) {
            this.currentIndex = index - 1;
        },
    }
});