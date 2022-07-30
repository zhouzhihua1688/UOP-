new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        tableData: [],
        themeContentData: [],
        userId: '',
        diaMsg: '',
        previewPath: '',
        loadingStatus: '数据获取中...',
        updateId: '',
        updateId1: '',
        deleteId1: '',
        deleteId2: '',
        deleteId3: '',
        isUpdate: false,
        isUpdate1: false,
        uploadSuccessed1: false,
        uploadSuccessed2: false,
        uploadSuccessed3: false,
        uploadSuccessed4: false,
        uploadSuccessed5: false,
        uploadSuccessed6: false,
        isDataForm:false,
        loadingShow: false,
        themeBackgroundColor:'',
        currentTime: '',
        //第一阶菜单列表
        firstMenuData: '',
        firstMenuList: [],
        positionList: [],
        positionDetailList: [],
        contentTpList: [],
        linkDataInfoList: [],
        scenekeyList: [],
        position: '',
        positionDetail: '',
        positionName: '',
        //第一层增删改查Dialog数据
        diathemenm: '',
        diathemeTitle: '',
        diathemeTitleDisplayMode: '',
        diathemesubTitle: '',
        diathemeDescription: '',
        diaremark: '',
        diabackgroundImageUrl: '',
        diaexternalNavigationColor: '',
        diadisableBackgroundMode: '',
        diaupperleftTitle: '',
        diaviewmoreTitle: '',
        diaviewmoreUrl: '',
        diadisplayCount: '',
        diabottomBtnName: '',
        diabottomBtnUrl: '',
        diashowtp: '',
        diasort: '',
        diacolumnNum: '',
        diarowNum: '',
        diacontentTp: '',
        diacontentName: '',
        diatemId : '', //模板Id
        diadataFrom: '',
        diathemeTitlePosition: '',
        diahasTopMargin: '',
        diabackgroundMode: '',
        diadynamicscenekey: '',
        //第二层查看主题内容数据
        contentTp: '',
        thmconfigId: '',
        //fundgroup,loadpage,funcbtn,manager,wx_funcbtn,custombtn
        urlList: {index: 'res-template-market-index',
            fund:'res-fund-recommend-config',
            advice:'res-advice-info-config',
            funcbtn:'res-pagefuncbtn-config',
            adImg:'res-adv-Image',
            notice:'res-notice-config',
            webanner:'res-webanner-config',
            weprod:'res-product-config',
            activity:'res-weixin-activity-config',
            custombtn:'res-appfuncbtn-info',
            loadpage:'res-loadpage-config',
            fundgroup:'res-fund-group-config',
            manager:'res-fund-manager-config',
            wx_fund:'res-wx-fund-config',
            wx_funcbtn:'res-wx-funcbtn-info',
            wx_adImg:'res-wx-adv-image',
            product:'res-template-products',
            wx_product:'res-wx-product',
            wap_advice:'res-wap-adviceinfo',
            tags:'res-template-tags-config',
            coupon:'res-coupon-config',
            leavemsg:'res-template-leavemsg',
            popup:'res-template-popup',
            privilege:'res-template-privilege',
            survey:'res-template-survey',
            composite:'res-composite-config'
        },
        tpForUri:{
            index: '/recommendSystem/recommendSystemTemplateConfig/thermalIndexConfig.html',
            fund:'/recommendSystem/recommendSystemTemplateConfig/fundRecommendContentConfig.html',
            advice:'/recommendSystem/recommendSystemTemplateConfig/informationContentConfig.html',
            funcbtn:'/recommendSystem/recommendSystemTemplateConfig/homePgButtonConfig.html',
            adImg:'/recommendSystem/recommendSystemTemplateConfig/imgAdContentConfig.html',
            notice:'/recommendSystem/recommendSystemTemplateConfig/informTemplateConfig.html',
            webanner:'/recommendSystem/recommendSystemTemplateConfig/appletImgRecommend.html',
            weprod:'/recommendSystem/recommendSystemTemplateConfig/appletProductRecommend.html',
            activity:'/recommendSystem/recommendSystemTemplateConfig/wxActivityConfig.html',
            custombtn:'/recommendSystem/recommendSystemTemplateConfig/AppBaseConfig.html',
            loadpage:'/recommendSystem/recommendSystemTemplateConfig/loadPageConfigMgmt.html',
            fundgroup:'/recommendSystem/recommendSystemTemplateConfig/combineContentConfig.html',
            manager:'/recommendSystem/recommendSystemTemplateConfig/fundManagerContentConfig.html',
            wx_fund:'/recommendSystem/recommendSystemTemplateConfig/wxFundRecommend.html',
            wx_funcbtn:'/recommendSystem/recommendSystemTemplateConfig/wxBaseConfig.html',
            wx_adImg:'/recommendSystem/recommendSystemTemplateConfig/wxImgAdConfig.html',
            product:'/recommendSystem/recommendSystemTemplateConfig/productTemplateConfig.html',
            wx_product:'/recommendSystem/recommendSystemTemplateConfig/wxProductTemplateConfig.html',
            wap_advice:'/recommendSystem/recommendSystemTemplateConfig/wapInformationTemplateConfig.html',
            tags:'/recommendSystem/recommendSystemTemplateConfig/labelTemplateConfig.html',
            // coupon:'res-coupon-config',
            leavemsg:'/recommendSystem/recommendSystemTemplateConfig/messageTemplateConfig.html',
            popup:'/recommendSystem/recommendSystemTemplateConfig/popUpsConfig.html',
            privilege:'/recommendSystem/recommendSystemTemplateConfig/privilegeConfig.html',
            survey:'/recommendSystem/recommendSystemTemplateConfig/questionnaireSurvey.html',
            composite:'/recommendSystem/recommendSystemTemplateConfig/blackBoardConfig.html'
        },
        //二阶新增内容
        diaobjconfigId: '',
        diaposition: '',
        diatargetobjectkey:'',
        //tab主题分组管理数据
        tableData1: [],
        userGroupList: [],
        currentTypeKey:'',
        linkThmconfigId:'',
        //excel导入
        isCover:'0',
        //channelId传入
        channelId:'',
				channelMenu:[],//渠道列表
				// 查询渠道列表
				searchChannelId:'',
				searchChannelFlag:false,//防止第一次变化发生两次请求
				// 现有材料列表分页
				condition: '',
				currentIndex2: 0,
				maxSpace2: 5,
				totalPage2: 0,
				pageMaxNum2: 10,
				existingMaterialList:[],
					// 一级分类list
				topDialogCategoryList:[],
				// 二级分类list
				secondDialogCategoryList:[],
				// 三级分类list
				thirdDialogCategoryList:[],
				topDialogCategoryId:'',
				secondDialogCategoryId:'',
				thirdDialogCategoryId:'',
				searchTitle:'',
				
    },
    computed: {
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
			// 现有材料搜索用到的categoryId
			searchCategoryId:function(){
				if(this.topDialogCategoryId&&this.secondDialogCategoryId&&this.thirdDialogCategoryId){
					return this.thirdDialogCategoryId
				}else if(this.topDialogCategoryId&&this.secondDialogCategoryId&&!this.thirdDialogCategoryId){
					return this.secondDialogCategoryId
				}else if(this.topDialogCategoryId&&!this.secondDialogCategoryId&&!this.thirdDialogCategoryId){
					return this.topDialogCategoryId
				}else{
					return ''
				}
			}
    },
    watch: {
        firstMenuData:{
            handler:function (val,oldval) {
                var _this=this;
                this.firstMenuList.forEach(function (item) {
                    if(val==item.LAYOUTID){
                        _this.channelId=item.CHANNELID;
                    }
                });
                this.contentTp='';
                this.position='';
                this.isCover='0';
                $('#uploadInput4').val='';
                this.getSubmenuList();
            }
        },
        position: function () {
            this.isCover='0';
            $('#uploadInput4').val='';
            this.getSubmenuList();
        },
        positionDetail:{
            handler:function (val,oldval) {
								if(val){
									this.getTableData();
								}
                var _this=this;
                this.tableData1=[];
                
                // console.log(this.positionDetailList,'123');
                this.contentTp='';
                this.positionDetailList.forEach(function (item) {
                    if(item.FUNCMODID==val){
                        _this.positionName= item.FUNCMODNAME;
                        item.CONTENTTP&&(_this.contentTp=item.CONTENTTP);
                    }
                })
            }
        },
        contentTp: {
            handler:function (val,oldval) {
                var _this=this;
				this.themeContentData = [];
                this.linkDataInfoList = [];
                this.diacontentTp=val;
                this.contentTpList.forEach(function (item) {
                    if(item.contentKey==val){
                        _this.diacontentName= item.contentName;
                    }
                })
            }
        },
        linkThmconfigId:function () {
            this.tableData1=[];
            this.getTableData1();
        },
		searchChannelId:function(){
			if(this.searchChannelFlag){
				this.getMenuList()
				this.tableData1=[];
				this.tableData=[];
			}
			this.searchChannelFlag = true;
		},
		// 现有材料部分
		topDialogCategoryId:function(newval,oldval){
			this.secondDialogCategoryList = this.topDialogCategoryList.find(function(item){
				return item.categoryId == newval
			}).categoryConfigList;
			this.secondDialogCategoryId= '';
			this.thirdDialogCategoryId = '';
			this.thirdDialogCategoryList = [];
		},
		secondDialogCategoryId:function(newval,oldval){
			this.thirdDialogCategoryId = '';
			this.thirdDialogCategoryList = [];
			this.getThirdDialogCategoryList(newval)
		}
    },
    mounted: function () {
        var _this = this;
        var dialogs = ['info','excelUpdate','delete1','delete2'];
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
        _this.currentTime = new Date();
        $('#uploadBtn1').click(function () {
            $('#uploadFileInput1').click();
        });
        $('#uploadBtn2').click(function () {
            $('#uploadFileInput2').click();
        });
        $('#uploadBtn3').click(function () {
            $('#uploadFileInput3').click();
        });
        $('#uploadBtn4').click(function () {
            $('#uploadFileInput4').click();
        });
        $('#uploadBtn5').click(function () {
            $('#uploadFileInput5').click();
        });
        $('#uploadBtn6').click(function () {
            $('#uploadFileInput6').click();
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
        // 色块选择
        $(".colorBlock").on("click",function(){
            $(".colorBlock").removeClass("chosenActive");   
            $(this).addClass("chosenActive");
            _this.themeBackgroundColor=$(this).attr('data-color');
        })
        // this.getTableData(0);
        this.getMenuList();
        this.getUserGroupList();
        $('#objconfigId').css('width', '200px').select2({});
        $("#objconfigId").on("select2:select", function (e) {
            _this.diaobjconfigId = e.params.data.id;
        });
        $.post({
            url: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/queryContentTp.ajax',
            data:{pageNo:1,pageSize:100},
            success: function (result) {
                if (result.error === 0) {
                    // console.log(result);
                    _this.contentTpList = result.data.rows;
                } else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });
        //数据场景值列表获取
        $.post({
            url: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/queryScenekeyList.ajax',
            success: function (result) {
                if (result.error === 0) {
                    // console.log(result,'queryScenekeyList');
                    _this.scenekeyList = result.data.rows;
                } else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });
				this.getTopCategoryList();
    },
    methods: {
        //获取一级菜单列表
        getMenuList: function () {
            var _this = this;
            $.post({
                url: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/queryMenuList.ajax',
								data:{channelId:this.searchChannelId},
                success: function (result) {
                    if (result.error === 0) {
                        // console.log(result,"menu");
												_this.firstMenuData = '';
												$("#firstMenu").val(null).trigger('change');
                        _this.firstMenuList = result.data.firstMenuList;
												$('#firstMenu').css('width', '200px').select2({});
												$("#firstMenu").on("select2:select", function (e) {
														// e 的话就是一个对象 然后需要什么就 “e.参数” 形式 进行获取
														_this.firstMenuData = e.params.data.id;

												});
												if(result.data.channelList){
													_this.channelMenu = result.data.channelList;
													_this.searchChannelId = _this.channelMenu[0].channelId;
												} 
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        //获取二级/三级菜单
        getSubmenuList: function () {
            var _this = this;
            var params = {};
            params.layoutId = this.firstMenuData;
            this.position && (params.position = this.position);
						this.searchChannelId && (params.channelId = this.searchChannelId)
            $.post({
                url: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/querySubmenuList.ajax',
                data: params,
                success: function (result) {
                    // console.log(result,'submenu');
                    if (result.error === 0) {
                        !_this.position && (_this.positionList = result.data[0]);
                        _this.position && (_this.positionDetailList = result.data[0]);
                        _this.position && (_this.diatemId = result.data[0][0]&&result.data[0][0].TEMID?result.data[0][0].TEMID:'');
                        // _this.contentTp = result.data[0].contentTp;
                        _this.positionDetail = _this.positionDetailList.length > 0 ? _this.positionDetailList[0].FUNCMODID : '';
                        _this.positionName = _this.positionDetailList.length > 0 ? _this.positionDetailList[0].FUNCMODNAME : '';
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        getTableData: function () {
            var params = {};
            var _this = this;
            params.funcModId = this.positionDetail;
            params.previewTemid = this.diatemId;
            $.post({
                url: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/queryThemeInfo.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        // console.log(result, 'tableResult');
                        _this.userId = result.user;
                        // if (result.data.length > 0) {
                        //     // console.log(result.data);
                        //     _this.contentTp = result.data[0].contentTp;
                        //     // _this.thmconfigId = result.data[0].thmconfigId;
                        // }
                        _this.tableData = result.data;
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        //新增活动配置
        setAddData: function (obj) {
            var _this=this;
            this.diathemenm = obj.themenm ? obj.themenm : '';
            this.diathemeTitle = obj.themeTitle ? obj.themeTitle : '';
            this.diathemesubTitle = obj.themesubTitle ? obj.themesubTitle : '';
            this.diathemeTitleDisplayMode = obj.themeTitleDisplayMode ? obj.themeTitleDisplayMode : '';
            this.diathemeDescription = obj.themeDescription ? obj.themeDescription : '';
            this.diaremark = obj.remark ? obj.remark : '';
            // this.diabackgroundImageUrl = obj.backgroundImageUrl ? obj.backgroundImageUrl : '';
            this.diaexternalNavigationColor = obj.externalNavigationColor ? obj.externalNavigationColor : '';
            this.diadisableBackgroundMode = obj.disableBackgroundMode ? obj.disableBackgroundMode : '';
            this.diaupperleftTitle = obj.upperleftTitle ? obj.upperleftTitle : '';
            this.diaviewmoreTitle = obj.viewmoreTitle ? obj.viewmoreTitle : '';
            this.diaviewmoreUrl = obj.viewmoreUrl ? obj.viewmoreUrl : '';
            this.diadisplayCount = obj.displayCount ? obj.displayCount : '';
            this.diabottomBtnName = obj.bottomBtnName ? obj.bottomBtnName : '';
            this.diabottomBtnUrl = obj.bottomBtnUrl ? obj.bottomBtnUrl : '';
            this.diashowtp = obj.showtp ? obj.showtp : '';
            this.diasort = obj.sort ? obj.sort : '';
            this.diacolumnNum = obj.columnNum ? obj.columnNum : '';
            this.diarowNum = obj.rowNum ? obj.rowNum : '';
            this.diacontentTp = obj.contentTp ? obj.contentTp : '';
            this.diadataFrom = obj.dataFrom ? obj.dataFrom : '';
            this.diadataFrom&&(this.diadynamicscenekey = obj.dynamicscenekey ? obj.dynamicscenekey : '');
            this.diathemeTitlePosition = obj.themeTitlePosition ? obj.themeTitlePosition : '';
            this.diahasTopMargin = obj.hasTopMargin ? obj.hasTopMargin : '';
            this.diabackgroundMode = obj.backgroundMode ? obj.backgroundMode : '';
            $('#uploadInput1').val(obj.themeIconUrl ? obj.themeIconUrl : '');
            $('#uploadInput2').val(obj.imageUrl ? obj.imageUrl : '');
            $('#uploadInput3').val(obj.themeTitleImageUrl ? obj.themeTitleImageUrl : '');
            $('#uploadInput5').val(obj.viewMoreImageUrl ? obj.viewMoreImageUrl : '');
            $('#uploadInput6').val(obj.backgroundImageUrl ? obj.backgroundImageUrl : '');
            $(".colorBlock").each(function(){
                console.log(obj.themeBackgroundColor);
                if(obj.themeBackgroundColor&&obj.themeBackgroundColor==$(this).attr('data-color')){
                    $(this).addClass('chosenActive');
                    _this.themeBackgroundColor=$(this).attr('data-color')
                }else{
                    $(this).removeClass('chosenActive')
                }
            });
        },
        //第二级新增修改活动配置
        setAddData1: function (obj) {
            this.diaobjconfigId = obj.objconfigId ? obj.objconfigId : '';
            $("#objconfigId").val(obj.objconfigId ? obj.objconfigId : '').trigger('change');
            this.diaposition = obj.position ? obj.position : '';
            this.diatargetobjectkey = obj.targetobjectkey ? obj.targetobjectkey : '';
            $('#startTime').val(obj.startTime ? obj.startTime : '');
            $('#endTime').val(obj.endTime ? obj.endTime : '');
        },
        showAdd: function () {
            this.isUpdate = false;
            this.uploadSuccessed1 = false;
            this.uploadSuccessed2 = false;
            this.uploadSuccessed3 = false;
            this.uploadSuccessed5 = false;
            this.updateId = '';
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
            $('#uploadFileInput5').on('change', function () {
                _this.uploadSuccessed5 = false;
                $('#uploadInput5').val($(this).val());
            });
            $('#uploadFileInput6').on('change', function () {
                _this.uploadSuccessed6 = false;
                $('#uploadInput6').val($(this).val());
            });
            this.setAddData({showtp: '2', dataFrom: '0', hasTopMargin: '1',contentTp:this.contentTp});
            this.showDialog('', 'add');
        },
        copyParams: function(item){
            var params = {};
            var _this = this;
            params.thmconfigId  = item.thmconfigId;
            $.post({
                url: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/copyInfo.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('', 'info', false, result.msg);
                        _this.getTableData();
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        //二级新增
        showAddSecond: function () {
            this.isUpdate1 = false;
            this.updateId1='';
            $("#objconfigId").prop('disabled',false);
            // $("#objconfigId").removeAttr("disabled").css("background","#fff");
            $("#objconfigId").val(null).trigger('change');
            if(this.linkDataInfoList.length>0){
                this.setAddData1({objectConfigId: this.linkDataInfoList[0].value});
            }else{
                this.setAddData1({objectConfigId: ''});
            }
            this.showDialog('checkThemeContent', 'addSecond', true);
            // $("#checkThemeContent").modal("hide");
        },
        showUpdate: function (item) {
            // console.log(item);
            this.contentTp=item.contentTp;
            this.isUpdate = true;
            this.updateId = item.thmconfigId;
            this.uploadSuccessed1 = true;
            this.uploadSuccessed2 = true;
            this.uploadSuccessed3 = true;
            this.uploadSuccessed5 = true;
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
            $('#uploadFileInput5').on('change', function () {
                _this.uploadSuccessed5 = false;
                $('#uploadInput5').val($(this).val());
            });
            $('#uploadFileInput6').on('change', function () {
                _this.uploadSuccessed6 = false;
                $('#uploadInput6').val($(this).val());
            });
            this.setAddData(item);
            this.showDialog('', 'add');
        },
        showUpdateSecond: function (item) {
            // console.log(item);
            this.isUpdate1 = true;
            this.updateId1=item.objconfigId;
            // $("#objconfigId").attr("disabled", "disabled").css("background","#eee");
            $("#objconfigId").val(null).trigger('change');
            $("#objconfigId").prop('disabled',true);
            item.startTime=this.formatTime(item.startTime);
            item.endTime=this.formatTime(item.endTime);
            this.setAddData1(item);
            this.showDialog('checkThemeContent', 'addSecond', true);
            // $("#checkThemeContent").modal("hide");
        },
        //excel文件上传弹窗
        showExcelImport: function () {
            // $('#uploadInput4').val('');
            this.uploadSuccessed4 = false;
            var _this = this;
            $('#uploadFileInput4').on('change', function () {
                _this.uploadSuccessed4 = false;
                $('#uploadInput4').val($(this).val());
            });
            this.showDialog('', 'excelUpdate');
        },
        add: function () {
            var _this = this;
            if (this.diaInfoCheck()) {
                var params = {};
                params.themenm = this.diathemenm;
                params.templateId = this.positionDetail;
                params.themeTitle = this.diathemeTitle;
                params.themeTitleDisplayMode = this.diathemeTitleDisplayMode;
                params.themesubTitle = this.diathemesubTitle;
                params.themeDescription = this.diathemeDescription;
                params.remark = this.diaremark;
                params.backgroundImageUrl = $('#uploadInput6').val();
                params.externalNavigationColor = this.diaexternalNavigationColor;
                params.disableBackgroundMode = this.diadisableBackgroundMode;
                params.upperleftTitle = this.diaupperleftTitle;
                params.viewmoreTitle = this.diaviewmoreTitle;
                params.viewmoreUrl = this.diaviewmoreUrl;

                params.displayCount = this.diadisplayCount;
                params.bottomBtnName = this.diabottomBtnName;
                params.bottomBtnUrl = this.diabottomBtnUrl;
                params.showtp = this.diashowtp;
                params.sort = this.diasort;
                params.columnNum = this.diacolumnNum;
                params.rowNum = this.diarowNum;
                params.contentTp = this.diacontentTp;
                params.previewTemplateId = this.diatemId;
                params.dataFrom = this.diadataFrom;
                (this.diadataFrom=='1'||this.diadataFrom=='2'||this.diadataFrom=='5') && (params.dynamicscenekey = this.diadynamicscenekey);
                params.themeTitlePosition = this.diathemeTitlePosition;
                params.hasTopMargin = this.diahasTopMargin;
                params.backgroundMode = this.diabackgroundMode;
                params.themeIconUrl = $('#uploadInput1').val();
                params.imageUrl = $('#uploadInput2').val();
                params.themeTitleImageUrl = $('#uploadInput3').val();
                params.viewMoreImageUrl = $('#uploadInput5').val();
                params.themeBackgroundColor = this.themeBackgroundColor;
                
                if(!params.contentTp){
                    _this.showDialog('add', 'info', true, '主题对应内容类型必填');
                    return false;
                }
                this.isUpdate && (params.thmconfigId = this.updateId);
                !this.isUpdate && (params.createBy = this.userId);
                !this.isUpdate && (params.templateId = this.positionDetail);
                this.isUpdate && (params.modifyBy = this.userId);
                var url = '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/';
                url += this.isUpdate ? 'update.ajax' : 'add.ajax';
                $.post({
                    url: url,
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.getTableData();
                        }
                        _this.showDialog('add', 'info', false, result.msg);
                    }
                });
            }
        },
        addSecond: function () {
            var _this = this;
            var params = {};
            if(this.contentTp!='emptyContent'){
                !this.isUpdate1&&(params.objconfigId = this.diaobjconfigId) ;
            }
						if(this.contentTp!='externalMedia'){
							this.isUpdate1&&(params.objconfigId = this.updateId1) ;
						}else{
							this.isUpdate1&&(params.objconfigId = this.diaobjconfigId) ;
						}
            // if(this.diatargetobjectkey==''&&this.isDataForm){
            //     _this.showDialog('addSecond', 'info', true, '目标过滤因子必须填写！');
            //     return;
            // }
            params.position = this.diaposition;
            params.targetobjectkey = this.diatargetobjectkey;
            params.startTimein = $('#startTime').val();
            params.endTimein = $('#endTime').val();
            params.modifyBy = this.userId;
            params.thmconfigId = this.thmconfigId;
            params.typeKey = this.contentTp;
						console.log(params);
            var url = '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/';
            url += this.isUpdate1 ? 'update1.ajax' : 'add1.ajax';
            $.post({
                url: url,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        $.post({
                            url: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/checkThemeContent.ajax',
                            data: {thmconfigId: _this.thmconfigId, themType: _this.contentTp},
                            success: function (result) {
                                if (result.error === 0) {
                                    $('#addSecond').modal("hide");
                                    // console.log(result, 'update,add');
                                    _this.themeContentData = result.data;
                                    _this.showDialog('addSecond', 'checkThemeContent', false);
                                } else {
                                    $('#checkThemeContent').modal("hide");
                                    _this.showDialog('addSecond', 'info', true, result.msg);
                                }
                            }
                        })
                    }else{
                        // console.log(123);
                        $('#checkThemeContent').modal("hide");
                        _this.showDialog('addSecond', 'info', true, result.msg);
                    }
                }
            });
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
            this.showDialog('add');
            this.loadingShow = true;
            this.uploadSuccessed1 = false;
            var _this = this;
            $.ajaxFileUpload({
                url: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/upload1.ajax',
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
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });

        },
        // 上传图片2
        uploadPic2: function () {
            if (!$('#uploadInput2').val()) {
                this.showDialog('add', 'info', true, '未选择要上传的图片');
                return;
            }
            if (!/.+(\.gif|\.jpeg|\.png|\.jpg|\.bmp)$/.test($('#uploadInput2').val())) {
                this.showDialog('add', 'info', true, '文件格式错误');
                return;
            }
            this.showDialog('add');
            this.loadingShow = true;
            this.uploadSuccessed2 = false;
            var _this = this;
            $.ajaxFileUpload({
                url: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/upload2.ajax',
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
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });

        },
        // 上传图片3
        uploadPic3: function () {
            if (!$('#uploadInput3').val()) {
                this.showDialog('add', 'info', true, '未选择要上传的图片');
                return;
            }
            if (!/.+(\.gif|\.jpeg|\.png|\.jpg|\.bmp)$/.test($('#uploadInput3').val())) {
                this.showDialog('add', 'info', true, '文件格式错误');
                return;
            }
            this.showDialog('add');
            this.loadingShow = true;
            this.uploadSuccessed3 = false;
            var _this = this;
            $.ajaxFileUpload({
                url: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/upload3.ajax',
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
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });

        },
         // 上传图片6
         uploadPic6: function () {
            if (!$('#uploadInput6').val()) {
                this.showDialog('add', 'info', true, '未选择要上传的图片');
                return;
            }
            if (!/.+(\.gif|\.jpeg|\.png|\.jpg|\.bmp)$/.test($('#uploadInput6').val())) {
                this.showDialog('add', 'info', true, '文件格式错误');
                return;
            }
            this.showDialog('add');
            this.loadingShow = true;
            this.uploadSuccessed6 = false;
            var _this = this;
            $.ajaxFileUpload({
                url: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/upload6.ajax',
                type: 'POST',
                dataType: 'json',
                fileElementId: 'uploadFileInput6',
                success: function (result) {
                    _this.loadingShow = false;
                    if (result.error === 0) {
                        _this.uploadSuccessed6 = true;
                        $('#uploadInput6').val(result.data);
                        _this.showDialog('', 'add');
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        // 上传图片4
        uploadPic5: function () {
            if (!$('#uploadInput5').val()) {
                this.showDialog('add', 'info', true, '未选择要上传的图片');
                return;
            }
            if (!/.+(\.gif|\.jpeg|\.png|\.jpg|\.bmp)$/.test($('#uploadInput5').val())) {
                this.showDialog('add', 'info', true, '文件格式错误');
                return;
            }
            this.showDialog('add');
            this.loadingShow = true;
            this.uploadSuccessed5 = false;
            var _this = this;
            $.ajaxFileUpload({
                url: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/upload5.ajax',
                type: 'POST',
                dataType: 'json',
                fileElementId: 'uploadFileInput5',
                success: function (result) {
                    _this.loadingShow = false;
                    if (result.error === 0) {
                        _this.uploadSuccessed5 = true;
                        $('#uploadInput5').val(result.data);
                        _this.showDialog('', 'add');
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });

        },
        //上传excel文件
        uploadPic4: function () {
            if (!$('#uploadInput4').val()) {
                this.showDialog('excelUpdate', 'info', true, '未选择要上传的Excel文件');
                return;
            }
            if (!/.+(\.xls|\.xlsx)$/.test($('#uploadInput4').val())) {
                this.showDialog('excelUpdate', 'info', true, '文件格式错误');
                return;
            }
            this.showDialog('excelUpdate');
            this.loadingShow = true;
            this.uploadSuccessed4= false;
            var _this = this;
            $.ajaxFileUpload({
                url: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/upload4.ajax',
                type: 'POST',
                dataType: 'json',
                fileElementId: 'uploadFileInput4',
                success: function (result) {
                    _this.loadingShow = false;
                    if (result.error === 0) {
                        _this.uploadSuccessed4 = true;
                        $('#uploadInput4').val(result.data);
                        _this.showDialog('', 'excelUpdate');
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });

        },
        //提交excel文件导入
        uploadExcel:function () {
            var _this=this;
            var params={};
            params.isCover=this.isCover;
            params.funcModid=this.positionDetail;
            params.user=this.userId;
            params.files=$('#uploadInput4').val();
            if(!_this.uploadSuccessed4){
                _this.showDialog('excelUpdate', 'info', true,'未上传文件，无法导入Excel');
            }
            $.post({
                url: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/uploadExcel.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        $("#excelUpdate").modal("hide");
                        _this.showDialog('', 'info', false, '导入成功');
                    } else {
                        _this.showDialog('excelUpdate', 'info', true, result.msg);
                    }
                }
            });
        },
        diaInfoCheck: function () {
            // if (!this.uploadSuccessed1) {
            //     this.showDialog('add', 'info', true, '未上传图片1');
            //     return false;
            // }
            // if (!this.uploadSuccessed2) {
            //     this.showDialog('add', 'info', true, '未上传图片2');
            //     return false;
            // }
            // if (!this.uploadSuccessed3) {
            //     this.showDialog('add', 'info', true, '未上传图片3');
            //     return false;
            // }
            if (!this.diathemenm) {
                this.showDialog('add', 'info', true, '主题名称不能为空');
                return false;
            }
            if (!this.diacontentTp) {
                this.showDialog('add', 'info', true, '内容类型不能为空');
                return false;
            }
            if (!this.diatemId) {
                this.showDialog('add', 'info', true, '模板类型不能为空');
                return false;
            }
            if (!this.diadisplayCount) {
                this.showDialog('add', 'info', true, '模块内容显示数量不能为空');
                return false;
            }
            if (!(/^[0-9]*[1-9][0-9]*$/).test(this.diadisplayCount)) {
                this.showDialog('add', 'info', true, '模块内容显示数量必须为整数');
                return false;
            }
            if (!this.diasort) {
                this.showDialog('add', 'info', true, '模块与主题关系排序不能为空');
                return false;
            }
            if (!(/^[0-9]*[1-9][0-9]*$/).test(this.diasort)) {
                this.showDialog('add', 'info', true, '模块与主题关系排序必须为整数');
                return false;
            }
            if (!this.diacolumnNum) {
                this.showDialog('add', 'info', true, '每行显示项数不能为空');
                return false;
            }
            if (!(/^[0-9]*[1-9][0-9]*$/).test(this.diacolumnNum)) {
                this.showDialog('add', 'info', true, '每行显示项数必须为整数');
                return false;
            }
            if (!this.diaremark) {
                this.showDialog('add', 'info', true, '备注不能为空，神策统计使用');
                return false;
            }
            return true;
        },
        //启用或禁用
        enableOrDisable: function (item) {
            var _this = this;
            $.post({
                url: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/enableHome.ajax',
                data: {thmconfigId: item.thmconfigId},
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('', 'info', false, '操作成功');
                        _this.getTableData();
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            })
        },
        //删除
        deleteParams: function (item) {
            this.deleteId1=item.thmconfigId;
            this.showDialog('', 'delete1', false);
        },
        deleteConfirm1: function () {
            var _this = this;
            $.post({
                url: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/delete.ajax',
                data: {thmconfigId: this.deleteId1},
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('', 'info', false, '操作成功');
                        _this.getTableData();
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            })
        },
        //二级删除
        deleteParamsSecond: function (item) {
            this.deleteId2=item.thmconfigId;
            this.deleteId3=item.objconfigId;
            this.showDialog('checkThemeContent', 'delete2', true);
        },
        deleteConfirm2: function () {
            var _this = this;
            $.post({
                url: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/delete1.ajax',
                data: {thmconfigId:  this.deleteId2,objconfigId: this.deleteId3},
                success: function (result) {
                    if (result.error === 0) {
                        $.post({
                            url: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/checkThemeContent.ajax',
                            data: {thmconfigId: _this.thmconfigId, themType: _this.contentTp},
                            success: function (result) {
                                if (result.error === 0) {
                                    // console.log(result, 'checkThemeContentResfer');
                                    _this.themeContentData = result.data;
                                    _this.showDialog('', 'checkThemeContent', false);
                                } else {
                                    _this.showDialog('checkThemeContent', 'info', false, result.msg);
                                }
                            }
                        })
                    } else {
                        _this.showDialog('checkThemeContent', 'info', true, result.msg);
                    }
                }
            })
        },
        //查看主题内容
        checkThemeContent: function (item) {
            this.isDataForm=false;
            this.thmconfigId=item.thmconfigId;
            this.contentTp=item.contentTp;
            (item.dataFrom=='4')&&(this.isDataForm=true);
            // console.log(item,'dataFrom');
            var _this = this;
            // console.log(item.contentTp);
            console.log(item);
            $.post({
                url: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/checkThemeContent.ajax',
                data: {thmconfigId: item.thmconfigId, themType: item.contentTp,channelId:this.channelId},
                success: function (result) {
                    if (result.error === 0) {
                        // console.log(result, 'checkThemeContent');
                        _this.themeContentData = result.data;
                        _this.showDialog('', 'checkThemeContent', false);
                        _this.linkDataInfoList = [];
                        if(item.contentTp!='emptyContent'&&item.contentTp!='externalMedia'){
                            _this.linkDataInfo();
                        }
                        
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            })
        },
        //获取关联数据信息
        linkDataInfo: function () {
            var _this = this;
            var params = {};
            params.urlJoin = _this.urlList[_this.contentTp];
            params.channelId=_this.channelId;
            params.previewTemid = _this.diatemId;
            // console.log(params.urlJoin);
            if(!params.urlJoin){
                _this.showDialog('checkThemeContent', 'info', true, "二级菜单新增功能未找到匹配的路径");
                return false;
            }
            $.post({
                url: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/linkDataInfo.ajax',
                data: params,
                success: function (result) {
                    console.log(result.data.rows,'product');
                    if (result.error === 0) {
                        if (result.data.rows.length > 0) {
                            //将关联数据信息整理统一格式由select展示
                            result.data.rows.forEach(function (item) {
                                if (_this.contentTp == "fund") {
                                    _this.linkDataInfoList.push({
                                        value: item.fundconfigId,
                                        name: item.fundconfigId + ':' + item.fundTitle
                                    })
                                } else if (_this.contentTp == "advice") {
                                    _this.linkDataInfoList.push({
                                        value: item.advconfigId,
                                        name: item.advconfigId + ':' + item.adviceTitle
                                    })
                                } else if (_this.contentTp == "funcbtn") {
                                    _this.linkDataInfoList.push({
                                        value: item.funcBtnId,
                                        name: item.funcBtnId + ':' + item.funcBtnName
                                    })
                                } else if (_this.contentTp == "adImg") {
                                    _this.linkDataInfoList.push({
                                        value: item.adImgId,
                                        name: item.remark == null ? '' :item.adImgId+":"+ item.remark
                                    })
                                } else if (_this.contentTp == "notice") {
                                    _this.linkDataInfoList.push({
                                        value: item.noticeId,
                                        name: item.noticeId + ':' + item.noticeValue
                                    });
                                } else if (_this.contentTp == "webanner") {
                                    _this.linkDataInfoList.push({
                                        value: item.weBannerId,
                                        name: item.weBannerId + ':' + item.remark
                                    });
                                } else if (_this.contentTp == "weprod") {
                                    _this.linkDataInfoList.push({value: item.weProdId, name: item.sceneName});
                                } else if (_this.contentTp == "activity") {
                                    _this.linkDataInfoList.push({value: item.id, name: item.id+":"+item.title});

                                } else if (_this.contentTp == "custombtn") {
                                    _this.linkDataInfoList.push({value: item.btnId, name: item.btnName+':'+item.btnKey});

                                } else if (_this.contentTp == "loadpage") {
                                    _this.linkDataInfoList.push({value: item.loadPageConfigId, name: item.remark});
                                } else if (_this.contentTp == "fundgroup") {
                                    _this.linkDataInfoList.push({
                                        value: item.fundGroupConfigId,
                                        name: item.fundGroupTitle
                                    });
                                } else if (_this.contentTp == "manager") {
                                    _this.linkDataInfoList.push({value: item.managerConfigId, name: item.managerConfigId+":"+item.managerName});
                                } else if (_this.contentTp == "wx_fund") {
                                    _this.linkDataInfoList.push({value: item.fundconfigId, name: item.fundTitle});
                                } else if (_this.contentTp == "wx_funcbtn") {
                                    _this.linkDataInfoList.push({value: item.btnId, name: item.btnName});
                                } else if (_this.contentTp == "wx_adImg") {
                                    _this.linkDataInfoList.push({
                                        value: item.adImgId,
                                        name: item.adImgId + ':' + item.remark
                                    });
                                } else if (_this.contentTp == "wx_product") {
                                    _this.linkDataInfoList.push({value: item.prdConfigId, name: item.prdConfigId+':'+item.prdTitle});
                                } else if (_this.contentTp == "index") {
                                    _this.linkDataInfoList.push({
                                        value: item.indexConfigId,
                                        name: (item.indexConfigId+":"+item.indexName)
                                    });
                                }else if (_this.contentTp == "product") {
                                    _this.linkDataInfoList.push({
                                        value: item.prdConfigId,
                                        name: (item.prdConfigId+":"+item.prdTitle+":"+item.remark)
                                    });
                                }else if (_this.contentTp == "coupon") {
                                    _this.linkDataInfoList.push({
                                        value: item.couponconfigid,
                                        name: (item.couponconfigid+":"+item.couponno)
                                    });
                                }else if (_this.contentTp == "tags") {
                                    _this.linkDataInfoList.push({
                                        value: item.tagConfigId,
                                        name: (item.tagConfigId+":"+item.tagName)
                                    });
                                } else if (_this.contentTp == "wap_advice") {
                                    _this.linkDataInfoList.push({
                                        value: item.advconfigId,
                                        name: (item.advconfigId+":"+item.adviceDesc)
                                    });
                                }
                                else if (_this.contentTp == "leavemsg") {
                                    _this.linkDataInfoList.push({
                                        value: item.msgConfigId,
                                        name: (item.msgConfigId+":"+item.remark)
                                    });
                                }
                                else if (_this.contentTp == "popup") {
                                    _this.linkDataInfoList.push({
                                        value: item.popupConfigId,
                                        name: (item.popupConfigId+":"+item.popTitle)
                                    });
                                }
                                else if (_this.contentTp == "privilege") {
                                    _this.linkDataInfoList.push({
                                        value: item.privilegeConfigId,
                                        name: (item.privilegeConfigId+":"+item.remark)
                                    });
                                }
                                else if (_this.contentTp == "survey") {
                                    _this.linkDataInfoList.push({
                                        value: item.surveyConfigId,
                                        name: (item.surveyConfigId+":"+item.surveyDesc)
                                    });
                                }
                                else if (_this.contentTp == "composite") {
                                    _this.linkDataInfoList.push({
                                        value: item.compositeConfigId,
                                        name: (item.compositeConfigId+":"+item.title)
                                    });
                                }
                            })
                        }
                    } else {
                        _this.linkDataInfoList = [];
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            })
        },
        //tab分组管理中的方法
        getTableData1: function () {
            var params = {};
            var _this = this;
            params.objconfigId = this.linkThmconfigId;
            params.pageNo = 1;
            params.pageSize = 2000;
            $.post({
                url: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/queryDetail.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        // console.log(result, 'tableResult');
                        _this.userId = result.user;
                        if(result.data.rows&&result.data.rows.length>0){
                            result.data.rows.forEach(function (item) {
                                _this.tableData1.push(item);
                            });
                            _this.currentTypeKey=result.data.rows[0].typeKey;
                        }else{
                            _this.tableData1=[];
                        }
                        // _this.tableData = result.data;
                    } else {
                        _this.tableData1=[];
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        saveData: function () {
            var _this=this;
            var params={};
            if(!this.linkThmconfigId){
                _this.showDialog('', 'info', false,'请选择关联分组再进行保存');
                return false;
            }
            params.objconfigId=this.linkThmconfigId;
            params.typeKey=this.contentTp;
            var groupIdList=[];
            var weightList=[];
            var flag=this.tableData1.some(function (item) {
                groupIdList.push(item.groupId);
                if(!item.weight){
                    _this.showDialog('', 'info', false,'权重必须填写');
                    return true;
                }
                weightList.push(item.weight);
            });
            params.groupId=groupIdList.join(',');
            params.weight=weightList.join(',');
            if(flag){
                return;
            }
            $.post({
                url: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/saveData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.tableData1=[];
                        // console.log(result, 'saveData');
                        _this.getTableData1();
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        addDom:function () {
            this.tableData1.push({groupId:this.userGroupList[0].groupId,weight:'1',newData:true})
        },
        getUserGroupList:function () {
            var _this=this;
            $.post({
                url: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/getUserGroupList.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        // console.log(result, 'getUserGroupList');
                        _this.userGroupList=result.data;
                    } else {
                        _this.showDialog('', 'info', false, "客户分群拉取失败，将影响新增功能");
                    }
                }
            });
        },
        deleteParams1:function (index) {
            this.tableData1.splice(index,1);
        },
        // fresh刷新
        fresh:function () {
            var _this=this;
            $.post({
                url: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/fresh.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('', 'info', false, '刷新成功');
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            })
        },
        // 删除上传图片url
        rmImgUrl:function(e){
            var _this=this;
            var url=$(e.target).prev().prev().prev().val();
            if(!url){
                return;
            }
            $(e.target).prev().prev().prev().val('');
            $.post({
                url: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/delImage.ajax',
                data:{filePath:url},
                success: function (result) {
                    if (result.error === 0) {
                        // _this.showDialog('add', 'info', true, '删除成功');
                        console.log('删除成功');
                    } else {
                        // _this.showDialog('add', 'info', true, result.msg);
                        console.log(result.msg);
                    }
                }
            })
        },
        goToPageUpdate:function(item){
           var url;
        //    if(item.typeKey=='funcbtn'){
        //         this.showDialog('checkThemeContent', 'info', true, '首页功能按钮配置已废弃，请使用自定义功能按钮重新配置！');
        //         return ;
        //    }
        try{
            for ( key in this.tpForUri ){
                if(key == item.typeKey){
                    url=this.tpForUri[key];
                    break;
                }
            };
						if(!url){
							url = this.tpForUri[this.contentTp];
						}
           	window.open(url+'?objconfigId='+item.objconfigId);
        }catch(e){
            console.log(e);
        }
           
        },
        goToPageTiming:function(item){
            var startTime=item.startTime;
            var endTime=item.endTime;
            var url='/recommendSystem/recommendSystemConfigMgmt/customTimingTaskMgmt.html';
            url+='?objconfigId='+item.objconfigId+'&thmconfigId='+item.thmconfigId;
            startTime&&(url+='&startTime='+startTime);
            endTime&&(url+='&endTime='+endTime);
            window.open(url);
        },
		// 现有材料部分
		//获取一二级分类列表
		getTopCategoryList:function(){
			$.post({
				url: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/classifyListMaterial.ajax',
				success: function (result) {
					if (result.error === 0) {
						var list = result.data;
						this.secondCategoryList = list.find(function(item){
							return item.categoryId == "C000300"
						},this).categoryConfigList;
						this.topDialogCategoryList = result.data;
					}
				}.bind(this)
			});
		},
		//获取三级分类列表
		getThirdDialogCategoryList:function(parentCategoryId){
			$.post({
				url: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/threeClassifyListMaterial.ajax',
				data:{parentCategoryId},
				success: function (result) {
					if (result.error === 0) {
						var list = result.data;
						this.thirdDialogCategoryList = list.ncmsContentCategoryConfigList;
					}
				}.bind(this)
			});
		},
			// 获取现有材料列表根据searchCategoryId
		getExistingMaterialList:function(currentIndex){
			var params = {}
			params.categoryId = this.searchCategoryId;
			params.pageNo = currentIndex+1;
			params.pageSize = this.pageMaxNum2;
			params.pushStatus = '';
			params.title = this.searchTitle;
			// params
			$.post({
				url: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/getExistingMaterialList.ajax',
				data:params,
				success: function (result) {
					if (result.error === 0) {
						this.currentIndex2 = currentIndex;
						this.totalPage2 = Math.ceil(result.data.total / this.pageMaxNum2);
						var list = result.data.rows;
						this.existingMaterialList = list;
					}else{
						this.existingMaterialList = [];
						this.currentIndex2 = 0;
					}
				}.bind(this)
			});
		},
		//点击选择内容-显示内容数据弹窗
		showContent: function () {
			this.topDialogCategoryId = '';
			this.secondDialogCategoryId = '';
			this.thirdDialogCategoryId = '';
			this.topDialogCategoryId = 'C000300';
			this.showDialog('addSecond', 'contentShow', true);
			$('#checkThemeContent').modal('hide');
		},
		// 外部素材接口调用更改素材状态
		resRequest:function(id){
			this.diaobjconfigId=id;
			var params={};
			params.mediaId = id;
			params.releasedStatus = '1';
			$.post({
				url: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/modifyReleasedStatus.ajax',
				data:params,
				success: function (result) {
					// 不做任何处理
				}.bind(this)
			});
		},
        //公共方法
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
            if(timestamp){
                var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
                var Y = date.getFullYear() + '-';
                var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
                var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
                var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
                var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
                return Y + M + D + h + m + s;
            }else{
                return '';
            }

        },
        overflowHide: function (val) {
            var str='';
            if(val){
                str = val.toString();
                if (str.length > 10) {
                    str = str.substring(0, 10) + '...'
                }
            }else{
                str='-'
            }
            return str;
        },
        translateUserGroup:function (val) {
            if(val){
                this.userGroupList.forEach(function (item) {
                    if(val==item.groupId){
                        val=item.groupName;
                        // break;
                    }
                })
            }else{
                val='-'
            }
            return val;
        },
				prev2: function () {
					if (this.currentIndex2 <= 0) {
						return;
					}
					this.getExistingMaterialList(this.currentIndex2 - 1);
				},
				next2: function () {
					if (this.currentIndex2 >= this.totalPage2 - 1) {
						return;
					}
					this.getExistingMaterialList(this.currentIndex2 + 1);
				},
				changeIndex2: function (index) {
					this.getExistingMaterialList(index - 1);
				},
				toFirst2: function () {
					this.getExistingMaterialList(0);
				},
				toLast2: function () {
					this.getExistingMaterialList(this.totalPage2 - 1);
				},
    },
		filters:{
			rightTypeFormat:function(val){
				var str;
				if(val){
					if(val=='00'){
						str='公开材料'
					}else if(val=='01'){
						str='内部材料'
					}else if(val=='03'){
						str = '一对一材料'
					}else{
						str = val;
					}
				}else{
					str = '-'
				}
				return str
			},
			timelinessTransfer:function(item){
				var str = '';
				if(item.timelinessType=='1'){
					str+=item.timelinessCycleValue;
					if(item.timelinessCycleType==2){
						str+='月'
					}else if(item.timelinessCycleType==3){
						str+='周'
					}else{
						str+='日'
					}
				}else{
					str+='无'
				}
				return str
			}
		}
});
