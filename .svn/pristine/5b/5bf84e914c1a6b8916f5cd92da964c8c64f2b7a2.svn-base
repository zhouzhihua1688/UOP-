new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        custNo: '',
        pointNo: '',
        fromCustNo: '',
        sourceDetail: '',
        pointStatus: 1,
        searchCondition: '',
        pointList: [],
        diaMsg: '',
        loadingShow: false
    },
    computed: {
        pointList_filter: function () {
            var _this = this;
            return this.pointList.filter(function (item) {
                return item.pointNo.indexOf(_this.searchCondition) > -1 || item.pointValue.toString().indexOf(_this.searchCondition) > -1;
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
        this.getPointList();
    },
    methods: {
        // 获取积分列表
        getPointList: function () {
            var _this = this;
            $.post({
                url: '/awardMgmt/integralSettingMgmt/integralCalc/getPointList.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        _this.pointList = result.data;
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        showSelect: function () {
            this.searchCondition = '';
            this.showDialog('', 'select');
        },
        select: function (item) {
            this.pointNo = item.pointNo;
            this.showDialog('select');
        },
        showSend: function () {
            this.showDialog('', 'send');
        },
        send: function () {
            if (!this.pointNo || !this.custNo) {
                this.showDialog('send', 'info', false, '存在未填写项');
                return;
            }
            var _this = this;
            $.post({
                url: '/awardMgmt/integralSettingMgmt/integralCalc/send.ajax',
                data: {
                    custNo: this.custNo,
                    pointNo: this.pointNo,
                    sourceDetail: this.sourceDetail,
                    pointStatus: this.pointStatus,
                },
                success: function (result) {
                    if (result.error === 0) {
                        _this.custNo = '';
                        _this.pointNo = '';
                        _this.sourceDetail = '';
                        _this.pointStatus = 1;
                        _this.showDialog('send', 'info', false, '发送成功');
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
                    url: '/awardMgmt/integralSettingMgmt/integralCalc/dataAddBatch.ajax',
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
