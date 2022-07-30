new Vue({
    el: '#content',
    data: {
        // 公共数据
        diaMsg: '',
        previewPath: '',
        radioForCheck: '1',
        custName: '',
        idCardNo: '',
        userId: '',
        setDataToLocal: '',
        setOperate: '',
        necessaryRemark: '',
        // 服务端相关数据
        service: {
            userId: '',
            custNo: '',
            idNo: '',
            idTp: '',
            chkFlg: 'I',
            loadingStatus: '数据获取中...',
            tableData: [],
            // 表格数据
            currentIndex: 0,
            maxSpace: 5,
            totalPage: 0,
            pageMaxNum: 10
        },
        // 本地相关数据
        local: {
            // 查询条件
            custNo: '',
            invNm: '',
            operate: '',
            status: '',
            idTp: '',
            loadingStatus: '数据获取中...',
            // 列表数据
            itemData: '',
            tableData: [],
            showTableData: [],
            // 表格数据
            currentIndex: 0,
            maxSpace: 5,
            totalPage: 0,
            pageMaxNum: 10
        },
    },
    computed: {
        //服务端表格分页(真分页)
        pageList: function () {
            var arr = [];
            if (this.service.totalPage <= 2 * this.service.maxSpace) {
                for (var i = 0; i < this.service.totalPage; i++) {
                    arr.push(i + 1);
                }
                return arr;
            }
            if (this.service.currentIndex > this.service.maxSpace && this.service.totalPage - this.service.currentIndex > this.service.maxSpace) {
                for (var i = this.service.currentIndex - this.service.maxSpace; i < this.service.currentIndex + this.service.maxSpace; i++) {
                    arr.push(i + 1);
                }
            } else if (this.service.currentIndex <= this.service.maxSpace && this.service.totalPage - this.service.currentIndex > this.service.maxSpace) {
                for (var i = 0; i < this.service.currentIndex + (2 * this.service.maxSpace - this.service.currentIndex); i++) {
                    arr.push(i + 1);
                }
            } else if (this.service.currentIndex > this.service.maxSpace && this.service.totalPage - this.service.currentIndex <= this.service.maxSpace) {
                var space = this.service.totalPage - this.service.currentIndex;
                for (var i = this.service.currentIndex - (2 * this.service.maxSpace - space); i < this.service.totalPage; i++) {
                    arr.push(i + 1);
                }
            } else {
                for (var i = 0; i < this.service.totalPage; i++) {
                    arr.push(i + 1);
                }
            }
            return arr;
        },
        //本地表格分页(真分页)
        pageList_local: function () {
            var arr = [];
            if (this.local.totalPage <= 2 * this.local.maxSpace) {
                for (var i = 0; i < this.local.totalPage; i++) {
                    arr.push(i + 1);
                }
                return arr;
            }
            if (this.local.currentIndex > this.local.maxSpace && this.local.totalPage - this.local.currentIndex > this.local.maxSpace) {
                for (var i = this.local.currentIndex - this.local.maxSpace; i < this.local.currentIndex + this.local.maxSpace; i++) {
                    arr.push(i + 1);
                }
            } else if (this.local.currentIndex <= this.local.maxSpace && this.local.totalPage - this.local.currentIndex > this.local.maxSpace) {
                for (var i = 0; i < this.local.currentIndex + (2 * this.local.maxSpace - this.local.currentIndex); i++) {
                    arr.push(i + 1);
                }
            } else if (this.local.currentIndex > this.local.maxSpace && this.local.totalPage - this.local.currentIndex <= this.local.maxSpace) {
                var space = this.local.totalPage - this.local.currentIndex;
                for (var i = this.local.currentIndex - (2 * this.local.maxSpace - space); i < this.local.totalPage; i++) {
                    arr.push(i + 1);
                }
            } else {
                for (var i = 0; i < this.local.totalPage; i++) {
                    arr.push(i + 1);
                }
            }
            return arr;
        }
    },
    watch: {
        'service.pageMaxNum': function () {
            this.searchService(0);
        },
        'local.pageMaxNum': function () {
            this.searchLocal(0);
        },
        radioForCheck: {
            handler: function (newval, oldval) {
                var _this = this;
                if (newval == 1) {
                    this.local.showTableData = this.local.tableData.filter(function (item) {
                        return item;
                    });
                    if (this.local.showTableData && this.local.showTableData.length <= 0) {
                        _this.local.loadingStatus = '暂无数据';
                    }
                } else {
                    this.local.showTableData = this.local.tableData.filter(function (item) {
                        return item.creator == _this.userId;
                    });
                    if (this.local.showTableData && this.local.showTableData.length <= 0) {
                        _this.local.loadingStatus = '暂无数据';
                    }
                }
            }
        },
    },
    mounted: function () {
        var dialogs = ['info', 'serviceToLocalUpdate', 'localRevert', 'submitAgain'];
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
        // 开关
        this.searchService(0); // 获取服务端数据
        this.searchLocal(0); // 获取本地数据
    },
    methods: {
        //服务端list
        searchService: function (currentIndex) {
            var params = {};
            var _this = this;
            params.apKind = '645';
            params.pageNo = currentIndex + 1;
            params.pageSize = this.service.pageMaxNum;
            params.custNo = this.service.custNo;
            params.idNo = this.service.idNo;
            params.idTp = this.service.idTp;
            params.chkFlg = this.service.chkFlg;
            (this.service.chkFlg=='I')&&(params.orderFlg='0');
            (this.service.chkFlg!='I')&&(params.orderFlg='1');
            this.service.tableData = [];
            _this.service.loadingStatus = '数据获取中...';
            $.post({
                url: '/messageCenter/auditMgmt/idCardHandle/getList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        if (result.data.apps && result.data.apps.length > 0) {
                            _this.service.userId = result.data.userId;
                            _this.service.tableData = result.data.apps;
                            _this.service.currentIndex = result.data.pageNum - 1;
                            _this.service.totalPage = result.data.pages;
                            result.data.apps.forEach(function (item) {
                                _this.getImageInfo(item);
                            });
                        } else {
                            _this.service.tableData = [];
                            _this.service.currentIndex = 0;
                            _this.service.totalPage = 0;
                            _this.service.loadingStatus = '没有数据';
                        }

                    } else {
                        _this.service.tableData = [];
                        _this.service.currentIndex = 0;
                        _this.service.totalPage = 0;
                        _this.showDialog('', 'info', false, result.msg);
                        _this.service.loadingStatus = '没有数据';
                    }
                }
            });
        },
        //移至local审核
        showServiceToLocalUpdate: function (item, operate) {
            var setData = JSON.parse(JSON.stringify(item));
            delete setData.showOperator;
            delete setData.imgData;
            this.setDataToLocal = setData;
            this.setOperate = operate;
            this.necessaryRemark='';
            this.showDialog('', 'serviceToLocalUpdate', false);
        },
        serviceToLocalUpdate: function () {
            var _this = this;
            // this.necessaryRemark必要的审核内容
            $.post({
                url: '/messageCenter/auditMgmt/idCardHandle/serviceToLocalUpdate.ajax',
                data: {
                    content: JSON.stringify(this.setDataToLocal),
                    setOperate: this.setOperate,
                    serialNo: this.setDataToLocal.serialNo,
                    necessaryRemark:this.necessaryRemark
                },
                success: function (result) {
                    if (result.error == 0) {
                        _this.showDialog('', 'info', false, '已提交至经办数据');
                        _this.searchLocal(0);
                        _this.searchService(0);
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        searchLocal: function (currentIndex) {
            var _this = this;
            var custNo = this.local.custNo;
            var invNm = this.local.invNm;
            var operate = this.local.operate;
            var status = this.local.status;
            var idTp = this.local.idTp;
            var params = {
                custNo: custNo,
                invNm: invNm,
                operate: operate,
                status: status,
                idTp: idTp
            };
            params.pageNo = currentIndex + 1;
            params.pageSize = this.local.pageMaxNum;
            _this.local.tableData = [];
            _this.local.loadingStatus = '数据获取中...';
            $.post({
                url: '/messageCenter/auditMgmt/idCardHandle/getLocalList.ajax',
                data: params,
                success: function (result) {
                    if (result.error == 0 && result.data.useData.length > 0) {
                        _this.local.currentIndex = result.data.pageNum - 1;
                        _this.local.totalPage = result.data.pages;
                        _this.local.tableData = result.data.useData;
                        _this.local.showTableData = result.data.useData;
                        _this.userId = result.data.user;
                        result.data.useData.forEach(function (item) {
                            _this.getImageInfo(item);
                        });
                    }
                    else {
                        _this.local.currentIndex = 0;
                        _this.local.totalPage = 0;
                        _this.local.tableData = [];
                        _this.local.showTableData = [];
                        _this.local.loadingStatus = '没有数据';
                        // _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        showRevert: function (item) {
            this.local.itemData = JSON.stringify(item);
            this.showDialog('', 'localRevert', false);
        },
        revert: function () {
            var _this = this;
            var itemData = JSON.parse(_this.local.itemData);
            var params = {
                local_id: itemData.local_id,
                updateTime: itemData.updateTime
            };
            $.post({
                url: '/messageCenter/auditMgmt/idCardHandle/revertLocalData.ajax',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        _this.showDialog('localRevert', 'info', false, '撤销成功');
                        _this.searchLocal(0);
                        _this.searchService(0);
                    }
                    else {
                        _this.showDialog('localRevert', 'info', false, result.msg);
                    }
                }
            });
        },
        // showSubmitAgain: function (item) {
        //     this.local.itemData = JSON.stringify(item);
        //     this.showDialog('', 'submitAgain');
        // },
        // submitAgain: function () {
        //     var itemData = JSON.parse(this.local.itemData);
        //     var content = {
        //         custNo: itemData.custNo,
        //         invNm: itemData.invNm,
        //         idTp: itemData.idTp,
        //         idNo: itemData.idNo,
        //         idValiDate: itemData.idValiDate,
        //         imgdata: itemData.imgdata,
        //         accptMd: itemData.accptMd,
        //         accptMdTs: itemData.accptMdTs,
        //         serialNo: itemData.serialNo
        //     };

        //     var params = {};
        //     params.content = JSON.stringify(content);
        //     params.local_id = itemData.local_id;
        //     params.operate = itemData.operate;
        //     params.serialNo = itemData.serialNo;
        //     params.updateTime = itemData.updateTime;
        //     var _this = this;
        //     $.post({
        //         url: '/messageCenter/auditMgmt/idCardHandle/submitLocalDataAgain.ajax',
        //         data: params,
        //         success: function (result) {
        //             if (result.error == 0) {
        //                 _this.showDialog('submitAgain', 'info', false, result.msg);
        //                 _this.searchLocal(0);
        //                 _this.searchService(0);
        //             }
        //             else {
        //                 _this.showDialog('submitAgain', 'info', false, result.msg);
        //             }
        //         }
        //     });
        // },
        //图像预览
        previewImg: function (imageBase64, item) {
            this.previewPath = imageBase64;
            this.custName = item.invNm;
            this.idCardNo = item.idNo;
            this.showDialog('', 'preview', false, '');
        },
        // 获取图片base64
        getImageInfo: function (listItem) {
            // 原数据兼容处理
            if(listItem.imgData && listItem.imgData instanceof Array){
                return;
            }
            if (!listItem.custAttchmnt || listItem.custAttchmnt.length === 0) {
                listItem.imgData = '暂无图片信息';
                return;
            }
            var params = listItem.custAttchmnt.map(function (item) {
                return {
                    filePath: item.filePath,
                    fileName: item.fileName
                };
            });
            $.post({
                url: '/messageCenter/auditMgmt/idCardHandle/getBase64.ajax',
                data: {
                    imageInfo: JSON.stringify(params)
                },
                success: function (result) {
                    if (result.error == 0) {
                        listItem.imgData = result.data;
                    }
                }
            });
        },
        // 服务端真分页方法
        prev_service: function () {
            if (this.service.currentIndex <= 0) {
                return;
            }
            this.searchService(this.service.currentIndex - 1);
        },
        next_service: function () {
            if (this.service.currentIndex >= this.service.totalPage - 1) {
                return;
            }
            this.searchService(this.service.currentIndex + 1);
        },
        changeIndex_service: function (index) {
            this.searchService(index - 1);
        },
        toFirst_service: function () {
            this.searchService(0);
        },
        toLast_service: function () {
            this.searchService(this.service.totalPage - 1);
        },
        // 本地真分页方法
        prev_local: function () {
            if (this.local.currentIndex <= 0) {
                return;
            }
            this.searchLocal(this.local.currentIndex - 1);
        },
        next_local: function () {
            if (this.local.currentIndex >= this.local.totalPage - 1) {
                return;
            }
            this.searchLocal(this.local.currentIndex + 1);
        },
        changeIndex_local: function (index) {
            this.searchLocal(index - 1);
        },
        toFirst_local: function () {
            this.searchLocal(0);
        },
        toLast_local: function () {
            this.searchLocal(this.local.totalPage - 1);
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
        formatTime: function (timestamp) {
            var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
            var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
            var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
            return Y + M + D + h + m + s;
        },
        overflowHide: function (val) {
            var str = val.toString();
            if (str.length > 10) {
                str = str.substring(0, 10) + '...'
            }
            return str;
        },
        stringTimeFat: function (val) {
            if (val) {
                if (val.length > 8) {
                    return val.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/g, '$1-$2-$3 $4:$5:$6')
                } else {
                    return val.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')
                }
            } else {
                return '-'
            }
        },
        formatEx1: function (arr, prop) {
            return arr.map(function (item) {
                return (item && item[prop]) || '暂无';
            }).join('，');
        }
    }
});
