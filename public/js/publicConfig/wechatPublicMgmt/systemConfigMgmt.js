new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        tableData: [],
        diaMsg: '',
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        pageMaxNum: 10,
        condition: '',
        pkeys: "",
        versions:"",
        // 新增参数
        enable: "",
        pkey: "",
        plevel: "",
        pname: "",
        pvalue: "",
        remark: "",
        system:"1",
        version:"",
    },
    created: function () {
      this.getTableData()
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
        pageMaxNum: function () {
            this.currentIndex = 0;
        },
        condition: function () {
            this.currentIndex = 0;
        }
    },
    mounted: function () {
        var _this = this;
        var dialogs = ['delete', 'info', 'operate', 'revise'];
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
    methods: {
        getTableData: function (currentIndex) {
            var _this = this;
            var params = {};
            this.currentIndex= 0;
            params.system = this.system;
            params.pkey = this.pkeys;
            params.version=this.versions;
            console.log(params)
            $.post({
                url: '/publicConfig/wechatPublicMgmt/systemConfigMgmt/getTableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.currentIndex = 0;
                        _this.tableData = result.data.tableData;
                        console.log(_this.tableData)
                    }
                    else {
                        _this.tableData = [];
                        _this.currentIndex = 0;
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        getDate:function(){
           var _this=this;
            _this.getTableData(0)
        },
        // 刷新
        refresh:function(){
            var _this = this;
            $.post({
                url: '/publicConfig/wechatPublicMgmt/systemConfigMgmt/refresh.ajax',
                // data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.currentIndex = 0;
                        _this.getTableData(0)
                        // _this.tableData = result.data.tableData;
                        _this.showDialog('', 'info', false, result.msg);
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
            this.pkey="";
            this.pname="";
            this.plevel="1";
            this.pvalue="";
            // this.system="1";
            this.version="1";
            this.remark="";
            this.enable="1";
            this.showDialog('', 'operate');
        },
        saveParam:function(){
            var _this = this;
            var params = {};
            params.pkey =this.pkey;
            params.pname=this.pname;
            params.plevel = this.plevel;
            params.pvalue = this.pvalue;
            params.system=this.system;
            params.version=this.version;
            params.remark=this.remark;
            params.enable=this.enable;
            console.log(params)
            // if (this.diaInfoCheck()) {
                $.post({
                    url: '/publicConfig/wechatPublicMgmt/systemConfigMgmt/saveParam.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.getTableData(0);
                            _this.showDialog('operate', 'info', false, result.msg);
                        }else {
                            _this.showDialog('operate', 'info', true, result.msg);
                        }
                    }
                });
            // }
        },  
        // 修改数据
        showUpdate:function (item) {
            var _this=this;
            this.pkey=item.pkey;
            this.pname=item.pname;
            this.plevel=item.plevel;
            this.pvalue=item.pvalue;
            this.system=item.system;
            this.version=item.version;
            this.remark=item.remark;
            this.enable=item.enable;
            this.showDialog('', 'revise');
        },
        update: function () {
            var _this = this;
            var params = {};
            params.pkey =this.pkey;
            params.pname=this.pname;
            params.plevel = this.plevel;
            params.pvalue = this.pvalue;
            params.system=this.system;
            params.version=this.version;
            params.remark=this.remark;
            params.enable=this.enable;
            console.log(params)
            $.post({
                url: '/publicConfig/wechatPublicMgmt/systemConfigMgmt/update.ajax',
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
            this.system = item.system;
            this.pkey = item.pkey;
            this.version = item.version;
            this.showDialog('', 'delete');
        },
        del: function() {
            var _this = this;
            var params = {};
            params.system = this.system
            params.pkey = this.pkey
            params.version = this.version
            console.log(params)
            $.post({
                url: '/publicConfig/wechatPublicMgmt/systemConfigMgmt/deleteParam.ajax',
                data: params,
                success: function(result) {
                    if (result.error === 0) {
                        _this.getTableData();
                        _this.showDialog('delete', 'info', false, result.msg);
                    } else {
                        _this.showDialog('delete', 'info', true, result.msg);
                    }
                }
            });
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
        //公共方法
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
        }
    },
    filters:{
        system: function (item) {
            if (item) {
                return item.replace(/0/g, '公用类型').replace(/1/g, '官方微信').replace(/2/g, '添富汇微信').replace(/3/g, '交易式定投小程序').replace(/4/g, '投顾大师').replace(/5/g, '汇添富基金CUAM').replace(/6/g, '汇添富指数投资');
            }
        },
        enable: function (item) {
            if (item) {
                return item.replace(/0/g, '不可用').replace(/1/g, '可用')
            }
        },
    }
});