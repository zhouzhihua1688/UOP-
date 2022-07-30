new Vue({
    el: '#content',
    data: {
        //查询条件
        // nodeTypeName: '',
        // nodeTypeDesc: '',
        //主页面相关数据
        tableData: [],
        //客群分组数据
        tableData1:[],
        // 主题信息数据
        tableData2:[],
        userId: '',
        diaMsg: '',
        previewPath: '',
        loadingStatus: '数据获取中...',
        updateId: '',
        deleteId: '',
        isUpdate: false,
        //dialog新增修改数据
        //推荐系统的数据
        firstMenuList: [],
        positionList: [],
        positionDetailList: [],
        linkDataInfoList: [],
        positionName:'',
        themeContentType:'',
        layoutId:'',
        channelId:'',
        position: '',
        funcId: '',
        themeId: '',
        themeRelatedUserGroups: '',
        themeContentPosition: '',
        contentId: '',
        recomdDesc: '',
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
            coupon:'res-coupon-config'
        },
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
        }
    },
    watch: {
        pageMaxNum: function () {
            this.getTableData(0);
        },
        layoutId:{
            handler:function (val,oldval) {
                var _this=this;
                this.firstMenuList.forEach(function (item) {
                    if(val==item.LAYOUTID){
                        _this.channelId=item.CHANNELID;
                    }
                });
                // this.themeContentType='';
                // this.position='';
                this.getSubmenuList(this.layoutId);
            }
        },
        position: function () {
            this.getSubmenuList(this.layoutId);
        },
        funcId:{
            handler:function (val,oldval) {
                // var _this=this;
                this.tableData1=[];
                this.getTableData2(this.funcId);
            }
        },
        themeId:{
            handler:function (val,oldval) {
                var _this=this;
                this.tableData1=[];
                this.linkDataInfoList=[];
                this.themeRelatedUserGroups='';
                this.getTableData1(this.themeId);
                // this.themeContentType='';
                this.tableData2.forEach(function (item) {
                    if(item.thmconfigId==val){
                       _this.themeContentType=item.contentTp;
                    }
                });
                this.linkDataInfo(_this.themeContentType);
            }
        },
        tableData1:{
            handler:function (val,oldval) {
                // this.themeRelatedUserGroups='';
                if(val){
                    this.themeRelatedUserGroups=val.join(',');
                }
            }
        },
        contentId:function () {
            // this.linkDataInfoList=[];
        }
    },
    mounted: function () {
        var _this = this;
        var dialogs = ['info', 'add', 'delete1'];
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
        $('#firstMenu').css('width', '200px').select2({

        });
        $.fn.modal.Constructor.prototype.enforceFocus = function () { }
        $("#firstMenu").on("select2:select", function (e) {
            // e 的话就是一个对象 然后需要什么就 “e.参数” 形式 进行获取
            _this.layoutId = e.params.data.id;

        });
        this.getTableData(0);
        this.getMenuList();
    },
    methods: {
        // 主题管理中的列表
        getTableData2: function (funcId) {
            var params = {};
            var _this = this;
            params.funcModId = funcId;
            $.post({
                url: '/automatedOperation/reachContentMgmt/recommendSystemConfig/queryThemeInfo.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.tableData2 = result.data;
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        //tab分组管理中的方法
        getTableData1: function (themeId) {
            var params = {};
            var _this = this;
            params.objconfigId = themeId;
            params.pageNo = 1;
            params.pageSize = 2000;
            $.post({
                url: '/automatedOperation/reachContentMgmt/recommendSystemConfig/queryDetail.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        // console.log(result, 'tableResult');
                        if(result.data.rows&&result.data.rows.length>0){
                            console.log(result.data.rows);
                            result.data.rows.forEach(function (item) {
                                // console.log();
                                _this.tableData1.push(item.groupId);
                            });
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
        //获取一级菜单列表
        getMenuList: function () {
            var _this = this;
            $.post({
                url: '/automatedOperation/reachContentMgmt/recommendSystemConfig/queryMenuList.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        // console.log(result,"menu");
                        _this.firstMenuList = result.data;
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        //获取二级/三级菜单
        getSubmenuList: function (layoutId) {
            var _this = this;
            var params = {};
            params.layoutId = layoutId;
            this.position && (params.position = this.position);
            $.post({
                url: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/querySubmenuList.ajax',
                data: params,
                success: function (result) {
                    // console.log(result,'submenu');
                    if (result.error === 0) {
                        !_this.position && (_this.positionList = result.data[0]);
                        _this.position && (_this.positionDetailList = result.data[0]);
                        // _this.themeContentType = result.data[0].themeContentType;
                        !_this.funcId&&(_this.funcId = _this.positionDetailList.length > 0 ? _this.positionDetailList[0].FUNCMODID : '');
                        // _this.positionName = _this.positionDetailList.length > 0 ? _this.positionDetailList[0].FUNCMODNAME : '';
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        //获取关联数据信息
        linkDataInfo: function (contentTp) {
            var _this = this;
            var params = {};
            params.urlJoin = _this.urlList[contentTp];
            // params.urlJoin = _this.urlList[_this.themeContentType];
            params.channelId=_this.channelId;
            // console.log(params.urlJoin);
            if(!params.urlJoin){
                _this.showDialog('add', 'info', true, "二级菜单新增功能未找到匹配的路径");
                return false;
            }
            this.linkDataInfoList=[];
            $.post({
                url: '/automatedOperation/reachContentMgmt/recommendSystemConfig/linkDataInfo.ajax',
                data: params,
                success: function (result) {
                    console.log(result.data.rows,'linkDataInfo');
                    if (result.error === 0) {
                        if (result.data.rows.length > 0) {
                            console.log(123);
                            //将关联数据信息整理统一格式由select展示
                            result.data.rows.forEach(function (item) {
                                if (_this.themeContentType == "fund") {
                                    _this.linkDataInfoList.push({
                                        value: item.fundconfigId,
                                        name: item.fundconfigId + ':' + item.fundTitle
                                    })
                                } else if (_this.themeContentType == "advice") {
                                    _this.linkDataInfoList.push({
                                        value: item.advconfigId,
                                        name: item.advconfigId + ':' + item.adviceTitle
                                    })
                                } else if (_this.themeContentType == "funcbtn") {
                                    _this.linkDataInfoList.push({
                                        value: item.funcBtnId,
                                        name: item.funcBtnId + ':' + item.funcBtnName
                                    })
                                } else if (_this.themeContentType == "adImg") {
                                    _this.linkDataInfoList.push({
                                        value: item.adImgId,
                                        name: item.remark == null ? '' :item.adImgId+":"+ item.remark
                                    })
                                } else if (_this.themeContentType == "notice") {
                                    _this.linkDataInfoList.push({
                                        value: item.noticeId,
                                        name: item.noticeId + ':' + item.noticeValue
                                    });
                                } else if (_this.themeContentType == "webanner") {
                                    _this.linkDataInfoList.push({
                                        value: item.weBannerId,
                                        name: item.weBannerId + ':' + item.remark
                                    });
                                } else if (_this.themeContentType == "weprod") {
                                    _this.linkDataInfoList.push({value: item.weProdId, name: item.sceneName});
                                } else if (_this.themeContentType == "activity") {
                                    _this.linkDataInfoList.push({value: item.id, name: item.id+":"+item.title});

                                } else if (_this.themeContentType == "custombtn") {
                                    _this.linkDataInfoList.push({value: item.btnId, name: item.btnName+':'+item.btnKey});

                                } else if (_this.themeContentType == "loadpage") {
                                    _this.linkDataInfoList.push({value: item.loadPageConfigId, name: item.remark});
                                } else if (_this.themeContentType == "fundgroup") {
                                    _this.linkDataInfoList.push({
                                        value: item.fundGroupConfigId,
                                        name: item.fundGroupTitle
                                    });
                                } else if (_this.themeContentType == "manager") {
                                    _this.linkDataInfoList.push({value: item.managerConfigId, name: item.managerConfigId+":"+item.managerName});
                                } else if (_this.themeContentType == "wx_fund") {
                                    _this.linkDataInfoList.push({value: item.fundconfigId, name: item.fundTitle});
                                } else if (_this.themeContentType == "wx_funcbtn") {
                                    _this.linkDataInfoList.push({value: item.btnId, name: item.btnName});
                                } else if (_this.themeContentType == "wx_adImg") {
                                    _this.linkDataInfoList.push({
                                        value: item.adImgId,
                                        name: item.adImgId + ':' + item.remark
                                    });
                                } else if (_this.themeContentType == "wx_product") {
                                    _this.linkDataInfoList.push({value: item.prdConfigId, name: item.prdConfigId+':'+item.prdTitle});
                                } else if (_this.themeContentType == "index") {
                                    _this.linkDataInfoList.push({
                                        value: item.indexConfigId,
                                        name: (item.indexConfigId+":"+item.indexName)
                                    });
                                }else if (_this.themeContentType == "product") {
                                    _this.linkDataInfoList.push({
                                        value: item.prdConfigId,
                                        name: (item.prdConfigId+":"+item.prdTitle+":"+item.remark)
                                    });
                                }else if (_this.themeContentType == "coupon") {
                                    _this.linkDataInfoList.push({
                                        value: item.couponconfigid,
                                        name: (item.couponconfigid+":"+item.couponno)
                                    });
                                }else if (_this.themeContentType == "tags") {
                                    _this.linkDataInfoList.push({
                                        value: item.tagConfigId,
                                        name: (item.tagConfigId+":"+item.tagName)
                                    });
                                } else if (_this.themeContentType == "wap_advice") {
                                    _this.linkDataInfoList.push({
                                        value: item.advconfigId,
                                        name: (item.advconfigId+":"+item.adviceDesc)
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
        //list
        getTableData: function (currentIndex) {
            var params = {};
            var _this = this;
            params.pageNo = currentIndex + 1;
            params.pageSize = this.pageMaxNum;
            // params.nodeTypeName = this.nodeTypeName;
            // params.nodeTypeDesc = this.nodeTypeDesc;
            // console.log(params);
            _this.loadingStatus = '数据获取中...';
            $.post({
                url: '/automatedOperation/reachContentMgmt/recommendSystemConfig/searchList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.userId = result.data.userId;
                        if (result.data.rows && result.data.rows.length > 0) {
                            _this.tableData = result.data.rows;
                            _this.currentIndex = result.data.pageNum - 1;
                            _this.totalPage = result.data.pages;
                        } else {
                            _this.tableData = [];
                            _this.currentIndex = 0;
                            _this.totalPage = 0;
                            _this.loadingStatus = '没有数据';
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
            console.log(obj);
            this.layoutId = obj.layoutId ? obj.layoutId : '';
            this.position = obj.position ? obj.position : '';
            this.funcId = obj.funcId ? obj.funcId : '';
            this.themeId = obj.themeId ? obj.themeId : '';
            this.themeRelatedUserGroups = obj.themeRelatedUserGroups ? obj.themeRelatedUserGroups : '';
            this.contentId = obj.contentId ? obj.contentId : '';
            this.themeContentPosition = obj.themeContentPosition ? obj.themeContentPosition : '';
            this.themeContentType = obj.themeContentType ? obj.themeContentType : '';
            this.recomdDesc = obj.recomdDesc ? obj.recomdDesc : '';
            $("#startTime").val(obj.startTime ? obj.startTime : '');
            $("#endTime").val(obj.endTime ? obj.endTime : '');
            console.log(this.themeContentType,'contentTp');
        },
        showAdd: function () {
            // this.firstMenuList= [];
            this.positionDetailList= [];
            this.linkDataInfoList= [];
            this.tableData1=[];
            this.tableData2=[];
            this.isUpdate = false;
            this.updateId = '';
            // this.setAddData({});
            this.showDialog('', 'add');
        },
        showUpdate: function (item) {
            var _this=this;
            this.positionDetailList= [];
            this.linkDataInfoList= [];
            // this.tableData1=[];
            this.tableData2=[];
            this.getMenuList();
            $.post({
                url: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/querySubmenuList.ajax',
                data: {layoutId:item.layoutId},
                success: function (result) {
                    // console.log(result,'submenu');
                    if (result.error === 0) {
                       _this.positionList = result.data[0];
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });

            this.getTableData2(item.funcId);
            // this.getTableData1(item.themeId);
            this.linkDataInfo(item.themeContentType);
            this.getSubmenuList(item.layoutId);

            $("#firstMenu").val(item.layoutId).trigger('change');
            // this.setAddData({});
            this.isUpdate = true;
            this.updateId = item.id;
            this.setAddData(item);
            this.showDialog('', 'add');
        },
        add: function () {
            var _this = this;
            var params = {};
            params.layoutId = this.layoutId;
            params.position = this.position;
            params.funcId = this.funcId;
            params.themeId = this.themeId;
            params.themeRelatedUserGroups = this.themeRelatedUserGroups;
            params.contentId = this.contentId;
            params.themeContentPosition = this.themeContentPosition;
            params.themeContentType = this.themeContentType;
            params.recomdDesc = this.recomdDesc;
            params.startTime = $("#startTime").val();
            params.endTime = $("#endTime").val();
            this.isUpdate && (params.id = this.updateId);
            !this.isUpdate && (params.createBy = _this.userId) &&(params.modifyBy = _this.userId);
            this.isUpdate && (params.modifyBy = _this.userId);
            var url = '/automatedOperation/reachContentMgmt/recommendSystemConfig/';
            url += this.isUpdate ? 'update.ajax' : 'add.ajax';
            $.post({
                url: url,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0);
                    }
                    _this.showDialog('add', 'info', false, result.msg);
                }
            });

        },
        //刷新
        refresh:function () {
            var _this=this;
            $.post({
                url: '/automatedOperation/reachContentMgmt/recommendSystemConfig/refresh.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('', 'info', false, result.msg);
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
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
            var str = '';
            if (val) {
                str = val.toString();
                if (str.length > 10) {
                    str = str.substring(0, 10) + '...'
                }
            } else {
                str = '-'
            }
            return str;
        },
        stringTimeFat: function (val) {
            if (val) {
                return val.slice(0,19);
            } else {
                return ''
            }
        }
    }
});
