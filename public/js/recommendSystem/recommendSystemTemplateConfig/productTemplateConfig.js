new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        //查询条件
        prdId: '',
        tableData: [],
        pagePreviewImgurl:'',

        userId: '',
        diaMsg: '',
        previewPath: '',
        loadingStatus: '数据获取中...',
        updateId: '',
        deleteId: '',
        isUpdate: false,
        uploadSuccessed1: false,
        uploadSuccessed2: false,
        uploadSuccessed3: false,
        loadingShow: false,
        fundIdList:null,
        hasFundId:false,
        // updateDialogOnce: false,
        //dialog新增修改数据
        diaprogressBarScoreObtainType:'', //20220214新加查询进度条数据字段
        diaprogressBarScoreObtainId:'',   //20220214新加产品代码字段
        diaprdId: '',
        diaprdTitle: '',
        diashiftGroupNo: '',
        diaprdSubTitle: '',
        diaprdTags: '',
        diaprdTagsDesc: '',
        diaprdGraphUrl: '',
        diaprogressBarDisplayTxt: '',
        diaprogressBarScore: '',
        diaprogressBarScoreDesc: '',
        diaprdMarketContent: '',
        diaprdMarketUrl: '',
        diaprdRecommendTitle: '',
        diaprdRecommendContent: '',
        diaprdBtnName: '',
        diaurl: '',
        diaimageCacheFlag: '0',
        diaprdType: '',
        diaprdRecomIdentify: '',
        diaprdStartDateDesc: '',
        diaprdEndDateDesc: '',
        diaprdStarName: '',
        diaprdStarScore: '',
        diarecomElementNm: '',
        diarecomElementNmTips : '',
        diarecomElementRemark: '',
        diarecomElementVal: '',
        diaelementValFrom: '',
        diarecomElementUnit: '',
        diarecomElementNm2: '',
        diarecomElementNm2Tips : '',
        diarecomElementRemark2: '',
        diarecomElementVal2: '',
        diaelementValFrom2: '',
        diarecomElementUnit2: '',
        diasecondaryInfoTypeName: '',
        diasecondaryInfoTitle: '',
        diasecondaryInfoBtnName: '',
        diasecondaryInfoBtnUrl: '',
        diasecondaryInfoContent: '',
        diasecondaryInfoJumpurl: '',
        diasecondaryInfoImgJumpurl: '',
        diaproductOperateType: '',
        diaproductOperateBaseCount: '',
        diaproductOperateDesc: '',
        prdidObtainType: '0',
        prdtitleObtainType: '0',
        diaremark:'',
        channelId: "",
        elementCollection: '',
        viewList: [],
        imageUrlList: [],
        channelMenu: [],
        elementCollectionData: [],
        elementShow: {
            diaprdId: true,
            diaprdTitle: true,
            diashiftGroupNo: true,
            diaprdSubTitle: true,
            diaprdTags: true,
            diaprdTagsDesc: true,
            diaprdGraphUrl: true,
            diaprogressBarScore: true,
            diaprogressBarDisplayTxt: true,
            diaprogressBarScoreDesc: true,
            diaprdMarketContent: true,
            diaprdMarketUrl: true,
            diaprdRecommendTitle: true,
            diaprdRecommendContent: true,
            diaprdBtnName: true,
            diaurl: true,
            diaimageCacheFlag: true,
            diaremark: true,
            diaprdType: true,
            diaprdRecomIdentify: true,
            diaprdStartDateDesc: true,
            diaprdEndDateDesc: true,
            diaprdStarName: true,
            diaprdStarScore: true,
            diarecomElementNm: true,
            diarecomElementNmTips : true,
            diarecomElementRemark: true,
            diarecomElementVal: true,
            diaelementValFrom: true,
            diarecomElementUnit: true,
            diarecomElementNm2: true,
            diarecomElementNm2Tips : true,
            diarecomElementRemark2: true,
            diarecomElementVal2: true,
            diaelementValFrom2: true,
            diarecomElementUnit2: true,
            diasecondaryInfoTypeName: true,
            diasecondaryInfoTitle: true,
            diasecondaryInfoBtnName: true,
            diasecondaryInfoBtnUrl: true,
            diasecondaryInfoContent: true,
            diasecondaryInfoJumpurl: true,
            diasecondaryInfoImgJumpurl: true,
            diaproductOperateType: true,
            diaproductOperateBaseCount: true,
            diaproductOperateDesc: true,
            diaproductBackgroundImageUrl: true,
            diaattachedImageUrl: true,
            diaprdStartDate: true,
            diaprdEndDate: true,
            diasecondaryInfoImgUrl: true,
            diaprdidObtainType: true,
            diaprdtitleObtainType: true,
            diaprogressBarScoreObtainType:true,  //20220214新增查询进度条数据
            diaprogressBarScoreObtainId:true    //20220214新增产品代码
        },
		flagType:false,//关于查询交易类型的开关x
		currentNewval:'',//关于查询交易类型的NEWVAL
		currentdiaproductOperateDesc:'',//关于交易类型描述记录
        searchChannelId:'',
        // 字数限制
        progressBarScoreDescLimit:50,
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
        elementCollection: {
            handler: function (val, oldval) {
                if (val) {
                    this.getViewData(val);
                } else {
                    for (var ele in this.elementShow) {
                        this.elementShow[ele] = true;
                    }
                }
            }
        },
        prdidObtainType: function (newval) {
            if (newval != '0') {
                this.prdtitleObtainType = '1'
            }
        },
        diaprogressBarScoreDesc:function(){
            var txtLen = this.diaprogressBarScoreDesc.length;
            this.progressBarScoreDescLimit=50-txtLen;
        },
		diaproductOperateType:function(newval,oldval){
			if(!this.isUpdate){
				if(newval=='00'||newval=='01'){
					this.diaproductOperateDesc = '超${count}人已买入'
				}
				if(newval=='02'){
					this.diaproductOperateDesc = '已有${count}人加入亲情宝'
				}
				if(newval=='03'){
					this.diaproductOperateDesc = '${minAmount}元起购 | ${fundType} | ${fundRisk}'
				}
				if(newval=='04'){
					this.diaproductOperateDesc = '超${count}人已关注'
				}
			}else{
				if(this.flagType){
					console.log(this.currentNewval,newval);
					if((newval=='00'||newval=='01')&&this.currentNewval!=newval){
						this.diaproductOperateDesc = '超${count}人已买入'
					}
					if(newval=='02'&&this.currentNewval!=newval){
						this.diaproductOperateDesc = '已有${count}人加入亲情宝'
					}
					if(newval=='03'&&this.currentNewval!=newval){
						this.diaproductOperateDesc = '${minAmount}元起购 | ${fundType} | ${fundRisk}'
					}
					if(newval=='04'&&this.currentNewval!=newval){
						this.diaproductOperateDesc = '超${count}人已关注'
					}
					if(this.currentNewval==newval){
						this.diaproductOperateDesc = this.currentdiaproductOperateDesc;
					}
				}else{
					this.currentNewval = newval;
					this.currentdiaproductOperateDesc = this.diaproductOperateDesc;
				}
				this.flagType = true;
			}
		}
    },
    mounted: function () {
        var _this = this;
        var dialogs = ['info', 'delete1'];
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
        $('#uploadBtn1').click(function () {
            $('#uploadFileInput1').click();
        });
        $('#uploadBtn2').click(function () {
            $('#uploadFileInput2').click();
        });
        $('#uploadBtn3').click(function () {
            $('#uploadFileInput3').click();
        });
        $('#elementCollection').css('width', '200px').select2({});
        $("#elementCollection").on("select2:select", function (e) {
            // console.log(e);
            _this.elementCollection = e.params.data.id;
        });
        $.fn.modal.Constructor.prototype.enforceFocus = function () {};
        // 获取视图列表
        this.getViewData();
        this.getImgUrlList();
        this.getFundIdList();
        // this.getTableData(0);
        var objconfigId = this.getUrlParam('objconfigId');
        if (objconfigId) {
            this.getOneDetail(objconfigId)
        }else{
            this.getTableData(0);
        }
        if(this.getUrlParam('openNewDialog')){
            this.showAdd();
        }

    },
    methods: {
         // 根据传来的objconfigId 查找该条数据
        getOneDetail: function (objconfigId) {
            var params = {};
            var _this = this;
            params.pageNo = 1;
            params.pageSize = this.pageMaxNum;
            params.prdConfigId = objconfigId;
            // params.channelId=this.searchChannelId;
            // console.log(params);
            _this.loadingStatus = '数据获取中...';
            $.post({
                url: '/recommendSystem/recommendSystemTemplateConfig/productTemplateConfig/queryInfo.ajax',
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
        getViewData: function (val, once) {
            var _this = this;
            var params = {};
            var str = '';
            params.pageNo = 1;
            params.pageSize = 9999;
            params.contentTp = 'product';
            val && (params.temId = val);
            $.post({
                url: '/recommendSystem/recommendSystemTemplateConfig/productTemplateConfig/viewList.ajax',
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
        // 获取基金id列表  校验用
        getFundIdList:function () {  
            var _this = this;
            $.post({
                url: '/recommendSystem/recommendSystemTemplateConfig/productTemplateConfig/queryFundIdList.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        _this.fundIdList=result.data;
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            })
        },
        // 获取imgUrl
        getImgUrlList:function () {  
            var _this = this;
            $.post({
                url: '/recommendSystem/recommendSystemTemplateConfig/productTemplateConfig/imageUrlList.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        _this.imageUrlList=result.data;
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            })
        },
        prdIdChange:function () {  
            if(this.fundIdList&&(this.fundIdList.indexOf(this.diaprdId)==-1)&&(this.diaprdType==1)){
                this.hasFundId=true;
            }else{
                this.hasFundId=false;
            }
        },
        //list
        getTableData: function (currentIndex) {
            var params = {};
            var _this = this;
            params.pageNo = currentIndex + 1;
            params.pageSize = this.pageMaxNum;
            params.prdId = this.prdId;
            params.channelId=this.searchChannelId;
            // console.log(params);
            _this.loadingStatus = '数据获取中...';
            $.post({
                url: '/recommendSystem/recommendSystemTemplateConfig/productTemplateConfig/queryInfo.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        if (result.data.rows && result.data.rows.length > 0) {
                            _this.userId = result.data.userId;
                            _this.tableData = result.data.rows;
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
        //新增活动配置
        setAddData: function (obj) {
            this.diaprdId = obj.prdId ? obj.prdId : '';
            this.diaprdTitle = obj.prdTitle ? obj.prdTitle : '';
            this.diashiftGroupNo = obj.shiftGroupNo ? obj.shiftGroupNo : '';
            this.diaprdSubTitle = obj.prdSubTitle ? obj.prdSubTitle : '';
            this.diaprdTags = obj.prdTags ? obj.prdTags : '';
            this.diaprdTagsDesc = obj.prdTagsDesc ? obj.prdTagsDesc : '';
            this.diaprdGraphUrl = obj.prdGraphUrl ? obj.prdGraphUrl : '';
            this.diaprogressBarScore = obj.progressBarScore ? obj.progressBarScore : '';
            this.diaprogressBarDisplayTxt = obj.progressBarDisplayTxt ? obj.progressBarDisplayTxt : '低估,正常,高估';
            this.diaprogressBarScoreDesc = obj.progressBarScoreDesc ? obj.progressBarScoreDesc : '';
            this.diaprdMarketContent = obj.prdMarketContent ? obj.prdMarketContent : '';
            this.diaprdMarketUrl = obj.prdMarketUrl ? obj.prdMarketUrl : '';
            this.diaprdRecommendTitle = obj.prdRecommendTitle ? obj.prdRecommendTitle : '';
            this.diaprdRecommendContent = obj.prdRecommendContent ? obj.prdRecommendContent : '';
            this.diaprdBtnName = obj.prdBtnName ? obj.prdBtnName : '';
            this.diaurl = obj.url ? obj.url : '';
			this.diaimageCacheFlag = obj.imageCacheFlag ? obj.imageCacheFlag : '0';
            this.diaprdType = obj.prdType ? obj.prdType : '';
            this.diaprdRecomIdentify = obj.prdRecomIdentify ? obj.prdRecomIdentify : '';
            this.diaprdStartDateDesc = obj.prdStartDateDesc ? obj.prdStartDateDesc : '';
            this.diaprdEndDateDesc = obj.prdEndDateDesc ? obj.prdEndDateDesc : '';
            this.diaprdStarName = obj.prdStarName ? obj.prdStarName : '';
            this.diaprdStarScore = obj.prdStarScore||obj.prdStarScore===0 ? obj.prdStarScore : '';
            this.diarecomElementNm = obj.recomElementNm ? obj.recomElementNm : '';
            this.diarecomElementNmTips  = obj.recomElementNmTips  ? obj.recomElementNmTips  : '';
            this.diarecomElementRemark = obj.recomElementRemark ? obj.recomElementRemark : '';
            this.diarecomElementVal = obj.recomElementVal ? obj.recomElementVal : '';
            this.diaelementValFrom = obj.elementValFrom ? obj.elementValFrom : '';
            this.diarecomElementUnit = obj.recomElementUnit ? obj.recomElementUnit : '';
            this.diarecomElementNm2 = obj.recomElementNm2 ? obj.recomElementNm2 : '';
            this.diarecomElementNm2Tips  = obj.recomElementNm2Tips  ? obj.recomElementNm2Tips  : '';
            this.diarecomElementRemark2 = obj.recomElementRemark2 ? obj.recomElementRemark2 : '';
            this.diarecomElementVal2 = obj.recomElementVal2 ? obj.recomElementVal2 : '';
            this.diaelementValFrom2 = obj.elementValFrom2 ? obj.elementValFrom2 : '';
            this.diarecomElementUnit2 = obj.recomElementUnit2 ? obj.recomElementUnit2 : '';
            this.diasecondaryInfoTypeName = obj.secondaryInfoTypeName ? obj.secondaryInfoTypeName : '';
            this.diasecondaryInfoTitle = obj.secondaryInfoTitle ? obj.secondaryInfoTitle : '';
            this.diasecondaryInfoBtnName = obj.secondaryInfoBtnName ? obj.secondaryInfoBtnName : '';
            this.diasecondaryInfoBtnUrl = obj.secondaryInfoBtnUrl ? obj.secondaryInfoBtnUrl : '';
            this.diasecondaryInfoContent = obj.secondaryInfoContent ? obj.secondaryInfoContent : '';
            this.diasecondaryInfoJumpurl = obj.secondaryInfoJumpurl ? obj.secondaryInfoJumpurl : '';
            this.diasecondaryInfoImgJumpurl = obj.secondaryInfoImgJumpurl ? obj.secondaryInfoImgJumpurl : '';
            this.diaproductOperateType = obj.productOperateType ? obj.productOperateType : '';
            this.diaproductOperateBaseCount = obj.productOperateBaseCount ? obj.productOperateBaseCount : '';
            this.diaproductOperateDesc = obj.productOperateDesc ? obj.productOperateDesc : '';
            this.diaprogressBarScoreObtainType = obj.progressBarScoreObtainType ? obj.progressBarScoreObtainType : '';
            this.diaprogressBarScoreObtainId = obj.progressBarScoreObtainId ? obj.progressBarScoreObtainId : '';
            this.channelId = obj.channelId ? obj.channelId : '';
            this.elementCollection = obj.previewTemid ? obj.previewTemid : '';
            $("#elementCollection").val(obj.previewTemid ? obj.previewTemid : '').trigger('change');
            this.prdidObtainType = obj.prdidObtainType;
            this.diaremark = obj.remark?obj.remark:'';
            this.prdtitleObtainType = obj.prdtitleObtainType;
            if(obj.prdType!=='2'){
                this.prdidObtainType = 0
                this.prdtitleObtainType=0
            }
            $('#uploadInput1').val(obj.secondaryInfoImgUrl ? obj.secondaryInfoImgUrl : '');
            $('#uploadInput2').val(obj.productBackgroundImageUrl ? obj.productBackgroundImageUrl : '');
            $('#uploadInput3').val(obj.attachedImageUrl ? obj.attachedImageUrl : '');
            $('#prdStartDate').val(obj.prdStartDate ? this.stringTimeFat(obj.prdStartDate) : '');
            $('#prdEndDate').val(obj.prdEndDate ? this.stringTimeFat(obj.prdEndDate) : '');
        },
        showAdd: function () {
            var _this = this;
            this.elementCollection = '';
            $("#elementCollection").val(null).trigger('change');
            this.pagePreviewImgurl = '';
            this.isUpdate = false;
            this.hasFundId=false;
            this.updateId = '';
            $('#uploadFileInput1').on('change', function () {
                _this.uploadSuccessed1 = false;
                $('#uploadInput1').val($(this).val());
            });
            $('#uploadFileInput2').on('change', function () {
                _this.uploadSuccessed2 = false;
                $('#uploadInput2').val($(this).val());
            });
            $('#uploadFileInput3').on('change', function () {
                _this.uploadSuccessed3 = false;
                $('#uploadInput3').val($(this).val());
            });
            this.setAddData({ prdType: '1', elementValFrom: '0', elementValFrom2: '0', productOperateBaseCount: '0' });
            this.showDialog('', 'add');
            $("#previewImg").show();
        },
        showUpdate: function (item) {
			this.flagType = false;
			this.currentNewval = '';// 记录查询交易类型newval
			this.currentdiaproductOperateDesc = '';// 记录查询交易类型描述
            if (item.previewTemid) {
                this.getViewData(item.previewTemid, true);
            } else {
                for (var ele in this.elementShow) {
                    this.elementShow[ele] = true;
                }
            }
            this.pagePreviewImgurl = '';
            var _this = this;
            $('#uploadFileInput1').on('change', function () {
                _this.uploadSuccessed1 = false;
                $('#uploadInput1').val($(this).val());
            });
            $('#uploadFileInput2').on('change', function () {
                _this.uploadSuccessed2 = false;
                $('#uploadInput2').val($(this).val());
            });
						$('#uploadFileInput3').on('change', function () {
							_this.uploadSuccessed3 = false;
							$('#uploadInput3').val($(this).val());
						});
            this.isUpdate = true;
            if(this.fundIdList&&(this.fundIdList.indexOf(item.prdId)==-1)&&(item.prdType==1)){
                this.hasFundId=true;
            }else{
                this.hasFundId=false;
            }
            this.updateId = item.prdConfigId;
            this.setAddData(item);
            this.showDialog('', 'add');
            $("#previewImg").show();
        },
        add: function () {
            var _this = this;
            if(this.hasFundId&&this.channelId=='2'){
                return;
            }
            if(this.diaprdType !== '2'){
                if (!this.diaprdId || !this.diaprdTitle) {
                    this.showDialog('add', 'info', true, '产品ID和产品标题必填');
                    return;
                }
            }
            if (this.channelId == '') {
                this.showDialog('add', 'info', true, '渠道必须选择！');
                return false;
            }
            if (this.elementCollection == '') {
                this.showDialog('add', 'info', true, '模板必须选择！');
                return false;
            }
            // if ($("#uploadInput1").val() && $("#uploadInput1").val().indexOf('/res/') == -1 && $("#uploadInput1").val().indexOf('/mss/') == -1) {
            //     this.showDialog('add', 'info', true, '图片选择后请上传！');
            //     return false;
            // }
            if (this.diaprdStarScore) {
                if (!(this.diaprdStarScore % 1 === 0)) {
                    this.showDialog('add', 'info', true, '产品星级评分取值不对，请确认在[0,50]内取整数');
                    return;
                }
                //判断评分是否为整数是否在正确范围内
                if (parseInt(this.diaprdStarScore) > 50 || parseInt(this.diaprdStarScore) < 0) {
                    this.showDialog('add', 'info', true, '产品星级评分取值不对，请确认在[0,50]内取整数');
                    return;
                }
            }
            if (this.diaprogressBarScore) {
                if (!(this.diaprogressBarScore % 1 === 0)) {
                    this.showDialog('add', 'info', true, '进度条分值取值不对，请确认在[1,100]内取整数');
                    return;
                }
                //判断评分是否为整数是否在正确范围内
                if (parseInt(this.diaprogressBarScore) > 100 || parseInt(this.diaprogressBarScore) < 1) {
                    this.showDialog('add', 'info', true, '进度条分值取值不对，请确认在[1,100]内取整数');
                    return;
                }
            }
            var params = {};
            // params.prdId = this.diaprdId;
            // params.prdTitle = this.diaprdTitle;
            params.prdSubTitle = this.diaprdSubTitle;
            params.shiftGroupNo = this.diashiftGroupNo;
            params.prdTags = this.diaprdTags;
            params.prdTagsDesc = this.diaprdTagsDesc;
            params.prdGraphUrl = this.diaprdGraphUrl;
            params.progressBarDisplayTxt = this.diaprogressBarDisplayTxt;
            params.progressBarScoreObtainType  = this.diaprogressBarScoreObtainType ; //20220214新加查询进度条数据字段
            params.progressBarScoreObtainId = this.diaprogressBarScoreObtainId;      //20220214新加产品代码字段
            if(this.diaprogressBarScoreObtainType==1){
                this.diaprogressBarScore='';
            }
            params.progressBarScore = this.diaprogressBarScore;
            params.progressBarScoreDesc = this.diaprogressBarScoreDesc;
            params.prdMarketContent = this.diaprdMarketContent;
            params.prdMarketUrl = this.diaprdMarketUrl;
            params.prdRecommendTitle = this.diaprdRecommendTitle;
            params.prdRecommendContent = this.diaprdRecommendContent;
            params.prdBtnName = this.diaprdBtnName;
            params.prdType = this.diaprdType;
            params.prdRecomIdentify = this.diaprdRecomIdentify;
            params.prdStartDateDesc = this.diaprdStartDateDesc;
            params.prdEndDateDesc = this.diaprdEndDateDesc;
            params.prdStarName = this.diaprdStarName;
            params.prdStarScore = this.diaprdStarScore;
            params.recomElementNm = this.diarecomElementNm;
            params.recomElementNmTips  = this.diarecomElementNmTips ;
            params.recomElementRemark = this.diarecomElementRemark;
            params.recomElementVal = this.diarecomElementVal;
            params.elementValFrom = this.diaelementValFrom;
            params.recomElementUnit = this.diarecomElementUnit;
            params.recomElementNm2 = this.diarecomElementNm2;
            params.recomElementNm2Tips = this.diarecomElementNm2Tips ;
            params.recomElementRemark2 = this.diarecomElementRemark2;
            params.recomElementVal2 = this.diarecomElementVal2;
            params.elementValFrom2 = this.diaelementValFrom2;
            params.recomElementUnit2 = this.diarecomElementUnit2;
            params.secondaryInfoTypeName = this.diasecondaryInfoTypeName;
            params.secondaryInfoTitle = this.diasecondaryInfoTitle;
            params.secondaryInfoBtnName = this.diasecondaryInfoBtnName;
            params.secondaryInfoBtnUrl = this.diasecondaryInfoBtnUrl;
            params.secondaryInfoContent = this.diasecondaryInfoContent;
            params.secondaryInfoJumpurl = this.diasecondaryInfoJumpurl;
            params.secondaryInfoImgJumpurl = this.diasecondaryInfoImgJumpurl;
            params.productOperateType = this.diaproductOperateType;
            params.productOperateBaseCount = this.diaproductOperateBaseCount;
            params.productOperateDesc = this.diaproductOperateDesc;
            params.productBackgroundImageUrl = $('#uploadInput2').val();
            params.attachedImageUrl = $('#uploadInput3').val();
            params.url = this.diaurl;
			params.imageCacheFlag = this.diaimageCacheFlag;
            params.secondaryInfoImgUrl = $('#uploadInput1').val();
            params.prdStartDate = $('#prdStartDate').val();
            params.prdEndDate = $('#prdEndDate').val();
            params.channelId = this.channelId;
            params.remark = this.diaremark;
            params.previewTemid = this.elementCollection;
            this.isUpdate && (params.prdConfigId = this.updateId);
            !this.isUpdate && (params.createBy = this.userId);
            this.isUpdate && (params.modifyBy = this.userId);

            if (this.diaprdType === '2') {
                params.prdidObtainType = this.prdidObtainType
                params.prdtitleObtainType = this.prdtitleObtainType
                if (this.prdidObtainType == '0') {
                    params.prdId = this.diaprdId
                    if(this.prdtitleObtainType=='0'){
                        params.prdTitle = this.diaprdTitle
                    }
                }
              
            } else {
                params.prdidObtainType = '0'
                params.prdtitleObtainType = '0'
                params.prdId = this.diaprdId
                params.prdTitle = this.diaprdTitle
            }
            // console.log(params)
            var url = '/recommendSystem/recommendSystemTemplateConfig/productTemplateConfig/';
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
                url: '/recommendSystem/recommendSystemTemplateConfig/productTemplateConfig/upload1.ajax',
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
        // 上传图片1
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
                url: '/recommendSystem/recommendSystemTemplateConfig/productTemplateConfig/upload1.ajax',
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
        uploadPic3: function () {
            if (!$('#uploadInput3').val()) {
                this.showDialog('add', 'info', true, '未选择要上传的图片');
                return;
            }
            if (!/.+(\.gif|\.jpeg|\.png|\.jpg|\.bmp)$/.test($('#uploadInput3').val())) {
                this.showDialog('add', 'info', true, '文件格式错误');
                return;
            }
            this.loadingShow = true;
            this.uploadSuccessed3 = false;
            var _this = this;
            $.ajaxFileUpload({
                url: '/recommendSystem/recommendSystemTemplateConfig/productTemplateConfig/upload1.ajax',
                type: 'POST',
                dataType: 'json',
                fileElementId: 'uploadFileInput3',
                success: function (result) {
                    _this.loadingShow = false;
                    if (result.error === 0) {
                        _this.uploadSuccessed3 = true;
                        $('#uploadInput3').val(result.data);
                        _this.showDialog('', 'add');
                    }
                    else {
                        _this.showDialog('add', 'info', true, result.msg);
                    }
                }
            });
        },	
        //删除
        deleteParams: function (item) {
            this.deleteId = item.prdConfigId;
            this.showDialog('', 'delete1', false);
        },
        deleteConfirm: function () {
            var _this = this;
            $.post({
                url: '/recommendSystem/recommendSystemTemplateConfig/productTemplateConfig/delete.ajax',
                data: { prdConfigId: this.deleteId },
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
        fresh: function () {
            var _this = this;
            $.post({
                url: '/recommendSystem/recommendSystemTemplateConfig/productTemplateConfig/fresh.ajax',
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
                    this.tableData[j].objconfigId=this.tableData[j].prdConfigId;
                    this.tableData[j].startTime='';
                    this.tableData[j].endTime='';
                    this.tableData[j].modifyTime='';
                    this.tableData[j].typeKey='product';
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
                var url="/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt.html?pageType=Modify&contentTp=product&channelId="+channelIds[0]
                storage.setItem("product",JSON.stringify(ids));
                window.open(url);
            }
        },
        configThis:function(item){
            var ids = [];
            var channelIds=item.channelId;
            var obj={
                objconfigId:item.prdConfigId,
                startTime:'',
                endTime:'',
                modifyTime:'',
                typeKey:'product',
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
                var url="/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt.html?pageType=Modify&contentTp=product&channelId="+channelIds+'&objconfigId='+ids[0].objconfigId;
                storage.setItem("product",JSON.stringify(ids));
                window.open(url);
            }
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
            if (val) {
                var str = val.toString();
                if (str.length > 10) {
                    str = str.substring(0, 10) + '...'
                }
            } else {
                str = '-';
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
        openTyString: function (val) {
            if (val) {
                switch (val) {
                    case '0':
                        val = '开放申赎';
                        break;
                    case '2':
                        val = '暂停定投';
                        break;
                    case '4':
                        val = '暂停交易';
                        break;
                    case '5':
                        val = '暂停申购';
                        break;
                    case '6':
                        val = '暂停赎回';
                        break;
                    case '7':
                        val = '募集中';
                        break;
                    case '9':
                        val = '封闭期';
                        break;
                    default:
                        val = '-';
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
        }
    }
});
