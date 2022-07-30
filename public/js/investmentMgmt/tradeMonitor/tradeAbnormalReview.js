var vm = new Vue({
    el: '#content',
    data: {
        diaMsg: '',
        groupList: [],
        fundList: [],
        // 复核驳回
        remark: '',
        itemData: {},
        
        // 服务端相关数据
        service: {
            groupId: '',
            fundId: '',
            transactionDate: '',
            status: '',
            // 表格数据
            tableData: [],
            pageMaxNum: 10,
            currentIndex: 0,
            maxSpace: 5
        },
        // 本地相关数据
        local: {
            groupId: '',
            fundId: '',
            transactionDate: '',
            status: '2',   //默认显示待复核
            // 表格数据
            tableData: [],
            pageMaxNum: 10,
            currentIndex: 0,
            maxSpace: 5
        }
    },
    mounted: function () {
        var dialogs = ['info', 'reviewReject'];
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
        var fundArr = ['groupIdForLocalSearch', 'groupIdForServiceSearch'];
        fundArr.forEach(function (value) {
            $('#' + value).chosen({
                search_contains: true,
                no_results_text: '未找到相关基金信息',
                disable_search_threshold: 6,
                width: '170px'
            });
        });
        $('#groupIdForLocalSearch').on('change', function (e, params) {
            this.local.groupId = params ? params.selected : '';
        }.bind(this));
        $('#groupIdForServiceSearch').on('change', function (e, params) {
            this.service.groupId = params ? params.selected : '';
        }.bind(this));
        this.getGroupList()
        this.searchLocal();
        // this.searchService();   //默认展示已生效数据tab
        $('.nav-tabs li a').click();
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
        },

        //选择基金数据过滤
        filterFundList: function () {
            var filterData = [];
            var _this = this;
            this.fundList.forEach(function (item) {
                if(item.fundName) {
                    if (item.fundId.indexOf(_this.diaSearchFundId) > -1 && item.fundName.indexOf(_this.diaSearchFundName) > -1) {
                        filterData.push(item);
                    }
                }
            });
            return filterData;
        },
        filterFundList2: function () {
            var filterData = [];
            var _this = this;
            var ArrName=[]
            this.fundHistoryList.forEach(function (item) {
                ArrName.push(item.fundName)
                // 过滤没有基金名字
                if(item.fundName){
                    if (item.fundId.indexOf(_this.diaSearchFundId) > -1 && item.fundName.indexOf(_this.diaSearchFundName) > -1) {
                        filterData.push(item);
                    }
                }
            });
            return filterData;
        },
    },
    watch: {
        // 'service.pageMaxNum': function () {
        //     this.service.currentIndex = 0;
        // },
        'local.pageMaxNum': function () {
            this.local.currentIndex = 0;
        }
    },
    methods: {
        // table切换
        // tabToogle:function(val){
        //     if(val==='local'){
        //         this.searchLocal();
        //     }else{
        //         this.searchService();
        //     }
        // },
        // 组合下拉框选择
        getGroupList: function(){
            $.post({
                url: '/investmentMgmt/tradeMonitor/tradeAbnormalReview/getGroupList.ajax',
                success: function(result) {
                    if (result.error === 0) {
                        this.groupList = result.data.body;
                        var str = '';
                        var filterList=[];
                        filterList=result.data.body.filter((item)=>{
                            return item.isInvestment=='Y'
                        });
                        filterList.sort((a,b)=>a.groupId.replace('A','')-b.groupId.replace('A',''));
                        filterList.forEach(function(item) {
                            str += '<option value="' + item.groupId + '">' + item.groupId + '-' + item.groupName + '</option>';
                        });
                        $('#groupIdForLocalSearch').html('<option value=""></option>' + str);
                        $('#groupIdForServiceSearch').html('<option value=""></option>' + str);
                        $('#groupIdForLocalSearch').trigger('chosen:updated');
                        $('#groupIdForServiceSearch').trigger('chosen:updated');
                        
                        // this.$nextTick(()=>{
                        //     this.local.groupId='A6101';
                        // })
                        
                    }
                }.bind(this)
            });
        },

        // 查询服务端数据
        // searchService: function () {
        //     // if(!this.service.transactionDate){
        //     //     return this.showDialog('','info','请填写申请日期');
        //     // }
        //     var params = {};
        //     this.service.groupId && (params.groupId = this.service.groupId);
        //     this.service.fundId && (params.fundId = this.service.fundId);
        //     this.service.transactionDate && (params.transactionDate = this.service.transactionDate.replace(/-/g,''));
        //     $.post({
        //         url: '/investmentMgmt/tradeMonitor/tradeAbnormalReview/getServiceList.ajax',
        //         data: params,
        //         success: function (result) {
        //             if (result.error == 0) {
        //                 if(result.data.length === 0){
        //                     return this.showDialog('', 'info', false, '暂无可撤单记录');
        //                 }
        //                 this.service.currentIndex = 0;
        //                 this.service.tableData = result.data;
        //             }
        //             else {
        //                 this.showDialog('', 'info', false, result.msg);
        //             }
        //         }.bind(this)
        //     });
        // },
        // 查询经办数据
        searchLocal: function () {
            var params = {
                groupId: this.local.groupId,
                fundId: this.local.fundId,
                transactionDate: this.local.transactionDate.replace(/-/g,''),
                status: this.local.status
            };
            $.post({
                url: '/investmentMgmt/tradeMonitor/tradeAbnormalReview/getLocalList.ajax',
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
        showReviewReject: function (item) {
            this.itemData = item;
            this.remark = '';
            this.showDialog('', 'reviewReject', false);
        },
        reviewReject: function () {
            var params = {};
            params.itemData = JSON.stringify(this.itemData);
            params.remark = this.remark;
            $.post({
                url: '/investmentMgmt/tradeMonitor/tradeAbnormalReview/reviewReject.ajax',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        this.showDialog('reviewReject', 'info', false, '已成功驳回');
                        this.searchLocal();
                    }
                    else {
                        this.showDialog('reviewReject', 'info', true, result.msg);
                    }
                }.bind(this)
            });
        },
        reviewAccept: function (item) {
            var params = {};
            params.itemData = JSON.stringify(item);
            $.post({
                url: '/investmentMgmt/tradeMonitor/tradeAbnormalReview/reviewAccept.ajax',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        this.showDialog('', 'info', false, '已成功通过');
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
        filterStatus: function(value){
            // if(value == 'TS'){
            //     return '受理成功';
            // }
            value = '待增补';
            return value;
        },
        // 类型状态
        fundTypeForFundgroup: function (value) {
            var obj = {
                "V": "货币类",
                "R": "权益类",
                "F": "固收类",
                "O": "其他",
            }
            if (obj[value]) {
                return obj[value];
            }
            return value;
        },
    },
    components: {
        'date-picker': VueBootstrapDatetimePicker
    }
});


