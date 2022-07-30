new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        fundid: '',
        fundnm: '',
        deleteId: '',
        tableData: [],
        diaMsg: '',
        filename: '',
        //上传和更新弹窗数据
        uploadFundid: '',
        uploadFundnm: '',
        updateFundid: '',
        updateFundnm: '',
        updateFile: '',
        //主表格分页数据
        currentIndex: 0,
        pageMaxNum: '20',
        condition: '',
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

        //列表树
        showTree: {
            parent: false
        },
        // loading动画
        progress: false,
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
        allCheck: function () {
            if (this.viewData.length == 0) {
                return false;
            }
            var flag = true;
            this.viewData.forEach(function (item) {
                if (!item.check) {
                    flag = false;
                }
            });
            return flag;
        },
        //发邮件弹窗数据
        excels: function () {
            var arr = [];
            this.tableData.forEach(function (item, index) {
                if (item.check) {
                    arr.push({
                        fundid: item.fundid,
                        fundnm: item.fundnm,
                        filename: item.filename,
                        filepath: item.filepath
                    });
                }
            });
            return arr;
        },
        //通讯录分页
        emailMiddleData: function () {
            var _this = this;
            var middleData = [];
            var filterData = [];
            var pageMaxNum = parseInt(this.emailPageMaxNum);
            this.contact.forEach(function (item) {
                if (item.username.indexOf(_this.emailCondition) != -1 || item.usercode.indexOf(_this.emailCondition) != -1) {
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
        orgAllCheck: function () {
            if (this.orgViewData.length == 0) {
                return false;
            }
            var flag = true;
            this.orgViewData.forEach(function (item) {
                if (!item.check) {
                    flag = false;
                }
            });
            return flag;
        }
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
        emailCondition: {
            handler: function (val, oldval) {
                this.emailCurrentIndex = 0;
            }
        }
    },
    created: function () {
        this.getKeyWordData()
    },
    mounted: function () {
        var _this = this;
        var dialogs = ['upload', 'update', 'delete', 'info'];
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
        $('#uploadBtn').click(function () {
            $('#uploadFileInput').click();
        });
        $('#updateBtn').click(function () {
            $('#updateFileInput').click();
        });
        $('.tree-container').ace_scroll({
            size: 250,
            mouseWheelLock: true
        });
        $('#tree1').on('closed.fu.tree disclosedFolder.fu.tree', function () {
            $('.tree-container').ace_scroll('reset').ace_scroll('start');
        });
        $('#tree2').on('closed.fu.tree disclosedFolder.fu.tree', function () {
            $('.tree-container').ace_scroll('reset').ace_scroll('start');
        });
        this.search();
    },
    methods: {
        //参数表业务方法
        search: function () {
            var _this = this;
            this.currentIndex = 0;
            var params = {};
            params.fundid = this.fundid;
            params.fundnm = this.fundnm;
            $.post({
                url: '/thirdPartyOperation/products/paramsMgmt/search.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.tableData = result.data;
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        showUpload: function () {
            $('#uploadFileInput').on('change', function () {
                $('#uploadInput').val($(this).val());
            });
            $('#uploadInput').val('');
            $('#uploadFileInput').val('');
            this.uploadFundid = '';
            this.uploadFundnm = '';
            this.showDialog('', 'upload');
        },
        upload: function () {
            if (!this.uploadFundid) {
                this.showDialog('upload', 'info', true, '产品代码不能为空');
                return;
            }
            if (!this.uploadFundnm) {
                this.showDialog('upload', 'info', true, '产品名称不能为空');
                return;
            }
            if (!$('#uploadFileInput').val()) {
                this.showDialog('upload', 'info', true, '未选择上传参数表');
                return;
            }
            var _this = this;
            var params = {
                fundid: this.uploadFundid,
                fundnm: this.uploadFundnm
            };
            $.ajaxFileUpload({
                url: '/thirdPartyOperation/products/paramsMgmt/upload.ajax',
                type: 'POST',
                data: params,
                dataType: 'json',
                fileElementId: 'uploadFileInput',
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('upload', 'info', false, result.msg);
                        $.post({
                            url: '/thirdPartyOperation/products/paramsMgmt/search.ajax',
                            success: function (data) {
                                if (data.error === 0) {
                                    _this.tableData = data.data;
                                }
                            }
                        });
                    } else {
                        _this.showDialog('upload', 'info', true, result.msg);
                    }
                }
            });
        },
        showUpdate: function (index) {
            $('#updateFileInput').change(function () {
                $('#updateInput').val($(this).val());
            });
            $('#updateInput').val('');
            $('#updateFileInput').val('');
            this.updateFundid = this.viewData[index].fundid;
            this.updateFundnm = this.viewData[index].fundnm;

            this.updateFile = this.viewData[index].filename;
            $('#updateInput').val(this.updateFile);
            this.showDialog('', 'update');
        },
        update: function () {
            if (!$('#updateFileInput').val()) {
                this.showDialog('update', 'info', true, '未选择上传参数表');
                return;
            }
            var _this = this;
            var params = {
                fundid: this.updateFundid,
                fundnm: this.updateFundnm
            };
            $.ajaxFileUpload({
                url: '/thirdPartyOperation/products/paramsMgmt/update.ajax',
                type: 'POST',
                data: params,
                dataType: 'json',
                fileElementId: 'updateFileInput',
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('update', 'info', false, result.msg);
                        $.post({
                            url: '/thirdPartyOperation/products/paramsMgmt/search.ajax',
                            success: function (data) {
                                if (data.error === 0) {
                                    _this.tableData = data.data;
                                }
                            }
                        });
                    } else {
                        _this.showDialog('update', 'info', true, result.msg);
                    }
                }
            });
        },
        showDelete: function (index) {
            this.deleteId = this.viewData[index].fundid;
            this.showDialog('', 'delete');
        },
        deleteData: function () {
            var _this = this;
            if (this.currentIndex == this.middleData.length - 1 && this.viewData.length == 1) {
                this.prev();
            }
            var params = {
                fundid: this.deleteId
            };
            var index = this.inSelected(params, this.tableData, 'fundid');
            $.post({
                url: '/thirdPartyOperation/products/paramsMgmt/deleteData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.tableData.splice(index, 1);
                        _this.showDialog('delete', 'info', false, result.msg);
                    } else {
                        _this.showDialog('delete', 'info', true, result.msg);
                    }
                }
            });
        },
        //发送邮件业务方法
        showEmail: function () {
            if (this.excels.length > 5) {
                this.showDialog('', 'info', false, '上传附件不能超过五个');
                return;
            }
            var _this = this;
            var flag = false;
            var themeInfo = [];
            for (var i = 0; i < this.tableData.length; i++) {
                if (this.tableData[i].check) {
                    themeInfo.push(this.tableData[i]);
                    flag = true;
                }
            }
            if (!flag) {
                this.showDialog('', 'info', false, '请先选择要发送的参数表');
                return;
            }
            var FundNM = [];
            var FundNo = [];
            themeInfo.forEach(function (item) {
                FundNM.push(item.fundnm);
                FundNo.push(item.fundid);
            });
            var themeData = {
                moduleType: 'param',
                FUNDNM: FundNM.join('，'),
                FUNDID: FundNo.join('，')
            };
            $.post({
                url: '/thirdPartyOperation/products/paramsMgmt/getThemeContent.ajax',
                data: themeData,
                success: function (result) {
                    if (result.error === 0) {
                        _this.themeTitle = result.data.title;
                        $('#editor1').html(result.data.content);
                        _this.showDialog('', 'email');
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
            if (this.contact.length == 0) {
                $.post({
                    url: '/thirdPartyOperation/products/paramsMgmt/getContact.ajax',
                    success: function (result) {
                        if (result.error === 0) {
                            _this.contact = result.data.employee;
                            _this.dept = result.data.dept;
                        } else {
                            _this.showDialog('list', 'info', false, result.msg);
                        }
                    }
                });
            }
        },
        getOrgData: function () {
            if (this.orgs.length == 0) {
                var _this = this;
                $.post({
                    url: '/thirdPartyOperation/products/paramsMgmt/getOrgData.ajax',
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
        add: function (index) {
            var _index = this.inSelected(this.viewData[index], this.tableData, 'fundid');
            this.tableData[_index].check = !this.tableData[_index].check;
        },
        removeExcel: function (index) {
            var _index = this.inSelected(this.excels[index], this.tableData, 'fundid');
            this.tableData[_index].check = false;
        },
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
            if (this.excels.length == 0) {
                this.showDialog('email', 'info', true, '附件不能为空');
                return;
            }
            if (this.excels.length > 5) {
                this.showDialog('email', 'info', true, '上传附件不能超过五个');
                return;
            }
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
                        receivernm: item.username ? item.username : item.contactor,
                        receivertype: item.username ? 1 : 2
                    });
                });
            }
            var params = {
                title: this.themeName,
                content: $('#editor1').html(),
                receiverList: JSON.stringify(receiverList)
            };
            for (var i = 1; i <= this.excels.length; i++) {
                params['filepath' + i] = this.excels[i - 1].filepath;
            }
            return params;
        },
        saveEmail: function () {
            var params = this.getEmailData();
            if (!params) {
                return;
            }
            var _this = this;
            $.post({
                url: '/thirdPartyOperation/products/paramsMgmt/saveEmail.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.initEmail();
                        _this.showDialog('email', 'info', false, result.msg);
                    } else {
                        _this.showDialog('email', 'info', true, result.msg);
                    }
                }
            });
        },
        sendEmail: function () {
            var params = this.getEmailData();
            if (!params) {
                return;
            }
            this.progress = true;//loading动画开始
            var _this = this;
            $.post({
                url: '/thirdPartyOperation/products/paramsMgmt/sendEmail.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.progress = false;//loading动画结束
                        _this.initEmail();
                        _this.showDialog('email', 'info', false, result.msg);
                    } else {
                        _this.progress = false;//loading动画结束
                        _this.showDialog('email', 'info', true, result.msg);
                    }
                }
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
        selectAll: function () {
            var _this = this;
            var _index = -1;
            if (this.allCheck) {
                this.viewData.forEach(function (item) {
                    _index = _this.inSelected(item, _this.tableData, 'fundid');
                    _this.tableData[_index].check = false;
                });
            } else {
                this.viewData.forEach(function (item) {
                    _index = _this.inSelected(item, _this.tableData, 'fundid');
                    _this.tableData[_index].check = true;
                });
            }
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
        //通讯录选择部门方法
        selectDept: function (deptOACode) {
            this.emailCurrentIndex = 0;
            this.emailCondition = '';
            this.deptOACode = deptOACode;
        },
        clearDept: function () {
            this.deptOACode = '';
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
            var params = {shortnm : this.orgShortNM};
            $.post({
                url: '/thirdPartyOperation/products/paramsMgmt/getOrgData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.orgs = result.data.channel;
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
            var params = {shortnm : shortnm};
            $.post({
                url: '/thirdPartyOperation/products/paramsMgmt/getOrgData.ajax',
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
                url: '/thirdPartyOperation/products/paramsMgmt/filter.ajax',
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

        }
    }
});