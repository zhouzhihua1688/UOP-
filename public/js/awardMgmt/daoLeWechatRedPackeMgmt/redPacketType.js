new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        deleteId: '',
        updateId: '',
        tableData: [],
        diaMsg: '',
        // 弹窗相关数据
        dialog_envelopName: '',
        dialog_envelopDesc: '',
        dialog_envelopType: '00',
        dialog_envelopValue: 0,
        dialog_value_min: 0,
        dialog_value_max: 0,
        userId:'',
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
                url: '/awardMgmt/daoLeWechatRedPackeMgmt/redPacketType/query.ajax',
                data: {
                    pageNo: this.currentIndex + 1,
                    pageSize: this.pageMaxNum,
                },
                success: function (result) {
                    if (result.error === 0) {
                        _this.total = result.data.total;
                        _this.pages = result.data.pages;
                        _this.tableData = result.data.body;
                        _this.userId = result.data.userId;
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        setOperateDia: function (item) {
            this.dialog_envelopName = item ? item.envelopName : '';
            this.dialog_envelopDesc = item ? item.envelopDesc : '';
            this.dialog_envelopType = item ? item.envelopType : '00';
            if (item && item.envelopType == '00') {
                this.dialog_envelopValue = item.envelopValue;
                this.dialog_value_min = 0;
                this.dialog_value_max = 0;
            }
            else if (item && item.envelopType == '01') {
                this.dialog_envelopValue = 0;
                this.dialog_value_min = item.minValue;
                this.dialog_value_max = item.maxValue;
            }
            else if (item && item.envelopType == '02') {
                this.dialog_envelopValue = 0;
                this.dialog_value_min = 0;
                this.dialog_value_max = 0;
            }
            else {
                this.dialog_envelopValue = 0;
            }
        },
        showAdd: function () {
            this.updateId = '';
            this.setOperateDia();
            this.showDialog('', 'operate');
        },
        checkDiaData: function () {
            if (!this.dialog_envelopName) {
                this.showDialog('operate', 'info', true, '未填写红包名称');
                return false;
            }
            if (this.dialog_envelopName.length > 100) {
                this.showDialog('operate', 'info', true, '红包名称不能超过100个字符');
                return false;
            }
            if (!this.dialog_envelopDesc) {
                this.showDialog('operate', 'info', true, '未填写红包描述');
                return false;
            }
            if (this.dialog_envelopDesc.length > 100) {
                this.showDialog('operate', 'info', true, '红包描述不能超过100个字符');
                return false;
            }
            // 固定金额
            if (this.dialog_envelopType == '00') {
                if(isNaN(Number(this.dialog_envelopValue))){
                    this.showDialog('operate', 'info', true, '红包金额填写错误');
                    return false;
                }
                if(this.dialog_envelopValue === ''){
                    this.showDialog('operate', 'info', true, '未填写红包金额');
                    return false;
                }
                if(!/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/.test(this.dialog_envelopValue)){
                    this.showDialog('operate', 'info', true, '红包金额格式填写错误');
                    return false;
                }
                if(Number(this.dialog_envelopValue) < 0.01 || Number(this.dialog_envelopValue) > 10000){
                    this.showDialog('operate', 'info', true, '红包金额超出有效范围（0.01-10000）');
                    return false;
                }
            }
            // 随机金额
            if (this.dialog_envelopType == '01') {
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
            // if (this.dialog_envelopType == 2) {
            //     if(this.dialog_isKQredEnvelop === 'true' && !this.dialog_KQenvelopNo){
            //         this.showDialog('operate', 'info', true, '未填写卡券编号');
            //         return false;
            //     }
            // }
            return true;
        },
        operate: function () {
            if (!this.checkDiaData()) {
                return;
            }
            var _this = this;
            var params = {};
            params.envelopName = this.dialog_envelopName;
            params.envelopDesc = this.dialog_envelopDesc;
            params.envelopType = this.dialog_envelopType;
            if (this.dialog_envelopType == '00') { // 固定金额
                params.envelopValue = this.dialog_envelopValue;
                params.minValue = 0;
                params.maxValue = 0;
            }
            if (this.dialog_envelopType == '01') { // 随机金额
                params.envelopValue = 0;
                params.minValue = this.dialog_value_min;
                params.maxValue = this.dialog_value_max;
            }
            if (this.dialog_envelopType == '02') { // 外部传入
                params.envelopValue = 0;
                params.minValue = 0;
                params.maxValue = 0;
            }
            params.modifyBy = this.userId;
            
            var url = '';
            if (this.updateId) {
                params.envelopNo = this.updateId;
                url = '/awardMgmt/daoLeWechatRedPackeMgmt/redPacketType/update.ajax';
            }
            else {
                url = '/awardMgmt/daoLeWechatRedPackeMgmt/redPacketType/add.ajax';
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
                url: '/awardMgmt/daoLeWechatRedPackeMgmt/redPacketType/del.ajax',
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
