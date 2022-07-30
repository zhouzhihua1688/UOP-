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
        condition: "",
        fbStatus:"",
        branchcode:"",
        shortnm:"",
        userid:"",
        username:"",
        email:"",
        mobile:"",
        userpw:"",
        branchcodes:"",
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
        //初始化数据
        $.get({
            url: '/thirdPartyOperation/channelMaintain/contactMaintain/search.ajax',
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
                params.branchcode= this.branchcode;
                params.shortnm=$("#shortnm").val();
                console.log(params.branchcode)
                console.log(params.shortnm)
            $.get({
                url: '/thirdPartyOperation/channelMaintain/contactMaintain/search.ajax',
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
        },
        //删除
        delete1: function (item) {
            var _this = this;
            var params ={};
            params.userid=item.userid;
            console.log(params.userid)
            $.get({
                url: '/thirdPartyOperation/channelMaintain/contactMaintain/delete.ajax',
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
            window.location.reload()
        },
        
        //查询渠道简称
        queryShortnm: function () {
            var _this = this;
            var params ={};
            params.branchcode = $("#branchcode").val();
            $.get({
                url: '/thirdPartyOperation/channelMaintain/contactMaintain/queryShortnm.ajax',
                data: params,
                success: function (result) {
                    console.log(result)
                    if (result.error == 0) {
                            _this.tableData = result.data; 
                            this.shortnm = _this.tableData.shortnm;
                            $('#qdjc').val(this.shortnm);
                            console.log( this.shortnm)
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
       
        //新增
        showAdd: function () {
            var _this = this;
            this.branchcode = "";
            this.shortnm = "";
            this.username = "";
            this.email = "";
            this.mobile = "";
            this.userid = "";
            this.userpw = "";
            this.showDialog('', 'create');
        },
        add1: function () {
            var _this = this;
            _this.shortnm= _this.tableData.shortnm;
            var params ={};
            params.branchcode = $("#branchcode").val();
            params.shortnm = _this.shortnm;
            params.username = this.username;
            params.email = this.email;
            params.mobile = this.mobile; 
            params.userid = this.userid;
            params.userpw = this.userpw;
            $.get({
                url: '/thirdPartyOperation/channelMaintain/contactMaintain/add.ajax',
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
            //this.showDialog('', 'create');
            window.location.reload()
        },
        //更新
        showUpdate: function (item) {
            var _this = this;
            this.branchcodes = item.branchcode;
            this.shortnm = item.shortnm;
            this.username = item.username;
            this.email = item.email;
            this.mobile = item.mobile;
            this.userid = item.userid;
            this.userpw = '******';
            this.showDialog('', 'create1');
        },
        update1: function () {
            var _this = this;
            var params ={};
            params.userid=this.userid;
            params.email = this.email;
            params.mobile = this.mobile; 
            params.updateby = this.updateby;
            $.get({
                url: '/thirdPartyOperation/channelMaintain/contactMaintain/update.ajax',
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
            this.branchcode = this.branchcode;
            this.shortnm = this.shortnm;
            this.username = this.username;
            this.userid = this.userid;
            this.userpw = this.userpw;
            window.location.reload()
            //this.showDialog('', 'create1');
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