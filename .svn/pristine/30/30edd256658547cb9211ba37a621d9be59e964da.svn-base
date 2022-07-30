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
        //有效
        beAvailableCode:'',
        inAvailableCode:'',
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
                // console.log(item.check)
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
                this.tableSelect=[];
            }
        },
        total: function () {
            this.currentIndex = 0;
        }
    },
    mounted:function(){
        var _this = this;
        var dialogs = ['inAvailable', 'beAvailable', 'info'];
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
        _this.getTableList({ rows: _this.records });
    },
    methods: {
        //主表格分页方法
        selectAll: function () {
            var _this = this;
            if (this.allCheck) {
                this.tableData.forEach(function (item) {
                    item.check = false;
                    var _index = _this.inSelected(item, _this.tableSelect, 'companyId');
                    if(_index > -1){
                        _this.tableSelect.splice(_index, 1);
                    }
                });
            }
            else {
                this.tableData.forEach(function (item) {
                    item.check = true;
                    var _index = _this.inSelected(item, _this.tableSelect, 'companyId');
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
                url: '/cashMgmt/livingPay/companyActive/getList.ajax',
                data: params ? params : {},
                success: function (result) {
                    if (result.error == 0) {
                        var data = result.data;
                        _this.page = data.page;
                        _this.total = data.total;
                        _this.tableData = data.formList;
                        _this.tableSelect.forEach(function (item) {
                            var index = _this.inSelected(item, _this.tableData, 'companyId');
                            if(index > -1){
                                _this.tableData[index].check = true;
                            }
                        });
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        select: function (index) {
            var item = this.tableData[index];
            item.check = !item.check;
            var _index = this.inSelected(item, this.tableSelect, 'companyId');
            if(item.check && _index == -1){
                this.tableSelect.push(item);
            }
            if(!item.check && _index > -1){
                this.tableSelect.splice(_index, 1);
            }
        },
        //有效机构
        beAvailable:function () {
            var _this=this;
            if(_this.tableSelect.length<=0){
                _this.showDialog('', 'info', false, '请至少选择一条数据进行有效');
                return false;
            }
            var ids=[];
            var codeName=[];
            for (var i = 0; i < _this.tableSelect.length; i++) {
                ids[i]=_this.tableSelect[i].companyId;
                codeName[i]=_this.tableSelect[i].companyName;
            }
            _this.beAvailableCode=ids;
            var codesDelete=codeName.join();
            _this.showDialog("","beAvailable",false,'确认有效化“'+codesDelete+'”，这些机构？');

        },
        confirmBeAvailable:function () {
            var _this=this;
            var ids=_this.beAvailableCode;
            $.ajax({
                type: "post",
                url: "/cashMgmt/livingPay/companyActive/beAvailable.ajax?ids="+ids,
                async: false,
                dataType: "json",
                success: function (result) {
                    if (result.error == 0) {
                        _this.showDialog('beAvailable', 'info', false, result.msg);
                        // $(grid_selector).trigger("reloadGrid");
                        _this.getTableList({ rows: _this.records });
                        _this.tableSelect=[];
                        _this.currentIndex = 0;
                    } else {
                        _this.showDialog('beAvailable', 'info', false, result.msg);
                    }
                },
                error: function (data) {
                    _this.showDialog('beAvailable', 'info', false, '有效机构失败');
                }
            });
        },
        //无效机构
        inAvailable:function () {
            var _this=this;
            if(_this.tableSelect.length<=0){
                _this.showDialog('', 'info', false, '请至少选择一条数据进行无效');
                return false;
            }
            var ids=[];
            var codeName=[];
            for (var i = 0; i < _this.tableSelect.length; i++) {
                ids[i]=_this.tableSelect[i].companyId;
                codeName[i]=_this.tableSelect[i].companyName;
            }
            _this.inAvailableCode=ids;
            var codesDelete=codeName.join();
            _this.showDialog("","inAvailable",false,'确认无效化“'+codesDelete+'”，这些机构？');
            // var status = confirm("是否确认无效化这些机构？");
            // if (!status) {
            //     return false;
            // }

        },
        confirmInAvailable:function () {
            var _this=this;
            var ids=_this.inAvailableCode;
            $.ajax({
                type: "post",
                url: "/cashMgmt/livingPay/companyActive/inAvailable.ajax?ids="+ids,
                async: false,
                dataType: "json",
                success: function (result) {
                    console.log(result);
                    if (result.error == 0) {
                        _this.showDialog('inAvailable', 'info', false, result.msg);
                        // $(grid_selector).trigger("reloadGrid");
                        _this.getTableList({ rows: _this.records});
                        _this.tableSelect=[];
                        _this.currentIndex = 0;
                    } else {
                        _this.showDialog('inAvailable', 'info', false, result.msg);
                    }
                },
                error: function (data) {
                    _this.showDialog('inAvailable', 'info', false, '无效机构失败');
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
    }
})
;
function toUpperCase(obj) {
    obj.value = obj.value.toUpperCase();
}
