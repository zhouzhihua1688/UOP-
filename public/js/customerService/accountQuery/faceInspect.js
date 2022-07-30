new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        diaMsg: '',
        eventList: [{
            val: '',
            name: '客户姓名:',
            key: 'invnm'
        }, {
            val: '',
            name: '身份证号:',
            key: 'idno'

        }],
        loadingShow: false,
        resultVal: '',
        imgHover: '',
        file: ''
    },
    mounted: function () {
        var dialogs = ['info'];
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
    },
    methods: {
        fileDrag: function (event) {
            this.imgHover = '';
            var files = event.dataTransfer.files[0];
            this.fileShow(files)
            // do something with files
        },
        selectFile(el) {
            if (el.srcElement.files[0]) {
                this.fileShow(el.srcElement.files[0])
                el.srcElement.value = ''
            }
        },
        fileShow: function (files) {
            console.log(files)
            var acceptedTypes = {
                'image/png': true,
                'image/jpeg': true,
                'image/gif': true
            };
            if (acceptedTypes[files.type] === true) {
                this.file = files;
                var reader = new FileReader();
                reader.onload = function (event) {
                    var image = new Image();
                    image.src = event.target.result;
                    image.style = 'width:100%;';
                    this.$refs.holder.innerHTML = '';
                    this.$refs.holder.appendChild(image);
                }.bind(this);
                reader.readAsDataURL(files);
            } else {
                this.showDialog("", "info", false, '仅支持jpg,png,gif格式的图片')
            }
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
        fileUpload: function () {
            var state = this.eventList.every(function (item) {
                return item.val !== ''
            })
            if (!state) {
                this.showDialog('', 'info', false, '查询参数都必填')
                return;
            }
            if (this.file != '') {
                var formData = new FormData();
                formData.append("file", this.file);
                this.eventList.forEach(function (item) {
                    formData.append(item.key, item.val);
                })
                this.loadingShow = true;

                $.ajax({
                    url: "/customerService/accountQuery/faceInspect/upload.ajax",
                    type: "POST",
                    data: formData,
                    processData: false, // 不处理数据
                    contentType: false, // 不设置内容类型
                    success: function (result) {
                        // $("#uploadFileInput").on("change", function (event) {
                        //     this.showFileName(event)
                        // }.bind(this));
                        this.loadingShow = false;
                        if (result.error == 0) {
                            if (result.data.passed) {
                                this.showDialog('', 'info', false, '人脸验证成功')
                                this.resultVal = '人脸验证成功'
                            } else {
                                this.showDialog('', 'info', false, '人脸验证失败')
                                this.resultVal = '人脸验证失败'
                            }
                        } else {
                            this.resultVal = result.msg
                            this.showDialog('', 'info', true, result.msg)
                        }
                    }.bind(this)
                });
            } else {
                this.showDialog('', 'info', false, '请选择图片')
            }

        },
    }
});