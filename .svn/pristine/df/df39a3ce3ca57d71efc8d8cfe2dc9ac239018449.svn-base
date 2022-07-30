new Vue({
    el: '#content',
    data:{
        diaMsg:"",
        tableData:[],
        dialogTabData:[],
        fileName: '',
        // viewData:[{fundid:'asd',
        //     fundnm:'asd'}],
        //上传和更新弹窗数据
        uploadYmonth: '',
        updateYmonth:'',
        updateFundid: '',
        updateFundnm: '',
        updateFile: '',
        // 分页
        currentIndex: 0,
        pageMaxNum: '10',
        condition: '',
    },
    computed:{
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
        }
    },
    watch:{
        pageMaxNum: {
            handler: function (val, oldval) {
                this.currentIndex = 0;
            }
        },
        condition: {
            handler: function (val, oldval) {
                this.currentIndex = 0;
            }
        }
    },
    mounted:function(){
        var _this=this;
        var dialogs = ['upload', 'update', 'daysDetail', 'info'];
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
        _this.getTableList();
    },
    methods:{
        getTableList: function (params) {
            var _this = this;
            $.post({
                url: '/thirdPartyOperation/expenseMgmt/trailingSum/getList.ajax',
                data: params ? params : {},
                success: function (result) {
                    if (result.error == 0) {
                        var data = result.data;
                        console.log(data);
                        _this.tableData=data;
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        sendGoTo:function (item) {
            var month=item.ymonth.replace("年","").replace("月","");
            window.location.href="/thirdPartyOperation/expenseMgmt/trailingSum.html?pageType=details&ymonth="+month;
        },
        //查询
        //年月查询
        queryYmonth:function () {
            var yMonth=$(".date-picker").val().replace("-","");
            var _this = this;
            $.post({
                url: '/thirdPartyOperation/expenseMgmt/trailingSum/queryYmonth.ajax?ymonth='+yMonth,
                success: function (result) {
                    if (result.error == 0) {
                        var data = result.data;
                        console.log(data)
                        _this.tableData=data;
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        //分页
        prev: function () {
            this.currentIndex <= 0 ? 0 : this.currentIndex--;
        },
        next: function () {
            this.currentIndex >= this.middleData.length - 1 ? this.middleData.length - 1 : this.currentIndex++;
        },
        changeIndex: function (index) {
            this.currentIndex = index - 1;
        },
        //上传
        showUpload: function () {
            console.log(123131231);
            $('#uploadFileInput').on('change', function () {
                $('#uploadInput').val($(this).val());
            });
            $('#uploadInput').val('');
            $('#uploadFileInput').val('');
            this.uploadYmonth= '';
            this.showDialog('', 'upload');
        },
        upload: function () {
            if (!this.uploadYmonth) {
                this.showDialog('upload', 'info', true, '年月不能为空');
                return;
            }
            if (!$('#uploadFileInput').val()) {
                this.showDialog('upload', 'info', true, '未选择上传的excel');
                return;
            }
            var _this = this;
            var params = {
                uploadYmonth: this.uploadYmonth
            };
            $.ajaxFileUpload({
                url: '/thirdPartyOperation/expenseMgmt/trailingSum/upload.ajax',
                type: 'POST',
                data: params,
                dataType: 'json',
                fileElementId: 'uploadFileInput',
                success: function (result) {
                    console.log(result)
                    if (result.error === 0) {
                        _this.showDialog('upload', 'info', false, result.msg);
                        $.post({
                            url: '/thirdPartyOperation/expenseMgmt/trailingSum/getList.ajax',
                            success: function (data) {
                                if (data.error === 0) {
                                    _this.tableData = data.data;
                                }
                            }
                        });
                    } else {
                        _this.showDialog('upload', 'info', true, result.msg);
                    }
                }
            });
        },
        //导入更新
        showUpdate: function (item) {
            $('#updateFileInput').change(function () {
                $('#updateInput').val($(this).val());
            });
            $('#updateInput').val('');
            $('#updateFileInput').val('');
            this.updateYmonth = item.ymonth;
           // this.updateFile = item.fileName;
            console.log(item.ymonth);
            $('#updateInput').val(this.updateFile);
            this.showDialog('', 'update');
        },
        update: function () {
            if (!$('#updateFileInput').val()) {
                this.showDialog('update', 'info', true, '未选择上传参数表');
                return;
            }
            var _this = this;
            var ymonth=this.updateYmonth.replace("年","").replace("月","");
            var params = {
                ymonth: ymonth
            };

            $.ajaxFileUpload({
                url: '/thirdPartyOperation/expenseMgmt/trailingSum/update.ajax',
                type: 'POST',
                data: params,
                dataType: 'json',
                fileElementId: 'updateFileInput',
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('update', 'info', false, result.msg);
                        $.post({
                            url: '/thirdPartyOperation/expenseMgmt/trailingSum/getList.ajax',
                            success: function (data) {
                                if (data.error === 0) {
                                    _this.tableData = data.data;
                                }
                            }
                        });
                    } else {
                        _this.showDialog('update', 'info', true, result.msg);
                    }
                }
            });
        },
        //下载
        download: function (item) {
            var params = {
                filepath: item.attach1
            };
            console.log(params);
            window.location.href = '/thirdPartyOperation/expenseMgmt/trailingSum/download.ajax?filepath=' + params.filepath;
        },
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