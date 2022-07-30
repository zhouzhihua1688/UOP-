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
        platformList: [],
        positionList: [],
        productList: {},
        groupId: '',
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
        optionPie1: {
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
        $.post({
            url: '/investmentMgmt/investmentStrategyMonitoring/productIndexesForms/labels.ajax',
            // data: {
            //     type: '2'
            // },
            success: function (result) {
                if (result.error === 0) {
                    this.productList = result.data;
                    // var newobj={};
                    // Object.keys(this.productList).sort((a,b)=>a.replace('A','')-b.replace('A','')).forEach((key)=>{newobj[key]=this.productList[key]});
                    // this.productList = newobj;
                } else {
                    this.showDialog("", "info", false, result.msg)
                }
            }.bind(this)
        });
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
        $('#select2GroupId').css('width', '140px').select2({});
        $("#select2GroupId").on("select2:select", function (e) {
            // e 的话就是一个对象 然后需要什么就 “e.参数” 形式 进行获取
            this.groupId = e.params.data.id;
        }.bind(this));

    },
    computed: {
       
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
            this.waitExportsData.baseInfo=this.productList[this.groupId]
            this.groupId && (params.groupId = this.groupId);
            // this.salePlatform && (params.salePlatform = '');
            // this.salePosition && (params.salePosition = this.salePosition);
            this.changeDate = ''
            $.post({
                url: '/investmentMgmt/investmentStrategyMonitoring/productIndexesForms/tableData.ajax',
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
                            // 基准无数据的空对象去除
                            // this.yieldData .push({})
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
                this.optionPie1.series[0].data = [];
                this.setEchates('chartsPie', this.optionPie);
                this.setEchates('chartsPie1', this.optionPie1);
                return;
            }
            $.post({
                url: '/investmentMgmt/investmentStrategyMonitoring/productIndexesForms/pieData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        console.log(result.data.typePrecent);
                        // return
                        var _pieData = result.data.pieData.filter(function (item) {
                            return item.fundPercent != 0;
                        })
                        this.optionPie.series[0].data = _pieData.map(function (item) {
                            return {
                                value: item.fundPercent,
                                name: item.fundName+'('+item.showFundStatus+')' + '         ' + item.fundPercent + '%'
                            }
                        })
                        this.optionPie.legend.data = _pieData.map(function (item) {
                            return {
                                name: item.fundName+'('+item.showFundStatus+')' + '         ' + item.fundPercent + '%',
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
                        // 大类饼图
                        this.optionPie1.legend.data=[];
                        this.optionPie1.series[0].data=[];
                        if(Object.keys(result.data.typePrecent).length>0){
                            for(key in result.data.typePrecent){
                                this.optionPie1.series[0].data.push({
                                    value:result.data.typePrecent[key],
                                    name:this.fundTypeTransfer(key)+'         '+result.data.typePrecent[key]+'%'
                                })
                                this.optionPie1.legend.data.push({
                                    name: this.fundTypeTransfer(key)+'         '+result.data.typePrecent[key]+'%',
                                    textStyle: {
                                        fontWeight: 'lighter',
                                        fontSize: 14
                                    }
                                })
                            }
                            var myChart1 = echarts.init(document.getElementById('chartsPie1'));
                            myChart1.setOption(this.optionPie1);
                            myChart1.on('mouseover', function (param) {
                                console.log(param);
                                this.optionPie1.legend.data.forEach(function (item) {
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
                                myChart1.setOption(this.optionPie1);
                            }.bind(this));
                            myChart1.on('mouseout', function (param) {
                                this.optionPie1.legend.data.forEach(function (item) {
                                    item.textStyle = {
                                        fontWeight: 'lighter',
                                        fontSize: 14
                                    }
                                })
                                myChart1.setOption(this.optionPie1);
                            }.bind(this));
                        }else{
                            this.setEchates('chartsPie1', this.optionPie1);
                        }
                    } else {
                        this.optionPie.series[0].data = [];
                        this.optionPie1.series[0].data=[];
                        this.setEchates('chartsPie', this.optionPie)
                        this.setEchates('chartsPie1', this.optionPie1)
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
                url: '/investmentMgmt/investmentStrategyMonitoring/productIndexesForms/brokenLineData.ajax',
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
                        // var _markPoint = result.data.markPoint;
                        // if (_markPoint.oneMax && _markPoint.twoMax) {
                        //     if ((_markPoint.oneMax.groupYield - _markPoint.oneMin.groupYield) > (_markPoint.twoMax.groupYield - _markPoint.twoMin.groupYield)) {
                        //         list[0].markPoint = {
                        //             symbol: 'circle',
                        //             symbolSize: 5,
                        //             itemStyle: {
                        //                 color: 'blue'
                        //             },
                        //             data: [{
                        //                     coord: [this.moment(_markPoint.oneMax.yieldDate).format("YY-MM-DD"), _markPoint.oneMax.groupYield]
                        //                 },
                        //                 {
                        //                     coord: [this.moment(_markPoint.oneMin.yieldDate).format("YY-MM-DD"), _markPoint.oneMin.groupYield]
                        //                 },
                        //             ]
                        //         }
                        //     } else {
                        //         list[0].markPoint = {
                        //             symbol: 'circle',
                        //             symbolSize: 5,
                        //             itemStyle: {
                        //                 color: 'blue'
                        //             },
                        //             data: [{
                        //                     coord: [this.moment(_markPoint.twoMax.yieldDate).format("YY-MM-DD"), _markPoint.twoMax.groupYield]
                        //                 },
                        //                 {
                        //                     coord: [this.moment(_markPoint.twoMin.yieldDate).format("YY-MM-DD"), _markPoint.twoMin.groupYield]
                        //                 },
                        //             ]
                        //         }
                        //     }
                        // } else if (_markPoint.oneMax) {
                        //     list[0].markPoint = {
                        //         symbol: 'circle',
                        //         symbolSize: 5,
                        //         itemStyle: {
                        //             color: 'blue'
                        //         },
                        //         data: [{
                        //                 coord: [this.moment(_markPoint.oneMax.yieldDate).format("YY-MM-DD"), _markPoint.oneMax.groupYield]
                        //             },
                        //             {
                        //                 coord: [this.moment(_markPoint.oneMin.yieldDate).format("YY-MM-DD"), _markPoint.oneMin.groupYield]
                        //             },
                        //         ]
                        //     }
                        // }
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
            var url = '/investmentMgmt/investmentStrategyMonitoring/productIndexesForms/navExport.ajax?productId=' + groupid + '&productType=2';
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
        // 类型翻译
        fundTypeTransfer: function (value) {
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
        }
    },
    components: {
        // 'date-picker': VueBootstrapDatetimePicker
    },
    filters: {

    }
});