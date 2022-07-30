new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        groupId: '',
        groupName: '',
        groupType: '',
        status: '',
        deleteId: '',
        tableData: [],
        diaMsg: '',
        // 新增弹窗相关数据
        updateId: '',
        groupName_dialog: '',
        groupType_dialog: 2,
        groupUserValidateDay_dialog: '',
        filePath_dialog: '',
        groupDesc_dialog: '',
        //custNo新增dialog
        custNo: '',
        checkCustNo: '',
        diagroupId: '',
        delCustomer:'',  //删除客户
        // 上传文件相关数据
        loadingShow: false,
        uploadGroupId: '',
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
        var dialogs = ['del', 'add', 'info', 'addCustno', 'checkCustno', 'fresh', 'uploadExcel','delCustno'];
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
        $('#uploadBtnExcel').click(function () {
            $('#uploadFileInputExcel').click();
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
                url: '/recommendSystem/recommendSystemGroupMgmt/groupConfig/search.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.tableData = result.data;
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        clearAddDia: function (item) {
            this.groupName_dialog = item ? item.groupName : '';
            this.groupType_dialog = item ? item.groupType : 2;
            this.groupUserValidateDay_dialog = item ? item.groupUserValidateDay : '';
            this.filePath_dialog = item ? item.filePath : '';
            this.groupDesc_dialog = item ? item.groupDesc : '';
        },
        checkAddDia: function () {
            if (!this.groupName_dialog) {
                this.showDialog('add', 'info', true, '分组名称不能为空!');
                return false;
            }
            if (!this.groupType_dialog) {
                this.showDialog('add', 'info', true, '请选择数据读取来源!');
                return false;
            }
            if (this.groupType_dialog == 1 && !/^[1-9]\d*$/.test(this.groupUserValidateDay_dialog)) { // 实时客群
                this.showDialog('add', 'info', true, '客群有效期不能为空,且必须为正整数!');
                return false;
            }
            if (!this.filePath_dialog) {
                this.showDialog('add', 'info', true, '文件路径不能为空!');
                return false;
            }
            if (!this.groupDesc_dialog) {
                this.showDialog('add', 'info', true, '分组描述不能为空!');
                return false;
            }
            return true;
        },
        showAdd: function () {
            this.updateId = '';
            this.clearAddDia();
            this.showDialog('', 'add');
        },
        showUpdate: function (item) {
            this.updateId = item.groupId;
            this.clearAddDia(item);
            this.showDialog('', 'add');
        },
        add: function () {
            if (!this.checkAddDia()) {
                return;
            }
            var _this = this;
            var params = {};
            var url = '/recommendSystem/recommendSystemGroupMgmt/groupConfig/';
            url += this.updateId ? 'update.ajax' : 'add.ajax';
            this.updateId && (params.groupId = this.updateId);
            params.groupName = this.groupName_dialog;
            params.groupType = this.groupType_dialog;
            params.filePath = this.filePath_dialog.replace(/[\r\n]/g, "").replace(/\s/g, '');
            params.groupDesc = this.groupDesc_dialog.replace(/[\r\n]/g, "").replace(/\s/g, '');
            this.groupType_dialog == 1 && (params.groupUserValidateDay = Number(this.groupUserValidateDay_dialog));
            $.post({
                url: url,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('add', 'info', false, result.msg);
                        _this.search();
                    } else {
                        _this.showDialog('add', 'info', true, result.msg);
                    }
                }
            });
        },
        showCustnoAdd: function (item) {
            this.custNo = '';
            this.diagroupId = item.groupId;
            this.showDialog('', 'addCustno');
        },
        addCustNo: function () {
            if (!this.custNo) {
                this.showDialog('addCustno', 'info', true, 'custNo不能为空!');
                return;
            }
            if (this.custNo < 0) {
                this.showDialog('addCustno', 'info', true, 'custNo不能为负数!');
                return;
            }
            var _this = this;
            var params = {};
            var url = '/recommendSystem/recommendSystemGroupMgmt/groupConfig/addCustno.ajax';
            params.custNo = this.custNo;
            params.groupId = this.diagroupId;
            $.post({
                url: url,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('addCustno', 'info', false, result.msg);
                        _this.search();
                    } else {
                        _this.showDialog('addCustno', 'info', true, result.msg);
                    }
                }
            });
        },
        showCusnoCheck: function (item) {
            this.checkCustNo = '';
            this.diagroupId = item.groupId;
            this.showDialog('', 'checkCustno');
        },
        findCustNo: function () {
            if (!this.checkCustNo) {
                this.showDialog('checkCustno', 'info', true, 'custNo不能为空!');
                return;
            }
            if (this.checkCustNo < 0) {
                this.showDialog('checkCustno', 'info', true, 'custNo不能为负数!');
                return;
            }
            var _this = this;
            var params = {};
            var url = '/recommendSystem/recommendSystemGroupMgmt/groupConfig/findCustno.ajax';
            params.custNo = this.checkCustNo;
            params.groupId = this.diagroupId;
            $.post({
                url: url,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('checkCustno', 'info', false, result.msg);
                        _this.search();
                    } else {
                        _this.showDialog('checkCustno', 'info', true, '用户不在本分组');
                    }
                }
            });
        },
        showDel: function (item) {
            this.deleteId = item.groupId;
            this.showDialog('', 'del');
        },
        del: function () {
            var _this = this;
            $.post({
                url: '/recommendSystem/recommendSystemGroupMgmt/groupConfig/del.ajax',
                data: {
                    groupId: this.deleteId
                },
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('del', 'info', false, result.msg);
                        _this.search();
                    } else {
                        _this.showDialog('del', 'info', false, result.msg);
                    }
                }
            });
        },
        showFresh: function () {
            this.showDialog('', 'fresh', false);
        },
        fresh: function () {
            var _this = this;
            $.post({
                url: '/recommendSystem/recommendSystemGroupMgmt/groupConfig/fresh.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('', 'info', false, result.msg);
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        showExcelUpload: function (item) {
            $('#uploadFileInputExcel').on('change', function () {
                $('#uploadInputExcel').val($(this).val());
            });
            $('#uploadInputExcel').val('');
            $('#uploadFileInputExcel').val('');
            this.uploadGroupId = item.groupId;
            this.showDialog('', 'uploadExcel', false);
        },
        addExcel: function (item) {
            if (!$('#uploadFileInputExcel').val()) {
                this.showDialog('uploadExcel', 'info', true, '请选择要上传的xlsx文件');
                return false;
            }
            if (!$('#uploadFileInputExcel').get(0).files[0]) {
                this.showDialog('uploadExcel', 'info', true, '未选择文件');
                return;
            }
            if (!(/.\.xlsx$/.test($('#uploadFileInputExcel').get(0).files[0].name))) {
                this.showDialog('uploadExcel', 'info', true, '文件格式错误，请选择xlsx格式的文件');
                return false;
            }
            this.showDialog('uploadExcel');
            this.loadingShow = true;
            $.ajaxFileUpload({
                url: '/recommendSystem/recommendSystemGroupMgmt/groupConfig/uploadExcel.ajax',
                type: 'POST',
                data: {groupId: this.uploadGroupId},
                dataType: 'json',
                fileElementId: 'uploadFileInputExcel',
                success: function (result) {
                    if (result.error === 0) {
                        this.showDialog('', 'info', false, '文件上传成功');
                    } else {
                        this.showDialog('', 'info', true, result.msg);
                    }
                }.bind(this),
                error: function () {
                    this.showDialog('', 'info', true, '网络超时，请稍后重试');
                }.bind(this),
                complete: function () {
                    this.loadingShow = false;
                }.bind(this)
            });
        },
        downloadExcelFile: function () {
            var elt = document.getElementById('data-table');
            var wb = XLSX.utils.table_to_book(elt, {sheet: 'Sheet JS'});
            XLSX.writeFile(wb, '文件上传模板示例.xlsx');
        },
        // 删除客户
        showDelCustomer: function (item) {
            this.delCustomer = '';
            this.diagroupId = item.groupId;
            this.showDialog('', 'delCustno');
        },
        delCustNo: function () {
            if (!this.delCustomer) {
                this.showDialog('delCustno', 'info', true, 'custNo不能为空!');
                return;
            }
            if (this.delCustomer < 0) {
                this.showDialog('delCustno', 'info', true, 'custNo不能为负数!');
                return;
            }
            var _this = this;
            var params = {};
            var url = '/recommendSystem/recommendSystemGroupMgmt/groupConfig/delCustNo.ajax';
            params.custNo = this.delCustomer;
            params.groupId = this.diagroupId;
            $.post({
                url: url,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('delCustno', 'info', false, result.msg);
                        _this.search();
                    } else {
                        _this.showDialog('delCustno', 'info', true, result.msg);
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
