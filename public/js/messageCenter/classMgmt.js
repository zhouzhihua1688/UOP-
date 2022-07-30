new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        categoryId: '',
        // categoryName: '',
        // creator: '',
        deleteId: '',
        updateId: '',
        tableData: [],
        diaMsg: '',
        // 新增弹窗相关数据
        diaCategoryName: '',
        diaPushType: [],
        diaTimeEnable: 'true',
        diaOpenEnable: 'true',
        diaReceiveEnable: 'true',
        diaMultiEnable: 'true',
        diaOpenStatus: 'true',
        diaShowStatus: 'true',
        diaSubscribeEnable: 'true',
        diaSubsubscribeEnable: 'true',
        diadisplayReddot: '1',
        imageUrl: '',
        needUploadFile: true,
        //主表格分页数据
        currentIndex: 0,
        pageMaxNum: '10',
        condition: '',
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
            }
            else {
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
        pageMaxNum: function () {
            this.currentIndex = 0;
        },
        condition: function () {
            this.currentIndex = 0;
        }
    },
    mounted: function () {
        var _this = this;
        var dialogs = ['delete', 'add', 'info'];
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
            format: 'HH:mm:ss',//use this option to display seconds
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
        $('#selectBtn').unbind('click').click(function () {
            _this.needUploadFile = true;
            $('#uploadInput').val('');
            $('#uploadFileInput').click();
        });
        this.search();
    },
    methods: {
        //业务方法
        search: function () {
            this.currentIndex = 0;
            var _this = this;
            var params = {};
            params.categoryId = this.categoryId;
            // params.categoryName = this.categoryName;
            // params.creator = this.creator;
            $.post({
                url: '/messageCenter/classMgmt/classMgmt/search.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.tableData = result.data;
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        clearAddDia: function () {
            var _this = this;
            $('#selectBtn').unbind('click').click(function () {
                _this.needUploadFile = true;
                $('#uploadInput').val('');
                $('#uploadFileInput').click();
            });
            $('#uploadFileInput').on('change', function () {
                $('#uploadInput').val($(this).val());
            });
            $('#uploadFileInput').val('');
            $('#uploadInput').val('');
            this.diaCategoryName = '';
            this.diaPushType = [];
            $('#startTime').val('');
            $('#endTime').val('');
            this.diaTimeEnable = 'true';
            this.diaOpenEnable = 'true';
            this.diaReceiveEnable = 'true';
            this.diaMultiEnable = 'true';
            this.diaOpenStatus = 'true';
            this.diaShowStatus = 'true';
            this.diaSubscribeEnable = 'true';
            this.diaSubsubscribeEnable = 'true';
            this.diadisplayReddot = '1';
            this.imageUrl = '';
            this.needUploadFile = false;
        },
        showAdd: function () {
            this.clearAddDia();
            this.updateId = '';
            this.needUploadFile = true;
            this.showDialog('', 'add');
        },
        add: function () {
            if (!this.diaCategoryName) {
                this.showDialog('add', 'info', true, '分类名称不能为空!');
                return;
            }
            if (this.diaPushType.length === 0) {
                this.showDialog('add', 'info', true, '请选择订阅方式!');
                return;
            }
            if (!$('#startTime').val() || !$('#endTime').val()) {
                this.showDialog('add', 'info', true, '请填写完整的订阅时段');
                return;
            }
            if (this.needUploadFile && !this.imageUrl) {
                this.showDialog('add', 'info', true, '图片地址不能为空，请上传图片!');
                return;
            }
            var _this = this;
            var params = {};
            var url = '/messageCenter/classMgmt/classMgmt/add.ajax';
            if (this.updateId) {
                url = '/messageCenter/classMgmt/classMgmt/update.ajax';
                params.categoryId = this.updateId;
            }
            params.categoryName = this.diaCategoryName;
            params.pushType = this.diaPushType.sort(function (a, b) {
                return a - b;
            }).join(',');
            params.pushTime = $('#startTime').val() + '-' + $('#endTime').val();
            params.openEnable = this.diaOpenEnable;
            params.timeEnable = this.diaTimeEnable;
            params.receiveEnable = this.diaReceiveEnable;
            params.multiEnable = this.diaMultiEnable;
            params.openStatus = this.diaOpenStatus;
            params.showStatus = this.diaShowStatus;
            params.subscribeEnable = this.diaSubscribeEnable;
            params.subSubscribeEnable = this.diaSubsubscribeEnable;
            params.displayReddot = this.diadisplayReddot;
            params.imageUrl = this.imageUrl;
            console.log(params);
            $.post({
                url: url,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('add', 'info', false, result.msg);
                        _this.search();
                    }
                    else if (result.error === 2005) {
                        _this.showDialog('add', 'info', false, '该分类已关联到待发送批次,暂不可修改!');
                    }
                    else {
                        _this.showDialog('add', 'info', true, result.msg);
                    }
                }
            });
        },
        showDelete: function (item) {
            this.deleteId = item.categoryId;
            this.showDialog('', 'delete');
        },
        deleteData: function () {
            var _this = this;
            var params = {
                categoryId: this.deleteId
            };
            $.post({
                url: '/messageCenter/classMgmt/classMgmt/del.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('delete', 'info', false, result.msg);
                        _this.search();
                    }
                    else if (result.error === 2004) {
                        _this.showDialog('delete', 'info', false, '该分类已关联到待发送批次,暂不可删除');
                    }
                    else {
                        _this.showDialog('delete', 'info', false, result.msg);
                    }
                }
            });
        },
        showUpdate: function (item) {
            this.clearAddDia();
            this.updateId = item.categoryId;
            this.diaCategoryName = item.categoryName;
            this.diaPushType = item.pushType.split(',');
            $('#startTime').val(item.pushTime.split('-')[0]);
            $('#endTime').val(item.pushTime.split('-')[1]);
            this.diaOpenEnable = String(item.openEnable);
            this.diaTimeEnable = String(item.timeEnable);
            this.diaReceiveEnable = String(item.receiveEnable);
            this.diaMultiEnable = String(item.multiEnable);
            this.diaOpenStatus = String(item.openStatus);
            this.diaShowStatus = String(item.showStatus);
            this.diaSubscribeEnable = String(item.subscribeEnable);
            this.diaSubsubscribeEnable = String(item.subSubscribeEnable);
            this.diadisplayReddot = item.displayReddot;
            this.imageUrl = item.imageUrl;
            $('#uploadInput').val(item.imageUrl);
            this.needUploadFile = false;
            this.showDialog('', 'add');
        },
        uploadFile: function () {
            if (!$('#uploadFileInput').val()) {
                this.showDialog('add', 'info', true, '请选择要上传的图片!');
                return;
            }
            var _this = this;
            $.ajaxFileUpload({
                url: '/messageCenter/classMgmt/classMgmt/uploadFile.ajax',
                type: 'POST',
                dataType: 'json',
                fileElementId: 'uploadFileInput',
                success: function (result) {
                    if (result.error === 0) {
                        _this.imageUrl = result.data;
                        $('#uploadInput').val(result.data);
                    }
                    _this.showDialog('add', 'info', true, result.msg);
                }
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
        //公共方法
        showDialog: function (dia1, dia2, callback, msg) {
            if (msg) {
                this.diaMsg = msg;
            }
            else {
                msg = '输入条件错误';
            }
            if (!dia1) {
                $('#' + dia2).modal('show');
            }
            else if (!dia2) {
                $('#' + dia1).modal('hide');
            }
            else if (!callback) {
                $('#' + dia1).on("hidden.bs.modal", function () {
                    $('#' + dia2).modal('show');
                    $('#' + dia1).off().on("hidden", "hidden.bs.modal");
                });
                $('#' + dia1).modal('hide');
            }
            else {
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
    }
});
