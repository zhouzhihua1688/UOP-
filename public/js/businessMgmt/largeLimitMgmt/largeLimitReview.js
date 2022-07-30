
new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        // 规则编号
        id: '',
        // 产品
        product: "",
        // 保存弹窗产品
        saveproduct: "",
        // 业务类型
        apkind: "",
        // 银行编号
        bankNo: "",
        // 网点
        branchCode: "",
        // 渠道
        channel: "",
        // 客户编号
        custNo: "",
        // 客户类型
        custType: "",
        // 展示折扣
        displayDiscount: "",
        // 交易折扣
        tradeDiscount: "",
        endTimeStr: "",
        status: "",
        remark: "",
        startTimeStr:"",
        oproduct:"",
        startamount:"",
        endamount:"",
        subapkind:"",

        isUpdate: false,
        //隐藏假分页节点元素
        showMysql: false,
        // 表格数据
        updateId: '',
        tableData: [],
        diaMsg: '',
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10,
        condition: "",
        // 全选
        allCheck: false,

        // 以下操作Mysql数据库参数
        // 复核状态
        reviewStatus: "",
        // 数据库id
        mysqlId: "",
        // 数据类型(0:业务,1:Mysql数据库)
        type: "0",
        mysqlStatus: '',
        // mysql传产品值
        mysqlProduct: "",
        // 获取数据库产品所有ID
        arrId: [],
        oneId:'',
    },
    // 获取本地Mysql所有Id
    created: function(){
        this.getlocalList()
        this.getTableData(0,this.type);
    },
    mounted: function () {
        var dialogs = ['info', 'del', 'add',"update","revise"];
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
        this.getTableData(0,this.type);

       // 时间插件
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
        // 后端真分页
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
            }
            else if (this.currentIndex <= this.maxSpace && this.totalPage - this.currentIndex > this.maxSpace) {
                for (var i = 0; i < this.currentIndex + (2 * this.maxSpace - this.currentIndex); i++) {
                    arr.push(i + 1);
                }
            }
            else if (this.currentIndex > this.maxSpace && this.totalPage - this.currentIndex <= this.maxSpace) {
                var space = this.totalPage - this.currentIndex;
                for (var i = this.currentIndex - (2 * this.maxSpace - space); i < this.totalPage; i++) {
                    arr.push(i + 1);
                }
            }
            else {
                for (var i = 0; i < this.totalPage; i++) {
                    arr.push(i + 1);
                }
            }
            return arr;
        },
    },
    watch: {
        // 真分页
        pageMaxNum: function () {
            this.getTableData(0,this.type);
        },
        // 假分页
        pageMaxNum: {
            handler: function (val, oldval) {
                this.currentIndex = 0;
                this.getTableData(0,this.type)
            }
        },
        condition: {
            handler: function (val, oldval) {
                this.currentIndex = 0;
            }
        },
    },
    methods:{
        getTableData: function (currentIndex,type) {
            var _this = this;
            var params = {};
            params.type=type;
            // params.status=this.status;//每次传过去的状态参数(复选框列表)
            //传过去的状态参数(选择数据类型)
            // if(type!=undefined){
            //     this.type=type;
            //
            // }
            // if (this.product==""&&this.status=="") {
            //     this.showDialog("", 'info', true, '请选择查询数据状态');
            //     return;
            // }
            // type==0请求后端数据
            if(type==0) {
                this.isUpdate=true;  //显示真分页
                this.showMysql=false//显示假分页
                params.product= this.product;
                params.pageNo= currentIndex + 1;
                params.pageSize = this.pageMaxNum;
                $.post({
                    url: '/businessMgmt/businessParamConfig/discountHandle/getTableData.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            // _this.tableData = result.data;
                            // 后端分页 展示
                            _this.tableData = result.data.tableData;
                            _this.currentIndex = result.data.pageNo-1;
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
            }
            if(type==1) {
                // params.pageNo= currentIndex + 1;
                // params.pageSize = this.pageMaxNum;
                // this.mysqlId=this.tableData.mySQLId  //获取数据库表字段ID
                // var productAll=[]
                // var product=this.product
                // for (var i = 0; i < this.tableData.length; i++) {
                //         productAll.push(this.tableData[i].product);
                // }
                // console.log("----",productAll)
                //
                // for (var i = 0; i < productAll.length; i++) {
                //     console.log(productAll[i]);
                //     console.log(product);
                //     if(product==productAll[i]){
                //         _this.tableData=_this.tableData.product
                //     }
                // }
                var _this = this;
                // 真假分页切换
                this.isUpdate=false;
                this.showMysql=true;
                this.currentIndex = 0;
                params.reviewStatus=this.reviewStatus;
                params.product= this.product;
                $.post({
                    url: '/businessMgmt/businessParamConfig/discountHandle/getTableData.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.tableData = result.data;
                        }
                        else {
                            _this.showDialog('', 'info', false, result.msg);
                        }
                    }
                });
            }
        },
        // 获取本地数据库产品的Id
        getlocalList:function () {
            var _this = this, arr;
            $.post({
                url: '/businessMgmt/businessParamConfig/discountHandle/getTableData.ajax',
                data: {
                    type:1,
                    product: '',
                    reviewStatus: ""
                },
                success: function (result) {
                    if (result.error === 0) {
                        arr = result.data.map(function (item) {
                            return item.id
                        })

                        _this.arrId = arr;
                        _this.tableData = result.data;//为新增,修改,删除刷新调用
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        // 添加按钮弹窗
        showAdd:function () {
            var _this = this;
            this.id="";
            this.saveproduct="";
            this.apkind="";
            this.bankNo="";
            this.branchCode="";
            this.channel="";
            this.custNo="";
            this.custType="";
            this.displayDiscount="";
            this.startTimeStr="";
            this.endTimeStr="";
            this.tradeDiscount="";
            _this.subapkind="";
            _this.startamount ="";
            _this.endamount ="";
            this.oproduct="";
            this.remark="";
            this.showDialog('', 'add');
        },
        // 新增必填弹框
        diaInfoCheck: function () {
            var _this = this;
            if (!this.displayDiscount) {
                this.showDialog('add', 'info', true, '展示折扣不能为空');
                return false;
            }
            if (!this.tradeDiscount) {
                this.showDialog('add', 'info', true, '交易折扣不能为空');
                return false;
            }
            if (!$("#startTime").val()) {
                this.showDialog('add', 'info', true, '开始时间不能为空');
                return false;
            }
            if (!$("#endTime").val()) {
                this.showDialog('add', 'info', true, '结束时间不能为空');
                return false;
            }
            return true;
        },
        // 添加数据按钮
        saveParam:function() {
           var _this = this;
           if (this.diaInfoCheck()) {
               var params = {};
               params.type=this.type;//状态参数
               params.id=this.id;

               // params.remark=this.remark;
               params.product=this.saveproduct;
               params.apkind=this.apkind;
               params.custNo=this.custNo;
               params.custType=this.custType;
               params.branchCode=this.branchCode;
               params.channel=this.channel;
               params.bankNo=this.bankNo;
               params.oproduct=this.oproduct;
               params.subapkind=this.subapkind;
               params.startamount =this.startamount;
               params.endamount =this.endamount;
               params.remark=this.remark;
               params.displayDiscount=this.displayDiscount;
               params.startTimeStr=$("#startTime").val();
               params.endTimeStr=$("#endTime").val();
               params.tradeDiscount=this.tradeDiscount;

               $.post({
                   url: '/businessMgmt/businessParamConfig/discountHandle/saveParam.ajax',
                   data: params,
                   success: function (result) {
                       if (result.error === 0) {
                           _this.getTableData(0,this.type);
                           this.saveproduct=""
                           // _this.getlocalList()
                       }
                       _this.showDialog('add', 'info', false, result.msg);
                   }
               });
           }
        },
        // 修改必填弹框
        reviseCheck: function () {
            var _this = this;
            if (!this.id) {
                this.showDialog('revise', 'info', true, '规则编号不能为空');
                return false;
            }
            if (!this.displayDiscount) {
                this.showDialog('revise', 'info', true, '展示折扣不能为空');
                return false;
            }
            if (!this.tradeDiscount) {
                this.showDialog('revise', 'info', true, '交易折扣不能为空');
                return false;
            }
            if (!$(".startTime").val()) {
                this.showDialog('revise', 'info', true, '开始时间不能为空');
                return false;
            }
            if (!$(".endTime").val()) {
                this.showDialog('revise', 'info', true, '结束时间不能为空');
                return false;
            }
            return true;
        },
        // 修改更新数据
        showUpdate:function(item){
            var _this = this;
            // var hasCheck = false;
            // 判断业务接口数据与数据库有没有相同数据
            if (this.type==0){
                if (this.arrId.indexOf(item.id.toString())!=-1){
                    _this.oneId=item.id

                }else{
                    _this.oneId=''
                }
            }
            this.mysqlId=item.mySQLId  //获取数据库表字段ID
            this.product="";
            this.mysqlProduct=item.product; //为mysql执行修改传值

            this.id = item.id;
            this.apkind=item.apkind;
            this.bankNo=item.bankNo;
            this.branchCode=item.branchCode;
            this.channel=item.channel;
            this.custNo=item.custNo;
            this.custType=item.custType;
            this.oproduct=item.oproduct;
            this.subapkind=item.subapkind;
            this.startamount =item.startamount;
            this.endamount =item.endamount;
            this.displayDiscount=item.displayDiscount;
            this.startTimeStr=item.startTimeStr;
            this.endTimeStr=item.endTimeStr;
            this.tradeDiscount=item.tradeDiscount;
            this.remark=item.remark;
            this.showDialog('', 'revise');
        },
        update:function () {
            var _this = this;
            if (this.reviseCheck()) {
                var params = {};
                // params.status=this.status; //状态参数
                params.type=this.type;
                params.myqsql= this.mysqlId; //数据表字段id
                params.oneId =this.oneId; //根据id插入或者修改数据

                // 产品参数
                params.id = this.id;
                params.product=this.mysqlProduct;
                params.apkind=this.apkind;
                params.bankNo=this.bankNo;
                params.branchCode=this.branchCode;
                params.channel=this.channel;
                params.custNo=this.custNo;
                params.custType=this.custType;
                params.remark=this.remark;
                params.oproduct=this.oproduct;
                params.subapkind=this.subapkind;
                params.startamount=this.startamount;
                params.endamount=this.endamount;
                params.displayDiscount =this.displayDiscount;
                params.startTimeStr = $(".startTime").val();
                params.endTimeStr = $(".endTime").val();
                params.tradeDiscount =this.tradeDiscount;

                $.post({
                    url: '/businessMgmt/businessParamConfig/discountHandle/update.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.getTableData(0,this.type);
                            this.product="";
                            _this.getlocalList()
                        }
                        _this.showDialog('revise', 'info', false, result.msg);
                    }
                });
             }
        },
        // 删除操作-保存到本地
        showDelete:function(item){
            var _this = this;
            // var hasCheck = false;
            // 判断业务接口数据与数据库有没有相同数据
            if (this.type==0){
                if (this.arrId.indexOf(item.id.toString())!=-1){
                    _this.oneId=item.id

                    this.showDialog('', 'info', true, '数据库已有此条数据,请在由我经办里做删除操作');
                    return

                }else{
                    _this.oneId=''
                }
            }
            // var num=0;
            // for (var i = 0; i < this.tableData.length; i++) {
            //     if (this.tableData[i].check) {
            //         hasCheck = true;
            //         num++
            //     }
            // }
            //
            // if (num>1){
            //     this.showDialog('', 'info', false, '只能选择一条数据');
            //     return;
            // }
            //
            // if (!hasCheck) {
            //     this.showDialog('', 'info', false, '未选择任何用户');
            //     return;
            // }
            // this.showDialog('', 'update');
            this.mysqlId=item.mySQLId  //获取数据库表字段ID

            this.id = item.id;
            this.product="";
            this.mysqlProduct=item.product; //为mysql执行修改传值
            this.apkind=item.apkind;
            this.bankNo=item.bankNo;
            this.branchCode=item.branchCode;
            this.channel=item.channel;
            this.custNo=item.custNo;
            this.custType=item.custType;
            this.oproduct=item.oproduct;
            this.subapkind=item.subapkind;
            this.startamount =item.startamount;
            this.endamount =item.endamount;
            this.displayDiscount=item.displayDiscount;
            this.startTimeStr=item.startTimeStr;
            this.endTimeStr=item.endTimeStr;
            this.tradeDiscount=item.tradeDiscount;
            this.remark=item.remark;
            this.showDialog('', 'del');
        },
        deleteUser:function () {
            var _this = this;
                var params = {};
                // params.status=this.status; //状态参数
                params.type=this.type;
                params.myqsql= this.mysqlId; //数据表字段id
                params.oneId =this.oneId; //根据id插入或者修改数据

                // 产品参数
                params.id = this.id;
                params.product=this.mysqlProduct;
                params.apkind=this.apkind;
                params.bankNo=this.bankNo;
                params.branchCode=this.branchCode;
                params.channel=this.channel;
                params.custNo=this.custNo;
                params.custType=this.custType;
                params.remark=this.remark;
                params.oproduct=this.oproduct;
                params.subapkind=this.subapkind;
                params.startamount =this.startamount;
                params.endamount =this.endamount;
                params.displayDiscount =this.displayDiscount;
                params.startTimeStr = $(".startTime").val();
                params.endTimeStr = $(".endTime").val();
                params.tradeDiscount =this.tradeDiscount;
                $.post({
                    url: '/businessMgmt/businessParamConfig/discountHandle/deleteParam.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.getTableData(0,this.type);
                            this.product="";
                            _this.getlocalList()
                        }
                        _this.showDialog('del', 'info', false, result.msg);
                    }
                });
        },

        // 删除按钮组合
        // showDelete: function () {
        //     var hasCheck = false;
        //     var num=0;
        //     for (var i = 0; i < this.tableData.length; i++) {
        //         if (this.tableData[i].check) {
        //             hasCheck = true;
        //             num++;
        //         }
        //     }
        //     if (num>1){
        //         this.showDialog('', 'info', false, '只能选择一条数据删除');
        //         return;
        //     }
        //     if (!hasCheck) {
        //         this.showDialog('', 'info', false, '未选择任何用户');
        //         return;
        //     }
        //     this.showDialog('', 'del');
        // },

        // 单一删除后端数据
        // showDelete: function (item) {
        //     var hasCheck = false;
        //     if (this.type==0) {
        //         if (this.arrId.indexOf(item.id.toString()) != -1) {
        //
        //             this.showDialog('', 'del');
        //             return
        //         }
        //     }
        //     this.id=item.id; //后端接口id
        //     this.mysqlId=item.mySQLId  //获取数据库表字段ID
        //
        //     for (var i = 0; i < this.tableData.length; i++) {
        //         if (this.tableData[i].check) {
        //             hasCheck = true;
        //         }
        //     }
        //     // if (!hasCheck) {
        //     //     this.showDialog('', 'info', false, '未选择任何用户');
        //     //     return;
        //     // }
        //     this.showDialog('', 'del');
        // },

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
        // 单选
        check: function (index) {
            index.check = !index.check;
        },
        // 用户全选
        selectAll:function (allCheck) {
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
        //后端主表格真分页方法
        prev: function () {
            if (this.currentIndex <= 0) {
                return;
            }
            this.getTableData(this.currentIndex - 1,this.type);
        },
        next: function () {
            if (this.currentIndex >= this.totalPage - 1) {
                return;
            }
            this.getTableData(this.currentIndex + 1,this.type);
        },
        changeIndex: function (index) {
            this.getTableData(index - 1,this.type);
        },
        toFirst: function () {
            this.getTableData(0,this.type);
        },
        toLast: function () {
            this.getTableData(this.totalPage - 1,this.type);
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


    }
});