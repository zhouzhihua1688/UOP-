new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        // 规则编号
        id: '',
        userId:"",//用户ID
        distributedUser: [],
        unDistributedUser: [],
        diaMsg: '',
        tableTip: '数据获取中...',
        deleteId: [],
        //分配权限弹窗数据
        diaSearchUserId: '',
        diaSearchRoleName: '',
        AllRoleList: [],
        selectedUserList: [],
        selectedRoleList: [],

        // 本地数据库用户列表转换和查询用
        allUserList:[],
        // 保存弹窗产品
        saveproduct: "",

        remark: "",
        status: "",
        // 查询
        groupids:'',
        groupidList:"",
        isUpdate: false,
        //隐藏假分页节点元素
        showMysql: false,
        updateId: '',
        tableData: [],
        diaMsg: '',
        checkData: [],
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        pageMaxNum: 10,
        condition: '',

        currentIndex2: 0,
        // 全选
        allCheck: false,
        // 复核状态
        reviewStatus: "",
        // 数据库id
        mysqlId: "",
        // 数据类型(0:业务,1:Mysql数据库)
        type: "1",
        mysqlStatus: '',
        // mysql传产品值
        mysqlProduct: "",
        // 获取数据库产品所有ID
        arrId: [],
        oneId: '',
        operator: "",
        // 判断Mysql数据状态
        delete_flag: "",
        operate: '',
        // 自动获取规则编号Id
        ruleId: "",
        // type:1,
        modify:true,
        hide:true,
    },
    // 获取本地Mysql所有Id
    created: function () {
        // this.getlocalList()
        // this.getTableData(0,this.type);
        this.userName();
    },
    mounted: function () {
        var dialogs = ['info', 'del', 'del2','del3', 'add', "update", "revise", 'subMit', 'delAgain', 'selectUser', 'selectRole','checkRole',];
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
        // 时间插件
        $('.date-timepicker').datetimepicker({
            format: 'YYYY-MM-DD HH:mm:ss',//use this option to display seconds
            icons: {
                time: 'fa fa-clock-o',
                date: 'fa fa-calendar',
                up: 'fa fa-chevron-up',
                down: 'fa fa-chevron-down',
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-arrows ',
                clear: 'fa fa-trash',
                close: 'fa fa-times'
            }
        }).next().on(ace.click_event, function () {
            $(this).prev().focus();
        });
        var _this = this;
        $.post({
            url: '/authorityMgmt/allChannels/userAuthorityHandle/getUserInfo.ajax',
            success: function (result) {
                if (result.error === 0) {
                    _this.distributedUser = result.data.distributedUser;
                    _this.unDistributedUser = result.data.unDistributedUser;
                    _this.allUserList=result.data.bodyDate
                    _this.tableTip = '暂无数据';
                }
                else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });
        this.getTableData(0, this.type);
    },

    computed: {
        //主表格业务分页
        distributedUserMiddleData: function () {
            var middleData = [];
            var filterData = [];
            var pageMaxNum = parseInt(this.pageMaxNum);
            var _this = this;
            this.distributedUser.forEach(function (item) {
                if (item.userId.indexOf(_this.userId) > -1) {
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

        // 本地数据分页
        //主表格分页
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
            var currentIndex = parseInt(this.currentIndex2);
            return this.middleData[currentIndex];
        },
        pageList1: function () {
            var arr = [];
            if (this.middleData.length <= 2 * this.maxSpace) {
                for (var i = 0; i < this.middleData.length; i++) {
                    arr.push(i + 1);
                }
                return arr;
            }
            if (this.currentIndex2 > this.maxSpace && this.middleData.length - this.currentIndex2 > this.maxSpace) {
                for (var i = this.currentIndex2 - this.maxSpace; i < this.currentIndex2 + this.maxSpace; i++) {
                    arr.push(i + 1);
                }
            }
            else if (this.currentIndex2 <= this.maxSpace && this.middleData.length - this.currentIndex2 > this.maxSpace) {
                for (var i = 0; i < this.currentIndex2 + (2 * this.maxSpace - this.currentIndex2); i++) {
                    arr.push(i + 1);
                }
            }
            else if (this.currentIndex2 > this.maxSpace && this.middleData.length - this.currentIndex2 <= this.maxSpace) {
                var space = this.middleData.length - this.currentIndex2;
                for (var i = this.currentIndex2 - (2 * this.maxSpace - space); i < this.middleData.length; i++) {
                    arr.push(i + 1);
                }
            }
            else {
                for (var i = 0; i < this.middleData.length; i++) {
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
        },
    },
    // 假分页
    watch: {
        pageMaxNum: function () {
            this.currentIndex = 0;
            this.getTableData(0, this.type)
        },
        condition: function () {
            this.currentIndex = 0;
        }
    },
    methods: {
        // getUserInfo: function () {
        //     var _this = this;
        //     $.post({
        //         url: '/authorityMgmt/allChannels/userAuthorityHandle/getUserInfo.ajax',
        //         async: false,
        //         success: function (result) {
        //             if (result.error === 0) {
        //                 _this.distributedUser = result.data.distributedUser;
        //                 _this.unDistributedUser = result.data.unDistributedUser;
        //             }
        //             else {
        //                 _this.showDialog('', 'info', false, result.msg);
        //             }
        //         }
        //     });
        // },
        // 获取信息
        userName: function () {
            var _this = this;
            var operator;
            $.post({
                url: '/authorityMgmt/allChannels/userAuthorityHandle/userName.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        operator = result.data
                    }
                    _this.operator = operator
                }
            });
        },

        // 获取表格数据
        getTableData: function (currentIndex, type) {
            var _this = this;
            var params = {};
            //传过去的状态参数
            params.type = type;
            // 获取业务数据
            if (type == 0) {
                this.isUpdate = true;  //显示业务端分页
                this.showMysql = false//显示假分页
                this.currentIndex = 0;
                params.userId = this.userId;

                $.post({
                    url: ' /authorityMgmt/allChannels/userAuthorityHandle/DataUserInfo.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            this.pageMaxNum =1;
                            // console.log("***",result.data.tableData)
                            // _this.tableData = result.data.tableData.filter(function (item) {
                            //     return item.userId.indexOf(params.userId) > -1
                            // })
                            _this.distributedUser = result.data.distributedUser.filter(function (item) {
                                    return item.userId.indexOf(params.userId) > -1
                                });
                            _this.unDistributedUser = result.data.unDistributedUser;
                            console.log("业务数据：",_this.distributedUser)
                        }
                        else {
                            _this.tableData = [];
                            _this.showDialog('', 'info', false, result.msg);
                        }
                    }
                });
            }
            // 获取本地数据
            if (type == 1) {
                var _this = this;
                // 真假分页切换
                this.isUpdate = false;
                this.showMysql = true;
                this.currentIndex2 = 0;
                params.reviewStatus = this.reviewStatus; //复核状态
                params.userId =this.userId;
                console.log(params)
                $.post({
                    url: '/authorityMgmt/allChannels/userAuthorityHandle/DataUserInfo.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.tableData = result.data
                            console.log("result.data",result.data)
                        }
                        else {
                            _this.showDialog('', 'info', false, result.msg);

                        }
                    }
                });
            }
        },
        // 模拟点击
        select: function () {
            document.getElementById("type0").click();
        },
        select2: function () {
            document.getElementById("type1").click();
        },
        checkTree: function (item) {
            var _this = this;
            var menuList = [];
            item.roleList.forEach(function (item) {
                menuList = menuList.concat(JSON.parse(item.menuList));
            });
            $.post({
                url: '/authorityMgmt/allChannels/userAuthorityHandle/checkTree.ajax',
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
        // 修改业务数据
        updateRole: function (item) {
            var _this = this;
            if (this.AllRoleList.length === 0) {
                $.post({
                    url: '/authorityMgmt/allChannels/userAuthorityHandle/getRoleInfo.ajax',
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
            this.showDialog('','revise');
            this.hide=true
        },
        // 修改业务数据选择角色
        showSelectRole1: function () {
            var _this = this;
            if (this.AllRoleList.length === 0) {
                $.post({
                    url: '/authorityMgmt/allChannels/userAuthorityHandle/getRoleInfo.ajax',
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
            _this.showDialog('revise', 'selectRole', false);

        },
        checkAllRoleTree1: function () {
            var _this = this;
            var menuList = [];
            if (this.selectedRoleList.length !== 0) {
                this.selectedRoleList.forEach(function (item) {
                    menuList = menuList.concat(JSON.parse(item.menuList));
                });
            }
            $.post({
                url: '/authorityMgmt/allChannels/userAuthorityHandle/checkTree.ajax',
                data: {menuList: JSON.stringify(menuList)},
                success: function (result) {
                    if (result.error === 0) {
                        $('#tree').treeview({
                            data: result.data,
                            color: "#428bca",
                            backColor: "#fff",
                            multiSelect: true
                        });
                        _this.showDialog('revise', 'checkRole', true);
                    }
                    else {
                        _this.showDialog('revise', 'info', false, result.msg);
                    }
                }
            });
        },
        // 业务数据修改保存到本地
        distributeRole1: function () {
            var _this = this;
            if (this.selectedUserList.length === 0) {
                this.showDialog('revise', 'info', true, '未选择任何用户');
                return;
            }
            if (this.selectedRoleList.length === 0) {
                this.showDialog('revise', 'info', true, '未选择任何角色');
                return;
            }
            var userIds ="";
            var roleIds = [];
            this.selectedUserList.forEach(function (item) {
                userIds=parseInt(item.id);
            });
            this.selectedRoleList.forEach(function (item) {
                roleIds.push(item.id);
            });
            var params = {
                userIds: JSON.stringify(userIds),
                roleIds: JSON.stringify(roleIds),
                roleList:this.selectedRoleList,
                type:this.type,
                operator:this.operator
            };

            // var params = {};
            // params.type = this.type;//状态参数
            // params.operator = this.operator;
            console.log("params:",params)
            $.post({
                url:'/authorityMgmt/allChannels/userAuthorityHandle/serviceSave.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        // _this.getUserInfo();
                        // _this.selectedUserList = [];
                        // _this.selectedRoleList = [];
                        // _this.AllRoleList.forEach(function (item) {
                        //     item.check = false;
                        // });
                        _this.getTableData(0, params.type);
                    }
                    _this.showDialog('revise', 'info', false, result.msg);
                }
            });
        },


        // 删除业务数据保存到本地
        DeleteRole: function (item) {
            var _this = this;
            if (this.AllRoleList.length === 0) {
                $.post({
                    url: '/authorityMgmt/allChannels/userAuthorityHandle/getRoleInfo.ajax',
                    async: false,
                    success: function (result) {
                        if (result.data instanceof Array) {
                            _this.AllRoleList = result.data;
                            console.log("_this.AllRoleList",_this.AllRoleList)
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
            this.showDialog('','del');
        },
        distributeRole3: function () {
            if (this.selectedUserList.length === 0) {
                this.showDialog('del', 'info', true, '未选择任何用户');
                return;
            }
            if (this.selectedRoleList.length === 0) {
                this.showDialog('del', 'info', true, '未选择任何角色');
                return;
            }
            var userIds ="";
            var roleIds = [];
            this.selectedUserList.forEach(function (item) {
                userIds=item.id;
            });
            this.selectedRoleList.forEach(function (item) {
                roleIds.push(item.id);
            });
            var params = {
                userIds: JSON.stringify(userIds),
                roleIds: JSON.stringify(roleIds),
                roleList:this.selectedRoleList,
                type:this.type,
                operator:this.operator
            };

            // var params = {};
            // params.type = this.type;//状态参数
            // params.operator = this.operator;
            console.log("删除的数据",params)
            var _this = this;
            $.post({
                url:'/authorityMgmt/allChannels/userAuthorityHandle/deleteParam.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        // _this.getUserInfo();
                        // _this.selectedUserList = [];
                        // _this.selectedRoleList = [];
                        // _this.AllRoleList.forEach(function (item) {
                        //     item.check = false;
                        // });
                        _this.getTableData(0, params.type);
                    }
                    _this.showDialog('del', 'info', false, result.msg);
                }
            });
        },


        // 修改本地数据
        localUpdateRole: function (item) {
            var _this = this;
            if (this.AllRoleList.length === 0) {
                $.post({
                    url: '/authorityMgmt/allChannels/userAuthorityHandle/getRoleInfo.ajax',
                    async: false,
                    success: function (result) {
                        if (result.data instanceof Array) {
                            _this.AllRoleList = result.data;
                            console.log("_this.AllRoleList",_this.AllRoleList)
                        }
                    }
                });
            }
            this.mysqlId = item.mySQLId  //获取数据库表字段ID
            this.operate = item.operate
            // this.isUpdate = true;
            this.selectedUserList = [];
            this.selectedUserList.push({
                id:item.userId,
                name:item.userNameList
            });
            this.selectedRoleList = [];
            item.roleList.forEach(function (roleInfo) {
                _this.selectedRoleList.push(roleInfo);
            });
            this.showDialog('','update');
            this.modify=true;
        },
        // 修改本地数据选择角色
        showSelectRole2: function () {
            var _this = this;
            if (this.AllRoleList.length === 0) {
                $.post({
                    url: '/authorityMgmt/allChannels/userAuthorityHandle/getRoleInfo.ajax',
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
            this.showDialog('update', 'selectRole', true);
        },
        checkAllRoleTree2: function () {
            var _this = this;
            var menuList = [];
            if (this.selectedRoleList.length !== 0) {
                this.selectedRoleList.forEach(function (item) {
                    menuList = menuList.concat(JSON.parse(item.menuList));
                });
            }
            $.post({
                url: '/authorityMgmt/allChannels/userAuthorityHandle/checkTree.ajax',
                data: {menuList: JSON.stringify(menuList)},
                success: function (result) {
                    if (result.error === 0) {
                        $('#tree').treeview({
                            data: result.data,
                            color: "#428bca",
                            backColor: "#fff",
                            multiSelect: true
                        });
                        _this.showDialog('update', 'checkRole', true);
                    }
                    else {
                        _this.showDialog('update', 'info', false, result.msg);
                    }
                }
            });
        },
        // 本地数据修改保存
        distributeRole2: function () {
            if (this.selectedUserList.length === 0) {
                this.showDialog('update', 'info', true, '未选择任何用户');
                return;
            }
            if (this.selectedRoleList.length === 0) {
                this.showDialog('update', 'info', true, '未选择任何角色');
                return;
            }
            var userIds ="";
            var roleIds = [];
            this.selectedUserList.forEach(function (item) {
                userIds=parseInt(item.id);
            });
            this.selectedRoleList.forEach(function (item) {
                roleIds.push(parseInt(item.id));
            });
            var params = {
                userIds: JSON.stringify(userIds),
                roleIds: JSON.stringify(roleIds),
                roleList:this.selectedRoleList,
                mysqlId:this.mysqlId,
                type:this.type,
                operate:this.operate,
                operator:this.operator,
                updateTime:moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss"),
            };

            // var params = {};
            // params.type = this.type;//状态参数
            // params.operator = this.operator;
            console.log("修改本地的数据",params)
            var _this = this;
            $.post({
                url:'/authorityMgmt/allChannels/userAuthorityHandle/localRevise.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        // _this.getUserInfo();
                        // _this.selectedUserList = [];
                        // _this.selectedRoleList = [];
                        // _this.AllRoleList.forEach(function (item) {
                        //     item.check = false;
                        // });
                        _this.getTableData(0, params.type);
                    }
                    _this.showDialog('update', 'info', false, result.msg);
                }
            });
        },

        //本地数据撤销
        showRevoke: function (item) {
            var _this = this;
            if (this.AllRoleList.length === 0) {
                $.post({
                    url: '/authorityMgmt/allChannels/userAuthorityHandle/getRoleInfo.ajax',
                    async: false,
                    success: function (result) {
                        if (result.data instanceof Array) {
                            _this.AllRoleList = result.data;
                        }
                    }
                });
            }
            // this.isUpdate = true;
            this.mysqlId = item.mySQLId  //获取数据库表字段ID
            this.selectedUserList = [];
            this.selectedUserList.push({
                id:item.userId,
                name:item.userNameList
            });
            this.selectedRoleList = [];
            item.roleList.forEach(function (roleInfo) {
                _this.selectedRoleList.push(roleInfo);
            });
            this.showDialog('','del2');
        },
        distributeRole4: function () {
            if (this.selectedUserList.length === 0) {
                this.showDialog('del2', 'info', true, '未选择任何用户');
                return;
            }
            if (this.selectedRoleList.length === 0) {
                this.showDialog('del2', 'info', true, '未选择任何角色');
                return;
            }
            var userIds ="";
            var roleIds = [];
            this.selectedUserList.forEach(function (item) {
                userIds=item.id;
            });
            this.selectedRoleList.forEach(function (item) {
                roleIds.push(parseInt(item.id));
            });
            var params = {
                userIds: JSON.stringify(userIds),
                roleIds: JSON.stringify(roleIds),
                roleList:this.selectedRoleList,
                mysqlId:this.mysqlId,
                type:this.type,
                operator:this.operator
            };

            // var params = {};
            // params.type = this.type;//状态参数
            // params.operator = this.operator;
            console.log("本地撤销数据",params)
            var _this = this;
            $.post({
                url:'/authorityMgmt/allChannels/userAuthorityHandle/deleteLocal.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0, params.type);
                    }
                    _this.showDialog('del2', 'info', false, result.msg);
                }
            });
        },

        // 重新提交数据
        showSubmitAgain:function(item){
            var _this = this;
            if (this.AllRoleList.length === 0) {
                $.post({
                    url: '/authorityMgmt/allChannels/userAuthorityHandle/getRoleInfo.ajax',
                    async: false,
                    success: function (result) {
                        if (result.data instanceof Array) {
                            _this.AllRoleList = result.data;
                            console.log("_this.AllRoleList",_this.AllRoleList)
                        }
                    }
                });
            }
            this.mysqlId = item.mySQLId  //获取数据库表字段ID
            this.operate = item.operate
            // this.isUpdate = true;
            this.selectedUserList = [];
            this.selectedUserList.push({
                id:item.userId,
                name:item.userNameList
            });
            this.selectedRoleList = [];
            item.roleList.forEach(function (roleInfo) {
                _this.selectedRoleList.push(roleInfo);
            });
            console.log(this.operate)
            if (this.operate == 3) {
                this.showDialog('', 'del3');

            } else if ((this.operate != 3)) {
                this.showDialog('', 'update');
            }
        },
        distributeRole5: function () {
            if (this.selectedUserList.length === 0) {
                this.showDialog('del3', 'info', true, '未选择任何用户');
                return;
            }
            if (this.selectedRoleList.length === 0) {
                this.showDialog('del3', 'info', true, '未选择任何角色');
                return;
            }
            var userIds ="";
            var roleIds = [];
            this.selectedUserList.forEach(function (item) {
                userIds=parseInt(item.id);
            });
            this.selectedRoleList.forEach(function (item) {
                roleIds.push(parseInt(item.id));
            });
            var params = {
                userIds: JSON.stringify(userIds),
                roleIds: JSON.stringify(roleIds),
                roleList:this.selectedRoleList,
                mysqlId:this.mysqlId,
                type:this.type,
                operate:this.operate,
                operator:this.operator,
                updateTime:moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss"),
            };
            console.log("重新提交删除数据",params)
            var _this = this;
            $.post({
                url:'/authorityMgmt/allChannels/userAuthorityHandle/deleteAgain.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0, params.type);
                    }
                    _this.showDialog('del3', 'info', false, result.msg);
                }
            });
        },

        // 添加按钮弹窗
        showAdd: function () {
            var _this = this;
            this.id = "";
            this.isUpdate = false;
            this.selectedUserList = [];
            this.selectedRoleList = [];
            this.showDialog('', 'add');
            this.modify=false;
            this.hide=false;
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
                    url: '/authorityMgmt/allChannels/userAuthorityHandle/getRoleInfo.ajax',
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
                url: '/authorityMgmt/allChannels/userAuthorityHandle/checkTree.ajax',
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
                roleIds: JSON.stringify(roleIds),
                roleList:JSON.stringify(this.selectedRoleList),
                type:this.type,
                operator:this.operator
            };

            // var params = {};
            // params.type = this.type;//状态参数
            // params.operator = this.operator;
            console.log("保存的数据",params)
            var _this = this;
            $.post({
                // url: '/authorityMgmt/allChannels/userAuthorityHandle/distributeRole.ajax',
                url:'/authorityMgmt/allChannels/userAuthorityHandle/saveParam.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0, params.type);
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
            var _this = this;
            if(this.modify&&this.type==1){
                _this.showDialog('selectRole', 'update');
            }else if(this.modify&&this.type==0){
                _this.showDialog('selectRole', 'revise');
            }
            else{
                _this.showDialog('selectRole', 'add');
            }
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

        //公共方法
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

        // 单选
        // check: function (index) {
        //     index.check = !index.check;
        // },
        // // 用户全选
        // selectAll: function (allCheck) {
        //     var _this = this;
        //     //如果父级被选中，那么子集循环，全被给checked=true
        //     if (!allCheck) {
        //         _this.tableData.forEach(function (item) {
        //             item.check = true;
        //         });
        //     } else {
        //         //相反，如果没有被选中，子集应该全部checked=false
        //         _this.tableData.forEach(function (item) {
        //             item.check = false;
        //         });
        //     }
        // },

        //主表格分页方法
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

        prev1: function () {
            this.currentIndex2 <= 0 ? 0 : this.currentIndex2--;
        },
        next1: function () {
            this.currentIndex2 >= this.middleData.length - 1 ? this.middleData.length - 1 : this.currentIndex2++;
        },
        changeIndex1: function (index) {
            this.currentIndex2 = index - 1;
        },
        toFirst1: function () {
            this.currentIndex2 = 0;
        },
        toLast1: function () {
            this.currentIndex2 = this.middleData.length - 1;
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