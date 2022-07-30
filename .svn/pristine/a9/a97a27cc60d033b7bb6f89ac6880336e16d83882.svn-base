new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        id: '',
        rewardCardNo: '',
        isUpdate: false,
        updateId: '',
        tableData: [],
        diaMsg: '',
        // 新建弹窗相关数据
        diaRewardCardNo: '',
        diaActId: '',
        diaGenerateCount: '',
        diaRemark: '',
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10,

        activeAll:[]
    },
    created :function() {
        var _this=this;
        $.post({
            url: '/awardMgmt/awardSetting/batchCard/activeAll.ajax',
            success: function (result) {
                if (result.error === 0) {
                    _this.activeAll=result.data
                }
                else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });
    },
    mounted: function () {
        var dialogs = ['info', 'del', 'add'];
        var _this = this;
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
            format: 'YYYY-MM-DD HH:mm:ss',//use this option to display seconds
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
            }
            else if (this.currentIndex <= this.maxSpace && this.totalPage - this.currentIndex > this.maxSpace) {
                for (var i = 0; i < this.currentIndex + (2 * this.maxSpace - this.currentIndex); i++) {
                    arr.push(i + 1);
                }
            }
            else if (this.currentIndex > this.maxSpace && this.totalPage - this.currentIndex <= this.maxSpace) {
                var space = this.totalPage - this.currentIndex;
                for (var i = this.currentIndex - (2 * this.maxSpace - space); i < this.totalPage; i++) {
                    arr.push(i + 1);
                }
            }
            else {
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
    methods: {
        getTableData: function (currentIndex) {
            var params = {};
            var _this = this;
            this.id && (params.id = this.id);
            this.rewardCardNo && (params.rewardCardNo = this.rewardCardNo);
            params.pageNo = currentIndex + 1;
            params.pageSize = this.pageMaxNum;
            $.post({
                url: '/awardMgmt/awardSetting/batchCard/getTableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.tableData = result.data.tableData;
                        _this.currentIndex = result.data.page - 1;
                        _this.totalPage = result.data.total;
                    }
                    else {
                        _this.tableData = [];
                        _this.currentIndex = 0;
                        _this.totalPage = 0;
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        setAddData: function (obj) {
            this.diaRewardCardNo = obj.rewardCardNo ? obj.rewardCardNo : '';
            this.diaActId = obj.actId ? obj.actId : '';
            this.diaGenerateCount = obj.generateCount ? obj.generateCount : '';
            $('#startTime').val(obj.startTime ? obj.startTime : '');
            $('#endTime').val(obj.endTime ? obj.endTime : '');
            this.diaRemark = obj.remark ? obj.remark : '';
        },
        showAdd: function () {
            this.isUpdate = false;
            this.updateId = '';
            this.setAddData({});
            this.showDialog('', 'add');
        },
        showUpdate: function (item) {
            this.isUpdate = true;
            this.updateId = item.id;
            this.setAddData(item);
            this.showDialog('', 'add');
        },
        diaInfoCheck: function () {
            if (!this.diaRewardCardNo) {
                this.showDialog('add', 'info', true, '奖励卡编号不能为空');
                return false;
            }
            if (!this.diaGenerateCount) {
                this.showDialog('add', 'info', true, '生成数量不能为空');
                return false;
            }
            if (!$('#startTime').val()) {
                this.showDialog('add', 'info', true, '开始时间不能为空');
                return false;
            }
            if (!$('#endTime').val()) {
                this.showDialog('add', 'info', true, '结束时间不能为空');
                return false;
            }
            if ((new Date($('#startTime').val())).getTime() > (new Date($('#endTime').val())).getTime()) {
                this.showDialog('add', 'info', true, '开始时间大于结束时间');
                return false;
            }
            return true;
        },
        add: function () {
            var _this = this;
            if (this.diaInfoCheck()) {
                var params = {};
                params.rewardCardNo = this.diaRewardCardNo;
                params.actId = this.diaActId;
                params.generateCount = this.diaGenerateCount;
                params.startTime = $('#startTime').val();
                params.endTime = $('#endTime').val();
                params.remark = this.diaRemark;
                this.isUpdate && (params.id = this.updateId);
                var url = '/awardMgmt/awardSetting/batchCard/';
                url += this.isUpdate ? 'update.ajax' : 'add.ajax';
                $.post({
                    url: url,
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.getTableData(0);
                        }
                        _this.showDialog('add', 'info', false, result.msg);
                    }
                });
            }
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
        //主表格分页方法
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
        }
    }
});