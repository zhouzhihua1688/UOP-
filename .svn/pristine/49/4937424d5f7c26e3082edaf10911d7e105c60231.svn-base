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
        actId: '',
        shareNo: '',
        fileDesc: '',
        filePath: '',
        status: false,

        fileInput: '',
        //查看修改
        redactStatus: true, //查看时编辑状态
        activeAll: [],
        shareNoList: [],
        viewChange: {
            upLoadStatus: false,
            anew: false,
            id: '',
            actId: '',
            shareNo: '',
            fileDesc: '',
            filePath: '',
            settings: ''
        },
        anew: false, //重新渲染file框

        queryActId: '', //查询
        queryFileName: '', //查询
        queryFileDesc: '', //查询

        deleteinfo: {},
        id: '',
        settings: '1'
    },
    created: function () {
        var _this = this;

        $.post({
            url: '/marketingActive/activeRun/activeSettingTemplatePage/activeAll.ajax',
            success: function (result) {
                if (result.error === 0) {
                    _this.activeAll = result.data;
                } else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });
        $.post({
            url: '/marketingActive/activeRun/activeSettingTemplatePage/shareNo.ajax',
            success: function (result) {
                if (result.error === 0) {
                    _this.shareNoList = result.data;
                } else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });


    },
    mounted: function () {
        var dialogs = ['info', 'addNotice', 'changeNotice', 'deleteDialog', 'checkFiles'];
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
        
        var fileName = this.getUrlParam('fileName');
        if(fileName != ''){
            this.queryFileName = fileName;
        }
        this.getTableData(0);

        var actId = this.getUrlParam('actId');
        if (actId != '') {
            _this.status = true;
            // this.settings =1;
            this.actId = actId;
            this.anew = true;
            this.showDialog('', 'addNotice', false);
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
        settings: function () {
            document.getElementById('uploadFileInput').value = '';
            this.fileDesc = '';
            this.filePath = '';
            this.id = '';
            this.actId = '';
            this.shareNo = '';
        },
        shareNo: function () {
            document.getElementById('uploadFileInput').value = '';
            this.fileDesc = '';
            this.filePath = '';
            this.id = '';
            this.actId = '';
        },
        actId: function (newval, oldval) {
            var _this = this;
            _this.anew = true;
            _this.upLoadStatus = true;
            if (newval != '') {
                $.post({
                    url: '/marketingActive/activeRun/activeSettingTemplatePage/activeQuery.ajax',
                    data: {
                        actId: newval
                    },
                    success: function (result) {
                        if (result.error === 0) {
                            if (result.data) {
                                _this.fileDesc = result.data.fileDesc;
                                _this.filePath = result.data.filePath;
                                _this.id = result.data.id;
                                console.log(result.data)
                            } else {
                                _this.id = '';
                                _this.fileDesc = '';
                                _this.filePath = '';
                            }
                        } else {
                            _this.showDialog('', 'info', false, result.msg);
                        }
                    }
                });
            } else {
                _this.id = '';
                _this.fileDesc = '';
                _this.filePath = '';
                document.getElementById('uploadFileInput').value = ''
            }
        }
    },
    methods: {
        getUrlParam: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg); //匹配目标参数
            if (r != null) return unescape(r[2]);
            return ''; //返回参数值
        },
        getTableData: function (currentIndex) {
            var params = {};
            var _this = this;
            params.actId = this.queryActId;
            params.fileName = this.queryFileName;
            params.fileDesc = this.queryFileDesc;
            params.pageNo = currentIndex + 1;
            params.pageSize = this.pageMaxNum;
            $.post({
                url: '/marketingActive/activeRun/activeSettingTemplatePage/getList.ajax',
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
            this.actId = '';
            this.fileDesc = '';
            this.filePath = '';
            this.anew = true;
            this.status = false;
            this.showDialog('', 'addNotice', false);

        },
        add: function () {
            // if (!this.actId || !this.fileDesc) {
            //     this.showDialog('addNotice', 'info', true, '请填写新增数据');
            //     return;
            // }
            if (this.settings == '') {
                this.showDialog('addNotice', 'info', true, '请选择关联配置');
                return;
            }
            if (this.settings == '1' && this.actId == '') {
                this.showDialog('addNotice', 'info', true, '请选择活动ID');
                return;
            }
            if (this.settings == '2' && this.shareNo == '') {
                this.showDialog('addNotice', 'info', true, '请选择分享配置');
                return;
            }
            if (this.filePath == '') {
                this.showDialog('addNotice', 'info', true, '请上传文件');
                return;
            }
            var params = {
                modifyBy: this.userName,
                // actId: this.actId,
                fileDesc: this.fileDesc,
                filePath: this.filePath,
                coverFlag: '1',
            };
            this.settings == '1' ? params.actId = this.actId : params.shareNo = this.shareNo;
            this.id ? params.id = this.id : '';
            // if (this.id != '') {
            //     params.id = this.id
            // }
            console.log(params)
            var _this = this;
            $.post({
                url: '/marketingActive/activeRun/activeSettingTemplatePage/dataAdd.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.anew = false;
                        // _this.settings = '';
                        _this.fileDesc = '';
                        _this.actId = '';
                        _this.shareNo = '';
                        _this.filePath = '';
                        _this.showDialog('addNotice', 'info', false, result.msg);
                        _this.getTableData(0)
                        console.log(result)
                    } else {
                        _this.showDialog('addNotice', 'info', true, result.msg);
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
                id: this.deleteinfo.id,
                modifyBy: this.userName
            };
            console.log(params)
            var _this = this;
            $.post({
                url: '/marketingActive/activeRun/activeSettingTemplatePage/dataDelete.ajax',
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
        showView: function (id) {
            this.viewChange.id = id;
            var params = {
                id: id
            };
            console.log(params)
            var _this = this;
            $.post({
                url: '/marketingActive/activeRun/activeSettingTemplatePage/dataQuery.ajax',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        _this.viewChange.actId = result.data.actId
                        _this.viewChange.shareNo = result.data.shareNo
                        _this.viewChange.fileDesc = result.data.fileDesc
                        _this.viewChange.filePath = result.data.filePath
                        console.log(result)
                        if (result.data.actId) {
                            _this.viewChange.settings = 1;
                        } else if (result.data.shareNo) {
                            _this.viewChange.settings = 2;
                        } else {
                            _this.viewChange.settings = '';
                        }
                        _this.viewChange.upLoadStatus = false;
                        _this.redactStatus = true; //查看时为不可编辑
                        _this.viewChange.anew = true;
                        _this.showDialog('', 'changeNotice', false)
                    } else {
                        _this.showDialog('', 'info', false, '加载失败');
                    }
                }
            });

        },
        changeData: function () {
            if (this.viewChange.settings == '') {
                this.showDialog('changeNotice', 'info', true, '请选择关联配置');
                return;
            }
            if (this.viewChange.settings == '1' && !this.viewChange.actId) {
                this.showDialog('changeNotice', 'info', true, '请选择活动ID');
                return;
            }
            if (this.viewChange.settings == '2' && !this.viewChange.shareNo) {
                this.showDialog('changeNotice', 'info', true, '请选择分享配置');
                return;
            }
            var params = {
                id: this.viewChange.id,
                // actId: this.viewChange.actId,
                fileDesc: this.viewChange.fileDesc,
                filePath: this.viewChange.filePath,
                modifyBy: this.userName,
                coverFlag: '1'

            };
            this.viewChange.settings == '1' ? params.actId = this.viewChange.actId : params.shareNo = this.viewChange.shareNo;

            console.log(params)
            var _this = this;
            $.post({
                url: '/marketingActive/activeRun/activeSettingTemplatePage/dataChange.ajax',
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

            // if (this.actId == '' && item != 'change') {
            //     this.showDialog('addNotice', 'info', true, '请选择活动ID')
            //     return;
            // }
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
            var formData = new FormData();

            // HTML 文件类型input，由用户选择
            formData.append("file", document.getElementById(fileElementId).files[0]);
            $.ajax({
                url: "/marketingActive/activeRun/activeSettingTemplatePage/upLoad.ajax",
                type: "POST",
                data: formData,
                processData: false, // 不处理数据
                contentType: false, // 不设置内容类型
                success: function (result) {
                    console.log(result)
                    if (result.error == 0) {
                        console.log('this', _this)

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
        checkFile: function (item) {
            var _this = this;
            var fileElementId;
            if (item == 'change') {
                fileElementId = 'uploadFileInputCge'
            } else {
                fileElementId = 'uploadFileInput'
            }
            console.log(fileElementId)
            var formData = new FormData();
            // HTML 文件类型input，由用户选择
            formData.append("file", document.getElementById(fileElementId).files[0]);

            $.ajax({
                url: "/marketingActive/activeRun/activeSettingTemplatePage/checkFile.ajax",
                type: "POST",
                data: formData,
                processData: false, // 不处理数据
                contentType: false, // 不设置内容类型
                success: function (result) {
                    console.log(result)
                    if (result.error == 0) {
                        if (item == 'change') {
                            _this.fileUpload('change')
                        } else {
                            _this.fileUpload()
                        }
                    } else {
                        if (item == 'change') {
                            _this.fileInput = 'change'
                            if (result.msg == '上传失败') {
                                _this.showDialog('changeNotice', 'info', true, result.msg)

                            } else {
                                _this.showDialog('changeNotice', 'checkFiles', true, result.msg)
                            }
                        } else {
                            _this.fileInput = ''
                            if (result.msg == '上传失败') {
                                _this.showDialog('addNotice', 'info', true, result.msg)

                            } else {
                                _this.showDialog('addNotice', 'checkFiles', true, result.msg)
                            }

                        }

                    }
                }
            });

        },

        queryData: function () {
            var params = {};
            var _this = this;
            params.pageNo = 1;

            params.actId = this.queryActId;
            params.fileName = this.queryFileName;
            params.fileDesc = this.queryFileDesc;
            params.pageSize = this.pageMaxNum;
            $.post({
                url: '/marketingActive/activeRun/activeSettingTemplatePage/getList.ajax',
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
        downloadFile: function (val) {
            if (val) {
                console.log(val)
                url = '/marketingActive/activeRun/activeSettingTemplatePage/downloadFile.ajax?fileName=' + val;
                window.location.href = url;
            }
        }
    },
    components: {
        vueSelect: vueSelect
    },
});