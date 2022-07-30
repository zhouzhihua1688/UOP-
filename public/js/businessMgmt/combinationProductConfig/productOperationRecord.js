new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        tableData: [],
        diaMsg: '',
        // 查询
        groupId: "",
        // 新增参数
        groupid: "",
        shiftType: "",

        bidEndDate: "",
        bidEndTime: "",
        bidStartDate: "",
        bidStartTime: "",

        isDeleted: 0,
        period: "",
        // 运作可选操作
        // optionalList:["01","02","03"],
        //时间转换
        moment: moment,
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10,
        condition: "",

        dataList: [],
        searchList: [],
        operateList: []
    },
    // created: function () {
    //     self = this;
    //     window.chooseTime = self.chooseTime;
    // },
    mounted: function () {
        var _this = this;
        var dialogs = ['info'];
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
        $('.date-timepicker').datetimepicker({
            format: 'YYYY-MM-DD HH:mm:ss',//use this option to display seconds
            icons: {
                time: 'fa fa-clock-o',
                date: 'fa fa-calendar',
                up: 'fa fa-chevron-up',
                down: 'fa fa-chevron-down',
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-arrows ',
                clear: 'fa fa-trash',
                close: 'fa fa-times'
            }
        }).next().on(ace.click_event, function () {
            $(this).prev().focus();
        });
        var arr = ['fundGroupsList'];
        arr.forEach(function(id) {
            $('#' + id).chosen({
                search_contains: true,
                no_results_text: '未找到基金组合',
                disable_search_threshold: 6,
                width: '150px'
            });
        });
        $('#fundGroupsList').on('change', function(e, params) {
            _this.groupId = params ? params.selected : '';
        });
        this.getTableData(0);
        this.getFundGroupList();//查询所有组合
    },
    computed: {
        //主表格假分页
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
    //选择基金数据过滤
    // viewData: function () {
    //     var filterData = [];
    //     var _this = this;
    //     console.log(_this.tableData)
    //     _this.tableData.forEach(function (item) {
    //         console.log("1111",item)
    //         if(item.groupid) {
    //             if (item.fundId.indexOf(_this.diaSearchFundId) > -1) {
    //                 filterData.push(item);
    //             }
    //         }
    //     });
    //     return filterData;
    // },

    watch: {
        // 假分页
        pageMaxNum: {
            handler: function (val, oldval) {
                this.currentIndex = 0;
            }
        },
        condition: {
            handler: function (val, oldval) {
                this.currentIndex = 0;
            }
        },
    },

    methods: {
        // 获取基金组合列表
        getFundGroupList: function() {
            var _this = this;
            $.post({
                url: '/businessMgmt/combinationProductConfig/productOperationRecord/fundGroups.ajax',
                success: function(result) {
                    if (result.error === 0) {
                        // _this.groupList = result.data;
                        var str = '';
                        result.data.tableData.forEach(function(item) {
                            str += '<option value="' + item.groupid + '">'+item.groupid+ '</option>';
                        });
                        str = '<option value="">全部</option>' + str;
                        $('#fundGroupsList').html(str);
                        $("#fundGroupsList").trigger("chosen:updated");
                    }
                }
            });
        },
        getTableData: function (currentIndex) {
            var _this = this;
            var params = {};
            this.currentIndex = 0;
            if( this.groupId==""){
                params.groupId="ALL"
            }else{
                params.groupId = _this.groupId;
            }
            $.post({
                url: '/businessMgmt/combinationProductConfig/productOperationRecord/getTableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.currentIndex = 0;
                        _this.tableData = result.data.tableData
                    }
                    else {
                        _this.tableData = [];
                        _this.currentIndex = 0;
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },

        showAdd: function () {
            var _this = this;
            this.groupid = "";
            this.period = "";
            this.bidStartDate = "";
            this.bidStartTime = "";
            this.bidEndDate = "";
            this.bidEndTime = "";
            this.dataList=[];
            this.showDialog('', 'add');
        },
        addPeriod: function () {
            var _this = this;
            _this.dataList.push({
                bidStartDate: "",
                bidStartTime: "",
                bidEndDate: "",
                bidEndTime: "",
                isDeleted: 0,
                period: _this.period
            })
        },
        delList: function (index) {
            var _this = this;
            _this.dataList.splice(index, 1)

        },
        // 新增必填弹框
        diaInfoCheck: function () {
            var _this = this;
            var list = []     //验证有没有重复期数

            if (!this.groupid) {
                this.showDialog('add', 'info', true, '组合ID不能为空');
                return false;
            }

            for (var i = 0; i < _this.tableData.length; i++) {
                if(_this.tableData[i].groupid==_this.groupid){
                    _this.showDialog('add', 'info', true, '组合ID已经存在');
                    return false;
                }
            }

            var re = /^[1-9]+[0-9]*]*$/;//判断正整数  
            for (var i = 0; i < _this.dataList.length; i++) {
                list.push(_this.dataList[i].period)
                if (isNaN(Number(_this.dataList[i].period))||_this.dataList[i].period<="0") {
                    _this.showDialog('add', 'info', true, '您输入的期数格式有误！');
                    return false;
                }
                if (!re.test(_this.dataList[i].period)) {
                    _this.showDialog('add', 'info', true, '请输入整数！');
                    return false;
                }
            }
            // 验证期数不能相同
            var nary = list.sort();
            for (var i = 0; i < list.length; i++) {
                if (nary[i] == nary[i + 1]) {
                    _this.showDialog('add', 'info', true, '您输入的期数不能相同！');
                    return false;
                }

            }

            this.dataList.sort(function (a, b) {
                return  a.bidStartDate.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1$2$3$4$5$6') - b.bidStartDate.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1$2$3$4$5$6')
            });

            for (var i = 0; i < this.dataList.length; i++) {
                if (!this.dataList[i].bidStartDate||!this.dataList[i].bidEndDate) {
                    return _this.showDialog('add', 'info', true, '开始时间或结束时间不能为空!');
                }
                if (this.dataList[i].bidStartDate > this.dataList[i].bidEndDate) {
                    return _this.showDialog('add', 'info', true, '结束时间要大于开始时间!');
                }
            }

            if (!this.checkTimes(this.dataList)) {
                return _this.showDialog('add', 'info', true, '您输入的起止时间存在冲突且按升序填入时间!');
            }
            return true;

        },

        checkTimes: function (dataList) {
            var temp;
            var timeArray = dataList
            var resultArr = [];
            for (var i = 0; i < timeArray.length - 1; i++) {
                for (var j = i + 1; j < timeArray.length; j++) {
                    for (var k = 0; k < timeArray.length - 1; k++) {
                        resultArr.push(timeArray[k].bidEndDate < timeArray[k + 1].bidStartDate);
                    }
                }
            }
            return resultArr.every(function (value) {
                return value;
            });

        },

        saveParam: function () {
            var _this = this;
            var arrList = []
            _this.dataList.forEach(function (item) {
                item.groupid = _this.groupid
            })
            for (var i = 0; i < _this.dataList.length; i++) {
                arrList.push({
                    bidStartDate: _this.dataList[i].bidStartDate.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1$2$3'),
                    bidStartTime: _this.dataList[i].bidStartDate.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$4$5$6'),
                    bidEndDate: _this.dataList[i].bidEndDate.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1$2$3'),
                    bidEndTime: _this.dataList[i].bidEndDate.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$4$5$6'),
                    isDeleted: 0,
                    groupid: _this.dataList[i].groupid,
                    period: _this.dataList[i].period
                })
            }
            console.log("==", arrList)
            if (this.diaInfoCheck()) {
                var params = {}

                // params.groupid = this.groupid;
                // params.bidStartDate = moment($('#bidStartDate').val()).format("YYYYMMDD");
                // params.bidStartTime = moment($('#bidStartDate').val()).format("HHmmss");
                // params.bidEndDate = moment($('#bidEndDate').val()).format("YYYYMMDD");
                // params.bidEndTime = moment($('#bidEndDate').val()).format("HHmmss");
                // params.operationEndDate = moment($('#operationEndDate').val()).format("YYYYMMDD");
                // params.operationEndTime = moment($('#operationEndDate').val()).format("HHmmss");
                // if (!params.optionalEndOperations) {
                //     this.showDialog('add', 'info', true, '运作结束可选操作不能为空');
                //     return false;
                // }
                // if (params.bidStartDate > params.bidEndDate) {
                //     this.showDialog('add', 'info', true, '申购结束时间不能早于申购开始时间');
                //     return false;
                // }
                // if (params.operationEndDate < params.bidEndDate) {
                //     this.showDialog('add', 'info', true, '运作结束时间不能早于申购结束时间');
                //     return false;
                // }
                // _this.tableData.forEach(item => {
                //     groupidList.push(item.groupid)
                // })
                // if (groupidList.indexOf(params.groupid.toString()) != -1) {
                //     return _this.showDialog('add', 'info', true, '不允许添加重复产品!');
                // }
                // var list=JSON.stringify(arrList)
                // console.log("list",list)

                $.post({
                    url: '/businessMgmt/combinationProductConfig/productOperationRecord/saveParam.ajax',
                    data: {dialogData: JSON.stringify(arrList)},
                    success: function (result) {
                        if (result.error === 0) {
                            _this.getTableData(0);
                        }
                        _this.showDialog('add', 'info', false, result.msg);
                    }
                });
            }
        },

        // 修改数据
        showUpdate: function (item) {
            var _this = this
            var params = {};
            // this.serialno = item.serialno;
            this.operateList = [];
            this.groupid = item.groupid;
            params.groupId = this.groupid;
            // 查询单个基金期数信息
            $.post({
                url: '/businessMgmt/combinationProductConfig/productOperationRecord/search.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.searchList = result.data.searchData.sort(function (a, b) {
                            return  a.period - b.period
                        });;
                        _this.searchList.forEach(function(item){

                            // 转化时间格式
                            item.bidStartDate=item.bidStartDate.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')+" "+item.bidStartTime.replace(/(\d{2})(\d{2})(\d{2})/g, '$1:$2:$3')
                            item.bidEndDate=item.bidEndDate.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')+" "+item.bidEndTime.replace(/(\d{2})(\d{2})(\d{2})/g, '$1:$2:$3')
                        })
                        console.log(_this.searchList)
                    }
                    else {
                        _this.searchList = [];
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });

            this.showDialog('', 'revise');
        },
        // 修改添加期数
        updatePeriod:function(){
            var _this = this;
            _this.searchList.push({
                bidStartDate: "",
                bidStartTime: "",
                bidEndDate: "",
                bidEndTime: "",
                isDeleted: 0,
                period: _this.period,
            })
        },
        // 修改里面删除某个期数
        updateDelList: function (index,item) {
            // var _this = this;
            this.operateList.push(JSON.parse(JSON.stringify(item)));
            this.searchList.splice(index, 1);
        },

        // 修改必填弹框
        reviseCheck: function () {
            var _this = this;
            var list = []     //验证有没有重复期数
            var re = /^[1-9]+[0-9]*]*$/;//判断正整数
            for (var i = 0; i < _this.searchList.length; i++) {
                console.log(_this.searchList[i].period)
                list.push(_this.searchList[i].period)
                if (isNaN(Number(_this.searchList[i].period))||_this.searchList[i].period<="0") {
                    _this.showDialog('revise', 'info', true, '您输入的期数格式有误！');
                    return false;
                }
                if (!re.test(_this.searchList[i].period)) {
                    _this.showDialog('revise', 'info', true, '请输入整数！');
                    return false;
                }
            }
            // 验证期数不能相同
            var nary = list.sort();
            for (var i = 0; i < list.length; i++) {
                if (nary[i] == nary[i + 1]) {
                    _this.showDialog('revise', 'info', true, '您输入的期数不能相同！');
                    return false;
                }
            }

            this.searchList.sort(function (a, b) {
                return  a.bidStartDate.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1$2$3$4$5$6') - b.bidStartDate.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1$2$3$4$5$6')
            });

            for (var i = 0; i < this.searchList.length; i++) {

                if (this.searchList[i].bidStartDate > this.searchList[i].bidEndDate) {
                    return _this.showDialog('revise', 'info', true, '结束时间要大于开始时间!');
                }
            }

            if (!this.checkTimes2(this.searchList)) {
                return _this.showDialog('revise', 'info', true, '您输入的起止时间存在冲突且按升序填入时间!');
            }

            return true;
        },
        checkTimes2: function (dataList) {
            var temp;
            var timeArray = dataList
            var resultArr = [];
            for (var i = 0; i < timeArray.length - 1; i++) {
                for (var j = i + 1; j < timeArray.length; j++) {
                    for (var k = 0; k < timeArray.length - 1; k++) {
                        resultArr.push(timeArray[k].bidEndDate < timeArray[k + 1].bidStartDate);
                    }
                }
            }
            return resultArr.every(function (value) {
                return value;
            });
        },


        update: function () {
            var _this = this;
            var arrList2= []
            var opList=[];

            _this.searchList.forEach(function (item) {
                item.groupid = _this.groupid

            //     if(!item.serialno){
            //         noSerialno.push({
            //             bidStartDate: item.bidStartDate.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1$2$3'),
            //             bidStartTime: item.bidStartDate.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$4$5$6'),
            //             bidEndDate:item.bidEndDate.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1$2$3'),
            //             bidEndTime: item.bidEndDate.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$4$5$6'),
            //             isDeleted: 0,
            //             groupid: item.groupid,
            //             period: item.period
            //         })
            //     }
            })


            for (var i = 0; i < _this.searchList.length; i++) {
                if(_this.searchList[i].serialno){   //有序列号的为修改
                    arrList2.push({
                        bidStartDate: _this.searchList[i].bidStartDate.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1$2$3'),
                        bidStartTime: _this.searchList[i].bidStartDate.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$4$5$6'),
                        bidEndDate: _this.searchList[i].bidEndDate.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1$2$3'),
                        bidEndTime: _this.searchList[i].bidEndDate.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$4$5$6'),
                        isDeleted: 0,
                        serialno:_this.searchList[i].serialno,
                        groupid: _this.searchList[i].groupid,
                        period: _this.searchList[i].period
                    })
                }else{
                    arrList2.push({      //此为新增添加
                        bidStartDate: _this.searchList[i].bidStartDate.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1$2$3'),
                        bidStartTime: _this.searchList[i].bidStartDate.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$4$5$6'),
                        bidEndDate: _this.searchList[i].bidEndDate.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1$2$3'),
                        bidEndTime: _this.searchList[i].bidEndDate.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$4$5$6'),
                        isDeleted: 0,
                        groupid: _this.searchList[i].groupid,
                        period: _this.searchList[i].period
                    })
                }
            }

            this.operateList.forEach(function(item){
                arrList2.push({
                    isDeleted:1,
                    serialno:item.serialno,
                    groupid:item.groupid,
                })
            })
            console.log(arrList2)
            if (this.reviseCheck()) {
                // params.bidStartDate = moment(this.$refs.bidStartDates.value).format('YYYYMMDD');
                // params.bidStartTime = moment(this.$refs.bidStartDates.value).format("HHmmss");
                // params.bidEndDate = moment(this.$refs.bidEndDates.value).format('YYYYMMDD');
                // params.bidEndTime = moment(this.$refs.bidEndDates.value).format("HHmmss");
                // params.operationEndDate = moment(this.$refs.operationEndDates.value).format('YYYYMMDD');
                // params.operationEndTime = moment(this.$refs.operationEndDates.value).format("HHmmss");

                $.post({
                    url: '/businessMgmt/combinationProductConfig/productOperationRecord/update.ajax',
                    data: {dialogData: JSON.stringify(arrList2)},
                    success: function (result) {
                        if (result.error === 0) {
                            _this.getTableData(0);
                        }
                        _this.showDialog('revise', 'info', false, result.msg);
                    }
                });
            }
        },
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
            this.currentIndex <= 0 ? 0 : this.currentIndex--;
        },
        next: function () {
            this.currentIndex >= this.middleData.length - 1 ? this.middleData.length - 1 : this.currentIndex++;
        },
        changeIndex: function (index) {
            this.currentIndex = index - 1;
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
        },

        formatTime: function (timestamp) {
            var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
            var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
            var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
            return Y + M + D + h + m + s;
        },
        overflowHide: function (val) {
            var str = '';
            if (val) {
                str = val.toString();
                if (str.length > 10) {
                    str = str.substring(0, 10) + '...'
                }
            } else {
                str = '-'
            }
            return str;
        },
        stringTimeFat: function (val) {
            if (val) {
                if (val.length > 8) {
                    return val.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/g, '$1-$2-$3 $4:$5:$6')
                } else {
                    return val.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')
                }
            } else {
                return '-'
            }
        }
    },
    components: {
        'date-picker': VueBootstrapDatetimePicker
    },
    // 类型状态
    filters: {
        defaultEndOperation: function (item) {
            if (item) {
                return item.replace(/01/g, '赎回').replace(/02/g, '解散').replace(/03/g, '转托管').replace(/04/g, '到期转换').replace(/05/g, '续期');
            }
        },
        optionalEndOperations: function (item) {
            if (item) {
                return item.replace(/01/g, '赎回').replace(/02/g, '解散').replace(/03/g, '转托管').replace(/04/g, '到期转换').replace(/05/g, '续期');
            }
        },
    }
});
