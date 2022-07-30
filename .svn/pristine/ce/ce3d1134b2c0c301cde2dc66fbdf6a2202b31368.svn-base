new Vue({
    el: '#content',
    data: {
        labelCode: "",
        conditionName: '',
        addOptData: {},
        showSliding: false,
        operationType: '',
        delParam: {},
        // 主页面相关数据
        tableData: [],
        diaMsg: '',
        isAdd:'',//该数据是否可以新增条件选项
        opType:[],//可以使用的选项类型
        allType:[{type:'01',name:'标签'},{type:'02',name:'固定值'},{type:'03',name:'区间'},{type:'04',name:'滑轴'},{type:'05',name:'自定义'}], // 全部选项类型 1标签
        defaultData:{},
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10,
        condition: "",

    },
    created() {
        this.labelCode = this.getQueryVariable('labelCode')
        this.conditionName = this.getQueryVariable('conditionName')
        this.isAdd = this.getQueryVariable('isAdd');
        this.opType = this.getQueryVariable('opType')&&this.getQueryVariable('opType').split(',');
    },
    
    mounted: function () {
        var dialogs = ['info', 'add', 'del', 'revise', 'detail', 'modify', 'delete', 'putAdd', 'delete2'];
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
        $('.date-timepicker').datetimepicker({
            format: 'YYYY-MM-DD HH:mm:ss', //use this option to display seconds
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
    },

    methods: {
        getQueryVariable(variable) {
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                if (pair[0] == variable) {
                    return pair[1];
                }
            }
            return (false);
        },
        getTableData: function () {
            var _this = this;
            var params = {
                labelCode: this.labelCode
            };
            this.currentIndex = 0;
            $.post({
                url: '/businessMgmt/fundTag/filterMgmt/getOption.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.tableData = result.data.body;
                    } else {
                        _this.tableData = [];
                        _this.currentIndex = 0;
                        _this.totalPage = 0;
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        getDefaults: function (optionType,optionCode) {
            var _this = this;
            var params;
            if (optionType == '01' || optionType == '02') {
                params = {
                    labelCode: this.labelCode,
                    optionType,
                };
            }else if(optionType == '04'){
                // 滑轴取默认值参数
                params = {
                    labelCode: this.labelCode,
                    optionCode,
                    optionType,
                };
            }else{
                return false;
            }
            $.post({
                url: '/businessMgmt/fundTag/filterMgmt/getDefaults.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.defaultData = result.data.body;
                        if(optionType=='04'){
                            !_this.addOptData.defaultMax&&(_this.addOptData.defaultMax=_this.defaultData.defaultMax);
                            !_this.addOptData.defaultMin&&(_this.addOptData.defaultMin=_this.defaultData.defaultMin);
                            !_this.addOptData.max&&(_this.addOptData.max=_this.defaultData.max);
                            !_this.addOptData.min&&(_this.addOptData.min=_this.defaultData.min);
                        }
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        // 新增配置
        showAdd: function () {
            this.operationType = '新增'
            this.addOptData = {
                defaultMax: '', // (number, optional): ,//默认最大值 
                defaultMin: '', //(number, optional):,// 默认最小值 ,
                defaultValue: '', // (string, optional): ,//取值 ,
                items: [], //(Array[string], optional),//: 标签范围 ,
                labelCode: this.labelCode, // (string, optional): ,//标签代码 ,
                max: '', //(number, optional): 最大值 ,
                min: '', //(number, optional): 最小值 ,
                optionName: '', //(string, optional): 选项名称 ,
                optionType: '', //(string, optional): 选项类型 ,
                status: '', //(string, optional): 状态 Y-启用 N-禁用 ,
                unit: '', //(string, optional): 单位
            }
            this.showDialog('', 'addModal', false);
        },
        addData(data) {
            var _this = this
            $.post({
                url: '/businessMgmt/fundTag/filterMgmt/addOption.ajax',
                data,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0)
                        _this.showDialog('addModal', 'info', false, result.msg);
                    }
                }
            });
        },
        // 修改
        showUpdate: function (item) {
            this.addOptData = JSON.parse(JSON.stringify(item));
            this.operationType = '修改';
            this.getDefaults(item.optionType,item.optionCode);
            // if(item.optionType == '04'){
                
            // }else if(item.optionType == '01'||item.optionType == '02'){
            //     this.getDefaults(item.optionType);
            // }
            this.showDialog('', 'addModal', false);
        },
        // 启用 禁用
        changeStatus(item) {
            console.log('changeStatus', item)
            if (item.status == "Y") {
                item.status = "N"
            } else if (item.status == "N") {
                item.status = "Y"

            }
            this.update(item,true)
        },
        update: function (item,isEnable) {
            var _this = this
            var params = item;
            params.items=[];
            if(item.optionType=='04'){
                if(item.defaultMin<this.addOptData.min){
                    _this.showDialog('addModal', 'info', true, '范围填写不正确');
                    return ;
                } 
                if(item.defaultMax>this.addOptData.max){
                    _this.showDialog('addModal', 'info', true, '范围填写不正确');
                    return ;
                }
            }
            $.post({
                url: '/businessMgmt/fundTag/filterMgmt/upOption.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0);
                        _this.showDialog('addModal', 'info', false, result.msg);
                        if(isEnable){
                            _this.showDialog('', 'info', false, result.msg);
                        }
                    }
                }
            });
        },
        // 删除
        showDelete: function (item) {
            this.showDialog('', 'del', false);
            this.delParam = item
        },
        deleteParam: function () {
            var _this = this
            // optionCode
            $.post({
                url: '/businessMgmt/fundTag/filterMgmt/deleteOption.ajax',
                data: this.delParam,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0)
                    }
                    _this.showDialog('del', 'info', false, result.msg);
                }
            });
        },
        switchOptType(optionType) {
            switch (optionType) {
                case '01':
                    return '标签';
                case '02':
                    return '固定值';
                case '03':
                    return '区间';
                case '04':
                    return '滑轴';
                case '05':
                    return '自定义';
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
        // 单选


        //主表格分页方法
        prev: function () {
            this.currentIndex <= 0 ? 0 : this.currentIndex--;
        },
        next: function () {
            this.currentIndex >= this.middleData.length - 1 ? this.middleData.length - 1 : this.currentIndex++;
        },
        changeIndex: function (index) {
            this.currentIndex = index - 1;
        },
    },
    computed: {
        // 当前页面可用的类型
        currentTypeList:function(){
            var list = [];
            this.opType.forEach(function(item){
                list.push(this.allType.find(function(citem){
                    if(citem.type===item){
                        return citem;
                    }
                }))
            }.bind(this))
            return list;
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
    },
    watch: {
        // pageMaxNum: function () {
        //     this.getTableData(0);
        // },

        // 假分页
        pageMaxNum: {
            handler: function (val, oldval) {
                this.currentIndex = 0;
                // this.getTableData(0, this.type)
            }
        },
        condition: {
            handler: function (val, oldval) {
                this.currentIndex = 0;
            }
        },
    },
    // 类型状态
    filters: {
        status: function (item) {
            if (item === "0") {
                return "已关注"
            } else if (item === "1") {
                return "取消关注"
            } else {
                return "其他"
            }
        }
    }
});