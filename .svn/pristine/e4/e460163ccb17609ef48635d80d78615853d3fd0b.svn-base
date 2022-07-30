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
        loadingShow: false,
        //第一阶菜单列表
        firstMenuData: '',
        firstMenuList: [],
        positionList: [],
        positionDetailList: [],
        userGroupList: [],
        position: '',
        positionDetail: '',
        positionName: '',
        currentTypeKey: '',
				searchChannelId:'',
				channelMenu:[],
				searchChannelFlag:false
    },
    computed: {},
    watch: {
        firstMenuData: function () {
            this.position='';
            this.getSubmenuList();
        },
        position: function () {
            this.getSubmenuList();
        },
        positionDetail: function () {
            this.tableData=[];
            this.getTableData();
        },
				searchChannelId:function(){
					if(this.searchChannelFlag){
						this.getMenuList()
						this.tableData=[]
					}
					this.searchChannelFlag = true;
				}
    },
    mounted: function () {
        var _this = this;
        var dialogs = ['info'];
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
        this.getMenuList();
        this.getUserGroupList();
        // $('#firstMenu').css('width', '200px').select2({});
        // $("#firstMenu").on("select2:select", function (e) {
        //     // e 的话就是一个对象 然后需要什么就 “e.参数” 形式 进行获取
        //     _this.firstMenuData = e.params.data.id;

        // });
    },
    methods: {
        //获取一级菜单列表
        getMenuList: function () {
            var _this = this;
            $.post({
                url: '/recommendSystem/recommendSystemConfigMgmt/positionTheGroupConfig/queryMenuList.ajax',
								data:{channelId:this.searchChannelId},
                success: function (result) {
                    // if (result.error === 0) {
                    //     // console.log(result,"menu");
                    //     _this.firstMenuList = result.data;
                    // } else {
                    //     _this.showDialog('', 'info', false, result.msg);
                    // }
										if (result.error === 0) {
											// console.log(result,"menu");
											_this.firstMenuData = '';
											_this.firstMenuList = result.data.firstMenuList;
											$("#firstMenu").val(null).trigger('change');
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
                url: '/recommendSystem/recommendSystemConfigMgmt/positionTheGroupConfig/querySubmenuList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        !_this.position && (_this.positionList = result.data[0]);
                        _this.position && (_this.positionDetailList = result.data[0]);
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
            params.objconfigId = this.positionDetail;
            params.pageNo = 1;
            params.pageSize = 2000;
            $.post({
                url: '/recommendSystem/recommendSystemConfigMgmt/positionTheGroupConfig/queryDetail.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        console.log(result, 'tableResult');
                        _this.userId = result.user;
                        if(result.data.rows&&result.data.rows.length>0){
                            result.data.rows.forEach(function (item) {
                                _this.tableData.push(item);
                            });
                            _this.currentTypeKey=result.data.rows[0].typeKey;
                        }else{
                            _this.tableData=[];
                        }
                        // _this.tableData = result.data;
                    } else {
                        _this.tableData=[];
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        add: function () {
            var _this=this;
            var params={};
            params.objconfigId=this.positionDetail;
            params.typeKey=this.currentTypeKey;
            var groupIdList=[];
            var weightList=[];
            var flag=this.tableData.some(function (item) {
                groupIdList.push(item.groupId);
                if(!item.weight){
                    console.log(123);
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
            console.log(111);
            $.post({
                url: '/recommendSystem/recommendSystemConfigMgmt/positionTheGroupConfig/saveData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.tableData=[];
                        // console.log(result, 'saveData');
                        _this.getTableData();
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        addDom:function () {
            this.tableData.push({groupId:this.userGroupList[0].groupId,weight:'1',newData:true})
        },
        getUserGroupList:function () {
            var _this=this;
            $.post({
                url: '/recommendSystem/recommendSystemConfigMgmt/positionTheGroupConfig/getUserGroupList.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        console.log(result, 'getUserGroupList');
                        _this.userGroupList=result.data;
                    } else {
                        _this.showDialog('', 'info', false, "客户分群拉取失败，将影响新增功能");
                    }
                }
            });
        },
        deleteParams:function (index) {
            this.tableData.splice(index,1);
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
            var str = val.toString();
            if (str.length > 10) {
                str = str.substring(0, 10) + '...'
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
        }
    }
});
