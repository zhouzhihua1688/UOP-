new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        templateId: '',
        templateName: '',
        creator: '',
        channelType: '',
        deleteId: '',
        updateId: '',
        loadingShow: false,
        tableData: [],
        diaMsg: '',
        // 新增弹窗相关数据
        diaTemplateName: '',
        diaTemplateExplain: '',
        diaChannelType: '1',
        diaTitle: '',
        diaWXType: 'servive',
        initTextColor: '#173177',
        diaWXData1: {
            text1: '',
            text2: '',
            text3: '',
            text4: '',
            text5: '',
            textColor1: '',
            textColor2: '',
            textColor3: '',
            textColor4: '',
            textColor5: ''
        },
        diaWXData2: {
            text1: '',
            text2: '',
            text3: '',
            text4: '',
            text5: '',
            text6: '',
            textColor1: '',
            textColor2: '',
            textColor3: '',
            textColor4: '',
            textColor5: '',
            textColor6: ''
        },
        diaWXData3: {
            text1: '',
            text2: '',
            text3: '',
            textColor1: '',
            textColor2: '',
            textColor3: ''
        },
        diaWXData4: {
            text1: '',
            text2: '',
            text3: '',
            text4: '',
            textColor1: '',
            textColor2: '',
            textColor3: '',
            textColor4: ''
        },
        diaWXData5: {
            text1: '',
            text2: '',
            text3: '',
            text4: '',
            textColor1: '',
            textColor2: '',
            textColor3: '',
            textColor4: ''
        },
        diaWXData6: {
            text1: '',
            text2: '',
            text3: '',
            text4: '',
            text5: '',
            textColor1: '',
            textColor2: '',
            textColor3: '',
            textColor4: '',
            textColor5: ''
        },
        diaWXHighType: 'highTrade',
        diaWXHighData1: {
            text1: '',
            text2: '',
            text3: '',
            text4: '',
            text5: '',
            text6: ''
        },
        diaWXHighData2: {
            text1: '',
            text2: '',
            text3: '',
            text4: '',
            text5: ''
        },
        diaWXHighData3: {
            text1: '',
            text2: '',
            text3: '',
            text4: ''
        },
        diaOfficialAccountType: 'report',
        diaOfficialAccountData1: {
            text1: '',
            text2: '',
            text3: '',
            text4: ''
        },
        diaOfficialAccountData2: {
            text1: '',
            text2: '',
            text3: '',
            text4: ''
        },
        diaOfficialAccountData3: {
            text1: '',
            text2: '',
            text3: '',
            text4: ''
        },
        diaOfficialAccountData4: {
            text1: '',
            text2: '',
            text3: '',
            text4: ''
        },
        diaWXAppId: '',
        diaWXPagePath: '',
        diaContent: '',
        diaLinkType: '其他链接',
        jumpLinkList: [{
            name: '基金详情页面',
            url: 'htffundxjb://action?type=fd',
        }, {
            name: '现金宝充值页面',
            url: 'htffundxjb://action?type=rc',
        }, {
            name: '现金宝取现页面',
            url: 'htffundxjb://action?type=tb',
        }, {
            name: '信用卡还款服务页面',
            url: 'htffundxjb://action?type=crs',
        }, {
            name: '基金超市页面',
            url: 'htffundxjb://action?type=fa',
        }, {
            name: '基金购买页面',
            url: 'htffundxjb://action?type=fp',
        }, {
            name: '高端产品详情页面',
            url: 'htffundxjb://action?type=tfd',
        }, {
            name: '高端产品列表页面',
            url: 'htffundxjb://action?type=tfl',
        }, {
            name: '高端理财预约码页面',
            url: 'htffundxjb://action?type=tfr',
        }, {
            name: '体验卡充值页面',
            url: 'htffundxjb://action?type=swk',
        }, {
            name: '其他链接',
            url: '',
        }],
        diafundId: '',
        showPushUrl: true,
        diaUrl: '',
        showTimeInterval: false,
        timeInterval: 0,
        queryChannel: 0,  //区分查询渠道是App-push还是IM消息
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
        // 微信模板类型
        isWXtype1: function () {
            return this.diaChannelType == 4 && this.diaWXType === 'servive';
        },
        isWXtype2: function () {
            return this.diaChannelType == 4 && this.diaWXType === 'trade';
        },
        isWXtype3: function () {
            return this.diaChannelType == 4 && this.diaWXType === 'monthBill';
        },
        isWXtype4: function () {
            return this.diaChannelType == 4 && this.diaWXType === 'investment';
        },
        isWXtype5: function () {
            return this.diaChannelType == 4 && this.diaWXType === 'navUpdate';
        },
        isWXtype6: function () {
            return this.diaChannelType == 4 && this.diaWXType === 'notice';
        },
        // 微信高端模板类型
        isWXHighType1: function () {
            return this.diaChannelType == 5 && this.diaWXHighType === 'highTrade';
        },
        isWXHighType2: function () {
            return this.diaChannelType == 5 && this.diaWXHighType === 'highService';
        },
        isWXHighType3: function () {
            return this.diaChannelType == 5 && this.diaWXHighType === 'highInvestment';
        },
        // 定投公众号模板类型
        isOfficialAccount1: function(){
            return this.diaChannelType == 6 && this.diaOfficialAccountType === 'report';
        },
        isOfficialAccount2: function(){
            return this.diaChannelType == 6 && this.diaOfficialAccountType === 'id';
        },
        isOfficialAccount3: function(){
            return this.diaChannelType == 6 && this.diaOfficialAccountType === 'review';
        },
        isOfficialAccount4: function(){
            return this.diaChannelType == 6 && this.diaOfficialAccountType === 'unbind';
        },
        // 标识是否显示跳转页面select
        jumpPageShow: function () {
            // 当点击增加时
            if (!this.updateId) {
                if (this.diaChannelType == 1 || this.diaChannelType == 2) {
                    return true;
                }
                if (this.diaChannelType == 3) {
                    return false;
                }
                if (this.diaChannelType == 4) {
                    return false;
                }
                if (this.diaChannelType == 5) {
                    return false;
                }
                if (this.diaChannelType == 6) {
                    return false;
                }
                if (this.diaChannelType == 7) {
                    return false;
                }
                return true;
            }
            // 当点击修改时
            else {
                return false;
            }
        },
        // 标识是否显示跳转链接input
        jumpLinkShow: function () {
            // 当点击增加时
            if (!this.updateId) {
                if (this.diaChannelType == 1 && this.diaLinkType == '空') {
                    return false;
                }
                if (this.diaChannelType == 2 && this.diaLinkType == '后端配置') {
                    return false;
                }
                if (this.diaChannelType == 3) {
                    return false;
                }
                if (this.diaChannelType == 6) {
                    return false;
                }
                if (this.diaChannelType == 7) {
                    return false;
                }
                return true;
            }
            // 当点击修改时
            else {
                if (this.diaChannelType == 3) {
                    return false;
                }
                if (this.diaChannelType == 6) {
                    return false;
                }
                if (!this.showPushUrl) {
                    return false;
                }
                return true;
            }
        },
        // 标识是否显示基金IDinput
        hasfundId: function () {
            if (!this.updateId) {
                return this.diaLinkType == '基金详情页面' || this.diaLinkType == '基金购买页面' || this.diaLinkType == '高端产品详情页面';
            }
            else {
                return false;
            }
        },
        needShowPreUrl: function () {
            if (!this.updateId) {
                if (this.diaLinkType == '其他链接') {
                    return true
                }
                return false;
            }
            else {
                if (!this.showPushUrl) {
                    return false;
                }
                return true;
            }
        },
        needInputUrl: function () {
            if (!this.updateId) {
                if (this.diaLinkType == '其他链接') {
                    return true
                }
                if (this.diaLinkType == '空' && this.diaChannelType == 2) {
                    return true
                }
                return false;
            }
            else {
                if (!this.showPushUrl) {
                    return false;
                }
                return true;
            }
        },
        isNullUrl: function () {
            return (this.diaLinkType == '空' || this.diaLinkType == '后端配置');
        },
        showDiaUrl: function () {
            var url = '';
            for (var i = 0; i < this.jumpLinkList.length; i++) {
                if (this.jumpLinkList[i].name == this.diaLinkType) {
                    url = this.jumpLinkList[i].url;
                    break;
                }
            }
            if (this.hasfundId) {
                url += ('&fundId=' + this.diafundId);
            }
            return url;
        }
    },
    watch: {
        pageMaxNum: function () {
            this.currentIndex = 0;
        },
        condition: function () {
            this.currentIndex = 0;
        },
        diaChannelType: function () {
            this.diaLinkType = '其他链接';
        },
        diaLinkType: function () {
            this.diafundId = '';
            this.diaUrl = '';
        }
    },
    mounted: function () {
        var _this = this;
        var dialogs = ['delete', 'info', 'addExcel', 'updateExcel'];
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
        $('#uploadBtn').click(function () {
            $('#uploadFileInput').click();
        });
        $('#updateBtn').click(function () {
            $('#updateFileInput').click();
        });
        $.post({
            url: '/messageCenter/templateMgmt/templateMgmt/search.ajax',
            success: function (result) {
                if (result.error === 0) {
                    _this.tableData = result.data;
                }
                else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });
        // 其他页面跳转并打开新增窗口
        if(this.getUrlParam('openNewDialog')){
            this.showAdd();
        }
    },
    methods: {
        //模板管理业务方法
        search: function () {
            this.currentIndex = 0;
            var _this = this;
            var params = {};
            params.templateId = this.templateId;
            params.templateName = this.templateName;
            params.creator = this.creator;
            params.channelType = this.channelType;
            if (_this.channelType == 2){
                _this.queryChannel = 1;
            }
            else if (_this.channelType == 7){
                params.channelType = 2;
                _this.queryChannel = 2;
            }
            else {
                _this.queryChannel = 0;
            }
            var url = '/messageCenter/templateMgmt/templateMgmt/search.ajax';
            if (params.templateName || params.templateId || params.creator || params.channelType) {
                url = '/messageCenter/templateMgmt/templateMgmt/query.ajax';
            }
            $.post({
                url: url,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        if (_this.queryChannel == 0) {
                            _this.tableData = result.data
                        }
                        //App-Push
                        else if (_this.queryChannel == 1) { 
                            _this.tableData = result.data.filter(k => {
                                return k.pushType != 1;
                                });
                        }
                        //IM消息
                        else if (_this.queryChannel == 2) {
                            _this.tableData = result.data.filter(k => {
                                return k.pushType == 1;
                                });
                        }
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        clearAddDia: function () {
            this.diaTemplateName = '';
            this.diaTemplateExplain = '';
            this.diaChannelType = '1';
            // 微信模板状态清空
            this.diaWXType = 'servive';
            for (var prop in this.diaWXData1) {
                this.diaWXData1[prop] = '';
            }
            for (var prop in this.diaWXData2) {
                this.diaWXData2[prop] = '';
            }
            for (var prop in this.diaWXData3) {
                this.diaWXData3[prop] = '';
            }
            for (var prop in this.diaWXData4) {
                this.diaWXData4[prop] = '';
            }
            for (var prop in this.diaWXData5) {
                this.diaWXData5[prop] = '';
            }
            for (var prop in this.diaWXData6) {
                this.diaWXData6[prop] = '';
            }
            // 微信高端模板状态清空
            this.diaWXHighType = 'highTrade';
            for (var prop in this.diaWXHighData1) {
                this.diaWXHighData1[prop] = '';
            }
            for (var prop in this.diaWXHighData2) {
                this.diaWXHighData2[prop] = '';
            }
            for (var prop in this.diaWXHighData3) {
                this.diaWXHighData3[prop] = '';
            }
            // 定投公众号模板状态清空
            this.diaOfficialAccountType = 'report';
            for (var prop in this.diaOfficialAccountData1) {
                this.diaOfficialAccountData1[prop] = '';
            }
            for (var prop in this.diaOfficialAccountData2) {
                this.diaOfficialAccountData2[prop] = '';
            }
            for (var prop in this.diaOfficialAccountData3) {
                this.diaOfficialAccountData3[prop] = '';
            }
            for (var prop in this.diaOfficialAccountData4) {
                this.diaOfficialAccountData4[prop] = '';
            }
            // 小程序相关字段清空
            this.diaWXAppId = '';
            this.diaWXPagePath = '';
            this.diaTitle = '';
            this.diaLinkType = '其他链接';
            this.showPushUrl = true;
            this.diafundId = '';
            this.diafundName = '';
            this.diaUrl = '';
            this.showTimeInterval = false;
            this.timeInterval = 0;
            $('#startTime').val('');
            $('#endTime').val('');
            this.diaContent = '';
        },
        showAddExcel: function () {
            $('#uploadFileInput').change(function () {
                $('#uploadInput').val($(this).val());
            });
            $('#uploadInput').val('');
            $('#uploadFileInput').val('');
            this.showDialog('', 'addExcel');
        },
        addExcel: function () {
            var excelData = $('#uploadFileInput').get(0).files[0];
            if (!excelData) {
                this.showDialog('addExcel', 'info', true, '未选择文件');
                return;
            }
            var fileType = excelData.name.split('.')[excelData.name.split('.').length - 1];
            if (fileType !== 'xlsx') {
                this.showDialog('addExcel', 'info', true, '上传文件格式错误,请上传.xlsx文件');
                return;
            }
            //转化文件成json格式
            var _this = this;
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
                _this.showDialog('addExcel');
                _this.loadingShow = true;
                $.post({
                    url: '/messageCenter/templateMgmt/templateMgmt/addByExcel.ajax',
                    data: {
                        ExcelData: JSON.stringify(jsonData)
                    },
                    success: function (result) {
                        _this.loadingShow = false;
                        if (result.error === 0) {
                            _this.showDialog('', 'info', false, result.msg);
                            $.post({
                                url: '/messageCenter/templateMgmt/templateMgmt/search.ajax',
                                success: function (body) {
                                    if (body.error === 0) {
                                        _this.tableData = body.data;
                                    }
                                }
                            });
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
        showUpdateExcel: function () {
            $('#updateFileInput').change(function () {
                $('#updateInput').val($(this).val());
            });
            $('#updateInput').val('');
            $('#updateFileInput').val('');
            this.showDialog('', 'updateExcel');
        },
        updateExcel: function () {
            var excelData = $('#updateFileInput').get(0).files[0];
            if (!excelData) {
                this.showDialog('updateExcel', 'info', true, '未选择文件');
                return;
            }
            var fileType = excelData.name.split('.')[excelData.name.split('.').length - 1];
            if (fileType !== 'xlsx') {
                this.showDialog('updateExcel', 'info', true, '上传文件格式错误,请上传.xlsx文件');
                return;
            }
            //转化文件成json格式
            var _this = this;
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
                _this.showDialog('updateExcel');
                _this.loadingShow = true;
                $.post({
                    url: '/messageCenter/templateMgmt/templateMgmt/updateByExcel.ajax',
                    data: {
                        ExcelData: JSON.stringify(jsonData)
                    },
                    success: function (result) {
                        _this.loadingShow = false;
                        if (result.error === 0) {
                            _this.showDialog('', 'info', false, result.msg);
                            $.post({
                                url: '/messageCenter/templateMgmt/templateMgmt/search.ajax',
                                success: function (body) {
                                    if (body.error === 0) {
                                        _this.tableData = body.data;
                                    }
                                }
                            });
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
        showWXContent: function () {
            var fixColor = function(colorStr){
                if(/^#[a-fA-F\d]{6}$/.test(colorStr)){
                    return colorStr;
                }
                if(/[a-fA-F\d]{6}$/.test(colorStr)){
                    return '#' + colorStr;
                }
                return '';
            }
            var str = '';
            if (this.diaChannelType == 4) {
                if (this.diaWXType == 'servive') {
                    str += '<span style="color: ' + fixColor(this.diaWXData1.textColor1) + ';">' + this.diaWXData1.text1 + '</span>'  + '<br>';
                    str += '服务名称:' + '<span style="color: ' + fixColor(this.diaWXData1.textColor2) + ';">' + this.diaWXData1.text2 + '</span>'  + '<br>';
                    str += '服务状态:' + '<span style="color: ' + fixColor(this.diaWXData1.textColor3) + ';">' + this.diaWXData1.text3 + '</span>'  + '<br>';
                    str += '问题详情:' + '<span style="color: ' + fixColor(this.diaWXData1.textColor4) + ';">' + this.diaWXData1.text4 + '</span>'  + '<br>';
                    str += '<span style="color: ' + fixColor(this.diaWXData1.textColor5) + ';">' + this.diaWXData1.text5 + '</span>';
                }
                if (this.diaWXType == 'trade') {
                    str += '<span style="color: ' + fixColor(this.diaWXData2.textColor1) + ';">' + this.diaWXData2.text1 + '</span>'  + '<br>';
                    str += '业务:' + '<span style="color: ' + fixColor(this.diaWXData2.textColor2) + ';">' + this.diaWXData2.text2 + '</span>'  + '<br>';
                    str += '金额:' + '<span style="color: ' + fixColor(this.diaWXData2.textColor3) + ';">' + this.diaWXData2.text3 + '</span>'  + '<br>';
                    str += '状态:' + '<span style="color: ' + fixColor(this.diaWXData2.textColor4) + ';">' + this.diaWXData2.text4 + '</span>'  + '<br>';
                    str += '时间:' + '<span style="color: ' + fixColor(this.diaWXData2.textColor5) + ';">' + this.diaWXData2.text5 + '</span>'  + '<br>';
                    str += '<span style="color: ' + fixColor(this.diaWXData2.textColor6) + ';">' + this.diaWXData2.text6 + '</span>';
                }
                if (this.diaWXType == 'monthBill') {
                    str += '<span style="color: ' + fixColor(this.diaWXData3.textColor1) + ';">' + this.diaWXData3.text1 + '</span>'  + '<br>';
                    str += '姓名:(由custNo自动获取)<br>';
                    str += '对账单日期:' + '<span style="color: ' + fixColor(this.diaWXData3.textColor2) + ';">' + this.diaWXData3.text2 + '</span>'  + '<br>';
                    str += '<span style="color: ' + fixColor(this.diaWXData3.textColor3) + ';">' + this.diaWXData3.text3 + '</span>';
                }
                if (this.diaWXType == 'investment') {
                    str += '<span style="color: ' + fixColor(this.diaWXData4.textColor1) + ';">' + this.diaWXData4.text1 + '</span>'  + '<br>';
                    str += '服务名称:' + '<span style="color: ' + fixColor(this.diaWXData4.textColor2) + ';">' + this.diaWXData4.text2 + '</span>'  + '<br>';
                    str += '服务时间:' + '<span style="color: ' + fixColor(this.diaWXData4.textColor3) + ';">' + this.diaWXData4.text3 + '</span>'  + '<br>';
                    str += '<span style="color: ' + fixColor(this.diaWXData4.textColor4) + ';">' + this.diaWXData4.text4 + '</span>';

                }
                if (this.diaWXType == 'navUpdate') {
                    str += '<span style="color: ' + fixColor(this.diaWXData5.textColor1) + ';">' + this.diaWXData5.text1 + '</span>'  + '<br>';
                    str += '净值日期:' + '<span style="color: ' + fixColor(this.diaWXData5.textColor2) + ';">' + this.diaWXData5.text2 + '</span>'  + '<br>';
                    str += '净值信息:' + '<span style="color: ' + fixColor(this.diaWXData5.textColor3) + ';">' + this.diaWXData5.text3 + '</span>'  + '<br>';
                    str += '<span style="color: ' + fixColor(this.diaWXData5.textColor4) + ';">' + this.diaWXData5.text4 + '</span>';
                }
                if (this.diaWXType == 'notice') {
                    str += '<span style="color: ' + fixColor(this.diaWXData6.textColor1) + ';">' + this.diaWXData6.text1 + '</span>'  + '<br>';
                    str += '活动名称:' + '<span style="color: ' + fixColor(this.diaWXData6.textColor2) + ';">' + this.diaWXData6.text2 + '</span>'  + '<br>';
                    str += '账户昵称:' + '<span style="color: ' + fixColor(this.diaWXData6.textColor3) + ';">' + this.diaWXData6.text3 + '</span>'  + '<br>';
                    str += '申请时间:' + '<span style="color: ' + fixColor(this.diaWXData6.textColor4) + ';">' + this.diaWXData6.text4 + '</span>'  + '<br>';
                    str += '<span style="color: ' + fixColor(this.diaWXData6.textColor5) + ';">' + this.diaWXData6.text5 + '</span>';
                }
            }
            else if (this.diaChannelType == 5) {
                if(this.diaWXHighType == 'highTrade'){
                    str += this.diaWXHighData1.text1 + '<br>';
                    str += '业务:' + this.diaWXHighData1.text2 + '<br>';
                    str += '金额:' + this.diaWXHighData1.text3 + '<br>';
                    str += '状态:' + this.diaWXHighData1.text4 + '<br>';
                    str += '时间:' + this.diaWXHighData1.text5 + '<br>';
                    str += this.diaWXHighData1.text6 + '<br>';
                }
                if(this.diaWXHighType == 'highService'){
                    str += this.diaWXHighData2.text1 + '<br>';
                    str += '服务名称:' + this.diaWXHighData2.text2 + '<br>';
                    str += '服务状态:' + this.diaWXHighData2.text3 + '<br>';
                    str += '问题详情:' + this.diaWXHighData2.text4 + '<br>';
                    str += this.diaWXHighData2.text5 + '<br>';
                }
                if(this.diaWXHighType == 'highInvestment'){
                    str += this.diaWXHighData3.text1 + '<br>';
                    str += '服务名称:' + this.diaWXHighData3.text2 + '<br>';
                    str += '服务时间:' + this.diaWXHighData3.text3 + '<br>';
                    str += this.diaWXHighData3.text4 + '<br>';
                }
            }
            else if (this.diaChannelType == 6) {
                if(this.diaOfficialAccountType == 'report'){
                    str += this.diaOfficialAccountData1.text1 + '<br>';
                    str += '报表类型:' + this.diaOfficialAccountData1.text2 + '<br>';
                    str += '统计日期:' + this.diaOfficialAccountData1.text3 + '<br>';
                    str += this.diaOfficialAccountData1.text4 + '<br>';
                }
                if(this.diaOfficialAccountType == 'id'){
                    str += this.diaOfficialAccountData2.text1 + '<br>';
                    str += '客户姓名:' + this.diaOfficialAccountData2.text2 + '<br>';
                    str += '时间:' + this.diaOfficialAccountData2.text3 + '<br>';
                    str += this.diaOfficialAccountData2.text4 + '<br>';
                }
                if(this.diaOfficialAccountType == 'review'){
                    str += this.diaOfficialAccountData3.text1 + '<br>';
                    str += '审核结果:' + this.diaOfficialAccountData3.text2 + '<br>';
                    str += '审核日期:' + this.diaOfficialAccountData3.text3 + '<br>';
                    str += this.diaOfficialAccountData3.text4 + '<br>';
                }
                if(this.diaOfficialAccountType == 'unbind'){
                    str += this.diaOfficialAccountData4.text1 + '<br>';
                    str += '解除账户:' + this.diaOfficialAccountData4.text2 + '<br>';
                    str += '解绑时间:' + this.diaOfficialAccountData4.text3 + '<br>';
                    str += this.diaOfficialAccountData4.text4 + '<br>';
                }
            }
            this.diaContent = str;
        },
        showAdd: function () {
            this.clearAddDia();
            this.updateId = '';
            this.showDialog('', 'add');
        },
        checkDiaData: function (channelType) {
            if (!this.diaTemplateName) {
                this.showDialog('add', 'info', true, '模板名称不能为空!');
                return false;
            }
            if (!this.diaContent && channelType != 4 && channelType != 5 && channelType != 6) {
                this.showDialog('add', 'info', true, '模板内容不能为空!');
                return false;
            }
            if (channelType == 1) {
                if (!this.diaTitle) {
                    this.showDialog('add', 'info', true, '标题不能为空!');
                    return false;
                }
                if (!this.diaTemplateExplain) {
                    this.showDialog('add', 'info', true, '模板摘要不能为空!');
                    return false;
                }
                if (this.hasfundId && !this.diafundId) {
                    this.showDialog('add', 'info', true, '未填写基金ID!');
                    return false;
                }
                if (this.needInputUrl && !this.diaUrl && !this.updateId) {
                    this.showDialog('add', 'info', true, '未填写链接地址!');
                    return false;
                }
                if (!$('#startTime').val()) {
                    this.showDialog('add', 'info', true, '开始时间不能为空!');
                    return false;
                }
                if (!$('#endTime').val()) {
                    this.showDialog('add', 'info', true, '结束时间不能为空!');
                    return false;
                }
                if (!this.showTimeInterval) {
                    var timeReg = /([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8])))/;
                    if (!timeReg.test($('#startTime').val()) || !timeReg.test($('#endTime').val())) {
                        this.showDialog('add', 'info', true, '开始时间或结束时间输入格式有误!');
                        return false;
                    }
                    var startTime = new Date($('#startTime').val().replace(/-/g, '/'));
                    var endTime = new Date($('#endTime').val().replace(/-/g, '/'));
                    if (startTime > endTime) {
                        this.showDialog('add', 'info', true, '结束时间在开始时间之前,请重新输入!');
                        return false;
                    }
                }
                else {
                    if (!this.timeInterval) {
                        this.showDialog('add', 'info', true, '请填写时间间隔!');
                        return false;
                    }
                }
                return true;
            }
            else if (channelType == 2) {
                if (!this.diaTitle) {
                    this.showDialog('add', 'info', true, '标题不能为空!');
                    return false;
                }
                var bytesCount = 0;
                for (var i = 0; i < this.diaContent.length; i++) {
                    var c = this.diaContent.charAt(i);
                    if (/^[\u0000-\u00ff]$/.test(c)) {
                        bytesCount += 1;
                    } else {
                        bytesCount += 2;
                    }
                }
                if (bytesCount > 255) {
                    this.showDialog('add', 'info', true, '模板内容不能超过255字节!');
                    return false;
                }
                if (this.hasfundId && !this.diafundId) {
                    this.showDialog('add', 'info', true, '未填写基金ID!');
                    return false;
                }
                if (this.needInputUrl && !this.diaUrl && this.showPushUrl) {
                    this.showDialog('add', 'info', true, '未填写链接地址!');
                    return false;
                }
                return true;
            }
            // 短信模板和IM消息模板
            else if (channelType == 3|| channelType == 7) {
                return true;
            }
            // 微信模板
            else if (channelType == 4) {
                if (!this.diaWXType) {
                    this.showDialog('add', 'info', true, '请选择一个微信模板');
                    return false;
                }
                if (this.diaWXType == 'servive') {
                    if (!this.diaWXData1.text1) {
                        this.showDialog('add', 'info', true, '欢迎语不能为空');
                        return false;
                    }
                    if (!this.diaWXData1.text2) {
                        this.showDialog('add', 'info', true, '服务名称不能为空');
                        return false;
                    }
                }
                if (this.diaWXType == 'trade') {
                    if (!this.diaWXData2.text1) {
                        this.showDialog('add', 'info', true, '标题不能为空');
                        return false;
                    }
                    if (!this.diaWXData2.text2) {
                        this.showDialog('add', 'info', true, '业务不能为空');
                        return false;
                    }
                    if (!this.diaWXData2.text3) {
                        this.showDialog('add', 'info', true, '金额不能为空');
                        return false;
                    }
                    if (!this.diaWXData2.text4) {
                        this.showDialog('add', 'info', true, '状态不能为空');
                        return false;
                    }
                    if (!this.diaWXData2.text5) {
                        this.showDialog('add', 'info', true, '时间不能为空');
                        return false;
                    }
                }
                if (this.diaWXType == 'monthBill') {
                    if (!this.diaWXData3.text1) {
                        this.showDialog('add', 'info', true, '欢迎语不能为空');
                        return false;
                    }
                    if (!this.diaWXData3.text2) {
                        this.showDialog('add', 'info', true, '对账单日期不能为空');
                        return false;
                    }
                }
                if (this.diaWXType == 'investment') {
                    if (!this.diaWXData4.text1) {
                        this.showDialog('add', 'info', true, '欢迎语不能为空');
                        return false;
                    }
                    if (!this.diaWXData4.text2) {
                        this.showDialog('add', 'info', true, '服务名称不能为空');
                        return false;
                    }
                    if (!this.diaWXData4.text3) {
                        this.showDialog('add', 'info', true, '服务时间不能为空');
                        return false;
                    }
                }
                if (this.diaWXType == 'navUpdate') {
                    if (!this.diaWXData5.text1) {
                        this.showDialog('add', 'info', true, '欢迎语不能为空');
                        return false;
                    }
                    if (!this.diaWXData5.text2) {
                        this.showDialog('add', 'info', true, '净值日期不能为空');
                        return false;
                    }
                    if (!this.diaWXData5.text3) {
                        this.showDialog('add', 'info', true, '净值信息不能为空');
                        return false;
                    }
                }
                if (this.diaWXType == 'notice') {
                    if (!this.diaWXData6.text1) {
                        this.showDialog('add', 'info', true, '欢迎语不能为空');
                        return false;
                    }
                    if (!this.diaWXData6.text2) {
                        this.showDialog('add', 'info', true, '活动名称不能为空');
                        return false;
                    }
                    if (!this.diaWXData6.text3) {
                        this.showDialog('add', 'info', true, '账户昵称不能为空');
                        return false;
                    }
                    if (!this.diaWXData6.text4) {
                        this.showDialog('add', 'info', true, '申请时间不能为空');
                        return false;
                    }
                }
                return true;
            }
            // 微信高端模板
            else if (channelType == 5) {
                if (!this.diaWXHighType) {
                    this.showDialog('add', 'info', true, '请选择一个微信高端模板');
                    return false;
                }
                if (this.diaWXHighType == 'highTrade') {
                    if (!this.diaWXHighData1.text1) {
                        this.showDialog('add', 'info', true, '欢迎语不能为空');
                        return false;
                    }
                    if (!this.diaWXHighData1.text2) {
                        this.showDialog('add', 'info', true, '业务不能为空');
                        return false;
                    }
                    if (!this.diaWXHighData1.text3) {
                        this.showDialog('add', 'info', true, '金额不能为空');
                        return false;
                    }
                    if (!this.diaWXHighData1.text4) {
                        this.showDialog('add', 'info', true, '状态不能为空');
                        return false;
                    }
                    if (!this.diaWXHighData1.text5) {
                        this.showDialog('add', 'info', true, '时间不能为空');
                        return false;
                    }
                }
                if (this.diaWXHighType == 'highService') {
                    if (!this.diaWXHighData2.text1) {
                        this.showDialog('add', 'info', true, '欢迎语不能为空');
                        return false;
                    }
                    if (!this.diaWXHighData2.text2) {
                        this.showDialog('add', 'info', true, '服务名称不能为空');
                        return false;
                    }
                    if (!this.diaWXHighData2.text3) {
                        this.showDialog('add', 'info', true, '服务状态不能为空');
                        return false;
                    }
                    if (!this.diaWXHighData2.text4) {
                        this.showDialog('add', 'info', true, '问题详情不能为空');
                        return false;
                    }
                }
                if (this.diaWXHighType == 'highInvestment') {
                    if (!this.diaWXHighData3.text1) {
                        this.showDialog('add', 'info', true, '欢迎语不能为空');
                        return false;
                    }
                    if (!this.diaWXHighData3.text2) {
                        this.showDialog('add', 'info', true, '服务名称不能为空');
                        return false;
                    }
                    if (!this.diaWXHighData3.text3) {
                        this.showDialog('add', 'info', true, '服务时间不能为空');
                        return false;
                    }
                }
                return true;
            }
            // 定投公众号模板
            else if (channelType == 6) {
                if (!this.diaOfficialAccountType) {
                    this.showDialog('add', 'info', true, '请选择一个定投公众号模板');
                    return false;
                }
                if (this.diaOfficialAccountType == 'report') {
                    if (!this.diaOfficialAccountData1.text1) {
                        this.showDialog('add', 'info', true, '欢迎语不能为空');
                        return false;
                    }
                    if (!this.diaOfficialAccountData1.text2) {
                        this.showDialog('add', 'info', true, '报表类型不能为空');
                        return false;
                    }
                    if (!this.diaOfficialAccountData1.text3) {
                        this.showDialog('add', 'info', true, '统计日期不能为空');
                        return false;
                    }
                }
                if (this.diaOfficialAccountType == 'id') {
                    if (!this.diaOfficialAccountData2.text1) {
                        this.showDialog('add', 'info', true, '欢迎语不能为空');
                        return false;
                    }
                    if (!this.diaOfficialAccountData2.text2) {
                        this.showDialog('add', 'info', true, '客户姓名不能为空');
                        return false;
                    }
                    if (!this.diaOfficialAccountData2.text3) {
                        this.showDialog('add', 'info', true, '时间不能为空');
                        return false;
                    }
                }
                if (this.diaOfficialAccountType == 'review') {
                    if (!this.diaOfficialAccountData3.text1) {
                        this.showDialog('add', 'info', true, '欢迎语不能为空');
                        return false;
                    }
                    if (!this.diaOfficialAccountData3.text2) {
                        this.showDialog('add', 'info', true, '审核结果不能为空');
                        return false;
                    }
                    if (!this.diaOfficialAccountData3.text3) {
                        this.showDialog('add', 'info', true, '审核日期不能为空');
                        return false;
                    }
                }
                if (this.diaOfficialAccountType == 'unbind') {
                    if (!this.diaOfficialAccountData4.text1) {
                        this.showDialog('add', 'info', true, '欢迎语不能为空');
                        return false;
                    }
                    if (!this.diaOfficialAccountData4.text2) {
                        this.showDialog('add', 'info', true, '解除账户不能为空');
                        return false;
                    }
                    if (!this.diaOfficialAccountData4.text3) {
                        this.showDialog('add', 'info', true, '解绑时间不能为空');
                        return false;
                    }
                }
                return true;
            }
        },
        add: function () {
            if (!this.checkDiaData(this.diaChannelType)) {
                return;
            }
            var params = {};
            params.templateName = this.diaTemplateName;
            params.wxTemplateType = '';
            if (this.diaChannelType == 4 && this.diaWXType == 'servive') {
                params.wxTemplateType = 'servive';
                var obj = {};
                obj.first = this.diaWXData1.text1;
                obj.keyword1 = this.diaWXData1.text2;
                obj.keyword2 = this.diaWXData1.text3;
                obj.keyword3 = this.diaWXData1.text4;
                obj.remark = this.diaWXData1.text5;
                params.content = JSON.stringify(obj);
                var objColor = {};
                this.diaWXData1.textColor1 && (objColor.first = this.diaWXData1.textColor1);
                this.diaWXData1.textColor2 && (objColor.keyword1 = this.diaWXData1.textColor2);
                this.diaWXData1.textColor3 && (objColor.keyword2 = this.diaWXData1.textColor3);
                this.diaWXData1.textColor4 && (objColor.keyword3 = this.diaWXData1.textColor4);
                this.diaWXData1.textColor5 && (objColor.remark = this.diaWXData1.textColor5);
                params.dataColor = JSON.stringify(objColor);
            }
            else if (this.diaChannelType == 4 && this.diaWXType == 'trade') {
                params.wxTemplateType = 'trade';
                var obj = {};
                obj.title = this.diaWXData2.text1;
                obj.OPERATE = this.diaWXData2.text2;
                obj.AMT = this.diaWXData2.text3;
                obj.STATUS = this.diaWXData2.text4;
                obj.DATE = this.diaWXData2.text5;
                obj.remark = this.diaWXData2.text6;
                params.content = JSON.stringify(obj);
                var objColor = {};
                this.diaWXData2.textColor1 && (objColor.title = this.diaWXData2.textColor1);
                this.diaWXData2.textColor2 && (objColor.OPERATE = this.diaWXData2.textColor2);
                this.diaWXData2.textColor3 && (objColor.AMT = this.diaWXData2.textColor3);
                this.diaWXData2.textColor4 && (objColor.STATUS = this.diaWXData2.textColor4);
                this.diaWXData2.textColor5 && (objColor.DATE = this.diaWXData2.textColor5);
                this.diaWXData2.textColor6 && (objColor.remark = this.diaWXData2.textColor6);
                params.dataColor = JSON.stringify(objColor);
            }
            else if (this.diaChannelType == 4 && this.diaWXType == 'monthBill') {
                params.wxTemplateType = 'monthBill';
                var obj = {};
                obj.first = this.diaWXData3.text1;
                obj.keyword1 = '${custNm}';
                obj.keyword2 = this.diaWXData3.text2;
                obj.remark = this.diaWXData3.text3;
                params.content = JSON.stringify(obj);
                var objColor = {};
                this.diaWXData3.textColor1 && (objColor.first = this.diaWXData3.textColor1);
                this.diaWXData3.textColor2 && (objColor.keyword2 = this.diaWXData3.textColor2);
                this.diaWXData3.textColor3 && (objColor.remark = this.diaWXData3.textColor3);
                params.dataColor = JSON.stringify(objColor);
            }
            else if (this.diaChannelType == 4 && this.diaWXType == 'investment') {
                params.wxTemplateType = 'investment';
                var obj = {};
                obj.first = this.diaWXData4.text1;
                obj.keyword1 = this.diaWXData4.text2;
                obj.keyword2 = this.diaWXData4.text3;
                obj.remark = this.diaWXData4.text4;
                params.content = JSON.stringify(obj);
                var objColor = {};
                this.diaWXData4.textColor1 && (objColor.first = this.diaWXData4.textColor1);
                this.diaWXData4.textColor2 && (objColor.keyword1 = this.diaWXData4.textColor2);
                this.diaWXData4.textColor3 && (objColor.keyword2 = this.diaWXData4.textColor3);
                this.diaWXData4.textColor4 && (objColor.remark = this.diaWXData4.textColor4);
                params.dataColor = JSON.stringify(objColor);
            }
            else if (this.diaChannelType == 4 && this.diaWXType == 'navUpdate') {
                params.wxTemplateType = 'navUpdate';
                var obj = {};
                obj.first = this.diaWXData5.text1;
                obj.keyword1 = this.diaWXData5.text2;
                obj.keyword2 = this.diaWXData5.text3;
                obj.remark = this.diaWXData5.text4;
                params.content = JSON.stringify(obj);
                var objColor = {};
                this.diaWXData5.textColor1 && (objColor.first = this.diaWXData5.textColor1);
                this.diaWXData5.textColor2 && (objColor.keyword1 = this.diaWXData5.textColor2);
                this.diaWXData5.textColor3 && (objColor.keyword2 = this.diaWXData5.textColor3);
                this.diaWXData5.textColor4 && (objColor.remark = this.diaWXData5.textColor4);
                params.dataColor = JSON.stringify(objColor);
            }
            else if (this.diaChannelType == 4 && this.diaWXType == 'notice') {
                params.wxTemplateType = 'notice';
                var obj = {};
                obj.first = this.diaWXData6.text1;
                obj.keyword1 = this.diaWXData6.text2;
                obj.keyword2 = this.diaWXData6.text3;
                obj.keyword3 = this.diaWXData6.text4;
                obj.remark = this.diaWXData6.text5;
                params.content = JSON.stringify(obj);
                var objColor = {};
                this.diaWXData6.textColor1 && (objColor.first = this.diaWXData6.textColor1);
                this.diaWXData6.textColor2 && (objColor.keyword1 = this.diaWXData6.textColor2);
                this.diaWXData6.textColor3 && (objColor.keyword2 = this.diaWXData6.textColor3);
                this.diaWXData6.textColor4 && (objColor.keyword3 = this.diaWXData6.textColor4);
                this.diaWXData6.textColor5 && (objColor.remark = this.diaWXData6.textColor5);
                params.dataColor = JSON.stringify(objColor);
            }
            else if (this.diaChannelType == 5) {
                params.wxTemplateType = this.diaWXHighType;
                var obj = {};
                if(this.diaWXHighType == 'highTrade'){
                    obj.first = this.diaWXHighData1.text1;
                    obj.OPERATE = this.diaWXHighData1.text2;
                    obj.AMT = this.diaWXHighData1.text3;
                    obj.STATUS = this.diaWXHighData1.text4;
                    obj.DATE = this.diaWXHighData1.text5;
                    obj.remark = this.diaWXHighData1.text6;
                }
                if(this.diaWXHighType == 'highService'){
                    obj.first = this.diaWXHighData2.text1;
                    obj.keyword1 = this.diaWXHighData2.text2;
                    obj.keyword2 = this.diaWXHighData2.text3;
                    obj.keyword3 = this.diaWXHighData2.text4;
                    obj.remark = this.diaWXHighData2.text5;
                }
                if(this.diaWXHighType == 'highInvestment'){
                    obj.first = this.diaWXHighData3.text1;
                    obj.keyword1 = this.diaWXHighData3.text2;
                    obj.keyword2 = this.diaWXHighData3.text3;
                    obj.remark = this.diaWXHighData3.text4;
                }
                params.content = JSON.stringify(obj);
            }
            else if (this.diaChannelType == 6) {
                params.wxTemplateType = this.diaOfficialAccountType;
                var obj = {};
                if(this.diaOfficialAccountType == 'report'){
                    obj.first = this.diaOfficialAccountData1.text1;
                    obj.keyword1 = this.diaOfficialAccountData1.text2;
                    obj.keyword2 = this.diaOfficialAccountData1.text3;
                    obj.remark = this.diaOfficialAccountData1.text4;
                }
                if(this.diaOfficialAccountType == 'id'){
                    obj.first = this.diaOfficialAccountData2.text1;
                    obj.keyword1 = this.diaOfficialAccountData2.text2;
                    obj.keyword2 = this.diaOfficialAccountData2.text3;
                    obj.remark = this.diaOfficialAccountData2.text4;
                }
                if(this.diaOfficialAccountType == 'review'){
                    obj.first = this.diaOfficialAccountData3.text1;
                    obj.keyword1 = this.diaOfficialAccountData3.text2;
                    obj.keyword2 = this.diaOfficialAccountData3.text3;
                    obj.remark = this.diaOfficialAccountData3.text4;
                }
                if(this.diaOfficialAccountType == 'unbind'){
                    obj.first = this.diaOfficialAccountData4.text1;
                    obj.keyword1 = this.diaOfficialAccountData4.text2;
                    obj.keyword2 = this.diaOfficialAccountData4.text3;
                    obj.remark = this.diaOfficialAccountData4.text4;
                }
                params.content = JSON.stringify(obj);
            }
            else {
                params.content = this.diaContent;
            }
            params.appId = this.diaChannelType == 4 ? this.diaWXAppId : '';
            params.pagePath = this.diaChannelType == 4 ? this.diaWXPagePath : '';
            params.templateType = 0;
            params.image = '';
            params.channelType = this.diaChannelType;
            params.pushType = 0;
            var linkUrl = '';
            if (this.diaChannelType == 1) {
                params.summary = this.diaTemplateExplain;
                params.title = this.diaTitle;
                if (!this.showTimeInterval) {
                    params.startTime = $('#startTime').val();
                    params.endTime = $('#endTime').val();
                }
                else {
                    params.startTime = '${startTime}';
                    params.endTime = '${endTime}';
                    params.timeInterval = this.timeInterval;
                }
                if (!this.updateId) {
                    if (this.diaLinkType == '其他链接') {
                        linkUrl = 'htffundxjb://action?type=url&link=' + this.diaUrl;
                    }
                    else if (this.diaLinkType == '空') {
                        linkUrl = '';
                    }
                    else {
                        for (var i = 0; i < this.jumpLinkList.length; i++) {
                            if (this.jumpLinkList[i].name == this.diaLinkType) {
                                linkUrl = this.jumpLinkList[i].url;
                                if (this.hasfundId) {
                                    linkUrl = linkUrl + '&fundId=' + this.diafundId;
                                }
                                break;
                            }
                        }
                    }
                }
                else {
                    linkUrl = this.diaUrl
                }
                params.url = linkUrl;
            }
            else if (this.diaChannelType == 2) {
                params.summary = '';
                params.title = this.diaTitle;
                if (!this.updateId) {
                    if (this.diaLinkType == '其他链接') {
                        linkUrl = 'htffundxjb://action?type=url&link=' + this.diaUrl;
                    }
                    else if (this.diaLinkType == '后端配置') {
                        linkUrl = '';
                    }
                    else if (this.diaLinkType == '空') {
                        linkUrl = this.diaUrl
                    }
                    else {
                        for (var i = 0; i < this.jumpLinkList.length; i++) {
                            if (this.jumpLinkList[i].name == this.diaLinkType) {
                                linkUrl = this.jumpLinkList[i].url;
                                if (this.hasfundId) {
                                    linkUrl = linkUrl + '&fundId=' + this.diafundId;
                                }
                                break;
                            }
                        }
                    }
                }
                else {
                    linkUrl = this.diaUrl
                }
                params.url = linkUrl;
            }
            else if (this.diaChannelType == 3 ) {
                params.summary = '';
                params.title = '';
                params.url = '';
            }
            else if (this.diaChannelType == 4) {
                params.summary = '';
                params.title = '';
                params.url = this.diaUrl;
            }
            else if (this.diaChannelType == 5) {
                params.summary = '';
                params.title = '';
                params.url = this.diaUrl;
            }
            else if (this.diaChannelType == 6) {
                params.summary = '';
                params.title = '';
                params.url = '';
            }
            else if (this.diaChannelType == 7) {
                params.summary = '';
                params.title = '';
                params.url = '';
                params.channelType = '2';
                params.pushType = '1';
            }
            var _this = this;
            var api = 'add';
            if (this.updateId) {
                params.templateId = this.updateId;
                api = 'update';
            }
            $.post({
                url: '/messageCenter/templateMgmt/templateMgmt/' + api + '.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.clearAddDia();
                        _this.showDialog('add', 'info', false, result.msg);
                        $.post({
                            url: '/messageCenter/templateMgmt/templateMgmt/search.ajax',
                            success: function (body) {
                                if (body.error === 0) {
                                    _this.tableData = body.data;
                                }
                            }
                        });
                    }
                    else if (result.error === 2005) {
                        _this.showDialog('add', 'info', false, '该模板已关联到待发送批次,暂不可修改!');
                    }
                    else {
                        _this.showDialog('add', 'info', false, result.msg);
                    }
                }
            });
        },
        showDelete: function (index) {
            this.deleteId = this.viewData[index].templateId;
            this.showDialog('', 'delete');
        },
        deleteData: function () {
            var _this = this;
            var index = -1;
            if (this.currentIndex == this.middleData.length - 1 && this.viewData.length == 1) {
                this.prev();
            }
            index = this.inSelected({templateId: this.deleteId}, this.tableData, 'templateId');
            var params = {
                templateId: this.tableData[index].templateId
            };
            $.post({
                url: '/messageCenter/templateMgmt/templateMgmt/del.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.tableData.splice(index, 1);
                        _this.showDialog('delete', 'info', false, result.msg);
                    }
                    else if (result.error === 2004) {
                        _this.showDialog('delete', 'info', false, '该模板已关联到待发送批次,暂不可删除');
                    }
                    else {
                        _this.showDialog('delete', 'info', false, result.msg);
                    }
                }
            });
        },
        showUpdate: function (index) {
            this.clearAddDia();
            var item = this.viewData[index];
            this.updateId = item.templateId;
            this.diaTemplateName = item.templateName;
            this.diaChannelType = item.channelType;
            this.diaContent = item.content;
            this.diaWXAppId = '';
            this.diaWXPagePath = '';
            if (item.pushType == 1 && item.channelType == 2){
                this.diaChannelType = 7;
            }
            if (item.channelType == 1) {
                this.diaTemplateExplain = item.summary;
                this.diaTitle = item.title;
                this.diaLinkType = '其他链接';
                this.diaUrl = item.url;
                if (item.duration > 0) {
                    this.showTimeInterval = true;
                    this.timeInterval = item.duration;
                    $('#startTime').val('${startTime}');
                    $('#endTime').val('${endTime}');
                }
                else {
                    this.showTimeInterval = false;
                    this.timeInterval = 0;
                    $('#startTime').val(item.startTime);
                    $('#endTime').val(item.endTime);
                }
            }
            else if (item.channelType == 2) {
                this.diaTitle = item.title;
                if (item.url) {
                    this.diaUrl = item.url;
                }
                else {
                    this.showPushUrl = false;
                    this.diaUrl = '';
                }
            }
            else if (item.channelType == 4) {
                var obj = JSON.parse(item.content);
                var objColor = item.dataColor ? JSON.parse(item.dataColor) : {};
                this.diaWXType = item.wxTemplateType;
                if (item.wxTemplateType == 'servive') {
                    this.diaWXData1.text1 = obj.first;
                    this.diaWXData1.text2 = obj.keyword1;
                    this.diaWXData1.text3 = obj.keyword2;
                    this.diaWXData1.text4 = obj.keyword3;
                    this.diaWXData1.text5 = obj.remark;
                    this.diaWXData1.textColor1 = objColor.first;
                    this.diaWXData1.textColor2 = objColor.keyword1;
                    this.diaWXData1.textColor3 = objColor.keyword2;
                    this.diaWXData1.textColor4 = objColor.keyword3;
                    this.diaWXData1.textColor5 = objColor.remark;
                }
                else if (item.wxTemplateType == 'trade') {
                    this.diaWXData2.text1 = obj.title;
                    this.diaWXData2.text2 = obj.OPERATE;
                    this.diaWXData2.text3 = obj.AMT;
                    this.diaWXData2.text4 = obj.STATUS;
                    this.diaWXData2.text5 = obj.DATE;
                    this.diaWXData2.text6 = obj.remark;
                    this.diaWXData2.textColor1 = objColor.title;
                    this.diaWXData2.textColor2 = objColor.OPERATE;
                    this.diaWXData2.textColor3 = objColor.AMT;
                    this.diaWXData2.textColor4 = objColor.STATUS;
                    this.diaWXData2.textColor5 = objColor.DATE;
                    this.diaWXData2.textColor6 = objColor.remark;
                }
                else if (item.wxTemplateType == 'monthBill') {
                    this.diaWXData3.text1 = obj.first;
                    this.diaWXData3.text2 = obj.keyword2;
                    this.diaWXData3.text3 = obj.remark;
                    this.diaWXData3.textColor1 = objColor.first;
                    this.diaWXData3.textColor2 = objColor.keyword2;
                    this.diaWXData3.textColor3 = objColor.remark;
                }
                else if (item.wxTemplateType == 'investment') {
                    this.diaWXData4.text1 = obj.first;
                    this.diaWXData4.text2 = obj.keyword1;
                    this.diaWXData4.text3 = obj.keyword2;
                    this.diaWXData4.text4 = obj.remark;
                    this.diaWXData4.textColor1 = objColor.first;
                    this.diaWXData4.textColor2 = objColor.keyword1;
                    this.diaWXData4.textColor3 = objColor.keyword2;
                    this.diaWXData4.textColor4 = objColor.remark;
                }
                else if (item.wxTemplateType == 'navUpdate') {
                    this.diaWXData5.text1 = obj.first;
                    this.diaWXData5.text2 = obj.keyword1;
                    this.diaWXData5.text3 = obj.keyword2;
                    this.diaWXData5.text4 = obj.remark;
                    this.diaWXData5.textColor1 = objColor.first;
                    this.diaWXData5.textColor2 = objColor.keyword1;
                    this.diaWXData5.textColor3 = objColor.keyword2;
                    this.diaWXData5.textColor4 = objColor.remark;
                }
                else if (item.wxTemplateType == 'notice') {
                    this.diaWXData6.text1 = obj.first;
                    this.diaWXData6.text2 = obj.keyword1;
                    this.diaWXData6.text3 = obj.keyword2;
                    this.diaWXData6.text4 = obj.keyword3;
                    this.diaWXData6.text5 = obj.remark;
                    this.diaWXData6.textColor1 = objColor.first;
                    this.diaWXData6.textColor2 = objColor.keyword1;
                    this.diaWXData6.textColor3 = objColor.keyword2;
                    this.diaWXData6.textColor4 = objColor.keyword3;
                    this.diaWXData6.textColor5 = objColor.remark;
                }
                this.diaWXAppId = item.appId;
                this.diaWXPagePath = item.pagePath;
                this.diaUrl = item.url;
            }
            else if (item.channelType == 5) {
                var obj = JSON.parse(item.content);
                this.diaWXHighType = item.wxTemplateType;
                if (item.wxTemplateType == 'highTrade') {
                    this.diaWXHighData1.text1 = obj.first;
                    this.diaWXHighData1.text2 = obj.OPERATE;
                    this.diaWXHighData1.text3 = obj.AMT;
                    this.diaWXHighData1.text4 = obj.STATUS;
                    this.diaWXHighData1.text5 = obj.DATE;
                    this.diaWXHighData1.text6 = obj.remark;
                }
                else if (item.wxTemplateType == 'highService') {
                    this.diaWXHighData2.text1 = obj.first;
                    this.diaWXHighData2.text2 = obj.keyword1;
                    this.diaWXHighData2.text3 = obj.keyword2;
                    this.diaWXHighData2.text4 = obj.keyword3;
                    this.diaWXHighData2.text5 = obj.remark;
                }
                else if (item.wxTemplateType == 'highInvestment') {
                    this.diaWXHighData3.text1 = obj.first;
                    this.diaWXHighData3.text2 = obj.keyword1;
                    this.diaWXHighData3.text3 = obj.keyword2;
                    this.diaWXHighData3.text4 = obj.remark;
                }
                this.diaUrl = item.url;
            }
            else if (item.channelType == 6) {
                var obj = JSON.parse(item.content);
                this.diaOfficialAccountType = item.wxTemplateType;
                if (item.wxTemplateType == 'report') {
                    this.diaOfficialAccountData1.text1 = obj.first;
                    this.diaOfficialAccountData1.text2 = obj.keyword1;
                    this.diaOfficialAccountData1.text3 = obj.keyword2;
                    this.diaOfficialAccountData1.text4 = obj.remark;
                }
                else if (item.wxTemplateType == 'id') {
                    this.diaOfficialAccountData2.text1 = obj.first;
                    this.diaOfficialAccountData2.text2 = obj.keyword1;
                    this.diaOfficialAccountData2.text3 = obj.keyword2;
                    this.diaOfficialAccountData2.text4 = obj.remark;
                }
                else if (item.wxTemplateType == 'review') {
                    this.diaOfficialAccountData3.text1 = obj.first;
                    this.diaOfficialAccountData3.text2 = obj.keyword1;
                    this.diaOfficialAccountData3.text3 = obj.keyword2;
                    this.diaOfficialAccountData3.text4 = obj.remark;
                }
                else if (item.wxTemplateType == 'unbind') {
                    this.diaOfficialAccountData4.text1 = obj.first;
                    this.diaOfficialAccountData4.text2 = obj.keyword1;
                    this.diaOfficialAccountData4.text3 = obj.keyword2;
                    this.diaOfficialAccountData4.text4 = obj.remark;
                }
                this.diaUrl = '';
            }
            this.showDialog('', 'add');
        },
        checkTimeInterval: function () {
            if (!this.showTimeInterval) {
                $('#startTime').val('${startTime}');
                $('#endTime').val('${endTime}');
            }
            else {
                $('#startTime').val('');
                $('#endTime').val('');
            }
        },
        downloadFile: function () {
            var elt = document.getElementById('data-table');
            var wb = XLSX.utils.table_to_book(elt, {sheet: 'Sheet JS'});
            XLSX.writeFile(wb, '导入模板示例.xlsx');
        },
        downloadUpdateFile: function () {
            var elt = document.getElementById('data-table-update');
            var wb = XLSX.utils.table_to_book(elt, {sheet: 'Sheet JS'});
            XLSX.writeFile(wb, '批量修改模板示例.xlsx');
        },
        // 导出所有
        exportAll: function () {
            var _this = this;
            var url;
            url = '/messageCenter/templateMgmt/templateMgmt/exportAll.ajax'
            window.location.href = url;
        },
        // 其他页面跳转携带参数
        getUrlParam: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg); //匹配目标参数
            if (r != null) return unescape(r[2]);
            return '';
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
        }
    }
});
