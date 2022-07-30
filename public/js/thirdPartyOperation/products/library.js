new Vue({
    el: '#content',
    data: {
        // page data
        title: '',
        fundid:'',
        funddt:'',
        navdt:'',
        fundnm:'',
        tano:'',
        importdate:'',
        fundstnm:'',
        nav:'',
        fundincomeunit:'',
        yield:'',
        ioType:'',
        expSt:'',
        uploadSt:'',
        status: '',
        diaMsg: '',
        today:'',
        operator: '',
        userId: '',
        dialogData: [],
        // table data
        tableData: [],
        currentIndex: 0,
        pageMaxNum: '50',
        condition: '',
        // loading动画
        progress: false,
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
    mounted: function () {
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
        var params = {};
        $.get({
            url: '/thirdPartyOperation/products/library/search.ajax',
            data: params,
            success: function (result) {
                console.log(params)
                console.log(result)
                if (result.error == 0) {
                        _this.funddt = result.data.funddt;
                        _this.navdt = result.data.navdt;
                        _this.tableData = result.data.baseFundInfoList;
                        
                }
                else {
                   _this.showDialog('', 'info', false, '数据获取失败');  
                }
            },
            error: function () {
                    _this.showDialog('', 'info', false, '数据获取失败');
                }
        });
        $('.date-picker').datepicker({
                autoclose: true,
                todayHighlight: true,
                format: 'yyyymmdd',
                language: 'cn'
            })
            //show datepicker when clicking on the icon
            .next().on(ace.click_event, function () {
                $(this).prev().focus();
            });
    },
   
    methods: {
        prev: function () {
            this.currentIndex <= 0 ? 0 : this.currentIndex--;
        },
        next: function () {
            this.currentIndex >= this.middleData.length - 1 ? this.middleData.length - 1 : this.currentIndex++;
        },
        changeIndex: function (index) {
            this.currentIndex = index - 1;
        },
       
       
        //查询
        search: function () {
            this.currentIndex = 0;
            var _this = this;
                var params = {};
                params.fundid= this.fundid;
                params.fundnm = this.fundnm;
                params.tano = this.tano;
            $.get({
                url: '/thirdPartyOperation/products/library/search.ajax',
                data: params,
                success: function (result) {
                    console.log(params)
                    console.log(result)
                    if (result.error == 0) {
                        _this.navdt = result.data.navdt;
                        _this.tableData = result.data.baseFundInfoList;
                          
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
        //刷新产品列表
        refreshProduct: function () {
            var _this = this;
          //  var date =$('#sendtime').val()
            var params = {};
            params.taskDate= _this.navdt;
            console.log(params);
            $.get({
                url: '/thirdPartyOperation/products/library/refreshProduct.ajax',
                data: params,
                success: function (result) {
                    console.log(params)
                    console.log(result)
                    if (result.error == 0) {
                        
                      //  _this.tableData = result.data.baseFundInfoList;
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
            },3500)
        },
       
        //刷新净值
        refreshValue: function () {
            var _this = this;
            
            var params = {};
           
            $.get({
                url: '/thirdPartyOperation/products/library/refreshValue.ajax',
                data: params,
                success: function (result) {
                    console.log(params)
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
            setTimeout(function(){
                window.location.reload() 
            },1000)
          
        },
       
      
        // 公共方法
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