
new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        tableData: [],
        diaMsg: '',
        pmco:"",
        pmnm:"",
        pmv1:"",
        pmv2:"",
        pmv3:"",
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10,

    },
    mounted: function () {
        var dialogs = ['info', 'del', 'revise'];
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
        this.getTableData(0);
    },
    computed: {
        pageList: function () {
            var arr = [];
            if (this.totalPage <= 2 * this.maxSpace) {
                for (var i = 0; i < this.totalPage; i++) {
                    arr.push(i + 1);
                }
                return arr;
            }
            if (this.currentIndex > this.maxSpace && this.totalPage - this.currentIndex > this.maxSpace) {
                for (var i = this.currentIndex - this.maxSpace; i < this.currentIndex + this.maxSpace; i++) {
                    arr.push(i + 1);
                }
            } else if (this.currentIndex <= this.maxSpace && this.totalPage - this.currentIndex > this.maxSpace) {
                for (var i = 0; i < this.currentIndex + (2 * this.maxSpace - this.currentIndex); i++) {
                    arr.push(i + 1);
                }
            } else if (this.currentIndex > this.maxSpace && this.totalPage - this.currentIndex <= this.maxSpace) {
                var space = this.totalPage - this.currentIndex;
                for (var i = this.currentIndex - (2 * this.maxSpace - space); i < this.totalPage; i++) {
                    arr.push(i + 1);
                }
            } else {
                for (var i = 0; i < this.totalPage; i++) {
                    arr.push(i + 1);
                }
            }
            return arr;
        },
        checkAll: function () {
            if (this.tableData.length == 0) {
                return false;
            }
            for (var i = 0; i < this.tableData.length; i++) {
                if (!this.tableData[i].check) {
                    return false;
                }
            }
            return true;
        }
    },
    watch: {
        pageMaxNum: function () {
            this.getTableData(0);
        }
    },
    methods: {
        getTableData: function (currentIndex) {
            var _this = this;
            var params = {};
            params.pageNum = currentIndex + 1;
            params.pageSize = this.pageMaxNum;
            $.post({
                url: '/businessMgmt/highFinancialMgmt/basicsParamMaintain/getTableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        // 后端分页 展示
                        _this.tableData = result.data.tableData;
                        _this.currentIndex = result.data.pageNo - 1;
                        _this.totalPage = result.data.totalSize;
                    }
                    else {
                        _this.tableData = [];
                        _this.currentIndex = 0;
                        _this.totalPage = 0;
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        // 修改数据
        showUpdate:function (item) {
            var _this = this;
            this.pmco=item.pmco;
            this.pmnm=item.pmnm;
            this.pmv1=item.pmv1;
            $("#uploadFileInput").val("")
            this.pmv2=item.pmv2;
            this.pmv3=item.pmv3;
            this.showDialog('', 'revise');
        },
        update: function () {
            var _this = this;
            var params = {};
            params.pmco =this.pmco
            params.pmnm = this.pmnm;
            params.pmv1 = this.pmv1;
            params.pmv2 = this.pmv2;
            params.pmv3 = this.pmv3;
            console.log(params)
            $.post({
                url: '/businessMgmt/highFinancialMgmt/basicsParamMaintain/update.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0);
                        _this.showDialog('revise', 'info', false, result.msg);
                    }
                    _this.showDialog('revise', 'info', false, result.msg);
                }
            });
        },
        // 文件上传-图片
        choose:function () {
            return document.getElementById("uploadFileInput").click();  
        },
        showFileName: function (event) {
            var _this = this;
            this.pmv1 = event.target.files[0].name
        },
        fileUpload:function () {
            var _this = this;
            var filePath = this.pmv1;  
            var afterFile = filePath.indexOf('.');
            afterFile = filePath.substr(afterFile - 0 + 1) //获取文件后缀名
            afterFile = afterFile.toLocaleLowerCase() //转为小写
            if (this.pmv1!==''&& afterFile != 'png' && afterFile != 'jpg' && afterFile != 'gif') {
                this.showDialog('revise', 'info', true, '只能上传png、jpg、gif格式图片');
                return;
            }
            if (this.pmv1!="") {
                // var fileElementId = 'uploadFileInput';
                var file = document.getElementById("uploadFileInput")
                var formdata = new FormData();
                formdata.append('file', file.files[0])
                // $.ajaxFileUpload({
                //     url: '/businessMgmt/highFinancialMgmt/basicsParamMaintain/upload.ajax',
                //     type: 'POST',
                //     dataType: 'json',
                //     secureuri: false,
                //     fileElementId: fileElementId,
                //     success: function (result) {
                //         if (result.error == 0) {
                //             _this.pmv1 = result.data
                //             _this.showDialog('revise', 'info', true, result.msg)
                //             _this.getTableData(0)
                //         } else {
                //
                //             _this.showDialog('revise', 'info', true, result.msg)
                //         }
                //     }
                // });

                $.post({
                    url: '/businessMgmt/highFinancialMgmt/basicsParamMaintain/upload.ajax',
                    cache: false,
                    data: formdata,
                    processData: false,
                    contentType: false,
                }).done(function (result) {
                    if (result.error === 0) {
                        _this.pmv1 = result.data
                        _this.showDialog('revise', 'info', true, result.msg);
                        _this.getTableData(0)
                    } else {
                        _this.showDialog('revise', 'info', true, result.msg);
                    }
                }).fail(function (err) {
                    console.log(err)
                    _this.showDialog('revise', 'info', true, '上传失败');
                });
            }
        },
        // 清除文件
        clear:function () {
              this.pmv1=""
        },
        // 下载文件
        download: function (fileName) {
            console.log(fileName);
            var url = '/businessMgmt/highFinancialMgmt/basicsParamMaintain/download.ajax?pmv1='+fileName;
            console.log(url)
            window.location.href = url;
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
        check: function (item) {
            item.check = !item.check;
        },
        allCheck: function () {
            var _this = this;
            var flag = this.checkAll;
            this.tableData.forEach(function (item) {
                item.check = !flag;
            });
        },
        prev: function () {
            if (this.currentIndex <= 0) {
                return;
            }
            this.getTableData(this.currentIndex - 1);
        },
        next: function () {
            if (this.currentIndex >= this.totalPage - 1) {
                return;
            }
            this.getTableData(this.currentIndex + 1);
        },
        changeIndex: function (index) {
            this.getTableData(index - 1);
        },
        toFirst: function () {
            this.getTableData(0);
        },
        toLast: function () {
            this.getTableData(this.totalPage - 1);
        },
    }
});

