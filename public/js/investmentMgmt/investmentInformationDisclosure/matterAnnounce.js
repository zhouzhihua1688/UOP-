new Vue({
    el: '#content',
    data: {
        groupId: 'ALL',
        groupIdList: [],
        //主页面相关数据
        tableData: [],
        diaMsg: '',
        deleteId: '',
        dialog: {
            serialno: '',
            groupId: '',
            title: '',
            content: ''
        },
        // 留痕展示数据
        recordData:'',
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 1,
        pageMaxNum: 10,
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
        }
    },
    watch: {
        pageMaxNum: function () {
            this.currentIndex = 0;
            this.getTableData(0);
        }
    },
    mounted: function () {
        var dialogs = ['info', 'delete'];
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
        $('#groupIdList').chosen({
            search_contains: true,
            no_results_text: '未找到该组合',
            disable_search_threshold: 6,
            width: '170px'
        });
        $('#groupIdListDialog').chosen({
            search_contains: true,
            no_results_text: '未找到该组合',
            disable_search_threshold: 6,
            width: '400px'
        });
        $('#groupIdList').on('change', function (e, params) {
            this.groupId = params ? params.selected : '';
        }.bind(this));
        $('#groupIdListDialog').on('change', function (e, params) {
            this.dialog.groupId = params ? params.selected : '';
        }.bind(this));
        this.getGroupList();
        this.getTableData(0);
    },
    methods: {
        getGroupList: function () {
            $.post({
                url: '/investmentMgmt/investmentInformationDisclosure/matterAnnounce/getGroupList.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        this.groupIdList = result.data;
                        this.groupIdList.sort((a,b)=>a.groupid.replace('A','')-b.groupid.replace('A',''));
                        $('#groupIdListDialog').html(this.groupIdList.map(function (item) {
                            return '<option value="' + item.groupid + '">' + item.groupid + '-' + item.groupName + '</option>';
                        }).join(''));
                        $('#groupIdListDialog').trigger('chosen:updated');
                        // 新增修改弹窗没有ALL选项
                        var str = '<option value="ALL">全部组合</option>';
                        this.groupIdList.forEach(function (item) {
                            str += '<option value="' + item.groupid + '">' + item.groupid + '-' + item.groupName + '</option>';
                        });
                        $('#groupIdList').html(str);
                        $('#groupIdList').trigger('chosen:updated');
                    } else {
                        this.showDialog('', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },
        getTableData: function (currentIndex) {
            var params = {};
            params.groupId = this.groupId ? this.groupId : 'ALL';
            params.pageNo = currentIndex + 1;
            params.pageSize = this.pageMaxNum;
            $.post({
                url: '/investmentMgmt/investmentInformationDisclosure/matterAnnounce/getTableList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.tableData = result.data.announcementVOList;
                        this.tableData.sort((a,b)=>a.groupid.replace('A','')-b.groupid.replace('A',''));
                        this.currentIndex = result.data.pageNo - 1;
                        this.totalPage = Math.ceil(result.data.resultTotalNum / params.pageSize);
                    } else {
                        this.tableData = [];
                        this.currentIndex = 0;
                        this.totalPage = 0;
                        this.showDialog('', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },
        showDel: function (item) {
            this.deleteId = item.serialno;
            this.recordData = item.title;
            this.showDialog('', 'delete');
        },
        del: function () {
            var params = {};
            params.serialno = this.deleteId;
            params.title = this.recordData;
            $.post({
                url: '/investmentMgmt/investmentInformationDisclosure/matterAnnounce/del.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.getTableData(0);
                        this.showDialog('delete', 'info', false, result.msg);
                    } else {
                        this.showDialog('delete', 'info', true, result.msg);
                    }
                }.bind(this)
            });
        },
        showAdd: function () {
            this.dialog.serialno = '';
            this.dialog.groupId = '';
            $('#groupIdListDialog').val('');
            $('#groupIdListDialog').trigger('chosen:updated');
            this.dialog.title = '';
            this.dialog.content = '';
            this.showDialog('', 'operate');
        },
        add: function () {
            if (!this.dialog.groupId) {
                this.showDialog('operate', 'info', true, '未选择关联组合');
                return false;
            }
            if (!this.dialog.title) {
                this.showDialog('operate', 'info', true, '未输入公告标题');
                return false;
            }
            // if (!this.dialog.content) {
            //     this.showDialog('operate', 'info', true, '未输入公告内容');
            //     return false;
            // }
            var params = {};
            params.groupid = this.dialog.groupId;
            params.title = this.dialog.title;
            params.content = this.dialog.content;
            $.post({
                url: '/investmentMgmt/investmentInformationDisclosure/matterAnnounce/operate.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.getTableData(0);
                        this.showDialog('operate', 'info', false, result.msg);
                    } else {
                        this.showDialog('operate', 'info', true, result.msg);
                    }
                }.bind(this)
            });
        },
        showUpdate: function (item) {
            this.dialog.serialno = item.serialno;
            this.dialog.groupId = item.groupid;
            $('#groupIdListDialog').val(this.dialog.groupId);
            $('#groupIdListDialog').trigger('chosen:updated');
            this.dialog.title = item.title;
            this.dialog.content = item.content;
            this.showDialog('', 'operate');
        },
        operate: function () {
            if (!this.dialog.groupId) {
                this.showDialog('operate', 'info', true, '未选择关联组合');
                return false;
            }
            if (!this.dialog.title) {
                this.showDialog('operate', 'info', true, '未输入公告标题');
                return false;
            }
            // if (!this.dialog.content) {
            //     this.showDialog('operate', 'info', true, '未输入公告内容');
            //     return false;
            // }
            var params = {};
            this.dialog.serialno && (params.serialno = this.dialog.serialno);
            params.groupid = this.dialog.groupId;
            params.title = this.dialog.title;
            params.content = this.dialog.content;
            console.log(params);
            $.post({
                url: '/investmentMgmt/investmentInformationDisclosure/matterAnnounce/operate.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.getTableData(0);
                        this.showDialog('operate', 'info', false, result.msg);
                    } else {
                        this.showDialog('operate', 'info', true, result.msg);
                    }
                }.bind(this)
            });
        },
        //主表格分页方法
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
    }
});