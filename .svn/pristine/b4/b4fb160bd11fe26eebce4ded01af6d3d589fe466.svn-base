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
        this.baseUrl = '/messageCenter/socialMgmt/topic';
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
            topicName: '',
            //add
            operateData: {
                categoryId: '',
                cardIds: [],
                content: '',
                icon: '',
                name: '',
                shelves: 1,
                productIds: 1,
                attachmentsList: [],
                voteId:'',  //投票编号
            },
            voteIdList:[], //关联投票列表
            modifyStatus: false,
            //删除
            delId: '',
            //卡片列表
            cardList: []
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
        this.getTableData(0);
        this.getClassify();
        this.getCardList();
        this.getVote();   //获取关联投票列表
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
        attachmentsSplice: function (index) {
            var data = this.operateData.attachmentsList[index]
            if (typeof data.id === "undefined") {
                this.operateData.attachmentsList.splice(index, 1)
            } else {
                data.valid = 1;
            }
        },
        getImg: function (address) {
            if (!address) return '';
            var fileName = address;
            fileName = fileName.split(/[/\\]/).reverse()[0]
            return `${this.baseUrl}/img.ajax?fileName=` + fileName
        },
        addCardTo: function () {
            var data = this.cardList.filter(function (item) {
                return item.checked;
            }).filter(function (item) {
                return !this.operateData.cardIds.some(function (ele) {
                    return ele.id === item.id;
                });
            }, this)
            this.operateData.cardIds = this.operateData.cardIds.concat(data);
        },
        getCardList: function () {
            $.post({
                url: `${this.baseUrl}/cardList.ajax`,
                success: function (result) {
                    if (result.error === 0) {
                        this.cardList = result.data.map(function (item) {
                            item.checked = false;
                            return item;
                        });
                    } else {
                        this.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
            });
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
        getClassify: function () {
            $.post({
                url: `${this.baseUrl}/classify.ajax`,
                data: {
                    status: 1
                },
                success: function (result) {
                    if (result.error === 0) {
                        this.classifyList = result.data;
                    } else {
                        this.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
        // 获取关联投票
        getVote: function () {
            var params = {};
            params.surveyType ='1';   // 1-社区投票
            $.post({
                url: `${this.baseUrl}/voteList.ajax`,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.voteIdList=result.data;
                        console.log(this.voteIdList);
                        // this.showDialog("", "info", false, result.msg)
                    } else {
                        this.showDialog("", "info", true, result.msg)
                    }
                }.bind(this)
            });
        },

        getTableData: function (currentIndex) {
            var params = {
                pageNum: currentIndex + 1,
                pageSize: this.pageMaxNum,
                topicName: this.topicName,
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
                        console.log(this.tableData);
                    } else {
                        this.currentIndex = 0;
                        this.totalPage = 0;
                        this.tableData = [];
                        this.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
        add: function () {
            if (!this.verify()) return;
            var params = {
                name: this.operateData.name,
                categoryId: this.operateData.categoryId,
                content: this.operateData.content,
                productIds: this.operateData.productIds,
                shelves: this.operateData.shelves,
                attachmentsList: this.operateData.attachmentsList,
                icon: this.operateData.icon,
                voteId:this.operateData.voteId
            };
            params.cardIds = this.operateData.cardIds.map(function (item) {
                return item.id;
            })
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
                    shelves: item.shelves ? 0 : 1
                },
                success: function (result) {
                    if (result.error === 0) {
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
            if (operateData.name.length === 0) {
                this.showDialog('add', 'info', true, '话题名称不能为空')
                return false;
            }
            if (operateData.name.length > 30) {
                this.showDialog('add', 'info', true, '话题名称在30字以内')
                return false;
            }
            return true;
        },
        goTo: function (item) {
            window.location.href = '/messageCenter/socialMgmt/topic.html?pageType=Detail&topicId=' + item.id + '&topicName=' + encodeURIComponent(item.name)
        },
        showDetail: function (item) {
            this.modifyStatus = true;
            $.post({
                url: `${this.baseUrl}/querySingle.ajax`,
                data: {
                    topicId: item.id
                },
                success: function (result) {
                    if (result.error === 0) {
                        result.data.cardIds = result.data.cardList;
                        // this.operateData = result.data;
                        this.operateData.id = result.data.id;
                        this.operateData.categoryId = result.data.categoryId;
                        this.operateData.cardIds = result.data.cardList;
                        this.operateData.content = result.data.content;
                        this.operateData.icon = result.data.icon;
                        this.operateData.shelves = result.data.shelves;
                        this.operateData.productIds = result.data.productIds;
                        this.operateData.voteId=result.data.voteId;
                        this.operateData.attachmentsList = result.data.attachments.map(function (item) {
                            return {
                                id: item.id,
                                valid: item.valid,
                                status: item.status,
                                attachType: item.attachType,
                                cmsId: item.cmsId
                            }
                        });
                        this.operateData.name = this.HTMLDecode(result.data.name);
                        this.showDialog("", "add")
                    } else {
                        this.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
        modify: function () {
            if (!this.verify()) return;
            var params = {
                id: this.operateData.id,
                name: this.operateData.name,
                categoryId: this.operateData.categoryId,
                content: this.operateData.content,
                productIds: this.operateData.productIds,
                attachmentsList: this.operateData.attachmentsList,
                icon: this.operateData.icon,
                shelves: this.operateData.shelves,
                voteId:this.operateData.voteId
            };
            params.cardIds = this.operateData.cardIds.map(function (item) {
                return item.id;
            })
            $.post({
                url: `${this.baseUrl}/modify.ajax`,
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
        showAdd: function () {
            this.modifyStatus = false;
            this.operateData.name = '';
            this.operateData.categoryId = '';
            this.operateData.content = '';
            this.operateData.icon = '';
            this.operateData.productIds = '';
            this.operateData.shelves = 1;
            this.operateData.voteId='';
            this.showDialog('', 'add')
        },
        HTMLDecode: function (text) {
            var temp = document.createElement("div");
            temp.innerHTML = text;
            var output = temp.innerText || temp.textContent;
            temp = null;
            return output;
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