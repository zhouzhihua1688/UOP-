new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        ruleId: '',
        deleteId: '',
        updateId: '',
        tableData: [],
        diaMsg: '',
        loadingShow: false,
        // 新增弹窗相关数据
        diaRuleName: '',
        diaClassList: [],
        diaClassType: '',
        hasSubClass: false,
        diaSubClassType: '',
        diaSubClassList: [],
        diaIsTongBuCMS: false,
        diaIsSeparateSend: false,
        diaChannelType: [],
        diaAppMsgId: '',
        diaAppMsgList: [],
        diaAppPushId: '',
        diaAppPushList: [],
        diaShortMsgId: '',
        diaShortMsgList: [],
        diaWXId: '',
        diaWXList: [],
        diaWXHighId: '',
        diaWXHighList: [],
        diaOfficialAccountId: '',
        diaOfficialAccountList: '',
        diaIMId:'',
        diaIMList:[],
        diaPushType: '0',
        diaSubPushType: '0',     // 20220207 需求9694，支持微信配置二级分类规则时，同时支持配置定时发送功能。
        diaRuleKey: '',
        diaEventType: '',
        diaEventTypeList: [
            {eventType: '00', eventName: '工资宝'},
            {eventType: '01', eventName: '预约取现'},
            {eventType: '02', eventName: '基金定投'},
            {eventType: '03', eventName: '基金定投(智汇定投)'},
            {eventType: '04', eventName: '基金定投(智汇定投)'},
            {eventType: '05', eventName: '组合定投(添富智投)'},
            {eventType: '06', eventName: '组合定投(添富养老)'},
            {eventType: '07', eventName: '信用卡还款(自动还款)'},
            {eventType: '08', eventName: '信用卡还款提醒'},
            {eventType: '09', eventName: '信用卡还款(预约还款)'},
            {eventType: '10', eventName: '组合定投(指数宝)'},
            {eventType: '11', eventName: '产品到期'},
            {eventType: '12', eventName: '个人事件'},
            {eventType: '13', eventName: '基金定投(智汇定投)'},
            {eventType: '14', eventName: '新发基金开售提醒'},
            {eventType: '15', eventName: '定开基金申购开放'},
            {eventType: '16', eventName: '定开基金赎回开放'},
            {eventType: '17', eventName: '高端产品申购开放'},
            {eventType: '18', eventName: '高端产品赎回开放'},
            {eventType: '19', eventName: '高端产品到期'}],
        diaPriority: '1',
        diaRuleSource: 'e7ad0120840f4ce94e25771f97d4721d',
        diagroupType: '1',
        groupList: [],
        selectgroupList: [],
        templateDetailList: [],
        allTemplate: [],
        diaTemplateDetail: {
            templateName: '',
            channelType: 1,
            showChannelType: '',
            title: '',
            summary: '',
            content: '',
            url: '',
            pushType:''
        },
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
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
        hasAppMsg: function () {
            if (this.diaChannelType.indexOf('1') > -1 || this.diaChannelType.indexOf(1) > -1) {
                return true;
            }
            return false;
        },
        hasAppPush: function () {
            if (this.diaChannelType.indexOf('2') > -1 || this.diaChannelType.indexOf(2) > -1) {
                return true;
            }
            return false;
        },
        hasShortMsg: function () {
            if (this.diaChannelType.indexOf('3') > -1 || this.diaChannelType.indexOf(3) > -1) {
                return true;
            }
            return false;
        },
        hasWX: function () {
            if (this.diaChannelType.indexOf('4') > -1 || this.diaChannelType.indexOf(4) > -1) {
                return true;
            }
            return false;
        },
        hasWXHigh: function () {
            if (this.diaChannelType.indexOf('5') > -1 || this.diaChannelType.indexOf(5) > -1) {
                return true;
            }
            return false;
        },
        hasOfficialAccount: function () {
            if (this.diaChannelType.indexOf('6') > -1 || this.diaChannelType.indexOf(6) > -1) {
                return true;
            }
            return false;
        },
        hasIM: function () {
            if (this.diaChannelType.indexOf('7') > -1 || this.diaChannelType.indexOf(7) > -1) {
                return true;
            }
            return false;
        },
        jumpLinkShow: function () {
            if (this.diaTemplateDetail.channelType == 3 || (this.diaTemplateDetail.channelType == 2 && this.diaTemplateDetail.pushType == 1) ) {
                return false;
            }
            return true;
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
        },
        // 当选择系统调用并且不是电商直销的时候,eventType为50
        showOption: function () {
            return this.diaPushType == 1 && this.diaRuleSource != 'e7ad0120840f4ce94e25771f97d4721d';
        },
        showGroup: function () {
            return this.diaPushType == 0 || this.diaPushType == 3 || this.diaPushType == 5 || this.diaPushType == 6;
        },
        showRuleKey: function () {
            return this.diaPushType == 1 || this.diaPushType == 2;
        }
    },
    watch: {
        pageMaxNum: function (val, oldval) {
            this.currentIndex = 0;
        },
        diaRuleSource: function (newval, oldval) {
            if (newval == 'e7ad0120840f4ce94e25771f97d4721d') {
                this.diaEventType = '';
            }
            else {
                this.diaEventType = '50';
            }
        },
        diaClassType: function(newval, oldval){
            var _this = this;
            $.post({
                url: '/messageCenter/ruleMgmt/ruleMgmt/getSubClassList.ajax',
                data: {categoryId: newval},
                success: function(result) {
                    if (result.error === 0) {
                        if(result.data.length === 0){
                            _this.diaSubClassList = [];
                            _this.hasSubClass = false;
                        }
                        else {
                            _this.diaSubClassList = result.data;
                            _this.hasSubClass = true;
                        }
                    } else {
                        _this.diaSubClassList = [];
                        _this.hasSubClass = false;
                    }
                }
            });
        },
        condition: function () {
            this.currentIndex = 0;
        }
    },
    mounted: function () {
        var _this = this;
        var dialogs = ['delete', 'info', 'uploadCSV', 'uploadExcel'];
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
        $("#cron").cronGen({
            direction: 'right'
        });
        $('#cronLabel').insertBefore($('.cronValue').eq(0));
        $('#diaAppMsgList').chosen({
            search_contains: true,
            no_results_text: '未找到站内信模板',
            disable_search_threshold: 6,
            width: '170px'
        });
        $('#diaAppMsgList').on('change', function (e, params) {
            _this.diaAppMsgId = params ? params.selected : '';
        });
        $('#diaAppPushList').chosen({
            search_contains: true,
            no_results_text: '未找到push模板',
            disable_search_threshold: 6,
            width: '170px'
        });
        $('#diaAppPushList').on('change', function (e, params) {
            _this.diaAppPushId = params ? params.selected : '';
        });
        $('#diaShortMsgList').chosen({
            search_contains: true,
            no_results_text: '未找到短信模板',
            disable_search_threshold: 6,
            width: '170px'
        });
        $('#diaShortMsgList').on('change', function (e, params) {
            _this.diaShortMsgId = params ? params.selected : '';
        });
        $('#diaWXList').chosen({
            search_contains: true,
            no_results_text: '未找到微信模板',
            disable_search_threshold: 6,
            width: '170px'
        });
        $('#diaWXList').on('change', function (e, params) {
            _this.diaWXId = params ? params.selected : '';
        });
        $('#diaWXHighList').chosen({
            search_contains: true,
            no_results_text: '未找到微信高端模板',
            disable_search_threshold: 6,
            width: '170px'
        });
        $('#diaWXHighList').on('change', function (e, params) {
            _this.diaWXHighId = params ? params.selected : '';
        });
        $('#diaOfficialAccountList').chosen({
            search_contains: true,
            no_results_text: '未找到定投公众号模板',
            disable_search_threshold: 6,
            width: '170px'
        });
        $('#diaOfficialAccountList').on('change', function (e, params) {
            _this.diaOfficialAccountId = params ? params.selected : '';
        });
        $('#diaIMList').chosen({
            search_contains: true,
            no_results_text: '未找到IM消息模板',
            disable_search_threshold: 6,
            width: '170px'
        });
        $('#diaIMList').on('change', function (e, params) {
            _this.diaIMId = params ? params.selected : '';
        });
        $('#diaRuleSource').chosen({
            search_contains: true,
            no_results_text: '未找到对应规则来源',
            disable_search_threshold: 5,
            width: '170px'
        });
        $('#diaRuleSource').on('change', function (e, params) {
            _this.diaRuleSource = params ? params.selected : '';
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
        $('.date-hourpicker').datetimepicker({
            format: 'HH',//use this option to display seconds
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
        $('#uploadBtn').click(function () {
            $('#uploadFileInput').click();
        });
        $('#uploadBtnCSV').click(function () {
            $('#uploadFileInputCSV').click();
        });
        $('#uploadBtnExcel').click(function () {
            $('#uploadFileInputExcel').click();
        });
        this.search();
        this.getTemplate();
        if(this.getUrlParam('openNewDialog')){
            this.showAdd();
        }
    },
    methods: {
        //查询所有模板
        getTemplate: function () {
            var _this = this;
            var params = {};
            var url = '/messageCenter/ruleMgmt/ruleMgmt/getTemplate.ajax';
            $.post({
                url: url,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.allTemplate = result.data;
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        //业务方法
        search: function () {
            this.currentIndex = 0;
            var _this = this;
            var params = {};
            params.ruleId = this.ruleId;
            // params.ruleName = this.ruleName;
            // params.creator = this.creator;
            $.post({
                url: '/messageCenter/ruleMgmt/ruleMgmt/search.ajax',
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
        showUpload: function () {
            $('#uploadFileInputCSV').on('change', function () {
                $('#uploadInputCSV').val($(this).val());
            });
            $('#uploadInputCSV').val('');
            $('#uploadFileInputCSV').val('');
            this.showDialog('', 'uploadCSV', false);
        },
        showExcelUpload: function () {
            $('#uploadFileInputExcel').on('change', function () {
                $('#uploadInputExcel').val($(this).val());
            });
            $('#uploadInputExcel').val('');
            $('#uploadFileInputExcel').val('');
            this.showDialog('', 'uploadExcel', false);
        },
        addCSV: function () {
            if (!$('#uploadFileInputCSV').val()) {
                this.showDialog('uploadCSV', 'info', true, '请选择要上传的csv文件');
                return false;
            }
            if (!(/.\.csv$/.test($('#uploadFileInputCSV').get(0).files[0].name))) {
                this.showDialog('uploadCSV', 'info', true, '文件格式错误，请选择csv格式的文件');
                return false;
            }
            this.showDialog('uploadCSV', '');
            var _this = this;
            _this.loadingShow = true;
            $.ajaxFileUpload({
                url: '/messageCenter/ruleMgmt/ruleMgmt/uploadCSV.ajax',
                type: 'POST',
                dataType: 'json',
                fileElementId: 'uploadFileInputCSV',
                success: function (result) {
                    _this.loadingShow = false;
                    if (result.error === 0) {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                },
                error: function () {
                    _this.loadingShow = false;
                    _this.showDialog('', 'info', false, '网络超时，请稍后重试');
                }
            });
        },
        addExcel: function () {
            if (!$('#uploadFileInputExcel').val()) {
                this.showDialog('uploadExcel', 'info', true, '请选择要上传的xlsx文件');
                return false;
            }
            if (!(/.\.xlsx$/.test($('#uploadFileInputExcel').get(0).files[0].name))) {
                this.showDialog('uploadExcel', 'info', true, '文件格式错误，请选择xlsx格式的文件');
                return false;
            }
            var _this = this;
            var excelData = $('#uploadFileInputExcel').get(0).files[0];
            if (!excelData) {
                this.showDialog('uploadExcel', 'info', true, '未选择文件');
                return;
            }
            if (excelData.size > 5242880) {
                this.showDialog('uploadExcel', 'info', true, '上传文件大小超出5M');
                return;
            }
            //转化文件成json格式
            var reader = new FileReader();
            reader.onload = function (e) {
                var data = e.target.result;
                var workbook = XLSX.read(data, {type: 'binary'});
                var fromTo = '';
                var jsonData = [];
                // 遍历每张表读取
                for (var sheet in workbook.Sheets) {
                    if (workbook.Sheets.hasOwnProperty(sheet)) {
                        fromTo = workbook.Sheets[sheet]['!ref'];
                        jsonData = jsonData.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                        break;
                    }
                }
                console.log('前端解析文件数据为: ', jsonData);
                if (jsonData.length > 2000) {
                    _this.showDialog('uploadExcel', 'info', true, '单次发送条数不能超过2000条');
                    return;
                }
                _this.showDialog('uploadExcel');
                _this.loadingShow = true;
                $.post({
                    url: '/messageCenter/ruleMgmt/ruleMgmt/uploadExcel.ajax',
                    data: {ExcelData: JSON.stringify(jsonData)},
                    success: function (result) {
                        _this.loadingShow = false;
                        if (result.error === 0) {
                            _this.search();
                            _this.showDialog('', 'info', false, result.msg);
                        }
                        else {
                            _this.showDialog('', 'info', false, result.msg);
                        }
                    },
                    error: function () {
                        _this.loadingShow = false;
                        _this.showDialog('', 'info', false, '网络超时,请稍后重试');
                    }
                });
            };
            reader.readAsBinaryString(excelData);
        },
        downloadExcelFile: function () {
            var elt = document.getElementById('data-table');
            var wb = XLSX.utils.table_to_book(elt, {sheet: 'Sheet JS'});
            XLSX.writeFile(wb, '导入模板示例.xlsx');
        },
        clearAddDia: function () {
            $('#uploadFileInput').on('change', function () {
                $('#uploadInput').val($(this).val());
            });
            $('#uploadInput').val('');
            $('#uploadFileInput').val('');
            this.diaRuleName = '';
            this.hasSubClass = false;
            this.diaSubClassType = '';
            this.diaIsTongBuCMS = false;
            this.diaIsSeparateSend = false;
            this.diaSubClassList = [];
            this.diaClassType = '';
            this.diaChannelType = [];
            this.diaAppMsgId = '';
            this.diaAppPushId = '';
            this.diaShortMsgId = '';
            this.diaWXId = '';
            this.diaWXHighId = '';
            this.diaOfficialAccountId = '';
            this.diaIMId = '';
            this.diaPushType = '0';
            this.diaRuleKey = '';
            this.diaEventType = '';
            $('#expiredTime').val('');
            $('#cron').val('');
            $('.cronValue').val('');
            this.diaPriority = '1';
            this.diaRuleSource = 'e7ad0120840f4ce94e25771f97d4721d';
            $('#diaRuleSource').val('e7ad0120840f4ce94e25771f97d4721d');
            $('#diaRuleSource').trigger('chosen:updated');
            this.diagroupType = '1';
            this.selectgroupList = [];
            $('#diaAppMsgList').val('');
            $('#diaAppMsgList').trigger('chosen:updated');
            $('#diaAppPushList').val('');
            $('#diaAppPushList').trigger('chosen:updated');
            $('#diaShortMsgList').val('');
            $('#diaShortMsgList').trigger('chosen:updated');
            $('#diaWXList').val('');
            $('#diaWXList').trigger('chosen:updated');
            $('#diaWXHighList').val('');
            $('#diaWXHighList').trigger('chosen:updated');
            $('#diaOfficialAccountList').val('');
            $('#diaOfficialAccountList').trigger('chosen:updated');
            $('#diaIMList').val('');
            $('#diaIMList').trigger('chosen:updated');
        },
        checkAddDia: function () {
            if (!this.diaRuleName) {
                this.showDialog('add', 'info', true, '规则名称不能为空');
                return false;
            }
            if (!this.diaClassType) {
                this.showDialog('add', 'info', true, '消息类别不能为空');
                return false;
            }
            if(this.hasSubClass && !this.diaSubClassType){
                this.showDialog('add', 'info', true, '请选择消息二级分类');
                return false;
            }
            if (this.diaChannelType.length == 0) {
                this.showDialog('add', 'info', true, '请选择发送渠道');
                return false;
            }
            if (this.diaChannelType.indexOf('1') > -1 && !this.diaAppMsgId) {
                this.showDialog('add', 'info', true, '请选择App站内信模板');
                return false;
            }
            if (this.diaChannelType.indexOf('2') > -1 && !this.diaAppPushId) {
                this.showDialog('add', 'info', true, '请选择App-push模板');
                return false;
            }
            if (this.diaChannelType.indexOf('3') > -1 && !this.diaShortMsgId) {
                this.showDialog('add', 'info', true, '请选择短信模板');
                return false;
            }
            if (this.diaChannelType.indexOf('4') > -1 && !this.diaWXId) {
                this.showDialog('add', 'info', true, '请选择微信模板');
                return false;
            }
            if (this.diaChannelType.indexOf('5') > -1 && !this.diaWXHighId) {
                this.showDialog('add', 'info', true, '请选择微信高端模板');
                return false;
            }
            if (this.diaChannelType.indexOf('6') > -1 && !this.diaOfficialAccountId) {
                this.showDialog('add', 'info', true, '请选择定投公众号模板');
                return false;
            }
            if (this.diaChannelType.indexOf('7') > -1 && !this.diaIMId) {
                this.showDialog('add', 'info', true, '请选择IM消息模板');
                return false;
            }
            if (!$('#expiredTime').val()) {
                this.showDialog('add', 'info', true, '请填写失效时间');
                return false;
            }
            if (this.diagroupType == '1' && this.selectgroupList.length == 0 && this.showGroup) {
                this.showDialog('add', 'info', true, '请选择要发送的客群');
                return false;
            }
            if (this.diagroupType == '2' && !$('#uploadFileInput').val() && this.showGroup) {
                this.showDialog('add', 'info', true, '请选择要上传的Excel表格');
                return false;
            }
            if (this.diaPushType == '1' && !this.diaRuleKey) {
                this.showDialog('add', 'info', true, '外部系统调用需要填写规则编码');
                return false;
            }
            if (this.diaPushType == '2' && !this.diaRuleKey) {
                this.showDialog('add', 'info', true, '场景化发送方式需要填写规则编码');
                return false;
            }
            if (this.diaPushType == '1' && !this.diaEventType) {
                this.showDialog('add', 'info', true, '外部系统调用发送方式需选择事件类型');
                return false;
            }
            if (this.diaPushType == '2') {
                if (!$('#cron').val() && !$('.cronValue').eq(0).val()) {
                    if(this.diaClassType && !this.diaSubClassType && this.diaSubClassList.length === 0){ // 当该消息分类存在二级分类时不作发送时间校验
                        this.showDialog('add', 'info', true, '场景化发送方式需输入发送时间');
                        return false;
                    }
                }
            }
            if (this.diaPushType == '3' || ( this.diaPushType == '5' && this.diaSubPushType == '1') ) {
                if (!$('#cron').val() && !$('.cronValue').eq(0).val()) {
                    if(this.diaClassType && !this.diaSubClassType && this.diaSubClassList.length === 0){ // 当该消息分类存在二级分类时不作发送时间校验
                        this.showDialog('add', 'info', true, '定时发送方式需输入发送时间');
                        return false;
                    }
                }
            }
            return true;
        },
        getAddDiaData: function () {
            var params = {};
            var _this = this;
            params.ruleName = this.diaRuleName;
            params.categoryId = this.diaClassType;
            params.subCategoryId = this.hasSubClass ? this.diaSubClassType : '';
            params.isTongBuCMS = this.hasSubClass ? this.diaIsTongBuCMS : false;
            if( (this.diaPushType == 0 || (this.diaPushType == 5 && this.diaSubPushType == 0) ) && this.diaIsSeparateSend){ // 发送方式为实时且勾选匀速发送时传true其余情况都为false
                params.is_slow = true;
            }
            else {
                params.is_slow = false;
            }
            var templateChannelList = [];
            this.diaChannelType.forEach(function (value) {
                if (value == '1') {
                    templateChannelList.push({
                        channelType: value,
                        templateId: _this.diaAppMsgId
                    });
                }
                if (value == '2') {
                    templateChannelList.push({
                        channelType: value,
                        templateId: _this.diaAppPushId
                    });
                }
                if (value == '3') {
                    templateChannelList.push({
                        channelType: value,
                        templateId: _this.diaShortMsgId
                    });
                }
                if (value == '4') {
                    templateChannelList.push({
                        channelType: value,
                        templateId: _this.diaWXId
                    });
                }
                if (value == '5') {
                    templateChannelList.push({
                        channelType: value,
                        templateId: _this.diaWXHighId
                    });
                }
                if (value == '6') {
                    templateChannelList.push({
                        channelType: value,
                        templateId: _this.diaOfficialAccountId
                    });
                }
                if (value == '7') {
                    templateChannelList.push({
                        channelType: '2',
                        templateId: _this.diaIMId
                    });
                }
            });
            params.templateChannelList = JSON.stringify(templateChannelList);
            params.pushType = this.diaPushType;
            params.ruleKey = (this.diaPushType == '1' || this.diaPushType == '2') ? this.diaRuleKey : '';
            params.eventType = this.diaPushType == '1' ? this.diaEventType : '';
            params.pushTime = 0;
            (this.diaPushType == '5') && (params.subPushType = this.diaSubPushType);
            if (this.diaPushType == '2' || this.diaPushType == '3' || (this.diaPushType == '5'&&this.diaSubPushType == '1') ) {
                params.schedulePushTime = $('.cronValue').eq(0).val() ? $('.cronValue').eq(0).val() : '';
            }
            else {
                params.schedulePushTime = '';
            }
            params.expiredTime = $('#expiredTime').val();
            params.priority = this.diaPriority;
            params.ruleSource = this.diaRuleSource;
            if (this.showGroup && this.diagroupType == 1) {
                var groupArr = [];
                this.selectgroupList.forEach(function (item) {
                    groupArr.push(item.groupId);
                });
                params.groupId = groupArr.join(',');
            }
            else if (!this.showGroup) {
                params.groupId = '';
            }
            return params;
        },
        showAdd: function () {
            this.updateId = '';
            this.clearAddDia();
            this.getSelectList(1);
            this.getSelectList(2);
            this.getSelectList(3);
            this.getSelectList(4);
            this.getSelectList(5);
            this.getSelectList(6);
            var _this = this;
            // 获取消息类别列表
            if (this.diaClassList.length == 0) {
                $.post({
                    url: '/messageCenter/classMgmt/classMgmt/search.ajax',
                    success: function (result) {
                        if (result.error == 0) {
                            _this.diaClassList = result.data;
                        }
                        else {
                            _this.showDialog('', 'info', false, result.msg);
                        }
                    }
                });
            }
            // 获取默认客群
            if (this.selectgroupList.length == 0 && this.showGroup) {
                $.post({
                    url: '/messageCenter/classMgmt/classMgmt/getInitGroup.ajax',
                    success: function (result) {
                        if (result.error == 0) {
                            _this.selectgroupList = [result.data];
                        }
                    }
                });
            }
            this.showDialog('', 'add');
        },
        showUpdate: function (item) {
            var _this = this;
            this.updateId = item.ruleId;
            this.clearAddDia();
            // 先点击修改,此时弹窗无内容,需要获取弹窗内容
            if (this.diaAppMsgList.length == 0 &&
                this.diaAppPushList.length == 0 &&
                this.diaShortMsgList.length == 0 &&
                this.diaWXList.length == 0 &&
                this.diaWXHighList.length == 0 && 
                this.diaOfficialAccountList.length == 0 &&
                this.diaIMList.length == 0) {
                this.getSelectList(1);
                this.getSelectList(2);
                this.getSelectList(3);
                this.getSelectList(4);
                this.getSelectList(5);
                this.getSelectList(6);
                $.post({
                    url: '/messageCenter/classMgmt/classMgmt/search.ajax',
                    async: false,
                    success: function (result) {
                        if (result.error == 0) {
                            _this.diaClassList = result.data;
                        }
                        else {
                            _this.showDialog('', 'info', false, result.msg);
                        }
                    }
                });
            }
            $.post({
                url: '/messageCenter/ruleMgmt/ruleMgmt/getSubClassList.ajax',
                data: {categoryId: item.categoryId},
                success: function(result) {
                    if (result.error === 0) {
                        if(result.data.length === 0){
                            _this.diaSubClassList = [];
                            _this.hasSubClass = false;
                        }
                        else {
                            _this.diaSubClassList = result.data;
                            _this.hasSubClass = true;
                        }
                    } else {
                        _this.diaSubClassList = [];
                        _this.hasSubClass = false;
                    }
                }
            });
            // 将item中数据填充至弹窗
            this.diaRuleName = item.ruleName;
            this.diaClassType = item.categoryId;
            this.diaSubClassType = item.subCategoryId;
            // IM消息的pushType是1。注意区分两种pushType,模板的pushType代表是否是IM消息，规则的pushType代表发送方式。
            item.templateChannelList.forEach(value=>{
                _this.allTemplate.forEach(currentValue=>{
                    if(currentValue.templateId==value.templateId){
                        _this.diaChannelType.push(currentValue.pushType!=1 ? value.channelType : 7);
                    }
                }) 
            })
            item.templateChannelList.forEach(function (item, index) {
                if (item.channelType == 1) {
                    _this.diaAppMsgId = item.templateId;
                    $('#diaAppMsgList').val(item.templateId);
                    $("#diaAppMsgList").trigger("chosen:updated");
                }
                if (item.channelType == 2) {
                    if (_this.diaChannelType[index] == 2){
                        _this.diaAppPushId = item.templateId;
                        $('#diaAppPushList').val(item.templateId);
                        $("#diaAppPushList").trigger("chosen:updated");
                    }
                    else if (_this.diaChannelType[index] == 7){
                        _this.diaIMId = item.templateId;
                        $('#diaIMList').val(item.templateId);
                        $("#diaIMList").trigger("chosen:updated");
                    }
                }
                if (item.channelType == 3) {
                    _this.diaShortMsgId = item.templateId;
                    $('#diaShortMsgList').val(item.templateId);
                    $("#diaShortMsgList").trigger("chosen:updated");
                }
                if (item.channelType == 4) {
                    _this.diaWXId = item.templateId;
                    $('#diaWXList').val(item.templateId);
                    $("#diaWXList").trigger("chosen:updated");
                }
                if (item.channelType == 5) {
                    _this.diaWXHighId = item.templateId;
                    $('#diaWXHighList').val(item.templateId);
                    $("#diaWXHighList").trigger("chosen:updated");
                }
                if (item.channelType == 6) {
                    _this.diaOfficialAccountId = item.templateId;
                    $('#diaOfficialAccountList').val(item.templateId);
                    $("#diaOfficialAccountList").trigger("chosen:updated");
                }
            });
            this.diaPushType = item.pushType;
            this.diaIsSeparateSend = item.slowStatus;
            if (item.pushType == 0) {
                // 该条数据客群非无客群的情况
                if (item.groupId) {
                    var groupIdArr = item.groupId.split(',');
                    var showGroupArr = item.showGroup.split(',');
                    for (var i = 0; i < groupIdArr.length; i++) {
                        this.selectgroupList.push({
                            check: true,
                            groupId: groupIdArr[i],
                            groupName: showGroupArr[i]
                        });
                    }
                }
            }
            if (item.pushType == 1) {
                this.diaRuleKey = item.ruleKey;
                this.diaEventType = item.eventType;
            }
            if (item.pushType == 2) {
                this.diaRuleKey = item.ruleKey;
                $('#cron').val(item.schedulePushTimeForWeb);
                $('.cronValue').eq(0).val(item.schedulePushTimeForWeb)
            }
            if (item.pushType == 3 || (item.pushType == 5 && item.schedulePushTimeForWeb) ) {
                (item.pushType == 5 && item.schedulePushTimeForWeb) && (this.diaSubPushType = '1');  // 二级分类规则，且有定时时刻值的情况，diaSubPushType显示定时
                $('#cron').val(item.schedulePushTimeForWeb);
                $('.cronValue').eq(0).val(item.schedulePushTimeForWeb)
                // 该条数据客群非无客群的情况
                if (item.groupId) {
                    var groupIdArr = item.groupId.split(',');
                    var showGroupArr = item.showGroup.split(',');
                    for (var i = 0; i < groupIdArr.length; i++) {
                        this.selectgroupList.push({
                            check: true,
                            groupId: groupIdArr[i],
                            groupName: showGroupArr[i]
                        });
                    }
                }
            }
            $('#expiredTime').val(item.expiredTime);
            this.diaRuleSource = item.ruleSource == 'mcp' ? 'e7ad0120840f4ce94e25771f97d4721d' : item.ruleSource;
            $('#diaRuleSource').val(this.diaRuleSource);
            $('#diaRuleSource').trigger('chosen:updated');
            this.diaPriority = item.priority;
            this.showDialog('', 'add');
        },
        getSelectList: function (type) {
            var _this = this;
            if (this.diaAppMsgList.length == 0 ||
                this.diaAppPushList.length == 0 ||
                this.diaShortMsgList.length == 0 ||
                this.diaWXList.length == 0 || 
                this.diaWXHighList.length == 0 ||
                this.diaOfficialAccountList.length == 0 ||
                this.diaIMList.length == 0) {
                $.post({
                    url: '/messageCenter/ruleMgmt/ruleMgmt/getSelectList.ajax',
                    data: {channelType: type},
                    async: false,
                    success: function (result) {
                        if (result.error === 0) {
                            if (type == 1) {
                                _this.diaAppMsgList = result.data;
                                var str = '<option value=""></option>';
                                result.data.forEach(function (item) {
                                    str += '<option value="' + item.templateId + '">' + item.templateName + '</option>';
                                });
                                $('#diaAppMsgList').html(str);
                                $("#diaAppMsgList").trigger("chosen:updated");
                            }
                            else if (type == 2) {
                                _this.diaAppPushList = result.data.filter(k => {
                                    return k.pushType != 1;
                                    });
                                _this.diaIMList = result.data.filter(k => {
                                    return k.pushType == 1;
                                    });
                                var strAppPush = '<option value=""></option>';
                                var strIM = '<option value=""></option>';
                                result.data.forEach(function (item) {
                                    if (item.pushType != 1){
                                        strAppPush += '<option value="' + item.templateId + '">' + item.templateName + '</option>';
                                    }
                                    if (item.pushType == 1){
                                        strIM += '<option value="' + item.templateId + '">' + item.templateName + '</option>';
                                    }
                                });
                                $('#diaAppPushList').html(strAppPush);
                                $("#diaAppPushList").trigger("chosen:updated");
                                $('#diaIMList').html(strIM);
                                $("#diaIMList").trigger("chosen:updated");
                            }
                            else if (type == 3) {
                                _this.diaShortMsgList = result.data;
                                var str = '<option value=""></option>';
                                result.data.forEach(function (item) {
                                    str += '<option value="' + item.templateId + '">' + item.templateName + '</option>';
                                });
                                $('#diaShortMsgList').html(str);
                                $("#diaShortMsgList").trigger("chosen:updated");
                            }
                            else if (type == 4) {
                                _this.diaWXList = result.data;
                                var str = '<option value=""></option>';
                                result.data.forEach(function (item) {
                                    str += '<option value="' + item.templateId + '">' + item.templateName + '</option>';
                                });
                                $('#diaWXList').html(str);
                                $("#diaWXList").trigger("chosen:updated");
                            }
                            else if (type == 5) {
                                _this.diaWXHighList = result.data;
                                var str = '<option value=""></option>';
                                result.data.forEach(function (item) {
                                    str += '<option value="' + item.templateId + '">' + item.templateName + '</option>';
                                });
                                $('#diaWXHighList').html(str);
                                $("#diaWXHighList").trigger("chosen:updated");
                            }
                            else if (type == 6) {
                                _this.diaOfficialAccountList = result.data;
                                var str = '<option value=""></option>';
                                result.data.forEach(function (item) {
                                    str += '<option value="' + item.templateId + '">' + item.templateName + '</option>';
                                });
                                $('#diaOfficialAccountList').html(str);
                                $("#diaOfficialAccountList").trigger("chosen:updated");
                            }
                        }
                        else {
                            _this.showDialog('', 'info', false, result.msg);
                        }
                    }
                });
            }
        },
        add: function () {
            if (!this.checkAddDia()) {
                return;
            }
            var params = this.getAddDiaData();
            var _this = this;
            var url = '';
            if (this.diagroupType == 1 && this.showGroup) {
                if (this.updateId) {
                    url = '/messageCenter/ruleMgmt/ruleMgmt/updateGroupList.ajax';
                    params.ruleId = this.updateId;
                }
                else {
                    url = '/messageCenter/ruleMgmt/ruleMgmt/addGroupList.ajax'
                }
                $.post({
                    url: url,
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            $.post({
                                url: '/messageCenter/ruleMgmt/ruleMgmt/search.ajax',
                                success: function (result) {
                                    if (result.error === 0) {
                                        _this.tableData = result.data;
                                    }
                                }
                            });
                            _this.showDialog('add', 'info', false, result.msg);
                        }
                        else {
                            _this.showDialog('add', 'info', true, result.msg);
                        }
                    }
                });
            }
            else if (this.diagroupType == 2 && this.showGroup) {
                var channelArr = [];
                var templateArr = [];
                var arr = JSON.parse(params.templateChannelList);
                arr.forEach(function (item) {
                    channelArr.push(item.channelType);
                    templateArr.push(item.templateId);
                });
                params.channelArr = channelArr.join(',');
                params.templateArr = templateArr.join(',');
                if (this.updateId) {
                    url = '/messageCenter/ruleMgmt/ruleMgmt/updateAddExcel.ajax';
                    params.ruleId = this.updateId;
                }
                else {
                    url = '/messageCenter/ruleMgmt/ruleMgmt/addExcel.ajax'
                }
                $.ajaxFileUpload({
                    url: url,
                    type: 'POST',
                    data: params,
                    dataType: 'json',
                    fileElementId: 'uploadFileInput',
                    success: function (result) {
                        if (result.error === 0) {
                            $.post({
                                url: '/messageCenter/ruleMgmt/ruleMgmt/search.ajax',
                                success: function (result) {
                                    if (result.error === 0) {
                                        _this.tableData = result.data;
                                    }
                                }
                            });
                            _this.showDialog('add', 'info', false, result.msg);
                        }
                        else {
                            _this.showDialog('add', 'info', true, result.msg);
                        }
                    }
                });
            }
            else if (!this.showGroup) {
                if (this.updateId) {
                    url = '/messageCenter/ruleMgmt/ruleMgmt/updateGroupList.ajax';
                    params.ruleId = this.updateId;
                }
                else {
                    url = '/messageCenter/ruleMgmt/ruleMgmt/addGroupList.ajax'
                }
                $.post({
                    url: url,
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            $.post({
                                url: '/messageCenter/ruleMgmt/ruleMgmt/search.ajax',
                                success: function (result) {
                                    if (result.error === 0) {
                                        _this.tableData = result.data;
                                    }
                                }
                            });
                            _this.showDialog('add', 'info', false, result.msg);
                        }
                        else {
                            _this.showDialog('add', 'info', true, result.msg);
                        }
                    }
                });
            }
        },
        showTemplate: function (templateChannelList) {
            var templateNum = templateChannelList.length;
            var count = 0;
            var _this = this;
            _this.templateDetailList = [];
            templateChannelList.forEach(function (item) {
                var params = {
                    templateId: item.templateId
                };
                $.post({
                    url: '/messageCenter/ruleMgmt/ruleMgmt/queryTemplate.ajax',
                    data: params,
                    success: function (result) {
                        count++;
                        _this.templateDetailList.push(result.error == 0 ? result.data : {});
                        if (count == templateNum) {
                            _this.showDialog('', 'templateList');
                        }
                    }
                });

            });

        },
        showTemplateDetail: function (item) {
            this.diaTemplateDetail.templateName = item.templateName;
            this.diaTemplateDetail.channelType = item.channelType;
            this.diaTemplateDetail.showChannelType = item.showChannelType;
            this.diaTemplateDetail.title = item.title;
            this.diaTemplateDetail.summary = item.summary;
            this.diaTemplateDetail.content = item.content;
            this.diaTemplateDetail.url = item.url;
            this.diaTemplateDetail.pushType = item.pushType;
            if (item.pushType == 1 && item.channelType == 2){
                this.diaTemplateDetail.showChannelType = "IM消息";
            }
            $('#startTime').val(item.startTime);
            $('#endTime').val(item.endTime);
            this.showDialog('templateList', 'templateDetail', true);
        },
        showDelete: function (index) {
            this.deleteId = this.viewData[index].ruleId;
            this.showDialog('', 'delete');
        },
        deleteData: function () {
            var _this = this;
            var params = {};
            params.routeRuleId = this.deleteId;
            $.post({
                url: '/messageCenter/ruleMgmt/ruleMgmt/del.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        $.post({
                            url: '/messageCenter/ruleMgmt/ruleMgmt/search.ajax',
                            success: function (result) {
                                if (result.error === 0) {
                                    _this.tableData = result.data;
                                }
                            }
                        });
                        _this.showDialog('delete', 'info', false, result.msg);
                    }
                    else if (result.error == 1006) {
                        _this.showDialog('delete', 'info', false, '该规则已被使用，暂不可删除');
                    }
                    else {
                        _this.showDialog('delete', 'info', false, result.msg);
                    }
                }
            });
        },
        showgroup: function () {
            var _this = this;
            if (this.groupList.length == 0) {
                $.post({
                    url: '/messageCenter/ruleMgmt/ruleMgmt/getGroupList.ajax',
                    async: false,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.groupList = result.data;
                            var groupIds = _this.groupList.map(function (item) {
                                return item.groupId;
                            });
                            groupIds.forEach(function (groupId) {
                                $.post({
                                    url: '/messageCenter/ruleMgmt/ruleMgmt/getGroupNum.ajax',
                                    data: {groupIds: JSON.stringify([groupId])},
                                    success: function (result) {
                                        if (result.error === 0) {
                                            _this.groupList.forEach(function (item) {
                                                if (item.groupId == groupId) {
                                                    item.groupNum = result.data.toString();
                                                }
                                            });
                                        }
                                        else {
                                            _this.groupList.forEach(function (item) {
                                                if (item.groupId == groupId) {
                                                    item.groupNum = '获取失败';
                                                }
                                            });
                                        }
                                    }
                                });
                            });

                        }
                        else {
                            _this.groupList = [];
                        }
                    }
                });
            }
            this.groupList.forEach(function (item) {
                item.check = false;
            });
            this.selectgroupList.forEach(function (item) {
                var _index = _this.inSelected(item, _this.groupList, 'groupId');
                if (_index > -1) {
                    _this.groupList[_index].check = true;
                }
            });
            this.showDialog('add', 'groupList', true);
        },
        groupAdd: function (index) {
            var item = this.groupList[index];
            var staticItem = this.groupList[this.inSelected({groupId: '00000'}, this.groupList, 'groupId')];
            if (!item.check && item.groupId == staticItem.groupId) {
                this.groupList.forEach(function (item) {
                    item.check = false;
                });
                item.check = true;
                return;
            }
            if (staticItem.check && item.groupId != staticItem.groupId) {
                staticItem.check = false;
            }
            item.check = !item.check;
        },
        savegroup: function () {
            var _this = this;
            this.selectgroupList = [];
            this.groupList.forEach(function (item) {
                if (item.check) {
                    _this.selectgroupList.push(item);
                }
            });
            this.showDialog('groupList');
        },
        jumpOtherPage:function(){
            window.open('/messageCenter/templateMgmt/templateMgmt.html?openNewDialog="1"')
        },
        refreshList:function(){
            this.diaChannelType.forEach(function(type){
                if (type == 7) {
                    return true; 
                }
                $.post({
                    url: '/messageCenter/ruleMgmt/ruleMgmt/getSelectList.ajax',
                    data: {channelType: type},
                    async: false,
                    success: function (result) {
                        if (result.error === 0) {
                            if (type == 1) {
                                this.diaAppMsgList = result.data;
                                var str = '<option value=""></option>';
                                result.data.forEach(function (item) {
                                    str += '<option value="' + item.templateId + '">' + item.templateName + '</option>';
                                });
                                $('#diaAppMsgList').html(str);
                                $("#diaAppMsgList").trigger("chosen:updated");
                            }
                            else if (type == 2) {
                                this.diaAppPushList = result.data.filter(k => {
                                    return k.pushType != 1;
                                    });
                                    this.diaIMList = result.data.filter(k => {
                                    return k.pushType == 1;
                                    });
                                var strAppPush = '<option value=""></option>';
                                var strIM = '<option value=""></option>';
                                result.data.forEach(function (item) {
                                    if (item.pushType != 1){
                                        strAppPush += '<option value="' + item.templateId + '">' + item.templateName + '</option>';
                                    }
                                    if (item.pushType == 1){
                                        strIM += '<option value="' + item.templateId + '">' + item.templateName + '</option>';
                                    }
                                });
                                $('#diaAppPushList').html(strAppPush);
                                $("#diaAppPushList").trigger("chosen:updated");
                                $('#diaIMList').html(strIM);
                                $("#diaIMList").trigger("chosen:updated");
                            }
                            else if (type == 3) {
                                this.diaShortMsgList = result.data;
                                var str = '<option value=""></option>';
                                result.data.forEach(function (item) {
                                    str += '<option value="' + item.templateId + '">' + item.templateName + '</option>';
                                });
                                $('#diaShortMsgList').html(str);
                                $("#diaShortMsgList").trigger("chosen:updated");
                            }
                            else if (type == 4) {
                                this.diaWXList = result.data;
                                var str = '<option value=""></option>';
                                result.data.forEach(function (item) {
                                    str += '<option value="' + item.templateId + '">' + item.templateName + '</option>';
                                });
                                $('#diaWXList').html(str);
                                $("#diaWXList").trigger("chosen:updated");
                            }
                            else if (type == 5) {
                                this.diaWXHighList = result.data;
                                var str = '<option value=""></option>';
                                result.data.forEach(function (item) {
                                    str += '<option value="' + item.templateId + '">' + item.templateName + '</option>';
                                });
                                $('#diaWXHighList').html(str);
                                $("#diaWXHighList").trigger("chosen:updated");
                            }
                            else if (type == 6) {
                                this.diaOfficialAccountList = result.data;
                                var str = '<option value=""></option>';
                                result.data.forEach(function (item) {
                                    str += '<option value="' + item.templateId + '">' + item.templateName + '</option>';
                                });
                                $('#diaOfficialAccountList').html(str);
                                $("#diaOfficialAccountList").trigger("chosen:updated");
                            }
                        }
                        else {
                            this.showDialog('', 'info', false, result.msg);
                        }
                    }.bind(this)
                });
            }.bind(this))
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
        },
        inSelected: function (item, arr, prop) {
            var _index = -1;
            arr.forEach(function (value, index) {
                if (item[prop] == value[prop]) {
                    _index = index;
                }
            });
            return _index;
        },
        getUrlParam: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg); //匹配目标参数
            if (r != null) return unescape(r[2]);
            return '';
        }
    }
});
