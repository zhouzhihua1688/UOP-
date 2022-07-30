new Vue({
    el: '#content',
    data: {
        // 公共数据
        diaMsg: '',
        // 服务端相关数据
        service: {
            fundId: '',
            tradeType: '00',
            deleteData: '',
            dialog_updateId: '',
            dialog_update_fundId: '',
            dialog_update_fundName: '',
            dialog_update_tradeType: '00',
            dialog_update_strAmt: '',
            dialog_update_endAmt: '',
            dialog_update_fee: '',
            dialog_update_maxFee: '',
            tableData: [],
            pageMaxNum: 10,
            currentIndex: 0,
            maxSpace: 2
        },
        // 本地相关数据
        local: {
            fundId: '',
            tradeType: '',
            operate: '',
            status: '',
            isUpdate: false,
            itemData: '',
            tableData: [],
            dialog_fundId: '',
            dialog_tradeType: '00',
            dialog_detail: [{
                strAmt: '',
                endAmt: '',
                fee: '',
                maxFee: ''
            }],
            dialog_strAmt: '',
            dialog_endAmt: '',
            dialog_fee: '',
            dialog_maxFee: '',
            submitAgain_operate: '',
            submitAgain_fundName: '',
            submitAgain_tradeType: '',
            submitAgain_strAmt: '',
            submitAgain_endAmt: '',
            submitAgain_fee: '',
            submitAgain_maxFee: '',
            pageMaxNum: 10,
            currentIndex: 0,
            maxSpace: 2
        }
    },
    mounted: function () {
        var dialogs = ['info', 'localRevert', 'localSubmit', 'serviceToLocalDelete', 'serviceToLocalUpdate', 'submitAgain'];
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
        var fundArr = ['fundListAdd', 'fundListLocal'];
        fundArr.forEach(function (value) {
            $('#' + value).chosen({
                search_contains: true,
                no_results_text: '未找到相关基金信息',
                disable_search_threshold: 6,
                width: '170px'
            });
        });
        $('#' + 'fundListService').chosen({
            search_contains: true,
            no_results_text: '未找到相关基金信息',
            disable_search_threshold: 6,
            width: '500px'
        });
        var _this = this;
        $('#fundListService').on('change', function (e, params) {
            _this.service.fundId = params ? params.selected : '';
        });
        $('#fundListAdd').on('change', function (e, params) {
            _this.service.dialog_fundId = params ? params.selected : '';
        });
        $('#fundListLocal').on('change', function (e, params) {
            _this.local.fundId = params ? params.selected : '';
        });
        this.getFundList(); // 获取基金列表
        this.searchLocal(); // 获取全部本地数据
    },
    computed: {
        //服务端表格分页
        middleData_service: function () {
            var pageMaxNum = parseInt(this.service.pageMaxNum);
            var tableData = this.service.tableData;
            var middleData = [];
            if (tableData.length <= pageMaxNum) {
                middleData.push(tableData);
                return middleData;
            }
            var i = 0;
            while ((i + 1) * pageMaxNum < tableData.length) {
                middleData.push(tableData.slice(i * pageMaxNum, (i + 1) * pageMaxNum));
                i++;
            }
            middleData.push(tableData.slice(i * pageMaxNum, tableData.length));
            return middleData;
        },
        viewData_service: function () {
            var currentIndex = parseInt(this.service.currentIndex);
            return this.middleData_service[currentIndex];
        },
        pageList_service: function () {
            var middleData = this.middleData_service;
            var currentIndex = this.service.currentIndex;
            var maxSpace = this.service.maxSpace;
            var arr = [];
            if (middleData.length <= 2 * maxSpace) {
                for (var i = 0; i < middleData.length; i++) {
                    arr.push(i + 1);
                }
                return arr;
            }
            if (currentIndex > maxSpace && middleData.length - currentIndex > maxSpace) {
                for (var i = currentIndex - maxSpace; i < currentIndex + maxSpace; i++) {
                    arr.push(i + 1);
                }
            } else if (currentIndex <= maxSpace && middleData.length - currentIndex > maxSpace) {
                for (var i = 0; i < currentIndex + (2 * maxSpace - currentIndex); i++) {
                    arr.push(i + 1);
                }
            } else if (currentIndex > maxSpace && middleData.length - currentIndex <= maxSpace) {
                var space = middleData.length - currentIndex;
                for (var i = currentIndex - (2 * maxSpace - space); i < middleData.length; i++) {
                    arr.push(i + 1);
                }
            } else {
                for (var i = 0; i < middleData.length; i++) {
                    arr.push(i + 1);
                }
            }
            return arr;
        },
        //本地表格分页
        middleData_local: function () {
            var pageMaxNum = parseInt(this.local.pageMaxNum);
            var tableData = this.local.tableData;
            var middleData = [];
            if (tableData.length <= pageMaxNum) {
                middleData.push(tableData);
                return middleData;
            }
            var i = 0;
            while ((i + 1) * pageMaxNum < tableData.length) {
                middleData.push(tableData.slice(i * pageMaxNum, (i + 1) * pageMaxNum));
                i++;
            }
            middleData.push(tableData.slice(i * pageMaxNum, tableData.length));
            return middleData;
        },
        viewData_local: function () {
            var currentIndex = parseInt(this.local.currentIndex);
            return this.middleData_local[currentIndex];
        },
        pageList_local: function () {
            var middleData = this.middleData_local;
            var currentIndex = this.local.currentIndex;
            var maxSpace = this.local.maxSpace;
            var arr = [];
            if (middleData.length <= 2 * maxSpace) {
                for (var i = 0; i < middleData.length; i++) {
                    arr.push(i + 1);
                }
                return arr;
            }
            if (currentIndex > maxSpace && middleData.length - currentIndex > maxSpace) {
                for (var i = currentIndex - maxSpace; i < currentIndex + maxSpace; i++) {
                    arr.push(i + 1);
                }
            } else if (currentIndex <= maxSpace && middleData.length - currentIndex > maxSpace) {
                for (var i = 0; i < currentIndex + (2 * maxSpace - currentIndex); i++) {
                    arr.push(i + 1);
                }
            } else if (currentIndex > maxSpace && middleData.length - currentIndex <= maxSpace) {
                var space = middleData.length - currentIndex;
                for (var i = currentIndex - (2 * maxSpace - space); i < middleData.length; i++) {
                    arr.push(i + 1);
                }
            } else {
                for (var i = 0; i < middleData.length; i++) {
                    arr.push(i + 1);
                }
            }
            return arr;
        }
    },
    watch: {
        'service.pageMaxNum': function () {
            this.service.currentIndex = 0;
        },
        'local.pageMaxNum': function () {
            this.local.currentIndex = 0;
        }
    },
    methods: {
        getFundList: function () {
            var _this = this;
            $.post({
                url: '/businessMgmt/IPOMgmtOC/datumRateHandle/collection.ajax',
                success: function (result) {
                    if (result.error == 0) {
                        var str = '<option value=""></option>';
                        result.data.forEach(function (item) {
                            str += '<option value="' + item.fundId + '">' + item.fundId + ' ' + item.fundName + '</option>';
                        });
                        var fundArr = ['fundListService', 'fundListAdd', 'fundListLocal'];
                        fundArr.forEach(function (value) {
                            $('#' + value).html(value === 'fundListLocal' ? ('<option value="">全部基金</option>' + str) : str);
                            $('#' + value).trigger('chosen:updated');
                        });
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        searchService: function () {
            var fundId = this.service.fundId;
            var tradeType = this.service.tradeType;
            if (!fundId) {
                this.showDialog('', 'info', false, '请选择要查询的基金');
                return;
            }
            if (!tradeType) {
                this.showDialog('', 'info', false, '请选择业务类型');
                return;
            }
            var _this = this;
            $.post({
                url: '/businessMgmt/IPOMgmtOC/datumRateHandle/queryFeeList.ajax',
                data: {
                    fundId: fundId,
                    tradeType: tradeType,
                },
                success: function (result) {
                    if (result.error == 0) {
                        _this.service.currentIndex = 0;
                        _this.service.tableData = result.data;
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        searchLocal: function () {
            var fundId = this.local.fundId;
            var tradeType = this.local.tradeType;
            var operate = this.local.operate;
            var status = this.local.status;
            var _this = this;
            var params = {
                fundId: fundId,
                tradeType: tradeType,
                operate: operate,
                status: status
            };
            $.post({
                url: '/businessMgmt/IPOMgmtOC/datumRateHandle/getLocalList.ajax',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        _this.local.currentIndex = 0;
                        _this.local.tableData = result.data;
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        showServiceToLocalDelete: function (item) {
            this.service.deleteData = JSON.stringify(item);
            this.showDialog('', 'serviceToLocalDelete', false);
        },
        serviceToLocalDelete: function () {
            var _this = this;
            var deleteData = JSON.parse(_this.service.deleteData);
            var content = {
                fundId: deleteData.fundId,
                fundName: deleteData.fundId + ' ' + deleteData.fundName,
                tradeType: deleteData.tradeType,
                strAmt: deleteData.strAmt,
                endAmt: deleteData.endAmt,
                fee: deleteData.fee,
                maxFee: deleteData.maxFee
            };
            var service_id = deleteData.serialNo;
            $.post({
                url: '/businessMgmt/IPOMgmtOC/datumRateHandle/serviceToLocalDelete.ajax',
                data: {
                    service_id: service_id,
                    content: JSON.stringify(content)
                },
                success: function (result) {
                    if (result.error == 0) {
                        _this.showDialog('serviceToLocalDelete', 'info', false, '已提交至本地数据');
                        _this.searchLocal();
                    }
                    else {
                        _this.showDialog('serviceToLocalDelete', 'info', false, result.msg);
                    }
                }
            });
        },
        showServiceToLocalUpdate: function (item) {
            this.service.dialog_updateId = item.serialNo;
            this.service.dialog_update_fundId = item.fundId;
            this.service.dialog_update_fundName = item.fundName;
            this.service.dialog_update_tradeType = item.tradeType;
            this.service.dialog_update_strAmt = item.strAmt;
            this.service.dialog_update_endAmt = item.endAmt;
            this.service.dialog_update_fee = item.fee;
            this.service.dialog_update_maxFee = item.maxFee;
            this.showDialog('', 'serviceToLocalUpdate', false);
        },
        serviceToLocalUpdate: function () {
            var _this = this;
            var content = {
                fundId: this.service.dialog_update_fundId,
                fundName: this.service.dialog_update_fundId + ' ' + this.service.dialog_update_fundName,
                tradeType: this.service.dialog_update_tradeType,
                strAmt: this.service.dialog_update_strAmt,
                endAmt: this.service.dialog_update_endAmt,
                fee: this.service.dialog_update_fee,
                maxFee: this.service.dialog_update_maxFee
            };
            var service_id = this.service.dialog_updateId;
            $.post({
                url: '/businessMgmt/IPOMgmtOC/datumRateHandle/serviceToLocalUpdate.ajax',
                data: {
                    service_id: service_id,
                    content: JSON.stringify(content)
                },
                success: function (result) {
                    if (result.error == 0) {
                        _this.showDialog('serviceToLocalUpdate', 'info', false, '已提交至本地数据');
                        _this.searchLocal();
                    }
                    else {
                        _this.showDialog('serviceToLocalUpdate', 'info', false, result.msg);
                    }
                }
            });
        },
        showAddLocal: function () {
            this.local.isUpdate = false;
            this.local.itemData = '';
            $('#fundListAdd').val('');
            $('#fundListAdd').trigger('chosen:updated');
            this.local.dialog_tradeType = '00';
            this.local.dialog_strAmt = '';
            this.local.dialog_endAmt = '';
            this.local.dialog_fee = '';
            this.local.dialog_maxFee = '';
            this.local.dialog_detail = [{
                strAmt: '',
                endAmt: '',
                fee: '',
                maxFee: ''
            }];
            this.showDialog('', 'addLocal');
        },
        showLocalUpdate: function (item) {
            this.local.isUpdate = true;
            this.local.itemData = JSON.stringify(item);
            $('#fundListAdd').val(item.fundId);
            $('#fundListAdd').trigger('chosen:updated');
            this.local.dialog_tradeType = item.tradeType;
            this.local.dialog_strAmt = item.strAmt;
            this.local.dialog_endAmt = item.endAmt;
            this.local.dialog_fee = item.fee;
            this.local.dialog_maxFee = item.maxFee;
            this.showDialog('', 'addLocal');
        },
        checkAddDialog: function () {
            var isUpdate = this.local.isUpdate;
            var dialog_fundId = $('#fundListAdd').val();
            var dialog_tradeType = this.local.dialog_tradeType;
            var dialog_strAmt = this.local.dialog_strAmt;
            var dialog_endAmt = this.local.dialog_endAmt;
            var dialog_fee = this.local.dialog_fee;
            var dialog_maxFee = this.local.dialog_maxFee;
            if (!dialog_fundId) {
                this.showDialog('addLocal', 'info', true, '未选择基金');
                return false;
            }
            if (!dialog_tradeType) {
                this.showDialog('addLocal', 'info', true, '未选择业务类型');
                return false;
            }
            if (isUpdate && (!dialog_strAmt || isNaN(Number(dialog_strAmt)))) {
                this.showDialog('addLocal', 'info', true, '未填写起始金额或起始金额不合法');
                return false;
            }
            if (isUpdate && (!dialog_endAmt || isNaN(Number(dialog_endAmt)))) {
                this.showDialog('addLocal', 'info', true, '未填写最大金额或最大金额不合法');
                return false;
            }
            if (isUpdate && (!dialog_fee || isNaN(Number(dialog_fee)))) {
                this.showDialog('addLocal', 'info', true, '未填写基准费率或基准费率不合法');
                return false;
            }
            if (isUpdate && (!dialog_maxFee || isNaN(Number(dialog_maxFee)))) {
                this.showDialog('addLocal', 'info', true, '未填写最大收费额或最大收费额不合法');
                return false;
            }
            if (!isUpdate && this.local.dialog_detail.length === 0) {
                this.showDialog('addLocal', 'info', true, '未填写费率相关信息');
                return false;
            }
            if (!isUpdate && this.local.dialog_detail.length > 0) {
                for (var i = 0; i < this.local.dialog_detail.length; i++) {
                    for (var prop in this.local.dialog_detail[i]) {
                        if (!this.local.dialog_detail[i][prop] || isNaN(Number(this.local.dialog_detail[i][prop]))) {
                            this.showDialog('addLocal', 'info', true, '列表中存在不合法数据');
                            return false;
                        }
                    }
                }
            }
            return true;
        },
        addLocal: function () {
            if (!this.checkAddDialog()) {
                return;
            }
            var params = {
                fundId: $('#fundListAdd').val(),
                fundName: $('#fundListAdd_chosen .chosen-single').text(),
                tradeType: this.local.dialog_tradeType
            };
            var url = '';
            if (this.local.isUpdate) {
                url = '/businessMgmt/IPOMgmtOC/datumRateHandle/updateLocalData.ajax';
                params.strAmt = this.local.dialog_strAmt;
                params.endAmt = this.local.dialog_endAmt;
                params.fee = this.local.dialog_fee;
                params.maxFee = this.local.dialog_maxFee;
                var itemData = JSON.parse(this.local.itemData);
                params.local_id = itemData.local_id;
                params.updateTime = itemData.updateTime;
            }
            else {
                url = '/businessMgmt/IPOMgmtOC/datumRateHandle/addLocalData.ajax';
                params.detail = JSON.stringify(this.local.dialog_detail);
            }
            var _this = this;
            $.post({
                url: url,
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        _this.showDialog('addLocal', 'info', false, '操作成功');
                        _this.searchLocal();
                    }
                    else {
                        _this.showDialog('addLocal', 'info', true, result.msg);
                    }
                }
            });
        },
        showRevert: function (item) {
            this.local.itemData = JSON.stringify(item);
            this.showDialog('', 'localRevert', false);
        },
        revert: function () {
            var _this = this;
            $.post({
                url: '/businessMgmt/IPOMgmtOC/datumRateHandle/revertLocalData.ajax',
                data: JSON.parse(_this.local.itemData),
                success: function (result) {
                    if (result.error == 0) {
                        _this.showDialog('localRevert', 'info', false, '撤销成功');
                        _this.searchLocal();
                    }
                    else {
                        _this.showDialog('localRevert', 'info', true, result.msg);
                    }
                }
            });
        },
        showSubmit: function (item) {
            this.local.isUpdate = false;
            this.local.itemData = JSON.stringify(item);
            $('#fundListAdd').val('');
            $('#fundListAdd').trigger('chosen:updated');
            this.local.dialog_tradeType = '00';
            this.local.dialog_strAmt = '';
            this.local.dialog_endAmt = '';
            this.local.dialog_fee = '';
            this.local.dialog_maxFee = '';
            this.showDialog('', 'localSubmit', false);
        },
        submit: function () {
            var _this = this;
            $.post({
                url: '/businessMgmt/IPOMgmtOC/datumRateHandle/submitLocalData.ajax',
                data: JSON.parse(_this.local.itemData),
                success: function (result) {
                    if (result.error == 0) {
                        _this.showDialog('localSubmit', 'info', false, '提交成功');
                        _this.searchLocal();
                    }
                    else {
                        _this.showDialog('localSubmit', 'info', true, result.msg);
                    }
                }
            });
        },
        showSubmitAgain: function (item) {
            this.local.itemData = JSON.stringify(item);
            this.local.submitAgain_operate = item.operate;
            this.local.submitAgain_fundName = item.fundName;
            this.local.submitAgain_tradeType = item.tradeType;
            this.local.submitAgain_strAmt = item.strAmt;
            this.local.submitAgain_endAmt = item.endAmt;
            this.local.submitAgain_fee = item.fee;
            this.local.submitAgain_maxFee = item.maxFee;
            this.showDialog('', 'submitAgain');
        },
        submitAgain: function () {
            var dialog_strAmt = this.local.submitAgain_strAmt;
            var dialog_endAmt = this.local.submitAgain_endAmt;
            var dialog_fee = this.local.submitAgain_fee;
            var dialog_maxFee = this.local.submitAgain_maxFee;
            if (!dialog_strAmt || isNaN(Number(dialog_strAmt))) {
                this.showDialog('submitAgain', 'info', true, '未填写起始金额或起始金额不合法');
                return false;
            }
            if (!dialog_endAmt || isNaN(Number(dialog_endAmt))) {
                this.showDialog('submitAgain', 'info', true, '未填写最大金额或最大金额不合法');
                return false;
            }
            if (!dialog_fee || isNaN(Number(dialog_fee))) {
                this.showDialog('submitAgain', 'info', true, '未填写基准费率或基准费率不合法');
                return false;
            }
            if (!dialog_maxFee || isNaN(Number(dialog_maxFee))) {
                this.showDialog('submitAgain', 'info', true, '未填写最大收费额或最大收费额不合法');
                return false;
            }
            var _this = this;
            var params = JSON.parse(_this.local.itemData);
            params.strAmt = dialog_strAmt;
            params.endAmt = dialog_endAmt;
            params.fee = dialog_fee;
            params.maxFee = dialog_maxFee;
            $.post({
                url: '/businessMgmt/IPOMgmtOC/datumRateHandle/submitLocalDataAgain.ajax',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        _this.showDialog('submitAgain', 'info', false, '提交成功');
                        _this.searchLocal();
                    }
                    else {
                        _this.showDialog('submitAgain', 'info', true, result.msg);
                    }
                }
            });
        },
        addRow: function () {
            this.local.dialog_detail.push({
                strAmt: '',
                endAmt: '',
                fee: '',
                maxFee: ''
            });
        },
        deleteRow: function (index) {
            this.local.dialog_detail.splice(index, 1);
        },
        showDialog: function (dia1, dia2, callback, msg) {
            this.diaMsg = msg ? msg : '输入条件错误';
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
        prev: function (tabIndex) {
            var tabName = tabIndex == 1 ? 'service' : 'local';
            if (this[tabName].currentIndex <= 0) {
                this[tabName].currentIndex = 0;
            }
            else {
                this[tabName].currentIndex--;
            }
        },
        next: function (tabIndex) {
            var tabName = tabIndex == 1 ? 'service' : 'local';
            if (this[tabName].currentIndex >= this['middleData_' + tabName].length - 1) {
                this[tabName].currentIndex = this['middleData_' + tabName].length - 1;
            }
            else {
                this[tabName].currentIndex++;
            }
        },
        changeIndex: function (index, tabIndex) {
            var tabName = tabIndex == 1 ? 'service' : 'local';
            this[tabName].currentIndex = index - 1;
        },
        toFirst: function (tabIndex) {
            var tabName = tabIndex == 1 ? 'service' : 'local';
            this[tabName].currentIndex = 0;
        },
        toLast: function (tabIndex) {
            var tabName = tabIndex == 1 ? 'service' : 'local';
            this[tabName].currentIndex = this['middleData_' + tabName].length - 1;
        }
    }
});


