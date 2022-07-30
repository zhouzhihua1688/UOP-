new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        // 规则编号
        id: '',
        // 产品
        product: "",
        // 保存弹窗产品
        saveproduct: "",
        // 业务类型
        serialno: '',
        // actionType: "",
        actionType: [],
        // endDate: "",
        // endTime: "",
        // groupid: "",
        // startDate: "",
        // startTime: "",

        remark: "",
        status: "",
        // 查询
        // groupids:'',
        // groupidList:"",
        isUpdate: false,
        //隐藏假分页节点元素
        showMysql: false,
        updateId: '',
        tableData: [],
        diaMsg: '',
        checkData: [],
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        pageMaxNum: '10',
        condition: '',
        currentIndex2: 0,
        // 全选
        allCheck: false,
        // 复核状态
        reviewStatus: "",
        // 数据库id
        mysqlId: "",
        // 数据类型(0:业务,1:Mysql数据库)
        type: "1",
        mysqlStatus: '',
        // mysql传产品值
        mysqlProduct: "",
        // 获取数据库产品所有ID
        arrId: [],
        oneId: '',
        operator: "",
        // 判断Mysql数据状态
        delete_flag: "",
        operate: '',
        // 自动获取规则编号Id
        ruleId: "",

        // 暂停交易的
        fundid: '',
        fundids: '',
        detailtype: '',
        accptmd: '',
        userId: '',
        classify: 'ALL',
        dataFlag: 'local',//数据来源
        // qStatus: '',//审核状态查询
        // qLineFundId: '005228',//基金名称查询
        // qLocalFundId: '',//基金名称查询
        //
        // updateTime: '',//数据更新时间
        //
        selectOption: {//选项
            lineFundIdList: [],//线上基金名称查询
            localFundIdList: [],//本地基金名称查询
        },
        // suspendAddList: [],//新增数据
        // suspendUnwatch: [],//新增数据监听
        arrId: [],   //所有Id集合
        arrTime: [], //所有开始时间集合
        arrEndTime: [],  //所有结束时间集合
        resultArr: [],

    },
    // 获取本地Mysql所有Id
    created: function () {
        var _this = this;
        // this.getlocalList()
        // this.getTableData(0,this.type);
        this.userName();
    },
    mounted: function () {
        var dialogs = ['info', 'del', 'del2', 'add', "update", "revise", 'subMit', 'delAgain'];
        var _this = this;
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
        // 组合多选
        var selected = [];
        $('#accptmd').multiselect({
            buttonWidth: '165px',
            maxHeight: 300,
            // enableFiltering: true,
            enableHTML: true,
            // includeSelectAllOption: true,//全选
            // selectAllText: '全选',//全选的checkbox名称
            nonSelectedText: '请选择',
            selectAllNumber: false,//true显示allselect（6）,false显示allselect
            selectAllName: 'select-all-name',
            selectAllValue: 'select-all-value',//可以为strig或者数字
            selectAllJustVisible: false,//选择所有的。true为全选可见的
            buttonClass: 'btn btn-white btn-primary',
            buttonText: function (options, select) {
                var once = [];
                $('#accptmd option:selected').each(function () {
                    once.push($(this).attr('label'));
                });
                // console.log(options.length);
                // console.log(options.prevObject.length);
                if (options.length === 0) {
                    return this.nonSelectedText;
                } else if (options.length === 1) {
                    return once[0];
                } else if (options.length > 1) {
                    return '已选' + once.length
                }
            },
            templates: {
                button: '<button type="button" class="multiselect dropdown-toggle" data-toggle="dropdown"><span class="multiselect-selected-text"></span> &nbsp;<b class="fa fa-caret-down"></b></button>',
                ul: '<ul class="multiselect-container dropdown-menu"></ul>',
                filter: '<li class="multiselect-item filter"><div class="input-group"><span class="input-group-addon"><i class="fa fa-search"></i></span><input class="form-control multiselect-search" type="text"></div></li>',
                filterClearBtn: '<span class="input-group-btn"><button class="btn btn-default btn-white btn-grey multiselect-clear-filter" type="button"><i class="fa fa-times-circle red2"></i></button></span>',
                li: '<li><a tabindex="0"><label></label></a></li>',
                divider: '<li class="multiselect-item divider"></li>',
                liGroup: '<li class="multiselect-item multiselect-group"><label></label></li>'
            },
            onDropdownHide: function (event) {
                selected = [];
                $('#accptmd option:selected').each(function () {
                    selected.push($(this).val());
                });
                // console.log(selected,'selected');
                _this.accptmd = $("#accptmd").val() ? $("#accptmd").val() : [];
            }
        });

        //下拉列表自带搜索功能---业务查询框
        var fundArr = ['fundNameList1', 'fundNameList2'];
        fundArr.forEach(function (value) {
            $('#' + value).chosen({
                search_contains: true,
                // disable_search: true,
                no_results_text: '未找到相关产品信息',
                disable_search_threshold: 6,
                width: '170px'
            });
        });
        $('#fundNameList1').on('change', function (e, params) {
            _this.fundid = params ? params.selected : '';
            // 请求数据用作一下添加数据验证时间
            $.post({
                url: '/businessMgmt/pauseTradeMgmt/pauseTradeHandle/getTableData.ajax',
                data: {
                    type: 0,
                    fundId: _this.fundid
                },
                success: function (result) {
                    if (result.error === 0) {
                        _this.checkDate = result.data.tableData;
                    }
                    else {
                        _this.checkData = [];
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });

        });

        $('#fundNameList2').on('change', function (e, params) {
            _this.fundids = params ? params.selected : '';
        });

        this.getTableData(0, this.type);
        this.getFundList();
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
            }
            else if (this.currentIndex <= this.maxSpace && this.middleData.length - this.currentIndex > this.maxSpace) {
                for (var i = 0; i < this.currentIndex + (2 * this.maxSpace - this.currentIndex); i++) {
                    arr.push(i + 1);
                }
            }
            else if (this.currentIndex > this.maxSpace && this.middleData.length - this.currentIndex <= this.maxSpace) {
                var space = this.middleData.length - this.currentIndex;
                for (var i = this.currentIndex - (2 * this.maxSpace - space); i < this.middleData.length; i++) {
                    arr.push(i + 1);
                }
            }
            else {
                for (var i = 0; i < this.middleData.length; i++) {
                    arr.push(i + 1);
                }
            }
            return arr;
        }
    },
    watch: {
        pageMaxNum: function () {
            this.getTableData(0, this.type);
        },
        // 假分页
        watch: {
            pageMaxNum: function () {
                this.currentIndex = 0;
                this.getTableData(0, this.type)
            },
            condition: function () {
                this.currentIndex = 0;
            }
        },

    },
    methods: {
        // 获取信息
        userName: function () {
            var _this = this;
            var operator;
            $.post({
                url: '/businessMgmt/pauseTradeMgmt/pauseTradeHandle/userName.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        operator = result.data
                    }
                    _this.operator = operator
                }
            });
        },
        // 2021-04-15添加小箭头时间排序
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
        // 查询基金列表
        getFundList: function (classify) {
            var _this = this;
            $.post({//基金名称查询
                url: '/businessMgmt/pauseTradeMgmt/pauseTradeHandle/collection.ajax',
                data: {
                    fundTypeCustomized: classify || 'ALL'
                },
                success: function (result) {
                    if (result.error === 0) {
                        _this.selectOption.lineFundIdList = result.data;
                        _this.addOption = result.data;

                        // 下拉列表
                        // var str = '<option value="">全部</option>';
                        var str = '<option value=""></option>';
                        _this.selectOption.lineFundIdList.forEach(function (item) {
                            str += '<option value="' + item.fundId + '">' + item.fundId + '-' + item.fundName + '</option>';
                        });
                        var fundArr2 = ['fundNameList1', 'fundNameList2'];
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
        fundType: function (classify) {
            var _this = this;
            _this.getFundList(classify)
        },

        // 获取表格数据
        getTableData: function (currentIndex, type) {
            var _this = this;
            var nowdate = new Date()

            var y = nowdate.getFullYear()
            var m = nowdate.getMonth() + 1
            m = m < 10 ? '0' + m : m
            var d = nowdate.getDate();
            d = d < 10 ? ('0' + d) : d;
            var checkTime = y + "" + m + "" + d;
            var params = {};
            //传过去的状态参数
            params.type = type;
            // 获取业务数据
            if (type == 0) {
                this.isUpdate = true;  //显示业务端分页
                this.showMysql = false;//显示假分页
                this.currentIndex = 0;
                params.fundId = this.fundids;
                params.startdate = this.$refs.startdate.value.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1$2$3');
                console.log(params)
                $.post({
                    url: '/businessMgmt/pauseTradeMgmt/pauseTradeHandle/getTableData.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            this.pageMaxNum = 1;
                            _this.tableData = result.data.tableData.sort(function (a, b) {
                                return a.startdate < b.startdate ? 1 : -1
                            }).filter(function (item) {
                                return item.startdate >= params.startdate;   //根据开始时间>选择的开始时间&&
                            })
                            // _this.tableData = result.data.tableData.filter(function (item) {
                            //     return item.groupid.indexOf(params.groupid) > -1
                            // })
                        }
                        else {
                            _this.tableData = [];
                            _this.showDialog('', 'info', false, "请输入基金代码查询!");
                        }
                    }
                });
            }
            // 获取本地数据
            if (type == 1) {
                var _this = this;
                // 真假分页切换
                this.isUpdate = false;
                this.showMysql = true;
                this.currentIndex = 0;
                params.reviewStatus = this.reviewStatus; //复核状态
                params.fundid = this.fundids;
                params.startdate = this.$refs.startdate.value.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1$2$3');
                var accptmd = [{'value': "0", "name": "柜台"}, {'value': "2", "name": "网上"}, {
                    'value': "7",
                    "name": "企业版"
                }, {'value': "6", "name": "第三方"}, {'value': "P", "name": "机构服务平台"}];
                //类型多选条件
                _this.dataSummary(accptmd, 'value', 'label', 'accptmd');
                $.post({
                    url: '/businessMgmt/pauseTradeMgmt/pauseTradeHandle/getTableData.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.tableData = result.data.sort(function (a, b) {
                                return a.startdate < b.startdate ? 1 : -1
                            }).filter(function (item) {
                                return item.startdate >= params.startdate;   //根据开始时间》选择的开始时间&&//开始时间点从现在到未来的方式进行排序
                            });
                        }
                        else {
                            _this.showDialog('', 'info', false, result.msg);
                        }
                    }
                });
            }
        },
        // 模拟点击
        select: function () {
            document.getElementById("type0").click();
        },
        select2: function () {
            document.getElementById("type1").click();
        },
        // 添加按钮弹窗
        showAdd: function () {
            var _this = this;
            // this.fundid="";
            this.detailtype = "";
            this.accptmd = "";
            this.startdate = $('#startDate').val("");
            this.starttime = "";
            this.enddate = $('#endDate').val("");
            this.endtime = "";
            _this.arrId = [];
            _this.arrTime = [];
            _this.arrEndTime = [];
            this.showDialog('', 'add');
        },
        // 新增必填弹框
        diaInfoCheck: function () {
            var _this = this;
            var arrList = [];
            if (!this.fundid) {
                this.showDialog('add', 'info', true, '基金代码不能为空');
                return false;
            }
            if (!this.detailtype) {
                this.showDialog('add', 'info', true, '暂停类型不能为空');
                return false;
            }
            if (!this.accptmd) {
                this.showDialog('add', 'info', true, '受理方式不能为空');
                return false;
            }
            if (!$("#startDate").val()) {
                this.showDialog('add', 'info', true, '开始时间不能为空');
                return false;
            }
            if (!$("#endDate").val()) {
                this.showDialog('add', 'info', true, '结束时间不能为空');
                return false;
            }

            // 以下为时间冲突验证
            // for (var i = 0; i < _this.tableData.length; i++) {               //当前本地已经添加的数据
            //     // _this.arrId.push( _this.tableData[i].fundid)
            //     if (_this.fundid == _this.tableData[i].fundid && _this.accptmd == _this.tableData[i].accptmd) {
            //         _this.arrId.push(_this.tableData[i].fundid)
            //         _this.arrTime.push(_this.tableData[i].startdate + _this.tableData[i].starttime);
            //         _this.arrEndTime.push(_this.tableData[i].enddate + _this.tableData[i].endtime)
            //     }
            //
            // }

            // for (var i = 0; i < _this.checkDate.length; i++) {                 //业务存在的数据
            //     _this.arrId.push(_this.checkDate[i].fundid)
            //     _this.resultArr = _this.arrId.filter(function (item, index, self) {
            //         return self.indexOf(item) == index;
            //     });
            //     if (_this.fundid == _this.checkDate[i].fundid && _this.accptmd == _this.checkDate[i].accptmd) {
            //         _this.arrId.push(_this.checkDate[i].fundid)
            //         _this.arrTime.push(_this.checkDate[i].startdate + _this.checkDate[i].starttime);
            //         _this.arrEndTime.push(_this.checkDate[i].enddate + _this.checkDate[i].endtime)
            //
            //         _this.arrTime.sort(function (a, b) {
            //             return b - a;
            //         });
            //         _this.arrEndTime.sort(function (a, b) {
            //             return b - a;
            //         });
            //     }
            // }

            // 找到最大和最小
            // var max = _this.arrTime[0];  // 最大的一个时间
            // var min = _this.arrTime[_this.arrTime.length - 1];  //最小的一个时间
            // var endMax = _this.arrEndTime[0];  // 结束时间最大的一个时间
            // var endMin = _this.arrEndTime[_this.arrEndTime.length - 1];  //结束时间最小的一个时间
            //
            // console.log("开始最大时间", max)
            // console.log("开始最小时间", min)
            //
            // console.log("结束最大时间", endMax)
            // console.log("结束最小时间", endMin)
            //
            // var addTime = moment($('#startDate').val()).format("YYYYMMDD") + moment($('#startDate').val()).format("HHmmss");  //单个时间 开始时间
            // var addEndTime = moment($('#endDate').val()).format("YYYYMMDD") + moment($('#endDate').val()).format("HHmmss")  //单个时间 结束时间
            //
            //
            // if (_this.resultArr.indexOf(_this.fundid.toString()) != -1 || _this.arrId.indexOf(_this.fundid.toString()) != -1) {
            //     if (addTime >= min && addTime <= max) {
            //         return _this.showDialog('add', 'info', true, '基金' + _this.fundid + '数据不能与现有时间段冲突');
            //     }
            //     if (addTime >= endMin && addTime <= endMax) {
            //         return _this.showDialog('add', 'info', true, '基金' + _this.fundid + '数据不能与现有时间段冲突');
            //
            //     }
            //     if (addEndTime >= min && addEndTime <= max) {
            //         return _this.showDialog('add', 'info', true, '基金' + _this.fundid + '数据不能与现有时间段冲突');
            //
            //     }
            //     if (addEndTime >= endMin && addEndTime <= endMax) {
            //         return _this.showDialog('add', 'info', true, '基金' + _this.fundid + '数据不能与现有时间段冲突');
            //
            //     }
            //     return true;
            // } else {
            //     return true;
            // }
            return true;
        },

        // 保存添加数据按钮
        saveParam: function () {
            var _this = this;

            if (this.diaInfoCheck()) {
                var params = {};

                params.type = this.type;//状态参数

                // params.serialno = this.serialno;
                // params.fundid = this.fundid;
                // params.detailtype = this.detailtype;
                // params.accptmd = this.accptmd;
                // params.status = 'N';
                // params.stoptype = '01';
                // params.startdate = moment($('#startDate').val()).format("YYYYMMDD");
                // params.starttime = moment($('#startDate').val()).format("HHmmss");
                // params.enddate = moment($('#endDate').val()).format("YYYYMMDD");
                // params.endtime = moment($('#endDate').val()).format("HHmmss");
                // params.operator = this.operator;


                var content = {
                    type: this.type,
                    serialno: this.serialno,
                    // groupid: this.groupid,
                    // actionType:this.actionType.join(),
                    fundid: this.fundid,
                    detailtype: this.detailtype,
                    accptmd: this.accptmd.join(),
                    status: 'N',
                    stoptype: '01',
                    startdate: moment($('#startDate').val()).format("YYYYMMDD"),
                    starttime: moment($('#startDate').val()).format("HHmmss"),
                    enddate: moment($('#endDate').val()).format("YYYYMMDD"),
                    endtime: moment($('#endDate').val()).format("HHmmss"),
                    operator: this.operator,
                };
                params.content = JSON.stringify(content);

                console.log(params)
                $.post({
                    url: '/businessMgmt/pauseTradeMgmt/pauseTradeHandle/saveParam.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.getTableData(0, params.type);
                        }
                        _this.showDialog('add', 'info', false, result.msg);
                    }
                });
            }
        },

        //点击修改业务数据按钮保存到本地
        serviceUpdate: function (item) {
            var _this = this;
            this.operate = item.operate;
            // 判断业务接口数据与数据库有没有相同数据
            // if (this.type == 0) {
            //     if (this.arrId.indexOf(item.id.toString()) != -1) {
            //         _this.oneId = item.id
            //     } else {
            //         _this.oneId = ''
            //     }
            // }
            _this.arrId = [];
            _this.arrTime = [];
            _this.arrEndTime = [];
            // 请求数据用作一下添加数据验证时间
            $.post({
                url: '/businessMgmt/pauseTradeMgmt/pauseTradeHandle/getTableData.ajax',
                data: {
                    type: 0,
                    fundId: item.fundid
                },
                success: function (result) {
                    if (result.error === 0) {
                        _this.checkDate = result.data.tableData;
                    }
                    else {
                        _this.checkData = [];
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });

            this.serialno = item.serialno;
            this.fundid = item.fundid;
            this.detailtype = item.detailtype;
            this.accptmd = item.accptmd;
            this.status = item.status;
            this.stoptype = item.stoptype;
            this.startdate = $("#startDates").val(item.startdate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') + ' ' + item.starttime.replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3'));
            this.starttime = item.starttime;
            this.enddate = $("#endDates").val(item.enddate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') + ' ' + item.endtime.replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3'));
            this.endtime = item.endtime;

            this.operate = item.operate;
            this.delete_flag = item.delete_flag;
            this.showDialog('', 'revise');

        },

        // 修改验证弹框
        reviseCheck: function () {
            var _this = this;

            // if (!this.fundid) {
            //     this.showDialog('revise', 'info', true, '基金代码不能为空');
            //     return false;
            // }
            // if (!this.detailtype) {
            //     this.showDialog('revise', 'info', true, '暂停类型不能为空');
            //     return false;
            // }
            // if (!this.accptmd) {
            //     this.showDialog('revise', 'info', true, '受理方式不能为空');
            //     return false;
            // }
            //
            // if (!$(".startDates").val()) {
            //     this.showDialog('revise', 'info', true, '开始时间不能为空');
            //     return false;
            // }
            // if (!$(".endDates").val()) {
            //     this.showDialog('revise', 'info', true, '结束时间不能为空');
            //     return false;
            // }

            // 以下为所有的时间冲突验证
            // for (var i = 0; i < _this.tableData.length; i++) {               //当前本地已经添加的数据
            //     // _this.arrId.push( _this.tableData[i].fundid)
            //     if (_this.fundid == _this.tableData[i].fundid && _this.accptmd == _this.tableData[i].accptmd && _this.serialno != _this.tableData[i].serialno) {
            //         _this.arrId.push(_this.tableData[i].fundid)
            //         _this.arrTime.push(_this.tableData[i].startdate + _this.tableData[i].starttime);
            //         _this.arrEndTime.push(_this.tableData[i].enddate + _this.tableData[i].endtime)
            //     }
            // }
            // console.log(_this.checkDate)
            // for (var i = 0; i < _this.checkDate.length; i++) {                 //业务存在的数据
            //     // _this.arrId.push(_this.checkDate[i].fundid)
            //
            //     _this.resultArr = _this.arrId.filter(function (item, index, self) {
            //         return self.indexOf(item) == index;
            //     });
            //     if (_this.fundid == _this.checkDate[i].fundid && _this.accptmd == _this.checkDate[i].accptmd && _this.serialno != _this.checkDate[i].serialno) {
            //         _this.arrId.push(_this.checkDate[i].fundid)
            //         _this.arrTime.push(_this.checkDate[i].startdate + _this.checkDate[i].starttime);
            //         _this.arrEndTime.push(_this.checkDate[i].enddate + _this.checkDate[i].endtime)
            //
            //         _this.arrTime.sort(function (a, b) {
            //             return b - a;
            //         });
            //         _this.arrEndTime.sort(function (a, b) {
            //             return b - a;
            //         });
            //     }
            // }
            // 找到最大和最小
            // var max = _this.arrTime[0];  // 最大的一个时间
            // var min = _this.arrTime[_this.arrTime.length - 1];  //最小的一个时间
            // var endMax = _this.arrEndTime[0];  // 结束时间最大的一个时间
            // var endMin = _this.arrEndTime[_this.arrEndTime.length - 1];  //结束时间最小的一个时间
            //
            // console.log("开始最大时间", max)
            // console.log("开始最小时间", min)
            //
            // console.log("结束最大时间", endMax)
            // console.log("结束最小时间", endMin)
            //
            // var addTime = moment(this.$refs.startDates.value).format('YYYYMMDD') + moment(this.$refs.startDates.value).format("HHmmss");  //单个时间 开始时间
            // var addEndTime = moment(this.$refs.endDates.value).format('YYYYMMDD') + moment(this.$refs.endDates.value).format("HHmmss");  //单个时间 结束时间
            //
            // if (_this.resultArr.indexOf(_this.fundid.toString()) != -1 || _this.arrId.indexOf(_this.fundid.toString()) != -1) {
            // if(addTime>=min&&addTime<=max){
            //     return  _this.showDialog('revise', 'info', true, '基金'+_this.fundid+'数据不能与现有时间段冲突');
            // }
            // if(addTime>=endMin&&addTime<=endMax){
            //     return _this.showDialog('revise', 'info', true, '基金'+_this.fundid+'数据不能与现有时间段冲突');
            //
            // }
            // if(addEndTime>=min&&addEndTime<=max){
            //     return  _this.showDialog('revise', 'info', true, '基金'+_this.fundid+'数据不能与现有时间段冲突');
            //
            // }
            // if(addEndTime>=endMin&&addEndTime<=endMax){
            //     return  _this.showDialog('revise', 'info', true, '基金'+_this.fundid+'数据不能与现有时间段冲突');
            //
            // }
            //
            //     console.log("开始时间", addTime)
            //     console.log("结束时间", addEndTime)
            //     if (addTime >= min && addTime <= max) {
            //         console.log(111)
            //         return _this.showDialog('revise', 'info', true, '基金' + _this.fundid + '数据不能与现有时间段冲突');
            //     }
            //     if (addTime >= min && addTime <= endMax) {
            //         console.log(222)
            //         return _this.showDialog('revise', 'info', true, '基金' + _this.fundid + '数据不能与现有时间段冲突');
            //
            //     }
            //     if (addEndTime >= min && addEndTime <= max) {
            //         console.log(333)
            //         return _this.showDialog('revise', 'info', true, '基金' + _this.fundid + '数据不能与现有时间段冲突');
            //
            //     }
            //     if (addEndTime >= endMin && addEndTime <= endMax) {
            //         console.log(444)
            //         return _this.showDialog('revise', 'info', true, '基金' + _this.fundid + '数据不能与现有时间段冲突');
            //     }
            //     if (addTime <= min && addEndTime >= endMax) {
            //         console.log(555)
            //         return _this.showDialog('revise', 'info', true, '基金' + _this.fundid + '数据不能与现有时间段冲突');
            //
            //     }
            //     if (addTime <= min && addEndTime >= endMin) {
            //         console.log(666)
            //         return _this.showDialog('revise', 'info', true, '基金' + _this.fundid + '数据不能与现有时间段冲突');
            //
            //     }
            //     if ((addTime >= min || addTime <= min) && (addEndTime <= endMax && addEndTime >= min)) {
            //         console.log(777)
            //         return _this.showDialog('revise', 'info', true, '基金' + _this.fundid + '数据不能与现有时间段冲突');
            //     }
            //     return true;
            // } else {
            //     return true;
            // }
            return true;
        },
        serviceSave: function () {
            var _this = this;
            if (this.reviseCheck()) {
                var params = {};
                params.type = this.type;
                params.oneId = _this.oneId; //根据id插入或者修改数据
                // params.product = this.mysqlProduct;
                params.serialno = this.serialno;
                // params.groupid = this.groupid;
                // params.actionType = this.actionType;
                params.fundid = this.fundid;
                params.detailtype = this.detailtype;
                params.accptmd = this.accptmd;
                params.status = this.status;
                params.stoptype = this.stoptype;
                params.startdate = moment(this.$refs.startDates.value).format('YYYYMMDD');
                params.starttime = moment(this.$refs.startDates.value).format("HHmmss");
                params.enddate = moment(this.$refs.endDates.value).format('YYYYMMDD');
                params.endtime = moment(this.$refs.endDates.value).format("HHmmss");

                params.operate = this.operate;
                params.updateTime = moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss");

                params.arrId = _this.arrId;

                params.delete_flag = this.delete_flag;
                console.log(params)

                $.post({
                    url: '/businessMgmt/pauseTradeMgmt/pauseTradeHandle/serviceSave.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.getTableData(0, params.type);
                        }
                        _this.showDialog('revise', 'info', false, result.msg);
                    }
                });
            }
        },

        // 点击修改本地数据按钮
        localUpdate: function (item) {
            var _this = this;
            this.operate = item.operate;
            // 判断业务接口数据与数据库有没有相同数据
            // if (this.type == 0) {
            //     if (this.arrId.indexOf(item.id.toString()) != -1 && item.status == '0') {
            //         _this.oneId = item.id
            //     } else {
            //         _this.oneId = ''
            //     }
            // }

            // 请求数据用作一下添加数据验证时间
            $.post({
                url: '/businessMgmt/pauseTradeMgmt/pauseTradeHandle/getTableData.ajax',
                data: {
                    type: 0,
                    fundId: item.fundid
                },
                success: function (result) {
                    if (result.error === 0) {
                        _this.checkDate = result.data.tableData;
                    }
                    else {
                        _this.checkData = [];
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });

            this.mysqlId = item.mySQLId  //获取数据库表字段ID
            this.serialno = item.serialno;
            this.fundid = item.fundid;
            this.detailtype = item.detailtype;
            this.accptmd = item.accptmd;
            this.status = item.status;
            this.stoptype = item.stoptype;
            this.startdate = $("#startDates").val(item.startdate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') + ' ' + item.starttime.replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3'));
            this.starttime = item.starttime;
            this.enddate = $("#endDates").val(item.enddate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') + ' ' + item.endtime.replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3'));
            this.endtime = item.endtime;

            this.operate = item.operate;
            this.delete_flag = item.delete_flag;

            this.showDialog('', 'revise');

        },
        localRevise: function () {
            var _this = this;
            if (this.reviseCheck()) {
                var params = {};
                params.type = this.type;
                params.myqsql = this.mysqlId; //数据表字段id
                params.oneId = _this.oneId; //根据id插入或者修改数据

                params.serialno = this.serialno;
                params.product = this.mysqlProduct;
                params.fundid = this.fundid;
                params.detailtype = this.detailtype;
                params.accptmd = this.accptmd;
                params.status = this.status;
                params.stoptype = this.stoptype;
                params.startdate = moment(this.$refs.startDates.value).format('YYYYMMDD');
                params.starttime = moment(this.$refs.startDates.value).format("HHmmss");
                params.enddate = moment(this.$refs.endDates.value).format('YYYYMMDD');
                params.endtime = moment(this.$refs.endDates.value).format("HHmmss");

                params.operator = this.operator;
                params.operate = this.operate;
                params.updateTime = moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss");

                // params.arrId = _this.arrId
                params.delete_flag = this.delete_flag;
                console.log(params)
                $.post({
                    url: '/businessMgmt/pauseTradeMgmt/pauseTradeHandle/localRevise.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.getTableData(0, params.type);
                        }
                        _this.showDialog('revise', 'info', false, result.msg);
                    }
                });
            }
        },

        // 提交操作
        showSubmit: function (item) {
            var _this = this;
            this.mysqlId = item.mySQLId; //获取数据库表字段ID

            this.id = item.id;
            this.product = "";
            this.mysqlProduct = item.product; //为mysql执行修改传值
            this.apkind = item.apkind;
            this.subApkind = item.subApkind;
            this.bankNo = item.bankNo;
            this.branchCode = item.branchCode;
            this.channel = item.channel;
            this.custType = item.custType;
            this.tradeType = item.tradeType;
            this.maxQuota = item.maxQuota;
            this.minQuota = item.minQuota;
            this.startTime = item.startTime;
            this.endTime = item.endTime;
            this.remark = item.remark;
            this.quotaType = item.quotaType;

            this.operate = item.operate;
            this.delete_flag = item.delete_flag;

            this.operate = item.operate;
            this.showDialog('', 'subMit');
        },
        submitCheck: function () {
            var _this = this;
            var params = {};
            params.type = this.type;
            params.myqsql = this.mysqlId; //数据表字段id
            params.oneId = this.oneId; //根据id插入或者修改数据
            params.operator = this.operator;

            params.id = this.id;
            params.product = this.mysqlProduct;
            params.tradeType = this.tradeType;
            params.apkind = this.apkind;
            params.bankNo = this.bankNo;
            params.branchCode = this.branchCode;
            params.channel = this.channel;
            params.custType = this.custType;
            params.remark = this.remark;
            params.subApkind = this.subApkind;
            params.quotaType = this.quotaType;
            params.maxQuota = this.maxQuota;
            params.minQuota = this.minQuota;
            params.startTime = this.$refs.startTime2.value;
            params.endTime = this.$refs.endTime2.value;

            params.operate = this.operate;
            params.updateTime = moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss");
            params.arrId = _this.arrId;
            params.delete_flag = this.delete_flag;
            $.post({
                url: '/businessMgmt/businessParamConfig/quotaHandle/submitCheck.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getlocalList();
                        _this.getTableData(0, params.type);
                        _this.product = "";
                    }
                    _this.showDialog('subMit', 'info', false, result.msg);
                }
            });
        },

        //删除业务数据保存到本地
        showDelete: function (item) {
            var _this = this;
            // var hasCheck = false;
            // 判断业务接口数据与数据库有没有相同数据
            // if (this.type == 0) {
            //     if (this.arrId.indexOf(item.id.toString()) != -1 && item.status == '0') {
            //         _this.oneId = item.id
            //     } else {
            //         _this.oneId = ''
            //     }
            // }

            // this.id = item.id; //后端接口id
            // this.mysqlId = item.mySQLId  //获取数据库表字段ID
            // this.mysqlProduct = item.product; //为mysql执行修改传值

            this.serialno = item.serialno;
            this.fundid = item.fundid;
            this.detailtype = item.detailtype;
            this.accptmd = item.accptmd;
            this.status = item.status;
            this.stoptype = item.stoptype;
            this.startdate = $("#startDates").val(item.startdate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') + ' ' + item.starttime.replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3'));
            this.starttime = item.starttime;
            this.enddate = $("#endDates").val(item.enddate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') + ' ' + item.endtime.replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3'));
            this.endtime = item.endtime;
            this.operate = item.operate;
            this.delete_flag = item.delete_flag;

            this.showDialog('', 'del');
        },
        deleteUser: function () {
            var _this = this;
            // var ids= [];
            // for (var i = 0; i < this.tableData.length; i++) {
            //     if (this.tableData[i].check) {
            //         ids.push(this.tableData[i].id);
            //     }
            // }
            var params = {};
            params.type = this.type;//状态参数
            // params.myqsql = this.mysqlId; //数据表字段id
            // params.oneId =_this.oneId; //根据id插入或者修改数据


            params.serialno = this.serialno;
            params.product = this.mysqlProduct;
            params.fundid = this.fundid;
            params.detailtype = this.detailtype;
            params.accptmd = this.accptmd;
            params.status = this.status;
            params.stoptype = this.stoptype;
            params.startdate = moment(this.$refs.startDates.value).format('YYYYMMDD');
            params.starttime = moment(this.$refs.startDates.value).format("HHmmss");
            params.enddate = moment(this.$refs.endDates.value).format('YYYYMMDD');
            params.endtime = moment(this.$refs.endDates.value).format("HHmmss");

            params.operate = this.operate;
            console.log(params)
            $.post({
                url: '/businessMgmt/pauseTradeMgmt/pauseTradeHandle/deleteParam.ajax',
                data: params,
                traditional: true,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0, params.type);
                    }
                    _this.showDialog('del', 'info', false, result.msg);
                }
            });
        },

        //本地数据撤销操作
        showRevoke: function (item) {
            var _this = this
            // var hasCheck = false;
            // 判断业务接口数据与数据库有没有相同数据
            // if (this.type == 0) {
            //     if (this.arrId.indexOf(item.id.toString()) != -1 && item.status == '0') {
            //         _this.oneId = item.id
            //     } else {
            //         _this.oneId = ''
            //     }
            // }
            this.id = item.id; //后端接口id
            this.mysqlId = item.mySQLId  //获取数据库表字段ID

            this.serialno = item.serialno;
            this.fundid = item.fundid;
            this.detailtype = item.detailtype;
            this.accptmd = item.accptmd;
            this.status = item.status;
            this.stoptype = item.stoptype;
            this.startdate = $("#startDates").val(item.startdate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') + ' ' + item.starttime.replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3'));
            this.starttime = item.starttime;
            this.enddate = $("#endDates").val(item.enddate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') + ' ' + item.endtime.replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3'));
            this.endtime = item.endtime;

            this.operate = item.operate;

            this.showDialog('', 'del2');

        },
        deleteUser2: function () {
            var _this = this;
            var params = {};
            params.type = this.type;//状态参数
            params.myqsql = this.mysqlId; //数据表字段id
            params.oneId = this.oneId; //根据id插入或者修改数据
            params.operator = this.operator;

            params.serialno = this.serialno;
            params.product = this.mysqlProduct;
            params.fundid = this.fundid;
            params.detailtype = this.detailtype;
            params.accptmd = this.accptmd;
            params.status = this.status;
            params.stoptype = this.stoptype;
            params.startdate = moment(this.$refs.startDates.value).format('YYYYMMDD');
            params.starttime = moment(this.$refs.startDates.value).format("HHmmss");
            params.enddate = moment(this.$refs.endDates.value).format('YYYYMMDD');
            params.endtime = moment(this.$refs.endDates.value).format("HHmmss");

            params.operate = this.operate;
            console.log(params)
            $.post({
                url: '/businessMgmt/pauseTradeMgmt/pauseTradeHandle/deleteLocal.ajax',
                data: params,
                traditional: true,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0, params.type);
                    }
                    _this.showDialog('del2', 'info', false, result.msg);
                }
            });
        },

        // 重新提交
        showSubmitAgain: function (item) {
            var _this = this;
            var params = {};
            // var hasCheck = false;
            this.operate = item.operate;
            // 判断业务接口数据与数据库有没有相同数据
            if (this.type == 0) {
                if (this.arrId.indexOf(item.id.toString()) != -1 && item.status == '0') {
                    _this.oneId = item.id;
                    // this.showDialog('', 'info', true, '数据库已有此条数据,请在本地数据里做修改操作');
                    // return;
                } else {
                    _this.oneId = ''
                }
            }
            this.mysqlId = item.mySQLId; //获取数据库表字段ID
            this.id = item.id;

            // this.mysqlProduct = item.product; //为mysql执行修改传值

            // 请求数据用作一下添加数据验证时间
            $.post({
                url: '/businessMgmt/pauseTradeMgmt/pauseTradeHandle/getTableData.ajax',
                data: {
                    type: 0,
                    fundId: item.fundid
                },
                success: function (result) {
                    if (result.error === 0) {
                        _this.checkDate = result.data.tableData;
                    }
                    else {
                        _this.checkData = [];
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });

            this.serialno = item.serialno;
            this.fundid = item.fundid;
            this.detailtype = item.detailtype;
            this.accptmd = item.accptmd;
            this.status = item.status;
            this.stoptype = item.stoptype;
            this.startdate = $("#startDates").val(item.startdate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') + ' ' + item.starttime.replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3'));
            this.starttime = item.starttime;
            this.enddate = $("#endDates").val(item.enddate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') + ' ' + item.endtime.replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3'));
            this.endtime = item.endtime;
            this.operate = item.operate;
            this.delete_flag = item.delete_flag;
            if (this.operate == 3) {
                this.showDialog('', 'delAgain');

            } else if ((this.operate != 3)) {
                this.showDialog('', 'revise');
            }
        },
        deleteAgain: function () {
            var _this = this;
            var params = {};
            params.type = this.type;//状态参数
            params.myqsql = this.mysqlId; //数据表字段id
            params.oneId = this.oneId; //根据id插入或者修改数据
            params.operator = this.operator;

            params.id = this.id//后端产品id
            params.serialno = this.serialno;
            params.product = this.mysqlProduct;
            params.groupid = this.groupid;
            params.actionType = this.actionType;
            params.startdate = moment(this.$refs.startDates.value).format('YYYYMMDD');
            params.starttime = moment(this.$refs.startDates.value).format("HHmmss");
            params.enddate = moment(this.$refs.endDates.value).format('YYYYMMDD');
            params.endtime = moment(this.$refs.endDates.value).format("HHmmss");
            params.operate = this.operate;
            $.post({
                url: '/businessMgmt/pauseTradeMgmt/pauseTradeHandle/deleteAgain.ajax',
                data: params,
                traditional: true,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0, params.type);
                    }
                    _this.showDialog('delAgain', 'info', false, result.msg);
                }
            });
        },
        // 时间选择
        setStartTime: function (value) {
            var str = "";
            if (value === 'now') {
                str = this.getNowTime().replace(/(\d{4})-(\d{2})-(\d{2})-(\d{2})-(\d{2})-(\d{2})/g, '$1-$2-$3 $4:$5:$6');
                $('#startDate').val(str);
            }
            else if (value === 'future') {
                // str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '2099-12-31 $4:$5:$6' + '');
                $('#startDate').val("2099-12-31 23:59:59");
            }
        },
        setEndTime: function (value) {
            var str = "";
            if (value === 'now') {
                str = this.getNowTime().replace(/(\d{4})-(\d{2})-(\d{2})-(\d{2})-(\d{2})-(\d{2})/g, '$1-$2-$3 $4:$5:$6');
                $('#endDate').val(str);
            }
            else if (value === 'future') {
                $('#endDate').val("2099-12-31 23:59:59");
            }
        },
        getNowTime: function () {
            var d = new Date();
            var fixZero = function (num) {
                return num < 10 ? '0' + num : num;
            };
            return [d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds()].map(function (value) {
                return fixZero(value)
            }).join('-');
        },
        // 类型多选
        dataSummary: function (asynData, value, label, dom) {
            if (asynData && asynData.length > 0) {
                // vueData = asynData.map(function (item) {
                //     return {
                //         value: item[value],
                //         label: item[label]
                //     }
                // });
                var data = [];
                for (var i = 0; i < asynData.length; i++) {
                    data.push({
                        value: asynData[i].value,
                        label: asynData[i].value + "-" + asynData[i].name
                    });
                }
                $("#" + dom).multiselect('dataprovider', data);
            }
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

        // 单选
        // check: function (index) {
        //     index.check = !index.check;
        // },
        // // 用户全选
        // selectAll: function (allCheck) {
        //     var _this = this;
        //     //如果父级被选中，那么子集循环，全被给checked=true
        //     if (!allCheck) {
        //         _this.tableData.forEach(function (item) {
        //             item.check = true;
        //         });
        //     } else {
        //         //相反，如果没有被选中，子集应该全部checked=false
        //         _this.tableData.forEach(function (item) {
        //             item.check = false;
        //         });
        //     }
        // },

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

        prev1: function () {
            this.currentIndex <= 0 ? 0 : this.currentIndex--;
        },
        next1: function () {
            this.currentIndex >= this.middleData.length - 1 ? this.middleData.length - 1 : this.currentIndex++;
        },
        changeIndex1: function (index) {
            this.currentIndex = index - 1;
        },
        toFirst1: function () {
            this.currentIndex = 0;
        },
        toLast1: function () {
            this.currentIndex = this.middleData.length - 1;
        },
    },
    // 类型状态
    filters: {
        // actionType: function (item) {
        //     if (item) {
        //         return item.replace(/01/g, '申购').replace(/02/g, '赎回').replace(/03/g, '定投').replace(/04/g, '调仓').replace(/05/g, '解散')
        //         .replace(/06/g, '标准转出').replace(/07/g, '自定义转出').replace(/08/g, '标准转入').replace(/09/g, '自定义转入');
        //     }
        // },
        startTime: function (item) {
            if (item) {
                return item.replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3')
            }
        },
        endTime: function (item) {
            if (item) {
                return item.replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3')
            }
        },
        accptmd: function (value) {
            if (value == 0) {
                return '柜台'
            } else if (value == 2) {
                return '网上'
            } else if (value == 7) {
                return '企业版'
            } else if (value == 6) {
                return '第三方'
            } else if (value == "P") {
                return '机构服务平台'
            } else {
                return value;
            }
        },
        detailtype: function (value) {
            if (value == 11) {
                return '暂停定投'
            } else if (value == "00") {
                return '暂停交易'
            } else if (value == "01") {
                return '暂停申购'
            } else if (value == "02") {
                return '暂停赎回'
            } else {
                return value;
            }
        }
    }
});