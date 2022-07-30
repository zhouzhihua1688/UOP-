new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        tableData: [],
        tableSelect: [],
        // table data
        page: 1,
        total: 0,
        allDate: '',
        records: 10,
        // conditionType: 0,
        currentIndex: 0,
        maxSpace: 5,
        // info
        diaMsg: '',
        // add
        addSign: [],
        addTableData: [],
        //修改
        compileNoticeId: '',
        //查询
        query: ''
    },
    computed: {
        allCheck: function () {
            if (this.tableSelect.length == this.tableData.length) {
                return true;

            } else {
                return false;

            }
        },
        pageList: function () {
            var arr = [];
            if (this.total <= 2 * this.maxSpace) {
                for (var i = 0; i < this.total; i++) {
                    arr.push(i + 1);
                }
                return arr;
            }
            if (this.currentIndex > this.maxSpace && this.total - this.currentIndex > this.maxSpace) {
                for (var i = this.currentIndex - this.maxSpace; i < this.currentIndex + this.maxSpace; i++) {
                    arr.push(i + 1);
                }
            } else if (this.currentIndex <= this.maxSpace && this.total - this.currentIndex > this.maxSpace) {
                for (var i = 0; i < this.currentIndex + (2 * this.maxSpace - this.currentIndex); i++) {
                    arr.push(i + 1);
                }
            } else if (this.currentIndex > this.maxSpace && this.total - this.currentIndex <= this.maxSpace) {
                var space = this.total - this.currentIndex;
                for (var i = this.currentIndex - (2 * this.maxSpace - space); i < this.total; i++) {
                    arr.push(i + 1);
                }
            } else {
                for (var i = 0; i < this.total; i++) {
                    arr.push(i + 1);
                }
            }
            return arr;
        }
    },
    watch: {
        records: {
            handler: function (val, oldval) {
                var params = {
                    page: 1,
                    rows: this.records,
                };
                this.getTableList(params);
                this.tableSelect = []
            }
        },
        total: function () {
            this.currentIndex = 0;
        },


    },
    mounted: function () {
        var _this = this;
        var dialogs = ['info', 'compileNotice', 'addNotice', 'select', 'deleteInfo'];
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
        var data =
            _this.getTableList({
                page: _this.page,
                rows: _this.records,
            });

    },

    methods: {
        //主表格分页方法
        selectAll: function () {
            var _this = this;
            if (this.allCheck) {
                this.tableData.forEach(function (item) {
                    item.check = false;
                    var _index = _this.inSelected(item, _this.tableSelect, 'id');
                    if (_index > -1) {
                        _this.tableSelect.splice(_index, 1);
                    }
                });
            } else {
                this.tableData.forEach(function (item) {
                    item.check = true;
                    var _index = _this.inSelected(item, _this.tableSelect, 'id');
                    if (_index == -1) {
                        _this.tableSelect.push(item);
                    }
                });
            }
        },
        prev: function () {
            this.currentIndex = this.currentIndex <= 0 ? 0 : this.currentIndex - 1;
            var params = {
                rows: this.records,
                page: this.currentIndex + 1,
            };
            this.getTableList(params);
            this.tableSelect = [];
        },
        next: function () {
            this.currentIndex = this.currentIndex >= this.total - 1 ? this.total - 1 : this.currentIndex + 1;
            var params = {
                rows: this.records,
                page: this.currentIndex + 1,
            };
            this.getTableList(params);
            this.tableSelect = [];
        },
        changeIndex: function (value, index) {
            this.currentIndex = value - 1;
            this.page = value;
            var params = {
                rows: this.records,
                page: this.page,
            };
            this.getTableList(params);
            this.tableSelect = [];
        },
        toFirst: function () {
            this.currentIndex = 0;
            var params = {
                rows: this.records,
                page: 1,
            };
            this.getTableList(params);
            this.tableSelect = [];
        },
        toLast: function () {
            this.currentIndex = this.total - 1;
            var params = {
                rows: this.records,
                page: this.total,
            };
            this.getTableList(params);
            this.tableSelect = [];
        },
        getTableList: function (params) {
            var _this = this;
            $.post({
                url: '/cashMgmt/livingPay/companyNotice/list.ajax',
                data: params ? params : {},
                success: function (result) {
                    console.log(result)
                    if (result.error == 0) {
                        var data = result.data;
                        _this.page = data.page;
                        _this.total = data.total;
                        _this.allDate = data.records;
                        _this.tableData = result.data.formList;
                        _this.tableSelect.forEach(function (item) {
                            var index = _this.inSelected(item, _this.tableData, 'id');
                            if (index > -1) {
                                _this.tableData[index].check = true;
                            }
                        });
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                },
                error: function () {
                    _this.showDialog('', 'info', false, result.msg);
                }
            });
        },
        select: function (index) {
            var item = this.tableData[index];
            item.check = !item.check;
            var _index = this.inSelected(item, this.tableSelect, 'id');
            if (item.check && _index == -1) {
                this.tableSelect.push(item);
            }
            if (!item.check && _index > -1) {
                this.tableSelect.splice(_index, 1);
            }
        },
        addSelectCheck: function (ind) { //新增选择
            var check = this.addTableData[ind].check
            if (check) {
                this.addTableData[ind].check = false;
            } else {
                this.addTableData[ind].check = true;
            }
            return;
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
        inSelected: function (item, arr, prop) {
            var _index = -1;
            arr.forEach(function (value, index) {
                if (item[prop] == value[prop]) {
                    _index = index;
                }
            });
            return _index;
        },
        addGetTable: function () {
            this.showDialog('', 'addNotice', false)
            this.addSign = [];
            var _this = this;
            $.post({
                url: '/cashMgmt/livingPay/companyNotice/selectlist.ajax',
                data: {
                    // rows: _this.allDate
                    rows: 999999
                },
                success: function (result) {
                    console.log(result)
                    if (result.error == 0) {
                        // var data = result.data;
                        _this.addTableData = result.data.formList;
                        _this.addTableData.forEach(function (item) {
                            item.check = false;
                        });
                    } else {
                        _this.showDialog('addNotice', 'info', false, result.msg);
                    }
                },
                error: function () {
                    _this.showDialog('addNotice', 'info', false, result.msg);
                }
            });
        },
        deleteNotice: function () { //删除提示
            var _this = this;
            if (_this.tableSelect.length <= 0) {
                _this.showDialog('', 'info', true, '请至少选择一条数据进行删除');
                return false;
            }
            var ind = this.tableSelect.length;

            _this.showDialog("", "deleteInfo", false, '确认删除这' + ind + '条公告吗？');
        },
        confirmDelete: function () { //确定删除
            var _this = this,
                ids = [],
                data;
            this.tableSelect.forEach(function (val, ind) {
                ids.push(val.id)
            })
            ids = ids.join(',')
            data = {
                ids
            }
            $.ajax({
                type: "post",
                data: data,
                url: '/cashMgmt/livingPay/companyNotice/delete.ajax',
                success: function (result) {
                    if (result.error == 0) {
                        _this.tableSelect = [];
                        _this.showDialog('deleteInfo', 'info', false, result.msg);
                        _this.getTableList({
                            page: _this.page,
                            rows: _this.records,
                        }) //重新获取列表数据
                        _this.currentIndex = 0;
                    } else {
                        _this.showDialog('deleteInfo', 'info', false, result.msg);
                    }
                },
                error: function () {
                    _this.showDialog('deleteInfo', 'info', false, result.msg);
                }
            });
        },
        compileNotice: function (id, content, startTime, endTime) { //修改弹窗
            this.companyNoticeId = id;
            this.addSign = [];
            this.$refs.compileStartTime.value = startTime;
            this.$refs.compileEndTime.value = endTime;
            this.$refs.compileContent.value = content;
            this.showDialog('', 'compileNotice', false);
            var _this = this;
            $.post({
                url: '/cashMgmt/livingPay/companyNotice/queryOne.ajax',
                data: {
                    id: id
                },
                success: function (result) {
                    console.log(result)
                    if (result.error == 0) {
                        _this.addSign = result.data.companyPauseIds
                    } else {
                        _this.showDialog('addNotice', 'info', false, result.msg);
                    }
                },
                error: function () {
                    _this.showDialog('addNotice', 'info', false, result.msg);
                }
            });

            $.post({
                url: '/cashMgmt/livingPay/companyNotice/selectlist.ajax',
                data: {
                    // rows: _this.allDate
                    rows: 999999
                },
                success: function (result) {
                    console.log(result)
                    if (result.error == 0) {
                        // var data = result.data;
                        _this.addTableData = result.data.formList;
                        _this.addTableData.forEach(function (item) {
                            item.check = false;
                        });
                        if (_this.addSign) {
                            _this.addTableData.forEach((val, ind) => {
                                if (_this.addSign.includes(val.id)) {
                                    val.check = true;
                                }
                            })
                        }
                    } else {
                        _this.showDialog('addNotice', 'info', false, result.msg);
                    }
                },
                error: function () {
                    _this.showDialog('addNotice', 'info', false, result.msg);
                }
            });
        },
        keepNotice: function () { //保存修改
            var start = this.$refs.compileStartTime.value,
                end = this.$refs.compileEndTime.value,
                content = this.$refs.compileContent.value,
                _this = this;
            if (start == "" || end == "") {
                this.showDialog('compileNotice', 'info', true, '请选择时间');
                return;
            }

            var data = {
                companyPauseIds: _this.addSign,
                id: this.companyNoticeId,
                content: content,
                releaseEndTime: end,
                releaseStartTime: start
            }
            // data.companyPauseIds = [0];
            data.companyPauseIds = JSON.stringify(data.companyPauseIds)
            $.ajax({
                type: "post",
                data: data,
                traditional: true,
                url: '/cashMgmt/livingPay/companyNotice/compile.ajax',
                success: function (result) {
                    if (result.error == 0) {
                        _this.tableSelect = [];
                        _this.showDialog('compileNotice', 'info', false, result.msg);
                        _this.getTableList({
                            page: _this.page,
                            rows: _this.records,
                        }) //重新获取列表数据
                        console.log({
                            page: _this.page,
                            rows: _this.records,
                        })
                    } else {
                        _this.showDialog('compileNotice', 'info', false, result.msg);
                    }
                },
                error: function () {
                    _this.showDialog('compileNotice', 'info', false, result.msg);
                }
            });
        },
        addSelect: function () { //新增选择
            var _this = this,
                arr = []
            if (_this.addTableData) {
                _this.addTableData.forEach(function (val) {
                    if (val.check) {
                        arr.push(val.id)
                    }
                })
                _this.addSign = arr;
            }
        },
        add: function () { //确定新增
            var _this = this,
                start = this.$refs.addStartTime.value,
                end = this.$refs.addEndTime.value,
                content = this.$refs.addContent.value,
                _this = this;
            if (start == "" || end == "") {
                this.showDialog('addNotice', 'info', true, '请选择时间');
                return;
            }
            console.log('_this.addSign=', _this.addSign)
            var data = {
                companyPauseIds: _this.addSign,
                content: content,
                releaseEndTime: end,
                releaseStartTime: start
            }
            data.companyPauseIds = JSON.stringify(data.companyPauseIds)
            console.log(data)
            $.ajax({
                type: "post",
                data: data,
                traditional: true,
                url: '/cashMgmt/livingPay/companyNotice/compile.ajax',
                success: function (result) {
                    if (result.error == 0) {
                        _this.tableSelect = [];
                        _this.showDialog('addNotice', 'info', false, result.msg);
                        _this.getTableList({
                            page: _this.page,
                            rows: _this.records,
                        }) //重新获取列表数据
                        console.log(result)
                    } else {
                        _this.showDialog('addNotice', 'info', false, result.msg);
                    }
                },
                error: function () {
                    _this.showDialog('addNotice', 'info', false, result.msg);
                }
            });
        },
        queryNotice: function () { //查询
            // if (this.query == '') {
            //     this.showDialog('', 'info', false, '请输入查询内容');
            //     return;
            // }
            var _this = this,
                data = {
                    page: _this.page,
                    rows: this.records
                };
            data.searchField = _this.query;
            $.ajax({
                type: "post",
                data: data,
                url: '/cashMgmt/livingPay/companyNotice/list.ajax',
                success: function (result) {
                    if (result.error == 0) {
                        _this.tableData = result.data.formList
                        _this.total = result.data.total
                        console.log(result)
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                },
                error: function () {
                    _this.showDialog('', 'info', false, result.msg);
                }
            });
        }

    }

});