var vm = new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        //查询
        tagConfigId: '',
        tagName: '',
        tableData: [],
        childContentTpList:[],
        childContentIdsList:[],
        pagePreviewImgurl:'',
        //源数据
        meteData:[],

        userId: '',
        diaMsg: '',
        previewPath: '',
        loadingStatus: '数据获取中...',
        updateId: '',
        deleteId: '',
        isUpdate: false,
        loadingShow: false,
        uploadSuccessed1: false,
        uploadSuccessed2: false,
        //dialog新增修改数据
        diatagName: '',
        diatagType:'',
        diatagDesc:'',
        diachildContentTp: '',
        diachildContentIds:[],
        diatagChildContentIdsList:[],
        diaremark:'',
        diaimageCacheFlag:'',
        diasubTagName:'',
        diatagBackgroundColor:'',
        diaisCheck:'0',
        diasubTagShow: 0,
        diasubTagJumpurl: '',
        childContentTempid:'', //标签关联内容ID
        infoList:[],
        filterList:[],

        channelId:"",
        elementCollection:'',
        viewList: [],
        channelMenu: [],
        elementCollectionData:[],
        elementShow:{
            diatagName: true,
            diatagType: true,
            diatagDesc: true,
            diachildContentTp: true,
            diachildContentIds:true,
            diaremark:true,
            diaimageCacheFlag:true,
            // deadLinein:true,
            diaisCheck:true,
            diasubTagShow: true,
            diasubTagJumpurl: true,
            diasubTagName:true,
            diatagBackgroundColor:true,
            diasubtagImageUrl:true,
            diatagBackgroundImage:true,
        },
        searchChannelId:'',
        //第一次
        onceClick:false,
        //查询
        searchChildContentId:'',
        // updateData
        // updateData:'',
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10
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
        checkAll: function () {
            if (this.tableData.length == 0) {
                return false;
            }
            for (var i = 0; i < this.tableData.length; i++) {
                if (!this.tableData[i].check) {
                    return false;
                }
            }
            return true;
        }
    },
    watch: {
        pageMaxNum: function () {
            this.getTableData(0);
        },
        diachildContentTp:{
            handler:function(newVal,oldVal){
                this.childContentIdsList = [];
                this.meteData = [];
                this.searchChildContentId='';
                //
                if(this.onceClick){
                    this.diachildContentIds=[];
                }
                this.queryChildIds()
            }
        },
        diachildContentIds:{
            handler: function (newValue, oldValue){
                this.diatagChildContentIdsList= [];
                var brr = [];
                var number = 0;
                if(newValue.length>0){
                    newValue.forEach(function(item){
                        var tagChildContentId = {
                            childContentId: item,
                            position: number
                        };
                        brr.push(tagChildContentId);
                        console.log(this.tagChildContentIdsList);
                        number += 1;
                    }) 
                }
                this.diatagChildContentIdsList = brr;           
            }
        },
        searchChildContentId:{
            handler: function (val, oldVal) {
                this.childContentIdsList=this.meteData;
                var brr = [];
                if(this.childContentIdsList.length>0&&val!=''){
                    this.childContentIdsList.forEach(function (item) {
                        if(item.name.indexOf(val)!=-1){
                            brr.push(item);
                        }
                    });
                    if(brr.length>0){
                        this.childContentIdsList=brr;
                    }else {
                        this.childContentIdsList=[];
                    }
                }else{
                    this.childContentIdsList=this.meteData;
                }
            },
        },
        elementCollection:{
            handler:function (val,oldval) {
                var _this=this;
                if(val){
                    this.getViewData(val);
                }else{
                    for(var ele in this.elementShow ){
                        this.elementShow[ele]=true;
                    }
                }
            }
        }
    },
    mounted: function () {
        var _this = this;
        var dialogs = ['info', 'rejectCheck','delete1'];
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
        //querychildContentTp
        $.post({
            url: '/recommendSystem/recommendSystemTemplateConfig/labelTemplateConfig/querychildContentTp.ajax',
            data:{pageNo:1,pageSize:999},
            success: function (result) {
                if (result.error === 0) {
                    _this.childContentTpList=result.data.rows;
                } else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });
        //获取所有视图列表---标签关联内容ID
        $.post({
            url: '/recommendSystem/recommendSystemTemplateConfig/labelTemplateConfig/getInfoId.ajax',
            data: {pageNo: 1,pageSize:9999},
            success: function (result) {
                if (result.error === 0) {
                    if(result.data.rows && result.data.rows.length > 0){
                        _this.infoList=result.data.rows;
                        console.log(_this.infoList);
                    }else{
                        _this.showDialog('', 'info', false,'暂无数据');
                    }
                } else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });
        // 获取视图列表
        this.getViewData();
        var objconfigId = this.getUrlParam('objconfigId');
        if (objconfigId) {
            this.getOneDetail(objconfigId)
        } else {
            this.getTableData(0);
        }
        if(this.getUrlParam('openNewDialog')){
            this.showAdd();
        }
        $('#uploadBtn1').click(function () {
            $('#uploadFileInput1').click();
        });
        $('#uploadBtn2').click(function () {
            $('#uploadFileInput2').click();
        });

    },
    methods: {
        // 根据传来的objconfigId 查找该条数据
        getOneDetail: function (objconfigId) {
            var params = {};
            var _this = this;
            params.pageNo = 1;
            params.pageSize = this.pageMaxNum;
            params.tagConfigId = objconfigId;
            // params.channelId=this.searchChannelId;
            // console.log(params);
            _this.loadingStatus = '数据获取中...';
            $.post({
                url: '/recommendSystem/recommendSystemTemplateConfig/labelTemplateConfig/queryInfo.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        if (result.data.rows && result.data.rows.length > 0) {
                            _this.userId = result.data.userId;
                            _this.tableData = result.data.rows;
                            _this.currentIndex = result.data.pageNum - 1;
                            _this.totalPage = result.data.pages;
														
                            if (result.data.rows.length > 0) {
                                _this.showUpdate(result.data.rows[0]);
                            }
                        } else {
                            _this.tableData = [];
                            _this.currentIndex = 0;
                            _this.totalPage = 0;
                            _this.loadingStatus = '没有数据';
                        }
												if (result.data.channelList) {
													_this.channelMenu = result.data.channelList;
													_this.searchChannelId = _this.channelMenu[0].channelId;
												}
                    } else {
                        _this.tableData = [];
                        _this.currentIndex = 0;
                        _this.totalPage = 0;
                        _this.showDialog('', 'info', false, result.msg);
                        _this.loadingStatus = '没有数据';
                    }
                }
            });
        },
        // 获取视图列表
        getViewData: function (val,once) {
            var _this = this;
            var params = {};
            var str = '';
            params.pageNo = 1;
            params.pageSize = 9999;
            params.contentTp = 'tags';
            val && (params.temId = val);
            $.post({
                url: '/recommendSystem/recommendSystemTemplateConfig/labelTemplateConfig/viewList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        if (result.data.rows.length > 0) {
                            !val && (_this.viewList = result.data.rows);
                            if (val) {
                                if(result.data.rows&&result.data.rows.length>1){
                                    var obj=result.data.rows.filter(function(item){
                                        return item.temId==val;
                                    })[0];
                                    _this.pagePreviewImgurl=obj.previewImgurl;
                                    if(obj.elementCollection){
                                        _this.elementCollectionData = obj.elementCollection.toString().split(',')
                                    }else{
                                        for (var items in _this.elementShow) {
                                            _this.elementShow[items] = true;
                                        }
                                        return;
                                    }
                                }else{
                                    _this.pagePreviewImgurl = result.data.rows[0].previewImgurl;
                                    if(result.data.rows[0].elementCollection){
                                        _this.elementCollectionData = result.data.rows[0].elementCollection.toString().split(',');
                                    }else{
                                        for (var item in _this.elementShow) {
                                            _this.elementShow[item] = true;
                                        }
                                        return;
                                    }
                                }
                            }else{
                                for (var item in _this.elementShow) {
                                    _this.elementShow[item] = true;
                                }
                                return;
                            }
                            for (var ele in _this.elementShow) {
                                if (_this.elementCollectionData.map(function (item) {
                                    return 'dia' + item;
                                }).indexOf(ele) > -1) {
                                    _this.elementShow[ele] = true;
                                }
                                else {
                                    _this.elementShow[ele] = false;
                                }
                            }
                        } else {
                            if (once) {
                                _this.showDialog('add', 'info', true, '视图列表暂无数据');
                            } else {
                                _this.showDialog('', 'info', false, '视图列表暂无数据');
                            }
                        }
                    } else {
                        if (once) {
                            _this.showDialog('add', 'info', true, result.msg);
                        } else {
                            _this.showDialog('', 'info', false, result.msg);
                        }
                    }
                }
            });
        },
        //list
        getTableData: function (currentIndex) {
            var params = {};
            var _this = this;
            params.pageNo = currentIndex + 1;
            params.pageSize = this.pageMaxNum;
            params.tagConfigId = this.tagConfigId;
            params.tagName = this.tagName;
            params.channelId=this.searchChannelId;
            // console.log(params);
            _this.loadingStatus = '数据获取中...';
            $.post({
                url: '/recommendSystem/recommendSystemTemplateConfig/labelTemplateConfig/queryInfo.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        if (result.data.rows && result.data.rows.length > 0) {
                            _this.userId = result.data.userId;
                            _this.tableData = result.data.rows;
                            console.log(_this.tableData)
                            _this.currentIndex = result.data.pageNum - 1;
                            _this.totalPage = result.data.pages;
														
                        } else {
                            _this.tableData = [];
                            _this.currentIndex = 0;
                            _this.totalPage = 0;
                            _this.loadingStatus = '没有数据';
                        }
												if (result.data.channelList) {
													_this.channelMenu = result.data.channelList;
													_this.searchChannelId = _this.channelMenu[0].channelId;
												}
                    } else {
                        _this.tableData = [];
                        _this.currentIndex = 0;
                        _this.totalPage = 0;
                        _this.showDialog('', 'info', false, result.msg);
                        _this.loadingStatus = '没有数据';
                    }
                }
            });
        },
        // 弹窗上渠道channelId改变，需要重新获取 标签关联子内容IDs （只有新增弹窗，修改弹窗渠道设置为不可修改）20220522
        changeChannelId: function(){
            console.log('changeDChannelId this.diachildContentTp=', this.diachildContentTp)
            console.log('changeDChannelId this.channelId=', this.channelId)
            if(!this.diachildContentTp || !this.channelId) {
                return; 
            }
            // 渠道改变，重新获取 标签关联字内容IDs  之前，清空原数据
            // this.childContentIdsList = [];   //queryChildIds 有清空
            // this.meteData = [];              //queryChildIds 有清空
            this.searchChildContentId='';
            this.diachildContentIds=[];
            this.diatagChildContentIdsList=[];
            this.queryChildIds();
        },
        //查询childIds
        queryChildIds:function () {
            var _this=this;
            $.post({
                url: '/recommendSystem/recommendSystemTemplateConfig/labelTemplateConfig/querychildContentIds.ajax',
                data: {childContentTp:_this.diachildContentTp, channelId:_this.channelId},
                success: function (result) {
                    if (result.error === 0) {
                        _this.childContentIdsList=[];
                        var tmp=result.data;
                        for (var k in tmp) {
                            var item = tmp[k];
                            if (_this.diachildContentTp == "fund") {
                                for(var i=0;i<item.length;i++){
                                    _this.childContentIdsList.push({value:item[i].fundconfigId,name:item[i].fundconfigId + ':' + item[i].fundTitle})
                                }

                            } else if (_this.diachildContentTp  == "advice") {
                                for(var i=0;i<item.length;i++){
                                    _this.childContentIdsList.push({value:item[i].advconfigId,name:item[i].advconfigId + ':' + item[i].adviceTitle})
                                }

                            } else if (_this.diachildContentTp  == "funcbtn") {
                                for(var i=0;i<item.length;i++){
                                    _this.childContentIdsList.push({value:item[i].funcBtnId,name:item[i].funcBtnId + ':' + item[i].funcBtnName})
                                }

                            } else if (_this.diachildContentTp  == "adImg") {
                                for(var i=0;i<item.length;i++){
                                    _this.childContentIdsList.push({value:item[i].adImgId,name:item[i].remark == null ? '' : item[i].remark})
                                }
                            } else if (_this.diachildContentTp  == "notice") {
                                for(var i=0;i<item.length;i++){
                                    _this.childContentIdsList.push({value:item[i].noticeId,name:item[i].noticeId + ':' + item[i].noticeValue});
                                }
                            } else if (_this.diachildContentTp  == "webanner") {
                                for(var i=0;i<item.length;i++){
                                    _this.childContentIdsList.push({value:item[i].weBannerId,name:item[i].weBannerId + ':' + item[i].remark});
                                }
                            } else if (_this.diachildContentTp  == "weprod") {
                                for(var i=0;i<item.length;i++){
                                    _this.childContentIdsList.push({value:item[i].weProdId,name: item[i].sceneName});
                                }
                            } else if (_this.diachildContentTp  == "activity") {
                                for(var i=0;i<item.length;i++){
                                    _this.childContentIdsList.push({value:item[i].id,name: item[i].title});
                                }
                            } else if (_this.diachildContentTp  == "custombtn") {
                                for(var i=0;i<item.length;i++){
                                    _this.childContentIdsList.push({value:item[i].btnId,name: item[i].btnName});
                                }
                            } else if (_this.diachildContentTp  == "loadpage") {
                                for(var i=0;i<item.length;i++){
                                    _this.childContentIdsList.push({value:item[i].loadPageConfigId,name: item[i].remark});
                                }
                            } else if (_this.diachildContentTp  == "fundgroup") {
                                for(var i=0;i<item.length;i++){
                                    _this.childContentIdsList.push({value:item[i].fundGroupConfigId,name: item[i].fundGroupTitle});
                                }
                            } else if (_this.diachildContentTp  == "manager") {
                                for(var i=0;i<item.length;i++){
                                    _this.childContentIdsList.push({value:item[i].managerConfigId,name: item[i].managerName});
                                }
                            } else if (_this.diachildContentTp  == "wx_fund") {
                                for(var i=0;i<item.length;i++){
                                    _this.childContentIdsList.push({value:item[i].fundconfigId,name: item[i].fundTitle});
                                }

                            } else if (_this.diachildContentTp  == "wx_funcbtn") {
                                for(var i=0;i<item.length;i++){
                                    _this.childContentIdsList.push({value:item[i].btnId,name: item[i].btnName});
                                }
                            } else if (_this.diachildContentTp  == "wx_adImg") {
                                for(var i=0;i<item.length;i++){
                                    _this.childContentIdsList.push({value:item[i].adImgId,name: item[i].adImgId + ':' + item[i].remark});
                                }
                            } else if (_this.diachildContentTp  == "product") {
                                for(var i=0;i<item.length;i++){
                                    if(item[i].remark){
                                        _this.childContentIdsList.push({value:item[i].prdConfigId,name: item[i].prdConfigId+'--'+item[i].prdTitle+'--'+item[i].remark});
                                    }else{
                                        _this.childContentIdsList.push({value:item[i].prdConfigId,name: item[i].prdConfigId+'--'+item[i].prdTitle});
                                    }

                                }
                            } else if (_this.diachildContentTp  == "index") {
                                for(var i=0;i<item.length;i++){
                                    _this.childContentIdsList.push({value:item[i].indexConfigId,name:(item[i].indexTypeName == null ? '' : item[i].indexTypeName) + ':' + (item[i].indexName == null ? '' : item[i].indexName)});
                                }

                            }else if (_this.diachildContentTp  == "tags") {
                                for(var i=0;i<item.length;i++){
                                    _this.childContentIdsList.push({value:item[i].tagConfigId,name:item[i].tagName});
                                }
                            }

                        }
                            _this.meteData= _this.childContentIdsList;

                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        chooseTp:function(diachildContentTp){
          var _this=this;
          console.log(diachildContentTp);
          // _this.infoList=_this.infoList.filter(function(item){
          //     return item.contentTp==diachildContentTp;
          // })

            $.post({
                url: '/recommendSystem/recommendSystemTemplateConfig/labelTemplateConfig/getInfoId.ajax',
                data: {pageNo: 1,pageSize:9999,contentTp:diachildContentTp},
                success: function (result) {
                    if (result.error === 0) {
                        if(result.data.rows && result.data.rows.length > 0){
                            _this.infoList=result.data.rows;
                            console.log(_this.infoList);
                        }else{
                            _this.showDialog('', 'info', false,'暂无数据');
                        }
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });

        },
        
        //新增活动配置
        setAddData: function (obj) {
            var _this=this;
            this.diatagName = obj.tagName ? obj.tagName : '';
            this.diatagType = obj.tagType ? obj.tagType : '';
            this.diatagDesc = obj.tagDesc ? obj.tagDesc : '';
            this.diachildContentTp = obj.childContentTp ? obj.childContentTp : '';
            this.diachildContentIds = obj.childContentIds ? obj.childContentIds.split(',') : [];
            this.diatagChildContentIdsList = obj.tagChildContentIdsList ? obj.tagChildContentIdsList : [];
            this.diaremark = obj.remark ? obj.remark : '';
			this.diaimageCacheFlag = obj.imageCacheFlag ? obj.imageCacheFlag : '0';
            this.diaisCheck = obj.isCheck ? obj.isCheck : '';
            this.diasubTagShow = obj.subTagShow ? obj.subTagShow : 0;
            this.diasubTagJumpurl = obj.subTagJumpurl ? obj.subTagJumpurl : '';
            this.diasubTagName = obj.subTagName ? obj.subTagName : '';
            this.diatagBackgroundColor = obj.tagBackgroundColor ? obj.tagBackgroundColor : '';
            // $("#deadLinein").val(obj.deadLine ? this.formatTime(obj.deadLine) : '');
            this.channelId = obj.channelId ? obj.channelId : '';
            this.elementCollection = obj.previewTemid ? obj.previewTemid : '';

            $('#uploadInput1').val(obj.subtagImageUrl  ? obj.subtagImageUrl  : '');     //子标签图片地址
            $('#uploadInput2').val(obj.tagBackgroundImage  ? obj.tagBackgroundImage  : '');     //标签图片地址
            this.childContentTempid=obj.childContentTempid ? obj.childContentTempid : '';//标签关联内容ID
        },
        showAdd: function () {
            var _this=this;
            this.elementCollection = '';
            this.pagePreviewImgurl = '';
            this.childContentIdsList = [];
            this.isUpdate = false;
            this.updateId = '';
            this.setAddData({isCheck:'0'});
            this.showDialog('', 'add');

            $('#uploadFileInput1').on('change', function () {
                _this.uploadSuccessed1 = false;
                $('#uploadInput1').val($(this).val());
            });
            $('#uploadFileInput2').on('change', function () {
                _this.uploadSuccessed2 = false;
                $('#uploadInput2').val($(this).val());
            });
            $("#previewImg").show();
        },
        showUpdate: function (item) {
            var _this = this;
            if(item.previewTemid){
                this.getViewData(item.previewTemid,true);
            }else{
                for(var ele in this.elementShow ){
                    this.elementShow[ele]=true;
                }
            }
            $('#uploadFileInput1').on('change', function () {
                _this.uploadSuccessed1 = false;
                $('#uploadInput1').val($(this).val());
            });
            $('#uploadFileInput2').on('change', function () {
                _this.uploadSuccessed2 = false;
                $('#uploadInput2').val($(this).val());
            });
            this.pagePreviewImgurl = '';
            // this.updateData=item;
            this.onceClick = false;
            this.isUpdate = true;
            this.updateId = item.tagConfigId;
            this.setAddData(item);
            this.showDialog('', 'add');
            // if(this.diachildContentTp=='tags'){
            //     this.queryTagList(item);
            // }else{
               
            // }
            this.queryChildIds();
            $("#previewImg").show();
        },
        add: function () {
            if(this.channelId==''){
                this.showDialog('add', 'info', true, '渠道必须选择！');
                return false;
            }
            if(this.elementCollection==''){
                this.showDialog('add', 'info', true, '模板必须选择！');
                return false;
            }
            var _this = this;
            if(this.diatagName==''){
                _this.showDialog('add', 'info', true, '标签名称必须填写！');
                return;
            }
            var params = {};
            params.tagName = this.diatagName;
            params.tagType = this.diatagType;
            params.tagDesc = this.diatagDesc;
            params.childContentTp = this.diachildContentTp;
            params.childContentIds = this.diachildContentIds.length>0?this.diachildContentIds.join(','):'';
            params.tagChildContentIdsList = this.diatagChildContentIdsList.length>0?this.diatagChildContentIdsList:[];
            params.remark = this.diaremark;
			params.imageCacheFlag = this.diaimageCacheFlag;
            // params.deadLinein = $("#deadLinein").val();
            params.isCheck = this.diaisCheck;
            params.subTagShow = this.diasubTagShow;
            params.subTagJumpurl = this.diasubTagJumpurl;
            params.subTagName = this.diasubTagName;
            params.tagBackgroundColor = this.diatagBackgroundColor;
            params.channelId = this.channelId;
            params.previewTemid = this.elementCollection;

            params.subtagImageUrl  = $('#uploadInput1').val();  //子标签图片地址
            params.tagBackgroundImage  = $('#uploadInput2').val();  //标签图片地址
            params.childContentTempid=this.childContentTempid;//标签关联内容ID
            console.log(params);

            this.isUpdate && (params.tagConfigId = this.updateId);
            !this.isUpdate && (params.tagConfigId = 1);//后端定的新增需要随便传一个值，不能不传
            this.isUpdate && (params.modifyBy = this.userId);
            !this.isUpdate && (params.createBy = this.userId);
            var url = '/recommendSystem/recommendSystemTemplateConfig/labelTemplateConfig/';
            url += this.isUpdate ? 'update.ajax' : 'add.ajax';
            $.post({
                url: url,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0);
                    }
                    $("#previewImg").hide();
                    _this.showDialog('add', 'info', false, result.msg);
                }
            });
        },
        hideImg: function () {
            $("#previewImg").hide();
        },
        //启用或禁用
        enableOrDisable: function (item) {
            var _this = this;
            $.post({
                url: '/recommendSystem/recommendSystemTemplateConfig/labelTemplateConfig/enable.ajax',
                data: {tagConfigId: item.tagConfigId},
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('', 'info', false, '操作成功');
                        _this.getTableData(_this.currentIndex);
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            })
        },
        //删除
        deleteParams: function (item) {
            this.deleteId= item.indexConfigId;
            this.showDialog('', 'delete1', false);
        },
        deleteConfirm: function () {
            var _this = this;
            $.post({
                url: '/recommendSystem/recommendSystemTemplateConfig/labelTemplateConfig/delete.ajax',
                data: {indexConfigId: this.deleteId},
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('', 'info', false, '操作成功');
                        _this.getTableData(_this.currentIndex);
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            })
        },
        fresh:function () {
            var _this=this;
            $.post({
                url: '/recommendSystem/recommendSystemTemplateConfig/labelTemplateConfig/fresh.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('', 'info', false, '操作成功');
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            })
        },
        configMgmt:function(){
            var hasCheck = false;
            for (var i = 0; i < this.tableData.length; i++) {
                if (this.tableData[i].check) {
                    hasCheck = true;
                    break;
                }
            }
            if (!hasCheck) {
                this.showDialog('', 'info', false, '未选择任何资源');
                return;
            }
            var ids = [];
            var channelIds=[];
            for (var j = 0; j < this.tableData.length; j++) {
                if (this.tableData[j].check) {
                    this.tableData[j].objconfigId=this.tableData[j].tagConfigId;
                    this.tableData[j].startTime='';
                    this.tableData[j].endTime='';
                    this.tableData[j].modifyTime='';
                    this.tableData[j].typeKey='tags';
                    this.tableData[j].position='';
                    this.tableData[j].dataType='local';
                    this.tableData[j].modifyBy=this.userId;
                    ids.push(this.tableData[j]);
                    channelIds.push(this.tableData[j].channelId)
                }
            }
            // console.log(channelIds);
            for(var m = 0; m < channelIds.length-1; m++){
                for(var n = 0; n < channelIds.length-1-m; n++){
                    if(!(channelIds[n]==channelIds[n+1])){
                        this.showDialog('','info',false,'请选择相同渠道的数据进行配置！')
                        return;
                    }
                }
            }
            if(!window.localStorage){
                this.showDialog('','info',false,'您的浏览器不支持该功能，请下载最新的谷歌浏览器！')
                return false;
            }else{
                var storage=window.localStorage;
                var url="/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt.html?pageType=Modify&contentTp=tags&channelId="+channelIds[0]
                storage.setItem("tags",JSON.stringify(ids));
                window.open(url);
            }
            
        },
        configThis:function(item){
            var ids = [];
            var channelIds=item.channelId;
            var obj={
                objconfigId:item.tagConfigId,
                startTime:'',
                endTime:'',
                modifyTime:'',
                typeKey:'tags',
                position:'',
                dataType:'local',
                modifyBy:this.userId
            }
            ids.push(Object.assign(item,obj));
            if(!window.localStorage){
                this.showDialog('','info',false,'您的浏览器不支持该功能，请下载最新的谷歌浏览器！')
                return false;
            }else{
                var storage=window.localStorage;
                var url="/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt.html?pageType=Modify&contentTp=tags&channelId="+channelIds+'&objconfigId='+ids[0].objconfigId;
                storage.setItem("tags",JSON.stringify(ids));
                window.open(url);
            }
        },

        // 上传图片1
        uploadPic1: function () {
            if (!$('#uploadInput1').val()) {
                this.showDialog('add', 'info', true, '未选择要上传的图片');
                return;
            }
            if (!/.+(\.gif|\.jpeg|\.png|\.jpg|\.bmp)$/.test($('#uploadInput1').val())) {
                this.showDialog('add', 'info', true, '文件格式错误');
                return;
            }
            this.loadingShow = true;
            this.uploadSuccessed1 = false;
            var _this = this;
            $.ajaxFileUpload({
                url: '/recommendSystem/recommendSystemTemplateConfig/labelTemplateConfig/upload1.ajax',
                type: 'POST',
                dataType: 'json',
                fileElementId: 'uploadFileInput1',
                success: function (result) {
                    _this.loadingShow = false;
                    if (result.error === 0) {
                        _this.uploadSuccessed1 = true;
                        $('#uploadInput1').val(result.data);
                        _this.showDialog('', 'add');
                    }
                    else {
                        _this.showDialog('add', 'info', true, result.msg);
                    }
                }
            });
        },
        uploadPic2: function () {
            if (!$('#uploadInput2').val()) {
                this.showDialog('add', 'info', true, '未选择要上传的图片');
                return;
            }
            if (!/.+(\.gif|\.jpeg|\.png|\.jpg|\.bmp)$/.test($('#uploadInput2').val())) {
                this.showDialog('add', 'info', true, '文件格式错误');
                return;
            }
            this.loadingShow = true;
            this.uploadSuccessed2 = false;
            var _this = this;
            $.ajaxFileUpload({
                url: '/recommendSystem/recommendSystemTemplateConfig/labelTemplateConfig/upload1.ajax',
                type: 'POST',
                dataType: 'json',
                fileElementId: 'uploadFileInput2',
                success: function (result) {
                    _this.loadingShow = false;
                    if (result.error === 0) {
                        _this.uploadSuccessed2 = true;
                        $('#uploadInput2').val(result.data);
                        _this.showDialog('', 'add');
                    }
                    else {
                        _this.showDialog('add', 'info', true, result.msg);
                    }
                }
            });
        },
        //主表格分页方法
        check: function (item) {
            item.check = !item.check;
        },
        allCheck: function () {
            
            var _this = this;
            var flag = this.checkAll;
            this.tableData.forEach(function (item) {
                item.check = !flag;
            });
        },
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
        },
        //公共方法
        getUrlParam: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg); //匹配目标参数
            if (r != null) return unescape(r[2]);
            return '';
        },
        showDialog: function (dia1, dia2, callback, msg) {
            if (msg) {
                this.diaMsg = msg;
            }
            else {
                msg = '输入条件错误';
            }
            if (!dia1) {
                $('#' + dia2).modal('show');
            }
            else if (!dia2) {
                $('#' + dia1).modal('hide');
            }
            else if (!callback) {
                $('#' + dia1).on("hidden.bs.modal", function () {
                    $('#' + dia2).modal('show');
                    $('#' + dia1).off().on("hidden", "hidden.bs.modal");
                });
                $('#' + dia1).modal('hide');
            }
            else {
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
        inSelected: function (item, arr, prop) {
            var _index = -1;
            arr.forEach(function (value, index) {
                if (item[prop] == value[prop]) {
                    _index = index;
                }
            });
            return _index;
        },
        formatTime: function (timestamp) {
            var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
            var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
            var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
            return Y + M + D + h + m + s;
        },
        overflowHide: function (val) {
            if(val){
                var str = val.toString();
                if (str.length > 10) {
                    str = str.substring(0, 10) + '...'
                }
            }else{
                str='-';
            }

            return str;
        },
        stringTimeFat: function (val) {
            if (val) {
                if (val.length > 8) {
                    return val.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/g, '$1-$2-$3 $4:$5:$6')
                } else {
                    return val.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')
                }
            } else {
                return '-'
            }
        },
        backTimeFat: function (val) {
            if (val) {
                val=val.toString();
                var arr=val.split("-");
                var brr=arr[arr.length-1].split('.');
                try {
                    arr[1]=arr[1].length>1?arr[1]:'0'+arr[1];
                    brr[0]=brr[0].length>1?brr[0]:'0'+brr[0];
                    brr[1]=brr[1].length>1?brr[1]:'0'+brr[1];
                    brr[2]=brr[2].length>1?brr[2]:'0'+brr[2];
                    brr[3]=brr[3].trim().length>1?brr[3].trim():'0'+brr[3].trim();
                    val=arr[0]+'-'+arr[1]+'-'+brr[0]+' '+brr[1]+':'+brr[2]+':'+brr[3]
                }
                catch(err){
                    val=val.toString();
                }
            } else {
                val = '-'
            }
            return val;
        },
        channelNameForId:function (val) {
            var str='';
            if(val){
                this.channelMenu.forEach(function (item) {
                    if(val==item.channelId){
                        str=item.channelName;
                    }
                })
            }else{
                str='-'
            }
            return str;
        },
        getName: function(id){
            var data = this.meteData.filter(function(item){
                return item.value == id;
            })
            return data[0].name;
        },
        deleteChildContent: function(subIndex){
            this.diatagChildContentIdsList.splice(subIndex, 1);
            this.diachildContentIds.splice(subIndex, 1);
        }

    }
});
