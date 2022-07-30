new Vue({
    el: '#content',
    data: {
        //主表格数据
        roleName: '',
        tableData: [],
        diaMsg: '',
        updateId: '',
        deleteId: '',
        //主表格分页数据
        currentIndex: 0,
        pageMaxNum: 10,
        //新增弹窗相关数据
        diaRoleName: ''
    },
    computed: {
        //主表格分页
        middleData: function () {
            var middleData = [];
            var filterData = [];
            var pageMaxNum = parseInt(this.pageMaxNum);
            var _this = this;
            this.tableData.forEach(function (item) {
                if (item.name.indexOf(_this.roleName) > -1) {
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
        viewData: function () {
            return this.middleData[parseInt(this.currentIndex)];
        }
    },
    mounted: function () {
        var _this = this;
        var dialogs = ['info', 'delete'];
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
        $.post({
            url: '/authorityMgmt/messageCenter/roles/roleData.ajax',
            success: function (result) {
                if (result.error === 0) {
                    _this.tableData = result.data;
                }
                else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });
    },
    watch: {
        pageMaxNum: function (val, oldval) {
            this.currentIndex = 0;
        },
        roleName: function (val, oldval) {
            this.currentIndex = 0;
        }
    },
    methods: {
        check: function (index) {
            var _this = this;
            var params = {
                menuList: JSON.stringify(this.viewData[index].menuList)
            };
            $.post({
                url: '/authorityMgmt/messageCenter/roles/checkTree.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        $('#checkTree').treeview({
                            data: result.data,
                            color: "#428bca",
                            backColor: "#fff",
                            multiSelect: true
                        });
                        _this.showDialog('', 'check');
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        showDelete: function (index) {
            this.deleteID = this.viewData[index].id;
            this.showDialog('', 'delete');
        },
        deleteRole: function () {
            var params = {
                id: this.deleteID
            };
            var _this = this;
            $.post({
                url: '/authorityMgmt/messageCenter/roles/deleteRole.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.deleteID = '';
                        $.post({
                            url: '/authorityMgmt/messageCenter/roles/roleData.ajax',
                            success: function (result) {
                                if (result.error === 0) {
                                    _this.tableData = result.data;
                                }
                            }
                        });
                    }
                    _this.showDialog('delete', 'info', false, result.msg);
                }
            });
        },
        showAdd: function () {
            var _this = this;
            this.diaRoleName = '';
            this.updateId = '';
            $.post({
                url: '/authorityMgmt/messageCenter/roles/checkTree.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        $('#tree').treeview({
                            data: result.data,
                            color: "#428bca",
                            backColor: "#fff",
                            multiSelect: true
                        });
                        _this.addTreeEvent();
                        _this.showDialog('', 'role');
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        showUpdate: function (index) {
            var _this = this;
            this.updateId = this.viewData[index].id;
            var params = {
                menuList: JSON.stringify(this.viewData[index].menuList)
            };
            $.post({
                url: '/authorityMgmt/messageCenter/roles/checkTree.ajax',
                data: params,
                async: false,
                success: function (result) {
                    if (result.error === 0) {
                        var arr = _this.viewData[index].name.split('|');
                        if (arr.length > 1) {
                            arr.shift();
                        }
                        _this.diaRoleName = arr.join('|');
                        $('#tree').treeview({
                            data: result.data,
                            color: "#428bca",
                            backColor: "#fff",
                            multiSelect: true
                        });
                        _this.addTreeEvent();
                        _this.showDialog('', 'role');
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        saveRole: function () {
            var _this = this;
            if (!this.diaRoleName) {
                this.showDialog('role', 'info', true, '角色名称不能为空');
                return;
            }
            var menuList = $('#tree').treeview('getSelected');
            if (menuList.length == 0) {
                this.showDialog('role', 'info', true, '未选择任何页面');
                return;
            }
            menuList = this.formatMenuList(menuList);
            if (menuList.length == 0) {
                this.showDialog('role', 'info', true, '未选择任何有效页面');
                return;
            }
            var params = {
                name: '消息中心|' + this.diaRoleName,
                menuList: JSON.stringify(menuList)
            };
            this.updateId && (params.id = this.updateId);
            $.post({
                url: '/authorityMgmt/messageCenter/roles/saveRole.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        $.post({
                            url: '/authorityMgmt/messageCenter/roles/roleData.ajax',
                            success: function (result) {
                                if (result.error === 0) {
                                    _this.tableData = result.data;
                                }
                            }
                        });
                        _this.showDialog('role', 'info', false, result.msg);
                    }
                    else {
                        _this.showDialog('role', 'info', true, result.msg);
                    }
                }
            });
        },
        formatMenuList: function (arr) {
            if (arr.length === 0) {
                return [];
            }
            var menuList = [];
            arr.forEach(function (item) {
                menuList.push(item.menuId);
            });
            var filterArr = menuList.join(',').match(/\d*-\d*-\d*/g);
            if (!filterArr) {
                return [];
            }
            if (menuList.join(',').match(/\d*-\d*-\d*-\d*/g)) {
                filterArr = filterArr.concat(menuList.join(',').match(/\d*-\d*-\d*-\d*/g));
            }
            var resultArr = [];
            for (var i = 0; i < filterArr.length; i++) {
                var arr = filterArr[i].split('-');
                var firstLevel = arr[0];
                var secondLevel = arr[0] + '-' + arr[1];
                if (arr.length === 4) {
                    var thirdLevel = arr[0] + '-' + arr[1] + '-' + arr[2];
                }
                if (resultArr.indexOf(firstLevel) === -1) {
                    resultArr.push(firstLevel);
                }
                if (resultArr.indexOf(secondLevel) === -1) {
                    resultArr.push(secondLevel);
                }
                if (arr.length === 4 && resultArr.indexOf(thirdLevel) === -1) {
                    resultArr.push(secondLevel);
                }
                resultArr.push(filterArr[i]);
            }
            return resultArr;
        },
        //公共方法
        prev: function () {
            this.currentIndex <= 0 ? 0 : this.currentIndex--;
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
        next: function () {
            this.currentIndex >= this.middleData.length - 1 ? this.middleData.length - 1 : this.currentIndex++;
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
        }
    }
});