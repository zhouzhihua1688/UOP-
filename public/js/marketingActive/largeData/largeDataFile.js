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
        // 新增
        // upLoadStatus: true,
        userName: '',
        groupId: '',
        actId: '',
        usedFor: 1,
        readDataTo: 1,
        filePath: '',
        dataFields: '',
        fileDesc: '',
        fileReadWays: '',
        repeatReadFlag: '1',
        moduleComponentId: '',
        validateFilePath:'',
        isEnable: '1',
        //查看修改
        redactStatus: true, //查看时编辑状态
        viewChange: {
            // upLoadStatus: false,
            // anew: false,
            repeatReadFlag: '',
            isEnable: '',
            readConfigId: '',
            filePath: '',
            groupId: '',
            actId: '',
            usedFor: '',
            readDataTo: '',
            dataFields: '',
            fileDesc: '',
            fileReadWays: '',
            validateFilePath:'',
            componentAll:'',
            moduleComponentId:''
        },
        // anew: false, //重新渲染file框

        queryActId: '', //查询
        deleteinfo: {},
        componentAll: '',
        activeAll: [],
    },
    created: function () {
        var _this = this;
        $.post({
            url: '/marketingActive/largeData/largeDataFile/activeAll.ajax',
            success: function (result) {
                if (result.error === 0) {
                    _this.activeAll = result.data;
                    console.log(result)
                } else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });

    },
    mounted: function () {
        var dialogs = ['info', 'addNotice', 'changeNotice', 'deleteDialog'];
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
        },
        actId: function (newval, oldval) {
            var _this=this;
            $.post({
                url: '/marketingActive/largeData/largeDataFile/componentAll.ajax',
                data: {
                    actId: newval
                },
                success: function (result) {
                    if (result.error === 0) {
                        _this.componentAll = result.data;
                    } else {
                        _this.componentAll = ''
                        _this.showDialog('addNotice', 'info', true, '组件获取失败');
                    }
                }
            });
        },
        'viewChange.actId': function (newval, oldval) {
            var _this=this;
            $.post({
                url: '/marketingActive/largeData/largeDataFile/componentAll.ajax',
                data: {
                    actId: newval
                },
                success: function (result) {
                    if (result.error === 0) {
                        _this.viewChange.componentAll = result.data;
                    } else {
                        _this.viewChange.componentAll = ''
                        _this.showDialog('changeNotice', 'info', true, '组件获取失败');
                    }
                }
            });
        }
    },
    methods: {
        getTableData: function (currentIndex) {
            var params = {};
            var _this = this;
            params.pageNo = currentIndex + 1;
            params.pageSize = this.pageMaxNum;
            $.post({
                url: '/marketingActive/largeData/largeDataFile/getList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.tableData = result.data.rows;
                        _this.currentIndex = result.data.pageNum - 1;
                        _this.totalPage = result.data.pages;
                        _this.userName = result.data.userName;
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
            // this.upLoadStatus = true;
            this.moduleName = '';
            this.moduleDesc = '';
            this.filePath = '';
            // this.anew = true;
            this.showDialog('', 'addNotice', false);

        },
        add: function () {
            if (!this.fileReadWays || !this.fileDesc || !this.validateFilePath || !this.filePath) {
                this.showDialog('addNotice', 'info', true, '请填写必填项');
                return;
            }

            var params = {
                modifyBy: this.userName,
                actId: this.actId,
                groupId: this.groupId,
                usedFor: this.usedFor,
                readDataTo: this.readDataTo,
                dataFields: this.dataFields,
                fileDesc: this.fileDesc,
                fileReadWays: this.fileReadWays,
                filePath: this.filePath,
                validateFilePath: this.validateFilePath,
                repeatReadFlag: this.repeatReadFlag,
                isEnable: this.isEnable,
                moduleComponentId: this.moduleComponentId,
            };
            console.log(params)
            var _this = this;
            $.post({
                url: '/marketingActive/largeData/largeDataFile/dataAdd.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        // _this.anew = false;
                        _this.getTableData(0)
                        _this.actId = '';
                        _this.groupId = '';
                        _this.usedFor = 1;
                        _this.readDataTo = 1;
                        _this.dataFields = '';
                        _this.fileDesc = '';
                        _this.fileReadWays = '';
                        _this.filePath = '';
                        _this.moduleComponentId = '';
                        _this.repeatReadFlag = '1',
                            _this.isEnable = '1',
                            _this.showDialog('addNotice', 'info', false, result.msg);
                        console.log(result)
                    } else {
                        _this.showDialog('addNotice', 'info', false, result.msg);
                    }
                }
            });
        },
        deleteDialog: function (id) {
            this.deleteinfo.id = id
            this.showDialog("", "deleteDialog")
        },
        deleteData: function (id) {
            var params = {
                readConfigId: this.deleteinfo.id,
                modifyBy: this.userName,
                deleteFlag: 1
            };
            console.log(params)
            var _this = this;
            $.post({
                url: '/marketingActive/largeData/largeDataFile/dataDelete.ajax',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        _this.showDialog('deleteDialog', 'info', false, '删除成功');
                        _this.getTableData(0)
                        console.log(result)
                    } else {
                        _this.showDialog('deleteDialog', 'info', false, '删除失败');
                    }
                }
            });
        },
        queryData: function () {
            var params = {};
            var _this = this;
            params.pageNo = 1;
            params.actId = this.queryActId;
            params.pageSize = this.pageMaxNum;
            $.post({
                url: '/marketingActive/largeData/largeDataFile/getList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.tableData = result.data.rows;
                        _this.currentIndex = result.data.pageNum - 1;
                        _this.totalPage = result.data.pages;
                        _this.userName = result.data.userName;
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
        showView: function (id) {
            this.viewChange.readConfigId = id;
            var params = {
                readConfigId: id
            };
            console.log(params)
            var _this = this;
            $.post({
                url: '/marketingActive/largeData/largeDataFile/dataQueryId.ajax',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        _this.viewChange.filePath = result.data.filePath;
                        _this.viewChange.groupId = result.data.groupId;
                        _this.viewChange.actId = result.data.actId;
                        _this.viewChange.usedFor = result.data.usedFor;
                        _this.viewChange.readDataTo = result.data.readDataTo;
                        _this.viewChange.dataFields = result.data.dataFields;
                        _this.viewChange.fileDesc = result.data.fileDesc;
                        _this.viewChange.fileReadWays = result.data.fileReadWays;
                        _this.viewChange.repeatReadFlag = result.data.repeatReadFlag,
                        _this.viewChange.validateFilePath = result.data.validateFilePath,
                        _this.viewChange.moduleComponentId = result.data.moduleComponentId,
                            _this.viewChange.isEnable = result.data.isEnable,
                            console.log(result)
                        // _this.viewChange.upLoadStatus = false;
                        _this.redactStatus = true; //查看时为不可编辑
                        // _this.viewChange.anew = true;
                        _this.showDialog('', 'changeNotice', false)
                    } else {
                        _this.showDialog('', 'info', false, '加载失败');
                    }
                }
            });

        },
        changeData: function () {
            var params = {
                readConfigId: this.viewChange.readConfigId,
                filePath: this.viewChange.filePath,
                groupId: this.viewChange.groupId,
                actId: this.viewChange.actId,
                usedFor: this.viewChange.usedFor,
                readDataTo: this.viewChange.readDataTo,
                dataFields: this.viewChange.dataFields,
                fileDesc: this.viewChange.fileDesc,
                fileReadWays: this.viewChange.fileReadWays,
                modifyBy: this.userName,
                validateFilePath: this.viewChange.validateFilePath,
                repeatReadFlag: this.viewChange.repeatReadFlag,
                isEnable: this.viewChange.isEnable,
                moduleComponentId: this.viewChange.moduleComponentId,
            };
            console.log(params)
            var _this = this;
            $.post({
                url: '/marketingActive/largeData/largeDataFile/dataChange.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('changeNotice', 'info', false, '修改成功');
                        _this.redactStatus = true; //查看时为不可编辑
                        _this.getTableData(0)
                        console.log(result)
                    } else {
                        _this.showDialog('changeNotice', 'info', false, '修改失败');
                        _this.redactStatus = true; //查看时为不可编辑
                    }
                }
            });
        },
        // select: function (item) {
        //     if (item == 'change') {
        //         document.getElementById("uploadFileInputCge").click();
        //     } else {
        //         document.getElementById("uploadFileInput").click();
        //     }

        // },
        // showFileName: function (event) {
        //     this.filePath = event.target.files[0].name
        //     this.viewChange.filePath = event.target.files[0].name
        //     console.log(111)
        // },
        // fileUpload: function (item) {
        //     var _this = this;
        //     var fileElementId;
        //     if (item == 'change') {
        //         fileElementId = 'uploadFileInputCge'
        //     } else {
        //         fileElementId = 'uploadFileInput'
        //     }
        //     console.log(fileElementId)
        //     $.ajaxFileUpload({
        //         url: '/marketingActive/largeData/largeDataFile/upLoad.ajax',
        //         type: 'POST',
        //         dataType: 'json',
        //         secureuri: false,
        //         fileElementId: fileElementId,
        //         success: function (result) {
        //             console.log(result)
        //             if (result.error == 0) {
        //                 if (item == 'change') {
        //                     _this.viewChange.filePath = result.data
        //                     _this.viewChange.upLoadStatus = true;
        //                     _this.viewChange.anew = false;
        //                     _this.showDialog('changeNotice', 'info', true, '上传成功')
        //                 } else {
        //                     _this.filePath = result.data
        //                     _this.anew = false;
        //                     _this.upLoadStatus = false;
        //                     _this.showDialog('addNotice', 'info', true, '上传成功')
        //                 }
        //             } else {
        //                 if (item == 'change') {
        //                     _this.showDialog('changeNotice', 'info', true, '上传失败')
        //                 } else {
        //                     _this.showDialog('addNotice', 'info', true, '上传失败')
        //                 }
        //             }
        //         }
        //     });
        // },

        dataStart: function (actId, readConfigId, isEnable) {
            var enable;
            if (isEnable == 0) {
                enable = 1
            } else {
                enable = 0
            }
            var params = {
                actId: actId,
                readConfigId: readConfigId,
                modifyBy: this.userName,
                isEnable: enable
            };
            var _this = this;
            $.post({
                url: '/marketingActive/largeData/largeDataFile/dataStart.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0)
                        _this.showDialog('', 'info', false, result.msg);
                        console.log(result)
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },

    },
    components: {
        vueSelect: vueSelect
    },

});