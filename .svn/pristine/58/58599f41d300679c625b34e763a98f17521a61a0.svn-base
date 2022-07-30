new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        tableData: [],
        diaMsg: '',

        // 查询
        invnm: '',//李四
        idno: '',//511126198411035926
        // tranAcco: '',
        branchCode: '247',
        loadingShow: false, //20211207添加loading效果
        queryData: [],  //查询成功数据
        queryFailData: []    //查询到的失败数据
    },
    mounted: function () {
        var dialogs = ['info', 'submitInfo', 'updateExcel','query'];
        var _this = this;
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
        $('#updateBtn').click(function () {
            $('#updateFileInput').click();
        });
        // this.getTableData(0);
    },
    computed: {
        checkAll: function () {
            var _this = this;
            if (_this.tableData.length == 0) {
                return false;
            }
            for (var i = 0; i < _this.tableData.length; i++) {
                if (!_this.tableData[i].check) {
                    return false;
                }
            }
            return true;
        }
    },

    methods: {
        // getTableData: function (currentIndex) {
        //     // if (this.invnm === '') {
        //     //     return this.showDialog('', 'info', false, '请输入客户姓名')
        //     // }
        //     // if (this.idno === '') {
        //     //     return this.showDialog('', 'info', false, '请输入证件号码')
        //     // }
        //     // var params = {
        //     //     invnm: this.invnm,
        //     //     idno: this.idno,
        //     //     branchCode: this.branchCode,
        //     // };
        //     $.post({
        //         url: '/customerService/selfFundManage/batchUpdateFund/getList.ajax',
        //         data: params,
        //         success: function (result) {
        //             if (result.error === 0) {
        //                 this.tableData = result.data.map(function (item) {
        //                     item.check = false;
        //                     item.invnm=params.invnm;
        //                     item.idno=params.idno;
        //                     return item;
        //                 });
        //                 console.log("===",this.tableData)
        //                 // this.currentIndex = result.data.pageNo - 1;
        //                 // this.totalPage = result.data.totalPage;
        //             } else {
        //                 this.tableData = [];
        //                 // this.currentIndex = 0;
        //                 // this.totalPage = 0;
        //                 this.showDialog("", "info", false, result.msg)
        //             }
        //         }.bind(this)
        //     });
        // },

        showDialog: function (dia1, dia2, callback, msg) {
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
                    });
                    $('#' + dia2).modal("show");
                    $('#' + dia1).off().on("hidden", "hidden.bs.modal");
                });
                $('#' + dia1).modal('hide');
            }
        },
        active: function (item) {
            this.$set(item, 'check', !item.check)
        },
        submitTips: function () {
            var status = this.tableData.some(function (item) {
                if (item.check) {
                    return true;
                }
            })
            if (!status) {
                return this.showDialog('', 'info', false, '请选择需要提交的数据');
            }
            this.showDialog('', 'submitInfo', false, '确定提交数据吗?')
        },
        submitData: function () {  //批量修改提交接口
            var params = {
                data: []
            };
            this.tableData.forEach(function (item) {
                if (item.check) {
                    var obj = {
                        bankAcco: item.bankAcco,
                        bankChannelName: item.bankChannelName,
                        bankNo: item.bankNo,
                        branchCode: item.branchCode,
                        currentPrincipal: item.currentPrincipal,
                        custNo: item.custNo,
                        modifyPrincipal: item.modifyPrincipal
                    }
                    params.data.push(obj)
                }
            })
            params.data = JSON.stringify(params.data);
            console.log(params.data);
            $.post({
                url: '/customerService/selfFundManage/batchUpdateFund/submitData.ajax',
                data: params,
                traditional: true,
                success: function (result) {
                    this.tableData=[];
                    this.showDialog("submitInfo", "info", false, result.msg)
                }.bind(this)
            });
        },
        // 20211207新加批量修改--上传Excel批量查询接口
        showUpdateExcel: function () {
            $('#updateFileInput').change(function () {
                $('#updateInput').val($(this).val());
            });
            $('#updateInput').val('');
            $('#updateFileInput').val('');
            this.showDialog('', 'updateExcel');
        },
        downloadUpdateFile: function () {   //下载模板
            var elt = document.getElementById('data-table-update');
            var wb = XLSX.utils.table_to_book(elt, {sheet: 'Sheet JS'});
            XLSX.writeFile(wb, '批量修改本金模板示例.xlsx');
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
                    url: '/customerService/selfFundManage/batchUpdateFund/updateByExcel.ajax',
                    data: {
                        ExcelData: JSON.stringify(jsonData)
                    },
                    success: function (result) {
                        _this.loadingShow = false;
                        if (result.error === 0) {
                            _this.tableData = result.data.tableData.map(function (item) {//node处理返回的成功数据
                                item.check = false;   //为全选做准备-加一个check
                                return item;
                            });
                            _this.queryFailData = result.data.queryFailData;  //node处理返回的失败数据
                            console.log("tableData", _this.tableData);
                            console.log("queryFailData", _this.queryFailData);
                            _this.showDialog('', 'query', false, result.msg);
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
        allCheck: function () {  //全选
            var _this = this;
            var flag =_this.checkAll;
            _this.tableData.forEach(function (item) {
                item.check = !flag;
            });
        },
    }
});