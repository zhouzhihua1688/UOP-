new Vue({
    el: '#content',
    data:{
        diaMsg:"",
        tableData:[],
        dialogTabData:[],
        faretype:'',
        ymonth:'',
        fbackresult:'',
        //   弹窗表格分页
        currentIndex: 0,
        pageMaxNum: '10',
        condition: '',
        //主页面表格分页
        homePageMaxNum:'200',
        homeCurrentIndex:'0',
        homeCondition:''
    },
    computed:{
        middleData: function () {
            var middleData = [];
            var filterData = [];
            var pageMaxNum = parseInt(this.pageMaxNum);
            var _this = this;
            this.dialogTabData.forEach(function (jsonObj) {
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
        homeMiddleData: function () {
            var homeMiddleData = [];
            var homeFilterData = [];
            var homePageMaxNum = parseInt(this.homePageMaxNum);
            var _this = this;
            this.tableData.forEach(function (jsonObj) {
                var valueArr = [];
                for (var prop in jsonObj) {
                    valueArr.push(jsonObj[prop]);
                }
                for (var i = 0, len = valueArr.length; i < len; i++) {
                    if (valueArr[i]) {
                        if (valueArr[i].toString().indexOf(_this.homeCondition) != -1) {
                            homeFilterData.push(jsonObj);
                            break;
                        }
                    }
                }
            });
            if (homeFilterData.length <= homePageMaxNum) {
                homeMiddleData.push(homeFilterData);
                return homeMiddleData;
            } else {
                var i = 0;
                while ((i + 1) * homePageMaxNum < homeFilterData.length) {
                    homeMiddleData.push(homeFilterData.slice(i * homePageMaxNum, (i + 1) * homePageMaxNum));
                    i++;
                }
                homeMiddleData.push(homeFilterData.slice(i * homePageMaxNum, homeFilterData.length));
                return homeMiddleData;
            }
        },
        homeViewData: function () {
            var homeCurrentIndex = parseInt(this.homeCurrentIndex);
            return this.homeMiddleData[homeCurrentIndex];
        }
    },
    watch:{
        pageMaxNum: {
            handler: function (val, oldval) {
                this.currentIndex = 0;
            }
        },
        homePageMaxNum:{
            handler: function (val, oldval) {
                this.homeCurrentIndex = 0;
            }
        },
        condition: {
            handler: function (val, oldval) {
                this.currentIndex = 0;
            }
        }
    },
    mounted:function(){
        var _this=this;
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
        _this.getUrlParam("faretype");

        _this.faretype=_this.getUrlParam("faretype");
        _this.ymonth=_this.getUrlParam("ymonth");
        var params={faretype:_this.faretype,ymonth:_this.ymonth};
        _this.getTableList(params);

    },
    methods:{
        //状态查询
        queryStatus:function () {
            var _this = this;
            var params={fbackresult:_this.fbackresult,faretype:_this.faretype,ymonth:_this.ymonth};
            var params1={faretype:_this.faretype,ymonth:_this.ymonth}
            console.log(params)
            if(_this.fbackresult){
                $.post({
                    url: '/thirdPartyOperation/expenseMgmt/feedbackSum/queryStatus.ajax',
                    data: params ,
                    success: function (result) {
                        if (result.error == 0) {
                            var data = result.data;
                            console.log(data)
                            _this.tableData=data;
                        }
                        else {
                            _this.showDialog('', 'info', false, result.msg);
                        }
                    }
                });
            }else{
                $.post({
                    url: '/thirdPartyOperation/expenseMgmt/feedbackSum/queryStatus.ajax',
                    data: params1 ,
                    success: function (result) {
                        if (result.error == 0) {
                            var data = result.data;
                            console.log(data)
                            _this.tableData=data;
                        }
                        else {
                            _this.showDialog('', 'info', false, result.msg);
                        }
                    }
                });
            }  
            
        },
        //主页面数据表格
        getTableList: function (params) {
            var _this = this;
            $.post({
                url: '/thirdPartyOperation/expenseMgmt/feedbackSum/getList.ajax',
                data: params ? params : {},
                success: function (result) {
                    if (result.error == 0) {
                        var data = result.data;
                        console.log(data)
                        _this.tableData=data;
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        //弹窗数据表格+分页
        getDialogList:function (params) {
            var _this = this;
            $.post({
                url: '/thirdPartyOperation/expenseMgmt/feedbackSum/feedBackDayDialog.ajax',
                data: params ? params : {},
                success: function (result) {
                    if (result.error == 0) {
                        var data = result.data;
                        console.log(data);
                        if(data&&Array.isArray(data)){
                            _this.dialogTabData=data;
                        }else{
                            _this.dialogTabData=[];
                        }
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        daysDialog:function (item) {
            var _this=this;
            var params={
                month:item.ymonth,
                faretype:item.faretype,
                fundid:item.fundid,
                branchcode:item.branchcode
            };
            _this.getDialogList(params);
            _this.showDialog("","daysDetail",false)
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
        //主页面分页
        homePrev: function () {
            this.homeCurrentIndex <= 0 ? 0 : this.homeCurrentIndex--;
        },
        homeNext: function () {
            this.homeCurrentIndex >= this.homeMiddleData.length - 1 ? this.homeMiddleData.length - 1 : this.homeCurrentIndex++;
        },
        homeChangeIndex: function (index) {
            this.homeCurrentIndex = index - 1;
        },
        //提醒按钮邮件发送
        sendMailRemind:function (item) {
            var _this=this;
            var params={
                ymonth:item.ymonth,
                fundid:item.fundid,
                branchcode:item.branchcode,
                faretype:item.faretype
            }
            console.log(params);
            $.post({
                url: '/thirdPartyOperation/expenseMgmt/feedbackSum/sendMailRemind.ajax',
                data: params ? params : {},
                success: function (result) {
                    if (result.error == 0) {
                        var data = result.data;
                        console.log(data)
                        _this.dialogTabData=data;
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        //确定按钮邮件发送
        sendMailConfirm:function (item) {
            var _this=this;
            var params={
                ymonth:item.ymonth,
                branchcode:item.branchcode,
                fundid:item.fundid,
                fareType:item.faretype,
                seqno:item.seqno,
                replyresult:'-',
                replyremark:item.replyremark,
                replier:item.replier
            };
            console.log(params);
            $.post({
                url: '/thirdPartyOperation/expenseMgmt/feedbackSum/sendMailConfirm.ajax',
                data: params ? params : {},
                success: function (result) {
                    if (result.error == 0) {
                        var data = result.data;
                        console.log(data)
                        _this.dialogTabData=data;
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
            location.reload();
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
        getUrlParam:function (name) {
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg);  //匹配目标参数
            if (r!=null) return unescape(r[2]); return ''; //返回参数值
        }
    }
});