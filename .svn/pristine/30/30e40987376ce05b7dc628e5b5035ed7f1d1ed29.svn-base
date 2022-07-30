new Vue({
    el: '#content',
    data: {
        ymonth: '',
        faretype: '',
        groupnm: "",
        gName: '',
        selectNm: '',
        selectFaretype: "1",
        exportType: "",
        //1：按选择分组导出，0：按选择渠道分组
        expTp:"",
        groups: [],
        tableData: [],
        diaMsg: "",
        // 全选
        allCheck: false,
        invertCheck: false,
        //   表格分页
        currentIndex: 0,
        pageMaxNum: '80',
        condition: ''
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
            var currentIndex = parseInt(this.currentIndex);
            return this.middleData[currentIndex];
        },
        /*   selectAll: function () {
               alert("select ")
               return this.viewData.length ? this.viewData.every(function (item) {
                   return item.check;
               }) : false;
           }*/
    },
    watch: {
        pageMaxNum: {
            handler: function (val, oldval) {
                this.currentIndex = 0;
            }
        },
        homePageMaxNum: {
            handler: function (val, oldval) {
                this.homeCurrentIndex = 0;
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
        var dialogs = ['', '', '', 'info'];
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

        //初始化数据
        $.get({
            url: '/thirdPartyOperation/expenseMgmt/export/search.ajax',
            success: function (result) {
                console.log(result)
                if (result.error == 0) {
                    var mon = result.data.ymonth;
                    if (mon.indexOf("-" != -1)) {
                        var ymonth1 = mon.substr(0, 4) + "-" + mon.substr(4, 2);
                        $("#ymonth").val(ymonth1)
                    } else {
                        $("#ymonth").val(mon)
                    }
                    _this.groups = result.data.groups;
                    if (result.data.groups) {
                        _this.tableData = _this.convertTableData(result.data.tableDate, 5);
                        _this.selectNm = result.data.groups[0].groupnm;
                        _this.gName = result.data.groups[0].groupnm;
                    }
                } else {
                    _this.showDialog('', 'info', false, '数据获取失败');
                }
            },
            error: function () {
                _this.showDialog('', 'info', false, '数据获取失败');
            }
        });

    },
    methods: {

        //通过faretype获取分组及显示分组详情
        init: function (faretype) {
            var _this = this;
            var params = {};
            params.ymonth = $(".date-picker").val().replace("-", "");
            params.faretype = _this.selectFaretype;
            console.log(params);
            $.get({
                url: '/thirdPartyOperation/expenseMgmt/export/search.ajax',
                data: params,
                success: function (result) {
                    console.log(result)
                    if (result.error == 0) {
                        var mon = result.data.ymonth;
                        if (mon.indexOf("-" != -1)) {
                            _this.ymonth = mon.substr(0, 4) + "-" + mon.substr(4, 2);
                        } else {
                            _this.ymonth = mon;
                        }
                        _this.groups = result.data.groups;
                        if (result.data.groups.length > 0) {
                            _this.tableData = _this.convertTableData(result.data.tableDate, 5);
                            _this.selectNm = result.data.groups[0].groupnm;
                            _this.gName = result.data.groups[0].groupnm;
                        } else {
                            _this.gName = "";
                            _this.tableData = [];
                            _this.selectNm = "";
                        }
                    } else {
                        _this.showDialog('', 'info', false, '数据获取失败');
                    }
                },
                error: function () {
                    _this.showDialog('', 'info', false, '数据获取失败');
                }
            });
        },
        selectGroupDetail: function (groupnm) {
            var _this = this;
            var params = {};
            params.groupnm = groupnm;
            var url;
            $.get({
                url: '/thirdPartyOperation/expenseMgmt/export/qryGroupDetail.ajax',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        var data = result.data;
                        console.log(data);
                        _this.tableData = _this.convertTableData(result.data.tableDate, 5);
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        //导出入口
        exportExcel: function (type) {
            var _this = this;
            _this.exportType = type;
            if (_this.selectNm == 0) {
                if (type == "1") {
                    _this.showDialog('', 'dexp1', false, "当前选择渠道未保存，确定执行导出？");
                } else {
                    _this.showDialog('', 'dexp2', false, "当前选择渠道未保存，确定执行导出？");
                }
            } else {
                _this.exportCheck("1");
            }
        },
        //按选中分组导出
        exportDownload: function (type) {
            var _this = this;
            var params = {};
            params.ymonth = $(".date-picker").val().replace("-", "");
            params.faretype = $("#feiyong option:selected").val();
            params.groupnm = _this.selectNm;
            console.log(params);
            var url;
            if (type === '1') {
                url = '/thirdPartyOperation/expenseMgmt/export/exportAll.ajax?' +
                    'ymonth=' + params.ymonth + '&faretype=' + params.faretype + '&groupnm=' + params.groupnm + '&type=' + type;
            } else if (type === '2') {
                url = '/thirdPartyOperation/expenseMgmt/export/exportAll.ajax?' +
                    'ymonth=' + params.ymonth + '&faretype=' + params.faretype + '&groupnm=' + params.groupnm + '&type=' + type;
            }
            window.location.href = url;
        },
        //按选择渠道导出
        exportWithNoGroup: function (type) {
            var _this = this;
            var checkedBranch = [];
            $("[name='checkBranch']:checked").each(function () {
                checkedBranch.push($(this).val());
            });
            var params = {};
            params.ymonth = $(".date-picker").val().replace("-", "");
            params.faretype = $("#feiyong option:selected").val();
            params.branchs = encodeURI(checkedBranch);
            console.log(params);
            var url;
            url = '/thirdPartyOperation/expenseMgmt/export/expByBranch.ajax?' +
                'ymonth=' + params.ymonth + '&faretype=' + params.faretype + '&type=' + type + '&branchs=' + params.branchs;
            window.location.href = url;
        },
        //校验费用计算是否完成
        exportCheck:function(expTp){
            var _this = this;
            _this.expTp = expTp;
            var params = {};
            params.ymonth = $(".date-picker").val().replace("-", "");
            params.faretype = _this.selectFaretype;
            console.log(params);
            $.get({
                url: '/thirdPartyOperation/expenseMgmt/export/exportCheck.ajax',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        var data = result.data;
                        console.log(data);
                        if (!data){
                            _this.showDialog('', 'comMsg', false, "没有报表");
                        }else {
                            //正常导出 _this.exportType
                            if (_this.expTp == "0"){
                                _this.exportWithNoGroup(_this.exportType);
                            } else {
                                _this.exportDownload(_this.exportType);
                            }
                        }
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        //保存分组
        saveGroup: function () {
            var _this = this;
            var checkedBranch = [];
            $("[name='checkBranch']:checked").each(function () {
                checkedBranch.push($(this).val());
            });
            if (checkedBranch.length == 0) {
                _this.showDialog('', 'comMsg', false, "先勾选再保存");
                return;
            }
            var params = {};
            params.branchDetails = checkedBranch;
            params.groupnm = _this.gName;
            params.faretype = _this.selectFaretype;
            console.log(params);
            $.post({
                url: '/thirdPartyOperation/expenseMgmt/export/saveGroup.ajax',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        var data = result.data;
                        console.log(data);
                        _this.showDialog('', 'comMsg', false, "保存成功");
                        _this.init(_this.selectFaretype);
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        updateGroup: function () {
            var _this = this;
            var checkedBranch = [];
            $("[name='checkBranch']:checked").each(function () {
                checkedBranch.push($(this).val());
            });
            if (checkedBranch.length == 0) {
                _this.showDialog('', 'comMsg', false, "未选择渠道");
                return;
            }
            var params = {};
            params.branchDetails = checkedBranch;
            params.groupnm = _this.gName;
            params.faretype = _this.selectFaretype;
            console.log(params);
            $.post({
                url: '/thirdPartyOperation/expenseMgmt/export/updateGroup.ajax',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        var data = result.data;
                        console.log(data);
                        _this.showDialog('', 'comMsg', false, "更新成功");
                        _this.init(_this.selectFaretype);
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        /*   getInputVal: function (event) {
               var _this = this;
               _this.gName = event.currentTarget.value;
           },*/
        //新增分组查询直、代销渠道
        selectAllBranch: function (faretype) {
            var _this = this;
            var params = {};
            params.faretype = faretype;
            $.get({
                url: '/thirdPartyOperation/expenseMgmt/export/qryAllBranch.ajax',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        var data = result.data;
                        console.log(data);
                        _this.tableData = _this.convertTableData(result.data.tableDate, 5);
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },

        //删除分组
        showDeleteGroup: function () {
            var _this = this;
            if (_this.selectNm == "0") {
                //为选择分组
                _this.showDialog('', 'comMsg', false, "当前未选择要删除的分组");
                return;
            } else {
                _this.showDialog('', 'del', false, "确定要删除分组：[ " + _this.gName + " ]");
            }
        },
        deleteGroup: function () {
            var _this = this;
            var params = {};
            params.groupnm = _this.selectNm;
            console.log(params);
            $.get({
                url: '/thirdPartyOperation/expenseMgmt/export/deleteGroup.ajax',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        var data = result.data;
                        console.log(data);
                        _this.showDialog('', 'comMsg', false, "删除成功");
                        _this.init(_this.selectFaretype);
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
            window.location.reload();
        },
        changeTable: function (selectNm) {
            var _this = this;
            var name = $("#sg option:selected").val();
            if (!name) {
                return;
            }
            if (_this.selectNm == "0") {
                //新增分组
                _this.selectNm = "0";
                //将名称改为新增分组
                _this.gName = '新增分组';
                //查询渠道
                _this.selectAllBranch(_this.selectFaretype);

            } else {
                _this.selectGroupDetail(name);
                //为 分明名称 赋值
                _this.groups.forEach(item => {
                    if (name == item.groupnm) {
                        _this.gName = item.groupnm;
                    }
                });
            }
        },
        changeFaretype: function (selectFaretype) {
            var _this = this;
            _this.init(selectFaretype);
        },
        check: function (index) {
            index.check = !index.check;
        },
        // 用户全选
        selectAll: function (allCheck) {
            var _this = this;
            //如果父级被选中，那么子集循环，全被给checked=true
            if (!allCheck) {
                _this.tableData.forEach(function (item) {
                    item.forEach(function (item1) {
                        item1.isCheck = true;
                    });
                });
            } else {
                //相反，如果没有被选中，子集应该全部checked=false
                _this.tableData.forEach(function (item) {
                    item.forEach(function (item1) {
                        item1.isCheck = false;
                    });
                });
            }
        },
        // 用户反选
        invertSelection: function (allCheck) {
            var _this = this;
            _this.tableData.forEach(function (item) {
                item.forEach(function (item1) {
                    item1.isCheck = !item1.isCheck;
                });
            });
        },
        convertTableData: function (data, length) {
            var strLength = Math.ceil(data.length / length);
            var ret = new Array(strLength);
            for (var i = 0; i < strLength; i++) {
                let l = data.length - length * (i + 1);
                let len = length;
                if (l < 0) len = data.length - length * i;
                ret[i] = new Array(len);
                for (var j = 0; j < len; j++) {
                    ret[i][j] = data[i * length + j];
                }
            }
            console.log(ret);
            return ret;
        }
        ,
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
        }

    },
    filters:
        {//格式化时间戳
            time: function (obj) {
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
            },

        }
})
;