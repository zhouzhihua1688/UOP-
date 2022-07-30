new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        id: '',
        actId: '',
        loadingShow: false,
        diaMsg: '',
        msgRuleId: '',
        msgRuleList: '',
        fundManager: '',
        fundManagerList: [],
        actName: '',
        actSubType: '',
        actDesc: '',
        actRemark: '',
        takepartConditionDesc: [{
            title: '',
            text: ''
        }],
        picUrl: '',
        preorderStartTime: '',
        preorderEndTime: '',
        isNoLimitTime: [],
        tags: [],
        tagList: [],
        isCountLimit: 'noLimit',
        takepartTotalNum: 0,
        searchForGroup: '',
        groupList: [],
        groupListForSelect: [],
        userGroupTips: '',
        entranceBtnName: '',
        entranceBtnUrl: '',
        displayStatus: '1'
    },
    computed: {
        groupListForSearch: function () {
            return this.groupList.filter(function (item) {
                return item.groupId.indexOf(this.searchForGroup) > -1 || item.groupName.indexOf(this.searchForGroup) > -1;
            }.bind(this));
        }
    },
    watch: {
        isNoLimitTime() {
            if (this.isNoLimitTime.length > 0) {
                this.preorderStartTime = '2000-01-01 00:00:00';
                this.preorderEndTime = '2099-12-31 00:00:00';
            } else {
                this.preorderStartTime = '';
                this.preorderEndTime = '';
            }
        }
    },
    created: function () {
        this.actId = this.getUrlParam('actId') || '';
        this.getDialogData();
    },
    mounted: function () {
        var dialogs = ['info', 'success'];
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
        // 初始化基金经理选择列表
        $('#fundManager').chosen({
            search_contains: true,
            no_results_text: '未找到该基金经理',
            disable_search_threshold: 6,
            width: '170px'
        });
        // 初始化消息规则选择列表
        // $('#msgRuleList').chosen({
        //     search_contains: true,
        //     no_results_text: '未找到该规则',
        //     disable_search_threshold: 6,
        //     width: '400px'
        // });
        $('#fundManager').on('change', function (e, params) {
            this.fundManager = params ? params.selected : '';
        }.bind(this));
        // $('#msgRuleList').on('change', function (e, params) {
        //     this.msgRuleId = params ? params.selected : '';
        // }.bind(this));
        // 上传按钮绑定事件
        $('#fileSelectBtn').click(function () {
            $('#uploadFileInput').click();
        });
        $('#uploadFileInput').on('change', function () {
            $('#uploadInput').val($(this).val());
        });
    },
    methods: {
        getDialogData: function () { // 获取新增页面所有弹窗数据
            $.post({
                url: '/publicConfig/appointment/appointmentMgmt/getDialogDataForOperate.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        this.groupList = result.data.groupList;
                        this.fundManagerList = result.data.fundManagerList;
                        // this.msgRuleList = result.data.msgRuleList;
                        this.tagList = result.data.tagList;
                        var str = '<option value=""></option>';
                        this.fundManagerList.forEach(function (item) {
                            str += '<option value="' + item.fundManagerId + '">' + item.fundManagerName + '</option>';
                        });
                        $('#fundManager').html(str);
                        $('#fundManager').trigger('chosen:updated');
                        // str = '<option value=""></option>';
                        // this.msgRuleList.forEach(function (item) {
                        //     str += '<option value="' + item.ruleKey + '">' + item.ruleName + '</option>';
                        // });
                        // $('#msgRuleList').html(str);
                        // $('#msgRuleList').trigger('chosen:updated');
                        if (this.actId) {
                            this.getDetailAndUpdateDialog()
                        }
                    } else {
                        this.showDialog('', 'info', true, '获取基金经理列表失败！');
                    }
                }.bind(this)
            });
        },
        getDetailAndUpdateDialog: function () {
            $.post({
                url: '/publicConfig/appointment/appointmentMgmt/query.ajax',
                data: {
                    actId: this.actId
                },
                success: function (result) {
                    if (result.error === 0) {
                        var body = result.data[0];
                        this.id = body.id;
                        this.fundManager = body.actManagerId;
                        $('#fundManager').val(body.actManagerId);
                        $('#fundManager').trigger('chosen:updated');
                        this.actName = body.actName;
                        this.actSubType = body.actSubType;
                        this.actDesc = body.actDesc;
                        this.actRemark = body.actRemark ? body.actRemark.replace(/<br\s*\/?\s*>/ig, "\n") : '';
                        this.takepartConditionDesc = body.takepartConditionDesc ? JSON.parse(body.takepartConditionDesc.replace(/<br\s*\/?\s*>/ig, "\\n")) : [];
                        this.picUrl = body.picUrl;
                        $('#uploadInput').val(body.picUrl || '');
                        if (body.preorderEndTime && body.preorderEndTime.slice(0, -2) == '2099-12-31 00:00:00') {
                            this.isNoLimitTime = ['isNotLimitTime'];
                        }
                        this.preorderStartTime = body.preorderStartTime ? body.preorderStartTime.slice(0, -2) : '';
                        this.preorderEndTime = body.preorderEndTime ? body.preorderEndTime.slice(0, -2) : '';

                        this.tags = body.tags ? body.tags.split(',') : [];
                        // this.msgRuleId = body.msgRuleId;
                        // $('#msgRuleList').val(body.msgRuleId);
                        // $('#msgRuleList').trigger('chosen:updated');
                        this.isCountLimit = body.takepartTotalNum == -1 ? 'noLimit' : 'limit';
                        body.takepartTotalNum != -1 && (this.takepartTotalNum = body.takepartTotalNum);
                        if (body.targetUserGroup) {
                            var obj = this.groupList.filter(function (item) {
                                return item.groupId == body.targetUserGroup;
                            })[0];
                            obj && (obj.check = true);
                            this.groupListForSelect = this.groupList.filter(function (item) {
                                return item.check;
                            });
                        }
                        this.entranceBtnName = body.entranceBtnName;
                        this.userGroupTips = body.userGroupTips;
                        this.entranceBtnUrl = body.entranceBtnUrl;
                        this.displayStatus = body.displayStatus;
                    } else {
                        this.showDialog('', 'info', true, '查询失败！');
                    }
                }.bind(this)
            });
        },
        uploadFile: function () {
            var imageData = $('#uploadFileInput').get(0).files[0];
            if (!imageData) {
                this.showDialog('', 'info', true, '未选择图片');
                return;
            }
            var formdata = new FormData();
            formdata.append('file', imageData);
            this.loadingShow = true;
            $.post({
                url: '/publicConfig/appointment/appointmentMgmt/upload.ajax',
                cache: false,
                data: formdata,
                processData: false,
                contentType: false,
                success: function (result) {
                    if (result.error === 0) {
                        this.picUrl = result.data;
                        $('#uploadInput').val(this.picUrl);
                        this.showDialog('', 'info', false, '上传成功');
                    }
                }.bind(this),
                complete: function () {
                    this.loadingShow = false;
                }.bind(this)
            });
        },
        showGroupList: function () {
            if (this.groupListForSelect.length > 0) {
                this.searchForGroup = '';
                this.groupList.forEach(function (item) {
                    item.check = false;
                });
                this.groupListForSelect.forEach(function (selectedItem) {
                    var obj = this.groupList.filter(function (listItem) {
                        return listItem.groupId === selectedItem.groupId;
                    })[0];
                    obj && (obj.check = true);
                }.bind(this));
            }
            this.showDialog('', 'groupList');
        },
        groupSelect: function (item) {
            if (item.check) {
                item.check = false;
            } else {
                this.groupList.forEach(function (foreachItem) {
                    foreachItem.check = false;
                });
                item.check = true;
            }
        },
        saveGroup: function () {
            this.searchForGroup = '';
            this.groupListForSelect = this.groupList.filter(function (item) {
                return item.check;
            });
            this.showDialog('groupList');
        },
        checkAddDialog: function () {
            if (!this.actId && !this.fundManager) {
                this.showDialog('', 'info', false, '请选择基金经理');
                return true;
            }
            if (this.isNoLimitTime.length === 0 && new Date(this.preorderStartTime.replace(/-/g, '/')).getTime() >= new Date(this.preorderEndTime.replace(/-/g, '/')).getTime()) {
                this.showDialog('', 'info', false, '开始时间和截止时间有误');
                return true;
            }
            // if (!this.msgRuleId) {
            //     this.showDialog('', 'info', false, '请选择消息规则');
            //     return true;
            // }
            if (this.groupListForSelect.length === 0) {
                this.showDialog('', 'info', false, '请选择参与客群');
                return true;
            }
            return false
        },
        saveAppointment: function () {
            if (this.checkAddDialog()) {
                return;
            }
            var params = {
                actManagerId: this.fundManager,
                actManagerName: this.fundManagerList.filter(function (item) {
                    return item.fundManagerId == this.fundManager;
                }.bind(this))[0].fundManagerName,
                actName: this.actName,
                actSubType: this.actSubType,
                actDesc: this.actDesc,
                actRemark: this.actRemark ? this.actRemark.replace(/\n/g, "<br />") : '',
                takepartConditionDesc: JSON.stringify(this.takepartConditionDesc.map(function(item){
                    return {
                        title: item.title,
                        text: item.text.replace(/\n/g, "<br />")
                    };
                })),
                picUrl: this.picUrl,
                preorderStartTime: this.isNoLimitTime.length > 0 ? '2000-01-01 00:00:00' : this.preorderStartTime,
                preorderEndTime: this.isNoLimitTime.length > 0 ? '2099-12-31 00:00:00' : this.preorderEndTime,
                tags: this.tags.join(','),
                // msgRuleId: this.msgRuleId,
                takepartTotalNum: this.isCountLimit == 'limit' ? this.takepartTotalNum : -1,
                targetUserGroup: this.groupListForSelect.map(function (item) {
                    return item.groupId
                }).join(','),
                entranceBtnName: this.entranceBtnName,
                userGroupTips: this.userGroupTips,
                entranceBtnUrl: this.entranceBtnUrl,
                displayStatus: this.displayStatus,
                displayMode: '00'
            };
            var url = '/publicConfig/appointment/appointmentMgmt/add.ajax';
            if (this.actId) { // 修改
                params.id = this.id;
                params.actId = this.actId;
                url = '/publicConfig/appointment/appointmentMgmt/update.ajax'
            }
            $.post({
                url: url,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.showDialog('', 'success');
                    } else {
                        this.showDialog('', 'info', false, '操作失败！');
                    }
                }.bind(this)
            });
        },
        extraAdd: function(){
            this.takepartConditionDesc.push({
                title: '',
                text: ''
            });
        },
        extraDel: function(index){
            this.takepartConditionDesc.splice(index,1);
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
        getUrlParam: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg); //匹配目标参数
            if (r != null) return unescape(r[2]);
            return '';
        }
    },
    components: {
        'date-picker': VueBootstrapDatetimePicker
    }
});