// 多个分页器的类
// class Page {
//     constructor(option) {
//         console.log(option)
//         for (let key in option) {
//             this[key] = option[key];
//         }
//         // this.currentIndex = 0;
//         // this.maxSpace = 5;
//         // this.totalPage =0;
//         // this.pageMaxNum = 10;
//     }
//     // method(fn, arg) {
//     //     fn(arg);
//     // }
// };
// 使用剪切图片插件
Vue.use(window['vue-cropper']);
var vm = new Vue({
    el: '#content',
    data: function () {
        this.editor = null //富文本
        return {
            // page1: new Page({
                startTime: '', //开始时间
                endTime: '', //结束时间
                isSeparate: {
                    value: 'N',
                    checked: false
                }, //y时段UA单独统计n时段UA不单独统计
                searchKey: '', //搜索关键字
                materialType: '', //内容分类
                searchMaterialTitle: '', //内容名称搜索
                tableData: [],
                productData: [], //已有的产品数据
                currentIndex: 0,
                maxSpace: 5,
                totalPage: 0,
                pageMaxNum: 10,
                // method: function (currentIndex) {
                //     this.getTableData1(currentIndex)
                // }.bind(this)
            // }),
            // page2: new Page({
                currentIndex2: 0,
                maxSpace2: 5,
                totalPage2: 0,
                pageMaxNum2: 10,
                pvData: [],
                // method: function (currentIndex) {
                //     this.getPvData(currentIndex)
                // }.bind(this)
            // }),
            // vue-cropper的配置项
            option: {
                img: '',
                size: 1,
                full: false,
                outputType: 'png',
                canMove: true,
                fixedBox: false,   // 20220408修改，可以自定义拖动大小
                original: false,
                canMoveBox: true,
                autoCrop: true,
                // 只有自动截图开启 宽度高度才生效
                autoCropWidth:200,
                autoCropHeight:200,
                centerBox: false,
                high: true,
                max: 99999
            },
            shareTitle: '',
            previews: {}, //剪切预览
            limitSize: 100, //compress压缩文件的最大kb
            modifyStatus:0,
            diaMsg: '',
            shareCoverImage: '', //图片
            riskWarning: '', //专题底部文字
            status: '',
            updateId: '', //用做判断
            userTypeList: [], //用户类型枚举
            roleId: '',
            channelList: [], //渠道一级枚举数据
            channelData: '', //单个一级渠道数据
            channeSublList: [], //渠道二级级枚举数据
            channelSubData: '', //单个二级渠道数据
            pvFundCode: '', //获取pv产品代码值
            contentTypeData: [], //内容分类枚举数据
            addCategoryType: '', //添加弹窗的内容分类addMaterialType
            materialType: '', //查询的内容分类
            addproductData: [], //选择产品
            messageType: [{
                value: 'FILE',
                name: '文件',
                checked: false
            }, {
                value: 'WORD',
                name: '文字',
                checked: false
            }, {
                value: 'PIC',
                name: '图片',
                checked: false
            }, {
                value: 'LINK',
                name: '链接',
                checked: false
            }],
            addMessageType: {
                value: 'N',
                checked: false
            },
            contentType: 'FILE', //内容类型
            fileName: '',
            showTipText: false,
            // 预览图片列表
            imagesUrl: [],
            delImgIndex: "",
            // 上传文件
            uploadingFile: {
                name: '',
                progressRate: ''
            },
            fundCode:'',
            fundName: '',
            contentDescription:'',
            rankingIndex: "",
            fileUrl: '',
            imageUrl: [],
            posterDate: '',
            linkUrl: '',
            videoUrl: '',
            word: '',
            showText:'数据加载中...',
            modifyId: '',
            delImageUrl:'',
            typeFile:'',
        }
    },
    created: function () {
        // 获取查询条件内容分类类型枚举数据
        // 获取查询条件内容分类类型枚举数据
        // contentType(){
        var _this = this;
        $.post({
            url: '/advertising/productMaterialMgmt/contentList/getContentType.ajax',
            success: function (result) {
                if (result.error === 0) {
                    console.log("内容分类枚举类型:", result);
                    _this.contentTypeData = result.data.body;
                } else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });
        // },
    },
    mounted: function () {
        var dialogs = ['info', 'del', "selectAuthor"];
        var _this=this;
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
            format: 'YYYY-MM-DD', //use this option to display seconds
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
        // var E = window.wangEditor;
        // var editor = new E('#wangEditor')
        // editor.config.onchange = (newHtml) => {
        //     // console.log(newHtml);
        //     this.riskWarning= newHtml.replace(/target="_blank"/g, "");
        //     // this.operateData.content = newHtml.replace(/target="_blank"/g, "");
        // }
        // // 或者 const editor = new E( document.getElementById('div1') )
        // editor.config.height = 500
        // editor.config.showFullScreen = false //关闭全屏功能
        // // editor.config.uploadImgServer = `${this.baseUrl}/uploadImage.ajax` //图片上传地址
        // editor.config.uploadImgMaxLength = 1 //最大同时上传图片数
        // editor.config.uploadImgTimeout = 15000 //上传图片等待时间
        // editor.config.customUploadImg = this.customUploadImg;
        // editor.config.excludeMenus = [
        //     'video'
        // ]
        // editor.create()
        // this.editor = editor;
        this.getTableData1(0);
        

        // 查询
        var fundArr = ["fundGroupsList"];
        fundArr.forEach(function (value) {
            $('#' + value).chosen({
                search_contains:true,
                no_results_text: '未找到相关基金信息',
                disable_search_threshold:6,
                width: '175px'
            });
        });
        $('#fundGroupsList').on('change', function (e, params) {
            _this.fundCode = params ? params.selected : '';
        });
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

        pageList2: function () {
            var arr = [];
            if (this.totalPage2 <= 2 * this.maxSpace2) {
                for (var i = 0; i < this.totalPage2; i++) {
                    arr.push(i + 1);
                }
                return arr;
            }
            if (this.currentIndex2 > this.maxSpace2 && this.totalPage2 - this.currentIndex2 > this.maxSpace2) {
                for (var i = this.currentIndex2 - this.maxSpace2; i < this.currentIndex2 + this.maxSpace2; i++) {
                    arr.push(i + 1);
                }
            } else if (this.currentIndex2 <= this.maxSpace2 && this.totalPage2 - this.currentIndex2 > this.maxSpace2) {
                for (var i = 0; i < this.currentIndex2 + (2 * this.maxSpace2 - this.currentIndex2); i++) {
                    arr.push(i + 1);
                }
            } else if (this.currentIndex2 > this.maxSpace2 && this.totalPage2 - this.currentIndex2 <= this.maxSpace2) {
                var space = this.totalPage2 - this.currentIndex2;
                for (var i = this.currentIndex2 - (2 * this.maxSpace2 - space); i < this.totalPage2; i++) {
                    arr.push(i + 1);
                }
            } else {
                for (var i = 0; i < this.totalPage2; i++) {
                    arr.push(i + 1);
                }
            }
            return arr;
        },
        //主表格分页方法
        // prev: function (fn) {
        //     return function () {
        //         if (this.currentIndex <= 0) {
        //             return;
        //         }
        //         this.method(this.currentIndex - 1);
        //         // this.method(fn, this.currentIndex - 1);
        //     }
        // },
        // next: function (fn) {
        //     return function () {
        //         if (this.currentIndex >= this.totalPage - 1) {
        //             return;
        //         }
        //         this.method(this.currentIndex + 1);
        //         // this.method(fn, this.currentIndex + 1);
        //     }
        // },
        // changeIndex: function (fn) {
        //     return function (index) {
        //         // this.method(fn, index - 1);
        //         this.method(index - 1);
        //     }
        // },
        // toFirst: function (fn) {
        //     return function () {
        //         // this.method(fn, 0);
        //         this.method(0);
        //     }
        // },
        // toLast: function (fn) {
        //     return function () {
        //         // this.method(fn, this.totalPage - 1);
        //         this.method(this.totalPage - 1);
        //     }
        // },


    },
    watch: {
        // 20220408截图大小根据内容分类不同，修改 S
        addCategoryType() {
            console.log('this.addCategoryType=', this.addCategoryType)
            // 海报：220＊391，
            // 视频：690＊388
            // 其他：200*200
            // {"code":"YXHB","level1Name":"基础材料","level2Name":"营销海报"},//--220*391
            // {"code":"YXYYT","level1Name":"基础材料","level2Name":"营销一页通"},//--220*391
            // {"code":"CT","level1Name":"基础材料","level2Name":"长图"},//--220*391
            // {"code":"SZY","level1Name":"基础材料","level2Name":"三折页"},//--220*391
            // {"code":"DB","level1Name":"基础材料","level2Name":"垫板"},//--220*391
            // {"code":"DX","level1Name":"基础材料","level2Name":"短信"},//--220*391
            // {"code":"ZYYB","level1Name":"基础材料","level2Name":"专业研报"},//--200*200
            // {"code":"YXPPT","level1Name":"基础材料","level2Name":"营销PPT"},//--220*391
            // {"code":"YXSP","level1Name":"视频资料","level2Name":"营销视频"},//--690*388
            // {"code":"JJJL","Lev"level1Name":"视频资料","level2Name":"基金经理视频"},//--690*388
            // {"code":"MTBD","level1Name":"媒体报道","level2Name":"媒体报道"},//--220*391
            let mappingImgObj =[
                {autoCropWidth: 220, autoCropHeight: 391},
                {autoCropWidth: 690, autoCropHeight: 388},
                {autoCropWidth: 200, autoCropHeight: 200},
            ]
            let contentTypeFlag = 2;
            if (['YXHB'].includes(this.addCategoryType)) {
                this.option.autoCropWidth = 200;
                this.option.autoCropHeight = 391;
            } else if(['YXSP', 'JJJL'].includes(this.addCategoryType)){
                this.option.autoCropWidth = 690;
                this.option.autoCropHeight = 388;
            }else {
                this.option.autoCropWidth = 200;
                this.option.autoCropHeight = 200;
            }
        },
        // 20220408截图大小根据内容分类不同，修改 E

        // 'page1.pageMaxNum': {
        //     handler: function () {
        //         // this.getTableData1(0);
        //     }
        // },
        pageMaxNum: function () {
            this.getTableData1(0);
        },
        // 渠道二级选择哪个
        channelData: function () {
            for (var i = 0; i < this.channelList.length; i++) {
                if (this.channelData == this.channelList[i].agencyLvl1Id) {
                    this.channeSublList = this.channelList[i].agencyTwoList;
                    // this.channelSubData = this.channelList[i].agencyTwoList[0].agencyLvl2Id;
                }
                if (!this.channelData) {
                    this.channelSubData = '';
                    this.channeSublList=[];
                    this.$set(this.channeSublList);
                }
            }
        },

        fundCode: function () {
            var _this = this;
            console.log(_this.fundCode);
            console.log(_this.modifyStatus);
            var resultOne = this.productData.some(function (item) {
                if (item.fundCode == _this.fundCode) {
                    _this.fundName = item.fundName;
                    return true;
                }
            })
            // if(resultOne==true){
            //     this.showDialog('add', 'info', true, '产品代码已存在');
            //     return false;
            // }
        },

        // addCategoryType(){
        //     var _this=this;
        //     for(var i=0; i<_this.contentTypeData.length;i++){
        //        return _this.addCategoryType=this.contentTypeData[0].code;
        //     }
        // },

        // roleId() {
        //     var _this = this;
        //
        //     _this.addproductData.some((item) => {
        //         if (item.fundCode == _this.roleId) {
        //             _this.fundName = item.fundName;
        //             return true;
        //         }
        //     })
        // },
        // addCategoryType() {
        //     if (this.addCategoryType == 'DX' || this.addCategoryType == 'MTBD') {
        //         var _this = this;
        //         $.each(_this.messageType, function (index, item) {
        //             item.checked = false;
        //         })
        //
        //     }
        // }
    },
    methods: {

        moment: moment,
        // 鼠标放至物料包状态右侧的注释按钮上时
        showTips() {
            // this.showTipText=true;
            $("#showTipText").show()
        },
        showLeave() {
            // this.showTipText=false;
            $("#showTipText").hide()
        },
        //时段UA选择
        uaSelect() {
            this.isSeparate.checked = !this.isSeparate.checked;
            if (this.isSeparate.value == 'N') {
                this.isSeparate.value = 'Y'
            } else {
                this.isSeparate.value = 'N'
            }
        },
        // 选择信息类型
        messageTypeSelect(item, index) {
            var _this = this;
            $.each(_this.messageType, function (index, item) {
                item.checked = false;
            })
            _this.messageType[index].checked = true;
            _this.contentType = _this.messageType[index].value;
            console.log(_this.contentType)
        },
        //开关状态
        changeStatus(item, index) {
            console.log(item);
            var _this = this;
            //ajax后执行
            if (this.tableData[index].status == 'Y') {
                this.$set(this.tableData[index], 'status', 'N')
                _this.switchUpdate(item.id, this.tableData[index].status);
            } else {
                this.$set(this.tableData[index], 'status', 'Y')
                _this.switchUpdate(item.id, this.tableData[index].status);
            }
        },
        // 内容列表修改内容的状态-开关
        switchUpdate(id, status) {
            var _this = this;
            var params = {};
            params.materialId = id;
            params.enableFlag = status;
            console.log(params);
            $.post({
                url: '/advertising/productMaterialMgmt/contentList/switchUpdate.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        // _this.tableData = result.data;
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        fakeDel(ty,index){

            if(ty=='file'){
                this.fileUrl=''
            }else if(ty=='img'){
                this.shareCoverImage=''
                this.option.img=''
            }else if(ty=='3'){
            
                this.imagesUrl.splice(index, 1)
                this.imageUrl.splice(index, 1)
                console.log('点击删除后的this.imagesUrl=======',this.imagesUrl)
                console.log('点击删除后的this.imageUrl========',this.imageUrl)
            }
        },
         //删除预览的多图
         delImg(imageUrl,typeFile) {
            this.typeFile=typeFile
            this.showDialog('add', 'delImg', true);
            // this.delImgIndex = i;
            this.typeFile=typeFile
            if(imageUrl&&typeFile!=="3"){
                this.delImageUrl=imageUrl
                console.log(imageUrl)
            }
            
        },
        sureDelImg() {
            console.log(this.typeFile)
            // this.imagesUrl.splice(this.delImgIndex, 1);
            if(this.typeFile==='1'){
                this.delFile(this.delImageUrl)
            }else if(this.typeFile==='2'){
                this.delFile(this.fileUrl)
            }else if(this.typeFile==='3'){
                this.delFile(this.shareCoverImage)
            }
            this.showDialog('delImg', 'add', false);
        },
        // 删除文件/图片
        // delFile(fileUrl){
        //     var _this=this
        //     let params={}
        //     params.fileUrl=fileUrl
        //     console.log(params)
        //     $.post({
        //         url: '/advertising/productMaterialMgmt/contentList/delFile.ajax',
        //         data: params,
        //         success: function (result) {
        //             if (result.error === 0) {
        //                 // _this.tableData = result.data;
        //                 _this.showDialog('add', 'info', fasle, result.msg);
        //             } else {
        //                 _this.showDialog('add', 'info', true, result.msg);
        //             }
        //         }
        //     });
        // },
        // 获取产品列表已经存在的产品代码，防止在添加和修改操作冲突验证
        productList() {
            var _this = this;
            $.post({
                url: '/advertising/productMaterialMgmt/productList/getProductList.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        console.log("产品列表", result)
                        _this.productData = result.data.body;
                        _this.addproductData = result.data.body;

                        var str = '';
                        result.data.body.forEach(function(item) {
                            str += '<option value="' + item.fundCode + '">' + item.fundCode + '-' + item.fundName + '</option>';
                        });
                        var fundArr = ["fundGroupsList"];
                        fundArr.forEach(function (value) {
                            $('#' + value).html('<option value=""></option>' + str);
                            $('#' + value).trigger('chosen:updated');
                        });
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },

        // 主表格数据
        getTableData1: function (currentIndex) {
            //   console.log(currentIndex);
            var _this = this;
            _this.tableData = [];
            var params = {};
            params.searchKey = this.searchKey;
            params.startTime = this.startTime;
            params.endTime = this.endTime;
            params.page = currentIndex + 1;
            params.size = this.pageMaxNum;
            params.isSeparate = this.isSeparate.value;
            params.materialType = this.materialType;
            params.searchMaterialTitle = this.searchMaterialTitle;
            console.log(params);
            $(".cover").show();
            _this.tableData=[];
            $.post({
                url: '/advertising/productMaterialMgmt/contentList/getTableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        $(".cover").hide();
                        _this.currentIndex = currentIndex;
                        _this.totalPage = Math.ceil(result.data.body.total / params.size);
                        _this.tableData = result.data.body.data ? result.data.body.data : [];
                        // _this.tableData = result.data.body.data.sort(function(a,b){
                        //     return a.createTime-b.createTime;
                        // });
                    } else {
                        $(".cover").hide();
                        _this.showText='暂无数据';
                        _this.tableData = [];
                        _this.currentIndex = 0;
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });

        },
        // 分享标题超过字数
        change() {
            if (this.shareTitle.length > 26) {
                let str = this.shareTitle.substr(0, 26);
                this.shareTitle = str;
            }
        },
        clearAddDia: function (item) {
            this.fundCode = item ? item.fundCode : '';
            this.fundName = item ? item.fundName : '';
            this.status = item ? item.status : 'N';

        },
        showAdd: function () {
           
            this.productList()
            this.messageType.forEach(function(obj){
                obj.checked=false;
            })
            this.modifyStatus = 0;
            $("#fundGroupsList").css("display",'none');
            $('#fundHide').css('display','none');
            $('#fundGroupsList_chosen').css('display','block');
            this.clearAddDia();
            this.updateId = '';
            this.fundCode = '';
            this.shareTitle = '';
            this.option.img = ''; //显示图片
            this.addCategoryType = this.contentTypeData[0].code; //内容分类默认选择第一个
            // this.editor.txt.clear(); //清空wangeditor富文本的缓存内容


            // this.messageType[0].checked = true; //默认内容分类-信息-类型选择第一个

            this.imageUrl = [] //清空多图
            this.fileUrl="";
            this.rankingIndex='';
            this.contentDescription='';
            this.uploadingFile.name='';
            this.contentType='';
            this.posterDate='';
            this.word='';
            this.linkUrl='';
            this.imagesUrl=[];
            this.showDialog('', 'add')

        },
        add: function () {
            var _this = this;
            this.productList();
            // $("#fundGroupsList").css("display",'none')
            // $('#fundGroupsList_chosen').css('display','block'); //这是插件的节点-不是页面的
            // $('.chosen-single').css('top','-3rem');
            // $('#fundHide').css('display','none');
               
            if(this.shareCoverImage==''){
                this.showDialog('add', 'info', true, '请上传图片');
                return false;
            } 
            if(this.contentType=="FILE"||!this.contentType){
                if(this.fileUrl==''){
                this.showDialog('add', 'info', true, '请上传文件');
                return false;
            }
            }
            if(this.addCategoryType=='MTBD'&&this.contentType=="PIC"){
                console.log('this.imagesUrl.length',this.imagesUrl.length)
                if(this.imagesUrl.length==0){
                    this.showDialog('add', 'info', true, '请上传内容图片');
                    return false;
                } 
            }
           
            var params = {};
            var api = 'add';
            if (this.updateId) {
                params.fundCode = this.updateId;
                api = 'update';
            } else {
                params.fundCode = this.fundCode;
                var resultOne = _this.productData.some(function (item) {
                    if (item.fundCode == params.fundCode) {
                        return true;
                    }
                })
                // if (!this.fundCode) {
                //     _this.showDialog('add', 'info', true, '请选择产品');
                //
                //     return false;
                // }
                if (!_this.fundCode) {
                    _this.showDialog('add', 'info', true, '请选择产品');
                    return false;
                }
                
                if (!this.shareTitle) {
                    _this.showDialog('add', 'info', true, '请输入内容标题');
                    return false;
                }
                if (!this.rankingIndex) {
                    _this.showDialog('add', 'info', true, '请输入排序值');
                    return false;
                }
                // 除了媒体报道，其他分类不需要选择的
                if (this.addCategoryType=="MTBD"&&!this.contentType) {
                   _this.showDialog('add', 'info', true, '请选择类型');
                    return false;
                }
                
            }
            //    category: "string",
            //   "contentType": "FILE",
            //   "coverImageUrl": "string",
            //   "fileUrl": "string",
            //   "fundCode": "string",
            //   "imageUrl": [
            //     "string"
            //   ],
            //   "linkUrl": "string",
            //   "posterDate": "string",
            if (this.modifyId) {
                params.id = this.modifyId
            }
            params.fundName = this.fundName;

            if(this.addCategoryType=='YXHB'){
                params.posterDate = this.posterDate;  //海报日期
            }else{
                params.posterDate ='';  //海报日期
            }
            params.title = this.shareTitle;      //内容名称标题
            params.contentDescription=this.contentDescription;//内容描述
            params.category = this.addCategoryType;  //内容分类
            if(_this.addCategoryType=='MTBD'){
               if(!_this.contentType) {
                   _this.showDialog('add', 'info', true, '请选择类型');
                    return false;
                }
            }
            if(_this.addCategoryType=='MTBD'){
                params.contentType = _this.contentType;   //contentType内容类型：文件、文字、图片、链接、视频
            }else {
                params.contentType ='FILE';   //和后端沟通默认传'FILE',或者null
            }
            params.coverImageUrl = this.shareCoverImage; //封面图片
            params.riskWarning = this.riskWarning; //富文本
            params.status = this.status;
            params.rankingIndex =Number(this.rankingIndex) ; //排序值-int型
            params.fileUrl = this.fileUrl;     //内容文件（内容类型为文件）单文件
            params.videoUrl = this.videoUrl;   //媒体报道-视频类型

            console.log("1点击保存的imagesUrl=",_this.imagesUrl)
            console.log("2点击保存的imageUrl=",_this.imageUrl)


            // if(_this.imageUrl.length>0){

            //     params.imageUrl = _this.imageUrl;   //内容图片（内容类型为图片）多图片[]
            // }else{

            //     params.imageUrl = _this.imagesUrl;
            // }
            params.imageUrl = _this.imagesUrl;
            console.log("3点击保存的imageUrl=", params.imageUrl)

            params.linkUrl = this.linkUrl;     //媒体报道-链接类型
            params.word = this.word;           //媒体报道-文字类型

            console.log(params);
            $.post({
                url: '/advertising/productMaterialMgmt/contentList/' + api + '.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData1(0);
                        _this.modifyId = ''
                        _this.showDialog('add', 'info', false, result.msg);
                    } else {
                        _this.showDialog('add', 'info', true, result.msg);
                    }
                }
            });
        },
        //点击修改主页面内容
        modify: function (item) {
            var _this = this;
            _this.uploadingFile.name ='';
            if(item.fundCode){
                $('#fundGroupsList_chosen').css('display','none');
                $('#fundHide').css('display','block');
            }
            _this.messageType.forEach(function(obj){
                obj.checked=false;
            })
            _this.fileName='';
            _this.modifyStatus = 1;
            _this.modifyId = item.id;
            _this.clearAddDia(item);
            _this.updateId = item.fundCode;
            _this.fundCode=item.fundCode;  //产品代码
            _this.addCategoryType=item.category;  //内容分类
            _this.shareTitle = item.title;      //内容名称标题
            var params = {};

            params.materialId = item.id;
            // 查询单个产品信息
            console.log(params);
            $.post({
                url: '/advertising/productMaterialMgmt/contentList/searchSingle.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        console.log("查询单个内容信息", result.data);
                        _this.fundCode=result.data.body.fundCode;
                        _this.contentDescription=result.data.body.contentDescription;
                        _this.rankingIndex=result.data.body.rankingIndex;
                        let isnum = /^\d+$/.test(result.data.body.posterDate);
                        _this.posterDate=isnum?_this.transformTime(result.data.body.posterDate):'';
                        if(result.data.body.fileUrl!=='string'){
                            _this.fileUrl = result.data.body.fileUrl;
                        }               
                        if(result.data.body.coverImageUrl!=='string'){
                             _this.shareCoverImage=result.data.body.coverImageUrl;
                             _this.option.img = result.data.body.coverImageUrl; //显示图片
                        }
                       
                        _this.contentType=result.data.body.contentType;
                        _this.word=result.data.body.word;
                        _this.linkUrl=result.data.body.linkUrl;

                        _this.imagesUrl=[];
                        result.data.body.imageUrls.forEach(function(item){  //预览图片用
                            _this.imagesUrl.push(item.imageUrl);
                        });
                       
                        console.log('imagesUrl',_this.imagesUrl);

                        // this.$nextTick(() => {   //类型为
                        //     _this.imagesUrl.push(e.target.result)
                        // })

                        console.log(_this.contentType);
                        console.log(_this.messageType);
                        for(var i=0; i<_this.messageType.length;i++){
                            if(_this.contentType==_this.messageType[i].value){
                                _this.messageType[i].checked = true;
                            }
                        }
                        _this.$set(_this.messageType);

                        // _this.shareCoverImage = result.data.body.shareCoverImage;
                        // _this.editor.txt.html(result.data.body.riskWarning);
                    } else {
                        _this.showDialog('add', 'info', false, result.msg);
                    }
                }
            });
            this.showDialog('', 'add');
        },
        // 删除
        deleteDate(item) {
            var _this = this;
            var params = {};
            params.materialId = item.id;
            console.log(params);
            $.post({
                url: '/advertising/productMaterialMgmt/contentList/deleteParam.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData1(0);
                        _this.showDialog('', 'info', true, result.msg);
                    } else {
                        _this.showDialog('', 'info', true, result.msg);
                    }
                }
            });
        },
        // 点击PV
        showPV(item) {
            var _this = this;
            this.showDialog('', 'pv');
            this.channelData='';  //一级渠道清空
            this.channelSubData='';  //先清空
            this.pvFundCode = item.id;
            this.getPvData(0, this.pvFundCode);
            this.getUserType();
            this.getChannel();
        },
        // 点击UV
        showUV(item) {
            var _this = this;
            this.showDialog('', 'pv');
            this.pvFundCode = item.id;
            this.channelData='';     //一级渠道清空
            this.channelSubData='';  //先清空
            this.getPvData(0, this.pvFundCode);
            this.getUserType();
            this.getChannel();
        },
        // 点击PV弹窗里查询按钮
        searchPvData() {
            this.getPvData(0, this.pvFundCode);
        },
        // 获取PV/UV弹窗里的用户类型
        getUserType() {
            var _this = this;
            $.post({
                url: '/advertising/productMaterialMgmt/contentList/getUserParam.ajax',
                // data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.userTypeList = result.data.body;
                        console.log("用户类型", _this.userTypeList)
                    } else {
                        _this.showDialog('', 'info', true, result.msg);
                    }
                }
            });
        },
        // 获取PV/UV弹窗里的渠道
        getChannel() {
            var _this = this;
            $.post({
                url: '/advertising/productMaterialMgmt/contentList/getChannel.ajax',
                // data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.channelList = result.data.body;
                        console.log("渠道:", _this.channelList)
                    } else {
                        _this.showDialog('', 'info', true, result.msg);
                    }
                }
            });
        },
        // 获取弹窗数据
        getPvData: function (currentIndex, id) {
            //   console.log(currentIndex);
            var _this = this;
            var params = {};
            _this.pvData=[];
            params.materialId = id;
            params.page = currentIndex + 1;
            params.size = this.pageMaxNum2;
            params.userType = this.roleId;
            if(this.channelSubData){
              params.channelCode = this.channelData+'-'+this.channelSubData; //一级加二级渠道
            }else{
              params.channelCode = this.channelData; //一级渠道
              }
            params.isSeparate = this.isSeparate.value;
            params.endTime = this.endTime;
            params.startTime = this.startTime;
            console.log(params);
            $(".cover").show();
            $.post({
                url: '/advertising/productMaterialMgmt/contentList/getPvData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        $(".cover").hide();
                        _this.currentIndex2 = currentIndex;
                        _this.totalPage2 = Math.ceil(result.data.body.total / params.size);
                        _this.pvData = result.data.body.data?result.data.body.data:[];
                    } else {
                        $(".cover").hide();
                        _this.pvData = [];
                        _this.currentIndex2 = 0;
                        _this.showDialog('pv', 'info', false, result.msg);
                    }
                }
            });

        },
       
        // 提交表单
       
        //文件上传-进度条
        uploadsFile(e) {
            var _this = this;
            let file = e.target.files[0];
            this.uploadingFile.name = file.name;
            console.log("fileName===", file.name);
            var formdata = new FormData(); //创建formdata对象
            formdata.append('file', file);
            $(".cover").show();
            $.post({
                url: '/advertising/productMaterialMgmt/contentList/uploadImg.ajax',
                type: 'post',
                dataType: 'json',
                data: formdata,
                processData: false,
                contentType: false,
                xhr: function () {
                    var xhr = new XMLHttpRequest();
                    //使用XMLHttpRequest.upload监听上传过程，注册progress事件，打印回调函数中的event事件
                    xhr.upload.addEventListener('progress', function (e) {
                        //loaded代表上传了多少
                        //total代表总数为多少
                        _this.uploadingFile.progressRate = (e.loaded / e.total) * 100 + '%';
                        $('.g-progress').css('width', (e.loaded / e.total) * 100 + '%');
                    })
                    return xhr;
                },
                success: function (result) {
                    if (result.error === 0) {
                        $(".cover").hide();
                        // if (_this.addCategoryType == "JJJL" || _this.addCategoryType == "YXSP") {
                        //     _this.videoUrl = result.data.imageUrl
                        // } else {
                            // _this.fileUrl = result.data.imageUrl;
                        // }
                        _this.fileUrl = result.data.imageUrl;
                        
                        console.log(result.data.imageUrl);
                        //解决不能重复添加问题
                        $('#uploadsFile').attr('type', 'text')
                        $('#uploadsFile').attr('type', 'file')
                        _this.showDialog('add', 'info', true, result.msg);
                    } else {
                        _this.showDialog('add', 'info', true, result.msg);
                        //解决不能重复添加问题
                        $('#uploadsFile').attr('type', 'text')
                        $('#uploadsFile').attr('type', 'file')
                    }
                }
            })
             
        },
        // 本地图片上传
        uploadImg1(e, preview) {
            var _this = this
            // this.option.img
            var file = e.target.files[0];
            this.fileName = file.name;
            console.log("fileName===", this.fileName);
            if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
                alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
                return false
            }
            var reader = new FileReader()
            if (preview == 'preview') { // 多图预览并上传
                reader.readAsDataURL(e.target.files[0])
                reader.onload = (e) => {
                    // this.$nextTick(() => {
                    //     this.imagesUrl.push(e.target.result)
                    // })
                    console.log('imagesUrl', this.imagesUrl)
                    var formdata = new FormData();
                    formdata.append('file', file);
                     $(".cover").show();
                    $.post({
                        url: '/advertising/productMaterialMgmt/contentList/uploadImg.ajax',
                        // data: res.compressBase64,
                        cache: false,
                        data: formdata,
                        processData: false,
                        contentType: false,
                        success: function (result) {
                            if (result.error === 0) {  ////imagesUrl
                                // _this.imageUrl.push(result.data.imageUrl);
                                $(".cover").hide();
                                _this.imagesUrl.push(result.data.imageUrl);
                                console.log(_this.imageUrl);
                                _this.showDialog('add', 'info', true, result.msg);
                            } else {
                                _this.showDialog('add', 'info', true, result.msg);
                            }
                        }
                    });
                }
            } else { //上传图片
                reader.onload = (e) => {
                    let data
                    if (typeof e.target.result === 'object') {
                        // 把Array Buffer转化为blob 如果是base64不需要
                        data = window.URL.createObjectURL(new Blob([e.target.result]))
                    } else {
                        data = e.target.result
                    }
                    this.option.img = data
                }
                // 转化为base64
                // reader.readAsDataURL(file)
                // 转化为blob
                this.$refs.uploads.value='';
                reader.readAsArrayBuffer(file)
            }
        },
        uploadForServer() {
            // 输出裁剪过的blob
            var _this = this;
            this.$refs.cropper.getCropBlob(async (data) => {
                let [error, res] = await this.awaitWrap(compress(data, this.limitSize)); //获得压缩过的blob
                if (error) {
                    console.log(error);
                    return
                }
                console.log('res', res);
                // var fileName = res.compressFile.type;
                // var fileType = fileName.split('/')[fileName.split('/').length - 1];
                // if (fileType !== 'jpg' && fileType !== 'jpeg' && fileType !== 'png' && fileType !== 'gif') {
                //     this.showDialog('add', 'info', true, '上传文件格式错误,请上传图片文件');
                //     return;
                // }

                // res.compressFile['name']=this.fileName;

                var formdata = new FormData();

                let file = new File([res.compressFile], this.fileName);
                console.log(file);
                if (!file.name) {
                    _this.showDialog('add', 'info', true, '请选择要上传的图片!');
                    return false;
                }

                console.log(file.name);
                // console.log(file.size);

                formdata.append('file', file);
                $(".cover").show();
                $.post({
                    url: '/advertising/productMaterialMgmt/contentList/uploadImg.ajax',
                    // data: res.compressBase64,
                    cache: false,
                    data: formdata,
                    processData: false,
                    contentType: false,
                    success: function (result) {
                        if (result.error === 0) {
                            $(".cover").hide();
                            _this.shareCoverImage = result.data.imageUrl;
                            console.log(_this.shareCoverImage);
                            _this.showDialog('add', 'info', true, result.msg);
                            //解决不能重复添加问题
                            $('#uploads').attr('type', 'text')
                            $('#uploads').attr('type', 'file')
                        } else {
                            _this.showDialog('add', 'info', true, result.msg);
                            //解决不能重复添加问题
                            $('#uploads').attr('type', 'text')
                            $('#uploads').attr('type', 'file')
                        }
                    }
                });
                
            })
        },
        // 实时预览函数
        realTime(data) {
            this.previews = data
            // console.log(data)
        },
        // 导出主数据
        // exportAll() {
        //     var _this = this;
        //     var url;
        //     let currentIndex = this.currentIndex + 1;
        //     console.log(currentIndex);
        //     url = '/advertising/productMaterialMgmt/contentList/exportAll.ajax?currentIndex=' + currentIndex;
        //     window.location.href = url;
        // },

        exportAll() {
            var _this = this;
            var params={};
            params.searchKey = this.searchKey;  //产品名称代码
            params.materialType = this.materialType;  //内容分类
            params.searchMaterialTitle = this.searchMaterialTitle;  //内容名称搜索
            params.startTime = this.startTime;
            params.endTime = this.endTime;
            params.isSeparate = this.isSeparate.value;
            console.log(params);
              $.post({
                url: '/advertising/productMaterialMgmt/contentList/exportAll.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        console.log('----',result)
                        if(result.data.body==true){
                           _this.showDialog('', 'info', false, result.msg); 
                        }
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        }, 

        // 导出PV，UV弹窗数据
        // exportPvData() {
        //     var _this = this;
        //     var url;
        //     url = '/advertising/productMaterialMgmt/contentList/exportPvData.ajax?materialId=' + this.pvFundCode;
        //     window.location.href = url;
        // },

        exportPvData() {
            var _this = this;
            var params={};
            params.materialId = this.pvFundCode;
            params.userType = this.roleId;
            params.channelCode = this.channelSubData;
            params.isSeparate = this.isSeparate.value;
            params.endTime = this.endTime;
            params.startTime = this.startTime;
            console.log(params);
              $.post({
                url: '/advertising/productMaterialMgmt/contentList/exportPvData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        console.log('----',result)
                        if(result.data.body==true){
                           _this.showDialog('pv', 'info', false, result.msg); 
                        }
                    }
                    else {
                        _this.showDialog('pv', 'info', false, result.msg);
                    }
                }
            });
        },
        //公共方法
        awaitWrap(promise) { // await 异常处理包装
            return promise.then(res => [null, res], error => [error, null]);
        },
        verify: function () { // 校验

        },


        //主表格分页方法
        prev: function () {
            if (this.currentIndex <= 0) {
                return;
            }
            this.getTableData1(this.currentIndex - 1);
        },
        next: function () {
            if (this.currentIndex >= this.totalPage - 1) {
                return;
            }
            this.getTableData1(this.currentIndex + 1);
        },
        changeIndex: function (index) {
            this.getTableData1(index - 1);
        },
        toFirst: function () {
            this.getTableData1(0);
        },
        toLast: function () {
            this.getTableData1(this.totalPage - 1);
        },

        //弹窗表格分页方法
        prev2: function () {
            if (this.currentIndex2 <= 0) {
                return;
            }
            this.getPvData(this.currentIndex2 - 1,this.sourceMaterialType);
        },
        next2: function () {
            if (this.currentIndex >= this.totalPage2 - 1) {
                return;
            }
            this.getPvData(this.currentIndex2 + 1,this.sourceMaterialType);
        },
        changeIndex2: function (index) {
            this.getPvData(index - 1,this.sourceMaterialType);
        },
        toFirst2: function () {
            this.getPvData(0,this.sourceMaterialType);
        },
        toLast2: function () {
            this.getPvData(this.totalPage2 - 1,this.sourceMaterialType);
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

        transformTime(createTime) {
            if (createTime.toString().length == 10) {
                var date = new Date(Number(createTime) * 1000);
            } else if (createTime.toString().length == 13) {
                var date = new Date(Number(createTime));
            } else {
                return ''
            }
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let h = date.getHours()
            let i = date.getMinutes()
            let s = date.getSeconds();
            month = month < 10 ? '0' + month : month;
            day = day < 10 ? '0' + day : day;
            if (h < 10) {
                h = '0' + h;
            }
            if (i < 10) {
                i = '0' + i;
            }
            if (s < 10) {
                s = '0' + s;
            }
            // let dateT = year + '-' + month + '-' + day + " " + h + ':' + i + ':' + s
            let dateT = year + '-' + month + '-' + day ;
            return createTime?dateT:''
        },
    },
    components: {
        'date-picker': VueBootstrapDatetimePicker
    },
});