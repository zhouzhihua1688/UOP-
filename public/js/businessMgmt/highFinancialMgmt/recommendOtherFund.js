
new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        tableData: [],
        diaMsg: '',
        fundId:'',
        fundName:'',
        recommendFund:'',
        recommendFundName:'',
        recommendDate:'',
        // 查询下拉数据
        nameList:[],
        fundIds:'',
        // 新增参数
        fundDisplayList:[
            // {
            //     fundId: "100002",
            //     recommendDate: "2019-05-28",
            //     recommendFundId: "100002"
            // },
        ],

        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10,
        // 挂载时间
        moment:moment,
        expireDate:moment(new Date()).format("YYYY-MM-DD"),
        // 全选
        allCheck: false,
        // 删除数据
        deleteId:[],
        // 搜索
        keywords:''
    },
    mounted: function () {
        var dialogs = ['info', 'del', 'add','','revise'];
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
        $('.date-timepicker').datetimepicker({
            // format: 'YYYY-MM-DD HH:mm:ss',//use this option to display seconds
            format: 'YYYY-MM-DD',
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
        //下拉列表自带搜索功能
        var fundArr = ['fundNameList',"fundAddList"];
        fundArr.forEach(function (value) {
            $('#' + value).chosen({
                search_contains: true,
                no_results_text: '未找到相关产品信息',
                disable_search_threshold: 6,
                width: '220px'
            });
        });
        $('#fundNameList').on('change', function (e, params) {
            _this.fundId = params ? params.selected : '';
            console.log(_this.fundId)
        });
        $('#fundAddList').on('change', function (e, params) {
            _this.fundIds = params ? params.selected : '';

           
           var params={}
           params.fundId=_this.fundIds;
           console.log(params)
           $.post({
                url: '/businessMgmt/highFinancialMgmt/recommendOtherFund/changeCode.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        // _this.getTableData(0);
                        _this.fundDisplayList=result.data.body
                        
                    }else{
                        _this.fundDisplayList=[]
                    }
                }
            });

        });
        this.getTableData(0);
        this.fundList(0);
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
        // checkAll: function () {
        //     if (this.tableData.length == 0) {
        //         return false;
        //     }
        //     for (var i = 0; i < this.tableData.length; i++) {
        //         if (!this.tableData[i].check) {
        //             return false;
        //         }
        //     }
        //     return true;
        // }
    },
    watch: {
        pageMaxNum: function () {
            this.getTableData(0);
        }
    },
    methods: {
        getTableData: function (currentIndex) {
            var _this = this;
            var params = {};
            params.fundId=this.fundId
            params.pageNum=currentIndex + 1;
            params.pageSize=this.pageMaxNum;
            console.log(params)
            $.post({
                url: '/businessMgmt/highFinancialMgmt/recommendOtherFund/getTableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        // 后端分页 展示
                        _this.tableData = result.data.tableData;
                        _this.currentIndex = result.data.pageNo - 1;
                        _this.totalPage = result.data.totalSize;
                    }
                    else {
                        _this.tableData = [];
                        _this.currentIndex = 0;
                        _this.totalPage = 0;
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        // 下拉列表数据(基金代码)
        // 下拉列表-产品名称
        fundList:function(currentIndex){
            var _this = this;
            var params = {};
            params.pageNum =currentIndex + 1;
            params.pageSize =this.pageMaxNum+9980;
            $.post({
                url: '/businessMgmt/highFinancialMgmt/recommendOtherFund/fundList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.nameList = result.data.listData;
                        _this.currentIndex = result.data.pageNum - 1;
                        _this.totalPage = result.data.totalSize;

                        // 下拉列表
                        // var str = '<option value="">全部</option>';
                        // _this.nameList.forEach(function (item) {
                        //     str += '<option value="' + item.fundId + '">'+item.fundId+"-"+item.fundName + '</option>';
                        // });
                        // var fundArr = ["fundNameList"];
                        // fundArr.forEach(function (value) {
                        //     $('#' + value).html(value === '' ? ('<option value="">全部基金</option>' + str) : str);
                        //     $('#' + value).trigger('chosen:updated');
                        // });
                        // var fundArr = ["fundNameLists"];
                        // fundArr.forEach(function (value) {
                        //     $('#' + value).html('<option value=""></option>' + str);
                        //     $('#' + value).trigger('chosen:updated');
                        // });


                        // 下拉列表
                        var str = '';
                        _this.nameList.forEach(function (item) {
                            str += '<option value="' + item.fundId + '">' + item.fundId + ' ' + item.fundName + '</option>';
                        });
                        var fundArr = ['fundNameList'];
                        fundArr.forEach(function (value) {
                            $('#' + value).html('<option value="">全部</option>' + str);
                            // $('#' + value).html(value === '' ? ('<option value="">全部基金</option>' + str) : str);
                            $('#' + value).trigger('chosen:updated');
                        });
                        var fundArr = ["fundAddList"];
                        fundArr.forEach(function (value) {
                            $('#' + value).html('<option value="">全部</option>' + str);
                            // $('#' + value).html(value === '' ? ('<option value="">全部基金</option>' + str) : str);
                            $('#' + value).trigger('chosen:updated');
                        });
                    }
                    else {
                        _this.nameList = [];
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        // 新增数据
        showAdd:function () {
            var _this = this;
            this.fundIds="";
            $('#fundAddList').val('');
            $('#fundAddList').trigger('chosen:updated');
            _this.fundDisplayList=[]
            // this.fundid = "";
            // this.custno = "";
            this.showDialog('', 'add',"false");
        },
        // 推荐基金
        changeCode:function(){
           var _this = this; 
           var params = {};
           params.fundId=this.fundIds;
           $.post({
                url: '/businessMgmt/highFinancialMgmt/recommendOtherFund/changeCode.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        // _this.getTableData(0);
                        _this.fundDisplayList=result.data.body
                    }else{
                        _this.showDialog('add', 'info',true, result.msg);
                    }

                }
            });
        },
        saveParam:function () {
            var _this = this;
            var hasCheck = false;
            var fundDisplayControlList=[]
            for (var i = 0; i < this.fundDisplayList.length; i++) {
                if (this.fundDisplayList[i].check) {
                    hasCheck = true;
                }
            }
             if (!hasCheck) {
                this.showDialog('add', 'info', true, '未选择任何数据');
                return;
            }
            for (var i = 0; i < this.fundDisplayList.length; i++) {
                if (this.fundDisplayList[i].check) {
                      fundDisplayControlList.push({
                        fundId:this.fundDisplayList[i].fundId ,
                        fundName:this.nameList[i].fundName,
                        recommendDate:this.expireDate,
                        recommendFundId:this.fundIds,
                      })
                }
            }           
            var params ={
                list: JSON.stringify(fundDisplayControlList)
            };
            console.log(params)
            $.post({
                url: '/businessMgmt/highFinancialMgmt/recommendOtherFund/saveParam.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0);
                        _this.showDialog('add', 'info', false, result.msg);
                    }
                    else {
                        _this.showDialog('add', 'info', false, result.msg);
                    }
                }
            });
        },
         // 修改数据
        showUpdate:function (item) {
            var _this = this;
            var hasCheck = false;
            this.fundName=item.fundName;
            this.recommendFundName=item.recommendFundName
            this.fundIds=item.fundId;
            this.recommendDate=moment(item.recommendDate).format('YYYY-MM-DD') 
            var num=0;
            for (var i = 0; i < this.tableData.length; i++) {
                if (this.tableData[i].check) {
                    hasCheck = true;
                    num++
                }
            }         
            if (num>1){
                this.showDialog('', 'info', false, '只能选择一条数据修改');
                return;
            }
            if (!hasCheck) {
                this.showDialog('', 'info', false, '请选择修改数据');
                return;
            }
            this.showDialog('', 'revise');
        },
        update: function () {
            var _this = this;
            var params = {};
            params.fundId =this.fundIds
            params.recommendDate =this.$refs.productTermDays.value;
            $.post({
                url: '/businessMgmt/highFinancialMgmt/recommendOtherFund/update.ajax',
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

        // 删除数据
        showDelete:function () {
            var _this = this;
            var hasCheck = false;
            for (var i = 0; i < this.tableData.length; i++) {
                if (this.tableData[i].check) {
                    hasCheck = true;
                }
            }
            if (!hasCheck) {
                this.showDialog('', 'info', false, '未选择任何数据');
                return;
            }
            this.showDialog('', 'del',false);
        },
        deleteList:function () {
            var _this=this;
            var params={};
            // 组合删除
            var fundIds= [];
            for (var i = 0; i < this.tableData.length; i++) {
                if (this.tableData[i].check) {
                   fundIds.push(this.tableData[i].fundId);
                }
            }
            this.deleteId=fundIds
            params.fundIds =JSON.stringify(this.deleteId)
            $.post({
                url: '/businessMgmt/highFinancialMgmt/recommendOtherFund/deleteParam.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.deleteId = '';
                        _this.getTableData(0);
                    }

                    _this.showDialog('del', 'info', false, result.msg);

                }
            });
        },

        // deleteUser: function () {
        //     var _this = this;
        //     // 组合删除
        //     // var ids= [];
        //     // for (var i = 0; i < this.tableData.length; i++) {
        //     //     if (this.tableData[i].check) {
        //     //         ids.push(this.tableData[i].id);
        //     //     }
        //     // }
        //     // console.log(ids)
        //
        //     // for (var i = 0; i <ids.length; i++) {
        //     // 单一删除
        //     var params = {};
        //     params.type=this.type;//状态参数
        //     params.myqsql= this.mysqlId; //数据表字段id
        //     params.id = this.id//后端产品id
        //         $.post({
        //             url: '/businessMgmt/businessParamConfig/discountHandle/deleteParam.ajax',
        //             // data: {ids:ids[i]},
        //             // data: {id: this.deleteId},
        //             data:params,
        //             traditional: true,
        //             success: function (result) {
        //                 if (result.error === 0) {
        //                     _this.getTableData(0,this.type);
        //
        //                 }
        //                 _this.showDialog('del', 'info', false, result.msg);
        //             }
        //         });
        //
        //     // }
        // },
        // 搜索
        // search(keywords){
        //    return this.fundDisplayList.filter(function(item){
        //       if(item.fundId.includes(keywords)){
        //           return item
        //       }
        //    })
        // },
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
        // 单选
        check: function (index) {
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
    }
});

