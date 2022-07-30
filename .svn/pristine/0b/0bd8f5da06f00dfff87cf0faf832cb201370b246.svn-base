var vm = new Vue({
    el: '#content',
    data: {
        //发邮件弹窗相关数据
        sendType: 0,
        recipient: [],
        copy: [],
        encryption: [],
        themeName: '',
        diaMsg: '',
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

        //最多上传数
        fileArr: ['1', '2', '3', '4', '5'],
        //当前选择项
        fileArrVal: '',
        //已发送成功文件
        succeedfile: [],
        //上传面板
        addition: false,
        //页面展示文件名
        fileName: [],
        //选择文件数
        fileNum: [],
        // loading动画
        progress: false,
        //提示信息
        title: '',
        titleBox: false,
        deleteFilePath: ''
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
        var _this = this;
        if (this.contact.length == 0) {
            $.post({
                url: '/thirdPartyOperation/mails/new/getContact.ajax',
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
    computed: {
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
        emailCondition: {
            handler: function (val, oldval) {
                this.emailCurrentIndex = 0;
            }
        }
    },
    methods: {
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
            var _this = this;
            this.initListShow('recipient');
            this.sendType = 1;
            this.showDialog('', 'list');
        },
        copyShow: function () {
            var _this = this;
            this.initListShow('copy');
            this.sendType = 2;
            this.showDialog('', 'list', true);
        },
        encryptionShow: function () {
            var _this = this;
            this.initListShow('encryption');
            this.sendType = 3;
            this.showDialog('', 'list', true);
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
            this.succeedfile = [];
            this.themeName = '';
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
                this.showDialog('', 'info', true, '至少填写一种收件人');
                return;
            }
            if (!this.themeName) {
                this.showDialog('', 'info', true, '邮件标题不能为空');
                return;
            }
           // if ($('#editor1').html().length > 4000) {
           //     this.showDialog('', 'info', true, '邮件内容超出限定长度');
           //    return;
           // }
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
            for (var i = 1; i <= this.succeedfile.length; i++) {
                params['filepath' + i] = this.succeedfile[i - 1].path;
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
                url: '/thirdPartyOperation/mails/new/saveEmail.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.initEmail();
                        _this.showDialog('', 'info', false, result.msg);
                    } else {
                        _this.showDialog('', 'info', true, result.msg);
                    }
                }
            });
        },
        sendEmail: function () {
            var params = this.getEmailData();
            if (!params) {
                return;
            }
            this.progress = true; //loading动画开始
            var _this = this;
            $.post({
                url: '/thirdPartyOperation/mails/new/sendEmail.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.progress = false; //loading动画结束
                        _this.initEmail();
                        _this.showDialog('', 'info', false, result.msg);
                    } else {
                        _this.progress = false; //loading动画结束
                        _this.showDialog('', 'info', true, result.msg);
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
        showDeleteFile: function (index) {
            this.deleteFilePath = this.succeedfile[index].path;
            this.showDialog('', 'delete');

        },
        deleteFile: function () {
            this.showDialog('delete', '');
            var params = {};
            params.filePath = this.deleteFilePath;
            var _this = this;
            $.post({
                url: '/thirdPartyOperation/mails/new/removeFile.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        var index = _this.inSelected({
                            path: _this.deleteFilePath
                        }, _this.succeedfile, 'path');
                        _this.succeedfile.splice(index, 1);
                    }

                }
            });
        },
        upload: function () {
            var _this = this;
            var arr = [];
            var fileArr = [];
            var size = '';
            var file = '';
            if (!this.fileNum.length || !this.fileName[0]) {
                this.title = '请选择文件';
                this.titleBox = true;
                this.addition = false;
                return;
            }
            //获取文件数组
            this.fileNum.forEach(function (val) {
                file = document.getElementById('uploadFile' + (val)).files[0];
                if (file) {
                    arr.push('uploadFile' + val);
                }
            });
            //检查已选择的文件大小
            this.fileNum.forEach(function (val) {
                file = document.getElementById('uploadFile' + (val)).files[0];
                if (file) {
                    fileArr.push(file.size);
                }
            });
            for (let i = 0; i < fileArr.length; i++) {
                if (fileArr[i] > 5242880) {
                    _this.title = '文件大小超出5M限制，请重新选择!';
                    _this.titleBox = true;
                    return;
                }
            }
            
            //选择文件面板隐藏
            this.addition = false;
            // loading展示
            this.progress = true;
            console.log(arr);
            $.ajaxFileUpload({
                url: '/thirdPartyOperation/mails/new/upload.ajax',
                type: 'POST',
                dataType: 'json',
                secureuri: false,
                fileElementId: arr,
                success: function (result) {
                    if (result.error == 0) {
                        //页面附件先清空，然后展示已经上传成功的文件
                        result.data.forEach(function (val) {
                            _this.succeedfile.push(val);
                        });
                        // 上传成功后 页面数据初始化
                        _this.fileArr = ['1', '2', '3', '4', '5'];
                        _this.fileName.splice(0);
                        _this.fileNum.splice(0);
                        _this.progress = false;
                        _this.title = '上传成功';
                        // _this.titleBox = true

                    } else {
                        _this.title = '文件上传失败,请重新上传';
                        _this.titleBox = true;
                        _this.fileArr = ['1', '2', '3', '4', '5'];
                        _this.fileName.splice(0);
                        _this.fileNum.splice(0);
                        _this.progress = false;
                    }
                }
            });
        },
        //依次选择文件
        selectFile: function () {
            var arr = [];
            var _this = this;
            var file;
            //检查上一个选择是否为空
            if (this.fileNum.length) {
                var selectedFile = document.getElementById('uploadFile' + (this.fileArrVal)).files[0];
                if (!selectedFile) {
                    this.fileArr.push(this.fileNum.pop());
                } else {
                    //检查已选择的文件大小
                    this.fileNum.forEach(function (val) {
                        file = document.getElementById('uploadFile' + (val)).files[0];
                        if (file) {
                            arr.push(file.size);
                        }
                    });
                    for (let i = 0; i < arr.length; i++) {
                        if (arr[i] > 5242880) {
                            console.log(arr[i]);
                            _this.title = '上一个文件大小超出5M，请重新选择!';
                            _this.titleBox = true;
                            return;
                        }
                    }
                }
            }
            var num = (parseInt(this.fileArr.length) - parseInt(this.succeedfile.length));
            console.log(num);
            if (this.fileArr.length && num) {
                var a = this.fileArr.splice(0, 1);
                console.log(a);
                this.fileArrVal = a[0];
                var addition = 'addition' + a[0];
                this.$refs[addition].click();
                this.fileNum.push(a[0])
            } else {
                this.title = '最多同时上传5个文件';
                this.titleBox = true;
                this.addition = false;
            }
        },
        //关闭上传窗口
        shutAddition: function () {
            this.addition = false;
            this.fileList = [];
        },
        // 读取文件名
        getName: function () {
            var selectedFile = document.getElementById('uploadFile' + this.fileArrVal).files[0];
            if (selectedFile) {
                var name = selectedFile.name; //读取选中文件的文件名
                this.fileName.push(name);
            }
        },
        // 删除指定文件
        delfile: function (event) {
            this.fileName.splice(event.target.dataset.ind, 1);
            var a = this.fileNum.splice(event.target.dataset.ind, 1);
            this.fileArr.push(a[0]);
            //清空选择项
            var num = parseInt(this.fileArr.length);
            document.getElementById('uploadFile' + num).value = '';
        },
        //模态框展示
        titleBoxShow: function () {
            if (this.title == '上传成功') {
                this.titleBox = false;
                this.addition = false;
            } else {
                this.titleBox = false;
                this.addition = true;
            }
        },
        changeExpand: function (index) {
            var ele = this.$refs["s" + index][0];
            var ul = this.$refs["s" + index][1];
            if (ele.classList.contains('tree-plus')) {
                //显示
                ele.classList.remove('tree-plus');
                ele.classList.add('tree-minus');
                if (ul) {
                    ul.classList.remove('hide');
                    ul.classList.add('show');
                }
            } else {
                //隐藏
                ele.classList.remove('tree-minus');
                ele.classList.add('tree-plus');
                if (ul) {
                    ul.classList.remove('show');
                    ul.classList.add('hide');
                }
            }
        },
        changeChildExpand: function (index) {
            var ele = this.$refs["c" + index][0];
            var ul = this.$refs["c" + index][1];
            if (ele.classList.contains('tree-plus')) {
                //显示
                ele.classList.remove('tree-plus');
                ele.classList.add('tree-minus');
                if (ul) {
                    ul.classList.remove('hide');
                    ul.classList.add('show');
                }
            } else {
                //隐藏
                ele.classList.remove('tree-minus');
                ele.classList.add('tree-plus');
                if (ul) {
                    ul.classList.remove('show');
                    ul.classList.add('hide');
                }
            }
        },
        showUpload: function () {
            this.addition = true;
            this.fileArr = ['1', '2', '3', '4', '5'];
            this.fileName.splice(0);
            this.fileNum.splice(0);
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

   
    },
    filters: {
        fileNameFilter: function (el) { //UUID过滤
            return el.replace(/__[\w\W]*\./g, '.')
        }
    }
});