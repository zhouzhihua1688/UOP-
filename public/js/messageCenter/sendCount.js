new Vue({
    el: '#content',
    data: {
        //查询数据
        ruleId: '',
        batchId: '',
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
    },
    watch: {
        ruleId: function (val, oldval) {
            this.batchId = '';
            this.batchList = [];
            this.batchInfo = {};
            var _this = this;
            $.post({
                url: '/messageCenter/sendCount/sendCount/getSearchList.ajax',
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
        //请求数据
        queryData: function () {
            if (!this.ruleId || !this.batchId) {
                this.showDialog('', 'info', false, '请先选择相关规则名称和批次ID');
                return;
            }
            var _this = this;
            $.post({
                url: '/messageCenter/sendCount/sendCount/search.ajax',
                data: {
                    batchId: _this.batchId,
                    ruleId: _this.ruleId,
                },
                success: function (result) {
                    if (result.error == 0) {
                        $.post({
                            url: '/messageCenter/sendCount/sendCount/getSearchList.ajax',
                            data: {
                                ruleId: _this.ruleId,
                            },
                            success: function (data) {
                                if (data.error == 0) {
                                    var arr = result.data;
                                    arr[0] && (arr[0].ruleName = data.data.ruleName);
                                    arr[0] && (arr[0].templateName = data.data.templateName);
                                    _this.tableData = arr;
                                }
                            }
                        });
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        add: function (index) {
            this.tableData[index].check = !this.tableData[index].check;
        },
        download: function () {
            if (!this.batchId || !this.ruleId) {
                this.showDialog('', 'info', false, '请选择相应批次和规则');
                return;
            }
            var _this = this;
            $.post({
                url: '/messageCenter/sendCount/sendCount/download.ajax',
                data: {
                    batchId: _this.batchId,
                    pageNo: 1,
                    pageSize: 100000,
                    ruleId: _this.ruleId,
                },
                success: function (result) {
                    if (result.error == 0) {
                        _this.exportCsv(result.data);
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        exportCsv: function (arr) {
            var str = '';
            var th = ['消息ID', '批次ID', '客户号', '规则ID', '模板ID', '分类ID', '模板类型', '标题', '内容', '跳转链接', '图片地址', '设备类型', '设备ID', '状态', '创建时间', '发送时间', '订阅号', '发送客群', '规则来源', '是否已读'];
            arr.forEach(function (item) {
                var propArr = [];
                for (var prop in item) {
                    if (typeof item[prop] == 'object') {
                        propArr.push('空');
                    }
                    else {
                        propArr.push(item[prop]);
                    }
                }
                str += (propArr.join(',').replace(/\n/g, '') + '\n');
            });
            str = th.join(',') + '\n' + str;
            var uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
            var downloadLink = document.createElement("a");
            downloadLink.href = uri;
            downloadLink.download = "消息发送统计.csv";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
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
        $('#ruleInfoList').chosen({
            search_contains:true,
            no_results_text: '未找到规则名称',
            disable_search_threshold: 10,
            width: '200px'
        });
        $('#ruleInfoList').on('change', function(e, params) {
            _this.ruleId = params ? params.selected : '';
        });
        $('#batchList').chosen({
            search_contains:true,
            no_results_text: '未找到批次ID',
            disable_search_threshold: 10,
            width: '150px'
        });
        $('#batchList').on('change', function(e, params) {
            _this.batchId = params ? params.selected : '';
        });
        if (this.ruleInfoList.length == 0) {
            var _this = this;
            $.post({
                url: '/messageCenter/sendCount/sendCount/getRuleInfoList.ajax',
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