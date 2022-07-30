var vm = new Vue({
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
        userName: '',
        taskDisplayName: '',
        categoryId: '',
        taskDisplayOrder: '',
        taskDescription: '',
        taskDisplayMode: '1',
        jumpUrlApp: '',
        jumpUrlWap: '',
        enable: '',
        taskTriggerTp: '0',
        tempId: [''],
        conditionData: [],

        validStartTime: '',
        validEndTime: '',
        taskFrequencyType: '0',
        autoSendAward: '0',
        awardPkgId: '',
        taskDescPictureUrl: '',


        classifyAll: [],
        taskRuleAll: [],
        placeholderKeyAll: [], //占位符对应关系
        groupId:'',
        //查看修改
        redactStatus: true, //查看时编辑状态
        viewChange: {
            taskId: '',
            groupId:'',
            awardPkgId: '',
            categoryId: '',
            jumpUrlApp: '',
            jumpUrlWap: '',
            taskTriggerTp: '',
            enable: '',
            taskDescription: '',
            taskDisplayName: '',
            taskDisplayMode: '',
            taskDisplayOrder: '',
            taskFrequencyType: '',
            autoSendAward: '',
            tempId: [''],
            conditionData: [''],
            taskDescPictureUrl: ''
        },
        messageAll: [],
        groupList: [],
        categoryAll: [], //任务大类对应
        taskDisplayNameQuery: '', //查询
        taskId: '',
        filePath: '', //导入
        path: '', //文件上传成功后路径
        deleteinfo: {},
        fileVerify: true, //文件是否能上传

        enter: '', //悬浮
    },
    mounted: function () {
        var dialogs = ['info', 'addfile', 'checkFiles', 'deleteDialog'];
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
    },
    created() {
        var _this = this;
        $.post({
            url: '/marketingActive/taskManage/manage/categoryAll.ajax',

            success: function (result) {
                if (result.error === 0) {
                    _this.categoryAll = result.data ? result.data : [];
                } else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });
        $.post({
            url: '/marketingActive/taskManage/manage/taskClassifyQuery.ajax',
            data: {
                pageNo: '1',
                pageSize: '99999999'
            },
            success: function (result) {
                if (result.error === 0) {
                    _this.classifyAll = result.data.rows
                } else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });
        $.post({
            url: '/marketingActive/taskManage/manage/taskRuleQuery.ajax',
            data: {
                pageNo: '1',
                pageSize: '99999999'
            },
            success: function (result) {
                if (result.error === 0) {
                    console.log(result,'taskRuleAll');
                    _this.taskRuleAll = result.data.rows
                } else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });
        $.post({
            url: '/marketingActive/taskManage/manage/placeholderKeyQuery.ajax',
            data: {
                pageNo: '1',
                pageSize: '99999999'
            },
            success: function (result) {
                if (result.error === 0) {
                    console.log(result,'placeholderKeyAll');
                    _this.placeholderKeyAll = result.data.rows
                } else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });
        $.post({
            url: '/marketingActive/taskManage/manage/messageAll.ajax',
            success: function (result) {
                if (result.error === 0) {
                    _this.messageAll = result.data
                } else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });
        $.post({
            url: '/marketingActive/taskManage/manage/groupList.ajax',
            success: function (result) {
                if (result.error === 0) {
                    _this.groupList = result.data
                    console.log(result)
                } else {
                    _this.showDialog('', 'info', false, result.msg);
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
        },
        setFundIdRemark: function () {
            var _this = this;

            return function (val) {
                var str = '';
                _this.placeholderKeyAll.forEach(function (item, ind) {
                    if (val == item.key) {
                        return str = item.remark;
                    }
                })
                return str;
            }
        },
        categoryIndex: function () {
            var _this = this;
            return function (val) {
                var index = 0;
                _this.categoryAll.forEach(function (item, ind) {
                    if (val == item.productCategoryId) {
                        return index = ind;
                    }
                })
                return index;
            }
        }
    },
    watch: {
        pageMaxNum: function () {
            this.getTableData(0);
        },
        tempId: {
            handler: function (val, oldVal) {
                var _this = this;
                val.forEach(function (item, ind) {
                    _this.taskRuleAll.forEach(function (inItem, inInd) {
                        var str = '';
                        if (inItem.templateId == item) {
                            str = inItem.placeholders.split(',');
                            var obj = {};
                            str.forEach(function (strVal, strind) {
                                _this.placeholderKeyAll.forEach(function (keyVal, keyInd) {
                                    if (keyVal.key == strVal) {
                                        obj[strVal] = ''
                                    }
                                })
                            })

                            if (!_this.conditionData[ind]) {
                                _this.conditionData[ind] = obj;
                            } else {
                                var arr = arr1 = '';
                                for (const key in obj) {
                                    arr += key;
                                }
                                for (const key1 in _this.conditionData[ind]) {
                                    arr1 += key1;
                                }
                                if (arr != arr1) {
                                    _this.conditionData[ind] = obj;
                                }
                            }
                        }
                    })
                })
            },
            deep: true
        },
        'viewChange.tempId': {
            handler: function (val, oldVal) {
                var _this = this;
                val.forEach(function (item, ind) {
                    _this.taskRuleAll.forEach(function (inItem, inInd) {
                        var str = '';
                        if (inItem.templateId == item) {
                            str = inItem.placeholders.split(',');
                            var obj = {};
                            str.forEach(function (strVal, strind) {
                                _this.placeholderKeyAll.forEach(function (keyVal, keyInd) {
                                    if (keyVal.key == strVal) {
                                        obj[strVal] = ''
                                    }
                                })
                            })

                            if (!_this.viewChange.conditionData[ind]) {
                                _this.viewChange.conditionData[ind] = obj;
                            } else {
                                var arr = arr1 = '';
                                for (const key in obj) {
                                    arr += key;
                                }
                                for (const key1 in _this.viewChange.conditionData[ind]) {
                                    arr1 += key1;
                                }
                                if (arr != arr1) {
                                    _this.viewChange.conditionData[ind] = obj;
                                }
                            }
                        }
                    })
                })
            },
            deep: true
        },

    },
    filters: {
        setName: function (val) {
            var str = ''
            this.vm.placeholderKeyAll.forEach(function (item, ind) {
                if (val == item.key) {
                    return str = item.name;
                }
            })
            return str;
        }
    },
    methods: {
        setCategory: function (condItem, key, ind) {
            this.$set(this.conditionData, ind, condItem)
        },
        setViewChangeCategory: function (condItem, key, ind) {
            this.$set(this.conditionData, ind, condItem)
        },
        delTempid: function (ind) {
            this.tempId.splice(ind, 1)
            this.conditionData.splice(ind, 1)
        },
        setTempId: function (item, ind) {
            this.tempId[ind] = item
        },
        getTableData: function (currentIndex) {
            var params = {};
            var _this = this;
            params.pageNo = currentIndex + 1;
            params.pageSize = this.pageMaxNum;
            $.post({
                url: '/marketingActive/taskManage/manage/getList.ajax',
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
            var _this = this
            var mcpTaskRuleConfigs = [];
            if (this.tempId[0] != '') {
                this.tempId.forEach(function (item, ind) {
                    mcpTaskRuleConfigs[ind] = {
                        templateId: item,
                        conditionData: _this.conditionData[ind],
                    }

                })
            }
            var params = {
                mcpTaskConfig: {
                    awardPkgId: this.awardPkgId,
                    taskDescPictureUrl: this.taskDescPictureUrl,
                    categoryId: this.categoryId,
                    jumpUrlApp: this.jumpUrlApp,
                    jumpUrlWap: this.jumpUrlWap,
                    taskTriggerTp: this.taskTriggerTp,
                    modifyBy: this.userName,
                    enable: this.enable,
                    taskGroupId: this.groupId,
                    taskDescription: this.taskDescription,
                    taskDisplayName: this.taskDisplayName,
                    taskDisplayMode: this.taskDisplayMode,
                    taskDisplayOrder: this.taskDisplayOrder,
                    taskFrequencyType: this.taskFrequencyType,
                    autoSendAward: this.autoSendAward,
                    validEndTime: this.$refs.endTime.value,
                    validStartTime: this.$refs.startTime.value,
                },
                mcpTaskRuleConfigs: mcpTaskRuleConfigs
            };
            params.mcpTaskRuleConfigs = JSON.stringify(params.mcpTaskRuleConfigs)
            params.mcpTaskConfig = JSON.stringify(params.mcpTaskConfig)
            console.log(params)
            var _this = this;
            $.post({
                url: '/marketingActive/taskManage/manage/dataAdd.ajax',
                data: params,
                // traditional: true,
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('addNotice', 'info', false, result.msg);
                        _this.getTableData(0)
                        console.log(result)
                    } else {
                        _this.showDialog('addNotice', 'info', false, result.msg);
                    }
                }
            });
        },
        publish: function (id) {
            var _this = this;
            $.post({
                url: '/marketingActive/taskManage/manage/publish.ajax',
                data: {
                    taskId: id
                },
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
        showData: function (id, mode) {
            var _this = this;
            $.post({
                url: '/marketingActive/taskManage/manage/showData.ajax',
                data: {
                    taskId: id,
                    modifyBy: this.userName,
                    taskDisplayMode: mode == '1' ? '0' : '1'
                },
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('', 'info', false, result.msg);
                        _this.getTableData(0)
                        console.log(result)
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        deleteDialog: function (id) {
            this.deleteinfo.cutinPointId = id
            this.showDialog("", "deleteDialog")
        },
        // deleteData: function (id) {
        //     var params = {
        //         cutinPointId: this.deleteinfo.cutinPointId,
        //         modifyBy: this.userName
        //     };
        //     console.log(params)
        //     var _this = this;
        //     $.post({
        //         url: '/marketingActive/taskManage/manage/dataDelete.ajax',
        //         data: params,
        //         success: function (result) {
        //             if (result.error === 0) {
        //                 _this.showDialog('deleteDialog', 'info', false, '删除成功');
        //                 _this.getTableData(0)
        //                 console.log(result)
        //             } else {
        //                 _this.showDialog('deleteDialog', 'info', false, '删除失败');
        //             }
        //         }
        //     });
        // },
        showView: function (id) {

            var params = {
                taskId: id,
            };
            this.viewChange.taskId = id
            var _this = this;
            _this.redactStatus = true; //查看时为不可编辑
            $.post({
                url: '/marketingActive/taskManage/manage/dataQuery.ajax',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        // modifyBy: this.userName,
                        _this.viewChange.tempId = ['']
                        _this.viewChange.conditionData = []

                        _this.$refs.startTimeX.value = result.data.mcpTaskConfig.validStartTime;
                        _this.$refs.endTimeX.value = result.data.mcpTaskConfig.validEndTime;
                        _this.viewChange.awardPkgId = result.data.mcpTaskConfig.awardPkgId;
                        _this.viewChange.categoryId = result.data.mcpTaskConfig.categoryId;
                        _this.viewChange.jumpUrlApp = result.data.mcpTaskConfig.jumpUrlApp;
                        _this.viewChange.jumpUrlWap = result.data.mcpTaskConfig.jumpUrlWap;
                        _this.viewChange.taskDescPictureUrl = result.data.mcpTaskConfig.taskDescPictureUrl;
                        _this.viewChange.taskTriggerTp = result.data.mcpTaskConfig.taskTriggerTp;
                        _this.viewChange.enable = result.data.mcpTaskConfig.enable;
                        _this.viewChange.groupId = result.data.mcpTaskConfig.taskGroupId;
                        _this.viewChange.taskDescription = result.data.mcpTaskConfig.taskDescription;
                        _this.viewChange.taskDisplayName = result.data.mcpTaskConfig.taskDisplayName;
                        _this.viewChange.taskDisplayMode = result.data.mcpTaskConfig.taskDisplayMode;
                        _this.viewChange.taskDisplayOrder = result.data.mcpTaskConfig.taskDisplayOrder;
                        _this.viewChange.taskFrequencyType = result.data.mcpTaskConfig.taskFrequencyType;
                        _this.viewChange.autoSendAward = result.data.mcpTaskConfig.autoSendAward;

                        result.data.mcpTaskRuleConfigs.forEach(function (item, ind) {
                            _this.viewChange.tempId[ind] = item.templateId
                            _this.viewChange.conditionData[ind] = JSON.parse(item.conditionData)
                        })
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });

            this.showDialog('', 'changeNotice', false)
        },
        changeDate: function () {
            var _this = this
            var mcpTaskRuleConfigs = [];
            if (this.viewChange.tempId[0] != '') {
                this.viewChange.tempId.forEach(function (item, ind) {
                    mcpTaskRuleConfigs[ind] = {
                        templateId: item,
                        conditionData: _this.viewChange.conditionData[ind],
                    }

                })
            }
            var params = {
                mcpTaskConfig: {
                    taskId: this.viewChange.taskId,
                    awardPkgId: this.viewChange.awardPkgId,
                    taskDescPictureUrl: this.viewChange.taskDescPictureUrl,
                    categoryId: this.viewChange.categoryId,
                    jumpUrlApp: this.viewChange.jumpUrlApp,
                    jumpUrlWap: this.viewChange.jumpUrlWap,
                    taskTriggerTp: this.viewChange.taskTriggerTp,
                    modifyBy: this.userName,
                    enable: this.viewChange.enable,
                    taskGroupId: this.viewChange.groupId,
                    taskDescription: this.viewChange.taskDescription,
                    taskDisplayName: this.viewChange.taskDisplayName,
                    taskDisplayMode: this.viewChange.taskDisplayMode,
                    taskDisplayOrder: this.viewChange.taskDisplayOrder,
                    taskFrequencyType: this.viewChange.taskFrequencyType,
                    autoSendAward: this.viewChange.autoSendAward,
                    validEndTime: this.$refs.endTimeX.value,
                    validStartTime: this.$refs.startTimeX.value,
                },
                mcpTaskRuleConfigs: mcpTaskRuleConfigs
            };
            params.mcpTaskRuleConfigs = JSON.stringify(params.mcpTaskRuleConfigs)
            params.mcpTaskConfig = JSON.stringify(params.mcpTaskConfig)
            console.log(params)
            var _this = this;
            $.post({
                url: '/marketingActive/taskManage/manage/dataChange.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('changeNotice', 'info', false, result.msg);
                        _this.redactStatus = true; //查看时为不可编辑
                        _this.getTableData(0)
                        console.log(result)
                    } else {
                        _this.showDialog('changeNotice', 'info', false, result.msg);
                        _this.redactStatus = true; //查看时为不可编辑
                    }
                }
            });
        },
        queryData: function () {
            var params = {};
            var _this = this;
            params.pageNo = 1;
            params.taskId = this.taskId;
            params.taskDisplayName = this.taskDisplayNameQuery;
            params.pageSize = this.pageMaxNum;
            $.post({
                url: '/marketingActive/taskManage/manage/getList.ajax',
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
        showFundId: function () {
            this.tempId.push('')
        },
        showFundIdChange: function () {
            this.viewChange.tempId.push('')
        },
        delTempidChange: function (ind) {
            this.viewChange.tempId.splice(ind, 1)
            this.viewChange.conditionData.splice(ind, 1)
        },
        refreshTask: function () {
            var _this = this;
            $.post({
                url: '/marketingActive/taskManage/manage/refreshTask.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('', 'info', false, result.msg);
                        _this.getTableData(0)
                        console.log(result)
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        select: function (item) {
            document.getElementById("uploadFileInput").click();
        },
        showFileName: function (event) {
            this.filePath = event.target.files[0].name
            this.viewChange.filePath = event.target.files[0].name
            console.log(111)
        },
        fileUpload: function (item) {
            var _this = this;
            var fileElementId = 'uploadFileInput'
            var formData = new FormData();
            // HTML 文件类型input，由用户选择
            formData.append("file", document.getElementById(fileElementId).files[0]);
            $.ajax({
                url: "/marketingActive/taskManage/manage/upload.ajax",
                type: "POST",
                data: formData,
                processData: false, // 不处理数据
                contentType: false, // 不设置内容类型
                success: function (result) {
                    console.log(result)
                    if (result.error == 0) {
                        _this.path = result.data
                        _this.pagePath();
                        // _this.showDialog('addfile', 'info', true, result.msg)
                    } else {
                        _this.showDialog('addfile', 'info', true, result.msg)
                    }
                }
            });
        },
        pagePath: function () {
            var _this = this;
            $.ajax({
                url: "/marketingActive/taskManage/manage/pagePath.ajax",
                type: "POST",
                data: {
                    pagePath: _this.path
                },
                success: function (result) {
                    if (result.error == 0) {
                        _this.showDialog('addfile', 'info', false, result.msg)
                    } else {
                        _this.showDialog('addfile', 'info', false, result.msg)
                    }
                }
            });
        },
        checkFile: function (item) {
            var _this = this;
            var fileElementId = 'uploadFileInput'
            var formData = new FormData();
            // HTML 文件类型input，由用户选择
            formData.append("file", document.getElementById(fileElementId).files[0]);

            $.ajax({
                url: "/marketingActive/taskManage/manage/verify.ajax",
                type: "POST",
                data: formData,
                processData: false, // 不处理数据
                contentType: false, // 不设置内容类型
                success: function (result) {
                    console.log(result)
                    if (result.error == 0) {
                        _this.fileUpload()
                    } else if (result.error == 2) {
                        _this.showDialog('addfile', 'checkFiles', true, result.msg)
                    } else {

                        _this.showDialog('addfile', 'info', true, result.msg)

                    }
                }
            });

        },
        setEnable: function (taskId, enable, taskDisplayMode) {
            var _this = this
            // var mcpTaskRuleConfigs = [];
            // if (this.viewChange.tempId[0] != '') {
            //     this.viewChange.tempId.forEach(function (item, ind) {
            //         mcpTaskRuleConfigs[ind] = {
            //             templateId: item,
            //             conditionData: _this.viewChange.conditionData[ind],
            //         }

            //     })
            // }
            var params = {
                taskId: taskId,
                modifyBy: this.userName,
                enable: enable == 0 ? 1 : 0,
                taskDisplayMode: taskDisplayMode,
            };
            // params.mcpTaskRuleConfigs = JSON.stringify(params.mcpTaskRuleConfigs)
            // params.mcpTaskConfig = JSON.stringify(params.mcpTaskConfig)
            console.log(params)
            var _this = this;
            $.post({
                url: '/marketingActive/taskManage/manage/setEnable.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('', 'info', false, result.msg);
                        _this.getTableData(0)
                        console.log(result)
                    } else {
                        _this.showDialog('', 'info', false,  result.msg);
                    }
                }
            });
        },
        selectDialog: function(dialogType){
            $('#uploadFileInput' + dialogType).get(0).click();
        },
        fileUploadDialog: function(dialogType){
            var _this = this;
            var fileElementId = 'uploadFileInput' + dialogType;
            $.ajaxFileUpload({
                url: '/marketingActive/taskManage/manage/upLoadDialogPictureUrl.ajax',
                type: 'POST',
                dataType: 'json',
                secureuri: false,
                fileElementId: fileElementId,
                success: function (result) {
                    console.log(result)
                    if (result.error == 0) {
                        if (dialogType == 'Update') {
                            _this.viewChange.taskDescPictureUrl = result.data;
                            _this.showDialog('changeNotice', 'info', true, '上传成功')
                        }
                        else {
                            _this.taskDescPictureUrl = result.data;
                            _this.showDialog('addNotice', 'info', true, '上传成功')
                        }
                    } else {
                        if (dialogType == 'Update') {
                            _this.showDialog('changeNotice', 'info', true, '上传失败')
                        }
                        else {
                            _this.showDialog('addNotice', 'info', true, '上传失败')
                        }
                    }
                }
            });
        },
        showFileNameDialog: function (event) {
            this.taskDescPictureUrl = event.target.files[0].name;
            this.viewChange.taskDescPictureUrl = event.target.files[0].name;
        },
    }
});