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
Vue.component('truePage', {
    template: '#truePage',
    props: {},
    data: function () {
        this.baseUrl = '/messageCenter/socialMgmt/account';
        return {
            diaMsg: '',
            tableData: [],
            //主表格分页数据
            currentIndex: 0,
            maxSpace: 5,
            totalPage: 0,
            pageMaxNum: 10,
            mailAddress:'',
            innerAccount:'',
             //分类
             classifyList2: [],
             // 查询 
             operateData2: {
                 mailAddress: '',
                 innerAccount:''
             },         
             accountList: [], //账号列表
             modifyStatus: false,
             delId:''
        }
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
        }
    },
    watch: {
        pageMaxNum: function () {
            this.getTableData(0);
        }
    },
    mounted: function () {
        this.getTableData(0);
        this.getAccountList(); //账号列表

    },
    methods: {
        getAccountList: function () {
            var params = {
                pageNum: 1,
                pageSize: 99999,
                valid: 0,
                status: 1,
            };
            $.post({
                url: `${this.baseUrl}/tableData.ajax`,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.accountList = result.data.rows;
                    } else {
                        this.$parent.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
        getTableData: function (currentIndex) {
            var params = {
                pageNum: currentIndex + 1,
                pageSize: this.pageMaxNum,
                mail: this.mailAddress,
                authorId:this.innerAccount,
                valid: 0
                // categoryId: this.categoryId,
            };
            $.post({
                url: `${this.baseUrl}/mailData.ajax`,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.currentIndex = currentIndex;
                        this.totalPage = Math.ceil(result.data.total / params.pageSize);
                        this.tableData = result.data.rows;
                    } else {
                        this.currentIndex = 0;
                        this.totalPage = 0;
                        this.tableData = [];
                        this.$parent.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
        add2: function () {
            if (!this.verify2()) return;
            var params = {                
                mail: this.operateData2.mailAddress,
                authorId:this.operateData2.innerAccount
            };
            $.post({
                url: `${this.baseUrl}/addMail.ajax`,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.getTableData(0)
                        this.$parent.showDialog("add2", "info", false, result.msg)
                    } else {
                        this.$parent.showDialog("add2", "info", true, result.msg)
                    }
                }.bind(this)
            });
        },
        updateStatus2: function (item) {
            $.post({
                url: `${this.baseUrl}/modifyMail.ajax`,
                data: {
                    id: item.id,
                    status: item.status ? 0 : 1
                },
                success: function (result) {
                    if (result.error === 0) {
                        this.getTableData(0)
                        this.$parent.showDialog("", "info", false, '修改状态成功')
                    } else {
                        this.$parent.showDialog("", "info", true, result.msg)
                    }
                }.bind(this)
            });
        },
        verify2: function () {;
            if (this.operateData2.mailAddress.length === 0) {
                this.$parent.showDialog('add2', 'info', true, '邮箱地址不能为空')
                return false;
            }
            var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            if(!myreg.test(this.operateData2.mailAddress))
            {
                this.$parent.showDialog('add2', 'info', true, '请输入有效的邮箱地址');
                return false;
             }
            return true;
        },
        showDetail2: function (item) {
            this.modifyStatus = true;
            $.post({
                url: `${this.baseUrl}/querySingle2.ajax`,
                data: {
                    id: item.id
                },
                success: function (result) {
                    if (result.error === 0) {
                        this.operateData2.mailAddress = result.data.mail;
                        this.operateData2.innerAccount = result.data.authorId;
                        this.operateData2.id = result.data.id;
                        this.$parent.showDialog("", "add2")
                    } else {
                        this.$parent.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
        modify2: function () {
             if (!this.verify2()) return;
            $.post({
                url: `${this.baseUrl}/modifyMail.ajax`,
                data: {
                    mail: this.operateData2.mailAddress,
                    authorId:this.operateData2.innerAccount,
                    id:this.operateData2.id
                },
                success: function (result) {
                    if (result.error === 0) {
                        this.getTableData(0)
                        this.$parent.showDialog("add2", "info", false, result.msg)
                    } else {
                        this.$parent.showDialog("add2", "info", true, result.msg)
                    }
                }.bind(this)
            });
        },
        showAdd2: function () {
            this.modifyStatus = false;
            this.operateData2.mailAddress='';
            this.operateData2.innerAccount='';
            this.$parent.showDialog('', 'add2')
        },
        del2: function () {
            $.post({
                url: `${this.baseUrl}/delMail.ajax`,
                data: {
                    id: this.delId
                },
                success: function (result) {
                    if (result.error === 0) {
                        this.getTableData(0)
                        this.$parent.showDialog("del2", "info", false, result.msg)
                    } else {
                        this.$parent.showDialog("del2", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },        
        deleteDialog2: function (item) {
            this.delId = item.id;
            this.diaMsg='确定删除吗？'
            this.$parent.showDialog("", "del2", false, this.diaMsg);
        },
           
        //主表格分页方法
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
        }
    }
})

new Vue({
    el: '#content',
    data: function () {
        this.baseUrl = '/messageCenter/socialMgmt/account';
        return {
            // 主页面相关数据
            tableData: [],
            diaMsg: '',
            //主表格分页数据
            currentIndex: 0,
            maxSpace: 5,
            totalPage: 0,
            pageMaxNum: 10,
            //分类
            classifyList: [],
            // 查询
            nickname: '',
            //add
            operateData: {
                avatarImage: '',
                status:1,
                title: '',
                nickname: '',
                authorDesc:'',
                weight:'',
                isShare:'1'
            },
            modifyStatus: false,
            //删除
            delId: ''
        }
    },
    mounted: function () {
        var dialogs = ['info', 'add', 'del','add2','del2'];
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
        }
    },
    watch: {
        pageMaxNum: function () {
            this.getTableData(0);
        }
    },
    methods: {
        goTo: function (item) {
            window.location.href = '/messageCenter/socialMgmt/article.html?userId=' + item.id
        },
        classifyText: function (id) {
            var flag = this.classifyList.filter(function (item) {
                return item.id == id
            })[0];
            if (flag) {
                return flag.name
            } else {
                return id;
            }
        },
        getTableData: function (currentIndex) {
            var params = {
                pageNum: currentIndex + 1,
                pageSize: this.pageMaxNum,
                nickname: this.nickname,
                valid: 0
                // categoryId: this.categoryId,
            };
            $.post({
                url: `${this.baseUrl}/tableData.ajax`,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.currentIndex = currentIndex;
                        this.totalPage = Math.ceil(result.data.total / params.pageSize);
                        this.tableData = result.data.rows;
                    } else {
                        this.currentIndex = 0;
                        this.totalPage = 0;
                        this.tableData = [];
                        this.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
         // 9568
        add: function () {
            if (!this.verify()) return;
            var params = {
                avatarImage: this.operateData.avatarImage,
                title: this.operateData.title,
                nickname: this.operateData.nickname,
                authorDesc:this.operateData.authorDesc,
                weight:this.operateData.weight,
                status: 1,
                isShare:this.operateData.isShare
            };
            $.post({
                url: `${this.baseUrl}/add.ajax`,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.getTableData(0)
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
                        this.operateData.status=item.status ? 0 : 1
                        this.getTableData(0)
                        this.showDialog("", "info", false, '修改状态成功')
                    } else {
                        this.showDialog("", "info", true, result.msg)
                    }
                }.bind(this)
            });
        },
        verify: function () {
            var operateData = this.operateData;
            if (operateData.nickname.length === 0) {
                this.showDialog('add', 'info', true, '账号名称不能为空')
                return false;
            }
            if (operateData.nickname.length > 30) {
                this.showDialog('add', 'info', true, '账号名称在30字以内')
                return false;
            }
            return true;
        },
        showDetail: function (item) {
            this.modifyStatus = true;
            $.post({
                url: `${this.baseUrl}/querySingle.ajax`,
                data: {
                    authorId: item.id
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
        // 9568
        modify: function () {
            if (!this.verify()) return;
            $.post({
                url: `${this.baseUrl}/modify.ajax`,
                data: {
                    id: this.operateData.id,
                    nickname: this.operateData.nickname,
                    title: this.operateData.title,
                    avatarImage: this.operateData.avatarImage,
                    authorDesc:this.operateData.authorDesc,
                    weight:this.operateData.weight,
                    status:this.operateData.status,
                    isShare:this.operateData.isShare
                },
                success: function (result) {
                    if (result.error === 0) {
                        this.getTableData(0)
                        this.showDialog("add", "info", false, result.msg)
                    } else {
                        this.showDialog("add", "info", true, result.msg)
                    }
                }.bind(this)
            });
        },
        showAdd: function () {
            this.modifyStatus = false;
            this.operateData.avatarImage = '';
            this.operateData.title = '';
            this.operateData.nickname = '';
            this.operateData.authorDesc = '';
            this.operateData.weight = '';
            this.showDialog('', 'add')
        },
        del: function () {
            $.post({
                url: `${this.baseUrl}/del.ajax`,
                data: {
                    id: this.delId
                },
                success: function (result) {
                    if (result.error === 0) {
                        this.getTableData(0)
                        this.showDialog("del", "info", false, result.msg)
                    } else {
                        this.showDialog("del", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
        deleteDialog: function (item) {
            this.delId = item.id;
            this.showDialog("", "del", false, '确定删除吗？');
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
        },
        //主表格分页方法
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
            if (index - 1 === this.currentIndex) return;
            this.getTableData(index - 1);
        },
        toFirst: function () {
            this.getTableData(0);
        },
        toLast: function () {
            this.getTableData(this.totalPage - 1);
        }
    }
});