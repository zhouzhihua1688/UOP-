new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        tableData: [],
        diaMsg: '',
        groupId: '',
        reportIds: 'ALL', //查询所有组合报告信息用
        groupList: [],
        deleteId: '',
        loadingShow: false,
        // 录入弹窗数据
        dialog_reportName: '',
        dialog_reportUrl: '',
        // 关联弹窗数据
        reportId: '',
        // relate_groupId: '',
        relate_groupId: [],
        // 编辑信息弹窗数据
        operate: {
            reportId: '',
            reportName: '',
            groupname: '',
            periodType: '1',		// 报告周期类型
            reportPeriod: '',		// 报告周期
            reportStart: '',		// 披露开始日期
            reportEnd: '',			// 披露截止日期
            executionReport: '',    // 交易执行报告
            majorEvents: '',        // 当期重大事项
            marketAnalysis: '',     // 当期市场分析
            operationDesc: '',      // 当期运作情况
            marketProspect: ''      // 市场展望
        },
        // 留痕展示数据
        recordData:'',
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10,
        condition: ''
    },
    mounted: function () {
        var dialogs = ['info', 'add', 'relation', 'del', 'uploadFile'];
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
        // var arr = ['fundGroupsList', 'fundRelations'];
        var arr = ['fundGroupsList'];
        arr.forEach(function (id) {
            $('#' + id).chosen({
                search_contains: true,
                no_results_text: '未找到基金组合',
                disable_search_threshold: 6,
                width: '200px'
            });
        });
        $('#fundGroupsList').on('change', function (e, params) {
            _this.groupId = params ? params.selected : '';
        });
        $('#fundRelations').on('change', function (e, params) {
            _this.relate_groupId = params ? params.selected : '';
        });
        $('#uploadBtn').click(function () {
            $('#uploadFileInput').click();
        });

        //关联多选
        var selected = [];
        $('#fundRelations').multiselect({
            buttonWidth: '175px',
            maxHeight: 300,
            enableFiltering: true,
            enableHTML: true,
            // includeSelectAllOption: true,//全选
            // selectAllText: '全选',//全选的checkbox名称
            nonSelectedText: '请选择',
            selectAllNumber: false,//true显示allselect（6）,false显示allselect
            selectAllName: 'select-all-name',
            selectAllValue: 'select-all-value',//可以为strig或者数字
            selectAllJustVisible: false,//选择所有的。true为全选可见的
            buttonClass: 'btn btn-white btn-primary',
            buttonText: function (options, select) {
                var once = [];
                $('#fundRelations option:selected').each(function () {
                    once.push($(this).attr('label'));
                    // once.push($(this).attr('value'));
                });
                // console.log(options.length);
                // console.log(options.prevObject.length);
                if (options.length === 0) {
                    return this.nonSelectedText;
                } else if (options.length === 1) {
                    return once[0];
                } else if (options.length > 1) {
                    return '已选' + once.length
                }
            },
            templates: {
                button: '<button type="button" class="multiselect dropdown-toggle" data-toggle="dropdown"><span class="multiselect-selected-text"></span> &nbsp;<b class="fa fa-caret-down"></b></button>',
                ul: '<ul class="multiselect-container dropdown-menu"></ul>',
                filter: '<li class="multiselect-item filter"><div class="input-group"><span class="input-group-addon"><i class="fa fa-search"></i></span><input class="form-control multiselect-search" type="text"></div></li>',
                filterClearBtn: '<span class="input-group-btn"><button class="btn btn-default btn-white btn-grey multiselect-clear-filter" type="button"><i class="fa fa-times-circle red2"></i></button></span>',
                li: '<li><a tabindex="0"><label></label></a></li>',
                divider: '<li class="multiselect-item divider"></li>',
                liGroup: '<li class="multiselect-item multiselect-group"><label></label></li>'
            },
            onDropdownHide: function (event) {
                selected = [];
                $('#fundRelations option:selected').each(function () {
                    selected.push($(this).val());
                });
                // console.log(selected,'selected');
                _this.relate_groupId = $("#fundRelations").val() ? $("#fundRelations").val() : [];
            },
            onDropdownShown: function () {
                selected = [];
                $('#fundRelations option:selected').each(function () {
                    selected.push($(this).val());
                    // selected.push($("#acceptMode").val())
                });
                _this.relate_groupId = $("#fundRelations").val() ? $("#fundRelations").val() : [];
                console.log("===", _this.relate_groupId)
            }
        });

        this.getFundGroupList();
        this.getTableData(0);
    },
    computed: {
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
        }
    },
    watch: {
        // 假分页
        pageMaxNum: {
            handler: function (val, oldval) {
                this.currentIndex = 0;
            }
        },
        condition: {
            handler: function (val, oldval) {
                this.currentIndex = 0;
            }
        }
    },
    methods: {
        // 获取基金组合列表
        getFundGroupList: function () {
            var _this = this;
            $.post({
                url: '/investmentMgmt/investmentInformationDisclosure/reportMgmt/fundGroups.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        _this.groupList = result.data;
                        _this.groupList.sort((a,b)=>a.groupId.replace('A','')-b.groupId.replace('A',''));
                        var str = '';
                        result.data.forEach(function (item) {
                            str += '<option value="' + item.groupId + '">' + item.groupId + '-' + item.groupName + '</option>';
                        });
                        $('#fundRelations').html(str);
                        $("#fundRelations").trigger("chosen:updated");
                        str = '<option value="">全部</option>' + str;
                        $('#fundGroupsList').html(str);
                        $("#fundGroupsList").trigger("chosen:updated");

                        _this.dataSummary2(_this.groupList, 'value', 'label', 'fundRelations', 'this.relate_groupId');
                    }
                }
            });
        },
        // 查询表格报告数据
        getTableData: function (currentIndex) {
            var _this = this;
            var params = {};
            this.currentIndex = 0;
            params.groupId = this.groupId;
            params.reportId = this.reportIds;
            $.post({
                url: '/investmentMgmt/investmentInformationDisclosure/reportMgmt/getTableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        // _this.currentIndex = 0;
                        _this.tableData = result.data
                    } else {
                        _this.tableData = [];
                        _this.currentIndex = 0;
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });

            // else{
            //     $.post({
            //         url: '/investmentMgmt/investmentInformationDisclosure/reportMgmt/getTableData.ajax',
            //         data: params,
            //         success: function(result) {
            //             if (result.error === 0) {
            //                 _this.currentIndex = 0;
            //                 _this.tableData=result.data.filter(function(item){
            //                      item.fundGroupList.forEach(function(itemGroupId){
            //                      return	itemGroupId.groupid.indexOf(params.groupId) > -1;
            //
            // 					})
            // 				})
            //                 console.log( _this.tableData)
            //             } else {
            //                 _this.tableData = [];
            //                 _this.currentIndex = 0;
            //                 _this.showDialog('', 'info', false, result.msg);
            //             }
            //         }
            //     });
            // }
        },
        // 展示录入弹窗
        showAdd: function () {
            this.dialog_reportName = '';
            this.dialog_reportUrl = '';
            this.showDialog('', 'add', false);
        },
        checkAddDialog: function () {
            if (!this.dialog_reportName) {
                this.showDialog('add', 'info', true, '未填写报告名称');
                return false;
            }
            return true;
        },
        saveParam: function () {
            if (!this.checkAddDialog()) {
                return;
            }
            var _this = this;
            var params = {}
            params.reportName = this.dialog_reportName;
            params.reportUrl = this.dialog_reportUrl;
            $.post({
                url: '/investmentMgmt/investmentInformationDisclosure/reportMgmt/saveParam.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData();
                        _this.showDialog('add', 'info', false, result.msg);
                    } else {
                        _this.showDialog('add', 'info', true, result.msg);
                    }
                }
            });
        },
        // 文件上传
        uploadFile: function () {
            $('#uploadFileInput').change(function () {
                $('#uploadInput').val($(this).val());
            });
            $('#uploadInput').val('');
            $('#uploadFileInput').val('');
            this.showDialog('', 'uploadFile');
        },
        fileUpload: function () {
            var excelData = $('#uploadFileInput').get(0).files[0];
            if (!excelData) {
                this.showDialog('uploadFile', 'info', true, '未选择文件');
                return;
            }
            var fileType = excelData.name.split('.')[excelData.name.split('.').length - 1];
            if (fileType !== 'pdf') {
                this.showDialog('uploadFile', 'info', true, '上传文件格式错误,请上传.pdf文件');
                return;
            }
            var _this = this;
            this.showDialog('uploadFile', '');
            this.loadingShow = true;
            var file = document.getElementById('uploadFileInput');
            var formdata = new FormData();
            formdata.append('file', file.files[0]);
            $.post({
                url: '/investmentMgmt/investmentInformationDisclosure/reportMgmt/upload.ajax',
                cache: false,
                data: formdata,
                processData: false,
                contentType: false,
            }).done(function (result) {
                _this.loadingShow = false;
                _this.getTableData();
                _this.showDialog('', 'info', false, result.msg);
            }).fail(function (err) {
                _this.showDialog('', 'info', false, '上传失败');
            });
        },
        // 下载
        exportFile: function (item) {
            var url = '/investmentMgmt/investmentInformationDisclosure/reportMgmt/exportFile.ajax?reportName=' + encodeURIComponent(item.reportName);
            window.location.href = url;
        },
        // 删除
        showDelete: function (item) {
            this.deleteId = item.reportId;
            this.recordData = item.reportName;
            this.showDialog('', 'del');
        },
        del: function () {
            var _this = this;
            var params = {};
            params.reportId = this.deleteId;
            params.reportName = this.recordData;
            $.post({
                url: '/investmentMgmt/investmentInformationDisclosure/reportMgmt/deleteParam.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData();
                        _this.showDialog('del', 'info', false, result.msg);
                    } else {
                        _this.showDialog('del', 'info', true, result.msg);
                    }
                }
            });
        },
        // 关联
        showRelation: function (item) {
            var _this = this;
            _this.relate_groupId = [];
            this.reportId = item.reportId;
            this.recordData = item.reportName;
            // this.relate_groupId = item.groupId ? item.groupId : '';
            // $('#fundRelations').val(item.groupId ? item.groupId : '');
            item.fundGroupList.forEach(function (itemGroupId) {
                _this.relate_groupId.push(itemGroupId.groupid)
            })
            _this.dataSummary2(_this.groupList, 'value', 'label', 'fundRelations', _this.relate_groupId);

            $("#fundRelations").trigger("chosen:updated"); // 清空基金组合选项
            this.showDialog('', 'relation');
        },
        // 关联确定
        relationParam: function () {
            if (!this.relate_groupId) {
                this.showDialog('relation', 'info', true, '未选择关联基金组合');
                return false;
            }
            var _this = this;
            var params = {}
            params.reportId = this.reportId;
            params.reportName = this.recordData;
            params.groupIdList = JSON.stringify(this.relate_groupId)
            console.log(params)
            $.post({
                url: '/investmentMgmt/investmentInformationDisclosure/reportMgmt/relationParam.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        setTimeout(function () {
                            _this.getTableData(0);
                        }, 2000)

                    }
                    _this.showDialog('relation', 'info', false, result.msg);
                }
            });
        },
        //关联多选
        dataSummary2: function (asynData, value, label, dom, relate_groupId) {
            var _this = this;
            if (asynData && asynData.length > 0) {
                var data = [];
                var Arrcode = []
                for (var i = 0; i < asynData.length; i++) {
                    Arrcode.push(asynData[i].groupId)
                    for (var j = 0; j < relate_groupId.length; j++) {
                        if (Arrcode[i] == relate_groupId[j]) {
                            data.push({
                                value: asynData[i].groupId,
                                label: asynData[i].groupId + "-" + asynData[i].groupName,
                                selected: true,
                            })
                            break;
                        }
                    }
                    data.push({
                        value: asynData[i].groupId,
                        label: asynData[i].groupId + "-" + asynData[i].groupName
                    });
                }
                // 排除重复的数据
                var hash = {};
                data = data.reduce(function (item, next) {
                    hash[next.value] ? '' : hash[next.value] = true && item.push(next);
                    return item
                }, [])
                $("#" + dom).multiselect('dataprovider', data);
            }
        },
        showOperate: function (item) {
            $.post({
                url: '/investmentMgmt/investmentInformationDisclosure/reportMgmt/getReportInfo.ajax',
                data: {reportId: item.reportId},
                success: function (result) {
                    if (result.error === 0) {
                        this.operate.reportId = item.reportId;
                        this.operate.reportName = item.reportName;
                        this.operate.groupname = item.fundGroupList.map(function (listItem) {
                            return listItem.groupname;
                        }).join('|');
                        this.operate.periodType = result.data ? result.data.periodType : '1';			// 报告周期类型
                        this.operate.reportPeriod = result.data ? result.data.reportPeriod : '';			// 报告周期
                        this.operate.reportStart = result.data ? result.data.reportStart.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') : '';			// 披露开始日期
                        this.operate.reportEnd = result.data ? result.data.reportEnd.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') : '';			// 披露截止日期
                        this.operate.executionReport = result.data ? result.data.executionReport : '';      // 交易执行报告
                        this.operate.majorEvents = result.data ? result.data.majorEvents : '';          // 当期重大事项
                        this.operate.marketAnalysis = result.data ? result.data.marketAnalysis : '';       // 当期市场分析
                        this.operate.operationDesc = result.data ? result.data.operationDesc : '';        // 当期运作情况
                        this.operate.marketProspect = result.data ? result.data.marketProspect : '';       // 市场展望
                        this.showDialog('', 'operate');
                    } else {
                        this.showDialog('', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },
        saveReportInfo: function(){
            $.post({
                url: '/investmentMgmt/investmentInformationDisclosure/reportMgmt/saveReportInfo.ajax',
                data: {
                    reportId: this.operate.reportId,
                    periodType: this.operate.periodType,
                    reportPeriod: this.operate.reportPeriod,
                    reportStart: this.operate.reportStart.replace(/-/g,''),
                    reportEnd: this.operate.reportEnd.replace(/-/g,''),
                    executionReport: this.operate.executionReport,
                    majorEvents: this.operate.majorEvents,
                    marketAnalysis: this.operate.marketAnalysis,
                    operationDesc: this.operate.operationDesc,
                    marketProspect: this.operate.marketProspect,
                    reportName : this.operate.reportName
                },
                success: function (result) {
                    if (result.error === 0) {
                        this.showDialog('operate', 'info', false, '修改成功');
                    } else {
                        this.showDialog('operate', 'info', true, result.msg);
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
        }
    },
    components: {
        'date-picker': VueBootstrapDatetimePicker
    }
});
