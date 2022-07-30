

new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        tableData: [],
        diaMsg: '',

        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        pageMaxNum: '10',
        condition: '',
        qLineFundId: '',
        dataFlag: 'local',//数据来源
        classify: 'ALL',

        userId: '',
        qFundid: '',//查询
        qStatus: '',//查询
        flag: true,//判断通过还是驳回
        operationData: '',
        alwaysClick: true,//阻止连续点击
        remark: "",
        selectOption: {
            localFundIdList: [],//本地基金名称查询
            tanoList: [],
            fundtpList: [],
            sharetypeList: [
                { pmco: 'A', pmnm: '前收费' },
                { pmco: 'B', pmnm: '后收费' },
                { pmco: '*', pmnm: '前后端收费都支持' }
            ],
            lineFundIdList: []
        },
    },
    created() {
        var _this = this;
        $.post({//基金名称查询
            url: '/businessMgmt/IPOMgmtFD/IPOMgmtFundReview/collection.ajax',
            data: {
                fundTypeCustomized: this.classify
            },
            success: function (result) {
                if (result.error === 0) {
                    _this.selectOption.lineFundIdList = result.data
                } else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });
        $.post({//注册登记代码
            url: '/businessMgmt/IPOMgmtFD/IPOMgmtFundReview/selectOption.ajax',
            data: {
                pmst: 'SYSTEM',
                pmkey: 'TANO'
            },
            success: function (result) {
                if (result.error === 0) {
                    _this.selectOption.tanoList = result.data.map(function (item) {
                        return {
                            pmco: item.pmco,
                            pmnm: item.pmnm
                        }
                    })
                } else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });
        $.post({//公募基金展示类别
            url: '/businessMgmt/IPOMgmtFD/IPOMgmtFundReview/selectOption.ajax',
            data: {
                pmst: 'SYSTEM',
                pmkey: 'FUNDTP'
            },
            success: function (result) {
                if (result.error === 0) {
                    _this.selectOption.fundtpList = result.data.map(function (item) {
                        return {
                            pmco: item.pmco,
                            pmnm: item.pmnm
                        }
                    })
                } else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });
    },
    mounted: function () {
        var dialogs = ['info', 'operation', ''];
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
        this.getTableData(0, true);
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
    },
    watch: {
        pageMaxNum: function (val, oldval) {
            this.currentIndex = 0;
        },
        condition: function () {
            this.currentIndex = 0;
        },
        dataFlag: function () {
            this.getTableData(0)
        },
        classify: function (oldval, newval) {
            var _this = this;
            $.post({//基金名称查询
                url: '/businessMgmt/IPOMgmtFD/IPOMgmtFundReview/collection.ajax',
                data: {
                    fundTypeCustomized: newval
                },
                success: function (result) {
                    if (result.error === 0) {
                        _this.qLineFundId = ''
                        _this.selectOption.lineFundIdList = result.data
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        }
    },
    methods: {
        getTableData: function (currentIndex, load) {
            var params = {};
            var _this = this;
            if (this.dataFlag == 'line') {
                params.fundIdList = this.qLineFundId;
                url = '/businessMgmt/IPOMgmtFD/IPOMgmtFundReview/getLineList.ajax';
            } else {
                url = '/businessMgmt/IPOMgmtFD/IPOMgmtFundReview/getLocalList.ajax';
                params.service_id = this.qFundid;
                params.status = this.qStatus;
            }
            if (load) {
                params = {
                    service_id: '',
                    status: ''
                }
            }

            $.post({
                url: url,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.tableData = result.data;
                        _this.userId = result.userId;
                        if (load) {
                            _this.selectOption.localFundIdList = result.data.map(function (item) {
                                return {
                                    fundId: item.fundId,
                                    fundName: item.fundInfo.fundnm
                                }
                            })
                        }
                    } else {
                        _this.tableData = [];
                        _this.currentIndex = 0;
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },

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
        showOperation: function (item, flag) {
            if (item.status != 2) {
                return this.showDialog('', 'info', false, '不是未复核状态，不能复核');
            }
            this.flag = flag;
            this.operationData = item;
            this.showDialog('', 'operation');
        },
        rejectFund: function (item) {
            var _this = this;
            var params = {};
            params.service_id = item.service_id;
            params.local_id = item.local_id;
            params.update_timestamp = item.update_timestamp;
            params.operate = item.operate;
            params.content = JSON.stringify(item.content);

            params.operator = item.operator;
            params.remark = this.remark;
            if (this.alwaysClick) {
                this.alwaysClick = false;
                $.post({
                    url: '/businessMgmt/IPOMgmtFD/IPOMgmtFundReview/rejectFund.ajax',
                    data: params,
                    success: function (result) {
                        _this.alwaysClick = true;
                        _this.getTableData(_this.currentIndex)
                        if (result.error === 0) {
                            console.log(result)
                            _this.showDialog('operation', 'info', false, result.msg);
                        } else {
                            _this.showDialog('operation', 'info', false, result.msg);
                        }
                    }
                });
            }
        },
        passFund: function (item) {
            var _this = this;
            var params = {};
            params.service_id = item.service_id;
            params.local_id = item.local_id;
            params.update_timestamp = item.update_timestamp;
            params.operate = item.operate;
            params.operator = item.operator;
            params.status = item.status;
            params.content = JSON.stringify(item.content.fundExtension);

            if (this.alwaysClick) {
                this.alwaysClick = false;
                $.post({
                    url: '/businessMgmt/IPOMgmtFD/IPOMgmtFundReview/passFund.ajax',
                    data: params,
                    success: function (result) {
                        _this.alwaysClick = true;
                        _this.getTableData(_this.currentIndex)
                        if (result.error === 0) {
                            console.log(result)
                            _this.showDialog('operation', 'info', false, result.msg);
                        } else {
                            _this.showDialog('operation', 'info', false, result.msg);
                        }
                    }
                });
            }
        },
        windowGoTo: function (flag, item) {
            var service_id = item.fundId ? item.fundId : item.service_id;
            if (flag === 'Detail') {
                window.location.href = '/businessMgmt/IPOMgmtFD/IPOMgmtFundReview.html?pageType=Detail&service_id=' + service_id + '&local_id=' + item.local_id;
                return;
            }
        }
    },
    filters: {
        reviewStatus: function (value) {
            if (value == 0) {
                return '复核通过'
            } else if (value == 1) {
                return '编辑中'
            } else if (value == 2) {
                return '待复核'
            } else if (value == 9) {
                return '复核驳回'
            } else {
                return value;
            }
        },
        case: function (val, arr) {
            var str = val;
            if (Array.isArray(arr)) {
                arr.some(function (item) {
                    if (item.pmco == str) {
                        str = item.pmnm;
                        return true;
                    }
                })
            }
            if (!str) {
                str = '-'
            }
            return str;
        }
    },
    components: {
        vueSelect: vueSelect
    }
});

