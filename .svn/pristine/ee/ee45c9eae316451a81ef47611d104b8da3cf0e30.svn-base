var vm = new Vue({
    el: '#content',
    data: {
        // table data
        diaMsg: "",
        fundnm: "",
        branchnm: "",
        //表格外数据
        feedbackgo:'',
        // 表格分页数据
        tableData: [],
        tableSelect:[],
        currentIndex: 0,
        pageMaxNum: '200',
        condition: '',
        // 弹窗数据
        dialogData: [],
        // 显示隐藏
        faretype: 2,
        // 按钮显示隐藏
        btnshow: true,
        // 内容不可编辑
        disabled: true,
        // 弹框
        edition: "",
        // 明细|调整
        servicefarechg: "",
        versioninfo: [],
        // 产品ID
        fundid: "",
        ymonth: "",
        status: "",
        branchcode: "",
        info: "",
        remark: "",
        operater: "",
        changeStatus: false,
        //查询状态参数
        queryIsFundnm:'',
        queryIsbrannm:'',
        //tips框
        tips:false,
        tipstwo:false,
        initX:0,
        initY:0,
        tailfareremark:'',
        servicefareremark:'',
        fbStatus:'',
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
    },
    mounted: function () {
        var _this = this;
        var dialogs = ['', '', 'showdialog', 'info'];
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
        _this.checktime=_this.getUrlParam('checktime')
        // _this.dialog()
        // _this.search()

        // 复核,查看-默认查询上个月所在年的所有记录
        if (this.getUrlParam('ymonth')) {
            var _this = this;
            var params = {};
            
            params.ymonth = this.getUrlParam('ymonth');
            $.post({
                url: '/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/reviewSearch.ajax',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        console.log(result);
                        _this.fbStatus = result.data.fbStatus;
                        for(var i=0;i<result.data.saleMonthsList.length;i++){
                            result.data.saleMonthsList[i].tailfarerate=Number(result.data.saleMonthsList[i].tailfarerate*100).toFixed(2);
                            result.data.saleMonthsList[i].servicefarerate=Number(result.data.saleMonthsList[i].servicefarerate*100).toFixed(2);
                        }
                        _this.tableData = result.data.saleMonthsList;
                        _this.operater=result.data.saleSummar.operater;
                        _this.remark=result.data.saleSummar.remark;
                        _this.tableData.push(result.data.saleSummar);
                        _this.tableSelect.forEach(function (item) {
                            var index = _this.inSelected(item, _this.tableData, 'branchcode');
                            if (index > -1) {
                                _this.tableData[index].check = true;
                            }
                        });
                        if (result.data.saleSummar.status == 'N' || result.data.saleSummar.status == 'D') {
                            _this.changeStatus = true;
                        }else{
                            _this.changeStatus = false;
                        }

                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                },
                error: function () {
                    _this.showDialog('', 'info', false, '数据获取失败');
                }
            });
        }
        $(function () {
            $( document ).tooltip({
                show: {
                    effect: "slideDown",
                    delay: 250
                },
                position:{
                    my: "center bottom-20",
                    at: "center top",
                    using: function( position, feedback ) {
                        $( this ).css( position );
                        $( "<div>" )
                            .addClass( "arrow" )
                            .addClass( feedback.vertical )
                            .addClass( feedback.horizontal )
                            .appendTo( this );
                    }
                }
            });
        })
    },

    methods: {
        //刷新列表
        relist:function () {
            if (this.getUrlParam('ymonth')) {
                var _this = this;
                var params = {};
                params.ymonth = this.getUrlParam('ymonth');
                $.post({
                    url: '/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/reviewSearch.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error == 0) {
                            console.log(result);
                            for(var i=0;i<result.data.saleMonthsList.length;i++){
                                result.data.saleMonthsList[i].tailfarerate=Number(result.data.saleMonthsList[i].tailfarerate*100).toFixed(2);
                                result.data.saleMonthsList[i].servicefarerate=Number(result.data.saleMonthsList[i].servicefarerate*100).toFixed(2);
                            }
                            _this.tableData = result.data.saleMonthsList;
                            _this.operater=result.data.saleSummar.operater;
                            _this.remark=result.data.saleSummar.remark;
                            _this.tableData.push(result.data.saleSummar);
                            _this.tableSelect.forEach(function (item) {
                                var index = _this.inSelected(item, _this.tableData, 'branchcode');
                                if (index > -1) {
                                    _this.tableData[index].check = true;
                                }
                            });
                            if (result.data.saleSummar.status == 'N' || result.data.saleSummar.status == 'D') {
                                _this.changeStatus = true;
                            }else{
                                _this.changeStatus = false;
                            }

                        } else {
                            _this.showDialog('', 'info', false, result.msg);
                        }
                    },
                    error: function () {
                        _this.showDialog('', 'info', false, '数据获取失败');
                    }
                });
            }
        },
        //参数表业务方法
        search: function () {
            var _this = this;
            if (this.getUrlParam('ymonth')) {
                var params = {};
                params.ymonth = this.getUrlParam('ymonth');
                this.fundnm = $("#fundnm").val();
                this.branchnm = $("#branchnm").val();

                params.fundnm = this.fundnm;
                params.branchnm = this.branchnm;
                console.log(params.fundnm);
                console.log(params.branchnm);
                $.post({
                    url: '/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/search.ajax',
                    data: params,
                    success: function (result) {
                        console.log(result)
                        if (result.error == 0) {
                            for(var i=0;i<result.data.monthsList.length;i++){
                                result.data.monthsList[i].tailfarerate=Number(result.data.monthsList[i].tailfarerate*100).toFixed(2);
                                result.data.monthsList[i].servicefarerate=Number(result.data.monthsList[i].servicefarerate*100).toFixed(2)
                            }
                            
                            _this.tableData = result.data.monthsList;
                            _this.queryIsFundnm=$("#fundnm").val();
                            _this.queryIsbrannm=$("#branchnm").val();
                            _this.operater=result.data.saleSummar.operater;
                            _this.remark=result.data.saleSummar.remark;
                            _this.tableData.push(result.data.saleSummar);
                        } else {
                            _this.showDialog('', 'info', false, '数据获取失败');
                        }
                    },
                    error: function () {
                        _this.showDialog('', 'info', false, '数据获取失败');
                    }
                });
            }
        },

        //勾选
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
        // 保存
        keepSave: function () {
            var _this = this;
            var params = {};
            params.info = this.remark;
            params.ymonth = this.getUrlParam('ymonth');

            $.post({
                url: '/thirdPartyOperation/expenseMgmt/procedureSum/keepSave.ajax',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        _this.showDialog('', 'info', false, '保存成功');
                    } else {
                        _this.showDialog('', 'info', false, '数据获取失败');
                    }
                },
                error: function () {
                    _this.showDialog('', 'info', false, '数据获取失败');
                }
            });
        },
        // 复核通过
        reviewPass: function () {
            if (this.getUrlParam('ymonth')) {
                var _this = this;
               
                var month = this.getUrlParam('ymonth');
                var operater = this.operater;
                var fareType = '1';
                var url='';
                var branchnm=this.branchnm;
                var fundnm=this.fundnm;
                var remark =_this.remark;
                $.post({
                    url: '/thirdPartyOperation/expenseMgmt/procedureSum/reviewPass.ajax?month='+month+'&fareType='+fareType+'&fundnm='+fundnm+'&branchnm='+branchnm+'&remark='+remark,
                    success: function (result) {
                        if (result.error == 0) {
                            console.log(result.data);
                            _this.showDialog('', 'info', false, result.data);
                            _this.relist();
                        } else {
                            _this.showDialog('', 'info', false, '数据获取失败');
                        }
                    },
                    error: function () {
                        _this.showDialog('', 'info', false, '数据获取失败');
                    }
                });
            }

        },
        // 导出汇总全量

        exportAll: function (type) {
            var _this = this;
            var params = {
                    type: type
                },
                url;
            params.ymonth = this.getUrlParam('ymonth');
            if (type === '1') {
                url = '/thirdPartyOperation/expenseMgmt/procedureSum/exportAll.ajax?ymonth=' + params.ymonth + '&type=' + type;
            } else if (type === '2') {
                url = '/thirdPartyOperation/expenseMgmt/procedureSum/exportAll.ajax?ymonth=' + params.ymonth + '&type=' + type;
            }
            window.location.href = url;
        },
        //从Feedback导出汇总
        feedbackExport:function () {
            var _this=this;
            var params={};
            params.ymonth=_this.getUrlParam('ymonth');
            params.monthList=[];
            console.log(_this.tableSelect.length);
            if(_this.tableSelect.length>0){
                for(var i=0;i<_this.tableSelect.length;i++){
                    var str=params.ymonth+'-'+_this.tableSelect[i].fundid+'-'+_this.tableSelect[i].branchcode;
                    params.monthList.push(str);
                }
            }else{
                _this.showDialog("","info",false,"先勾选后导出");
                return;
            }
            params.monthList=encodeURI(params.monthList)
            console.log(params.monthList);
            window.location.href = "/thirdPartyOperation/expenseMgmt/feedbackSum/feedbackExport.ajax?ymonth="+params.ymonth+"&monthListStr="+params.monthList;
        },
        // 对比无误
        balance: function () {
            if (this.getUrlParam('ymonth')) {
                var _this = this;
                var params = {};
                params.ymonth = this.getUrlParam('ymonth');
                params.faretype = 1;
                $.post({
                    url: '/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/balance.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error == 0) {
                            console.log(result.data)
                            if (params.ymonth && params.faretype) {
                                console.log(params.ymonth)
                                console.log(params.faretype)
                                _this.showDialog('', 'info', false, '对比通过');
                                _this.xiaohui = false;
                            } else {
                                _this.showDialog('', 'info', false, '对比失败');
                            }
                        } else {
                            _this.showDialog('', 'info', false, '数据获取失败');
                        }
                    },
                    error: function () {
                        _this.showDialog('', 'info', false, '数据获取失败');
                    }
                });
            }
        },

        // 弹窗数据
        version: function (item) {
            var _this = this;
            var params={};
            params.ymonth=item.ymonth;
            params.fundid=item.fundid;
            params.branchcode=item.branchcode;
            params.operater=this.getUrlParam('operater');
            console.log(params);

            // 弹窗数据
            $.post({
                url: '/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/versionSearch.ajax',
                data:params ? params:{},
                success: function (result) {

                    if (result.error == 0) {
                        _this.dialogData = result.data;
                        console.log(Array.isArray(_this.dialogData));
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                    _this.showDialog('', 'showdialog', false);
                },
                error: function () {
                    _this.showDialog('', 'info', "获取数据失败");
                }
            });


        },
        // 调整,明细
        sendGoTo: function (el, item) {
            var _this = this;
            var feedbackgo=_this.getUrlParam("feedbackgo");
            var hrefUrl = '/thirdPartyOperation/expenseMgmt/procedureSum.html?pageType=details';
            hrefUrl += '&ymonth=' + item.ymonth;
            hrefUrl += '&fundid=' + item.fundid;
            hrefUrl += '&branchcode=' + item.branchcode;
            hrefUrl += '&feedbackgo=' + feedbackgo;
            //hrefUrl += '&operater=' + operater;
            // hrefUrl += '&tailfarerate=' + item.tailfarerate; //尾佣分成
            // hrefUrl += '&servicefarerate=' + item.servicefarerate; //消服分成
            // hrefUrl += '&tailfarechg=' + item.tailfarechg; //尾佣调增
            // hrefUrl += '&servicefarechg=' + item.servicefarechg; //消服调增
            // 实付传参
            // hrefUrl += '&tailfarereal=' + item.tailfarereal;
            // hrefUrl += '&servicefarereal=' + item.servicefarereal;
            window.location.href = hrefUrl;

        },
        dialogSend: function (item) {
            var operater=this.getUrlParam("operater");
            var hrefUrl = '/thirdPartyOperation/expenseMgmt/procedureSum.html?pageType=details';
            hrefUrl += '&ymonth=' + item.ymonth;
            hrefUrl += '&fundid=' + item.fundid;
            hrefUrl += '&branchcode=' + item.branchcode;
            hrefUrl += '&operater=' + operater;
            hrefUrl += '&edition=' + item.edition;
            hrefUrl +='&onlywrite=1';
            window.location.href = hrefUrl;
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
        // 地址传入
        getUrlParam: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg); //匹配目标参数
            if (r != null) return unescape(r[2]);
            return ''; //返回参数值
        },
        // 弹窗公共方法
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
        inSelected: function (item, arr, prop,prop2) {
            var _index = -1;
            arr.forEach(function (value, index) {
                if (item[prop] == value[prop]&&item[prop2] == value[prop2]) {
                    _index = index;
                }
            });
            return _index;
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
            return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
        }
    }
});