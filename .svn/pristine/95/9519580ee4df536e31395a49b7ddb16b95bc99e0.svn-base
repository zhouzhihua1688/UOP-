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
        // 新增
        userName: '',
        privilegeSource: '',

        //查看修改
        viewChange: {
            privilegeSource: '',
        },
        deleteinfo: {}
    },
    mounted: function () {
        var dialogs = ['info', 'addNotice', 'changeNotice', 'deleteDialog'];
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
        $('.date-timepicker').datetimepicker({
            format: 'YYYY-MM-DD HH:mm:ss', //use this option to display seconds
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
        this.getTableData(0);
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
        }
    },
    methods: {


        getTableData: function (currentIndex) {
            var params = {};
            var _this = this;
            // params.pageNo = currentIndex + 1;
            // params.pageSize = this.pageMaxNum;
            $.post({
                url: '/clientMgmt/vipGrade/source/getList.ajax',
                // data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.tableData = result.data;
                        // _this.currentIndex = result.data.pageNum - 1;
                        // _this.totalPage = result.data.pages;
                        _this.userName = result.userName;
                        console.log(result)
                    } else {
                        _this.tableData = [];
                        _this.currentIndex = 0;
                        _this.totalPage = 0;
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
        add: function () {
            // if (!this.cutionPointKey) {
            //     this.showDialog('addNotice', 'info', true, '请填写唯一键');
            //     return;
            // }
            var params = {
                creator: this.userName,
                privilegeSource: this.privilegeSource,
                // deleteStatus: this.deleteStatus,

            };
            console.log(params)
            var _this = this;
            $.post({
                url: '/clientMgmt/vipGrade/source/dataAdd.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('addNotice', 'info', false, result.msg);
                        _this.getTableData(0)
                        _this.privilegeSource = '';
                        // _this.deleteStatus = false;
                        console.log(result)
                    } else {
                        _this.showDialog('addNotice', 'info', false, result.msg);
                    }
                }
            });
        },
        deleteDialog: function (id) {
            this.deleteinfo.id = id
            this.showDialog("", "deleteDialog")
        },
        deleteData: function () {
            var params = {
                id: this.deleteinfo.id,
                // modifyBy: this.userName
            };
            console.log(params)
            var _this = this;
            $.post({
                url: '/clientMgmt/vipGrade/source/dataDelete.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('deleteDialog', 'info', false, result.msg);
                        _this.getTableData(0)
                        console.log(result)
                    } else {
                        _this.showDialog('deleteDialog', 'info', false, result.msg);
                    }
                }
            });
        },
        showView: function (item) {
            this.viewChange.privilegeSource = item.privilegeSource
            this.viewChange.creator = item.creator
            this.viewChange.id = item.id
            this.showDialog('', 'changeNotice', false)
        },
        changeDate: function () {
            var params = {
                id: this.viewChange.id,
                privilegeSource: this.viewChange.privilegeSource,
                creator: this.viewChange.creator,
            };
            console.log(params)
            var _this = this;
            $.post({
                url: '/clientMgmt/vipGrade/source/dataChange.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('changeNotice', 'info', false, result.msg);
                        _this.getTableData(0)
                        console.log(result)
                    } else {
                        _this.showDialog('changeNotice', 'info', false, result.msg);
                    }
                }
            });
        }
    },
    filters: {
        setType: function (val) {
            if (val == '01') {
                return '信用卡额度'
            } else if (val == '02') {
                return '快取额度'
            } else if (val == '11') {
                return '申购优惠'
            } else if (val == '12') {
                return '认购优惠'
            } else {
                return val
            }

        }
    }
});