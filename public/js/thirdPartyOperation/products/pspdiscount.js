new Vue({
    el: '#content',
    data: {
        branchList: [],
        fundList: [],
        branchcode: '',
        branchname: '',
        subAmt: '',
        tradeTime: '',
        calcCommro: '',
        minamt: '',
        maxamt: '',
        cMan: '',
        fundid: '',
        fundId: '',
        fundname: '',
        commro: '',
        apkind: '',
        starttime: '',
        endtime: '',
        amt: '1',
        selectBranch: 0,
        serialno: "",
        tableData: [],
        branchData: [],
        diaMsg: "",
        //   表格分页
        currentIndex: 0,
        pageMaxNum: '20',
        condition: "",
        userid: "",
        username: "",
        batch: {
            branchList: [],
            fundList: [],
            branchcode: '',
            branchname: '',
            minamt: '',
            maxamt: '',
            cMan: '',
            fundid: '',
            fundId: '',
            fundname: '',
            commro: '',
            apkind: '',
            starttime: '',
            endtime: '',
            amt: '1',
            selectBranch: 0,
            serialno: "",
            tableData: [],
            branchData: [],
            validateData: [],
            diaMsg: "",
            //   表格分页
            currentIndex: 0,
            pageMaxNum: '20',
            condition: "",
            userid: "",
            username: "",
        }
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

        batchMiddleData: function () {
            var middleData = [];
            var filterData = [];
            var pageMaxNum = parseInt(this.batch.pageMaxNum);
            var _this = this;
            _this.batch.tableData.forEach(function (jsonObj) {
                var valueArr = [];
                for (var prop in jsonObj) {
                    valueArr.push(jsonObj[prop]);
                }
                for (var i = 0, len = valueArr.length; i < len; i++) {
                    if (valueArr[i]) {
                        if (valueArr[i].toString().indexOf(_this.batch.condition) != -1) {
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
        batchViewData: function () {
            var currentIndex = parseInt(this.batch.currentIndex);
            return this.batchMiddleData[currentIndex];
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
        branchcode: {
            handler: function (val, oldval) {
                if (val === '') {
                    this.branchname = "";
                } else {
                    this.getBranchBaseInfo(val);
                }
            }
        },
        pageMaxNum_batch: {
            handler: function (val, oldval) {
                this.batch.currentIndex = 0;
            }
        },
        condition_batch: {
            handler: function (val, oldval) {
                this.batch.currentIndex = 0;
            }
        },
        branchcode_batch: {
            handler: function (val, oldval) {
                if (val === '') {
                    this.batch.branchname = "";
                } else {
                    this.getBranchBaseInfo(val);
                }
            }
        },
        fundid: {
            handler: function (val, oldval) {
                let selectFundid = val;
                for (var idx = 0; idx < this.fundList.length; idx++) {
                    if (this.fundList[idx].fundid == selectFundid) {
                        this.fundname = this.fundList[idx].fundname;
                        return;
                    } else {
                        this.fundname = "unknown";
                    }
                    if (val === '') {
                        this.fundname = "";
                    }
                }

            }
        },
        userid: {
            handler: function (val, oldval) {
                let selectFundid = val.fundid;
                this.fundId = selectFundid;
                this.fundList.forEach(item => {
                    if (item.fundid === selectFundid) {
                        this.fundname = val.fundname;
                    }
                });
                if (typeof (selectFundid) == "undefined") {
                    this.fundname = '';
                }

            }
        }
    },
    mounted: function () {
        var _this = this;
        $('#starttime').val(_this.getNowTime);
        $('#endtime').val(_this.getNowTime);
        $('#tradeTime').val(_this.getNowTime);
        // _this.starttime = _this.getNowDate('-');
        // _this.endtime = _this.getNowDate('-');
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

        $('#uploadBtn').click(function () {
            $('#uploadFileInput').click();
        });
        $('#updateBtn').click(function () {
            $('#updateFileInput').click();
        });
        //显示文件全路径
        $('#uploadFileInput').on('change', function () {
            $('#uploadInput').val($(this).val());
        });
        $('#uploadInput').val('');
        $('#uploadFileInput').val('');
        this.uploadFundid = '';
        this.uploadFundnm = '';

        //初始化数据
        $.get({
            url: '/thirdPartyOperation/products/pspdiscount/qryBranchs.ajax',
            success: function (result) {
                console.log(result);
                if (result.error === 0) {

                    _this.branchData = result.data;

                } else {
                    _this.showDialog('', 'info', false, '数据获取失败');
                }
            },
            error: function () {
                _this.showDialog('', 'info', false, '数据获取失败');
            }
        });
        $.get({
            url: '/thirdPartyOperation/products/pspdiscount/search.ajax',
            success: function (result) {
                console.log(result);
                if (result.error === 0) {

                    _this.tableData = result.data;

                } else {
                    _this.showDialog('', 'info', false, '数据获取失败');
                }
            },
            error: function () {
                _this.showDialog('', 'info', false, '数据获取失败');
            }
        });
        $('.date-picker').datepicker({
            autoclose: true,
            todayHighlight: true,
            format: 'yyyy-mm-dd',
            language: 'cn'
        }).next().on(ace.click_event, function () {
            $(this).prev().focus();
        });
        $('.date-timepicker').datetimepicker({
            format: 'YYYY-MM-DD HH:mm:ss', //use this option to display seconds
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

    },
    methods: {
        // 主表格分页方法
        prev: function (type) {
            if (type === 1) {
                this.currentIndex <= 0 ? 0 : this.currentIndex--;
            } else {
                this.batch.currentIndex <= 0 ? 0 : this.batch.currentIndex--;
            }
        },
        next: function (type) {
            if (type === 1) {
                this.currentIndex >= this.middleData.length - 1 ? this.middleData.length - 1 : this.currentIndex++;
            } else {
                this.batch.currentIndex >= this.batchMiddleData.length - 1 ? this.batchMiddleData.length - 1 : this.batch.currentIndex++;
            }
        },
        changeIndex: function (type, index) {
            if (type === 1) {
                this.currentIndex = index - 1;
            } else {
                this.batch.currentIndex = index - 1;
            }
        },
        getNowDate: function (format) {
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            if (month < 10) {
                month = "0" + month;
            }
            if (day < 10) {
                day = "0" + day;
            }
            year = year.toString();
            month = month.toString();
            day = day.toString();
            if (format) {
                var newDate = year + format + month + format + day;
            } else {
                var newDate = year + month + day;
            }
            return newDate;
        },
        search: function () {
            var _this = this;
            var params = {};
            params.branchcode = _this.selectBranch;
            console.log(params);
            $.get({
                url: '/thirdPartyOperation/products/pspdiscount/search.ajax',
                data: params,
                success: function (result) {
                    console.log(params);
                    console.log(result);
                    if (result.error === 0) {

                        _this.tableData = result.data;
                    } else {
                        _this.showDialog('', 'info', false, '数据获取失败');
                    }
                },
                error: function () {
                    _this.showDialog('', 'info', false, '数据获取失败');
                }
            });
        },
        getBranchs: function () {
            var _this = this;
            var params = {};
            $.get({
                url: '/thirdPartyOperation/products/pspdiscount/qryBranchs.ajax',
                data: params,
                success: function (result) {
                    console.log(params);
                    console.log(result);
                    if (result.error == 0) {
                        _this.branchList = result.data;
                    } else {
                        _this.showDialog('', 'info', false, '数据获取失败');
                    }
                },
                error: function () {
                    _this.showDialog('', 'info', false, '数据获取失败');
                }
            });
        },
        getFundBaseInfos: function () {
            var _this = this;
            var params = {};
            $.get({
                url: '/thirdPartyOperation/products/pspdiscount/qryFunds.ajax',
                data: params,
                success: function (result) {
                    console.log(params);
                    console.log(result);
                    if (result.error === 0) {
                        _this.fundList = result.data;
                    } else {
                        _this.showDialog('', 'info', false, '数据获取失败');
                    }
                },
                error: function () {
                    _this.showDialog('', 'info', false, '数据获取失败');
                }
            });
        },
        getBranchBaseInfo: function (branchcode) {
            var _this = this;
            var params = {};
            params.branchcode = branchcode;
            $.get({
                url: '/thirdPartyOperation/products/pspdiscount/qryBranchBaseInfo.ajax',
                data: params,
                success: function (result) {
                    console.log(params);
                    console.log(result);
                    if (result.error === 0) {
                        if (result.data) {
                            _this.branchname = result.data.branchname;
                        } else {
                            _this.branchname = "unknown";
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

        // 文件导入
        showImportPage: function (el, item) {
            var hrefUrl = '/thirdPartyOperation/products/discountImport.html';
            console.log(hrefUrl)
            window.location.href = hrefUrl;
        },

        // dialog表格校验
        validAddForm: function () {
            //绑定验证器
            return $("#addForm").validate({
                //样式为红色
                errorClass: "red",
                errorPlacement: function (error, element) {
                    element.val('');
                    element.attr("placeholder", error.html())
                },
                rules: {
                    branchcode: {
                        required: true,
                    },
                    branchname: {
                        required: true,
                    },
                    cMan: {
                        required: true,
                    },
                    fundid: {
                        required: true,
                    },
                    fundname: {
                        required: false,
                    },
                    commro: {
                        required: true,
                        // max:100
                        range: [0, 100]
                    },
                    apkind: {
                        required: true,
                        // number: true,
                        // minlength:2,
                    },
                    starttime: {
                        required: true,
                    },
                    endtime: {
                        required: true,
                    },
                    minamt: {
                        required: true,
                    },
                    maxamt: {
                        required: true,
                    },
                },
                messages: {
                    branchcode: {
                        required: "渠道编号不能为空!",
                    },
                    branchname: {
                        required: "渠道名称不能为空!",
                    },
                    cMan: {
                        required: "值不能为空!",
                    },
                    fundid: {
                        required: "产品不能为空!",
                    },
                    fundname: {
                        required: "值不能为空!",
                    },
                    commro: {
                        required: "折扣不能为空!",
                        range: "限定值0-100"
                    },
                    apkind: {
                        required: "值不能为空!",
                        // minlength: "*",
                    },
                    starttime: {
                        required: "时间不能为空!",
                    },
                    endtime: {
                        required: "时间不能为空!",
                    },
                    minamt: {
                        required: "金额不能为空!",
                    },
                    maxamt: {
                        required: "金额不能为空!",
                    },

                },

                submitHandler: function () {
                    return false;
                },
            });
        },
        //试算校验
        validCalcForm: function () {
            //绑定验证器
            return $("#calcForm").validate({
                //样式为红色
                errorClass: "red",
                errorPlacement: function (error, element) {
                    element.val('');
                    element.attr("placeholder", error.html())
                },
                rules: {
                    branchcode: {
                        required: true,
                    },
                    branchname: {
                        required: true,
                    },
                    fundid: {
                        required: true,
                    },
                    fundname: {
                        required: false,
                    },
                    apkind: {
                        required: true,
                        // number: true,
                        // minlength:2,
                    },
                    tradeTime: {
                        required: true,
                    },
                    subAmt: {
                        required: true,
                    },
                },
                messages: {
                    branchcode: {
                        required: "渠道编号不能为空!",
                    },
                    branchname: {
                        required: "渠道名称不能为空!",
                    },
                    fundid: {
                        required: "产品不能为空!",
                    },
                    fundname: {
                        required: "值不能为空!",
                    },
                    apkind: {
                        required: "值不能为空!",
                        // minlength: "*",
                    },
                    tradeTime: {
                        required: "时间不能为空!",
                    },
                    subAmt: {
                        required: "金额不能为空!",
                    },
                },
                submitHandler: function () {
                    return false;
                },
            });
        },
        setStartTime: function (value, type) {
            var str = $('#starttime').val();
            if (value === 'now') {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, this.getNowTime() + ' $4:$5:$6');
                console.log("str1", str);
            } else if (value === 'future') {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '2099-12-31 $4:$5:$6' + '');
            } else if (value == 0) {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1-$2-$3 00:00:00');
            } else if (value == 9) {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1-$2-$3 09:00:00');
            } else if (value == 15) {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1-$2-$3 15:00:00');
            }
            $('#starttime').val(str);
        },
        setEndTime: function (value, type) {
            var str = $('#endtime').val();
            if (value === 'now') {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, this.getNowTime() + ' $4:$5:$6');
            } else if (value === 'future') {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '2099-12-31 $4:$5:$6' + '');
            } else if (value == 0) {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1-$2-$3 00:00:00');
            } else if (value == 9) {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1-$2-$3 09:00:00');
            } else if (value == 15) {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1-$2-$3 15:00:00');
            }
            $('#endtime').val(str);
        },
        setBuyTime: function (value, type) {
            var str = $('#tradeTime').val();
            if (value === 'now') {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, this.getNowTime() + ' $4:$5:$6');
            } else if (value === 'future') {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '2099-12-31 $4:$5:$6' + '');
            } else if (value == 0) {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1-$2-$3 00:00:00');
            } else if (value == 9) {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1-$2-$3 09:00:00');
            } else if (value == 15) {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1-$2-$3 15:00:00');
            }
            $('#tradeTime').val(str);
        },
        getNowTime: function () {
            var d = new Date();
            var fixZero = function (num) {
                return num < 10 ? '0' + num : num;
            };
            return [d.getFullYear(), d.getMonth() + 1, d.getDate()].map(function (value) {
                return fixZero(value)
            }).join('-');
        },

        showCalc: function () {
            var _this = this;
            _this.getFundBaseInfos();
            _this.showDialog('', 'showCalcPage');
        },
        showAdd: function () {
            var _this = this;
            //查询渠道
            // _this.getBranchs();
            _this.getFundBaseInfos();
            this.showDialog('', 'showAdd');
        },
        //试算
        calc: function () {
            var _this = this;
            if (!_this.validCalcForm().form()) return;
            _this.tradeTime = $('#tradeTime').val();
            _this.tradeTime = _this.tradeTime.replace(new RegExp("-", "gm"), "");
            let bt = _this.tradeTime.trim().split(" ");
            let tradedate = bt[0];
            let tradetime = bt[1];

            var params = {};
            params.branchcode = _this.branchcode;
            params.fundname = _this.fundname;
            params.fundid = _this.fundid;
            params.apkind = _this.apkind;
            params.tradeday = tradedate;
            params.tradetime = tradetime.replace(new RegExp(":", "gm"), "");
            params.subamt = _this.subAmt;
            console.log(params);
            $.post({
                url: '/thirdPartyOperation/products/pspdiscount/calc.ajax',
                data: params,
                success: function (result) {
                    console.log(params);
                    console.log(result);
                    if (result.error === 0) {
                        if (result.data) {
                            _this.calcCommro = result.data * 100;
                        } else {
                            _this.calcCommro = 'NULL';
                        }

                    } else {
                        _this.showDialog('', 'info', false, '计算失败');
                    }
                },
                error: function () {
                    _this.showDialog('', 'info', false, '计算异常');
                }
            });
        },


        showDelete: function (serialno) {
            var _this = this;
            _this.serialno = serialno;
            _this.showDialog('', 'showDeletePage', false, '确定要删除这条数据吗？');
        },
        del: function () {
            var _this = this;
            var params = {};
            params.serialno = _this.serialno;
            console.log(params);
            $.get({
                url: '/thirdPartyOperation/products/pspdiscount/delete.ajax',
                data: params,
                success: function (result) {
                    console.log(params);
                    console.log(result);
                    if (result.error === 0) {
                        _this.showDialog('', 'info', false, '删除成功！');
                        // _this.search();
                        //延时刷新
                        setTimeout(function () {
                            window.location.reload();
                        }, 1200);
                    } else {
                        _this.showDialog('', 'info', false, '数据获取失败');
                    }
                },
                error: function () {
                    _this.showDialog('', 'info', false, '数据获取失败');
                }

            });
        },
        //保存前校验
        validateDis: function () {
            var _this = this;
            if (!_this.validAddForm().form()) return;
            _this.starttime = $('#starttime').val();
            _this.endtime = $('#endtime').val();
            _this.starttime = _this.starttime.replace(new RegExp("-", "gm"), "");
            _this.endtime = _this.endtime.replace(new RegExp("-", "gm"), "");
            let st = _this.starttime.trim().split(" ");
            let et = _this.endtime.trim().split(" ");
            let startdate = st[0];
            let starttime = st[1];
            let enddate = et[0];
            let endtime = et[1];

            var params = {};
            params.branchcode = _this.branchcode;
            params.cMan = _this.cMan;
            params.fundname = _this.fundname;
            params.fundid = _this.fundid;
            params.commro = _this.commro;
            params.apkind = _this.apkind;
            params.startdate = startdate;
            params.starttime = starttime;
            params.enddate = enddate;
            params.endtime = endtime;
            params.minamt = _this.minamt;
            params.maxamt = _this.maxamt;
            console.log(params);

            $.post({
                url: '/thirdPartyOperation/products/pspdiscount/validateDis.ajax',
                data: params,
                success: function (result) {
                    console.log(params);
                    console.log(result);
                    if (result.error === 0) {
                        // _this.showDialog('showAdd', '');

                        if (result.data.result) {
                            console.log("校验成功");
                            //校验成功
                            _this.add(params);
                        } else {
                            console.log("校验失败");
                            //校验失败  显示冲突弹框
                            // _this.showDialog('conflict', '',);
                            _this.showDialog('showAdd', 'conflict', false, '生效时间存在冲突，确定要保存吗？');
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
        conflictAdd: function () {
            var _this = this;
            _this.oldAdd();
        },
        add: function (params) {
            var _this = this;
            console.log(params);
            $.post({
                url: '/thirdPartyOperation/products/pspdiscount/save.ajax',
                data: params,
                success: function (result) {
                    console.log(params);
                    console.log(result);
                    if (result.error === 0) {
                        _this.showDialog('showAdd', '');
                        _this.showDialog('', 'info', false, '保存成功！');
                        //延时刷新
                        setTimeout(function () {
                            window.location.reload();
                        }, 850);
                    } else {
                        _this.showDialog('', 'info', false, '数据获取失败');
                    }
                },
                error: function () {
                    _this.showDialog('', 'info', false, '数据获取失败');
                }
            });
        },
        oldAdd: function () {
            var _this = this;
            if (!_this.validAddForm().form()) return;
            _this.starttime = $('#starttime').val();
            _this.endtime = $('#endtime').val();
            _this.starttime = _this.starttime.replace(new RegExp("-", "gm"), "");
            _this.endtime = _this.endtime.replace(new RegExp("-", "gm"), "");
            let st = _this.starttime.trim().split(" ");
            let et = _this.endtime.trim().split(" ");
            let startdate = st[0];
            let starttime = st[1];
            let enddate = et[0];
            let endtime = et[1];

            var params = {};
            params.branchcode = _this.branchcode;
            params.cMan = _this.cMan;
            params.fundname = _this.fundname;
            params.fundid = _this.fundid;
            params.commro = _this.commro;
            params.apkind = _this.apkind;
            params.startdate = startdate;
            params.starttime = starttime;
            params.enddate = enddate;
            params.endtime = endtime;
            params.minamt = _this.minamt;
            params.maxamt = _this.maxamt;
            console.log(params);

            $.post({
                url: '/thirdPartyOperation/products/pspdiscount/save.ajax',
                data: params,
                success: function (result) {
                    console.log(params);
                    console.log(result);
                    if (result.error === 0) {
                        _this.showDialog('showAdd', '');
                        _this.showDialog('', 'info', false, '保存成功！');
                        //延时刷新
                        setTimeout(function () {
                            window.location.reload();
                        }, 850);
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
        // 未使用
        showAddByFile: function () {
            //显示文件全路径
            $('#uploadFileInput').on('change', function () {
                $('#uploadInput').val($(this).val());
            });
            $('#uploadInput').val('');
            $('#uploadFileInput').val('');
            this.batch.uploadFundid = '';
            this.batch.uploadFundnm = '';
            this.showDialog('', 'upload');
        },

        //查询临时表折扣数据
        searchDft: function (batchid) {
            var _this = this;
            var params = {};
            params.batchid = batchid;
            console.log(params);
            $.get({
                url: '/thirdPartyOperation/products/pspdiscount/searchDft.ajax',
                data: params,
                success: function (result) {
                    console.log(params);
                    console.log(result);
                    if (result.error === 0) {
                        _this.batch.tableData = result.data;
                    } else {
                        _this.showDialog('', 'info', false, '数据获取失败');
                    }
                },
                error: function () {
                    _this.showDialog('', 'info', false, '数据获取失败');
                }
            });
        },
        //模板下载
        downMould: function () {
            var _this = this;
            let url;
            url = '/thirdPartyOperation/products/pspdiscount/download.ajax';
            window.location.href = url;

        },
        //文件导入-验证
        importFile: function () {
            if (!$('#uploadInput').val()) {
                this.showDialog('', 'info', true, '未选择上传文件');
                return;
            }
            if (!$('#uploadFileInput').val()) {
                this.showDialog('', 'info', true, '未选择上传文件');
                return;
            }
            var _this = this;
            var params = {
                operater: ''
            };
            console.log(params);
            $.ajaxFileUpload({
                url: '/thirdPartyOperation/products/pspdiscount/importFile.ajax',
                type: 'POST',
                data: params,
                dataType: 'json',
                fileElementId: 'uploadFileInput',
                success: function (result) {
                    if (result.error === 0) {
                        console.log(result);
                        //显示导入数据
                        _this.batch.tableData = result.data;
                        _this.showDialog('upload', 'info', false, result.msg);

                    } else {
                        _this.showDialog('upload', 'info', true, result.msg);
                    }
                }
            });

        },
        //文件重新录入
        showReimportFile: function () {
            this.showDialog('', 'reImportPage', false, "确定要重新导入吗，将丢失当前数据");
        },
        //文件重新录入
        reimportFile: function () {
            //显示文件全路径
            $('#uploadFileInput').on('change', function () {
                $('#uploadInput').val($(this).val());
            });
            $('#uploadInput').val('');
            $('#uploadFileInput').val('');
            this.batch.uploadFundid = '';
            this.batch.uploadFundnm = '';
            this.batch.tableData = [];
            $('#uploadFileInput').click();
            // this.showDialog('', 'upload');
        },
        //折扣 批量检测
        batchValidate: function () {
            var _this = this;

            if (_this.batch.tableData.length === 0) {
                _this.showDialog('', 'info', false, '没有导入数据！');
                return;
            }

            var params = {};
            params.batchid = _this.batch.tableData[0].batchid;
            // params.batchid = '20200611194135';
            console.log(params);
            $.get({
                url: '/thirdPartyOperation/products/pspdiscount/batchValidate.ajax',
                data: params,
                success: function (result) {
                    console.log(result);
                    if (result.error === 0) {
                        // _this.showDialog('', 'info', false, '导入完成');
                        //校验成功 保存数据
                        _this.importDiscount(params.batchid);

                    } else if (result.error === 1) {
                        //显示异常，提示冲突列表 batchError
                        _this.batch.validateData = result.data;
                        _this.showDialog('', 'batchError', false, '异常error');

                    } else {
                        _this.showDialog('', 'info', false, '数据获取失败');
                    }
                },
                error: function () {
                    _this.showDialog('', 'info', false, '数据获取失败');
                }
            });
        },

        //折扣 导入
        importDiscount: function (batchid) {
            var _this = this;
            var params = {};
            if (typeof (batchid) == 'undefined') {
                params.batchid = _this.batch.tableData[0].batchid;
                // params.batchid = '20200611194135';
            } else {
                params.batchid = batchid;
            }
            console.log(params);
            $.get({
                url: '/thirdPartyOperation/products/pspdiscount/importDis.ajax',
                data: params,
                success: function (result) {
                    console.log(result);
                    if (result.error === 0) {
                        _this.showDialog('', 'info', false, '导入完成');
                        //延时刷新
                        setTimeout(function () {
                            window.location.reload();
                        }, 750);
                    } else if (result.error === 1) {
                        //解析异常信息 todo
                        _this.showDialog('', 'info', false, '数据保存失败');

                    } else {
                        _this.showDialog('', 'info', false, '数据获取失败');
                    }
                },
                error: function () {
                    _this.showDialog('', 'info', false, '数据获取失败');
                }
            });
        },
        //折扣 导入
        oldimportDiscount: function () {
            var _this = this;

            if (_this.batch.tableData.length === 0) {
                _this.showDialog('', 'info', false, '没有导入数据！');
                return;
            }
            var params = {};
            params.batchid = _this.batch.tableData[0].batchid;
            console.log(params);
            $.get({
                url: '/thirdPartyOperation/products/pspdiscount/importDis.ajax',
                data: params,
                success: function (result) {
                    console.log(result);
                    if (result.error === 0) {
                        _this.showDialog('', 'info', false, '导入完成');
                    } else if (result.error === 1) {
                        //解析异常信息 todo

                    } else {
                        _this.showDialog('', 'info', false, '数据获取失败');
                    }
                },
                error: function () {
                    _this.showDialog('', 'info', false, '数据获取失败');
                }
            });
        },

    },

    filters: {//格式化时间戳
        time: function (obj) {
            if (!obj) {
                return obj;
            }
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
            return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
        },
        dateFormat: function (obj) {
            if (!obj) {
                return obj;
            }
            var pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;
            var formatedDate = obj.replace(pattern, '$1/$2/$3 $4:$5:$6');
            return formatedDate;
        },
        // 状态
        status: function (item) {
            item = item.toUpperCase()
            if (item === "N") {
                return "待复核"
            } else if (item === "D") {
                return "复核中"
            } else if (item === "S") {
                return "已复核"
            } else {
                return item
            }
        },

        apkindConvert: function (item) {
            if (!item) {
                return item;
            }
            item = item.toUpperCase();
            if (item === "020") {
                return "认购"
            } else if (item === "022") {
                return "申购"
            } else if (item === "024") {
                return "赎回"
            } else {
                return item
            }
        },
    },
});