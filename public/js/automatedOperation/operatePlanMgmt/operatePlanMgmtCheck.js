var vm = new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        topData: {},
        custNo: '',
        tableData: [],
        chartsData: [],
        diaMsg: '',
        modelStatus:'',
        currentIndex2: 0,
        maxSpace2: 5,
        pageMaxNum2: 5,
        condition2: '',
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10
    },
    computed: {
        pageList: function () {
            var arr = [];
            if (this.totalPage <= 2 * this.maxSpace) {
                for (var i = 0; i < this.totalPage; i++) {
                    arr.push(i + 1);
                }
                return arr;
            }
            if (this.currentIndex > this.maxSpace && this.totalPage - this.currentIndex > this.maxSpace) {
                for (var i = this.currentIndex - this.maxSpace; i < this.currentIndex + this.maxSpace; i++) {
                    arr.push(i + 1);
                }
            } else if (this.currentIndex <= this.maxSpace && this.totalPage - this.currentIndex > this.maxSpace) {
                for (var i = 0; i < this.currentIndex + (2 * this.maxSpace - this.currentIndex); i++) {
                    arr.push(i + 1);
                }
            } else if (this.currentIndex > this.maxSpace && this.totalPage - this.currentIndex <= this.maxSpace) {
                var space = this.totalPage - this.currentIndex;
                for (var i = this.currentIndex - (2 * this.maxSpace - space); i < this.totalPage; i++) {
                    arr.push(i + 1);
                }
            } else {
                for (var i = 0; i < this.totalPage; i++) {
                    arr.push(i + 1);
                }
            }
            return arr;
        },
        //主表格分页
        middleData: function () {
            var middleData = [];
            var filterData = [];
            var pageMaxNum = parseInt(this.pageMaxNum2);
            var _this = this;
            this.chartsData.forEach(function (jsonObj) {
                var valueArr = [];
                for (var prop in jsonObj) {
                    valueArr.push(jsonObj[prop]);
                }
                for (var i = 0, len = valueArr.length; i < len; i++) {
                    if (valueArr[i]) {
                        if (valueArr[i].toString().indexOf(_this.condition2) != -1) {
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
            var currentIndex = parseInt(this.currentIndex2);
            return this.middleData[currentIndex];
        },
        pageList2: function () {
            var arr = [];
            if (this.middleData.length <= 2 * this.maxSpace2) {
                for (var i = 0; i < this.middleData.length; i++) {
                    arr.push(i + 1);
                }
                return arr;
            }
            if (this.currentIndex2 > this.maxSpace2 && this.middleData.length - this.currentIndex2 > this.maxSpace2) {
                for (var i = this.currentIndex2 - this.maxSpace2; i < this.currentIndex2 + this.maxSpace2; i++) {
                    arr.push(i + 1);
                }
            }
            else if (this.currentIndex2 <= this.maxSpace2 && this.middleData.length - this.currentIndex2 > this.maxSpace2) {
                for (var i = 0; i < this.currentIndex2 + (2 * this.maxSpace2 - this.currentIndex2); i++) {
                    arr.push(i + 1);
                }
            }
            else if (this.currentIndex2 > this.maxSpace2 && this.middleData.length - this.currentIndex2 <= this.maxSpace2) {
                var space = this.middleData.length - this.currentIndex2;
                for (var i = this.currentIndex2 - (2 * this.maxSpace2 - space); i < this.middleData.length; i++) {
                    arr.push(i + 1);
                }
            }
            else {
                for (var i = 0; i < this.middleData.length; i++) {
                    arr.push(i + 1);
                }
            }
            return arr;
        },
    },
    watch: {
        pageMaxNum: function () {
            this.currentIndex = 0;
            this.getListData(0);
        },
        pageMaxNum2: function () {
            this.currentIndex2 = 0;
        },
        condition: function () {
            this.currentIndex = 0;
        },
        condition2: function () {
            this.currentIndex2 = 0;
        }
    },
    filters: {
        translateTriggerType: function (value) {
            if (value == 1) {
                return '触发型';
            }
            if (value == 2) {
                return '定时型';
            }
            return value;
        },
        translateTakeEffectType: function (value) {
            if (value == '00') {
                return '实时';
            }
            if (value == '01') {
                return '单次';
            }
            if (value == '03') {
                return '重复';
            }
            return value;
        },
        translateStatus: function (value) {
            if (value == 0) {
                return '失败';
            }
            if (value == 1) {
                return '成功';
            }
            return value;
        }
    },
    created: function () {
        this.getTopData();
        this.getListData(0);
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
            format: 'YYYY-MM-DD',//use this option to display seconds
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
        this.modelStatus=this.getUrlParam('modelStatus');
    },
    methods: {
        //业务方法
        getTopData: function () {
            var _this = this;
            var params = {};
            params.blockId = this.getUrlParam('blockId');
            params.modelId = this.getUrlParam('modelId');
            if (!params.blockId || !params.modelId) {
                return;
            }
            $.post({
                url: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/getTopDataForCheck.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.topData = result.data;
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        getListData: function (currentIndex) {
            var params = {};
            params.custNo = this.custNo;
            params.startTime = $('#startTime').val();
            params.endTime = $('#endTime').val();
            params.pageNo = currentIndex + 1;
            params.pageSize = this.pageMaxNum;
            params.blockId = this.getUrlParam('blockId');
            params.modelId = this.getUrlParam('modelId');
            console.log(params,'clg');
            var _this = this;
            $.post({
                url: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/getListDataForCheck.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.tableData = result.data.rows;
                        _this.currentIndex = result.data.pageNum - 1;
                        _this.totalPage = result.data.pages;
                        _this.tableData.length > 0 && _this.printEcharts();
                    }
                    else {
                        _this.tableData = [];
                        _this.currentIndex = 0;
                        _this.totalPage = 0;
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        printEcharts: function () {
            var params = {};
            params.startTime = this.topData.startTime?this.topData.startTime:'';
            params.endTime = this.topData.endTime?this.topData.endTime:'';
            params.blockId = this.getUrlParam('blockId');
            params.modelId = this.getUrlParam('modelId');
            var _this = this;
            $.post({
                url: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/getChartsDataForCheck.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0 && result.data.length > 0) {
                        _this.chartsData = result.data;
                        _this.chartsData.forEach(function (item) {
                            item.days = item.days.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3');
                        });
                        var myChart = echarts.init(document.getElementById('charts'));
                        myChart.setOption({
                            xAxis: {
                                data: _this.chartsData.map(function (item) {
                                    return item.days;
                                })
                            },
                            yAxis: {},
                            series: [{
                                name: '人数',
                                type: 'line',
                                data: _this.chartsData.map(function (item) {
                                    return item.count;
                                })
                            }]
                        });
                    }
                }
            });
        },
        updateToHomePage:function(blockItem){
            var url='/automatedOperation/operatePlanMgmt/operatePlanMgmt.html?blockId=' + blockItem.blockId + '&modelId=' + blockItem.modelId+'&modelStatus='+this.modelStatus;
            window.open(url)
        },
        //主表格分页方法
        prev: function () {
            if (this.currentIndex <= 0) {
                return;
            }
            this.getListData(this.currentIndex - 1);
        },
        next: function () {
            if (this.currentIndex >= this.totalPage - 1) {
                return;
            }
            this.getListData(this.currentIndex + 1);
        },
        changeIndex: function (index) {
            this.getListData(index - 1);
        },
        toFirst: function () {
            this.getListData(0);
        },
        toLast: function () {
            this.getListData(this.totalPage - 1);
        },
        //主表格分页方法
        prev2: function () {
            this.currentIndex2 <= 0 ? 0 : this.currentIndex2--;
        },
        next2: function () {
            this.currentIndex2 >= this.middleData.length - 1 ? this.middleData.length - 1 : this.currentIndex2++;
        },
        changeIndex2: function (index) {
            this.currentIndex2 = index - 1;
        },
        toFirst2: function () {
            this.currentIndex2 = 0;
        },
        toLast2: function () {
            this.currentIndex2 = this.middleData.length - 1;
        },
        getUrlParam: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg); //匹配目标参数
            if (r != null) return unescape(r[2]);
            return '';
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
