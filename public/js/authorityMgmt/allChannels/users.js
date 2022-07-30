new Vue({
    el: '#content',
    data: {
        //主页面数据
        userId: '',
        distributedUser: [],
        unDistributedUser: [],
        diaMsg: '',
        tableTip: '数据获取中...',
        isUpdate: false,
        deleteId: [],
        //分配权限弹窗数据
        diaSearchUserId: '',
        diaSearchRoleName: '',
        AllRoleList: [],
        selectedUserList: [],
        selectedRoleList: [],
        roleId:'',     // 20220411--增加按照角色ID搜索的功能
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        pageMaxNum: 10
    },
    watch: {
        pageMaxNum: function (val, oldval) {
            this.currentIndex = 0;
        },
        name: function (val, oldval) {
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
                // 20220411原来的代码部分隐藏
                // if (item.userId.indexOf(_this.userId) > -1) {  
                //     filterData.push(item);
                // }
                // 20220411--增加按照角色ID搜索的功能
                if(_this.roleId&&_this.userId){
                    if (item.userId.indexOf(_this.userId) > -1 && item.roleId.includes(_this.roleId)) {
                        filterData.push(item);
                    }
                }else if(_this.roleId&&!_this.userId){
                    if (item.roleId.includes(_this.roleId)) {
                        filterData.push(item);
                    } 
                }else{
                    if(item.userId.indexOf(_this.userId) > -1){
                        filterData.push(item);
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
        distributedUserViewData: function () {
            return this.distributedUserMiddleData[parseInt(this.currentIndex)];
        },
        pageList: function () {
            var arr = [];
            if (this.distributedUserMiddleData.length <= 2 * this.maxSpace) {
                for (var i = 0; i < this.distributedUserMiddleData.length; i++) {
                    arr.push(i + 1);
                }
                return arr;
            }
            if (this.currentIndex > this.maxSpace && this.distributedUserMiddleData.length - this.currentIndex > this.maxSpace) {
                for (var i = this.currentIndex - this.maxSpace; i < this.currentIndex + this.maxSpace; i++) {
                    arr.push(i + 1);
                }
            }
            else if (this.currentIndex <= this.maxSpace && this.distributedUserMiddleData.length - this.currentIndex > this.maxSpace) {
                for (var i = 0; i < this.currentIndex + (2 * this.maxSpace - this.currentIndex); i++) {
                    arr.push(i + 1);
                }
            }
            else if (this.currentIndex > this.maxSpace && this.distributedUserMiddleData.length - this.currentIndex <= this.maxSpace) {
                var space = this.distributedUserMiddleData.length - this.currentIndex;
                for (var i = this.currentIndex - (2 * this.maxSpace - space); i < this.distributedUserMiddleData.length; i++) {
                    arr.push(i + 1);
                }
            }
            else {
                for (var i = 0; i < this.distributedUserMiddleData.length; i++) {
                    arr.push(i + 1);
                }
            }
            return arr;
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
                if (item.name.indexOf(_this.diaSearchRoleName) > -1) {
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
            url: '/authorityMgmt/allChannels/users/getUserInfo.ajax',
            success: function (result) {
                if (result.error === 0) {
                    // _this.distributedUser = result.data.distributedUser;
                    _this.unDistributedUser = result.data.unDistributedUser;
                    _this.tableTip = '暂无数据';
                    // 20220411--增加按照角色ID搜索的功能
                    _this.distributedUser = result.data.distributedUser.map(function(itemList,index){
                        itemList.roleId=[];
                        return itemList;
                    })
                    
                    for(var i=0;i< _this.distributedUser.length;i++){
                        for(var j=0;j< _this.distributedUser[i].roleList.length;j++){
                            _this.distributedUser[i].roleId.push( _this.distributedUser[i].roleList[j].id.toString());
                        }
                    }
                    console.log(_this.distributedUser);
                    var str = '';
                    result.data.distributedUser.forEach(function(itemList){
                        itemList.roleList.forEach(function(item) {
                            str += '<option value="' + item.id + '">' + item.id + '-' + item.name + '</option>';
                        });
                    })
                    var fundArr = ["roleListId"];
                    fundArr.forEach(function (value) {
                        $('#' + value).html('<option value=""></option>' + str);
                        $('#' + value).trigger('chosen:updated');
                    });

                }
                else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });


         // 查询
         var fundArr = ["roleListId"];
         fundArr.forEach(function (value) {
             $('#' + value).chosen({
                 search_contains:true,
                 no_results_text: '未找到相关基金信息',
                 disable_search_threshold:6,
                 width: '175px'
             });
         });
         $('#roleListId').on('change', function (e, params) {
             _this.roleId = params ? params.selected : '';
         });

    },
    methods: {
        getUserInfo: function () {
            var _this = this;
            $.post({
                url: '/authorityMgmt/allChannels/users/getUserInfo.ajax',
                async: false,
                success: function (result) {
                    if (result.error === 0) {
                        // _this.distributedUser = result.data.distributedUser;
                        _this.unDistributedUser = result.data.unDistributedUser;
                        // 20220411--增加按照角色ID搜索的功能
                        _this.distributedUser = result.data.distributedUser.map(function(itemList,index){
                            itemList.roleId=[];
                            return itemList;
                        })
                        
                        for(var i=0;i< _this.distributedUser.length;i++){
                            for(var j=0;j< _this.distributedUser[i].roleList.length;j++){
                                _this.distributedUser[i].roleId.push( _this.distributedUser[i].roleList[j].id.toString());
                            }
                        }
                        console.log(_this.distributedUser);
                        var str = '';
                        result.data.distributedUser.forEach(function(itemList){
                            itemList.roleList.forEach(function(item) {
                                str += '<option value="' + item.id + '">' + item.id + '-' + item.name + '</option>';
                            });
                        })
                        var fundArr = ["roleListId"];
                        fundArr.forEach(function (value) {
                            $('#' + value).html('<option value=""></option>' + str);
                            $('#' + value).trigger('chosen:updated');
                        });
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
                url: '/authorityMgmt/allChannels/users/deleteUserRole.ajax',
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
        checkTree: function (item) {
            var _this = this;
            var menuList = [];
            item.roleList.forEach(function (item) {
                menuList = menuList.concat(JSON.parse(item.menuList));
            });
            $.post({
                url: '/authorityMgmt/allChannels/users/checkTree.ajax',
                data: {menuList: JSON.stringify(menuList)},
                success: function (result) {
                    if (result.error === 0) {
                        $('#tree').treeview({
                            data: result.data,
                            color: "#428bca",
                            backColor: "#fff",
                            multiSelect: true
                        });
                        _this.showDialog('', 'checkRole');
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        updateRole: function (item) {
            var _this = this;
            if (this.AllRoleList.length === 0) {
                $.post({
                    url: '/authorityMgmt/allChannels/users/getRoleInfo.ajax',
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
                name:item.name
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
                    url: '/authorityMgmt/allChannels/users/getRoleInfo.ajax',
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
        checkAllRoleTree: function () {
            var _this = this;
            var menuList = [];
            if (this.selectedRoleList.length !== 0) {
                this.selectedRoleList.forEach(function (item) {
                    menuList = menuList.concat(JSON.parse(item.menuList));
                });
            }
            $.post({
                url: '/authorityMgmt/allChannels/users/checkTree.ajax',
                data: {menuList: JSON.stringify(menuList)},
                success: function (result) {
                    if (result.error === 0) {
                        $('#tree').treeview({
                            data: result.data,
                            color: "#428bca",
                            backColor: "#fff",
                            multiSelect: true
                        });
                        _this.showDialog('add', 'checkRole', true);
                    }
                    else {
                        _this.showDialog('add', 'info', false, result.msg);
                    }
                }
            });
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
                url: '/authorityMgmt/allChannels/users/distributeRole.ajax',
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
                url: '/authorityMgmt/allChannels/users/checkTree.ajax',
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
        changeIndex: function (index) {
            this.currentIndex = index - 1;
        },
        toFirst: function () {
            this.currentIndex = 0;
        },
        toLast: function () {
            this.currentIndex = this.distributedUserMiddleData.length - 1;
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