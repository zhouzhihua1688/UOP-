new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        tableData: [],
        diaMsg:'',
        custName:'',        //客户姓名
        custNo:'',          //客户编号
        firmOfferDesc:'',   //投资理念
        firmOfferId:'' ,    //实盘ID
        firmOfferName:'' ,  //实盘名称
        firmOfferType:'' ,  //投资风格
        status:'',          //实盘状态
        refuseReason:'',    //不公开原因
        firmOfferIds:'',    //不公开
        // 查看详情
        detailList:[],
        detailListInfo:[],
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10,
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
        }
    },
    watch: {
        pageMaxNum: function () {
            this.getTableData(0);
        }
    },
    mounted: function () {
        var _this = this;
        var dialogs = ['info',"details",'openNot',"openNull"];
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
        params.groupId=this.getQueryString('firmOfferId') ? this.getQueryString('firmOfferId') : this.firmOfferId;
        params.groupName=this.firmOfferName;
        params.custNo=this.custNo;
        params.status=this.status;
        params.pageNo = 1;
        params.pageSize = this.pageMaxNum;
        $.post({
            url: '/messageCenter/socialMgmt/publicOfferReview/getTableData.ajax',
            data: params,
            success: function (result) {
                if (result.error === 0) {
                    // 后端分页 展示
                    _this.tableData = result.data.tableData;
                    _this.currentIndex = result.data.pageNum - 1;
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
    methods: {
        //实盘审核查询
        getTableData: function (currentIndex) {
            var params = {};
            var _this = this;
            params.groupId=this.firmOfferId;
            params.groupName=this.firmOfferName;
            params.custNo=this.custNo;
            params.status=this.status;
            params.pageNo = currentIndex + 1;
            params.pageSize = this.pageMaxNum;
            $.post({
                url: '/messageCenter/socialMgmt/publicOfferReview/getTableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        // 后端分页 展示
                        _this.tableData = result.data.tableData;
                        _this.currentIndex = result.data.pageNum - 1;
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
        //查看实盘详情
        checkParams:function(item){
            var _this=this
            var params = {};
            params.groupId  =item.firmOfferId ;
            // this.firmOfferName =item.firmOfferName ;
            // this.custNo=item.custNo;
            // this.custName=item.custName;
            // this.firmOfferDesc =item.firmOfferDesc;
            // this.firmOfferType =item.firmOfferType ;
            // this.status  =item.status  ;
            $.post({
                url: '/messageCenter/socialMgmt/publicOfferReview/checkParams.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.detailList=result.data.body
                        _this.detailListInfo=result.data.body.custInfo
                        _this.detailList.showFundDetail = result.data.body.fundDetails.map(function(item){
                            return item.fundName + '    ' + item.fundid + '    ' + item.fundPercent + '%'
                        }).join('\n');
                        _this.showDialog('', 'details');
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        // 查看弹窗公开或者不公开
        publicStatus:function(){
            var _this=this
            var params = {};
            params.groupId=this.detailList.firmOfferId;
            params.refuseReason=this.refuseReason
            params.audit ='Y'
            console.log("公开",params)
            $.post({
                url: '/messageCenter/socialMgmt/publicOfferReview/publicStatus.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        // _this.getTableData(0);
                        _this.getTableData(_this.currentIndex);
                        _this.showDialog('details', 'info', false,result.msg);
                    }
                    _this.showDialog('details', 'info', false, result.msg);
                }
            });
        },
        // 不公开
        nullPublic:function(){
            var _this=this
            this.refuseReason=''
            this.showDialog('details', 'openNull',false);
        },
        openNull:function(){
            var _this=this
            var params = {};
            params.groupId=this.detailList.firmOfferId;
            params.audit ='N'
            params.refuseReason=this.refuseReason;
            console.log("不公开",params)
            $.post({
                url: '/messageCenter/socialMgmt/publicOfferReview/publicStatus.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(_this.currentIndex);
                        _this.showDialog('openNull', 'info', false,result.msg);
                    }
                    else {
                        _this.showDialog('openNull', 'info', false,result.msg);
                    }
                }
            });
        },

        //页面操作公开和不公开操作
        notPublic: function (item) {
            var _this = this;
            this.audit = item.status
            this.firmOfferIds= item.firmOfferId
            this.refuseReason=''
            this.showDialog('', 'openNot');
        },
        // 公开
        open:function(item){
            var _this = this;
            var params={}
            params.groupId=item.firmOfferId;
            params.audit ='Y';
            params.refuseReason=this.refuseReason;
            console.log("公开",params)
            $.post({
                url: '/messageCenter/socialMgmt/publicOfferReview/publicStatus.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(_this.currentIndex);
                        _this.showDialog('', 'info', false,result.msg);
                    }
                    else {
                        _this.showDialog('', 'info', false,result.msg);
                    }
                }
            });
        },
        //不公开
        openNot:function(){
            var _this = this;
            var params={}
            params.groupId=this.firmOfferIds;
            params.audit ='N';
            params.refuseReason=this.refuseReason;
            console.log("不公开",params)
            $.post({
                url: '/messageCenter/socialMgmt/publicOfferReview/publicStatus.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(_this.currentIndex);
                        _this.showDialog('openNot', 'info', false,result.msg);
                    }
                    else {
                        _this.showDialog('openNot', 'info', false,result.msg);
                    }
                }
            });
        },
        // 弹窗查看留言
        viewMessages:function(){
            window.location.href = "/messageCenter/auditMgmt/leaveWordMgmt.html?firmOfferId="+this.detailList.firmOfferId;
        },
        //主表格分页方法
        check: function (item) {
            item.check = !item.check;
        },
        allCheck: function () {
            var _this = this;
            var flag = this.checkAll;
            this.tableData.forEach(function (item) {
                item.check = !flag;
            });
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
        inSelected: function (item, arr, prop) {
            var _index = -1;
            arr.forEach(function (value, index) {
                if (item[prop] == value[prop]) {
                    _index = index;
                }
            });
            return _index;
        },
        formatTime: function (timestamp) {
            var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
            var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
            var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
            return Y + M + D + h + m + s;
        },
        overflowHide:function (val) {
            var str=val.toString();
            if(str.length>10){
                str=str.substring(0,10)+'...'
            }
            return str;
        },
        stringTimeFat:function (val) {
            if(val){
                if(val.length>8){
                    return val.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/g,'$1-$2-$3 $4:$5:$6')
                }else{
                    return val.replace(/(\d{4})(\d{2})(\d{2})/g,'$1-$2-$3')
                }
            }else{
                return '-'
            }
        },
        getQueryString: function (name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return '';
        }
    },
    // 类型状态
    filters: {
        status: function (item) {
            if (item ==="3") {
                return "不公开"
            } else if (item === "6") {
                return "公开"
            } else if (item === "0") {
                return "初始化"
            } else if (item === "2") {
                return "申请公开"
            } else if (item === "4") {
                return "申请失败"
            }else if (item === "9") {
                return "解散"
            }else {
                return ""
            }
        },
        ellipsis (value) {
            if (!value) return ''
            if (value.length > 8) {
                return value.slice(0,8) + '...'
            }
            return value
        }
    }
});
