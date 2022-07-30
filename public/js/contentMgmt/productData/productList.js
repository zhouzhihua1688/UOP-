Vue.use(window['vue-cropper']);
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
		keyList: {
			type: Array,
			default: () => [],
		},
		modeType: {
			type: String,
			default: '1'
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
	data: function () {
		return {
			tableData: [],
			branchList:[],
			custodianCodeList:[],
			currentIndex: 0,
			maxSpace: 5,
			totalPage: 0,
			pageMaxNum: 10,
			diaMsg: '',
			loadingShow: false, //loading动画
			showText: '数据加载中...',
			// vue-cropper的配置项
			option: {
				img: '',
				size: 1,
				full: false,
				outputType: 'png',
				canMove: true,
				fixedBox: true,
				original: false,
				canMoveBox: true,
				autoCrop: true,
				// 只有自动截图开启 宽度高度才生效
				autoCropWidth: 250,
				autoCropHeight: 200,
				centerBox: false,
				high: true,
				max: 99999
			},
			previews: {}, //剪切预览
			fileName:'',
			limitSize: 100, //compress压缩文件的最大kb
			//主页面所用字段
			// 搜索条件
			tableSearch:{
				custodianCode: '',
				fundManager: "",
				fundName: "",
				isTouliStatusChiying: "",
				isTouliStatusFirstIpo: "",
				isTouliStatusNormal: "",
				isTouliStatusSecondIpo: "",
				pageNo: 1,
				pageSize: 10,
				touliChannelList: [],
				touliFundtpList: []
			},
			allChecked: {
				fundTpList:{'checked': true},
				statusList:{'checked': true}
			}, //全部
			
			modifyStatus: '0',//产品信息的新增修改
			modifyStatus1:'0',//物料信息的新增修改
			// 新增修改弹窗字段
			// 新增修改产品数据
			productDataOperate:{
				"fundId": "",
				"fundinfoBase": {
					"fundChineseName": "",
					"fundId": "",
					"fundName": "",
					"fundRiskLevel": "",
					"fundType": ""
				},
				"touliFundinfo": {
					"fundId": "",
					"isChiying": "0",
					"isFirstIpo": "",
					"isNormal": "",
					"isSecondIpo": "0",
					"secondEndDate": "",
					"secondStartDate": "",
					"touliChannelList": ['00'],
					"touliFundtpList": []//产品类型
				}
			},
			initProductData:{
				"fundId": "",
				"fundinfoBase": {
					"fundChineseName": "",
					"fundId": "",
					"fundName": "",
					"fundRiskLevel": "",
					"fundType": ""
				},
				"touliFundinfo": {
					"fundId": "",
					"isChiying": "0",
					"isFirstIpo": "",
					"isNormal": "",
					"isSecondIpo": "0",
					"secondEndDate": "",
					"secondStartDate": "",
					"touliChannelList": ['00'],
					"touliFundtpList": []
				}
			},
			riskLevelList:[],
			xjbTypeList:[],
			// //产品类型list
			fundTpList: [{
				'name': '主动权益',
				'value':'ZD',
				'checked': true
				},
				{
					'name': '股债混',
					'value':'ZZ',
					'checked': true
				}, {
					'name': 'FOF',
					'value':'FOF',
					'checked': true
				},
				{
					'name': '指数',
					'value':'ZS',
					'checked': true
				}, {
					'name': '另类投资',
					'value':'OT',
					'checked': true
				}
			], 
			statusList:[
				{
					'name': 'IPO首发',
					'value':'isTouliStatusFirstIpo',
					'checked': true
				},
				{
					'name': '二次首发',
					'value':'isTouliStatusSecondIpo',
					'checked': true
				}, {
					'name': '重点持营',
					'value':'isTouliStatusChiying',
					'checked': true
				},
				{
					'name': '普通产品',
					'value':'isTouliStatusNormal',
					'checked': true
				}
			],
			// 物料信息数据的新增与修改
			materialInfoOperate: {
				"pkgBottomContent": "",
				"productId": "",
				"shareThumbImageUrl": "",
				"shareTitle": "",
				"modifyBy": "",
				"modifyTime": "",
			},
			debounceFn:null,
			//批量操作
			batchOperation:{
				touliChannelList:['00'],
				touliFundtpList:[],
				isChiying:'0'
			},
			batchPartList:[],
			baseUrl:'/contentMgmt/productData/productList'
		}
	},
	mounted: function () {
		var dialogs = ['info', 'del', 'batchOperation'];
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
		$('#dialogBranch').css({
			'width': '184px'
		}).select2({
				closeOnSelect: false
		})
		$("#dialogBranch").on("select2:close", function (e) {
			var value = $("#dialogBranch").val();
			if (value && value.length > 1 && value.includes('-1')) {
				value=['-1']
				$("#dialogBranch").val(value).trigger('change')
			}
			if (value && value.length > 1 && value.includes('00')) {
				value=['00']
				$("#dialogBranch").val(value).trigger('change')
			}
				// e 的话就是一个对象 然后需要什么就 “e.参数” 形式 进行获取
			this.productDataOperate.touliFundinfo.touliChannelList = $("#dialogBranch").val() ? $("#dialogBranch").val() : []
		}.bind(this));
		$('#batchBranch').css({
			'width': '184px'
		}).select2({
				closeOnSelect: false
		})
		$("#batchBranch").on("select2:close", function (e) {
			var value = $("#batchBranch").val();
			if (value && value.length > 1 && value.includes('-1')) {
				value=['-1']
				$("#batchBranch").val(value).trigger('change')
			}
			if (value && value.length > 1 && value.includes('00')) {
				value=['00']
				$("#batchBranch").val(value).trigger('change')
			}
				// e 的话就是一个对象 然后需要什么就 “e.参数” 形式 进行获取
				this.batchOperation.touliChannelList = $("#batchBranch").val() ? $("#batchBranch").val() : []
		}.bind(this));
		$('#batchFundTp').css({
			'width': '184px'
		}).select2({
				closeOnSelect: false
		})
		$("#batchFundTp").on("select2:close", function (e) {
				// e 的话就是一个对象 然后需要什么就 “e.参数” 形式 进行获取
				this.batchOperation.touliFundtpList = $("#batchFundTp").val() ? $("#batchFundTp").val() : []
		}.bind(this));
		$('#dialogFundTp').css({
			'width': '184px'
		}).select2({
				closeOnSelect: false
		})
		$("#dialogFundTp").on("select2:close", function (e) {
				// e 的话就是一个对象 然后需要什么就 “e.参数” 形式 进行获取
				this.productDataOperate.touliFundinfo.touliFundtpList = $("#dialogFundTp").val() ? $("#dialogFundTp").val() : []
		}.bind(this));
		$('#queryBranch').css({
			'width': '184px'
		}).select2({
				closeOnSelect: false
		})
		$("#queryBranch").on("select2:close", function (e) {
			var value = $("#queryBranch").val();
			if (value && value.length > 1 && value.includes('-1')) {
				value=['-1']
				$("#queryBranch").val(value).trigger('change')
			}
			if (value && value.length > 1 && value.includes('00')) {
				value=['00']
				$("#queryBranch").val(value).trigger('change')
			}
				// e 的话就是一个对象 然后需要什么就 “e.参数” 形式 进行获取
				this.tableSearch.touliChannelList = $("#queryBranch").val() ? $("#queryBranch").val() : []
		}.bind(this));
		$('#queryCustodianCode').css({
			'width': '184px'
		}).select2({
				closeOnSelect: false
		})
		$("#queryCustodianCode").on("select2:close", function (e) {
			// e 的话就是一个对象 然后需要什么就 “e.参数” 形式 进行获取
			this.tableSearch.custodianCode = $("#queryCustodianCode").val() ? $("#queryCustodianCode").val().join(',') : ''
		}.bind(this));
		this.getTableData(0);
		this.getBranchList();
		this.getRiskLevelList();
		this.getxjbTypeList();
		this.getfundTpList();
		this.getCustodianCodeList();
		this.debounceFn = this.debounce(this.getSingleProductData,1000)
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
		},
		productStatus:function(){
			var str = '';
			if(this.productDataOperate&&this.productDataOperate.touliFundinfo){
				if(this.productDataOperate.touliFundinfo.isChiying!='1'&&this.productDataOperate.touliFundinfo.isFirstIpo!='1'&&this.productDataOperate.touliFundinfo.isSecondIpo!='1'){
					str += '普通产品,';
				}else{
					if(this.productDataOperate.touliFundinfo.isChiying=='1'){
						str+='重点持盈,'
					}
					if(this.productDataOperate.touliFundinfo.isFirstIpo=='1'){
						str+='IPO首发,'
					}
					if(this.productDataOperate.touliFundinfo.isNormal=='1'){
						str+='普通产品,'
					}
					if(this.productDataOperate.touliFundinfo.isSecondIpo=='1'){
						str+='二次首发,'
					}
				}
			}
			str = str.substring(0,str.length-1)
			return str
		},
		checkAllLab: function () {
            if (this.tableData.length == 0) {
                return false;
            }
            for (var i = 0; i < this.tableData.length; i++) {
                if (!this.tableData[i].check) {
                    return false;
                }
            }
            return true;
        }
	},
	watch: {
		pageMaxNum: function () {
			this.getTableData(0);
		},
		fundTpList:{
			handler:function(){
				var fundTpListval = this.fundTpList.filter(function(item){
					return item.checked
				}).map(function(item){
					return item.value
				})
				// 监听数组的长度
				var len =	this.fundTpList.length
				if(fundTpListval.length===len){
					this.tableSearch.touliFundtpList=[];
				}else{
					this.tableSearch.touliFundtpList = fundTpListval
				}
			},
			deep:true
		},
		statusList:{
			handler:function(){
				var statusListval = this.statusList.filter(function(item){
					return item.checked
				}).map(function(item){
					return item.value
				})
				// 监听数组的长度
				var len =	this.statusList.length
				if(statusListval.length===0||statusListval.length===len){
					this.tableSearch.isTouliStatusChiying='';
					this.tableSearch.isTouliStatusFirstIpo='';
					this.tableSearch.isTouliStatusNormal='';
					this.tableSearch.isTouliStatusSecondIpo='';
				}else{
					this.tableSearch.isTouliStatusChiying=statusListval.includes('isTouliStatusChiying')?'1':'0';
					this.tableSearch.isTouliStatusFirstIpo=statusListval.includes('isTouliStatusFirstIpo')?'1':'0';
					this.tableSearch.isTouliStatusNormal=statusListval.includes('isTouliStatusNormal')?'1':'0';
					this.tableSearch.isTouliStatusSecondIpo=statusListval.includes('isTouliStatusSecondIpo')?'1':'0';
				}
			},
			deep:true
		},
		'productDataOperate.fundId':function(newval,oldval){
			if(this.modifyStatus=='0'&&newval){
				this.debounceFn(newval,true)
			}
		},
		modifyStatus:function(newval,oldval){
			if(oldval == '1' && newval =='0'){
				this.productDataOperate = JSON.parse(JSON.stringify(this.initProductData));
				$('#dialogFundTp').val(this.productDataOperate.touliFundinfo.touliFundtpList).trigger('change')
				$('#dialogBranch').val(this.productDataOperate.touliFundinfo.touliChannelList).trigger('change')
			}
		},
		tableData:function(newval,oldval){
			// console.log(newval);
			if(newval&&newval.length===1){
				this.jumpSubPage(newval[0])
			}
		}
	},
	methods: {
		// 切换主页面menuList背景颜色--选择标签
		// 全选按钮
		checkAll($event,type) {
			// return;
			$event.preventDefault();
			this.allChecked[type].checked = !this.allChecked[type].checked;
			for (p in this[type]) {
				this[type][p].checked = this.allChecked[type].checked;
			}
		},
		// 点击单个标签点击选中
		checkSingle: function ($event, index ,type) {
			$event.preventDefault();
			// this.bgIndex = index;   //背景索引
			this[type][index].checked = !this[type][index].checked;
			let checkAllFlag = true;
			for (p in this[type]) {
				if (p == 'checked') continue;
				if (!this[type][p].checked) {
					// 有一个没有选中，则全选也不选中
					checkAllFlag = false;
					break
				}
			}
			this.allChecked[type].checked = checkAllFlag;
		},
		// 主表格数据
		getTableData: function (currentIndex) {
			this.tableSearch.pageNo = currentIndex+1;
			this.tableSearch.pageSize = this.pageMaxNum;
			console.log(this.tableSearch);
			var params = JSON.parse(JSON.stringify(this.tableSearch));
			if(params.isTouliStatusChiying=='0'){
				delete params.isTouliStatusChiying
			}
			if(params.isTouliStatusFirstIpo=='0'){
				delete params.isTouliStatusFirstIpo
			}
			if(params.isTouliStatusNormal=='0'){
				delete params.isTouliStatusNormal
			}
			if(params.isTouliStatusSecondIpo=='0'){
				delete params.isTouliStatusSecondIpo
			}
			console.log(params);
			$(".cover").show();
			$.post({
				url: this.baseUrl+'/getTableData.ajax',
				data: params,
				success: function (result) {
					$(".cover").hide();
					if (result.error === 0) {
						this.currentIndex = currentIndex;
						this.totalPage = Math.ceil(result.data.total / this.tableSearch.pageSize);
						if (result.data.fundInfoUopVos&&result.data.fundInfoUopVos.length>0) {
							this.tableData = result.data.fundInfoUopVos;
						} else {
							this.tableData = []
							this.showText = '暂无数据';
						}
					} else {
						$(".cover").hide();
						this.tableData = [];
						this.showText = '暂无数据';
						this.currentIndex = 0;
						this.showDialog('', 'info', false, result.msg);
					}
				}.bind(this)
			});
		},
		// 获取渠道权限列表
		getBranchList: function () {
			$.post({
				url: this.baseUrl+'/getbranchList.ajax',
				success: function (result) {
					if (result.error === 0) {
						this.branchList = result.data;
						this.branchList.unshift({
							branchCode: '-1',
							branchFullName: '均无权限'
						})
						this.branchList.unshift({
							branchCode: '00',
							branchFullName: '全部'
						})
						// setTimeout(function(){
						// 	$("#queryBranch").val(['00']).trigger('change')
						// }, 0);
					} 
				}.bind(this)
			});
		},
		// 获取托管行列表
		getCustodianCodeList: function () {
			$.post({
				url: this.baseUrl+'/getCustodianCode.ajax',
				success: function (result) {
					if (result.error === 0) {
						this.custodianCodeList = result.data;
					} 
				}.bind(this)
			});
		},
		// 获取风险等级列表
		getRiskLevelList: function () {
			$.post({
				url: this.baseUrl+'/getRiskLevel.ajax',
				success: function (result) {
					if (result.error === 0) {
						this.riskLevelList = result.data;
					} 
				}.bind(this)
			});
		},
		// 获取现金宝类型列表
		getfundTpList: function () {
			$.post({
				url: this.baseUrl+'/getfundTpList.ajax',
				success: function (result) {
					if (result.error === 0) {
						// console.log(result);
						this.fundTpList = result.data.map(function(item){
							return {
								value:item.pmco,
								name:item.pmv1,
								checked: true
							}
						})
					} 
				}.bind(this)
			});
		},
		// 获取产品类型列表
		getxjbTypeList: function () {
			$.post({
				url: this.baseUrl+'/getxjbTp.ajax',
				success: function (result) {
					if (result.error === 0) {
						this.xjbTypeList = result.data;
					} 
				}.bind(this)
			});
		},
		// setProductData
		setProductData:function(item){
			if(item){
				this.productDataOperate = {};
				this.productDataOperate = item;
				if(this.productDataOperate.touliFundinfo.touliFundtpList){
					$('#dialogFundTp').val(this.productDataOperate.touliFundinfo.touliFundtpList).trigger('change')
				}else{
					$('#dialogFundTp').val([]).trigger('change')
				}
				if(this.productDataOperate.touliFundinfo.touliChannelList){
					$('#dialogBranch').val(this.productDataOperate.touliFundinfo.touliChannelList).trigger('change')
				}else{
					$('#dialogBranch').val([]).trigger('change')
				}
				this.productDataOperate.touliFundinfo.secondEndDate&&(this.productDataOperate.touliFundinfo.secondEndDate=moment(this.productDataOperate.touliFundinfo.secondEndDate).format('YYYY-MM-DD'));
				this.productDataOperate.touliFundinfo.secondStartDate&&(this.productDataOperate.touliFundinfo.secondStartDate=moment(this.productDataOperate.touliFundinfo.secondStartDate).format('YYYY-MM-DD'));
			}
			// else{
			// }
			// this.productDataOperate = JSON.parse(JSON.stringify(this.initProductData));
			$('#dialogFundTp').val(this.productDataOperate.touliFundinfo.touliFundtpList).trigger('change')
			$('#dialogBranch').val(this.productDataOperate.touliFundinfo.touliChannelList).trigger('change')
		},
		// 产品相关信息的新增修改弹窗
		showAdd: function () {
			this.modifyStatus = 0; //弹出新增弹窗
			this.setProductData();
			this.showDialog('', 'add');
		},
		add:function(){
			if(this.productCheck()){
				var params = JSON.parse(JSON.stringify(this.productDataOperate));
				!params.touliFundinfo.touliFundtpList && (delete params.touliFundinfo.touliFundtpList);  //产品类型为空，不能传空字符串
				delete params.touliFundinfo.isNormal
				delete params.touliFundinfo.isFirstIpo
				params.fundinfoBase.fundId = params.fundId;
				params.touliFundinfo.fundId = params.fundId;
				if(params.touliFundinfo.isSecondIpo=='0'){
					params.touliFundinfo.secondEndDate=""
					params.touliFundinfo.secondStartDate=""
				}else if(params.touliFundinfo.isSecondIpo=='1'){
					params.touliFundinfo.secondEndDate=params.touliFundinfo.secondEndDate.replace(/-/g,'');
					params.touliFundinfo.secondStartDate=params.touliFundinfo.secondStartDate.replace(/-/g,'');
				}
				$.post({
					url: this.baseUrl+'/productAddOrUpdate.ajax',
					data:params,
					success: function (result) {
						if (result.error === 0) {
							if(this.modifyStatus=='0'){//新增情况只有新增成功再重置新增弹窗数据
								this.productDataOperate = JSON.parse(JSON.stringify(this.initProductData));
								$('#dialogFundTp').val(this.productDataOperate.touliFundinfo.touliFundtpList).trigger('change')
								$('#dialogBranch').val(this.productDataOperate.touliFundinfo.touliChannelList).trigger('change')
							}
							this.showDialog('add','info',false,result.msg)
							setTimeout(()=>{
								this.getTableData(0);
							}, 2000);
						}else{
							this.showDialog('add','info',true,result.msg)
						} 
					}.bind(this)
				});
			}
		},
		showUpdate:function(fundId){
			this.modifyStatus = 1; //弹出新增弹窗
			this.getSingleProductData(fundId);
			this.showDialog('', 'add');
		},
		getSingleProductData:function(fundId,flag){
			$.post({
				url: this.baseUrl+'/singleQueryProductInfo.ajax',
				data:{fundId},
				success: function (result) {
					if (result.error === 0) {
						
						if(flag&&result.data.canBeModify===false){
							//flag表示是从新增基金填写的fundid时调用本函数的，canBeModify表示存在不能修改的fundid，此时需要将新增弹窗状态改为修改
							this.modifyStatus = '1'
						}
						this.setProductData(result.data);
					}else{
						this.showDialog('add','info',true,result.msg)
					} 
				}.bind(this)
			});
		},
		productCheck:function(){
			if(!this.productDataOperate.fundId){
				this.showDialog('add','info',true,'请填写产品代码')
				return false
			}
			if(!this.productDataOperate.fundinfoBase.fundChineseName){
				this.showDialog('add','info',true,'请填写产品名称')
				return false
			}
			if(!this.productDataOperate.fundinfoBase.fundName){
				this.showDialog('add','info',true,'请填写产品简称')
				return false
			}
			if(!this.productDataOperate.fundinfoBase.fundRiskLevel){
				this.showDialog('add','info',true,'请填写风险等级')
				return false
			}
			if(this.productDataOperate.canBeModify&&!this.productDataOperate.fundinfoBase.fundType){
				this.showDialog('add','info',true,'请填写现金宝分类')
				return false
			}
			// if(!this.productDataOperate.touliFundinfo.touliFundtpList||this.productDataOperate.touliFundinfo.touliFundtpList.length===0){
			// 	this.showDialog('add','info',true,'请填写产品类型')
			// 	return false
			// }
            if(!this.productDataOperate.touliFundinfo.touliChannelList||this.productDataOperate.touliFundinfo.touliChannelList.length===0){
				this.showDialog('add','info',true,'请填写渠道权限')
				return false
			}
            if(!this.productDataOperate.touliFundinfo.isChiying){
				this.showDialog('add','info',true,'请填写是否重点持营')
				return false
			}
            if(!this.productDataOperate.touliFundinfo.isSecondIpo){
				this.showDialog('add','info',true,'请填写是否二次首发')
				return false
			}
			if(this.productDataOperate.touliFundinfo.isSecondIpo=='1'){
				var currentTime = moment(new Date()).format('YYYY-MM-DD');
				if(new Date(this.productDataOperate.touliFundinfo.secondEndDate).getTime()<new Date(currentTime).getTime()){
					this.showDialog('add','info',true,'二次首发结束时间不可选择当前时间之前的时间')
					return false
				}
				if(!this.productDataOperate.touliFundinfo.secondStartDate||!this.productDataOperate.touliFundinfo.secondEndDate){
					this.showDialog('add','info',true,'请填写首发时间段')
					return false
				}
				if(new Date(this.productDataOperate.touliFundinfo.secondStartDate).getTime()>new Date(this.productDataOperate.touliFundinfo.secondEndDate).getTime()){
					this.showDialog('add','info',true,'起始时间不能大于终止时间')
					return false
				}
			}
			return true
		},
		// 物料相关的
		showMaterialInfo: function () {
			this.getMediaPkb(this.productDataOperate.fundId).then((result)=>{
				if(result){
					this.modifyStatus1 = '1'//修改
					this.materialInfoOperate = result;
					this.option.img = '';
				}else{
					this.modifyStatus1 = '0' //新增
					this.materialInfoOperate.productId = this.productDataOperate.fundId;
                    this.materialInfoOperate.shareTitle = this.productDataOperate.fundId?'['+this.productDataOperate.fundId+']营销物料包':'';
                    this.materialInfoOperate.shareThumbImageUrl = '';
                    this.option.img = '';
                    this.previews = {};
                    this.materialInfoOperate.pkgBottomContent = '';
                    if(this.materialInfoOperate.createBy){
                        delete this.materialInfoOperate.createBy
                    }
                    if(this.materialInfoOperate.createTime){
                        delete this.materialInfoOperate.createTime
                    }
                    if(this.materialInfoOperate.modifyBy){
                        delete this.materialInfoOperate.modifyBy
                    }
                    if(this.materialInfoOperate.modifyTime){
                        delete this.materialInfoOperate.modifyTime
                    }
				}
			},(error)=>{
				this.showNestDialog('add', 'materialInfoAdd' ,'info', true,error.errorMsg);
			})
			this.showDialog('add', 'materialInfoAdd', true);
		},
		// 物料的新增或修改
		addOrUpdate:function(){
			var params = JSON.parse(JSON.stringify(this.materialInfoOperate));
		 	delete params.modifyTime;
		 	delete params.modifyBy;
			//  更新人创建人在node中添加
            // if(!params.shareThumbImageUrl){
            //     this.showDialog('materialInfoAdd','info',true,'请上传分享缩略图')
            //     return 
            // }
            if(!params.pkgBottomContent){
                this.showDialog('materialInfoAdd','info',true,'请填写材料包底部文字')
                return 
            }
            if(!params.shareTitle){
                this.showDialog('materialInfoAdd','info',true,'请填写分享标题')
                return 
            }
			 console.log(params);
			var url = ''
			if(this.modifyStatus1==0){
				url+= this.baseUrl+'/mediaPkbAdd.ajax';
			}else{
				url+= this.baseUrl+'/mediaPkbUpdate.ajax';
			}
			$.post({
				url,
				data:params,
				success: function (result) {
					if (result.error === 0) {
						$('#materialInfoAdd').modal('hide');
						this.showDialog('add','info',true, '成功提交物料信息');
						this.option.img = ''
						$('#uploads').val('');//及时清除，同一图片上传问题修改
						// $('#uploads').attr('type', 'file'); //解决不能重复添加问题-再变成File
					}else{
						$('#materialInfoAdd').modal('hide');
						this.showDialog('add','info',true,result.msg);
					} 
				}.bind(this)
			});
		},
		// 获取物料信息
		getMediaPkb:function(productId){
			return new Promise((resolve,reject)=>{
				$.post({
					url: this.baseUrl+'/mediaPkbQuery.ajax',
					data:{productId},
					success: function (result) {
						if (result.error === 0) {
							resolve(result.data)
						}else{
							reject({errorMsg:result.msg})
						} 
					}.bind(this)
				});
			})
			
		},

		// 批量操作
		showBatchOperation: function () {
			if(!this.tableData.some(function(item){
				return item.check
			})){
				return this.showDialog('', 'info', false,'请勾选相关的产品再进行批量操作')
			}
			$('#batchFundTp').val(this.batchOperation.touliFundtpList).trigger('change')
			$('#batchBranch').val(this.batchOperation.touliChannelList).trigger('change')
			this.showDialog('', 'batchOperation', false)
		},
		confirmBatchOperation: function () {
			// 
			if(this.batchOperation.touliChannelList.length===0){
				return 	this.showDialog('batchOperation','info',true, '请选择渠道权限');
			}
			if(this.batchOperation.touliFundtpList.length===0){
				return 	this.showDialog('batchOperation','info',true, '请选择产品类型');
			}
			this.batchPartList = []; 
			this.tableData.forEach(function(item){
				if(item.check){
					var obj = {};
					obj.fundId = item.fundId;
					obj.isChiying = this.batchOperation.isChiying;
					obj.touliChannelList = this.batchOperation.touliChannelList;
					obj.touliFundtpList = this.batchOperation.touliFundtpList;
					this.batchPartList.push(obj)
				}
			},this)
			$.post({
				url:this.baseUrl+'/batchOperation.ajax',
				data:{batchPartList:this.batchPartList},
				success: function (result) {
					this.batchPartList = [];
					if (result.error === 0) {
						this.batchOperation.isChiying = '0';
						this.batchOperation.touliChannelList = ['00'];
						this.batchOperation.touliFundtpList = [];
						this.showDialog('batchOperation','info',false, '批量操作成功');
					}else{
						this.showDialog('batchOperation','info',true,'批量操作失败');
					} 
				}.bind(this)
			});
			console.log(this.batchPartList);
			// this.batchOperation.touliFundtpList = [];
			// this.batchOperation.touliChannelList = ['00'];
			// this.batchOperation.isChiying = '0'
		},
		// 本地图片上传
		uploadImg(e) {
			//上传图片
			// this.option.img
			var file = e.target.files[0];
			this.fileName = file.name;
			// this.materialInfoOperate.shareThumbImageUrl = ''; //这里是用作删除图片，每次点击先隐藏按钮
			console.log("fileName===", this.fileName);
			if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
				alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
				return false
			}
			var reader = new FileReader()
			reader.onload = (e) => {
				let data
				if (typeof e.target.result === 'object') {
					// 把Array Buffer转化为blob 如果是base64不需要
					data = window.URL.createObjectURL(new Blob([e.target.result]))
				} else {
					data = e.target.result
				}
				this.option.img = data
				// $('#uploads').attr('type', 'text'); //解决不能重复添加问题-先变成text
			}
			// 转化为base64
			// reader.readAsDataURL(file)
			// 转化为blob
			reader.readAsArrayBuffer(file)
		},
		uploadForServer() {
			// 输出裁剪过的blob
			var _this = this;
			this.$refs.cropper.getCropBlob(async (data) => {
				let [error, res] = await this.awaitWrap(compress(data, this.limitSize)); //获得压缩过的blob
				if (error) {
					console.log(error);
					return
				}
				console.log('res', res);
				var formdata = new FormData();

				let file = new File([res.compressFile], this.fileName);
				console.log(file);
				if (!file.name) {
					_this.showDialog('add', 'info', true, '请选择要上传的图片!');
					return false;
				}
				console.log(file.name);
				formdata.append('file', file);
				this.loadingShow=true;
				$.post({
					url: this.baseUrl+'/uploadImg.ajax?fundId='+this.materialInfoOperate.productId,
					cache: false,
					data: formdata,
					processData: false,
					contentType: false,
					success: function (result) {
						if (result.error === 0) {
							this.loadingShow=false;
							// $('#uploads').attr('type', 'file'); //解决不能重复添加问题-再变成File
							$('#uploads').val('');//及时清除，同一图片上传问题修改
							this.materialInfoOperate.shareThumbImageUrl = result.data.imageUrl;
							this.showDialog('materialInfoAdd','info',true, result.msg);
							$('#add').modal('hide')
						} else {
							this.showDialog('materialInfoAdd','info',true, result.msg);
							$('#add').modal('hide')
						}
					}.bind(this)
				});
			})
		},
		// 删除图片-这一步是删除已经上传了的图片
		delFile() {
			//删除图片按钮置空图片和预览
			this.option.img = '';
			this.materialInfoOperate.shareThumbImageUrl = '';
		},
		// 实时预览函数
		realTime(data) {
			this.previews = data
			// console.log(data)
		},
		jumpSubPage:function(item,category){
			if(item.touliFundtpList&&item.touliFundtpList.length>0){
				url='/contentMgmt/productData/productList.html?pageType=Material&fundId='+item.fundId+'&fundName='+item.fundName+'&fundType='+item.touliFundtpList.join(',');
			}else{
				url='/contentMgmt/productData/productList.html?pageType=Material&fundId='+item.fundId+'&fundName='+item.fundName+'&fundType=';
			}
			if(category){
				url+='&category='+category;
			}
			window.location.href=url;
		},
		//主表格分页方法
		check: function (item) {
            item.check = !item.check;
        },
		allCheck: function () {
            
            var _this = this;
            var flag = this.checkAllLab;
            this.tableData.forEach(function (item) {
                item.check = !flag;
            });
        },
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
		},
		showDialog: function (dia1, dia2, callback, msg) {
			// 关掉dia1，打开dia2
			// callback==false:在dia2关掉的时候，直接关掉
			// callback==true:在dia2关掉的时候，重新打开dia1
			this.diaMsg = (msg ? msg : '输入条件错误');
			if (!dia1) {
					$('#' + dia2).modal('show');
			} else if (!dia2) {
					$('#' + dia1).modal('hide');
			} else if (!callback) {
					$('#' + dia1).modal('hide');
					$('#' + dia2).off("hidden.bs.modal").modal('show');
			} else {
					if ($('#' + dia1).data('parentDlg')) {
							// dia1弹窗有父级弹窗，先去除关闭事件，关闭弹窗后，再恢复添加事件
							$('#' + dia1).off("hidden.bs.modal").modal('hide');
							$('#' + dia1).on("hidden.bs.modal", function () {
									$('#' + $('#' + dia1).data('parentDlg')).modal("show");
							});
					} else {
							// dia1弹窗没有父级弹窗，直接关闭
							$('#' + dia1).modal('hide');
					}
					$('#' + dia2).off("hidden.bs.modal").on("hidden.bs.modal", function () {
							// dia2作为子弹窗，添加关闭事件，关闭弹窗时打开父级弹窗
							$('#' + dia1).modal("show");
							$('#' + dia2).data('parentDlg', dia1);
					});
					$('#' + dia2).modal('show');
			}
		},
		showNestDialog: function (dia1, dia2, dia3, callback, msg) { //页面内嵌套了多个模态框
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
					$('#' + dia2).on("hidden.bs.modal", function () {
						$('#' + dia3).on("hidden.bs.modal", function () {
							$('#' + dia3).modal('hide');
							$('#' + dia3).off().on("hidden", "hidden.bs.modal");
						})
						$('#' + dia3).modal("show");
						$('#' + dia2).off().on("hidden", "hidden.bs.modal");
						$('#' + dia2).modal('hide');
					});
					$('#' + dia2).modal("show");
					$('#' + dia1).off().on("hidden", "hidden.bs.modal");
				});
				$('#' + dia1).modal('hide');
				// $('#' + dia1).on("hidden.bs.modal", function () {
				// 	$('#' + dia2).modal('show');
				// 	$('#' + dia1).off().on("hidden", "hidden.bs.modal");
				// });
				// $('#' + dia1).modal('hide');
			} else {
				$('#' + dia1).on("hidden.bs.modal", function () {
					$('#' + dia2).on("hidden.bs.modal", function () {
						$('#' + dia3).modal("show");
						$('#' + dia2).modal("hide");
						$('#' + dia2).off().on("hidden", "hidden.bs.modal");
						$('#' + dia3).on("hidden.bs.modal", function () {
							$('#' + dia2).modal('show');
							$('#' + dia3).modal('hide');
							$('#' + dia3).off().on("hidden", "hidden.bs.modal");
						});
					});
					$('#' + dia2).modal("show");
					$('#' + dia1).off().on("hidden", "hidden.bs.modal");
				});
				$('#' + dia1).modal('hide');
			}
		},
		awaitWrap(promise) { // await 异常处理包装
			return promise.then(res => [null, res], error => [error, null]);
		},
		transferCustodianCode(val){
			if(val){
				var result = this.custodianCodeList.find(function(item){
					return item.pmco == val;
				})
				if(result){
					return result.pmnm
				}else{
					return val
				}
			}else{
				return '-'
			}
		},
		transformTime(createTime) {
			let date = new Date(Number(createTime));
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();
			let h = date.getHours()
			let i = date.getMinutes()
			let s = date.getSeconds();
			month = month < 10 ? '0' + month : month;
			day = day < 10 ? '0' + day : day;
			if (h < 10) {
				h = '0' + h;
			}
			if (i < 10) {
				i = '0' + i;
			}
			if (s < 10) {
				s = '0' + s;
			}
			let dateT = year + '-' + month + '-' + day + " " + h + ':' + i + ':' + s
			return dateT
		},
		// 防抖
		debounce:function(fn,time=200){
			var timer;
			return function(...arg){
				if(timer){
					clearTimeout(timer);
				}
				timer = setTimeout(function(){
					fn.apply(this,arg);
				}.bind(this), time);
			}
		}
	},
	components: {
		'date-picker': VueBootstrapDatetimePicker
	},
	filters:{
		fundtpTransfer:function(val,fundTpList){
			if(val&&val.length>0){
				var arr = [];
				fundTpList.forEach(function(item){
					val.forEach(function(citem){
						if(item.value==citem){
							arr.push(item.name)
						}
					})
				})
				var str = arr.join(',')
				return str
			}else{
				return '-'
			}
		},
		countFilter:function(list,type){
			if(list.length>0){
				var arr = list.filter(function(item){
					return item.categoryId == type
				})
				if(arr.length>0){
					return arr[0].count;
				}else{
					return 0
				}
			}else{
				return 0
			}
		},
		formatTime:function(time){
			if(time&&time.length===14){
				return time.slice(0,4)+'-'+time.slice(4,6)+'-'+time.slice(6,8)+' '+time.slice(8,10)+':'+time.slice(10,12)+':'+time.slice(12,14)
			}else{
				return time
			}
		}
	}
});