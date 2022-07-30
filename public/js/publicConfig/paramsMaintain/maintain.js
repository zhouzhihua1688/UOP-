var vm = new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        tableData: [],
        diaMsg: '',
        currentIndex: 0,
        pageMaxNum: '10',
        condition: '',

        initSelectData: [],
        pmst: '',
        pmkey: '',
        // pmco: '',
        operationData: {},
        deleteData: {},
        addData: {
            pmst: '',
            pmkey: '',
            pmco: '',
            pmnm: '',
            pmv1: '',
            pmv2: '',
            pmv3: '',
            pmv4: '',
            pmv5: ''
        },
        addDefine: {
            pmst: '',
            pmkey: '',
            pmco: '******',
            pmnm: '',
            pmv1: '',
            pmv2: '',
            pmv3: '',
            pmv4: '',
            pmv5: ''
        }
    },
    computed: {
        // 主表格分页
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
            }
            else {
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
        followPmst: function () {
            var arr = [];
            this.initSelectData.some(function (item, ind) {
                if (item.pmst === this.pmst) {
                    arr = item.pmkeys
                    return true;
                }
            }, this)
            this.pmkey = '';
            return arr;
        },
        addFollowPmst: function () {
            var arr = [];
            this.initSelectData.some(function (item, ind) {
                if (item.pmst === this.addData.pmst) {
                    arr = item.pmkeys
                    return true;
                }
            }, this)
            this.addData.pmkey = '';
            return arr;
        },


    },
    watch: {
        pageMaxNum: {
            handler: function (val, oldval) {
                this.currentIndex = 0;
            }
        }
    },
    created() {
        var _this = this;
        $.post({
            url: '/publicConfig/paramsMaintain/maintain/initSelect.ajax',
            success: function (result) {
                if (result.error === 0) {
                    _this.initSelectData = result.data;
                }
                else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });
    },
    mounted() {
        var dialogs = ['info', 'delete', 'addData', 'addDefine'];
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
        var _this = this;
        $('#firstSelect').css('width', '169px').select2({});
        $("#firstSelect").on("select2:select", function (e) {
            _this.pmst = e.params.data.id;
            $("#secondSelect").val(null).trigger('change');
        });
        $('#secondSelect').css('width', '300px').select2({});
        $("#secondSelect").on("select2:select", function (e) {
            _this.pmkey = e.params.data.id;
        });
    },
    methods: {
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
        getTableData: function () {
            var _this = this;
            var params = {};
            params.pmst = this.pmst
            params.pmkey = this.pmkey
            // params.pmco=this.pmco
            // if (this.pmco) {
            //     params.pmco = this.pmco
            // }
            $.post({
                url: '/publicConfig/paramsMaintain/maintain/tableList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        console.log(result.data)
                        _this.currentIndex = 0
                        _this.tableData = result.data;
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        showModifyDetail: function (item) {
            var _this = this;
            var params = {};
            params.pmst = item.pmst
            params.pmkey = item.pmkey
            params.pmco = item.pmco
            $.post({
                url: '/publicConfig/paramsMaintain/maintain/tableList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        console.log(result.data)
                        _this.operationData = result.data[0]
                        _this.showDialog('', 'modify', false);
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
            // this.operationData = JSON.parse(JSON.stringify(item))
            // this.showDialog('', 'modify', false);
        },
        modifyParams: function () {
            var _this = this;
            var params = this.operationData;
            $.post({
                url: '/publicConfig/paramsMaintain/maintain/modify.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData()
                        _this.showDialog('modify', 'info', false, result.msg);
                    }
                    else {
                        _this.showDialog('modify', 'info', true, result.msg);
                    }
                }
            });
        },
        deleteAlert: function (item) {
            this.deleteData = item
            this.showDialog('', 'delete', false);
        },
        deleteParams: function (item) {
            var _this = this;
            var params = {};
            params.pmst = item.pmst
            params.pmkey = item.pmkey
            params.pmco = item.pmco
            $.post({
                url: '/publicConfig/paramsMaintain/maintain/delete.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData()
                        _this.showDialog('delete', 'info', false, result.msg);
                        console.log(result.data)
                    }
                    else {
                        _this.showDialog('delete', 'info', false, result.msg);
                    }
                }
            });
        },
        addDetail: function (element) {
            var obj = {
                pmst: '',
                pmkey: '',
                pmco: element == "addDefine" ? "******" : "",
                pmnm: '',
                pmv1: '',
                pmv2: '',
                pmv3: '',
                pmv4: '',
                pmv5: ''
            };
            this[element] = obj;
            this.showDialog('', element);
        },
        add: function (item) {
            if (item == 'addDefine') {
                if (this.addDefine.pmst === '') {
                    return this.showDialog(item, 'info', true, 'pmst必填');
                }
                if (this.addDefine.pmkey === '') {
                    return this.showDialog(item, 'info', true, 'pmkey必填');
                }
                if (this.addDefine.pmnm === '') {
                    return this.showDialog(item, 'info', true, 'pmnm必填');
                }
            } else {
                if (this.addData.pmst === '') {
                    return this.showDialog(item, 'info', true, 'pmst必填');
                }
                if (this.addData.pmkey === '') {
                    return this.showDialog(item, 'info', true, 'pmkey必填');
                }
                if (this.addData.pmco === '') {
                    return this.showDialog(item, 'info', true, 'pmco必填');
                }
            }
            var params = this[item];
            $.post({
                url: '/publicConfig/paramsMaintain/maintain/add.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.getTableData()
                        this.showDialog(item, 'info', false, result.msg);
                        console.log(result.data)
                    }
                    else {
                        this.showDialog(item, 'info', true, result.msg);
                    }
                }.bind(this)
            });
        }

    }
});

