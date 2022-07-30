var vm = new Vue({
    el: '#content',
    data: {
        reportName:'',  //季报名称
        reportYear:'',  //季报年度
        reportQuarter:'',  //季报季度
        groupId: '',      //投顾策略ID
        groupIdList: [],
        //主页面相关数据
        tableData: [],
        diaMsg: '',
        deleteId: '',
        reportSerialNo:'',
        reportType:'',
        dialog: {
            serialno: '',
            groupId: '',
            title: '',
            content: '',

            agreementPerformance:'', //投顾协议履行情况 ,
            creator:'', //创建人 ,
            groups:[], //关联策略组合列表 ,
            marketReviewOutlook:'', //市场回顾与展望 ,
            remark:'', //备注 ,
            reportName:'', //季报名称: ,
            reportQuarter:'', //季报季度: = ['FIRST', 'SECOND', 'THIRD', 'FOURTH'],
            reportUrl:'', //季报url地址 ,
            reportYear:'', //季报年度（YYYY) ,
            strategyAdjustment:'', //组合策略调整情况 ,
            tradeExecutionBias:'', //交易执行偏差情况
						displayDate:''
        },
        strategyArr:[],
        groupList:[],

        checkBoxIndex:'',
        checked:'',
        checkModel:[],
        // 留痕展示数据
        recordData:'',
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10,
        condition: "",
        getArrId:[],
        hasGroupArrId:[],  //获取groupid--
        getStr:'',
        groupListObj: {},
        selectedData: '',
        // 后台返回的已有数据
        checkListData:[],
    },
    computed: {
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
    },
    watch: {
        // pageMaxNum: function () {
        //     this.currentIndex = 0;
        //     this.getTableData(0);
        // },
        pageMaxNum: {
            handler: function (val, oldval) {
                this.currentIndex= 0;
            }
        },
        condition: {
            handler: function (val, oldval) {
                this.currentIndex= 0;
            }
        },
    },
    mounted: function () {
        var _this=this;
        var dialogs = ['info', 'delete'];
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

        var fundArr = ["fundGroupsList"];
        fundArr.forEach(function (value) {
            $('#' + value).chosen({
                search_contains:true,
                no_results_text: '未找到相关基金信息',
                disable_search_threshold:6,
                width: '175px'
            });
        });
        $('#fundGroupsList').on('change', function (e, params) {
            _this.groupId = params ? params.selected : '';
        });

        this.getTableData(0);
        this.getFundGroupList('');
    },
    methods: {
         // 全选按钮
        checkAll($event, key){
            // return;
            $event.preventDefault();
            console.log('checkAll key=', key);

            this.groupListObj[key].checked = !this.groupListObj[key].checked;

            for (p in this.groupListObj[key]) {
                this.groupListObj[key][p].checked = this.groupListObj[key].checked;
            }

        },
        // 单个投顾
        checkSingle($event, key, k){
            $event.preventDefault();
            console.log('checkSingle key=', key);
            console.log('checkSingle k=', k);

            this.groupListObj[key][k].checked = !this.groupListObj[key][k].checked;

            // 当前所在的全选checkbox状态，是否为选中，遍历判断
            let checkAllFlag = true;
            for (p in this.groupListObj[key]) {
                if(p =='checked') continue;
                console.log('checkSingle p=', p);
                console.log('checkSingle 当前checkbox=', this.groupListObj[key][p].checked);
                if(!this.groupListObj[key][p].checked){
                    // 有一个checkbox没有选中，则全选checkbox也不选中
                    console.log('有一个checkbox没有选中，则全选checkbox也不选中，退出遍历')
                    checkAllFlag = false;
                    break
                }
            }
            this.groupListObj[key].checked = checkAllFlag;
        },

        // 准备选中的数据
        prepareData() {
            let tmpList = [];
            for (const key in this.groupListObj) {
                const item = this.groupListObj[key];
                for (const k in item) {
                    const checked = item[k].checked;
                    const groups = item[k].groups;
                    if(checked){
                        tmpList = tmpList.concat(groups.split('-'));
                    }
                }
            }
            this.selectedData = tmpList;
        },


        // 获取基金组合列表
        getFundGroupList: function (param) {
            var _this = this;
            _this.strategyArr = []
            _this.groupList = []
            var arr = [
                {
                    strategyName: '教育金',
                    typeof: 'educationStrategy'
                }, {
                    strategyName: '养老金',
                    typeof: 'forAgedStrategy'
                },
                {
                    strategyName: '稳健理财',
                    typeof: 'steadyStrategy'
                },
                {
                    strategyName: '长期投资',
                    typeof: 'equityStrategy'
                },
                {
                    strategyName: '活钱管理',
                    typeof: 'quickStrategy'
                }
            ]

            $.post({
                url: '/investmentMgmt/investmentInformationDisclosure/quarterlyReport/fundGroups.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        _this.fundGroupList = result.data;
                        if (param !== 'nofor') {
                            var obj = {}
                            var newList = []
                            // 判断是不是投顾
                        // result.data.forEach(item => { if (item.isInvestment == 'Y' && item.fundgroupType >= 13 && item.fundgroupType <= 17) newList.push(item) })
                       
                            // newList.forEach((item, index) => {
                            //     if (!obj[item.fundgroupTypeName]) {
                            //         obj[item.fundgroupTypeName] = {};
                            //     }
                            //     if (!obj[item.fundgroupTypeName][item.groupName]) {
                            //         obj[item.fundgroupTypeName][item.groupName] = item.groupId;
                            //     } else {
                            //         obj[item.fundgroupTypeName][item.groupName] = obj[item.fundgroupTypeName][item.groupName] + '_' + item.groupId;
                            //     }
                            // })
                            // arr.forEach((groupName, index) => {
                            //     _this.groupList.push({
                            //         strategyName: groupName.strategyName,
                            //         typeof: groupName.typeof,
                            //         groupArr: []
                            //     })
                            //     for (let key in obj) {
                            //         if (key === groupName.strategyName) {
                            //             for (let kk in obj[key]) {
                            //                 _this.groupList[index].groupArr.push({
                            //                     fileName: '',
                            //                     groupName: '',
                            //                     fileUrl: '',
                            //                     groupId: obj[key][kk],
                            //                     name: kk
                            //                 })
                            //             }
                            //         }
                            //     }

                            // })
                           
                            // 判断是不是投顾
                            result.data.forEach(item => { if (item.isInvestment == 'Y' && item.fundgroupType >= 13 && item.fundgroupType <= 17) newList.push(item) })
                                           
                            newList.forEach((item, index) => {
                                if (!obj[item.fundgroupTypeName]) {
                                    obj[item.fundgroupTypeName] = {};
                                    obj[item.fundgroupTypeName]['checked'] = false;
                                }
                                if (!obj[item.fundgroupTypeName][item.groupName]) {
                                    obj[item.fundgroupTypeName][item.groupName] = {}
                                    obj[item.fundgroupTypeName][item.groupName]['groups'] = item.groupId;
                                    obj[item.fundgroupTypeName][item.groupName]['checked'] = false;
                                } else {
                                    obj[item.fundgroupTypeName][item.groupName]['groups'] = obj[item.fundgroupTypeName][item.groupName].groups + '_' + item.groupId;
                                }
                            })

                                console.log('newList=', newList)
                                console.log('obj=', obj)

                                _this.groupListObj = obj;
                                console.log(_this.groupListObj) ;
                        }

                        // _this.strategyArr.forEach(function(item){
                        //        item.checked='N';
                        //     item.groupArr.map(itemArr=>{
                        //        itemArr.checked='N';
                        //   })
                        // })

                        // 查询条件组合的处理
                        var str = '';
                        result.data.forEach(function(item) {
                            str += '<option value="' + item.groupId + '">' + item.groupId + '-' + item.groupName + '</option>';
                        });
                        var fundArr = ["fundGroupsList"];
                        fundArr.forEach(function (value) {
                            $('#' + value).html('<option value=""></option>' + str);
                            $('#' + value).trigger('chosen:updated');
                        });
                        console.log("strategyArr==",_this.strategyArr)
                    }
                }
            });
        },
        // 主表格数据
        getTableData: function (currentIndex) {
            var _this = this;
            var params = {};
            this.currentIndex = 0;
            params.reportName = this.reportName;  //季报名称
            params.reportYear = this.reportYear;  //季报年度
            params.reportQuarter = this.reportQuarter;  //季报季度
            params.groupId = _this.groupId;  //关联策略组合ID
            console.log(params);
            $.post({
                url: '/investmentMgmt/investmentInformationDisclosure/quarterlyReport/getTableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.currentIndex = 0;
                        console.log('data=',result.data);
                        _this.tableData = result.data.body.reports;
                    } else {
                        _this.tableData = [];
                        _this.currentIndex = 0;
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        // 删除
        showDel: function (item) {
            console.log(item);
            this.reportSerialNo = item.serialNo;
            this.reportType = item.reportType;
            this.showDialog('', 'delete');
        },
        del: function () {
            var params = {};
            params.reportSerialNo = this.reportSerialNo;
            params.reportType ='2';//  季报
            console.log(params);
            $.post({
                url: '/investmentMgmt/investmentInformationDisclosure/quarterlyReport/del.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.getTableData(0);
                        this.showDialog('delete', 'info', false, result.msg);
                    } else {
                        this.showDialog('delete', 'info', true, result.msg);
                    }
                }.bind(this)
            });
        },
        showAdd: function () {
            var _this=this;
            // _this.clearAddDia('');
            _this.dialog.serialno = '';
            _this.getArrId=[];
            _this.hasGroupArrId=[];
           
            //每次选完或者点击详情之后再点击新增-先清空
            // _this.strategyArr.forEach(function(item){
            //     item.checked='N';            
            // })
            // for (var i = 0; i < _this.strategyArr.length; i++) {
            //     for (var j = 0; j <_this.strategyArr[i].groupArr.length; j++) {       
            //         _this.strategyArr[i].groupArr[j].checked='N';     
            //     }; 
            // };
            // _this.$set(_this.strategyArr);
            
            //每次选完或者点击详情之后再点击新增-先清空
            for(val in _this.groupListObj){
                _this.groupListObj[val].checked=false;
                for(grops in _this.groupListObj[val]){
                    _this.groupListObj[val][grops].checked=false;
                }
             } 
            console.log(_this.groupListObj)
            this.dialog.agreementPerformance='', //投顾协议履行情况 ,
            this.dialog.groups=[], //关联策略组合列表 ,
            this.dialog.marketReviewOutlook='', //市场回顾与展望 ,
            this.dialog.remark='', //备注 ,
            this.dialog.reportName='', //季报名称: ,
            this.dialog.reportQuarter='', //季报季度: = ['FIRST', 'SECOND', 'THIRD', 'FOURTH'],
            this.dialog.reportUrl='', //季报url地址 ,
            this.dialog.displayDate='', //展示时间 ,
            this.dialog.reportYear='', //季报年度（YYYY) ,
            this.dialog.strategyAdjustment='', //组合策略调整情况 ,
            this.dialog.tradeExecutionBias='', //交易执行偏差情况

            this.showDialog('', 'add');
        },
        // 新增
        add: function () {
            var _this=this;

            _this.prepareData();//调用获取数据
            console.log(_this.selectedData)
						if(this.dialog.displayDate){
							this.dialog.displayDate = this.dialog.displayDate.replace(/-/g,'')
						}else{
							return this.showDialog('add', 'info', true, '请填写展示时间');
						}
            var params = {};
            params.agreementPerformance=this.dialog.agreementPerformance; //投顾协议履行情况 ,
            params.groups=_this.selectedData;

            // params.groups=Array.from(new Set(_this.getArrId.concat(_this.hasGroupArrId))) //去重

            params.marketReviewOutlook=this.dialog.marketReviewOutlook; //市场回顾与展望 ,
            params.remark=this.dialog.remark; //备注 ,
            params.reportName=this.dialog.reportName; //季报名称: ,
            params.reportQuarter=this.dialog.reportQuarter; //季报季度: = ['FIRST', 'SECOND', 'THIRD', 'FOURTH'],
            params.reportUrl=this.dialog.reportUrl; //季报url地址 ,
            params.displayDate=this.dialog.displayDate; //季报url地址 ,
            params.reportYear=this.dialog.reportYear; //季报年度（YYYY) ,
            params.strategyAdjustment=this.dialog.strategyAdjustment; //组合策略调整情况 ,
            params.tradeExecutionBias=this.dialog.tradeExecutionBias; //交易执行偏差情况

            if (!params.reportQuarter) {
                _this.showDialog('add', 'info', true, '季报季度不能为空');
                return false;
            }
            if (!params.reportYear) {
                _this.showDialog('add', 'info', true, '季报年度不能为空');
                return false;
            }
            //保留这一段代码--这是预防有的组合ID合并在一起，需要拆分（A1001_A1002）
            var groupIdArr = []
            var strArr=[];
            strArr=params.groups;
            for (var key in params.groups) {
                if (params.groups[key].indexOf("_") !== -1) {
                    console.log(params.groups[key]);
                    groupIdArr = groupIdArr.concat(params.groups[key].split('_'));
                    console.log(groupIdArr);  
                }
            }
            let newArr=groupIdArr.concat(strArr)
            let filterNewarr=newArr.filter(function(item) {
                return item.indexOf("_")==-1;
            });

            console.log("filterNewarr==",filterNewarr);

            params.groups=filterNewarr;

            if (!_this.reportSerialNo) {
                url = "/investmentMgmt/investmentInformationDisclosure/quarterlyReport/add.ajax"
            } else {
                url = "/investmentMgmt/investmentInformationDisclosure/quarterlyReport/operate.ajax"
                params.serialNo=_this.reportSerialNo; 
            }

            //这是预防有的组合ID合并在一起，需要拆分（A1001_A1002）
           console.log(params);
            $.post({
                url:url,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.getTableData(0);
                        this.showDialog('add', 'info', false, result.msg);
                    } else {
                        this.showDialog('add', 'info', true, result.msg);
                    }
                }.bind(this)
            });
        },

        // 修改
        showUpdate: function (item) {
            var _this=this;
            console.log("item",item);
            var params = {};

            //每次选完或者点击详情之后再点击新增-先清空
            for(val in _this.groupListObj){
                _this.groupListObj[val].checked=false;
                for(grops in _this.groupListObj[val]){
                    _this.groupListObj[val][grops].checked=false;
                }
            } 
            console.log(_this.groupListObj)
  
            _this.reportSerialNo=item.serialNo;
            _this.getArrId=[].concat(item.groups);
            params.reportSerialNo = item.serialNo;
            console.log(params);
            $.post({
                url: '/investmentMgmt/investmentInformationDisclosure/quarterlyReport/details.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        console.log(result.data)
                        _this.dialog.agreementPerformance=result.data.body.agreementPerformance; //投顾协议履行情况 ,
                        _this.dialog.marketReviewOutlook=result.data.body.marketReviewOutlook; //市场回顾与展望 ,
                        _this.dialog.remark=result.data.body.remark; //备注 ,
                        _this.dialog.reportName=result.data.body.reportName; //季报名称: ,
                        _this.dialog.reportQuarter=result.data.body.reportQuarter; //季报季度: = ['FIRST', 'SECOND', 'THIRD', 'FOURTH'],
                        _this.dialog.reportUrl=result.data.body.reportUrl; //季报url地址 ,
                        _this.dialog.displayDate=moment(result.data.body.displayDate).format('YYYY-MM-DD') ; //季报url地址 ,
                        _this.dialog.reportYear=result.data.body.reportYear; //季报年度（YYYY) ,
                        _this.dialog.strategyAdjustment=result.data.body.strategyAdjustment; //组合策略调整情况 ,
                        _this.dialog.tradeExecutionBias=result.data.body.tradeExecutionBias; //交易执行偏差情况
         
                        _this.checkListData=result.data.body.groups;
                        
                        _this.getCheckboxStatus();

                    } else {
                        this.showDialog('add', 'info', false, result.msg);
                    }
                }.bind(this)
            });
            this.showDialog('', 'add');
        },
        // 详情
        getDetails:function(item){
            var _this=this;
            var params = {};
            params.reportSerialNo = item.serialNo;
            console.log(params);
            $.post({
                url: '/investmentMgmt/investmentInformationDisclosure/quarterlyReport/details.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        console.log(result.data)
                        this.dialog.agreementPerformance=result.data.body.agreementPerformance; //投顾协议履行情况 ,
                        this.dialog.marketReviewOutlook=result.data.body.marketReviewOutlook; //市场回顾与展望 ,
                        this.dialog.remark=result.data.body.remark; //备注 ,
                        this.dialog.reportName=result.data.body.reportName; //季报名称: ,
                        this.dialog.reportQuarter=result.data.body.reportQuarter; //季报季度: = ['FIRST', 'SECOND', 'THIRD', 'FOURTH'],
                        this.dialog.reportUrl=result.data.body.reportUrl; //季报url地址 ,
												_this.dialog.displayDate=moment(result.data.body.displayDate).format('YYYY-MM-DD') ; 
                        this.dialog.reportYear=result.data.body.reportYear; //季报年度（YYYY) ,
                        this.dialog.strategyAdjustment=result.data.body.strategyAdjustment; //组合策略调整情况 ,
                        this.dialog.tradeExecutionBias=result.data.body.tradeExecutionBias; //交易执行偏差情况

                        _this.checkListData=result.data.body.groups;
                        
                        _this.getCheckboxStatus();
                    } else {
                        this.showDialog('details', 'info', false, result.msg);
                    }
                }.bind(this)
            });
            this.showDialog('', 'details');
        },
        // 修改和详情公共方法
        getCheckboxStatus:function(){
        // 赋值展示数据groupListObj，只对应处理checked属性
            for (let key in this.groupListObj) {
                let item = this.groupListObj[key];
                console.log('mounted item=', item);
                for (let k in item) {
                    if(!item[k].groups) continue;   // k == checked的情况
                    let groups = item[k].groups.split('_');
                    // groups和checkListData 两个数组取交集，如果交集不为空，则checked设置为true
                    if((new Set(groups.concat(this.checkListData)).size < (groups.length + this.checkListData.length) )){
                        this.groupListObj[key][k].checked = true;
                    }
                }
            }
            // 当前所在的全选checkbox状态，是否为选中，遍历判断
            for (let key in this.groupListObj) {
                let checkAllFlag = true;
                for (p in this.groupListObj[key]) {
                    if(p =='checked') continue;
                    console.log('mounted ' + p + ' checkbox=', this.groupListObj[key][p].checked);
                    if(!this.groupListObj[key][p].checked){
                        // 有一个checkbox没有选中，则全选checkbox也不选中
                        console.log('有一个checkbox没有选中，则全选checkbox也不选中，退出遍历')
                        checkAllFlag = false;
                        break
                    }
                }
                console.log('mounted ' + key + ' checkAllFlag', checkAllFlag);
                this.groupListObj[key].checked = checkAllFlag;
            }
            console.log('mounted this.groupListObj=', this.groupListObj);
        },
        
        //主表格分页方法
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
        //主表格分页方法
        prev: function () {
            this.currentIndex<= 0 ? 0 : this.currentIndex--;
        },
        next: function () {
            this.currentIndex>= this.middleData.length - 1 ? this.middleData.length - 1 : this.currentIndex++;
        },
        changeIndex: function (index) {
            this.currentIndex= index - 1;
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
    components: {
        'date-picker': VueBootstrapDatetimePicker
    },
		filters:{
			displayDateFormat:function(val){
				if(val){
					return moment(val).format('YYYY-MM-DD')
				}else{
					return '--'
				}
			}
		}
});