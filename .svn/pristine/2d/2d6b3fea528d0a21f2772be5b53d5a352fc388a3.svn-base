new Vue({
    el: '#content',
    data: {
        startTime: '',
        endTime: '',
        filePath: '',
        filePaths: '',

        //主页面相关数据
        tableData: [],
        diaMsg: '',
        // 查询条件
        newBadgeId: '',
        // 新增字段
        addBadge: {
            badgeDes: "",
            badgeNm: "",
            doLink: "",
            endDt: "2099-12-31 00:00:00",
            badgeSt: 'N',
            gainBadgeCustTags: [],
            badgeGrpId: [],
            iconImageDark: "iconImageDark",
            iconImageLight: "iconImageLight",
            terminal: {},
            badgeSt: '',
            prdAttrValueList: [],
        },
        updateBadgeData: {},
        badgeGroupData: [],
        badgeGroupList: [],
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10,
        condition: '',
        // 详情
        flag: false,
        badgeSta: 'N',
        // badgeSta: ['N','P'],
        badgeDesc: '',
        badgeName: '',
        badgeGroup: '',
        tagIdIndex: '',
        CustTagInfos: [],
        addBadgeGainBadgeCustTags: {
            compare: "",
            compareValueEnd: "",
            compareValueStr: "",
            custTagId: "",
            weight: 0
        },
        updateGainBadgeCustTags: {
            compare: "",
            compareValueEnd: "",
            compareValueStr: "",
            custTagId: "",
            weight: 0
        },
        uploadInput3: '',
        uploadInput4: '',
    },
    created() {

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

        this.getCustTagInfos() //获取用户标签信息

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
        $('#updateBadgeGroup,#addBadgeGroup').chosen({
            search_contains: true,
            no_results_text: '未找到该数据',
            disable_search_threshold: 6,
            width: '300px'
        });
        $('#updateBadgeGroup,#addBadgeGroup').on('change', function (e, params) {
            if (params && params.selected) {
                if (this.badgeGroupList.indexOf(params.selected) === -1) { // 未选
                    this.badgeGroupList.push(params.selected);
                }
            }
            console.log("===", this.badgeGroupList)
            if (params && params.deselected) {
                if (this.badgeGroupList.indexOf(params.deselected) > -1) { // 已选
                    var index = this.badgeGroupList.indexOf(params.deselected);
                    this.badgeGroupList.splice(index, 1);
                }
            }
        }.bind(this));
        //请求全部徽章组信息及多选框
        let data = {}
        data.pageNo = 1;
        data.pageSize = "9999";
        data.badgeGrpSts = 'N,P'; //正常，禁用
        data.badgeGrpNm = '';
        $.post({
            url: '/clientMgmt/badgeManagement/badgeGroupManagement/getTableData.ajax',
            data,
            success: function (result) {
                if (result.error === 0) {

                    _this.badgeGroupData = result.data.tableData
                    var str = '<option value=""></option>';
                    _this.badgeGroupData.forEach(function (item) {
                        str += '<option value="' + item.badgeGrpId + '">' +
                            item.badgeGrpNm +
                            '</option>';
                        console.log(item.badgeGrpId)
                    });
                    console.log('badgeGroupList', this.badgeGroupList)
                    $('#updateBadgeGroup').html(str);
                    $('#updateBadgeGroup').val(this.badgeGroupList);
                    $('#updateBadgeGroup').trigger('chosen:updated');

                    $('#addBadgeGroup').html(str);
                    $('#addBadgeGroup').val(this.badgeGroupList);
                    $('#addBadgeGroup').trigger('chosen:updated');
                    console.log()
                } else {
                    _this.badgeGroupData = [];
                }
            }
        });

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

        // 20211227 新增/修改 弹窗，获取条件，placehold多个值请用“|”分隔
        $('select[name="badgeGroup"]').on('change', function(){
            if($(this).val() == 'ctn'){
                $(this).siblings('input').attr('placeholder', '多个值请用“|”分隔');
            } else {
                $(this).siblings('input').attr('placeholder', '');
            }
        })

    },
    methods: {

        // 新增文件上传
        fileUpload: function (index) {
            var _this = this;
            let afterFile = $(`#uploadFileInput${index}`).val()
            //文件后缀名转小写
            afterFile = afterFile.substr(afterFile.lastIndexOf(".")).toLowerCase()
            if (afterFile !== '' && afterFile != '.png' && afterFile != '.jpg' && afterFile != '.gif') {
                if (index < 3) {
                    this.showDialog('add', 'info', true, '只能上传png、jpg、gif格式图片');
                } else {
                    this.showDialog('update', 'info', true, '只能上传png、jpg、gif格式图片');
                }
                console.log(afterFile)
                return;
            }
            if (index == 1) {
                var filePath = this.filePath;
                console.log(filePath)
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
                    this.showDialog('update', 'info', true, '请选择要上传的文件');
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
                                this.uploadInput3 = result.data.filePath
                            }
                            _this.showDialog('update', 'info', true, result.msg);
                            $(`#uploadInput3`).val(result.data.filePath);
                        },
                        error: function () {
                            _this.showDialog('update', 'info', true, '上传失败，请稍后重试');
                            $(`#uploadInput3`).val('');
                        }
                    });
                }
            }
            if (index == 4) {
                var filePath = this.filePaths;
                if (!$('#uploadFileInput4').val()) {
                    this.showDialog('update', 'info', true, '请选择要上传的文件');
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
                                this.uploadInput4 = result.data.filePath
                            }
                            _this.showDialog('update', 'info', true, result.msg);
                            $(`#uploadInput4`).val(result.data.filePath);
                        },
                        error: function () {
                            _this.showDialog('update', 'info', true, '上传失败，请稍后重试');
                            $(`#uploadInput4`).val('');
                        }
                    });
                }
            }

        },

        // 清除文件
        clear: function (uploadInput) {
            $(`${uploadInput}`).val('');
        },

        // 主表格数据
        getTableData: function (currentIndex) {
            var params = {};
            var _this = this;
            _this.tableData = [];
            if (_this.badgeSta == '') {
                params.badgeSts = 'N,P'
            } else {
                params.badgeSts = this.badgeSta
            }
            params.badgeNm = _this.badgeName
            params.pageNo = 1;
            params.pageSize = "9999";
            $.post({
                url: '/clientMgmt/badgeManagement/badgeManagement/getTableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        // 后端分页 展示
                        _this.currentIndex = 0;
                        _this.tableData = result.data.tableData;
                        _this.getBadgeGrpNm()

                    } else {
                        _this.tableData = [];
                        _this.currentIndex = 0;
                        // _this.totalPage = 0;
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        // 根据徽章id查询关联的徽章组名称并组装到表格数据里
        getBadgeGrpNm() {
            var _this = this;
            let badgeIds = [];
            this.tableData.forEach((item, index) => {
                badgeIds.push(item.badgeId)
                // item.badgeGrpNm = '';
            })
            $.post({
                url: '/clientMgmt/badgeManagement/badgeManagement/getBadgeGrpNm.ajax',
                contentType: "application/json",
                dataType: 'json',
                data: JSON.stringify(badgeIds),
                success: function (result) {
                    if (result.error === 0) {
                        var badgeGrpNmList = result.data.tableData
                        for (var id in badgeGrpNmList) {
                            _this.tableData.forEach((item, index) => {
                                if (item.badgeId == id) {
                                    // 拼接徽章组名称
                                    var str = ' '
                                    var badgeGrpIdList = []
                                    badgeGrpNmList[id].forEach((item2, index2) => {
                                        str += item2.badgeGrpNm + ' '
                                        badgeGrpIdList.push(item2.badgeGrpId)
                                    })
                                    item.badgeGrpNm = str
                                    item.badgeGrpId = badgeGrpIdList
                                }

                                Vue.set(_this.tableData, index, item); // 更新页面数据
                            })

                        }
                    } else {
                        // _this.showDialog('', 'info', false, result.msg);
                    }
                }.bind(this)
            });

        },

        // 新增数据
        showAdd: function () {
            var _this = this;
            this.showDialog('', 'add');
            // 查询所有的徽章组信息
            var params = {}
            params.pageNo = 1;
            params.pageSize = "9999";
            params.badgeGrpSts = 'N,P'; //正常，禁用
            params.badgeGrpNm = '';
            $.post({
                url: '/clientMgmt/badgeManagement/badgeGroupManagement/getTableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.badgeGroupData = result.data.tableData
                        var str = '<option value=""></option>';
                        _this.badgeGroupData.forEach(function (item) {
                            str += '<option value="' + item.badgeGrpId + '">' + item.badgeGrpNm + '</option>';
                        });
                        $('#updateBadgeGroup').html(str);
                        $('#updateBadgeGroup').val(this.badgeGroupList);
                        $('#updateBadgeGroup').trigger('chosen:updated');

                        $('#addBadgeGroup').html(str);
                        $('#addBadgeGroup').val(this.badgeGroupList);
                        $('#addBadgeGroup').trigger('chosen:updated');
                    } else {
                        _this.badgeGroupData = [];
                    }
                }
            });
        },

        // 新增保存
        saveParam() {
            var _this = this;
            // 新增
            this.addBadge.gainBadgeCustTags = []
            // 获取条件如果不填完整就为空
            if (this.addBadgeGainBadgeCustTags.custTagId !== '' && this.addBadgeGainBadgeCustTags.compare !== '' && this.addBadgeGainBadgeCustTags.compareValueStr !== '') {
                this.addBadge.gainBadgeCustTags.push(this.addBadgeGainBadgeCustTags)
            }
            this.addBadge.terminal = {
                ip: window.location.hostname
            }
            let params = this.addBadge
            params.endDt = moment($('#addEndTime').val()).valueOf()
            if (!params.endDt) {
                // endDt 默认时间为20991231
                params.endDt = 4133908800000
            }
            params.badgeGrpId = $('#addBadgeGroup').val().splice(1),
                params.iconImageDark = $('#uploadInput2').val();
            params.iconImageLight = $('#uploadInput1').val();

            $.post({
                url: '/clientMgmt/badgeManagement/badgeManagement/addBadge.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {

                        _this.showDialog('add', 'info', false, result.msg);
                        _this.getTableData(0)
                    } else {
                        _this.showDialog('add', 'info', true, result.msg);
                    }
                }
            });
        },



        // 修改弹窗
        showUpdate(item, del) {
            var _this = this;
            console.log(item)
            this.updateBadgeData = []
            $('#uploadInput3').val(item.iconImageLight);
            $('#uploadInput4').val(item.iconImageDark);
            this.updateGainBadgeCustTags = {}
            this.updateBadgeData = item
            this.updateBadgeData.terminal = {
                ip: window.location.hostname
            }
            $('#updateBadgeGroup').val(item.badgeGrpId);
            $('#updateBadgeGroup').trigger('chosen:updated');
            if (item.gainBadgeCustTags) {
                this.updateGainBadgeCustTags = item.gainBadgeCustTags[0]
                // this.updateGainBadgeCustTags.compareValueEnd=''
            }
            $('#updateEndTime').val(moment(item.endDt).format('YYYY-MM-DD HH:mm:ss'));
            if (del === 'del') {
                this.updateBadgeData.badgeSt = 'C'
                this.updateBadge('del')
            } else {
                this.showDialog('', 'update'); // 查询徽章组
            }
        },

        // 修改接口
        updateBadge(del) {
            var _this = this;
            this.updateBadgeData.gainBadgeCustTags = []
            this.updateBadgeData.iconImageDark = $('#uploadInput4').val();
            this.updateBadgeData.iconImageLight = $('#uploadInput3').val();
            // 获取条件如果不填完整就为空
            if (this.updateGainBadgeCustTags.custTagId !== '' && this.updateGainBadgeCustTags.compare !== '' && this.updateGainBadgeCustTags.compareValueStr !== '') {
                this.updateBadgeData.gainBadgeCustTags.push(this.updateGainBadgeCustTags)
            }
            if (!del) {
                // 判断徽章组ID
                if ($('#updateBadgeGroup').val()) {
                    this.updateBadgeData.badgeGrpId = $('#updateBadgeGroup').val().filter(function (s) {
                        return s && s.trim();
                    })
                }else{
                    console.log('徽章组ID为空')
                    this.updateBadgeData.badgeGrpId =[]
                }

                this.updateBadgeData.endDt = moment($('#updateEndTime').val()).valueOf()
                if (!this.updateBadgeData.endDt) {
                    // endDt 默认时间为20991231
                    this.updateBadgeData.endDt = 4133908800000
                }
                if (!this.updateGainBadgeCustTags) {
                    this.updateBadgeData.gainBadgeCustTags.push(this.updateGainBadgeCustTags)
                }

            }
            console.log(' this.updateBadgeData', this.updateBadgeData)
            $.post({
                url: '/clientMgmt/badgeManagement/badgeManagement/updateBadge.ajax',
                data: this.updateBadgeData,
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('update', 'info', false, result.msg);
                        _this.getTableData(0)
                    } else {
                        _this.showDialog('update', 'info', true, result.msg);

                    }
                }
            })
        },
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