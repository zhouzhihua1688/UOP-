new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        tableData: [],
        diaMsg: '',
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        pageMaxNum: 10,
        condition: '',
        pkeys: "",
        versions:"",
        // 查询
        ruleNames:'',
        mateKeys:'',
        fuzzyKeys:'',
        // 新增参数
        enable: "",
        pkey: "",
        plevel: "",
        pname: "",
        pvalue: "",
        remark: "",
        system:"1",
        version:"",

        articleDes: "",//图文说明
        articlePicurl: "",//图文图片地址
        articleTitle: "",//图文TITLE
        articleUrl: "",//图文地址
        binding: "",//是否绑定
        content: "",//文本内容
        enable: "",//是否可用：0-不可用，1-可用
        fuzzyKey: "",//不需要全匹配关键字
        groupId: "",//组合图文groupID
        groupOrder: "",//组合图文group中的排序
        hqmusicUrl: "",//高清音频地址
        mateKey: "",//需要全匹配关键字
        msgType: "0",// 0:TEXT 1:AUDIO 2:ARTICLE
        musicDes: "",//音频说明
        musicTitle: "",//音频TITLE
        musicUrl: "",// 音频地址
        ruleName: "", //规则名
        ruleType: "", //0:被添加时自动回复,1:消息自动回复,2:关键字自动回复 ,
        serverType: "",//服务类型
        subType: "",  //子类型
        id:'',
        mediaId:'',
        flag:false,
        updateFlag:false,
        loadingShow: false,
    },
    created: function () {

    },
    computed: {
        //主表格分页
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
    watch: {
        pageMaxNum: function () {
            this.currentIndex = 0;
        },
        condition: function () {
            this.currentIndex = 0;
        }
    },
    mounted: function () {
        var _this = this;
        var dialogs = ['delete', 'info', 'operate', 'revise'];
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
        this.getTableData()

        // 上传按钮绑定事件
        $('#fileSelectBtn').click(function () {
            $('#uploadFileInput').click();
        });
        $('#uploadFileInput').on('change', function () {
            $('#uploadInput').val($(this).val());
        });
        $('#fileSelectBtn1').click(function () {
            $('#uploadFileInput1').click();
        });
        $('#uploadFileInput1').on('change', function () {
            $('#uploadInput1').val($(this).val());
        });
    },
    methods: {
        showMsgType:function(msgType,showType){
            if(showType=='add'){
                if(msgType==4){
                    this.flag=true;
                }else{
                    this.flag=false;
                }
            }else if(showType=='update'){
                if(msgType==4){
                    this.updateFlag=true;
                }else{
                    this.updateFlag=false;
                }
            }
        },
        getTableData: function (currentIndex) {
            var _this = this;
            var params = {};
            this.currentIndex= 0;
            params.system = this.system;
            params.mateKey = this.mateKeys;
            params.fuzzyKey=this.fuzzyKeys;
            params.ruleName=this.ruleNames;
            console.log(params)
            $.post({
                url: '/publicConfig/wechatPublicMgmt/replyMessageTemplateMgmt/getTableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.currentIndex = 0;
                        _this.tableData = result.data.tableData;
                        // _this.tableData = result.data.tableData.filter(function (item) {
                        //     return item.system.indexOf(params.system) > -1
                        //         && item.mateKey.indexOf(params.mateKey) > -1
                        //         && item.fuzzyKey.indexOf(params.fuzzyKey) > -1;
                        // });
                    }
                    else {
                        _this.tableData = [];
                        _this.currentIndex = 0;
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        getDate:function(){
            var _this=this;
            _this.getTableData(0)
        },
        // 刷新
        refresh:function(){
            var _this = this;
            $.post({
                url: '/publicConfig/wechatPublicMgmt/replyMessageTemplateMgmt/refresh.ajax',
                // data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.currentIndex = 0;
                        _this.getTableData(0)
                        // _this.tableData = result.data.tableData;
                        _this.showDialog('', 'info', false, result.msg);
                    }
                    else {
                        _this.tableData = [];
                        _this.currentIndex = 0;
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        showAdd: function () {
            var _this=this;
            this.articleDes= "";//图文说明
            this.articlePicurl= "";//图文图片地址
            this.articleTitle= "";//图文TITLE
            this.articleUrl= "";//图文地址
            this.binding= "0";//是否绑定
            this.content= "";//文本内容
            this.enable="1";//是否可用：0-不可用，1-可用
            this.fuzzyKey= "";//不需要全匹配关键字
            this.groupId= "";//组合图文groupID
            this.groupOrder= "";//组合图文group中的排序
            this.hqmusicUrl= "";//高清音频地址
            this.mateKey= "";//需要全匹配关键字
            this.msgType= "0";// 0:TEXT 1:AUDIO 2:ARTICLE
            this.musicDes= "";//音频说明
            this.musicTitle= "";//音频TITLE
            this.musicUrl= "";// 音频地址
            this.ruleName= ""; //规则名
            this.ruleType= "2"; //0:被添加时自动回复,1:消息自动回复,2:关键字自动回复 ,
            this.serverType= "";//服务类型
            this.subType= "";  //子类型
            // this.system="1";
            this.mediaId="";    //素材id
            this.flag=false;
            this.updateFlag=false;
            this.showDialog('', 'operate');
        },
        saveParam:function(){
            var _this = this;
            var params = {};
            params.articleDes=this.articleDes;//图文说明
            params.articlePicurl= this.articlePicurl;//图文图片地址
            params.articleTitle=this.articleTitle;//图文TITLE
            params.articleUrl= this.articleUrl;//图文地址
            params.binding=this.binding;//是否绑定
            params.content= this.content;//文本内容
            params.enable=this.enable;//是否可用：0-不可用，1-可用
            params.fuzzyKey=this.fuzzyKey;//不需要全匹配关键字
            params.groupId=this.groupId;//组合图文groupID
            params.groupOrder=this.groupOrder;//组合图文group中的排序
            params.hqmusicUrl=this.hqmusicUrl;//高清音频地址
            params.mateKey=this.mateKey;//需要全匹配关键字
            params.msgType= this.msgType;// 0:TEXT 1:AUDIO 2:ARTICLE
            params.musicDes= this.musicDes;//音频说明
            params.musicTitle=this.musicTitle;//音频TITLE
            params.musicUrl=this.musicUrl;// 音频地址
            params.ruleName=this.ruleName; //规则名
            params.ruleType=this.ruleType ;//0:被添加时自动回复,1:消息自动回复,2:关键字自动回复 ,
            params.serverType=this.serverType;//服务类型
            params.subType=this.subType;  //子类型
            params.system=this.system;
            params.mediaId=this.mediaId;
            console.log(params)
            // if (this.diaInfoCheck()) {
                $.post({
                    url: '/publicConfig/wechatPublicMgmt/replyMessageTemplateMgmt/saveParam.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.getTableData(0);
                            _this.showDialog('operate', 'info', false, result.msg);
                        }else {
                            _this.showDialog('operate', 'info', true, result.msg);
                        }
                    }
                });
            // }
        },  
        // 修改数据
        showUpdate:function (item) {
            var _this=this;
            this.articleDes=item.articleDes;//图文说明
            this.articlePicurl=item.articlePicurl;//图文图片地址
            this.articleTitle=item.articleTitle;//图文TITLE
            this.articleUrl=item.articleUrl;//图文地址
            this.binding=item.binding ;//是否绑定
            this.content=item.content ;//文本内容
            this.enable=item.enable;//是否可用：0-不可用，1-可用
            this.fuzzyKey=item.fuzzyKey ;//不需要全匹配关键字
            this.groupId=item.groupId;//组合图文groupID
            this.groupOrder=item.groupOrder;//组合图文group中的排序
            this.hqmusicUrl=item.hqmusicUrl;//高清音频地址
            this.mateKey=item.mateKey;//需要全匹配关键字
            this.msgType=item.msgType;// 0:TEXT 1:AUDIO 2:ARTICLE
            this.musicDes=item.musicDes;//音频说明
            this.musicTitle=item.musicTitle;//音频TITLE
            this.musicUrl=item.musicUrl;// 音频地址
            this.ruleName=item.ruleName; //规则名
            this.ruleType=item.ruleType; //0:被添加时自动回复,1:消息自动回复,2:关键字自动回复 ,
            this.serverType=item.serverType;//服务类型
            this.subType=item.subType;  //子类型
            this.system=item.system;
            this.id=item.id;
            if(this.msgType==4){
                this.updateFlag=true;
            }else{
                this.updateFlag=false;
            }
            this.mediaId=item.mediaId;
            this.showDialog('', 'revise');
        },
        update: function () {
            var _this = this;
            var params = {};
            params.articleDes=this.articleDes;//图文说明
            params.articlePicurl= this.articlePicurl;//图文图片地址
            params.articleTitle=this.articleTitle;//图文TITLE
            params.articleUrl= this.articleUrl;//图文地址
            params.binding=this.binding;//是否绑定
            params.content= this.content;//文本内容
            params.enable=this.enable;//是否可用：0-不可用，1-可用
            params.fuzzyKey=this.fuzzyKey;//不需要全匹配关键字
            params.groupId=this.groupId;//组合图文groupID
            params.groupOrder=this.groupOrder;//组合图文group中的排序
            params.hqmusicUrl=this.hqmusicUrl;//高清音频地址
            params.mateKey=this.mateKey;//需要全匹配关键字
            params.msgType= this.msgType;// 0:TEXT 1:AUDIO 2:ARTICLE
            params.musicDes= this.musicDes;//音频说明
            params.musicTitle=this.musicTitle;//音频TITLE
            params.musicUrl=this.musicUrl;// 音频地址
            params.ruleName=this.ruleName; //规则名
            params.ruleType=this.ruleType ;//0:被添加时自动回复,1:消息自动回复,2:关键字自动回复 ,
            params.serverType=this.serverType;//服务类型
            params.subType=this.subType;  //子类型
            params.system=this.system;
            params.id=this.id;   //依据Id修改
            params.mediaId=this.mediaId;
            console.log(params)
            $.post({
                url: '/publicConfig/wechatPublicMgmt/replyMessageTemplateMgmt/update.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0);
                        _this.showDialog('revise', 'info', false, result.msg);
                    }
                    _this.showDialog('revise', 'info', false, result.msg);
                }
            });
        }, 
        // 删除
        showDelete: function(item) {
            this.id = item.id;
            this.showDialog('', 'delete');
        },
        del: function() {
            var _this = this;
            var params = {};
            params.id = this.id
            $.post({
                url: '/publicConfig/wechatPublicMgmt/replyMessageTemplateMgmt/deleteParam.ajax',
                data: params,
                success: function(result) {
                    if (result.error === 0) {
                        _this.getTableData();
                        _this.showDialog('delete', 'info', false, result.msg);
                    } else {
                        _this.showDialog('delete', 'info', true, result.msg);
                    }
                }
            });
        },
        uploadFile: function () {
            var imageData = $('#uploadFileInput').get(0).files[0];
            if (!imageData) {
                this.showDialog('operate', 'info', true, '未选择图片');
                return;
            }
            var formdata = new FormData();
            formdata.append('file', imageData);
            formdata.append('systemType', this.system);
            this.loadingShow = true;
            // var params={}
            // params.systemType =this.system;
            $.post({
                url: '/publicConfig/wechatPublicMgmt/replyMessageTemplateMgmt/upload.ajax',
                cache: false,
                data:formdata,
                processData: false,
                contentType: false,
                success: function (result) {
                    if (result.error === 0) {
                        // this.picUrl = result.data;
                        // $('#uploadInput').val(this.picUrl);
                        console.log(result.data);
                        this.mediaId=result.data;
                        // this.showDialog('operate', 'info', false, '上传成功');
                    }else{
                        this.showDialog('operate', 'info', true, result.msg);
                    }
                }.bind(this),
                complete: function () {
                    this.loadingShow = false;
                }.bind(this)
            });
        },
        uploadFile1: function () {
            var imageData = $('#uploadFileInput1').get(0).files[0];
            if (!imageData) {
                this.showDialog('revise', 'info', true, '未选择图片');
                return;
            }
            var formdata = new FormData();
            formdata.append('file', imageData);
            formdata.append('systemType', this.system);
            this.loadingShow = true;
            // var params={}
            // params.systemType =this.system;
            $.post({
                url: '/publicConfig/wechatPublicMgmt/replyMessageTemplateMgmt/upload.ajax',
                cache: false,
                data:formdata,
                processData: false,
                contentType: false,
                success: function (result) {
                    if (result.error === 0) {
                        // this.picUrl = result.data;
                        // $('#uploadInput').val(this.picUrl);
                        console.log(result.data);
                        this.mediaId=result.data;
                        // this.showDialog('operate', 'info', false, '上传成功');
                    }else{
                        this.showDialog('revise', 'info', true, result.msg);
                    }
                }.bind(this),
                complete: function () {
                    this.loadingShow = false;
                }.bind(this)
            });
        },
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
    },
    filters:{
        msgType: function (item) {
            if (item) {
                return item.replace(/0/g, '文本(TEXT)').replace(/1/g, '音频(AUDIO)').replace(/2/g, '图文(ARTICLE)').replace(/4/g, '图片(IMAGE)')
            }
        },
       
    }
});