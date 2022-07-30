new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        tableData: [],
        upFormData: {},
        diaMsg: '',
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10,
        condition: "",

    },

    mounted: function () {
        this.getTableData(0);
        var dialogs = ['info', 'add', 'del', 'revise', 'detail', 'modify', 'delete', 'putAdd', 'delete2'];
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
    },
    watch: {
        // pageMaxNum: function () {
        //     this.getTableData(0);
        // },

        // 假分页
        pageMaxNum: {
            handler: function (val, oldval) {
                this.currentIndex = 0;
                // this.getTableData(0, this.type)
            }
        },
        condition: {
            handler: function (val, oldval) {
                this.currentIndex = 0;
            }
        },
    },
    methods: {
        getTableData: function (currentIndex) {
            var _this = this;
            var params = {};
            // params.pageNum = currentIndex + 1;
            // params.pageSize = this.pageMaxNum;
            this.currentIndex = 0;
            $.post({
                url: '/businessMgmt/fundTag/filterMgmt/getTableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.tableData = result.data.body;
                    } else {
                        _this.tableData = [];
                        _this.currentIndex = 0;
                        _this.totalPage = 0;
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        // 新增
        showAdd: function () {
            var _this = this;
            _this.showDialog('', 'add', false);
        },
        // 修改
        showUpdate: function (item) {
            var _this = this
            this.upFormData = item
            _this.showDialog('', 'revise', false);
        },
        changeStatus(item) {
            console.log('changeStatus', item)
            if (item.status == "Y") {
                item.status = "N"
            } else if (item.status == "N") {
                item.status = "Y"

            }
            this.update(item)
        },
        update: function (item) {
            var _this = this
            var data = {}
            var pop = ''
            if (item) {
                // changeStatus
                data = item
            } else {
                // 修改
                data = this.upFormData
                pop = 'revise'
            }
            console.log(data)
            $.post({
                url: '/businessMgmt/fundTag/filterMgmt/upCondition.ajax',
                data,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0)
                        _this.showDialog(pop, 'info', false, result.msg);
                    }
                    // _this.getTableData(0)
                    // _this.showDialog(pop, 'info', true, result.msg);
                }
            });
        },

        jumpUrl: function ({labelCode, conditionName,isAdd,opType}) {
            window.location.href = '/businessMgmt/fundTag/filterMgmt.html?pageType=Details&labelCode=' + labelCode + '&conditionName=' + conditionName+'&isAdd='+isAdd+'&opType='+opType;
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
    },
    // 类型状态
    filters: {
        status: function (item) {
            if (item === "0") {
                return "已关注"
            } else if (item === "1") {
                return "取消关注"
            } else {
                return "其他"
            }
        }
    }
});