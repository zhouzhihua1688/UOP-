Vue.component('selectChosen', {
    template: '<select class="chosen-select form-control" ref="sele" >' +
        '<option value="">全部</option>' +
        '<option :value="item.productid"  v-for="item of list">{{item.productid}} &nbsp;-&nbsp; {{item.productName}}</option>' +
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
            width: '168px'
        });
        $(this.$refs.sele).on('change', function (e, params) {
            this.$emit('change', params.selected)
        }.bind(this));
    },
    updated: function () {
        $(this.$refs.sele).val(this.value);
        $(this.$refs.sele).trigger("chosen:updated");
    },
})

new Vue({
    el: '#content',
    data: function () {
        this.baseUrl = '/productIndexes/monitoring/targetYield';
        return {
            diaMsg: '',
            //主表格分页数据
            currentIndex: 0,
            maxSpace: 5,
            pageMaxNum: 10,
            condition: '',

            tableData: [],
            // 查询
            platformList: [],
            productCategoryList: [],
            productList: [],

            salePlatform: '',
            productCategory: '3',
            groupId: '',

            //新增or修改
            modifyStatus: false,
            serialno: '',
            channelAll: [],
            addData: {
                salePlatform: '',
                productCategory: '3',
                groupid: '',
                targetYield: 0,
                startDate: '',
                calmPeriod: 1,
                calmUnit: '1',
                holdPeriod: 1,
                holdUnit: '1',
                firstEndDate: '',
                // groupname: '',
            }
        }
    },
    computed: {

        channelCode: function () {
            var channel = this.channelAll.filter(function (item) {
                return item.channelName === this.addData.salePlatform
            }, this)[0]
            if (channel) {
                return channel.channelCode
            }
            return '';
        },
        cGroupList: function () {
            this.groupid = '';
            return this.productList.filter(function (ele) {
                return this.salePlatform ? this.salePlatform == ele.salePlatform : true;
            }, this).filter(function (ele) {
                return this.productCategory ? this.productCategory == ele.productCategory : true;
            }, this)
        },
        addcGroupList: function () {
            // this.addData.groupid = '';
            var data = this.productList.filter(function (ele) {
                return this.addData.salePlatform ? this.addData.salePlatform == ele.salePlatform : true;
            }, this).filter(function (ele) {
                return this.addData.productCategory ? this.addData.productCategory == ele.productCategory : true;
            }, this)
            var flag = data.some(function (item) {
                return item.productid == this.addData.groupid
            }, this)
            if (!flag) {
                this.addData.groupid = '';
            }
            return data;
        },
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
        $.post({
            url: `${this.baseUrl}/labels.ajax`,
            data: {
                type: '2'
            },
            success: function (result) {
                if (result.error === 0) {
                    var obj = {}
                    result.data.forEach(function (item) {
                        if (!this.platformList.includes(item.salePlatform)) {
                            this.platformList.push(item.salePlatform)
                        }
                        // if (!this.productCategoryList.some(function (ele) {
                        //         return ele.productCategory == item.productCategory;
                        //     })) {
                        //     this.productCategoryList.push({
                        //         productCategory: item.productCategory,
                        //         name: (function () {
                        //             if (item.productCategory == 0) {
                        //                 return '基金';
                        //             } else if (item.productCategory == 1) {
                        //                 return '组合-开放式';
                        //             } else if (item.productCategory == 2) {
                        //                 return '组合-发车制';
                        //             } else if (item.productCategory == 3) {
                        //                 return '组合-目标盈';
                        //             }
                        //         }())
                        //     })
                        // }
                        obj[item.productid + item.salePlatform + item.salePosition] = item;
                    }, this)
                    this.productList = Object.values(obj)
                } else {
                    this.showDialog("", "info", false, result.msg)
                }
            }.bind(this)
        });
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
        joinUnit: function (num, unit) {
            var obj = {
                "1": "天",
                "2": "周",
                "3": "月",
                "4": "年",
            }
            if (unit) {
                return num + obj[unit];
            } else {
                return num
            }
        },
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
                url: `${this.baseUrl}/channelAll.ajax`,
                success: function (result) {
                    if (result.error === 0) {
                        this.channelAll = result.data;
                    } else {
                        this.showDialog('', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },
        showAdd: function () {
            this.modifyStatus = false;
            this.showDialog('', 'operate');
        },
        showUpdate: function (item) {
            this.modifyStatus = true;
            this.serialno = item.serialno;
            for (var keys in this.addData) {
                this.addData[keys] = item[keys]
            }
            this.showDialog('', 'operate');
        },
        modifyData: function () {
            var params = Object.assign({}, this.addData)
            params.firstEndDate = params.firstEndDate.replace(/[-]/g, '');
            params.startDate = params.startDate.replace(/[-]/g, '');
            params.serialno = this.serialno;
            $.post({
                url: `${this.baseUrl}/modifyData.ajax`,
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
        addOrModify: function () {
            if (this.addData.salePlatform === '') {
                return this.showDialog('operate', 'info', true, '请选择上架平台');
            }
            if (this.addData.groupid === '') {
                return this.showDialog('operate', 'info', true, '请选择组合产品');
            }
            if (this.addData.startDate === '') {
                return this.showDialog('operate', 'info', true, '请选择生效日');
            }
            if (this.addData.firstEndDate === '') {
                return this.showDialog('operate', 'info', true, '请选择首次止盈日');
            }
            if (this.modifyStatus) {
                this.modifyData()
                return;
            }
            var params = Object.assign({}, this.addData)
            params.firstEndDate = params.firstEndDate.replace(/[-]/g, '');
            params.startDate = params.startDate.replace(/[-]/g, '');
            $.post({
                url: `${this.baseUrl}/add.ajax`,
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