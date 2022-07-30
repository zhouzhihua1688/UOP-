new Vue({
    el: '#content',
    data: {
         // 表格分页数据
        diaMsg:'',
        tableData: [],
        currentIndex: 0,
        pageMaxNum: '10',
        condition: '',
        // 查询
        ymonth:"",
        status:"",
        operater:"",
        remark:""
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
        // 初始化数据
        $.post({
                url: '/thirdPartyOperation/expenseMgmt/procedureSum/search.ajax',
                success: function (result) {
                    console.log(result)
                    if (result.error == 0) {
                        _this.tableData = result.data;                         
                    }
                    else {
                       _this.showDialog('', 'info', false, '数据获取失败');  
                    }
                },
                error: function () {
                _this.showDialog('', 'info', false, '数据获取失败');
                    }
        });

    },
    methods:{
        // 数据业务方法
        search: function () {
            var _this = this;
            // $('thead>tr>th[class*=sorting_]').each(function (index, item) {
            //     $(item).removeClass('sorting_asc sorting_desc');
            // });            
            // this.currentIndex = 0;
                var params = {};
                this.ymonth=$("#ymonth").val().replace("-","")
                params.ymonth = this.ymonth;
                params.status=this.status
        
                // params.opentime = $('#deadline').val();
                // params.status = this.status;
                console.log(params.ymonth)
                console.log(params.status)
            $.post({
                url: '/thirdPartyOperation/expenseMgmt/procedureSum/search.ajax',
                data: params,
                success: function (result) {
                    console.log(result)
                    if (result.error == 0) {
                        
                            _this.tableData = result.data;                      
                                                 
                    }
                    else {
                       _this.showDialog('', 'info', false, '数据获取失败');  
                    }
                },
                error: function () {
                        _this.showDialog('', 'info', false, '数据获取失败');
                    }
            });
        },
        // 下载=全量
        download: function (ymonth,type) {
            var _this = this;
            var params = {                  
                    type:type,                  
                },
                url;
                params.ymonth=ymonth     
            if (type ==='2') {
                url = '/thirdPartyOperation/expenseMgmt/procedureSum/download.ajax?ymonth=' +params.ymonth+'&type='+type;
            } 
            window.location.href = url;           
        },
        // 地址传入
        getUrlParam: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg); //匹配目标参数
            if (r != null) return unescape(r[2]);
            return ''; //返回参数值
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
      

        // 月复核查看
        check:function(el,item){

             // window.location.href = "/thirdPartyOperation/expenseMgmt/procedureSum.html?pageType=review&faretype="+el+"&ymonth="+ymonth+"&status="+status;

            var hrefUrl = '/thirdPartyOperation/expenseMgmt/procedureSum.html?pageType=review';
            hrefUrl += '&ymonth=' + item.ymonth+'&operater='+item.operater+'&checktime='+item.checktime;
            console.log(hrefUrl)
            window.location.href =hrefUrl;

         },
         //重新初算弹框
        breaks: function(ymonth,faretype) {
            var _this = this;
            _this.showDialog('', 'chu', false)
            _this.faretype = faretype;
            _this.ymonth = ymonth;

        },
         //重新初算
         recalculation: function () {
            var _this = this;
            var params = {};
                params.ymonth=_this.ymonth;
                params.faretype=_this.faretype;
            $.get({
                url: '/thirdPartyOperation/expenseMgmt/procedureSum/recalculation.ajax',
                data: params,
                success: function (result) {
                    console.log(result)
                    if (result.error == 0) {
                        
                         //   _this.tableData = result.data;                      
                                                 
                    }
                    else {
                       _this.showDialog('', 'info', false, '数据获取失败');  
                    }
                },
                error: function () {
                        _this.showDialog('', 'info', false, '数据获取失败');
                    }
            });
            setTimeout(function(){
                window.location.reload() 
            },1500)
         },
         // 公共方法
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

    filters: {//格式化时间戳
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
            return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
        },
        // 状态
        status:function(item){
            item = item.toUpperCase()
            if (item==="N") {
                return "待复核"
            }else if(item==="D"){
                return "复核中"
            }else if(item==="S"){
                return "已复核"
            }else{
                return item 
            }
        },      
    }
 });