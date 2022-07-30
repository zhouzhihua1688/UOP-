Vue.component('upload', {
    template: `<div style='display:flex'>
                <input type="text" disabled :value='fileName'>
                <input type="file" style='display:none;' ref='handleSelect' @change='readFile'>
                 <button class="btn btn-info btn-sm" style='margin-left:15px' type="button"  @click='handleSel'>
                     选择
                 </button>
                 <button type="button" style='margin-left:15px' class="btn btn-info btn-sm"
                     @click='upload'>
                     上传
                 </button>
                 <button type="button"  style='margin-left:15px'class="btn btn-danger btn-sm"
                     @click='delFile'>
                     删除
                 </button>
            </div>`,
    props: ['value'],
    data: function () {
        this.fileType = ["png", "pnge", "jpge", "jpg", "gif"]; //小写
        this.dialogName = 'add';
        return {
            showName: ''
        }
    },
    mode: {
        prop: "value", //v-model值
        event: "input" //事件触发v-model
    },
    computed: {
        fileName: {
            get: function () {
                return this.showName;
            },
            set: function (value) {
                this.$emit('input', value)
            }
        }
    },
    watch: {
        value: function (newval) {
            this.showName = newval;
        }
    },
    methods: {
        handleSel: function () {
            this.$refs.handleSelect.value = '';
            this.$refs.handleSelect.click()
        },
        readFile(el) {
            var file = el.target.files[0]
            if (!file) {
                return this.showName = '';
            };
            var fileName = this.showName = file.name;
            var point = fileName.lastIndexOf('.');
            var suffix = fileName.substr(point + 1).toLocaleLowerCase() //获取文件后缀名
            if (!this.fileType.includes(suffix)) {
                this.showName = '';
                this.$parent.showDialog(this.dialogName, 'info', true, `只能上传${this.fileType.join('、')}格式的文件`);
                return;
            }
        },
        upload: function () {
            var file = this.$refs.handleSelect.files[0];
            if (file === undefined) {
                this.$parent.showDialog(this.dialogName, 'info', true, `请选择文件`);
                return;
            }
            // this.loading = true;
            var formdata = new FormData();
            formdata.append("file", file);
            $.post({
                url: `${this.$parent.baseUrl}/uploadImage.ajax`,
                cache: false,
                data: formdata,
                contentType: false, // 不设置内容类型
                processData: false, // 不处理数据
                success: function (result) {
                    if (result.error === 0) {
                        this.fileName = result.data;
                        this.$refs.handleSelect.value = '';
                        this.$parent.showDialog(this.dialogName, 'info', true, result.msg);
                    } else {
                        this.$parent.showDialog(this.dialogName, 'info', true, result.msg);
                    }
                }.bind(this)
            })
        },
        delFile: function () {
            if (!this.value) {
                this.$parent.showDialog(this.dialogName, 'info', true, '没有可删除的文件');
                return;
            }
            var fileName = this.value;
            fileName = fileName.split(/[/\\]/).reverse()[0]
            $.post({
                url: `${this.$parent.baseUrl}/delFile.ajax`,
                data: {
                    file: fileName
                },
                success: function (result) {
                    if (result.error === 0) {
                        this.fileName = this.$refs.handleSelect.value = '';
                        this.$parent.showDialog(this.dialogName, 'info', true, result.msg);
                    } else {
                        this.$parent.showDialog(this.dialogName, 'info', true, result.msg);
                    }
                }.bind(this)
            })
        }
    }
})
new Vue({
    el: '#content',
    data: function () {
        this.baseUrl = '/messageCenter/socialMgmt/topicClassify';
        return {
            // 主页面相关数据
            tableData: [],
            diaMsg: '',
            // 查询
            categoryName: '',
            status:'',
            //新增修改
            modifyStatus: false,
            operateData: {
                name: '',
                status: '1',
                icon: '',
            },
            delId: ''
        }
    },
    mounted: function () {
        var dialogs = ['info', 'add', 'del'];
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
        this.getTableData();
    },
    methods: {
        getTableData: function () {
            var params = {
                categoryName: this.categoryName,
                status:this.status
            };
            $.post({
                url: `${this.baseUrl}/tableData.ajax`,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.tableData = result.data;
                    } else {
                        this.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
        relatedTopic:function(item){
            window.location.href = '/messageCenter/socialMgmt/topicClassify.html?pageType=Detail&categoryId=' + item.id + '&categoryName=' + encodeURIComponent(item.name)
        },
        verify: function () {
            var operateData = this.operateData;
            if (operateData.icon === '') {
                return this.showDialog('add', 'info', true, '请上传图片')
            }
            if (operateData.name === '') {
                return this.showDialog('add', 'info', true, '请输入分类名称')
            }
            return true;
        },
        add: function () {
            if (!this.verify()) return;
            var params = {
                name: this.operateData.name,
                status: this.operateData.status,
                icon: this.operateData.icon,
            };

            $.post({
                url: `${this.baseUrl}/add.ajax`,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.getTableData()
                        this.showDialog("add", "info", false, result.msg)
                    } else {
                        this.showDialog("add", "info", true, result.msg)
                    }
                }.bind(this)
            });
        },
        showAdd: function () {
            this.modifyStatus = false;
            this.operateData.name = '';
            this.operateData.status = 1;
            this.operateData.icon = '';
            this.showDialog('', 'add')
        },
        showDetail: function (item) {
            this.modifyStatus = true;
            $.post({
                url: `${this.baseUrl}/querySingle.ajax`,
                data: {
                    categoryId: item.id
                },
                success: function (result) {
                    if (result.error === 0) {
                        this.operateData = result.data;
                        this.showDialog("", "add")
                    } else {
                        this.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
        modify: function () {
            if (!this.verify()) return;
            $.post({
                url: `${this.baseUrl}/modify.ajax`,
                data: {
                    id: this.operateData.id,
                    status: this.operateData.status,
                    icon: this.operateData.icon,
                    name: this.operateData.name,
                },
                success: function (result) {
                    if (result.error === 0) {
                        this.getTableData()
                        this.showDialog("add", "info", false, result.msg)
                    } else {
                        this.showDialog("add", "info", true, result.msg)
                    }
                }.bind(this)
            });
        },
        updateStatus: function (item) {
            $.post({
                url: `${this.baseUrl}/modify.ajax`,
                data: {
                    id: item.id,
                    status: item.status ? 0 : 1
                },
                success: function (result) {
                    if (result.error === 0) {
                        this.getTableData()
                        this.showDialog("", "info", false, '修改状态成功')
                    } else {
                        this.showDialog("", "info", true, result.msg)
                    }
                }.bind(this)
            });
        },
        del: function () {
            $.post({
                url: `${this.baseUrl}/del.ajax`,
                data: {
                    categoryId: this.delId
                },
                success: function (result) {
                    if (result.error === 0) {
                        this.getTableData()
                        this.showDialog("del", "info", false, result.msg)
                    } else {
                        this.showDialog("del", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
        deleteDialog: function (item) {
            this.delId = item.id
            this.showDialog("", "del", false, '确定删除吗？');
        },
        getImg: function (address) {
            if (!address) return '';
            var fileName = address;
            fileName = fileName.split(/[/\\]/).reverse()[0]
            return `${this.baseUrl}/img.ajax?fileName=` + fileName
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