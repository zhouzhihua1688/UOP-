new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        actId: '',
        isUpdate: false,
        updateId: '',
        tableData: [],
        diaMsg: '',
        // 新建弹窗相关数据
        diaJobDesc: '',
        diaChildJobId: '',
        diaChildJobIdList: [],
        diaActId: '',
        diaActIdList: [],
        diaActModuleCutinId: '',
        diaActModuleCutinIdList: [],
        diaJobHandler: [],
        diaIsEnable: '0',
        diaJobCron: '',
        handler: '',
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10
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
        $("#cron").cronGen({
            direction: 'right'
        });
        $('#cronLabel').insertBefore($('.cronValue').eq(0));
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
        },
        diaActId: function (curVal, oldVal) {
            this.diaActModuleCutinId = '';
            if (!curVal) {
                this.diaActModuleCutinIdList = [];
                return;
            }
            var _this = this;
            $.post({
                url: '/marketingActive/activeRun/asyncWorkSetting/getActModuleCutinIdList.ajax',
                data: { actId: curVal },
                success: function (result) {
                    if (result.error === 0) {
                        _this.diaActModuleCutinIdList = result.data;
                    }
                    else {
                        _this.diaActModuleCutinIdList = [];
                    }
                }
            });
        },
        diaActModuleCutinId: function (curVal, oldVal) {
            this.diaJobHandler = [];
            if (!curVal) {
                return;
            }
            var _this = this;
            $.post({
                url: '/marketingActive/activeRun/asyncWorkSetting/getJobHandler.ajax',
                data: { actModuleCutinId: curVal },
                success: function (result) {
                    if (result.error === 0) {
                        _this.diaJobHandler = result.data;
                    }
                }
            });
        }
    },
    methods: {
        getTableData: function (currentIndex) {
            var params = {};
            var _this = this;
            this.actId && (params.actId = this.actId);
            params.pageNo = currentIndex + 1;
            params.pageSize = this.pageMaxNum;
            $.post({
                url: '/marketingActive/activeRun/asyncWorkSetting/getTableData.ajax',
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
        enable: function (item) {
            var _this = this;
            var params = {};
            params.jobId = item.jobId;
            params.isEnable = item.isEnable;
            $.post({
                url: '/marketingActive/activeRun/asyncWorkSetting/enable.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0);
                    }
                    _this.showDialog('', 'info', false, result.msg);
                }
            });
        },
        setAddData: function (obj) {
            this.diaJobDesc = obj.jobDesc ? obj.jobDesc : '';
            this.diaChildJobId = obj.childJobId ? obj.childJobId : '';
            this.diaActId = obj.actId ? obj.actId : '';
            // console.log(this.diaActModuleCutinIdList)
            // this.diaActModuleCutinId = obj.actModuleCutinId ? obj.actModuleCutinId : '';
            // this.handler = obj.jobHandler ? obj.jobHandler : '';
            this.diaActModuleCutinId = '';
            this.handler = '';
            this.diaIsEnable = obj.isEnable ? obj.isEnable : 0;
            $('.cronValue').eq(0).val(obj.jobCron);
        },
        showAdd: function () {
            if (this.diaChildJobIdList.length == 0) {
                var _this = this;
                $.post({
                    url: '/marketingActive/activeRun/asyncWorkSetting/getChildJobIdList.ajax',
                    async: false,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.diaChildJobIdList = result.data;
                        }
                        else {
                            _this.diaChildJobIdList = [];
                        }
                    }
                });
            }
            if (this.diaActIdList.length == 0) {
                var _this = this;
                $.post({
                    url: '/marketingActive/activeRun/asyncWorkSetting/getActIdList.ajax',
                    async: false,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.diaActIdList = result.data;
                        }
                        else {
                            _this.diaActIdList = [];
                        }
                    }
                });
            }
            this.isUpdate = false;
            this.updateId = '';
            this.setAddData({});
            this.showDialog('', 'add');
        },
        showUpdate: function (item) {
            if (this.diaChildJobIdList.length == 0) {
                var _this = this;
                $.post({
                    url: '/marketingActive/activeRun/asyncWorkSetting/getChildJobIdList.ajax',
                    async: false,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.diaChildJobIdList = result.data;
                           
                        }
                        else {
                            _this.diaChildJobIdList = [];
                        }
                    }
                });
            }

            if (this.diaActIdList.length == 0) {
                var _this = this;
                $.post({
                    url: '/marketingActive/activeRun/asyncWorkSetting/getActIdList.ajax',
                    async: false,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.diaActIdList = result.data;
                           
                        }
                        else {
                            _this.diaActIdList = [];
                        }
                    }
                });
            }
            
            this.isUpdate = true;
            this.updateId = item.jobId;
            this.setAddData(item);
            this.showDialog('', 'add');
        },
        showDelete: function (id) {
            this.deleteId = id;
            this.showDialog('', 'del');
        },
        deleteData: function () {
            var _this = this;
            $.post({
                url: '/marketingActive/activeRun/asyncWorkSetting/delete.ajax',
                data: { jobId: this.deleteId },
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0);
                    }
                    _this.showDialog('del', 'info', false, result.msg);
                }
            });

        },
        diaInfoCheck: function () {
            if (!this.diaJobDesc) {
                this.showDialog('add', 'info', true, '任务描述不能为空');
                return false;
            }
            if (!this.diaActId) {
                this.showDialog('add', 'info', true, '关联活动不能为空');
                return false;
            }
            if (!this.diaActModuleCutinId) {
                this.showDialog('add', 'info', true, '执行的切点不能为空');
                return false;
            }
            if (!this.handler || this.handler == '该切点无处理器') {
                this.showDialog('add', 'info', true, '处理器不能为空');
                return false;
            }
            if (!$('.cronValue').eq(0).val()) {
                this.showDialog('add', 'info', true, '任务定时器不能为空');
                return false;
            }
            return true;
        },
        add: function () {
            var _this = this;
            if (this.diaInfoCheck()) {
                var params = {};
                params.jobDesc = this.diaJobDesc;
                params.childJobId = this.diaChildJobId;
                params.actId = this.diaActId;
                params.actModuleCutinId = this.diaActModuleCutinId;
                params.jobHandler = this.handler;
                params.isEnable = this.diaIsEnable;
                params.jobCron = $('.cronValue').eq(0).val();
                this.isUpdate && (params.jobId = this.updateId);
                var url = '/marketingActive/activeRun/asyncWorkSetting/';
                url += this.isUpdate ? 'update.ajax' : 'add.ajax';
                console.log(params)
                console.log(url)
                // return;
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