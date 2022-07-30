new Vue({
    el: '#content',
    data:{
        diaMsg:"",
        tableData:[],
        dialogTabData:[],
        ymonth:"",
        bankCode:[],
        bankNm:[],
        thData:[],
        searchCode:'',
        feedbackgo:'',
        condition: '',
        status:'',
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
    mounted:function(){
        var _this=this;
        var dialogs = ['', '', 'daysDetail', 'info'];
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

        _this.ymonth=_this.getUrlParam("ymonth");
        _this.feedbackgo=_this.getUrlParam("feedbackgo");
        _this.status=_this.getUrlParam("status");
        // console.log(_this.ymonth);
        var params={ymonth:_this.ymonth};
        _this.getTableList(params);
    },
    methods:{
        getTableList: function (params) {
            var _this = this;
            $.post({
                url: '/thirdPartyOperation/expenseMgmt/trailingSum~feedbackSum/list.ajax',
                data: params ? params : {},
                success: function (result) {
                    if (result.error == 0) {

                        console.log( result.data);
                        _this.tableData=result.data.tableData;
                        _this.thData=result.data.thData;
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        //对比无误
        checkData:function () {
            var _this = this;
            var ymonth=_this.getUrlParam("ymonth");
            console.log(ymonth);
            $.post({
                url: '/thirdPartyOperation/expenseMgmt/trailingSum~feedbackSum/checkData.ajax?ymonth='+ymonth,
                success: function (result) {
                    if (result.error == 0) {
                        _this.showDialog('', 'info', false, result.msg);
                        _this.xiaohui = false;
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        //查询
        search:function () {
          var _this=this;
            var ymonth=_this.getUrlParam("ymonth");
            var otherpara={ymonth:ymonth};
            var params={branchcode:_this.searchCode,ymonth:ymonth};
            if(!_this.searchCode){
                _this.getTableList(otherpara);
                return;
            }
            $.post({
                url: '/thirdPartyOperation/expenseMgmt/trailingSum~feedbackSum/search.ajax',
                data: params ? params : {},
                success: function (result) {
                    if (result.error == 0) {
                        console.log( result.data);
                        _this.tableData=result.data.tableData;
                        _this.thData=result.data.thData;
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        //下载
        download:function () {
            var _this = this;
            var ymonth=_this.getUrlParam("ymonth");
            var params={branchcode:_this.searchCode,ymonth:ymonth};
            console.log(params);
            window.location.href = '/thirdPartyOperation/expenseMgmt/trailingSum~feedbackSum/downloads.ajax?ymonth=' + params.ymonth+'&&branchcode='+params.branchcode;
        },
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