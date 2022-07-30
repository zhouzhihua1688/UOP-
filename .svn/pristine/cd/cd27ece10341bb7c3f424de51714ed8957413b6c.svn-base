var vm = new Vue({
    el: '#content',
    data: function () {
        this.baseUrl = '/messageCenter/auditMgmt/communityDynamic';
        this.editor = null //富文本
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
            title: '',
            content: '',
            userId: '',
            //add
            operateData: {
                content: '',
                authorId: '',
                title: '',
                topicId: '',
                postType: 1, //发帖类型
                status: 1,
                imagesList: [],
                productsList: [],
            },
            accountList: [], //作者列表
            topicLIst: [], //话题列表

            waitCheckData: { //待审核数据
                checkResult: '',
                postId: '',
                status: 1
            },
            //置顶相关数据
            articleLevel:'',//置顶状态
            updateLevelData:{},//筛选
            page1: {
                currentIndex: 0,
                maxSpace: 5,
                totalPage: 0,
                pageMaxNum: 10,
                method: function (currentIndex) {
                    this.getTableData(currentIndex)
                }.bind(this)
            },
            page3: {
                currentIndex: 0,
                maxSpace: 5,
                totalPage: 0,
                pageMaxNum: 10,
                method: function (currentIndex) {
                    this.getTableData3(currentIndex)
                }.bind(this)
            },

            // 图像预览
            previewPath: '',
        }
    },
    mounted: function () {
        var dialogs = ['info', 'del', 'updateLevelDialog'];
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
        $('.date-timepicker').datetimepicker({
            format: 'YYYY-MM-DD HH:mm:ss',//use this option to display seconds
            icons: {
                time: 'fa fa-clock-o',
                date: 'fa fa-calendar',
                up: 'fa fa-chevron-up',
                down: 'fa fa-chevron-down',
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-arrows ',
                clear: 'fa fa-trash',
                close: 'fa fa-times'
            }
        }).next().on(ace.click_event, function () {
            $(this).prev().focus();
        });

        //富文本
        var E = window.wangEditor
        var editor = new E('#wangEditor')
        editor.config.onchange = (newHtml) => {
            this.operateData.content = newHtml
        }
        // 或者 const editor = new E( document.getElementById('div1') )
        editor.config.height = 500
        editor.config.showFullScreen = false //关闭全屏功能
        // editor.config.uploadImgServer = `${this.baseUrl}/uploadImage.ajax` //图片上传地址
        editor.config.uploadImgMaxLength = 1 //最大同时上传图片数
        editor.config.uploadImgTimeout = 15000 //上传图片等待时间
        editor.config.customUploadImg = this.customUploadImg;
        editor.config.menus = []
        editor.create()
        this.editor = editor;

        this.getTableData(0) //作者列表
        this.getAccountList() //作者列表
        this.getTopicLIst() //话题列表


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
        updateLevel: function (item) {
            // 9666 UOP社区后台优化 #7 需求描述1.文章管理增加置顶
            console.log(item,'置顶弹窗')
            this.updateLevelData=item
            item.level == 0?(this.showDialog("", "updateLevelDialog", true)):(this.levelModify('cancel'))

        //   this.levelModify()
           
        },
        levelModify(cancel) {
            let item = this.updateLevelData
            if (cancel) {
                $.post({
                    url: `${this.baseUrl}/levelModify.ajax`,
                    data: {
                        postId: item.postId,
                        isTop: item.level == 1 ? 0 : 1,
                        // 9666
                    },
                    success: function (result) {
                        if (result.error === 0) {
                            //9534
                            this.getTableData(this.page1.currentIndex)
                            this.showDialog("", "info", false, '修改状态成功')
                        } else {
                            this.showDialog("", "info", false, result.msg)
                        }
                    }.bind(this)
                });
            } else {
                if ($("#startTime").val() == '') {
                    $("#startTime").val('1999-01-01 00:00:00')
                }
                if ($("#endTime").val() == '') {
                    $("#endTime").val('2099-01-01 00:00:00')
                }
                $.post({
                    url: `${this.baseUrl}/levelModify.ajax`,
                    data: {
                        postId: item.postId,
                        isTop: item.level == 1 ? 0 : 1,
                        // 9666
                        topStartTime: $("#startTime").val(),
                        topEndTime: $("#endTime").val()
                    },
                    success: function (result) {
                        if (result.error === 0) {
                            //9534
                            this.getTableData(this.page1.currentIndex)
                            this.showDialog("updateLevelDialog", "info", false, '修改状态成功')
                        } else {
                            this.showDialog("updateLevelDialog", "info", true, result.msg)
                        }
                    }.bind(this)
                });
            }


        },
        //置顶功能结束

        HTMLDecode: function (text) {
            var temp = document.createElement("div");
            temp.innerHTML = text;
            var output = temp.innerText || temp.textContent;
            temp = null;
            return output;
        },
      


        waitCheck: function (item) {
            this.waitCheckData.postId = item.postId
            this.showDialog('', 'waitCheck')
        },
        statusText: function (status) {
            // "0": "待审核",
            // "1": "审核通过",
            // "2": "自动审核中",
            // "3": "自动审核不通过",
            // "4": "待人工审核",
            // "5": "人工审核不通过",
            return {
                "0": "隐藏",
                "1": "展示",
                "2": "隐藏",
                "3": "隐藏",
                "4": "隐藏",
                "5": "隐藏",
            } [status];

        },
        customUploadImg: function (resultFiles, insertImgFn) {
            var file = resultFiles[0];
            var formdata = new FormData();
            formdata.append("file", file);
            $.post({
                url: `${this.baseUrl}/uploadImage.ajax`,
                cache: false,
                data: formdata,
                contentType: false, // 不设置内容类型
                processData: false, // 不处理数据
                success: function (result) {
                    if (result.error === 0) {
                        insertImgFn(result.data)
                    } else {
                        this.showDialog('add', 'info', true, result.msg);
                    }
                }.bind(this)
            })
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
        getTopicLIst: function () {
            var params = {
                pageNum: 1,
                pageSize: 99999,
            };
            $.post({
                url: `${this.baseUrl}/topicLIst.ajax`,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.topicLIst = result.data.rows.map(function (item) {
                            return {
                                name: item.name,
                                id: item.id,
                            }
                        });
                    } else {
                        this.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
        getAccountList: function () {
            var params = {
                pageNum: 1,
                pageSize: 99999,
            };
            $.post({
                url: `${this.baseUrl}/accountList.ajax`,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.accountList = result.data.rows;
                    } else {
                        this.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
        getTableData: function (currentIndex) {
            var params = {
                pageNum: currentIndex + 1,
                pageSize: this.pageMaxNum,
                // valid: 0
            };
            this.title && (params.title = this.title)
            this.content && (params.content = this.content)
            this.articleLevel && (params.isTop = this.articleLevel)
            this.userId && (params.userId = this.userId)
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
        updateStatus: function (item) {
            $.post({
                url: `${this.baseUrl}/approve.ajax`,
                data: {
                    postId: item.postId,
                    status: item.status == 1 ? 5 : 1
                },
                success: function (result) {
                    if (result.error === 0) {
                        this.getTableData(0)
                        this.showDialog("", "info", false, result.msg)
                    } else {
                        this.showDialog("", "info", true, result.msg)
                    }
                }.bind(this)
            });
        },
        HTMLDecode: function (text) {
            var temp = document.createElement("div");
            temp.innerHTML = text;
            var output = temp.innerText || temp.textContent;
            temp = null;
            return output;
        },
        showDetail: function (item) {
            $.post({
                url: `${this.baseUrl}/querySingle.ajax`,
                data: {
                    postId: item.postId
                },
                success: function (result) {
                    if (result.error === 0) {
                        this.operateData.title = result.data.title;
                        this.operateData.topicId = result.data.topicId;
                        this.operateData.status = result.data.status;
                        this.operateData.postId = result.data.postId;
                        this.operateData.content = result.data.content;
                        this.operateData.imagesList = result.data.imagesList;
                        // this.operateData.authorId = result.data.userInfo.userId;
                        if (result.data.userInfo) {
                            this.operateData.avatarImage = result.data.userInfo.avatarImage;
                            this.operateData.nickname = result.data.userInfo.nickname;
                        } else {
                            this.operateData.avatarImage = result.data.avatarImage;
                            this.operateData.nickname = result.data.nickname;
                        }
                        this.operateData.productsList = result.data.productsList;
                        console.log(result.data.content)
                        this.editor.txt.html(result.data.content)
                        this.editor.disable();
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
                    id: this.operateData.postId,
                    content: this.operateData.content,
                    authorId: this.operateData.authorId,
                    title: this.operateData.title,
                    topicId: this.operateData.topicId,
                    postType: this.operateData.postType
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
        showDialog: function (dia1, dia2, callback, msg) {
            // 关掉dia1，打开dia2
            // callback==false:在dia2关掉的时候，直接关掉
            // callback==true:在dia2关掉的时候，重新打开dia1
            this.diaMsg = (msg ? msg : '输入条件错误');
            if (!dia1) {
                $('#' + dia2).modal('show');
            } else if (!dia2) {
                $('#' + dia1).modal('hide');
            } else if (!callback) {
                $('#' + dia1).modal('hide');
                $('#' + dia2).off("hidden.bs.modal").modal('show');
            } else {
                if ($('#' + dia1).data('parentDlg')) {
                    // dia1弹窗有父级弹窗，先去除关闭事件，关闭弹窗后，再恢复添加事件
                    $('#' + dia1).off("hidden.bs.modal").modal('hide');
                    $('#' + dia1).on("hidden.bs.modal", function () {
                        $('#' + $('#' + dia1).data('parentDlg')).modal("show");
                    });
                } else {
                    // dia1弹窗没有父级弹窗，直接关闭
                    $('#' + dia1).modal('hide');
                }
                $('#' + dia2).off("hidden.bs.modal").on("hidden.bs.modal", function () {
                    // dia2作为子弹窗，添加关闭事件，关闭弹窗时打开父级弹窗
                    $('#' + dia1).modal("show");
                    $('#' + dia2).data('parentDlg', dia1);
                });
                $('#' + dia2).modal('show');
            }
        },
        //图像预览
        previewImg: function (val) {
            this.previewPath = '';
            this.$nextTick(() => {
                this.previewPath = val;
                this.showDialog('add', 'preview', true, '');
            })
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