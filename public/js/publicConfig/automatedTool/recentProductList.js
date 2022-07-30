new Vue({
    el: '#content',
    data: {
        diaMsg: '', //dialog
        type: '', //栏目类型
        typeAll: [{ //栏目类型选项
                typeName: '请选择',
                typeValue: ''
            },
            {
                typeName: '新基金',
                typeValue: 'newfund'
            },
            {
                typeName: '定开基金',
                typeValue: 'attimenfund'
            },
            {
                typeName: '普通基金',
                typeValue: 'commonfund'
            }
        ],
        comps: [],
    },

    mounted: function () {
        var dialogs = ['info'];
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
    },
    methods: {
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
        addList: function (ind) {
            if (this.type == 0) {
                this.showDialog('', 'info', false, '请选择基金类型');
                return;
            }
            this.comps.push({
                compName: this.type,
                onlyId: Math.random() + (new Date().toLocaleTimeString())
            })
        },
        delList: function (ind) {
            this.comps.splice(ind, 1)
        }

    },
    components: {
        vueSelect: vueSelect,
        newfund: {
            template: '#newFund',
            data: function () {
                return {
                    yield: 'weeklyReturn', //收益率
                    yieldType: [{ //收益率类型选项
                            yieldTime: '近1周',
                            typeValue: 'weeklyReturn'
                        },
                        {
                            yieldTime: '近1月',
                            typeValue: 'monthlyReturn'
                        },
                        {
                            yieldTime: '近3月',
                            typeValue: 'quarterReturn'
                        },
                        {
                            yieldTime: '近6月',
                            typeValue: 'halfYearReturn'
                        },
                        {
                            yieldTime: '今年以来',
                            typeValue: 'fromYearReturn'
                        },
                        {
                            yieldTime: '近一年',
                            typeValue: 'yearReturn'
                        },
                        {
                            yieldTime: '近两年',
                            typeValue: 'twoYearReturn'
                        },
                        {
                            yieldTime: '近三年',
                            typeValue: 'threeYearReturn'
                        },
                        {
                            yieldTime: '近五年',
                            typeValue: 'fiveYearReturn'
                        },
                        {
                            yieldTime: '成立以来',
                            typeValue: 'fromBuildReturn'
                        },
                    ],
                    funds: [{
                        fundId: '',
                        fundName: '',
                        fundSrc: '',
                    }],
                }
            },
            props: ['ind'],
            methods: {
                addFund: function () {
                    this.funds.push({
                        fundId: '',
                        fundName: '',
                        fundSrc: '',
                    })
                },

                del: function () {
                    this.$emit('func', this.ind)
                },
                delFundList:function(ind){
                    this.funds.splice(ind,1)
                }
            }
        },
        commonfund: {
            template: '#commonFund',
            data: function () {
                return {
                    yield: 'weeklyReturn', //收益率
                    yieldType: [{ //收益率类型选项
                            yieldTime: '近1周',
                            typeValue: 'weeklyReturn'
                        },
                        {
                            yieldTime: '近1月',
                            typeValue: 'monthlyReturn'
                        },
                        {
                            yieldTime: '近3月',
                            typeValue: 'quarterReturn'
                        },
                        {
                            yieldTime: '近6月',
                            typeValue: 'halfYearReturn'
                        },
                        {
                            yieldTime: '今年以来',
                            typeValue: 'fromYearReturn'
                        },
                        {
                            yieldTime: '近一年',
                            typeValue: 'yearReturn'
                        },
                        {
                            yieldTime: '近两年',
                            typeValue: 'twoYearReturn'
                        },
                        {
                            yieldTime: '近三年',
                            typeValue: 'threeYearReturn'
                        },
                        {
                            yieldTime: '近五年',
                            typeValue: 'fiveYearReturn'
                        },
                        {
                            yieldTime: '成立以来',
                            typeValue: 'fromBuildReturn'
                        },
                    ],
                    funds: [{
                        fundId: '',
                        fundName: '',
                        fundSrc: '',
                        fundExplain: ''
                    }]
                }
            },
            props: ['ind'],
            methods: {
                addFund: function () {
                    this.funds.push({
                        fundId: '',
                        fundName: '',
                        fundSrc: '',
                        fundExplain: ''
                    })
                },
                del: function () {
                    this.$emit('func', this.ind)
                },
                delFundList:function(ind){
                    this.funds.splice(ind,1)
                }
            }
        },
        attimenfund: {
            template: '#atTimenFund',
            data: function () {
                return {
                    yield: 'weeklyReturn', //收益率
                    yieldType: [{ //收益率类型选项
                            yieldTime: '近1周',
                            typeValue: 'weeklyReturn'
                        },
                        {
                            yieldTime: '近1月',
                            typeValue: 'monthlyReturn'
                        },
                        {
                            yieldTime: '近3月',
                            typeValue: 'quarterReturn'
                        },
                        {
                            yieldTime: '近6月',
                            typeValue: 'halfYearReturn'
                        },
                        {
                            yieldTime: '今年以来',
                            typeValue: 'fromYearReturn'
                        },
                        {
                            yieldTime: '近一年',
                            typeValue: 'yearReturn'
                        },
                        {
                            yieldTime: '近两年',
                            typeValue: 'twoYearReturn'
                        },
                        {
                            yieldTime: '近三年',
                            typeValue: 'threeYearReturn'
                        },
                        {
                            yieldTime: '近五年',
                            typeValue: 'fiveYearReturn'
                        },
                        {
                            yieldTime: '成立以来',
                            typeValue: 'fromBuildReturn'
                        },
                    ],
                    funds: [{
                        fundId: '',
                        fundName: '',
                        fundSrc: '',
                    }]
                }
            },
            props: ['ind'],
            methods: {
                addFund: function () {
                    this.funds.push({
                        fundId: '',
                        fundName: '',
                        fundSrc: '',
                    })
                },
                del: function () {
                    this.$emit('func', this.ind)
                },
                delFundList:function(ind){
                    this.funds.splice(ind,1)
                }
            }
        }
    },
})