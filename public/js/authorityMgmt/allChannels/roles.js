new Vue({
    el: '#content',
    data: {
        //主表格数据
        roleName: '',
        tableData: [],
        diaMsg: '',
        updateId: '',
        updateChannel: '',
        deleteId: '',
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 4,
        pageMaxNum: 10,
        //新增弹窗相关数据
        diaRoleName: '',
        diaChannel: '',
        showChannel: true,
        channelList: [],
        diaReadOnly: false
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
        },
        pageList: function() {
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
            } else if (this.currentIndex <= this.maxSpace && this.middleData.length - this.currentIndex > this.maxSpace) {
                for (var i = 0; i < this.currentIndex + (2 * this.maxSpace - this.currentIndex); i++) {
                    arr.push(i + 1);
                }
            } else if (this.currentIndex > this.maxSpace && this.middleData.length - this.currentIndex <= this.maxSpace) {
                var space = this.middleData.length - this.currentIndex;
                for (var i = this.currentIndex - (2 * this.maxSpace - space); i < this.middleData.length; i++) {
                    arr.push(i + 1);
                }
            } else {
                for (var i = 0; i < this.middleData.length; i++) {
                    arr.push(i + 1);
                }
            }
            return arr;
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
            url: '/authorityMgmt/allChannels/roles/roleData.ajax',
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
        },
        diaChannel: function (val, oldval) {
            if (val) {
                var _this = this;
                $.post({
                    url: '/authorityMgmt/allChannels/roles/checkTree.ajax',
                    data: {channel: _this.diaChannel},
                    success: function (result) {
                        if (result.error === 0) {
                            $('#tree').treeview({
                                data: result.data,
                                color: "#428bca",
                                backColor: "#fff",
                                multiSelect: true
                            });
                            _this.addTreeEvent();
                        }
                        else {
                            _this.showDialog('role', 'info', false, result.msg);
                        }
                    }
                });
            }
        }
    },
    methods: {
        check: function (index) {
            var _this = this;
            var params = {
                menuList: JSON.stringify(this.viewData[index].menuList)
            };
            $.post({
                url: '/authorityMgmt/allChannels/roles/checkTree.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        $('#checkTree').treeview({
                            data: result.data,
                            color: "#428bca",
                            backColor: "#fff",
                            multiSelect: true
                        });
                        _this.diaReadOnly = _this.viewData[index].menuList.every(function(value){
                            return value.indexOf('@') > -1;
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
                url: '/authorityMgmt/allChannels/roles/deleteRole.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.deleteID = '';
                        $.post({
                            url: '/authorityMgmt/allChannels/roles/roleData.ajax',
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
            this.diaChannel = '';
            this.updateChannel = '';
            this.showChannel = true;
            this.diaReadOnly = false;
            this.updateId = '';
            $('#tree').treeview({
                data: {},
                color: "#428bca",
                backColor: "#fff"
            });
            if (this.channelList.length == 0) {
                $.post({
                    url: '/authorityMgmt/allChannels/roles/getChannels.ajax',
                    async: false,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.channelList = result.data;
                        }
                        else {
                            _this.showDialog('', 'info', false, result.msg);
                        }
                    }
                });
            }
            this.showDialog('', 'role');
        },
        showUpdate: function (index) {
            var _this = this;
            if (this.channelList.length == 0) {
                $.post({
                    url: '/authorityMgmt/allChannels/roles/getChannels.ajax',
                    async: false,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.channelList = result.data;
                        }
                        else {
                            _this.showDialog('', 'info', false, result.msg);
                        }
                    }
                });
            }
            this.updateId = this.viewData[index].id;
            this.updateChannel = this.viewData[index].channel;
            this.showChannel = false;
            this.diaReadOnly = this.viewData[index].menuList.every(function(value){
                return value.indexOf('@') > -1;
            });
            var params = {
                channel: this.viewData[index].channel,
                menuList: JSON.stringify(this.viewData[index].menuList)
            };
            $.post({
                url: '/authorityMgmt/allChannels/roles/checkTree.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        var arr = _this.viewData[index].name.split('|');
                        if(arr.length > 1){
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
            if (!this.diaChannel && !this.updateChannel) {
                this.showDialog('role', 'info', true, '角色所属频道不能为空');
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
            var _index = this.inSelected({channelId: this.updateChannel ? this.updateChannel : this.diaChannel}, this.channelList, 'channelId');
            var params = {
                name: this.channelList[_index].channelName + '|' + this.diaRoleName,
                channel: this.updateChannel ? this.updateChannel : this.diaChannel,
                menuList: JSON.stringify(menuList),
                readOnly: this.diaReadOnly
            };
            console.log(params);
            this.updateId && (params.id = this.updateId);
            $.post({
                url: '/authorityMgmt/allChannels/roles/saveRole.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        $.post({
                            url: '/authorityMgmt/allChannels/roles/roleData.ajax',
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
            if(arr.length === 0){
                return [];
            }
            var menuList = [];
            arr.forEach(function (item) {
                menuList.push(item.menuId);
            });
            var filterArr = menuList.join(',').match(/\d*-\d*-\d*/g);
            if(!filterArr){
                return [];
            }
            if(menuList.join(',').match(/\d*-\d*-\d*-\d*/g)){
                filterArr = filterArr.concat(menuList.join(',').match(/\d*-\d*-\d*-\d*/g));
            }
            var resultArr = [];
            for (var i = 0; i < filterArr.length; i++) {
                var arr = filterArr[i].split('-');
                var firstLevel = arr[0];
                var secondLevel = arr[0] + '-' + arr[1];
                if(arr.length === 4){
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
        //主表格假分页方法
        prev: function() {
            this.currentIndex <= 0 ? 0 : this.currentIndex--;
        },
        next: function() {
            this.currentIndex >= this.middleData.length - 1 ? this.middleData.length - 1 : this.currentIndex++;
        },
        changeIndex: function(index) {
            this.currentIndex = index - 1;
        },
        toFirst: function() {
            this.currentIndex = 0;
        },
        toLast: function() {
            this.currentIndex = this.middleData.length - 1;
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