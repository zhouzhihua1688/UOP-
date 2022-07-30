var vm = new Vue({
    el: '#content',
    data: function () {
        this.editor = null //富文本
        return {
            startTime: '', //开始时间
            endTime: '', //结束时间
            isSeparate: {
                value: 'N',
                checked: false
            }, //y时段UA单独统计n时段UA不单独统计
            searchKey: '', //搜索关键字
            tableData: [],
            productData: [],
            currentIndex: 0,
            maxSpace: 5,
            totalPage: 0,
            pageMaxNum: 10,


            modifyStatus: 1,
            diaMsg: '',
            diaConentData: [{
                value: 'FILE',
                checked: false
            }, {
                value: 'FILE',
                checked: false
            }], //选择内容弹窗数据，
            modifyData: {
                contentType: "popUp",
                // id: '',
                popTitle:'',
                popupId: '',
                pushTime: "",
                templateMessageId: "",
                templateMessageName: "",
                templateMessageOverview: "",
                templateMessageRemarks: "",
                templateMessageServiceName: "",
                templateMessageServiceTime: "",
                templateMessageTitle: ""
            },
            searchInfo: "",
            checkedId: [],
            popupList: [],
            forPopupTitle: '',
            templateMessageId: '',
            titleMessageOptions: [],
            contentType: '',
            contentTypeArray: [{
                contentTypeText: '弹窗信息',
                contentType: "popUp",
            }],
            popupId: '',
            modifyDataPopupTitle: "",
            currentIndex2: 0,
            maxSpace2: 5,
            totalPage2: 0,
            pageMaxNum2: 10,
            inputValue:'',

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
        pageList2: function () {
            var arr = [];
            if (this.totalPage2 <= 2 * this.maxSpace2) {
                for (var i = 0; i < this.totalPage2; i++) {
                    arr.push(i + 1);
                }
                return arr;
            }
            if (this.currentIndex2 > this.maxSpace2 && this.totalPage2 - this.currentIndex2 > this.maxSpace2) {
                for (var i = this.currentIndex2 - this.maxSpace2; i < this.currentIndex2 + this.maxSpace2; i++) {
                    arr.push(i + 1);
                }
            } else if (this.currentIndex2 <= this.maxSpace2 && this.totalPage2 - this.currentIndex2 > this.maxSpace2) {
                for (var i = 0; i < this.currentIndex2 + (2 * this.maxSpace2 - this.currentIndex2); i++) {
                    arr.push(i + 1);
                }
            } else if (this.currentIndex2 > this.maxSpace2 && this.totalPage2 - this.currentIndex2 <= this.maxSpace2) {
                var space = this.totalPage2 - this.currentIndex2;
                for (var i = this.currentIndex2 - (2 * this.maxSpace2 - space); i < this.totalPage2; i++) {
                    arr.push(i + 1);
                }
            } else {
                for (var i = 0; i < this.totalPage2; i++) {
                    arr.push(i + 1);
                }
            }
            return arr;
        },
        pageList: function () {
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
        },
    },
    watch: {
        pageMaxNum: function () {
            this.getTableData1(0);
        }
    },
    created() {
        this.getMessageOptions()
        this.getPopupList(0)
    },
    methods: {
        moment: moment,
        // /api/模板消息标题选择项
        getMessageOptions() {
            var _this = this;
            let data = {}
            $.post({
                url: '/advertising/serviceAndRemindMgmt/publicMessagePush/getMessageOptions.ajax',
                data,
                success: function (result) {
                    if (result.error === 0) {
                        _this.titleMessageOptions = result.data.body
                        console.log(_this.titleMessageOptions)
                    }
                }
            });
        },
        // 获取弹窗数据
        getPopupList(currentIndex) {
            var _this = this;
            this.popupList = []
            let data = {
                page: currentIndex + 1,
                size: _this.pageMaxNum2
            }

            this.forPopupTitle ? data.title = this.forPopupTitle : ''
            $.post({
                url: '/advertising/serviceAndRemindMgmt/publicMessagePush/getPopupList.ajax',
                data: data,
                success: function (result) {
                    if (result.error === 0) {
                        _this.popupList = result.data.body.data
                        _this.popupList.forEach((item) => {
                            item.checked = false;
                        })
                        _this.currentIndex2 = currentIndex;
                        _this.totalPage2 = Math.ceil(result.data.body.total / data.size);
                    } else {
                        _this.popupList = [];
                        _this.currentIndex2 = 0;
                        _this.showDialog('', 'info', false, result.msg);
                    }

                }
            });
        },
        // 修改或者提交按钮
        SubmitBtn() {
            var _this = this;
            if (this.titleMessageOptions && this.titleMessageOptions.length) {
                this.titleMessageOptions.forEach((item) => {
                    if (item.templateMessageId == this.modifyData.templateMessageId) {
                        this.modifyData.templateMessageTitle = item.templateMessageTitle

                    }
                    console.log(this.modifyData)
                })
            }

            let data = this.modifyData
            if (this.modifyStatus == 0) { // 新增
                var url = `/advertising/serviceAndRemindMgmt/publicMessagePush/add.ajax`
            } else { // 修改
                var url = `/advertising/serviceAndRemindMgmt/publicMessagePush/update.ajax`
            }
            $.post({
                url,
                data,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData1(0)
                        _this.showDialog('add', 'info', false, result.msg);
                    } else {
                        _this.showDialog('add', 'info', false, result.msg);
                    }
                }
            });
        },
        showAdd: function () {
            this.modifyStatus = 0;
            this.modifyData = {
                contentType: "popUp",
                // id: '',
                popTitle:'',
                popupId: '',
                pushTime: '',
                templateMessageId: "",
                templateMessageName: "",
                templateMessageOverview: "",
                templateMessageRemarks: "",
                templateMessageServiceName: "",
                templateMessageServiceTime: "",
                templateMessageTitle: ""
            }
            this.modifyData.pushTime=this.getNowtime();
            this.modifyData.templateMessageServiceTime=this.getNowtime('ServiceTime');
            this.clearAddDia();
            this.updateId = '';
            this.fundCode = '';
            this.shareTitle = '';
            this.showDialog('', 'add')
            this.getPopupList(0)
            console.log(this.getPopupList(0))
        },
        // 勾选选择内容的checkbox
        radioSelect(item, index) {
            this.popupList.forEach((item2, index2) => {
                item2.checked=false;
            }) 
            this.popupId = item.id
            this.modifyData.popTitle = item.title
            this.$set(this.popupList[index], 'checked', 'true')
        },
        surePopupId() {
            this.modifyData.popupId = parseInt(this.popupId)
            this.showDialog('addContent', 'add', false)
        },

        // 主表格数据
        getTableData1: function (currentIndex) {
            //   console.log(currentIndex);
            console.log('getTableDatagetTableData',currentIndex)
            var _this = this;
            var params = {};
            params.searchInfo = this.searchInfo;
            params.startTime = this.startTime;
            params.endTime = this.endTime;
            params.page = currentIndex + 1;
            params.size = this.pageMaxNum;
            params.isSeparate = this.isSeparate.value;
            params.templateMessageId = this.templateMessageId

            $.post({
                url: '/advertising/serviceAndRemindMgmt/publicMessagePush/getTableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.currentIndex = currentIndex;
                        _this.totalPage = Math.ceil(result.data.body.total / params.size);
                        if (result.data.body.data) {
                            _this.tableData = result.data.body.data;
                        }
                    } else {
                        _this.tableData = [];
                        _this.currentIndex = 0;
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });

        },

        clearAddDia: function (item) {
            this.fundCode = item ? item.fundCode : '';
            this.fundName = item ? item.fundName : '';
            this.status = item ? item.status : 'N';
        },
        

        //点击修改主页面内容
        modify: function (item) {
            var _this = this;
            _this.modifyStatus = 1;
            _this.clearAddDia(item);
            // _this.updateId = item.id;
            var params = {};
            params.id = item.id;
            // 查询单个产品信息
            $.post({
                url: '/advertising/serviceAndRemindMgmt/publicMessagePush/searchSingle.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        console.log("查询单个产品", result.data)
                        _this.modifyData = result.data.body;
                        if (_this.titleMessageOptions && _this.titleMessageOptions.length > 0) {
                            _this.titleMessageOptions.forEach((item) => {
                                if (item.templateMessageId == _this.modifyData.templateMessageId) {
                                    _this.modifyData.templateMessageTitle = item.templateMessageTitle
                                    console.log(_this.modifyData.templateMessageTitle)
                                }
                            })
                        }
                        _this.modifyData.pushTime = _this.transformTime(_this.modifyData.pushTime)
                        console.log(_this.modifyData.pushTime)
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
            params.id = item.id;
            console.log(params.id);
            $.post({
                url: '/advertising/serviceAndRemindMgmt/publicMessagePush/deleteParam.ajax',
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
            if (createTime.toString().length == 10) {
                var date = new Date(Number(createTime) * 1000);
            } else if (createTime.toString().length == 13) {
                var date = new Date(Number(createTime));
            }else {
                return 
            }

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
        },
        transformPushStatus(pushStatus){
            if (pushStatus=='Y'){
                return '已推送'
            }else if(pushStatus=='I'){
                return '推送中'
            }
            else if(pushStatus=='N'){
                return '未推送'
            }else if(pushStatus=='F'){
                return '推送失败'
            }
        },
           // 获取当前时间
           getNowtime(ServiceTime){
            var _this = this;
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let h = date.getHours();
            let i = date.getMinutes();
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
            if(ServiceTime){
                var dateT = year + '-' + month + '-' + day ;
            }else{
                var dateT = year + '-' + month + '-' + day + " " + h + ':' + i + ':' + s;
            }
            
            return dateT;
        },
        //弹窗表格分页方法
        prev2: function () {
            if (this.currentIndex2 <= 0) {
                return;
            }
            this.getPopupList(this.currentIndex2 - 1);
        },
        next2: function () {
            if (this.currentIndex2 >= this.totalPage2 - 1) {
                return;
            }
            this.getPopupList(this.currentIndex2 + 1);
        },
        changeIndex2: function (index) {
            console.log('123', index);
            this.getPopupList(index - 1);
        },
        toFirst2: function () {
            this.getPopupList(0);
        },
        toLast2: function () {
            this.getPopupList(this.totalPage2 - 1);
        },
        //主表格分页方法
        prev: function () {
            if (this.currentIndex <= 0) {
                return;
            }
            this.getTableData1(this.currentIndex - 1);
        },
        next: function () {
            if (this.currentIndex >= this.totalPage - 1) {
                return;
            }
            this.getTableData1(this.currentIndex + 1);
        },
        changeIndex: function (index) {
            this.getTableData1(index - 1);
        },
        toFirst: function () {
            this.getTableData1(0);
        },
        toLast: function () {
            this.getTableData1(this.totalPage - 1);
        },
    },
    components: {
        'date-picker': VueBootstrapDatetimePicker
    },
});