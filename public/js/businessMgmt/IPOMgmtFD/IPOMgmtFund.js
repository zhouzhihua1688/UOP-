
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

        userid: '',
        dataFlag: 'local',//数据来源
        qStatus: '',//审核状态查询
        classify: 'ALL',
        qLineFundId: '',//基金名称查询
        qLocalFundId: '',//基金名称查询
        selectOption: {
            lineFundIdList: [],//线上基金名称查询
            localFundIdList: [],//本地基金名称查询
            tanoList: [],
            fundtpList: [],
            sharetypeList: [
                { pmco: 'A', pmnm: '前收费' },
                { pmco: 'B', pmnm: '后收费' },
                { pmco: '*', pmnm: '前后端收费都支持' }
            ]
        },
        deleteData: {}
    },
    created: function () {
        var _this = this;
        $.post({//基金名称查询
            url: '/businessMgmt/IPOMgmtFD/IPOMgmtFund/collection.ajax',
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
            url: '/businessMgmt/IPOMgmtFD/IPOMgmtFund/selectOption.ajax',
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
            url: '/businessMgmt/IPOMgmtFD/IPOMgmtFund/selectOption.ajax',
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
        var dialogs = ['info', 'delectDia', ''];
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
        dataFlag: function (newval, oldval) {
            this.getTableData(0)
        },
        classify: function (oldval, newval) {
            var _this = this;
            $.post({//基金名称查询
                url: '/businessMgmt/IPOMgmtFD/IPOMgmtFund/collection.ajax',
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

            // params.pageNo = currentIndex + 1;
            // params.pageSize = this.pageMaxNum;
            var url;
            if (this.dataFlag == 'line') {
                params.fundIdList = this.qLineFundId;
                url = '/businessMgmt/IPOMgmtFD/IPOMgmtFund/getLineList.ajax';
            } else {
                url = '/businessMgmt/IPOMgmtFD/IPOMgmtFund/getLocalList.ajax';
                params.service_id = this.qLocalFundId;
                params.status = this.qStatus;
            }
            $.post({
                url: url,
                // traditional: true,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.currentIndex = 0
                        _this.tableData = result.data;
                        _this.userid = result.userid;
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
        windowGoTo: function (url, fund) {
            var service_id = fund.fundId ? fund.fundId : fund.service_id
            var flag = this.selectOption.localFundIdList.some(function (item) {
                return service_id == item.fundId
            })
            if (flag && this.dataFlag === 'line') {
                return this.showDialog('', 'info', false, '本地数据存在该基金，请到本地数据操作');
            }
            if (url === 'Detail') {
                window.location.href = '/businessMgmt/IPOMgmtFD/IPOMgmtFund.html?pageType=Detail&service_id=' + service_id + '&local_id=' + fund.local_id;
                return;
            }
            if (this.dataFlag == 'local') {
                window.location.href = '/businessMgmt/IPOMgmtFD/IPOMgmtFund.html?pageType=' + url + '&address=' + this.dataFlag + '&service_id=' + service_id + '&local_id=' + fund.local_id;
            } else {
                window.location.href = '/businessMgmt/IPOMgmtFD/IPOMgmtFund.html?pageType=' + url + '&address=' + this.dataFlag + '&service_id=' + service_id;
            }
        },
        deleteFlag: function (item) {
            this.deleteData = item;
            this.showDialog('', 'delectDia', false);
        },
        deleteFund: function () {
            var _this = this;
            var params = {
                local_id: this.deleteData.local_id,
                update_timestamp: this.deleteData.update_timestamp
            }
            $.ajax({
                url: '/businessMgmt/IPOMgmtFD/IPOMgmtFund/deleteFund.ajax',
                type: 'POST',
                data: params,
                success: function (result) {
                    _this.getTableData(_this.currentIndex, true)
                    if (result.error == 0) {
                        _this.showDialog('delectDia', 'info', false, result.msg);
                        _this.getTableData(_this.currentIndex)
                    } else {
                        _this.showDialog('delectDia', 'info', false, result.msg);
                    }
                },
                error: function () {
                    _this.showDialog('delectDia', 'info', false, '删除失败');
                }
            })

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

