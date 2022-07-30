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
        upLoadStatus: true,
        userName: '',
        moduleName: '',
        moduleDesc: '',
        filePath: '',
        //查看修改
        redactStatus: true, //查看时编辑状态
        viewChange: {
            upLoadStatus: false,
            anew: false,
            id: '',
            moduleName: '',
            moduleDesc: '',
            filePath: '',
        },
        anew: false, //重新渲染file框
        addStatus:true,//防止连续点击
        queryName: '', //查询
        queryId: '',
        deleteinfo: {}
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
        }
    },
    methods: {
        getTableData: function (currentIndex) {
            var params = {};
            var _this = this;
            params.pageNo = currentIndex + 1;
            params.pageSize = this.pageMaxNum;
            $.post({
                url: '/marketingActive/activeTemplateMgmt/activeTemplate/getList.ajax',
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
            this.upLoadStatus = true;
            this.moduleName = '';
            this.moduleDesc = '';
            this.filePath = '';
            this.anew = true;
            this.showDialog('', 'addNotice', false);

        },
        add: function () {
            if (this.addStatus) {
                this.addStatus=false
                console.log(1111)
                if (!this.moduleName || !this.moduleDesc) {
                    this.showDialog('addNotice', 'info', true, '请填写新增数据');
                    return;
                }
                if (this.filePath == '') {
                    this.showDialog('addNotice', 'info', true, '请上传文件');
                    return;
                }
                var params = {
                    modifyBy: this.userName,
                    moduleName: this.moduleName,
                    moduleDesc: this.moduleDesc,
                    moduleDrlPath: this.filePath
                };
                console.log(params)
                var _this = this;
                $.post({
                    url: '/marketingActive/activeTemplateMgmt/activeTemplate/dataAdd.ajax',
                    data: params,
                    success: function (result) {
                        this.addStatus=true;
                        if (result.error === 0) {
                            _this.anew = false;
                            _this.showDialog('addNotice', 'info', false, result.msg);
                            _this.getTableData(0)
                            _this.ruleName = '';
                            _this.ruleTemplate = '';
                            console.log(result)
                        } else {
                            _this.showDialog('addNotice', 'info', false, result.msg);
                        }
                    }
                });
            }
        },
        deleteDialog: function (id) {
            this.deleteinfo.moduleId = id
            this.showDialog("", "deleteDialog")
        },
        deleteData: function () {
            var params = {
                moduleId: this.deleteinfo.moduleId,
                modifyBy: this.userName
            };
            console.log(params)
            var _this = this;
            $.post({
                url: '/marketingActive/activeTemplateMgmt/activeTemplate/dataDelete.ajax',
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
        showView: function (id, Name, Desc, Path) {
            this.viewChange.upLoadStatus = false;
            this.viewChange.id = id;
            this.viewChange.moduleName = Name;
            this.viewChange.moduleDesc = Desc;
            this.viewChange.filePath = Path;
            this.redactStatus = true; //查看时为不可编辑
            this.viewChange.anew = true;
            this.showDialog('', 'changeNotice', false)
        },
        changeData: function () {
            var params = {
                moduleId: this.viewChange.id,
                moduleName: this.viewChange.moduleName,
                moduleDesc: this.viewChange.moduleDesc,
                moduleDrlPath: this.viewChange.filePath,
                modifyBy: this.userName,
            };
            console.log(params)
            var _this = this;
            $.post({
                url: '/marketingActive/activeTemplateMgmt/activeTemplate/dataChange.ajax',
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
        select: function (item) {
            if (item == 'change') {
                document.getElementById("uploadFileInputCge").click();
            } else {
                document.getElementById("uploadFileInput").click();
            }

        },
        showFileName: function (event) {
            this.filePath = event.target.files[0].name
            this.viewChange.filePath = event.target.files[0].name
            console.log(111)
        },
        fileUpload: function (item) {
            var _this = this;
            var fileElementId;
            if (item == 'change') {
                fileElementId = 'uploadFileInputCge'
            } else {
                fileElementId = 'uploadFileInput'
            }
            console.log(fileElementId)
            $.ajaxFileUpload({
                url: '/marketingActive/activeTemplateMgmt/activeTemplate/upLoad.ajax',
                type: 'POST',
                dataType: 'json',
                secureuri: false,
                fileElementId: fileElementId,
                success: function (result) {
                    console.log(result)
                    if (result.error == 0) {
                        if (item == 'change') {
                            _this.viewChange.filePath = result.data
                            _this.viewChange.upLoadStatus = true;
                            _this.viewChange.anew = false;
                            _this.showDialog('changeNotice', 'info', true, '上传成功')
                        } else {
                            _this.filePath = result.data
                            _this.anew = false;
                            _this.upLoadStatus = false;
                            _this.showDialog('addNotice', 'info', true, '上传成功')
                        }
                    } else {
                        if (item == 'change') {
                            _this.showDialog('changeNotice', 'info', true, '上传失败')
                        } else {
                            _this.showDialog('addNotice', 'info', true, '上传失败')
                        }
                    }
                }
            });
        },
        windowGoTo: function (url, id) {
            window.location.href = '/marketingActive/activeTemplateMgmt/activeTemplate.html?pageType=' + url + '&moduleId=' + id
        },
        queryData: function () {
            var params = {};
            var _this = this;
            params.pageNo = 1;
            params.moduleId = this.queryId;
            params.moduleName = this.queryName;
            params.pageSize = this.pageMaxNum;
            $.post({
                url: '/marketingActive/activeTemplateMgmt/activeTemplate/getList.ajax',
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
        }
    }
});