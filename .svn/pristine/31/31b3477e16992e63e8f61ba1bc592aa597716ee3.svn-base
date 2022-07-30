new Vue({
    el: '#content',
    data: {
        //查询
        switchName: '',
        fundId:'',
        //新增
        addStatus: 1,
        addFundId:'',
        addSwitchName: [],
        //删除
        deleSwitchName:'',
        deleFundId:'',

        addSwitchNameList: [],
        tableData: [],
        diaMsg: '',
        isList:true,
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10,
        total:null
    },
    mounted: function () {

        var dialogs = ['info', 'add', "update", "delete"];
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
        _this.querySwitchList(0);
        _this.querySwitchSelect();
        //查询页数
        $.post({
            url: '/businessMgmt/switchMgmt/fundSwitchMgmt/queryCount.ajax',
            success: function (result) {
                if (result.error === 0) {
                    _this.total=result.data;
                    _this.totalPage =Math.ceil(_this.total / _this.pageMaxNum);
                } else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });
        var selected = [];
        //具体业务类型
        $('#addSwitchName').multiselect({
            buttonWidth: '164px',
            maxHeight: 300,
            enableFiltering: true,
            enableHTML: true,
            // includeSelectAllOption: true,//全选
            selectAllText: '全选',//全选的checkbox名称
            nonSelectedText: '请选择',
            selectAllNumber: false,//true显示allselect（6）,false显示allselect
            selectAllName: 'select-all-name',
            selectAllValue: 'select-all-value',//可以为strig或者数字
            selectAllJustVisible: false,//选择所有的。true为全选可见的
            buttonClass: 'btn btn-white btn-primary',
            buttonText: function (options, select) {
                var once = [];
                $('#addSwitchName option:selected').each(function () {
                    once.push($(this).attr('label'));
                });
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
                $('#addSwitchName option:selected').each(function () {
                    selected.push($(this).val());
                });
                _this.addSwitchName = $("#addSwitchName").val()?$("#addSwitchName").val():[];
            }
        });

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
            this.querySwitchList(0);
        }
    },
    methods: {
        //查询开关信息
        querySwitchInfo: function () {
            this.isList=false;
            if(!this.switchName&&!this.fundId){
                this.querySwitchList(0);
                return false;
            }
            else if(this.switchName&&this.fundId){
                this.doubleTermQuery();
                return false;
            }
            else if(!this.switchName&&this.fundId){
                this.fundIdQuery();
                return false;
            }
            else if(this.switchName&&!this.fundId){
                this.nameQuery();
            }

        },
        //双条件查询
        doubleTermQuery:function () {
          var _this=this;
            $.post({
                url: '/businessMgmt/switchMgmt/fundSwitchMgmt/queryInfo.ajax',
                data: {
                    switchName: _this.switchName,
                    fundId:_this.fundId
                },
                success: function (result) {
                    if (result.error === 0) {
                        if(result.data){
                            _this.tableData=result.data;
                        }else{
                            _this.tableData=[];
                        }
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        //fundid条件查询
        fundIdQuery:function () {
            var _this=this;
            $.post({
                url: '/businessMgmt/switchMgmt/fundSwitchMgmt/queryForFundId.ajax',
                data: {
                    fundId:_this.fundId
                },
                success: function (result) {
                    if (result.error === 0) {
                        if(result.data){
                            _this.tableData=result.data;
                        }else{
                            _this.tableData=[];
                        }
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        //Name条件查询
        nameQuery:function () {
            var _this=this;
            $.post({
                url: '/businessMgmt/switchMgmt/fundSwitchMgmt/queryForName.ajax',
                data: {
                    switchName: _this.switchName
                },
                success: function (result) {
                    if (result.error === 0) {
                        if(result.data){
                            _this.tableData=result.data;
                        }else{
                            _this.tableData=[];
                        }
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        //查询select
        querySwitchSelect: function () {
            var _this = this;
            $.post({
                url: '/businessMgmt/switchMgmt/fundSwitchMgmt/querySelect.ajax',

                success: function (result) {
                    if (result.error === 0) {
                        _this.dataSummary(result.data,_this.addSwitchNameList,'switchName','switchName','description','addSwitchName');
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        //list
        querySwitchList: function (currentIndex) {
            var params = {};
            var _this = this;
            _this.isList=true;
            params.pageNo = currentIndex + 1;
            params.pageSize = this.pageMaxNum;
            params.total= this.total;
            $.post({
                url: '/businessMgmt/switchMgmt/fundSwitchMgmt/queryList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        if (result.data&& result.data.length > 0) {
                            _this.tableData = result.data;
                            _this.currentIndex = params.pageNo - 1;

                        } else {
                            _this.tableData = [];
                            _this.currentIndex = 0;
                            _this.totalPage = 0;
                        }

                    } else {
                        _this.tableData = [];
                        _this.currentIndex = 0;
                        _this.totalPage = 0;
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        //查询页数

        //新增开关
        addParam: function () {
            // this.addSwitchName=[];
            // this.addFundId='';
            this.showDialog('', 'add', false);
        },
        adding: function () {
            var _this = this;

            if(!(_this.addSwitchName.length==1)){
                _this.showDialog('', 'info', false,'开关名称只能选择一项');
                return false;
            }
            if(!(/^[a-zA-Z0-9]{6}$/.test(_this.addFundId))){
                _this.showDialog('', 'info', false,'基金id只能为6位的数字或6位英语数字混合');
                return false;
            }
            var params={
                switchName: _this.addSwitchName,
                fundid:_this.addFundId,
                status: _this.addStatus
            };

            $.post({
                url: '/businessMgmt/switchMgmt/fundSwitchMgmt/addInfo.ajax',
                data: {
                    webParams:JSON.stringify(params)
                },
                success: function (result) {
                    if (result.error === 0) {
                        if(result.data=='true'){
                            _this.showDialog('', 'info', false, result.msg);
                            _this.querySwitchList(0);
                        }else{
                            _this.showDialog('', 'info', false,'新增失败，无对应开关');
                        }
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        //删除开关
        deleteParams: function (item) {
            this.deleSwitchName=item.switchName;
            this.deleFundId=item.fundid;
            this.showDialog('', 'delete', false,'确定要删除 "'+this.deleFundId+'" 吗');
        },
        deleting: function () {
            var _this=this;
            $.post({
                url: '/businessMgmt/switchMgmt/fundSwitchMgmt/deleteInfo.ajax',
                data: {
                    switchName: _this.deleSwitchName,
                    fundId:_this.deleFundId
                },
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('', 'info', false, result.msg);
                        _this.querySwitchList(0);
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        //更新开关
        updateParams:function (item) {
            var _this=this;
            // console.log(item.version);
            $.post({
                url: '/businessMgmt/switchMgmt/fundSwitchMgmt/updateInfo.ajax',
                data: {
                    serialno: item.serialno,
                    status: item.status==0?1:0,
                    switchName: item.switchName,
                    fundid:item.fundid,
                    version: item.version
                },
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('', 'info', false, result.msg);
                        _this.querySwitchList(0);
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        //分页
        prev: function () {
            if (this.currentIndex <= 0) {
                return;
            }
            this.querySwitchList(this.currentIndex - 1);
        },
        next: function () {
            if (this.currentIndex >= this.totalPage - 1) {
                return;
            }
            this.querySwitchList(this.currentIndex + 1);
        },
        changeIndex: function (index) {
            this.querySwitchList(index - 1);
        },
        toFirst: function () {
            this.querySwitchList(0);
        },
        toLast: function () {
            this.querySwitchList(this.totalPage - 1);
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
        //数据汇总
        dataSummary:function (asynData,vueData,value,label,addlabel,dom) {
            var _this=this;
            if(asynData&&asynData.length>0){
                vueData = asynData.map(function (item) {
                    return {
                        value: item[value],
                        label: item[label]+"("+_this.overflowHide(item[addlabel])+")"
                    }
                });
                var data = [];
                for (var i = 0; i < vueData.length; i++) {
                    data.push({value: vueData[i].value, label: vueData[i].label});
                }
                $("#"+dom).multiselect('dataprovider', data);
            }
        },
        overflowHide: function (val) {
            var str = val.toString();
            if (str.length > 4) {
                str = str.substring(0, 4) + '...'
            }
            return str;
        }

    },
    // 类型状态
    filters: {}
});