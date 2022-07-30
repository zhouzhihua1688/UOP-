new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        tableData: [],
        diaMsg: '',
        categoryId: '',
        categoryList: [],
        phoneNum: '',
        deleteId: '',
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        pageMaxNum: 10,
        condition: '',
    },
    computed: {
        //主表格假分页
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
        }
    },
    watch: {
        // 假分页
        pageMaxNum: {
            handler: function (val, oldval) {
                this.currentIndex = 0;
                this.getTableData()
            }
        },
        condition: {
            handler: function (val, oldval) {
                this.currentIndex = 0;
            }
        },
    },
    mounted: function () {
        var _this = this;
        var dialogs = ['info', 'add', 'del'];
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
        this.getAddList();
        this.getTableData();
    },
    methods: {
        //查询
        getTableData: function () {
            var _this = this;
            $.post({
                url: '/messageCenter/blackListMgmt/unsubscribeQuery/getTableData.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        _this.tableData = result.data;
                    } else {
                        _this.tableData = [];
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        // 获取列表下拉框
        getAddList: function () {
            var _this = this;
            $.post({
                url: '/messageCenter/blackListMgmt/unsubscribeQuery/getAddList.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        _this.categoryList = result.data;
                    } else {
                        _this.tableData = [];
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        // 新增数据
        showAdd: function () {
            this.categoryId = '';
            this.phoneNum = '';
            this.showDialog('', 'add');
        },
        saveParam: function () {
            if(!this.categoryId){
                return this.showDialog('add', 'info', true, '请选择分类ID');
            }
            if(!this.phoneNum){
                return this.showDialog('add', 'info', true, '请填写手机号码');
            }
            if(!/^1(3[0-9]|5[0-3,5-9]|7[1-3,5-8]|8[0-9])\d{8}$/.test(this.phoneNum)){
                return this.showDialog('add', 'info', true, '手机号码格式有误');
            }
            var _this = this;
            var params = {};
            params.categoryId = this.categoryId;
            params.phoneNum = this.phoneNum;
            $.post({
                url: '/messageCenter/blackListMgmt/unsubscribeQuery/saveParam.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.categoryId = '';
                        _this.phoneNum = '';
                        _this.getTableData();
                    }
                    _this.showDialog('add', 'info', false, result.msg);
                }
            });
        },
        // 删除数据
        showDelete: function (item) {
            this.deleteId = item.id;
            this.showDialog('', 'del');
        },
        deleteList: function () {
            var _this = this;
            var params = {};
            params.id = this.deleteId
            $.post({
                url: '/messageCenter/blackListMgmt/unsubscribeQuery/deleteParam.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData();
                        _this.showDialog('del', 'info', false, result.msg);
                    }
                    _this.showDialog('del', 'info', false, result.msg);
                }
            });
        },
        //主表格假分页方法
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
    }
});