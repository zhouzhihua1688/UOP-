new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        actId: '',
        searchCondition: 'custNo',
        searchInput: '',
        preorderActId: '',
        takepartTotalNum: 0,
        reservedNum: 0,
        notReservedNum: 0,
        preorderStartTime: '',
        preorderEndTime: '',
        tableData: [],
        diaMsg: '',
        loadingShow: false,
        custNoList: [],
        downloadList: [],
        msgRuleId: '',
        msgRuleList: '',
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        pageMaxNum: 10,
        condition: ''
    },
    computed: {
        //主表格分页
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
        },
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
            } else if (this.currentIndex <= this.maxSpace && this.middleData.length - this.currentIndex > this.maxSpace) {
                for (var i = 0; i < this.currentIndex + (2 * this.maxSpace - this.currentIndex); i++) {
                    arr.push(i + 1);
                }
            } else if (this.currentIndex > this.maxSpace && this.middleData.length - this.currentIndex <= this.maxSpace) {
                var space = this.middleData.length - this.currentIndex;
                for (var i = this.currentIndex - (2 * this.maxSpace - space); i < this.middleData.length; i++) {
                    arr.push(i + 1);
                }
            } else {
                for (var i = 0; i < this.middleData.length; i++) {
                    arr.push(i + 1);
                }
            }
            return arr;
        },
        checkAll: function () {
            if (this.tableData.length > 0) {
                return this.tableData.every(function (item) {
                    return item.check;
                });
            }
            return false;
        }
    },
    watch: {},
    created: function () {
        if (this.getUrlParam('actId')) {
            this.actId = this.getUrlParam('actId');
            this.queryHeadData();
            this.queryHeadNum();
            this.search();
        }
        this.getDialogData();
    },
    mounted: function () {
        var dialogs = ['info', 'confirmTime', 'send'];
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
        // 初始化消息规则选择列表
        $('#msgRuleList').chosen({
            search_contains: true,
            no_results_text: '未找到该规则',
            disable_search_threshold: 6,
            width: '270px'
        });
        $('#msgRuleList').on('change', function (e, params) {
            this.msgRuleId = params ? params.selected : '';
        }.bind(this));
    },
    methods: {
        allCheck: function () {
            var flag = this.checkAll;
            this.tableData.forEach(function (item) {
                item.check = !flag;
            });
        },
        //模板管理业务方法
        search: function (id) {
            var _this = this;
            this.currentIndex = 0;
            var params = {
                preorderActId: this.actId,
                custNo: this.searchCondition == 'custNo' ? this.searchInput : '',
                phoneNum: this.searchCondition == 'phoneNum' ? this.searchInput : ''
            };
            var detailList = [];
            $.post({
                url: '/publicConfig/appointment/applyMgmt/queryListForDetail.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        detailList = result.data;
                        if(detailList.length>0){
                            detailList.forEach(function (item) {
                                if(item.custNo){
                                    item.custName = '';
                                    //判断是否实名
                                    params = {
                                        custNo: item.custNo,
                                    };
                                    $.post({
                                        url: '/publicConfig/appointment/applyMgmt/isRN.ajax',
                                        data: params,
                                        success: function (result) {
                                            if (result.error === 0) {
                                                //非实名时查询用户输入的名称
                                                if (result.data.custTp === 'NRN'){
                                                    params = {
                                                        custNo: item.custNo,
                                                    };
                                                    $.post({
                                                        url: '/publicConfig/appointment/applyMgmt/getUserName.ajax',
                                                        data: params,
                                                        success: function (result) {
                                                            if (result.error === 0 && result.data) {
                                                                item.custName = result.data.userName;
                                                            } else {
                                                                _this.showDialog('', 'info', false, result.msg);
                                                            }
                                                        }
                                                    });
                                                } else if(result.data.custTp === 'RN'){
                                                    item.custName = result.data.invNm;
                                                }
                                            } else {
                                                _this.showDialog('', 'info', false, result.msg);
                                            }
                                        }
                                    });
                                }
                            });
                            _this.tableData = detailList;
                        }
                    } else {
                        this.showDialog('', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },
        queryHeadNum: function () {
            var params = {
                preorderActId: this.actId
            };
            $.post({
                url: '/publicConfig/appointment/applyMgmt/queryListForDetail.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.reservedNum = result.data.filter(function (item) {
                            return item.takepartStatus == 1;
                        }).length;
                        this.notReservedNum = result.data.filter(function (item) {
                            return item.takepartStatus == 0;
                        }).length;
                    } else {
                        this.showDialog('', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },
        queryHeadData: function () {
            var params = {
                actId: this.actId
            };
            $.post({
                url: '/publicConfig/appointment/applyMgmt/query.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.takepartTotalNum = result.data[0].takepartTotalNum;
                        this.preorderStartTime = result.data[0].preorderStartTime;
                        this.preorderEndTime = result.data[0].preorderEndTime;
                    }
                }.bind(this)
            });
        },
        getDialogData: function () {
            $.post({
                url: '/publicConfig/appointment/applyMgmt/getDialogDataForDetail.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        this.msgRuleList = result.data;
                        var str = '<option value=""></option>';
                        this.msgRuleList.forEach(function (item) {
                            str += '<option value="' + item.ruleId + '">' + item.ruleName + '</option>';
                        });
                        $('#msgRuleList').html(str);
                        $('#msgRuleList').trigger('chosen:updated');
                    } else {
                        this.showDialog('', 'info', true, '获取消息规则列表失败！');
                    }
                }.bind(this)
            });
        },
        showSendMsg: function () {
            this.custNoList = this.tableData.filter(function (item) {
                return item.check
            });
            if (this.custNoList.length === 0) {
                this.showDialog('', 'info', false, '未选择要发送的客户');
                return;
            }
            $('.msgRuleList').val('');
            $('.msgRuleList').trigger('chosen:updated');
            this.showDialog('', 'send');
        },
        batchSendMessage: function () {
            if (!this.msgRuleId) {
                this.showDialog('send', 'info', true, '未选择消息规则');
                return;
            }
            var params = {
                custNoList: JSON.stringify(this.custNoList.map(function (item) {
                    return item.custNo;
                })),
                privilegeActId: this.actId,
                messageConfigId: this.msgRuleId
            };
            $.post({
                url: '/publicConfig/appointment/appointmentMgmt/batchSendMessageForDetail.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.showDialog('send', 'info', false, '批量发送成功');
                    } else {
                        this.showDialog('send', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },
        downloadExcel: function () {
            this.downloadList = this.tableData.filter(function (item) {
                return item.check
            });
            if (this.downloadList.length === 0) {
                this.showDialog('', 'info', false, '未选择要导出的数据');
                return;
            }
            this.loadingShow = true;
            setTimeout(function () {
                var wb = XLSX.utils.table_to_book(document.getElementById('data-table'), {sheet: 'Sheet JS'});
                XLSX.writeFile(wb, '预约导出_' + new Date().getTime() + '.xlsx');
                this.loadingShow = false;
            }.bind(this), 2000);

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
        //公共方法
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
        getUrlParam: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg); //匹配目标参数
            if (r != null) return unescape(r[2]);
            return '';
        }
    },
    components: {
        'date-picker': VueBootstrapDatetimePicker
    }
});
