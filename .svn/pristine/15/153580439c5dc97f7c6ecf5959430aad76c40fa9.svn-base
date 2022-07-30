new Vue({
    el: '#content',
    data: {
        //查询
        switchName: '',
        //新增
        addStatus: 1,
        addDescription: '',
        addSwitchName: '',
        //删除
        deleSwitchName:'',

        tableData:[],
        diaMsg: ''
    },
    mounted: function () {

        var dialogs = ['info', 'add', "update", "delete"];
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
        this.querySwitchList()
    },
    computed: {},

    watch: {},
    methods: {
        //查询开关信息
        querySwitchInfo: function () {
            var _this = this;
            if(!_this.switchName){
                _this.querySwitchList();
                return false;
            }
            $.post({
                url: '/businessMgmt/switchMgmt/switchCategoryMgmt/querySwitchInfo.ajax',
                data: {
                    switchName: _this.switchName,
                },
                success: function (result) {
                    if (result.error === 0) {
                        if(result.data){
                            _this.tableData=[result.data];
                        }else{
                            _this.tableData=[];
                        }
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        //查询所有开关信息
        querySwitchList: function () {
            var _this = this;
            $.post({
                url: '/businessMgmt/switchMgmt/switchCategoryMgmt/querySwitchList.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        _this.tableData=result.data;
                        _this.switchName='';
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        //新增开关
        addParam: function () {
            this.showDialog('', 'add', false);
        },
        adding: function () {
            var _this = this;
            if(!_this.addSwitchName&&!_this.addDescription){
                _this.showDialog('', 'info', false,'所有选项必填');
                return false;
            }
            if(!/^[a-zA-Z]+$/.test(_this.addSwitchName)){
                _this.showDialog('', 'info', false,'开关名称只能填写英文');
                return false;
            }
            $.post({
                url: '/businessMgmt/switchMgmt/switchCategoryMgmt/addSwitchInfo.ajax',
                data: {
                    switchName: _this.addSwitchName,
                    description:_this.addDescription,
                    status: _this.addStatus
                },
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('', 'info', false, result.msg);
                        _this.querySwitchList();
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        //删除开关
        deleteParams: function (item) {
            this.deleSwitchName=item.switchName;
            this.showDialog('', 'delete', false,'确定要删除 '+this.deleSwitchName+' 吗');
        },
        deleting: function () {
            var _this=this;
            $.post({
                url: '/businessMgmt/switchMgmt/switchCategoryMgmt/deleteSwitchInfo.ajax',
                data: {
                    switchName: _this.deleSwitchName
                },
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('', 'info', false, result.msg);
                        _this.querySwitchList();
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        //更新开关
        updateParams:function (item) {
            var _this=this;
            $.post({
                url: '/businessMgmt/switchMgmt/switchCategoryMgmt/updateSwitchInfo.ajax',
                data: {
                    serialno: item.serialno,
                    status: item.status==0?1:0,
                    switchName:item.switchName,
                    version:item.version
                },
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('', 'info', false, result.msg);
                        _this.querySwitchList();
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
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
        },
    },
    // 类型状态
    filters: {}
});