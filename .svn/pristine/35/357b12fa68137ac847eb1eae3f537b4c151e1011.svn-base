var vm = new Vue({
    el: '#content',
    data: {
        // info
        diaMsg: '',
        // table data
        tableData: [],
        currentIndex: 0,
        pageMaxNum: '10',
        condition: '',
        // query
        status: '',
        // ymonth: '',
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
            let currentIndex = parseInt(this.currentIndex);
            return this.middleData[currentIndex];
        }
    },
    created: function () {
        var _this = this;
        $.post({
            url: '/thirdPartyOperation/expenseMgmt/transactionSum/list.ajax',
            // data: params,
            success: function (result) {
                if (result.error == 0) {
                    _this.tableData = result.data
                } else {
                    _this.showDialog('', 'info', false, '数据获取失败');
                }
            },
            error: function () {
                _this.showDialog('', 'info', false, '数据获取失败');
            }
        });
    },
    mounted: function () {
        var _this = this;
        var dialogs = ['', '', 'editioninfo', 'info'];
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
        $('.date-picker').datepicker({
            autoclose: true,
            todayHighlight: true,
            format: 'yyyy-mm',
            language: 'cn',
            startView: 'year',
            maxViewMode: 'years',
            minViewMode: 'years',
            // startView:'months',
            // maxViewMode:'months',
            minViewMode: 'months'
        }).next().on(ace.click_event, function () {
            $(this).prev().focus();
        });
    },
    methods: {
        prev: function () {
            this.currentIndex <= 0 ? 0 : this.currentIndex--;
        },
        next: function () {
            this.currentIndex >= this.middleData.length - 1 ? this.middleData.length - 1 : this.currentIndex++;
        },
        changeIndex: function (index) {
            this.currentIndex = index - 1;
        },
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
        },
        query: function () {
            var _this = this;
            var ym = this.$refs.ym.value;
            console.log(ym)
            if (!ym && !this.status) {
                $.post({
                    url: '/thirdPartyOperation/expenseMgmt/transactionSum/list.ajax',
                    success: function (result) {
                        if (result.error == 0) {
                            _this.tableData = result.data
                        } else {
                            _this.showDialog('', 'info', false, '数据获取失败');
                        }
                    },
                    error: function () {
                        _this.showDialog('', 'info', false, '数据获取失败');
                    }
                });
                return;
            }
            var time = ym.replace('-', '')
            var params = {}
            if (time && this.status) {
                params = {
                    ymonth: time,
                    status: this.status
                }

            } else {
                if (time) {
                    params = {
                        ymonth: time
                    }
                } else {
                    params = {
                        status: this.status
                    }
                }
            }
            console.log(params)
            $.post({
                url: '/thirdPartyOperation/expenseMgmt/transactionSum/list.ajax',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        console.log(result)
                        if (result.data[0]) {
                            _this.tableData = result.data
                        } else {
                            _this.showDialog('', 'info', false, '没有该数据');
                        }
                    } else {
                        _this.showDialog('', 'info', false, '数据获取失败');
                    }
                },
                error: function () {
                    _this.showDialog('', 'info', false, '数据获取失败');
                }
            });
        },
        sendGoTo: function (el, y) {
            window.location.href = "/thirdPartyOperation/expenseMgmt/transactionSum.html?pageType=review&ymonth=" + y;
        },
        download: function (ymonth) {
            var url = '/thirdPartyOperation/expenseMgmt/transactionSum/exportDays.ajax?ymonth=' + ymonth;;

            window.location.href = url;
        },
        //重新初算弹框
        breaks: function(ymonth,faretype) {
            var _this = this;
            _this.showDialog('', 'chu', false)
            _this.faretype = faretype;
            _this.ymonth = ymonth;

        },
         //重新初算
         recalculation: function () {
            var _this = this;
            var params = {};
               
                params.faretype=_this.faretype;
                params.ymonth=_this.ymonth;
            $.get({
                url: '/thirdPartyOperation/expenseMgmt/transactionSum/recalculation.ajax',
                data: params,
                success: function (result) {
                    console.log(result)
                    if (result.error == 0) {
                        
                         //   _this.tableData = result.data;                      
                                                 
                    }
                    else {
                       _this.showDialog('', 'info', false, '数据获取失败');  
                    }
                },
                error: function () {
                        _this.showDialog('', 'info', false, '数据获取失败');
                    }
            });
            setTimeout(function(){
                window.location.reload() 
            },1500)
         },
    },
    watch: {
        pageMaxNum: {
            handler: function (val, oldval) {
                this.currentIndex = 0;
            }
        },
        condition: {
            handler: function (val, oldval) {
                this.currentIndex = 0;
            }
        }
    },
    filters: { //格式化时间戳
        time: function (item) {
            var date = new Date(item);
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;
            var d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            var h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            var minute = date.getMinutes();
            var second = date.getSeconds();
            minute = minute < 10 ? ('0' + minute) : minute;
            second = second < 10 ? ('0' + second) : second;
            return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
        },
        status: function (item) {
            item = item.toUpperCase() //统一转为大写
            if (item == 'N') {
                return '待复核'
            } else if (item == 'D') {
                return '复核中'
            } else if (item == 'S') {
                return '已复核'
            } else {
                return item
            }
        }
    }
})