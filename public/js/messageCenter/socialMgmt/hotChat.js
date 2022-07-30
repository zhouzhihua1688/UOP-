var vm = new Vue({
    el: '#content',
    data: {
        // 20210910 基金热聊管理->关联推荐管理

        // 主页面相关数据
        recommendType: '1',         //默认为产品
        recommendProduct: '',       //产品/账号ID
        // recommendTip: '',        //placeholder
        yieldTypeObj: '',           //收益率类型
		tableData: [],
		diaMsg: '',
		//主表格分页数据
		currentIndex: 0,
		maxSpace: 5,
		totalPage: 0,
		pageMaxNum: 10,
        condition: '',
		// 新增
		updateId: '',
		deleteId: '',
		recommendType_dialog: '',
		recommendProduct_dialog: '',
		yieldType_dialog: '',
        orderNo_dialog: '',
        status_dialog: '',

        // // 主页面相关数据
        // tableData: [],
        // diaMsg: '',
        // product:'',
        // recommendProduct:'',
        // recommentDesc:'',
        // recommendProduct:'',
        // yieldType:'',
        // // getYieldType:"",
        // orderNo:'',
        // status:'',
        // //主表格分页数据
        // currentIndex: 0,
        // maxSpace: 5,
        // totalPage: 0,
        // pageMaxNum: 10,
        // condition: "",

    },
    created: function () {
        this.getYieldType();
        this.getTableData(0);
    },
    mounted: function () {
        var dialogs = ['info','add','del'];
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
    },
    computed: {
        // 20210910 基金热聊管理->关联推荐管理
        recommendTip(){
            switch (this.recommendType) {
                case '1':
                    return '请输入产品ID';
                    // break;
                case '2':
                    return '请输入用户编号';
                    // break;
                default:
                    return '请输入产品ID/用户编号';
                    // break;
            }
        },
        recommendTip_dialog(){
            switch (this.recommendType_dialog) {
                case '1':
                    return '请输入产品ID';
                    // break;
                case '2':
                    return '请输入用户编号';
                    // break;
                default:
                    return '请输入产品ID/用户编号';
                    // break;
            }
        },

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
            }
            else {
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
            }
            else if (this.currentIndex <= this.maxSpace && this.middleData.length - this.currentIndex > this.maxSpace) {
                for (var i = 0; i < this.currentIndex + (2 * this.maxSpace - this.currentIndex); i++) {
                    arr.push(i + 1);
                }
            }
            else if (this.currentIndex > this.maxSpace && this.middleData.length - this.currentIndex <= this.maxSpace) {
                var space = this.middleData.length - this.currentIndex;
                for (var i = this.currentIndex - (2 * this.maxSpace - space); i < this.middleData.length; i++) {
                    arr.push(i + 1);
                }
            }
            else {
                for (var i = 0; i < this.middleData.length; i++) {
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
    },
    methods: {
        getTableData: function (currentIndex) {
            var params = {};
            var _this = this;
            // params.pageNo = currentIndex + 1;
            // params.pageSize = this.pageMaxNum;
            params.pageNo =1;
            params.pageSize =9999;
            // params.recommendType=1;
            params.recommendType= this.recommendType;
            params.recommendProduct=this.recommendProduct;

            $.post({
                url: '/messageCenter/socialMgmt/hotChat/getTableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        // 后端分页 展示
                        _this.tableData=result.data;
                        console.log(_this.tableData);
                        // _this.tableData = result.data.tableData;
                        // _this.currentIndex = result.data.pageNum - 1;
                        // _this.totalPage = result.data.totalSize;
                    } else {
                        _this.tableData = [];
                        _this.currentIndex = 0;
                        _this.totalPage = 0;
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        // 获取收益率
        getYieldType: function () {
            var _this = this;
            $.post({
                url: '/messageCenter/socialMgmt/hotChat/getYield.ajax',
                // data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.yieldTypeObj=result.data;
                    } else {
                        _this.yieldTypeObj = {};
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        // 新增数据
        showAdd:function () {
            this.updateId='';
            this.recommendType_dialog=this.recommendType,
            this.recommendProduct_dialog='',
            this.yieldType_dialog='',
            this.orderNo_dialog='',
            this.status_dialog='1',
            this.showDialog('', 'add',"false");
        },
        saveParam:function () {
            var _this = this;
            var params={};
            params.recommentType=this.recommendType_dialog;
            params.recommendProduct =this.recommendProduct_dialog;
            params.yieldType =this.yieldType_dialog;
            params.orderNo =this.orderNo_dialog;
            params.status =this.status_dialog;
            console.log(params);
            this.updateId && (params.recommendId = this.updateId);
			var url = this.updateId ? '/update.ajax' : '/add.ajax';
            $.post({
                url: '/messageCenter/socialMgmt/hotChat'+url,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.recommendType = _this.recommendType_dialog;
                        _this.getTableData(0);
                    }
                    _this.showDialog('', 'info', false, result.msg);
                }
            });
        },
        // 修改数据
        showUpdate:function (item) {
            console.log('showUpdate item=', item)
            this.updateId=item.recommendId;
            this.recommendType_dialog=item.recommentType;
            this.recommendProduct_dialog=item.recommendProduct;
            this.yieldType_dialog=item.yieldType;
            this.orderNo_dialog=item.orderNo;
            this.status_dialog=item.status;
            this.showDialog('', 'add',"false");
        },
        // 启用，禁用
        updateParams: function (item) {
            $.post({
                url: `/messageCenter/socialMgmt/hotChat/updateStatus.ajax`,
                data: {
                    recommendId: item.recommendId,
                    status: item.status ? 0 : 1
                },
                success: function (result) {
                    if (result.error === 0) {
                        this.getTableData(0)
                        this.showDialog("", "info", false, '修改状态成功')
                    } else {
                        this.showDialog("", "info", true, result.msg)
                    }
                }.bind(this)
            });
        },

        // 删除数据
        showDelete:function (item) {
            var _this = this;
            this.deleteId =item.recommendId;
            this.showDialog('', 'del');
        },
        deleteData:function () {
            var _this=this;
            var params={};
            params.recommendId = this.deleteId;

            $.post({
                url: '/messageCenter/socialMgmt/hotChat/deleteParam.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0);
                        _this.showDialog('del', 'info', false, result.msg);
                    }
                    _this.showDialog('del', 'info', false, result.msg);
                }
            });
        },

        // 单选
        check: function (index) {
            index.check = !index.check;
        },
        single: function (index) {
            index.check = !index.check;
        },
        // 用户全选
        selectAll: function (allCheck) {
            var _this = this;
            //如果父级被选中，那么子集循环，全被给checked=true
            if (!allCheck) {
                _this.tableData.forEach(function (item) {
                    item.check = true;
                });
            } else {
                //相反，如果没有被选中，子集应该全部checked=false
                _this.tableData.forEach(function (item) {
                    item.check = false;
                });
            }

        },
        select: function (checkAll) {
            var _this = this;
            //如果父级被选中，那么子集循环，全被给checked=true
            if (!checkAll) {
                _this.batchData.forEach(function (item) {
                    item.check = true;
                });
            } else {
                //相反，如果没有被选中，子集应该全部checked=false
                _this.batchData.forEach(function (item) {
                    item.check = false;
                });
            }
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
        //主表格假分页方法
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
    },
    // 类型状态
    filters: {
        status:function(value){
            var obj = {
                "1": "正常",
                "0": "禁用",
            }
            if (obj[value]) {
                return obj[value];
            }
            return value;
        },
        // yieldType:function(value){
        //     var obj = {
        //         "SINCEYEAR": "今年以来",
        //         "NAV": "净值",
        //         "1D": "近1日",
        //         "5Y": "近5年",
        //         "3Y": "近3年",
        //         "1W": "近1周",
        //         "2Y": "近2年",
        //         "6M": "近6月",
        //         "1Y": "近1年",
        //         "SINCE": "创建以来",
        //         "3M": "近3月",
        //         "1M": "近1月"
        //     }
        //     if (obj[value]) {
        //         return obj[value];
        //     }
        //     return value;
        // },

        // 20210910 基金热聊管理->关联推荐管理
        translateRecommendType:function (value) {
            var obj = {
                "1": "产品",
                "2": "账号",
            }
            if (obj[value]) {
                return obj[value];
            }
            return value;
        },

        translateYieldType:function (value, dataObj, recommendType) {
            if(recommendType == '2') return '--';   //账号类型，返回"--"
            return dataObj ? dataObj[value] : value;
        },

    }

});

