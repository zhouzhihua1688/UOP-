new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        appCode: '',
        shortLinkUri: '',
        deleteId: '',
        tableData: [],
        diaMsg: '',
        // 新增弹窗数据
        addAppCode: '',
        addAppName: '',
        addLongLinkUrl: '',
        addLongSchemaUrl: '',
        // 更新弹窗数据
        updateSerialNo: '',
        updateAppCode: '',
        updateAppName: '',
        updateLongLinkUrl: '',
        updateLongSchemaUrl: '',
        // 主表格分页数据
        currentIndex: 0,
        pageMaxNum: '10',
        condition: ''
    },
    computed: {
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
            }
            else {
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
        }
    },
    directives: {
        sort: {
            inserted(el, binding, vnode) {
                el.addEventListener('click', function () {
                    var tableData = vnode.context.tableData;
                    if ($(el).hasClass('sorting_asc')) {
                        $(el).removeClass('sorting_asc').addClass('sorting_desc');
                        if(el.dataset.prop == 'insertTimestamp'){
                            tableData.forEach(function (item) {
                                item.insertTimestamp2 = new Date(item.insertTimestamp.replace(/-/g, '/')).getTime();
                            });
                            tableData.sort(function (item1, item2) {
                                return item2['insertTimestamp2'] - item1['insertTimestamp2'];
                            });
                            // tableData.forEach(function (item) {
                            //     item.insertTimestamp = vnode.context.formatTime(item.insertTimestamp);
                            // });
                        }
                        else {
                            tableData.sort(function (item1, item2) {
                                return item2[el.dataset.prop] - item1[el.dataset.prop];
                            });
                        }

                    }
                    else if ($(el).hasClass('sorting_desc')) {
                        $(el).removeClass('sorting_desc').addClass('sorting_asc');
                        if(el.dataset.prop == 'insertTimestamp'){
                            tableData.forEach(function (item) {
                                item.insertTimestamp2 = new Date(item.insertTimestamp.replace(/-/g, '/')).getTime();
                            });
                            tableData.sort(function (item1, item2) {
                                return item1['insertTimestamp2'] - item2['insertTimestamp2'];
                            });
                            // tableData.forEach(function (item) {
                            //     item.insertTimestamp = vnode.context.formatTime(item.insertTimestamp);
                            // });
                        }
                        else {
                            tableData.sort(function (item1, item2) {
                                return item1[el.dataset.prop] - item2[el.dataset.prop];
                            });
                        }
                    }
                    else {
                        $('thead>tr>th[class*=sorting_]').each(function (index, item) {
                            $(item).removeClass('sorting_asc sorting_desc');
                        });
                        $(el).addClass('sorting_asc');
                        if(el.dataset.prop == 'insertTimestamp'){
                            tableData.forEach(function (item) {
                                item.insertTimestamp2 = new Date(item.insertTimestamp.replace(/-/g, '/')).getTime();
                            });
                            tableData.sort(function (item1, item2) {
                                return item1['insertTimestamp2'] - item2['insertTimestamp2'];
                            });
                            // tableData.forEach(function (item) {
                            //     item.insertTimestamp = vnode.context.formatTime(item.insertTimestamp);
                            // });
                        }
                        else {
                            tableData.sort(function (item1, item2) {
                                return item1[el.dataset.prop] - item2[el.dataset.prop];
                            });
                        }
                    }
                });
            }
        }
    },
    watch: {
        pageMaxNum: {
            handler: function (val, oldval) {
                this.currentIndex = 0;
            }
        }
    },
    mounted(){
        var _this = this;
        var dialogs = ['update', 'add', 'delete', 'info'];
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
            url: '/publicConfig/shortLink/linkConfig/search.ajax',
            success: function (result) {
                if (result.error === 0) {
                    _this.tableData = result.data;
                }
                else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });
    },
    methods: {
        // 短连接业务方法
        search: function () {
            $('thead>tr>th[class*=sorting_]').each(function (index, item) {
                $(item).removeClass('sorting_asc sorting_desc');
            });
            this.currentIndex = 0;
            var _this = this;
            var params = {};
            params.appCode = this.appCode;
            params.shortLinkUri = this.shortLinkUri;
            $.post({
                url: '/publicConfig/shortLink/linkConfig/search.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.tableData = result.data;
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        showUpdate: function (index) {
            this.updateSerialNo = this.viewData[index].serialNo;
            this.updateAppCode = this.viewData[index].appCode;
            this.updateAppName = this.viewData[index].appName;
            this.updateLongLinkUrl = this.viewData[index].longLinkUrl;
            this.updateLongSchemaUrl = this.viewData[index].longSchemaUrl;
            this.showDialog('', 'update');
        },
        update: function () {
            if (!this.updateAppName) {
                this.showDialog('add', 'info', true, '活动名称不能为空');
                return;
            }
            if (!this.updateLongLinkUrl) {
                this.showDialog('add', 'info', true, '长链接不能为空');
                return;
            }
            if (!/^(https?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/.test(this.updateLongLinkUrl)) {
                this.showDialog('add', 'info', true, '长链接格式有误');
                return;
            }
            var _this = this;
            var params = {
                serialNo: this.updateSerialNo,
                appCode: this.updateAppCode,
                appName: this.updateAppName,
                longLinkUrl: this.updateLongLinkUrl,
                longSchemaUrl: this.updateLongSchemaUrl
            };
            $.post({
                url: '/publicConfig/shortLink/linkConfig/update.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('update', 'info', false, result.msg);
                        $.post({
                            url: '/publicConfig/shortLink/linkConfig/search.ajax',
                            success: function (body) {
                                if (body.error === 0) {
                                    _this.tableData = body.data;
                                }
                            }
                        });
                    }
                    else {
                        _this.showDialog('update', 'info', true, result.msg);
                    }
                }
            });
        },
        showAdd: function () {
            this.addAppCode = '';
            this.addAppName = '';
            this.addLongLinkUrl = '';
            this.addLongSchemaUrl = '';
            this.showDialog('', 'add');
        },
        add: function () {
            if (!this.addAppCode) {
                this.showDialog('add', 'info', true, 'ID不能为空');
                return;
            }
            if (!this.addAppName) {
                this.showDialog('add', 'info', true, '活动名称不能为空');
                return;
            }
            if (!this.addLongLinkUrl) {
                this.showDialog('add', 'info', true, '长链接不能为空');
                return;
            }
            if (!/^(https?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/.test(this.addLongLinkUrl)) {
                this.showDialog('add', 'info', true, '长链接格式有误');
                return;
            }
            var _this = this;
            var params = {
                appCode: this.addAppCode,
                appName: this.addAppName,
                longLinkUrl: this.addLongLinkUrl,
                longSchemaUrl: this.addLongSchemaUrl
            };
            $.post({
                url: '/publicConfig/shortLink/linkConfig/add.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('add', 'info', false, result.msg);
                        $.post({
                            url: '/publicConfig/shortLink/linkConfig/search.ajax',
                            success: function (body) {
                                if (body.error === 0) {
                                    _this.tableData = body.data;
                                }
                            }
                        });
                    }
                    else {
                        _this.showDialog('add', 'info', true, result.msg);
                    }
                }
            });
        },
        showDelete: function (index) {
            this.deleteId = this.viewData[index].serialNo;
            this.showDialog('', 'delete');
        },
        deleteData: function () {
            var _this = this;
            var index = -1;
            if (this.currentIndex == this.middleData.length - 1 && this.viewData.length == 1) {
                this.prev();
            }
            index = this.inSelected({serialNo: this.deleteId}, this.tableData, 'serialNo');
            var params = {
                serialNo: this.tableData[index].serialNo
            };
            $.post({
                url: '/publicConfig/shortLink/linkConfig/deleteData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.tableData.splice(index, 1);
                        _this.showDialog('delete', 'info', false, result.msg);
                    }
                    else {
                        _this.showDialog('delete', 'info', true, result.msg);
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
        inSelected: function (item, arr, prop) {
            var _index = -1;
            arr.forEach(function (value, index) {
                if (item[prop] == value[prop]) {
                    _index = index;
                }
            });
            return _index;
        },
        formatTime: function (timestamp) {
            var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate())+ ' ';
            var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
            var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
            var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
            return Y+M+D+h+m+s;
        }
    }
});

