new Vue({
    el: '#content',
    data: {
        //查询栏
        custNo: '',
        custId: '',
        phone: '',
        userName: '',
        appId: '',
        // 操作ID
        deleteId: '',
        deleteIdList: [],
        isUpdate: false,
        // 弹窗数据
        diaData: {
            custNo: '',
            custId: '',
            phone: '',
            userName: '',
            appId: ''
        },
        // 主页面相关数据
        tableData: [],
        diaMsg: '',
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        pageMaxNum: 10,
        condition: ''
    },
    mounted: function () {
        var dialogs = ['info', 'operate', 'delete', 'batchDelete', 'batchAdd'];
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
        $('#uploadBtn').click(function () {
            $('#uploadFileInput').click();
        });
        $('#updateBtn').click(function () {
            $('#updateFileInput').click();
        });
        $('#downloadExcel').click(function () {
            var elt = document.getElementById('data-table');
            var wb = XLSX.utils.table_to_book(elt, {sheet: 'Sheet JS'});
            XLSX.writeFile(wb, '导入模板示例.xlsx');
        });
        this.search(false);
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
            } else if (this.currentIndex <= this.maxSpace && this.middleData.length - this.currentIndex > this.maxSpace) {
                for (var i = 0; i < this.currentIndex + (2 * this.maxSpace - this.currentIndex); i++) {
                    arr.push(i + 1);
                }
            } else if (this.currentIndex > this.maxSpace && this.middleData.length - this.currentIndex <= this.maxSpace) {
                var space = this.middleData.length - this.currentIndex;
                for (var i = this.currentIndex - (2 * this.maxSpace - space); i < this.middleData.length; i++) {
                    arr.push(i + 1);
                }
            } else {
                for (var i = 0; i < this.middleData.length; i++) {
                    arr.push(i + 1);
                }
            }
            return arr;
        },
        allCheck: function () {
            return this.viewData.length ? this.viewData.every(function (item) {
                return item.check;
            }) : false;
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
    methods: {
        search: function (flag) {
            var _this = this;
            var params = {};
            if (flag) {
                params.custNo = this.custNo;
                params.custId = this.custId;
                params.phone = this.phone;
                params.userName = this.userName;
                params.appId = this.appId;
            }
            $.post({
                url: '/clientMgmt/whiteList/setting/getList.ajax',
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
        clearDiaData: function () {
            this.isUpdate = false;
            this.diaData.custNo = '';
            this.diaData.custId = '';
            this.diaData.phone = '';
            this.diaData.userName = '';
            this.diaData.appId = '';
        },
        showOperate: function (item) {
            this.clearDiaData();
            if (item) {
                this.isUpdate = true;
                this.diaData.custNo = item.custNo;
                this.diaData.custId = item.custId;
                this.diaData.phone = item.phone;
                this.diaData.userName = item.userName;
                this.diaData.appId = item.appId;
            }
            this.showDialog('', 'operate', false);
        },
        operateData: function () {
            if (!this.checkDiaData(this.diaData)) {
                return;
            }
            var url = '/clientMgmt/whiteList/setting/dataAdd.ajax';
            if (this.isUpdate) {
                url = '/clientMgmt/whiteList/setting/dataUpd.ajax';
            }
            var params = {
                custNo: this.diaData.custNo,
                custId: this.diaData.custId,
                phone: this.diaData.phone,
                userName: this.diaData.userName,
                appId: this.diaData.appId
            };
            var _this = this;
            $.post({
                url: url,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('operate', 'info', false, result.msg);
                        _this.search(false);
                    }
                    else {
                        _this.showDialog('operate', 'info', true, result.msg);
                    }
                }
            });
        },
        checkDiaData: function (item) {
            if (item.custNo.length !== 10) {
                this.showDialog('operate', 'info', true, 'custNo必须为10位数字');
                return false;
            }
            // if (item.custId.length !== 7) {
            //     this.showDialog('operate', 'info', true, 'custId必须为7位数字');
            //     return false;
            // }
            if (item.phone && item.phone.length !== 11) {
                this.showDialog('operate', 'info', true, '手机号必须为11位数字');
                return false;
            }
            return true;
        },
        showDelete: function (item) {
            if (!item) {
                return;
            }
            this.deleteId = item.custNo;
            this.showDialog('', 'delete', false);
        },
        deleteData: function () {
            if (!this.deleteId) {
                return;
            }
            var _this = this;
            $.post({
                url: '/clientMgmt/whiteList/setting/dataDel.ajax',
                data: {custNo: this.deleteId},
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('delete', 'info', false, result.msg);
                        _this.search(false);
                    }
                    else {
                        _this.showDialog('delete', 'info', true, result.msg);
                    }
                }
            });
        },
        showBatchDelete: function () {
            this.deleteIdList = this.tableData.filter(function (item) {
                return item.check;
            });
            if (this.deleteIdList.length < 1) {
                this.showDialog('', 'info', false, '请至少选择一条要删除的数据');
                return;
            }
            this.showDialog('', 'batchDelete', false);
        },
        batchDeleteData: function () {
            if (this.deleteIdList.length < 1) {
                this.showDialog('batchDelete', 'info', true, '请至少选择一条要删除的数据');
                return;
            }
            var _this = this;
            $.post({
                url: '/clientMgmt/whiteList/setting/dataDelBatch.ajax',
                data: {custNoList: JSON.stringify(this.deleteIdList)},
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('batchDelete', 'info', false, result.msg);
                        _this.search(false);
                    }
                    else {
                        _this.showDialog('batchDelete', 'info', true, result.msg);
                    }
                }
            });
        },
        selectAll: function () {
            var flag = true;
            if (this.allCheck) {
                flag = false;
            }
            this.viewData.forEach(function (item) {
                item.check = flag;
            });
        },
        showBatchAdd: function () {
            $('#uploadFileInput').change(function () {
                $('#uploadInput').val($(this).val());
            });
            $('#uploadInput').val('');
            $('#uploadFileInput').val('');
            this.showDialog('', 'batchAdd');
        },
        batchAdd: function () {
            var excelData = $('#uploadFileInput').get(0).files[0];
            if (!excelData) {
                this.showDialog('batchAdd', 'info', true, '未选择文件');
                return;
            }
            var fileType = excelData.name.split('.')[excelData.name.split('.').length - 1];
            if (fileType !== 'xlsx') {
                this.showDialog('batchAdd', 'info', true, '上传文件格式错误,请上传.xlsx文件');
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
                $.post({
                    url: '/clientMgmt/whiteList/setting/dataAddBatch.ajax',
                    data: {ExcelData: JSON.stringify(jsonData)},
                    success: function (result) {
                        if (result.error === 0) {
                            _this.showDialog('batchAdd', 'info', false, result.msg);
                            _this.search(false);
                        }
                        else {
                            _this.showDialog('batchAdd', 'info', false, result.msg);
                        }
                    },
                    error: function () {
                        _this.showDialog('batchAdd', 'info', false, '网络超时,请稍后重试');
                    }
                });
            };
            reader.readAsBinaryString(excelData);
        },
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
        }
    }
});