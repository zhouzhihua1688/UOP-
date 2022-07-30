new Vue({
	el: '#content',
	data: {
		//主页面相关数据
		updateId: '',
		deleteId: '',
		tableData: [],
		diaMsg: '',
		// 新增弹窗相关数据
		dialog_chinese: '',
		dialog_pinyin: '',
		//主表格分页数据
		currentIndex: 0,
		maxSpace: 5,
		pageMaxNum: 10,
		condition: '',
	},
	computed: {
		//主表格分页
		middleData: function() {
			var middleData = [];
			var filterData = [];
			var pageMaxNum = parseInt(this.pageMaxNum);
			var _this = this;
			this.tableData.forEach(function(jsonObj) {
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
			} else {
				var i = 0;
				while ((i + 1) * pageMaxNum < filterData.length) {
					middleData.push(filterData.slice(i * pageMaxNum, (i + 1) * pageMaxNum));
					i++;
				}
				middleData.push(filterData.slice(i * pageMaxNum, filterData.length));
				return middleData;
			}
		},
		viewData: function() {
			var currentIndex = parseInt(this.currentIndex);
			return this.middleData[currentIndex];
		},
		pageList: function() {
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
			} else if (this.currentIndex <= this.maxSpace && this.middleData.length - this.currentIndex > this.maxSpace) {
				for (var i = 0; i < this.currentIndex + (2 * this.maxSpace - this.currentIndex); i++) {
					arr.push(i + 1);
				}
			} else if (this.currentIndex > this.maxSpace && this.middleData.length - this.currentIndex <= this.maxSpace) {
				var space = this.middleData.length - this.currentIndex;
				for (var i = this.currentIndex - (2 * this.maxSpace - space); i < this.middleData.length; i++) {
					arr.push(i + 1);
				}
			} else {
				for (var i = 0; i < this.middleData.length; i++) {
					arr.push(i + 1);
				}
			}
			return arr;
		},
	},
	watch: {
		pageMaxNum: function() {
			this.currentIndex = 0;
		},
		condition: function() {
			this.currentIndex = 0;
		}
	},
	created: function() {
		this.search();
	},
	mounted: function() {
		var _this = this;
		var dialogs = ['delete', 'info', 'operate'];
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
	},
	methods: {
		//模板管理业务方法
		search: function() {
			this.currentIndex = 0;
			var _this = this;
			var params = {};
			$.post({
				url: '/publicConfig/appSearchConfig/polyphoneConfig/query.ajax',
				data: params,
				success: function(result) {
					if (result.error === 0) {
						_this.tableData = result.data;
					} else {
						_this.showDialog('', 'info', false, result.msg);
					}
				}
			});
		},
		clearAddDia: function() {
			this.dialog_chinese = '';
			this.dialog_pinyin = '';
		},
		showAdd: function() {
			this.clearAddDia();
			this.updateId = '';
			this.showDialog('', 'operate');
		},
		showUpdate: function(item) {
			this.updateId = item.chinese;
			this.dialog_chinese = item.chinese;
			this.dialog_pinyin = item.pinyin;
			this.showDialog('', 'operate');
		},
		checkDiaData: function() {
			if (this.dialog_chinese === '') {
				this.showDialog('operate', 'info', true, '中文不能为空');
				return false;
			}
			if(!/^[\u4e00-\u9fa5]+$/.test(this.dialog_chinese)){
				this.showDialog('operate', 'info', true, '中文必须输入汉字');
				return false;
			}
			if (this.dialog_pinyin === '') {
				this.showDialog('operate', 'info', true, '拼音不能为空');
				return false;
			}
			if(!/^([A-Za-z]+\s?)*[A-Za-z]$/.test(this.dialog_pinyin)){
				this.showDialog('operate', 'info', true, '拼音必须输入英文字母(不区分大小写,中间可加空格)');
				return false;
			}
			return true;
		},
		add: function() {
			if (!this.checkDiaData()) {
				return;
			}
			var _this = this;
			var params = {};
			params.chinese = this.dialog_chinese;
			params.pinyin = this.dialog_pinyin;
			$.post({
				url: '/publicConfig/appSearchConfig/polyphoneConfig/add.ajax',
				data: params,
				success: function(result) {
					if (result.error === 0) {
						_this.search();
						_this.showDialog('operate', 'info', false, result.msg);
					} else {
						_this.showDialog('operate', 'info', true, result.msg);
					}
				}
			});
		},
		showDelete: function(item) {
			this.deleteId = item.chinese;
			this.showDialog('', 'delete');
		},
		deleteData: function() {
			var _this = this;
			$.post({
				url: '/publicConfig/appSearchConfig/polyphoneConfig/del.ajax',
				data: {
					chinese: this.deleteId
				},
				success: function(result) {
					if (result.error === 0) {
						_this.search();
						_this.showDialog('delete', 'info', false, result.msg);
					} else {
						_this.showDialog('delete', 'info', true, result.msg);
					}
				}
			});
		},
		//主表格分页方法
		prev: function() {
			this.currentIndex <= 0 ? 0 : this.currentIndex--;
		},
		next: function() {
			this.currentIndex >= this.middleData.length - 1 ? this.middleData.length - 1 : this.currentIndex++;
		},
		changeIndex: function(index) {
			this.currentIndex = index - 1;
		},
		toFirst: function() {
			this.currentIndex = 0;
		},
		toLast: function() {
			this.currentIndex = this.middleData.length - 1;
		},
		//公共方法
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
		}
	}
});
