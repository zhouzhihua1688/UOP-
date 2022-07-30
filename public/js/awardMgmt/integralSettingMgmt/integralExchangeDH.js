new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        pointNo: '',
        deleteId: '',
        updateId: '',
        tableData: [],
        diaMsg: '',
        loadingShow: false,
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
            } else {
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
        var dialogs = ['info', 'addExcel'];
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
        $('#uploadFileInput').on('change', function () {
            $('#uploadInput').val($(this).val());
        });
        this.search();
    },
    methods: {
        //模板管理业务方法
        search: function () {
            $.post({
                url: '/awardMgmt/integralSettingMgmt/integralExchangeDH/getList.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        this.currentIndex = 0;
                        this.tableData = result.data;
                    } else {
                        this.showDialog('', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },
        download: function(){
            window.location.href = '/awardMgmt/integralSettingMgmt/integralExchangeDH/download.ajax';
        },
        showUpload: function(){
            $('#uploadFileInput').change(function () {
                $('#uploadInput').val($(this).val());
            });
            $('#uploadInput').val('');
            $('#uploadFileInput').val('');
            this.showDialog('', 'addExcel');
        },
        addExcel: function(){
            var excelData = $('#uploadFileInput').get(0).files[0];
            if (!excelData) {
                this.showDialog('addExcel', 'info', true, '未选择文件');
                return;
            }
            var formdata = new FormData();
            formdata.append('file', excelData);
            this.showDialog('addExcel');
            this.loadingShow = true;
            $.post({
                url: '/awardMgmt/integralSettingMgmt/integralExchangeDH/upload.ajax',
                cache: false,
                data: formdata,
                processData: false,
                contentType: false,
                success: function (result) {
                    if (result.error === 0) {
                        this.showDialog('', 'info', false, '上传成功');
                    }
                    else {
                        this.showDialog('', 'info', false, '上传失败');
                    }
                }.bind(this),
                complete: function () {
                    this.loadingShow = false;
                }.bind(this)
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
        }
    },
    filters: {
        filterExpendType: function (value) {
            var obj = {
                '1': '商品兑换',
                '2': '积分转增',
                '3': '积分三方输出'
            };
            return obj[value] || value;
        },
        filterOperateType: function (value) {
            var obj = {
                '1': '积分增加',
                '2': '积分消耗'
            };
            return obj[value] || value;
        },
        filterPointStatus: function (value) {
            var obj = {
                '1': '正常',
                '2': '冻结',
                '9': '失效',
                '90': '申请兑换，未下载',
                '91': '已下载，未核销',
                '92': '核销兑换成功',
                '93': '核销失败，积分退回'
            };
            return obj[value] || value;
        },
        filterSource: function (value) {
            var obj = {
                '0': '人工发放',
                '1': '营销活动',
                '2': '积分赠送'
            };
            return obj[value] || value;
        }
    }
});
