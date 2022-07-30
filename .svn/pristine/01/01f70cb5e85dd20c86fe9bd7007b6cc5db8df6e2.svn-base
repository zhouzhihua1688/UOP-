var vm = new Vue({
    el: '#content',
    data: function () {
        this.baseUrl = '/messageCenter/auditMgmt/comment';
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
            userId: '',
            content: '',
            //add
            operateData: {
                content: '',
                authorId: '',
                title: '',
                topicId: '',
                postType: 1, //发帖类型
                imagesList: [],

                // 20210909，dialog查看动态/文章(itemType:2)，也可以查看留言(itemType:4)
                // postType: 1，文章，展示作者
                // postType: 2，动态，展示发贴用户
                itemType: 2, //默认是 动态/文章
                avatarImage: '',
                nickname: '',
                productsList: [],
                dialogLabel: '',
            },
            accountList: [], //作者列表
            topicLIst: [], //话题列表
            remarksAuthor:'',
            remarksRow:{},
            rewardText:'',

            // 9534
            commentCheckDtoList:[]

        }
    
    },
    mounted: function () {
        var dialogs = ['info', 'del'];
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
        },
        // 9534
        allCheck: function () {
            if (this.tableData.length == 0) {
                return false;
            }
            var flag = true;
            this.tableData.forEach(function (item) {
                if (!item.check) {
                    flag = false;
                }
            });
            return flag;
        },
    },
    watch: {
        pageMaxNum: function () {
            this.getTableData(0);
        }
    },
    methods: {
        // 9534
        selectAll: function () {
            var _this = this;
            console.log('全选')
            _this.commentCheckDtoList=[]
            if (this.allCheck) {
                this.tableData.forEach(function (item,index) {
                    item.check = false;
                    // var _index = _this.inSelected(item, _this.tableData, 'status');
                    // if(_index > -1){
                    //     _this.tableData.splice(_index, 1);
                    // }
                    console.log('true')
                    _this.commentCheckDtoList.push({
                        commentId: item.id,
                        // status: item.status==1 ? 5 : 1
                        status: item.status
                    })
                    Vue.set(_this.tableData, index, item); // 更新页面数据

                });
            }
            else {
                this.tableData.forEach(function (item,index) {
                    item.check = true;
                    // var _index = _this.inSelected(item, _this.tableData, 'status');
                    // if(_index == -1){
                    //     _this.tableData.push(item);
                    // }
                    
                    _this.commentCheckDtoList.push({
                        commentId: item.id,
                        // status: item.status==1 ? 5 : 1
                        status: item.status
                    })
                    Vue.set(_this.tableData, index, item); // 更新页面数据
                });
            }
        },
        select(index){
            this.commentCheckDtoList=[]
            this.tableData.forEach((item, _index) => {
                index==_index ? item.check = !item.check :''
                console.log(item.status,item.check)
                item.check?( this.commentCheckDtoList.push({
                    commentId: item.id,
                    status: item.status
                })):''
               
            })
        },
        // 批量操作 
        batchUpStatus(status){
            // 5隐藏 1展示
            this.commentCheckDtoList.forEach((item, index) => {
                item.status=status
            })
            console.log(this.commentCheckDtoList)
            $.post({
                url: `${this.baseUrl}/handleCheckBatch.ajax`,
                data:{commentCheckDtoList:this.commentCheckDtoList} ,
                success: function (result) {
                    if (result.error === 0) {
                        // 9534不要返回第一页
                        this.getTableData(this.currentIndex )
                        this.showDialog("", "info", false,  result.msg)
                    } else {
                        this.showDialog("", "info", true, result.msg)
                    }
                }.bind(this)
            });
        },
        inSelected: function (item, arr, prop) {
            var _index = -1;
            arr.forEach(function (value, index) {
                if (item[prop] == value[prop]) {
                    _index = index;
                }
            });
            return _index;
        } ,
        commentReply: function (item) {
            var _this = this;
            this.showDialog("", "commentReply", true);
            this.remarksRow = item
            console.log('this.remarksRow',this.remarksRow)
        },
        remarks(remarks){
            console.log(remarks);
        },
        // 回复评论  
        remarksAnswer: function () {
            let commentParams = {
                content: this.rewardText,
                // id: this.remarksRow.id,
                // itemId: this.remarksRow.itemId,
                id:this.remarksRow.itemId,
                itemId: this.remarksRow.id,
                itemType: 4,
                // userId: this.remarksRow.userInfo.userId
                userId: this.remarksAuthor
            }
            $.post({
                url: `${this.baseUrl}/remarksAnswer.ajax`,
                data: commentParams,
                success: function (result) {
                    if (result.error === 0) {
                        // this.showDialog("commentReply", "info", false, result.msg)
                        this.showDialog("commentReply", "info", false, result.msg)      // 20211030修改，待验证
                        this.getTableData(this.currentIndex)
                    } else {
                        $('#commentReply').off().on("hidden", "hidden.bs.modal");
                        this.showDialog("commentReply", "info", true, result.msg);
                    }
                }.bind(this)
            });
        },
        getImg: function (address) {
            return `${this.baseUrl}/img.ajax?fileName=` + address
        },
        statusText:function(status) {
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
            };
            this.userId&&(params.userId=this.userId)
            this.content&&(params.content=this.content)
            $.post({
                url: `${this.baseUrl}/tableData.ajax`,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.currentIndex = currentIndex;
                        this.totalPage = Math.ceil(result.data.total / params.pageSize);
                        this.tableData = result.data.rows;
                        this.tableData.forEach((item, index) => {
                            item.check=false;
                        })
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
                url: `${this.baseUrl}/handleCheck.ajax`,
                data: {
                    commentId: item.id,
                    status: item.status==1 ? 5 : 1
                },
                success: function (result) {
                    if (result.error === 0) {
                        // 9534不要返回第一页
                        this.getTableData(this.currentIndex )
                        this.showDialog("", "info", false,  result.msg)
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
            this.operateData.itemType = item.itemType;
            this.operateData.dialogLabel = '';
            let url = `${this.baseUrl}/querySingle.ajax`;
            let data = {postId: item.itemId};
            if(item.itemType == 4){
                this.operateData.dialogLabel = '留言';
                url = `${this.baseUrl}/querySingleComment.ajax`;
                data = {commentId: item.itemId};
            }

            $.post({
                url,
                data,
                success: function (result) {
                    if (result.error === 0) {
                        this.operateData.title = result.data.title;
                        this.operateData.topicId = result.data.topicId;
                        this.operateData.postId = result.data.postId;
                        this.operateData.content = result.data.content;
                        // this.operateData.authorId = result.data.userInfo.userId;
                        // this.operateData.authorId = result.data.authorId;
                        if(result.data.userInfo){
                            this.operateData.avatarImage = result.data.userInfo.avatarImage;
                            this.operateData.nickname = result.data.userInfo.nickname;
                        } else {
                            this.operateData.avatarImage = result.data.avatarImage;
                            this.operateData.nickname = result.data.nickname;
                        }
                        this.operateData.postType = result.data.postType;
                        if(result.data.postType == 1){
                            this.operateData.dialogLabel = '文章';
                        }else if(result.data.postType == 2){
                            this.operateData.dialogLabel = '动态';
                        }
                        this.operateData.productsList = result.data.productsList;
                        this.operateData.imagesList = result.data.imagesList;
                        // console.log(result.data.imagesList.length)
                        this.editor.txt.html(result.data.content)
                        this.editor.disable();
                        this.showDialog("", "add")
                    } else {
                        this.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
            });
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
    },
    filters: {
        translateItemType: function (value) {
            // itemType: {topic: {type: '1', name: '话题'}, post: {type: '2', name: '动态'}, fund: {type: '3', name: '基金'}, 
            // comment: {type: '4', name: '留言'}, reply: {type: '5', name: '回复'}, 
            // user: {type: '6', name: '用户'}, activity: {type: '8', name: '活动'} },
            let itemTypeObj = {
                '1': '话题',
                '2': '动态 / 文章',
                '3': '基金',
                '4': '留言',
                '5': '回复',
                '6': '用户',
                '8': '活动',
            };
            return (itemTypeObj[value]?itemTypeObj[value]:value);
        },
    },
});