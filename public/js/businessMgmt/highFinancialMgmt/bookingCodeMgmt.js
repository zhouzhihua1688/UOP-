new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        tableData: [],
        diaMsg: '',
        accptMd: '',            //受理方式
        auditStatus: '',        //预约码状态
        custNm: "",             //申请用户名
        deadlineDate: '',       //失效日期
        fundId: '',             //产品代码
        fundName: '',           //产品名称
        nextOpenDate: '',       //开放日期
        realAmt: '',            //实配额度
        reserveAmt: '',         //申请额度
        reserveDate: '',        //申请日期
        reserveNo: '',          //流水号
        status: '',             //使用情况
        subAmt: '',             //实际使用额度
        tradeAcco: '',          //交易账号
        transDate: '',          //发送日期
        transType: '',         //发送状态
        type: '',               //类型
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10,
        // 查询数据
        nameList:[],
        fundIdList:'',
        transTypeList:'',
        accptMdList:'',
        reserveNoList:'',
        custNmList:'',
        auditStatusList:'',
        statusList:'',
        // 单笔管理新增
        accptMds: "",
        custNms: "",
        deadlineDates: "",
        fundIds: "",
        mobileNos: "",
        nextOpenDates: "",
        realAmts: "",
        // 批量发送
        batchData: [],
        // 设置失效时间
        failList:[],
        // 全选
        allCheck: false,
        checkAll: false,
        // 查询时间转换
        moment: moment,
        //根据产品获取自动时间
        lookTimeList:"",
    },
    mounted: function () {
        var dialogs = ['info', 'add', 'allAdd','revise','failureTime'];
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
        $('.date-timepicker').datetimepicker({
            // format: 'YYYY-MM-DD HH:mm:ss',//use this option to display seconds
            format: 'YYYYMMDD',
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
        //下拉列表自带搜索功能
        var fundArr = ['fundNameList','fundNameSingle','fundNameBatch'];
        fundArr.forEach(function (value) {
            $('#' + value).chosen({
                search_contains: true,
                no_results_text: '未找到相关产品信息',
                disable_search_threshold: 6,
                width: '220px'
            });
        });
        var _this = this;
        $('#fundNameList').on('change', function (e, params) {
            _this.fundIdList = params ? params.selected : '';
        });
        $('#fundNameSingle').on('change', function (e, params) {
            _this.fundIds = params ? params.selected : '';
        });
        $('#fundNameBatch').on('change', function (e, params) {
            _this.fundId = params ? params.selected : '';
        });

        $('#fundNameSingle').on('change', function (e, params) {
             _this.fundIds = params ? params.selected : '';
            var params = {}
            params.fundId=_this.fundIds
            params.acceptMode=_this.accptMds
            console.log(params)
            $.post({
                    url: '/businessMgmt/highFinancialMgmt/bookingCodeMgmt/lookOpenTime.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                           // _this.$refs.nextOpenDates.value = result.data.body.balanceDetailTemplate;
                           $('#openTime').val(result.data.body);//开放日期时间
                        }
                    }
                });
        });
        $('#fundNameBatch').on('change', function (e, params) {
             _this.fundIds = params ? params.selected : '';
            var params = {}
            params.fundId=_this.fundIds
            params.acceptMode=_this.accptMds
            console.log(params)
            $.post({
                    url: '/businessMgmt/highFinancialMgmt/bookingCodeMgmt/lookOpenTime.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                           $('#openTimes').val(result.data.body);//开放日期时间
                        }
                    }
                });
        });

        this.getTableData(0);
        this.fundList(0);
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

    },
    watch: {
        pageMaxNum: function () {
            this.getTableData(0);
        }
    },
    methods: {
        getTableData: function (currentIndex) {
            var params = {};
            var _this = this;
            params.accptMd = this.accptMdList;
            params.auditStatus = this.auditStatusList;
            params.custNm = this.custNmList;
            params.deadLineDate = this.$refs.deadTime.value //转换时间参数形式
            params.fundId = this.fundIdList;
            params.reserveNo = this.reserveNoList;
            params.status = this.statusList;
            params.transType = this.transTypeList;
            params.type = this.type;
            params.pageNum = currentIndex + 1;
            params.pageSize = this.pageMaxNum;
            console.log(params)
            $.post({
                url: '/businessMgmt/highFinancialMgmt/bookingCodeMgmt/getTableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        // 后端分页 展示
                        _this.tableData = result.data.tableData;
                        _this.currentIndex = result.data.pageNo - 1;
                        _this.totalPage = result.data.totalSize;
                    } else {
                        _this.tableData = [];
                        _this.currentIndex = 0;
                        _this.totalPage = 0;
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        // 下拉列表-产品名称
        fundList:function(currentIndex){
            var _this = this;
            var params = {};
            params.pageNum =currentIndex + 1;
            params.pageSize =this.pageMaxNum+9980;
            $.post({
                url: '/businessMgmt/highFinancialMgmt/bookingCodeMgmt/fundList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.nameList = result.data.listData;
                        _this.currentIndex = result.data.pageNum - 1;
                        _this.totalPage = result.data.totalSize;

                        // 下拉列表
                        // var str = '<option value="">全部</option>';
                        var str = '';
                        _this.nameList.forEach(function (item) {
                            str += '<option value="' + item.fundId + '">'+item.fundId+"-"+item.fundName + '</option>';
                        });
                        var fundArr = ['fundNameList','fundNameSingle','fundNameBatch'];
                        fundArr.forEach(function (value) {
                            // $('#' + value).html(value === '' ? ('<option value="">全部基金</option>' + str) : str);
                            $('#' + value).html('<option value="">全部</option>' + str);
                            // $('#' + value).html(str);
                            $('#' + value).trigger('chosen:updated');
                        });
                    }
                    else {
                        _this.nameList = [];
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        // 失效时间
        failureTime: function () {
            var _this = this;
            $("#invalidTime").val("")
            var hasCheck = false;
            // var failList=[]

            for (var i = 0; i < this.tableData.length; i++) {
                if (this.tableData[i].check) {
                    hasCheck = true;
                     _this.failList=[] //先置为空数组,清空
                }
            }
            if (!hasCheck) {
                this.showDialog('', 'info', true, '未选择任何数据');
                return;
            }

            for (var i = 0; i < this.tableData.length; i++) {
                if (this.tableData[i].check) {
                        _this.failList.push({
                            fundId:this.tableData[i].fundId,
                            fundName:this.tableData[i].fundName,
                            nextOpenDate:this.tableData[i].nextOpenDate,
                            custNm:this.tableData[i].custNm,
                            mobileNo:this.tableData[i].mobileNo,
                            realAmt:this.tableData[i].realAmt,
                            reserveNo:this.tableData[i].reserveNo,
                            deadlineDate:this.tableData[i].deadlineDate,
                            auditStatus:this.tableData[i].auditStatus ,
                       });
                }
            }
            console.log("失效时间",_this.failList)

            this.showDialog('', 'failureTime');
        },
        // 确认发送按钮
        sendOut:function () {
            var _this = this;
            var arrList=[]
            // params.deadlineDate = moment(this.$refs.setTime.value).format("YYYY-MM-DD");
            // console.log("---", params)

             if(!$("#invalidTime").val()){
                return _this.showDialog('failureTime', 'info', true,"失效日期不能为空");
             }
            for(var i=0; i<this.failList.length; i++) {
                // if (this.failList[i].check) {
                    arrList.push({
                        // auditStatus:'Y',
                        reserveNo:this.failList[i].reserveNo,
                        deadlineDate:moment(this.$refs.setTime.value).format("YYYY-MM-DD"),
                    })
                // }
            }
            console.log("----",arrList)
            $.post({
                url: '/businessMgmt/highFinancialMgmt/bookingCodeMgmt/sendOut.ajax',
                data:{
                    arrList: JSON.stringify(arrList)
                },
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0);
                        _this.showDialog('failureTime', 'info', false, result.msg);
                    }
                    else {
                        _this.showDialog('failureTime', 'info', false, result.msg);
                    }
                }
            });

        },
        // 立即失效
        invalid:function () {
            var _this = this;
            var invalidList=[];
            for (var i=0; i<this.failList.length; i++) {
                invalidList.push({
                    reserveNo:this.failList[i].reserveNo,
                    fundId:this.failList[i].fundId,
                    auditStatus:$("#invalidTime").val()>moment(new Date()).format("YYYYMMDD") ? "Y":"F",
                    deadlineDate:moment(new Date()).format("YYYYMMDD"),
                })
            }
            console.log("立即失效",invalidList)
            $.post({
                url: '/businessMgmt/highFinancialMgmt/bookingCodeMgmt/invalid.ajax',
                data:{
                    invalidList: JSON.stringify(invalidList)
                },
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0);
                        _this.showDialog('failureTime', 'info', false, result.msg);
                    }
                    else {
                        _this.showDialog('failureTime', 'info', false, result.msg);
                    }
                }
            });

        },
        // 拒绝申请
        refuse:function () {
            var _this = this;
            var refuseList=[];
            for (var i=0; i<this.failList.length; i++) {
                refuseList.push({
                    reserveNo:this.failList[i].reserveNo,
                    fundId:this.failList[i].fundId,
                    auditStatus:"C",
                })
            }
            console.log("拒绝",refuseList)
            $.post({
                url: '/businessMgmt/highFinancialMgmt/bookingCodeMgmt/refuse.ajax',
                data:{
                    refuseList: JSON.stringify(refuseList)
                },
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0);
                        _this.showDialog('failureTime', 'info', false, result.msg);
                    }
                    else {
                        _this.showDialog('failureTime', 'info', false, result.msg);
                    }
                }
            });

        },
        // 单笔管理
        // 新增必填弹框
        diaInfoCheck: function () {
            var _this = this;
            if (isNaN(Number(this.realAmts)) || this.realAmts=== '' || !/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/.test(this.realAmts)) {
                this.showDialog('add', 'info', true, '未填写实配额度或填写格式有误');
                return false;
            }
            if (isNaN(Number(this.mobileNos)) || this.mobileNos=== '' || !/^1\d{10}$/.test(this.mobileNos)) {
                    this.showDialog('add', 'info', true, '未填写手机号或填写格式有误');
                    return false;
                }
            return true;
        },
        singleMgmt: function () {
            var _this = this;
            this.fundIds = '';
            $('#fundNameSingle').val('');
            $('#fundNameSingle').trigger('chosen:updated');
            this.accptMds = "";
            this.custNms = "";
            this.deadlineDates=$('#deadlineDates').val("");
            this.mobileNos = "";
            this.nextOpenDates=$('#openTime').val("");
            this.realAmts = "";
            this.showDialog('', 'add');
        },
        saveSingle: function () {
            var _this = this;
            if (this.diaInfoCheck()) {
                var params = {}
                params.accptMd = this.accptMds;
                params.custNm = this.custNms;
                params.deadlineDate = moment(this.$refs.deadlineDates.value).format("YYYY-MM-DD")
                params.fundId = this.fundIds;
                params.mobileNo = this.mobileNos;
                // params.nextOpenDate = moment(this.$refs.nextOpenDates.value).format("YYYY-MM-DD")
                params.nextOpenDate = moment($('#openTime').val()).format("YYYY-MM-DD")
                params.realAmt = this.realAmts;
                console.log("---", params)
                $.post({
                    url: '/businessMgmt/highFinancialMgmt/bookingCodeMgmt/saveSingle.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.getTableData(0);
                            _this.showDialog('add', 'info', false, result.msg);
                        }
                        else {
                            _this.showDialog('', 'info', false, result.msg);
                        }
                    }
                });
            }
        },
        // 批量发送
        batchSending: function () {
            var _this = this;
            this.fundId="";
            $('#fundNameBatch').val('');
            $('#fundNameBatch').trigger('chosen:updated');
            this.accptMd="";
            this.nextOpenDate=$('#openTimes').val("");
            this.deadlineDate=$('#deadlineDate').val("");
            this.batchData=[];
            this.showDialog('', 'allAdd');
        },
        // 增加十行
        increase: function () {
            var _this = this;
            for (var i = 0; i <10; i++) {
                this.batchData.push({
                    index: i,
                    check: false,

                    accptMd: "",
                    custNm: "",
                    deadlineDate: "",
                    fundId: "",
                    mobileNo: "",
                    nextOpenDate: "",
                    realAmt: "",
                });
            }
        },
        saveBatch: function () {

            var _this = this;
            var hasCheck = false;
            var arr=[]
            for (var i = 0; i < this.batchData.length; i++) {
                if (this.batchData[i].check) {
                    hasCheck = true;
                }
            }
            if (!hasCheck) {
                this.showDialog('', 'info', false, '未选择任何数据');
                return;
            }
            // params.accptMd = this.accptMd;
            // params.deadlineDate = moment(this.$refs.deadlineDate.value).format("YYYY-MM-DD");
            // params.fundId = this.fundId;
            // params.nextOpenDate = moment(this.$refs.nextOpenDate.value).format("YYYY-MM-DD");

            for (var i=0; i<this.batchData.length; i++) {
                if (this.batchData[i].check) {
                    hasCheck = true;
                    arr.push({
                        mobileNo:this.batchData[i].mobileNo,
                        custNm:this.batchData[i].custNm,
                        realAmt:this.batchData[i].realAmt,
                        fundId:this.fundId,
                        accptMd:this.accptMd,
                        deadlineDate:moment(this.$refs.deadlineDate.value).format("YYYY-MM-DD"),
                        nextOpenDate:moment($('#openTimes').val()).format("YYYY-MM-DD")
                    })
                }
                }
            // for (var i = 0; i < arr.length; i++) {
            //     var _this = this;
            //     console.log("***",arr[i].realAmt)
            //     if (isNaN(Number(arr[i].realAmt)) || arr[i].realAmt=== '' || !/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/.test(arr[i].realAmt)) {
            //         this.showDialog('allAdd', 'info', true, '未填写实配额度或填写格式有误');
            //         return true;
            //     }
            //     if (isNaN(Number(arr[i].mobileNo)) || arr[i].mobileNo=== '' || !/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(arr[i].mobileNo)) {
            //         this.showDialog('allAdd', 'info', true, '填写手机号格式有误');
            //         return true;
            //     }
            // }
            console.log(arr)
                $.post({
                    url: '/businessMgmt/highFinancialMgmt/bookingCodeMgmt/saveBatch.ajax',
                    data:{
                        arr: JSON.stringify(arr)
                    },
                    success: function (result) {
                        if (result.error === 0) {
                            _this.getTableData(0);
                            _this.showDialog('allAdd', 'info', false, result.msg);
                        }
                            _this.showDialog('allAdd', 'info', true, result.msg);
                    }
                });
        },
        // 删除行
        delList: function (index) {
            var index = this.batchData.findIndex(item => {
                console.log(item.index)
                if (item.index == index) {
                    return true
                }
            })
            // if (this.batchData.length > 1) {
                this.batchData.splice(index, 1)
            // }
        },
        // 实配额度修改
        showUpdate:function (item) {
            var _this = this;
            this.fundId = item.fundId
            this.fundName=item.fundName;
            this.custNm=item.custNm;
            this.reserveNo=item.reserveNo;
            this.deadlineDate=item.deadlineDate
            this.reserveAmt=parseInt(item.reserveAmt)/10000;
            this.realAmt=parseInt(item.realAmt)/10000;
            this.showDialog('', 'revise');
        },
        diaInfoCheck1: function () {
            var _this = this;
            if (isNaN(Number(this.realAmt)) || this.realAmt=== '' || !/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/.test(this.realAmt)) {
                this.showDialog('revise', 'info', true, '未填写实配额度或填写格式有误');
                return false;
            }
            return true;
        },
        update: function () {
            var _this = this;
            if (this.diaInfoCheck1()) {
                var params = {};
                params.fundId =this.fundId;
                params.reserveNo  =this.reserveNo;
                params.realAmt  =this.realAmt;
                params.deadlineDate  =this.deadlineDate;
                params.auditStatus='Y'
                console.log(params)
                $.post({
                    url: '/businessMgmt/highFinancialMgmt/bookingCodeMgmt/update.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.getTableData(0);
                            _this.showDialog('revise', 'info', false, result.msg);
                        }
                        _this.showDialog('revise', 'info', false, result.msg);
                    }
                });
            }
        },
        // 单选
        check: function (index) {
            index.check = !index.check;
        },
        single: function (index) {
            index.check = !index.check;
        },
        // 用户全选
        selectAll: function (allCheck) {
            var _this = this;
            //如果父级被选中，那么子集循环，全被给checked=true
            if (!allCheck) {
                _this.tableData.forEach(function (item) {
                    item.check = true;
                });
            } else {
                //相反，如果没有被选中，子集应该全部checked=false
                _this.tableData.forEach(function (item) {
                    item.check = false;
                });
            }

        },
        select: function (checkAll) {
            var _this = this;
            //如果父级被选中，那么子集循环，全被给checked=true
            if (!checkAll) {
                _this.batchData.forEach(function (item) {
                    item.check = true;
                });
            } else {
                //相反，如果没有被选中，子集应该全部checked=false
                _this.batchData.forEach(function (item) {
                    item.check = false;
                });
            }
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
        prev: function () {
            if (this.currentIndex <= 0) {
                return;
            }
            this.getTableData(this.currentIndex - 1);
        },
        next: function () {
            if (this.currentIndex >= this.totalPage - 1) {
                return;
            }
            this.getTableData(this.currentIndex + 1);
        },
        changeIndex: function (index) {
            this.getTableData(index - 1);
        },
        toFirst: function () {
            this.getTableData(0);
        },
        toLast: function () {
            this.getTableData(this.totalPage - 1);
        },
    },

    filters: {
        transType: function (item) {
            if (item === "N") {
                return "未发送"
            } else if (item === "T") {
                return "发送中"
            } else if (item === "Y") {
                return "发送成功"
            } else if (item === "F") {
                return "发送失败"
            } else {
                return "其他"
            }
        },
        accptMd:function (item) {
            if (item === "0") {
                return "柜台"
            } else if (item === "1") {
                return "电话"
            } else if (item === "2") {
                return "Internet"
            } else if (item === "3") {
                return "传真"
            } else if (item === "5"){
                return "IVR"
            }else if (item === "6"){
                return "远程"
            }else if (item === "7"){
                return "企业版"
            }else if (item === "M"){
                return "手机"
            }else if (item === "9"){
                return "其他"
            }
        },
        auditStatus:function (item) {
            if (item === "N") {
                return "未审核"
            } else if (item === "Y") {
                return "审核通过生效中"
            } else if (item === "F") {
                return "审核通过已失效"
            } else if (item === "C") {
                return "审核未通过"
            }
        },
        status:function (item) {
            if (item==="N") {
                return "待购买"
            } else if (item==="Y") {
                return "已购买"
            } else if (item==="F") {
                return "已过期"
            } else if (item==="C"){
                return "已撤单"
            }else if (item==="Q"){
                return "已取消"
            }else if (item==="T"){
                return "已调整"
            }
        },
        type:function(item){
            if(item==='L'){
                return "在线预约"
            }else if(item==='P')
                return "主动发送"
        }
    }
});

