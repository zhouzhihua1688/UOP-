new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        idNo:'',
        fundAcct:'',
        tradeAcct:'',
        appStrDt:'',
        appEndDt:'',
        loadingShow: false,
        tableData: [],
        serialNo:'',
        chkComment:'',
        userId:'',
        diaMsg:'',
        loadingStatus:'数据获取中...',
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10
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
        var dialogs = ['info','rejectCheck'];
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
        $('.date-timepicker').datetimepicker({
            format: 'YYYY-MM-DD', //use this option to display seconds
            icons: {
                time: 'fa fa-clock-o',
                date: 'fa fa-calendar',
                up: 'fa fa-chevron-up',
                down: 'fa fa-chevron-down',
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-arrows ',
                clear: 'fa fa-trash',
                close: 'fa fa-times'
            }
        }).next().on(ace.click_event, function () {
            $(this).prev().focus();
        });
        this.getTableData(0);
    },
    methods: {
        //昵称审核list
        getTableData: function (currentIndex) {
            var params = {};
            var _this = this;
            params.apKind='634';
            params.pageNo = currentIndex + 1;
            params.pageSize = this.pageMaxNum;
            params.idNo=this.idNo;
            params.fundAcct=this.fundAcct;
            params.tradeAcct=this.tradeAcct;
            params.appStrDt=$(".appStrDt").val().split('-').join('');
            params.appEndDt=$(".appEndDt").val().split('-').join('');
            // console.log(params);
            _this.loadingStatus='数据获取中...';
            $.post({
                url: '/messageCenter/auditMgmt/nicknameToReview/nicknameGetList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        if(result.data.apps&&result.data.apps.length>0){
                            _this.userId=result.data.userId;
                            _this.tableData = result.data.apps;
                            _this.currentIndex = result.data.pageNum - 1;
                            _this.totalPage = result.data.pages;
                        }else{
                            _this.tableData = [];
                            _this.currentIndex = 0;
                            _this.totalPage = 0;
                            _this.loadingStatus='没有数据';
                        }
                    } else {
                        _this.tableData = [];
                        _this.currentIndex = 0;
                        _this.totalPage = 0;
                        _this.showDialog('', 'info', false, result.msg);
                        _this.loadingStatus='没有数据';
                    }
                }
            });
        },
        //passCheck通过审核
        passCheck:function (val) {
            var _this=this;
            var params={};
            params.serialNo=val;
            params.accptMd='COUNTER';
            params.chkFlg='Y';
            params.chkOpr=this.userId;
            $.post({
                url: '/messageCenter/auditMgmt/nicknameToReview/passCheck.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        var $index=_this.currentIndex;
                        // console.log(result,'open');
                        _this.showDialog('', 'info', false, '昵称审核通过');
                        _this.getTableData($index);
                    } else {
                        _this.showDialog('', 'info', false, '操作失败');
                    }
                }
            });
        },
        //审核拒绝通过
        rejectCheck:function (val) {
            this.serialNo=val;
            this.showDialog('', 'rejectCheck', false);
        },
        rejectChecking:function () {
            var _this=this;
            var params={};
            params.serialNo=this.serialNo;
            params.accptMd='COUNTER';
            params.chkFlg='N';
            params.chkOpr=this.userId;
            params.chkComment=this.chkComment;
            $.post({
                url: '/messageCenter/auditMgmt/nicknameToReview/rejectCheck.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        var $index=_this.currentIndex;
                        _this.showDialog('', 'info', false, '拒绝操作成功');
                        _this.getTableData($index);
                    } else {
                        _this.showDialog('', 'info', false, '操作失败');
                    }
                }
            });
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
        }
    }
});
