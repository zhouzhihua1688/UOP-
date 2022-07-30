var vm = new Vue({
	el: '#content',
	data: {
		// 主页面相关数据
        // productId: '',
        // recruitEndDate: '',
        // isDeliver: '',
        // deliverDate: '',
        // productId_dialog: '',
        // recruitEndDate_dialog: '',
        // isdailyDeliver_dialog: 'N',
        // deliverDate_dialog: '',

		tableData: [],
		diaMsg: '',
		//主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        pageMaxNum: '10',
        condition: '',
		// 新增
		updateId: '',
		deleteId: '',
        RiskList:[],

        fundChineseName:'',
		fundId:'',
		fundName:'',
		fundRiskLevel:'',
		fundType:'',
		searchId:'',  //查询

        fundId_dialog: '',
		fundChineseName_dialog: '',
		fundName_dialog :'',
		fundType_dialog: '',
		fundRiskLevel_dialog:'',
	},
	created: function() {
	},
	mounted: function() {
		var dialogs = ['info', 'addDlg', 'updDlg', 'deleteDialog'];
		var _this = this;
		dialogs.forEach(function(id) {
			$('#' + id).on('shown.bs.modal', function() {
				var $this = $(this);
				var dialog = $this.find('.modal-dialog');
				var top = ($(window).height() - dialog.height()) / 2;
				dialog.css({
					marginTop: top
				});
			});
		});
		// this.getTableData(0);
		this.RiskData();
	},
	computed: {
        //主表格假分页
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
            }
            else {
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
            }
            else if (this.currentIndex <= this.maxSpace && this.middleData.length - this.currentIndex > this.maxSpace) {
                for (var i = 0; i < this.currentIndex + (2 * this.maxSpace - this.currentIndex); i++) {
                    arr.push(i + 1);
                }
            }
            else if (this.currentIndex > this.maxSpace && this.middleData.length - this.currentIndex <= this.maxSpace) {
                var space = this.middleData.length - this.currentIndex;
                for (var i = this.currentIndex - (2 * this.maxSpace - space); i < this.middleData.length; i++) {
                    arr.push(i + 1);
                }
            }
            else {
                for (var i = 0; i < this.middleData.length; i++) {
                    arr.push(i + 1);
                }
            }
            return arr;
        }
    },
    watch: {
        // 假分页
        pageMaxNum: {
            handler: function (val, oldval) {
                this.currentIndex= 0;
            }
        },
        condition: {
            handler: function (val, oldval) {
                this.currentIndex= 0;
            }
        },
    },
	filters: {
        fundType: function (item) {
            if(item){
                return item.replace(/F/g,'FOF').replace(/7/g,'LOF').replace(/5/g,'保本型').replace(/D/g,'代销型').replace(/0/g,'股票型').replace(/3/g,'混合型').replace(/1/g,'货币型').replace(/8/g,'理财型').replace(/A/g,'收益凭证类').replace(/2/g,'债券型').replace(/4/g,'指数型').replace(/6/g,'专户').replace(/9/g,'子公司产品')
            }
        },
        fundRiskLevel: function (item) {
            if (item === "0") {
                return "低风险（R1）"
            } else if (item === "1") {
                return "较低风险（R2）"
            } else if (item === "2") {
                return "中风险（R3）"
            } else if (item === "3") {
                return "较高风险（R4）"
            } else if (item === "4") {
                return "高风险（R5）"
            }
        },
	},
	methods: {
        RiskData:function(){  //风险等级
            var _this=this;
            var params = {};
            params.pmst="SYSTEM";
            params.pmkey="FUNDRISKLEVEL";
            $.post({
                url: '/businessMgmt/businessParamConfig/IPOPreheatSetting/RiskParam.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.RiskList=result.data.body;
                        console.log("_this.RiskList",_this.RiskList);
                    }else {
                        _this.showDialog('', 'info', true, result.msg);
                    }
                }
            });
        },
		getTableData: function(currentIndex) {
			var params = {};
            var _this = this;
            _this.tableData=[];
            params.fundId = this.searchId;
            if(params.fundId==""){
                this.showDialog('', 'info', true, '请输入产品代码查询');
                return false;
            }
			// $.post({
			// 	url: '/businessMgmt/businessParamConfig/IPOPreheatSetting/getList.ajax',
			// 	data: params,
			// 	success: function(result) {
			// 		if (result.error === 0) {
			// 			_this.tableData = result.data.list;
			// 			_this.currentIndex = result.data.pageNo - 1;
			// 			_this.totalPage = Math.ceil(result.data.totalSize/result.data.pageSize);
			// 		} else {
			// 			_this.tableData = [];
			// 			_this.currentIndex = 0;
			// 			_this.totalPage = 0;
			// 			_this.showDialog('', 'info', false, result.msg);
			// 		}
			// 	}
			// });

            $.post({
                url: '/businessMgmt/businessParamConfig/IPOPreheatSetting/getTableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.tableData.push(result.data);
                        console.log("_this.tableData:",_this.tableData)
                    }
                    else {
                        _this.tableData = [];
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
		},
		showAddDialog: function() {
            if(this.updateId){
                this.updateId = '';
                this.fundId_dialog = '';
                this.fundChineseName_dialog = '';
                this.fundName_dialog = '';
                this.fundType_dialog = '';
                this.fundRiskLevel_dialog='';
            }
			this.showDialog('', 'addDlg');
		},
		checkDialog: function() {
            if (!this.fundId_dialog) {
				this.showDialog('addDlg', 'info', true, '请填写产品代码！');
				return false;
			}
			if (!this.fundChineseName_dialog) {
				this.showDialog('addDlg', 'info', true, '请填写产品全称！');
				return false;
			}
			if (!this.fundName_dialog) {
				this.showDialog('addDlg', 'info', true, '请填写产品简称！');
				return false;
			}
            if (!this.fundType_dialog) {
                this.showDialog('addDlg', 'info', true, '请选择基金类别！');
                return false;
            }
            if (!this.fundRiskLevel_dialog) {
                this.showDialog('addDlg', 'info', true, '请选择风险等级！');
                return false;
            }

			return true;
		},

		showUpdate: function(item) {
            this.updateId = item.fundId;
			this.fundId_dialog = item.fundId;
			this.fundChineseName_dialog = item.fundChineseName;
			this.fundName_dialog = item.fundName;
			this.fundType_dialog = item.fundType;
            this.fundRiskLevel_dialog = item.fundRiskLevel;
			this.showDialog('', 'addDlg');
			// this.getRecruitEndDate();
		},
		addSave: function() {
			if (!this.checkDialog()) return;
			var params = {};
			params.fundId = this.fundId_dialog
			params.fundChineseName = this.fundChineseName_dialog;
			params.fundName = this.fundName_dialog;
			params.fundType = this.fundType_dialog;
            params.fundRiskLevel = this.fundRiskLevel_dialog;
			var url = this.updateId ? '/update.ajax' : '/add.ajax';
			var _this = this;
			console.log(params);
			$.post({
				url: '/businessMgmt/businessParamConfig/IPOPreheatSetting' + url,
				data: params,
				success: function(result) {
					if (result.error === 0) {
						_this.getTableData(0);
						_this.showDialog('addDlg', 'info', false, result.msg);
					} else {
						_this.showDialog('addDlg', 'info', true, result.msg);
					}
				}
			});
		},
		// showDelete: function(item) {
		// 	this.deleteId = item.productId;
		// 	this.showDialog('', 'deleteDialog');
		// },
		// deleteData: function() {
		// 	var _this = this;
		// 	$.post({
		// 		url: '/businessMgmt/businessParamConfig/IPOPreheatSetting/delete.ajax',
		// 		data: {productId: this.deleteId},
		// 		success: function(result) {
		// 			if (result.error === 0) {
		// 				_this.getTableData(0);
		// 				_this.showDialog('deleteDialog', 'info', false, result.msg);
		// 			} else {
		// 				_this.showDialog('deleteDialog', 'info', true, result.msg);
		// 			}
		// 		}
		// 	});
		// },
		showDialog: function(dia1, dia2, callback, msg) {
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
				$('#' + dia1).on("hidden.bs.modal", function() {
					$('#' + dia2).modal('show');
					$('#' + dia1).off().on("hidden", "hidden.bs.modal");
				});
				$('#' + dia1).modal('hide');
			} else {
				$('#' + dia1).on("hidden.bs.modal", function() {
					$('#' + dia2).on("hidden.bs.modal", function() {
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
        check: function (item) {
            item.check = !item.check;
        },
        allCheck: function () {
            var _this = this;
            var flag = this.checkAll;
            this.tableData.forEach(function (item) {
                item.check = !flag;
            });
        },
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
	}
});
