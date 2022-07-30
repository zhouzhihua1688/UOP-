new Vue({
    el: '#content',
    data: {
        //查询数据
        ruleId: '',
        batchId: '',
        custNo: '',
        ruleSource: '',
        status: '',
        diaMsg: '',
        // ruleName: '',
        templateId: '',
        // templateName: '',
        tableData: [],
        ruleInfoList: [],
        batchList: [],
        batchInfo: {
            templateId: '',
            templateName: ''
        },
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        pageMaxNum: '10',
    },
    watch: {
        pageMaxNum: function () {
            this.currentIndex = 0;
        },
        ruleId: function (val, oldval) {
            this.batchId = '';
            this.batchList = [];
            this.batchInfo = {};
            var _this = this;
            $.post({
                url: '/messageCenter/sendCount/WXSearch/getSearchList.ajax',
                data: {
                    ruleId: val,
                },
                success: function (result) {
                    if (result.error == 0) {
                        _this.batchList = result.data.batchList;
                        _this.batchInfo = result.data.batchInfo;
                        var str = '<option value=""></option>';
                        result.data.batchList.forEach(function (value) {
                            str += '<option value="' + value + '">' + value + '</option>';
                        });
                        $('#batchList').html(str);
                        $("#batchList").trigger("chosen:updated");
                    }
                }
            });
        }
    },
    computed: {
        pageList: function () {
            var arr = [];
            if (this.middleData.length <= 2 * this.maxSpace) {
                for (var i = 0; i < this.middleData.length; i++) {
                    arr.push(i + 1);
                }
                return arr;
            }
            if (this.currentIndex > this.maxSpace && this.middleData.length - this.currentIndex > this.maxSpace) {
                for (var i = this.currentIndex - this.maxSpace; i < this.currentIndex + this.maxSpace; i++) {
                    arr.push(i + 1);
                }
            }
            else if (this.currentIndex <= this.maxSpace && this.middleData.length - this.currentIndex > this.maxSpace) {
                for (var i = 0; i < this.currentIndex + (2 * this.maxSpace - this.currentIndex); i++) {
                    arr.push(i + 1);
                }
            }
            else if (this.currentIndex > this.maxSpace && this.middleData.length - this.currentIndex <= this.maxSpace) {
                var space = this.middleData.length - this.currentIndex;
                for (var i = this.currentIndex - (2 * this.maxSpace - space); i < this.middleData.length; i++) {
                    arr.push(i + 1);
                }
            }
            else {
                for (var i = 0; i < this.middleData.length; i++) {
                    arr.push(i + 1);
                }
            }
            return arr;
        },
        middleData: function () {
            var middleData = [];
            var pageMaxNum = parseInt(this.pageMaxNum);
            var _this = this;
            if (this.tableData.length <= pageMaxNum) {
                middleData.push(this.tableData);
                return middleData;
            }
            else {
                var i = 0;
                while ((i + 1) * pageMaxNum < this.tableData.length) {
                    middleData.push(this.tableData.slice(i * pageMaxNum, (i + 1) * pageMaxNum));
                    i++;
                }
                middleData.push(this.tableData.slice(i * pageMaxNum, this.tableData.length));
                return middleData;
            }
        },
        viewData: function () {
            var currentIndex = parseInt(this.currentIndex);
            return this.middleData[currentIndex];
        },
        templateInfo: function () {
            if (!this.batchId || Object.keys(this.batchInfo).length == 0) {
                return {
                    templateId: '',
                    templateName: ''
                };
            }
            return this.batchInfo[this.batchId.toString()];
        }
    },
    methods: {
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
            this.currentIndex <= 0 ? 0 : this.currentIndex--;
        },
        next: function () {
            this.currentIndex >= this.middleData.length - 1 ? this.middleData.length - 1 : this.currentIndex++;
        },
        changeIndex: function (index) {
            this.currentIndex = index - 1;
        },
        toFirst: function () {
            this.currentIndex = 0;
        },
        toLast: function () {
            this.currentIndex = this.middleData.length - 1;
        },
        //请求数据
        queryData: function () {
            if (!$('#beginTime').val()) {
                this.showDialog('', 'info', false, '开始时间不能为空');
                return false;
            }
            // if (!this.custNo && !this.batchId && !this.ruleId && !this.ruleSource) {
            //     this.showDialog('', 'info', false, '客户号和规则来源为空的情况下必须选择规则ID和对应批次号');
            //     return false;
            // }
            // if (!this.custNo && this.batchId && !this.ruleId) {
            //     this.showDialog('', 'info', false, '客户号为空的情况下必须选择规则ID');
            //     return false;
            // }
            // if (!this.custNo && !this.batchId && this.ruleId) {
            //     this.showDialog('', 'info', false, '客户号为空的情况下必须选择批次号');
            //     return false;
            // }
            if (!this.custNo) {
                this.showDialog('', 'info', false, '客户号不能为空');
                return false;
            }
            this.currentIndex = 0;
            var _this = this;
            $.post({
                url: '/messageCenter/sendCount/WXSearch/search.ajax',
                data: {
                    batchNo: _this.batchId,
                    custNo: _this.custNo,
                    ruleSource: _this.ruleSource,
                    status: _this.status,
                    beginTime: $('#beginTime').val(),
                    endTime: $('#endTime').val(),
                    ruleId: _this.ruleId,
                },
                success: function (result) {
                    if (result.error == 0) {
                        _this.tableData = result.data;
                        if(result.data.length == 0){
                            _this.showDialog('', 'info', false, '查询成功,暂无数据');
                        }
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        }
    },
    mounted: function () {
        var dialogs = ['info'];
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
        var _this = this;
        $('#ruleInfoList').chosen({
            search_contains: true,
            allow_single_deselect: true,
            no_results_text: '未找到规则名称',
            disable_search_threshold: 10,
            width: '200px'
        });
        $('#ruleInfoList').on('change', function (e, params) {
            _this.ruleId = params ? params.selected : '';
        });
        $('#batchList').chosen({
            search_contains: true,
            allow_single_deselect: true,
            no_results_text: '未找到批次ID',
            disable_search_threshold: 10,
            width: '150px'
        });
        $('#batchList').on('change', function (e, params) {
            _this.batchId = params ? params.selected : '';
        });
        $('.date-timepicker').datetimepicker({
            format: 'YYYY-MM-DD',//use this option to display seconds
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
        if (this.ruleInfoList.length == 0) {
            $.post({
                url: '/messageCenter/sendCount/WXSearch/getRuleInfoList.ajax',
                success: function (result) {
                    if (result.error == 0) {
                        _this.ruleInfoList = result.data;
                        var str = '<option value=""></option>';
                        result.data.forEach(function (item) {
                            str += '<option value="' + item.ruleId + '">' + item.ruleName + '</option>';
                        });
                        $('#ruleInfoList').html(str);
                        $("#ruleInfoList").trigger("chosen:updated");
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        }
    }
});