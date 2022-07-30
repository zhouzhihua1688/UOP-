var vm = new Vue({
    el: '#content',
    data: {
        diaMsg: '',
        fundList: [],
        service: {
            invNm: '',
            idNo: '',
            fundId: '',
            apDt: '',
            // 表格数据
            tableData: [],
            pageMaxNum: 10,
            currentIndex: 0,
            maxSpace: 2
        },
        // 本地相关数据
        local: {
            serialNo: '',
            fundId: '',
            apDt: '',
            status: '',
            // 表格数据
            tableData: [],
            pageMaxNum: 10,
            currentIndex: 0,
            maxSpace: 2
        }
    },
    mounted: function () {
        var dialogs = ['info', 'localRevert', 'submitAgainCancel', 'serviceToLocalCancel'];
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
        var fundArr = ['fundIdForLocalSearch', 'fundIdForServiceSearch'];
        fundArr.forEach(function (value) {
            $('#' + value).chosen({
                search_contains: true,
                no_results_text: '未找到相关基金信息',
                disable_search_threshold: 6,
                width: '170px'
            });
        });
        $('#fundIdForLocalSearch').on('change', function (e, params) {
            this.local.fundId = params ? params.selected : '';
        }.bind(this));
        $('#fundIdForServiceSearch').on('change', function (e, params) {
            this.service.fundId = params ? params.selected : '';
        }.bind(this));
        this.getFundList()
        this.searchLocal();
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
        getFundList: function(){
            $.post({
                url: '/businessMgmt/highFinancialMgmt/vipCancelHandle/getFundList.ajax',
                success: function(result) {
                    if (result.error === 0) {
                        var str = '';
                        result.data.forEach(function(item) {
                            str += '<option value="' + item.fundId + '">' + item.fundId + '-' + item.fundName + '</option>';
                        });
                        $('#fundIdForLocalSearch').html('<option value=""></option>' + str);
                        $('#fundIdForServiceSearch').html('<option value=""></option>' + str);
                        $('#fundIdForLocalSearch').trigger('chosen:updated');
                        $('#fundIdForServiceSearch').trigger('chosen:updated');
                    }
                }.bind(this)
            });
        },
        searchService: function () {
            if(!this.service.invNm){
                return this.showDialog('','info','请填写客户姓名');
            }
            if(!this.service.idNo){
                return this.showDialog('','info','请填写证件号码');
            }
            if(!this.service.fundId){
                return this.showDialog('','info','请选择基金');
            }
            if(!this.service.apDt){
                return this.showDialog('','info','请填写申请日期');
            }
            var params = {};
            params.invNm = this.service.invNm;
            params.idNo = this.service.idNo;
            params.fundId = this.service.fundId;
            params.apDt = this.service.apDt.replace(/-/g,'');
            $.post({
                url: '/businessMgmt/highFinancialMgmt/vipCancelHandle/getServiceList.ajax',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        if(result.data.length === 0){
                            return this.showDialog('', 'info', false, '暂无可撤单记录');
                        }
                        this.service.currentIndex = 0;
                        this.service.tableData = result.data;
                    }
                    else {
                        this.showDialog('', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },
        serviceToLocalCancel: function (item) {
            var content = item;
            var service_id = item.serialNo;
            $.post({
                url: '/businessMgmt/highFinancialMgmt/vipCancelHandle/serviceToLocalCancel.ajax',
                data: {
                    service_id: service_id,
                    content: JSON.stringify(content)
                },
                success: function (result) {
                    if (result.error == 0) {
                        this.showDialog('', 'info', false, '已提交至经办数据');
                        this.searchLocal();
                    }
                    else {
                        this.showDialog('', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },
        searchLocal: function () {
            var params = {
                serialNo: this.local.serialNo,
                fundId: this.local.fundId,
                apDt: this.local.apDt.replace(/-/g,''),
                status: this.local.status
            };
            $.post({
                url: '/businessMgmt/highFinancialMgmt/vipCancelHandle/getLocalList.ajax',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        this.local.currentIndex = 0;
                        this.local.tableData = result.data;
                    }
                    else {
                        this.showDialog('', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },
        revert: function (item) {
            var params = {
                local_id: item.local_id,
                updateTime: item.updateTime
            };
            $.post({
                url: '/businessMgmt/highFinancialMgmt/vipCancelHandle/revertLocalData.ajax',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        this.showDialog('', 'info', false, '撤销成功');
                        this.searchLocal();
                    }
                    else {
                        this.showDialog('', 'info', false, result.msg);
                    }
                }.bind(this)
            });
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
    },
    filters: {
        filterApkind: function (value) {
            if(value == 920){
                return '认购';
            }
            if(value == 950){
                return '申购';
            }
            return value;
        },
        filterStatus: function(value){
            if(value == 'TS'){
                return '受理成功';
            }
            return value;
        }
    },
    components: {
        'date-picker': VueBootstrapDatetimePicker
    }
});


