new Vue({
    el: '#content',
    data: {
        //主页面数据
        searchField: '',
        distributedUser: [],
        unDistributedUser: [],
        diaMsg: '',
        isUpdate: false,
        deleteId: [],
        //分配权限弹窗数据
        diaSearchUserId: '',
        diaSearchRoleName: '',
        AllRoleList: [],
        selectedUserList: [],
        selectedRoleList: [],
        //主表格分页数据
        currentIndex: 0,
        pageMaxNum: 10
    },
    watch: {
        pageMaxNum: function () {
            this.currentIndex = 0;
        },
        searchField: function () {
            this.currentIndex = 0;
        }
    },
    computed: {
        //主表格分页
        distributedUserMiddleData: function () {
            var middleData = [];
            var filterData = [];
            var pageMaxNum = parseInt(this.pageMaxNum);
            var _this = this;
            this.distributedUser.forEach(function (item) {
                if (item.userId.indexOf(_this.searchField) > -1 || item.userName.indexOf(_this.searchField) > -1) {
                    filterData.push(item);
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
        distributedUserViewData: function () {
            return this.distributedUserMiddleData[parseInt(this.currentIndex)];
        },
        checkAll: function () {
            if (this.distributedUserViewData.length == 0) {
                return false;
            }
            for (var i = 0; i < this.distributedUserViewData.length; i++) {
                if (!this.distributedUserViewData[i].check) {
                    return false;
                }
            }
            return true;
        },
        //选择用户过滤
        filterUserList: function () {
            var filterData = [];
            var _this = this;
            this.unDistributedUser.forEach(function (item) {
                if (item.userId.indexOf(_this.diaSearchUserId) > -1) {
                    filterData.push(item);
                }
            });
            return filterData;
        },
        //选择角色过滤
        filterRoleList: function () {
            var filterData = [];
            var _this = this;
            this.AllRoleList.forEach(function (item) {
                if (item.roleName.indexOf(_this.diaSearchRoleName) > -1) {
                    filterData.push(item);
                }
            });
            return filterData;
        }
    },
    mounted: function () {
        var _this = this;
        var dialogs = ['info', 'delete', 'checkRole', 'add', 'selectUser', 'selectRole'];
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
        var _this = this;
        $.post({
            url: '/operationMgmt/userMgmt/role/getUserInfo.ajax',
            success: function (result) {
                if (result.error === 0) {
                    _this.distributedUser = result.data.distributedUser;
                    _this.unDistributedUser = result.data.unDistributedUser;
                }
                else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });
    },
    methods: {
        getUserInfo: function () {
            var _this = this;
            $.post({
                url: '/operationMgmt/userMgmt/role/getUserInfo.ajax',
                async: false,
                success: function (result) {
                    if (result.error === 0) {
                        _this.distributedUser = result.data.distributedUser;
                        _this.unDistributedUser = result.data.unDistributedUser;
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        showDelete: function () {
            var userIds = [];
            this.distributedUserViewData.forEach(function (item) {
                if (item.check) {
                    userIds.push(item.id);
                }
            });
            if (userIds.length === 0) {
                this.showDialog('', 'info', false, '未勾选要删除的数据');
                return;
            }
            this.deleteId = userIds;
            this.showDialog('', 'delete');
        },
        deleteRole: function () {
            var _this = this;
            var params = {};
            params.userIds = JSON.stringify(this.deleteId);
            $.post({
                url: '/operationMgmt/userMgmt/role/deleteUserRole.ajax',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        _this.currentIndex = 0;
                        _this.getUserInfo();
                    }
                    _this.showDialog('delete', 'info', false, result.msg);
                }
            });
        },
        updateRole: function (item) {
            var _this = this;
            if (this.AllRoleList.length === 0) {
                $.post({
                    url: '/operationMgmt/userMgmt/role/getRoleInfo.ajax',
                    async: false,
                    success: function (result) {
                        if (result.data instanceof Array) {
                            _this.AllRoleList = result.data;
                        }
                    }
                });
            }
            this.isUpdate = true;
            this.selectedUserList = [];
            this.selectedUserList.push({
                id:item.id,
                userName:item.userName
            });
            this.selectedRoleList = [];
            item.roleList.forEach(function (roleInfo) {
                _this.selectedRoleList.push(roleInfo);
            });
            this.showDialog('','add');
        },
        showAdd: function () {
            this.isUpdate = false;
            this.selectedUserList = [];
            this.selectedRoleList = [];
            this.showDialog('', 'add');
        },
        showSelectUser: function () {
            var _this = this;
            this.selectedUserList.forEach(function (item) {
                var index = _this.inSelected(item, _this.unDistributedUser, 'userId');
                _this.unDistributedUser[index].check = true;
            });
            this.showDialog('add', 'selectUser', true);
        },
        showSelectRole: function () {
            var _this = this;
            if (this.AllRoleList.length === 0) {
                $.post({
                    url: '/operationMgmt/userMgmt/role/getRoleInfo.ajax',
                    async: false,
                    success: function (result) {
                        if (result.data instanceof Array) {
                            _this.AllRoleList = result.data;
                        }
                    }
                });
            }
            var _this = this;
            this.AllRoleList.forEach(function (item) {
                item.check = false;
            });
            this.selectedRoleList.forEach(function (item) {
                var index = _this.inSelected(item, _this.AllRoleList, 'id');
                _this.AllRoleList[index].check = true;
            });
            this.showDialog('add', 'selectRole', true);
        },
        distributeRole: function () {
            if (this.selectedUserList.length === 0) {
                this.showDialog('add', 'info', true, '未选择任何用户');
                return;
            }
            if (this.selectedRoleList.length === 0) {
                this.showDialog('add', 'info', true, '未选择任何角色');
                return;
            }
            var userIds = [];
            var roleIds = [];
            this.selectedUserList.forEach(function (item) {
                userIds.push(item.id);
            });
            this.selectedRoleList.forEach(function (item) {
                roleIds.push(item.id);
            });
            var params = {
                userIds: JSON.stringify(userIds),
                roleIds: JSON.stringify(roleIds)
            };
            var _this = this;
            $.post({
                url: '/operationMgmt/userMgmt/role/distributeRole.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getUserInfo();
                        _this.selectedUserList = [];
                        _this.selectedRoleList = [];
                        _this.AllRoleList.forEach(function (item) {
                            item.check = false;
                        });
                    }
                    _this.showDialog('add', 'info', false, result.msg);
                }
            });
        },
        //用户列表方法
        filterUserAdd: function (item) {
            item.check = !item.check;
        },
        saveSelectUser: function () {
            var _this = this;
            this.selectedUserList = [];
            this.unDistributedUser.forEach(function (item) {
                if (item.check) {
                    _this.selectedUserList.push(item);
                }
            });
            this.showDialog('selectUser');
            this.diaSearchUserId = '';
        },
        removeSelectedUser: function (item, index) {
            var _index = this.inSelected(item, this.unDistributedUser, 'userId');
            this.unDistributedUser[_index].check = false;
            this.selectedUserList.splice(index, 1);
        },
        //角色列表方法
        hideSelectRole: function () {
            this.showDialog('selectRole', 'add');
        },
        filterRoleAdd: function (item) {
            item.check = !item.check;
        },
        saveSelectRole: function () {
            var _this = this;
            this.selectedRoleList = [];
            this.AllRoleList.forEach(function (item) {
                if (item.check) {
                    _this.selectedRoleList.push(item);
                }
            });
            this.hideSelectRole();
            this.diaSearchRoleName = '';
        },
        checkRoleTree: function (item) {
            var _this = this;
            var menuList = item.menuList;
            $.post({
                url: '/operationMgmt/userMgmt/role/checkTree.ajax',
                data: {menuList: menuList},
                success: function (result) {
                    if (result.error === 0) {
                        $('#tree').treeview({
                            data: result.data,
                            color: "#428bca",
                            backColor: "#fff",
                            multiSelect: true
                        });
                        $('#selectRole').off();
                        _this.showDialog('selectRole', 'checkRole', true);
                    }
                    else {
                        $('#selectRole').off();
                        _this.showDialog('selectRole', 'info', false, result.msg);
                    }
                }
            });
        },
        removeSelectedRole: function (item, index) {
            var _index = this.inSelected(item, this.AllRoleList, 'id');
            this.AllRoleList[_index].check = false;
            this.selectedRoleList.splice(index, 1);
        },
        //分页方法
        prev: function () {
            this.currentIndex <= 0 ? 0 : this.currentIndex--;
        },
        next: function () {
            this.currentIndex >= this.distributedUserMiddleData.length - 1 ? this.distributedUserMiddleData.length - 1 : this.currentIndex++;
        },
        check: function (item) {
            item.check = !item.check;
        },
        allCheck: function () {
            var _this = this;
            var flag = this.checkAll;
            this.distributedUserViewData.forEach(function (item) {
                item.check = !flag;
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
    }
});