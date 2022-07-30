new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        pointNo: '',
        deleteId: '',
        updateId: '',
        tableData: [],
        diaMsg: '',
        // 弹窗相关数据
        dialog_pointType: 0,
        dialog_pointNo: '',
        dialog_pointValue: '',
        dialog_validType: '',
        dialog_validDuration: 1,
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        pageMaxNum: 10,
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
            }
            else if (this.currentIndex <= this.maxSpace && this.middleData.length - this.currentIndex > this.maxSpace) {
                for (var i = 0; i < this.currentIndex + (2 * this.maxSpace - this.currentIndex); i++) {
                    arr.push(i + 1);
                }
            }
            else if (this.currentIndex > this.maxSpace && this.middleData.length - this.currentIndex <= this.maxSpace) {
                var space = this.middleData.length - this.currentIndex;
                for (var i = this.currentIndex - (2 * this.maxSpace - space); i < this.middleData.length; i++) {
                    arr.push(i + 1);
                }
            }
            else {
                for (var i = 0; i < this.middleData.length; i++) {
                    arr.push(i + 1);
                }
            }
            return arr;
        }
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
        var dialogs = ['info', 'operate', 'del'];
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
            format: 'YYYY-MM-DD HH:mm:ss',//use this option to display seconds
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
        this.search();
    },
    methods: {
        //模板管理业务方法
        search: function () {
            var _this = this;
            $.post({
                url: '/awardMgmt/integralSettingMgmt/integralType/getList.ajax',
                data: {pointNo: this.pointNo},
                success: function (result) {
                    if (result.error === 0) {
                        _this.currentIndex = 0;
                        _this.tableData = result.data;
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        setOperateDia: function (item) {
            this.dialog_pointType = item ? item.pointType : 0;
            this.dialog_pointValue = item ? item.pointValue : '';
            this.dialog_pointNo = item ? item.pointNo : '';
            this.dialog_validType = item ? item.validType : 2;
            this.dialog_validDuration = item ? item.validDuration : 1;
            $('#startTime').val(item && item.absoluteStartTime ? item.absoluteStartTime : '');
            $('#endTime').val(item && item.absoluteEndTime ? item.absoluteEndTime : '');
        },
        showAdd: function () {
            this.updateId = '';
            this.setOperateDia();
            this.showDialog('', 'operate');
        },
        checkDiaData: function () {
            if (this.dialog_validType == 1) {
                if (!$('#startTime').val() || !$('#endTime').val()) {
                    this.showDialog('operate', 'info', true, '未填写开始或结束时间');
                    return false;
                }
                var timeReg = /([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8])))/;
                if (!timeReg.test($('#startTime').val()) || !timeReg.test($('#endTime').val())) {
                    this.showDialog('operate', 'info', true, '开始时间或结束时间输入格式有误!');
                    return false;
                }
                var startTime = new Date($('#startTime').val().replace(/-/g, '/'));
                var endTime = new Date($('#endTime').val().replace(/-/g, '/'));
                if (startTime > endTime) {
                    this.showDialog('operate', 'info', true, '结束时间在开始时间之前,请重新输入!');
                    return false;
                }
            }
            if (this.dialog_pointType == 0 && !this.dialog_pointValue) {
                this.showDialog('operate', 'info', true, '固定积分需要填写积分值');
                return false;
            }
            if (this.dialog_pointType == 1 && !this.dialog_pointNo && !this.updateId) {
                this.showDialog('operate', 'info', true, '外部传入需要填写积分券号');
                return false;
            }
            if (this.dialog_validType == 2) {
                if (!this.dialog_validDuration || isNaN(Number(this.dialog_validDuration))) {
                    this.showDialog('operate', 'info', true, '未填写时间间隔或格式错误');
                    return false;
                }
            }
            return true;
        },
        operate: function () {
            if (!this.checkDiaData()) {
                return;
            }
            var _this = this;
            var params = {};
            params.pointType = this.dialog_pointType;
            if (this.dialog_pointType == 0) {
                params.pointValue = this.dialog_pointValue;
            }
            else if (this.dialog_pointType == 1) {
                params.pointNo = this.dialog_pointNo;
                params.pointValue = 0;
            }
            params.validType = this.dialog_validType;
            if (this.dialog_validType == 2) { // 相对时间
                params.validDuration = this.dialog_validDuration;
            }
            else if (this.dialog_validType == 1) { // 绝对时间
                params.absoluteStartTime = $('#startTime').val();
                params.absoluteEndTime = $('#endTime').val();
            }
            var url = '';
            if (this.updateId) {
                params.id = this.updateId;
                url = '/awardMgmt/integralSettingMgmt/integralType/update.ajax';
            }
            else {
                url = '/awardMgmt/integralSettingMgmt/integralType/add.ajax';
            }
            $.post({
                url: url,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.search();
                        _this.showDialog('operate', 'info', false, '操作成功');
                    }
                    else {
                        _this.showDialog('operate', 'info', true, result.msg);
                    }
                }
            });
        },
        showDelete: function (item) {
            this.deleteId = item.id;
            this.showDialog('', 'del');
        },
        deleteData: function () {
            var _this = this;
            $.post({
                url: '/awardMgmt/integralSettingMgmt/integralType/del.ajax',
                data: {id: this.deleteId},
                success: function (result) {
                    if (result.error === 0) {
                        _this.search();
                        _this.showDialog('del', 'info', false, result.msg);
                    }
                    else {
                        _this.showDialog('del', 'info', false, result.msg);
                    }
                }
            });
        },
        showUpdate: function (item) {
            this.updateId = item.id;
            this.setOperateDia(item);
            this.showDialog('', 'operate');
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
