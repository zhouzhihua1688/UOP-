new Vue({
    el: '#content',
    data:{
        id:"",
        ymonth:"",
        faretype:"",
        status:"",
        inform:"",
        nonuniformity:"",
        uniformity:"",
        unfeedback:"",
        feedbacktime:"",
        diaMsg:"",
        tableData:[],
    //   表格分页
        currentIndex: 0,
        pageMaxNum: '20',
        condition: '',
        fbStatus:""
    },
    computed:{
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
        }
    },
    watch:{
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
        _this.getTableList();
    },
    methods:{
        getTableList: function (params) {
            var _this = this;
            $.post({
                url: '/thirdPartyOperation/expenseMgmt/feedbackSum/list.ajax',
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
        prev: function () {
            this.currentIndex <= 0 ? 0 : this.currentIndex--;
        },
        next: function () {
            this.currentIndex >= this.middleData.length - 1 ? this.middleData.length - 1 : this.currentIndex++;
        },
        changeIndex: function (index) {
            this.currentIndex = index - 1;
        },
        //带参数跳转
        sendGoTo:function (item) {
          window.location.href="/thirdPartyOperation/expenseMgmt/feedbackSum.html?pageType=details&faretype="+item.faretype+"&ymonth="+item.ymonth;
        },
        sendToDiff:function (item) {
            console.log(item.ymonth);
            if(item.faretype&&item.faretype==1){
                window.location.href="/thirdPartyOperation/expenseMgmt/feedbackSum.html?pageType=review&ymonth="+item.ymonth+"&status="+item.status+"&feedbackgo=1";
            }else if(item.faretype&&item.faretype==2){
                window.location.href="/thirdPartyOperation/expenseMgmt/feedbackSum.html?pageType=review&ymonth="+item.ymonth+"&status="+item.status+"&feedbackgo=2";
            }else if(item.faretype&&item.faretype==3){
                window.location.href="/thirdPartyOperation/expenseMgmt/feedbackSum.html?pageType=review&ymonth="+item.ymonth+"&status="+item.status+"&feedbackgo=3";
            }
        },

        //年月查询
        queryYmonth:function () {
            var yMonth=$(".date-picker").val().replace("-","");
            var _this = this;
            $.post({
                url: '/thirdPartyOperation/expenseMgmt/feedbackSum/queryYmonth.ajax?data='+yMonth,
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
        }
    },
    filters: { //格式化时间戳
        time: function (item) {
            var date = new Date(item);
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
        status: function (item) {
            item = item.toUpperCase() //统一转为大写
            if (item == 'N') {
                return '待复核'
            } else if (item == 'D') {
                return '复核中'
            } else if (item == 'S') {
                return '已复核'
            } else {
                return item
            }
        }
    }
});