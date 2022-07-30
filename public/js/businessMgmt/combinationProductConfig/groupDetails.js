Vue.component('selectChosen', {
    template: `
        <select class="chosen-select form-control" ref="sele">
            <option value="ALL">全部</option>
            <option :value="item.groupId" v-for="item of list">{{item.groupId}} &nbsp;&nbsp; {{item.groupName}}</option>
        </select>
        `,
    model: {
        prop: "value",
        event: "change",
    },
    props: {
        value: {
            validator: () => true,
        },
        list: {
            type: [Object, Array],
            default: () => [],
        },
    },
    mounted() {
        $(this.$refs.sele).chosen({
            search_contains: true,
            no_results_text: '未找到',
            disable_search_threshold: 6,
            width: '184px'
        });
        $(this.$refs.sele).on('change', function (e, params) {
            this.$emit('change', params ? params.selected : '')
        }.bind(this));
    },
    updated() {
        $(this.$refs.sele).trigger("chosen:updated");
    },
})

new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        tableData: [],
        diaMsg: '',

        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10,
        condition: "",


        fundGroupType: [],
        fundGroupList: [],
        groupDetails: {
            baseInfo: {},
            detailList: []
        },
        groupId: 'ALL',
        groupType: '',
    },
    computed: {
        //主表格假分页
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
        // 假分页
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
    },
    mounted: function () {
        var dialogs = ['info', 'add', 'revise'];
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

        this.getTableData();
        this.fundGroup()
        this.groupFundType()
    },
    methods: {
        saveOrder: function () {
            var params = {
                baseInfo: {
                    groupid: this.groupDetails.baseInfo.groupid
                },
                detailList: this.groupDetails.detailList.map(function (item) {
                    return {
                        displayOrder: item.displayOrder,
                        fundId: item.fundId
                    }
                })
            }
            console.log(params)
            $.post({
                url: '/businessMgmt/combinationProductConfig/combinationProductReview/saveOrder.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.showDialog('groupDetails', 'info', false, result.msg);
                    } else {
                        this.showDialog('groupDetails', 'info', true, result.msg);
                    }
                }.bind(this)
            });
        },
        // 业务详情信息
        serviceDetail: function (groupId) {
            var params = {
                groupId: groupId
            }
            $.post({
                url: '/businessMgmt/combinationProductConfig/combinationProductReview/details.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.groupDetails = result.data[0]
                    } else {
                        this.groupDetails = {};
                        this.showDialog('', 'info', false, result.msg);
                    }
                }.bind(this)
            });
            this.showDialog('', 'groupDetails');
        },
        // 获取基金所有组合-查询
        fundGroup: function () {
            $.post({
                url: '/businessMgmt/combinationProductConfig/groupDetails/fundGroups.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        this.fundGroupList = result.data.body;
                    }
                }.bind(this)
            });
        },
        // 获取组合类型数据
        groupFundType: function () {
            $.post({
                url: '/businessMgmt/combinationProductConfig/groupDetails/fundGroupType.ajax',
                data: {
                    pmst: "SYSTEM",
                    pmkey: "FUNDGROUP_TYPE"
                },
                success: function (result) {
                    if (result.error === 0) {
                        this.fundGroupType = result.data.body
                    } else {
                        this.showDialog('', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },
        getTableData: function (currentIndex) {
            var params = {
                groupId: this.groupId,
                groupType: this.groupType,
            };
            this.currentIndex = 0;
            $.post({
                url: '/businessMgmt/combinationProductConfig/groupDetails/getTableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.tableData = result.data
                    } else {
                        this.tableData = [];
                        this.showDialog('', 'info', false, result.msg);
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
        },

    },
    filters: {
        // 类型状态
        fundApkind: function (value) {
            var obj = {
                "V": "货币类",
                "R": "权益类",
                "F": "固收类",
                "O": "其他",
            }
            if (obj[value]) {
                return obj[value];
            }
            return value;
        },
        chineseGrouptype: function (value) {
            var obj = {
                "1": "保守型",
                "2": "稳健型",
                "3": "平衡型",
                "4": "进取型",
                "5": "积极型",
            }
            if (obj[value]) {
                return obj[value];
            }
            return value;
        },
        chineseFundgroupType: function (value) {
            var obj = {
                "01": "智投组合",
                "02": "养老组合",
                "03": "指数宝",
                "04": "三方组合",
                "06": "策略组合",
                "08": "现金+",
                "11": "企业版现金+",
                "12": "发车组合",
                "13": "活钱管理",
                "14": "稳健理财",
                "15": "长期投资",
                "16": "教育金",
                "17": "养老金",

            }
            if (obj[value]) {
                return obj[value];
            }
            return value;
        },
        createTimes: function (item) {
            if (item) {
                return item.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/g, '$1$2$3 $4:$5:$6')
            }
        },
    }
});