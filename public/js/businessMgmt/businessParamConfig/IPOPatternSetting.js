var vm = new Vue({
	el: '#content',
	data: {
		// 主页面相关数据
        productId: '',
        recruitEndDate: '',
        isDeliver: '',
        deliverDate: '',

		tableData: [],
		diaMsg: '',
		//主表格分页数据
		currentIndex: 0,
		maxSpace: 5,
		totalPage: 0,
		pageMaxNum: 10,
		// 新增
		updateId: '',
		deleteId: '',

        productId_dialog: '',
        recruitEndDate_dialog: '',
        isdailyDeliver_dialog: 'N',
		deliverDate_dialog: ''
	},
	created: function() {
		// this.getShareRventTypeList();
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
		this.getTableData(0);

	},
	computed: {
		pageList: function() {
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
		checkAll: function() {
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
		pageMaxNum: function() {
			this.getTableData(0);
		}
	},
	filters: {
        isdailyDeliverTranslate: function(value) {
        	if (!value) return '';
            if (value==='Y') return '是';
            if (value==='N') return '否';
        }
	},
	methods: {
		getTableData: function(currentIndex) {
			var params = {};
            this.productId && (params.productId = this.productId);
			params.pageNo = currentIndex + 1;
			params.pageSize = this.pageMaxNum;
			var _this = this;
			$.post({
				url: '/businessMgmt/businessParamConfig/IPOPatternSetting/getList.ajax',
				data: params,
				success: function(result) {
					if (result.error === 0) {
						_this.tableData = result.data.list;
						_this.currentIndex = result.data.pageNo - 1;
						_this.totalPage = Math.ceil(result.data.totalSize/result.data.pageSize);
					} else {
						_this.tableData = [];
						_this.currentIndex = 0;
						_this.totalPage = 0;
						_this.showDialog('', 'info', false, result.msg);
					}
				}
			});
		},
		showAddDialog: function() {
            if(this.updateId){
                this.updateId = '';
                this.productId_dialog = '';
                this.recruitEndDate_dialog = '';
                this.isdailyDeliver_dialog = '';
                this.deliverDate_dialog = '';
            }
			this.showDialog('', 'addDlg');
		},
		checkDialog: function() {
            if (!this.productId_dialog) {
				this.showDialog('addDlg', 'info', true, '请填写产品代码！');
				return false;
			}
			// if (!this.recruitEndDate_dialog) {
			// 	this.showDialog('addDlg', 'info', true, '请填写募集结束日！');
			// 	return false;
			// }
			if (!this.isdailyDeliver_dialog) {
				this.showDialog('addDlg', 'info', true, '请选择是否每日上送！');
				return false;
			}
			if (!this.deliverDate_dialog && this.isdailyDeliver_dialog=='N') {
				this.showDialog('addDlg', 'info', true, '请填写上送日期！');
				return false;
			}
			if (this.deliverDate_dialog){
				let array = this.deliverDate_dialog.split(',');
				for (let i = 0; i < array.length; i++) {
					let item = array[i];
					if(!this.checkDate(item)){
						this.showDialog('addDlg', 'info', true, '上送日期格式有误！');
						return false;
					}
				}
			}
			return true;
		},
		checkDate(str){
			if(!/^\d{8}$/.test(str)){
				return false;
			} else {
				return this.checkDateTime(str.replace(/^(\d{4})(\d{2})(\d{2})$/g,'$1-$2-$3 00:00:00'))
			}
		},
		// 检查是否为日期时间
		checkDateTime(str){
			var reg = /^(\d+)-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
			var r = str.match(reg);
			if(r==null)return false;
			r[2]=r[2]-1;
			var d= new Date(r[1], r[2],r[3], r[4],r[5], r[6]);
			if(d.getFullYear()!=r[1])return false;
			if(d.getMonth()!=r[2])return false;
			if(d.getDate()!=r[3])return false;
			if(d.getHours()!=r[4])return false;
			if(d.getMinutes()!=r[5])return false;
			if(d.getSeconds()!=r[6])return false;
			return true;
		},
		showUpdate: function(item) {
            this.updateId = item.productId;
			this.productId_dialog = item.productId;
			this.recruitEndDate_dialog = item.recruitEndDate;
			this.isdailyDeliver_dialog = item.isdailyDeliver;
			this.deliverDate_dialog = item.deliverDate;
			this.showDialog('', 'addDlg');
			// this.getRecruitEndDate();
		},
		addSave: function() {
			if (!this.checkDialog()) return;
			var params = {};
			params.productId = this.productId_dialog
			params.recruitEndDate = this.recruitEndDate_dialog;
			params.isdailyDeliver = this.isdailyDeliver_dialog;
			params.deliverDate = (params.isdailyDeliver =='N'?this.deliverDate_dialog:'');
			// this.updateId && (params.id = this.productId_dialog);
			var url = this.updateId ? '/update.ajax' : '/add.ajax';
			var _this = this;
			$.post({
				url: '/businessMgmt/businessParamConfig/IPOPatternSetting' + url,
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
		showDelete: function(item) {
			this.deleteId = item.productId;
			this.showDialog('', 'deleteDialog');
		},
		deleteData: function() {
			var _this = this;
			$.post({
				url: '/businessMgmt/businessParamConfig/IPOPatternSetting/delete.ajax',
				data: {productId: this.deleteId},
				success: function(result) {
					if (result.error === 0) {
						_this.getTableData(0);
						_this.showDialog('deleteDialog', 'info', false, result.msg);
					} else {
						_this.showDialog('deleteDialog', 'info', true, result.msg);
					}
				}
			});
		},
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
		// dialog，获取当前产品募集结束日
		getRecruitEndDate: function(event){
			// console.log(event.target.value);
			let productId = event?event.target.value:this.productId_dialog;
			var _this = this;
			$.post({
				url: '/businessMgmt/businessParamConfig/IPOPatternSetting/getRecruitEndDate.ajax',
				data: {productId: productId},
				success: function(result) {
					if (result.error === 0 && result.data) {
						_this.recruitEndDate_dialog = result.data.dsSubEndDate;
					} else {
						_this.recruitEndDate_dialog = '';
						// _this.showDialog('', 'info', false, result.msg);
					}
				}
			});
		},
		//主表格分页方法
		prev: function() {
			if (this.currentIndex <= 0) {
				return;
			}
			this.getTableData(this.currentIndex - 1);
		},
		next: function() {
			if (this.currentIndex >= this.totalPage - 1) {
				return;
			}
			this.getTableData(this.currentIndex + 1);
		},
		changeIndex: function(index) {
			this.getTableData(index - 1);
		},
		toFirst: function() {
			this.getTableData(0);
		},
		toLast: function() {
			this.getTableData(this.totalPage - 1);
		}
	}
});
