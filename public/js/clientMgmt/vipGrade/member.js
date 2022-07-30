new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        tableData: [],
        diaMsg: '',

        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        pageMaxNum: '10',
        condition: '',
        // 新增
        userName: '',
        gradeName: '',
        seqNo: '',
        wealthStr: '',
        wealthEnd: '',
        deleteStatus: false,
        gradeCode: '',
        remark: '',
        status: '0',
        progressColor: "",
        gradeDescColor: "",
        backgroundImage: '',
        //查看修改
        viewChange: {
            progressColor: "",
            gradeDescColor: "",

            gradeId: '',
            gradeName: '',
            seqNo: '',
            wealthStr: '',
            gradeCode: '',
            wealthEnd: '',
            status: '',
            backgroundImage: '',
            remark: '',
            deleteStatus: false,
        },
        queryKey: '', //查询
        queryId: '',

        deleteinfo: {},
        privilegeAll: [''],
        addGradeId: '',
        GradeIdListStatus: false,
        oldPath: '',
        anew: false,
    },
    mounted: function () {
        var dialogs = ['info', 'addNotice', 'changeNotice', 'deleteDialog'];
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
        $.post({
            url: '/clientMgmt/vipGrade/member/privilegeAll.ajax',
            success: function (result) {
                if (result.error === 0) {
                    _this.privilegeAll = result.data.map(function (val) {
                        return {
                            checked: false,
                            privilegeId: val.privilegeId,
                            description: val.description,
                            privilegeName: val.privilegeName
                        }
                    })

                    console.log(result)
                } else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });
        this.getTableData(0);
    },
    computed: {
        //主表格分页
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
        pageMaxNum: function (val, oldval) {
            this.currentIndex = 0;
        },
        condition: function () {
            this.currentIndex = 0;
        }
    },
    methods: {
        addDialog: function () {
            var _this = this;
            this.anew = true
            this.showDialog('', 'addNotice', false);
        },
        select: function (item) {
            if (item == 'change') {
                document.getElementById("uploadFileInputCge").click();
            } else {
                document.getElementById("uploadFileInput").click();
            }

        },
        add: function (item) {
            if (this.progressColor != '' && this.progressColor.indexOf('#') != '-1' && this.progressColor.length != 7 && this.progressColor.length != 4) {
                this.showDialog('addNotice', 'info', true, '请填写正确的色值');
                return;
            }
            if (this.gradeDescColor != '' && this.gradeDescColor.indexOf('#') != '-1' && this.gradeDescColor.length != 7 && this.gradeDescColor.length != 4) {
                this.showDialog('addNotice', 'info', true, '请填写正确的色值');
                return;
            }
            if (this.gradeName === '') {
                this.showDialog('addNotice', 'info', true, '等级名称不能为空');
                return;
            }

            if (this.seqNo === '') {
                this.showDialog('addNotice', 'info', true, '等级排序不能为空');
                return;
            }
            if (this.gradeCode === '') {
                this.showDialog('addNotice', 'info', true, '等级代码不能为空');
                return;
            }

            var filePath = this.backgroundImage;
            var afterFile = filePath.lastIndexOf('.');
            afterFile = filePath.substr(afterFile - 0 + 1) //获取文件后缀名
            afterFile = afterFile.toLocaleLowerCase() //转为小写
            if (this.backgroundImage !== '' && afterFile != 'png' && afterFile != 'jpg' && afterFile != 'gif') {
                this.showDialog('addNotice', 'info', true, '只能上传png、jpg、gif格式图片');
                return;
            }

            if (this.wealthStr === '') {
                this.showDialog('addNotice', 'info', true, '财富值范围 开始值不能为空');
                return;
            }
            var reg = /^[0-9]*$/
            if (!reg.test(this.wealthStr) || !reg.test(this.wealthEnd)) {
                this.showDialog('addNotice', 'info', true, '财富值必须为纯数字')
                return;
            }
            var _this = this;
            var fileElementId;
            if (uploadFileInput.value != '') {
                fileElementId = 'uploadFileInput'
            }
            $.ajaxFileUpload({
                url: '/clientMgmt/vipGrade/member/add.ajax',
                type: 'POST',
                dataType: 'json',
                data: {
                    gradeName: this.gradeName,
                    seqNo: this.seqNo,
                    wealthStr: this.wealthStr,
                    wealthEnd: this.wealthEnd,
                    remark: this.remark,
                    status: this.status,
                    gradeCode: this.gradeCode,
                    backgroundImage: this.backgroundImage,
                    progressColor: this.progressColor,
                    gradeDescColor: this.gradeDescColor,
                },
                secureuri: false,
                fileElementId: fileElementId,
                success: function (result) {
                    console.log(result)
                    if (result.error == 0) {
                        _this.anew = false;
                        _this.backgroundImage = result.data
                        _this.showDialog('addNotice', 'info', false, result.msg)
                        _this.getTableData(0)
                        _this.gradeName = '';
                        _this.seqNo = '';
                        _this.progressColor = '';
                        _this.gradeDescColor = '';
                        _this.wealthStr = '';
                        _this.wealthEnd = '';
                        _this.remark = '';
                        _this.status = '0';
                        _this.gradeCode = '';
                        _this.backgroundImage = ''
                    } else {
                        _this.showDialog('addNotice', 'info', true, result.msg)
                    }
                }
            });
        },
        showFileName: function (event) {
            this.backgroundImage = event.target.files[0].name
            this.viewChange.backgroundImage = event.target.files[0].name
            console.log(event.target.files[0].name)
        },
        getTableData: function (currentIndex) {
            var params = {};
            var _this = this;
            params.pageNo = currentIndex + 1;
            params.pageSize = this.pageMaxNum;
            $.post({
                url: '/clientMgmt/vipGrade/member/getList.ajax',
                // data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.tableData = result.data;
                        // _this.currentIndex = result.data.pageNum - 1;
                        // _this.totalPage = result.data.pages;
                        _this.userName = result.data.userName;
                        console.log(result)
                    } else {
                        _this.tableData = [];
                        // _this.currentIndex = 0;
                        // _this.totalPage = 0;
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
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

        deleteDialog: function (id, path) {
            this.deleteinfo.gradeId = id
            this.deleteinfo.path = path

            this.showDialog("", "deleteDialog")

        },
        deleteData: function (id) {
            var params = {
                gradeId: this.deleteinfo.gradeId,
                modifyBy: this.userName
            };
            console.log(params)
            var _this = this;
            $.post({
                url: '/clientMgmt/vipGrade/member/dataDelete.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('deleteDialog', 'info', false, result.msg);
                        _this.getTableData(0)
                        console.log(result)

                    } else {
                        _this.showDialog('deleteDialog', 'info', false, result.msg);
                    }
                }
            });
        },
        showView: function (id) {
            this.anew = true;
            var params = {
                gradeId: id,
            };
            console.log(params)
            var _this = this;
            $.post({
                url: '/clientMgmt/vipGrade/member/dataQuery.ajax',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        var element = result.data
                        for (const key in element) {
                            if (element[key] == null) {
                                element[key] = ''
                            }
                        }
                        _this.viewChange.gradeName = result.data.gradeName;
                        _this.viewChange.seqNo = result.data.seqNo;
                        _this.viewChange.wealthStr = result.data.wealthStr;
                        _this.viewChange.wealthEnd = result.data.wealthEnd;
                        _this.viewChange.gradeCode = result.data.gradeCode;
                        _this.viewChange.status = result.data.status;
                        _this.viewChange.gradeId = result.data.gradeId;
                        _this.viewChange.backgroundImage = result.data.backgroundImage;
                        _this.viewChange.remark = result.data.remark;
                        _this.oldPath = _this.viewChange.backgroundImage;
                        _this.viewChange.progressColor = result.data.progressColor,
                            _this.viewChange.gradeDescColor = result.data.gradeDescColor,
                            console.log(result)
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });

            this.showDialog('', 'changeNotice', false)
        },
        changeDate: function () {
            if (this.viewChange.progressColor != '' && this.viewChange.progressColor.indexOf('#') != '-1' && this.viewChange.progressColor.length != 7 && this.viewChange.progressColor.length != 4) {
                this.showDialog('changeNotice', 'info', true, '请填写正确的色值');
                return;
            }
            if (this.viewChange.gradeDescColor != '' && this.viewChange.gradeDescColor.indexOf('#') != '-1' && this.viewChange.gradeDescColor.length != 7 && this.viewChange.gradeDescColor.length != 4) {
                this.showDialog('changeNotice', 'info', true, '请填写正确的色值');
                return;
            }
            if (this.viewChange.gradeName === '') {
                this.showDialog('changeNotice', 'info', true, '等级名称不能为空');
                return;
            }
            if (this.viewChange.seqNo === '') {
                this.showDialog('changeNotice', 'info', true, '等级排序不能为空');
                return;
            }
            if (this.viewChange.gradeCode === '') {
                this.showDialog('changeNotice', 'info', true, '等级代码不能为空');
                return;
            }
            var filePath = this.viewChange.backgroundImage;
            var afterFile = filePath.lastIndexOf('.');
            afterFile = filePath.substr(afterFile - 0 + 1) //获取文件后缀名
            afterFile = afterFile.toLocaleLowerCase() //转为小写
            if (this.viewChange.backgroundImage != '' && afterFile != 'png' && afterFile != 'jpg' && afterFile != 'gif') {
                this.showDialog('changeNotice', 'info', true, '只能上传png、jpg、gif格式图片');
                return;
            }

            if (this.viewChange.wealthStr === '') {
                this.showDialog('addNotice', 'info', true, '财富值范围 开始值不能为空');
                return;
            }
            var reg = /^[0-9]*$/
            if (!reg.test(this.viewChange.wealthStr) || !reg.test(this.viewChange.wealthEnd)) {
                this.showDialog('changeNotice', 'info', true, '财富值必须为纯数字')
                return;
            }
            var fileElementId;
            if (uploadFileInputCge.value != '') {
                fileElementId = 'uploadFileInputCge'
            }
            var _this = this;
            $.ajaxFileUpload({
                url: '/clientMgmt/vipGrade/member/dataChange.ajax',
                type: 'POST',
                dataType: 'json',
                data: {
                    gradeId: this.viewChange.gradeId,
                    gradeName: this.viewChange.gradeName,
                    seqNo: this.viewChange.seqNo,
                    wealthStr: this.viewChange.wealthStr,
                    wealthEnd: this.viewChange.wealthEnd,
                    remark: this.viewChange.remark,
                    status: this.viewChange.status,
                    gradeCode: this.viewChange.gradeCode,
                    backgroundImage: this.viewChange.backgroundImage,
                    progressColor: this.viewChange.progressColor,
                    gradeDescColor: this.viewChange.gradeDescColor,
                },
                secureuri: false,
                fileElementId: fileElementId,
                success: function (result) {
                    console.log(result)
                    if (result.error == 0) {
                        _this.showDialog('changeNotice', 'info', false, result.msg)
                        _this.getTableData(0)
                        _this.anew = false;
                        _this.backgroundImage = ''
                        if (_this.viewChange.backgroundImage != _this.oldPath) {
                            $.post({ //修改成功时移动文件到del
                                url: '/clientMgmt/vipGrade/member/del.ajax',
                                data: {
                                    oldPath: _this.oldPath
                                },
                                success: function (result) {
                                    if (result.error === 0) { } else { }
                                }
                            });
                        }
                        _this.oldPath = ''

                    } else {
                        _this.showDialog('changeNotice', 'info', true, result.msg)
                    }
                }
            });
        },
        queryData: function () {
            var params = {};
            var _this = this;
            params.pageNo = 1;
            params.gradeId = this.queryId;
            params.cutionPointKey = this.queryKey;
            params.pageSize = this.pageMaxNum;
            $.post({
                url: '/clientMgmt/vipGrade/member/getList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.tableData = result.data.rows;
                        _this.currentIndex = result.data.pageNum - 1;
                        _this.totalPage = result.data.pages;
                        _this.userName = result.data.userName;
                        console.log(result)
                    } else {
                        _this.tableData = [];
                        _this.currentIndex = 0;
                        _this.totalPage = 0;
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        lookPrivilege: function (id) {
            var _this = this
            this.addGradeId = id
            _this.privilegeAll.forEach(function (item, ind) {
                item.checked = false
            })
            $.post({
                url: '/clientMgmt/vipGrade/member/gradeList.ajax',
                data: {
                    gradeId: id
                },
                success: function (result) {
                    if (result.error === 0) {
                        if (result.data.length == 0) {
                            _this.GradeIdListStatus = false;
                        } else {
                            _this.privilegeAll.forEach(function (item, ind) {
                                result.data.forEach(function (inItem) {
                                    if (item.privilegeId == inItem.privilegeId) {
                                        item.checked = true
                                    }
                                })
                            })
                            _this.GradeIdListStatus = true;
                        }

                    } else {
                        _this.showDialog('privilegeDialog', 'info', true, result.msg);
                    }
                }
            });

            _this.showDialog('', 'privilegeDialog', false)

        },
        addGradeIdList: function () {

            var params = {
                list: []
            };
            var _this = this;
            this.privilegeAll.forEach(function (item, ind) {
                if (item.checked) {
                    params.list.push({
                        gradeId: _this.addGradeId,
                        privilegeId: item.privilegeId
                    })
                }
            })
            if (params.list.length === 0) {
                params.list.push({
                    gradeId: _this.addGradeId,
                    privilegeId: ''
                })
            }
            var url = '/clientMgmt/vipGrade/member/addGradeIdList.ajax';
            if (this.GradeIdListStatus) {
                url = '/clientMgmt/vipGrade/member/updateGradeIdList.ajax';
            }
            params.list = JSON.stringify(params.list)
            $.post({
                url: url,
                data: params,
                // traditional: true,
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('privilegeDialog', 'info', false, result.msg);
                    } else {

                        _this.showDialog('privilegeDialog', 'info', true, result.msg);
                    }
                }
            });
        }
    }
});