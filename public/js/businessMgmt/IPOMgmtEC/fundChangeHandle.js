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


        userId: '',
        type: '',//操作类型
        classify: 'ALL',
        dataFlag: 'local',//数据来源
        qStatus: '',//审核状态查询
        qLineFundId: '',//基金名称查询
        qLocalFundId: '',//基金名称查询

        updateTime: '',//数据更新时间

        selectOption: {//选项
            lineFundIdList: [],//线上基金名称查询
            localFundIdList: [],//本地基金名称查询
        },
        dialogData: {},//删除
        modifyS: true,//新增修改状态
        dataId: '',//修改时的本地sql ID
        backoutData: '',
        addOption: [],//新增选择
        fundid: '',//转出
        ofundid: '',//转入.

    },
    created: function () {
        var _this = this;
        $.post({//基金名称查询
            url: '/businessMgmt/IPOMgmtEC/fundChangeHandle/collection.ajax',
            data: {
                fundTypeCustomized: this.classify
            },
            success: function (result) {
                if (result.error === 0) {
                    _this.selectOption.lineFundIdList = result.data
                    _this.addOption = result.data
                    console.log('基金名称查询', result)
                } else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });
    },
    mounted: function () {

        var dialogs = ['info', 'dialogData', 'add'];
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
            if (newval == 'line') {
                if (this.qLineFundId != '') {
                    this.getTableData(0)
                } else {
                    this.currentIndex = 0
                    this.tableData = []

                }
            } else {
                this.getTableData(0)
            }
        },
        classify: function (oldval, newval) {
            var _this = this;
            $.post({//基金名称查询
                url: '/businessMgmt/IPOMgmtEC/fundChangeHandle/collection.ajax',
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
            var url;
            if (this.dataFlag == 'line') {
                params.fundid = this.qLineFundId;
                url = '/businessMgmt/IPOMgmtEC/fundChangeHandle/getLineList.ajax';
            } else {
                url = '/businessMgmt/IPOMgmtEC/fundChangeHandle/getLocalList.ajax';
                params.fundid = this.qLocalFundId;
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
                        _this.userId = result.userId;
                        if (load) {
                            _this.selectOption.localFundIdList = result.data.map(function (item) {
                                return {
                                    fundid: item.fundid,
                                    ofundid: item.fundid
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
        show: function (item, type) {
            this.type = type;
            this.dialogData = item;
            this.showDialog('', 'dialogData', false);
        },
        deleteFund: function () {
            var _this = this;
            var params = {
                fundid: this.dialogData.fundid,
                ofundid: this.dialogData.ofundid,
                serialno: this.dialogData.serialno
            }
            $.ajax({
                url: '/businessMgmt/IPOMgmtEC/fundChangeHandle/deleteFund.ajax',
                type: 'POST',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        _this.showDialog('dialogData', 'info', false, result.msg);
                        _this.getTableData(_this.currentIndex, true)
                    } else {
                        _this.showDialog('dialogData', 'info', false, result.msg);
                    }
                },
                error: function () {
                    _this.showDialog('dialogData', 'info', false, '删除失败');
                }
            })

        },
        add: function () {
            var _this = this;
            if (this.fundid && this.ofundid) {
                if (this.fundid === this.ofundid) {
                    return this.showDialog('add', 'info', true, '转入，转出不能相同');
                }
            } else {
                return this.showDialog('add', 'info', true, '请选择');
            }
            var params = {
                fundid: this.fundid,
                ofundid: this.ofundid
            }
            $.ajax({
                url: '/businessMgmt/IPOMgmtEC/fundChangeHandle/add.ajax',
                type: 'POST',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        _this.showDialog('add', 'info', false, result.msg);
                        _this.getTableData(_this.currentIndex, true)
                    } else {
                        _this.showDialog('add', 'info', true, result.msg);
                    }
                }
            })

        },
        submit: function () {
            var _this = this;

            var params = {
                local_id: this.dialogData.local_id,
                update_timestamp: this.dialogData.update_timestamp
            }
            $.ajax({
                url: '/businessMgmt/IPOMgmtEC/fundChangeHandle/submit.ajax',
                type: 'POST',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        _this.showDialog('dialogData', 'info', false, result.msg);
                        _this.getTableData(_this.currentIndex, true)
                    } else {
                        _this.showDialog('dialogData', 'info', false, result.msg);
                    }
                },
                error: function () {
                    _this.showDialog('dialogData', 'info', false, '提交失败');
                }
            })
        },
        backout: function (item) {
            var _this = this;
            var params = {
                local_id: this.dialogData.local_id,
                update_timestamp: this.dialogData.update_timestamp
            }
            $.ajax({
                url: '/businessMgmt/IPOMgmtEC/fundChangeHandle/backout.ajax',
                type: 'POST',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        _this.showDialog('dialogData', 'info', false, result.msg);
                        _this.getTableData(_this.currentIndex, true)
                    } else {
                        _this.showDialog('dialogData', 'info', false, result.msg);
                    }
                },
                error: function () {
                    _this.showDialog('dialogData', 'info', false, '删除失败');
                }
            })
        }
    },
    filters: {
        reviewStatus: function (value) {
            if (value == 0) {
                return '复核通过'
            } else if (value == 1) {
                return '待提交'
            } else if (value == 2) {
                return '待复核'
            } else if (value == 9) {
                return '复核驳回'
            } else {
                return value;
            }
        },
        reviewType: function (value) {
            if (value == 1) {
                return '新增'
            } else if (value == 3) {
                return '删除'
            } else {
                return value;
            }
        }
    },
    components: {
        vueSelect: vueSelect
    }

});
