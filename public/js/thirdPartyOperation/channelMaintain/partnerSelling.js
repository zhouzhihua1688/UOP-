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
        pageMaxNum: '50',
        condition: "",
        fbStatus:"",
        branchcode:"",
        branchcodes:"",
        branchtype:"",
        shortnm:"",
        userid:"",
        updateby:"",
        updatetime:"",
        fullnm:"",
        bd:"",
        tel:"",
        website:"",
        branchgroup:"",
        //行业类型着重标识
        showRedTag:false,
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
        },
        branchtype: {
            handler: function (val, oldval) {
                if (this.branchtype == "B"){
                    this.showRedTag = true;
                } else {
                    this.showRedTag = false;
                }
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
            url: '/thirdPartyOperation/channelMaintain/partnerSelling/search.ajax',
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
        _this.validAdd();
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
            params.branchtype=this.branchtype;
            console.log(params.branchcode)
            console.log(params.shortnm)
            $.get({
                url: '/thirdPartyOperation/channelMaintain/partnerSelling/search.ajax',
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
        showdelete: function(item){
            var _this = this;
            _this.deletebranch=item.branchcode;
            _this.showDialog('', 'chu', false)
        },
        //删除
        delete1: function () {
            var _this = this;
            var params ={};
            params.branchcode=_this.deletebranch;
            console.log(params.branchcode)
            $.get({
                url: '/thirdPartyOperation/channelMaintain/partnerSelling/delete.ajax',
                data: params,
                success: function (result) {
                    console.log(result)
                    if (result.error == 0) {

                        // _this.tableData = result.data;
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

        //从CRM获取渠道信息
        crm: function () {
            var _this = this;
            var params ={};
            params.branchcode = $("#branchcode").val();
            $.get({
                url: '/thirdPartyOperation/channelMaintain/contactMaintain/crm.ajax',
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
        //新增渠道信息
        showAdd: function () {
            var _this = this;
            var date= new Date();
            this.branchcode = "";
            this.shortnm = "";
            this.bd = "";
            this.fullnm = "";
            this.website = "";
            this.tel = "";
            this.branchgroup = "";
            // this.userid = "";
            this.updatetime= new Date().toLocaleString('chinese',{hour12:false});
            this.showDialog('', 'create');
        },
        add: function () {
            var _this = this;
            if (!_this.validAdd().form()) return;
            // _this.shortnm= _this.tableData.shortnm;
            var params ={};
            params.branchcode = $("#addbranchcode").val();
            params.shortnm = _this.shortnm;
            params.bd = this.bd;
            params.fullnm = this.fullnm;
            params.website = this.website;
            params.tel = this.tel;
            // params.userid = this.userid;
            params.branchgroup = this.branchgroup;
            params.updatetime = this.updatetime;
            params.branchtype = this.branchtype;
            params.insertby = $(".username").val();
            console.log(params);
           $.post({
                url: '/thirdPartyOperation/channelMaintain/partnerSelling/add.ajax',
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
            window.location.reload();
            //this.showDialog('', 'create');public/js/thirdPartyOperation/channelMaintain/partnerSelling.js
        },
        //更新渠道信息
        showUpdate: function (item) {
            var _this = this;
            this.branchcodes = item.branchcode;
            this.shortnm = item.shortnm;
            this.bd = item.bd;
            this.fullnm = item.fullnm;
            this.website = item.website;
            this.tel = item.tel;
            this.updateby = item.updateby;
            this.branchgroup = item.branchgroup;
            this.branchtype = item.branchtype;
            function timestampTotime(timestamp) {
                var date = new Date(timestamp);
                var Y = date.getFullYear()+'-';
                var M = (date.getMonth()+1<10?'0'+(date.getMonth()+1):date.getMonth()+1)+'-';
                var D = date.getDate()+'T';
                var h = date.getHours()+':';
                var m = date.getMinutes()+':';
                var s = date.getSeconds();
                return Y+M+D+h+m+s;
            }
            // var updatetime= timestampTotime(item.updatetime);
            var updatetime = new Date().toLocaleString('chinese',{hour12:false});
            this.updatetime=updatetime;
            this.showDialog('', 'create1');
        },
        update: function () {
            var _this = this;
            if (!_this.validUpdate().form()) return;
            var params ={};
            params.branchcode = _this.branchcodes;
            params.shortnm = _this.shortnm;
            params.bd = this.bd;
            params.fullnm = this.fullnm;
            params.website = this.website;
            params.tel = this.tel;
            params.updateby = this.updateby;
            params.branchgroup = this.branchgroup;
            params.updatetime = this.updatetime;
            params.branchtype = this.branchtype;
            $.post({
                url: '/thirdPartyOperation/channelMaintain/partnerSelling/update.ajax',
                data: params,
                success: function (result) {
                    console.log(params)
                    console.log(result)
                    if (result.error == 0) {

                        // _this.tableData = result.data;
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

        validAdd: function () {
            //绑定验证器
            return $("#addForm").validate({
                errorPlacement: function(error,element){
                    element.val('');
                    element.attr("placeholder",error.html())
                },
                rules: {
                    branchcode: {
                        required: true,
                        rangelength:[0,6],
                    },
                    shortnm: {
                        required: true,
                    },
                    fullnm: {
                        required: true,
                    },
                    branchtype: {
                        required: true,
                    },
                },
                messages: {
                    branchcode: {
                        required: "不能为空!",
                        rangelength: "长度限定6位！",
                    },
                    shortnm: {
                        required: "不能为空!",
                    },
                    fullnm: {
                        required: "不能为空!",
                    },
                    branchtype: {
                        required: "不能为空!",
                    },

                },
                submitHandler:function() {
                    return false;
                },
            });
        },
        validUpdate: function () {
            //绑定验证器
            return $("#upForm").validate({
                errorPlacement: function(error,element){
                    element.val('');
                    element.attr("placeholder",error.html())
                },
                rules: {
                    branchcode: {
                        required: true,
                    },
                    shortnm: {
                        required: true,
                    },
                    fullnm: {
                        required: true,
                    },
                    branchtype: {
                        required: true,
                    },
                },
                messages: {
                    branchcode: {
                        required: "不能为空!",
                    },
                    shortnm: {
                        required: "不能为空!",
                    },
                    fullnm: {
                        required: "不能为空!",
                    },
                    branchtype: {
                        required: "不能为空!",
                    },

                },
                submitHandler:function() {
                    return false;
                },
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
            if (!item){
                return;
            }
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