new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        tableData: [],
        diaMsg: '',
        // 查询用
        fundId:'',
        datetime:'',
        acceptMode:'all',
        allFund:[],
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10,
        condition: ""
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
    watch: {
        // 假分页
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

        //下拉列表自带搜索功能---业务查询框
        var fundArr = ['fundNameList2'];
        fundArr.forEach(function (value) {
            $('#' + value).chosen({
                search_contains: true,
                // disable_search: true,
                no_results_text: '未找到相关产品信息',
                disable_search_threshold: 6,
                width: '170px'
            });
        });
        $('#fundNameList2').on('change', function (e, params) {
            _this.fundId = params ? params.selected : '';
        });
        // this.getTableData(0);
        this.getFundList();
    },
    methods: {
        // 获取所有基金
        getFundList: function () {
            var _this = this;
            $.post({//基金名称查询
                url: '/businessMgmt/pauseTradeMgmt/pauseTradeStatus/collection.ajax',
                data: {
                    fundTypeCustomized:'ALL'
                },
                success: function (result) {
                    if (result.error === 0 && Array.isArray(result.data)) {
                        // _this.selectOption.lineFundIdList = result.data;
                        result.data.map((item)=>{
                            // 20211201 基金代码对应的fundType不是['6','9','A']对应的高端产品
                            if(!['6','9','A'].includes(item.fundType)){
                                _this.allFund.push(item);
                            }
                        });
                        // 下拉列表
                        // var str = '<option value="">全部</option>';
                        var str = '<option value=""></option>';
                        _this.allFund.forEach(function (item) {
                            str += '<option value="' + item.fundId + '">' + item.fundId + '-' + item.fundName + '</option>';
                        });
                        var fundArr2 = ['fundNameList2'];
                        fundArr2.forEach(function (value) {
                            $('#' + value).html(value === '' ? ('<option value="">全部基金</option>' + str) : str);
                            $('#' + value).trigger('chosen:updated');
                        });

                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        // 获取业务数据
        getTableData: function (currentIndex) {
            var _this = this;
            _this.tableData=[] //每次先清空
            // 当前时间
            var nowdate = new Date()
            var y = nowdate.getFullYear()
            var m = nowdate.getMonth() + 1
            m = m < 10 ? '0' + m : m
            var d = nowdate.getDate();
            var h= nowdate.getHours();
            var min= nowdate.getMinutes();
            var s= nowdate.getSeconds();
            d = d < 10 ? ('0' + d) : d;

            if (h >= 0 && h <= 9) {
                h = "0" + h;
            }
            if (min >= 0 && min <= 9) {
                min = "0" + min;
            }
            if (s >= 0 && s <= 9) {
                s = "0" + s;
            }
            var checkTime = y + "" + m + "" + d + "" + h + "" + min + "" +s;  //获取当前时间
            var params = {};
            var time=this.$refs.datetime.value;
            this.currentIndex= 0;
            params.fundId = this.fundId;
            if(time==""){
                params.datetime= checkTime
            }else{
                params.datetime= time.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1$2$3$4$5$6');
            }
            if(this.acceptMode=="all"){
                params.acceptMode="[0,2,6,7,P]";
            }else{
                params.acceptMode= this.acceptMode;
            }
            if( params.fundId==""){
                return _this.showDialog('', 'info', false, "请输入基金代码查询!");
            }
            console.log(params)
            $.post({
                url: '/businessMgmt/pauseTradeMgmt/pauseTradeStatus/getTableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.currentIndex = 0;
                        _this.tableData = result.data;
                        // 匹配基金名称
                        _this.tableData.map(function(item){
                            _this.allFund.forEach(function(itemFund){
                                if(item.fundId==itemFund.fundId){
                                    return item.fundName=itemFund.fundName
                                }
                            })
                            item.data = params.datetime.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/g, '$1-$2-$3');
                            item.time = params.datetime.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/g, '$4:$5:$6');
                            return item;
                        })
                        // _this.tableData = result.data.tableData.filter(function (item) {
                        //     return item.bundleno.indexOf(params.bundleno) > -1
                        //         && item.startDate.indexOf(params.startDate) > -1;
                        // });
                    }
                    else {
                        _this.tableData = [];
                        _this.currentIndex = 0;
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },


        filterToId:function(val){
            var str='';
            var _this=this;
            _this.allList.forEach(function(item){
                if(item.fundId==val){
                    str=item.fundName
                }
            })
            return str;
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
    filters:{
        canBeAutomatic: function (item) {
            if (item) {
                return item.replace(/Y/g, '是(Y)').replace(/N/g, '否(N)')
            }
        },
        canBePurchased: function (item) {
            if (item) {
                return item.replace(/Y/g, '是(Y)').replace(/N/g, '否(N)')
            }
        },
        canBeRedemed: function (item) {
            if (item) {
                return item.replace(/Y/g, '是(Y)').replace(/N/g, '否(N)')
            }
        },
        canBeSubscribed: function (item) {
            if (item) {
                return item.replace(/Y/g, '是(Y)').replace(/N/g, '否(N)')
            }
        },
        acceptMode: function (value) {
            if (value == 0) {
                return '柜台'
            } else if (value == 2) {
                return '网上'
            } else if (value == 7) {
                return '企业版'
            } else if (value == 6) {
                return '第三方'
            } else if (value == 'P') {
                return '机构服务平台'
            }else {
                return value;
            }
        },
    }
});
