new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        key: '',
        keyword:'',
        updateId: '',
        deleteId: '',
        tableData: [],
        diaMsg: '',
        // 新增弹窗相关数据
        dialog_item: '',
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        pageMaxNum: 10,
        condition: '',
    },
    computed: {
        //主表格分页
        middleData: function() {
            var middleData = [];
            var filterData = [];
            var pageMaxNum = parseInt(this.pageMaxNum);
            var _this = this;
            this.tableData.forEach(function(jsonObj) {
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
        viewData: function() {
            var currentIndex = parseInt(this.currentIndex);
            return this.middleData[currentIndex];
        },
        pageList: function() {
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
        pageMaxNum: function() {
            this.currentIndex = 0;
        },
        condition: function() {
            this.currentIndex = 0;
        }
    },
    created: function() {
        this.search();
    },
    mounted: function() {
        var _this = this;
        var dialogs = ['delete', 'info', 'operate'];
        dialogs.forEach(function(id) {
            $('#' + id).on('shown.bs.modal', function() {
                var $this = $(this);
                var dialog = $this.find('.modal-dialog');
                var top = ($(window).height() - dialog.height()) / 2;
                dialog.css({
                    marginTop: top
                });
            });
        });
    },
    methods: {
        //模板管理业务方法
        search: function() {
            this.currentIndex = 0;
            var _this = this;
            var params = {};
            params.key = this.key;
            $.post({
                url: '/publicConfig/appSearchConfig/directionalSearchConfig/query.ajax',
                data: params,
                success: function(result) {
                    if (result.error === 0) {
                        _this.tableData = result.data;
                        _this.tableData.sort(_this.compare("id",false))
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        compare:function(property,desc) {
            return function (a, b) {
                var value1 = a[property];
                var value2 = b[property];
                if(desc==true){
                    // 升序排列
                    return value1 - value2;
                }else{
                    // 降序排列
                    return value2 - value1;
                }
            }
        },
        clearAddDia: function() {
            this.dialog_item = '';
            this.keyword='';
        },
        showAdd: function() {
            this.clearAddDia();
            this.updateId = '';
            this.showDialog('', 'operate');
        },
        showUpdate: function(item) {
            this.updateId = item.id;
            this.keyword=item.keyword;
            this.dialog_item = item.item;
            this.showDialog('', 'operate');
        },
        checkDiaData: function() {
            if (this.keyword === '') {
                this.showDialog('operate', 'info', true, '关键词不能为空');
                return false;
            }
            return true;
        },
        add: function() {
            if (!this.checkDiaData()) {
                return;
            }
            var _this = this;
            var params = {};
            params.item = this.dialog_item;
            params.keyword = this.keyword;
            var url = '/publicConfig/appSearchConfig/directionalSearchConfig/add.ajax';
            if(this.updateId){
                params.id = this.updateId;
                url = '/publicConfig/appSearchConfig/directionalSearchConfig/update.ajax';
            }
            $.post({
                url: url,
                data: params,
                success: function(result) {
                    if (result.error === 0) {
                        _this.search();
                        _this.showDialog('operate', 'info', false, result.msg);
                    } else {
                        _this.showDialog('operate', 'info', true, result.msg);
                    }
                }
            });
        },
        showDelete: function(item) {
            this.deleteId = item.id;
            this.showDialog('', 'delete');
        },
        deleteData: function() {
            var _this = this;
            $.post({
                url: '/publicConfig/appSearchConfig/directionalSearchConfig/del.ajax',
                data: {
                    id: this.deleteId
                },
                success: function(result) {
                    if (result.error === 0) {
                        _this.search();
                        _this.showDialog('delete', 'info', false, result.msg);
                    } else {
                        _this.showDialog('delete', 'info', true, result.msg);
                    }
                }
            });
        },
        //主表格分页方法
        prev: function() {
            this.currentIndex <= 0 ? 0 : this.currentIndex--;
        },
        next: function() {
            this.currentIndex >= this.middleData.length - 1 ? this.middleData.length - 1 : this.currentIndex++;
        },
        changeIndex: function(index) {
            this.currentIndex = index - 1;
        },
        toFirst: function() {
            this.currentIndex = 0;
        },
        toLast: function() {
            this.currentIndex = this.middleData.length - 1;
        },
        //公共方法
        showDialog: function(dia1, dia2, callback, msg) {
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
                $('#' + dia1).on("hidden.bs.modal", function() {
                    $('#' + dia2).modal('show');
                    $('#' + dia1).off().on("hidden", "hidden.bs.modal");
                });
                $('#' + dia1).modal('hide');
            } else {
                $('#' + dia1).on("hidden.bs.modal", function() {
                    $('#' + dia2).on("hidden.bs.modal", function() {
                        $('#' + dia1).modal("show");
                        $('#' + dia2).off().on("hidden", "hidden.bs.modal");
                    });
                    $('#' + dia2).modal("show");
                    $('#' + dia1).off().on("hidden", "hidden.bs.modal");
                });
                $('#' + dia1).modal('hide');
            }
        }
    }
});
