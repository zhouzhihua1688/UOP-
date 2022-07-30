new Vue({
    el: '#content',
    data: {
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        pageMaxNum: 10,
        condition: '',
        diaMsg: '',
        tableData: [],
        FundIdList: [],
        fundId: 'ALL',
        approveStatus: 'N',
        selectFundId: '',
        selectStatus: '',
        reviewSt: true,
        startdate: '',
        enddate: '',
        disabled: true,

        fundid: '',
        detailtype: '',
        accptmd: '',
    },
    mounted: function () {
        var dialogs = ['info', 'reviewInfo', 'revise','batchUpdate'];
        $(".form-control").attr('disabled', 'disabled');
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
        this.getFundIdList()
        this.getTableData()
        $('#firstMenu').css('width', '180px').select2({});
        $("#firstMenu").on("select2:select", function (e) {
            // e 的话就是一个对象 然后需要什么就 “e.参数” 形式 进行获取
            this.fundId = e.params.data.id;
        }.bind(this));

        // 时间插件
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
    },
    computed: {
        //主表格分页
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
        },
    },
    watch: {
        pageMaxNum: function () {
            this.currentIndex = 0;
        },
        condition: function () {
            this.currentIndex = 0;
        }
    },
    methods: {
        sorting: function (event, params) {
            var el = event.target;
            $(el).siblings('.sorting').removeClass('sorting_desc').removeClass('sorting_asc')
            if ($(el).hasClass('sorting_asc') === false) {
                this.tableData.sort(function (a, b) {
                    // return (a[params + 'date'] + a[params + 'time']) - (b[[params + 'date']] + b[params + 'time']);
                    return (a[params + 'date'].replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/, '$1$2$3$4$5$6')) - (b[[params + 'date']].replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/, '$1$2$3$4$5$6'));
                })
                $(el).removeClass('sorting_desc')
                $(el).addClass('sorting_asc')
            } else if ($(el).hasClass('sorting_desc') === false) {
                this.tableData.sort(function (a, b) {
                    // return (b[[params + 'date']] + b[params + 'time']) - (a[params + 'date'] + a[params + 'time']);
                    return (b[[params + 'date']].replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/, '$1$2$3$4$5$6')) - (a[params + 'date'].replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/, '$1$2$3$4$5$6'));
                })
                $(el).removeClass('sorting_asc')
                $(el).addClass('sorting_desc')
            }
        },
        moment: moment,
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
        getFundIdList: function () {
            var _this = this;
            $.post({
                url: '/businessMgmt/IPOMgmtOCReview/pauseTradeDataReview/fundIdList.ajax ',
                success: function (result) {
                    if (result.error == 0) {
                        this.FundIdList = result.data
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },
        getTableData: function () {
            var nowdate = new Date()

            var y = nowdate.getFullYear()
            var m = nowdate.getMonth() + 1
            m = m < 10 ? '0' + m : m
            var d = nowdate.getDate();
            d = d < 10 ? ('0' + d) : d
            var checkTime = y + "" + m + "" + d
            var times = [];
            var params = {
                fundId: this.fundId,
                approveStatus: this.approveStatus
            };
            console.log(checkTime)
            $.post({
                url: '/businessMgmt/IPOMgmtOCReview/pauseTradeDataReview/tableData.ajax ',
                data: params,
                success: function (result) {
                    if (this.approveStatus === 'N') {
                        this.reviewSt = true
                    } else {
                        this.reviewSt = false
                    }
                    if (result.error == 0) {
                        for (var i = 0; i < result.data.length; i++) {
                            result.data[i].startdate = result.data[i].startdate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') + " " + result.data[i].starttime.replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3')
                            result.data[i].enddate = result.data[i].enddate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') + " " + result.data[i].endtime.replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3')
                        }
                        // times = result.data.filter(function (item) {  //过滤大于当前时间的数据
                        //     return item.enddate.replace(/(\d{4})-(\d{2})-(\d{2})/, '$1$2$3') >= checkTime;
                        // })
                        this.tableData = result.data.map(function (item) {
                            item.check = false;
                            return item;
                        }.bind(this)).sort(function (a, b) {
                            return a.startdate < b.startdate ? 1 : -1
                        })
                    } else {
                        this.showDialog('', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },
        active: function (id, activeStatus) {
            if (activeStatus) {
                this.tableData.forEach(function (item) {
                    if (item.fundid === id) {
                        item.check = false;
                    }
                })
                this.selectFundId = '';
                return;
            }
            var status = this.tableData.some(function (item) {
                if (item.apprStatus === 'N') {
                    return true;
                }
            })
            if (status) {
                this.selectFundId = id;
                this.tableData.forEach(function (item) {
                    if (item.fundid === id) {
                        item.check = true;
                    } else {
                        item.check = false;
                    }
                })
            } else {
                this.showDialog('', 'info', false, '非待复核状态不能再次复核');
                this.tableData.forEach(function (item) {
                    if (item.fundid === id) {
                        this.$set(item, 'check', false)
                    }
                }.bind(this))
            }
        },
        showReviewDialog: function (status, text) {
            if (this.selectFundId === '') {
                this.showDialog('', 'info', false, '请选择基金');
                return;
            }
            this.selectStatus = status;
            this.showDialog('', 'reviewInfo', false, '确定' + text + '基金' + this.selectFundId + '吗？');

        },
        review: function () {
            var params = {
                fundId: this.selectFundId,
                approveStatus: this.selectStatus
            };
            $.post({
                url: '/businessMgmt/IPOMgmtOCReview/pauseTradeDataReview/review.ajax ',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        this.getTableData()
                        this.showDialog('reviewInfo', 'info', false, result.msg);
                    } else {
                        this.showDialog('reviewInfo', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },

        // showUpdateDialog:function(){
        //     var _this=this;
        //     var hasCheck = false;
        //
        //     for (var i = 0; i < this.tableData.length; i++) {
        //         if (this.tableData[i].check) {
        //             hasCheck = true;
        //         }
        //     }
        //     if (!hasCheck) {
        //         this.showDialog('', 'info', true, '未选择任何数据');
        //         return;
        //     }
        // },

        // 增加修改功能--单个修改
        showUpdate: function (item) {
            var _this = this
            this.fundid = item.fundid;
            this.detailtype = item.detailtype;
            this.accptmd = item.accptmd;
            this.serialno = item.serialno;
            this.startdate = item.startdate.replace(/(\d{4})(\d{2})(\d{2}) (\d{2})(\d{2})(\d{2})/, '$1-$2-$3 $4:$5:$6')
            // this.startdate = $("#startTime_submit").val(item.startdate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') + ' ' + item.starttime.replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3'));

            this.starttime = item.starttime;

            this.enddate = item.enddate.replace(/(\d{4})(\d{2})(\d{2}) (\d{2})(\d{2})(\d{2})/, '$1-$2-$3 $4:$5:$6')
            // this.enddate = $("#endTime_submit").val(item.enddate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') + ' ' + item.endtime.replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3'));

            this.endtime = item.endtime;
            this.showDialog('', 'revise');
        },
        update: function () {
            var _this = this;
            var params = {};
            params.serialno = this.serialno;
            params.fundid = this.fundid;
            // params.detailtype = this.detailtype;
            // params.accptmd =this.accptmd;
            params.startdate = moment($('#startTime_submit').val()).format("YYYYMMDD");
            params.starttime = moment($('#startTime_submit').val()).format("HHmmss");
            params.enddate = moment($('#endTime_submit').val()).format("YYYYMMDD");
            params.endtime = moment($('#endTime_submit').val()).format("HHmmss");

            $.post({
                url: '/businessMgmt/IPOMgmtOCReview/pauseTradeDataReview/update.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData()
                    }
                    _this.showDialog('revise', 'info', false, result.msg);
                }
            });
        },

        // 批量修改
        // 时间插件
        choose: function () {
            console.log(111)
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
        },
        undisabled: function () {
            this.disabled = false;
            $('.form-control').removeAttr("disabled")
        },

        updateList: function () {
            var _this = this;
            _this.showDialog('', 'batchUpdate', false, "确定需要批量修改!");
        },

        batchUpdate: function () {
            var _this = this;
            var lsit = [];

            // if (this.selectFundId === '') {
            //     this.showDialog('', 'info', false, '请选择需要修改的基金');
            //     return;
            // }
            _this.tableData.map(function (item) {
                return {
                    serialno: item.serialno,
                    fundid: item.fundid,
                    startdate: item.startdate,
                    starttime: item.starttime,
                    enddate: item.enddate,
                    endtime: item.endtime
                }
            })

            for (var i = 0; i < _this.tableData.length; i++) {
                // if (_this.tableData[i].check == true) {
                lsit.push(_this.tableData[i])
                // }
            }

            for (var j = 0; j < lsit.length; j++) {
                _this.batch(lsit[j])
            }
        },

        batch: function (params) {
            var _this = this;
            $.post({
                url: '/businessMgmt/IPOMgmtOCReview/pauseTradeDataReview/update.ajax',
                data: {
                    serialno: params.serialno,
                    fundid: params.fundid,
                    startdate: params.startdate.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/, '$1$2$3'),
                    starttime: params.startdate.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/, '$4$5$6'),
                    enddate: params.enddate.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/, '$1$2$3'),
                    endtime: params.enddate.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/, '$4$5$6'),
                },
                success: function (result) {
                    if (result.error === 0) {
                        _this.selectFundId = "";
                        _this.disabled = true;
                        $('.form-control').attr('disabled', 'disabled')
                        _this.getTableData()

                    }
                    _this.showDialog('', 'info', false, result.msg);
                }
            });
        },
        // 时间选择
        setStartTime: function (value, type) {
            console.log(111)
            var str = $('#startTime_' + type).val();
            console.log("str", str)
            if (value === 'now') {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, this.getNowTime() + ' $4:$5:$6');
            }
            else if (value === 'future') {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '2099-12-31 $4:$5:$6' + '');
            }
            else if (value == 0) {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1-$2-$3 00:00:00');
            }
            else if (value == 9) {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1-$2-$3 09:00:00');
            }
            else if (value == 15) {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1-$2-$3 15:00:00');
            }
            $('#startTime_' + type).val(str);
        },

        setStartTime2: function (item, value, type) {


            // console.log(index)
            //
            // console.log($('.startTime_' + type)[index])
            //
            // var str = $('.startTime_' + type).val();

            /* item.startdate=$('#startTime_' + type).val();
             console.log(item.startdate)*/

            if (value === 'now') {
                // str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, this.getNowTime() + ' $4:$5:$6');
                item.startdate = this.getNowTime() + item.starttime.replace(/(\d{2})(\d{2})(\d{2})/g, ' $1:$2:$3')
            }
            else if (value === 'future') {
                // str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '2099-12-31 $4:$5:$6' + '');
                item.startdate = item.startdate.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '2099-12-31 $4:$5:$6' + '');
            }
            else if (value == 0) {
                item.startdate = item.startdate.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1-$2-$3 00:00:00');
            }
            else if (value == 9) {
                item.startdate = item.startdate.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1-$2-$3 09:00:00');
            }
            else if (value == 15) {
                item.startdate = item.startdate.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1-$2-$3 15:00:00');
            }
            // $('.startTime_' + type).val(str);

        },
        setEndTime: function (value, type) {
            var str = $('#endTime_' + type).val();
            if (value === 'now') {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, this.getNowTime() + ' $4:$5:$6');
            }
            else if (value === 'future') {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '2099-12-31 $4:$5:$6' + '');
            }
            else if (value == 0) {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1-$2-$3 00:00:00');
            }
            else if (value == 9) {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1-$2-$3 09:00:00');
            }
            else if (value == 15) {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1-$2-$3 15:00:00');
            }
            $('#endTime_' + type).val(str);
        },
        setEndTime2: function (item, value, type) {
            if (value === 'now') {
                item.enddate = this.getNowTime() + item.endtime.replace(/(\d{2})(\d{2})(\d{2})/g, ' $1:$2:$3')
            }
            else if (value === 'future') {
                item.enddate = item.enddate.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '2099-12-31 $4:$5:$6' + '');
            }
            else if (value == 0) {
                item.enddate = item.enddate.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1-$2-$3 00:00:00');
            }
            else if (value == 9) {
                item.enddate = item.enddate.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1-$2-$3 09:00:00');
            }
            else if (value == 15) {
                item.enddate = item.enddate.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1-$2-$3 15:00:00');
            }
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
        getNowTime2: function () {
            var d = new Date();
            var fixZero = function (num) {
                return num < 10 ? '0' + num : num;
            };
            return [d.getFullYear(), d.getMonth() + 1, d.getDate()].map(function (value) {
                return fixZero(value)
            }).join('');
        },

    },
    components: {
        'date-picker': VueBootstrapDatetimePicker
    },
    filters: {
        detailtypeText: function (value) {
            var obj = {
                "00": "暂停所有活动",
                "01": "暂停申购",
                "02": "暂停赎回",
                "11": "暂停定投"
            }
            if (obj[value]) {
                return obj[value];
            }
            return value;
        },
        accptmdText: function (value) {
            var obj = {
                "0": "柜台",
                "2": "网上",
                "7": "企业版",
                "6": "第三方"
            }
            if (obj[value]) {
                return obj[value];
            }
            return value;
        },
        chineseApprStatus: function (value) {
            var obj = {
                "N": "待复核",
                "S": "复核通过",
                "F": "复核退回",
            }
            if (obj[value]) {
                return obj[value];
            }
            return value;
        },
    }
});