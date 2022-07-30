var vm = new Vue({
    el: '#content',
    data: {
        diaMsg: '',
        groupList: [],
        fundList: [],
        // 新增/修改/删除
        updateId: '',
		deleteId: '',
        // 调仓弹窗
        selectedItem: {},
        fundHistory: [],
        fundHistoryList: [],  //历史调仓所有基金
        diaSearchFundId: '',
        diaSearchFundName: '',
        checkTradeList:[],   //验证外部基金渠道和交易状态信息
        
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
        var dialogs = ['info', 'localRevert', 'submitAgainCancel', 'saveDataToLocal'];
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
        this.searchService();   //默认展示已生效数据tab
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
        'service.pageMaxNum': function () {
            this.service.currentIndex = 0;
        },
        'local.pageMaxNum': function () {
            this.local.currentIndex = 0;
        }
    },
    methods: {
        // 组合下拉框选择
        getGroupList: function(){
            $.post({
                url: '/investmentMgmt/tradeMonitor/tradeAbnormalHandle/getGroupList.ajax',
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
        // 增补操作
        coverAction: function(item){
            console.log('coverAction item=', item);
            this.updateId = '';
            this.selectedItem = item;
            this.fundHistory = [];
            this.addFundHistory(item.groupId);
        },
        // 修改补仓
        coverModify: function(item){
            console.log('coverModify item=', item);
            this.updateId = item.local_id;
            this.selectedItem = item;
            this.fundHistory = item.content.coverFund || [];
            this.addFundHistory(item.content.groupId);
        },
        // 历史调仓添加调仓基金
        addFundHistory: function (groupId) {
            console.log('addFundHistory this.fundHistory=', this.fundHistory);
            var _this = this;
            _this.fundHistoryList=[];
            var fundDetails = this.fundHistory.map(function (item) {
                return {
                    fundId: item.fundId,
                    fundName: item.fundName,
                    fundPercent: item.fundPercent,
                    optionalFundList: item.optionalFundList,
                    source:item.source,
                    channelList:item.channelList,
                    isUnderlyingCurrency:item.isUnderlyingCurrency
                };
            });
            if (_this.fundHistoryList.length === 0) {
                $.post({
                    url: '/investmentMgmt/investmentStrategy/combinationProductHandle/fundList.ajax',
                    data:{groupId:groupId},
                    success: function (result) {
                        if (result.error === 0) {
                            _this.fundHistoryList = result.data.body
                            _this.historyListCheckStatus(fundDetails, _this.fundHistoryList);
                            _this.showDialog('', 'addFundHistory', false);
                            // _this.fundAllIdList(_this.fundHistoryList);
                        } else {
                            _this.fundHistoryList = [];
                            _this.showDialog('', 'addFundHistory', true, result.msg);

                        }
                    }
                });
            } else {
                _this.historyListCheckStatus(fundDetails, _this.fundHistoryList);
                _this.showDialog('', 'addFundHistory', false);
            }
            if (this.fundHistory == null) {
                return
            } else {
                this.fundHistory.forEach(function (item) {
                    for (var i = 0; i < _this.fundHistoryList.length; i++) {
                        if (item.fundId === _this.fundHistoryList[i].fundId) {
                            _this.fundHistoryList[i].check = true;
                            break;
                        }
                    }
                });
            }
        },
        historyListCheckStatus: function (fundDetails, list) {
            list.forEach(function (item) {
                item.fundPercent = '',
                    item.check = false;
            });
            fundDetails.forEach(function (item) {
                for (var i = 0; i < list.length; i++) {
                    if (item.fundId === list[i].fundId) {
                        list[i].check = true;
                        list[i].fundPercent = item.fundPercent;
                        break;
                    }
                }
            });
            if (this.fundHistory == null) {
                return
            } else {
                this.fundHistory.forEach(function (item) {
                    for (var i = 0; i < list.length; i++) {
                        if (item.fundId === list[i].fundId) {
                            list[i].check = true;
                            break;
                        }
                    }
                });
            }
        },
        // 提交
        checkList2: function () {
            var _this = this;
            var hasfundHistory=this.fundHistory;
            this.fundHistory = this.fundHistoryList.filter(function (item) {
                return item.check;
            }).map(function (item) {
                return {
                    fundId: item.fundId,
                    fundName: item.fundName,
                    fundApkind: item.fundApkind || item.fundTypeForFundgroup,
                    fundPercent: item.fundPercent,
                    optionalFundList: item.optionalFundList,
                    source:item.source,
                    channelList:item.channelList,
                    isUnderlyingCurrency:'N'
                };
            });
            if(hasfundHistory.length>0){
                this.fundHistory.forEach(function(item){
                    hasfundHistory.forEach(function(citem){
                        if(item.fundId == citem.fundId){
                            item.isUnderlyingCurrency = citem.isUnderlyingCurrency
                        }
                    })
                })
            }
            if (this.fundHistory.length === 0) {
                this.showDialog('addFundHistory', 'info', true, '未选择任何数据');
                return;
            }
            if (this.fundHistory.length > 1) {
                this.showDialog('addFundHistory', 'info', true, '仅可以选择一只基金补仓，请先删除原有补仓基金');
                return;
            }
            this.size2 = this.fundHistory.length;
            // this.showDialog('addFundHistory', 'add', false);
            
            if(this.updateId){
                // 修改补仓
                this.selectedItem.content && (this.selectedItem.content.coverFund = this.fundHistory);
            } else {
                // 增补操作
                this.selectedItem.coverFund = this.fundHistory;
            }

            this.saveDataToLocal();
        },
        // 查询基金状态是不是暂停交易,暂停赎回,暂停申购
        fundAllIdList:function(itemFundIdList,source,channelList,num,index){
            var _this=this;
            // var fundIdLists=[]
            // itemFundIdList.forEach(function(item){
            //     fundIdLists.push(item.fundId)
            // })
            let params = {}
            // if(source==2){
            //     params.fundIdList = itemFundIdList;
            //     params.sourceType = channelList[0];
            // }else{
            params.fundIdList = itemFundIdList;
            params.sourceType ="";
            // }
            console.log(params)
            $.post({
                url: '/investmentMgmt/investmentStrategy/combinationProductHandle/fundIdLists.ajax',
                data:params,
                success: function (result) {
                    if (result.error === 0) {
                        // _this.fundIdList=result.data;
                        result.data.forEach(function(item){
                            if(num=="0"&&(item.canBePurchased=="N"||item.canBeRedemed=="N"||item.canBePurchased==null||item.canBeRedemed==null)){
                                _this.filterFundList2[index].check=false;
                                return _this.showDialog('addFundHistory', 'info', true, "基金"+itemFundIdList+"(是暂停交易 或暂停申购 或暂停赎回),不能选择添加,请取消勾选!");
                            }
                            if(num=="1"&&(item.canBePurchased=="N"||item.canBeRedemed=="N"||item.canBePurchased==null||item.canBeRedemed==null)){
                                _this.filterFundList[index].check=false;
                                return _this.showDialog('addFund', 'info', true, "基金"+itemFundIdList+"(是暂停交易 或暂停申购 或暂停赎回),不能选择添加,请取消勾选!");
                            }
                            if(num=="2"&&(item.canBePurchased=="N"||item.canBeRedemed=="N"||item.canBePurchased==null||item.canBeRedemed==null)){
                                _this.filterFundList3[index].check=false;
                                return _this.showDialog('muchFundHistory', 'info', true, "基金"+itemFundIdList+"(是暂停交易 或暂停申购 或暂停赎回),不能选择添加,请取消勾选!");
                            }
                        })
                    }
                    else {
                        _this.tableData = [];
                        _this.showDialog('addFundHistory', 'info', false, result.msg);                    }
                }
            });
        },
        // 单选
        single: function (index) {
            var _this = this;
            var fundgroupType=this.fundgroupType;   //判断有关类型 用作外部基金是不是可以选择。
            console.log("fundgroupType",fundgroupType);

            // index.check = !index.check;
            // var hasCheck = true;
            // ids=this.filterFundList2[index].fundId
            if (_this.filterFundList2[index].fundId&&!_this.filterFundList2[index].check) {
                ids = this.filterFundList2[index].fundId;
                source=this.filterFundList2[index].source;//代表基金来源类型
                channelList=_this.filterFundList2[index].channelList;
                if(source==2){
                    _this.checkNav(ids,source,channelList,fundgroupType,index);
                }else{
                    _this.checkNav(ids,source,"","",index);
                }
            }
        },
        // 验证基金有没有净值
        checkNav: function (ids,source,channelList,fundgroupType,index) {
            var _this = this;
            console.log("ids",ids)
            console.log("source",source)  //代表基金类型
            console.log("channelList",channelList)  //代表基金来源
            console.log("fundgroupType",fundgroupType)  //代表基金来源
            $.post({
                url: '/investmentMgmt/investmentStrategy/combinationProductHandle/navList.ajax',
                data: {ids: ids},
                success: function (result) {
                    if (result.error === 0) {
                        if(result.data.body[0]){
                            // if(source==2){   //当为外部基金，调用查询验证是不是有渠道信息和交易状态
                            $.post({
                                url: '/investmentMgmt/investmentStrategy/combinationProductHandle/checkTradeStatus.ajax',
                                data: {ids:ids},
                                success: function (result) {
                                    if (result.error === 0) {

                                        if (result.data.body.length===0) {// 无渠道信息，默认不可选
                                            _this.filterFundList2[index].check=false;
                                            return _this.showDialog('addFundHistory', 'info', true, "该基金"+ids+"不可选!");
                                        }
                                        if(source==1){
                                            _this.fundAllIdList(ids,source,channelList,0,index);
                                            _this.checkTradeList=result.data.body;
                                            return;
                                        }
                                        let list=result.data.body;
                                            if(list.every(item => item.purchase === 'Y' && item.redeem === 'Y')){
                                                // _this.fundAllIdList(ids,source,channelList,0,index);
                                                _this.checkTradeList=result.data.body;
                                                console.log("---",_this.checkTradeList)
                                            }else{
                                                _this.filterFundList2[index].check=false;
                                                _this.checkTradeList=result.data.body;
                                                console.log("~~~",_this.checkTradeList)
                                                return _this.showDialog('addFundHistory', 'info', true, "该基金"+ids+"目前不可正常交易!");
                                            }
                                        // 20210730 S 暂时去掉选择check
                                        // if(source==2&&[13, 14, 15, 16, 17].includes(Number(fundgroupType))){   // 当组合类型为13,14,15,16,17时在同花顺和盈米渠道同时可售才可选择
                                        //     let list=result.data.body.filter(filterItem => filterItem.sourceType === '307' || filterItem.sourceType === '378');
                                        //     if(list.length>=2&&list.every(item => item.purchase === 'Y' && item.redeem === 'Y')){
                                        //         // _this.fundAllIdList(ids,source,channelList,0,index);
                                        //         _this.checkTradeList=result.data.body;
                                        //         console.log("---",_this.checkTradeList)
                                        //     }else{
                                        //         _this.filterFundList2[index].check=false;
                                        //         _this.checkTradeList=result.data.body;
                                        //         console.log("~~~",_this.checkTradeList)
                                        //         return _this.showDialog('addFundHistory', 'info', true, "该基金"+ids+"在该组合类型下不可选!");
                                        //     }
                                        // }else{
                                            _this.checkTradeList=result.data.body;
                                        //     // _this.fundAllIdList(ids,source,channelList,0,index);
                                        // }
                                        // 20210730 E 暂时去掉选择check

                                    } else {
                                        _this.showDialog('addFundHistory', 'info', true, "该基金"+ids+"不可选!");
                                    }
                                }
                            });

                            // }
                            // else{
                            //     _this.fundAllIdList(ids,source,channelList,0,index);
                            // }


                            // if(source==2&&channelList==""){
                            //     _this.filterFundList2[index].check=false;
                            //     return _this.showDialog('addFundHistory', 'info', true, "该基金"+ids+"不在交易状态,请取消勾选!");
                            // }else if(source==1){
                            //     _this.fundAllIdList(ids,source,channelList,0,index);
                            // }else{
                            //     _this.fundAllIdList(ids,source,channelList,0,index);
                            // }
                        }else{
                            _this.filterFundList2[index].check=false;
                            return _this.showDialog('addFundHistory', 'info', true, "该基金"+ids+"无净值,不能选择添加,请取消勾选!");
                        }
                        if (!result.data.body || result.data.body.nav == "") {

                           
                        }
                    } else {
                        _this.showDialog('addFundHistory', 'info', true, "该基金"+ids+"无净值,不能选择添加,请取消勾选!");
                    }
                }
            });
        },


        // 查询服务端数据
        searchService: function () {
            // if(!this.service.transactionDate){
            //     return this.showDialog('','info','请填写申请日期');
            // }
            var params = {};
            this.service.groupId && (params.groupId = this.service.groupId);
            this.service.fundId && (params.fundId = this.service.fundId);
            this.service.transactionDate && (params.transactionDate = this.service.transactionDate.replace(/-/g,''));
            $.post({
                url: '/investmentMgmt/tradeMonitor/tradeAbnormalHandle/getServiceList.ajax',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        // if(result.data.length === 0){
                        //     return this.showDialog('', 'info', false, '暂无记录');
                        // }
                        this.service.currentIndex = 0;
                        this.service.tableData = result.data;
                    }
                    else {
                        this.showDialog('', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },
        // 保存到经办数据
        saveDataToLocal: function () {
            var item = this.selectedItem;
            var content = (this.updateId?item.content:item);
            var local_id = item.local_id;
            var service_id = item.serialNo;
            var url = '/investmentMgmt/tradeMonitor/tradeAbnormalHandle/' + (this.updateId?'updateToLocal.ajax':'addToLocal.ajax');
            $.post({
                // url: '/investmentMgmt/tradeMonitor/tradeAbnormalHandle/saveDataToLocal.ajax',
                url,
                data: {
                    local_id,
                    service_id,
                    content: JSON.stringify(content)
                },
                success: function (result) {
                    if (result.error == 0) {
                        this.showDialog('addFundHistory', 'info', false, this.updateId?'修改补仓已提交':'增补操作已提交');
                        this.searchLocal();
                        this.searchService();
                    }
                    else {
                        this.showDialog('addFundHistory', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },
        // 查询经办数据
        searchLocal: function () {
            var params = {
                groupId: this.local.groupId,
                fundId: this.local.fundId,
                transactionDate: this.local.transactionDate.replace(/-/g,''),
                status: this.local.status
            };
            $.post({
                url: '/investmentMgmt/tradeMonitor/tradeAbnormalHandle/getLocalList.ajax',
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
        // 经办数据撤回
        revert: function (item) {
            var params = {
                local_id: item.local_id,
                updateTime: item.updateTime
            };
            $.post({
                url: '/investmentMgmt/tradeMonitor/tradeAbnormalHandle/revertLocalData.ajax',
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


