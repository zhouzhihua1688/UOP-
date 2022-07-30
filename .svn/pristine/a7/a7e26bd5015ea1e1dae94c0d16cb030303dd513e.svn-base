
new Vue({
    el: '#content',
    data: function () {
        this.baseUrl = '/operationMgmt/usedLink/linkQuery';
        return {
            // 主页面相关数据
            tableData: [],
            diaMsg: '',
            // 查询
            url: '',

        }
    },
    mounted: function () {
        var dialogs = ['info', 'add', 'del'];
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
        getTableData: function () {
            var params = {
                categoryName: this.categoryName
            };
            $.post({
                url: `${this.baseUrl}/tableData.ajax`,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.tableData = result.data;
                    } else {
                        this.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
        showDetail: function (item) {
            this.modifyStatus = true;
            $.post({
                url: `${this.baseUrl}/querySingle.ajax`,
                data: {
                    categoryId: item.id
                },
                success: function (result) {
                    if (result.error === 0) {
                        this.operateData = result.data;
                        this.showDialog("", "add", false, '修改状态成功')
                    } else {
                        this.showDialog("", "add", false, result.msg)
                    }
                }.bind(this)
            });
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