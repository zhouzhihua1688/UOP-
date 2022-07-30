new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        tableData: [],
        // tableData2: [],
        // diffResultList:[],
        // diffResult:'',
        diaMsg: '',
        fundIdList:"",
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10,
    },
    mounted: function () {
        var dialogs = ['info','add','del','revise'];
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
        // this.getTableData(0);
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

    },
    watch: {
        pageMaxNum: function () {
            this.getTableData(0);
        }
    },
    methods: {
        getTableData: function (currentIndex) {
            var params = {};
            var _this = this;
            params.fundIdList =this.fundIdList;
            $.post({
                url: '/businessMgmt/fundComparison/basicInformation/getTableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        // 后端分页 展示
                         _this.tableData=result.data;
                         console.log(_this.tableData)
                        // _this.tableData2= result.data.tableData[0].parallelList;
                        // _this.tableData=[] 
                        // _this.tableData2=[]
                        // _this.diffResultList=result.data.tableData
                        // result.data.tableData.forEach(function(item){
                        // 	item.originList[0].diffResult=item.diffResult
                        //      _this.tableData.push(item.originList[0])
                        //      _this.tableData2.push(item.parallelList[0])    
                        // })
                        
                    } else {
                        _this.tableData = [];
                        // _this.currentIndex = 0;
                        // _this.totalPage = 0;
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        // 比对不同加颜色
        compareResult: function (originItem, parallelItem, key) {
            if (!originItem && !parallelItem) {
                return '';
            }
            if ((parallelItem && originItem) && (originItem[key] == parallelItem[key])) {
                return '';
            }
            return 'color:#69AA46;font-weight:bold';

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
    },

    // 类型状态
    // filters: {
        // diffResult: function (diffResults) {
        // payType: function (item) {
        //     if(item){
        //         return item.replace(/01/g,'现金宝').replace(/02/g,'银行卡').replace(/03/g,'产品').replace(/,00/g,'').replace(/00,/g,'')
        //      }
        // },
        
        // }
    // }

});


