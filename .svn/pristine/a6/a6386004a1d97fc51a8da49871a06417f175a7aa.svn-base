var vm = new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        ruleId: '',
        ruleName: '',
        tableData: [{}],
        diaMsg: '',
        isAdd: false,
        isCheck: false,
        isUpdate: false,
        operateId: '',
        dialog: {
            ruleId: '',
            ruleName: '',
            ruleDesc: '',
            groupIds: '',
            operateType: 1,
            ruleConditionDisplay: []
        },
        ruleIndexes: [],
        operateList1: [{  // 1-是,0-否
            value: 1,
            text: '是'
        }, {
            value: 0,
            text: '否'
        }],
        operateList2: [{
            value: '<',
            text: '小于'
        }, {
            value: '<=',
            text: '小于等于'
        }, {
            value: '=',
            text: '等于'
        }, {
            value: '>=',
            text: '大于等于'
        }, {
            value: '>',
            text: '大于'
        }],
        // 留痕管理数据
        recordData:'',
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        pageMaxNum: '10',
        condition: '',
    },
    computed: {
        // 主表格分页
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
        pageMaxNum: {
            handler: function (val, oldval) {
                this.currentIndex = 0;
            }
        }
    },
    created: function () {
        this.getTableData();
        this.getDialogInfo();
    },
    mounted: function () {
        var dialogs = ['info', 'del'];
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
    },
    methods: {
        getTableData: function () {
            var params = {};
            this.ruleId && (params.ruleId = this.ruleId);
            this.ruleName && (params.ruleName = this.ruleName);
            $.post({
                url: '/investmentMgmt/investmentAccount/accountRule/query.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.currentIndex = 0;
                        this.tableData = result.data;
                    } else {
                        this.showDialog('', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },
        getDialogInfo: function () {
            $.post({
                url: '/investmentMgmt/investmentAccount/accountRule/getDialogInfo.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        this.ruleIndexes = result.data;
                    } else {
                        this.showDialog('', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },
        showCheck: function (item) {
            this.isAdd = false;
            this.isCheck = true;
            this.isUpdate = false;
            this.operateId = '';
            $.post({
                url: '/investmentMgmt/investmentAccount/accountRule/detail.ajax',
                data: {ruleId: item.ruleId},
                success: function (result) {
                    if (result.error === 0) {
                        var displayData = JSON.parse(result.data.ruleConditionDisplay);
                        this.dialog.ruleId = result.data.ruleId;
                        this.dialog.ruleName = result.data.ruleName;
                        this.dialog.ruleDesc = result.data.ruleDesc;
                        this.dialog.groupIds = result.data.groupIds;
                        this.dialog.operateType = (displayData.operateType && displayData.operateType.indexOf('AND') > -1) ? 1 : 0;
                        this.dialog.ruleConditionDisplay = displayData.ruleConditionDisplay;
                        this.showDialog('', 'operate');
                    } else {
                        this.showDialog('', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },
        showAdd: function () {
            this.isAdd = true;
            this.isCheck = false;
            this.isUpdate = false;
            this.operateId = '';
            this.dialog.ruleId = '';
            this.dialog.ruleName = '';
            this.dialog.ruleDesc = '';
            this.dialog.groupIds = '';
            this.dialog.operateType = 1;
            this.dialog.ruleConditionDisplay = [];
            this.addCondition();
            this.showDialog('', 'operate');
        },
        showUpdate: function (item) {
            this.isAdd = false;
            this.isCheck = false;
            this.isUpdate = true;
            this.operateId = item.ruleId;
            $.post({
                url: '/investmentMgmt/investmentAccount/accountRule/detail.ajax',
                data: {ruleId: item.ruleId},
                success: function (result) {
                    if (result.error === 0) {
                        var displayData = JSON.parse(result.data.ruleConditionDisplay);
                        this.dialog.ruleId = result.data.ruleId;
                        this.dialog.ruleName = result.data.ruleName;
                        this.dialog.ruleDesc = result.data.ruleDesc;
                        this.dialog.groupIds = result.data.groupIds;
                        this.dialog.operateType = (displayData.operateType && displayData.operateType.indexOf('AND') > -1) ? 1 : 0;
                        this.dialog.ruleConditionDisplay = displayData.ruleConditionDisplay;
                        this.showDialog('', 'operate');
                    } else {
                        this.showDialog('', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },
        operate: function () {
						if(!this.dialog.ruleId){
							return this.showDialog('operate', 'info', true, '请填写规则ID');
						}
						if(!this.dialog.ruleName){
							return this.showDialog('operate', 'info', true, '请填写规则名称');
						}
						if(!this.dialog.ruleDesc){
							return this.showDialog('operate', 'info', true, '请填写规则描述');
						}
						if(!this.dialog.groupIds){
							return this.showDialog('operate', 'info', true, '请填写组合ID');
						}
						if(this.dialog.ruleConditionDisplay.length===0){
							return this.showDialog('operate', 'info', true, '请添加筛选条件');
						}
						for(var i of this.dialog.ruleConditionDisplay){
							for(var j in i){
								if(!i[j]&&j!='indexValue'){
									return this.showDialog('operate', 'info', true, '请填写完整的触发指标');
								}
							}
						}
            var params = {};
            params.ruleId = this.dialog.ruleId;
            params.ruleName = this.dialog.ruleName;
            params.ruleDesc = this.dialog.ruleDesc;
            params.groupIds = this.dialog.groupIds;
            params.ruleCondition = this.dialog.ruleConditionDisplay.map(function (item) {
                if (this.operateList1.filter(function (listItem) {
                    return listItem.value == item.operator
                })[0]) {
                    return item.indexId + ' = ' + item.operator;
                }
                return item.indexId + ' ' + item.operator + ' ' + item.indexValue;
            }.bind(this)).join(this.dialog.operateType == 1 ? ' AND ' : ' OR ');
            params.ruleConditionDisplay = JSON.stringify({
                operateType: this.dialog.operateType == 1 ? 'AND' : 'OR',
                ruleConditionDisplay: this.dialog.ruleConditionDisplay
            });
            console.log(params);
            var url = '/investmentMgmt/investmentAccount/accountRule/add.ajax';
            if (this.isUpdate) {
                url = '/investmentMgmt/investmentAccount/accountRule/update.ajax';
            }
            $.post({
                url: url,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.showDialog('operate', 'info', false, result.msg);
                        this.getTableData();
                    } else {
                        this.showDialog('operate', 'info', true, result.msg);
                    }
                }.bind(this)
            });
        },
        showDelete: function (item) {
            this.operateId = item.ruleId;
            this.recordData = item.ruleName;
            this.showDialog('', 'del', false);
        },
        del: function () {
            var params = {};
            params.ruleId = this.operateId;
            params.ruleName = this.recordData;
            $.post({
                url: '/investmentMgmt/investmentAccount/accountRule/del.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.showDialog('del', 'info', false, result.msg);
                        this.getTableData();
                    } else {
                        this.showDialog('del', 'info', true, result.msg);
                    }
                }.bind(this)
            });
        },
        addCondition: function () {
            this.dialog.ruleConditionDisplay.push({
                indexId: '',
                operator: '',
                indexValue: ''
                // watch: null
            });
            // var item = this.dialog.ruleConditionDisplay[this.dialog.ruleConditionDisplay.length - 1];
            // item.watch = this.$watch(function () {
            //     return item.indexId;
            // }.bind(this), function () {
            //     item.operator = '';
            //     item.indexValue = '';
            // }.bind(this), {
            //     deep: true
            // })
        },
        delCondition: function (index) {
            // this.dialog.ruleConditionDisplay[index].watch();
            if(this.dialog.ruleConditionDisplay.length===1){
                return;
            }
            this.dialog.ruleConditionDisplay.splice(index, 1);
        },
        getIndexType: function (indexId) {
            var obj = this.ruleIndexes.filter(function (item) {
                return item.indexId === indexId;
            })[0];
            return obj ? obj.indexType : 2;
        },
        getIndexPercent:function(indexId){
            var obj = this.ruleIndexes.filter(function (item) {
                return item.indexId === indexId;
            })[0];
            return obj ? obj.percentFlg : false;
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
    },
    filters:{
        transfer:function(value,present){
            let transfer = '';
            switch(value){
                case 'one_yield':
                    transfer = '1个月收益率';
                    break;
                case 'three_yield':
                    transfer = '3个月收益率';
                    break;
                case 'six_yield':
                    transfer = '6个月收益率';
                    break;
                case 'year_yield':
                    transfer = '1年收益率';
                    break;
                case 'since_yield':
                    transfer = '持仓以来收益率';
                    break;
                case 'one_dawndown':
                    transfer = '1个月最大回撤';
                    break;
                case 'three_dawndown':
                    transfer = '3个月最大回撤';
                    break;
                case 'six_dawndown':
                    transfer = '6个月最大回撤';
                    break;
                case 'year_dawndown':
                    transfer = '1年最大回撤';
                    break;
                case 'since_dawndown':
                    transfer = '持仓以来最大回撤';
                    break;
                default: transfer=present
            }
            return transfer
        }
    }
});

