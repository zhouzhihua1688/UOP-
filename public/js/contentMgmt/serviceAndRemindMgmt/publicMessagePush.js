var vm = new Vue({
    el: '#content',
    data: function () {
        this.editor = null //富文本
        return {
            startTime: '', //开始时间
            endTime: '', //结束时间
            isSeparate: {
                value: 'N',
                checked: false
            }, //y时段UA单独统计n时段UA不单独统计
            searchKey: '', //搜索关键字
            tableData: [],
            productData: [],
            currentIndex: 0,
            maxSpace: 5,
            totalPage: 0,
            pageMaxNum: 10,
            condition: "",


            modifyStatus: 1,
            diaMsg: '',
            diaConentData: [{
                value: 'FILE',
                checked: false
            }, {
                value: 'FILE',
                checked: false
            }], //选择内容弹窗数据，
            modifyData: {
                // id: '',
                // popTitle:'',
                // popupId: '',
                // templateMessageName: "",
      
                // boundContentId: "",  //内容类型关联的内容ID 
                // contentType: "",    //内容类型：01-弹窗，02-其他 
                // pushStatus: "",   //推送状态
                // pushTime: "",    //推送时间
                // templateMessageId: "",  //内容标题ID
                // templateMessageOverview: "",  //内容概述
                // templateMessageRemarks: "",  //备注
                // templateMessageServiceName: "",  //服务名称
                // templateMessageServiceTime: "", //服务时间
                // templateMessageTitle: "",      //模板消息标题 

                weixinTemplateId:'',        //内容标题
                messageOverview:"",         //内容描述
                messageServiceName:"",     //服务名称
                messageRemarks:"",         //备注
                messageServiceTime:"",       // 页面弹窗内的  服务时间YY-MM-DD
                miniprogramAppId: "wxf52fad79d4bea13b",   // 添富赢家小程序appId
                pagePath: "",                 //小程序地址 
                pushTime: "",                // 页面弹窗内的推送时间
                scheduleTime: "",          //
                weixinContent: "",         // 

            },
            templateId:'' ,  //模板id
            popTitle:'',
            searchInfo: "",
            checkedId: [],
            popupList: [],
            forPopupTitle: '',
            templateMessageId: '',
            titleMessageOptions: [],
            contentType:'01',    //内容类型：01-弹窗，02-其他
            contentTypeArray: [{
                contentTypeText: '弹窗信息',
                contentType: "popUp",
            }],
            popupId: '',
            modifyDataPopupTitle: "",
            currentIndex2: 0,
            maxSpace2: 5,
            totalPage2: 0,
            pageMaxNum2: 10,
            inputValue:'',

            currentIndex3: 0,
            maxSpace3: 5,
            totalPage3: 0,
            pageMaxNum3: 10,

            // 点击内容+内容弹窗字段
            materialId:'',
            searchMaterialTitle:'',  //现有材料标题查询
            secondMaterial:'',//二级分类目录
            threeMaterial:'', //三级分类目录
            materialList:[],
            categoryConfigList:[],
            threeMaterialIdList:[], 
            searchMaterialList:[],
            checkFlag:false,   //手动选择内容
            getDialogUrl:'', //获取弹窗里确认的某条数据的url
            url:'',  //手动输入
            updateId:'',//修改数据id
            groupIdFlag:false,  //暂时用作测试客群用
            groupId:'',
            contentId:'', //内容Id
            ruleId:'',    //规则id-
        }
    },
    mounted: function () {
        var dialogs = ['info', 'del', "selectAuthor"];
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
        $("#cron").cronGen({
            direction: 'right'
        });
        $('#cronLabel').insertBefore($('.cronValue').eq(0));
        this.getTableData1(0);
        this.getTagAll();
        this.getMessageOptions()
        this.getPopupList(0)
    },
    computed: {
         //主表格假分页
         middleData: function () {
            var middleData = [];
            var filterData = [];
            var pageMaxNum = parseInt(this.pageMaxNum);
            var _this = this;
            _this.tableData.forEach(function (jsonObj) {
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

        pageList3: function () {
            var arr = [];
            if (this.totalPage3 <= 2 * this.maxSpace3) {
                for (var i = 0; i < this.totalPage3; i++) {
                    arr.push(i + 1);
                }
                return arr;
            }
            if (this.currentIndex3 > this.maxSpace3 && this.totalPage3 - this.currentIndex3 > this.maxSpace3) {
                for (var i = this.currentIndex3 - this.maxSpace3; i < this.currentIndex3 + this.maxSpace3; i++) {
                    arr.push(i + 1);
                }
            } else if (this.currentIndex3 <= this.maxSpace3 && this.totalPage3 - this.currentIndex3 > this.maxSpace3) {
                for (var i = 0; i < this.currentIndex3 + (2 * this.maxSpace3 - this.currentIndex3); i++) {
                    arr.push(i + 1);
                }
            } else if (this.currentIndex3 > this.maxSpace3 && this.totalPage3 - this.currentIndex3 <= this.maxSpace3) {
                var space = this.totalPage3 - this.currentIndex3;
                for (var i = this.currentIndex3 - (2 * this.maxSpace3 - space); i < this.totalPage3; i++) {
                    arr.push(i + 1);
                }
            } else {
                for (var i = 0; i < this.totalPage3; i++) {
                    arr.push(i + 1);
                }
            }
            return arr;
        },
    },
    watch: {
         // 假分页
         pageMaxNum: {
            handler: function (val, oldval) {
                this.currentIndex= 0;
            }
        },
        condition: {
            handler: function (val, oldval) {
                this.currentIndex= 0;
            }
        },
        // pageMaxNum: function () {
        //     this.getTableData1(0);
        // },
        pageMaxNum2: function () {
            this.getPopupList(0);
        },
        pageMaxNum3: function () {
            this.searchMaterialList(0);
        }
    },
    // created() {
    //     this.getMessageOptions()
    //     this.getPopupList(0)
    // },
    methods: {
        moment: moment,
        //暂时用作客群用
        checkGroupIdFlag:function(){
            var _this=this;
            _this.groupIdFlag=!_this.groupIdFlag;
        },
        // 获取内容弹窗一二级分类
        getTagAll:function(){
            // 获取一级二级分类
            var _this=this;
             $.post({
                 url:'/contentMgmt/serviceAndRemindMgmt/publicMessagePush/getTagAll.ajax',
                 data:{
                     parentCategoryId:''
                 },
                 success: function (result) {
                     if (result.error === 0) {
                         console.log(result.data);
                         _this.materialList=result.data.allTagList;  //现有材料弹窗数据
                         // 新增弹窗和查询
                         _this.classifyList=result.data.investTag;  //拿到所有一级分类菜单数据
                         _this.secondClassifyId=result.data.teachTag.categoryId;  //获取二级分类ID
                         console.log(_this.secondClassifyId)
                         //拿到三级分类数据
                         _this.menuList=result.data.menuList.ncmsContentCategoryConfigList.map(function(item){
                             item.checked=true;  //设置全部为true,选中
                             return item;
                         });
                     }else {
                         _this.classifyList=[];
                         _this.menuList=[];
                         _this.showDialog('', 'info', false,result.msg);
                     }
                    //  _this.getTableData(0);
                 }
             });
         },
           // 根据一级分类查询二级分类数据
        firstMaterialId:function(materialId,num){
            var _this=this; 
            _this.chooseMaterialId(materialId,num);  
        },
        // 根据二级分类查询三级分类数据
        secondMaterialId:function(secondMaterial,num){
            var _this=this;
            _this.chooseMaterialId(secondMaterial,num);
        },
        chooseMaterialId:function(materialId,num){
            var _this=this; 
            var params={}; 
            params.parentCategoryId=materialId;
            console.log(params);
            $.post({
                url: '/contentMgmt/serviceAndRemindMgmt/publicMessagePush/threeClassifyList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        console.log(result)
                            if(num==0){
                                _this.categoryConfigList=result.data.body.ncmsContentCategoryConfigList;//二级下拉框数据
                             }
                            else{
                                _this.threeMaterialIdList=result.data.body.ncmsContentCategoryConfigList; //三级下拉框数据
                            }
                        
                    }else {
                        _this.categoryConfigList = [];
                        _this.threeMaterialIdList = [];
                        _this.showDialog('materialShow', 'info', false, result.msg);
                    }
                }
            }); 
        },
        // 查询素材材料表格数据
        searchMaterial:function(currentIndex){
            var _this=this;
                var _this = this;
                var params = {};
                console.log(_this.threeMaterial);
                if(!_this.materialId&&!_this.secondMaterial&&!_this.threeMaterial){
                    _this.showDialog('materialShow', 'info', true, '请输入查询条件查询');
                    return false;
                }
                if(_this.materialId){
                    params.categoryId =_this.materialId; //一级分类ID    
                }
                if(_this.secondMaterial){
                    params.categoryId =_this.secondMaterial; //二级分类ID  
                }
                if(_this.threeMaterial){
                    params.categoryId =_this.threeMaterial; //三级分类ID  
                }
                if(currentIndex){
                    params.pageNo=currentIndex+1;
                }else{
                    params.pageNo=1; 
                }
                params.pageSize=_this.pageMaxNum3;
                params.title=_this.searchMaterialTitle;
                params.pushStatus='1';
                console.log(params);
                _this.searchMaterialList=[];
                $.post({
                    url: '/contentMgmt/serviceAndRemindMgmt/publicMessagePush/searchMaterial.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            console.log(result);
                            if(result.data.body) {
                                if(currentIndex){
                                    _this.currentIndex3 =currentIndex;
                                }else{
                                    _this.currentIndex3 =0;
                                }
                                _this.totalPage3 = Math.ceil(result.data.body.total / params.pageSize);
                                _this.searchMaterialList = result.data.body.rows?result.data.body.rows:[];
                            }
                        }else {
                            _this.searchMaterialList = [];
                            _this.showDialog('', 'info', false, result.msg);
                        }
                    }
                });      
        },
        // 内容素材弹窗点击X取消
        closeMaterialShow:function(){
           var _this=this;
           _this.showDialog('add', 'materialShow', true);
        },
        
        closeContentShow:function(){
            var _this=this;
            _this.showDialog('add', 'addContent', true);
         },

        // /api/模板消息标题选择项
        getMessageOptions() {
            var _this = this;
            let data = {}
            $.post({
                url: '/contentMgmt/serviceAndRemindMgmt/publicMessagePush/getMessageOptions.ajax',
                data,
                success: function (result) {
                    if (result.error === 0) {
                        _this.titleMessageOptions = result.data.body
                        console.log(_this.titleMessageOptions)
                    }
                }
            });
        },
        // 获取弹窗数据
        getPopupList(currentIndex) {
            var _this = this;
            this.popupList = []
            var params={}
            params.pageNo = currentIndex + 1;
            params.pageSize = this.pageMaxNum;
            params.title=this.forPopupTitle;
            console.log(params);
            $.post({
                url: '/contentMgmt/serviceAndRemindMgmt/publicMessagePush/getPopupList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        console.log('弹窗列表数据',result);
                        _this.popupList = result.data.body.rows;
                        // _this.popupList.forEach((item) => {
                        //     item.checked = false;
                        // })
                        _this.currentIndex2 = currentIndex;
                        _this.totalPage2 = Math.ceil(result.data.body.total /  params.pageSize);
                    } else {
                        _this.popupList = [];
                        _this.currentIndex2 = 0;
                        _this.showDialog('', 'info', false, result.msg);
                    }

                }
            });
        },
         // 确认选择当前素材材料确认
         checkMaterial:function(item){
            var _this=this;
            // _this.modifyData.boundContentId=item.mediaId;
            _this.getDialogUrl=item.url;
            _this.showDialog('materialShow', 'add');
         },
        // 确认弹窗为01的数据的列表内容
        checkContent:function(item){
           var _this=this;
        //    _this.modifyData.boundContentId=item.id;
           _this.getDialogUrl=item.mediaUrl;
           _this.showDialog('addContent', 'add');
        },
        // 手动选择内容
        checkHandel:function(){
            var _this=this;
            _this.checkFlag=!_this.checkFlag;
        },
          // 主表格数据
          getTableData1: function (currentIndex) {
            //   console.log(currentIndex);
            var _this = this;
            var params = {};
            // params.searchInfo = this.searchInfo;
            // params.startTime = this.startTime;
            // params.endTime = this.endTime;
            // params.isSeparate = this.isSeparate.value;
            // params.templateMessageId = this.templateMessageId;
            // params.pageNo = currentIndex + 1;
            // params.pageSize = this.pageMaxNum;
            params.ruleSource='tianfu';
            params.contentId = this.contentId;
            console.log(params)
            console.log(this.contentId)
            $.post({
                url: '/contentMgmt/serviceAndRemindMgmt/publicMessagePush/getTableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        console.log(result);
                        _this.currentIndex = currentIndex;
                        // _this.totalPage = Math.ceil(Number(result.data.body.length) / _this.pageMaxNum);
                        if (result.data.body) {  

                            _this.tableData= result.data.body.map(function(item){//处理拿到内容描述，服务名称，服务时间，备注
								console.log(item);
                                let text=item.templateList[0].content.replace(/\"/g,"").replace(/\{/g,"").replace(/\}/g,"").split(',')//处理拿到内容描述，服务名称，服务时间，备注
                                item.content=text[0];
                                item.templateMessageTitle='投顾服务通知';
                                 return item;
                            })
                            console.log(result.data.body)
                            // _this.tableData= result.data.body.map(function(item){
                            //     item.templateMessageTitle='投顾服务通知';
                            //     return item;
                            // });
                            // _this.tableData = result.data.body.filter(function (item) {
                            //     return item.ruleId.indexOf(params.contentId) > -1
                            // });
                            // let arr=[];
                            //    let arr= result.data.body.filter(function(item){
                            //         return item.ruleSource=='tianfu';
                            //     });
                            //     _this.tableData=arr.map(function(item){
                            //         item.templateMessageTitle=_this.titleMessageOptions[0].templateMessageTitle;
                            //         return item;
                            //     })             
                        }
                    } else {
                        _this.tableData = [];
                        _this.currentIndex = 0;
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });

        },

        showAdd: function () {
            var _this=this;
            this.modifyStatus = 0;
            this.modifyData = {
                // contentType: "popUp",
                // id: '',
                // popTitle:'',
                // popupId: '',
                // pushTime: '',
                // templateMessageId: "",
                // templateMessageName: "",
                // templateMessageOverview: "",
                // templateMessageRemarks: "",
                // templateMessageServiceName: "",
                // templateMessageServiceTime: "",
                // templateMessageTitle: "",
                weixinTemplateId:_this.titleMessageOptions[0].templateMessageId,        //内容标题
                messageOverview:"",         //内容描述
                messageServiceName:"",     //服务名称
                messageRemarks:"",         //备注
                messageServiceTime:'',       // 页面弹窗内的  服务时间YY-MM-DD
                miniprogramAppId: "wxf52fad79d4bea13b",   // 添富赢家小程序appId
                pagePath: "",                 //小程序地址 
                pushTime: "",                // 页面弹窗内的推送时间
                scheduleTime: "",          //
                weixinContent: "",         // 
                // pushStatus: "",   //推送状态
            }
            $('#cron').val("");
            $('.cronValue').eq(0).val("");

            // this.modifyData.pushTime=this.getNowtime();  //发布时间
            // this.modifyData.templateMessageServiceTime=this.getNowtime('ServiceTime'); //服务时间
            // this.modifyData.pushTime=nowtime.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1$2$3$4$5$6');  //发布时间
            // let serviceTime=this.getNowtime('ServiceTime')
            // this.modifyData.templateMessageServiceTime=serviceTime.replace(/(\d{4})-(\d{2})-(\d{2})/g, '$1$2$3'); //服务时间
            // this.clearAddDia();
            this.url = '';
            this.getDialogUrl = '';
            this.checkFlag = false;
            this.updateId = '';
            this.showDialog('', 'add')
            // this.getPopupList(0)
        },
        // 修改或者提交按钮
        SubmitBtn() {
            var _this = this;
            
        
            // if (!_this.modifyData.templateMessageOverview) {
            //     _this.showDialog('add', 'info', true, '内容概述不能为空');
            //     return false;
            // }
       
            // let data = _this.modifyData;
            // data['pushTime']=data.pushTime.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1$2$3$4$5$6');
            // data['templateMessageServiceTime']=data.templateMessageServiceTime.replace(/(\d{4})-(\d{2})-(\d{2})/g, '$1$2$3');

            if (!_this.modifyData.messageOverview) {
                this.showDialog('add', 'info', true, '内容描述不能为空');
                return false;
            }
            if(_this.checkFlag){
                if (!_this.url) {
                    this.showDialog('add', 'info', true, '选择内容不能为空');
                    return false;
                } 
            } else {
                if (!_this.getDialogUrl) {
                    this.showDialog('add', 'info', true, '选择内容不能为空');
                    return false;
                }
            }
            if (!_this.modifyData.messageServiceName) {
                 this.showDialog('add', 'info', true, '服务名称不能为空');
                 return false; 
            }
            if (!_this.modifyData.messageServiceTime) {
                this.showDialog('add', 'info', true, '服务时间不能为空');
                return false;
            }
            
            // let getUrl=_this.getDialogUrl?_this.getDialogUrl:_this.url;
            let getUrl= (_this.checkFlag?_this.url:_this.getDialogUrl);
            let first=_this.modifyData.messageOverview;
            let keyword1=_this.modifyData.messageServiceName;
            let keyword2=_this.modifyData.messageServiceTime;
            let remark=_this.modifyData.messageRemarks;
            _this.modifyData = { 
                weixinTemplateId:_this.modifyData.weixinTemplateId,        //内容标题
                messageOverview:_this.modifyData.messageOverview,         //内容描述
                messageServiceName:_this.modifyData.messageServiceName,     //服务名称
                messageRemarks:_this.modifyData.messageRemarks,         //备注
                messageServiceTime:_this.modifyData.messageServiceTime,       // 页面弹窗内的  服务时间YY-MM-DD
                miniprogramAppId: "wxf52fad79d4bea13b",   // 添富赢家小程序appId
                pagePath:"modules/fundEvaluation/pages/commonWebview/commonWebview?isEncode=1&url="+encodeURIComponent(getUrl),                 //小程序地址 
                pushTime:0,                // 页面弹窗内的推送时间
                scheduleTime:this.modifyData.scheduleTime,          //
                weixinContent:`{"first":"${first}","keyword1":"${keyword1}","keyword2":"${keyword2}","remark":"${remark}"}`,
                messageUrl:"modules/fundEvaluation/pages/commonWebview/commonWebview?isEncode=1&url="+encodeURIComponent(getUrl),  
            }
			console.log(_this.modifyData);
			// return 
            if(_this.groupIdFlag){   //暂时测试用
                _this.modifyData['groupId']='00366';
            }

            let data=_this.modifyData;
            console.log(data);

            if (this.modifyStatus == 0) { // 新增
                var url = `/contentMgmt/serviceAndRemindMgmt/publicMessagePush/add.ajax`
            } else { // 修改
                data['templdateId']=_this.templateId;
                var ruleId= _this.updateId ;
                var url = `/contentMgmt/serviceAndRemindMgmt/publicMessagePush/update.ajax`
            }
            $.post({
                url,
                data:{
                    setData:_this.modifyData,
                    ruleId:ruleId
                },
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData1(0)
                        _this.showDialog('add', 'info', false, result.msg);
                    } else {
                        _this.showDialog('add', 'info', true, result.msg);
                    }
                }
            });
        },

        showDialogContent:function(){
            var _this=this;
            if(_this.contentType=='01'){
                _this.showDialog('add', 'addContent');
            }else{
                _this.showDialog('add', 'materialShow');
            }
        },
        // 勾选选择内容的checkbox
        radioSelect(item, index) {
            this.popupList.forEach((item2, index2) => {
                item2.checked=false;
            }) 
            this.popupId = item.id
            this.modifyData.popTitle = item.title
            this.$set(this.popupList[index], 'checked', 'true')
        },
        surePopupId() {
            this.modifyData.popupId = parseInt(this.popupId)
            this.showDialog('addContent', 'add', false)
        },

        clearAddDia: function (item) {
            var _this=this;
            console.log(item);
            let getUrl=_this.getDialogUrl?_this.getDialogUrl:_this.url;
            let first=_this.modifyData.messageOverview=item.messageOverview;
            let keyword1=_this.modifyData.messageServiceName=item.messageServiceName;
            let keyword2=_this.modifyData.messageServiceTime=item.messageServiceTime;
            let remark=_this.modifyData.messageRemarks=item.messageRemarks;
            _this.modifyData = { 
                weixinTemplateId:item.weixinTemplateId,        //内容标题
                messageOverview:item.messageOverview,         //内容描述
                messageServiceName:item.messageServiceName,     //服务名称
                messageRemarks:item.messageRemarks,         //备注
                messageServiceTime:item.messageServiceTime,       // 页面弹窗内的  服务时间YY-MM-DD
                miniprogramAppId:item.miniprogramAppId,   // 添富赢家小程序appId
                pagePath:item.pagePath,                 //小程序地址 
                pushTime:0,                // 页面弹窗内的推送时间
                scheduleTime:item.scheduleTime,          //
                weixinContent:`{"first":"${first}","keyword1":"${keyword1}","keyword2":"${keyword2}","remark":"${remark}"}`,
                messageUrl: "modules/fundEvaluation/pages/commonWebview/commonWebview?isEncode=1&url="+encodeURIComponent(getUrl),       
            }
        },
        

        //点击修改主页面内容
        modify: function (item) {
            var _this = this;
            var params={}
             console.log(item)
            _this.modifyStatus = 1;

            let getListdetail=item.templateList[0].content.replace(/\"/g,"").replace(/\{/g,"").replace(/\}/g,"").split(',')//处理拿到内容描述，服务名称，服务时间，备注

            // let getUrl=_this.getDialogUrl?_this.getDialogUrl:_this.url;
           
            _this.getDialogUrl=item.templateList[0].pagePath;   //选择内容的地址
            // _this.url=item.templateList[0].pagePath;
            _this.getDialogUrl=decodeURIComponent(item.templateList[0].pagePath.replace(/.*?url\=(.*$)/g, '$1'));   //选择内容的地址

            let first=_this.modifyData.messageOverview=getListdetail[0];  //描述
            let keyword1=_this.modifyData.messageServiceName=getListdetail[1]; //服务名称
            let keyword2=_this.modifyData.messageServiceTime=getListdetail[2]; //服务时间
            let remark=_this.modifyData.messageRemarks=getListdetail[3];      //备注
            let weixinTemplateId=_this.titleMessageOptions[0].templateMessageId;  //内容标题-templateMessageId
       
            _this.modifyData = { 
                weixinTemplateId:weixinTemplateId,        //内容标题
                messageOverview:getListdetail[0],         //内容描述
                messageServiceName:getListdetail[1],     //服务名称
                messageRemarks:getListdetail[3],         //备注
                messageServiceTime:getListdetail[2],       // 页面弹窗内的  服务时间YY-MM-DD
                miniprogramAppId:'wxf52fad79d4bea13b',   // 添富赢家小程序appId
                pagePath:item.templateList[0].pagePath,                 //小程序地址 
                pushTime:0,                // 页面弹窗内的推送时间
                scheduleTime:item.schedulePushTime,          //
                weixinContent:`{"first":"${first}","keyword1":"${keyword1}","keyword2":"${keyword2}","remark":"${remark}"}`,
                messageUrl:item.templateList[0].pagePath,       
            }      
            // _this.clearAddDia(item);
            _this.checkFlag = false;
            _this.updateId = item.ruleId;
            _this.templateId=item.templateList[0].templateId;  //获取模板id
            this.showDialog('', 'add');
        },
        showDeleteDate:function(item){
            var _this=this;
            _this.ruleId=item.ruleId;
            this.showDialog('', 'del');  
        },
        deleteDate() {
            var _this = this;
            var params = {};
            params.ruleId = _this.ruleId;
            console.log(params);
            $.post({
                url: '/contentMgmt/serviceAndRemindMgmt/publicMessagePush/deleteParam.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData1(0);
                        _this.showDialog('del', 'info', false, result.msg);
                    } else {
                        _this.showDialog('del', 'info', false, result.msg);
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
            }else {
                return 
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
            let dateT = year + '-' + month + '-' + day + " " + h + ':' + i + ':' + s
            return dateT
        },
        // transformPushStatus(pushStatus){
        //     if (pushStatus=='Y'){
        //         return '已推送'
        //     }else if(pushStatus=='I'){
        //         return '推送中'
        //     }
        //     else if(pushStatus=='N'){
        //         return '未推送'
        //     }else if(pushStatus=='F'){
        //         return '推送失败'
        //     }
        // },
        transformType(contentType){
            if (contentType=='01'){
                return '弹窗'
            }else if(contentType=='02'){
                return '其他'
            }
        }, 
        transformPushStatus(pushStatus){
            if (pushStatus=='1'){
                return '已推送'
            }else if(pushStatus=='I'){
                return '推送中'
            }
            else if(pushStatus=='0'){
                return '未推送'
            }else if(pushStatus=='F'){
                return '推送失败'
            }
        },
           // 获取当前时间
           getNowtime(ServiceTime){
            var _this = this;
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let h = date.getHours();
            let i = date.getMinutes();
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
            if(ServiceTime){
                var dateT = year + '-' + month + '-' + day ;
            }else{
                var dateT = year + '-' + month + '-' + day + " " + h + ':' + i + ':' + s;
            }
            
            return dateT;
        },

        //现有材料表格分页方法
        prev3: function () {
            if (this.currentIndex3 <= 0) {
                return;
            }
            this.searchMaterialList(this.currentIndex3 - 1);
        },
        next3: function () {
            if (this.currentIndex3 >= this.totalPage3 - 1) {
                return;
            }
            this.searchMaterialList(this.currentIndex3 + 1);
        },
        changeIndex3: function (index) {
            this.searchMaterialList(index - 1);
        },
        toFirst3: function () {
            this.searchMaterialList(0);
        },
        toLast3: function () {
            this.searchMaterialList(this.totalPage3 - 1);
        },
        //弹窗表格分页方法
        prev2: function () {
            if (this.currentIndex2 <= 0) {
                return;
            }
            this.getPopupList(this.currentIndex2 - 1);
        },
        next2: function () {
            if (this.currentIndex2 >= this.totalPage2 - 1) {
                return;
            }
            this.getPopupList(this.currentIndex2 + 1);
        },
        changeIndex2: function (index) {
            this.getPopupList(index - 1);
        },
        toFirst2: function () {
            this.getPopupList(0);
        },
        toLast2: function () {
            this.getPopupList(this.totalPage2 - 1);
        },
        //主表格分页方法
         //主表格分页方法
        prev: function () {
            this.currentIndex<= 0 ? 0 : this.currentIndex--;
        },
        next: function () {
            this.currentIndex>= this.middleData.length - 1 ? this.middleData.length - 1 : this.currentIndex++;
        },
        changeIndex: function (index) {
            this.currentIndex= index - 1;
        },
        // prev: function () {
        //     if (this.currentIndex <= 0) {
        //         return;
        //     }
        //     this.getTableData1(this.currentIndex - 1);
        // },
        // next: function () {
        //     if (this.currentIndex >= this.totalPage - 1) {
        //         return;
        //     }
        //     this.getTableData1(this.currentIndex + 1);
        // },
        // changeIndex: function (index) {
        //     this.getTableData1(index - 1);
        // },
        // toFirst: function () {
        //     this.getTableData1(0);
        // },
        // toLast: function () {
        //     this.getTableData1(this.totalPage - 1);
        // },
        changeText:function(value){   //处理内容描述显示
            let getListdetail=value.replace(/\"/g,"").replace(/\{/g,"").replace(/\}/g,"").split(',')//处理拿到内容描述，服务名称，服务时间，备注
            return getListdetail[0];
        },
    },
    components: {
        'date-picker': VueBootstrapDatetimePicker
    },
});