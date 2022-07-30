new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        tableData: [],
        diaMsg: '',
        // 新增参数
        fundId:'',

        bundleTopic: "",
        bundleno: "",
        isEnable: "",
        startDate: "",
        fundid:'',
        isDisplay:'Y',
        linkUrl:'',

        allList:[],
        allSelectList:[],
        detailList:[],
        // 查询用

        bundlenos:'',
        startDate:'',
        // 修改传序列号
        serialno:'',
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10,
        condition: "",
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
            var currentIndex = parseInt(this.currentIndex);
            return this.middleData[currentIndex];
        },
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
    mounted: function () {
        var _this = this;
        var dialogs = ['info','add','revise','del','detail','putAdd','putUpdate','delete'];
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

        //关联多选
        var selected = [];
        $('#allList').multiselect({
            buttonWidth: '175px',
            maxHeight: 300,
            enableFiltering: true,
            enableHTML: true,
            // includeSelectAllOption: true,//全选
            // selectAllText: '全选',//全选的checkbox名称
            nonSelectedText: '请选择',
            selectAllNumber: false,//true显示allselect（6）,false显示allselect
            selectAllName: 'select-all-name',
            selectAllValue: 'select-all-value',//可以为strig或者数字
            selectAllJustVisible: false,//选择所有的。true为全选可见的
            buttonClass: 'btn btn-white btn-primary',
            buttonText: function (options, select) {
                var once = [];
                $('#allList option:selected').each(function () {
                    once.push($(this).attr('label'));
                    // once.push($(this).attr('value'));
                });
                // console.log(options.length);
                // console.log(options.prevObject.length);
                if (options.length === 0) {
                    return this.nonSelectedText;
                } else if (options.length === 1) {
                    return once[0];
                } else if (options.length > 1) {
                    return '已选' + once.length
                }
            },
            templates: {
                button: '<button type="button" class="multiselect dropdown-toggle" data-toggle="dropdown"><span class="multiselect-selected-text"></span> &nbsp;<b class="fa fa-caret-down"></b></button>',
                ul: '<ul class="multiselect-container dropdown-menu"></ul>',
                filter: '<li class="multiselect-item filter"><div class="input-group"><span class="input-group-addon"><i class="fa fa-search"></i></span><input class="form-control multiselect-search" type="text"></div></li>',
                filterClearBtn: '<span class="input-group-btn"><button class="btn btn-default btn-white btn-grey multiselect-clear-filter" type="button"><i class="fa fa-times-circle red2"></i></button></span>',
                li: '<li><a tabindex="0"><label></label></a></li>',
                divider: '<li class="multiselect-item divider"></li>',
                liGroup: '<li class="multiselect-item multiselect-group"><label></label></li>'
            },
            onDropdownHide: function (event) {
                selected = [];
                $('#allList option:selected').each(function () {
                    selected.push($(this).val());
                });
                _this.allSelectList = $("#allList").val() ? $("#allList").val() : [];
            },
            // onDropdownShown: function () {
            //     selected = [];
            //     $('#fundRelations option:selected').each(function () {
            //         selected.push($(this).val());
            //     });
            //     _this.relate_groupId= $("#fundRelations").val() ? $("#fundRelations").val() : [];
            //     console.log("===", _this.relate_groupId)
            // }
        });

        var fundArr = ["fundList","fundList1"];
        fundArr.forEach(function (value) {
            $('#' + value).chosen({
                search_contains:true,
                no_results_text: '未找到相关基金信息',
                disable_search_threshold:6,
                width: '175px'
            });
        });
        $('#fundList').on('change', function (e, params) {
            _this.fundid= params ? params.selected : '';
        });
        $('#fundList1').on('change', function (e, params) {
            _this.fundid= params ? params.selected : '';
        });
        this.allFund();
        this.getTableData(0);
    },
    methods: {
        // 获取所有基金
        allFund: function () {
            var _this = this;
            $.post({
                url: '/businessMgmt/productInfoConfig/freeRideProductConfig/fundList.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        // 多选
                        _this.allList = result.data.body;
                        // _this.dataSummary(_this.allList, 'value', 'label', 'allList');
                        var str = '';
                        result.data.body.forEach(function(item) {
                            str += '<option value="' + item.fundId + '">' + item.fundId + '-' + item.fundName + '</option>';
                        });
                        var fundArr = ["fundList","fundList1"];
                        fundArr.forEach(function (value) {
                            $('#' + value).html('<option value=""></option>' + str);
                            $('#' + value).trigger('chosen:updated');
                        });
                    } else {
                        // _this.allSelectList = [];
                        _this.showDialog("", "info", false, '基金组合信息获取失败')
                    }
                }
            });
        },
        getTableData: function (currentIndex) {
            var _this = this;
            var params = {};
            params.bundleno = this.bundlenos;
            $.post({
                url: '/businessMgmt/productInfoConfig/freeRideProductConfig/getTableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.currentIndex = 0;
                        // _this.tableData = result.data.tableData;
                        _this.tableData = result.data.tableData.filter(function (item) {
                            return item.bundleno.indexOf(params.bundleno) > -1
                                && item.startDate.indexOf(params.startDate) > -1;
                        });
                    }
                    else {
                        _this.tableData = [];
                        _this.currentIndex = 0;
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        showAdd: function () {
            var _this=this;
            this.bundleno="";
            this.bundleTopic="";
			this.isEnable="Y";
			this.startDate="";
            this.linkUrl="";
			this.showDialog('', 'add');
        },
        // 新增必填弹框
        diaInfoCheck: function () {
            var _this = this;
            // if (this.shiftType==""||isNaN(Number(this.shiftType))) {
            //     this.showDialog('add', 'info', true, '车次号不能为空');
            //     return false;
            // }
            // if (this.shiftType.length>2) {
            //     this.showDialog('add', 'info', true, '主题不能为空');
            //     return false;
            // }
            if (!this.bundleno) {
                this.showDialog('add', 'info', true, '车次号不能为空');
                return false;
            }
            if (!this.bundleTopic) {
                this.showDialog('add', 'info', true, '主题不能为空');
                return false;
            }
            // if (!this.startDate) {
            //     this.showDialog('add', 'info', true, '发车日期不能为空');
            //     return false;
            // }
            if (!$("#startDate").val()) {
                this.showDialog('add', 'info', true, '发车日期不能为空');
                return false;
            }
            if (!this.isEnable) {
                this.showDialog('add', 'info', true, '请选择是否启用');
                return false;
            }
            return true;
        },
        saveParam:function(){
            var _this=this;
            if (this.diaInfoCheck()) {
                var params={}
                var time= this.$refs.startDates.value;
                params.bundleno=this.bundleno;
                params.bundleTopic=this.bundleTopic;
                params.startDate=time.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1$2$3');
                params.isEnable=this.isEnable;
                params.linkUrl=this.linkUrl;
                $.post({
                    url: '/businessMgmt/productInfoConfig/freeRideProductConfig/saveParam.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.getTableData(0);
                            _this.showDialog('add', 'info', false, result.msg);
                        }else {
                            _this.showDialog('add', 'info', true, "你输入的车次号已经存在或者参数有误!");
                        }
                    }
                });
            }
        },
        // 修改数据
        showUpdate:function (item) {
            var _this=this;
            this.bundleno=item.bundleno;
            this.bundleTopic=item.bundleTopic;
            // this.startDate=item.startDate;
            $("#startTime").val(item.startDate);
            this.isEnable=item.isEnable;
            this.linkUrl=item.linkUrl;
            this.showDialog('', 'revise');
        },
        update: function () {
            var _this = this;
            var params = {};
            params.bundleno =this.bundleno;
            params.bundleTopic=this.bundleTopic;
            params.startDate = this.$refs.startTime.value;;
            params.isEnable = this.isEnable;
            params.linkUrl=this.linkUrl;
            console.log(params)
            $.post({
                url: '/businessMgmt/productInfoConfig/freeRideProductConfig/update.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0);
                        _this.showDialog('revise', 'info', false, result.msg);
                    }
                    _this.showDialog('revise', 'info', false, result.msg);
                }
            });
        },
        // 删除
        showDelete: function(item) {
            this.bundleno = item.bundleno;
            this.showDialog('', 'del');
        },
        del: function() {
            var _this = this;
            var params = {};
            params.bundleno = this.bundleno
            $.post({
                url: '/businessMgmt/productInfoConfig/freeRideProductConfig/deleteParam.ajax',
                data: params,
                success: function(result) {
                    if (result.error === 0) {
                        _this.getTableData();
                        _this.showDialog('del', 'info', false, result.msg);
                    } else {
                        _this.showDialog('del', 'info', true, result.msg);
                    }
                }
            });
        },

        // 管理基金
        showFund:function(item){
            var _this=this;
            this.bundleno = item.bundleno;
            var params={}
            params.bundleno=item.bundleno
            $.post({
                url: '/businessMgmt/productInfoConfig/freeRideProductConfig/showFund.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.detailList=result.data.body;
                    }else{
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
            _this.showDialog('', 'detail', false);
        },
        // 管理基金-新增、
        putAdd:function(){
            var _this=this;
            _this.isDisplay="Y";
            $('#fundList').val('');
            _this.fundid='';
            $('#fundList').trigger('chosen:updated');
            _this.showDialog('detail', 'putAdd', false);
        },
        AddList:function(){
            var _this=this
            var params={}
            params.bundleno=this.bundleno;
            params.fundid=this.fundid;
            params.isDisplay=this.isDisplay;
            console.log(params)
            $.post({
                url: '/businessMgmt/productInfoConfig/freeRideProductConfig/AddList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        // _this.getTableData(0);
                    }
                    _this.showDialog('putAdd', 'info', false, result.msg);
                }
            });
        },

        // 管理基金-修改、
        fundUpdate:function(item){
            var _this=this;
            this.fundid = item.fundid;
            // _this.dataSummary2(_this.allList, 'value', 'label', 'fundList1',this.fundid);
            _this.fundid = item.fundid;
            this.isDisplay=item.isDisplay;
            // 插件单选修改选中
            // $('#fundList1').val(item.fundid);
            // $("#fundList1").trigger("chosen:updated");
            _this.showDialog('detail', 'putUpdate', false);
        },
        updateList:function(){
            var _this=this
            var params={}
            params.bundleno=this.bundleno;
            params.fundid=this.fundid;
            params.isDisplay=this.isDisplay;
            console.log(params)
            $.post({
                url: '/businessMgmt/productInfoConfig/freeRideProductConfig/updateList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        // _this.getTableData(0);
                    }
                    _this.showDialog('putUpdate', 'info', false, result.msg);
                }
            });
        },
        // 管理基金-删除
        delList:function(item){
            var _this=this
            this.bundleno=item.bundleno
            this.fundid=item.fundid
            this.isDisplay=item.isDisplay
            _this.showDialog('detail', 'delete', false);
        },
        deleteList:function(){
            var _this=this
            var params={}
            params.bundleno=this.bundleno
            params.fundId=this.fundid
            console.log(params)
            $.post({
                url: '/businessMgmt/productInfoConfig/freeRideProductConfig/deleteList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        // _this.getTableData(0);
                    }
                    _this.showDialog('delete', 'info', false, result.msg);
                }
            });
        },
        dataSummary: function (asynData,value, label, dom) {
            if (asynData && asynData.length > 0) {
                var data = [];
                for (var i = 0; i < asynData.length; i++) {
                    data.push({
                        value: asynData[i].fundId,
                        label: asynData[i].fundId+"-"+asynData[i].fundName
                    });
                }
                $("#" + dom).multiselect('dataprovider', data);
            }
        },

        filterToId:function(val){
            var str='';
            var _this=this;
            _this.allList.forEach(function(item){
                if(item.fundId==val){
                    str=item.fundName
                }
            })
            return str;
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
        //主表格分页方法
        prev: function () {
            this.currentIndex<= 0 ? 0 : this.currentIndex--;
        },
        next: function () {
            this.currentIndex>= this.middleData.length - 1 ? this.middleData.length - 1 : this.currentIndex++;
        },
        changeIndex: function (index) {
            this.currentIndex= index - 1;
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
                if (val.length > 8) {
                    return val.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/g, '$1-$2-$3 $4:$5:$6')
                } else {
                    return val.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')
                }
            } else {
                return '-'
            }
        }
    },
    filters:{
        isDisplay: function (item) {
            if (item) {
                return item.replace(/Y/g, '是(Y)').replace(/N/g, '否(N)')
            }
        },
    }
});
