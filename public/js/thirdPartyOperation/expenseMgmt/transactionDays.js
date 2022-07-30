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
        status:'',
        //anew
        anew: false,
        reviews:false,
        //初始input展示数据
        divideInputData: {},
        tradeMonth: [],
        // query
        branchcode: '',
        fundid: '',
        ymonth: '',
        edition:'',
        //keepOrkeepOrReview
        keepStatus: {
            //说明
            rengExplain: '',
            shenExplain: '',
            shuExplain: '',
            //调整(真实数据)
            rengChange: '',
            shenChange: '',
            shuChange: '',
            // //调整(前端显示数据)
            // rengChangeDom: '',
            // shenChangeDom: '',
            // shuChangeDom: '',
            //调增
            rengUp: '',
            shenUp: '',
            shuUp: '',
        },
        //原始数据
        formerData: '',

        userId: '',

        num: '',
        reng: '',
        shen: '',
        shu: '',
        onlywrite:'',
        feedbackgo:''
    },
    computed: {
        middleData: function () {
            var middleData = [];
            var filterData = [];
            var pageMaxNum = parseInt(this.pageMaxNum);
            var _this = this;
            _this.feedbackgo=_this.getUrlParam("feedbackgo");
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
        reviewStatus: function () { //判断复核状态
            var _this = this;
            console.log(_this.anew+"&&&"+_this.faretype);
            //关于anew的值，点击保存 变为true点击复核变为false,点击重新复核变为true
            if (_this.anew) {
                console.log(123);
                return false;
            }
            else if(!_this.anew&&_this.status=="S"){
                return true;
            }
            else if(!_this.anew&&_this.status!=="S"){
                return false;
            }
            else {
                console.log(456);
                return true;
            }
        },
        renggou: function () {
            var _this=this;
            return function(item) {
                var val = _this.keepStatus.rengChange;
                var num = (item * val/100).toFixed(2);
                num = Number(num);
                return num;
            }
        },
        shengou: function () {
            var _this=this;
            return function(item) {
                var val = _this.keepStatus.shenChange;
                var num = (item * val/100).toFixed(2);
                num = Number(num);
                return num;
            }
        },
        shuhui: function () {
            var _this=this;
            return function(item) {
                var val = _this.keepStatus.shuChange ;
                var num = (item * val/100).toFixed(2);
                num = Number(num);
                return num;
            }
        },
        computedDays: function () {
            return function (subscribefare, buyfare, redeemfare) {
                return Number(subscribefare + buyfare + redeemfare).toFixed(2);
            }
        },
        //两位保留
        filters:function () {
            return function (value) {
                var realVal = parseFloat( Number(value).toFixed(2));
                return Number(realVal)
            }
        },
        //小计合计计算部分
        shuRel:function () {
            return this.filters(Number(this.shu)+Number(this.keepStatus.shuUp));
        },
        renRel:function () {
            return this.filters(Number(this.reng)+Number(this.keepStatus.rengUp));
        },
        shenRel:function () {
            return this.filters(Number(this.shen)+Number(this.keepStatus.shenUp));
        },
        sumAll:function () {
            return this.filters(Number(this.shen)+Number(this.keepStatus.shenUp)+Number(this.reng)+Number(this.keepStatus.rengUp)+Number(this.shu)+Number(this.keepStatus.shuUp));
        }

    },
    created: function () {
        var _this = this;

        // this.faretype = this.getUrlParam("faretype");
        this.branchcode = this.getUrlParam("branchcode");
        this.fundid = this.getUrlParam("fundid");
        this.ymonth = this.getUrlParam("ymonth");
        this.edition = this.getUrlParam("edition");
        this.onlywrite=this.getUrlParam("onlywrite");
        // if (this.faretype == 3) {
        //     this.anew = false
        // }
        // if (this.faretype == 1) {
        //     this.anew = false
        // }
        if(this.onlywrite=='1'){
            var params = {
                branchcode: this.branchcode,
                fundid: this.fundid,
                ymonth: this.ymonth,
                edition:this.edition
            };
            $.post({
                url: '/thirdPartyOperation/expenseMgmt/transactionSum~feedbackSum/daysHis.ajax',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        _this.tableData = result.data.tradeDaysHis;
                        _this.divideInputData = result.data.tradeMonthHis;
                        _this.tradeMonth.push(result.data.tradeMonthHis);
                        _this.userId = result.userid;
                        _this.status=result.data.tradeMonthHis.status;
                        // 认购
                        _this.keepStatus.rengChange = result.data.tradeMonthHis.subscriberate*100 ;
                        _this.keepStatus.rengUp = result.data.tradeMonthHis.subscribechangeamt;
                        _this.keepStatus.rengExplain = result.data.tradeMonthHis.subscriberemark;
                        // 申购
                        _this.keepStatus.shenChange = result.data.tradeMonthHis.buyrate*100 ;
                        _this.keepStatus.shenUp = result.data.tradeMonthHis.buychangeamt;
                        _this.keepStatus.shenExplain = result.data.tradeMonthHis.buyremark;
                        //赎回
                        _this.keepStatus.shuChange = result.data.tradeMonthHis.redeemrate*100 ;
                        _this.keepStatus.shuUp = result.data.tradeMonthHis.redeemchangeamt;
                        _this.keepStatus.shuExplain = result.data.tradeMonthHis.redeemremark;

                        console.log(result.data.tradeMonthHis)
                        // 赋值给原始数据
                        _this.formerData = JSON.parse(JSON.stringify(_this.keepStatus))
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
        var params = {
            branchcode: this.branchcode,
            fundid: this.fundid,
            ymonth: this.ymonth
        };
        $.post({
            url: '/thirdPartyOperation/expenseMgmt/transactionSum~feedbackSum/daysList.ajax',
            data: params,
            success: function (result) {
                if (result.error == 0) {
                    _this.tableData = result.data.tradeDays;
                    _this.divideInputData = result.data.tradeMonth;
                    _this.tradeMonth.push(result.data.tradeMonth);
                    _this.userId = result.userid;
                    _this.status=result.data.tradeMonth.status;
                    // 认购
                    _this.keepStatus.rengChange = result.data.tradeMonth.subscriberate*100 ;
                    _this.keepStatus.rengUp = result.data.tradeMonth.subscribechangeamt;
                    _this.keepStatus.rengExplain = result.data.tradeMonth.subscriberemark;
                    // 申购
                    _this.keepStatus.shenChange = result.data.tradeMonth.buyrate*100 ;
                    _this.keepStatus.shenUp = result.data.tradeMonth.buychangeamt;
                    _this.keepStatus.shenExplain = result.data.tradeMonth.buyremark;
                    //赎回
                    _this.keepStatus.shuChange = result.data.tradeMonth.redeemrate*100 ;
                    _this.keepStatus.shuUp = result.data.tradeMonth.redeemchangeamt;
                    _this.keepStatus.shuExplain = result.data.tradeMonth.redeemremark;

                    console.log(result.data.tradeMonth)
                    // 赋值给原始数据
                    _this.formerData = JSON.parse(JSON.stringify(_this.keepStatus))
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
        // _this.shurel=_this.filters(_this.shu+_this.keepStatus.shuUp);
        // console.log(_this.shurel);
    },
    updated: function () {
        this.computedClass('num')
        this.computedClass('reng')
        this.computedClass('shen')
        this.computedClass('shu')
    },
    methods: {
        reviewHomepage:function () {
            var _this=this;
            this.branchcode = this.getUrlParam("branchcode");
            this.fundid = this.getUrlParam("fundid");
            this.ymonth = this.getUrlParam("ymonth");
            var params = {
                branchcode: this.branchcode,
                fundid: this.fundid,
                ymonth: this.ymonth
            };
            $.post({
                url: '/thirdPartyOperation/expenseMgmt/transactionSum~feedbackSum/daysList.ajax',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        _this.tableData = result.data.tradeDays;
                        _this.divideInputData = result.data.tradeMonth;
                        _this.tradeMonth=[];
                        _this.tradeMonth.push(result.data.tradeMonth);
                        _this.userId = result.userid;
                        _this.status= result.data.tradeMonth.status;
                        // 认购
                        _this.keepStatus.rengChange = result.data.tradeMonth.subscriberate*100 ;
                        _this.keepStatus.rengUp = result.data.tradeMonth.subscribechangeamt;
                        _this.keepStatus.rengExplain = result.data.tradeMonth.subscriberemark;
                        // 申购
                        _this.keepStatus.shenChange = result.data.tradeMonth.buyrate*100;
                        _this.keepStatus.shenUp = result.data.tradeMonth.buychangeamt;
                        _this.keepStatus.shenExplain = result.data.tradeMonth.buyremark;
                        //赎回
                        _this.keepStatus.shuChange = result.data.tradeMonth.redeemrate*100;
                        _this.keepStatus.shuUp = result.data.tradeMonth.redeemchangeamt;
                        _this.keepStatus.shuExplain = result.data.tradeMonth.redeemremark;

                        console.log(result.data.tradeMonth)
                        // 赋值给原始数据
                        _this.formerData = JSON.parse(JSON.stringify(_this.keepStatus))
                    } else {
                        _this.showDialog('', 'info', false, '数据获取失败');
                    }
                },
                error: function () {
                    _this.showDialog('', 'info', false, '数据获取失败');
                }
            });
        },
        computedClass: function (item) {
            var num = 0;
            this.viewData.forEach((val, ind) => {
                var tag = document.getElementsByClassName(item + ind)[0].innerText;
                num += parseFloat(parseFloat(tag).toFixed(2));

            })
            this[item] =num;
        },
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
        getUrlParam: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg); //匹配目标参数
            if (r != null) return unescape(r[2]);
            return ''; //返回参数值
        },
        back: function () {
            history.back()
        },
        checkObj: function (obj, formerObj) { //对比数据
            var keyNew = {};
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (obj[key] != formerObj[key]) {
                        keyNew[key] = obj[key]
                    }

                }
            }
            if (JSON.stringify(keyNew) == '{}') {
                return obj;
            }
            return keyNew;

        },
        keepOrReview: function (checkflag, recheckflag) {
            var sign = this.keepStatus;
                _this = this,
                objLength = Object.keys(this.keepStatus);
            // if (!sign) {
            //     this.showDialog('', 'info', false, '请调整数据后再操作');
            //     return;
            // }
            // var rengExplain = _this.keepStatus.rengExplain,
            //     shenExplain = _this.keepStatus.shenExplain,
            //     shuExplain = _this.keepStatus.shuExplain;
            var params = {};
            if (this.reviews&&this.anew) {
                params = {
                    ymonth: this.ymonth,
                    fundid: this.fundid,
                    branchcode: this.branchcode,
                    operater: this.userId,
                    checkflag: 3,
                    recheckflag: recheckflag
                };
            }
            else{
                params = {
                    ymonth: this.ymonth,
                    fundid: this.fundid,
                    branchcode: this.branchcode,
                    operater: this.userId,
                    checkflag: checkflag
                };
            }

            params.adjust = [];
            for (const key in sign) {
                if (sign.hasOwnProperty(key)) {

                    if (key != 'rengExplain' && key != 'shenExplain' && key != 'shuExplain') {
                        if (objLength.indexOf(key) == '3' ) {
                            params.adjust.push({
                                faretype: 2,
                                newvalue: (sign[key])/100,
                                changetype: objLength.indexOf(key) - 0 + 1,
                                remark: _this.keepStatus.rengExplain
                            })
                        }
                        if( objLength.indexOf(key) == '6'){
                            params.adjust.push({
                                faretype: 2,
                                newvalue: (sign[key]),
                                changetype: objLength.indexOf(key) - 0 + 1,
                                remark: _this.keepStatus.rengExplain
                            })
                        }
                        if(objLength.indexOf(key) == '4'){
                            params.adjust.push({
                                faretype: 2,
                                newvalue: (sign[key])/100,
                                changetype: objLength.indexOf(key) - 0 + 1,
                                remark: _this.keepStatus.shenExplain
                            })
                        }
                        if (objLength.indexOf(key) == '7') {
                            params.adjust.push({
                                faretype: 2,
                                newvalue: (sign[key]),
                                changetype: objLength.indexOf(key) - 0 + 1,
                                remark: _this.keepStatus.shenExplain
                            })
                        }
                        if(objLength.indexOf(key) == '5'){
                            params.adjust.push({
                                faretype: 2,
                                newvalue: (sign[key])/100,
                                changetype: objLength.indexOf(key) - 0 + 1,
                                remark: _this.keepStatus.shuExplain
                            })
                        }
                        if (objLength.indexOf(key) == '8') {
                            params.adjust.push({
                                faretype: 2,
                                newvalue: (sign[key]),
                                changetype: objLength.indexOf(key) - 0 + 1,
                                remark: _this.keepStatus.shuExplain
                            })
                        }

                    }

                }
            }
            // if (params.adjust.length == 0) {
            //     // if (!rengExplain || !shenExplain || !shuExplain) {
            //     this.showDialog('', 'info', false, '请调整数据后再操作');
            //     // }
            //     return;
            // }
            params.adjust = JSON.stringify(params.adjust)
            console.log(params)

            $.post({
                url: '/thirdPartyOperation/expenseMgmt/transactionSum~feedbackSum/keepOrReview.ajax',
                data: params,
                traditional: true,
                dataType: "json",
                success: function (result) {
                    if (result.error == 0) {
                        _this.showDialog('', 'info', false, result.msg);
                        _this.anew = true;
                        if (checkflag == '2') {
                            _this.anew = false;
                            _this.faretype=1;
                        }
                        _this.reviewHomepage();
                    } else {
                        _this.showDialog('', 'info', false, '数据获取失败');
                    }
                },
                error: function () {
                    _this.showDialog('', 'info', false, '数据获取失败');
                }
            });
        },
        update: function () {
            var params = {
                    fundid: this.fundid,
                    branchcode: this.branchcode
                },
                _this = this;
            console.log(params)
            $.post({
                url: '/thirdPartyOperation/expenseMgmt/transactionSum~feedbackSum/update.ajax',
                data: params,
                traditional: true,
                dataType: "json",
                success: function (result) {
                    if (result.error == 0) {
                        console.log(result)
                        // _this.keepStatus.shenChange=result.data.buyrate;
                        // _this.keepStatus.shuChange=result.data.redeemrate;
                        // _this.keepStatus.rengChange=result.data.subscriberate;
                        _this.divideInputData.buyrate = result.data.buyrate;
                        _this.divideInputData.redeemrate = result.data.redeemrate;
                        _this.divideInputData.subscriberate = result.data.subscriberate;
                        _this.showDialog('', 'info', false, result.msg);
                    } else {
                        _this.showDialog('', 'info', false, '刷新失败');
                    }
                },
                error: function () {
                    _this.showDialog('', 'info', false, '刷新失败');
                }
            });
        }
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

});