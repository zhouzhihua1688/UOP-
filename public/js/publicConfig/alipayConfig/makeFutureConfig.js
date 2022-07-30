new Vue({
    el: '#content',
    data: {
        diaMsg: '',
        filePath: '',
        filePicPath: [],
        jsonDetail: ''
    },
    computed: {

    },
    watch: {

    },
    mounted: function () {
        var dialogs = ['info'];
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
        $('#selectBtn2').click(function () {
            $('#uploadFileInput2').click();
        });
        $('#uploadFileInput2').on('input', function () {
            $('#uploadInput2').val($(this).val());
        });
        this.getFilePathInfo();
        this.getFileInfo();
        this.getPostPicFilePathInfo();
    },
    methods: {
        uploadFile: function () {
            if (!$('#uploadFileInput').val()) {
                this.showDialog('', 'info', false, '请选择要上传的文件');
                return false;
            }
            var _this = this;
            $.ajaxFileUpload({
                url: '/publicConfig/alipayConfig/makeFutureConfig/uploadFile.ajax',
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
                        _this.getFileInfo();
                    }
                    _this.showDialog('', 'info', false, result.msg);
                },
                error: function () {
                    _this.showDialog('', 'info', false, '网络超时，请稍后重试');
                }
            });
        },
        uploadPostPicFile: function () {
            if (!$('#uploadFileInput2').val()) {
                this.showDialog('', 'info', false, '请选择要上传的文件');
                return false;
            }
            var _this = this;
            $.ajaxFileUpload({
                url: '/publicConfig/alipayConfig/makeFutureConfig/uploadPostPicFile.ajax',
                type: 'POST',
                dataType: 'json',
                fileElementId: 'uploadFileInput2',
                success: function (result) {
                    $('#uploadFileInput2').val('');
                    $('#uploadInput2').val('');
                    $('#uploadFileInput2').on('input', function () {
                        $('#uploadInput2').val($(this).val());
                    });
                    if (result.error == 0) {
                        _this.filePicPath = result.data.filePath;
                        _this.getPostPicFilePathInfo();
                    }
                    _this.showDialog('', 'info', false, result.msg);
                },
                error: function () {
                    _this.showDialog('', 'info', false, '网络超时，请稍后重试');
                }
            });
        },
        getPostPicFilePathInfo: function () {
            var _this = this;
            $.ajax({
                url: '/publicConfig/alipayConfig/makeFutureConfig/getPostPicFilePath.ajax',
                type: 'POST',
                success: function (result) {
                    if (result.error == 0) {
                        _this.filePicPath = result.data;
                    } else {
                        _this.filePicPath = [];
                    }
                },
                error: function () {
                    _this.showDialog('', 'info', false, '网络超时，请稍后重试');
                }
            });
        },
        getFilePathInfo: function () {
            var _this = this;
            $.ajax({
                url: '/publicConfig/alipayConfig/makeFutureConfig/getFilePath.ajax',
                type: 'POST',
                success: function (result) {
                    if (result.error == 0) {
                        _this.filePath = result.data.filePath;
                    } else {
                        _this.filePath = '文件路径获取失败';
                    }
                },
                error: function () {
                    _this.showDialog('', 'info', false, '网络超时，请稍后重试');
                }
            });
        },
        getFileInfo: function () {
            var _this = this;
            $.ajax({
                url: '/publicConfig/alipayConfig/makeFutureConfig/getFile.ajax',
                type: 'POST',
                success: function (result) {
                    if (result.error == 0) {
                        _this.jsonDetail = JSON.stringify(JSON.parse(result.data), null, 4);
                    }
                }
            });
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
    }
});