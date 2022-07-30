var vm = new Vue({
	el: '#content',
	data: {
		// 主页面相关数据
		pname: '', //参数名称
		tableData: [],
		diaMsg: '',
		//主表格分页数据
		currentIndex: 0,
		maxSpace: 5,
		totalPage: 0,
		pageMaxNum: 10,
		// 新增
        dia_pkey:'', //参数关键词
		dia_pname: '',//参数名称
        // 删除
        deleteId: ''
	},
	mounted: function() {
		var dialogs = ['info', 'add', 'update', 'delete'];
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
	},
	watch: {
		pageMaxNum: function() {
			this.getTableData(0);
		}
	},
	methods: {
		getTableData: function(currentIndex) {
			var params = {};
			params.pname = this.pname;
			params.pageNo = currentIndex + 1;
			params.pageSize = this.pageMaxNum;
			var _this = this;
			$.post({
				url: '/awardMgmt/experienceGold/configSetting/query.ajax',
				data: params,
				success: function(result) {
					if (result.error === 0) {
						_this.tableData = result.data.rows.filter(function (item) {
                            return item.pname.indexOf(params.pname) > -1;
                        });
						_this.currentIndex = result.data.pageNum - 1;
						_this.totalPage = result.data.pages;
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
			this.dia_pkey = '';
			this.dia_pname = '';
			this.showDialog('', 'add');
		},
		showUpdate: function(item) {
			this.dia_pkey = item.pkey;
            this.dia_pname = item.pname;
			this.showDialog('', 'update');
		},
		addSave: function() {
			if (!this.dia_pkey) {
				this.showDialog('add', 'info', true, '未填写参数关键词！');
				return false;
			}
			if (!this.dia_pname) {
				this.showDialog('add', 'info', true, '未填写参数名称！');
				return false;
			}
			var params = {};
			params.pkey = this.dia_pkey;
			params.pname = this.dia_pname;
            params.modifyTime = new Date().getTime();
			var _this = this;
			$.post({
				url: '/awardMgmt/experienceGold/configSetting/saveParam.ajax',
				data: params,
				success: function(result) {
					if (result.error === 0) {
						_this.getTableData(0);
                        _this.showDialog('add', 'info', false, result.msg);
					} else {
						_this.showDialog('add', 'info', true, result.msg);
					}
				}
			});
		},
		update: function() {
			if (!this.dia_pkey) {
				this.showDialog('update', 'info', true, '未填写参数关键词！');
				return false;
			}
			if (!this.dia_pname) {
				this.showDialog('update', 'info', true, '未填写参数名称！');
				return false;
			}
			var params = {};
			params.pkey = this.dia_pkey;
			params.pname = this.dia_pname;
            params.modifyTime = new Date().getTime();
			var _this = this;
			$.post({
				url: '/awardMgmt/experienceGold/configSetting/update.ajax',
				data: params,
				success: function(result) {
					if (result.error === 0) {
						_this.getTableData(0);
						_this.showDialog('update', 'info', false, result.msg);
					} else {
						_this.showDialog('update', 'info', true, result.msg);
					}
				}
			});
		},
		showDelete: function(item) {
			this.deleteId = item.pkey;
			this.showDialog('', 'delete');
		},
		deleteData: function() {
			var _this = this;
            var params = {};
			params.pkey = this.deleteId;
			$.post({
				url: '/awardMgmt/experienceGold/configSetting/del.ajax',
				data: params,
				success: function(result) {
					if (result.error === 0) {
						_this.getTableData(0);
                        _this.showDialog('delete', 'info', false, result.msg);
					} else {
						_this.showDialog('delete', 'info', true, result.msg);
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
