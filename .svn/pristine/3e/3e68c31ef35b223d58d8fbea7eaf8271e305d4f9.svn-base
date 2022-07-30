var vm = new Vue({
    el: '#content',
    data: {
        // info
        diaMsg: '',
        // table data
        tableData: [],
        currentIndex: 0,
        pageMaxNum: '200',
        condition: '',
        // windowGoto
        faretype: '',
        ymonth: '',
        // editionDialog
        editioninfo: [],

        // query
        fundnm: '',
        branchnm: '',

        remark: '',
        userId: '',
        changeStatus: false,
        checktime:'',
        operater:'',
        feedbackgo:'',
        xiaohui:true
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
        },

    },
    created() {
        var _this = this;

        this.ymonth = this.getUrlParam("ymonth");
        // console.log(_this.faretype);
        _this.status=_this.getUrlParam("status");  
        var params = {
            // faretype: this.faretype
            ymonth: this.ymonth
        };
        $.post({
            url: '/thirdPartyOperation/expenseMgmt/transactionSum~feedbackSum/reviewList.ajax',
            data: params,
            success: function (result) {
                if (result.error == 0) {
                    for(var i=0;i<result.data.tradeMonthList.length;i++){
                        result.data.tradeMonthList[i].subscriberate=parseFloat(result.data.tradeMonthList[i].subscriberate*100);
                        result.data.tradeMonthList[i].buyrate=parseFloat(result.data.tradeMonthList[i].buyrate*100)
                        result.data.tradeMonthList[i].redeemrate=parseFloat(result.data.tradeMonthList[i].redeemrate*100)
                    }
                    _this.tableData = result.data.tradeMonthList;
                    _this.userId = result.userid;
                    _this.remark=result.data.tradeSummary.remark;
                    _this.operater=result.data.tradeSummary.operater;
                    _this.checktime=result.data.tradeSummary.checktime?formatTime(result.data.tradeSummary.checktime):'';
                    console.log(result.data);

                    if (result.data.tradeSummary.status == 'N' || result.data.tradeSummary.status == 'D') {
                        _this.changeStatus = true;
                    }else{
                        _this.changeStatus = false;
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
    mounted: function () {
        var _this = this;
        var dialogs = ['', '', '', 'info'];
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
        _this.feedbackgo=_this.getUrlParam("feedbackgo");
        _this.status=_this.getUrlParam("status");
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
        reHomeList:function () {
            var _this = this;


            this.ymonth = this.getUrlParam("ymonth");
            // console.log(_this.faretype);

            var params = {
                // faretype: this.faretype
                ymonth: this.ymonth
            };
            $.post({
                url: '/thirdPartyOperation/expenseMgmt/transactionSum~feedbackSum/reviewList.ajax',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        for(var i=0;i<result.data.tradeMonthList.length;i++){
                            result.data.tradeMonthList[i].subscriberate=parseFloat(result.data.tradeMonthList[i].subscriberate*100);
                            result.data.tradeMonthList[i].buyrate=parseFloat(result.data.tradeMonthList[i].buyrate*100)
                            result.data.tradeMonthList[i].redeemrate=parseFloat(result.data.tradeMonthList[i].redeemrate*100)
                        }
                        _this.tableData = result.data.tradeMonthList;
                        _this.userId = result.userid;
                        _this.remark=result.data.tradeSummary.remark;
                        _this.operater=result.data.tradeSummary.operater;
                        _this.checktime=result.data.tradeSummary.checktime?formatTime(result.data.tradeSummary.checktime):'';

                        if (result.data.tradeSummary.status == 'N' || result.data.tradeSummary.status == 'D') {
                            _this.changeStatus = true;
                        }else{
                            _this.changeStatus = false;
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
        getUrlParam: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg); //匹配目标参数
            if (r != null) return unescape(r[2]);
            return ''; //返回参数值
        },
        getEditionHis: function (fundid, branchcode) { //获取版本历史信息
            var _this = this;
            var params = {
                ymonth: this.ymonth,
                fundid: fundid,
                branchcode: branchcode
            };
            $.post({
                url: '/thirdPartyOperation/expenseMgmt/transactionSum~feedbackSum/queryHis.ajax',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        if (result.data[0].ymonth) {
                            _this.editioninfo = result.data;
                            _this.showDialog('', 'editioninfo', false, '没有该数据');
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
            this.showDialog('', 'editioninfo', false);
        },
        dialogSend: function (item) {
            var hrefUrl = '/thirdPartyOperation/expenseMgmt/transactionSum.html?pageType=days';
            hrefUrl += '&ymonth=' + item.ymonth;
            hrefUrl += '&fundid=' + item.fundid;
            hrefUrl += '&branchcode=' + item.branchcode;
            hrefUrl += '&edition=' + item.edition;
            hrefUrl +='&onlywrite=1';
            window.location.href = hrefUrl;
        },
        sendGoTo: function (el, branchcode, fundid) {
            var _this = this;
            var feedbackgo=_this.getUrlParam("feedbackgo");
            window.location.href = "/thirdPartyOperation/expenseMgmt/transactionSum.html?pageType=days&branchcode=" + branchcode + '&fundid=' + fundid + '&ymonth=' + this.ymonth+'&feedbackgo='+feedbackgo;
        },
        query: function () { //查询
            var _this = this;
            var params = {};

            params.ymonth= _this.ymonth;
            if(this.fundnm==''&&this.branchnm==''){
                _this.reHomeList();
                return false;
            }
            if (this.fundnm && this.branchnm) {
                params.fundnm = this.fundnm;
                params.branchnm = this.branchnm;
            } else {
                if (this.fundnm) {
                    params.fundnm = this.fundnm;
                } else {
                    params.branchnm = this.branchnm;
                }
            }
            this.changeStatus = false;
            // var params = {
            //     // faretype: this.faretype
            //     ymonth: this.ymonth
            // };
            $.post({
                url: '/thirdPartyOperation/expenseMgmt/transactionSum~feedbackSum/reviewList.ajax',
                data: params? params : {},
                success: function (result) {
                    if (result.error == 0) {
                        console.log('before:',result.data.tradeMonthList);
                        for(var i=0;i<result.data.tradeMonthList.length;i++){
                            result.data.tradeMonthList[i].subscriberate=parseFloat(result.data.tradeMonthList[i].subscriberate*100);
                            result.data.tradeMonthList[i].buyrate=parseFloat(result.data.tradeMonthList[i].buyrate*100)
                            result.data.tradeMonthList[i].redeemrate=parseFloat(result.data.tradeMonthList[i].redeemrate*100)
                        }
                        _this.userId = result.userid;
                        _this.remark=result.data.tradeSummary.remark;
                        _this.operater=result.data.tradeSummary.operater;
                        _this.checktime=result.data.tradeSummary.checktime?formatTime(result.data.tradeSummary.checktime):'';
                        console.log(_this.tableData);
                        _this.tableData = result.data.tradeMonthList;
                        if (result.data.tradeSummary.status == 'N' || result.data.tradeSummary.status == 'D') {
                            _this.changeStatus = true;
                        }else{
                            _this.changeStatus = false;
                        }
                        // console.log('after:',_this.tableData);

                    } else {
                        _this.showDialog('', 'info', false, '数据获取失败');
                    }
                },
                error: function () {
                    _this.showDialog('', 'info', false, '数据获取失败');
                }
            });
        },
        keepOrReview: function (checkflag) {
            var params = {
                    ymonth: this.ymonth,
                    checkflag: checkflag,
                    remark: this.remark,
                    operater: this.userId
                },
                _this = this;

            if (this.fundnm && this.branchnm) {
                params.fundnm = this.fundnm;
                params.branchnm = this.branchnm;
            } else {
                if (this.fundnm) {
                    params.fundnm = this.fundnm;
                } else {
                    params.branchnm = this.branchnm;
                }
            }

            $.post({
                url: '/thirdPartyOperation/expenseMgmt/transactionSum/reviewOrKeep.ajax',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        if (checkflag == 1) {
                            _this.showDialog('', 'info', false, '保存成功');
                        } else {
                            _this.showDialog('', 'info', false, '复核成功');
                            // _this.faretype = '1'
                        }
                        _this.query()

                    } else {
                        _this.showDialog('', 'info', false, '数据获取失败');
                    }
                },
                error: function () {
                    _this.showDialog('', 'info', false, '数据获取失败');
                }
            });
        },
        check: function () { //对比无误
            var params = {
                    ymonth: this.ymonth,
                    faretype:2
                },
                _this = this;

            $.post({
                url: '/thirdPartyOperation/expenseMgmt/transactionSum~feedbackSum/check.ajax',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        _this.showDialog('', 'info', false, result.msg);
                        _this.xiaohui = false;
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                },
                error: function () {
                    _this.showDialog('', 'info', false, result.msg);
                }
            });
        },
        download: function (item) {
            var _this = this;
            var params = {
                    ymonth: this.ymonth
                },
                url;
            if (item == 'days') {
                url = '/thirdPartyOperation/expenseMgmt/transactionSum~feedbackSum/exportDays.ajax?ymonth=' + this.ymonth;
            } else {
                url = '/thirdPartyOperation/expenseMgmt/transactionSum~feedbackSum/exportMonth.ajax?ymonth=' + this.ymonth;
            }
            window.location.href = url;
            // $.post({
            //     url: url,
            //     data: params,
            //     success: function (result) {
            //         if (result.error == 0) {
            //             // _this.showDialog('', 'info', false, result.msg);
            //         } else {
            //             // _this.showDialog('', 'info', false, result.msg);
            //         }
            //     },
            //     error: function () {
            //         // _this.showDialog('', 'info', false, result.msg);
            //     }
            // });


        },
        selectAll: function () {
            var _this = this;
            if (this.allCheck) {
                this.viewData.forEach(function (item) {
                    item.check = false;
                    var _index = _this.inSelected(item, _this.tableSelect, 'branchcode','fundid');
                    if (_index > -1) {
                        _this.tableSelect.splice(_index, 1);
                    }
                });
            } else {
                this.viewData.forEach(function (item) {
                    item.check = true;
                    var _index = _this.inSelected(item, _this.tableSelect, 'branchcode','fundid');
                    if (_index == -1) {
                        _this.tableSelect.push(item);
                    }
                });
            }
        },
        select: function (index) {
            var item = this.viewData[index];
            item.check = !item.check;
            var _index = this.inSelected(item, this.tableSelect, 'branchcode','fundid');
            if (item.check && _index == -1) {
                this.tableSelect.push(item);
            }
            if (!item.check && _index > -1) {
                this.tableSelect.splice(_index, 1);
            }
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
        },
        // tableData: {
        //     handler: function (val, oldval) {
        //         if (this.tableData[0].status == 'S') {
        //             this.changeStatus = false;
        //         } else {
        //             this.changeStatus = true;
        //         }
        //     },
        //     deep: true
        // }
    },
    filters: {//格式化时间戳
        time: function (obj) {
            var date = new Date(obj);
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
            return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
        },
        // 状态
        status:function(item){
            item = item.toUpperCase()
            if (item==="N") {
                return "待复核"
            }else if(item==="D"){
                return "复核中"
            }else if(item==="S"){
                return "已复核"
            }else{
                return item 
            }
        },      
    }
});
function formatTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return Y + M + D + h + m + s;
}