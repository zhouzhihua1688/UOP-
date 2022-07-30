// 多个分页器的类
class Page {
    constructor(option) {
        console.log(option)
        for (let key in option) {
            this[key] = option[key];
        }
        // this.currentIndex = 0;
        // this.maxSpace = 5;
        // this.totalPage =0;
        // this.pageMaxNum = 10;
    }

    // method(fn, arg) {
    //     fn(arg);
    // }
};
var vm = new Vue({
    el: '#content',
    data: function () {
        return {
            page1: new Page({
                startTime: '', //开始时间
                endTime: '', //结束时间
                isSeparate: {
                    value: 'N',
                    checked: false
                }, //y时段UA单独统计n时段UA不单独统计
                searchTitle:'',//搜索文章标题
                searchStr:'',	//搜索摘要/正文
                tableData: [],
                productData: [],
                currentIndex: 0,
                maxSpace: 5,
                totalPage: 0,
                pageMaxNum: 10,
                method: function (currentIndex) {
                    this.getTableData1(currentIndex)
                }.bind(this)
            }),
            modifyStatus: 1,
            diaMsg: '',
            textId:"",
            textTitle : '',  //文章名称
            textAbstract : '',//摘要
            textMainbody : '',//正文
            textDate : '',    //时间
        }
    },
    mounted: function () {
        var dialogs = ['info', 'del', "selectAuthor"];
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
        // this.getTableData(0);
        $('.date-timepicker').datetimepicker({
            format: 'YYYY-MM-DD', //use this option to display seconds
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

        this.getTableData1(0);
    },
    computed: {
        pageList: function () {
            return function () {
                var arr = [];
                if (this.totalPage <= 2 * this.maxSpace) {
                    for (var i = 0; i < this.totalPage; i++) {
                        arr.push(i + 1);
                    }
                    return arr;
                }
                if (this.currentIndex > this.maxSpace && this.totalPage - this.currentIndex > this.maxSpace) {
                    for (var i = this.currentIndex - this.maxSpace; i < this.currentIndex + this.maxSpace; i++) {
                        arr.push(i + 1);
                    }
                } else if (this.currentIndex <= this.maxSpace && this.totalPage - this.currentIndex > this.maxSpace) {
                    for (var i = 0; i < this.currentIndex + (2 * this.maxSpace - this.currentIndex); i++) {
                        arr.push(i + 1);
                    }
                } else if (this.currentIndex > this.maxSpace && this.totalPage - this.currentIndex <= this.maxSpace) {
                    var space = this.totalPage - this.currentIndex;
                    for (var i = this.currentIndex - (2 * this.maxSpace - space); i < this.totalPage; i++) {
                        arr.push(i + 1);
                    }
                } else {
                    for (var i = 0; i < this.totalPage; i++) {
                        arr.push(i + 1);
                    }
                }
                return arr;
            }
        },
        //主表格分页方法
        prev: function (fn) {
            return function () {
                if (this.currentIndex <= 0) {
                    return;
                }
                this.method(this.currentIndex - 1);
                // this.method(fn, this.currentIndex - 1);
            }
        },
        next: function (fn) {
            return function () {
                if (this.currentIndex >= this.totalPage - 1) {
                    return;
                }
                this.method(this.currentIndex + 1);
                // this.method(fn, this.currentIndex + 1);
            }
        },
        changeIndex: function (fn) {
            return function (index) {
                // this.method(fn, index - 1);
                this.method(index - 1);
            }
        },
        toFirst: function (fn) {
            return function () {
                // this.method(fn, 0);
                this.method(0);
            }
        },
        toLast: function (fn) {
            return function () {
                // this.method(fn, this.totalPage - 1);
                this.method(this.totalPage - 1);
            }
        },

    },
    watch: {
        'page1.pageMaxNum': {
            handler: function () {
                this.getTableData1(0);
            }
        },

    },
    methods: {
        moment: moment,
        // 主表格数据
        getTableData1: function (currentIndex) {
            //   console.log(currentIndex);
            var _this = this;
            var params = {};
            params.searchTitle = this.page1.searchTitle;
            params.searchStr = this.page1.searchStr;
            params.startTime = this.page1.startTime;
            params.endTime = this.page1.endTime;
            params.page = currentIndex + 1;
            params.size = this.page1.pageMaxNum;
            console.log(params);
            $.post({
                url: '/advertising/materialMgmt/essayMgmt/getTableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.page1.currentIndex = currentIndex;
                        _this.page1.totalPage = Math.ceil(result.data.body.total / params.size);
                        if(result.data.body.data) {
                            _this.page1.tableData = result.data.body.data;
                        }
                    }
                    else {
                        _this.page1.tableData = [];
                        _this.currentIndex = 0;
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });

        },
        clearAddDia: function (item) {
            this.textTitle = item ? item.textTitle : '';
            this.textAbstract = item ? item.textAbstract : '';
            this.textMainbody = item ? item.textMainbody : '';
            this.textDate = item ? item.textDate : '';
        },
        showAdd: function () {
            this.modifyStatus = 0;
            this.updateId = '';
            this.textTitle = '';
            this.textAbstract = '';
            this.textMainbody = '';
            this.textDate = '';
            this.clearAddDia();
            this.showDialog('', 'add')
        },
        add: function () {
            var _this = this;
            var params = {};
            var api = 'add';
            if (this.updateId) {
                api = 'update';
                params.textId = _this.updateId;
            }
            if (!_this.textTitle) {
                _this.showDialog('add', 'info', true, '请输入文章名称');
                return false;
            }
            if (!_this.textMainbody) {
                _this.showDialog('add', 'info', true, '请输入文章正文');
                return false;
            }
            if (!_this.textDate) {
                _this.showDialog('add', 'info', true, '请输入文章日期');
                return false;
            }
            params.textTitle = this.textTitle;
            params.textAbstract = this.textAbstract;
            params.textMainbody = this.textMainbody;
            params.textDate = this.textDate;
            console.log(params);
            $.post({
                url: '/advertising/materialMgmt/essayMgmt/' + api + '.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData1(0);
                        _this.showDialog('add', 'info', false, result.msg);
                    } else {
                        _this.showDialog('add', 'info', true, result.msg);
                    }
                }
            });
        },
        //点击修改主页面内容
        modify: function (item) {
            var _this = this;
            _this.modifyStatus = 1;
            _this.clearAddDia(item);
            _this.updateId = item.textId;
            var params = {};
            params.textId = item.textId;
            // 查询单个文章信息
            $.post({
                url: '/advertising/materialMgmt/essayMgmt/searchSingle.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        console.log("查询单个文章", result.data);
                    } else {
                        _this.showDialog('add', 'info', false, result.msg);
                    }
                }
            });
            this.showDialog('', 'add');
        },
        deleteDate(item) {
            var _this = this;
            var params = {};
            params.textId = item.textId;
            console.log(params);
            $.post({
                url: '/advertising/materialMgmt/essayMgmt/deleteParam.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData1(0);
                        _this.showDialog('', 'info', true, result.msg);
                    } else {
                        _this.showDialog('', 'info', true, result.msg);
                    }
                }
            });
        },

        //公共方法
        awaitWrap(promise) { // await 异常处理包装
            return promise.then(res => [null, res], error => [error, null]);
        },
        verify: function () { // 校验

        },
        showDialog: function (dia1, dia2, callback, msg) {
            // 关掉dia1，打开dia2
            // callback==false:在dia2关掉的时候，直接关掉
            // callback==true:在dia2关掉的时候，重新打开dia1
            this.diaMsg = (msg ? msg : '输入条件错误');
            if (!dia1) {
                $('#' + dia2).modal('show');
            } else if (!dia2) {
                $('#' + dia1).modal('hide');
            } else if (!callback) {
                $('#' + dia1).modal('hide');
                $('#' + dia2).off("hidden.bs.modal").modal('show');
            } else {
                if ($('#' + dia1).data('parentDlg')) {
                    // dia1弹窗有父级弹窗，先去除关闭事件，关闭弹窗后，再恢复添加事件
                    $('#' + dia1).off("hidden.bs.modal").modal('hide');
                    $('#' + dia1).on("hidden.bs.modal", function () {
                        $('#' + $('#' + dia1).data('parentDlg')).modal("show");
                    });
                } else {
                    // dia1弹窗没有父级弹窗，直接关闭
                    $('#' + dia1).modal('hide');
                }
                $('#' + dia2).off("hidden.bs.modal").on("hidden.bs.modal", function () {
                    // dia2作为子弹窗，添加关闭事件，关闭弹窗时打开父级弹窗
                    $('#' + dia1).modal("show");
                    $('#' + dia2).data('parentDlg', dia1);
                });
                $('#' + dia2).modal('show');
            }
        },
        showNestDialog: function (dia1, dia2, dia3, callback, msg) { //页面内嵌套了多个模态框
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
                        $('#' + dia1).on("hidden.bs.modal", function () {
                            $('#' + dia3).modal('show');
                            $('#' + dia1).off().on("hidden", "hidden.bs.modal");
                        });
                    });
                    $('#' + dia2).modal("show");
                    $('#' + dia1).off().on("hidden", "hidden.bs.modal");
                });
                $('#' + dia1).modal('hide');
            }
        },
        transformTime(createTime) {
            let date = new Date(Number(createTime));
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let h = date.getHours()
            let i = date.getMinutes()
            let s = date.getSeconds();
            month = month < 10 ? '0' + month : month;
            day = day < 10 ? '0' + day : day;
            if (h < 10) {
                h = '0' + h;
            }
            if (i < 10) {
                i = '0' + i;
            }
            if (s < 10) {
                s = '0' + s;
            }
            let dateT = year + '-' + month + '-' + day + " " + h + ':' + i + ':' + s
            return dateT
        }
    },
    components: {
        'date-picker': VueBootstrapDatetimePicker
    },
});