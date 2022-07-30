new Vue({
    el: '#content',
    data: {
        // page data
        title: '',
        address: '',
        status: '',
        diaMsg: '',
        // dia data
        recipient: [],
        copy: [],
        encryption: [],
        themeName: '',
        excel: '',
        emailid: '',
        showSend: false,
        // table data
        tableData: [],
        currentIndex: 0,
        maxSpace: 5,
        pageMaxNum: '10',
        condition: '',
        // loading动画
        progress: false,
    },
    computed: {
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
            let currentIndex = parseInt(this.currentIndex);
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
            }
            else if (this.currentIndex <= this.maxSpace && this.middleData.length - this.currentIndex > this.maxSpace) {
                for (var i = 0; i < this.currentIndex + (2 * this.maxSpace - this.currentIndex); i++) {
                    arr.push(i + 1);
                }
            }
            else if (this.currentIndex > this.maxSpace && this.middleData.length - this.currentIndex <= this.maxSpace) {
                var space = this.middleData.length - this.currentIndex;
                for (var i = this.currentIndex - (2 * this.maxSpace - space); i < this.middleData.length; i++) {
                    arr.push(i + 1);
                }
            }
            else {
                for (var i = 0; i < this.middleData.length; i++) {
                    arr.push(i + 1);
                }
            }
            return arr;
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
        }
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
        $.post({
            url: '/thirdPartyOperation/mails/sent/search.ajax',
            success: function (result) {
                if (result.error == 0) {
                    _this.tableData = result.data;
                } else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });
        $('.date-picker').datepicker({
                autoclose: true,
                todayHighlight: true,
                format: 'yyyy-mm-dd',
                language: 'cn'
            })
            //show datepicker when clicking on the icon
            .next().on(ace.click_event, function () {
                $(this).prev().focus();
            });
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
                    } else {
                        $(el).removeClass('sorting_desc').addClass('sorting_asc');
                        tableData.sort(function (item1, item2) {
                            return item1['orderTime'] - item2['orderTime'];
                        });
                    }
                });
            }
        }
    },
    methods: {
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
        search: function () {
            $('thead>tr>th[class*=sorting_]').each(function (index, item) {
                $(item).removeClass('sorting_asc sorting_desc');
            });
            this.currentIndex = 0;
            var _this = this;
            if (!this.title && !this.address && !this.status && !$('#sendtime').val()) {
                $.post({
                    url: '/thirdPartyOperation/mails/sent/search.ajax',
                    success: function (result) {
                        if (result.error == 0) {
                            _this.tableData = result.data;
                        } else {
                            _this.showDialog('', 'info', false, result.msg);
                        }
                    }
                });
            } else {
                var params = {
                    title: this.title,
                    address: this.address,
                    status: this.status,
                    sendtime: $('#sendtime').val()
                };
                $.post({
                    url: '/thirdPartyOperation/mails/sent/searchCondition.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error == 0) {
                            _this.tableData = result.data;
                        } else {
                            _this.showDialog('', 'info', false, result.msg);
                        }
                    }
                });
            }
        },
        showEmail: function (index) {
            var item = this.viewData[index];
            this.emailid = item.emailid;
            this.showSend = item.showSend;
            var _this = this;
            var params = {
                emailid: item.emailid
            };
            $.post({
                url: '/thirdPartyOperation/mails/sent/searchCondition.ajax',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        _this.recipient = result.data[0].recipient;
                        _this.copy = result.data[0].copy;
                        _this.encryption = result.data[0].encryption;
                        _this.excel = result.data[0].excel;
                        _this.themeName = result.data[0].title;
                        $('#editor1').html(result.data[0].content);
                        _this.showDialog('', 'email');
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
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
                        address: item.address,
                        addresstype: 1,
                        receivernm: item.receivernm,
                        receivertype: item.receivertype
                    });
                });
            }
            if (this.copy.length > 0) {
                this.copy.forEach(function (item) {
                    receiverList.push({
                        address: item.address,
                        addresstype: 2,
                        receivernm: item.receivernm,
                        receivertype: item.receivertype
                    });
                });
            }
            if (this.encryption.length > 0) {
                this.encryption.forEach(function (item) {
                    receiverList.push({
                        address: item.address,
                        addresstype: 3,
                        receivernm: item.receivernm,
                        receivertype: item.receivertype
                    });
                });
            }
            var params = {
                emailid: this.emailid,
                title: this.themeName,
                content: $('#editor1').html(),
                receiverList: JSON.stringify(receiverList)
            };
            for (var i = 1; i <= this.excel.length; i++) {
                params['filepath' + i] = this.excel[i - 1].filepath;
            }
            return params;
        },
        sendEmail: function () {
            var params = this.getEmailData();
            console.log('params=', params);
            if (!params) {
                return;
            }
            // loading动画开始
            this.progress = true;
            var _this = this;
            $.post({
                url: '/thirdPartyOperation/mails/send/sendEmail.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        $.post({
                            url: '/thirdPartyOperation/mails/sent/search.ajax',
                            success: function (result) {
                                if (result.error == 0) {
                                    _this.progress = false;//loading动画结束
                                    _this.tableData = result.data;
                                }
                            }
                        });
                        _this.progress = false;//loading动画结束
                        _this.showDialog('email', 'info', false, result.msg)
                    } else {
                        _this.progress = false;//loading动画结束
                        _this.showDialog('email', 'info', true, result.msg);
                    }
                }
            });
        },
        saveEmail: function () {
            var params = this.getEmailData();
            console.log('params=', params);
            if (!params) {
                return;
            }
            var _this = this;
            $.post({
                url: '/thirdPartyOperation/mails/send/saveEmail.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        $.post({
                            url: '/thirdPartyOperation/mails/sent/search.ajax',
                            success: function (result) {
                                if (result.error == 0) {
                                    _this.tableData = result.data;
                                }
                            }
                        });
                        _this.showDialog('email', 'info', false, result.msg)
                    } else {
                        _this.showDialog('email', 'info', true, result.msg);
                    }
                }
            });
        },
        removefile: function (index) {
            this.excel.splice(index, 1);
        }
    },
    filters: {
        fileNameFilter: function (el) {//UUID过滤
            return el.replace(/_[\w\W]*\./g, '.')
        }
    }
});