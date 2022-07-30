new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        index: -1,
        searchCondition: '',
        envelopList: [],
        tableData: [{
            redEnvelopNo: '',
            redEnvelopName: '',
            custNo: '',
            redEnvelopValue: '',
            type: 0,
            sourceDetail: '',
            value_show: ''
        }],
        diaMsg: '',
        loadingShow: false
    },
    computed: {
        envelopList_filter: function () {
            var _this = this;
            return this.envelopList.filter(function (item) {
                return item.envelopNo.indexOf(_this.searchCondition) > -1 || item.name.indexOf(_this.searchCondition) > -1;
            });
        }
    },
    mounted: function () {
        var dialogs = ['info', 'send', 'fileSend'];
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
        $('#uploadBtn').click(function () {
            $('#uploadFileInput').click();
        });
        this.getEnvelopList();
    },
    methods: {
        // 获取红包列表
        getEnvelopList: function () {
            var _this = this;
            $.post({
                url: '/awardMgmt/redPacketSettingMgmt/redPacketSend/getEnvelopList.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        _this.envelopList = result.data;
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        addRow: function () {
            this.tableData.push({
                redEnvelopNo: '',
                redEnvelopName: '',
                custNo: '',
                redEnvelopValue: '',
                type: 0,
                sourceDetail: '',
                value_show: ''
            });
        },
        deleteRow: function (index) {
            this.tableData.splice(index, 1);
        },
        showSelect: function (index) {
            this.index = index;
            this.searchCondition = '';
            this.showDialog('', 'select');
        },
        select: function (item) {
            this.tableData[this.index].redEnvelopNo = item.envelopNo;
            this.tableData[this.index].redEnvelopName = item.name;
            this.tableData[this.index].type = item.type;
            // 固定金额
            if(item.type == 0){
                this.tableData[this.index].redEnvelopValue = item.value;
                this.tableData[this.index].value_show = item.value;
            }
            // 随机金额
            else if(item.type == 1){
                this.tableData[this.index].redEnvelopValue = 0;
                this.tableData[this.index].value_show = item.value_show;
            }
            // 外部传入
            else if(item.type == 1){
                this.tableData[this.index].redEnvelopValue = '';
                this.tableData[this.index].value_show = '';
            }
            this.showDialog('select');
        },
        showSend: function () {
            this.showDialog('', 'send');
        },
        send: function () {
            if (this.tableData.length === 0) {
                this.showDialog('send', 'info', false, '列表长度为0,不存在有效数据');
                return;
            }
            for (var i = 0; i < this.tableData.length; i++) {
                if (!this.tableData[i].redEnvelopNo) {
                    this.showDialog('send', 'info', false, '列表未选择红包编号');
                    return;
                }
                if (!this.tableData[i].custNo) {
                    this.showDialog('send', 'info', false, '列表未填写客户号');
                    return;
                }
                if (this.tableData[i].type == 2 && !this.tableData[i].redEnvelopValue) {
                    this.showDialog('send', 'info', false, '列表未填写红包金额');
                    return;
                }
                if (!this.tableData[i].sourceDetail) {
                    this.showDialog('send', 'info', false, '列表未填写来源详情');
                    return;
                }
                if (this.tableData[i].sourceDetail.length > 30) {
                    this.showDialog('send', 'info', false, '列表存在过长的来源详情(超出30个字符长度)');
                    return;
                }
            }
            var _this = this;
            $.post({
                url: '/awardMgmt/redPacketSettingMgmt/redPacketSend/send.ajax',
                data: {
                    envelopInfo: JSON.stringify(this.tableData)
                },
                success: function (result) {
                    if (result.error === 0) {
                        _this.tableData = [{
                            redEnvelopNo: '',
                            redEnvelopName: '',
                            custNo: '',
                            redEnvelopValue: '',
                            type: 0,
                            sourceDetail: '',
                            value_show: ''
                        }];
                        _this.showDialog('send', 'info', false, result.msg);
                    }
                    else {
                        _this.showDialog('send', 'info', false, result.msg);
                    }
                }
            });
        },
        showFileSend: function () {
            $('#uploadInput').val('');
            $('#uploadFileInput').val('');
            $('#uploadFileInput').on('change', function () {
                $('#uploadInput').val($(this).val());
            });
            this.showDialog('', 'fileSend');
        },
        fileSend: function () {
            var excelData = $('#uploadFileInput').get(0).files[0];
            if (!excelData) {
                this.showDialog('fileSend', 'info', true, '未选择文件');
                return;
            }
            var fileType = excelData.name.split('.')[excelData.name.split('.').length - 1];
            if (fileType !== 'xlsx') {
                this.showDialog('fileSend', 'info', true, '上传文件格式错误,请上传.xlsx文件');
                return;
            }
            if(excelData.size > 5242880){
                this.showDialog('fileSend', 'info', true, '上传文件大小超出5M');
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
                if(jsonData.length > 2000){
                    _this.showDialog('fileSend', 'info', true, '单次发送条数不能超过2000条');
                    return;
                }
                _this.showDialog('fileSend');
                _this.loadingShow = true;
                $.post({
                    url: '/awardMgmt/redPacketSettingMgmt/redPacketSend/dataAddBatch.ajax',
                    data: {ExcelData: JSON.stringify(jsonData)},
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
                        _this.showDialog('', 'info', false, '网络超时,请稍后重试');
                    }
                });
            };
            reader.readAsBinaryString(excelData);
        },
        downloadFile: function () {
            var elt = document.getElementById('data-table');
            var wb = XLSX.utils.table_to_book(elt, {sheet: 'Sheet JS'});
            XLSX.writeFile(wb, '导入模板示例.xlsx');
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
