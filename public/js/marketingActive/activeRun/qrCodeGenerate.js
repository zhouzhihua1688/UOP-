new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        url:'',
        imgurl:'',
        diaMsg:''
    },
    mounted: function () {
        var dialogs = ['info', 'del', 'add'];
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
        // this.getTableData(0);
    },
    methods: {
        uploadAndDown: function () {
            var _this=this;
            var uploadFile=document.getElementById('upload');
            var realUrl='';
            var formData= {};
            if(!this.url){
                this.showDialog('','info', false, 'URL为必填项');
                return;
            }
            if(uploadFile.files.length>0){
                if (!/.+(\.gif|\.jpeg|\.png|\.jpg|\.bmp)$/.test(uploadFile.files[0].name)) {
                    this.showDialog('', 'info', true, '文件格式错误');
                    return;
                }
                realUrl= '/marketingActive/activeRun/qrCodeGenerate/qrCodeUpload.ajax?url='+this.url;
                formData= new FormData();
                formData.append("file",uploadFile.files[0]);
            }else{
                realUrl= '/marketingActive/activeRun/qrCodeGenerate/qrCodeUploadUrl.ajax?url='+this.url;
            }
            $.post({
                url: realUrl,
                data: formData,
                processData:false,
                contentType:false,
                success: function (result) {
                    if (result.error === 0) {
                       console.log(result);
                       _this.imgurl='data:image/jpg;base64,'+result.data;
                        var link=document.createElement('a');
                        link.href=URL.createObjectURL(_this.convertBase64UrlToFile(result.data));
                        link.download='二维码.png'
                        link.click();
                        URL.revokeObjectURL(link.href);
                    }
                    else {
                        _this.showDialog('add', 'info', true, result.msg);
                    }
                }
            });
        },
        convertBase64UrlToFile:function(base64) {
            const bytes = window.atob(base64);
            const ab = new ArrayBuffer(bytes.length);
            const ia = new Uint8Array(ab);
            for (var i = 0; i < bytes.length; i++) {
                ia[i] = bytes.charCodeAt(i);
            }
    
            return new Blob([ab], {type: 'image/png'});
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