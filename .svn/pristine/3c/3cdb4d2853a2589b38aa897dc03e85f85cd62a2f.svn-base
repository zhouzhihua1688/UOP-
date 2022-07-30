new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        tableData: [],
        diaMsg: '',
        modifyStatus: 0,
        // 新增弹窗相关数据
        operateData: {
            configId: 0, //配置ID
            configOperator : '', //操作人员
            currentFundId :'', //升级前基金代码
            endTimestamp :'', //升级结束时间
            remark: '',//备注
            startTimestamp: '', //升级启用时间
            targetFundId: '' //升级后基金代码
        },
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        pageMaxNum: 10,
        condition: '',

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
        }
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
    },
    created: function() {
        this.getTableData();
    },
    mounted: function() {
        var _this = this;
        var dialogs = ['info', 'operate'];
        dialogs.forEach(function(id) {
            $('#' + id).on('shown.bs.modal', function() {
                var $this = $(this);
                var dialog = $this.find('.modal-dialog');
                var top = ($(window).height() - dialog.height()) / 2;
                dialog.css({
                    marginTop: top
                });
            });
        });
    },
    methods: {
        //获取底层账户升级配置信息列表
        getTableData: function() {
            var _this = this;
            var params = {};
            // params.keys = this.keys;
            $.post({
                url: '/publicConfig/monetary/changeConfig/tableData.ajax',
                data: params,
                success: function(result) {
                    if (result.error === 0) {
                        _this.tableData = result.data;
                        _this.currentIndex = 0;
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                        _this.currentIndex = 0;
                    }
                }
            });
        },
        clearAddDia: function() {
            this.operateData.configId = 0;
            this.operateData.configOperator = '';
            this.operateData.currentFundId = '';
            this.operateData.endTimestamp = '';
            this.operateData.remark = '';
            this.operateData.startTimestamp = '';
            this.operateData.targetFundId = '';
        },
        showAdd: function() {
            this.clearAddDia();
            this.modifyStatus = 0;
            this.showDialog('', 'operate');
        },
        showUpdate: function(item) {
            this.clearAddDia();
            this.operateData.configId = item.configId;
            this.operateData.configOperator = item.configOperator;
            this.operateData.currentFundId = item.currentFundId;
            this.operateData.endTimestamp = this.formatTargetDateStr("YYYY/MM/DD HH:mm:ss", new Date(item.endTimestamp));
            this.operateData.remark = item.remark;
            this.operateData.startTimestamp = this.formatTargetDateStr("YYYY/MM/DD HH:mm:ss", new Date(item.startTimestamp));
            this.operateData.targetFundId = item.targetFundId;
            this.modifyStatus = 1;
            this.showDialog('', 'operate');
        },
        checkDiaData: function() {
            if (this.operateData.currentFundId === '') {
                this.showDialog('operate', 'info', true, '请填写升级前基金代码');
                return false;
            }
            if (this.operateData.targetFundId === '') {
                this.showDialog('operate', 'info', true, '请填写升级后基金代码');
                return false;
            }
            if (this.operateData.startTimestamp === '') {
                this.showDialog('operate', 'info', true, '请填写升级启用时间');
                return false;
            }
            if (this.operateData.endTimestamp === '') {
                this.showDialog('operate', 'info', true, '请填写升级结束时间');
                return false;
            }
            if(new Date(this.operateData.startTimestamp).getTime() >new Date(this.operateData.endTimestamp).getTime()){
                this.showDialog('operate', 'info', true, '启用时间不可以晚于结束时间');
                return false;
            }
            return true;
        },
        formatTargetDateStr:function(formate,date) {
            var o = {
                "M+" : date.getMonth()+1,                 //月份
                "D+" : date.getDate(),                    //日
                "H+" : date.getHours(),                   //小时
                "m+" : date.getMinutes(),                 //分
                "s+" : date.getSeconds(),                 //秒
                "q+" : Math.floor((date.getMonth()+3)/3), //季度
                "S"  : date.getMilliseconds()             //毫秒
            };
            if(/(Y+)/.test(formate))
                formate=formate.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
            for(var k in o)
                if(new RegExp("("+ k +")").test(formate))
                    formate = formate.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            return formate;
        },
        add: function() {
            if (!this.checkDiaData()) {
                return;
            }
            var _this = this;
            var params = {};            
            params.currentFundId  = this.operateData.currentFundId;
            params.targetFundId  = this.operateData.targetFundId;
            params.startTimestamp = new Date(this.operateData.startTimestamp).toISOString();
            params.endTimestamp = new Date(this.operateData.endTimestamp).toISOString();
            params.remark = this.operateData.remark;
            var url = '/publicConfig/monetary/changeConfig/';
            if(this.modifyStatus == 1){
                url += 'modify.ajax';
                params.configId = this.operateData.configId;
            }
            else {
                url += 'add.ajax';
            }
            $.post({
                url: url,
                data: params,
                success: function(result) {
                    if (result.error === 0) {
                        _this.getTableData();
                        _this.showDialog('operate', 'info', false, result.msg);
                    } else {
                        _this.showDialog('operate', 'info', true, result.msg);
                    }
                }
            });
        },
        deleteData: function(item) {
            var _this = this;
            $.post({
                url: '/publicConfig/monetary/changeConfig/del.ajax',
                data: {
                    configId: item.configId,
                },
                success: function(result) {
                    if (result.error === 0) {
                        _this.getTableData();
                        _this.showDialog('', 'info', false, result.msg);
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        // 启用 禁用
        changeStatus(item) {
            var _this = this;
            //0-不可用 1-可用
            var url = '/publicConfig/monetary/changeConfig/enable.ajax';
            if (item.status == "1") {
                url = '/publicConfig/monetary/changeConfig/disable.ajax';
            }
            $.post({
                url: url,
                data: {
                    configId: item.configId,
                },
                success: function(result) {
                    if (result.error === 0) {
                        _this.getTableData();
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        //主表格分页方法
        prev: function() {
            this.currentIndex <= 0 ? 0 : this.currentIndex--;
        },
        next: function() {
            this.currentIndex >= this.middleData.length - 1 ? this.middleData.length - 1 : this.currentIndex++;
        },
        changeIndex: function(index) {
            this.currentIndex = index - 1;
        },
        toFirst: function() {
            this.currentIndex = 0;
        },
        toLast: function() {
            this.currentIndex = this.middleData.length - 1;
        },
        //公共方法
        showDialog: function(dia1, dia2, callback, msg) {
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
                $('#' + dia1).on("hidden.bs.modal", function() {
                    $('#' + dia2).modal('show');
                    $('#' + dia1).off().on("hidden", "hidden.bs.modal");
                });
                $('#' + dia1).modal('hide');
            } else {
                $('#' + dia1).on("hidden.bs.modal", function() {
                    $('#' + dia2).on("hidden.bs.modal", function() {
                        $('#' + dia1).modal("show");
                        $('#' + dia2).off().on("hidden", "hidden.bs.modal");
                    });
                    $('#' + dia2).modal("show");
                    $('#' + dia1).off().on("hidden", "hidden.bs.modal");
                });
                $('#' + dia1).modal('hide');
            }
        }
    },
    components: {
        'date-picker': VueBootstrapDatetimePicker
    },
});
