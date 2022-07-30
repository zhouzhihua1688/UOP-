var vm = new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        ruleId: '',
        groupId: '',
        custNo: '',
        itemData: {},
        filterDate: '',
        tableData: [],
        ruleList:[],
        groupIdList:[],
        list1: [],
        list2: [],
        diaMsg: '',
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        pageMaxNum: '10',
        condition: '',
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
        checkAll: function () {
            if (this.tableData.length > 0) {
                return this.tableData.every(function (item) {
                    return item.check;
                });
            }
            return false;
        }
    },
    watch: {
        pageMaxNum: {
            handler: function (val, oldval) {
                this.currentIndex = 0;
            }
        }
    },
    created: function () {
        this.getRuleList();
        this.getGroupIdList();
    },
    mounted: function () {
        var dialogs = ['info', 'fundList', 'uploadTransfer'];
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
        $('#downloadExcel').click(function () {
            var elt = document.getElementById('data-table');
            var wb = XLSX.utils.table_to_book(elt, {sheet: 'Sheet JS'});
            XLSX.writeFile(wb, '上传模板示例.xlsx');
        });
        $('#select2GroupId').css('width', '140px').select2({});
        $("#select2GroupId").on("select2:select", function (e) {
            // e 的话就是一个对象 然后需要什么就 “e.参数” 形式 进行获取
            this.groupId = e.params.data.id;
        }.bind(this));
        $('#select2RuleId').css('width', '140px').select2({});
        $("#select2RuleId").on("select2:select", function (e) {
            // e 的话就是一个对象 然后需要什么就 “e.参数” 形式 进行获取
            this.ruleId = e.params.data.id;
        }.bind(this));
				console.log(moment(new Date()).format('YYYY-MM-DD'));
				this.filterDate = moment(new Date()).format('YYYY-MM-DD');
        this.getTableData();
    },
    methods: {
        getRuleList:function(){
            $.post({
                url: '/investmentMgmt/investmentAccount/indicatorMonitoring/queryRuleList.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        this.ruleList = result.data;
                    } else {
                        this.showDialog('', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },
        getGroupIdList:function(){
            $.post({
                url: '/investmentMgmt/investmentAccount/indicatorMonitoring/queryGroupIdList.ajax',
                success: function (result) {
                    if (result.error === 0) {
											console.log(result.data);
                        this.groupIdList = result.data;
                        // var newobj={};
                        // Object.keys(this.groupIdList).sort((a,b)=>a.replace('A','')-b.replace('A','')).forEach((key)=>{newobj[key]=this.groupIdList[key]});
                        // this.groupIdList = newobj;
                    } else {
                        this.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
        getTableData: function () {
            var params = {};
            this.ruleId && (params.ruleId = this.ruleId);
            this.groupId && (params.groupId = this.groupId);
            this.custNo && (params.custNo = this.custNo);
            this.filterDate && (params.filterDate = this.filterDate.replace(/-/g, ''));
            $.post({
                url: '/investmentMgmt/investmentAccount/indicatorMonitoring/query.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.currentIndex = 0;
                        this.tableData = result.data;
                    } else {
                        this.showDialog('', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },
        
        transfer: function (item) {
            var params = item || this.itemData;
            console.log(params);
            $.post({
                url: '/investmentMgmt/investmentAccount/indicatorMonitoring/transfer.ajax',
                data: params,
                success: function (result) {
                    this.showDialog('fundList');
                    this.showDialog('', 'info', false, result.msg);
                }.bind(this)
            });
        },
        uploadTransfer: function() {
            $('#uploadFileInput').change(function () {
                $('#uploadInput').val($(this).val());
            });
            $('#uploadInput').val('');
            $('#uploadFileInput').val('');
            this.showDialog('', 'uploadTransfer');
        },
        batchUploadTransfer: function () {
            var excelData = $('#uploadFileInput').get(0).files[0];
            if (!excelData) {
                this.showDialog('uploadTransfer', 'info', true, '未选择文件');
                return;
            }
            var fileType = excelData.name.split('.')[excelData.name.split('.').length - 1];
            if (fileType !== 'xlsx') {
                this.showDialog('uploadTransfer', 'info', true, '上传文件格式错误,请上传.xlsx文件');
                return;
            }
            //转化文件成json格式
            var _this = this;
            var reader = new FileReader();
            reader.onload = function (e) {
                var data = e.target.result;
                var workbook = XLSX.read(data, {type: 'binary'});
                var fromTo = '';
                var jsonData = [];
                // 遍历每张表读取
                for (var sheet in workbook.Sheets) {
                    if (workbook.Sheets.hasOwnProperty(sheet)) {
                        fromTo = workbook.Sheets[sheet]['!ref'];
                        jsonData = jsonData.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                        break;
                    }
                }
                console.log('前端解析文件数据为: ', jsonData);
                $.post({
                    url: '/investmentMgmt/investmentAccount/indicatorMonitoring/batchTransfer.ajax',
                    data: {transferData: JSON.stringify(jsonData)},
                    success: function (result) {
                        if (result.error === 0) {
                            _this.showDialog('uploadTransfer', 'info', false, result.msg);
                        }
                        else {
                            _this.showDialog('uploadTransfer', 'info', false, result.msg);
                        }
                    },
                    error: function () {
                        _this.showDialog('uploadTransfer', 'info', false, '网络超时,请稍后重试');
                    }
                });
            };
            reader.readAsBinaryString(excelData);
        },

        batchTransfer: function () {
            if (this.tableData.filter(function (item) {
                return item.check
            }).length === 0) {
                return this.showDialog('', 'info', false, '请勾选要调仓的数据');
            }
            var params = this.tableData.filter(function (item) {
                return item.check;
            }).map(function (item) {
                return {
                    balanceSerialNo: item.balanceSerialNo,
                    custNo: item.custNo,
                    recordDate: item.date,
                    arAcct: item.arAcct,
                    groupId: item.groupId,
                    ruleId: item.ruleId,
                    branchCode: '247',
                    accptMd: '2',
                    transPosMode: '1' //标准调仓
                };
            });
            $.post({
                url: '/investmentMgmt/investmentAccount/indicatorMonitoring/batchTransfer.ajax',
                data: {
                    transferData: JSON.stringify(params)
                },
                success: function (result) {
                    this.showDialog('', 'info', false, result.msg);
                }.bind(this)
            });
        },
        showDetail: function (item) {
            this.itemData = item;
            $.post({
                url: '/investmentMgmt/investmentAccount/indicatorMonitoring/getDetail.ajax',
                data: item,
                success: function (result) {
                    if (result.error === 0) {
                        this.list1 = result.data.list1;
                        this.list2 = result.data.list2;
                        this.showDialog('', 'fundList');
                    } else {
                        this.showDialog('', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },
        allCheck: function () {
            var flag = this.checkAll;
            this.tableData.forEach(function (item) {
                item.check = !flag;
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
        toFirst: function () {
            this.currentIndex = 0;
        },
        toLast: function () {
            this.currentIndex = this.middleData.length - 1;
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
        }
    },
    components: {
        'date-picker': VueBootstrapDatetimePicker
    }
});

