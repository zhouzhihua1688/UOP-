new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        fundnm: '',
        status: '',
        tableData: [],
        diaMsg: '',
        // 新建弹窗相关数据
        dianoticeid: '',
        dianoticenm: '',
        diatype: 'IPO',
        typeList: [],
        diaapkindsList: [],
        diaapkinds: [],
        diafundid: '',
        diafundnm: '',
        diafundid2: '',
        diafundnm2: '',
        showdiafundinfo: false,
        diaInputEdit: false,
        thirdpartnerPerson: [],
        // 主表格分页数据
        currentIndex: 0,
        pageMaxNum: '20',
        condition: '',
        // 邮件状态弹窗主数据
        sales: [],
        salesShortname: '',
        conditionShortname: '',
        salesStatus: '',
        conditionStatus: '',
        // 邮件状态弹窗分页数据
        salesCurrentIndex: 0,
        //三方机构选人数据
        channel: [],
        channelPerson: [],
        channelSelectPerson: [],
        channelShortNM: '',
        channelPageMaxNum: 10,
        channelIndex: 0,
        //发邮件弹窗相关数据
        sendType: 0,
        recipient: [],
        copy: [],
        encryption: [],
        themeName: '',
        themeTitle: '',
        //员工选人数据
        dept: [],
        deptOACode: '',
        contact: [],
        emailSearch: '',
        emailCondition: '',
        emailCurrentIndex: 0,
        emailPageMaxNum: 10,
        //代销机构选人数据
        orgs: [],
        orgPerson: [],
        orgSelectPerson: [],
        orgShortNM: '',
        orgCurrentIndex: 0,
        //产品数据过滤
        productCode: [],
        productName: [],
        productList: {},
        // loading动画
        progress: false
    },
    created: function () {
        this.getKeyWordData();
    },
    mounted: function () {
        var dialogs = ['info'];
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
        $('.date-picker').datepicker({
            autoclose: true,
            todayHighlight: true,
            format: 'yyyy-mm-dd',
            language: 'cn'
        }).next().on(ace.click_event, function () {
            $(this).prev().focus();
        });
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
        $('.tree-container').ace_scroll({
            size: 250,
            mouseWheelLock: true
        });
        $('#tree').on('closed.fu.tree disclosedFolder.fu.tree', function () {
            $('.tree-container').ace_scroll('reset').ace_scroll('start');
        });
        this.search();
    },
    computed: {
        diathirdpartner: function () {
            var arr = [];
            var index = -1;
            var _this = this;
            this.thirdpartnerPerson.forEach(function (item) {
                index = _this.inSelected(item, arr, 'channelId');
                if (index == -1) {
                    arr.push(item);
                }
            });
            return arr;
        },
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
        //代销机构分页
        channelAllCheck: function () {
            if (this.channelViewData.length == 0) {
                return false;
            }
            var flag = true;
            this.channelViewData.forEach(function (item) {
                if (!item.check) {
                    flag = false;
                }
            });
            return flag;
        },
        channelMiddleData: function () {
            var middleData = [];
            var filterData = this.channelPerson;
            var pageMaxNum = this.channelPageMaxNum;
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
        channelViewData: function () {
            var currentIndex = parseInt(this.channelIndex);
            return this.channelMiddleData[currentIndex];
        },
        //通讯录分页
        emailMiddleData: function () {
            var _this = this;
            var middleData = [];
            var filterData = [];
            var pageMaxNum = parseInt(this.emailPageMaxNum);
            this.contact.forEach(function (item) {
                if (item.username.toString().indexOf(_this.emailCondition) != -1 || item.usercode.indexOf(_this.emailCondition) != -1) {
                    if (!_this.deptOACode || item.deptOACode == _this.deptOACode) {
                        filterData.push(item);
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
        emailViewData: function () {
            var currentIndex = parseInt(this.emailCurrentIndex);
            return this.emailMiddleData[currentIndex];
        },
        emailSelectedData: function () {
            var arr = [];
            this.contact.forEach(function (item) {
                if (item.check) {
                    arr.push(item);
                }
            });
            return arr;
        },
        emailAllCheck: function () {
            if (this.emailViewData.length == 0) {
                return false;
            }
            var flag = true;
            this.emailViewData.forEach(function (item) {
                if (!item.check) {
                    flag = false;
                }
            });
            return flag;
        },
        //代销机构分页
        orgAllCheck: function () {
            if (this.orgPerson.length == 0) {
                return false;
            }
            var flag = true;
            this.orgPerson.forEach(function (item) {
                if (!item.check) {
                    flag = false;
                }
            });
            return flag;
        },
        orgMiddleData: function () {
            var middleData = [];
            var pageMaxNum = 10;
            var filterData = this.orgPerson;
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
        orgViewData: function () {
            var currentIndex = parseInt(this.orgCurrentIndex);
            return this.orgMiddleData[currentIndex];
        },
        // 邮件状态分页
        salesMiddleData: function () {
            var _this = this;
            var middleData = [];
            var filterData = [];
            var pageMaxNum = 10;
            this.sales.forEach(function (item) {
                if (String(item.shortname).indexOf(_this.salesShortname) != -1 &&
                    item.resultstatus.indexOf(_this.salesStatus) != -1) {
                    filterData.push(item);
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
        salesViewData: function () {
            var currentIndex = parseInt(this.salesCurrentIndex);
            return this.salesMiddleData[currentIndex];
        }
    },
    directives: {
        sort: {
            inserted(el, binding, vnode) {
                el.addEventListener('click', function () {
                    var tableData = vnode.context.tableData;
                    if ($(el).hasClass('sorting_asc')) {
                        $(el).removeClass('sorting_asc').addClass('sorting_desc');
                        tableData.sort(function (item1, item2) {
                            return item2['orderTime'] - item1['orderTime'];
                        });
                    }
                    else {
                        $(el).removeClass('sorting_desc').addClass('sorting_asc');
                        tableData.sort(function (item1, item2) {
                            return item1['orderTime'] - item2['orderTime'];
                        });
                    }
                });
            }
        }
    },
    watch: {
        pageMaxNum: function (val, oldval) {
            this.currentIndex = 0;
        },
        condition: function (val, oldval) {
            this.currentIndex = 0;
        },
        emailCondition: function (val, oldval) {
            this.emailCurrentIndex = 0;
        },
        conditionShortname: function (val, oldval) {
            this.salesCurrentIndex = 0;
        },
        conditionStatus: function (val, oldval) {
            this.salesCurrentIndex = 0;
        }
    },
    methods: {
        // 产品开放业务方法
        search: function () {
            $('thead>tr>th[class*=sorting_]').each(function (index, item) {
                $(item).removeClass('sorting_asc sorting_desc');
            });
            if (!$('#deadline').val() || /([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8])))/.test($('#deadline').val())) {
                this.currentIndex = 0;
                var _this = this;
                var params = {};
                params.fundnm = this.fundnm;
                params.opentime = $('#deadline').val();
                params.status = this.status;

                params.insertby = this.insertby;

                console.log(this.insertby)
                $.post({
                    url: '/thirdPartyOperation/products/open/search.ajax',
                    data: params,
                    success: function (result) {
                        console.log(result)
                        if (result.error === 0) {
                            _this.tableData = result.data;
                        } else {
                            _this.showDialog('', 'info', false, result.msg);
                        }
                    }
                });
            } else {
                this.showDialog('', 'info', false, '截止时间不符合日期格式');
            }
        },
        showCreate: function (index) {
            if (this.typeList.length == 0) {
                var _this = this;
                $.post({
                    url: '/thirdPartyOperation/products/open/getTypeList.ajax',
                    data: {
                        originType: 2
                    },
                    async: false,
                    success: function (result) {
                        if (result.error == 0) {
                            _this.typeList = result.data;
                        } else {
                            _this.showDialog('create', 'info', false, result.msg);
                        }
                    }
                });
                $.post({
                    url: '/thirdPartyOperation/products/open/getApkinds.ajax',
                    async: false,
                    success: function (result) {
                        if (result.error == 0) {
                            _this.diaapkindsList = result.data;
                        } else {
                            _this.showDialog('create', 'info', false, result.msg);
                        }
                    }
                });
            }
            if (index < 0) {
                var _this = this;
                this.dianoticeid = '';
                this.dianoticenm = '';
                this.diatype = 'IPO';
                this.diaapkinds = [];
                this.diaapkindsList.forEach(function (value) {
                    _this.diaapkinds.push(value);
                });
                this.diafundid = [];
                this.copy = [];
                this.thirdpartnerPerson = [];
                $('#remindtime').val('');
                $('#resulttime').val('');
                $('#opentime').val('');
                this.diafundid = '';
                this.diafundnm = '';
                this.diafundid2 = '';
                this.diafundnm2 = '';
                this.diaInputEdit = true;
                this.showdiafundinfo = false;
                this.showDialog('', 'create');
                return;
            }
            this.dianoticeid = this.viewData[index].noticeid;
            this.dianoticenm = this.viewData[index].noticenm;
            this.diatype = this.viewData[index].noticetype;
            this.diaapkinds = this.viewData[index].apkinds.split(',');
            this.diafundid = '';
            this.diafundnm = '';
            this.diafundid2 = '';
            this.diafundnm2 = '';
            this.thirdpartnerPerson = this.viewData[index].attach1.map(function (item) {
                item.username = item.contatorName;
                item.contactorid = item.contatorId;
                return item;
            });
            var diafundidArr = this.viewData[index].fundid.split(',');
            var diafundnmArr = this.viewData[index].fundnm.split(',');
            this.diaInputEdit = true;
            this.showdiafundinfo = false;
            if (diafundidArr.length > 1) {
                this.showdiafundinfo = true;
                this.diaInputEdit = false;
                this.diafundid2 = diafundidArr[1];
                this.diafundnm2 = diafundnmArr[1];
            }
            this.diafundid = diafundidArr[0];
            this.diafundnm = diafundnmArr[0];
            $('#remindtime').val(this.viewData[index].remindtime);
            $('#resulttime').val(this.viewData[index].resulttime);
            $('#opentime').val(this.viewData[index].opentime);
            this.showDialog('', 'create');
        },

        showCreate1: function (index) {
            if (this.typeList.length == 0) {
                var _this = this;
                $.post({
                    url: '/thirdPartyOperation/products/open/getTypeList.ajax',
                    data: {
                        originType: 2
                    },
                    async: false,
                    success: function (result) {
                        if (result.error == 0) {
                            _this.typeList = result.data;
                        } else {
                            _this.showDialog('create1', 'info', false, result.msg);
                        }
                    }
                });
                $.post({
                    url: '/thirdPartyOperation/products/open/getApkinds.ajax',
                    async: false,
                    success: function (result) {
                        if (result.error == 0) {
                            _this.diaapkindsList = result.data;
                        } else {
                            _this.showDialog('create1', 'info', false, result.msg);
                        }
                    }
                });
            }
            if (index < 0) {
                var _this = this;
                this.dianoticeid = '';
                this.dianoticenm = '';
                this.diatype = 'IPO';
                this.diaapkinds = [];
                this.diaapkindsList.forEach(function (value) {
                    _this.diaapkinds.push(value);
                });
                this.diafundid = [];
                this.copy = [];
                this.thirdpartnerPerson = [];
                $('#remindtime1').val('');
                $('#resulttime1').val('');
                $('#opentime1').val('');
                this.diafundid = '';
                this.diafundnm = '';
                this.diafundid2 = '';
                this.diafundnm2 = '';
                this.diaInputEdit = true;
                this.showdiafundinfo = false;
                this.showDialog('', 'create1');
                return;
            }
            this.dianoticeid = this.viewData[index].noticeid;
            this.dianoticenm = this.viewData[index].noticenm;
            this.diatype = this.viewData[index].noticetype;
            this.diaapkinds = this.viewData[index].apkinds.split(',');
            this.diafundid = '';
            this.diafundnm = '';
            this.diafundid2 = '';
            this.diafundnm2 = '';
            this.thirdpartnerPerson = this.viewData[index].attach1.map(function (item) {
                item.username = item.contatorName;
                item.contactorid = item.contatorId;
                return item;
            });
            var diafundidArr = this.viewData[index].fundid.split(',');
            var diafundnmArr = this.viewData[index].fundnm.split(',');
            this.diaInputEdit = true;
            this.showdiafundinfo = false;
            if (diafundidArr.length > 1) {
                this.showdiafundinfo = true;
                this.diaInputEdit = false;
                this.diafundid2 = diafundidArr[1];
                this.diafundnm2 = diafundnmArr[1];
            }
            this.diafundid = diafundidArr[0];
            this.diafundnm = diafundnmArr[0];
            $('#remindtime1').val(this.viewData[index].remindtime);
            $('#resulttime1').val(this.viewData[index].resulttime);
            $('#opentime1').val(this.viewData[index].opentime);
            console.log(this.viewData[index].remindtime)
            this.showDialog('', 'create1');
        },
       
        showThirdpartner: function () {
            var _this = this;
            this.showDialog('create', 'channel', true);
            var arr = [];
            this.thirdpartnerPerson.forEach(function (item) {
                arr.push(item);
            });
            this.channelSelectPerson = arr;
            this.channelPerson.forEach(function (item) {
                item.check = false;
            });
            this.channelSelectPerson.forEach(function (item) {
                var _index = _this.inSelected(item, _this.channelPerson, 'contactorid');
                if (_index > -1) {
                    _this.channelPerson[_index].check = true;
                }
            });
            if (this.channel.length == 0) {
                $.post({
                    url: '/thirdPartyOperation/products/open/getChannel.ajax',
                    success: function (result) {
                        if (result.error == 0) {
                            _this.channel = result.data.channel;
                            _this.channelPerson = result.data.contacts;
                        } else {
                            _this.channel = [];
                            _this.channelPerson = [];
                        }
                    }
                });
            }
        },
        removeThirdpartner: function (index) {
            var _this = this;
            var channelId = this.diathirdpartner[index].channelId;
            var _index = -1;
            var arr = [];
            this.thirdpartnerPerson.forEach(function (item, index) {
                if (item.channelId != channelId) {
                    arr.push(item);
                }
            });
            this.channelPerson.forEach(function (item) {
                item.check = false;
            });
            arr.forEach(function (item) {
                _index = _this.inSelected(item, _this.channelPerson, 'contactorid');
                if (_index > -1) {
                    _this.channelPerson[_index].check = true;
                }
            });
            this.thirdpartnerPerson = arr;
            this.channelSelectPerson = arr;
        },
        addFoundInfo: function () {
            if (this.showdiafundinfo) {
                this.showDialog('create', 'info', true, '只能选择两只产品');
                return;
            }
            this.showdiafundinfo = true;
        },
        diaInfoCheck: function () {
            var reg = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/;
            if (!this.dianoticenm) {
                this.showDialog('create', 'info', true, '事件主题不能为空');
                return false;
            }
            if (!this.diatype) {
                this.showDialog('create', 'info', true, '请选择开放类型');
                return false;
            }
            if (this.diaapkinds.length == 0) {
                this.showDialog('create', 'info', true, '至少选择一种开放业务');
                return false;
            }
            if ((this.diafundid && !this.diafundnm) || (!this.diafundid && this.diafundnm)) {
                this.showDialog('create', 'info', true, '产品ID和产品名称须一一对应');
                return false;
            }
            if ((this.diafundid2 && !this.diafundnm2) || (!this.diafundid2 && this.diafundnm2)) {
                this.showDialog('create', 'info', true, '产品ID和产品名称须一一对应');
                return false;
            }
            if (this.diathirdpartner.length == 0) {
                this.showDialog('create', 'info', true, '通知三方机构不能为空');
                return false;
            }
            if (!$('#remindtime').val()) {
                this.showDialog('create', 'info', true, '反馈提醒时间不能为空');
                return false;
            }
            if (!reg.test($('#remindtime').val())) {
                this.showDialog('create', 'info', true, '反馈提醒时间格式错误');
                return false;
            }
            if (!$('#resulttime').val()) {
                this.showDialog('create', 'info', true, '反馈截止时间不能为空');
                return false;
            }
            if (!reg.test($('#resulttime').val())) {
                this.showDialog('create', 'info', true, '反馈截止时间格式错误');
                return false;
            }
            if (!$('#opentime').val()) {
                this.showDialog('create', 'info', true, '产品开放时间不能为空');
                return false;
            }
            if (!reg.test($('#opentime').val())) {
                this.showDialog('create', 'info', true, '产品开放时间格式错误');
                return false;
            }
            var remindtime = new Date($('#remindtime').val().toString()).getTime();
            var resulttime = new Date($('#resulttime').val().toString()).getTime();
            var opentime = new Date($('#opentime').val().toString()).getTime();
            var todayTime = new Date().getTime();
            if (todayTime > remindtime || todayTime > resulttime || todayTime > opentime) {
                this.showDialog('create', 'info', true, '所选时间不能提前于当前时间');
                return false;
            }
            if (!(opentime > resulttime && resulttime > remindtime)) {
                this.showDialog('create', 'info', true, '提醒时间,截止时间,开放时间顺序有误,应符合开放时间>截止时间>提醒时间');
                return false;
            }
            return true;
        },

        

        save: function () {
            var _this = this;
            if (this.diaInfoCheck()) {
                var fundidarr = [];
                var fundnmarr = [];
                this.diafundid && fundidarr.push(this.diafundid);
                this.diafundnm && fundnmarr.push(this.diafundnm);
                this.diafundid2 && fundidarr.push(this.diafundid2);
                this.diafundnm2 && fundnmarr.push(this.diafundnm2);
                var thirdpartner = [];
                this.thirdpartnerPerson.forEach(function (item) {
                    thirdpartner.push(item.channelName + '|' + item.channelId + '|' + item.username + '|' + item.contactorid + '|' + item.email);
                });
                var params = {};
                params.insertby= this.insertby;
                params.noticenm = this.dianoticenm;
                params.noticetype = this.diatype;
                params.apkinds = this.diaapkinds.join(',');
                params.fundid = fundidarr.join(',');
                params.fundnm = fundnmarr.join(',');
                params.thirdpartner = thirdpartner.join(',');
                params.remindtime = $('#remindtime').val();
                params.resulttime = $('#resulttime').val();
                params.opentime = $('#opentime').val();
                console.log('create params=', params);
                var url = '/thirdPartyOperation/products/open/save.ajax';
                if (this.dianoticeid) {
                    params.noticeid = this.dianoticeid;
                    url = '/thirdPartyOperation/products/open/update.ajax'
                }
                $.post({
                    url: url,
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            $.post({
                                url: '/thirdPartyOperation/products/open/search.ajax',
                                success: function (result) {
                                    if (result.error === 0) {
                                        _this.tableData = result.data;
                                    }
                                }
                            });
                            _this.showDialog('create', 'info', false, result.msg);
                        } else {
                            _this.showDialog('create', 'info', true, result.msg);
                        }
                    }
                });
            }
        },
        saveAndSent: function () {
            var _this = this;
            if (this.diaInfoCheck()) {
                var fundidarr = [];
                var fundnmarr = [];
                this.diafundid && fundidarr.push(this.diafundid);
                this.diafundnm && fundnmarr.push(this.diafundnm);
                this.diafundid2 && fundidarr.push(this.diafundid2);
                this.diafundnm2 && fundnmarr.push(this.diafundnm2);
                var thirdpartner = [];
                this.thirdpartnerPerson.forEach(function (item) {
                    thirdpartner.push(item.channelName + '|' + item.channelId + '|' + item.username + '|' + item.contactorid + '|' + item.email);
                });
                var params = {};
                params.noticenm = this.dianoticenm;
                params.noticetype = this.diatype;
                params.apkinds = this.diaapkinds.join(',');
                params.fundid = fundidarr.join(',');
                params.fundnm = fundnmarr.join(',');
                params.thirdpartner = thirdpartner.join(',');
                params.remindtime = $('#remindtime').val();
                params.resulttime = $('#resulttime').val();
                params.opentime = $('#opentime').val();
                console.log('create params=', params);
                var url = '/thirdPartyOperation/products/open/save.ajax';
                if (this.dianoticeid) {
                    params.noticeid = this.dianoticeid;
                    url = '/thirdPartyOperation/products/open/update.ajax'
                }
                $.post({
                    url: url,
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.dianoticeid = result.data.noticeid;
                            var FundNo = [];
                            FundNo.push(_this.diafundid);
                            var FundNM = [];
                            FundNM.push(_this.diafundnm);
                            _this.diafundid2 && (FundNo.push(_this.diafundid2));
                            _this.diafundnm2 && (FundNM.push(_this.diafundnm2));
                            var OpenDate = $('#opentime').val();
                            var RESULTTIME = $('#resulttime').val();
                            var APKINDS = [];
                            _this.diaapkinds.forEach(function (value) {
                                APKINDS.push(value);
                            });
                            var branchNM = [];
                            _this.diathirdpartner.forEach(function (item) {
                                branchNM.push(item.channelName);
                            });
                            var themeData = {
                                moduleType: 'open',
                                FUNDID: FundNo.join('，'),
                                THIRDPARTNER: branchNM.join('，'),
                                FUNDNM: FundNM.join('，'),
                                APKINDS: APKINDS.join('，'),
                                OPENTIME: OpenDate,
                                RESULTTIME: RESULTTIME
                            };
                            $.post({
                                url: '/thirdPartyOperation/mails/new/getThemeContent.ajax',
                                data: themeData,
                                success: function (result) {
                                    if (result.error === 0) {
                                        _this.themeTitle = result.data.title;
                                        $('#editor1').html(result.data.content);
                                        _this.encryption = _this.thirdpartnerPerson;
                                        _this.showDialog('create', 'email', false);
                                    } else {
                                        _this.showDialog('create', 'info', true, result.msg);
                                    }
                                }
                            });
                            $.post({
                                url: '/thirdPartyOperation/products/open/search.ajax',
                                success: function (result) {
                                    if (result.error === 0) {
                                        _this.tableData = result.data;
                                    }
                                }
                            });
                            if (_this.contact.length == 0) {
                                $.post({
                                    url: '/thirdPartyOperation/mails/new/getContact.ajax',
                                    success: function (result) {
                                        if (result.error === 0) {
                                            _this.contact = result.data.employee;
                                            _this.dept = result.data.dept;
                                        } else {
                                            _this.showDialog('create', 'info', false, result.msg);
                                        }
                                    }
                                });
                            }
                        } else {
                            _this.showDialog('create', 'info', true, result.msg);
                        }
                    }
                });
            }
        },
        getOrgData: function () {
            if (this.orgs.length == 0) {
                var _this = this;
                $.post({
                    url: '/thirdPartyOperation/products/open/getOrgData.ajax',
                    success: function (result) {
                        if (result.error === 0) {
                            _this.orgs = result.data.channel;
                            _this.orgPerson = result.data.contacts;
                        }
                        else {
                            _this.orgs = [];
                            _this.orgPerson = [];
                        }
                    }
                });
            }
        },
        download: function (index) {
            var params = {
                noticeId: this.viewData[index].noticeid
            };
            window.location.href = '/thirdPartyOperation/products/open/download.ajax?noticeId=' + params.noticeId;
        },
        showStatus: function (index) {
            this.salesShortname = '';
            this.conditionShortname = '';
            this.salesStatus = '';
            this.conditionStatus = '';
            var _this = this;
            var params = {
                noticeid: this.viewData[index].noticeid
            };
            $.post({
                url: '/thirdPartyOperation/products/open/result.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.sales = result.data;
                        _this.showDialog('', 'callBackInfo');
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        //三方机构选人方法
        channelSearch: function () {
            this.channelIndex = 0;
            var _this = this;
            $.post({
                url: '/thirdPartyOperation/products/open/getChannel.ajax',
                data: {
                    shortnm: this.channelShortNM
                },
                success: function (result) {
                    if (result.error == 0) {
                        _this.channelIndex = 0;
                        _this.channel = result.data.channel;
                        _this.channelPerson = result.data.contacts;
                        if (_this.channelSelectPerson.length > 0) {
                            var index = -1;
                            _this.channelSelectPerson.forEach(function (item) {
                                index = _this.inSelected(item, _this.channelPerson, 'contactorid');
                                if (index > -1) {
                                    _this.channelPerson[index].check = true;
                                }
                            });
                        }
                    } else {
                        _this.showDialog('channel', 'info', true, result.msg);
                    }
                }
            });
        },
        searchChannelPerson: function (shortnm) {
            var _this = this;
            $.post({
                url: '/thirdPartyOperation/products/open/getChannel.ajax',
                data: {shortnm: shortnm},
                success: function (result) {
                    if (result.error == 0) {
                        _this.channelIndex = 0;
                        _this.channelPerson = result.data.contacts;
                        if (_this.channelSelectPerson.length > 0) {
                            var index = -1;
                            _this.channelSelectPerson.forEach(function (item) {
                                index = _this.inSelected(item, _this.channelPerson, 'contactorid');
                                if (index > -1) {
                                    _this.channelPerson[index].check = true;
                                }
                            });
                        }
                    } else {
                        _this.showDialog('channel', 'info', true, result.msg);
                    }
                }
            });
        },
        channelSelectAll: function () {
            var _this = this;
            var _index = -1;
            var index = -1;
            if (this.channelAllCheck) {
                this.channelViewData.forEach(function (item) {
                    _index = _this.inSelected(item, _this.channelPerson, 'contactorid');
                    _this.channelPerson[_index].check = false;
                    index = _this.inSelected(_this.channelPerson[_index], _this.channelSelectPerson, 'contactorid');
                    if (index > -1) {
                        _this.channelSelectPerson.splice(index, 1);
                    }
                });
            } else {
                this.channelViewData.forEach(function (item) {
                    _index = _this.inSelected(item, _this.channelPerson, 'contactorid');
                    _this.channelPerson[_index].check = true;
                    if (_this.inSelected(_this.channelPerson[_index], _this.channelSelectPerson, 'contactorid') == -1) {
                        _this.channelSelectPerson.push(_this.channelPerson[_index]);
                    }
                });
            }
        },
        channelAdd: function (index) {
            var item = this.channelViewData[index];
            item.check = !item.check;
            var index1 = this.inSelected(item, this.channelPerson, 'contactorid');
            this.channelPerson[index1].check = item.check;
            var item1 = this.channelPerson[index1];
            var index2 = this.inSelected(item1, this.channelSelectPerson, 'contactorid');
            if (index2 == -1) {
                this.channelSelectPerson.push(item1);
            } else if (index2 > -1 && !this.channelPerson[index].check) {
                this.channelSelectPerson.splice(index2, 1);
            }
        },
        channelClear: function () {
            this.channelPerson.forEach(function (item) {
                item.check = false;
            });
            this.channelSelectPerson = [];
        },
        channelRemove: function (index) {
            var _this = this;
            var item = this.channelSelectPerson[index];
            var _index = this.inSelected(item, this.channelPerson, 'contactorid');
            if (_index > -1) {
                this.channelPerson[_index].check = false;
            }
            this.channelSelectPerson.splice(index, 1);
        },
        saveThirdPerson: function () {
            this.thirdpartnerPerson = this.channelSelectPerson;
            this.showDialog('channel', 'create', false);
        },
        channelPrev: function () {
            this.channelIndex <= 0 ? 0 : this.channelIndex--;
        },
        channelNext: function () {
            this.channelIndex >= this.channelMiddleData.length - 1 ? this.channelMiddleData.length - 1 : this.channelIndex++;
        },
        // 主表格分页方法
        prev: function () {
            this.currentIndex <= 0 ? 0 : this.currentIndex--;
        },
        next: function () {
            this.currentIndex >= this.middleData.length - 1 ? this.middleData.length - 1 : this.currentIndex++;
        },
        changeIndex: function (index) {
            this.currentIndex = index - 1;
        },
        // 邮件状态弹窗分页方法
        salesPrev: function () {
            this.salesCurrentIndex <= 0 ? 0 : this.salesCurrentIndex--;
        },
        salesNext: function () {
            this.salesCurrentIndex >= this.salesMiddleData.length - 1 ? this.salesMiddleData.length - 1 : this.salesCurrentIndex++;
        },
        //发送邮件业务方法
        initListShow(type) {
            this.contact.forEach(function (item) {
                item.check = false;
            });
            this.orgPerson.forEach(function (item) {
                item.check = false;
            });
            this.orgSelectPerson = [];
            if (this[type].length > 0) {
                var index = 0;
                var _this = this;
                this[type].forEach(function (item) {
                    if (item.usercode) {
                        index = _this.inSelected(item, _this.contact, 'usercode');
                        _this.contact[index].check = true;
                    } else if (item.contactorid) {
                        _this.orgSelectPerson.push(item);
                        index = _this.inSelected(item, _this.orgPerson, 'contactorid');
                        if (index > -1) {
                            _this.orgPerson[index].check = true;
                        }
                    }
                });
            }
            this.deptOACode = '';
        },
        recipientShow: function () {
            this.initListShow('recipient');
            this.sendType = 1;
            this.showDialog('email', 'list', true);
        },
        copyShow: function () {
            this.initListShow('copy');
            this.sendType = 2;
            this.showDialog('email', 'list', true);
        },
        encryptionShow: function () {
            this.initListShow('encryption');
            this.sendType = 3;
            this.showDialog('email', 'list', true);
        },
        savePerson: function () {
            var _this = this;
            if (this.sendType == 1) {
                this.recipient = [];
                this.emailSelectedData.forEach(function (item) {
                    _this.recipient.push(item);
                });
                this.orgSelectPerson.forEach(function (item) {
                    _this.recipient.push(item);
                });
            } else if (this.sendType == 2) {
                this.copy = [];
                this.emailSelectedData.forEach(function (item) {
                    _this.copy.push(item);
                });
                this.orgSelectPerson.forEach(function (item) {
                    _this.copy.push(item);
                });
            } else if (this.sendType == 3) {
                this.encryption = [];
                this.emailSelectedData.forEach(function (item) {
                    _this.encryption.push(item);
                });
                this.orgSelectPerson.forEach(function (item) {
                    _this.encryption.push(item);
                });
            }
            this.contact.forEach(function (item) {
                item.check = false;
            });
            this.emailCondition = '';
            this.emailSearch = '';
            this.emailCurrentIndex = 0;
            this.orgCurrentIndex = 0;
            this.showDialog('list', '');
        },
        removeRecipient: function (index) {
            this.recipient.splice(index, 1);
        },
        removeCopy: function (index) {
            this.copy.splice(index, 1);
        },
        removeEncryption: function (index) {
            this.encryption.splice(index, 1);
        },
        initEmail: function () {
            this.recipient = [];
            this.copy = [];
            this.encryption = [];
            this.themeName = '';
            this.orgSelectPerson = [];
            this.tableData.forEach(function (item) {
                item.check = false;
            });
            this.contact.forEach(function (item) {
                item.check = false;
            });
            this.orgPerson.forEach(function (item) {
                item.check = false;
            });
            $('#editor1').html('');
        },
        getEmailData: function () {
            if (this.recipient.length == 0 && this.copy.length == 0 && this.encryption.length == 0) {
                this.showDialog('email', 'info', true, '至少填写一种收件人');
                return;
            }
            if (!this.themeName) {
                this.showDialog('email', 'info', true, '邮件标题不能为空');
                return;
            }
            //if ($('#editor1').html().length > 4000) {
            //    this.showDialog('email', 'info', true, '邮件内容超出限定长度');
            //    return;
            //}
            var receiverList = [];
            if (this.recipient.length > 0) {
                this.recipient.forEach(function (item) {
                    receiverList.push({
                        address: item.email,
                        addresstype: 1,
                        receivernm: item.username ? item.username : item.contactor,
                        receivertype: item.username ? 1 : 2
                    });
                });
            }
            if (this.copy.length > 0) {
                this.copy.forEach(function (item) {
                    receiverList.push({
                        address: item.email,
                        addresstype: 2,
                        receivernm: item.username ? item.username : item.contactor,
                        receivertype: item.username ? 1 : 2
                    });
                });
            }
            if (this.encryption.length > 0) {
                this.encryption.forEach(function (item) {
                    receiverList.push({
                        address: item.email,
                        addresstype: 3,
                        receivernm: item.username,
                        receivertype: 2
                    });
                });
            }
            var params = {
                title: this.themeName,
                attach1: this.dianoticeid,
                content: $('#editor1').html(),
                receiverList: JSON.stringify(receiverList)
            };
            return params;
        },
        saveEmail: function () {
            var params = this.getEmailData();
            if (!params) {
                return;
            }
            var _this = this;
            $.post({
                url: '/thirdPartyOperation/mails/new/saveEmail.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.initEmail();
                        _this.showDialog('email', 'info', false, '保存邮件成功');
                    } else {
                        _this.showDialog('email', 'info', true, '保存邮件失败');
                    }
                }
            });
        },
        sendEmail: function () {
            var params = this.getEmailData();
            console.log('params=', params);
            if (!params) {
                return;
            }
            this.progress = true;//loading动画开始
            var _this = this;
            $.post({
                url: '/thirdPartyOperation/mails/new/sendEmail.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        var param = {
                            noticeid: _this.dianoticeid,
                            status: '1'
                        };
                        $.post({
                            url: '/thirdPartyOperation/products/open/updateEmail.ajax',
                            data: param,
                            success: function (result) {
                                if (result.error == 0) {
                                    _this.initEmail();
                                    $.post({
                                        url: '/thirdPartyOperation/products/open/search.ajax',
                                        success: function (result) {
                                            if (result.error === 0) {
                                                _this.tableData = result.data;
                                            }
                                        }
                                    });
                                    _this.progress = false;//loading动画结束
                                    _this.showDialog('email', 'info', false, '发送成功');
                                } else {
                                    _this.progress = false;//loading动画结束
                                    _this.showDialog('email', 'info', true, result.msg);
                                }
                            }
                        });
                    } else {
                        _this.progress = false;//loading动画结束
                        _this.showDialog('email', 'info', true, '发送邮件失败');
                    }
                }
            });
        },
        //代销机构方法
        orgPrev: function () {
            if (this.orgCurrentIndex <= 0) {
                this.orgCurrentIndex = 0;
                return;
            }
            this.orgCurrentIndex--;
        },
        orgNext: function () {
            if (this.orgCurrentIndex >= this.orgMiddleData.length - 1) {
                this.orgCurrentIndex = this.orgMiddleData.length - 1;
                return;
            }
            this.orgCurrentIndex++;
        },
        orgClear: function () {
            this.orgSelectPerson = [];
            this.orgPerson.forEach(function (item) {
                item.check = false;
            });
        },
        orgSelectAll: function () {
            var _this = this;
            var _index = -1;
            if (this.orgAllCheck) {
                this.orgViewData.forEach(function (item) {
                    item.check = false;
                    var _index = _this.inSelected(item, _this.orgSelectPerson, 'contactorid');
                    if (_index > -1) {
                        _this.orgSelectPerson.splice(_index, 1);
                    }
                });
            } else {
                this.orgViewData.forEach(function (item) {
                    item.check = true;
                    var _index = _this.inSelected(item, _this.orgSelectPerson, 'contactorid');
                    if (_index == -1) {
                        _this.orgSelectPerson.push(item);
                    }
                });
            }
        },
        orgAdd: function (item) {
            item.check = !item.check;
            var _index = this.inSelected(item, this.orgSelectPerson, 'contactorid');
            if (_index == -1) {
                this.orgSelectPerson.push(item);
            } else if (_index > -1 && !item.check) {
                this.orgSelectPerson.splice(_index, 1);
            }
        },
        orgRemove: function (index) {
            var _index = this.inSelected(this.orgSelectPerson[index], this.orgPerson, 'contactorid');
            if (_index > -1) {
                this.orgPerson[_index].check = false;
            }
            this.orgSelectPerson.splice(index, 1);
        },
        orgSearch: function () {
            var _this = this;
            var params = {shortnm: this.orgShortNM};
            $.post({
                url: '/thirdPartyOperation/products/open/getOrgData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.orgPerson = result.data.contacts;
                        _this.orgCurrentIndex = 0;
                        if (_this.orgSelectPerson.length > 0) {
                            var _index = 0;
                            _this.orgSelectPerson.forEach(function (item) {
                                _index = _this.inSelected(item, _this.orgPerson, 'contactorid');
                                if (_index > -1) {
                                    _this.orgPerson[_index].check = true;
                                }
                            });
                        }
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        selectOrg: function (shortnm) {
            var _this = this;
            var params = {shortnm: shortnm};
            $.post({
                url: '/thirdPartyOperation/products/open/getOrgData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.orgPerson = result.data.contacts;
                        _this.orgCurrentIndex = 0;
                        if (_this.orgSelectPerson.length > 0) {
                            var _index = 0;
                            _this.orgSelectPerson.forEach(function (item) {
                                _index = _this.inSelected(item, _this.orgPerson, 'contactorid');
                                if (_index > -1) {
                                    _this.orgPerson[_index].check = true;
                                }
                            });
                        }
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        //通讯录分页方法
        emailPrev: function () {
            this.emailCurrentIndex <= 0 ? 0 : this.emailCurrentIndex--;
        },
        emailNext: function () {
            this.emailCurrentIndex >= this.emailMiddleData.length - 1 ? this.emailMiddleData.length - 1 : this.emailCurrentIndex++;
        },
        emailClear: function () {
            this.contact.forEach(function (item) {
                item.check = false;
            });
        },
        emailSelectAll: function () {
            var _this = this;
            var _index = -1;
            if (this.emailAllCheck) {
                this.emailViewData.forEach(function (item) {
                    _index = _this.inSelected(item, _this.contact, 'usercode');
                    _this.contact[_index].check = false;
                });
            } else {
                this.emailViewData.forEach(function (item) {
                    _index = _this.inSelected(item, _this.contact, 'usercode');
                    _this.contact[_index].check = true;
                });
            }
        },
        emailAdd: function (index) {
            this.emailViewData[index].check = !this.emailViewData[index].check;
            var _index = this.inSelected(this.emailViewData[index], this.contact, 'usercode');
            this.contact[_index].check = this.emailViewData[index].check;
        },
        emailRemove: function (index) {
            var _index = this.inSelected(this.emailSelectedData[index], this.contact, 'usercode');
            this.contact[_index].check = false;
        },
        searchPerson: function () {
            this.emailCondition = this.emailSearch;
        },
        selectDept: function (deptOACode) {
            this.emailCurrentIndex = 0;
            this.emailCondition = '';
            this.deptOACode = deptOACode;
        },
        clearDept: function () {
            this.deptOACode = '';
        },
        // 公共方法
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
        inSelected: function (item, arr, prop) {
            var _index = -1;
            arr.forEach(function (value, index) {
                if (item[prop] == value[prop]) {
                    _index = index;
                }
            });
            return _index;
        },
        getKeyWordData: function () {
            var _this = this;
            $.post({
                url: '/thirdPartyOperation/products/open/filter.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        _this.productName = result.data.productName;
                        _this.productCode = result.data.productCode;
                        _this.productList = result.data.productList;
                        _this.getProductList('input.typeahead', 'productCode');
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        getProductList: function (element, datas) {
            var _this = this;
            jQuery(function ($) {
                var substringMatcher = function (strs) {
                    return function findMatches(q, cb) {
                        var matches, substrRegex;
                        matches = [];
                        substrRegex = new RegExp(q, 'i');
                        $.each(strs, function (i, str) {
                            if (substrRegex.test(str)) {
                                matches.push({
                                    value: str
                                });
                            }
                        });
                        cb(matches);
                    }
                };
                $(element).typeahead({
                    hint: true,
                    highlight: true,
                    minLength: 1
                }, {
                    name: 'states',
                    displayKey: 'value',
                    source: substringMatcher(_this[datas]),
                    limit: 2000
                });
            });
        },
        binding: function (id, name) {
            var _this = this;
            $('.tt-open').on('click', function (el) {
                _this[id] = el.target.innerText;
                _this[name] = _this.productList[el.target.innerText];
            });
        },
        changeExpand: function (index) {
            var ele = this.$refs["s" + index][0]
            var ul = this.$refs["s" + index][1]
            if (ele.classList.contains('tree-plus')) {
                //显示
                ele.classList.remove('tree-plus')
                ele.classList.add('tree-minus')
                if (ul) {
                    ul.classList.remove('hide')
                    ul.classList.add('show')
                }
            } else {
                //隐藏
                ele.classList.remove('tree-minus')
                ele.classList.add('tree-plus')
                if (ul) {
                    ul.classList.remove('show')
                    ul.classList.add('hide')
                }
            }

        },
        changeChildExpand: function (index) {
            var ele = this.$refs["c" + index][0]
            var ul = this.$refs["c" + index][1]
            if (ele.classList.contains('tree-plus')) {
                //显示
                ele.classList.remove('tree-plus')
                ele.classList.add('tree-minus')
                if (ul) {
                    ul.classList.remove('hide')
                    ul.classList.add('show')
                }
            } else {
                //隐藏
                ele.classList.remove('tree-minus')
                ele.classList.add('tree-plus')
                if (ul) {
                    ul.classList.remove('show')
                    ul.classList.add('hide')
                }
            }

        },
        channelChangeHide: function (index) {
            var ele = this.$refs['channel' + index][0];
            var eleChild = this.$refs['channelChild' + index][0];
            if (eleChild.classList.contains('tree-plus')) {
                //显示
                eleChild.classList.remove('tree-plus');
                eleChild.classList.add('tree-minus');
                ele.classList.remove('hide');
                ele.classList.add('show');
            } else {
                //隐藏
                eleChild.classList.remove('tree-minus');
                eleChild.classList.add('tree-plus');
                ele.classList.remove('show');
                ele.classList.add('hide');
            }

        },
        orgChangeHide: function (index) {
            var ele = this.$refs['org' + index][0];
            var eleChild = this.$refs['orgChild' + index][0];
            if (eleChild.classList.contains('tree-plus')) {
                //显示
                eleChild.classList.remove('tree-plus');
                eleChild.classList.add('tree-minus');
                ele.classList.remove('hide');
                ele.classList.add('show');
            } else {
                //隐藏
                eleChild.classList.remove('tree-minus');
                eleChild.classList.add('tree-plus');
                ele.classList.remove('show');
                ele.classList.add('hide');
            }

        }
    }
});