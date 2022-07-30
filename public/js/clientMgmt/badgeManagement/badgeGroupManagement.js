new Vue({
    el: '#content',
    data: {
        startTime: '',
        endTime: '',
        filePath: '',
        filePaths: '',
        checkParam: [],
        showDetailBadgeGrpNm: '',
        //主页面相关数据
        tableData: [],
        diaMsg: '',

        // 查询条件
        badgeGrpNm: '',
        badgeGrpSt: 'N',
        badgeGrpIds: [],
        iconImageDark: '',
        iconImageLight: '',
        // 新增字段
        addBadgeGrp: {
            badgeGrpNm: '',
            badgeGrpSt: '',
            badgeGrpDes: '',
            lightCondition: '',
            iconImageLight: 'iconImageLight',
            iconImageDark: 'iconImageDark',
            terminal: {
                ip: ''
            }
        },
        // 修改
        updateBadgeGrp: {
            badgeGrpNm: '',
            badgeGrpSt: '',
            badgeGrpDes: '',
            lightCondition: '',
            iconImageLight: 'iconImageLight',
            iconImageDark: 'iconImageDark',
            terminal: {
                ip: ''
            }
        },

        updateBadgeData: {
            
        },
        badgeName: '', //名称
        badgeSta: '',
        badgeGroup: '', //
        CustTagInfos: [],
        updateGainBadgeCustTags: {
            compare: "",
            compareValueEnd: "",
            compareValueStr: "",
            custTagId: "",
            weight: 0
        },
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10,
        condition: '',
        // 详情

        flag: false,
        //比较

        detailTable: [],

        tagIdIndex: '',

    },
    computed: {
        //主表格分页
        //主表格假分页
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
    },
    watch: {
        pageMaxNum: {
            handler: function (val, oldval) {
                this.currentIndex = 0;
            }
        },
        condition: {
            handler: function (val, oldval) {
                this.currentIndex = 0;
            }
        },
    },
    mounted: function () {
        var _this = this;
        var dialogs = ['info', 'normal'];
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

        this.getTableData();
        this.getCustTagInfos()
        $('.date-timepicker').datetimepicker({
            format: 'YYYY-MM-DD HH:mm:ss', //use this option to display seconds
            icons: {
                time: 'fa fa-clock-o',
                date: 'fa fa-calendar',
                up: 'fa fa-chevron-up',
                down: 'fa fa-chevron-down',
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-arrows ',
                clear: 'fa fa-trash',
                close: 'fa fa-times'
            }
        }).next().on(ace.click_event, function () {
            $(this).prev().focus();
        });
        // 选择按钮
        $('#selectBtn1').click(function () {
            $('#uploadFileInput1').click();
        });
        $('#uploadFileInput1').on('input', function () {
            $('#uploadInput1').val($(this).val());
        });
        $('#selectBtn2').click(function () {
            $('#uploadFileInput2').click();
        });
        $('#uploadFileInput2').on('input', function () {
            $('#uploadInput2').val($(this).val());
        });
        $('#selectBtn3').click(function () {
            $('#uploadFileInput3').click();
        });
        $('#uploadFileInput3').on('input', function () {
            $('#uploadInput3').val($(this).val());
        });
        $('#selectBtn4').click(function () {
            $('#uploadFileInput4').click();
        });
        $('#uploadFileInput4').on('input', function () {
            $('#uploadInput4').val($(this).val());
        });
    },
    methods: {
        getCustTagInfos() {
            var _this = this;
            let tagScenario = {
                tagScenario: 'BADGE'
            }
            $.post({
                url: '/clientMgmt/badgeManagement/badgeManagement/getCustTagInfos.ajax',
                data: tagScenario,
                success: function (result) {
                    if (result.error === 0) {
                        _this.CustTagInfos = result.data.tableData
                        console.log(_this.CustTagInfos)
                    } else {
                        _this.showDialog('', 'info', true, result.msg);

                    }
                }
            })
        },
        // 保存新建徽章组
        saveParam() {
            var _this = this;
            this.addBadgeGrp.iconImageDark = $('#uploadInput2').val();
            this.addBadgeGrp.iconImageLight = $('#uploadInput1').val();
            this.addBadgeGrp.terminal = {
                ip: window.location.hostname
            }

            let params = this.addBadgeGrp
            this.dialogCheck(params, 'add')
            $.post({
                url: '/clientMgmt/badgeManagement/badgeGroupManagement/addBadgeGroup.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0)
                        _this.showDialog('add', 'info', false, result.msg);
                    } else {
                        _this.showDialog('add', 'info', true, result.msg);
                    }
                }
            });

        },
        // 查看徽章
        showDetail(badges, badgeGrpId, badgeGrpNm) {
            if (badges) {
                this.detailTable = badges
                this.detailTable.badgeGrpId = badgeGrpId
                this.showDetailBadgeGrpNm = badgeGrpNm
                console.log(this.detailTable);
                this.showDialog('', 'Detail');
            } else {
                this.showDialog('', 'info', false, '暂无数据');
            }

        },
        // 查看徽章明细里的删除delBadge.ajax
        delBadge(item) {
            var _this = this
            let params = {
                badgeGrpId: this.detailTable.badgeGrpId,
                badgeId: item.badgeId,
                terminal: {
                    ip: window.location.hostname
                }
            }
            $.post({
                url: '/clientMgmt/badgeManagement/badgeGroupManagement/delBadge.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0)
                        let index = _this.detailTable.indexOf(item)
                        if (index !== -1) {
                            _this.detailTable.splice(index, 1)
                        }
                        _this.showDialog('Detail', 'info', true, result.msg);
                    } else {
                        _this.showDialog('Detail', 'info', true, result.msg);
                    }
                }
            });

        },
        // 修改徽章组
        showUpdate(item, delBadgeGrp) {
            if (item && delBadgeGrp) {
                // 假删除 
                // item.badgeGrpSt = 'C'
                this.updateBadgeGrp = item
                $('#uploadInput3').val(item.iconImageLight);
                $('#uploadInput4').val(item.iconImageDark);
                this.updateBadgeGrpBtn('delBadgeGrp')
            } else {
                this.updateBadgeGrp = []
                this.updateBadgeGrp = item
                $('#uploadInput3').val(item.iconImageLight);
                $('#uploadInput4').val(item.iconImageDark);
                this.showDialog('', 'updateBadgeGrp');
            }
        },
        // 修改徽章组接口
        updateBadgeGrpBtn(delBadgeGrp) {
            var _this = this;
            if (delBadgeGrp) {
                this.updateBadgeGrp.badgeGrpSt = 'C'
            } else {
                this.updateBadgeGrp.iconImageDark = $('#uploadInput4').val();
                this.updateBadgeGrp.iconImageLight = $('#uploadInput3').val();
            }
            this.updateBadgeGrp.terminal = {
                ip: window.location.hostname
            }
            console.log('2', this.updateBadgeGrp.terminal)
            $.post({
                url: '/clientMgmt/badgeManagement/badgeGroupManagement/updateBadgeGrp.ajax',
                data: this.updateBadgeGrp,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData()
                        _this.showDialog('updateBadgeGrp', 'info', false, result.msg);

                    } else {
                        _this.showDialog('updateBadgeGrp', 'info', true, result.msg);
                    }
                }
            })
        },

        // 修改徽章
        showBadgeUpdate(item) {
            var _this = this;
            console.log(item)
            this.updateBadgeData = []
            this.updateGainBadgeCustTags = {}
            this.updateBadgeData = item
            $('#uploadInput5').val(item.iconImageLight);
            $('#uploadInput6').val(item.iconImageDark);
            this.updateBadgeData.terminal = {
                ip: window.location.hostname
            }
            this.showDialog('Detail', 'updateBadge'); // 修改徽章 
            if (item.gainBadgeCustTags) {
                this.updateGainBadgeCustTags = item.gainBadgeCustTags[0]
            }
            $('#updateEndTime').val(moment(item.endDt).format('YYYY-MM-DD HH:mm:ss'))
        },
        // 修改徽章接口
        updateBadge() {
            var _this = this;
            this.updateBadgeData.iconImageDark = $('#uploadInput6').val();
            this.updateBadgeData.iconImageLight = $('#uploadInput5').val();

            this.updateBadgeData.gainBadgeCustTags = []
            this.updateBadgeData.gainBadgeCustTags.push(this.updateGainBadgeCustTags)
            this.updateGainBadgeCustTags = {}
            this.updateBadgeData.endDt = moment($('#updateEndTime').val()).valueOf()
            // badgeGrpId
            this.updateBadgeData.badgeGrpId =this.detailTable.badgeGrpId
            console.log(this.updateBadgeData)
            $.post({
                // url: '/clientMgmt/badgeManagement/badgeManagement/updateBadge.ajax',
                url: '/clientMgmt/badgeManagement/badgeGroupManagement/putBadgeSeqNo.ajax',
                data: this.updateBadgeData,
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('updateBadge', 'info', false, result.msg);
                        _this.getTableData(0)
                    } else {
                        _this.showDialog('updateBadge', 'info', true, result.msg);

                    }
                }
            })
        },
        // 新增文件上传// 修改文件上传
        fileUploads: function (index) {
            var _this = this;
            let afterFile = $(`#uploadFileInput${index}`).val()
            //后缀名转小写
            afterFile = afterFile.substr(afterFile.lastIndexOf(".")).toLowerCase()
            if (afterFile !== '' && afterFile != '.png' && afterFile != '.jpg' && afterFile != '.gif') {
                if (index < 3) {
                    this.showDialog('add', 'info', true, '只能上传png、jpg、gif格式图片');
                } else {
                    this.showDialog('updateBadgeGrp', 'info', true, '只能上传png、jpg、gif格式图片');
                }
                console.log(afterFile)
                return;
            }
            if (index == 1) {
                if (!$('#uploadFileInput1').val()) {
                    this.showDialog('add', 'info', true, '请选择要上传的文件');
                    return false;
                } else {
                    $.ajaxFileUpload({
                        url: '/clientMgmt/badgeManagement/badgeManagement/uploadPostPicFile.ajax',
                        type: 'POST',
                        dataType: 'json',
                        fileElementId: 'uploadFileInput1',
                        success: function (result) {
                            $('#uploadFileInput1').val('');
                            $('#uploadInput1').val('');
                            $('#uploadFileInput1').on('input', function () {
                                $('#uploadInput1').val($(this).val());
                            });
                            if (result.error == 0) {

                                $(`#uploadInput1`).val(result.data.filePath);

                            }
                            _this.showDialog('add', 'info', true, result.msg);

                            $(`#uploadInput1`).val(result.data.filePath);
                        },
                        error: function () {
                            _this.showDialog('add', 'info', true, '上传失败，请稍后重试');
                            $(`#uploadInput1`).val('');
                        }
                    });
                }
            }
            if (index == 2) {
                var filePath = this.filePaths;
                if (!$('#uploadFileInput2').val()) {
                    this.showDialog('add', 'info', true, '请选择要上传的文件');
                    return false;
                } else {
                    $.ajaxFileUpload({
                        url: '/clientMgmt/badgeManagement/badgeManagement/uploadPostPicFile.ajax',
                        type: 'POST',
                        dataType: 'json',
                        fileElementId: 'uploadFileInput2',
                        success: function (result) {
                            $('#uploadFileInput2').val('');
                            $('#uploadFileInput2').val('');
                            $('#uploadFileInput2').on('input', function () {
                                $('#uploadFileInput2').val($(this).val());
                            });
                            if (result.error == 0) {
                                $(`#uploadInput2`).val(result.data.filePath);
                            }
                            _this.showDialog('add', 'info', true, result.msg);
                            $(`#uploadInput2`).val(result.data.filePath);
                        },
                        error: function () {
                            _this.showDialog('add', 'info', true, '上传失败，请稍后重试');
                            $(`#uploadInput2`).val('');
                        }
                    });
                }
            }
            if (index == 3) {
                if (!$('#uploadFileInput3').val()) {
                    this.showDialog('updateBadgeGrp', 'info', true, '请选择要上传的文件');
                    return false;
                } else {
                    $.ajaxFileUpload({
                        url: '/clientMgmt/badgeManagement/badgeManagement/uploadPostPicFile.ajax',
                        type: 'POST',
                        dataType: 'json',
                        fileElementId: 'uploadFileInput3',
                        success: function (result) {
                            $('#uploadFileInput3').val('');
                            $('#uploadFileInput3').val('');
                            $('#uploadFileInput3').on('input', function () {
                                $('#uploadFileInput3').val($(this).val());
                            });
                            if (result.error == 0) {
                                $(`#uploadInput3`).val(result.data.filePath);
                            }
                            _this.showDialog('updateBadgeGrp', 'info', true, result.msg);
                            $(`#uploadInput3`).val(result.data.filePath);

                        },
                        error: function () {
                            _this.showDialog('updateBadgeGrp', 'info', true, '上传失败，请稍后重试');
                            $(`#uploadInput3`).val('');

                        }
                    });
                }
            }
            if (index == 4) {
                if (!$('#uploadFileInput4').val()) {
                    this.showDialog('updateBadgeGrp', 'info', true, '请选择要上传的文件');
                    return false;
                } else {
                    $.ajaxFileUpload({
                        url: '/clientMgmt/badgeManagement/badgeManagement/uploadPostPicFile.ajax',
                        type: 'POST',
                        dataType: 'json',
                        fileElementId: 'uploadFileInput4',
                        success: function (result) {
                            $('#uploadFileInput4').val('');
                            $('#uploadFileInput4').val('');
                            $('#uploadFileInput4').on('input', function () {
                                $('#uploadFileInput4').val($(this).val());
                            });
                            if (result.error == 0) {

                                $(`#uploadInput4`).val(result.data.filePath);

                            }
                            _this.showDialog('updateBadgeGrp', 'info', true, result.msg);
                            $(`#uploadInput4`).val(result.data.filePath);

                        },
                        error: function () {
                            _this.showDialog('updateBadgeGrp', 'info', true, '上传失败，请稍后重试');
                            $(`#uploadInput4`).val('');
                        }
                    });
                }
            }

        },

        // 清除文件
        clear: function (uploadInput) {
            console.log(uploadInput)
            $(`${uploadInput}`).val('');
        },
        // 主表格数据
        getTableData: function (currentIndex) {
            var params = {};
            var _this = this;
            _this.tableData = [];
            params.pageNo = 1;
            params.pageSize = "9999";
            params.badgeGrpIds = this.badgeGrpIds;
            params.badgeGrpNm = this.badgeGrpNm;
            // params.badgeGrpSt = this.badgeGrpSt;
            if (this.badgeGrpSt == '') {
                params.badgeGrpSts = 'N,P'
            } else {
                params.badgeGrpSts = this.badgeGrpSt
            }
            $.post({
                url: '/clientMgmt/badgeManagement/badgeGroupManagement/getTableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        // 后端分页 展示
                        _this.currentIndex = 0;
                        _this.tableData = result.data.tableData
                        // _this.totalPage = result.data.totalSize;
                        // _this.currentIndex = result.data.pageNo - 1;
                    } else {
                        _this.tableData = [];
                        _this.currentIndex = 0;
                        // _this.totalPage = 0;
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        // 新增数据
        showAdd: function () {
            var _this = this;
            this.showDialog('', 'add');
        },
        // 新增必填弹框
        dialogCheck(data, dialog) {
            var _this = this;
            if (dialog == 'add' || dialog == 'updateBadgeGrp') {
                if (!data.badgeGrpNm) {
                    this.showDialog(`${dialog}`, 'info', true, '徽章组名称不能为空');
                    return false;
                }
                if (!data.badgeGrpSt) {
                    this.showDialog(`${dialog}`, 'info', true, '徽章组状态不能为空');
                    return false;
                }
            }
            return true;
        },
        //主表格分页方法
        check: function (item) {
            item.check = !item.check;
        },
        allCheck: function () {
            var _this = this;
            var flag = this.checkAll;
            this.tableData.forEach(function (item) {
                item.check = !flag;
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
    filters: {

    }
});