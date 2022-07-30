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
        label:{
            parentPlatform:'',//一级
            salePlatform:'',//二级
            salePosition:'',//专区
            investArea:'',//赛道
            productId:''//产品id
        },
        parentPlatformList: [],
        platformList: [],
        positionList: [],
        investAreaList: [],
        productList: [],
        //添加
        selectBaseInfo: {},
        monitorIndex: [],
        operateData: {
            parentPlatform: '',
            salePlatform: '',
            salePosition: '',
            investArea: '',
            productId: ''
        },
        opreateParentPlatformList: [],
        opreatePlatformList: [],
        opreatePositionList: [],
        opreateInvestAreaList: [],
        opreateProductList: [],
        settingParentPlatformList: [],
        settingPlatformList: [],
        settingPositionList: [],
        settingInvestAreaList: [],
        settingProductList: [],
        // 修改和删除
        operateDetail: {},
        contactsList: [],
        //自定义
        productForCalc: [],
        dateList: [{
                name: '最近n天',
                value: 1
            },
            {
                name: '最近n月',
                value: 3
            },
            {
                name: '最近n年',
                value: 4
            },
            {
                name: '成立以来',
                value: 5
            },
            {
                name: '当个持有期',
                value: 7
            }
        ],
        riskList: [{
                name: '夏普比率',
                value: 4
            },
            {
                name: '最大回撤',
                value: 5
            },
            {
                name: '最大回撤恢复天数',
                value: 6
            },
            {
                name: '最大连续回撤天数',
                value: 7
            },
            {
                name: '最大单日回撤',
                value: 13
            }
        ],
        operateCustom: {
            indexCategory: '',
            indexConfig: {
                calcUnit: '',
                calcValue: 0,
                expectancyValue: 0,
                holdUnit: "",
                holdValue: 0
            },
            indexName: "",
            // indexid: "",
            showCategory: '',
            parentPlatform:'',
            salePlatform:'',
            salePosition:'',
            investArea:'',
            productId:''
        },
        detailData:[],
        isBatchProcessing:false,
        // calcProductIndex: '',
        // productStatus: false,
        calcValue: ''
    },
    created: function () {
        $.post({
            url: '/productIndexes/monitoring/indicatorPush/contactsList.ajax',
            success: function (result) {
                if (result.error === 0) {
                    // this.platformList = result.data;
                    this.contactsList = JSON.parse(result.data)
                } else {
                    this.showDialog("", "info", false, result.msg)
                }
            }.bind(this)
        });
        this.getMonitorIndex()
    },
    mounted: function () {
        var dialogs = ['info', 'modify', 'modify2', 'deletaDialog','setting2', 'setting3'];
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
        $('#stateInfo').css({
            'width': '184px'
        }).select2({
            closeOnSelect: false
        })
        $("#stateInfo").on("select2:close", function (e) {
            // e 的话就是一个对象 然后需要什么就 “e.参数” 形式 进行获取
            this.operateDetail.emailList = $("#stateInfo").val() ? $("#stateInfo").val() : ''

        }.bind(this));

        $('#select2GroupId').css('width', '140px').select2({});
        $("#select2GroupId").on("select2:select", function (e) {
            // e 的话就是一个对象 然后需要什么就 “e.参数” 形式 进行获取
            this.productId = e.params.data.id;
        }.bind(this));

        $('#selectProductid').chosen({
            search_contains: true,
            no_results_text: '未找到',
            disable_search_threshold: 6,
            width: '184px'
        });
        $('#selectProductid').on('change', function (e, params) {
            this.operateData.productId = params ? params.selected : '';
        }.bind(this));
    },
    computed: {
        cGroupList: function () {
            if (this.salePlatform === '' && this.salePosition === '') {
                return this.productList;
            }
            var obj = {};

            if (this.salePlatform !== '' && this.salePosition !== '') {
                for (var key in this.productList) {
                    if (this.productList[key].salePlatform === this.salePlatform && this.productList[key].salePosition === this.salePosition) {
                        obj[key] = this.productList[key];
                    }
                }
                return obj;
            }
            if (this.salePlatform !== '') {
                for (var key in this.productList) {
                    if (this.productList[key].salePlatform === this.salePlatform) {
                        obj[key] = this.productList[key];
                    }
                }
                return obj;
            }
            if (this.salePosition !== '') {
                for (var key in this.productList) {
                    if (this.productList[key].salePosition === this.salePosition) {
                        obj[key] = this.productList[key];
                    }
                }
                return obj;
            }
        },
        selectPosition: function () {
            if (this.selectBaseInfo[this.operateData.salePlatform]) {
                return Object.keys(this.selectBaseInfo[this.operateData.salePlatform]);
            } else {
                return [];
            }
        },
        selectProductid: function () {
            if (this.selectBaseInfo[this.operateData.salePlatform]) {
                if (this.selectBaseInfo[this.operateData.salePlatform][this.operateData.salePosition]) {

                    var str = '<option value="">请选择</option>';
                    this.selectBaseInfo[this.operateData.salePlatform][this.operateData.salePosition].forEach(function (item) {
                        str += '<option value="' + item.productId + '">' + item.productId + ' - ' + item.productName + '</option>';
                    });
                    $('#selectProductid').html(str);

                    $("#selectProductid").trigger("chosen:updated");
                    return this.selectBaseInfo[this.operateData.salePlatform][this.operateData.salePosition];
                } else {
                    var str = '<option value="">请选择</option>';
                    $('#selectProductid').html(str);
                    $("#selectProductid").trigger("chosen:updated");
                    return [];
                }
            } else {
                var str = '<option value="">请选择</option>';
                $('#selectProductid').html(str);
                $("#selectProductid").trigger("chosen:updated");
                return [];
            }
        },
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
        "operateCustom.indexConfig.calcValue": function (newval) {
            this.operateCustom.indexConfig.calcValue = Math.floor(newval)
        },
        "operateCustom.indexConfig.calcUnit": function (newval) {
            if (newval == 5||newval == 7) {
                this.operateCustom.indexConfig.calcValue = 1;
            }

        },
        pageMaxNum: function () {
            this.getTableData(0);
        }
    },
    methods: {
        labelQuery:function(labelEnum){
            var data = {
                strategyType:'8',
                labelEnum
            }
            this.label.parentPlatform&&(data.parentPlatform = this.label.parentPlatform)
            this.label.salePlatform&&(data.salePlatform = this.label.salePlatform)
            this.label.salePosition&&(data.salePosition = this.label.salePosition)
            this.label.investArea&&(data.investArea = this.label.investArea)
            this.label.productId&&(data.productId = this.label.productId)
            $.post({
                url: '/productIndexes/monitoring/indicatorPush/labels.ajax',
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
                    } else {
                        this.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
        // 新增选项中的5个select
        addLabelQuery:function(labelEnum,flag){
            var data = {
                strategyType:'3',
                labelEnum
            }
        
            if(flag){
                this.operateCustom.parentPlatform&&(data.parentPlatform = this.operateCustom.parentPlatform)
                this.operateCustom.salePlatform&&(data.salePlatform = this.operateCustom.salePlatform)
                this.operateCustom.salePosition&&(data.salePosition = this.operateCustom.salePosition)
                this.operateCustom.investArea&&(data.investArea = this.operateCustom.investArea)
                this.operateCustom.productId&&(data.productId = this.operateCustom.productId)
            }else{
                this.operateData.parentPlatform&&(data.parentPlatform = this.operateData.parentPlatform)
                this.operateData.salePlatform&&(data.salePlatform = this.operateData.salePlatform)
                this.operateData.salePosition&&(data.salePosition = this.operateData.salePosition)
                this.operateData.investArea&&(data.investArea = this.operateData.investArea)
                this.operateData.productId&&(data.productId = this.operateData.productId)
            }
            
            $.post({
                url: '/productIndexes/monitoring/indicatorPush/labels.ajax',
                data,
                success: function (result) {
                    if (result.error === 0) {
                        // console.log('labelEnum',labelEnum);
                        // console.log('result',result);
                        if(flag){
                            (labelEnum=='ParentPlatform')&&(this.settingParentPlatformList = result.data);
                            (labelEnum=='SalePlatform')&&(this.settingPlatformList = result.data);
                            (labelEnum=='SalePosition')&&(this.settingPositionList = result.data);
                            (labelEnum=='InvestArea')&&(this.settingInvestAreaList = result.data);
                            (labelEnum=='ProductId')&&(this.settingProductList = result.data);
                        }else{
                            (labelEnum=='ParentPlatform')&&(this.opreateParentPlatformList = result.data);
                            (labelEnum=='SalePlatform')&&(this.opreatePlatformList = result.data);
                            (labelEnum=='SalePosition')&&(this.opreatePositionList = result.data);
                            (labelEnum=='InvestArea')&&(this.opreateInvestAreaList = result.data);
                            (labelEnum=='ProductId')&&(this.opreateProductList = result.data);
                        }
                    } else {
                        this.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
        showSettingDialog: function () {
            // this.productStatus = false;
            this.operateData = {
                parentPlatform: '',
                salePlatform: '',
                salePosition: '',
                investArea: '',
                productId: ''
            }
            for (var key in this.monitorIndex) {
                this.monitorIndex[key].forEach(function (item) {
                    item.checked = false;
                })
            }
            this.opreateParentPlatformList = [];
            this.opreatePlatformList = [];
            this.opreatePositionList = [];
            this.opreateInvestAreaList = [];
            this.opreateProductList = [];
            this.showDialog('', 'setting1');
        },
        calc: function () {
            if (this.operateCustom.indexConfig.calcUnit === '') {
                this.showDialog("", "info", false, '请选择统计区间')
                return;
            }
            if (this.operateCustom.showCategory === 3) {
                if (this.operateCustom.indexCategory === '') {
                    this.showDialog("", "info", false, '请选择风险指标')
                    return;
                }
            } else {
                if (this.operateCustom.indexConfig.holdUnit === '') {
                    this.showDialog("", "info", false, '请选择任意持有')
                    return;
                }
                if (this.operateCustom.indexCategory === '') {
                    this.showDialog("", "info", false, '请选择计算胜率')
                    return;
                }
            }
            var params = {
                indexVOList: [{
                    indexCategory: this.operateCustom.indexCategory,
                    indexConfig: Object.assign({}, this.operateCustom.indexConfig)
                }],
                // productType: this.productForCalc[this.calcProductIndex].productType,
                // productId: this.productForCalc[this.calcProductIndex].productId
            }
            if (this.operateCustom.showCategory === 3) {
                delete params.indexVOList[0].indexConfig.expectancyValue;
                delete params.indexVOList[0].indexConfig.holdUnit;
                delete params.indexVOList[0].indexConfig.holdValue;
            } else {

                if (params.indexVOList[0].indexCategory === 9) {
                    delete params.indexVOList[0].indexConfig.expectancyValue;
                }
            }
            // params.indexid = Math.ceil(Math.random() * 10000) + 'z' + Math.ceil(Math.random() * 10)
            // return;
            if (params.indexVOList[0].indexConfig.expectancyValue) {
                params.indexVOList[0].indexConfig.expectancyValue /= 100;
            }
            params.investArea = this.operateCustom.investArea;
            params.parentPlatform = this.operateCustom.parentPlatform;
            params.productId = this.operateCustom.productId;
            params.salePlatform = this.operateCustom.salePlatform;
            params.salePosition = this.operateCustom.salePosition;
            $.post({
                url: '/productIndexes/monitoring/indicatorPush/calc.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        if (result.data === null) {
                            this.calcValue = '--';
                        } else {
                            this.calcValue = result.data;
                        }
                    } else {
                        if (params.showCategory === 3) {
                            this.calcValue = '试算失败';
                            this.showDialog("", "info", false, result.msg)
                        } else {
                            this.calcValue = '试算失败';
                            this.showDialog("", "info", false, result.msg)
                        }
                    }
                }.bind(this)
            });
        },
        createIndex: function () {
            if (this.operateCustom.indexName === '') {
                this.showDialog("", "info", false, '请填写指标名称')
                return;
            }
            if (this.operateCustom.indexConfig.calcUnit === '') {
                this.showDialog("", "info", false, '请选择统计区间')
                return;
            }
            var params = Object.assign({}, this.operateCustom);
            params.indexConfig = Object.assign({}, this.operateCustom.indexConfig);
            if (this.operateCustom.showCategory === 3) {
                if (this.operateCustom.indexCategory === '') {
                    this.showDialog("", "info", false, '请选择风险指标')
                    return;
                }
                delete params.indexConfig.expectancyValue;
                delete params.indexConfig.holdUnit;
                delete params.indexConfig.holdValue;
            } else {
                if (this.operateCustom.indexConfig.holdUnit === '') {
                    this.showDialog("", "info", false, '请选择任意持有')
                    return;
                }
                if (this.operateCustom.indexCategory === '') {
                    this.showDialog("", "info", false, '请选择计算胜率')
                    return;
                }
                if (params.indexCategory === 9) {
                    delete params.indexConfig.expectancyValue;
                }
            }
            if (params.indexConfig.expectancyValue) {
                params.indexConfig.expectancyValue /= 100;
            }
            // params.indexid = Math.ceil(Math.random() * 10000) + 'z' + Math.ceil(Math.random() * 10)
            // return;
            $.post({
                url: '/productIndexes/monitoring/indicatorPush/createIndex.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.getMonitorIndex()
                        this.operateCustom = {
                            indexCategory: '',
                            indexConfig: {
                                calcUnit: '',
                                calcValue: 0,
                                expectancyValue: 0,
                                holdUnit: '',
                                holdValue: 0
                            },
                            indexName: '',
                            // indexid: '',
                            showCategory: ''
                        }
                        if (params.showCategory === 3) {
                            this.showDialog("setting2", "info", false, result.msg)
                        } else {
                            this.showDialog("setting3", "info", false, result.msg)
                        }
                    } else {
                        if (params.showCategory === 3) {
                            this.showDialog("", "info", false, result.msg)
                        } else {
                            this.showDialog("", "info", false, result.msg)
                        }
                    }
                }.bind(this)
            });
        },
        getMonitorIndex: function () {
            $.post({
                url: '/productIndexes/monitoring/indicatorPush/monitorIndex.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        var data = result.data;
                        for (var key in data) {
                            data[key].forEach(function (item1) {
                                item1.checked = false;
                            })
                        }
                        this.monitorIndex = data;
                    } else {
                        this.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
        showCustom: function (key) {
            // this.calcProductIndex = '';
            // $('.selectCalc').val('');
            // $(".selectCalc").trigger("chosen:updated");
            this.calcValue = '';
            this.operateCustom = {
                indexCategory: '',
                indexConfig: {
                    calcUnit: '',
                    calcValue: 0,
                    expectancyValue: 0,
                    holdUnit: '',
                    holdValue: 0
                },
                indexName: '',
                // indexid: '',
                showCategory: '',
                parentPlatform:'',
                salePlatform:'',
                salePosition:'',
                investArea:'',
                productId:''
            }
            this.settingParentPlatformList = [];
            this.settingPlatformList = [];
            this.settingPositionList = [];
            this.settingInvestAreaList = [];
            this.settingProductList = [];
            if (key == 3) {
                this.operateCustom.showCategory = 3;
                this.showDialog("setting1", "setting2", true)

            } else if (key == 4) {
                this.operateCustom.showCategory = 4;
                this.showDialog("setting1", "setting3", true)
            }
        },
        showDeleteDialog: function (item) {
            this.operateDetail = Object.assign({}, item);
            this.showDialog('', 'deletaDialog', false, '确定要删除 产品代码：' + item.productid + ' 的这条数据吗？')
        },
        deleteMonitor: function () {
            var params = Object.assign({},this.operateDetail);
            delete params.productType;
            delete params.productName;
            $.post({
                url: '/productIndexes/monitoring/indicatorPush/deleteMonitor.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.getTableData(0)
                        this.showDialog("deletaDialog", "info", false, result.msg)
                    } else {
                        this.showDialog("deletaDialog", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
        showDetail: function (item) {
            this.isBatchProcessing = false;
            // var phone = '18621510546,18600068880'
            this.operateDetail = Object.assign({}, item);
            this.queryEmailList(item)

            this.showDialog('', 'modify')
        },
        queryEmailList:function(item){
            var params = Object.assign({},item);
            delete params.productType;
            delete params.productName;
            $.post({
                url: '/productIndexes/monitoring/indicatorPush/queryEmailList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        if(result.data&&result.data.length>0){
                            this.operateDetail.emailList = result.data.map(function(item){
                                return item.email
                            },this);
                        }else{
                            this.operateDetail.emailList = []
                        }
                        $("#stateInfo").val(this.operateDetail.emailList).trigger('change');
                    } else {
                        this.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
            })
        },
        showDetailData: function (item) {
            var params = {
                productId: item.productid
            }
            item.parentPlatform && (params.parentPlatform = item.parentPlatform)
            item.salePlatform && (params.salePlatform = item.salePlatform)
            item.salePosition && (params.salePosition = item.salePosition)
            item.investArea && (params.investArea = item.investArea)
            $.post({
                url: '/productIndexes/monitoring/indicatorPush/detailData.ajax',
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
        updateMonitor: function () {
            var params = Object.assign({},this.operateDetail);
            params.productId = this.operateDetail.productid;
            delete params.productid
            if(this.isBatchProcessing){
                 delete params.productId;
                 delete params.productName;
            }
            $.post({
                url: '/productIndexes/monitoring/indicatorPush/updateMonitor.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.getTableData(0)
                        this.showDialog("modify", "info", false, result.msg)
                    } else {
                        this.showDialog("modify", "info", true, result.msg)
                    }
                }.bind(this)
            });
        },
        addMonitor: function () {
            if (this.operateData.parentPlatform === '') {
                this.showDialog("setting1", "info", true, '请选择一级平台');
                return;
            }
            if (this.operateData.salePlatform === '') {
                this.showDialog("setting1", "info", true, '请选择二级平台');
                return;
            }
            if (this.operateData.salePosition === '') {
                this.showDialog("setting1", "info", true, '请选择专区');
                return;
            }
            if (this.operateData.investArea === '') {
                this.showDialog("setting1", "info", true, '请选择赛道');
                return;
            }
            // if (this.operateData.productId === '') {
            //     this.showDialog("setting1", "info", true, '请选择产品');
            //     return;
            // }
            var params = {
                parentPlatform: this.operateData.parentPlatform,
                salePlatform: this.operateData.salePlatform,
                salePosition: this.operateData.salePosition,
                investArea: this.operateData.investArea,
                indexVOList: (function () {
                    var arr = [];
                    for (var key in this.monitorIndex) {
                        arr.push(this.monitorIndex[key].map(function (item) {
                            if (item.checked === true) {
                                return {
                                    indexid: item.indexid
                                }
                            }
                        }).filter(function (item) {
                            return item;
                        }))
                    }
                    arr = arr.reduce(function (p, n) {
                        return p.concat(n)
                    })
                    return arr;
                }.bind(this))()
            };
            if(params.indexVOList.length===0){
                return this.showDialog("setting1", "info", true, '请勾选指标');
            }
            this.operateData.productId&&(params.productId = this.operateData.productId);
            $.post({
                url: '/productIndexes/monitoring/indicatorPush/addMonitor.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.getTableData(0)
                        this.showDialog("setting1", "info", false, result.msg)
                    } else {
                        this.showDialog("setting1", "info", true, result.msg)
                    }
                }.bind(this)
            });
        },
        getTableData: function (currentIndex) {
            var params = {
                pageNo: currentIndex + 1,
                pageSize: this.pageMaxNum
            };
            this.label.productId !== '' && (params.productid = this.label.productId);
            this.label.parentPlatform !== '' && (params.parentPlatform = this.label.parentPlatform);
            this.label.salePlatform !== '' && (params.salePlatform = this.label.salePlatform);
            this.label.salePosition !== '' && (params.salePosition = this.label.salePosition);
            this.label.investArea !== '' && (params.investArea = this.label.investArea);
            $.post({
                url: '/productIndexes/monitoring/indicatorPush/collections.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.tableData = result.data.pageResult;
                        this.totalPage = Math.ceil(result.data.resultTotalNum / params.pageSize);;
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
    filters: {
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
        showCategoryText: function (value) {
            var obj = {
                "1": "收益",
                "2": "波动",
                "3": "风险",
                "4": "胜率",
            }
            return obj[value] || value;

        }
    }
});