Vue.component('selectChosen', {
    template: '<select class="chosen-select form-control" ref="sele" >' +
        '<option value="">全部</option>' +
        '<option :value="item.groupid"  v-for="item of list">{{item.groupid}} &nbsp;-&nbsp; {{item.groupName}}</option>' +
        '</select>',
    model: {
        prop: "value",
        event: "change",
    },
    props: {
        value: {
            validator: function () {
                return true;
            },
        },
        list: {
            type: [Object, Array],
            default: function () {
                return [];
            },
        }
    },
    mounted: function () {
        $(this.$refs.sele).chosen({
            search_contains: true,
            no_results_text: '未找到',
            disable_search_threshold: 6,
            width: '184px'
        });
        $(this.$refs.sele).on('change', function (e, params) {
            this.$emit('change', params.selected)
        }.bind(this));
    },
    updated: function () {
        if (this.value === '') {
            $(this.$refs.sele).val('');
        }
        $(this.$refs.sele).trigger("chosen:updated");
    },
})

new Vue({
    el: '#content',
    data: function () {
        this.baseUrl = '/productIndexes/monitoring/threeSidesLogs';
        return {
            diaMsg: '',
            //主表格分页数据
            currentIndex: 0,
            maxSpace: 5,
            pageMaxNum: 10,
            condition: '',

            tableData: [],
            // 查询
            groupList: [],
            groupId: '',
            //新增or修改
            threeSidesGroupList: [],
            modifyStatus: false,
            operateData: {
                groupid: '',
                prdAllFundgroupShiftDetailROList: [{
                    bidEndDate: '',
                    bidEndTime: '',
                    bidStartDate: '',
                    bidStartTime: '',
                    period: 1,
                    _id: Date.now()
                }]
            }
        }
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
    },
    watch: {
        pageMaxNum: function () {
            this.currentIndex = 0;
        },
        condition: function () {
            this.currentIndex = 0;
        }
    },
    created: function () {
        // $.post({
        //     url: `${this.baseUrl}/labels.ajax`,
        //     data: {
        //         type: '2'
        //     },
        //     success: function (result) {
        //         if (result.error === 0) {
        //             this.groupList = result.data
        //         } else {
        //             this.showDialog("", "info", false, result.msg)
        //         }
        //     }.bind(this)
        // });
        this.getTableData();
        this.threeSidesGroup();
    },
    mounted: function () {
        var _this = this;
        var dialogs = ['delete', 'info'];
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
    },
    methods: {
        moment: moment,
        warnDate: function (index, item) {
            // 此次调仓日期必须大于上次调仓日期
            if (index === 0) {
                return '';
            }
            var date = Date.parse(item[index - 1].bidEndDate);
            var nowDate = Date.parse(item[index].bidStartDate);
            if (nowDate <= date) {
                return '此次开始时间必须大于上次结束时间';
            } else {
                return '';
            }
        },
        getTableData: function () {
            this.currentIndex = 0;
            var params = {
                groupId: this.groupId
            };
            $.post({
                url: `${this.baseUrl}/tableData.ajax`,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.tableData = result.data;
                    } else {
                        this.showDialog('', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },
        threeSidesGroup: function () {
            $.post({
                url: `${this.baseUrl}/threeSidesGroup.ajax`,
                success: function (result) {
                    if (result.error === 0) {
                        this.threeSidesGroupList = result.data
                        this.groupList = result.data
                    } else {
                        this.showDialog('', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },
        showAdd: function () {
            this.modifyStatus = false;
            this.operateData = {
                groupid: '',
                prdAllFundgroupShiftDetailROList: [{
                    bidEndDate: '',
                    bidEndTime: '',
                    bidStartDate: '',
                    bidStartTime: '',
                    period: 1,
                    _id: Date.now()
                }]
            }
            this.showDialog('', 'operate');
        },
        showUpdate: function (groupId) {
            this.modifyStatus = true;
            $.post({
                url: `${this.baseUrl}/detail.ajax`,
                data: {
                    groupId: groupId
                },
                success: function (result) {
                    if (result.error === 0) {
                        result.data.length && (this.operateData.groupid = result.data[0].groupid)
                        this.operateData.prdAllFundgroupShiftDetailROList = result.data.map(function (item) {
                            var EndDate = moment(item.bidEndDate + " " + item.bidEndTime).format("YYYY-MM-DD HH:mm:ss")
                            var StartDate = moment(item.bidStartDate + " " + item.bidStartTime).format("YYYY-MM-DD HH:mm:ss")
                            return {
                                bidEndDate: EndDate,
                                bidEndTime: '',
                                bidStartDate: StartDate,
                                bidStartTime: '',
                                period: item.period,
                                _id: Math.random()
                            }
                        })
                        this.showDialog('', 'operate');
                    } else {
                        this.showDialog('', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },
        addOrModify: function () {
            if (this.operateData.groupid === '') {
                return this.showDialog('operate', 'info', true, '请选择组合');
            }
            var flag = '';
            var params = {
                groupid: this.operateData.groupid,
                prdAllFundgroupShiftDetailROList: this.operateData.prdAllFundgroupShiftDetailROList.map(function (item) {
                    var EndDate = item.bidEndDate;
                    var StartDate = item.bidStartDate;
                    if (!EndDate || !StartDate) {
                        flag = '请选择时间';
                    }
                    if (item.period < 1) {
                        flag = '期数必须大于等于1';
                    }
                    if (Date.parse(EndDate) <= Date.parse(StartDate)) {
                        flag = '开始时间必须小于结束时间';
                    }
                    return {
                        bidEndDate: moment(EndDate).format("YYYYMMDD"),
                        bidEndTime: moment(EndDate).format("HHmmss"),
                        bidStartDate: moment(StartDate).format("YYYYMMDD"),
                        bidStartTime: moment(StartDate).format("HHmmss"),
                        period: item.period
                    }
                }, this)
            };
            this.$refs.tips.some(function (el) {
                if (el.innerText) {
                    flag = el.innerText;
                    return true;
                }
            })
            if (!this.modifyStatus) {//新增时验证，修改时不验证
                this.tableData.some(function (item) {
                    if (item.groupid === params.groupid) {
                        flag = `组合ID${item.groupid}已存在，不可再次新增`;
                        return true;
                    }
                })
            }
            if (flag) {
                return this.showDialog('operate', 'info', true, flag);
            }
            $.post({
                url: `${this.baseUrl}/addOrModify.ajax`,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.getTableData();
                        this.showDialog('operate', 'info', false, result.msg);
                    } else {
                        this.showDialog('operate', 'info', true, result.msg);
                    }
                }.bind(this)
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
        datePicker: VueBootstrapDatetimePicker
    }
});