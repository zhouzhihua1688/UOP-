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
        tableData: {
            cmpDetailDOList: [],
            changeDateList: [],
        },
        diaMsg: '',

        dateRangeType: [
            // {type:'00',desc:'一周'},
            {
                type: '01',
                desc: '一月'
            },
            {
                type: '02',
                desc: '三月'
            },
            {
                type: '03',
                desc: '六月'
            },
            // {type:'04',desc:'今年以来'},
            {
                type: '05',
                desc: '一年'
            },
            // {type:'06',desc:'两年'},
            // {type:'07',desc:'三年'},
            // {type:'09',desc:'五年'},
            {
                type: '08',
                desc: '成立以来'
            }
        ],
        // 查询
        parentPlatformList:[],
        platformList: [],
        positionList: [],
        productList: [],
        groupId: '',
        parentPlatform: '',
        salePlatform: '',
        salePosition: '',
        startDate: '',


        //风险收益特征   //近期收益
        yieldData: [],
        //柱状图
        barData: {
            // color: ['#003366', '#006699', '#4cabce', '#e5323e'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                right: 'center',
                top: 'bottom',
                data: ['近1月', '近3月', '近6月']
            },
            xAxis: [{
                type: 'category',
                axisTick: {
                    show: false
                },
                boundaryGap: false,
                boundaryGap: false,
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: "#999999"
                    }
                },
                axisTick: {
                    show: false
                },
                data: ['"测试同步组合']
            }],
            yAxis: [{
                type: 'value',
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "#f1f1f1"
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: "#f1f1f1"
                    }
                },
                axisLabel: {
                    show: true,
                    formatter: "{value}%",
                    textStyle: {
                        color: "#999999",
                        fontFamily: "Arial"
                    }
                },
                axisPointer: {
                    label: {
                        show: false
                    },
                    lineStyle: {
                        type: "solid",
                        color: "#1aa2e6"
                    }
                }
            }],
            series: [{
                type: 'bar',
                // barGap: 0,
                data: [1]
            }]
        },
        //折线图查询
        dateRange: '01',
        brokenLine: {
            tooltip: {
                trigger: 'axis'
            },
            color: ['#ec6666', '#307ECC'],
            legend: {
                // orient: 'vertical',
                right: '50%',
                top: 'bottom',
                // formatter: function (name) {
                //     return  name;
                // }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '10%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: "#999999"
                    }
                },
                axisTick: {
                    show: false
                },
                // data: ['1-2', '1-4', '1-6']
            },
            yAxis: {
                type: 'value',
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "#f1f1f1"
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: "#f1f1f1"
                    }
                },
                axisLabel: {
                    show: true,
                    formatter: "{value}%",
                    textStyle: {
                        color: "#999999",
                        fontFamily: "Arial"
                    }
                },
                axisPointer: {
                    label: {
                        show: false
                    },
                    lineStyle: {
                        type: "solid",
                        color: "#1aa2e6"
                    }
                }
            },
            series: []
        },
        //饼图查询
        changeDate: '',
        optionPie: {
            legend: {
                orient: 'vertical',
                left: '45%',
                top: 'center',
                // formatter: function (name) {
                //     return  name;
                // }
            },
            series: [{
                // name: '面积模式',
                type: 'pie',
                radius: [40, 135],
                center: ['20%', '50%'],
                roseType: 'area',
                itemStyle: {
                    borderRadius: 8
                },
                labelLine: {
                    show: false
                },
                label: {
                    show: false,
                    position: 'center'
                },
                // emphasis: {
                //     label: {
                //         show: false,
                //         fontSize: '20',
                //         fontWeight: 'bold'
                //     }
                // },
                data: []
            }]
        },
        waitExportsData:{
            baseInfo:{},
            yieldList:[]
        }
    },
    created: function () {
        this.startDate = moment(new Date().setTime(new Date().getTime() - 24 * 60 * 60 * 1000)).format("YYYY-MM-DD");
        // $.post({
        //     url: '/productIndexes/monitoring/forms/labels.ajax',
        //     data: {
        //         type: '2'
        //     },
        //     success: function (result) {
        //         if (result.error === 0) {
        //             result.data.forEach(function (item) {
        //                 if (!this.platformList.includes(item.salePlatform)) {
        //                     this.platformList.push(item.salePlatform)
        //                 }
        //                 if (!this.positionList.includes(item.salePosition)) {
        //                     this.positionList.push(item.salePosition)
        //                 }
        //                 this.productList[item.productid] = item;
        //             }, this)
        //         } else {
        //             this.showDialog("", "info", false, result.msg)
        //         }
        //     }.bind(this)
        // });
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
        // this.getTableData(0);

        // $('#select2GroupId').css('width', '140px').select2({});
        // $("#select2GroupId").on("select2:select", function (e) {
        //     // e 的话就是一个对象 然后需要什么就 “e.参数” 形式 进行获取
        //     this.groupId = e.params.data.id;
        // }.bind(this));

    },
    computed: {
        // cGroupList: function () {
        //     if (this.salePlatform === '' && this.salePosition === '') {
        //         return this.productList;
        //     }
        //     var obj = {};

        //     if (this.salePlatform !== '' && this.salePosition !== '') {
        //         for (var key in this.productList) {
        //             if (this.productList[key].salePlatform === this.salePlatform && this.productList[key].salePosition === this.salePosition) {
        //                 obj[key] = this.productList[key];
        //             }
        //         }
        //         return obj;
        //     }
        //     if (this.salePlatform !== '') {
        //         for (var key in this.productList) {
        //             if (this.productList[key].salePlatform === this.salePlatform) {
        //                 obj[key] = this.productList[key];
        //             }
        //         }
        //         return obj;
        //     }
        //     if (this.salePosition !== '') {
        //         for (var key in this.productList) {
        //             if (this.productList[key].salePosition === this.salePosition) {
        //                 obj[key] = this.productList[key];
        //             }
        //         }
        //         return obj;
        //     }
        // },
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
        pageMaxNum: function () {
            this.getTableData(0);
        },
        changeDate: function (newval) {
            this.getPieData(newval)
        },
        dateRange: function (newval) {
            this.getBrokenLineData(newval)
        }
    },
    methods: {
        labelQuery:function(labelEnum){
            var data = {
                strategyType:'2',
                labelEnum
            }
            
            this.parentPlatform&&(data.parentPlatform = this.parentPlatform)
            this.salePlatform&&(data.salePlatform = this.salePlatform)
            this.salePosition&&(data.salePosition = this.salePosition)
            this.groupId&&(data.productId = this.groupId)
            $.post({
                url: '/productIndexes/monitoring/realTimeForms/labels.ajax',
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
        indicatorExport: function () {
            var elt = document.getElementById('indicatorExport-table');
            var wb = XLSX.utils.table_to_book(elt, {sheet: 'Sheet JS',raw:true});
            XLSX.writeFile(wb, '指标.xlsx');
        },
        setEchates: function (id, data) {
            var myChart = echarts.init(document.getElementById(id));
            myChart.setOption(data);
        },
        moment: moment,

        getTableData: function () {
            var params = {};
            if (this.groupId === '') {
                this.showDialog("", "info", false, '请选择产品');
                return;
            }
            this.salePlatform && (this.waitExportsData.baseInfo.salePlatform = this.salePlatform);
            this.parentPlatform && (this.waitExportsData.baseInfo.parentPlatform = this.parentPlatform);
            this.salePosition && (this.waitExportsData.baseInfo.salePosition = this.salePosition);
            this.groupId &&(this.waitExportsData.baseInfo.groupInfo = this.productList.find(function(item){return item.labelId == this.groupId},this)?this.productList.find(function(item){return item.labelId == this.groupId},this).labelContent:'');
         
            this.groupId && (params.groupId = this.groupId);
            
            this.changeDate = '';
            $.post({
                url: '/productIndexes/monitoring/realTimeForms/tableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        if (result.data) {
                            this.tableData = result.data;
                            this.changeDate = result.data.changeDateList[0]; //饼图
                            this.getBrokenLineData(this.dateRange) //折线图
                            this.yieldData = result.data.productAllRiskProfitVOList.map(function (item) {
                                for (var keys in item) {
                                    if (item[keys] && keys != 'productType' && keys != 'maxRecoverDays') {
                                        if (item[keys] != null) {
                                            if (keys == 'sharpRate' || keys == 'informationRatio' || keys == 'sortinoRatio') {
                                                item[keys] = item[keys].toFixed(2)
                                            } else {
                                                item[keys] = (item[keys] * 100).toFixed(2)
                                            }
                                        }

                                    }

                                }
                                return item;
                            })
                            this.yieldData .push({})
                            this.setBarEcharts() //柱状图
                        } else {
                            this.tableData = {
                                cmpDetailDOList: [],
                                changeDateList: [],
                            };
                            this.changeDate = '';
                            this.getBrokenLineData() //折线图
                            this.setBarEcharts() //柱状图
                        }

                    } else {
                        this.tableData = {
                            cmpDetailDOList: [],
                            changeDateList: [],
                        };
                        this.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
        setBarEcharts: function () {
            if (!this.yieldData.length) {
                this.barData.series = [{
                    type: 'bar',
                    // barGap: 0,
                    data: []
                }];
                this.barData.xAxis = [{
                    type: 'category',
                    axisTick: {
                        show: false
                    },
                    data: []
                }];
                this.barData.legend.data = [];
                this.setEchates('chartsBar', this.barData);
                return;
            }
            var xAxis = [];
            var series = [{
                    tips: 'nearMonthYield',
                    barGap: '90%',
                    barMaxWidth: '50',
                    type: 'bar',
                    name: '近1月',
                    data: []
                },
                {
                    tips: 'nearThreeMonthYield',
                    barMaxWidth: '50',
                    type: 'bar',
                    name: '近3月',
                    data: []
                },
                {
                    tips: 'nearSixMonthYield',
                    barMaxWidth: '50',
                    type: 'bar',
                    name: '近6月',
                    data: []
                },
                {
                    tips: 'nearNineMonthYield',
                    barMaxWidth: '50',
                    type: 'bar',
                    name: '近9月',
                    data: []
                },
                {
                    tips: 'nearYearYield',
                    barMaxWidth: '50',
                    type: 'bar',
                    name: '近1年',
                    data: []
                },
                {
                    tips: 'fromYearYield',
                    barMaxWidth: '50',
                    type: 'bar',
                    name: '今年以来',
                    data: []
                },

            ];
            this.barData.legend.data = ['近1月', '近3月', '近6月', '近9月', '近1年', '今年以来']
            this.yieldData.forEach(function (item, index) {
                if (item.productType === '2') {
                    xAxis.push(this.tableData.groupName)
                } else if (item.productType === '3') {
                    xAxis.push('基准')
                }
                series.forEach(function (bar) {
                    if (item[bar.tips] != null) {
                        bar.data.push(item[bar.tips])
                    }
                })
            }, this)
            this.barData.series = series;
            this.barData.xAxis[0].data = xAxis;
            this.setEchates('chartsBar', this.barData);

        },
        getPieData: function (changeDate) {
            var params = {
                groupId: this.tableData.groupid,
                changeDate: changeDate
            };
            if (!changeDate) {
                this.optionPie.series[0].data = [];
                this.setEchates('chartsPie', this.optionPie);
                return;
            }
            $.post({
                url: '/productIndexes/monitoring/realTimeForms/pieData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        var _pieData = result.data.filter(function (item) {
                            return item.fundPercent != 0;
                        })
                        this.optionPie.series[0].data = _pieData.map(function (item) {
                            return {
                                value: item.fundPercent,
                                name: item.fundName + '         ' + item.fundPercent + '%'
                            }
                        })
                        this.optionPie.legend.data = _pieData.map(function (item) {
                            return {
                                name: item.fundName + '         ' + item.fundPercent + '%',
                                textStyle: {
                                    fontWeight: 'lighter',
                                    fontSize: 14
                                }
                            }
                        })
                        // legend
                        var myChart = echarts.init(document.getElementById('chartsPie'));
                        myChart.setOption(this.optionPie);
                        myChart.on('mouseover', function (param) {
                            console.log(param);
                            this.optionPie.legend.data.forEach(function (item) {
                                if (param.name === item.name) {
                                    item.textStyle = {
                                        fontWeight: 'bolder',
                                        fontSize: 14,
                                        color: '#000'
                                    }
                                } else {
                                    item.textStyle = {
                                        fontWeight: 'lighter',
                                        fontSize: 14
                                    }
                                }
                            })
                            myChart.setOption(this.optionPie);
                        }.bind(this));
                        myChart.on('mouseout', function (param) {
                            this.optionPie.legend.data.forEach(function (item) {
                                item.textStyle = {
                                    fontWeight: 'lighter',
                                    fontSize: 14
                                }
                            })
                            myChart.setOption(this.optionPie);
                        }.bind(this));
                    } else {
                        this.optionPie.series[0].data = [];
                        this.setEchates('chartsPie', this.optionPie)
                        this.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
        getBrokenLineData: function (dateRange) {
            var params = {
                productId: this.tableData.groupid,
                dateRange: dateRange
            };
            if (!dateRange) {
                this.brokenLine.series = [{
                    type: 'line',
                    data: []
                }, {
                    type: 'line',
                    data: []
                }];
                this.setEchates('chartsLine', this.brokenLine)
                return;
            }
            $.post({
                url: '/productIndexes/monitoring/realTimeForms/brokenLineData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.waitExportsData.yieldList=result.data.list;
                        if(this.waitExportsData.yieldList.length<this.yieldData.length*2){//数据不足时，添加{}已保证导出格式
                            for (var num =this.waitExportsData.yieldList.length;num<=this.yieldData.length*2;num++){
                                this.waitExportsData.yieldList.push({})
                                num++;
                            }
                        }
                        var list = [{
                                name: this.tableData.groupName,
                                showSymbol: false,
                                type: 'line',
                                lineStyle: {
                                    normal: {
                                        // color: "#ec6666",
                                        width: 1
                                    }
                                },
                                data: []
                            },
                            {
                                name: '基准',
                                type: 'line',
                                showSymbol: false,
                                lineStyle: {
                                    normal: {
                                        // color: "#307ECC",
                                        width: 1
                                    }
                                },
                                data: []
                            }
                        ];
                        result.data.list.forEach(function (item) {
                            list[0].data.push([this.moment(item.yieldDate).format("YY-MM-DD"), item.groupYield])
                            list[1].data.push([this.moment(item.yieldDate).format("YY-MM-DD"), item.comparisonYield])
                        }, this)
                        var _markPoint = result.data.markPoint;
                        if (_markPoint.oneMax && _markPoint.twoMax) {
                            if ((_markPoint.oneMax.groupYield - _markPoint.oneMin.groupYield) > (_markPoint.twoMax.groupYield - _markPoint.twoMin.groupYield)) {
                                list[0].markPoint = {
                                    symbol: 'circle',
                                    symbolSize: 5,
                                    itemStyle: {
                                        color: 'blue'
                                    },
                                    data: [{
                                            coord: [this.moment(_markPoint.oneMax.yieldDate).format("YY-MM-DD"), _markPoint.oneMax.groupYield]
                                        },
                                        {
                                            coord: [this.moment(_markPoint.oneMin.yieldDate).format("YY-MM-DD"), _markPoint.oneMin.groupYield]
                                        },
                                    ]
                                }
                            } else {
                                list[0].markPoint = {
                                    symbol: 'circle',
                                    symbolSize: 5,
                                    itemStyle: {
                                        color: 'blue'
                                    },
                                    data: [{
                                            coord: [this.moment(_markPoint.twoMax.yieldDate).format("YY-MM-DD"), _markPoint.twoMax.groupYield]
                                        },
                                        {
                                            coord: [this.moment(_markPoint.twoMin.yieldDate).format("YY-MM-DD"), _markPoint.twoMin.groupYield]
                                        },
                                    ]
                                }
                            }
                        } else if (_markPoint.oneMax) {
                            list[0].markPoint = {
                                symbol: 'circle',
                                symbolSize: 5,
                                itemStyle: {
                                    color: 'blue'
                                },
                                data: [{
                                        coord: [this.moment(_markPoint.oneMax.yieldDate).format("YY-MM-DD"), _markPoint.oneMax.groupYield]
                                    },
                                    {
                                        coord: [this.moment(_markPoint.oneMin.yieldDate).format("YY-MM-DD"), _markPoint.oneMin.groupYield]
                                    },
                                ]
                            }
                        }
                        this.brokenLine.series = list;
                        this.setEchates('chartsLine', this.brokenLine)
                    } else {
                        this.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
        //产品净值导出
        navExport: function (groupid) {
            var url = '/productIndexes/monitoring/realTimeForms/navExport.ajax?productId=' + groupid + '&productType=2';
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
    },
    components: {
        // 'date-picker': VueBootstrapDatetimePicker
    },
    filters: {

    }
});