// const { query } = require("express");

new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        tableData: [],
        allList:[],
        groupList:[],
        allSelectList:[],
        diaMsg: '',

        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        pageMaxNum: '10',
        condition: '',
        fundGroupType: 'ALL',
      
        // // 查询
        queryGroupId: '',
        // 新增修改数据
        groupId:'',
        // endActionDOList:[],
        checkStatus:[],
        isUpdate:false,
        deleteId:''
    },
    created:function() {
        this.getAllfund();
    },
    mounted: function () {
        var dialogs = ['info', 'delete'];
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
        // 基金多选
        var selected = [];
        $('#allList').multiselect({
            buttonWidth: '164px',
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
                // console.log(options,'options');
                // console.log(select,'select');
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
                // console.log(selected,'selected');
                _this.allSelectList = $("#allList").val() ? $("#allList").val() : [];
            }
        });
        $('#queryGroupList').on('change', function (e, params) {
            this.queryGroupId = params ? params.selected : '';
        }.bind(this));
        $('#queryGroupList').chosen({
            search_contains: true,
            no_results_text: '未找到相关基金信息',
            disable_search_threshold: 6,
            width: '170px'
        });
        $('#groupList').on('change', function (e, params) {
            this.groupId = params ? params.selected : '';
        }.bind(this));
        $('#groupList').chosen({
            search_contains: true,
            no_results_text: '未找到相关基金信息',
            disable_search_threshold: 6,
            width: '170px'
        });
        this.getTableData(0);
      
    },
    computed: {
        //主表格分页
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
            } else if (this.currentIndex <= this.maxSpace && this.middleData.length - this.currentIndex > this.maxSpace) {
                for (var i = 0; i < this.currentIndex + (2 * this.maxSpace - this.currentIndex); i++) {
                    arr.push(i + 1);
                }
            } else if (this.currentIndex > this.maxSpace && this.middleData.length - this.currentIndex <= this.maxSpace) {
                var space = this.middleData.length - this.currentIndex;
                for (var i = this.currentIndex - (2 * this.maxSpace - space); i < this.middleData.length; i++) {
                    arr.push(i + 1);
                }
            } else {
                for (var i = 0; i < this.middleData.length; i++) {
                    arr.push(i + 1);
                }
            }
            return arr;
        },
    },
    watch: {
        pageMaxNum: function (val, oldval) {
            this.currentIndex = 0;
        },
        condition: function () {
            this.currentIndex = 0;
        }
    },
    methods: {
        // 查询所有已转换数据
        getTableData: function (currentIndex) {
            var params={};
            var url='';
            if(this.queryGroupId){
                params.groupid=this.queryGroupId
                url='/businessMgmt/combinationProductConfig/productTargetProfitPlanSetting/queryGroupId.ajax'
            }else{
                url='/businessMgmt/combinationProductConfig/productTargetProfitPlanSetting/queryAll.ajax'
            }
            $.post({
                url: url,
                data:params,
                success: function (result) {
                    if (result.error === 0) {
                        this.tableData = result.data;
                    } else {
                        this.tableData = [];
                        this.currentIndex = 0;
                        this.totalPage = 0;
                        this.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
        // 按groupId查询单条数据

        //查询所有的组合基金id 
        getAllfund: function () {
            $.post({
                url: '/businessMgmt/combinationProductConfig/productTargetProfitPlanSetting/queryFundAll.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        var str = '';
                        var fundDetail = null;
                        fundDetail = result.data;
                        this.groupList=fundDetail.groupList;
                        this.allList=fundDetail.allList;

                        this.dataSummary(this.allList, 'value', 'label', 'allList');
                      
                        this.groupList.forEach(function (item) {
                            str += '<option value="' + item.fundId + '">' + item.fundId + ' ' + item.fundName + '</option>';
                        });
                        var groupDomType = ['queryGroupList','groupList'];
                        groupDomType.forEach(function(value){
                            $('#'+value).html('<option value="">请选择</option>'+ str);
                            $('#'+value).trigger('chosen:updated');
                        })
                     
                    } else {
                        this.fundList = [];
                        this.showDialog("", "info", false, '基金组合信息获取失败')
                    }
                }.bind(this)
            });
        },
        // 按基金或组合id查询详情
        searchGroup:function(){
            $.post({
                url: '/businessMgmt/combinationProductConfig/productTargetProfitPlanSetting/queryGroupId.ajax',
                data:{},
                success: function (result) {
                    if (result.error === 0) {
                        this.tableData = result.data;
                    } else {
                        this.tableData = [];
                        this.currentIndex = 0;
                        this.totalPage = 0;
                        this.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
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
        // 打开新增窗口
        showAdd:function () {
            this.isUpdate=false;
            // 清空chosen选框赋值
            $("#groupList").val('');
            $("#groupList").prop('disabled',false);
            $("#groupList").trigger('chosen:updated');
            // 清空多选
            // $("#allList").multiselect("refresh");
            $("#allList").val("");
            $("#allList").multiselect('select',[]);
            $(".btn-group li").removeClass('active');
            $("input[type=checkbox].ace").attr("checked",false)
            this.allSelectList=[],
            this.groupId='';
            // 清空选中状态
            this.checkStatus=[];
            this.showDialog("", "add", false)
        },
        // 打开修改窗口
        showUpdate:function(item){
            this.isUpdate=true;
            this.checkStatus=[];
            this.allSelectList=[];
             // chosen选框赋值
             $("#groupList").val(item.groupid);
             $("#groupList").prop('disabled',true);
             $("#groupList").trigger('chosen:updated');
             this.groupId=item.groupid;
            //  多选框赋值以及选中赋值
            item.endActionDOList.forEach(function(listItem){
                if(listItem.endAction=='01'){
                    this.checkStatus.push('01')
                }else{
                    this.checkStatus=['01','02'];
                    this.allSelectList.push(listItem.groupidTransed)
                }
            }.bind(this))
            $("#allList").val("");
            $("#allList").multiselect('select',[]);
            $(".btn-group li").removeClass('active');
            $("input[type=checkbox].ace").attr("checked",false)
            $("#allList").multiselect('select',this.allSelectList);
             this.showDialog("", "add", false)
        },
        // 新增修改
        add:function(){
            var params={};
            params.groupid=this.groupId;
            params.endActionDOList=[];
            this.checkStatus.forEach(function(item){
                if(item=='01'){
                    params.endActionDOList.push({
                        endAction: "01",
                        groupid: this.groupId,
                        groupidTransed: '',
                    })
                }
                if(item=='02'){
                    this.allSelectList.forEach(function(items){
                        params.endActionDOList.push({
                            endAction: "02",
                            groupid: this.groupId,
                            groupidTransed: items,
                        })
                    }.bind(this))
                }
            }.bind(this))
            console.log(params,'params');
            $.post({
                url: '/businessMgmt/combinationProductConfig/productTargetProfitPlanSetting/add.ajax',
                data:params,
                success: function (result) {
                    if (result.error === 0) {
                        this.getTableData(0);
                        if(!this.isUpdate){
                            this.showDialog("", "info", false,'新增成功')
                        }
                        if(this.isUpdate){
                            this.showDialog("", "info", false,'修改成功')
                        }
                    } else {
                        this.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
        // 删除
        deleteParams:function(item){
            this.deleteId=item.groupid;
            this.showDialog("", "delete")
        },
        deleteConfirm:function(){
            $.post({
                url: '/businessMgmt/combinationProductConfig/productTargetProfitPlanSetting/delete.ajax',
                data:{groupid:this.deleteId},
                success: function (result) {
                    if (result.error === 0) {
                        this.getTableData(0);
                        this.showDialog("", "info", false, '删除成功')
                    } else {
                        this.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
        filterToId:function(val){
            var str='';
            this.allList.forEach(function(item){
                if(item.fundId==val){
                   str=item.fundName
                }
            })
            return str;
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
        
    }
});