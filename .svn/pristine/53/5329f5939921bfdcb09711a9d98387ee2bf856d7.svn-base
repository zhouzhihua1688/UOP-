new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        deleteId: '',
        updateId: '',
        tableData: [],
        diaMsg: '',
        // 弹窗相关数据
        dialog_name: '',
        dialog_summary: '',
        dialog_grantMode: 0,
        dialog_isKQredEnvelop: 'false',
        dialog_KQenvelopNo: '',
        dialog_value: 0,
        dialog_value_min: 0,
        dialog_value_max: 0,
        dialog_validType: '',
        dialog_validDuration: 0,
        dialog_branchCode: 247,
        dialog_isAnswer: 'false',
        dialog_isFrozen: 'false',
        dialog_useModeType: 0,
        dialog_envelopType: 1,
        //主表格分页数据
        currentIndex: 0,
        total: 0,
        pages: 0,
        maxSpace: 2,
        pageMaxNum: 10
    },
    watch: {
        pageMaxNum: function () {
            this.currentIndex = 0;
            this.search();
        },
        dialog_isKQredEnvelop: function (val, oldVal) {
            if(val == 'true'){
                this.dialog_isFrozen = 'true'
            }
        }
    },
    computed: {
        pageList: function () {
            var arr = [];
            if (this.pages <= 2 * this.maxSpace) {
                for (var i = 0; i < this.pages; i++) {
                    arr.push(i + 1);
                }
                return arr;
            }
            if (this.currentIndex > this.maxSpace && this.pages - this.currentIndex > this.maxSpace) {
                for (var i = this.currentIndex - this.maxSpace; i < this.currentIndex + this.maxSpace; i++) {
                    arr.push(i + 1);
                }
            }
            else if (this.currentIndex <= this.maxSpace && this.pages - this.currentIndex > this.maxSpace) {
                for (var i = 0; i < this.currentIndex + (2 * this.maxSpace - this.currentIndex); i++) {
                    arr.push(i + 1);
                }
            }
            else if (this.currentIndex > this.maxSpace && this.pages - this.currentIndex <= this.maxSpace) {
                var space = this.pages - this.currentIndex;
                for (var i = this.currentIndex - (2 * this.maxSpace - space); i < this.pages; i++) {
                    arr.push(i + 1);
                }
            }
            else {
                for (var i = 0; i < this.pages; i++) {
                    arr.push(i + 1);
                }
            }
            return arr;
        }
    },
    mounted: function () {
        var dialogs = ['info', 'del'];
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
                url: '/awardMgmt/redPacketSettingMgmt/redPacketType/query.ajax',
                data: {
                    pageNo: this.currentIndex + 1,
                    pageSize: this.pageMaxNum,
                },
                success: function (result) {
                    if (result.error === 0) {
                        _this.total = result.data.total;
                        _this.pages = result.data.pages;
                        _this.tableData = result.data.body;
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        setOperateDia: function (item) {
            this.dialog_name = item ? item.name : '';
            this.dialog_summary = item ? item.summary : '';
            this.dialog_grantMode = item ? item.grantMode : 0;
            this.dialog_isKQredEnvelop = 'false';
            this.dialog_KQenvelopNo = '';
            if (item && item.grantMode == 0) {
                this.dialog_value = item.value;
                this.dialog_value_min = 0;
                this.dialog_value_max = 0;
            }
            else if (item && item.grantMode == 1) {
                this.dialog_value = 0;
                this.dialog_value_min = item.minValue;
                this.dialog_value_max = item.maxValue;
            }
            else if (item && item.grantMode == 2) {
                this.dialog_value = 0;
                this.dialog_value_min = 0;
                this.dialog_value_max = 0;
            }
            else {
                this.dialog_value = 0;
            }
            this.dialog_validType = item ? item.validType : 0;
            if (item && item.validType == 0) {
                this.dialog_validDuration = item.validDuration;
                $('#startTime').val('');
                $('#endTime').val('');
            }
            else if (item && item.validType == 1) {
                this.dialog_validDuration = 0;
                $('#startTime').val(item.absoluteStartTime);
                $('#endTime').val(item.absoluteExpireTime);
            }
            else {
                this.dialog_validDuration = 0;
                $('#startTime').val('');
                $('#endTime').val('');
            }
            this.dialog_branchCode = item ? item.branchCode : 247;
            this.dialog_isAnswer = item ? item.isAnswer : 'false';
            this.dialog_isFrozen = item ? item.isFrozen : 'false';
            this.dialog_useModeType = item ? item.useModeType : 0;
            this.dialog_envelopType = item ? item.envelopType : 1;
        },
        showAdd: function () {
            this.updateId = '';
            this.setOperateDia();
            this.showDialog('', 'operate');
        },
        checkDiaData: function () {
            if (!this.dialog_name) {
                this.showDialog('operate', 'info', true, '未填写红包名称');
                return false;
            }
            if (this.dialog_name.length > 100) {
                this.showDialog('operate', 'info', true, '红包名称不能超过100个字符');
                return false;
            }
            if (!this.dialog_summary) {
                this.showDialog('operate', 'info', true, '未填写红包描述');
                return false;
            }
            if (this.dialog_summary.length > 100) {
                this.showDialog('operate', 'info', true, '红包描述不能超过100个字符');
                return false;
            }
            // 固定金额
            if (this.dialog_grantMode == 0) {
                if(isNaN(Number(this.dialog_value))){
                    this.showDialog('operate', 'info', true, '红包金额填写错误');
                    return false;
                }
                if(this.dialog_value === ''){
                    this.showDialog('operate', 'info', true, '未填写红包金额');
                    return false;
                }
                if(!/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/.test(this.dialog_value)){
                    this.showDialog('operate', 'info', true, '红包金额格式填写错误');
                    return false;
                }
                if(Number(this.dialog_value) < 0.01 || Number(this.dialog_value) > 10000){
                    this.showDialog('operate', 'info', true, '红包金额超出有效范围（0.01-10000）');
                    return false;
                }
            }
            // 随机金额
            if (this.dialog_grantMode == 1) {
                if(isNaN(Number(this.dialog_value_min)) || isNaN(Number(this.dialog_value_max))){
                    this.showDialog('operate', 'info', true, '金额范围填写错误');
                    return false;
                }
                if(this.dialog_value_min === '' || this.dialog_value_max === ''){
                    this.showDialog('operate', 'info', true, '未填写红包金额起始范围');
                    return false;
                }
                if(!/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/.test(this.dialog_value_min) || !/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/.test(this.dialog_value_max)){
                    this.showDialog('operate', 'info', true, '红包起始金额格式填写错误');
                    return false;
                }
                if(Number(this.dialog_value_min) < 0.01 || Number(this.dialog_value_max) > 10000){
                    this.showDialog('operate', 'info', true, '红包金额超出有效范围（0.01-10000）');
                    return false;
                }
                if(Number(this.dialog_value_min) >= Number(this.dialog_value_max)){
                    this.showDialog('operate', 'info', true, '最小金额不能超出最大金额');
                    return false;
                }
            }
            // 外部传入
            if (this.dialog_grantMode == 2) {
                if(this.dialog_isKQredEnvelop === 'true' && !this.dialog_KQenvelopNo){
                    this.showDialog('operate', 'info', true, '未填写卡券编号');
                    return false;
                }
            }
            if (this.dialog_validType == 0) {
                if(this.dialog_validDuration === ''){
                    this.showDialog('operate', 'info', true, '未填写有效时间');
                    return false;
                }
                if (!/^[1-9]\d*$/.test(this.dialog_validDuration)) {
                    this.showDialog('operate', 'info', true, '有效时间格式填写错误，请填写正整数');
                    return false;
                }
            }
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
            if (!this.dialog_branchCode) {
                this.showDialog('operate', 'info', true, '未填写红包渠道');
                return false;
            }
            return true;
        },
        operate: function () {
            if (!this.checkDiaData()) {
                return;
            }
            var _this = this;
            var params = {};
            params.name = this.dialog_name;
            params.summary = this.dialog_summary;
            params.grantMode = this.dialog_grantMode;
            if (this.dialog_grantMode == 0) { // 固定金额
                params.value = this.dialog_value;
                params.value_min = 0;
                params.value_max = 0;
            }
            if (this.dialog_grantMode == 1) { // 随机金额
                params.value = 0;
                params.value_min = this.dialog_value_min;
                params.value_max = this.dialog_value_max;
            }
            if (this.dialog_grantMode == 2) { // 外部传入
                params.value = 0;
                params.value_min = 0;
                params.value_max = 0;
                if(this.dialog_isKQredEnvelop === 'true'){
                    params.envelopNo = this.dialog_KQenvelopNo;
                }
            }
            params.validType = this.dialog_validType;
            if (this.dialog_validType == 0) { // 相对时间
                params.validDuration = this.dialog_validDuration;
                params.absoluteStartTime = '';
                params.absoluteExpireTime = '';
            }
            else if (this.dialog_validType == 1) { // 绝对时间
                params.validDuration = 0;
                params.absoluteStartTime = $('#startTime').val();
                params.absoluteExpireTime = $('#endTime').val();
            }
            params.branchCode = this.dialog_branchCode;
            params.isAnswer = this.dialog_isAnswer;
            params.isFrozen = this.dialog_isFrozen;
            params.useModeType = this.dialog_useModeType;
            params.envelopType = this.dialog_envelopType;
            var url = '';
            if (this.updateId) {
                params.envelopNo = this.updateId;
                url = '/awardMgmt/redPacketSettingMgmt/redPacketType/update.ajax';
            }
            else {
                url = '/awardMgmt/redPacketSettingMgmt/redPacketType/add.ajax';
            }
            $.post({
                url: url,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('operate', 'info', false, '操作成功');
                        _this.search();
                    }
                    else {
                        _this.showDialog('operate', 'info', true, result.msg);
                    }
                }
            });
        },
        showDelete: function (item) {
            this.deleteId = item.envelopNo;
            this.showDialog('', 'del');
        },
        deleteData: function () {
            var _this = this;
            $.post({
                url: '/awardMgmt/redPacketSettingMgmt/redPacketType/del.ajax',
                data: {envelopNo: this.deleteId},
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('del', 'info', false, '删除成功');
                        _this.search();
                    }
                    else {
                        _this.showDialog('del', 'info', true, result.msg);
                    }
                }
            });
        },
        showUpdate: function (item) {
            this.updateId = item.envelopNo;
            this.setOperateDia(item);
            this.showDialog('', 'operate');
        },
        //主表格分页方法
        prev: function () {
            this.currentIndex > 0 ? this.currentIndex-- : 0;
            this.search();
        },
        next: function () {
            this.currentIndex < this.pages - 1 ? this.currentIndex++ : this.pages - 1;
            this.search();
        },
        changeIndex: function (index) {
            this.currentIndex = index - 1;
            this.search();
        },
        toFirst: function () {
            this.currentIndex = 0;
            this.search();
        },
        toLast: function () {
            this.currentIndex = this.pages - 1;
            this.search();
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
