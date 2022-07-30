new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        tableData: [],
        diaMsg: '',
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        pageMaxNum: 10,
        condition: '',
        productList: [],
        productId: '',
        operationData: {
            agreementType: 0,
            productId: '',
            name: '',
            yield: '2',
            seqNo: ''
        },
        modifyData: {
            name:''
        },
        delId: ''
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
        pageMaxNum: function () {
            this.currentIndex = 0;
        },
        condition: function () {
            this.currentIndex = 0;
        },
        "operationData.name": function (newval) {
            this.operationData.name=newval.substring(0,15)
        },
        "modifyData.name": function (newval) {
            this.modifyData.name=newval.substring(0,15)
        }
    },

    mounted: function () {
        var dialogs = ['delete', 'info', 'operate', 'modify'];
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
        this.getTableData()

        $('#select2ProductList').chosen({
            search_contains: true,
            no_results_text: '未找到',
            disable_search_threshold: 6,
            width: '168px'
        });
        $('#select2ProductList').on('change', function (e, params) {
            this.operationData.productId = params ? params.selected : '';
        }.bind(this));
        this.getProductList()
    },
    methods: {
        //模板管理业务方法
        getTableData: function () {
            var url = '/publicConfig/salary/productConfig/tableData.ajax';
            var params = {
                agreementType: 0,
                pageNo: 1,
                pageSize: 9999
            }
            if (this.productId) {
                url = '/publicConfig/salary/productConfig/queryTableData.ajax';
                params = {
                    agreementType: 0,
                    productId: this.productId
                }
            }
            $.post({
                url: url,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.currentIndex = 0;
                        this.tableData = result.data;
                    } else {
                        this.showDialog('', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },
        getProductList: function () {
            $.post({
                url: '/publicConfig/salary/productConfig/productList.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        this.productList = result.data;
                        var str = '<option value="">请选择</option>';
                        result.data.forEach(function (item) {
                            str += '<option value="' + item.fundId + '">' + item.fundId + ' - ' + item.fundName + '</option>';
                        });
                        $('#select2ProductList').html(str);

                        $("#select2ProductList").trigger("chosen:updated");
                    } else {
                        this.showDialog('', 'info', true, result.msg);
                    }
                }.bind(this)
            });
        },
        showAdd: function () {
            $('#select2ProductList').val('');
            $("#select2ProductList").trigger("chosen:updated");
            this.operationData = {
                agreementType: 0,
                productId: '',
                name: '',
                yield: '2',
                seqNo: ''
            }
            this.showDialog('', 'operate');
        },
        upDateData: function () {
            if (!this.modifyData.seqNo) {
                this.showDialog('modify', 'info', true, '请填写展示序号');
                return
            }
            if (!this.modifyData.productId) {
                this.showDialog('modify', 'info', true, '请填写产品id');
                return
            }
            if (!this.modifyData.name) {
                this.showDialog('modify', 'info', true, '请填写展示名称');
                return
            }
            $.post({
                url: '/publicConfig/salary/productConfig/update.ajax',
                data: {
                    id: this.modifyData.id,
                    key: this.modifyData.productId + '-revenue',
                    value: this.modifyData.yield + ':' + this.modifyData.name,
                    seqNo: this.modifyData.seqNo
                },
                success: function (result) {
                    if (result.error === 0) {
                        this.getTableData()
                        this.showDialog('modify', 'info', false, result.msg);
                    } else {
                        this.showDialog('modify', 'info', true, result.msg);
                    }
                }.bind(this)
            });
        },
        showUpdate: function (item) {
            this.modifyData = Object.assign({}, item)
            this.showDialog('', 'modify');
        },
        add: function () {
            if (!this.operationData.seqNo) {
                this.showDialog('operate', 'info', true, '请填写展示序号');
                return
            }
            if (!this.operationData.productId) {
                this.showDialog('operate', 'info', true, '请填写产品id');
                return
            }
            if (!this.operationData.name) {
                this.showDialog('operate', 'info', true, '请填写展示名称');
                return
            }
            $.post({
                url: '/publicConfig/salary/productConfig/add.ajax',
                data: {
                    agreementType: this.operationData.agreementType,
                    productId: this.operationData.productId,
                    key: this.operationData.productId + '-revenue',
                    value: this.operationData.yield + ':' + this.operationData.name,
                    seqNo: this.operationData.seqNo
                },
                success: function (result) {
                    if (result.error === 0) {
                        this.getTableData()
                        this.showDialog('operate', 'info', false, result.msg);
                    } else {
                        this.showDialog('operate', 'info', true, result.msg);
                    }
                }.bind(this)
            });
        },
        showDelete: function (id) {
            this.delId = id;
            this.showDialog('', 'delete');
        },
        deleteData: function () {
            $.post({
                url: '/publicConfig/salary/productConfig/del.ajax',
                data: {
                    id: this.delId
                },
                success: function (result) {
                    if (result.error === 0) {
                        this.getTableData()
                        this.showDialog('delete', 'info', false, result.msg);
                    } else {
                        this.showDialog('delete', 'info', true, result.msg);
                    }
                }.bind(this)
            });
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
        }
    },
    filters: {
        yieldText: function (value) {
            if (value == 2) {
                return '近1个月';
            } else if (value == 3) {
                return '近3个月';
            } else if (value == 8) {
                return '近6个月';
            } else if (value == 4) {
                return '近1年';
            }
            return value;
        }
    }
});