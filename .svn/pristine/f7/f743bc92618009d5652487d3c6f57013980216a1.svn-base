new Vue({
    el: '#content',
    data: {
        tableData: [],
        diaMsg: "",
        //   表格分页
        currentIndex: 0,
        pageMaxNum: '20',


        fileDescs:[],
        statuCodes:[],

        //data数据相关

        all_check :false,
        startDate:'',
        endDate:'',
        filetypes:[],

        //费用重算相关
        ymonth:'',
        faretype :'1',

        //上次执行信息
        lastCalMsg:'',
        lastDataMsg:''
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
    },
    watch: {
        pageMaxNum: {
            handler: function (val, oldval) {
                this.currentIndex = 0;
            }
        },
        homePageMaxNum: {
            handler: function (val, oldval) {
                this.homeCurrentIndex = 0;
            }
        },
        all_check:{
            handler:function (val) {
                this.fileDescs.forEach(function (jsonobj) {
                    jsonobj.check =val;
                })
            }
        }


    },
    mounted: function () {
        var _this = this;
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


        $('.date-picker').datepicker({
            autoclose: true,
            todayHighlight: true,
            format: 'yyyymmdd',
            language: 'cn',
        });

        $('.date-picker-ymonth').datepicker({
            autoclose: true,
            todayHighlight: true,
            format: 'yyyymm',
            language: 'cn',
            startView:'year',
            maxViewMode:'years',
            minViewMode:'months'
        });
        //加载文件类型
        _this.queryFileDesc();
        //加载上次执行信息
         _this.getLastData();

         _this.getLastCal();

    },
    methods: {

        getLastData:function(){
            var _this = this;
            let params={};
            params.mCode = 'POMS_COST_DATA';
            console.log(params);

            $.get({
                url:'/thirdPartyOperation/expenseMgmt/manager/getLastRecord.ajax',
                data:params,
                success:function (result) {
                    console.log(result);
                    if (result.responseCode=='0000') {
                        if (result.data!=null) {
                            _this.lastDataMsg = result.data.common;
                        }
                    }else{
                        _this.showDialog('', 'info', false, '数据获取失败');
                    }
                },
                error:function () {
                    _this.showDialog('', 'info', false, '数据获取失败');
                }
            });
        },

       getLastCal:function(){
           var _this = this;
           let params={};
           params.mCode = 'POMS_COST_CAL';
           console.log(params);
           
           $.get({
              url:'/thirdPartyOperation/expenseMgmt/manager/getLastRecord.ajax', 
               data:params,
               success:function (result) {
                  console.log(result);
                  if (result.responseCode=='0000') {
                      if (result.data!=null){
                          _this.lastCalMsg=  result.data.common;
                      }
                  }else{
                      _this.showDialog('', 'info', false, '数据获取失败');
                  }
               },
               error:function () {
                   _this.showDialog('', 'info', false, '数据获取失败');
               }
           });
       },
        
        /*开始初算*/
        cal:function(){
            var _this= this;
            var params={};
            params.ymonth = _this.ymonth;
            params.faretype = _this.faretype;
            console.log(params);
            /*关闭确认模态框*/
            $("#cal").modal('hide');

            $.get({
                url:'/thirdPartyOperation/expenseMgmt/manager/calCost.ajax',
                data:params,
                success:function (result) {
                    //初算时间过长,不做操作
                },
                error: function () {
                    _this.showDialog('', 'info', false, '数据获取失败');
                }
            });

            setTimeout(_this.getLastCal(),"500");


        },

        /*打开重算确认界面*/
        toCal:function(){
            var _this = this;
            _this.ymonth = $("#ymonth").val();
            console.log(_this.ymonth);
            if (_this.ymonth=='' || _this.ymonth==null){
                _this.showDialog('', 'info', false, '请选择初算月份!');
                return;
            }
            /*打开初算确认模态框*/
            $("#cal").modal('show');

        },

        /*加载文件类型*/
        queryFileDesc: function () {
            var _this = this;
            $.get({
                url: '/thirdPartyOperation/expenseMgmt/manager/queryFileDesc.ajax',
                success: function (result) {
                    console.log(result)
                    if (result.responseCode==='0000')
                    {
                        _this.fileDescs = result.data;
                    } else {
                        _this.showDialog('', 'info', false, '数据获取失败');
                    }
                },
                error: function () {
                    _this.showDialog('', 'info', false, '数据获取失败');
                }
            });
        },
        /*批量导入数据中心文件*/
        importData:function(){
            var _this=this;
            /*封装参数*/
            let params ={};
            params.startDate = _this.startDate;
            params.endDate = _this.endDate;
            params.filetypes=[];
            _this.filetypes.forEach(function (jsonobj) {
                params.filetypes.push(jsonobj.filetype);
            })

            console.log(params);
            /*关闭确认模态框*/
            $("#import").modal('hide');

            $.post({
               url:'/thirdPartyOperation/expenseMgmt/manager/importData.ajax',
               data: params,
               success:function (result) {
                   if (result.error===0){
                       //批量操作时间较长,不做操作
                        var msg = result.data==null ?'操作成功':result.data;
                       _this.showDialog('', 'info', false, msg);
                   }
               } ,
                error:function () {
                    _this.showDialog('', 'info', false, '批量导入操作异常!');
                }
            });

            setTimeout(_this.getLastData(),"10000");



        },
        /*数据中心文件导入确认*/
        toImport:function(){
            var _this =this;
            _this.startDate = $("#startDate").val();
            _this.endDate = $("#endDate").val();
            if (_this.startDate==='' ||_this.endDate===''||_this.startDate>_this.endDate){
                _this.showDialog('', 'info', false, '请输入正确的起止日期!');
                return;
            }
            _this.filetypes=[];
            _this.fileDescs.forEach(function (jsonobj) {
                console.log(jsonobj);
                if (jsonobj.check){
                    var filetype={filetype:jsonobj.filetype,filertpedesc:jsonobj.filertpedesc};
                    _this.filetypes.push(filetype);
                }
            });
            console.log(_this.filetypes);

            if (_this.filetypes.length===0){
                _this.showDialog('', 'info', false, '请选择要导入的文件类型!');
                return;
            }
            setTimeout(function (){
                $("#import").modal('show')
            },"200");

        },


        convertTableData: function (data, length) {
            var strLength = Math.ceil(data.length / length);
            var ret = new Array(strLength);
            for (var i = 0; i < strLength; i++) {
                let l = data.length - length * (i + 1);
                let len = length;
                if (l < 0) len = data.length - length * i;
                ret[i] = new Array(len);
                for (var j = 0; j < len; j++) {
                    ret[i][j] = data[i * length + j];
                }
            }
            console.log(ret);
            return ret;
        }
        ,
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
    filters:
        {//格式化时间戳
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
            },

        }
})
;