var vm = new Vue({
    el: '#content',
    data: function () {
        this.baseUrl = '/messageCenter/socialMgmt/article';
        this.editor = null //富文本
        return {
            endTime: '946656000',
            startTime: '2099.12.31',
            productId:'',
            updateLevelData:{},
            delUrlList:[],
            tableData: [], //文章列表
            tableData2: [], //邮件列表
            tableData3: [], //评论列表
            articleTitle: '', //标题
            articleLevel: '', //文章置顶状态
            viewReplyTableData: [], //评论回复列表
            rewardText: "",
            remarksRow: {},
            remarksAuthor: '',
            showCheckCommentRow: {},
            // 评论筛选
            remrarksListParams: {},
            viewReplyParams: {},
            userId: '',
            level: '',
            sender: '', //邮件导入页面的邮件地址
            authorName: '', //列表页面的关联账号名
            //删除
            delId: '',
            diaMsg: '',
            //分类
            classifyList: [],
            // 查询
            authorId: '', //主页面列表的账号作者
            postType: 1, //发帖类型
            //add
            operateData: {
                postId: '',
                mailId: '',
                content: '',
                authorId: '', //详情页内的作者            
                title: '',
                summary: '',
                shareSummary:'',
                topics: [],
                productIds: '',
                postType: 1, //发帖类型                
                status: 1,
                attachLinkList: [], //要展示的附件列表
                mediaList: [], //音视频列表
                voteId: '', //投票编号
                imagesList: [], //图片列表
                contentImages: [], //文章正文中的图片
                urlLinkList: [{
                    urlLinkName: '', //
                    urlLinkAddress: '', //
                    attachType: '5', //
                    status:'1'
                }], //超链接列表
                isShare:1,
                displayInProduct:'0', //20220606展示在全部讨论区
                initThumbCount:0//初始化点赞数默认0
            },
            voteIdList: [], //关联投票列表
            // related
            relatedData: {
                relatedStatus: false,
                sender: '',
                authorId: '',
            },
            accountList: [], //作者列表
            topicLIst: [], //话题列表
            modifyStatus: 0, //用来判断是需要新增还是修改
            pageStatus: 0, //本来需要只在邮件导入页面展示附件链接的，现已经不需要
            publishStatus: "", //判断是否已发布

            //主表格分页数据
            page1: {
                currentIndex: 0,
                maxSpace: 5,
                totalPage: 0,
                pageMaxNum: 10,
                method: function (currentIndex) {
                    this.getTableData(currentIndex)
                }.bind(this)
            },
            page2: {
                currentIndex: 0,
                maxSpace: 5,
                totalPage: 0,
                pageMaxNum: 10,
                method: function (currentIndex) {
                    this.getTableData2(currentIndex)
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

            commentTitle: '',
            imagesUrl: [],
            limitNum: 9, //限制数量
            filePath: '',
            picturePath: '',
            isArticle: true, //判断模态框是文章还是邮件
            // flag 禁止频繁点击进行修改
            clickFlag: true,
            isModify: false ,//判断是新增还是修改

            commentCheckDtoList:[]
        }
    },
    mounted: function () {
        var dialogs = ['info', 'del', "selectAuthor", 'updateLevelDialog'];
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
		$('#topics').css({
			'width': '320px'
		}).select2({
				closeOnSelect: false
		})
		$("#topics").on("select2:close", function (e) {
			// e 的话就是一个对象 然后需要什么就 “e.参数” 形式 进行获取
			this.operateData.topics = $("#topics").val() ? $("#topics").val() : []
		}.bind(this));
        //富文本
        var E = window.wangEditor
        var editor = new E('#wangEditor')
        editor.config.onchange = (newHtml) => {
            this.operateData.content = newHtml.replace(/target="_blank"/g, "");
        }
        // 或者 const editor = new E( document.getElementById('div1') )
        editor.config.height = 500
        editor.config.showFullScreen = false //关闭全屏功能
        // editor.config.uploadImgServer = `${this.baseUrl}/uploadImage.ajax` //图片上传地址
        editor.config.uploadImgMaxLength = 1 //最大同时上传图片数
        editor.config.uploadImgTimeout = 15000 //上传图片等待时间
        editor.config.customUploadImg = this.customUploadImg;
        editor.config.excludeMenus = [
            'video'
        ]
        editor.create()
        this.editor = editor;
        this.authorId = this.getUrlParam('userId');
        this.getAccountList(); //作者列表
        this.getTopicLIst(); //话题列表
        this.getTableData(0);
        this.getTableData2(0);
        this.getVote(); //获取关联投票列表


    },
    computed: {
        pageList: function () {
            return function () {
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
        //主表格分页方法
        prev: function () {
            return function () {

                if (this.currentIndex <= 0) {
                    return;
                }

                this.method(this.currentIndex - 1);
            }
        },
        next: function () {
            return function () {
                console.log(this)
                if (this.currentIndex >= this.totalPage - 1) {
                    return;
                }
                console.log(this.currentIndex)
                this.method(this.currentIndex + 1);
            }
        },
        changeIndex: function () {
            return function (index) {
                this.method(index - 1);
            }
        },
        toFirst: function () {
            return function () {
                this.method(0);
            }
        },
        toLast: function () {
            return function () {
                this.method(this.totalPage - 1);
            }
        },
        // 9534
        allCheck: function () {
            if (this.tableData3.length == 0) {
                return false;
            }
            var flag = true;
            this.tableData3.forEach(function (item) {
                if (!item.check) {
                    flag = false;
                }
            });
            return flag;
        },

    },
    watch: {
        page1: function () {
            this.getTableData(0);
        },
        page2: function () {
            this.getTableData2(0);
        },
        'operateData.authorId':{
            handler:function(newval,oldval){
                if(this.modifyStatus=='0'&&newval){
                    this.operateData.isShare = this.accountList.find(function(item){
                        return item.id == newval
                    }).isShare
                }else if(this.modifyStatus=='0'&&!newval){
                    this.operateData.isShare = 1
                }
            },
            deep:true
        },
				'operateData.initThumbCount':{
					handler:function(newval,oldval){
						if(parseInt(newval)!=parseFloat(newval)&&newval){
							this.operateData.initThumbCount = 0
						}else if(newval&&newval<0){
							this.operateData.initThumbCount = 0
						}else if(newval){
							this.operateData.initThumbCount = parseInt(newval)
						}
					}
				}
        // 9666
        // productId: function (){
        //     this.getTableData(0);
        // }

    },
    methods: {
        // 9534
        selectAll: function () {
            var _this = this;
            console.log('全选')
            _this.commentCheckDtoList=[]
            if (this.allCheck) {
                this.tableData3.forEach(function (item,index) {
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
                    Vue.set(_this.tableData3, index, item); // 更新页面数据

                });
            }
            else {
                this.tableData3.forEach(function (item,index) {
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
                    Vue.set(_this.tableData3, index, item); // 更新页面数据
                });
            }
        },
        select(index){
            this.commentCheckDtoList=[]
            this.tableData3.forEach((item, _index) => {
                index==_index ? item.check = !item.check :''
                item.check?(this.commentCheckDtoList.push({
                    commentId: item.id,
                    status: item.status
                })):''
                console.log(item.status,item.check)
            })
        },
          // 批量操作 
          batchUpStatus(status){
              var _this = this
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
                        _this.getTableData3(this.page3.currentIndex)
                        console.log(result.msg)
                        _this.showDialog("checkComment", "info", true,  result.msg)
                    } else {
                        _this.showDialog("checkComment", "info", true, result.msg)
                    }
                }.bind(this)
            });
        },

        // 增加超链接
        addURL() {
            this.operateData.urlLinkList.push({
                attachName: '', //
                attachType: '5', //
                url: '',
                status:'1'
            })
        },
        delURL(item) {
            let index = this.operateData.urlLinkList.indexOf(item)
            if (index !== -1) {
                this.operateData.urlLinkList.splice(index, 1)
            }
            console.log(this.operateData.urlLinkList)
            item.valid='1' 
            this.delUrlList.push(item)
         
        },
        // uploadURL() {
        //     // this.operateData.urlLinkList
        //     let params = {}
        //     //缺少 超链接地址 超链接名称  字段
        //     $.post({
        //         url: `${this.baseUrl}/upload.ajax?fileType=5`, //'1'为文件，'2'为图片,'5'超链接
        //         cache: false,
        //         data: params,
        //         contentType: false, // 不设置内容类型
        //         processData: false, // 不处理数据
        //         success: function (result) {
        //             if (result.error === 0) {
        //                 this.showDialog('add', 'info', true, result.msg);
        //             } else {
        //                 this.showDialog('add', 'info', true, result.msg);
        //             }
        //         }.bind(this)
        //     })
        // },
        moment: moment,
        attachmentsSplice: function (index) {
            var data = this.operateData.mediaList[index]
            if (typeof data.id === "undefined") {
                this.operateData.mediaList.splice(index, 1)
            } else {
                data.valid = 1;
            }
        },
        // 获取关联投票
        getVote: function () {
            var params = {};
            params.surveyType = '1'; // 1-社区投票
            $.post({
                url: `${this.baseUrl}/voteList.ajax`,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.voteIdList = result.data;
                        // this.showDialog("", "info", false, result.msg)
                    } else {
                        this.showDialog("", "info", true, result.msg)
                    }
                }.bind(this)
            });
        },
        getUrlParam: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg); //匹配目标参数
            if (r != null) return decodeURIComponent(r[2]);
            return '';
        },
        // 附件选中改变状态
        selectButton: function (item, arr) {
            if (item.status == 1) {
                item.status = 0;
                return;
            }
            arr.forEach(function (el) {
                el.status = 0;
            })
            item.status = 1;
        },
        customUploadImg: function (resultFiles, insertImgFn) {
            var file = resultFiles[0];
            var formdata = new FormData();
            formdata.append("file", file);
            formdata.append("fileType", 2);
            $.post({
                url: `${this.baseUrl}/upload.ajax?fileType=2`, //'1'为文件，'2'为图片
                cache: false,
                data: formdata,
                contentType: false, // 不设置内容类型
                processData: false, // 不处理数据
                success: function (result) {
                    if (result.error === 0) {
                        this.operateData.contentImages.push(result.data.fileId); //文章正文中上传的图片id
                        insertImgFn(result.data.accessUrl, '__id=' + result.data.fileId) //图片alt属性存放图片id
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
                valid: 0,
                status: 1,
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
            console.log('accountList:', this.accountList)
        },
        getTableData: function (currentIndex) {
            var params = {
                pageNum: currentIndex + 1,
                pageSize: this.page1.pageMaxNum,
                postType: 1, //发帖类型
                // valid: 0
            };
            this.authorId && (params.authorId = this.authorId)
            this.articleTitle && (params.title = this.articleTitle)
            this.articleLevel && (params.isTop = this.articleLevel)
            this.productId&& (params.productId = this.productId)
            //console.log(params.authorId)
            // this.operateData.authorId && (params.authorId = this.operateData.authorId)
            $.post({
                url: `${this.baseUrl}/tableData.ajax`,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.page1.currentIndex = currentIndex;
                        this.page1.totalPage = Math.ceil(result.data.total / params.pageSize);
                        this.tableData = result.data.rows;
                    } else {
                        this.page1.currentIndex = 0;
                        this.page1.totalPage = 0;
                        this.tableData = [];
                        this.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },


        updateStatus: function (item) {
            $.post({
                url: `${this.baseUrl}/newModifyStatus.ajax`,
                data: {
                    postId: item.postId,
                    status: item.status === 1 ? 5 : 1
                },
                success: function (result) {
                    if (result.error === 0) {
                        //9534
                        this.getTableData(this.page1.currentIndex)
                        // this.getTableData(this.page2.currentIndex)
                        this.showDialog("", "info", false, '修改状态成功')
                    } else {
                        this.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
        verify: function () {
            var operateData = this.operateData;
            if (!operateData.authorId) {
                this.showDialog('add', 'info', true, '账号名称不能为空')
                return false;
            }
            return true;
        },
        HTMLDecode: function (text) {
            var temp = document.createElement("div");
            temp.innerHTML = text;
            var output = temp.innerText || temp.textContent;
            temp = null;
            return output;
        },
        showDetail: function (item) {
            this.modifyStatus = 1;
            this.isModify = true;
            console.log(item)
            this.operateData.urlLinkList=[]
            this.delUrlList=[]
            $.post({
                url: `${this.baseUrl}/querySingle.ajax`,
                data: {
                    postId: item.postId
                },
                success: function (result) {
                    if (result.error === 0) {
                        this.operateData.title = result.data.title;
                        this.operateData.summary = result.data.summary;
                        this.operateData.shareSummary = result.data.shareSummary;
                        // shareSummary
                        this.operateData.topics = result.data.topics&&Object.prototype.toString.call(result.data.topics) === '[object Array]' ? result.data.topics.map(function(item){
							return item.id
						}):[];
                        this.operateData.voteId = result.data.voteId;
                        this.operateData.isShare = result.data.isShare;
                        this.operateData.initThumbCount = result.data.initThumbCount;
                        this.operateData.displayInProduct = result.data.displayInProduct?result.data.displayInProduct:'0';
                        if (result.data.imagesList) {
                            this.operateData.imagesList = [];
                            this.imagesUrl = [];
                            result.data.imagesList.forEach(function (item) {
                                this.operateData.imagesList.push(item.imageId);
                                this.imagesUrl.push(item.imageUrl);
                            }.bind(this));
                        }


                        if (result.data.attachments) {
                            this.operateData.attachLinkList = [];
                            this.operateData.mediaList = [];
                            result.data.attachments.forEach(function (item) {
                                if (item.attachType == '1' || item.attachType == '2') {
                                    this.operateData.attachLinkList.push({
                                        id: item.id,
                                        status: item.status,
                                        valid: item.valid,
                                        attachType: item.attachType,
                                        cmsId: item.cmsId,
                                        attachName: item.attachName,
                                        url: item.url
                                    });
                                } else if(item.attachType == '3') {
                                    this.operateData.mediaList.push({
                                        id: item.id,
                                        status: item.status,
                                        valid: item.valid,
                                        attachType: item.attachType,
                                        cmsId: item.cmsId,
                                        attachName: item.attachName
                                    });
                                }else if(item.attachType == '5') {
                                    this.operateData.urlLinkList.push({
                                        id: item.id,
                                        status: item.status,
                                        valid: item.valid,
                                        attachType: item.attachType,
                                        url: item.url,
                                        attachName: item.attachName
                                    });
                                }
                            }.bind(this));
                        }
                        this.operateData.status = result.data.status;
                        this.operateData.postId = result.data.postId;
                        this.operateData.content = result.data.content;
                        this.operateData.authorId = result.data.userInfo.userId;
                        this.operateData.productIds = result.data.productsList.map(function (item) {
                            return item.productId;
                        }).join(',');
                        this.editor.txt.html(result.data.content);
                        this.filePath = '';
                        this.picturePath = '';
                        this.operateData.contentImages = [];
                        this.isArticle = true;
						$("#topics").val(this.operateData.topics).trigger('change');
                        this.showDialog("", "add");
                    } else {
                        this.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
        // 修改文章内容+修改邮件内容
        modify: function () {
            if (!this.verify()) return;
            var params = {
                id: this.operateData.postId,
                content: this.operateData.content,
                authorId: this.operateData.authorId,
                title: this.operateData.title,
                // attachHref:this.operateData.attachHref.filter(function(item){
                //     return item.radio;
                // }),
                summary: this.operateData.summary,
                shareSummary: this.operateData.shareSummary,
                // shareSummary
                topics: this.operateData.topics,
                imagesList: this.operateData.imagesList,
                postType: this.operateData.postType,
                status: this.operateData.status,
                voteId: this.operateData.voteId,
                contentImages: this.operateData.contentImages,  
                // attachmentsList: this.operateData.attachLinkList.concat(this.operateData.mediaList),
                // attachmentsList: this.operateData.attachLinkList.concat(this.operateData.urlLinkList),
                attachmentsList: this.operateData.attachLinkList.concat(this.operateData.mediaList,this.operateData.urlLinkList),
                isShare:this.operateData.isShare,
                initThumbCount:this.operateData.initThumbCount,
                displayInProduct:this.operateData.displayInProduct,
                // delUrlList 
            }
            if(this.delUrlList.length>0){
                params.attachmentsList= params.attachmentsList.concat(this.delUrlList)
            }
            params.productList = this.operateData.productIds.split(/[,，]/g).map(function (id) {
                return {
                    productId: id
                }
            })
            console.log(params)
            $.post({
                url: `${this.baseUrl}/modify.ajax`,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        // this.getTableData(this.page2.currentIndex);
                        //9534
                        this.getTableData(this.page1.currentIndex)
                        this.showDialog("add", "info", false, result.msg);
                        this.imagesUrl = [];
                    } else {
                        this.showDialog("add", "info", true, result.msg)
                    }
                }.bind(this)
            });
        },
        showAdd: function () {
            this.clickFlag = true;
            this.modifyStatus = 0;
            this.operateData.urlLinkList=[]
            // this.operateData.content='';
            if (this.isModify) {
                this.operateData.mailId = '';
                this.operateData.authorId = '';
                this.operateData.summary = '';
                this.operateData.shareSummary = '';
                // shareSummary
                this.operateData.topics = [];
                this.operateData.productIds = '';
                this.operateData.title = '';
                this.operateData.imagesList = [];
                this.operateData.attachLinkList = [];
                this.operateData.mediaList = [];
                this.editor.txt.clear(); //清空wangeditor富文本的缓存内容
                this.operateData.voteId = '';
                this.operateData.contentImages = [];
                this.imagesUrl = [];
                this.filePath = '';
                this.picturePath = '';
                this.operateData.initThumbCount = 0;
                this.operateData.displayInProduct = 0;
            }
			$("#topics").val(this.operateData.topics).trigger('change');
            this.isArticle = true;
            this.isModify = false;
            this.showDialog('', 'add');
        },
        add: function () {
            if (!this.verify()) return;
            var params = {
                mailId: this.operateData.mailId,
                content: this.operateData.content,
                authorId: this.operateData.authorId,
                title: this.operateData.title,
                summary: this.operateData.summary,
                shareSummary: this.operateData.shareSummary,
                topics: this.operateData.topics,
                imagesList: this.operateData.imagesList,
               
                postType: this.operateData.postType,
                voteId: this.operateData.voteId,
                contentImages: this.operateData.contentImages,
                isShare:this.operateData.isShare,
                initThumbCount:this.operateData.initThumbCount,
                // attachmentsList:this.operateData.urlLinkList// 插入的链接列表
                // attachmentsList:[].concat(this.operateData.urlLinkList),   
                attachmentsList: this.operateData.attachLinkList.concat(this.operateData.mediaList,this.operateData.urlLinkList),
                displayInProduct:this.operateData.displayInProduct
            };
            params.productList = this.operateData.productIds.split(/[,，]/g).map(function (id) {
                return {
                    productId: id
                }
            })
            console.log(params);
            if (this.clickFlag) {
                $.post({
                    url: `${this.baseUrl}/add.ajax`,
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            this.getTableData(0)
                            this.getTableData2(this.page2.currentIndex) //由于在邮件导入列表里点击查看进行发布时调用add接口，故而需要重新加载当前页面
                            this.showDialog("add", "info", false, result.msg)
                            // 9534新增成功后清空弹窗
                            this.imagesUrl = []
                            this.operateData = []
                            this.filePath = ''
                            this.editor.txt.clear()
                        } else {
                            this.showDialog("add", "info", true, result.msg)
                        }
                        }.bind(this),
                    complete: function () {
                        this.clickFlag = true;
                    }.bind(this)
                });
            }
            this.clickFlag = false;
        },

        selectPic: function (item) {
            this.picturePath = '';
            this.$refs.pictureInput.click();
        },
        showPicName: function (event) {
            this.picturePath = event.target.files[0].name;
        },
        selectFile: function (item) {
            this.filePath = '';
            this.$refs.fileInput.click();
        },
        showFileName: function (event) {
            this.filePath = event.target.files[0].name;
        },
        //上传图片
        picUpload: function () {
            if (document.getElementById('uploadPictureInput').value == '') {
                this.showDialog('add', 'info', true, '请选择要上传的图片!');
                return;
            }
            var _this = this;
            this.loadingShow = true;
            var file = document.getElementById('uploadPictureInput');
            var fileName = file.files[0].name;
            var fileType = fileName.split('.')[fileName.split('.').length - 1];
            if (fileType !== 'jpg' && fileType !== 'jpeg' && fileType !== 'png' && fileType !== 'gif') {
                this.showDialog('add', 'info', true, '上传文件格式错误,请上传图片文件');
                return;
            }

            var formdata = new FormData();
            formdata.append('file', file.files[0]);
            formdata.append('fileType', 2);
            $.post({
                url: `${this.baseUrl}/upload.ajax?fileType=2`,
                cache: false,
                data: formdata,
                processData: false,
                contentType: false,
            }).done(function (result) {
                _this.operateData.imagesList.push(result.data.fileId);
                _this.imagesUrl.push(result.data.accessUrl);
                var limitNum = _this.limitNum;
                if (_this.imagesUrl.length > limitNum) {
                    _this.showDialog("add", "info", true, '最多只能上传9张图片');
                    _this.imagesUrl.splice(limitNum, _this.imagesUrl.length - limitNum);
                    _this.operateData.imagesList.splice(limitNum, _this.operateData.imagesList.length - limitNum);
                }
                _this.picturePath = '';
                document.getElementById('uploadPictureInput').value = '';
            }).fail(function (err) {
                _this.showDialog('add', 'info', true, '上传失败');
            });
        },
        //上传附件
        fileUpload: function () {
            if (document.getElementById('uploadFileInput').value == '') {
                this.showDialog('add', 'info', true, '请选择要上传的附件!');
                return;
            }

            var _this = this;
            var file = document.getElementById('uploadFileInput');
            var formdata = new FormData();
            var fileName = file.files[0].name;
            var fileType = fileName.split('.')[fileName.split('.').length - 1];
            if (fileType !== 'pdf') {
                this.showDialog('add', 'info', true, '上传文件格式错误,请上传.pdf文件');
                return;
            }

            formdata.append('file', file.files[0]);
            formdata.append('fileType', 1);
            $.post({
                url: `${this.baseUrl}/upload.ajax?fileType=1`,
                cache: false,
                data: formdata,
                processData: false,
                contentType: false,
            }).done(function (result) {
                _this.operateData.attachLinkList.forEach(function (el) {
                    el.status = 0;
                })

                _this.operateData.attachLinkList.push({
                    attachName: file.files[0].name,
                    attachType: "1",
                    filePath: result.data.filePath,
                    url: result.data.accessUrl,
                    status: '1'
                });
                this.filePath = '';
                document.getElementById('uploadFileInput').value = '';
                // _this.showDialog('', 'info', false, result.msg);
            }).fail(function (err) {
                _this.showDialog('add', 'info', true, '上传失败');
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
        showNestDialog: function (dia1, dia2, dia3, callback, msg) { //页面内嵌套了多个模态框
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
                        $('#' + dia1).on("hidden.bs.modal", function () {
                            $('#' + dia3).modal('show');
                            $('#' + dia1).off().on("hidden", "hidden.bs.modal");
                        });
                    });
                    $('#' + dia2).modal("show");
                    $('#' + dia1).off().on("hidden", "hidden.bs.modal");
                });
                $('#' + dia1).modal('hide');
            }
        },

        // 邮件导入页面
        getTableData2: function (currentIndex) {
            var params = {
                pageNum: currentIndex + 1,
                pageSize: this.page2.pageMaxNum,
                status: this.publishStatus,
                sender: this.sender,
                // valid: 0
            };
            this.authorId && (params.authorId = this.authorId)
            $.post({
                url: `${this.baseUrl}/tableData2.ajax`,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.page2.currentIndex = currentIndex;
                        this.page2.totalPage = Math.ceil(result.data.total / params.pageSize);
                        this.tableData2 = result.data.rows;
                    } else {
                        this.page2.currentIndex = 0;
                        this.page2.totalPage = 0;
                        this.tableData2 = [];
                        this.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
        // 关联账号
        showAuthor: function (item) {
            this.relatedData.relatedStatus = false;
            this.relatedData.sender = item.sender;
            this.relatedData.authorId = '';
            this.showDialog("", "selectAuthor");
        },
        // modifyAuthor:function(item){
        //     this.relatedData.relatedStatus=true;
        //     this.relatedData.sender = item.sender;
        //     this.relatedData.authorId=item.authorId;
        //     this.showDialog("","selectAuthor");
        // },

        verifyMail: function () {
            if (!this.relatedData.authorId) {
                this.showDialog('selectAuthor', 'info', true, '账号名称不能为空')
                return false;
            }
            return true;
        },
        // 关联邮箱 是调用的新增邮箱作者的接口
        relatedMail: function () {
            if (!this.verifyMail()) return;
            var params = {
                authorId: this.relatedData.authorId,
                mail: this.relatedData.sender,
            };
            $.post({
                url: `${this.baseUrl}/relatedMail.ajax`,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        console.log(this.page2.currentIndex)
                        this.getTableData2(this.page2.currentIndex)
                        this.showDialog("selectAuthor", "info", false, "关联成功")
                    } else {
                        this.showDialog("selectAuthor", "info", true, result.msg)
                    }
                }.bind(this)
            })
        },
        updateLevel: function (item) {
            // 9666 UOP社区后台优化 #7 需求描述1.文章管理增加置顶
            console.log('置顶弹窗')
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
                            this.showDialog("updateLevelDialog", "info", false, '修改状态成功')
                        } else {
                            this.showDialog("updateLevelDialog", "info", false, result.msg)
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

        // 展示邮件详细信息 和文章详细信息框相似
        showMailDetail: function (item) {
            //未发布的文章 点击查看可进行发布   已发布的文章 点击查看可进行修改
            if (item.postId) {
                this.modifyStatus = 1;
            } else {
                this.modifyStatus = 2;
            }
            console.log(item.postId)
            console.log(this.modifyStatus)
            this.operateData.mailId = item.id;
            $.post({
                url: `${this.baseUrl}/mailDetail.ajax`,
                data: {
                    id: item.id
                },
                success: function (result) {
                    if (result.error === 0) {
                        this.operateData.title = result.data.title;
                        this.operateData.isShare = result.data.isShare;
                        this.operateData.initThumbCount = result.data.initThumbCount;
                        this.operateData.summary = result.data.summary;
                        this.operateData.shareSummary = result.data.shareSummary;
                        this.operateData.topics = result.data.topics&&Object.prototype.toString.call(result.data.topics) === '[object Array]'?result.data.topics.map(function(item){
							return item.id;
						}):[];
                        this.operateData.postId = result.data.postId;
                        this.operateData.imagesList = [];
                        this.operateData.attachLinkList = [];
                        this.operateData.mediaList = [];

                        if (result.data.attachments) {
                            result.data.attachments.forEach(function (item) {
                                if (item.attachType == '1' || item.attachType == '2') {
                                    this.operateData.attachLinkList.push({
                                        id: item.id,
                                        status: item.status,
                                        valid: item.valid,
                                        attachType: item.attachType,
                                        cmsId: item.cmsId,
                                        attachName: item.attachName,
                                        url: item.url,
                                        filePath: item.filePath

                                    });
                                } else {
                                    this.operateData.mediaList.push({
                                        id: item.id,
                                        status: item.status,
                                        valid: item.valid,
                                        attachType: item.attachType,
                                        cmsId: item.cmsId,
                                        attachName: item.attachName
                                    });
                                }
                            }.bind(this));
                        }
                        this.operateData.status = result.data.status;
                        this.operateData.content = result.data.content;
                        this.operateData.authorId = result.data.authorId;
                        this.operateData.productIds = (result.data.productsList || []).map(function (item) {
                            return item.productId;
                        }).join(',');
                        this.editor.txt.html(result.data.content);
                        this.picturePath = '';
                        this.filePath = '';
                        this.operateData.contentImages = [];
                        this.isArticle = false;
                        this.imagesUrl = [];
						$("#topics").val(this.operateData.topics).trigger('change');
                        this.showDialog("", "add")
                    } else {
                        this.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
            });

        },
        // 直接点击”发布“按钮调用发布接口
        publishArticle: function (item) {
            $.post({
                url: `${this.baseUrl}/publishArticle.ajax`,
                data: {
                    id: item.id //发布邮件时传入id
                    // adminUserId
                },
                success: function (result) {
                    if (result.error === 0) {
                        console.log(this.page2.currentIndex)
                        this.getTableData2(this.page2.currentIndex)
                        this.showDialog("", "info", false, '发布成功')
                    } else {
                        this.showDialog("", "info", true, "此邮箱尚未关联账号")
                    }
                }.bind(this)
            });
        },
        del: function () {
            $.post({
                url: `${this.baseUrl}/del.ajax`,
                data: {
                    id: this.delId
                },
                success: function (result) {
                    if (result.error === 0) {
                        console.log(this.page2.currentIndex)
                        this.getTableData2(this.page2.currentIndex)
                        this.showDialog("del", "info", false, result.msg)
                    } else {
                        this.showDialog("del", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
        deleteMail: function (item) {
            this.delId = item.id;
            this.showDialog("", "del", false, '确定删除吗？');
        },

        // <!--20210901新加查看评论需求  start-->
        checkComment: function (item) {
            var _this = this;
            this.page3.currentIndex = 0;
            this.showCheckCommentRow = item
            this.commentTitle = item.title.substr(0, 12) + '...';
            this.showDialog("", "checkComment");
            // 默认选择回复人
            this.remarksAuthor = item.userInfo.userId
            console.log(this.remarksAuthor);
            this.getRemarksList(item)
        },
        commentReply: function (item) {
            var _this = this;
            this.showDialog("checkComment", "commentReply", true);
            this.remarksRow = item
        },
        remarks(remarks) {
            console.log(remarks);
        },
        // 查看回复
        viewReply(item) {
            this.viewReplyTableData = [];
            this.showDialog("checkComment", "viewReply", true);
            var params = {
                // pageSize: this.page3.pageMaxNum,
                commentSort: "THUMB",
                itemId: item.id,
                itemType: 4
            };
            this.viewReplyParams = params
            $.post({
                url: `${this.baseUrl}/remarksList.ajax`,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.viewReplyTableData = result.data.rows;

                    } else {
                        this.viewReplyTableData = [];
                    }
                }.bind(this)
            });
        },
        // 删除回复
        remarksDelete(item) {
            $.post({
                url: `${this.baseUrl}/remarksDelete.ajax`,
                data: {
                    id: item.id
                },
                success: function (result) {
                    if (result.error === 0) {
                        this.showDialog("del", "info", false, result.msg)

                        $.post({
                            url: `${this.baseUrl}/remarksList.ajax`,
                            data: this.viewReplyParams,
                            success: function (result) {
                                if (result.error === 0) {
                                    this.viewReplyTableData = result.data.rows;

                                } else {
                                    this.viewReplyTableData = [];
                                }
                            }.bind(this)
                        });
                        this.getRemarksList(item)
                    } else {
                        console.log(result.msg)
                    }
                }.bind(this)
            });
        },
        // 回复评论  
        remarksAnswer: function () {
            let commentParams = {
                content: this.rewardText,
                // id: this.remarksRow.id,
                // itemId: this.remarksRow.itemId,
                id: this.remarksRow.itemId,
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
                        this.showDialog("commentReply", "", false, result.msg) // 20211030修改，待验证
                        this.getTableData3(this.page3.currentIndex)
                        this.showDialog("checkComment", "info", true, result.msg)
                    } else {
                        $('#commentReply').off().on("hidden", "hidden.bs.modal");
                        // this.showNestDialog("commentReply", "info","checkComment", true, result.msg); //依次显示提示信息、评论回复、评论列表                       
                        this.showDialog("commentReply", "info", true, result.msg);
                    }
                }.bind(this)
            });
        },
        // 评论置顶
        remarkLevel(item) {

            console.log(item)
            $.post({
                url: `${this.baseUrl}/remarksTop.ajax`,
                data: {
                    id: item.id,
                    level: item.level == 1 ? 0 : 1
                },
                success: function (result) {
                    if (result.error === 0) {

                        this.getTableData3(this.page3.currentIndex)
                        this.showDialog("checkComment", "info", true, result.msg)
                    } else {
                        this.showDialog("checkComment", "info", true, result.msg)
                    }
                }.bind(this)
            });
        },
        // 评论-发放奖励
        remarksReward: function (item) {
            $.post({
                url: `${this.baseUrl}/remarksReward.ajax`,
                data: {
                    commentId: item.id,
                    status: item.status == 1 ? 5 : 1,
                    sendStatus: item.sendStatus == 1 ? 0 : 1
                },

                //                 let newArr = []
                //     arr.map((item, index) => {
                //     newArr.push(
                //         Object.assign({}, item, {
                //              id: index
                //         })
                //     )
                // })
                success: function (result) {
                    if (result.error === 0) {
                        this.showDialog("checkComment", "info", true, result.msg)
                        this.getTableData3(this.page3.currentIndex)


                    } else {
                        this.showDialog("checkComment", "info", true, result.msg)
                    }
                }.bind(this)
            });
        },
        // 隐藏 评论  ok
        updateStatus3: function (item) {
            $.post({
                url: `${this.baseUrl}/handleCheck.ajax`,
                data: {
                    commentId: item.id,
                    status: item.status == 1 ? 5 : 1
                },
                success: function (result) {
                    if (result.error === 0) {
                        this.getTableData3(this.page3.currentIndex)
                        this.showDialog("checkComment", "info", true, result.msg)
                    } else {
                        this.showDialog("checkComment", "info", true, result.msg)
                    }
                }.bind(this)
            });
        },
        // 导出评论
        exportRemarksExcel: function () {
            // node导出

            var url = `${this.baseUrl}/exportRemarksExcel.ajax`
            url += '?commentSort=' + this.remrarksListParams.commentSort + '&itemId=' + this.remrarksListParams.itemId +
                '&itemType=' + this.remrarksListParams.itemType +
                '&pageNum=' + '1' +
                '&pageSize=' + '9999' +
                '&postId=' + this.remrarksListParams.postId
            window.location.href = url;

            // 前端导出
            // if (this.tableData3.length === 0) {
            //     return this.showDialog('', 'info', false, '列表为空');
            // }
            // var elt = document.getElementById('index');
            // console.log(elt);
            // var wb = XLSX.utils.table_to_book(elt, {
            //     sheet: 'Sheet JS'
            // });
            // XLSX.writeFile(wb, '文章评论列表.xlsx');
        },
        // 评论筛选 ok
        getTableData3: function (currentIndex) {

            console.log('getTableData3', this.remrarksListParams)
            this.page3.currentIndex = currentIndex
            this.getRemarksList(this.remrarksListParams, currentIndex)
        },
        searchTableData3: function () {
            this.getRemarksList(this.remrarksListParams)
        },


        // 获取评论列表 ok
        getRemarksList: function (item, currentIndex) {
            var params = {
                pageSize: this.page3.pageMaxNum,
                commentSort: "THUMB",
                itemId: item.postId,
                itemType: 2
            };
            if (currentIndex) {
                params.pageNum = currentIndex + 1
            } else {
                params.pageNum = this.page3.currentIndex + 1
            }

            this.remrarksListParams = params
            this.remrarksListParams.postId = item.postId

            this.level && (params.level = this.level)
            this.userId && (params.userId = this.userId)


            $.post({
                url: `${this.baseUrl}/remarksList.ajax`,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        if (currentIndex) {
                            this.page3.currentIndex = currentIndex;
                        } else {
                            this.page3.currentIndex = 0;

                        }

                        this.page3.totalPage = Math.ceil(result.data.total / params.pageSize);
                        this.tableData3 = result.data.rows;

                    } else {
                        this.page3.currentIndex = 0;
                        this.page3.totalPage = 0;
                        this.tableData3 = [];
                        this.showDialog("checkComment", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },

        //删除图片
        delImg(i) {
            this.operateData.imagesList.splice(i, 1);
            this.imagesUrl.splice(i, 1);
            document.getElementById('uploadPictureInput').value = '';
        },
        getArticleImg() {
            var content = this.editor.txt.html();

            var re = /<img.*?(?:>|\/>)/gi;
            var re_src = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
            var re_alt = /alt=[\'\"]?__id=([^\'\"]*)[\'\"]?/i; //可以生成缩略图的正文图片是alt属性值以“__id="开头

            var a = content.match(re);
            if (a == null) {
                return
            }
            for (var i = 0; i < a.length; i++) {
                var img_id = a[i].match(re_alt);
                if (img_id != null && img_id != undefined) {
                    var img_url = a[i].match(re_src);
                    this.imagesUrl.push(img_url[1]);
                    this.operateData.imagesList.push(img_id[1]);
                    var limitNum = this.limitNum;
                    if (this.imagesUrl.length > limitNum) {
                        this.showDialog("add", "info", true, '最多只能上传9张图片');
                        this.imagesUrl.splice(limitNum, this.imagesUrl.length - limitNum);
                        this.operateData.imagesList.splice(limitNum, this.operateData.imagesList.length - limitNum);
                    }

                }
            }

        }
    }
});