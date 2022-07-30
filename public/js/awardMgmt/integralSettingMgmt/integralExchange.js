new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        tableData: [],
        diaMsg: '',
        productId: '',
        productName: '',
        productDesc: '',
        productType: '',
        exchangeType: '',
        exchangePoints: '',
        onSale: '',
        productTotalCount: '',
        hadExchangeCount: '',
        productImg: '',
        productUrl: '',
        maxExchangeCountOfDay: '',
        maxExchangeCountOfWeek: '',
        maxExchangeCountOfMonth: '',
        supportUserType: '',
        productValue: '',
        productBeWorth: '',
        maxExchangeCount: '',
        minExchargeCount: '1',
        groupId: ['00000'],   // 默认客群
        userGroupList: [],
        childUserGroupList: [],
        productIds: '', //查询
        messageRemark: '',//信息配置
        expireTimeType: '0',
        expireTime: '',
        expireRelativeTime: '0',
        isShow: false,
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10,
        condition: '',
        //搜索客群
        searchUserGroup: '',
    },
    mounted: function () {
        var dialogs = ['info', 'add', 'del', 'revise'];
        var _this = this;
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
        this.getTableData(0);
        this.getUserGroupList();
    },
    computed: {
        //主表格假分页
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
            let currentIndex = parseInt(this.currentIndex);
            return this.middleData[currentIndex];
        },

    },
    watch: {
        // 假分页
        pageMaxNum: {
            handler: function (val, oldval) {
                this.currentIndex = 0;
                this.getTableData(0)
            }
        },
        condition: {
            handler: function (val, oldval) {
                this.currentIndex = 0;
            }
        },
        searchUserGroup:{
            handler: function (val, oldVal) {
                this.childUserGroupList=this.userGroupList;
                var brr = [];
                if(this.childUserGroupList.length>0&&val!=''){
                    this.childUserGroupList.forEach(function (item) {
                        if(item.groupName.indexOf(val)!=-1){
                            brr.push(item);
                        }
                    });
                    if(brr.length>0){
                        this.childUserGroupList=brr;
                    }else {
                        this.childUserGroupList=[];
                    }
                }else{
                    this.childUserGroupList=this.userGroupList;
                }
            },
        },
    },
    methods: {
        mappingGroupIdGroupName: function () {
            // console.log('this.userGroupList=', this.userGroupList);
            // console.log('this.tableData=', this.tableData[0]);
            let _this = this;
            if (this.userGroupList && this.userGroupList.length > 0 && this.tableData && this.tableData.length > 0) {
                this.tableData.forEach(function (item, index) {
                    let tmpItem = [];
                    var tempGroupId = item.groupId.split(',');
                        tempGroupId.forEach(function(groupItem,groupIndex){
                            _this.userGroupList.forEach(function(userGroupItem){
                                if (userGroupItem.groupId == groupItem)
                                {
                                    tmpItem.push(userGroupItem.groupName)
                                }
                            })
                        })

                    item.groupName = !!tmpItem ? tmpItem.join(',') : '';
                    if (!item.groupName && item.groupId == '00000') {
                        item.groupName = '默认分组';
                    }
                });
            }
        },
        getTableData: function (currentIndex) {
            var params = {};
            var _this = this;
            this.tableData = [];
            // params.pageNo = currentIndex + 1;
            // params.pageSize = this.pageMaxNum;
            params.productId = this.productIds
            params.productName = this.productName
            $.post({
                url: '/awardMgmt/integralSettingMgmt/integralExchange/getTableData.ajax',
                // data: params,
                success: function (result) {
                    if (result.error === 0) {
                        // 后端分页 展示
                        _this.tableData = result.data.tableData;
                        _this.mappingGroupIdGroupName();
                        // _this.currentIndex = result.data.pageNum - 1;
                        // _this.totalPage = result.data.totalSize;
                    } else {
                        _this.tableData = [];
                        // _this.currentIndex = 0;
                        // _this.totalPage = 0;
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        // 新增必填弹框
        diaInfoCheck: function () {
            var _this = this;
            if (!this.productName) {
                this.showDialog('add', 'info', true, '商品名称不能为空');
                return false;
            }
            if (!this.productDesc) {
                this.showDialog('add', 'info', true, '商品描述不能为空');
                return false;
            }
            if (!this.productType) {
                this.showDialog('add', 'info', true, '商品类型不能为空');
                return false;
            }
            if (!this.exchangeType) {
                this.showDialog('add', 'info', true, '兑换类型不能为空');
                return false;
            }
            if (!this.onSale) {
                this.showDialog('add', 'info', true, '上下架不能为空');
                return false;
            }
            if (!this.productTotalCount) {
                this.showDialog('add', 'info', true, '商品数据不能为空');
                return false;
            }
            if (!this.hadExchangeCount) {
                this.showDialog('add', 'info', true, '商品已兑换数量不能为空');
                return false;
            }
            if (!this.supportUserType) {
                this.showDialog('add', 'info', true, '商品兑换用户类型不能为空');
                return false;
            }
            if (!this.productValue) {
                this.showDialog('add', 'info', true, '商品值不能为空');
                return false;
            }
            if (!this.productBeWorth) {
                this.showDialog('add', 'info', true, '渠道不能为空');
                return false;
            }
            if (!this.exchangePoints) {
                this.showDialog('add', 'info', true, '兑换积分数不能为空');
                return false;
            }
            if (!this.maxExchangeCount) {
                this.showDialog('add', 'info', true, '最大兑换数量不能为空');
                return false;
            }
            if (!this.minExchargeCount) {
                this.showDialog('add', 'info', true, '最小兑换数量不能为空');
                return false;
            }
            if (!this.groupId) {
                this.showDialog('add', 'info', true, '客群不能为空');
                return false;
            }
            if (this.productType == 9) {
                if (!this.expireTimeType) {
                    this.showDialog('add', 'info', true, '请选择兑换类型');
                    return false;
                }
                if (this.expireTimeType == 0 && !this.expireTime) {
                    this.showDialog('add', 'info', true, '失效时间不能为空');
                    return false;
                }
                if (this.expireTimeType == 1 && (!this.expireRelativeTime || Number(this.expireRelativeTime) === 0)) {
                    this.showDialog('add', 'info', true, '失效时间格式错误');
                    return false;
                }
            }
            return true;
        },
        // 下拉列表数据(客群名称)
        getUserGroupList: function () {
            var _this = this;
            // var params={};
            $.post({
                // url: '/businessMgmt/highFinancialMgmt/custGroupSign/custList.ajax',
                url: '/awardMgmt/integralSettingMgmt/integralExchange/getUserGroupList.ajax',
                // data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.userGroupList = result.data.body;
                        _this.childUserGroupList = _this.userGroupList;
                        _this.mappingGroupIdGroupName();
                    } else {
                        _this.userGroupList = [];
                        _this.childUserGroupList = _this.userGroupList;
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        // 新增数据
        showAdd: function () {
            var _this = this;
            this.productName = '';
            this.productDesc = '';
            this.productType = '';
            this.exchangeType = '';
            this.onSale = '';
            this.productTotalCount = '';
            this.hadExchangeCount = '';
            this.productImg = '';
            this.productUrl = '';
            this.maxExchangeCountOfDay = '',
            this.maxExchangeCountOfWeek = '',
            this.maxExchangeCountOfMonth = '',
            this.supportUserType = '';
            this.productValue = '';
            this.productBeWorth = '';
            this.exchangePoints = '';
            this.maxExchangeCount = '';
            this.minExchargeCount = '1';
            this.groupId = ['00000'];   // 默认客群
            this.messageRemark = '';
            this.expireTimeType = '0';
            this.expireTime = '';
            this.expireRelativeTime = '0';
            this.isShow = false;
            this.showDialog('', 'add', 'false');
        },
        choose: function (itemValue) {
            console.log('---', itemValue)
            if (itemValue == '5') {
                this.isShow = true
            } else {
                this.isShow = false
            }
        },
        saveParam: function () {
            var _this = this;
            if (this.diaInfoCheck()) {
                var params = {};
                params.productName = this.productName;
                params.productDesc = this.productDesc;
                params.productType = this.productType;
                params.exchangeType = this.exchangeType;
                params.onSale = this.onSale;
                params.productTotalCount = this.productTotalCount;
                params.hadExchangeCount = this.hadExchangeCount;
                params.supportUserType = this.supportUserType;
                params.productValue = this.productValue;
                params.productBeWorth = this.productBeWorth;
                params.exchangePoints = this.exchangePoints;
                params.maxExchangeCount = this.maxExchangeCount;
                params.minExchargeCount = this.minExchargeCount;
                params.productImg = this.productImg;
                params.productUrl = this.productUrl;
                params.maxExchangeCountOfDay = this.maxExchangeCountOfDay;
                params.maxExchangeCountOfWeek = this.maxExchangeCountOfWeek;
                params.maxExchangeCountOfMonth = this.maxExchangeCountOfMonth;               
                params.groupId = this.groupId.join(',');    //客群 add 20200212
                params.messageRemark = this.messageRemark;
                if (this.productType == 9) { // 选择特权时
                    params.expireTimeType = this.expireTimeType;
                    params.expireTime = this.expireTimeType == 0 ? this.expireTime : '';
                    params.expireRelativeTime = this.expireTimeType == 1 ? this.expireRelativeTime : '0';
                }
                console.log('参数', params)
                $.post({
                    url: '/awardMgmt/integralSettingMgmt/integralExchange/saveParam.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.getTableData(_this.currentIndex);
                        }
                        _this.showDialog('', 'info', false, result.msg);
                    }
                });
            }
        },
        // 修改数据
        showUpdate: function (item) {
            var _this = this;
            this.productId = item.productId;
            this.productName = item.productName;
            this.productDesc = item.productDesc;
            this.productType = item.productType;
            this.exchangeType = item.exchangeType;
            this.onSale = item.onSale;
            this.productTotalCount = item.productTotalCount;
            this.hadExchangeCount = item.hadExchangeCount;
            this.supportUserType = item.supportUserType;
            this.productValue = item.productValue;
            this.productBeWorth = item.productBeWorth;
            this.exchangePoints = item.exchangePoints;
            this.maxExchangeCount = item.maxExchangeCount;
            this.minExchargeCount = item.minExchargeCount;
            this.productImg = item.productImg;
            this.productUrl = item.productUrl;
            this.maxExchangeCountOfDay = item.maxExchangeCountOfDay;
            this.maxExchangeCountOfWeek = item.maxExchangeCountOfWeek;
            this.maxExchangeCountOfMonth = item.maxExchangeCountOfMonth;
            this.groupId = item.groupId.split(',');
            this.messageRemark = item.messageRemark;
            this.expireTimeType = item.expireTimeType;
            this.expireTime = item.expireTime;
            this.expireRelativeTime = item.expireRelativeTime;
            if (this.productType == '5') {
                this.isShow = true
            } else {
                this.isShow = false
                this.messageRemark = '';
            }
            this.showDialog('', 'revise', 'false');
        },
        update: function () {
            var _this = this;
            var params = {};
            params.productId = this.productId;
            params.productName = this.productName;
            params.productDesc = this.productDesc;
            params.productType = this.productType;
            params.exchangeType = this.exchangeType;
            params.onSale = this.onSale;
            params.productTotalCount = this.productTotalCount;
            params.hadExchangeCount = this.hadExchangeCount;
            params.supportUserType = this.supportUserType;
            params.productValue = this.productValue;
            params.productBeWorth = this.productBeWorth;
            params.exchangePoints = this.exchangePoints;
            params.maxExchangeCount = this.maxExchangeCount;
            params.minExchargeCount = this.minExchargeCount;
            params.productImg = this.productImg;
            params.productUrl = this.productUrl;
            params.maxExchangeCountOfDay = this.maxExchangeCountOfDay ? this.maxExchangeCountOfDay : 0;
            params.maxExchangeCountOfWeek = this.maxExchangeCountOfWeek ? this.maxExchangeCountOfWeek : 0;
            params.maxExchangeCountOfMonth = this.maxExchangeCountOfMonth ? this.maxExchangeCountOfMonth : 0;  
            params.groupId = this.groupId.join(',');
            params.messageRemark = this.messageRemark;
            if (this.productType == 9) { // 选择特权时
                params.expireTimeType = this.expireTimeType;
                params.expireTime = this.expireTimeType == 0 ? this.expireTime : '';
                params.expireRelativeTime = this.expireTimeType == 1 ? this.expireRelativeTime : '0';
            }
            console.log('修改参数', params)
            $.post({
                url: '/awardMgmt/integralSettingMgmt/integralExchange/update.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0);
                    }
                    _this.showDialog('', 'info', false, result.msg);
                }
            });
        },

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
                $('#' + dia1).on('hidden.bs.modal', function () {
                    $('#' + dia2).modal('show');
                    $('#' + dia1).off().on('hidden', 'hidden.bs.modal');
                });
                $('#' + dia1).modal('hide');
            } else {
                $('#' + dia1).on('hidden.bs.modal', function () {
                    $('#' + dia2).on('hidden.bs.modal', function () {
                        $('#' + dia1).modal('show');
                        $('#' + dia2).off().on('hidden', 'hidden.bs.modal');
                    });
                    $('#' + dia2).modal('show');
                    $('#' + dia1).off().on('hidden', 'hidden.bs.modal');
                });
                $('#' + dia1).modal('hide');
            }
        },
        //主表格假分页方法
        prev1: function () {
            this.currentIndex <= 0 ? 0 : this.currentIndex--;
        },
        next1: function () {
            this.currentIndex >= this.middleData.length - 1 ? this.middleData.length - 1 : this.currentIndex++;
        },
        changeIndex1: function (index) {
            this.currentIndex = index - 1;
        },
    },
    filters: {
        productType: function (item) {
            if (item === '1') {
                return '红包'
            } else if (item === '2') {
                return '礼券'
            } else if (item === '3') {
                return '话费'
            } else if (item === '4') {
                return '流量'
            } else if (item === '5') {
                return '视频会员卡'
            } else if (item === '6') {
                return '红包范围'
            } else if (item === '7') {
                return '自有平台服务'
            } else if (item === '8') {
                return '东方航空'
            } else if (item === '9') {
                return '特权'
            } else if (item === '10') {
                return '东航积分-自动'
            } else if (item === '11') {
                return '实物'
            } else {
                return ''
            }
        },
        supportUserType: function (item) {
            if (item === '0') {
                return '全量用户'
            } else if (item === '1') {
                return '新用户'
            } else if (item === '2') {
                return '老用户'
            } else {
                return ''
            }
        },
        onSale: function (item) {
            if (item === '0') {
                return '下架'
            } else if (item === '1') {
                return '上架'
            } else {
                return ''
            }
        },
    },
    components: {
        'date-picker': VueBootstrapDatetimePicker
    }

});

