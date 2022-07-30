
new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        tableData: [],
        diaMsg:'',
        custGroupNo:"",
        custGroupName:"",
        fundId:'',
        fundName:'',
        protocolNo:'',
        protocolAdd:'',
        protocolStart:'',
        invalidTimestamp:'',
        founder:'',
        // 查询下拉数据
        custGroup:[],
        custNo:'',
        nameList:[],
        fundname:'',

        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10,
    },
    mounted: function () {
        var dialogs = ['info', 'del', 'add','failure'];
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
        //下拉列表自带搜索功能
        var fundArr = ['fundNameList','fundNameLists'];
        fundArr.forEach(function (value) {
            $('#' + value).chosen({
                search_contains: true,
                no_results_text: '未找到相关产品信息',
                disable_search_threshold: 6,
                width: '220px'
            });
        });
        $('#fundNameList').on('change', function (e, params) {
            _this.fundId = params ? params.selected : '';
        });
        $('#fundNameLists').on('change', function (e, params) {
            _this.fundId = params ? params.selected : '';
        });
        this.getTableData(0);
        this.custList();
        this.fundList(0);
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
            params.custGroupNo =this.custNo;
            params.fundId=this.fundId
            params.pageNum = currentIndex + 1;
            params.pageSize = this.pageMaxNum;
            console.log(params)
            $.post({
                url: '/businessMgmt/highFinancialMgmt/custGroupMapping/getTableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        // _this.tableData = result.data;
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
        // 下拉列表数据
        custList:function () {
            var _this = this;
            // var params={};
            $.post({
                url: '/businessMgmt/highFinancialMgmt/custGroupMapping/custList.ajax',
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
        // 产品名称
        fundList:function(currentIndex){
            var _this = this;
            var params = {};
            params.pageNum =currentIndex + 1;
            params.pageSize =this.pageMaxNum+9980;
            $.post({
                url: '/businessMgmt/highFinancialMgmt/custGroupMapping/fundList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.nameList = result.data.listData;
                        _this.currentIndex = result.data.pageNum - 1;
                        _this.totalPage = result.data.totalSize;

                        // 下拉列表
                        var str = '<option value="">全部</option>';
                        _this.nameList.forEach(function (item) {
                            str += '<option value="' + item.fundId + '">'+item.fundId+"-"+item.fundName + '</option>';
                        });
                        var fundArr = ['fundNameList'];
                        fundArr.forEach(function (value) {
                            $('#' + value).html(value === '' ? ('<option value="">全部</option>' + str) : str);
                            $('#' + value).trigger('chosen:updated');
                        });
                        var fundArr = ["fundNameLists"];
                        fundArr.forEach(function (value) {
                            $('#' + value).html(value === '' ? ('<option value="">全部</option>' + str) : str);
                            $('#' + value).trigger('chosen:updated');
                        });
                    }
                    else {
                        _this.nameList = [];
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        // 新增数据
        showAdd:function () {
            var _this = this;
            this.custGroupNo = "";
            // this.fundId= "";
            this.protocolAdd = "";
            this.protocolNo = "";
            this.founder = "";

            // 下拉列表
            var str = '<option value="">全部</option>';
            _this.nameList.forEach(function (item) {
                str += '<option value="' + item.fundId + '">'+item.fundId+"-"+item.fundName + '</option>';
            });
            var fundArr = ["fundNameLists"];
            fundArr.forEach(function (value) {
                $('#' + value).html(value === '' ? ('<option value="">全部</option>' + str) : str);
                $('#' + value).trigger('chosen:updated');
            });
            this.showDialog('', 'add');
        },
        // 新增数据
        saveParam:function () {
            var _this = this;
            var params={};
            params.custGroupNo =this.custGroupNo;
            params.fundId =this.fundId;
            params.protocolAdd =this.protocolAdd;
            params.protocolNo =this.protocolNo;
            params.founder =this.founder;
            console.log("新增-",params)
            $.post({
                url: '/businessMgmt/highFinancialMgmt/custGroupMapping/saveParam.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0);
                        _this.showDialog('add', 'info', false, result.msg);
                    }
                    else {
                        _this.showDialog('add', 'info', true, result.msg);
                    }
                }
            });
        },      
        // 删除数据
        showDelete:function (item) {
            var _this = this;
            this.protocolNo=item.protocolNo;
            this.showDialog('', 'del');
        },
        deleteList:function () {
            var _this=this;
            var params={};
            params.protocolNo = this.protocolNo
            $.post({
                url: '/businessMgmt/highFinancialMgmt/custGroupMapping/deleteParam.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0);
                    }

                    _this.showDialog('del', 'info', false, result.msg);

                }
            });
        },
        // 置失效
        failure:function(item){
            var _this = this;
            this.protocolNo=item.protocolNo;
            this.showDialog('', 'failure');
        },
        failureSave:function(){
            var _this=this;
            var params={};
            params.protocolNo = this.protocolNo
            $.post({
                url: '/businessMgmt/highFinancialMgmt/custGroupMapping/failureSave.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0);
                    }

                    _this.showDialog('failure', 'info', false, result.msg);

                }
            });
        },
        // 协议文件上传
        // 文件上传
        choose:function () {
            document.getElementById("uploadFileInput1").click();
        },
        showFileName: function (event) {
            this.protocolAdd = event.target.files[0].name
        },

        fileUpload: function () {
            var _this = this;
            var protocolAdd = this.protocolAdd;
            var afterFile = protocolAdd.indexOf('.');
            afterFile = protocolAdd.substr(afterFile - 0 + 1) //获取文件后缀名
            afterFile = afterFile.toLocaleLowerCase() //转为小写
            if (this.protocolAdd !== '' && afterFile != 'pdf'&& afterFile != 'doc'&& afterFile != 'docx') {
                this.showDialog('add', 'info', true, '只能上传doc、docx或pdf格式文件');
                return;
            }
            var file = document.getElementById("uploadFileInput1")
            var formdata = new FormData();
            formdata.append('file', file.files[0])
            if (this.protocolAdd!="") {
                // var fileElementId = 'uploadFileInput1';
            //     $.ajaxFileUpload({
            //         url: '/businessMgmt/highFinancialMgmt/custGroupMapping/upload.ajax',
            //         type: 'POST',
            //         dataType: 'json',
            //         secureuri: false,
            //         fileElementId: fileElementId,
            //         success: function (result) {
            //             if (result.error == 0) {
            //                 _this.protocolAdd=result.data
            //                 _this.showDialog('add', 'info', true, result.msg)
            //                 _this.getTableData(0)
            //             } else {

            //                 _this.showDialog('add', 'info', true, result.msg)
            //             }
            //         }
            //     });
            // }
             $.post({
                    url: '/businessMgmt/highFinancialMgmt/custGroupMapping/upload.ajax',
                    cache: false,
                    data: formdata,
                    //dataType: 'json',
                    //async: false,
                    processData: false,
                    contentType: false,
                }).done(function (result) {
                    _this.protocolAdd = true;
                    if (result.error === 0) {
                        _this.protocolAdd= result.data
                        _this.showDialog('add', 'info', true, result.msg);
                        _this.getTableData(0)
                    } else {
                        _this.showDialog('add', 'info', true, result.msg);
                    }
                }).fail(function (err) {
                    // _this.protocolAdd = true;
                    console.log(err)
                    _this.showDialog('add', 'info', true, '上传失败');
                });
        }
    },
        // 清除文件
        clear:function () {
            this.protocolAdd="";
        },
        // 下载文件
        download: function (protocolAdd) {
            console.log(111)
            var url = '/businessMgmt/highFinancialMgmt/custGroupMapping/download.ajax?protocolAdd='+protocolAdd;
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
    },
    // 类型状态
    filters: {
        protocolStart: function (item) {
            if (item === "0") {
                return "生效"
            } else if (item === "1") {
                return "失效"
            } else {
                return "其他"
            }
        }
    }
});

