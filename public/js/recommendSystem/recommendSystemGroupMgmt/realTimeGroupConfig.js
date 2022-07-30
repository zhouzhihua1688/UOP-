new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        groupId: '',
        ruleId: '',
        ruleTemplateId: '',
        tableData: [],
        groupIdList: [],
        ruleTemplateIdList: [],
        placeholderList: [],
        diaMsg: '',
        updateId: '',
        deleteId: '',
        // 新增弹窗相关数据
        groupId_dialog: '',
        ruleTemplateId_dialog: '',
        ruleConditionData_dialog: '',
        remark_dialog: '',
        //
        placeholders:'',
        dialogruleTemplateInfo:[],
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10
    },
    computed: {
        //主表格分页
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
        }
    },
    watch: {
        pageMaxNum: function () {
            this.getTableData(0);
        },
        ruleTemplateId_dialog: {
            handler: function (val, oldval) {
                // console.log(this.ruleTemplateId_dialog);
                this.queryTemplateIDetail(this.ruleTemplateId_dialog);
            }
        }
    },
    mounted: function () {
        var _this = this;
        var dialogs = ['del', 'operate', 'info'];
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
        this.placeholdersQuery();
        //获取groupIDlist
        $.post({
            url: '/recommendSystem/recommendSystemGroupMgmt/realTimeGroupConfig/queryGroupId.ajax',
            success: function (result) {
                if (result.error === 0) {
                    // console.log(result,'groupIDlist');
                    _this.groupIdList=result.data;
                }
                else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });
        //获取规则模板列表
        $.post({
            url: '/recommendSystem/recommendSystemGroupMgmt/realTimeGroupConfig/queryRuleTemplateIdList.ajax',
            success: function (result) {
                if (result.error === 0) {
                    console.log(result,'queryRuleTemplateIdList');
                    if(result.data.rows.length>=1){
                        _this.ruleTemplateIdList=result.data.rows;
                    }else{
                        _this.showDialog('', 'info', false, '规则模板列表暂无数据');
                    }
                }
                else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });
    },
    methods: {
        //业务方法
        getTableData: function (currentIndex) {
            var _this = this;
            var params = {};
            params.groupId = this.groupId;
            params.ruleId = this.ruleId;
            params.ruleTemplateId = this.ruleTemplateId;
            params.pageNo = currentIndex + 1;
            params.pageSize = this.pageMaxNum;
            $.post({
                url: '/recommendSystem/recommendSystemGroupMgmt/realTimeGroupConfig/search.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.tableData = result.data.rows;
                        _this.currentIndex = result.data.pageNum - 1;
                        _this.totalPage = result.data.pages;
                    }
                    else {
                        _this.tableData = [];
                        _this.currentIndex = 0;
                        _this.totalPage = 0;
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        clearOperateDia: function (item) {
            if (item) {
                this.groupId_dialog = item.groupId;
                this.ruleTemplateId_dialog = item.ruleTemplateId;
                this.ruleConditionData_dialog = JSON.parse(item.ruleConditionData);
                this.remark_dialog = item.remark;
            }
            else {
                this.groupId_dialog = '';
                this.ruleTemplateId_dialog = '';
                this.ruleConditionData_dialog = '';
                this.remark_dialog = '';
            }
        },
        checkOperateDia: function () {
            if (!this.groupId_dialog) {
                this.showDialog('operate', 'info', true, '分组ID不能为空!');
                return false;
            }
            if (!this.ruleTemplateId_dialog) {
                this.showDialog('operate', 'info', true, '规则模板ID不能为空!');
                return false;
            }
            if (!this.ruleConditionData_dialog) {
                this.showDialog('operate', 'info', true, '规则执行条件数据不能为空!');
                return false;
            }
            return true;
        },
        showAdd: function () {
            this.updateId = '';
            this.clearOperateDia();
            this.showDialog('', 'operate');
        },
        showUpdate: function (item) {
            var _this=this;
            this.updateId = item.ruleId;
            this.clearOperateDia(item);
            // console.log(this.ruleConditionData_dialog,'this.ruleConditionData_dialog');

            setTimeout(function () {
                console.log(_this.dialogruleTemplateInfo,'dialogruleTemplateInfo');
                for (var item in _this.ruleConditionData_dialog) {
                    // console.log(item);
                    for (var i = 0; i < _this.dialogruleTemplateInfo.length; i++) {
                        if (_this.dialogruleTemplateInfo[i].key == item) {
                            _this.dialogruleTemplateInfo[i].keyValue = _this.ruleConditionData_dialog[item];
                        }
                    }
                }
            },100);

            this.showDialog('', 'operate');
        },
        operate: function () {
            this.ruleConditionData_dialog=[];
            for(var i=0;i<this.dialogruleTemplateInfo.length;i++){
                if(i==this.dialogruleTemplateInfo.length-1){
                    this.ruleConditionData_dialog+='"'+this.dialogruleTemplateInfo[i].key+'":"'+this.dialogruleTemplateInfo[i].keyValue+'"';
                }else{
                    this.ruleConditionData_dialog+='"'+this.dialogruleTemplateInfo[i].key+'":"'+this.dialogruleTemplateInfo[i].keyValue+'",';
                }
            }
            this.ruleConditionData_dialog="{"+this.ruleConditionData_dialog+"}";
            if (!this.checkOperateDia()) {
                return;
            }
            var _this = this;
            var params = {};
            var url = '';
            if (this.updateId) {
                params.ruleId = this.updateId;
                url = '/recommendSystem/recommendSystemGroupMgmt/realTimeGroupConfig/update.ajax';
            }
            else {
                url = '/recommendSystem/recommendSystemGroupMgmt/realTimeGroupConfig/add.ajax';
            }

            // this.ruleConditionData_dialog=JSON.stringify(this.ruleConditionData_dialog);
            params.groupId = this.groupId_dialog;
            params.ruleTemplateId = this.ruleTemplateId_dialog;
            params.ruleConditionData = this.ruleConditionData_dialog;
            params.remark = this.remark_dialog;
            $.post({
                url: url,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('operate', 'info', false, result.msg);
                        _this.getTableData(_this.currentIndex);
                    }
                    else {
                        _this.showDialog('operate', 'info', true, result.msg);
                    }
                }
            });
        },
        showDel: function (item) {
            this.deleteId = item.ruleId;
            this.showDialog('', 'del');
        },
        del: function () {
            var _this = this;
            $.post({
                url: '/recommendSystem/recommendSystemGroupMgmt/realTimeGroupConfig/del.ajax',
                data: {ruleId: this.deleteId},
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('del', 'info', false, result.msg);
                        _this.getTableData(_this.currentIndex);
                    }
                    else {
                        _this.showDialog('del', 'info', false, result.msg);
                    }
                }
            });
        },
        queryTemplateIDetail:function (id) {
            this.dialogruleTemplateInfo=[];
            // this.placeholders='';
            var _this=this;
            var arr=[];
            $.post({
                url: '/recommendSystem/recommendSystemGroupMgmt/realTimeGroupConfig/queryTemplateIDetail.ajax',
                data: {templateId: id},
                success: function (result) {
                    if (result.error === 0) {
                        // console.log(result.data.placeholders,'placeholders');
                        _this.placeholders=result.data.placeholders;
                        if( _this.placeholders){
                            // console.log(_this.placeholders,'current');
                            arr=_this.placeholders.split(',');
                            arr.map(function (item) {
                                // console.log(item,'arr');
                                _this.placeholderList.map(function (item1) {
                                    if(item==item1.key){
                                        // console.log(123);
                                        _this.dialogruleTemplateInfo.push({key:item1.key,name:item1.name,keyValue:''})

                                    }
                                })
                            })
                        }else{
                            _this.dialogruleTemplateInfo=[];
                        }

                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        placeholdersQuery:function () {
            var _this=this;
            $.post({
                url: '/recommendSystem/recommendSystemGroupMgmt/realTimeGroupConfig/placeholdersQuery.ajax',
                data: {
                    pageNo: "1",
                    pageSize: "99999",
                },
                success: function (result) {
                    if (result.error === 0) {
                        _this.placeholderList = result.data.rows;
                        // console.log(result,'placeholderList')
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },

        //主表格分页方法
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
        }
    }
});
