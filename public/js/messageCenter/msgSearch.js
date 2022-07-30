new Vue({
	el: '#content',
	data: {
		//主页面相关数据
		phoneNum: '',
		ruleUser: '',
		ruleSource: '',
		status: '',
		ruleId: '',
		tableData: [],
		diaMsg: '',
		loadingShow: false,
		//主表格分页数据
		currentIndex: 0,
		maxSpace: 5,
		pageMaxNum: 10,
		condition: ''
	},
	computed: {
		//主表格分页
		middleData: function() {
			var middleData = [];
			var filterData = [];
			var pageMaxNum = parseInt(this.pageMaxNum);
			var _this = this;
			this.tableData.forEach(function(jsonObj) {
				for (var prop in jsonObj) {
					if (jsonObj.ruleId &&
						jsonObj.ruleId.toString() &&
						jsonObj.ruleId.toString().indexOf(_this.ruleId) != -1 &&
						jsonObj[prop] &&
						jsonObj[prop].toString() &&
						jsonObj[prop].toString().indexOf(_this.condition) != -1
					) {
						filterData.push(jsonObj);
						break;
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
		}
	},
	watch: {
		pageMaxNum: function() {
			this.currentIndex = 0;
		},
		condition: function() {
			this.currentIndex = 0;
		},
		ruleId: function() {
			this.currentIndex = 0;
		}
	},
	mounted: function() {
		var _this = this;
		var dialogs = ['info'];
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
		$('.date-timepicker').datetimepicker({
			format: 'YYYY-MM-DD', //use this option to display seconds
			icons: {
				time: 'fa fa-clock-o',
				date: 'fa fa-calendar',
				up: 'fa fa-chevron-up',
				down: 'fa fa-chevron-down',
				previous: 'fa fa-chevron-left',
				next: 'fa fa-chevron-right',
				today: 'fa fa-arrows ',
				clear: 'fa fa-trash',
				close: 'fa fa-times'
			}
		}).next().on(ace.click_event, function() {
			$(this).prev().focus();
		});
		var d = new Date();
		$('#beginTime').val([d.getFullYear(), d.getMonth() + 1, d.getDate()].map(function(value){
			return this.fixZero(value);
		}.bind(this)).join('-'));
	},
	methods: {
		//业务方法
		search: function() {
			if (!this.phoneNum && !this.ruleUser) {
				this.showDialog('', 'info', false, '手机号和发送人至少填一个');
				return;
			}
			if (this.phoneNum && this.ruleUser) {
				this.showDialog('', 'info', false, '手机号、发送人只能二选一且必填');
				return;
			}
			if (!$('#beginTime').val()) {
				this.showDialog('', 'info', false, '开始时间不能为空');
				return;
			}
			this.currentIndex = 0;
			var _this = this;
			var params = {};
			params.phoneNum = this.phoneNum;
			params.ruleUser = this.ruleUser;
			params.beginTime = $('#beginTime').val();
			params.endTime = $('#endTime').val();
			params.ruleSource = this.ruleSource;
			params.status = this.status;
			this.loadingShow = true;
			$.post({
				url: '/messageCenter/sendCount/msgSearch/search.ajax',
				data: params,
				success: function(result) {
					_this.loadingShow = false;
					if (result.error === 0) {
						_this.tableData = result.data;
						if (result.data.length == 0) {
							_this.showDialog('', 'info', false, '查询成功,暂无数据');
						}
					} else {
						_this.showDialog('', 'info', false, result.msg);
					}
				}
			});
		},
		fixZero: function(num){
			return num < 10 ? '0' + num : num;
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
