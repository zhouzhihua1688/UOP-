new Vue({
    el: '#content',
    data: {
        diaMsg: '',
        filePath: '',
        filePicPath: [],
        jsonDetail: '',
        // 列表数据
        tableData:[],
        fileName:'',
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10,
        condition:'',
        currentFileName:''
    },
    mounted: function () {
        // alert('123')
        var dialogs = ['info','reUpload','del'];
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
        $('#selectBtn').click(function () {
            $('#uploadFileInput').click();
        });
        $('#uploadFileInput').on('input', function () {
            $('#uploadInput').val($(this).val());
        });
        $('#selectBtn1').click(function () {
            $('#uploadFileInput1').click();
        });
        $('#uploadFileInput1').on('input', function () {
            $('#uploadInput1').val($(this).val());
        });
        this.getTableData()
    },
    computed:{
        //主表格假分页
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
        },
    },
    methods: {
        // 上传
        uploadFile: function () {
            if (!$('#uploadFileInput').val()) {
                this.showDialog('', 'info', false, '请选择要上传的文件');
                return false;
            }
            if(!/(.+(?=[.zip]$))/.test($('#uploadFileInput').val())){
                this.showDialog('', 'info', false, '请上传格式为zip的压缩文件');
                return false;
            }
            var _this = this;
            $.ajaxFileUpload({
                url: '/publicConfig/alipayConfig/cmbMPConfig/uploadFile.ajax',
                type: 'POST',
                dataType: 'json',
                fileElementId: 'uploadFileInput',
                success: function (result) {
                    $('#uploadFileInput').val('');
                    $('#uploadInput').val('');
                    $('#uploadFileInput').on('input', function () {
                        $('#uploadInput').val($(this).val());
                    });
                    if (result.error == 0) {
                        _this.filePath = result.data.filePath;
                    }
                    _this.getTableData();
                    _this.showDialog('', 'info', false, result.msg);
                },
                error: function () {
                    _this.showDialog('', 'info', false, '网络超时，请稍后重试');
                }
            });
        },
        //查询文件列表
        getTableData:function(){
            $.post({
                url: '/publicConfig/alipayConfig/cmbMPConfig/getTableData.ajax',
                data: {fileName:this.fileName},
                success: function (result) {
                    if (result.error === 0) {
                        this.tableData = result.data.fileList;
                    }
                    else {
                        this.tableData = [];
                        this.currentIndex = 0;
                        this.totalPage = 0;
                        this.showDialog('', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },
        //重新上传
        showReUpload:function(value){
            this.currentFileName = value;
            this.showDialog('', 'reUpload', false);
        },
        reUpload:function(){
            if (!$('#uploadFileInput1').val()) {
                this.showDialog('reUpload', 'info', true, '请选择要上传的文件');
                return false;
            }
            if (!$('#uploadFileInput1').val().includes(this.currentFileName)) {
                this.showDialog('reUpload', 'info', true, '请选择同名的文件');
                return false;
            }
            if(!/(.+(?=[.zip]$))/.test($('#uploadFileInput1').val())){
                this.showDialog('reUpload', 'info', true, '请上传格式为zip的压缩文件');
                return false;
            }
            var _this = this;
            $.ajaxFileUpload({
                url: '/publicConfig/alipayConfig/cmbMPConfig/uploadFile.ajax',
                type: 'POST',
                dataType: 'json',
                fileElementId: 'uploadFileInput1',
                success: function (result) {
                    $('#uploadFileInput1').val('');
                    $('#uploadInput1').val('');
                    $('#uploadFileInput1').on('input', function () {
                        $('#uploadInput1').val($(this).val());
                    });
                    _this.showDialog('reUpload', 'info', false, result.msg);
                    _this.getTableData();
                },
                error: function () {
                    _this.showDialog('reUpload', 'info', true, '网络超时，请稍后重试');
                }
            });
        },
        //删除文件
        showDelete:function(value){
            this.currentFileName = value;
            this.showDialog('', 'del', false);
        },
        deleteComfirm:function(){
            $.post({
                url: '/publicConfig/alipayConfig/cmbMPConfig/del.ajax',
                data: {fileName:this.currentFileName},
                success: function (result) {
                    this.showDialog('del', 'info', false,result.msg)
                    this.getTableData();
                }.bind(this)
            });
        },
        //公共方法
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
    }
});