var vm = new Vue({
    el: '#content',
    data: {
        // 公共数据
        diaMsg: '',
        // 基金多选
        fundList:[],
        // 优先级
        priority:'',
        // 服务端相关数据
        service: {
            // 查询条件
            product: '',
            tradeType: '',
            tradeTypeList: [],
			oproduct: '',
            channel: '',
            channelList: [],
            // 弹窗数据
            dialog_isUpdate: true,
            dialog_updateId: '',
            dialog_product: '',
            dialog_custType: ['*'],
            dialog_custTypeList: [],
            dialog_tradeType: '',
            dialog_tradeTypeList: [],
            dialog_branchCode: '',
            dialog_branchCodeList: [],
            dialog_channel: '',
            dialog_channelList: [],
            dialog_bankNo: '',
            dialog_oproduct: '',
            dialog_displayDiscount: '',
            dialog_tradeDiscount: '',
            dialog_startAmount: '',
            dialog_endAmount: '',
            dialog_remark: '',
            itemData: '',
            // 表格数据
            tableData: [],
            pageMaxNum: 10,
            currentIndex: 0,
            maxSpace: 2
        },
        // 本地相关数据
        local: {
            // 查询条件
            product: '',
            tradeType: '',
            tradeTypeList: [],
			oproduct: '',
            channel: '',
            channelList: [],
            operate: '',
            status: '',
            // 弹窗数据
            dialog_isCheck: true,
            dialog_isUpdate: false,
            dialog_updateId: '',
            dialog_product: '',
            dialog_custType: ['*'],
            dialog_custTypeList: [],
            dialog_tradeType: '',
            dialog_tradeTypeList: [],
            dialog_branchCode: '*',
            dialog_branchCodeList: [],
            // dialog_channel: '*',//原来的单选
            dialog_channel:["*"],
            dialog_channelList: [],
            dialog_bankNo: '',
            dialog_oproduct: '',
            dialog_displayDiscount: '',
            dialog_tradeDiscount: '',
            dialog_startAmount: '',
            dialog_endAmount: '',
            dialog_remark: '',
            // 重新提交弹窗
            submitAgain_product: '',
            submitAgain_custType: ['*'],
            submitAgain_tradeType: '',
            submitAgain_branchCode: '',
            submitAgain_channel: '',
            submitAgain_bankNo: '',
            submitAgain_oproduct: '',
            submitAgain_displayDiscount: '',
            submitAgain_tradeDiscount: '',
            submitAgain_startAmount: '',
            submitAgain_endAmount: '',
            submitAgain_remark: '',
            // 列表数据
            itemData: '',
            tableData: [],
            pageMaxNum: 10,
            currentIndex: 0,
            maxSpace: 2
        }
    },
    mounted: function () {
        var dialogs = ['info', 'addLocal', 'localRevert', 'localSubmit', 'serviceToLocalDelete', 'serviceToLocalUpdate', 'submitAgainOperate', 'submitAgainDelete', 'updateLocal'];
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
        $('.date-timepicker').datetimepicker({
            format: 'YYYY-MM-DD HH:mm:ss',//use this option to display seconds
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
        // 基金多选
        var selected = [];
        $('#fundList').multiselect({
            buttonWidth: '164px',
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
                $('#fundList option:selected').each(function () {
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
                $('#fundList option:selected').each(function () {
                    selected.push($(this).val());
                });
                // console.log(selected,'selected');
                _this.fundList = $("#fundList").val() ? $("#fundList").val() : [];
            }
        });
        var fundArr = ['fundList_local', 'oFundList_local', 'fundList_service', 'fundList_local_dialog', 'oFundList_service'];
        fundArr.forEach(function (value) {
            $('#' + value).chosen({
                search_contains: true,
                no_results_text: '未找到相关基金信息',
                disable_search_threshold: 6,
                width: '170px'
            });
        });
        var _this = this;
        $('#fundList_local').on('change', function (e, params) {
            _this.local.product = params ? params.selected : '';
        });
		$('#oFundList_local').on('change', function (e, params) {
		    _this.local.oproduct = params ? params.selected : '';
		});
        $('#fundList_service').on('change', function (e, params) {
            _this.service.product = params ? params.selected : '';
        });
		$('#oFundList_service').on('change', function (e, params) {
		    _this.service.oproduct = params ? params.selected : '';
		});
        $('#fundList_local_dialog').on('change', function (e, params) {
            _this.local.dialog_product = params ? params.selected : '';
        });
        this.getDialogList(); // 获取弹窗所需列表
        this.searchLocal(); // 获取全部本地数据
        this.searchService(); // 获取服务端数据
    },
    computed: {
        //服务端表格分页
        middleData_service: function () {
            var pageMaxNum = parseInt(this.service.pageMaxNum);
            var tableData = this.service.tableData;
            var middleData = [];
            if (tableData.length <= pageMaxNum) {
                middleData.push(tableData);
                return middleData;
            }
            var i = 0;
            while ((i + 1) * pageMaxNum < tableData.length) {
                middleData.push(tableData.slice(i * pageMaxNum, (i + 1) * pageMaxNum));
                i++;
            }
            middleData.push(tableData.slice(i * pageMaxNum, tableData.length));
            return middleData;
        },
        viewData_service: function () {
            var currentIndex = parseInt(this.service.currentIndex);
            return this.middleData_service[currentIndex];
        },
        pageList_service: function () {
            var middleData = this.middleData_service;
            var currentIndex = this.service.currentIndex;
            var maxSpace = this.service.maxSpace;
            var arr = [];
            if (middleData.length <= 2 * maxSpace) {
                for (var i = 0; i < middleData.length; i++) {
                    arr.push(i + 1);
                }
                return arr;
            }
            if (currentIndex > maxSpace && middleData.length - currentIndex > maxSpace) {
                for (var i = currentIndex - maxSpace; i < currentIndex + maxSpace; i++) {
                    arr.push(i + 1);
                }
            } else if (currentIndex <= maxSpace && middleData.length - currentIndex > maxSpace) {
                for (var i = 0; i < currentIndex + (2 * maxSpace - currentIndex); i++) {
                    arr.push(i + 1);
                }
            } else if (currentIndex > maxSpace && middleData.length - currentIndex <= maxSpace) {
                var space = middleData.length - currentIndex;
                for (var i = currentIndex - (2 * maxSpace - space); i < middleData.length; i++) {
                    arr.push(i + 1);
                }
            } else {
                for (var i = 0; i < middleData.length; i++) {
                    arr.push(i + 1);
                }
            }
            return arr;
        },
        //本地表格分页
        middleData_local: function () {
            var pageMaxNum = parseInt(this.local.pageMaxNum);
            var tableData = this.local.tableData;
            var middleData = [];
            if (tableData.length <= pageMaxNum) {
                middleData.push(tableData);
                return middleData;
            }
            var i = 0;
            while ((i + 1) * pageMaxNum < tableData.length) {
                middleData.push(tableData.slice(i * pageMaxNum, (i + 1) * pageMaxNum));
                i++;
            }
            middleData.push(tableData.slice(i * pageMaxNum, tableData.length));
            return middleData;
        },
        viewData_local: function () {
            var currentIndex = parseInt(this.local.currentIndex);
            return this.middleData_local[currentIndex];
        },
        pageList_local: function () {
            var middleData = this.middleData_local;
            var currentIndex = this.local.currentIndex;
            var maxSpace = this.local.maxSpace;
            var arr = [];
            if (middleData.length <= 2 * maxSpace) {
                for (var i = 0; i < middleData.length; i++) {
                    arr.push(i + 1);
                }
                return arr;
            }
            if (currentIndex > maxSpace && middleData.length - currentIndex > maxSpace) {
                for (var i = currentIndex - maxSpace; i < currentIndex + maxSpace; i++) {
                    arr.push(i + 1);
                }
            } else if (currentIndex <= maxSpace && middleData.length - currentIndex > maxSpace) {
                for (var i = 0; i < currentIndex + (2 * maxSpace - currentIndex); i++) {
                    arr.push(i + 1);
                }
            } else if (currentIndex > maxSpace && middleData.length - currentIndex <= maxSpace) {
                var space = middleData.length - currentIndex;
                for (var i = currentIndex - (2 * maxSpace - space); i < middleData.length; i++) {
                    arr.push(i + 1);
                }
            } else {
                for (var i = 0; i < middleData.length; i++) {
                    arr.push(i + 1);
                }
            }
            return arr;
        }
    },
    watch: {
        'service.pageMaxNum': function () {
            this.service.currentIndex = 0;
        },
        'local.pageMaxNum': function () {
            this.local.currentIndex = 0;
        }
    },
    methods: {
        getDialogList: function () {
            var _this = this;
            $.post({
                url: '/businessMgmt/businessParamConfigOC/discountHandle/getDialogList.ajax',
                success: function (result) {
                    if (result.error == 0) {
                        _this.service.tradeTypeList = result.data.tradeTypeList;
                        _this.service.channelList = result.data.channelList;
                        _this.service.dialog_custTypeList = result.data.custTypeList;
                        _this.service.dialog_tradeTypeList = result.data.tradeTypeList;
                        _this.service.dialog_branchCodeList = result.data.branchCodeList;
                        _this.service.dialog_channelList = result.data.channelList;
                        _this.local.tradeTypeList = result.data.tradeTypeList;
                        _this.local.channelList = result.data.channelList;
                        _this.local.dialog_custTypeList = result.data.custTypeList;
                        _this.local.dialog_tradeTypeList = result.data.tradeTypeList;
                        _this.local.dialog_branchCodeList = result.data.branchCodeList;
                        _this.local.dialog_channelList = result.data.channelList;

                        // 基金多选条件
                        var fundList=result.data.fundList
                        _this.dataSummary(fundList, 'value', 'label', 'fundList');

                        var str = '';
                        result.data.fundList.forEach(function (item) {
                            str += '<option value="' + item.fundId + '">' + item.fundId + ' ' + item.fundName + '</option>';
                        });
                        var fundArrBesideAll = ['fundList_local_dialog'];
                        fundArrBesideAll.forEach(function (value) {
                            $('#' + value).html(str);
                            $('#' + value).trigger('chosen:updated');
                        });
                        var fundArr = ['fundList_local', 'oFundList_local', 'fundList_service', 'oFundList_service'];
                        fundArr.forEach(function (value) {
                            $('#' + value).html('<option value="">全部</option>'+'<option value="*">*默认缺省值</option>' + str);
                            $('#' + value).trigger('chosen:updated');
                        });
                        var custKeys = _this.local.dialog_custTypeList.map(function (item) {
                            return item.key;
                        });
                        _this.local.dialog_custType = ['*'].concat(custKeys);

                    }
                }
            });
        },
        searchService: function () {
            var _this = this;
            var params = {};
            params.product = this.service.product;
            params.tradeType = this.service.tradeType;
            this.service.tradeType == '05' && (params.oproduct = this.service.oproduct);
            params.channel = this.service.channel;
            $.post({
                url: '/businessMgmt/businessParamConfigOC/discountHandle/getServiceList.ajax',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        _this.service.currentIndex = 0;
                        _this.service.tableData = result.data;
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        serviceCheckDialog: function (item) {
            this.service.dialog_isUpdate = false;
            this.service.dialog_updateId = '';
            this.service.dialog_product = item.product;
            this.service.dialog_custType = item.custType.split(',');
            this.service.dialog_tradeType = item.tradeType;
            this.service.dialog_branchCode = item.branchCode;
            this.service.dialog_channel = item.channel;
            this.service.dialog_bankNo = item.bankNo;
            this.service.dialog_oproduct = item.oproduct;
            this.service.dialog_displayDiscount = item.displayDiscount;
            this.service.dialog_tradeDiscount = item.tradeDiscount;
            $('#startTime_service').val(item.startTime);
            $('#endTime_service').val(item.endTime);
            this.service.dialog_startAmount = item.startAmount;
            this.service.dialog_endAmount = item.endAmount;
            this.service.dialog_remark = item.remark;
            this.priority=item.priority
            this.showDialog('', 'serviceToLocalUpdate');
        },
        showServiceToLocalUpdate: function (item) {
            this.service.dialog_isUpdate = true;
            this.service.dialog_updateId = item.id;
            this.service.dialog_product = item.product;
            this.service.dialog_custType = item.custType.split(',');
            this.service.dialog_tradeType = item.tradeType;
            this.service.dialog_branchCode = item.branchCode;
            this.service.dialog_channel = item.channel;
            this.service.dialog_bankNo = item.bankNo;
            this.service.dialog_oproduct = item.oproduct;
            this.service.dialog_displayDiscount = item.displayDiscount;
            this.service.dialog_tradeDiscount = item.tradeDiscount;
            $('#startTime_service').val(item.startTime);
            $('#endTime_service').val(item.endTime);
            this.service.dialog_startAmount = item.startAmount;
            this.service.dialog_endAmount = item.endAmount;
            this.service.dialog_remark = item.remark;
            this.priority=item.priority
            this.showDialog('', 'serviceToLocalUpdate');
        },
        serviceToLocalUpdateCheck: function () {
            if (isNaN(Number(this.service.dialog_displayDiscount)) || this.service.dialog_displayDiscount < 0 || this.service.dialog_displayDiscount > 1 || this.service.dialog_displayDiscount === '') {
                this.showDialog('serviceToLocalUpdate', 'info', true, '未填写展示折扣或填写格式有误');
                return false;
            }
            if (isNaN(Number(this.service.dialog_tradeDiscount)) || this.service.dialog_tradeDiscount < 0 || this.service.dialog_tradeDiscount > 1 || this.service.dialog_tradeDiscount === '') {
                this.showDialog('serviceToLocalUpdate', 'info', true, '未填写交易折扣或填写格式有误');
                return false;
            }
            if (!$('#startTime_service').val()) {
                this.showDialog('serviceToLocalUpdate', 'info', true, '未填写开始时间');
                return false;
            }
            if (!$('#endTime_service').val()) {
                this.showDialog('serviceToLocalUpdate', 'info', true, '未填写结束时间');
                return false;
            }
            if (isNaN(Number(this.service.dialog_startAmount)) || this.service.dialog_startAmount === '' || !/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/.test(this.service.dialog_startAmount)) {
                this.showDialog('serviceToLocalUpdate', 'info', true, '未填写起始金额或填写格式有误');
                return false;
            }
            if (isNaN(Number(this.service.dialog_endAmount)) || this.service.dialog_endAmount === '' || !/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/.test(this.service.dialog_endAmount)) {
                this.showDialog('serviceToLocalUpdate', 'info', true, '未填写结束金额或填写格式有误');
                return false;
            }
            return true;
        },
        serviceToLocalUpdate: function () {
            if (!this.serviceToLocalUpdateCheck()) {
                return;
            }
            var _this = this;
            var content = {
                product: this.service.dialog_product,
                custType: this.service.dialog_custType.join(','),
                tradeType: this.service.dialog_tradeType,
                branchCode: this.service.dialog_branchCode,
                channel: this.service.dialog_channel,
                bankNo: this.service.dialog_bankNo,
                oproduct: this.service.dialog_oproduct,
                displayDiscount: this.service.dialog_displayDiscount,
                tradeDiscount: this.service.dialog_tradeDiscount,
                startTime: $('#startTime_service').val(),
                endTime: $('#endTime_service').val(),
                startAmount: this.service.dialog_startAmount,
                endAmount: this.service.dialog_endAmount,
                remark: this.service.dialog_remark,
                 priority:this.priority
            };
            var service_id = this.service.dialog_updateId;
            $.post({
                url: '/businessMgmt/businessParamConfigOC/discountHandle/serviceToLocalUpdate.ajax',
                data: {
                    service_id: service_id,
                    content: JSON.stringify(content)
                },
                success: function (result) {
                    if (result.error == 0) {
                        _this.showDialog('serviceToLocalUpdate', 'info', false, '已提交至经办数据');
                        _this.searchLocal();
                    }
                    else {
                        _this.showDialog('serviceToLocalUpdate', 'info', false, result.msg);
                    }
                }
            });
        },
        showServiceToLocalDelete: function (item) {
            this.service.itemData = JSON.stringify(item);
            this.showDialog('', 'serviceToLocalDelete');
        },
        serviceToLocalDelete: function () {
            var deleteData = JSON.parse(this.service.itemData);
            var content = {
                product: deleteData.product,
                custType: deleteData.custType,
                tradeType: deleteData.tradeType,
                branchCode: deleteData.branchCode,
                channel: deleteData.channel,
                bankNo: deleteData.bankNo,
                oproduct: deleteData.oproduct,
                displayDiscount: deleteData.displayDiscount,
                tradeDiscount: deleteData.tradeDiscount,
                startTime: deleteData.startTime,
                endTime: deleteData.endTime,
                startAmount: deleteData.startAmount,
                endAmount: deleteData.endAmount,
                remark: deleteData.remark
            };
            var service_id = deleteData.id;
            var _this = this;
            $.post({
                url: '/businessMgmt/businessParamConfigOC/discountHandle/serviceToLocalDelete.ajax',
                data: {
                    service_id: service_id,
                    content: JSON.stringify(content)
                },
                success: function (result) {
                    if (result.error == 0) {
                        _this.showDialog('serviceToLocalDelete', 'info', false, '已提交至经办数据');
                        _this.searchLocal();
                    }
                    else {
                        _this.showDialog('serviceToLocalDelete', 'info', false, result.msg);
                    }
                }
            });
        },
        searchLocal: function () {
            var product = this.local.product;
            var tradeType = this.local.tradeType;
            var channel = this.local.channel;
            var operate = this.local.operate;
            var status = this.local.status;
            var _this = this;
            var params = {
                product: product,
                tradeType: tradeType,
                channel: channel,
                operate: operate,
                status: status
            };
			this.local.tradeType == '05' && (params.oproduct = this.local.oproduct);
            $.post({
                url: '/businessMgmt/businessParamConfigOC/discountHandle/getLocalList.ajax',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        _this.local.currentIndex = 0;
                        _this.local.tableData = result.data;
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        localCheckDialog: function (item) {
            this.local.dialog_isCheck = true;
            this.local.dialog_isUpdate = false;
            this.local.dialog_updateId = '';
            this.local.dialog_product = item.product;
            this.local.dialog_custType = item.custType.split(',');
            this.local.dialog_tradeType = item.tradeType;
            this.local.dialog_branchCode = item.branchCode;
            this.local.dialog_channel = item.channel;
            this.local.dialog_bankNo = item.bankNo;
            this.local.dialog_oproduct = item.oproduct;
            this.local.dialog_displayDiscount = item.displayDiscount;
            this.local.dialog_tradeDiscount = item.tradeDiscount;
            $('#startTime_local_update').val(item.startTime);
            $('#endTime_local_update').val(item.endTime);
            this.local.dialog_startAmount = item.startAmount;
            this.local.dialog_endAmount = item.endAmount;
            this.local.dialog_remark = item.remark_service;
            this.priority=item.priority;
            this.showDialog('', 'updateLocal');
        },
        showAddLocal: function () {
            this.local.dialog_isCheck = false;
            this.local.dialog_isUpdate = false;
            this.local.dialog_updateId = '';
            this.local.dialog_product = '';
            $('#fundList_local_dialog').val('');
            $('#fundList_local_dialog').trigger('chosen:updated');
            var custKeys = this.local.dialog_custTypeList.map(function (item) {
                return item.key;
            });
            this.local.dialog_custType = ['*'].concat(custKeys);
            this.local.dialog_channel =["2","7"];
            this.local.dialog_tradeType = '';
            this.local.dialog_branchCode = '*';
            // this.local.dialog_channel = '*';
            this.local.dialog_bankNo = '';
            this.local.dialog_oproduct = '';
            this.local.dialog_displayDiscount = 1;
            this.local.dialog_tradeDiscount = 1;
            $('#startTime_local').val('2000-01-01 00:00:00');
            $('#endTime_local').val('2099-12-31 23:59:59');
            this.local.dialog_startAmount = 0;
            this.local.dialog_endAmount = 9999999999.99;
            this.local.dialog_remark = '';
            this.priority=0;
            this.showDialog('', 'addLocal');
        },
        showLocalUpdate: function (item) {
            this.local.dialog_isCheck = false;
            this.local.dialog_isUpdate = true;
            this.local.dialog_updateId = item.local_id;
            this.local.dialog_product = item.product;
            this.local.dialog_custType = item.custType.split(',');
            this.local.dialog_tradeType = item.tradeType;
            this.local.dialog_branchCode = item.branchCode;
            this.local.dialog_channel = item.channel;
            this.local.dialog_bankNo = item.bankNo;
            this.local.dialog_oproduct = item.oproduct;
            this.local.dialog_displayDiscount = item.displayDiscount;
            this.local.dialog_tradeDiscount = item.tradeDiscount;
            $('#startTime_local_update').val(item.startTime);
            $('#endTime_local_update').val(item.endTime);
            this.local.dialog_startAmount = item.startAmount;
            this.local.dialog_endAmount = item.endAmount;
            this.local.dialog_remark = item.remark_service;
            this.priority=item.priority;
            this.local.itemData = JSON.stringify(item);
            this.showDialog('', 'updateLocal');
        },
        checkLocalAddDialog: function (dialog) {
            // if (!this.local.dialog_product) {
            //     this.showDialog(dialog, 'info', true, '未选择基金产品');
            //     return false;
            // }
            if (this.local.dialog_custType.length === 0) {
                this.showDialog(dialog, 'info', true, '未选择客户类型');
                return false;
            }
            if (!this.local.dialog_tradeType) {
                this.showDialog(dialog, 'info', true, '未填写交易类型');
                return false;
            }
            if (!this.local.dialog_channel) {
                this.showDialog(dialog, 'info', true, '未填写渠道');
                return false;
            }
            if (isNaN(Number(this.local.dialog_displayDiscount)) || this.local.dialog_displayDiscount < 0 || this.local.dialog_displayDiscount > 1 || this.local.dialog_displayDiscount === '') {
                this.showDialog(dialog, 'info', true, '未填写展示折扣或格式有误');
                return false;
            }
            if (isNaN(Number(this.local.dialog_tradeDiscount)) || this.local.dialog_tradeDiscount < 0 || this.local.dialog_tradeDiscount > 1 || this.local.dialog_tradeDiscount === '') {
                this.showDialog(dialog, 'info', true, '未填写交易折扣或格式有误');
                return false;
            }
            if (dialog === 'addLocal') {
                if (!$('#startTime_local').val()) {
                    this.showDialog(dialog, 'info', true, '未填写开始时间');
                    return false;
                }
                if (!$('#endTime_local').val()) {
                    this.showDialog(dialog, 'info', true, '未填写结束时间');
                    return false;
                }
            }
            if (dialog === 'updateLocal') {
                if (!$('#startTime_local_update').val()) {
                    this.showDialog(dialog, 'info', true, '未填写开始时间');
                    return false;
                }
                if (!$('#endTime_local_update').val()) {
                    this.showDialog(dialog, 'info', true, '未填写结束时间');
                    return false;
                }
            }
            if (isNaN(Number(this.local.dialog_startAmount)) || this.local.dialog_startAmount === '' || !/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/.test(this.local.dialog_startAmount)) {
                this.showDialog(dialog, 'info', true, '未填写起始金额或填写格式有误');
                return false;
            }
            if (isNaN(Number(this.local.dialog_endAmount)) || this.local.dialog_endAmount === '' || !/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/.test(this.local.dialog_endAmount)) {
                this.showDialog(dialog, 'info', true, '未填写结束金额或填写格式有误');
                return false;
            }
            return true;
        },
        addLocal: function () {
            if (!this.checkLocalAddDialog('addLocal')) {
                return;
            }
            this.local.dialog_product=this.fundList.join()
            if (!this.local.dialog_product) {
                this.showDialog('addLocal', 'info', true, '未选择基金产品');
                return false;
            }
            var custType = this.local.dialog_custType.indexOf('*') > -1 ? '*' : this.local.dialog_custType.join(',');
            var channel= this.local.dialog_channel.indexOf('*') > -1 ? '*' : this.local.dialog_channel.join(',');

            this.local.dialog_product=this.fundList.join()
            var content = {
                product: this.local.dialog_product,
                custType: custType,
                tradeType: this.local.dialog_tradeType,
                branchCode: this.local.dialog_branchCode,
                channel:channel,
                bankNo: this.local.dialog_bankNo,
                oproduct: this.local.dialog_oproduct,
                displayDiscount: this.local.dialog_displayDiscount,
                tradeDiscount: this.local.dialog_tradeDiscount,
                startTime: $('#startTime_local').val(),
                endTime: $('#endTime_local').val(),
                startAmount: this.local.dialog_startAmount,
                endAmount: this.local.dialog_endAmount,
                remark: this.local.dialog_remark,
                priority:this.priority,  //新增的优先级,
            };
            var params = {};
            params.content = JSON.stringify(content);
            console.log(params)
            var url = '/businessMgmt/businessParamConfigOC/discountHandle/addLocalData.ajax';
            var _this = this;
            $.post({
                url: url,
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        _this.showDialog('addLocal', 'info', false, '操作成功');
                        _this.searchLocal();
                    }
                    else {
                        _this.showDialog('addLocal', 'info', true, result.msg);
                    }
                }
            });
        },
        updateLocal: function () {
            if (!this.checkLocalAddDialog('updateLocal')) {
                return;
            }
            var content = {
                product: this.local.dialog_product,
                custType: this.local.dialog_custType.join(','),
                tradeType: this.local.dialog_tradeType,
                branchCode: this.local.dialog_branchCode,
                channel: this.local.dialog_channel,
                bankNo: this.local.dialog_bankNo,
                oproduct: this.local.dialog_oproduct,
                displayDiscount: this.local.dialog_displayDiscount,
                tradeDiscount: this.local.dialog_tradeDiscount,
                startTime: $('#startTime_local_update').val(),
                endTime: $('#endTime_local_update').val(),
                startAmount: this.local.dialog_startAmount,
                endAmount: this.local.dialog_endAmount,
                remark: this.local.dialog_remark,
                priority:this.priority
            };
            var params = {};
            params.content = JSON.stringify(content);
            var url = '/businessMgmt/businessParamConfigOC/discountHandle/updateLocalData.ajax';
            params.local_id = this.local.dialog_updateId;
            params.updateTime = JSON.parse(this.local.itemData).updateTime;
            var _this = this;
            $.post({
                url: url,
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        _this.showDialog('updateLocal', 'info', false, '操作成功');
                        _this.searchLocal();
                    }
                    else {
                        _this.showDialog('updateLocal', 'info', true, result.msg);
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
                url: '/businessMgmt/businessParamConfigOC/discountHandle/revertLocalData.ajax',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        _this.showDialog('localRevert', 'info', false, '撤销成功');
                        _this.searchLocal();
                    }
                    else {
                        _this.showDialog('localRevert', 'info', false, result.msg);
                    }
                }
            });
        },
        showSubmitAgain: function (item) {
            this.local.itemData = JSON.stringify(item);
            this.local.submitAgain_product = item.product;
            this.local.submitAgain_custType = item.custType.split(',');
            this.local.submitAgain_tradeType = item.tradeType;
            this.local.submitAgain_branchCode = item.branchCode;
            this.local.submitAgain_channel = item.channel;
            this.local.submitAgain_bankNo = item.bankNo;
            this.local.submitAgain_oproduct = item.oproduct;
            this.local.submitAgain_displayDiscount = item.displayDiscount;
            this.local.submitAgain_tradeDiscount = item.tradeDiscount;
            $('#startTime_submit').val(item.startTime);
            $('#endTime_submit').val(item.endTime);
            this.local.submitAgain_startAmount = item.startAmount;
            this.local.submitAgain_endAmount = item.endAmount;
            this.local.submitAgain_remark = item.remark_service;
            this.priority=item.priority;
            if (item.operate == 3) {
                this.showDialog('', 'submitAgainDelete');
                return;
            }
            this.showDialog('', 'submitAgainOperate');
        },
        checkLocalSubmitDialog: function () {
            if (!this.local.submitAgain_tradeType) {
                this.showDialog('submitAgainOperate', 'info', true, '未填写交易类型');
                return false;
            }
            if (!this.local.submitAgain_channel) {
                this.showDialog('submitAgainOperate', 'info', true, '未填写渠道');
                return false;
            }
            if (isNaN(Number(this.local.submitAgain_displayDiscount || this.local.submitAgain_displayDiscount < 0 || this.local.submitAgain_displayDiscount > 1 || this.local.submitAgain_displayDiscount === ''))) {
                this.showDialog('submitAgainOperate', 'info', true, '未填写展示折扣或填写格式有误');
                return false;
            }
            if (isNaN(Number(this.local.submitAgain_tradeDiscount) || this.local.submitAgain_tradeDiscount < 0 || this.local.submitAgain_tradeDiscount > 1 || this.local.submitAgain_tradeDiscount === '')) {
                this.showDialog('submitAgainOperate', 'info', true, '未填写交易折扣或填写格式有误');
                return false;
            }
            if (!$('#startTime_submit').val()) {
                this.showDialog('submitAgainOperate', 'info', true, '未填写开始时间');
                return false;
            }
            if (!$('#endTime_submit').val()) {
                this.showDialog('submitAgainOperate', 'info', true, '未填写结束时间');
                return false;
            }
            if (isNaN(Number(this.local.submitAgain_startAmount) || this.local.submitAgain_startAmount === '') || !/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/.test(this.local.submitAgain_startAmount)) {
                this.showDialog('submitAgainOperate', 'info', true, '未填写起始金额或填写格式有误');
                return false;
            }
            if (isNaN(Number(this.local.submitAgain_endAmount) || this.local.submitAgain_endAmount === '') || !/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/.test(this.local.submitAgain_endAmount)) {
                this.showDialog('submitAgainOperate', 'info', true, '未填写结束金额或填写格式有误');
                return false;
            }
            return true;
        },
        submitAgain: function () {
            if (!this.checkLocalSubmitDialog()) {
                return;
            }
            var content = {
                product: this.local.submitAgain_product,
                custType: this.local.submitAgain_custType.join(','),
                tradeType: this.local.submitAgain_tradeType,
                branchCode: this.local.submitAgain_branchCode,
                channel: this.local.submitAgain_channel,
                bankNo: this.local.submitAgain_bankNo,
                oproduct: this.local.submitAgain_oproduct,
                displayDiscount: this.local.submitAgain_displayDiscount,
                tradeDiscount: this.local.submitAgain_tradeDiscount,
                startTime: $('#startTime_submit').val(),
                endTime: $('#endTime_submit').val(),
                startAmount: this.local.submitAgain_startAmount,
                endAmount: this.local.submitAgain_endAmount,
                remark: this.local.submitAgain_remark,
                priority:this.priority
            };
            var itemData = JSON.parse(this.local.itemData);
            var params = {};
            params.content = JSON.stringify(content);
            params.local_id = itemData.local_id;
            params.service_id = itemData.service_id;
            params.operate = itemData.operate;
            params.updateTime = itemData.updateTime;
            var _this = this;
            $.post({
                url: '/businessMgmt/businessParamConfigOC/discountHandle/submitLocalDataAgain.ajax',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        if (itemData.operate == 3) {
                            _this.showDialog('submitAgainDelete', 'info', false, '提交成功');
                        }
                        else {
                            _this.showDialog('submitAgainOperate', 'info', false, '提交成功');
                        }
                        _this.searchLocal();
                    }
                    else {
                        if (itemData.operate == 3) {
                            _this.showDialog('submitAgainDelete', 'info', false, '提交成功');
                        }
                        else {
                            _this.showDialog('submitAgainOperate', 'info', false, '提交成功');
                        }
                    }
                }
            });
        },
        setStartTime: function (value, type) {
            var str = $('#startTime_' + type).val();
            if (value === 'now') {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, this.getNowTime() + ' $4:$5:$6');
            }
            else if (value === 'future') {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '2099-12-31 $4:$5:$6' + '');
            }
            else if (value == 0) {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1-$2-$3 00:00:00');
            }
            else if (value == 9) {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1-$2-$3 09:00:00');
            }
            else if (value == 15) {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1-$2-$3 15:00:00');
            }
            $('#startTime_' + type).val(str);
        },
        setEndTime: function (value, type) {
            var str = $('#endTime_' + type).val();
            if (value === 'now') {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, this.getNowTime() + ' $4:$5:$6');
            }
            else if (value === 'future') {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '2099-12-31 $4:$5:$6' + '');
            }
            else if (value == 0) {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1-$2-$3 00:00:00');
            }
            else if (value == 9) {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1-$2-$3 09:00:00');
            }
            else if (value == 15) {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1-$2-$3 15:00:00');
            }
            $('#endTime_' + type).val(str);
        },
        getNowTime: function () {
            var d = new Date();
            var fixZero = function (num) {
                return num < 10 ? '0' + num : num;
            };
            return [d.getFullYear(), d.getMonth() + 1, d.getDate()].map(function (value) {
                return fixZero(value)
            }).join('-');
        },
        setCustType: function (key) {
            var custKeys = this.local.dialog_custTypeList.map(function (item) {
                return item.key;
            });
            if (key === '*') {
                if (this.local.dialog_custType.indexOf('*') > -1) {
                    this.local.dialog_custType = [];
                }
                else {
                    this.local.dialog_custType = ['*'].concat(custKeys);
                }
            }
            else if (key !== '*') {
                if (this.local.dialog_custType.indexOf('*') > -1) {
                    this.local.dialog_custType.splice(this.local.dialog_custType.indexOf('*'), 1);
                }
            }
            var _this = this;
            setTimeout(function () {
                if (_this.local.dialog_custType.indexOf('*') === -1 && _this.local.dialog_custType.length === custKeys.length) {
                    _this.local.dialog_custType.push('*');
                }
            }, 0);
        },
        setChannelType: function (key) {
            var custKeys = this.local.dialog_channelList.map(function (item) {
                return item.key;
            });
            if (key === '*') {
                if (this.local.dialog_channel.indexOf('*') > -1) {
                    this.local.dialog_channel= [];
                }
                else {
                    this.local.dialog_channel= ['*'].concat(custKeys);
                }
            }
            else if (key !== '*') {
                if (this.local.dialog_channel.indexOf('*') > -1) {
                    this.local.dialog_channel.splice(this.local.dialog_channel.indexOf('*'), 1);
                }
            }
            var _this = this;
            setTimeout(function () {
                if (_this.local.dialog_channel.indexOf('*') === -1 && _this.local.dialog_channel.length === custKeys.length) {
                    _this.local.dialog_channel.push('*');
                }
            }, 0);
        },
        // 新增基金多选数据
        dataSummary: function (asynData,value, label, dom) {
            if (asynData && asynData.length > 0) {
                // vueData = asynData.map(function (item) {
                //     return {
                //         value: item[value],
                //         label: item[label]
                //     }
                // });
                var data = [];
                data.push({
                    value:'*',
                    label:'默认缺省值'
                })
                for (var i = 0; i < asynData.length; i++) {
                    data.push({
                        value: asynData[i].fundId,
                        label: asynData[i].fundId+"-"+asynData[i].fundName
                    });
                }
                $("#" + dom).multiselect('dataprovider', data);
            }
        },
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
        // 客户类型转换
        printCustType: function (value) {
            if (value.indexOf('*') > -1) {
                return '全部';
            }
            else {
                var _this = this;
                return value.map(function (custType) {
                    for (var i = 0; i < _this.local.dialog_custTypeList.length; i++) {
                        if (_this.local.dialog_custTypeList[i].key == custType) {
                            return _this.local.dialog_custTypeList[i].value;
                        }
                    }
                    return custType;
                });
            }
        },
        printTradeType: function (value) {
            if (value.indexOf('*') > -1) {
                return '全部';
            }
            for (var i = 0; i < this.local.dialog_tradeTypeList.length; i++) {
                if (this.local.dialog_tradeTypeList[i].key == value) {
                    return this.local.dialog_tradeTypeList[i].value;
                }
            }
            return value;
        },
        printBranchCode: function (value) {
            if (value.indexOf('*') > -1) {
                return '全部';
            }
            for (var i = 0; i < this.local.dialog_branchCodeList.length; i++) {
                if (this.local.dialog_branchCodeList[i].key == value) {
                    return this.local.dialog_branchCodeList[i].value;
                }
            }
            return value;
        },
        printChannel: function (value) {
            if (value.indexOf('*') > -1) {
                return '全部';
            }
            for (var i = 0; i < this.local.dialog_channelList.length; i++) {
                if (this.local.dialog_channelList[i].key == value) {
                    return this.local.dialog_channelList[i].value;
                }
            }

            return value;
        },
        changeDisplayDiscount: function (type1, type2) {
            this[type1][type2 + '_displayDiscount'] = event.target.value;
        },
        //主表格分页方法
        prev: function (tabIndex) {
            var tabName = tabIndex == 1 ? 'service' : 'local';
            if (this[tabName].currentIndex <= 0) {
                this[tabName].currentIndex = 0;
            }
            else {
                this[tabName].currentIndex--;
            }
        },
        next: function (tabIndex) {
            var tabName = tabIndex == 1 ? 'service' : 'local';
            if (this[tabName].currentIndex >= this['middleData_' + tabName].length - 1) {
                this[tabName].currentIndex = this['middleData_' + tabName].length - 1;
            }
            else {
                this[tabName].currentIndex++;
            }
        },
        changeIndex: function (index, tabIndex) {
            var tabName = tabIndex == 1 ? 'service' : 'local';
            this[tabName].currentIndex = index - 1;
        },
        toFirst: function (tabIndex) {
            var tabName = tabIndex == 1 ? 'service' : 'local';
            this[tabName].currentIndex = 0;
        },
        toLast: function (tabIndex) {
            var tabName = tabIndex == 1 ? 'service' : 'local';
            this[tabName].currentIndex = this['middleData_' + tabName].length - 1;
        }
    }
});


