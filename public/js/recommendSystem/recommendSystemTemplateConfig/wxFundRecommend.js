new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        fundId: '',
        fundTitle: '',
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
        loadingShow: false,
        //dialog新增修改数据
        diafundId: "",
        diafundTp: "",
        diafundTitle: "",
        diafundsubTitle: "",
        diafundsubTitle1: "",
        diaopenTp: "",
        diariskRemark: "",
        diaremark: "",
        diaoldFee: "",
        dianowFee: "",
        diathreshold: "",
        diathresholdUnit: "",
        diaterm: "",
        diatermUnit: "",
        diarecomelementnm: "",
        diarecomelementval: "",
        diaelementvalFrom: "",
        diarecomelementUnit: "",
        diarecomelementRemark: "",
        diabuttonRemark: "",
        diarecomidentify: "",
        diaurl: "",

        channelId: "",
        elementCollection: '',
        viewList: [],
        channelMenu: [],
        elementCollectionData: [],
        elementShow: {
            diafundId: true,
            diafundTp: true,
            diafundTitle: true,
            diafundsubTitle: true,
            diafundsubTitle1: true,
            diaopenTp: true,
            diariskRemark: true,
            diaremark: true,
            diaoldFee: true,
            dianowFee: true,
            diathreshold: true,
            diathresholdUnit: true,
            diaterm: true,
            diatermUnit: true,
            diarecomelementnm: true,
            diarecomelementval: true,
            diaelementvalFrom: true,
            diarecomelementUnit: true,
            diarecomelementRemark: true,
            diabuttonRemark: true,
            diarecomidentify: true,
            diaurl: true,
            diaimageUrl: true,
            diaprofitAreaImgUrl: true
        },
        searchChannelId:'',
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
                var _this = this;
                if (val) {
                    this.getViewData(val);
                } else {
                    for (var ele in this.elementShow) {
                        this.elementShow[ele] = true;
                    }
                }
            }
        }
    },
    mounted: function () {
        var _this = this;
        var dialogs = ['info', 'rejectCheck', 'delete1'];
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
        $('#uploadBtn1').click(function () {
            $('#uploadFileInput1').click();
        });
        $('#uploadBtn2').click(function () {
            $('#uploadFileInput2').click();
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

    },
    methods: {
        // 根据传来的objconfigId 查找该条数据
        getOneDetail: function (objconfigId) {
            var params = {};
            var _this = this;
            params.pageNo = 1;
            params.pageSize = this.pageMaxNum;
            params.fundconfigId = objconfigId;
            // params.channelId=this.searchChannelId;
            // console.log(params);
            _this.loadingStatus = '数据获取中...';
            $.post({
                url: '/recommendSystem/recommendSystemTemplateConfig/wxFundRecommend/queryInfo.ajax',
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
            params.contentTp = 'wx_fund';
            val && (params.temId = val);
            $.post({
                url: '/recommendSystem/recommendSystemTemplateConfig/wxFundRecommend/viewList.ajax',
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
            params.fundId = this.fundId;
            params.fundTitle = this.fundTitle;
            params.channelId=this.searchChannelId;
            // console.log(params);
            _this.loadingStatus = '数据获取中...';
            $.post({
                url: '/recommendSystem/recommendSystemTemplateConfig/wxFundRecommend/queryInfo.ajax',
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
            this.diafundId = obj.fundId ? obj.fundId : '';
            this.diafundTp = obj.fundTp ? obj.fundTp : '';
            this.diafundTitle = obj.fundTitle ? obj.fundTitle : '';
            this.diafundsubTitle = obj.fundsubTitle ? obj.fundsubTitle : '';
            this.diafundsubTitle1 = obj.fundsubTitle1 ? obj.fundsubTitle1 : '';
            this.diaopenTp = obj.openTp ? obj.openTp : '';
            this.diariskRemark = obj.riskRemark ? obj.riskRemark : '';
            this.diaremark = obj.remark ? obj.remark : '';
            this.diaoldFee = obj.oldFee ? obj.oldFee : '';
            this.dianowFee = obj.nowFee ? obj.nowFee : '';
            this.diathreshold = obj.threshold ? obj.threshold : '';
            this.diathresholdUnit = obj.thresholdUnit ? obj.thresholdUnit : '';
            this.diaterm = obj.term ? obj.term : '';
            this.diatermUnit = obj.termUnit ? obj.termUnit : '';
            this.diarecomelementnm = obj.recomelementnm ? obj.recomelementnm : '';
            this.diarecomelementval = obj.recomelementval ? obj.recomelementval : '';
            this.diaelementvalFrom = obj.elementvalFrom ? obj.elementvalFrom : '';
            this.diarecomelementUnit = obj.recomelementUnit ? obj.recomelementUnit : '';
            this.diarecomelementRemark = obj.recomelementRemark ? obj.recomelementRemark : '';
            this.diabuttonRemark = obj.buttonRemark ? obj.buttonRemark : '';
            this.diarecomidentify = obj.recomidentify ? obj.recomidentify : '';
            this.diaurl = obj.url ? obj.url : '';
            this.channelId = obj.channelId ? obj.channelId : '';
            this.elementCollection = obj.previewTemid ? obj.previewTemid : '';
            $('#uploadInput1').val(obj.imageUrl ? obj.imageUrl : '');
            $('#uploadInput2').val(obj.profitAreaImgUrl ? obj.profitAreaImgUrl : '');
        },
        showAdd: function () {
            this.elementCollection = '';
            this.pagePreviewImgurl = '';
            this.isUpdate = false;
            this.uploadSuccessed1 = false;
            this.uploadSuccessed2 = false;
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
            this.setAddData({elementvalFrom: '0'});
            this.showDialog('', 'add');
            $("#previewImg").show();
        },
        showUpdate: function (item) {
            if (item.previewTemid) {
                this.getViewData(item.previewTemid,true);
            } else {
                for (var ele in this.elementShow) {
                    this.elementShow[ele] = true;
                }
            }
            this.pagePreviewImgurl = '';
            this.isUpdate = true;
            this.updateId = item.fundconfigId;
            this.uploadSuccessed1 = true;
            this.uploadSuccessed2 = true;
            var _this = this;
            $('#uploadFileInput1').on('change', function () {
                _this.uploadSuccessed1 = false;
                $('#uploadInput1').val($(this).val());
            });
            $('#uploadFileInput2').on('change', function () {
                _this.uploadSuccessed2 = false;
                $('#uploadInput2').val($(this).val());
            });
            this.setAddData(item);
            this.showDialog('', 'add');
            $("#previewImg").show();
        },
        add: function () {
            if (this.channelId == '') {
                this.showDialog('add', 'info', true, '渠道必须选择！');
                return false;
            }
            if (this.elementCollection == '') {
                this.showDialog('add', 'info', true, '模板必须选择！');
                return false;
            }
            if($("#uploadInput1").val()&&$("#uploadInput1").val().indexOf('/res/')==-1 && $("#uploadInput1").val().indexOf('/mss/')==-1){
                this.showDialog('add', 'info', true, '图片选择后请上传！');
                return false;
            }

            if($("#uploadInput2").val()&&$("#uploadInput2").val().indexOf('/res/')==-1){
                this.showDialog('add', 'info', true, '图片选择后请上传！');
                return false;
            }
            var _this = this;
            var params = {};
            params.fundId = this.diafundId;
            params.fundTp = this.diafundTp;
            params.fundTitle = this.diafundTitle;
            params.fundsubTitle = this.diafundsubTitle;
            params.fundsubTitle1 = this.diafundsubTitle1;
            params.openTp = this.diaopenTp;
            params.riskRemark = this.diariskRemark;
            params.remark = this.diaremark;
            params.oldFee = this.diaoldFee;
            params.nowFee = this.dianowFee;
            params.threshold = this.diathreshold;
            params.thresholdUnit = this.diathresholdUnit;
            params.term = this.diaterm;
            params.termUnit = this.diatermUnit;
            params.recomelementnm = this.diarecomelementnm;
            params.recomelementval = this.diarecomelementval;
            params.elementvalFrom = this.diaelementvalFrom;
            params.recomelementUnit = this.diarecomelementUnit;
            params.recomelementRemark = this.diarecomelementRemark;
            params.buttonRemark = this.diabuttonRemark;
            params.recomidentify = this.diarecomidentify;
            params.url = this.diaurl;
            params.channelId = this.channelId;
            params.previewTemid = this.elementCollection;
            params.imageUrl = $('#uploadInput1').val();
            params.profitAreaImgUrl = $('#uploadInput2').val();
            this.isUpdate && (params.fundconfigId = this.updateId);
            !this.isUpdate && (params.createBy = this.userId);
            this.isUpdate && (params.modifyBy = this.userId);
            var url = '/recommendSystem/recommendSystemTemplateConfig/wxFundRecommend/';
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
                url: '/recommendSystem/recommendSystemTemplateConfig/wxFundRecommend/upload1.ajax',
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
            this.loadingShow = true;
            this.uploadSuccessed2 = false;
            var _this = this;
            $.ajaxFileUpload({
                url: '/recommendSystem/recommendSystemTemplateConfig/wxFundRecommend/upload2.ajax',
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
        //删除
        deleteParams: function (item) {
            this.deleteId = item.fundconfigId;
            this.showDialog('', 'delete1', false);
        },
        deleteConfirm: function (item) {
            var _this = this;
            $.post({
                url: '/recommendSystem/recommendSystemTemplateConfig/wxFundRecommend/delete.ajax',
                data: {fundconfigId: this.deleteId},
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
                url: '/recommendSystem/recommendSystemTemplateConfig/wxFundRecommend/fresh.ajax',
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
                    this.tableData[j].objconfigId=this.tableData[j].fundconfigId;
                    this.tableData[j].startTime='';
                    this.tableData[j].endTime='';
                    this.tableData[j].modifyTime='';
                    this.tableData[j].typeKey='wx_fund';
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
                var url="/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt.html?pageType=Modify&contentTp=wx_fund&channelId="+channelIds[0]
                storage.setItem("wx_fund",JSON.stringify(ids));
                window.open(url);
            }
            
        },
        configThis:function(item){
            var ids = [];
            var channelIds=item.channelId;
            var obj={
                objconfigId:item.fundconfigId,
                startTime:'',
                endTime:'',
                modifyTime:'',
                typeKey:'wx_fund',
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
                var url="/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt.html?pageType=Modify&contentTp=wx_fund&channelId="+channelIds+'&objconfigId='+ids[0].objconfigId;
                storage.setItem("wx_fund",JSON.stringify(ids));
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
            var str = val.toString();
            if (str.length > 10) {
                str = str.substring(0, 10) + '...'
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
