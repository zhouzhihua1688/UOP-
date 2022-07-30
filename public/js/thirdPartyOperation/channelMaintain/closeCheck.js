new Vue({
    el: '#content',
    data: {
        diaMsg: '',
        //选择操作交易流水号
        tradeid: '',
        //交易操作说明
        tradeMsg: "",
        //选择操作文件流水号
        fileSeqNo: '',
        //文件操作说明
        fileMsg: '',
        //日期
        workDate: '',
        //文件数据表
        fileData: [],
        //交易数据表
        tradeData: [],
        //收市状态
        isClose: false,

        tradeCurrentIndex: 0,
        fileCurrentIndex: 0,
        tradePageMaxNum: '100',
        pageMaxNum: '100',
        //快查条件
        condition: '',
        tradeCondition: '',

        // title显示内容
        content: '',
        // loading 动画
        loading: false,
    },

    computed: {
        middleData: function () {
            var middleData = [];
            var filterData = [];
            var pageMaxNum = parseInt(this.tradePageMaxNum);
            var _this = this;
            this.tradeData.forEach(function (jsonObj) {
                var valueArr = [];
                for (var prop in jsonObj) {
                    valueArr.push(jsonObj[prop]);
                }
                for (var i = 0, len = valueArr.length; i < len; i++) {
                    if (valueArr[i]) {
                        if (valueArr[i].toString().indexOf(_this.tradeCondition) != -1) {
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
            let tradeCurrentIndex = parseInt(this.tradeCurrentIndex);
            return this.middleData[tradeCurrentIndex];
        },
        middleData2: function () {
            var middleData = [];
            var filterData = [];
            var pageMaxNum = parseInt(this.pageMaxNum);
            var _this = this;
            this.fileData.forEach(function (jsonObj) {
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
        viewData2: function () {
            let fileCurrentIndex = parseInt(this.fileCurrentIndex);
            return this.middleData2[fileCurrentIndex];
        },

    },
    watch: {
        tradePageMaxNum: {
            handler: function (val, oldval) {
                this.tradeCurrentIndex = 0;
            }
        },
        tradeCondition: {
            handler: function (val, oldval) {
                this.tradeCurrentIndex = 0;
            }
        },
        pageMaxNum: {
            handler: function (val, oldval) {
                this.fileCurrentIndex = 0;
            }
        },
        condition: {
            handler: function (val, oldval) {
                this.fileCurrentIndex = 0;
            }
        },
    },
    mounted: function () {
        var _this = this;
        _this.workDate = _this.getNowDate();
        var params = {};
        params.workDate = _this.workDate;
        _this.loading = true;
        //初始化数据
        $.get({
            url: '/thirdPartyOperation/channelMaintain/closeCheck/search.ajax',
            data: params,
            success: function (result) {
                console.log("result:", result);
                _this.loading = false;
                if (result.error == 0) {
                    if (result.data) {
                        _this.isClose = result.data.isClose;
                        console.log("isClose>", _this.isClose);
                        _this.tradeData = result.data.tradeData;
                        _this.fileData = result.data.fileData;
                    }
                } else {
                    _this.showDialog('', 'info', false, '数据获取失败');
                }
            },
            error: function () {
                _this.loading = false;
                _this.showDialog('', 'info', false, '数据获取失败');
            }
        });

        $('.date-picker').datepicker({
            autoclose: true,
            todayHighlight: true,
            format: 'yyyymmdd',
            language: 'cn'
        })
        //show datepicker when clicking on the icon
            .next().on(ace.click_event, function () {
            $(this).prev().focus();
        });


    },
    methods: {
        getNowDate: function () {
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            if (month < 10) {
                month = "0" + month;
            }
            if (day < 10) {
                day = "0" + day;
            }
            year = year.toString();
            month = month.toString();
            day = day.toString();
            var newDate = year + month + day;
            return newDate;
        },
        /*
        *   type = 1 交易数据表
        *   type = 2 文件数据表
        * */
        prev: function (type) {
            var _this = this;
            if (type == '1') {
                _this.tradeCurrentIndex <= 0 ? 0 : _this.tradeCurrentIndex--;
            } else {
                _this.fileCurrentIndex <= 0 ? 0 : _this.fileCurrentIndex--;
            }

        },
        next: function (type) {
            var _this = this;
            if (type == '1') {
                _this.tradeCurrentIndex >= _this.middleData.length - 1 ? _this.middleData.length - 1 : _this.tradeCurrentIndex++;
            } else {
                _this.fileCurrentIndex >= _this.middleData.length - 1 ? _this.middleData.length - 1 : _this.fileCurrentIndex++;
            }
        },
        changeIndex: function (type, index) {
            var _this = this;
            if (type == '1') {
                _this.tradeCurrentIndex = index - 1;
            } else {
                _this.fileCurrentIndex = index - 1;
            }
        },

        /*
        * 交易表显示title
        *
        *   type = 1 原状态
        *   type = 2 重置后状态
        *
        * */
        tradeEnter: function (type, id) {
            var _this = this;
            _this.tradeData.forEach(item => {
                if (item.gserialNo == id) {
                    if (type == 1) {
                        _this.content = item.innerretMsg;
                    } else {
                        _this.content = item.message;
                    }
                }
            });
        },
        /*
      * 文件表显示title
      *
      *   type = 1 原状态
      *   type = 2 重置后状态
      *
      * */
        fileEnter: function (type, id) {
            var _this = this;
            _this.fileData.forEach(item => {
                if (item.seqNo == id) {
                    if (type == 1) {
                        _this.content = item.expRetMsg;
                    } else {
                        _this.content = item.message;
                    }
                }
            });
        },

        //查询
        search: function () {
            var _this = this;
            _this.loading = true;
            _this.tradeCurrentIndex = 0;
            _this.fileCurrentIndex = 0;
            _this.workDate = $(".date-picker").val();
            var params = {};
            params.workDate = _this.workDate;
            console.log("search:", params);
            $.get({
                url: '/thirdPartyOperation/channelMaintain/closeCheck/search.ajax',
                data: params,
                success: function (result) {
                    _this.loading = false;
                    console.log("result:", result);
                    if (result.error == 0) {
                        _this.isClose = result.data.isClose;
                        _this.tradeData = result.data.tradeData;
                        _this.fileData = result.data.fileData;
                    }
                    else {
                        _this.tradeData = [];
                        _this.fileData = [];
                        _this.showDialog('', 'info', false, '数据获取失败');
                    }
                },
                error: function () {
                    _this.loading = false;
                    _this.showDialog('', 'info', false, '数据获取失败');
                }
            });
        },

        //交易操作显示
        showTradeCheck: function (type, selectId) {
            var _this = this;
            _this.tradeid = selectId;
            console.log("selectId", _this.tradeid);
            _this.showDialog('', 'tradeOp', false, "操作");
            return;
        },
        //文件操作显示
        showFileCheck: function (type, selectSeqNo) {
            var _this = this;
            _this.fileSeqNo = selectSeqNo;
            console.log("selectSeqNo", _this.fileSeqNo);
            _this.showDialog('', 'fileOp', false, "操作");
            return;
        },

        /*
        * 交易检查操作
        * type 操作类型
        *   type = 1 确认成功
        *   type = 2 确认失败
        *
        * */
        tradeCheck: function (type) {
            var _this = this;
            var tradeStatus;
            var tradeObj;
            _this.loading = true;
            if (type == 1) {
                //成功操作
                tradeStatus = 'SUCCESS';
            } else {
                //失败操作
                tradeStatus = 'FAIL';
            }
            console.log("tradeMsg:", _this.tradeMsg, "tradeStatus:", tradeStatus);

            //取到操作的对象
            _this.tradeData.forEach(item => {
                if (item.gserialNo == _this.tradeid) {
                    tradeObj = item;
                }
            });
            var tradeUpdateDto = {
                gserialNo: tradeObj.gserialNo,
                message: _this.tradeMsg,
                operater: '',
                tradeType: tradeObj.tradeType,
                updateStatus: tradeStatus,
            };
            var params = {};
            params.tradeUpdateDto = tradeUpdateDto;
            console.log("trade check", params);
            $.post({
                url: '/thirdPartyOperation/channelMaintain/closeCheck/tradeCheck.ajax',
                data: params,
                success: function (result) {
                    _this.loading = false;
                    if (result.error == 0) {
                        _this.tradeMsg = '';
                        var data = result.data;
                        console.log(data);
                        _this.showDialog('', 'info', false, "操作成功");
                        _this.search();
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                },
                error: function () {
                    _this.loading = false;
                    _this.showDialog('', 'info', false, '数据获取失败');
                }
            });

        },
        /*
        * 文件检查操作
        * type 操作类型
        *   type = 1 强制完成
        *
        * */
        fileCheck: function (type) {
            var _this = this;
            _this.loading = true;
            var fileStatus;
            var fileObj;
            if (type == 1) {
                //成功操作
                fileStatus = 'SUCCESS';
            }
            console.log("fileMsg:", _this.fileMsg, "fileStatus:", fileStatus);

            //取到操作的对象
            // _this.fileData.forEach(item => {
            //     if (item.seqNo == _this.fileSeqNo) {
            //         fileObj = item;
            //     }
            // });
            // console.log("seqNo", _this.fileSeqNo, "seqNo2", fileObj.seqNo);
            var fileUpdateDto = {
                message: _this.fileMsg,
                seqNo: _this.fileSeqNo,
                operater: '',
            };
            var params = {};
            params.fileUpdateDto = fileUpdateDto;
            console.log(params);
            $.post({
                url: '/thirdPartyOperation/channelMaintain/closeCheck/fileCheck.ajax',
                data: params,
                success: function (result) {
                    _this.loading = false;
                    if (result.error == 0) {
                        _this.fileMsg = '';
                        var data = result.data;
                        console.log(data);
                        _this.showDialog('', 'info', false, "操作成功");
                        _this.search();
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                },
                error: function () {
                    _this.loading = false;
                    _this.showDialog('', 'info', false, '数据获取失败');
                }
            });

        },

        //收市检查 ， 过时
        tradeCloseCheck: function () {
            var _this = this;
            _this.loading = true;
            var params = {};
            params.workDate = $(".date-picker").val();
            console.log(params);
            $.get({
                url: '/thirdPartyOperation/channelMaintain/closeCheck/tradeCloseCheck.ajax',
                data: params,
                success: function (result) {
                    _this.loading = false;
                    console.log(result);
                    if (result.error == 0) {
                        if (!result.data) {
                            //不能收市
                            _this.showDialog('', 'info', false, '不能收市');
                        } else {
                            _this.tradeClose();
                        }

                    }
                    else {
                        _this.showDialog('', 'info', false, '数据获取失败');
                    }
                },
                error: function () {
                    _this.loading = false;
                    _this.showDialog('', 'info', false, '数据获取失败');
                }
            });
        },
        //收市弹框
        showTradeClose: function () {
            var _this = this;
            _this.showDialog('', 'comMsg', false, "日期 [ " + _this.workDate + " ] 是否执行收市");
        },
        //收市
        tradeClose: function () {
            var _this = this;
            _this.loading = true;
            var closeDto = {
                workDate: $(".date-picker").val(),
                operater: "",
            };
            var params = {};
            params.closeDto = closeDto;
            console.log(params);
            $.post({
                url: '/thirdPartyOperation/channelMaintain/closeCheck/tradeClose.ajax',
                data: params,
                success: function (result) {
                    _this.loading = false;
                    console.log(result);
                    if (result.error == 0) {
                        _this.showDialog('', 'info', false, "收市完成");
                        //todo:
                        //收市状态
                        _this.isClose = true;
                        _this.search();
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                },
                error: function () {
                    _this.loading = false;
                    _this.showDialog('', 'info', false, '数据获取失败');
                }
            });
        },

        // 公共方法
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
        getUrlParam: function (name) {
            console.log("name>>", name);

            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            console.log("reg>>", reg);
            var r = window.location.search.substr(1).match(reg);  //匹配目标参数
            console.log("r>>", r);

            if (r != null) return unescape(r[2]);

            return ''; //返回参数值
        }

    },
    //格式化时间戳
    filters: {
        time: function (obj) {
            if (obj) {
                var date = new Date(obj);
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                var d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                var h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                var minute = date.getMinutes();
                var second = date.getSeconds();
                minute = minute < 10 ? ('0' + minute) : minute;
                second = second < 10 ? ('0' + second) : second;
                return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
            }
        },
        // 文件状态
        fstatusConverter: function (item) {
            if (item) {
                item = item.toUpperCase();
                if (item === "N") {
                    return "初始化"
                } else if (item === "E") {
                    return "异常"
                } else if (item === "R") {
                    return "执行中"
                } else if (item === "S") {
                    return "成功"
                } else {
                    return item
                }
            }
        },
        // 交易状态
        tstatusConverter: function (item) {
            if (item) {
                item = item.toUpperCase();
                if (item === "TI") {
                    return "交易处理中"
                } else if (item === "TS") {
                    return "交易成功"
                } else if (item === "AS") {
                    return "交易成功"
                } else if (item === "PS") {
                    return "部分成功"
                } else if (item === "DR") {
                    return "待发起"
                } else if (item === "TF") {
                    return "交易失败"
                } else if (item === "CI") {
                    return "撤单处理中"
                } else if (item === "CS") {
                    return "撤单成功"
                } else if (item === "RI") {
                    return "冲正处理中"
                } else if (item === "RS") {
                    return "冲正成功"
                } else if (item === "AI") {
                    return "TA确认中"
                } else if (item === "AF") {
                    return "TA确认失败"
                } else if (item === "HN") {
                    return "HOP待发起"
                } else if (item === "HI") {
                    return "HOP发起中"
                } else {
                    return item
                }
            }
        },
        //产品类型
        tradeTypeConverter: function (type) {
            if (type) {
                if (type === "FDG") {
                    return "组合产品"
                } else if (type === "FUND") {
                    return "普通基金"
                } else {
                    return type
                }
            }
        },
        fileNmConverter: function (filepath) {
            if (filepath.indexOf("/") != -1) {
                var arr = filepath.split("/");
                var fileNm = arr[arr.length - 1];
                return fileNm;
            }
            if (filepath.indexOf("\\") != -1) {
                var arr = filepath.split("\\");
                var fileNm = arr[arr.length - 1];
                return fileNm;
            }
        },


    },


});