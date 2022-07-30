new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        groupId: '',
        groupName: '',
        groupType: '',
        status: '',
        tableData: [],
        diaMsg: '',
        // 新增弹窗相关数据
        groupId_dialog: '',
        groupName_dialog: '',
        groupType_dialog: 2,
        groupUserValidateDay_dialog: '',
        groupDesc_dialog: '',
        filePath_dialog: '',
        status_dialog: 0,
        currentGroupId:'',
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        pageMaxNum: '10',
        condition: '',
    },
    computed: {
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
            var currentIndex = parseInt(this.currentIndex);
            return this.middleData[currentIndex];
        },
        pageList: function () {
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
            }
            else if (this.currentIndex <= this.maxSpace && this.middleData.length - this.currentIndex > this.maxSpace) {
                for (var i = 0; i < this.currentIndex + (2 * this.maxSpace - this.currentIndex); i++) {
                    arr.push(i + 1);
                }
            }
            else if (this.currentIndex > this.maxSpace && this.middleData.length - this.currentIndex <= this.maxSpace) {
                var space = this.middleData.length - this.currentIndex;
                for (var i = this.currentIndex - (2 * this.maxSpace - space); i < this.middleData.length; i++) {
                    arr.push(i + 1);
                }
            }
            else {
                for (var i = 0; i < this.middleData.length; i++) {
                    arr.push(i + 1);
                }
            }
            return arr;
        }
    },
    watch: {
        pageMaxNum: function () {
            this.currentIndex = 0;
        },
        condition: function () {
            this.currentIndex = 0;
        }
    },
    mounted: function () {
        var _this = this;
        var dialogs = ['audit', 'info','release'];
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
        this.search();
    },
    methods: {
        //业务方法
        search: function () {
            this.currentIndex = 0;
            var _this = this;
            var params = {};
            params.groupId = this.groupId;
            params.groupName = this.groupName;
            params.groupType = this.groupType;
            params.status = this.status;
            $.post({
                url: '/recommendSystem/recommendSystemGroupMgmt/groupAudit/search.ajax',
                data: params,
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
        clearAddDia: function (item) {
            this.groupId_dialog = item.groupId;
            this.groupName_dialog = item.groupName;
            this.groupType_dialog = item.groupType;
			this.groupUserValidateDay_dialog = item.groupUserValidateDay ? item.groupUserValidateDay : '';
            this.filePath_dialog = item.filePath;
            this.groupDesc_dialog = item.groupDesc;
            this.status_dialog = item.status;
        },
        checkAddDia: function () {
            if (!this.groupName_dialog) {
                this.showDialog('audit', 'info', true, '分组名称不能为空!');
                return false;
            }
			if (this.groupType_dialog == 1 && !/^[1-9]\d*$/.test(this.groupUserValidateDay_dialog)) { // 实时客群
			    this.showDialog('audit', 'info', true, '客群有效期不能为空,且必须为正整数!');
			    return false;
			}
            if (!this.filePath_dialog) {
                this.showDialog('audit', 'info', true, '文件路径不能为空!');
                return false;
            }
            if (!this.groupDesc_dialog) {
                this.showDialog('audit', 'info', true, '分组描述不能为空!');
                return false;
            }
            return true;
        },
        showAudit: function (item) {
            this.clearAddDia(item);
            this.showDialog('', 'audit');
        },
        audit: function () {
            if (!this.checkAddDia()) {
                return;
            }
            var _this = this;
            var params = {};
            var url = '/recommendSystem/recommendSystemGroupMgmt/groupAudit/audit.ajax';
            params.groupId = this.groupId_dialog;
            params.groupName = this.groupName_dialog;
            params.groupType = this.groupType_dialog;
            this.groupType_dialog == 1 && (params.groupUserValidateDay = Number(this.groupUserValidateDay_dialog));
            params.filePath = this.filePath_dialog;
            params.groupDesc = this.groupDesc_dialog;
            params.status = this.status_dialog;
            $.post({
                url: url,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('audit', 'info', false, result.msg);
                        _this.search();
                    }
                    else {
                        _this.showDialog('audit', 'info', true, result.msg);
                    }
                }
            });
        },
        showRelease: function (item) {
            this.currentGroupId=item.groupId;
            this.showDialog('', 'release');
        },
        release:function () {
            var _this=this;
            $.post({
                url:'/recommendSystem/recommendSystemGroupMgmt/groupAudit/release.ajax',
                data: {groupId:this.currentGroupId},
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('release', 'info', false, result.msg);
                        _this.search();
                    }
                    else {
                        _this.showDialog('release', 'info', false, result.msg);
                    }
                }
            });
        },
        //主表格分页方法
        prev: function () {
            this.currentIndex <= 0 ? 0 : this.currentIndex--;
        },
        next: function () {
            this.currentIndex >= this.middleData.length - 1 ? this.middleData.length - 1 : this.currentIndex++;
        },
        changeIndex: function (index) {
            this.currentIndex = index - 1;
        },
        toFirst: function () {
            this.currentIndex = 0;
        },
        toLast: function () {
            this.currentIndex = this.middleData.length - 1;
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
