new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        companyId: '',
        companyName: '',
        companyCode: '',
        codeList: [],
        tableData: [],
        tableSelect: [],
        serviceType: '',
        districtCode: '',
        spell: '',
        status: '',
        diaMsg: '',
        searchField:'',
        districtCodeSearch:'',
        // 新增弹窗数据
        addAppCode: '',
        addAppName: '',
        addLongLinkUrl: '',
        //确认删除数据
        deleteCode:'',
        //支持与不支持
        beSupportCode:'',
        inSupportCode:'',
        // 更新弹窗数据
        updateSerialNo: '',
        updateAppCode: '',
        updateAppName: '',
        updateLongLinkUrl: '',
        // 主表格分页数据
        page: 0,
        total: 0,
        records:10,
        conditionType:0,
        currentIndex: 0,
        maxSpace: 5
    },
    computed: {
        allCheck: function () {
            if (this.tableData.length == 0) {
                return false;
            }
            var flag = true;
            this.tableData.forEach(function (item) {
                if (!item.check) {
                    flag = false;
                }
            });
            return flag;
        },
        pageList: function () {
            var arr = [];
            if (this.total <= 2 * this.maxSpace) {
                for (var i = 0; i < this.total; i++) {
                    arr.push(i + 1);
                }
                return arr;
            }
            if (this.currentIndex > this.maxSpace && this.total - this.currentIndex > this.maxSpace) {
                for (var i = this.currentIndex - this.maxSpace; i < this.currentIndex + this.maxSpace; i++) {
                    arr.push(i + 1);
                }
            }
            else if (this.currentIndex <= this.maxSpace && this.total - this.currentIndex > this.maxSpace) {
                for (var i = 0; i < this.currentIndex + (2 * this.maxSpace - this.currentIndex); i++) {
                    arr.push(i + 1);
                }
            }
            else if (this.currentIndex > this.maxSpace && this.total - this.currentIndex <= this.maxSpace) {
                var space = this.total - this.currentIndex;
                for (var i = this.currentIndex - (2 * this.maxSpace - space); i < this.total; i++) {
                    arr.push(i + 1);
                }
            }
            else {
                for (var i = 0; i < this.total; i++) {
                    arr.push(i + 1);
                }
            }
            return arr;
        }
    },
    watch: {
        records:{
            handler: function (val, oldval) {
                var params={
                    rows: this.records,
                    districtCodeSearch: this.conditionType==1? this.districtCodeSearch: '',
                    searchField: this.conditionType==2? this.searchField: ''
                };
                this.getTableList(params);
            }
        },
        total: function () {
            this.currentIndex = 0;
        }
    },
    mounted:function(){
        var _this = this;
        var dialogs = ['inSupport','beSupport', 'addDistrictCode', 'delete', 'info'];
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
        _this.validForm();
        _this.getTableList({ rows: _this.records });
        $.post({
            url: '/cashMgmt/livingPay/companyMgmt/codeList.ajax',
            success: function (result) {
                if (result.error == 0) {
                    _this.codeList=result.result;
                }
                else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });
    },
    methods: {
        //主表格分页方法
        selectAll: function () {
            var _this = this;
            if (this.allCheck) {
                this.tableData.forEach(function (item) {
                    item.check = false;
                    var _index = _this.inSelected(item, _this.tableSelect, 'districtCode');
                    if(_index > -1){
                        _this.tableSelect.splice(_index, 1);
                    }
                });
            }
            else {
                this.tableData.forEach(function (item) {
                    item.check = true;
                    var _index = _this.inSelected(item, _this.tableSelect, 'districtCode');
                    if(_index == -1){
                        _this.tableSelect.push(item);
                    }
                });
            }
        },
        prev: function () {
            this.currentIndex = this.currentIndex <= 0 ? 0 : this.currentIndex - 1;
            var params = {
                _search: 'false',
                nd: '1535696156694',
                rows: this.records,
                page: this.currentIndex+1,
                sidx: 'companyId',
                sord: 'asc',
                districtCodeSearch: this.conditionType==1? this.districtCodeSearch: '',
                searchField: this.conditionType==2? this.searchField: ''
            };
            this.getTableList(params);
            this.tableSelect=[];
        },
        next: function () {
            this.currentIndex = this.currentIndex >= this.total - 1 ? this.total - 1 : this.currentIndex + 1;
            var params = {
                _search: 'false',
                nd: '1535696156694',
                rows: this.records,
                page: this.currentIndex+1,
                sidx: 'companyId',
                sord: 'asc',
                districtCodeSearch: this.conditionType==1? this.districtCodeSearch: '',
                searchField: this.conditionType==2? this.searchField: ''
            };
            this.getTableList(params);
            this.tableSelect=[];
        },
        changeIndex:function (value,index) {
            this.currentIndex = value - 1;
            this.page=value;
            var params = {
                _search: 'false',
                nd: '1535696156694',
                rows: this.records,
                page: this.page,
                sidx: 'companyId',
                sord: 'asc',
                districtCodeSearch: this.conditionType==1? this.districtCodeSearch: '',
                searchField: this.conditionType==2? this.searchField: ''
            };
            this.getTableList(params);
            this.tableSelect=[];
        },
        toFirst:function () {
            this.currentIndex = 0;
            var params = {
                _search: 'false',
                nd: '1535696156694',
                rows: this.records,
                page: 1,
                sidx: 'companyId',
                sord: 'asc',
                districtCodeSearch: this.conditionType==1? this.districtCodeSearch: '',
                searchField: this.conditionType==2? this.searchField: ''
            };
            this.getTableList(params);
            this.tableSelect=[];
        },
        toLast:function () {
            this.currentIndex = this.total - 1;
            var params = {
                _search: 'false',
                nd: '1535696156694',
                rows: this.records,
                page: this.total,
                sidx: 'companyId',
                sord: 'asc',
                districtCodeSearch: this.conditionType==1? this.districtCodeSearch: '',
                searchField: this.conditionType==2? this.searchField: ''
            };
            this.getTableList(params);
            this.tableSelect=[];
        },
        getTableList: function (params) {
            var _this = this;
            $.post({
                url: '/cashMgmt/livingPay/districtMgmt/districtCodeList.ajax',
                data: params ? params : {},
                success: function (result) {
                    if (result.error==0) {
                        var data = result.result;
                        _this.page = data.page;
                        _this.total = data.total;
                        _this.tableData = data.formList;
                        _this.tableSelect.forEach(function (item) {
                            var index = _this.inSelected(item, _this.tableData, 'districtCode');
                            if(index > -1){
                                _this.tableData[index].check = true;
                            }
                        });
                    }
                    else if(result.error ==1) {
                        _this.showDialog('', 'info', false,result.msg);
                    }
                }
            });
        },
        select: function (index) {
            var item = this.tableData[index];
            item.check = !item.check;
            var _index = this.inSelected(item, this.tableSelect, 'districtCode');
            if(item.check && _index == -1){
                this.tableSelect.push(item);
            }
            if(!item.check && _index > -1){
                this.tableSelect.splice(_index, 1);
            }
        },
        //input搜索地区或机构id
        searchInput:function () {
            var params={
                rows: this.records,
                searchField:this.searchField,
            };
            this.getTableList(params)
        },
        // dialog表格校验
        validForm: function () {
            //绑定验证器
            return $("#districtCodeForm").validate({
                ignore:[],
                rules: {
                    districtName: {
                        required:true
                    },
                    spell: {
                        required:true
                    },
                    isSupport: {
                        required:true
                    }
                },
                messages: {
                    districtName: {
                        required: "请输入区域名称"
                    },
                    spell: {
                        required:"请输入首字母拼写"
                    },
                    isSupport: {
                        required:"请输入是否支持"
                    }
                }
            });
        },
        //boxShow
        boxShowAdd:function () {
            $("#addDistrictCode").modal('show');
            var _this=this;
            _this.validForm();
        },
        boxShowUpdate:function () {

        },
        //新增机构
        add:function () {
            var _this=this;
            if (_this.validForm().form()) {
                var districtCode = $("#districtCode").val();
                var districtName = $("#districtName").val();
                var spell = $("#spell").val();
                var isSupport = $('input[type=radio][name=isSupport]:checked').val();

                var data = {
                    "districtCode": districtCode,
                    "districtName": districtName,
                    "spell": spell,
                    "isSupport": isSupport
                };

                $.ajax({
                    type: "POST",
                    async: false,
                    url: "/cashMgmt/livingPay/districtMgmt/districtCodeAdd.ajax",
                    contentType: 'application/json',
                    dataType: "json",
                    data: JSON.stringify(data),
                    success: function (data) {
                        if (data.error == 0) {
                            $("#addDistrictCode").modal("hide");
                            _this.getTableList({ rows: _this.records });
                            _this.currentIndex = 0;
                            _this.showDialog('', 'info', true, '新增区域成功');
                        }
                        else {
                            $("#addDistrictCode").modal("hide");
                            _this.showDialog('', 'info', true, '操作失败');
                        }
                    },
                    error: function (data) {
                        $("#addDistrictCode").modal("hide");
                        _this.showDialog('', 'info', true, '操作失败');
                    }
                });
            }else{
                _this.showDialog('addDistrictCode', 'info', true, '请填写完整');
            }
        },
        //删除机构
        deleteEven:function () {
            var _this=this;
            if(_this.tableSelect.length<=0){
                _this.showDialog('', 'info', false, '请至少选择一条数据进行删除');
                return
            }
            var codes=[];
            var codeName=[];
            for (var i = 0; i < _this.tableSelect.length; i++) {
                codes[i]=_this.tableSelect[i].districtCode;
                codeName[i]=_this.tableSelect[i].districtName;
            }
            _this.deleteCode=codes;
            var codesDelete=codeName.join();
            _this.showDialog("","delete",false,'确认删除"'+codesDelete+'"这些机构吗？');
        },
        confirmDelete:function () {
            var _this = this;
            var codes=_this.deleteCode;
            $.ajax({
                type: "post",
                url: "/cashMgmt/livingPay/districtMgmt/deleteEven.ajax?codes="+codes,
                async: false,
                dataType: "json",
                success: function (result) {
                    if (result.error == 0) {
                        _this.tableSelect = [];
                        _this.showDialog('delete', 'info', false, result.msg);
                        _this.getTableList({ rows: _this.records })
                        _this.currentIndex = 0;
                    } else {
                        _this.showDialog('delete', 'info', false, result.msg);
                    }
                },
                error: function (data) {
                    _this.showDialog('delete', 'info', false, '删除区域失败');
                }
            });
        },
        //支持与不支持
        beSupport:function () {
            var _this=this;
            if(_this.tableSelect.length<=0){
                _this.showDialog('', 'info', true, '请至少选择一条数据进行支持');
                return false;
            }
            var codes=[];
            var codeName=[];
            for (var i = 0; i < _this.tableSelect.length; i++) {
                codes[i]=_this.tableSelect[i].districtCode;
                codeName[i]=_this.tableSelect[i].districtName;
            }
            _this.beSupportCode=codes;
            var codesDelete=codeName.join();
            _this.showDialog("","beSupport",false,'确认支持“'+codesDelete+'”，这些机构？');
        },
        confirmBeSupport:function () {
            var _this=this;
            var codes=_this.beSupportCode;
            $.ajax({
                type: "post",
                url: "/cashMgmt/livingPay/districtMgmt/beSupport.ajax?codes=" + codes,
                async: false,
                dataType: "json",
                success: function (result) {
                    if (result.error == 0) {
                        _this.showDialog('beSupport', 'info', false,result.msg);
                        _this.getTableList({ rows: _this.records });
                        _this.currentIndex = 0;
                    }else{
                        _this.showDialog('beSupport', 'info', false,result.msg);
                    }
                },
                error: function (data) {
                    _this.showDialog('beSupport', 'info', false, '支持区域失败');
                }
            });
        },
        inSupport:function () {
            var _this=this;
            if(_this.tableSelect.length<=0){
                _this.showDialog('', 'info', true, '请至少选择一条数据进行取消支持');
                return false;
            }
            var codes=[];
            var codeName=[];
            for (var i = 0; i < _this.tableSelect.length; i++) {
                codes[i]=_this.tableSelect[i].districtCode;
                codeName[i]=_this.tableSelect[i].districtName;
            }
            _this.inSupportCode=codes;
            var codesDelete=codeName.join();
            _this.showDialog("","inSupport",false,'确认取消支持“'+codesDelete+'”，这些机构？');


        },
        confirmInSupport:function () {
            var _this=this;
            var codes=_this.inSupportCode;
            $.ajax({
                type: "post",
                url: "/cashMgmt/livingPay/districtMgmt/inSupport.ajax?codes=" + codes,
                async: false,
                dataType: "json",
                success: function (result) {
                    if (result.error==0) {
                        _this.showDialog('inSupport', 'info', false, result.msg);
                        _this.getTableList({ rows: _this.records });
                        _this.currentIndex = 0;
                    }
                    else if (result.error==1) {
                        _this.showDialog('inSupport', 'info', false,result.msg);
                    }
                },
                error: function (data) {
                    _this.showDialog('inSupport', 'info', false,result.msg);
                }
            });
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
        }
        ,
        inSelected: function (item, arr, prop) {
            var _index = -1;
            arr.forEach(function (value, index) {
                if (item[prop] == value[prop]) {
                    _index = index;
                }
            });
            return _index;
        }
        ,
        formatTime: function (timestamp) {
            var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
            var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
            var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
            return Y + M + D + h + m + s;
        }
    }
})
;
function toUpperCase(obj) {
    obj.value = obj.value.toUpperCase();
}
$("#reset_btn").click(function(){
    $("#districtCodeForm").validate().resetForm();
});