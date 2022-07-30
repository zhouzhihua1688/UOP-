new Vue({
	el: '#content',
	data: {
		//主页面相关数据
		deleteId: '',
		updateId: '',
		tableData: [],
		diaMsg: '',
		//弹窗相关数据
		classList: [],
		dialog_categoryId: '',
		dialog_categorySubName: '',
        dialog_categoryRemark: '',
        dialog_showStatus: 'true',
		//主表格分页数据
		currentIndex: 0,
		maxSpace: 5,
		pageMaxNum: 10,
		condition: ''
	},
	computed: {
		//主表格假分页
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
		}
	},
	watch: {
		pageMaxNum: {
			handler: function(val, oldval) {
				this.currentIndex = 0;
			}
		},
		condition: {
			handler: function(val, oldval) {
				this.currentIndex = 0;
			}
		}
	},
	created: function() {
		this.getTableData();
		this.getClassList();
	},
	mounted: function() {
		var _this = this;
		var dialogs = ['info', 'add', 'del'];
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
        $('#uploadBtn').click(function () {
            $('#uploadInput').val('');
            $('#uploadFileInput').click();
        });
	},
	methods: {
		//获取分类列表
		getClassList: function() {
			var _this = this;
			$.post({
				url: '/messageCenter/classMgmt/secondClassMgmt/getClassList.ajax',
				success: function(result) {
					if (result.error === 0) {
						_this.classList = result.data;
					} else {
						_this.classList = [];
					}
				}
			});
		},
		//查询
		getTableData: function() {
			this.currentIndex = 0;
			var _this = this;
			$.post({
				url: '/messageCenter/classMgmt/secondClassMgmt/getTableData.ajax',
				success: function(result) {
					if (result.error === 0) {
						_this.tableData = result.data;
					} else {
						_this.tableData = [];
						_this.showDialog('', 'info', false, result.msg);
					}
				}
			});
		},
		showAdd: function() {
            $('#uploadFileInput').on('change', function () {
                $('#uploadInput').val($(this).val());
            });
			this.updateId = '';
			this.dialog_categoryId = '';
			this.dialog_categorySubName = '';
			this.dialog_categoryRemark = '';
			this.dialog_showStatus = 'true';
            $('#uploadInput').val('');
            $('#uploadFileInput').val('');
			this.showDialog('', 'add');
		},
		showUpdate: function(item) {
            $('#uploadFileInput').on('change', function () {
                $('#uploadInput').val($(this).val());
            });
			this.updateId = item.categorySubId;
			this.dialog_categoryId = item.categoryId;
			this.dialog_categorySubName = item.categorySubName;
			this.dialog_categoryRemark = item.categoryRemark;
			this.dialog_showStatus = String(item.showStatus);
            $('#uploadInput').val(item.imageUrl);
            $('#uploadFileInput').val('');
			this.showDialog('', 'add');
		},
		save: function() {
			if(!this.dialog_categoryId){
				this.showDialog('add', 'info', true, '未选择分类ID');
				return false;
			}
			if(!this.dialog_categorySubName){
				this.showDialog('add', 'info', true, '未填写二级分类名称');
				return false;
			}
            if(!this.dialog_categoryRemark){
                this.showDialog('add', 'info', true, '未填写二级分类备注');
                return false;
            }
			var _this = this;
			var params = {};
			var url = '/messageCenter/classMgmt/secondClassMgmt/';
            params.categoryId = this.dialog_categoryId;
			params.categorySubName = this.dialog_categorySubName;
			params.categoryRemark = this.dialog_categoryRemark;
			params.showStatus = this.dialog_showStatus;
			if(!$('#uploadFileInput')[0].files[0]){ // 不需要上传文件
                if(!this.updateId){
                    url += 'save.ajax';
                    params.imageUrl = '';
                }
                else {
                    url += 'update.ajax';
                    params.categorySubId = this.updateId;
                    params.imageUrl = $('#uploadInput').val();
                }
                $.post({
                    url: url,
                    data: params,
                    success: function(result) {
                        if (result.error === 0) {
                            _this.getTableData();
                        }
                        _this.showDialog('add', 'info', false, result.msg);
                    }
                });
			}
			else {
                if(!this.updateId){
                    url += 'saveWithPic.ajax';
                    params.categoryId = this.dialog_categoryId;
                }
                else {
                    url += 'updateWithPic.ajax';
                    params.categorySubId = this.updateId;
                }
                $.ajaxFileUpload({
                    url: url,
                    type: 'POST',
                    data: params,
                    dataType: 'json',
                    fileElementId: 'uploadFileInput',
                    success: function (result) {
                        if (result.error === 0) {
                            _this.getTableData();
                        }
                        _this.showDialog('add', 'info', false, result.msg);
                    }
                });
			}
		},
		showDel: function(item) {
			this.deleteId = item.categorySubId;
			this.showDialog('', 'del');
		},
		del: function() {
			var _this = this;
			var params = {};
			params.categorySubId = this.deleteId;
			$.post({
				url: '/messageCenter/classMgmt/secondClassMgmt/del.ajax',
				data: params,
				success: function(result) {
					if (result.error === 0) {
						_this.getTableData();
					}
					_this.showDialog('del', 'info', false, result.msg);
				}
			});
		},
		exportAll: function(item){
			var url = '/messageCenter/classMgmt/secondClassMgmt/exportAll.ajax?categoryId=' + item.categoryId + '&subCategoryId=' + item.categorySubId;
            window.location.href = url;
		},
		checkSubscribeNum: function(item){
			var _this = this;
			var params = {};
			params.categoryId = item.categoryId;
			params.subCategoryId = item.categorySubId;
			$.post({
				url: '/messageCenter/classMgmt/secondClassMgmt/getSubscribeNumber.ajax',
				data: params,
				success: function(result) {
					if (result.error === 0) {
						item.hasCheckSubscirbeNum = true;
						item.subscirbeNum = result.data;
					}
					else {
						_this.showDialog('', 'info', false, result.msg);
					}
				}
			});
		},
		//主表格假分页方法
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
