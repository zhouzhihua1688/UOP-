new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        diaMsg: '',
        isUpdate: false,
        productId: '',
        extendCategory: 'FND',
        valueList: []
    },
    watch: {
        extendCategory: function (val) {
			if(this.isUpdate){
				return;
			}
            var _this = this;
            $.post({
                url: '/businessMgmt/productInfoConfig/productExpandContent/getTypeList.ajax',
                data: {extendCategory: val},
                success: function (result) {
                    if (result.error === 0) {
                        _this.valueList = result.data;
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        }
    },
    created: function () {
        var productId = this.getUrlParam('productId');
        var extendCategory = this.getUrlParam('extendCategory');
        productId && (this.productId = productId);
        extendCategory && (this.extendCategory = extendCategory);
        this.isUpdate = this.getUrlParam('type') == 'update';
        this.search();
    },
    mounted: function () {
        var dialogs = ['info'];
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
        search: function () {
            var _this = this;
			var url = '';
			var params = {};
			if(this.isUpdate){
				url = '/businessMgmt/productInfoConfig/productExpandContent/query.ajax';
				params.productId = this.productId;
				params.extendCategory = this.extendCategory;
			}
			else {
				url = '/businessMgmt/productInfoConfig/productExpandContent/getTypeList.ajax';
				params.extendCategory = this.extendCategory;
			}
            $.post({
                url: url,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.valueList = result.data;
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        goBack: function () {
            window.location.href = '/businessMgmt/productInfoConfig/productExpandContent.html';
        },
        save: function () {
            if (!this.isUpdate) { // 新增
                if (!this.productId) {
                    this.showDialog('', 'info', false, '未填写产品ID！');
                    return false;
                }
                if (!this.extendCategory) {
                    this.showDialog('', 'info', false, '选择产品类型！');
                    return false;
                }
            }
            var _this = this;
            var params = {};
            params.productId = this.productId;
            params.recordList = JSON.stringify(this.valueList.map(function (item) {
                return {
                    extCategory: item.extCategory,
                    extColumn: item.extColumn,
                    extValue: item.extValue,
                    productId: _this.productId
                };
            }));
            $.post({
                url: '/businessMgmt/productInfoConfig/productExpandContent/operate.ajax',
                data: params,
                success: function (result) {
                    _this.showDialog('', 'info', false, result.msg);
                }
            });
        },
        getUrlParam: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg); //匹配目标参数
            if (r != null) return unescape(r[2]);
            return ''; //返回参数值
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
        }
    }
});
