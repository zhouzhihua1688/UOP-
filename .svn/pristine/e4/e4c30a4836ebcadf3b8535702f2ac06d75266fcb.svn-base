Vue.component('selectChosen', {
    template: '<select class="chosen-select form-control" ref="sele" >' +
        '<option value="">请选择</option>' +
        '<option :value="[item.productid,item.productType]"  v-for="item of list">{{item.productid}} &nbsp;-&nbsp; {{item.productName}}</option>' +
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
        },
        items: [Object, Array]
    },
    mounted: function () {
        $(this.$refs.sele).chosen({
            search_contains: true,
            no_results_text: '未找到',
            disable_search_threshold: 6,
            width: '140px'
        });
        $(this.$refs.sele).on('change', function (e, params) {
            var val = params ? params.selected.split(',') : '';
            if (this.items) {
                this.items.productType = val[1];
            }
            this.$emit('change', val[0])
        }.bind(this));
    },
    updated: function () {
        if (this.value === '') {
            $(this.$refs.sele).val('');
        }
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

        // 查询
        platformList: [],
        positionList: [],
        productCategoryList: [],
        productList: [],
        investAreaList: [],
        parentPlatformList: [],
        productId: '',
        parentPlatform: '',
        salePlatform: '',
        salePosition: '',
        investArea: '',
        productCategory: '',
        calcDate: '',
        showCategory: '',

        queryParamsforExport: {},
        //全部指标
        detailData: [],
        //自定义导出
        monitorIndex: [],
        custom_productList: [],
        performanceExportTask: ''
    },
    created: function () {
        this.getMonitorIndex();
        this.calcDate = moment(new Date().setTime(new Date().getTime() - 24 * 60 * 60 * 1000)).format("YYYY-MM-DD");
    },
    mounted: function () {
        var dialogs = ['info', 'addAndModify'];
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
        },
    },
    methods: {
        moment: moment,
        labelQuery:function(labelEnum){
            var data = {
                strategyType:'7',
                labelEnum
            }
            this.parentPlatform&&(data.parentPlatform = this.parentPlatform)
            this.salePlatform&&(data.salePlatform = this.salePlatform)
            this.salePosition&&(data.salePosition = this.salePosition)
            this.investArea&&(data.investArea = this.investArea)
            this.productId&&(data.productId = this.productId)
            this.productCategory&&(data.productCategory = this.productCategory)
            $.post({
                url: '/productIndexes/monitoring/forms/labels.ajax',
                data,
                success: function (result) {
                    if (result.error === 0) {
                        // console.log('labelEnum',labelEnum);
                        // console.log('result',result);
                        (labelEnum=='ParentPlatform')&&(this.parentPlatformList = result.data);
                        (labelEnum=='SalePlatform')&&(this.platformList = result.data);
                        (labelEnum=='SalePosition')&&(this.positionList = result.data);
                        (labelEnum=='InvestArea')&&(this.investAreaList = result.data);
                        (labelEnum=='ProductId')&&(this.productList = result.data);
                        (labelEnum=='ProductCategory')&&(this.productCategoryList = result.data);
                    } else {
                        this.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
        customLabelQuery:function(labelEnum,item){
            var data = {
                strategyType:'6',
                labelEnum
            }
            item.parentPlatform&&(data.parentPlatform = item.parentPlatform)
            item.salePlatform&&(data.salePlatform = item.salePlatform)
            item.salePosition&&(data.salePosition = item.salePosition)
            item.investArea&&(data.investArea = item.investArea)
            item.productId&&(data.productId = item.productId)
            $.post({
                url: '/productIndexes/monitoring/forms/labels.ajax',
                data,
                success: function (result) {
                    if (result.error === 0) {
                        // console.log('labelEnum',labelEnum);
                        // console.log('result',result);
                        (labelEnum=='ParentPlatform')&&(item.customList.parentPlatformList = result.data);
                        (labelEnum=='SalePlatform')&&(item.customList.platformList = result.data);
                        (labelEnum=='SalePosition')&&(item.customList.positionList = result.data);
                        (labelEnum=='InvestArea')&&(item.customList.investAreaList = result.data);
                        (labelEnum=='ProductId')&&(item.customList.productList = result.data);
                    } else {
                        this.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
        setInIndexs: function () {
            var arr = this.custom_productList.reduce(function (prev, cur, ind) {
                if (ind === 0) {
                    return prev;
                }
                return prev.filter(function (val) {
                    return cur.indexs.includes(val)
                })

            }, this.custom_productList[0].indexs)
            Object.values(this.monitorIndex).forEach(function (list) {
                list.forEach(function (item) {
                    if (arr.includes(item.indexid)) {
                        item.disabled = false;
                    } else {
                        item.disabled = true;
                    }
                })
            })
        },
        getInIndexs: function (item) {
            var params = {}
            item.productId && (params.productId = item.productId)
            item.salePlatform && (params.salePlatform = item.salePlatform)
            item.salePosition && (params.salePosition = item.salePosition)

            $.post({
                url: '/productIndexes/monitoring/forms/inIndexs.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        item.indexs = result.data || [];
                        this.setInIndexs()
                    } else {
                        this.showDialog("custom", "info", true, result.msg)
                    }
                }.bind(this)
            })
        },
        custom_productListDelItem: function (index) {
            // this.custom_productList[index].watch()
            this.custom_productList.splice(index, 1)
            // this.setInIndexs()
        },
        custom_productListPushItem: function () {
            this.custom_productList.push({
                salePlatform: '',
                salePosition: '',
                productId: '',
                productType: '',
                parentPlatform:'',
                investArea:'',
                customList: {
                    platformList: [],
                    positionList: [],
                    productList: [],
                    investAreaList: [],
                    parentPlatformList: []
                },
                // watch: null,
                id: Date.now()
            })
            // var item = this.custom_productList[this.custom_productList.length - 1];
            // item.watch = this.$watch(function () {
            //     return item;
            // }.bind(this), function (newval) {
            //     if (newval.salePlatform || newval.productId) {
            //         this.getInIndexs(newval)
            //     }
            // }.bind(this), {
            //     deep: true
            // })

        },
        showCustom: function () {
            this.custom_productList = [];
            this.custom_productListPushItem()
            this.showDialog('', 'custom')
        },
        showDetailData: function (item) {
            var params = {
                productId: item.productid
            }
            item.parentPlatform && (params.parentPlatform = item.parentPlatform)
            item.salePlatform && (params.salePlatform = item.salePlatform)
            item.salePosition && (params.salePosition = item.salePosition)
            item.investArea && (params.investArea = item.investArea)
            item.calcDate && (params.calcDate = item.calcDate)
            $.post({
                url: '/productIndexes/monitoring/forms/detailData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.detailData = result.data;
                        this.showDialog("", "detailData")
                    } else {
                        this.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
            })
        },
        getMonitorIndex: function () {
            $.post({
                url: '/productIndexes/monitoring/forms/monitorIndex.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        var data = result.data;
                        for (var key in data) {
                            data[key].forEach(function (item1) {
                                item1.disabled = false;
                                if (item1.isExportDefault == 1) {
                                    item1.checked = true;
                                } else {
                                    item1.checked = false;
                                }
                            })
                        }
                        this.monitorIndex = data;
                    } else {
                        this.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
        getTableData: function (currentIndex) {
            var params = {
                pageNo: currentIndex + 1,
                pageSize: this.pageMaxNum
            };
            this.productId && (params.productId = this.productId);
            this.parentPlatform && (params.parentPlatform = this.parentPlatform);
            this.salePlatform && (params.salePlatform = this.salePlatform);
            this.salePosition && (params.salePosition = this.salePosition);
            this.investArea && (params.investArea = this.investArea);
            this.productCategory && (params.productCategory = this.productCategory);
            this.calcDate && (params.calcDate = this.calcDate.replace(/-/g, ''));
            this.showCategory && (params.showCategory = this.showCategory);

            this.queryParamsforExport = params; //导出时使用
            $.post({
                url: '/productIndexes/monitoring/forms/tableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.tableData = result.data.pageResult;
                        this.queryParamsforExport.totalPage = this.totalPage = Math.ceil(result.data.resultTotalNum / params.pageSize);;
                        this.currentIndex = result.data.pageNo - 1;
                    } else {
                        this.tableData = [];
                        this.currentIndex = 0;
                        this.totalPage = 0;
                        this.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
        //监控指标导出
        monitorExport: function (custom_productList) {
            var flag = '';
            var data = {
                customProductROList: custom_productList.map(function (item) {
                    var obj = {};
                    item.productId && (obj.productId = item.productId);
                    item.productType && (obj.productType = item.productType);
                    item.salePlatform && (obj.salePlatform = item.salePlatform);
                    item.salePosition && (obj.salePosition = item.salePosition);
                    item.investArea && (obj.investArea = item.investArea);
                    item.parentPlatform && (obj.parentPlatform = item.parentPlatform);
                    if (item.productId == '' && item.salePlatform == '' && item.salePosition == '' && item.investArea == '' && item.parentPlatform == '') {
                        flag = '每级平台，专区，产品，赛道至少选择一个';
                    }
                    if (obj.productType != 1) {
                        obj.productType = 2
                    }
                    return obj;
                }),
                indexRList: (function () {
                    var arr = [];
                    Object.values(this.monitorIndex).forEach(function (list) {
                        list.forEach(function (item) {
                            if (item.checked && !item.disabled) {
                                arr.push(item.indexid)
                            }
                        })
                    })
                    if (arr.length === 0) {
                        flag = '至少选择一个指标';
                    }
                    return arr;
                }.bind(this)())
            }
            // var firstType = data.customProductROList[0].productType
            // data.customProductROList.some(function (item) {
            //     if (firstType && item.productType) {
            //         if (item.productType !== firstType) {
            //             flag = '组合与基金不能同时导出';
            //             return true;
            //         }
            //     }
            // })
            if (flag) {
                return this.showDialog('custom', 'info', true, flag);
            }
            /*        var monitorIndex = {};
                   for (var k in this.monitorIndex) {
                       this.monitorIndex[k].forEach(function (item) {
                           monitorIndex[item.indexid] = item.indexName
                       })
                   }
                   data.monitorIndex = monitorIndex */
            var url = '/productIndexes/monitoring/forms/monitorExport.ajax?params=' + encodeURIComponent(JSON.stringify(data));
            window.open(url);
        },
        taskLoop: function () {
            var fn = setInterval(function () {
                $.post({
                    url: '/productIndexes/monitoring/forms/performanceStatus.ajax',
                    data: {
                        taskNo: this.performanceExportTask
                    },
                    success: function (result) {
                        if (result.error === 0) {
                            console.log(result)
                            if (result.data.status == 'S') {
                                var url = '/productIndexes/monitoring/forms/performanceExport.ajax?filename=' + encodeURIComponent(result.data.filename);
                                window.open(url);
                                clearInterval(fn)
                                console.log('完成，开始导出')
                            }
                        } else {
                            this.showDialog("custom", "info", true, result.msg)
                        }
                    }.bind(this)
                });
            }.bind(this), 5000)
        },
        //业绩数据导出任务
        performanceExport: function (custom_productList) {
            var flag = '';
            var data = {
                customProductROList: custom_productList.map(function (item) {
                    var obj = {};
                    item.productId && (obj.productId = item.productId);
                    item.productType && (obj.productType = item.productType);
                    item.salePlatform && (obj.salePlatform = item.salePlatform);
                    item.salePosition && (obj.salePosition = item.salePosition);
                    item.investArea && (obj.investArea = item.investArea);
                    item.parentPlatform && (obj.parentPlatform = item.parentPlatform);
                    if (item.productId == '' && item.salePlatform == '' && item.salePosition == '' && item.investArea == '' && item.parentPlatform == '') {
                        flag = '每级平台，专区，产品，赛道至少选择一个';
                    }
                    if (obj.productType != 1) {
                        obj.productType = 2
                    }
                    return obj;
                })
            }
            // var firstType = data.customProductROList[0].productType
            // data.customProductROList.some(function (item) {
            //     if (firstType && item.productType) {
            //         if (item.productType !== firstType) {
            //             flag = '组合与基金不能同时导出';
            //             return true;
            //         }
            //     }
            // })
            if (flag) {
                return this.showDialog('custom', 'info', true, flag);
            }
            $.post({
                url: '/productIndexes/monitoring/forms/performanceTask.ajax',
                data: data,
                success: function (result) {
                    if (result.error === 0) {
                        this.performanceExportTask = result.data;
                        this.showDialog("custom", "info", false, '后台正在写入文件，写入完成时将自动导出')
                        this.taskLoop()
                    } else {
                        this.showDialog("custom", "info", true, result.msg)
                    }
                }.bind(this)
            });

        },
        //产品净值导出
        navExport: function (item) {
            var url = '/productIndexes/monitoring/forms/navExport.ajax?str='+encodeURIComponent('productId=' + item.productid + '&investArea=' + item.investArea+ '&parentPlatform=' + item.parentPlatform+ '&salePlatform=' + item.salePlatform+ '&salePosition='+item.salePosition) ;
            window.open(url);
        },
        //报表导出
        exportExcel: function () {
            var params = this.queryParamsforExport;
            var url = '/productIndexes/monitoring/forms/exportExcel.ajax?';
            var temp = '';
            for (var key in params) {
                temp += ('&' + key + '=' + params[key])
            }
            url += temp.slice(1);
            window.open(url);
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
        showCategoryText: function (value) {
            var obj = {
                "1": "收益",
                "2": "波动",
                "3": "风险",
                "4": "胜率",
            }
            return obj[value] || value;
        },
        // indexValueRound: function (value) {
        //     if (value) {
        //         return (Math.round(value * 10000) / 10000);
        //     }
        //     return value;
        // },
        titleToText: function (value) {
            if (value === '1') {
                return '收益相关';
            } else if (value === '2') {
                return '波动相关';
            } else if (value === '3') {
                return '风险相关';
            } else if (value === '4') {
                return '胜率相关';
            }
            return value;

        },
    }
});