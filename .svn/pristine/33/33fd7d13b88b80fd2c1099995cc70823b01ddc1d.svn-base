var vm = new Vue({
	el: '#content',
	data: {
		// 主页面相关数据
		shareNo: '',
		isUpdate: false,
		updateId: '',
		tableData: [],
		diaMsg: '',
		loadingShow: false,
		uploadSuccessed: false,
        shareTitle:'',   //20220114需求9737-增加按分享标题查询
		// 新建弹窗相关数据
		shareChannelList: [],
		diaShareChannel: '',
		diaShareDesc: '',
		diaShareTitle: '',
		diaShareContent: '',
		diaShareUrl: '',
		//主表格分页数据
		currentIndex: 0,
		maxSpace: 5,
		totalPage: 0,
		pageMaxNum: 10
	},
	mounted: function() {
		var dialogs = ['info', 'del', 'add'];
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
		$('#uploadBtn').click(function() {
			$('#uploadFileInput').click();
		});
		this.getShareChannelList();
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
		}
	},
	watch: {
		pageMaxNum: function() {
			this.getTableData(0);
		}
	},
	methods: {
		getShareChannelList: function() {
			var _this = this;
			$.post({
				url: '/marketingActive/activeRun/shareSetting/getShareChannelList.ajax',
				success: function(result) {
					if (result.error === 0) {
						_this.shareChannelList = result.data;
						_this.diaShareChannel = result.data[0].shareChannel;
					}
				}
			});
		},
		getTableData: function(currentIndex) {
			var params = {};
			var _this = this;
			this.shareNo && (params.shareNo = this.shareNo);
			params.shareTitle=this.shareTitle;
			params.pageNo = currentIndex + 1;
			params.pageSize = this.pageMaxNum;
			$.post({
				url: '/marketingActive/activeRun/shareSetting/getTableData.ajax',
				data: params,
				success: function(result) {
					if (result.error === 0) {
						_this.tableData = result.data.tableData;
						_this.currentIndex = result.data.page - 1;
						_this.totalPage = result.data.total;
					} else {
						_this.tableData = [];
						_this.currentIndex = 0;
						_this.totalPage = 0;
						_this.showDialog('', 'info', false, result.msg);
					}
				}
			});
		},
		setAddData: function(obj) {
			this.diaShareChannel = obj.shareChannel ? obj.shareChannel : '';
			this.diaShareDesc = obj.shareDesc ? obj.shareDesc : '';
			this.diaShareTitle = obj.shareTitle ? obj.shareTitle : '';
			this.diaShareContent = obj.shareContent ? obj.shareContent : '';
			this.diaShareUrl = obj.shareUrl ? obj.shareUrl : '';
			$('#uploadInput').val(obj.sharePicUrl ? obj.sharePicUrl : '');
		},
		showAdd: function() {
			this.isUpdate = false;
			this.updateId = '';
			this.uploadSuccessed = false;
			var _this = this;
			$('#uploadFileInput').on('change', function() {
				_this.uploadSuccessed = false;
				$('#uploadInput').val($(this).val());
			});
			this.setAddData({});
			this.showDialog('', 'add');
		},
		showUpdate: function(item) {
			this.isUpdate = true;
			this.updateId = item.id;
			this.uploadSuccessed = true;
			var _this = this;
			$('#uploadFileInput').on('change', function() {
				_this.uploadSuccessed = false;
				$('#uploadInput').val($(this).val());
			});
			this.setAddData(item);
			this.showDialog('', 'add');
		},
		showDelete: function(id) {
			this.deleteId = id;
			this.showDialog('', 'del');
		},
		deleteData: function() {
			var _this = this;
			$.post({
				url: '/marketingActive/activeRun/shareSetting/delete.ajax',
				data: {
					id: this.deleteId
				},
				success: function(result) {
					if (result.error === 0) {
						_this.getTableData(0);
					}
					_this.showDialog('del', 'info', false, result.msg);
				}
			});

		},
		diaInfoCheck: function() {
			if (!this.diaShareChannel) {
				this.showDialog('add', 'info', true, '分享渠道不能为空');
				return false;
			}
			if (!this.diaShareDesc) {
				this.showDialog('add', 'info', true, '分享描述不能为空');
				return false;
			}
			if (!this.diaShareTitle) {
				this.showDialog('add', 'info', true, '分享标题不能为空');
				return false;
			}
			if (!this.diaShareContent) {
				this.showDialog('add', 'info', true, '分享内容不能为空');
				return false;
			}
			if (!this.diaShareUrl) {
				this.showDialog('add', 'info', true, '分享跳转链接不能为空');
				return false;
			}
			if (!$('#uploadInput').val()) {
				this.showDialog('add', 'info', true, '分享图片地址不能为空');
				return false;
			}
			if (!this.uploadSuccessed) {
				this.showDialog('add', 'info', true, '未上传图片');
				return false;
			}
			return true;
		},
		add: function() {
			var _this = this;
			if (this.diaInfoCheck()) {
				var params = {};
				params.shareChannel = this.diaShareChannel;
				params.shareDesc = this.diaShareDesc;
				params.shareTitle = this.diaShareTitle;
				params.shareContent = this.diaShareContent;
				params.shareUrl = this.diaShareUrl;
				params.sharePicUrl = $('#uploadInput').val();
				this.isUpdate && (params.id = this.updateId);
				var url = '/marketingActive/activeRun/shareSetting/';
				url += this.isUpdate ? 'update.ajax' : 'add.ajax';
				$.post({
					url: url,
					data: params,
					success: function(result) {
						if (result.error === 0) {
							_this.getTableData(0);
						}
						_this.showDialog('add', 'info', false, result.msg);
					}
				});
			}
		},
		uploadPic: function() {
			if (!$('#uploadInput').val()) {
				this.showDialog('add', 'info', true, '未选择要上传的图片');
				return;
			}
			if (!/.+(\.gif|\.jpeg|\.png|\.jpg|\.bmp)$/.test($('#uploadInput').val())) {
				this.showDialog('add', 'info', true, '文件格式错误');
				return;
			}
			this.showDialog('add');
			this.loadingShow = true;
			this.uploadSuccessed = false;
			var _this = this;
			$.ajaxFileUpload({
				url: '/marketingActive/activeRun/shareSetting/upload.ajax',
				type: 'POST',
				dataType: 'json',
				fileElementId: 'uploadFileInput',
				success: function(result) {
					_this.loadingShow = false;
					if (result.error === 0) {
						_this.uploadSuccessed = true;
						$('#uploadInput').val(result.data);
						_this.showDialog('', 'add');
					} else {
						_this.showDialog('', 'info', false, result.msg);
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
	},
	filters: {
		filterShareChannel: function(value) {
			var obj = vm.shareChannelList.filter(function(item) {
				return item.shareChannel == value;
			})[0];
			return obj ? obj.shareChannelDesc : value;
		}
	}
});
