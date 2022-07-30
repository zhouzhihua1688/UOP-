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
		index: '',
		theadIndex: '',
		// 批量添加数据
		monitorIndex: [],
		operateData: {
			parentPlatform: '',
			salePlatform: '',
			salePosition: '',
			investArea: '',
			productid: '',
			alarmValue:'',//预警值
			targetValue:'',//监控值
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
		// 自定义
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
			parentPlatform: '',
			salePlatform: '',
			salePosition: '',
			investArea: '',
			productid: '',

		},
	
		calcValue: '',
		hasMonitorList:[],//已配置的指标列表
		// 查询
		calcDate: '',
	},
	created: function () {
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
		this.getTableData();
		this.getMonitorIndex()
	},
	computed:{
		queryFlag:function(){
			if(this.operateData.parentPlatform&&this.operateData.salePlatform&&this.operateData.salePosition&&this.operateData.investArea){
				var data = JSON.parse(JSON.stringify(this.operateData));
				delete data.productid;
				delete data.alarmValue;
				delete data.targetValue;
				this.queryHasMoniter(data);
			}
		}
	},
	watch: {
		calcDate: function () {
			this.getTableData()
		},
		"operateCustom.indexConfig.calcValue": function (newval) {
			if (newval && newval < 1 || newval === 0) {
				this.operateCustom.indexConfig.calcValue = 1
			} else if (newval !== 0 && !newval) {
				this.operateCustom.indexConfig.calcValue = ''
			} else {
				this.operateCustom.indexConfig.calcValue = Math.floor(newval)
			}
		},
		"operateCustom.indexConfig.holdValue": function (newval) {
			if (newval && newval < 1 || newval === 0) {
				this.operateCustom.indexConfig.holdValue = 1
			} else if (newval !== 0 && !newval) {
				this.operateCustom.indexConfig.holdValue = ''
			} else {
				this.operateCustom.indexConfig.holdValue = Math.floor(newval)
			}
		},
		"operateCustom.indexConfig.calcUnit": function (newval) {
			if (newval == 5 || newval == 7) {
				this.operateCustom.indexConfig.calcValue = 1;
			}

		},
	},
	methods: {
		moment: moment,
		getTableData: function () {
			var params = {};
			this.calcDate && (params.calcDate = this.calcDate.replace(/-/g, ''));
			// this.calcDate && (params.calcDate = '2022-03-16'.replace(/-/g, ''));
			$.post({
				url: '/productIndexes/monitoring/reportForms/tableData.ajax',
				data: params,
				success: function (result) {
					console.log(result);
					this.tableData = result.data;
				}.bind(this)
			});
		},
		// 排序
		sort(item, index, theadIndex, theadItem) {
			if (this.index === index && this.theadIndex === theadIndex) {
				if (theadItem.sort == 1) {
					item.productAllPrdMonitorDetailVOList.forEach(function(fitem){
						fitem.prdMonitorIndexShowVOList.forEach(function (iitem,iindex) {
							if(theadIndex === iindex){
								iitem.sort = 2
							}
						})
					})
				}
				else if(theadItem.sort == 2) {
					// theadItem.sort = 1;
					item.productAllPrdMonitorDetailVOList.forEach(function(fitem){
						fitem.prdMonitorIndexShowVOList.forEach(function (iitem,iindex) {
							if(theadIndex === iindex){
								iitem.sort = 1
							}
						})
					})
				}
			} else {
				item.productAllPrdMonitorDetailVOList.forEach(function(fitem){
					fitem.prdMonitorIndexShowVOList.forEach(function (iitem,iindex) {
						iitem.sort = 0 //表示
						if(theadIndex === iindex){
							iitem.sort = 1
						}
					})
				})
			};
			if(item.productAllPrdMonitorDetailVOList.length>1){
				item.productAllPrdMonitorDetailVOList.sort((function(name,index,order){
					return function(o, p){
						var a, b;
						if (typeof o === "object" && typeof p === "object" && o && p) {
							a = o[name][index].indexValue;
							b = p[name][index].indexValue;
							if (a === b) {
								return 0;
							}
							if (typeof a === typeof b) {
								if(order==1){
									return a < b ? -1 : 1;
								}else{
									return a > b ? -1 : 1;
								}
							}
							if(order==1){
								return typeof a < typeof b ? -1 : 1;
							}else{
								return typeof a > typeof b ? -1 : 1;
							}
						}
						else {
							alert ("error");
						}
					}
				})('prdMonitorIndexShowVOList',theadIndex,theadItem.sort))
			}
			this.index = index;
			this.theadIndex = theadIndex;
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
					this.operateCustom.productid&&(data.productId = this.operateCustom.productid)
			}else{
					this.operateData.parentPlatform&&(data.parentPlatform = this.operateData.parentPlatform)
					this.operateData.salePlatform&&(data.salePlatform = this.operateData.salePlatform)
					this.operateData.salePosition&&(data.salePosition = this.operateData.salePosition)
					this.operateData.investArea&&(data.investArea = this.operateData.investArea)
					this.operateData.productid&&(data.productId = this.operateData.productid)
			}
			
			$.post({
					url: '/productIndexes/monitoring/reportForms/labels.ajax',
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
		getMonitorIndex: function () {
			$.post({
				url: '/productIndexes/monitoring/reportForms/monitorIndex.ajax',
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
			if (params.indexConfig.holdUnit == 7) {
				params.indexConfig.holdValue = 1
			}
			// params.indexid = Math.ceil(Math.random() * 10000) + 'z' + Math.ceil(Math.random() * 10)
			// return;
			$.post({
				url: '/productIndexes/monitoring/reportForms/createIndex.ajax',
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
					$('.modal').css('overflow-y', 'auto')
				}.bind(this)
			});
		},
		calc: function () {
			if (this.operateCustom.parentPlatform == '' || this.operateCustom.salePlatform == '' || this.operateCustom.salePosition == '' || this.operateCustom.investArea == '' || this.operateCustom.productid == '') {
				return this.showDialog("", "info", false, '一级平台,二级平台，专区，赛道，产品都是试算的必选项')
			}
			if (this.operateCustom.indexConfig.calcUnit === '') {
				this.showDialog("", "info", false, '请选择统计区间')
				return;
			}
			if (this.operateCustom.indexConfig.calcValue !== 0 && !this.operateCustom.indexConfig.calcValue) {
				this.showDialog("", "info", false, '请填写统计区间值')
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
				// productid: this.productForCalc[this.calcProductIndex].productid
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
			if (params.indexVOList[0].indexConfig.holdUnit == 7) {
				params.indexVOList[0].indexConfig.holdValue = 1
			}
			params.investArea = this.operateCustom.investArea;
			params.parentPlatform = this.operateCustom.parentPlatform;
			params.productid = this.operateCustom.productid;
			params.salePlatform = this.operateCustom.salePlatform;
			params.salePosition = this.operateCustom.salePosition;
			$.post({
				url: '/productIndexes/monitoring/reportForms/calc.ajax',
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
		showSettingDialog: function () {
			// this.productStatus = false;
			this.operateData = {
				parentPlatform: '',
				salePlatform: '',
				salePosition: '',
				investArea: '',
				productid: '',
				alarmValue:'',//预警值
				targetValue:'',//监控值
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
		showCustom: function (key) {
			// this.calcProductIndex = '';
			// $('.selectCalc').val('');
			// $(".selectCalc").trigger("chosen:updated");
			this.calcValue = '';
			this.operateCustom = {
				indexCategory: '',
				indexConfig: {
					calcUnit: '',
					calcValue: 1,
					expectancyValue: 0,
					holdUnit: '',
					holdValue: 1
				},
				indexName: '',
				// indexid: '',
				showCategory: '',
				parentPlatform: '',
				salePlatform: '',
				salePosition: '',
				investArea: '',
				productid: '',
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
		queryHasMoniter(data){
			$.post({
				url: '/productIndexes/monitoring/reportForms/queryHasMonitor.ajax',
				data,
				success: function (result) {
					if (result.error === 0) {
						// this.hasMonitorList = result.data;
						for (var key in this.monitorIndex) {
							this.monitorIndex[key].forEach(function (item) {
								result.data.forEach(function(citem){
									if(item.indexid == citem){
										item.checked = true;
									}
								})
							})
						}
						// this.showDialog("setting1", "info", false, result.msg)
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
			// if (this.operateData.productid === '') {
			// 	this.showDialog("setting1", "info", true, '请选择产品');
			// 	return;
			// }
			var params = {
				parentPlatform: this.operateData.parentPlatform,
				salePlatform: this.operateData.salePlatform,
				salePosition: this.operateData.salePosition,
				investArea: this.operateData.investArea,
				productid: this.operateData.productid,
				alarmValue: this.operateData.alarmValue,
				targetValue: this.operateData.targetValue,
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
			if (params.indexVOList.length === 0) {
				return this.showDialog("setting1", "info", true, '请勾选指标');
			}
			console.log(params)
			$.post({
				url: '/productIndexes/monitoring/reportForms/addMonitor.ajax',
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
		'date-picker': VueBootstrapDatetimePicker
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