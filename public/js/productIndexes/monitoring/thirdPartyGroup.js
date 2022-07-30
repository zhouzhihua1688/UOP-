Vue.component('truePage', {
    template: '#truePage',
    props: {},
    data: function () {
        return {
            index: 0,
            tableData: [],
            //主表格分页数据
            currentIndex: 0,
            maxSpace: 5,
            totalPage: 0,
            pageMaxNum: 10,
            fundId: '',
            fundName: ''
        }
    },
    created:function(){
        this.getTableData(0);
    },
    computed: {
        pageList: function () {
            var arr = [];
            if (this.totalPage <= 2 * this.maxSpace) {
                for (var i = 0; i < this.totalPage; i++) {
                    arr.push(i + 1);
                }
                return arr;
            }
            if (this.currentIndex > this.maxSpace && this.totalPage - this.currentIndex > this.maxSpace) {
                for (var i = this.currentIndex - this.maxSpace; i < this.currentIndex + this.maxSpace; i++) {
                    arr.push(i + 1);
                }
            } else if (this.currentIndex <= this.maxSpace && this.totalPage - this.currentIndex > this.maxSpace) {
                for (var i = 0; i < this.currentIndex + (2 * this.maxSpace - this.currentIndex); i++) {
                    arr.push(i + 1);
                }
            } else if (this.currentIndex > this.maxSpace && this.totalPage - this.currentIndex <= this.maxSpace) {
                var space = this.totalPage - this.currentIndex;
                for (var i = this.currentIndex - (2 * this.maxSpace - space); i < this.totalPage; i++) {
                    arr.push(i + 1);
                }
            } else {
                for (var i = 0; i < this.totalPage; i++) {
                    arr.push(i + 1);
                }
            }
            return arr;
        }
    },
    watch: {
        pageMaxNum: function () {
            this.getTableData(0);
        }
    },
    methods: {
        sendMsg: function () {
            //func: 是父组件指定的传数据绑定的函数，this.msg:子组件给父组件传递的数据
            var data = this.tableData.filter(function (item) {
                return item.checked;
            }).map(function (item) {
                return {
                    fundid: item.fundid,
                    fundName: item.fundName
                };
            })
            this.$emit('func', data, this.index)
        },

        getTableData: function (currentIndex) {
            // this.tableData = [{
            //     fundApkind: 'F',
            //     fundPercent: 0,
            //     fundid: '470078',
            //     checked: false,
            //     groupid: ''
            // }, {
            //     fundApkind: 'F',
            //     fundPercent: 0,
            //     fundid: '000009',
            //     checked: false,
            //     groupid: ''
            // }]
            // return;
            var params = {
                pageNo: currentIndex + 1,
                pageSize: this.pageMaxNum
            };
            this.fundId && (params.fundId = this.fundId);
            this.fundName && (params.fundName = this.fundName);
            $.post({
                url: '/productIndexes/monitoring/thirdPartyGroup/bazaarFund.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.currentIndex = result.data.pageNo - 1;
                        this.totalPage = Math.ceil(result.data.resultTotalNum / params.pageSize);
                        this.tableData = result.data.pageResult.map(function (item) {
                            item.checked = false;
                            return item;
                        });
                    } else {
                        this.tableData = [];
                        this.currentIndex = 0;
                        this.totalPage = 0;
                        this.$parent.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
        //主表格分页方法
        prev: function () {
            if (this.currentIndex <= 0) {
                return;
            }
            this.getTableData(this.currentIndex - 1);
        },
        next: function () {
            if (this.currentIndex >= this.totalPage - 1) {
                return;
            }
            this.getTableData(this.currentIndex + 1);
        },
        changeIndex: function (index) {
            this.getTableData(index - 1);
        },
        toFirst: function () {
            this.getTableData(0);
        },
        toLast: function () {
            this.getTableData(this.totalPage - 1);
        }
    }
})

Vue.component('selectChosen', {
    template: `
        <select class="chosen-select form-control" ref="sele">
            <option value="">请选择</option>
            <option :value="item.channelName" v-for="item in list">{{item.channelName}}</option>
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
        width: String
    },
    watch: {
        value: function () {
            $(this.$refs.sele).val(this.value);
            $(this.$refs.sele).trigger("chosen:updated");
        }
    },
    mounted() {
        $(this.$refs.sele).chosen({
            search_contains: true,
            no_results_text: '未找到',
            disable_search_threshold: 6,
            width: this.width || '138px'
        });
        $(this.$refs.sele).on('change', function (e, params) {
            this.$emit('change', params ? params.selected : '')
        }.bind(this));
    },
    updated() {
        $(this.$refs.sele).trigger("chosen:updated");
    },
})

Vue.component('selectChosen1', {
    template: `<select class="chosen-select form-control" ref="sele1">
            <option value="">全部</option>
            <option :value="item.labelId" v-for='item in list' >
                {{item.labelContent}}
            </option>
        </select>`,
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
            default: () => {
                return []
            },
        }
    },
    watch: {
        value: function () {
            $(this.$refs.sele1).val(this.value);
            $(this.$refs.sele1).trigger("chosen:updated");
        }
    },
    mounted() {
        $(this.$refs.sele1).chosen({
            search_contains: true,
            no_results_text: '未找到',
            disable_search_threshold: 6,
            width: '140px'
        });
        $(this.$refs.sele1).on('change', function (e, params) {
            this.$emit('change', params ? params.selected : '')
        }.bind(this));

    },
    updated() {
        $(this.$refs.sele1).val(this.value);
        $(this.$refs.sele1).trigger("chosen:updated");
    },
})

Vue.component('selectChosen2', {
    template: `
        <select class="chosen-select form-control" ref="sele">
            <option value="">请选择</option>
            <option v-if="modeType=='1'" :value="item[keyList[0]]+','+item[keyList[1]]" v-for="item in list">{{'一级:'+item[keyList[0]]+'&nbsp;/&nbsp;二级:'+item[keyList[1]]}}</option>
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
        width: String,
        keyList:{
            type:Array,
            default: () => [],
        },
        modeType:{
            type:String,
            default:'1'
        }
    },
    watch: {
        value: function () {
            $(this.$refs.sele).val(this.value);
            $(this.$refs.sele).trigger("chosen:updated");
        }
    },
    mounted() {
        console.log(this.list);
        $(this.$refs.sele).chosen({
            search_contains: true,
            no_results_text: '未找到',
            disable_search_threshold: 6,
            width: this.width || '138px'
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
        // 主页面相关数据
        tableData: [],
        diaMsg: '',

        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10,
        condition: "",
        // 查询
        label:{
            parentPlatform:'',
            salePlatform:'',
            salePosition:'',
            productId:'',
        },
        parentPlatformList: [],
        platformList: [],
        positionList: [],
        productList: [],
        // groupList: [],
        // groupId: '',
        // salePlatform: '',
        // salePosition: '',
        // parentPlatform:'',
        operateData: {
            establishDate: '',
            groupName: '',
            groupid: 'B',
            remark: '',
            onSaleDatetime: '',
            fundgroupCategory: '1',
            series: '',
            cmpDetailDOList: [],
            platForm:'',
            parentPlatform:'',
            salePlatform: '',
            salePosition: '',
            strategyStyle: '',
            supplier: '',
            fundList: [{
                prdAllFundgroupChangeDO: {
                    changeAdvise: '',
                    changetime: '',
                    // groupid: '',
                    // isDisplay: 0
                },
                prdAllFundgroupChangeDetailDOList: [
                    // {
                    //     fundApkind: '',
                    //     fundPercent: 0,
                    //     fundid: '',
                    //     groupid: ''
                    // }
                ]
            }]
        },
        baseInfo: {
            groupName: '',
            groupid: '',
            remark: '',
            onSaleDatetime: '',
            fundgroupCategory: '',
            series: '',
            parentPlatform:'',
            salePlatform: '',
            salePosition: '',
            strategyStyle: '',
            cmpDetailDOList: [],
            supplier: '',
        },
        storageInfo: [],
        newStorageInfo: [],
        storageBtn: false,
        addStorageFund: false,
        delData: '',
        isDisabled: true,
        channelAll: [],
        allowDel: true,
        delStorageList: [],
        indexStandardList: [],
        cmpDetailDOList: [],
        cmpListComparison: [],
        cmpDetailDOListType: 'baseInfo',
        custom_productList: []

    },
    created: function () {

        
        $.post({ //查询上架平台和渠道码
            url: '/productIndexes/monitoring/thirdPartyGroup/channelAll.ajax',
            success: function (result) {
                if (result.error === 0) {
                    this.channelAll = result.data;
                } else {
                    this.showDialog("", "info", false, result.msg)
                }
            }.bind(this)
        });
        $.post({ //查询上架平台和渠道码
            url: '/productIndexes/monitoring/thirdPartyGroup/indexStandard.ajax',
            success: function (result) {
                if (result.error === 0) {
                    this.indexStandardList = result.data;
                } else {
                    this.showDialog("", "info", false, result.msg)
                }
            }.bind(this)
        });
    },
    mounted: function () {
        var dialogs = ['info', 'addFund', 'modify3', 'syncGroup', 'delDialog'];
        var _this = this;
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
        this.getTableData(0);

    },
    computed: {
        // custom_cGroupList: function () {
        //     var _this = this;
        //     return function (prod) {
        //         return _this.productList.filter(function (ele) {
        //             return prod.salePlatform ? prod.salePlatform == ele.salePlatform : true;
        //         }).filter(function (ele) {
        //             return prod.salePosition ? prod.salePosition == ele.salePosition : true;
        //         })
        //     }
        // },
        channelCode: function () {
            var channel = this.channelAll.find(function (item) {
                return item.parentPlatform+','+item.salePlatform === this.operateData.platForm
            }, this)
            if (channel) {
                return channel.channelCode
            }
            return ''
        },
        modifyChannelCode: function () {
            var channel = this.channelAll.filter(function (item) {
                return item.channelName === this.baseInfo.salePlatform
            }, this)[0]
            if (channel) {
                return channel.channelCode
            }
            return ''
        },
        // cGroupList: function () {
        //     this.groupId = '';
        //     return this.productList.filter(function (ele) {
        //         return this.salePlatform ? this.salePlatform == ele.salePlatform : true;
        //     }, this).filter(function (ele) {
        //         return this.salePosition ? this.salePosition == ele.salePosition : true;
        //     }, this)
        // },
        //主表格假分页
        pageList: function () {
            var arr = [];
            if (this.totalPage <= 2 * this.maxSpace) {
                for (var i = 0; i < this.totalPage; i++) {
                    arr.push(i + 1);
                }
                return arr;
            }
            if (this.currentIndex > this.maxSpace && this.totalPage - this.currentIndex > this.maxSpace) {
                for (var i = this.currentIndex - this.maxSpace; i < this.currentIndex + this.maxSpace; i++) {
                    arr.push(i + 1);
                }
            } else if (this.currentIndex <= this.maxSpace && this.totalPage - this.currentIndex > this.maxSpace) {
                for (var i = 0; i < this.currentIndex + (2 * this.maxSpace - this.currentIndex); i++) {
                    arr.push(i + 1);
                }
            } else if (this.currentIndex > this.maxSpace && this.totalPage - this.currentIndex <= this.maxSpace) {
                var space = this.totalPage - this.currentIndex;
                for (var i = this.currentIndex - (2 * this.maxSpace - space); i < this.totalPage; i++) {
                    arr.push(i + 1);
                }
            } else {
                for (var i = 0; i < this.totalPage; i++) {
                    arr.push(i + 1);
                }
            }
            return arr;
        }
    },
    watch: {
        // salePlatform: function (newcal) {
        //     if (newcal !== '') {
        //         this.groupId = ''
        //         $("#select2GroupId").val('').trigger('change');
        //     }
        // },
        // salePosition: function (newcal) {
        //     if (newcal !== '') {
        //         this.groupId = ''
        //         $("#select2GroupId").val('').trigger('change');
        //     }
        // },
        // 分页
        pageMaxNum: function () {
            this.getTableData(0);
        }
    },
    methods: {
        // query-select
        labelQuery:function(labelEnum){
            var data = {
                strategyType:'2',
                labelEnum
            }
            
            this.label.parentPlatform&&(data.parentPlatform = this.label.parentPlatform)
            this.label.salePlatform&&(data.salePlatform = this.label.salePlatform)
            this.label.salePosition&&(data.salePosition = this.label.salePosition)
            this.label.productId&&(data.productId = this.label.productId)
            $.post({
                url: '/productIndexes/monitoring/thirdPartyGroup/labels.ajax',
                data,
                success: function (result) {
                    if (result.error === 0) {
                        console.log('labelEnum',labelEnum);
                        console.log('result',result);
                        (labelEnum=='ParentPlatform')&&(this.parentPlatformList = result.data);
                        (labelEnum=='SalePlatform')&&(this.platformList = result.data);
                        (labelEnum=='SalePosition')&&(this.positionList = result.data);
                        (labelEnum=='ProductId')&&(this.productList = result.data);
                    } else {
                        this.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
        exportLabelQuery:function(labelEnum,item){
            var data = {
                strategyType:'5',
                labelEnum
            }
            item.parentPlatform&&(data.parentPlatform = item.parentPlatform)
            item.salePlatform&&(data.salePlatform = item.salePlatform)
            item.salePosition&&(data.salePosition = item.salePosition)
            item.productId&&(data.productId = item.productId)
            $.post({
                url: '/productIndexes/monitoring/thirdPartyGroup/labels.ajax',
                data,
                success: function (result) {
                    if (result.error === 0) {
                        // console.log('result',result);
                        (labelEnum=='ParentPlatform')&&(item.customParentPlatformList = result.data);
                        (labelEnum=='SalePlatform')&&(item.customPlatformList = result.data);
                        (labelEnum=='SalePosition')&&(item.customPositionList = result.data);
                        (labelEnum=='ProductId')&&(item.customProductList = result.data);
                    } else {
                        this.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
        //业绩数据导出
        exports: function (custom_productList) {
            var flag = '';
            var data = {
                customProductROList: custom_productList.map(function (item) {
                    var obj = {};
                    item.productId && (obj.groupId = item.productId);
                    item.parentPlatform && (obj.parentPlatform = item.parentPlatform);
                    item.salePlatform && (obj.salePlatform = item.salePlatform);
                    item.salePosition && (obj.salePosition = item.salePosition);
                    if (item.productId == '' && item.salePlatform == '' && item.parentPlatform == '' && item.salePosition == '') {
                        flag = '每行平台，专区，产品至少选择一个';
                    }
                    return obj;
                })
            }
            if (flag) {
                return this.showDialog('custom', 'info', true, flag);
            }
            // console.log(data);
            // return
            var url = '/productIndexes/monitoring/thirdPartyGroup/export.ajax?params=' + JSON.stringify(data);
            window.open(url);
        },
        showCustom: function () {
            this.custom_productList = [];
            this.custom_productListPushItem()
            this.showDialog('', 'custom')
        },
        custom_productListPushItem: function () {
            this.custom_productList.push({
                parentPlatform: '',
                salePlatform: '',
                salePosition: '',
                productId: '',
                productType: '',
                id: Date.now(),
                customParentPlatformList: [],
                customPlatformList: [],
                customPositionList: [],
                customProductList: [],
            })
            // var item = this.custom_productList[this.custom_productList.length - 1];
            // item.watch = this.$watch(function () {
            //     return item;
            // }.bind(this), function (newval) {
            //     if (newval.salePlatform && newval.productId) {
            //         this.getInIndexs(item)
            //     }
            // }.bind(this), {
            //     deep: true
            // })
        },
        cloneData: function (item) {

            $.post({
                url: '/productIndexes/monitoring/thirdPartyGroup/queryStorage.ajax',
                data: {
                    groupId: item.groupid
                },
                success: function (result) {
                    if (result.error === 0) {
                        this.operateData.fundList = result.data.map(function (item) {
                            return {
                                prdAllFundgroupChangeDO: {
                                    changeAdvise: item.prdAllFundgroupChangeDO.changeAdvise,
                                    changetime: item.prdAllFundgroupChangeDO.changetime,
                                },
                                prdAllFundgroupChangeDetailDOList: item.prdAllFundgroupChangeDetailDOList.map(function (list) {
                                    return {
                                        fundApkind: list.fundApkind,
                                        fundName: list.fundName,
                                        fundPercent: list.fundPercent,
                                        fundid: list.fundid,
                                        groupid: list.groupid,
                                        isBenchmark: list.isBenchmark

                                    }
                                }).filter(function (list) {
                                    return list.fundPercent;
                                })
                            }
                        }).reverse()
                        for (var keys in this.operateData) {
                            if (keys != 'fundList') {
                                this.operateData[keys] = item[keys];
                            }
                        }
                        this.showDialog('', 'addAndModify')
                    } else {

                    }
                }.bind(this)
            });
        },
        goBack: function () {
            this.showDialog("standard", this.cmpDetailDOListType == 'baseInfo' ? "modify3" : "addAndModify", false)
        },
        saveTo: function () {
            if (this.cmpDetailDOList.length === 0) {
                this[this.cmpDetailDOListType].cmpDetailDOList = [];
                this.showDialog("standard", this.cmpDetailDOListType == 'baseInfo' ? "modify3" : "addAndModify", false)
                return;
            }
            var zf = this.cmpDetailDOList.some(function (item) {
                return item.indexPercent <= 0;
            })
            if (zf) {
                return this.showDialog("standard", "info", true, '单个仓位不能小于等于0');
            }
            var num = this.cmpDetailDOList.reduce(function (a, b) {
                return a + b.indexPercent;
            }, 0)
            if (num !== 100) {
                return this.showDialog("standard", "info", true, '仓位总和必须为100');
            }
            this[this.cmpDetailDOListType].cmpDetailDOList = [];
            var obj = {}; //判断是否重复指数
            var msg = '';
            var flag = this.cmpDetailDOList.some(function (item) {
                if (item.index === '') {
                    msg = '请选择指数';
                    return true;
                } else {
                    if (obj['a' + item.index]) {
                        msg = '指数不能重复';
                        return true;
                    } else {
                        obj['a' + item.index] = 1;
                    }
                }
            }, this)
            if (flag) {
                this.showDialog("standard", "info", true, msg);
                return
            }
            this.cmpDetailDOList.forEach(function (item) {
                this[this.cmpDetailDOListType].cmpDetailDOList.push({
                    indexId: this.indexStandardList[item.index].indexId,
                    indexName: this.indexStandardList[item.index].indexName,
                    indexPercent: item.indexPercent,
                })
            }, this)
            this.showDialog("standard", this.cmpDetailDOListType == 'baseInfo' ? "modify3" : "addAndModify", false)
        },
        showIndexStandard: function (item, type) {
            this.cmpDetailDOList = item.map(function (standard) {
                return {
                    indexPercent: standard.indexPercent,
                    index: this.indexStandardList.findIndex(function (value) {
                        return value.indexId == standard.indexId;
                    })
                }
            }, this)
            this.cmpDetailDOListType = type;
            this.showDialog(type == 'baseInfo' ? "modify3" : "addAndModify", "standard", false)
        },
        confirmDelStorage: function () {
            $.post({
                url: '/productIndexes/monitoring/thirdPartyGroup/delStorage.ajax',
                data: {
                    fundgroupChangeSerialNoList: this.delStorageList
                },
                success: function (result) {
                    if (result.error === 0) {
                        this.getTableData(0)
                        this.showDialog("modify2", "info", false, result.msg)
                    } else {
                        this.showDialog("modify2", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
        delStorage: function (item, index) {
            console.log(item)
            this.delStorageList.push(item);
            this.storageInfo.splice(index, 1);
            this.storageBtn = true;
            this.storageInfo.forEach(function (item, ind, arr) {
                item.checked = true;
            })
        },
        del: function () {
            $.post({
                url: '/productIndexes/monitoring/thirdPartyGroup/del.ajax',
                data: {
                    groupId: this.delData
                },
                success: function (result) {
                    if (result.error === 0) {
                        this.getTableData(0)
                        this.showDialog("delDialog", "info", false, result.msg)
                    } else {
                        this.showDialog("delDialog", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
        delDialog: function (groupid) {
            this.delData = groupid;
            this.showDialog("", "delDialog", false, '确定删除' + groupid + '吗？')
        },
        syncGroup: function () {
            $.post({
                url: '/productIndexes/monitoring/thirdPartyGroup/syncGroup.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        this.showDialog("syncGroup", "info", false, result.msg)
                    } else {
                        this.showDialog("syncGroup", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
        addNewStorageInfo: function (boolean, index) {
            if (boolean) {
                this.allowDel = false;
                this.storageInfo.forEach(function (item, ind, arr) {
                    item.checked = true;
                })
                return this.newStorageInfo.push({
                    prdAllFundgroupChangeDO: {
                        changeAdvise: '',
                        changetime: '',
                        // groupid: '',
                        // isDisplay: 0
                    },
                    prdAllFundgroupChangeDetailDOList: [
                        // {
                        //     fundApkind: '',
                        //     fundPercent: 0,
                        //     fundid: '',
                        //     groupid: ''
                        // }
                    ]
                });
            }
            console.log(index)
            this.newStorageInfo.splice(index, 1);
            if (this.newStorageInfo.length === 0) {
                this.allowDel = true;
                this.storageInfo.forEach(function (item, ind, arr) {
                    item.checked = false;
                })
            }

        },
        onlySelf: function (index) {
            this.storageBtn = true;
            this.allowDel = false;
            this.storageInfo.forEach(function (item, ind, arr) {
                if (index !== ind) {
                    item.checked = true;
                }
            })

        },
        showBaseInfo: function (info) {
            console.log(info);
            for (const key in this.baseInfo) {
                this.baseInfo[key] = info[key]
            }
            this.baseInfo.platForm = info.parentPlatform&&info.salePlatform?info.parentPlatform+','+info.salePlatform:''
            this.cmpListComparison = [].concat(info.cmpDetailDOList)
            this.showDialog("", "modify3", false)

        },
        showStorage: function (groupId, source) {
            this.delStorageList = []; //清空准备删除数据
            console.log(source)
            $.post({
                url: '/productIndexes/monitoring/thirdPartyGroup/queryStorage.ajax',
                data: {
                    groupId: groupId
                },
                success: function (result) {
                    if (result.error === 0) {
                        this.storageInfo = result.data.map(function (item) {
                            if (source != 1) {
                                item.checked = false;
                            } else {
                                item.checked = true;
                            }
                            return item;
                        })

                        if (source != 1) {
                            this.allowDel = true;
                            this.isDisabled = false;
                            this.storageBtn = false;
                        } else {
                            this.allowDel = false;
                            this.storageBtn = true;
                            this.isDisabled = true;
                        }
                        this.newStorageInfo = [];
                        this.showDialog("", "modify2", false)
                    } else {
                        this.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
        modifyBaseInfo: function () {
            var baseInfo = JSON.parse(JSON.stringify(this.baseInfo));
            var platForm = baseInfo.platForm&&baseInfo.platForm.split(',')
            baseInfo.parentPlatform = platForm[0];
            baseInfo.salePlatform = platForm[1];
            delete baseInfo.platForm;
            var params = Object.assign({}, baseInfo);
            params.cmpDetailDOList = Object.assign([], this.baseInfo.cmpDetailDOList);
            var flag = params.cmpDetailDOList.every(function (item) {
                return this.cmpListComparison.some(function (inItem) {
                    if (inItem.indexPercent == item.indexPercent && inItem.indexId == item.indexId) {
                        return true;
                    }
                })
            }, this)
            if (flag) {
                if (params.cmpDetailDOList.length !== 0) {
                    params.cmpDetailDOList = this.cmpListComparison.map(function (item) {
                        item.groupId = params.groupid;
                        return item;
                    })
                }
            } else {
                params.cmpDetailDOList.forEach(function (item) {
                    item.comparisonNo = null;
                })
            }
            if (!params.salePlatform) {
                params.salePlatform = '无'
            }
            if (!params.salePosition) {
                params.salePosition = '无'
            }
            console.log(params)
            $.post({
                url: '/productIndexes/monitoring/thirdPartyGroup/modifyBaseInfo.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.showDialog("modify3", "info", false, result.msg)
                        this.getTableData(0)
                    } else {
                        this.showDialog("modify3", "info", true, result.msg)
                    }
                }.bind(this)
            });
        },
        getTableData: function (currentIndex) {
            var params = {
                pageNo: currentIndex + 1,
                pageSize: this.pageMaxNum
            };
            this.label.productId !== '' && (params.groupId = this.label.productId);
            this.label.parentPlatform !== '' && (params.parentPlatform = this.label.parentPlatform);
            this.label.salePlatform !== '' && (params.salePlatform = this.label.salePlatform);
            this.label.salePosition !== '' && (params.salePosition = this.label.salePosition);
            $.post({
                url: '/productIndexes/monitoring/thirdPartyGroup/collections.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.currentIndex = result.data.pageNo - 1;
                        this.totalPage = Math.ceil(result.data.resultTotalNum / params.pageSize);;
                        this.tableData = result.data.pageResult;
                    } else {
                        this.tableData = [];
                        this.currentIndex = 0;
                        this.totalPage = 0;
                        this.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
        getFundFormSon: function (arr, index) {
            if (this.addStorageFund) {
                arr.forEach(function (item) {
                    if (!this.newStorageInfo[index].prdAllFundgroupChangeDetailDOList.find(function (id) {
                            return item.fundid === id.fundid
                        })) {
                        this.newStorageInfo[index].prdAllFundgroupChangeDetailDOList.push({
                            fundApkind: 'F',
                            isBenchmark: 'N',
                            fundPercent: 0,
                            fundid: item.fundid,
                            fundName: item.fundName,
                            groupid: ''
                        })
                    }
                }, this)
                return;
            }
            arr.forEach(function (item) {
                if (!this.operateData.fundList[index].prdAllFundgroupChangeDetailDOList.find(function (id) {
                        return item.fundid === id.fundid
                    })) {
                    this.operateData.fundList[index].prdAllFundgroupChangeDetailDOList.push({
                        fundApkind: 'F',
                        isBenchmark: 'N',
                        fundPercent: 0,
                        fundid: item.fundid,
                        fundName: item.fundName,
                        groupid: ''
                    })
                }
            }, this)
        },
        pushOperateData: function () {
            this.operateData.fundList.push({
                prdAllFundgroupChangeDO: {
                    changeAdvise: '',
                    changetime: '',
                    isDisplay: 0,
                },
                prdAllFundgroupChangeDetailDOList: []
            })
        },
        addFundtoOperateData: function (index, arrName) {
            this.$refs.child.index = index;
            this.$refs.child.tableData.forEach(function (item) {
                item.checked = false;
            });
            if (arrName === 'newStorageInfo') {
                this.addStorageFund = true;
                this.showDialog('modify2', 'addFund', true)
                return;
            }
            this.addStorageFund = false;
            this.showDialog('addAndModify', 'addFund', true)
            // this.operateData.fundList[index].prdAllFundgroupChangeDetailDOList.push({
            //     fundApkind: 'F',
            //     fundPercent: 0,
            //     fundid: '',
            //     groupid: ''
            // })
        },
        add: function () {
            var flag = false; //校验日期和占比

            var groupid = this.operateData.groupid;
            var platForm = this.operateData.platForm?this.operateData.platForm.split(','):[];

            var sendData = {
                prdAllFundgroupInfoDO: {
                    establishDate: this.operateData.fundList[0].prdAllFundgroupChangeDO.changetime,
                    groupName: this.operateData.groupName,
                    groupid: groupid,
                    source: 2,
                    remark: this.operateData.remark,
                    cmpDetailDOList: this.operateData.cmpDetailDOList,
                    onSaleDatetime: this.operateData.onSaleDatetime,
                    fundgroupCategory: this.operateData.fundgroupCategory,
                    parentPlatform: platForm[0] ? platForm[0] : '无',//一级平台
                    salePlatform: platForm[1] ? platForm[1] : '无',//二级平台
                    salePosition: this.operateData.salePosition ? this.operateData.salePosition : '无',//专区
                    strategyStyle: this.operateData.strategyStyle,
                    series: this.operateData.series,
                    supplier: this.operateData.supplier
                },
                fundgroupChangeMonitorReportROList: this.operateData.fundList.map(function (item, index, arr) {
                    console.log(arr)
                    if (index === 0 && item.prdAllFundgroupChangeDO.changetime === '') {
                        flag = '请填写成立调仓时间';
                        return;
                    } else if (index !== 0 && (item.prdAllFundgroupChangeDO.changetime <= arr[index - 1].prdAllFundgroupChangeDO.changetime)) {
                        flag = '后续调仓日期必须大于前次且不能为同一天';
                        return;
                    }
                    item.prdAllFundgroupChangeDO.groupid = groupid;
                    if (index > 0) {
                        item.prdAllFundgroupChangeDO.isDisplay = 1;

                    }
                    if (item.prdAllFundgroupChangeDetailDOList.length < 1) {
                        flag = '至少添加一只基金';
                        return;
                    }
                    var num = item.prdAllFundgroupChangeDetailDOList.reduce(function (p, n) {
                        return p + this.pointCount(n.fundPercent)
                    }.bind(this), 0)
                    if (num !== 100) {
                        flag = '仓位总和必须为100';
                        return;
                    } else {
                        item.prdAllFundgroupChangeDetailDOList.forEach(function (funds) {
                            funds.groupid = groupid;
                        })
                    }
                    return item;
                }, this)
            }
            sendData.prdAllFundgroupInfoDO.cmpDetailDOList.forEach(function (item) {
                item.groupId = sendData.groupid
            })
            if (flag) {
                this.showDialog("addAndModify", "info", true, flag)
                return;
            }
            console.log('sendData', sendData)
            $.post({
                url: '/productIndexes/monitoring/thirdPartyGroup/add.ajax',
                data: sendData,
                success: function (result) {
                    if (result.error === 0) {
                        this.getTableData(0)
                        this.showDialog("addAndModify", "info", false, result.msg)
                    } else {
                        this.showDialog("addAndModify", "info", true, result.msg)
                    }
                }.bind(this)
            });
        },
        modify: function () {
            var url = '/productIndexes/monitoring/thirdPartyGroup/addySourceInfo.ajax';
            var groupid = this.storageInfo[0].prdAllFundgroupChangeDO.groupid;
            var flag = false;
            var lastChangetime = this.storageInfo[0].prdAllFundgroupChangeDO.changetime.slice(0, 10);
            var changetimeList = this.storageInfo.map(function (item) {
                return item.prdAllFundgroupChangeDO.changetime.slice(0, 10);
            }).concat(this.newStorageInfo.map(function (item) {
                if (!item.prdAllFundgroupChangeDO.changetime) {
                    flag = '日期不能为空';
                }
                return item.prdAllFundgroupChangeDO.changetime.slice(0, 10);
            }))
            if (flag) {
                this.showDialog("modify2", "info", true, flag)
                return;
            }
            var params = [];
            var data = {};
            var type = 0;
            if (this.newStorageInfo.length > 0) {

                this.newStorageInfo.forEach(function (item, index) {
                    if (item.prdAllFundgroupChangeDetailDOList.length < 1) {
                        flag = '至少添加一只基金';
                        return;
                    }
                    var num = item.prdAllFundgroupChangeDetailDOList.reduce(function (p, n) {
                        return p + this.pointCount(n.fundPercent)
                    }.bind(this), 0)
                    if (num !== 100) {
                        flag = '仓位总和必须为100';
                        return;
                    }
                    if (changetimeList.filter(function (date) {
                            return item.prdAllFundgroupChangeDO.changetime.slice(0, 10) == date;
                        }).length > 1) {
                        flag = '调仓日期不能有相同的一天';
                        return;
                    }
                    if (lastChangetime > item.prdAllFundgroupChangeDO.changetime) {
                        type = 1;
                    }
                    params[index] = {}
                    params[index].prdAllFundgroupChangeDetailDOList = item.prdAllFundgroupChangeDetailDOList.map(function (item1) {
                        item1.groupid = groupid
                        return item1;
                    })
                    params[index].prdAllFundgroupChangeDO = item.prdAllFundgroupChangeDO;
                    params[index].prdAllFundgroupChangeDO.isDisplay = 1;
                    params[index].prdAllFundgroupChangeDO.groupid = groupid;
                }, this)
                if (type === 1) {
                    params = params.concat(this.storageInfo.map(function (item) {
                        return {
                            prdAllFundgroupChangeDO: {
                                changeAdvise: item.prdAllFundgroupChangeDO.changeAdvise,
                                changetime: item.prdAllFundgroupChangeDO.changetime,
                                isDisplay: item.prdAllFundgroupChangeDO.isDisplay,
                                groupid: item.prdAllFundgroupChangeDO.groupid
                            },
                            prdAllFundgroupChangeDetailDOList: item.prdAllFundgroupChangeDetailDOList.map(function (historyData) {
                                return {
                                    fundApkind: historyData.fundApkind,
                                    isBenchmark: historyData.isBenchmark,
                                    // fundName: historyData.fundName,
                                    fundPercent: historyData.fundPercent,
                                    fundid: historyData.fundid,
                                    groupid: historyData.groupid,
                                }
                            })
                        }
                    }))
                }
                data = {
                    params: params,
                    type: type
                }
            } else {
                url = '/productIndexes/monitoring/thirdPartyGroup/modifySourceInfo.ajax';
                var list = []
                this.storageInfo.some(function (item) {
                    if (!item.checked) {
                        params = {};
                        params.groupid = groupid;
                        params.isDisplay = 0;
                        params.changeAdvise = item.prdAllFundgroupChangeDO.changeAdvise;
                        params.serialno = item.prdAllFundgroupChangeDO.serialno;
                        list = item.prdAllFundgroupChangeDetailDOList.map(function (item1) {
                            return {
                                serialno: item1.serialno,
                                fundid: item1.fundid,
                                fundApkind: item1.fundApkind,
                                isBenchmark: item1.isBenchmark
                            }
                        })
                        return true;
                    }
                })
                data = {
                    prdAllFundgroupChangeDO: params,
                    prdAllFundgroupChangeDetailDOList: list
                };
            }
            if (flag) {
                this.showDialog("modify2", "info", true, flag)
                return;
            }
            console.log(data)
            // return;

            $.post({
                url: url,
                data: data,
                success: function (result) {
                    if (result.error === 0) {
                        this.getTableData(0)
                        this.showDialog("modify2", "info", false, result.msg)
                    } else {
                        this.showDialog("modify2", "info", true, result.msg)
                    }
                }.bind(this)
            });
        },
        getProductStatus(groupId) {
            $.post({
                url: '/productIndexes/monitoring/thirdPartyGroup/productStatus.ajax',
                data: {
                    groupId: groupId
                },
                success: function (result) {
                    if (result.error === 0) {
                        if (result.data === 'S') {
                            this.getTableData(0)
                            this.showDialog("", "info", false, '初始化成功')
                        } else if (result.data === 'P' || result.data === 'I') {
                            this.showDialog("", "info", false, '正在初始化')
                        } else if (result.data === 'M') {
                            this.getTableData(0)
                            this.showDialog("", "info", false, '指标计算中')
                        } else {
                            this.showDialog("", "info", false, '初始化失败')
                        }
                    } else {
                        this.showDialog("", "info", true, result.msg)
                    }
                }.bind(this)
            });
        },
        pointCount(value) {
            return Number(math.format(value, 14))
        },
        resetOperateData: function () {
            this.operateData.fundList = [{
                prdAllFundgroupChangeDO: {
                    changeAdvise: '',
                    changetime: '',
                },
                prdAllFundgroupChangeDetailDOList: []
            }]
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
        //主表格分页方法
        prev: function () {
            if (this.currentIndex <= 0) {
                return;
            }
            this.getTableData(this.currentIndex - 1);
        },
        next: function () {
            if (this.currentIndex >= this.totalPage - 1) {
                return;
            }
            this.getTableData(this.currentIndex + 1);
        },
        changeIndex: function (index) {
            this.getTableData(index - 1);
        },
        toFirst: function () {
            this.getTableData(0);
        },
        toLast: function () {
            this.getTableData(this.totalPage - 1);
        }
    },
    components: {
        'date-picker': VueBootstrapDatetimePicker
    },
    filters: {
        warnData: function (item, index) {
            // 此次调仓日期必须大于上次调仓日期
            if (index === 0) {
                return '';
            }
            var date = item[index - 1];
            var nowDate = item[index];
            if (date.prdAllFundgroupChangeDO.changetime.slice(0, 10) === nowDate.prdAllFundgroupChangeDO.changetime.slice(0, 10)) {
                return '此次调仓日期不能与上次调仓日期为同日';
            } else if (date.prdAllFundgroupChangeDO.changetime > nowDate.prdAllFundgroupChangeDO.changetime) {
                return '此次调仓日期必须大于上次调仓日期';
            } else {
                return '';
            }
        }
    }
});