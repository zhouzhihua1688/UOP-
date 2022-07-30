
new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        tableData: [],
        diaMsg: '',
        custGroupName:'',
        custGroupNo:"",
        custIdno:"",
        custIdtp:"",
        custName:"",
        custNo:"",
        custId:'',
        insertTimestamp:"",
        // 查询下拉数据
        custGroup:[],
        custIdlist:[],
        // 新增参数
        custNos:'',
        custNames:'',
        custIds:'',
        custIdnos:'',

        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10,

        filePath: '', //导入

    },
    mounted: function () {
        var dialogs = ['info', 'del', 'add','addfile'];
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
        this.custList()
        this.custIdClass()

        $('#uploadBtn').click(function () {
            $('#uploadFileInput').click();
        });
        $('#updateBtn').click(function () {
            $('#updateFileInput').click();
        });
        $('#downloadExcel').click(function () {
            var elt = document.getElementById('data-table');
            var wb = XLSX.utils.table_to_book(elt, {sheet: 'Sheet JS'});
            XLSX.writeFile(wb, 'VIP模板示例.xls');
        });
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
            params.custGroupNo =this.custGroupNo;
            params.custIdno =this.custIdno;
            params.custIdtp =this.custIdtp;
            params.custName =this.custName;
            params.pageNum = currentIndex + 1;
            params.pageSize = this.pageMaxNum;
            $.post({
                url: '/businessMgmt/highFinancialMgmt/custInfo/getTableData.ajax',
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
        // 下拉列表数据(客群名称)
        custList:function () {
            var _this = this;
            // var params={};
            $.post({
                url: '/businessMgmt/highFinancialMgmt/custInfo/custList.ajax',
                // data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.custGroup = result.data.body;
                    }
                    else {
                        _this.custGroup = [];
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        // 证件类型
        custIdClass:function () {
            var _this = this;
            // var params={};
            $.post({
                url: '/businessMgmt/highFinancialMgmt/custInfo/custIdClass.ajax',
                // data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.custIdlist = result.data.body;
                    }
                    else {
                        _this.custIdlist = [];
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },

        // 新增数据
        showAdd:function () {
            var _this = this;
            this.custNos = "";
            this.custNames = "";
            this.custIds = "";
            this.custIdnos = "";
            this.showDialog('', 'add');
        },
        saveParam:function () {
            var _this = this;
            var params={};
            params.custGroupNo =this.custNos;
            params.custName =this.custNames;
            params.custIdtp =this.custIds;
            params.custIdno =this.custIdnos;
            var reg =/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;

            if(!reg.test(params.custIdno)){
                return _this.showDialog('add', 'info', true,'证件号码必须为18位有效证件!');
            }
            $.post({
                url: '/businessMgmt/highFinancialMgmt/custInfo/saveParam.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0);
                        _this.showDialog('add', 'info', false, result.msg);
                    }else{
                       _this.showDialog('add', 'info', true, result.msg); 
                    }  
                }
            });
        },
        // 删除数据
        showDelete:function (item) {
            var _this = this;
            this.custNo=item.custNo;
            this.showDialog('', 'del');
        },
        deleteList:function () {
            var _this=this;
            var params={};
            params.custNo = this.custNo
            $.post({
                url: '/businessMgmt/highFinancialMgmt/custInfo/deleteParam.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0);
                    }

                    _this.showDialog('del', 'info', false, result.msg);

                }
            });
        },
        // 导入文件
        addFile:function(){
            var _this=this
            $('#uploadFileInput').change(function () {
                $('#uploadInput').val($(this).val());
            });
            $('#uploadInput').val('');
            $('#uploadFileInput').val('');
            this.showDialog('', 'addfile');
        },
        batchAdd: function () {
            var excelData = $('#uploadFileInput').get(0).files[0];
            if (!excelData) {
                this.showDialog('addfile', 'info', true, '未选择文件');
                return;
            }
            var fileType = excelData.name.split('.')[excelData.name.split('.').length - 1];
            if (fileType !== 'xls') {
                this.showDialog('addfile', 'info', true, '上传文件格式错误,请上传.xls文件');
                return;
            }
            //转化文件成json格式
            // var _this = this;
            // var reader = new FileReader();
            // reader.onload = function (e) {
            //     var data = e.target.result;
            //     var workbook = XLSX.read(data, {type: 'binary'});
            //     var fromTo = '';
            //     var jsonData = [];
            //     // 遍历每张表读取
            //     for (var sheet in workbook.Sheets) {
            //         if (workbook.Sheets.hasOwnProperty(sheet)) {
            //             fromTo = workbook.Sheets[sheet]['!ref'];
            //             jsonData = jsonData.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
            //             break;
            //         }
            //     }
            //     console.log('前端解析文件数据为: ', jsonData);
            var _this = this;
            var formData = new FormData()
            formData.append('file', excelData)
                $.post({
                    url: '/businessMgmt/highFinancialMgmt/custInfo/ExcelUpload.ajax',
                    // data: {ExcelData: JSON.stringify(jsonData)},
                    data:formData,
                    contentType: false, // 不设置内容类型
                    processData: false, // 不处理数据
                    success: function (result) {
                        // if (result.error === 0) {
                        //     _this.showDialog('addfile', 'info', false, result.msg);
                        //     _this.search(false);
                        // }
                        // else {
                        //     _this.showDialog('addfile', 'info', false, result.msg);
                        // }

                        if (result.error === 0) {
                            _this.getTableData(0);
                            _this.showDialog('addfile', 'info', false, result.msg);
                        } else {
                            _this.showDialog('addfile', 'info', true, result.msg);
                        }
                    },
                    // error: function () {
                    //     _this.showDialog('addfile', 'info', false, '网络超时,请稍后重试');
                    // }
                });
            // };
            // reader.readAsBinaryString(excelData);
        },

    // fileUpload: function () {
        //     var _this = this;
        //     var filePath = this.filePath;
        //     var afterFile = filePath.indexOf('.');
        //     afterFile = filePath.substr(afterFile - 0 + 1) //获取文件后缀名
        //     afterFile = afterFile.toLocaleLowerCase() //转为小写
        //     if (afterFile != 'xls' && afterFile != 'xlsx') {
        //         _this.showDialog('addfile', 'info', true, '只能上传Excel表格');
        //         return;
        //     }
        //     if (this.filePath!="") {
        //         var fileElementId = 'uploadFileInput';
        //         $.ajaxFileUpload({
        //             url: '/businessMgmt/highFinancialMgmt/custInfo/ExcelUpload.ajax',
        //             type: 'POST',
        //             dataType: 'json',
        //             secureuri: false,
        //             fileElementId: fileElementId,
        //             success: function (result) {
        //                 if (result.error == 0) {
        //                     _this.showDialog('addfile', 'info', false, result.msg)
        //                     _this.getTableData(0)
        //                 } else {
        //
        //                     _this.showDialog('addfile', 'info', true, result.msg)
        //                 }
        //             }
        //         });
        //     }
        // },
        // select: function () {
        //     document.getElementById("uploadFileInput").click();
        // },
        // showFileName: function (event) {
        //     this.filePath = event.target.files[0].name
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

