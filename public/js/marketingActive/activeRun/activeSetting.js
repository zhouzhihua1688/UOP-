new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        tableData: [],
        diaMsg: '',
        queryActStatus: '',
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10,
        // 新增
        upLoadStatus: true,
        userName: '',
        actId: '',
        actName: '',
        actDisplayName: '',
        actDesc: '',
        actStatus: 0,
        displayMode: 0,
        actSeatNo: '',
        actUrl: '',
        wapUrl: '',
        bannerPic: '',
        //查看修改
        redactStatus: true, //查看时编辑状态
        getActSeatNo: '',
        actShareFlagEnums: '',
        actShare: '',
        activeAll: '',
        bonusVailday: '',
        viewChange: {
            upLoadStatus: false,
            anew: false,
            id: '',
            actId: '',
            actName: '',
            actDisplayName: '',
            actDesc: '',
            actStatus: 0,
            displayMode: 0,
            actSeatNo: '',
            bannerPic: '',
            actShareConfig: '',
            bonusVailday: '',
            actUrl: '',
            wapUrl: ''
        },
        anew: false, //重新渲染file框
        queryActId: '', //查询

        deleteinfo: {},
        // loading动画
        progress: false,
    },
    mounted: function () {
        var dialogs = ['info', '', '', 'deleteDialog', 'refresh'];
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
        $('.date-timepicker').datetimepicker({
            format: 'YYYY-MM-DD HH:mm:ss', //use this option to display seconds
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

        $.post({
            url: '/marketingActive/activeRun/activeSetting/dataQuery.ajax',
            success: function (result) {
                if (result.error == 0) {
                    _this.getActSeatNo = result.data.mcpActSeatConfigList;
                    _this.actShareFlagEnums = result.data.actShareFlagEnums
                } else {
                    _this.showDialog('', 'info', false, '查询失败');
                }
            }
        });

        $.post({
            url: '/marketingActive/activeRun/activeSetting/activeAll.ajax',
            success: function (result) {
                if (result.error == 0) {
                    _this.activeAll = result.data;
                } else {
                    _this.showDialog('', 'info', false, '查询失败');
                }
            }
        });
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
        showFileName: function (event) {
            this.bannerPic = event.target.files[0].name
            this.viewChange.bannerPic = event.target.files[0].name
            console.log(111)
        },
        addDialog: function () {
            var _this = this;

            this.upLoadStatus = true;
            // this.moduleName = '';
            // this.moduleDesc = '';
            // this.bannerPic = '';
            this.anew = true;
            this.showDialog('', 'addNotice', false);

        },
        getTableData: function (currentIndex) {
            var params = {};
            var _this = this;
            this.queryActStatus && (params.actStatus = this.queryActStatus);
            this.queryActId && (params.actId = this.queryActId);
            params.pageNo = currentIndex + 1;
            params.pageSize = this.pageMaxNum;
            $.post({
                url: '/marketingActive/activeRun/activeSetting/getList.ajax',
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
        add: function () {
            // if (!this.componentKey) {
            //     this.showDialog('addNotice', 'info', true, '请填写唯一键');
            //     return;
            // }
            var params = {
                modifyBy: this.userName,
                actId: this.actId,
                actName: this.actName,
                actDisplayName: this.actDisplayName,
                actDesc: this.actDesc,
                actStatus: this.actStatus,
                displayMode: this.displayMode,
                actSeatNo: this.actSeatNo,
                actUrl: this.actUrl,
                wapUrl: this.wapUrl,
                bannerPic: this.bannerPic,
                startTime: this.$refs.startTime.value,
                endTime: this.$refs.endTime.value,
                actShareConfig: this.actShare,
                tarkpartEndTime: this.$refs.tarkpartEndTime.value,
                bonusVailday: this.bonusVailday
            };
            console.log(params)
            // return;
            var _this = this;
            $.post({
                url: '/marketingActive/activeRun/activeSetting/dataAdd.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.anew = false;
                        _this.showDialog('addNotice', 'info', false, result.msg);
                        _this.getTableData(0)
                        _this.upLoadStatus = true,
                            _this.actId = '';
                            _this.actName = '';
                            _this.actDisplayName = '';
                            _this.actDesc = '';
                            _this.actStatus = 0;
                            _this.displayMode = 0;
                            _this.actSeatNo = '';
                            _this.actUrl = '';
                            _this.wapUrl = '';
                            _this.bannerPic = '';
                            _this.startTime = '';
                            _this.endTime = '';
                            _this.actShareConfig = '';
                            _this.tarkpartEndTime = '';
                            _this.bonusVailday ='';
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
                url: '/marketingActive/activeRun/activeSetting/dataDelete.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
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

            var params = {
                id: id,
            };
            console.log(params)
            var _this = this;
            _this.redactStatus = true; //查看时为不可编辑
            $.post({
                url: '/marketingActive/activeRun/activeSetting/dataQuery.ajax',
                data: params,
                success: function (result) {
                    if (result.error == 0) {

                        _this.viewChange.actId = result.data.actId;
                        _this.viewChange.actName = result.data.actName;
                        _this.viewChange.actDisplayName = result.data.actDisplayName;
                        _this.viewChange.actDesc = result.data.actDesc;
                        _this.viewChange.actStatus = result.data.actStatus;
                        _this.viewChange.displayMode = result.data.displayMode;
                        _this.viewChange.actSeatNo = result.data.actSeatNo;
                        _this.viewChange.actUrl = result.data.actUrl;
                        _this.viewChange.wapUrl = result.data.wapUrl;
                        _this.viewChange.bannerPic = result.data.bannerPic;
                        _this.$refs.XstartTime.value = result.data.startTime;
                        _this.$refs.XendTime.value = result.data.endTime;
                        _this.$refs.XtarkpartEndTime.value = result.data.tarkpartEndTime;
                        _this.viewChange.id = result.data.id;
                        _this.viewChange.actShareConfig = result.data.actShareConfig;
                        _this.viewChange.bonusVailday = result.data.bonusVailday;
                        // _this.getTableData(0)
                        _this.viewChange.upLoadStatus = false;
                        _this.redactStatus = true; //查看时为不可编辑
                        _this.viewChange.anew = true;
                        console.log(result)
                    } else {
                        _this.showDialog('', 'info', false, '查询失败');
                    }
                }
            });

            this.showDialog('', 'changeNotice', false)
        },
        changeDate: function () {
            var params = {
                id: this.viewChange.id,
                modifyBy: this.userName,
                actId: this.viewChange.actId,
                actName: this.viewChange.actName,
                actDisplayName: this.viewChange.actDisplayName,
                actDesc: this.viewChange.actDesc,
                actStatus: this.viewChange.actStatus,
                displayMode: this.viewChange.displayMode,
                actSeatNo: this.viewChange.actSeatNo,
                actUrl: this.viewChange.actUrl,
                wapUrl: this.viewChange.wapUrl,
                bannerPic: this.viewChange.bannerPic,
                startTime: this.$refs.XstartTime.value,
                endTime: this.$refs.XendTime.value,
                actShareConfig: this.viewChange.actShareConfig,
                bonusVailday: this.viewChange.bonusVailday,
                tarkpartEndTime: this.$refs.XtarkpartEndTime.value
            };
            console.log(params)
            var _this = this;
            $.post({
                url: '/marketingActive/activeRun/activeSetting/dataChange.ajax',
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
        queryData: function () {
            var params = {};
            var _this = this;
            params.pageNo = 1;
            params.actId = this.queryActId;
            params.actStatus = this.queryActStatus;
            params.pageSize = this.pageMaxNum;
            $.post({
                url: '/marketingActive/activeRun/activeSetting/getList.ajax',
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
        windowGoTo: function (url, id) {
            window.location.href = '/marketingActive/activeRun/activeSetting.html?pageType=' + url + '&actId=' + id
        },
        refreshAct: function () {//刷新活动
            var _this = this;
            this.showDialog('refresh', '', false);
            this.progress = true;

            $.post({
                url: '/marketingActive/activeRun/activeSetting/refreshAct.ajax',
                success: function (result) {
                    _this.progress = false;
                    if (result.error === 0) {
                        _this.showDialog('', 'info', false, result.msg);
                        _this.getTableData(0)
                        console.log(result)
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            })
        },
        refreshStorage: function () {//刷新活动
            var _this = this;
            this.progress = true;
            $.post({
                url: '/marketingActive/activeRun/activeSetting/refreshStorage.ajax',
                success: function (result) {
                    _this.progress = false;
                    if (result.error === 0) {
                        _this.showDialog('', 'info', false, result.msg);
                        _this.getTableData(0)
                        console.log(result)
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            })
        },
        select: function (item) {
            if (item == 'change') {
                document.getElementById("uploadFileInputCge").click();
            } else {
                document.getElementById("uploadFileInput").click();
            }

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
                url: '/marketingActive/activeRun/activeSetting/upLoad.ajax',
                type: 'POST',
                dataType: 'json',
                secureuri: false,
                fileElementId: fileElementId,
                success: function (result) {
                    console.log(result)
                    if (result.error == 0) {
                        if (item == 'change') {
                            _this.viewChange.bannerPic = result.data
                            _this.viewChange.upLoadStatus = true;
                            _this.viewChange.anew = false;
                            _this.showDialog('changeNotice', 'info', true, '上传成功')
                        } else {
                            _this.bannerPic = result.data
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
        sendAct: function (actId) {
            var params = {
                actId: actId
            };
            var _this = this;
            $.post({
                url: '/marketingActive/activeRun/activeSetting/sendAct.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('', 'info', false, result.msg);
                        console.log(result)
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        exportExcel: function(){
            window.location.href='/marketingActive/activeRun/activeSetting/exportExcel.ajax';
        }
    }
});