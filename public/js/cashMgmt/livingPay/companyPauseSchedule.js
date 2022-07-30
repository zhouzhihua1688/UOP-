new Vue({
    el: '#companyPause',
    data: {
        // 主页面相关数据
        companyId: '',
        companyName: '',
        companyCode: '',
        codeList: [],
        tableData: [],
        tableSelect: [],
        serviceType: '',
        districtCode: '',
        spell: '',
        status: '',
        diaMsg: '',
        searchField: '',
        districtCodeSearch: '',
        createTime: '',
        updateTime: '',
        addorcompile: '',
        // 新增弹窗数据
        companyDatas: '',
        addcompanyCode: '',
        addcompanyName: '',
        addAppCode: '',
        addAppName: '',
        addLongLinkUrl: '',
        id:'',
        pauseType: '',
        startTime: {
            date: '',
            time: '',
            month: '',
            week: ''
        },
        endTime: {
            date: '',
            time: '',
            month: '',
            week: ''
        },
        endTimeDay: '',
        startTimeDay: '',
        yendTimeday: '',
        ystartTimeday: '',
        //删除数据
        deleteCode: '',
        // 更新弹窗数据
        updateSerialNo: '',
        updateAppCode: '',
        updateAppName: '',
        updateLongLinkUrl: '',
        // 主表格分页数据
        page: 0,
        total: 0,
        records: 10,
        conditionType: 0,
        currentIndex: 0,
        maxSpace: 5
    },
    computed: {
        allCheck: function () {
            if (this.tableData.length == 0) {
                return false;
            }
            var flag = true;
            this.tableData.forEach(function (item) {
                if (!item.check) {
                    flag = false;
                }
            });
            return flag;
        },
        pageList: function () {
            var arr = [];
            if (this.total <= 2 * this.maxSpace) {
                for (var i = 0; i < this.total; i++) {
                    arr.push(i + 1);
                }
                return arr;
            }
            if (this.currentIndex > this.maxSpace && this.total - this.currentIndex > this.maxSpace) {
                for (var i = this.currentIndex - this.maxSpace; i < this.currentIndex + this.maxSpace; i++) {
                    arr.push(i + 1);
                }
            } else if (this.currentIndex <= this.maxSpace && this.total - this.currentIndex > this.maxSpace) {
                for (var i = 0; i < this.currentIndex + (2 * this.maxSpace - this.currentIndex); i++) {
                    arr.push(i + 1);
                }
            } else if (this.currentIndex > this.maxSpace && this.total - this.currentIndex <= this.maxSpace) {
                var space = this.total - this.currentIndex;
                for (var i = this.currentIndex - (2 * this.maxSpace - space); i < this.total; i++) {
                    arr.push(i + 1);
                }
            } else {
                for (var i = 0; i < this.total; i++) {
                    arr.push(i + 1);
                }
            }
            return arr;
        }
    },
    watch: {
        records: {
            handler: function (val, oldval) {
                var params = {
                    rows: this.records,
                    districtCodeSearch: this.conditionType == 1 ? this.districtCodeSearch : '',
                    searchField: this.conditionType == 2 ? this.searchField : ''
                };
                this.getTableList(params);
                this.tableSelect = [];
            }
        },
        total: function () {
            this.currentIndex = 0;
        },
        pauseType: function (newval, oldval) {
            for (const key in this.startTime) {
                if (this.startTime.hasOwnProperty(key)) {
                    this.startTime[key] = '';
                    this.endTime[key] = '';
                }
            }
        },
        addcompanyCode: function (newval, oldval) {
            var _this = this;
            this.companyDatas.forEach(function (val, ind, fn) {
                if (val.companyCode == newval) {
                    _this.addcompanyName = val.companyName
                }
            })
        }
    },
    mounted: function () {
        var _this = this;
        var dialogs = ['update', 'addCompanyPauseSchedule', 'delete', 'info'];
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
        _this.validForm();
        $.ajax({
            type: "post",
            url: '/cashMgmt/livingPay/companyPause/allCompany.ajax',
            success: function (result) {
                if (result.error == 0) {
                    codeList = result.data;
                    var unitObj = document.getElementById("company");
                    if (codeList != null) {
                        for (var i = 0; i < codeList.length; i++) {
                            unitObj.options.add(new Option(codeList[i].companyName + " " + codeList[i].companyCode, codeList[i].companyCode));
                        }
                        _this.companyDatas = result.data
                    }
                } else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            },
            error: function () {

            }
        });
        _this.getTableList({
            rows: _this.records
        });
        $('.date-timepicker').datetimepicker({
            format: 'YYYY-MM-DD HH:mm', //use this option to display seconds
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
        $('.dateTime').datetimepicker({
            format: 'HH:mm', //use this option to display seconds
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
        //主表格分页方法
        selectAll: function () {
            var _this = this;
            if (this.allCheck) {
                this.tableData.forEach(function (item) {
                    item.check = false;
                    var _index = _this.inSelected(item, _this.tableSelect, 'id');
                    if (_index > -1) {
                        _this.tableSelect.splice(_index, 1);
                    }
                });
            } else {
                this.tableData.forEach(function (item) {
                    item.check = true;
                    var _index = _this.inSelected(item, _this.tableSelect, 'id');
                    if (_index == -1) {
                        _this.tableSelect.push(item);
                    }
                });
            }
        },
        prev: function () {
            this.currentIndex = this.currentIndex <= 0 ? 0 : this.currentIndex - 1;
            var params = {
                _search: 'false',
                nd: '1535696156694',
                rows: this.records,
                page: this.currentIndex + 1,
                sidx: 'companyId',
                sord: 'asc',
                districtCodeSearch: this.conditionType == 1 ? this.districtCodeSearch : '',
                searchField: this.conditionType == 2 ? this.searchField : ''
            };
            this.getTableList(params);
            this.tableSelect = [];
        },
        next: function () {
            this.currentIndex = this.currentIndex >= this.total - 1 ? this.total - 1 : this.currentIndex + 1;
            var params = {
                _search: 'false',
                nd: '1535696156694',
                rows: this.records,
                page: this.currentIndex + 1,
                sidx: 'companyId',
                sord: 'asc',
                districtCodeSearch: this.conditionType == 1 ? this.districtCodeSearch : '',
                searchField: this.conditionType == 2 ? this.searchField : ''
            };
            this.getTableList(params);
            this.tableSelect = [];
        },
        changeIndex: function (value, index) {
            this.currentIndex = value - 1;
            this.page = value;
            var params = {
                _search: 'false',
                nd: '1535696156694',
                rows: this.records,
                page: this.page,
                sidx: 'companyId',
                sord: 'asc',
                districtCodeSearch: this.conditionType == 1 ? this.districtCodeSearch : '',
                searchField: this.conditionType == 2 ? this.searchField : ''
            };
            this.getTableList(params);
            this.tableSelect = [];
        },
        toFirst: function () {
            this.currentIndex = 0;
            var params = {
                _search: 'false',
                nd: '1535696156694',
                rows: this.records,
                page: 1,
                sidx: 'companyId',
                sord: 'asc',
                districtCodeSearch: this.conditionType == 1 ? this.districtCodeSearch : '',
                searchField: this.conditionType == 2 ? this.searchField : ''
            };
            this.getTableList(params);
            this.tableSelect = [];
        },
        toLast: function () {
            this.currentIndex = this.total - 1;
            var params = {
                _search: 'false',
                nd: '1535696156694',
                rows: this.records,
                page: this.total,
                sidx: 'companyId',
                sord: 'asc',
                districtCodeSearch: this.conditionType == 1 ? this.districtCodeSearch : '',
                searchField: this.conditionType == 2 ? this.searchField : ''
            };
            this.getTableList(params);
            this.tableSelect = [];
        },
        getTableList: function (params) {
            var _this = this;
            $.post({
                url: '/cashMgmt/livingPay/companyPause/companyPauseScheduleList.ajax',
                data: params ? params : {},
                success: function (result) {
                    console.log(result)
                    if (result.error == 0) {
                        var data = result.data;
                        _this.page = data.page;
                        _this.total = data.total;
                        _this.tableData = data.formList;
                        _this.tableSelect.forEach(function (item) {
                            var index = _this.inSelected(item, _this.tableData, 'id');
                            if (index > -1) {
                                _this.tableData[index].check = true;
                            }
                        });
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        select: function (index) {
            var item = this.tableData[index];
            item.check = !item.check;
            var _index = this.inSelected(item, this.tableSelect, 'id');
            if (item.check && _index == -1) {
                this.tableSelect.push(item);
            }
            if (!item.check && _index > -1) {
                this.tableSelect.splice(_index, 1);
            }
        },
        //input搜索地区或机构id
        searchInput: function () {
            this.conditionType = 2;
            var params = {
                rows: this.records,
                searchField: this.searchField,
            };
            this.getTableList(params);
            this.tableSelect = [];
        },
        // dialog表格校验
        validForm: function () {
            //绑定验证器
            return $("#companyPauseScheduleForm").validate({
                ignore: [],
                rules: {
                    // month: {
                    //     required: true,
                    // },
                    // date: {
                    //     required: true,
                    // },
                    // time: {
                    //     required: true,
                    // },
                    // endmonth: {
                    //     required: true,
                    // },
                    // enddate: {
                    //     required: true,
                    // },
                    // endtime: {
                    //     required: true,
                    // }
                },
                messages: {
                    // month: {
                    //     required: "",
                    // },
                    // date: {
                    //     required: "",
                    // },
                    // time: {
                    //     required: "",
                    // },
                    // endmonth: {
                    //     required: "",
                    // },
                    // enddate: {
                    //     required: "",
                    // },
                    // endtime: {
                    //     required: "",
                    // }
                }
            });
        },
        //boxShow
        boxShow: function () {
            $("#addCompanyPauseSchedule").modal('show');
            var _this = this;
            $("#addCompanyPauseSchedule input").val('');
            $("#addCompanyPauseSchedule textarea").val('');
            $("#addCompanyPauseSchedule select").val('');
            _this.validForm();
            _this.addorcompile = 'add' //为新增
            this.pauseType = '1';

        },
        // 格式时间
        setTime: function (t) {
            if (t < 10) {
                t = '0' + t
            }
            return t
        },
        //新增机构
        add: function () {
            var _this = this;
            if (_this.validForm().form()) {
                if (_this.addorcompile == 'compile') {
                    var id = this.id
                } else {
                    var id = ''
                }
                var endTime,
                    startTime;
                console.log(id)
                if (_this.pauseType == '1') {
                    endTime = $('.oneEndDate').val().replace(/[\s:-]*/g, "");
                    startTime = $('.oneStartDate').val().replace(/[\s:-]*/g, "");
                    if (!startTime || !endTime) {
                        _this.showDialog('addCompanyPauseSchedule', 'info', true, '请选择时间');
                        console.log('开始时间：' + startTime)
                        console.log('结束时间' + endTime)
                        return;
                    }

                } else if (_this.pauseType == '2') {
                    endTime = $('.daysEndTime').val().replace(/[\s:-]*/g, "");
                    startTime = $('.daysStartTime').val().replace(/[\s:-]*/g, "");
                    if (!startTime || !endTime) {
                        _this.showDialog('addCompanyPauseSchedule', 'info', true, '请选择时间');
                        console.log('开始时间：' + startTime)
                        console.log('结束时间' + endTime)
                        return;
                    }

                } else if (_this.pauseType == '3') {
                    let weekStartDate = $('.weekStartDate').val(),
                        weekStartTime = $('.weekStartTime').val().replace(/[\s:-]*/g, ""),
                        weekEndDate = $('.weekEndDate').val(),
                        weekEndTime = $('.weekEndTime').val().replace(/[\s:-]*/g, "");
                    if (!weekStartDate || !weekStartTime || !weekEndDate || !weekEndTime) {
                        _this.showDialog('addCompanyPauseSchedule', 'info', true, '请选择时间');
                        console.log('开始时间：' + startTime)
                        console.log('结束时间' + endTime)
                        return;
                    }
                    startTime = weekStartDate + weekStartTime;
                    endTime = weekEndDate + weekEndTime;
                } else if (_this.pauseType == '4') {
                    let monthEndDate = $('.monthEndDate').val(),
                        monthEndTime = $('.monthEndTime').val().replace(/[\s:-]*/g, ""),
                        monthStartDate = $('.monthStartDate').val(),
                        monthStartTime = $('.monthStartTime').val().replace(/[\s:-]*/g, "");
                    if (!monthEndDate || !monthEndTime || !monthStartDate || !monthStartTime) {
                        _this.showDialog('addCompanyPauseSchedule', 'info', true, '请选择时间');
                        console.log('开始时间：' + startTime)
                        console.log('结束时间' + endTime)
                        return;
                    }
                    monthEndDate = _this.setTime(monthEndDate)
                    monthStartDate = _this.setTime(monthStartDate)
                    startTime = monthStartDate + monthStartTime;
                    endTime = monthEndDate + monthEndTime;
                } else {
                    let yearStartDate = $('.yearStartDate').val(),
                        yearStartDay = $('.yearStartDay').val(),
                        yearStartTime = $('.yearStartTime').val().replace(/:/g, ''),
                        yearEndDate = $('.yearEndDate').val(),
                        yearEndDay = $('.yearEndDay').val(),
                        yearEndTime = $('.yearEndTime').val().replace(/:/g, '');
                    if (!yearStartDate || !yearStartDay || !yearStartTime || !yearEndDate || !yearEndDay || !yearEndTime) {
                        _this.showDialog('addCompanyPauseSchedule', 'info', true, '请选择时间');
                        console.log('开始时间：' + startTime)
                        console.log('结束时间' + endTime)
                        return;
                    }
                    yearStartDate = _this.setTime(yearStartDate)
                    yearStartDay = _this.setTime(yearStartDay)
                    yearEndDate = _this.setTime(yearEndDate)
                    yearEndDay = _this.setTime(yearEndDay)
                    startTime = yearStartDate + yearStartDay + yearStartTime;
                    endTime = yearEndDate + yearEndDay + yearEndTime;
                }


                if (startTime > endTime) {
                    _this.showDialog('addCompanyPauseSchedule', 'info', true, '开始时间不能晚于结束时间');
                    console.log('开始时间：' + startTime)
                    console.log('结束时间' + endTime)
                    return;
                }
                console.log('开始时间：' + startTime)
                console.log('结束时间' + endTime)
                var data = {
                    "pauseType": _this.pauseType,
                    "companyCode": _this.addcompanyCode,
                    "companyName": _this.addcompanyName,
                    "startTime": startTime,
                    "endTime": endTime
                };
                if (id || id == '0') {
                    data.id = id;
                    console.log(data.id)
                }
                console.log(data)
                // return;
                $.ajax({
                    type: "POST",
                    async: false,
                    url: "/cashMgmt/livingPay/companyPause/scheduleAdd.ajax",
                    // contentType: 'application/json',
                    dataType: "json",
                    data: data,
                    success: function (data) {
                        if (data.error == 0) {
                            $("#addCompanyPauseSchedule").modal("hide");
                            _this.getTableList({
                                rows: _this.records
                            });
                            _this.currentIndex = 0;
                            _this.showDialog('', 'info', false, data.msg);
                        } else {
                            $("#addCompanyPauseSchedule").modal("hide");
                            _this.showDialog('', 'info', true, data.msg);
                        }
                    },
                    error: function (data) {
                        $("#addCompanyPauseSchedule").modal("hide");
                        _this.showDialog('', 'info', true, data.msg);
                    }
                });
            } else {
                _this.showDialog('addCompanyPauseSchedule', 'info', true, '请填写完整');
            }
        },
        //删除机构
        deleteEven: function () {
            var _this = this;
            if (_this.tableSelect.length <= 0) {
                _this.showDialog('', 'info', true, '请至少选择一条数据进行删除');
                return false;
            }
            var ids = [];
            var codeName = [];
            console.log(_this.tableSelect);
            for (var i = 0; i < _this.tableSelect.length; i++) {
                ids[i] = _this.tableSelect[i].id;
                codeName[i] = _this.tableSelect[i].companyName;
            }
            _this.deleteCode = ids;
            var codesDelete = codeName.join();
            _this.showDialog("", "delete", false, '确认删除"' + codesDelete + '"这些机构停运时间配置吗？');
        },
        confirmDelete: function () {
            var _this = this;
            var ids = _this.deleteCode;
            $.ajax({
                type: "post",
                url: "/cashMgmt/livingPay/companyPause/scheduleDelete.ajax?ids=" + ids,
                async: false,
                dataType: "json",
                success: function (data) {
                    if (data.error == 0) {
                        _this.tableSelect = [];
                        _this.showDialog('delete', 'info', false, data.msg);
                        _this.getTableList({
                            rows: _this.records
                        })
                        _this.currentIndex = 0;
                    } else {
                        _this.showDialog('delete', 'info', false, data.msg);
                    }
                },
                error: function (data) {
                    _this.showDialog('delete', 'info', false, data.msg);
                }
            });
        },
        //修改机构
        companyPauseScheduleDetail: function () {
            // var _this = this;
            // if (_this.tableSelect.length <= 0 || _this.tableSelect.length > 1) {
            //     _this.showDialog('', 'info', false, '请选择一条数据进行编辑');
            //     return false;
            // }
            // $("#addCompanyPauseSchedule").modal('show');            
            // var rowDateId = _this.tableSelect[0].id;
            // $.ajax({
            //     type: "post",
            //     async: false,
            //     url: "/cashMgmt/livingPay/companyPause/companyPauseScheduleDetail.ajax?id=" + rowDateId,
            //     dataType: "json",
            //     success: function (data) {
            //         if (data.error == 0) {
            //             var data = data.data;
            //             $("#id").val(rowDateId);
            //             $("#company").val(data.companyCode);
            //             $("#startTime").val(data.startTime);
            //             $("#endTime").val(data.endTime);
            //             $("#content").val(data.content);
            //             $("#addCompanyPauseSchedule").modal();
            //         } else {
            //             _this.showDialog('', 'info', false, data.msg);
            //         }
            //     }
            // });
        },
        compileFormatTime: function (endtime, startTime, type) {

            switch (type) {
                case '1':
                    this.$refs.startOne.value = startTime.substr(0, 4) + '-' + startTime.substr(4, 2) + '-' + startTime.substr(6, 2) + ' ' + startTime.substr(8, 2) + ':' + startTime.substr(10, 2)
                    this.$refs.endOne.value = endtime.substr(0, 4) + '-' + endtime.substr(4, 2) + '-' + endtime.substr(6, 2) + ' ' + endtime.substr(8, 2) + ':' + endtime.substr(10, 2)
                    break;
                case '2':
                    this.$refs.startDays.value = startTime.substr(0, 2) + ':' + startTime.substr(2, 2)
                    this.$refs.endDays.value = endtime.substr(0, 2) + ':' + endtime.substr(2, 2)
                    break;
                case '3':
                    this.startTime.week = startTime.substr(0, 1)
                    this.endTime.week = endtime.substr(0, 1)
                    this.$refs.startWeekTime.value = startTime.substr(1, 2) + ':' + startTime.substr(3, 2)
                    this.$refs.endWeekTime.value = endtime.substr(1, 2) + ':' + endtime.substr(3, 2)
                    break;
                case '4':
                    if (startTime.substr(0, 1) == '0') {
                        this.startTimeDay = startTime.substr(1, 1)
                    } else {
                        this.startTimeDay = startTime.substr(0, 2)
                    }

                    if (endtime.substr(0, 1) == '0') {
                        this.endTimeDay = endtime.substr(1, 1)
                    } else {
                        this.endTimeDay = endtime.substr(0, 2)
                    }
                    this.$refs.startMountTime.value = startTime.substr(2, 2) + ':' + startTime.substr(4, 2)
                    this.$refs.endMountTime.value = endtime.substr(2, 2) + ':' + endtime.substr(4, 2)
                    break;
                case '5':
                    if (endtime.substr(0, 1) == '0') {
                        this.endTime.month = endtime.substr(1, 1)

                    } else {
                        this.endTime.month = endtime.substr(0, 2)
                    }

                    if (endtime.substr(2, 1) == '0') {
                        this.yendTimeday= endtime.substr(3, 1)

                    } else {
                        this.yendTimeday= endtime.substr(2, 2)
                    }

                    this.$refs.endYearMonthTime.value = endtime.substr(4, 2) + ':' + endtime.substr(6, 2)

                    if (startTime.substr(0, 1) == '0') {
                        this.startTime.month = startTime.substr(1, 1)
                    } else {
                        this.startTime.month = startTime.substr(0, 2)
                    }

                    if (startTime.substr(2, 1) == '0') {
                        this.ystartTimeday = startTime.substr(3, 1)
                    } else {
                        this.ystartTimeday = startTime.substr(2, 2)
                    }

                    this.$refs.startYearMonthTime.value = startTime.substr(4, 2) + ':' + startTime.substr(6, 2)
                    break;
                    break;
                default:

            }

        },
        // 修改机构
        compilePause: function (id, code, type, startTime, endTime) {
            // var _this = this;
            // if (_this.tableSelect.length <= 0 || _this.tableSelect.length > 1) {
            //     _this.showDialog('', 'info', false, '请选择一条数据进行编辑');
            //     return false;
            // }
            this.id=id;
            var _this = this,
                data = {
                    id: id
                }
            $.ajax({
                type: "post",
                url: "/cashMgmt/livingPay/companyPause/queryOne.ajax",
                data: data,
                success: function (data) {
                    if (data.error == 0) {
                        _this.compileFormatTime(data.data.endTime, data.data.startTime, data.data.pauseType)
                    } else {
                        _this.showDialog('delete', 'info', false, data.msg);
                    }
                },
                error: function (data) {
                    _this.showDialog('delete', 'info', false, data.msg);
                }
            });
            this.pauseType = type;
            this.addcompanyCode = code;
            $("#addCompanyPauseSchedule").modal('show');
            // var rowDateId = _this.tableSelect[0].id;
            this.addorcompile = 'compile' //为修改
            console.log(id)
            // console.log(rowDateId)
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
        },
        inSelected: function (item, arr, prop) {
            var _index = -1;
            arr.forEach(function (value, index) {
                if (item[prop] == value[prop]) {
                    _index = index;
                }
            });
            return _index;
        },
        format: function (timestamp) {
            var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
            var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
            var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
            return Y + M + D + h + m + s;
        }
    },
    filters: {
        pauseType: function (item) {
            if (item == '1') {
                return '仅一次'
            } else if (item == '2') {
                return '每日'
            } else if (item == '3') {
                return '每周'
            } else if (item == '4') {
                return '每月'
            } else if (item == '5') {
                return '每年'
            } else {
                return '仅一次'
            }
        },
        formatTime: function (oldTime, type) {
            var newTime;
            switch (type) {
                case '1':
                    newTime = oldTime.substr(0, 4) + '-' + oldTime.substr(4, 2) + '-' + oldTime.substr(6, 2) + ' ' + oldTime.substr(8, 2) + ':' + oldTime.substr(10, 2)
                    return newTime;
                case '2':
                    newTime = oldTime.substr(0, 2) + ':' + oldTime.substr(2, 2)
                    return newTime;
                case '3':
                    newTime = '星期' + oldTime.substr(0, 1) + ' ' + oldTime.substr(1, 2) + ':' + oldTime.substr(3, 2)
                    return newTime;
                case '4':
                    newTime = oldTime.substr(0, 2) + '号 ' + oldTime.substr(2, 2) + ':' + oldTime.substr(4, 2)
                    return newTime;
                case '5':
                    newTime = oldTime.substr(0, 2) + '-' + oldTime.substr(2, 2) + ' ' + oldTime.substr(4, 2) + ':' + oldTime.substr(6, 2)
                    return newTime;
                default:

            }

        }
    }
});

function toUpperCase(obj) {
    obj.value = obj.value.toUpperCase();
}
$("#reset_btn").click(function () {
    $("#addCompanyPauseSchedule").validate().resetForm();
});