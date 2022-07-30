// Vue.component('selectChosen', {
//     template: `
//         <select class="chosen-select form-control" ref="sele">
//             <option value="">请选择</option>
//             <option :value="item.fundId" v-for="item of list">{{item.fundId}} &nbsp;&nbsp; {{item.fundName}}</option>
//         </select>
//         `,
//     model: {
//         prop: "value",
//         event: "change",
//     },
//     props: {
//         value: {
//             validator: () => true,
//         },
//         list: {
//             type: [Object, Array],
//             default: () => [],
//         },
//     },
//     mounted() {
//         $(this.$refs.sele).chosen({
//             search_contains: true,
//             no_results_text: '未找到',
//             disable_search_threshold: 6,
//             width: '184px'
//         });
//         $(this.$refs.sele).on('change', function (e, params) {
//             this.$emit('change', params ? params.selected : '')
//         }.bind(this));
//     },
//     updated() {
//         $(this.$refs.sele).trigger("chosen:updated");
//     },
// })


new Vue({
    el: '#content',
    data: {
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        pageMaxNum: 10,
        diaMsg: '',
        tableData: [{}],
        fundIdList: [],
        privilegeFundId: [],
        modifyData: {
            privilegeFundId: []
        }
    },
    mounted: function () {
        var dialogs = ['info', 'operate', 'modify'];
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
        this.getTableData()
        this.getFundIdList()
        $('#addItem').css('width', '237px').select2({
            closeOnSelect: false,
            allowClear: true
        });
        $('#temId').css('width', '237px').select2({
            closeOnSelect: false,
            allowClear: true
        });
        // $("#temId").on("select2:close", function (e) {
        //     // this.operateDetail.alarmPhone = $("#temId").val() ? $("#temId").val() : ''
        //     console.log($("#temId").val())

        // }.bind(this));
        $('#addItem').change(function (e) {
            this.privilegeFundId = $("#addItem").val() ? $("#addItem").val() : []
            // $("#bumen").val(all);//赋值给隐藏的文本框
        }.bind(this))
        $('#temId').change(function (e) {
            this.modifyData.privilegeFundId = $("#temId").val() ? $("#temId").val() : []
            // $("#bumen").val(all);//赋值给隐藏的文本框
        }.bind(this))
        // $("#temId").on("select2:select", function (e) {
        //     console.log(e.params.data.id)
        //     this.modifyData.privilegeFundId.push(e.params.data.id);
        // }.bind(this));
    },
    computed: {
        //主表格分页
        middleData: function () {
            var middleData = [];
            var pageMaxNum = parseInt(this.pageMaxNum);
            if (this.tableData.length <= pageMaxNum) {
                middleData.push(this.tableData);
                return middleData;
            } else {
                var i = 0;
                while ((i + 1) * pageMaxNum < this.tableData.length) {
                    middleData.push(this.tableData.slice(i * pageMaxNum, (i + 1) * pageMaxNum));
                    i++;
                }
                middleData.push(this.tableData.slice(i * pageMaxNum, this.tableData.length));
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
        }
    },
    methods: {
        showDialog: function (dia1, dia2, callback, msg) {
            this.diaMsg = msg ? msg : '输入条件错误';
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
        getFundIdList: function () {
            $.post({
                url: '/businessMgmt/businessParamConfig/nonsupport/fundIdList.ajax',
                success: function (result) {
                    if (result.error == 0) {
                        this.fundIdList = result.data;
                    } else {
                        this.fundIdList = [];
                        this.showDialog('', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },
        getTableData: function () {
            $.post({
                url: '/businessMgmt/businessParamConfig/nonsupport/tableData.ajax',
                success: function (result) {
                    if (result.error == 0) {
                        if (result.data.length === 0) {
                            this.showDialog('', 'info', false, '数据为空');
                            this.tableData = []
                        } else {
                            this.tableData = result.data
                        }
                    } else {
                        this.tableData = []
                        this.showDialog('', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },
        showModify: function () {
            var data = this.modifyData.privilegeFundId = this.tableData.map(function (item) {
                return item.fundId;
            })
            $("#temId").val(data).trigger('change');
            this.modifyData.id = this.tableData[0].id;
            this.showDialog('', 'modify')
        },
        modify: function () {
            var params = Object.assign({}, this.modifyData);
            params.privilegeFundId = params.privilegeFundId.join(',');
            $.post({
                url: '/businessMgmt/businessParamConfig/nonsupport/modifyData.ajax',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        this.getTableData()
                        this.showDialog('modify', 'info', false, result.msg)
                    } else {
                        this.showDialog('modify', 'info', true, result.msg);
                    }
                }.bind(this)
            });
        },
        showAddDialog: function () {
            this.privilegeFundId = []
            this.showDialog('', 'operate')
        },
        add: function () {
            $.post({
                url: '/businessMgmt/businessParamConfig/nonsupport/add.ajax',
                data: {
                    privilegeFundId: this.privilegeFundId.join(',')
                },
                success: function (result) {
                    if (result.error == 0) {
                        this.getTableData()
                        this.showDialog('operate', 'info', false, result.msg)
                    } else {
                        this.showDialog('operate', 'info', true, result.msg);
                    }
                }.bind(this)
            });
        }

    },
    filters: {
        fundName: function (id, fundIdList) {
            if (fundIdList.length > 0) {
                var fund = fundIdList.filter(function (item) {
                    return item.fundId === id;
                })[0]
                if (fund) {
                    return fund.fundName;
                }
                return id;
            }
            return id;
        }
    }

});