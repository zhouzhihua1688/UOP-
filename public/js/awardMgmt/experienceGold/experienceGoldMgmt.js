var vm = new Vue({
	el: '#content',
	data: {
		// 主页面相关数据
		experienceCouponId: '', //体验券ID
        experienceCouponName: '', //体验券名称
		tableData: [],
		diaMsg: '',
		//主表格分页数据
		currentIndex: 0,
		maxSpace: 5,
		totalPage: 0,
		pageMaxNum: 10,
		// 新增
        dia_id: '',
        dia_experienceCouponId :'',
        dia_experienceCouponName :'',
        dia_imgUrl :'',
        dia_jumpUrl :'',
        dia_experienceCouponDesc :'',
        dia_validDays :'',
        dia_targetPrdType :'',
        dia_targetPrdId :'',
        dia_experienceDays :'',
		dia_experienceCouponAmt: '',
	},
	mounted: function() {
		var dialogs = ['info', 'add', 'update'];
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
		$('#uploadBtn1').click(function () {
            $('#uploadFileInput1').click();
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
			params.experienceCouponId = this.experienceCouponId;
            params.experienceCouponName = this.experienceCouponName;
			params.pageNo = currentIndex + 1;
			params.pageSize = this.pageMaxNum;
			var _this = this;
			$.post({
				url: '/awardMgmt/experienceGold/experienceGoldMgmt/query.ajax',
				data: params,
				success: function(result) {
					if (result.error === 0) {
						_this.tableData = result.data.rows.filter(function (item) {
                            return item.experienceCouponId.indexOf(params.experienceCouponId) > -1
                                && item.experienceCouponName.indexOf(params.experienceCouponName) > -1;
                        });

						_this.tableData = result.data.rows;
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
            this.dia_id = '';
            this.dia_experienceCouponId = '';
			this.dia_experienceCouponName = '';
            this.dia_imgUrl = '';
            this.dia_jumpUrl = '';
            this.dia_experienceCouponDesc = '';
            this.dia_validDays = '';
            this.dia_targetPrdType = '';
            this.dia_targetPrdId = '';
            this.dia_experienceDays = '';
			this.dia_experienceCouponAmt = '';
			$('#uploadFileInput1').on('change', function () {
                $('#uploadInput1').val($(this).val());
            });
			this.showDialog('', 'add');
		},
		showUpdate: function(item) {
            this.dia_id = item.id;
            this.dia_experienceCouponId = item.experienceCouponId;
			this.dia_experienceCouponName = item.experienceCouponName;
            this.dia_imgUrl = item.imgUrl;
            this.dia_jumpUrl = item.jumpUrl;
            this.dia_experienceCouponDesc = item.experienceCouponDesc;
            this.dia_validDays = item.validDays;
            this.dia_targetPrdType = item.targetPrdType;
            this.dia_targetPrdId = item.targetPrdId;
            this.dia_experienceDays = item.experienceDays;
			this.dia_experienceCouponAmt = item.experienceCouponAmt;
			$('#uploadInput2').val(item.imgUrl ? item.imgUrl : '');
			this.showDialog('', 'update');
		},
		addSave: function() {
			if (!this.dia_experienceCouponName) {
				this.showDialog('add', 'info', true, '未填写体验金券名称！');
				return false;
			}
			var nameLength = (this.dia_experienceCouponName.replace(/\w/g,"")).length;
			if (nameLength>15) {
				this.showDialog('add', 'info', true, '体验金券名称不可以超过15个汉字！');
				return false;
			}
			if (!$('#uploadInput1').val()) {
				this.showDialog('add', 'info', true, '未填写体验金券图片！');
				return false;
			}
			if (!this.dia_jumpUrl) {
				this.showDialog('add', 'info', true, '未填写体验金券跳转链接！');
				return false;
			}
			if (!this.dia_experienceCouponDesc) {
				this.showDialog('add', 'info', true, '未填写体验金券描述！');
				return false;
			}
			if (!this.dia_experienceCouponAmt) {
				this.showDialog('add', 'info', true, '未填写体验金券金额！');
				return false;
			}
			if (!this.dia_validDays) {
				this.showDialog('add', 'info', true, '未填写体验金券有效期！');
				return false;
			}
			if (!this.dia_targetPrdType) {
				this.showDialog('add', 'info', true, '未填写适用产品类型！');
				return false;
			}
			if (!this.dia_targetPrdId) {
				this.showDialog('add', 'info', true, '未填写产品id！');
				return false;
			}
			if (!this.dia_experienceDays) {
				this.showDialog('add', 'info', true, '未填写体验周期！');
				return false;
			}
			var params = {};
            params.experienceCouponName = this.dia_experienceCouponName;
            params.imgUrl = $('#uploadInput1').val();
            params.jumpUrl = this.dia_jumpUrl;
            params.experienceCouponDesc = this.dia_experienceCouponDesc;
            params.validDays = this.dia_validDays;
            params.targetPrdType = this.dia_targetPrdType;
            params.targetPrdId = this.dia_targetPrdId;
            params.experienceDays = this.dia_experienceDays;
			params.experienceCouponAmt = this.dia_experienceCouponAmt;
			params.modifyTime = new Date().getTime();
			var _this = this;
			$.post({
				url: '/awardMgmt/experienceGold/experienceGoldMgmt/saveParam.ajax',
				data: params,
				success: function(result) {
					if (result.error === 0) {
						_this.refresh('add');
					} else {
						_this.showDialog('add', 'info', true, result.msg);
					}
				}
			});
		},
		update: function() {
			if (!this.dia_experienceCouponName) {
				this.showDialog('update', 'info', true, '未填写体验金券名称！');
				return false;
			}
			var nameLength = (this.dia_experienceCouponName.replace(/\w/g,"")).length;
			if (nameLength>15) {
				this.showDialog('update', 'info', true, '体验金券名称不可以超过15个汉字！');
				return false;
			}
			if (!this.dia_experienceCouponName) {
				this.showDialog('update', 'info', true, '未填写体验金券名称！');
				return false;
			}		
			if (!$('#uploadInput2').val()) {
				this.showDialog('update', 'info', true, '未填写体验金券图片！');
				return false;
			}
			if (!this.dia_jumpUrl) {
				this.showDialog('update', 'info', true, '未填写体验金券跳转链接！');
				return false;
			}
			if (!this.dia_experienceCouponDesc) {
				this.showDialog('update', 'info', true, '未填写体验金券描述！');
				return false;
			}
			if (!this.dia_experienceCouponAmt) {
				this.showDialog('update', 'info', true, '未填写体验金券金额！');
				return false;
			}
			if (!this.dia_validDays) {
				this.showDialog('update', 'info', true, '未填写体验金券有效期！');
				return false;
			}
			if (!this.dia_targetPrdType) {
				this.showDialog('update', 'info', true, '未填写适用产品类型！');
				return false;
			}
			if (!this.dia_targetPrdId) {
				this.showDialog('update', 'info', true, '未填写产品id！');
				return false;
			}
			if (!this.dia_experienceDays) {
				this.showDialog('update', 'info', true, '未填写体验周期！');
				return false;
			}	
			var params = {};
            params.id = this.dia_id;
            params.experienceCouponId = this.dia_experienceCouponId;
            params.experienceCouponName = this.dia_experienceCouponName;
            params.imgUrl = $('#uploadInput2').val();
            params.jumpUrl = this.dia_jumpUrl;
            params.experienceCouponDesc = this.dia_experienceCouponDesc;
            params.validDays = this.dia_validDays;
            params.targetPrdType = this.dia_targetPrdType;
            params.targetPrdId = this.dia_targetPrdId;
            params.experienceDays = this.dia_experienceDays;
			params.experienceCouponAmt = this.dia_experienceCouponAmt;
            params.modifyTime = new Date().getTime();
			var _this = this;
			$.post({
				url: '/awardMgmt/experienceGold/experienceGoldMgmt/update.ajax',
				data: params,
				success: function(result) {
					if (result.error === 0) {
						_this.refresh('update');
					} else {
						_this.showDialog('update', 'info', true, result.msg);
					}
				}
			});
		},

       // 上传图片
	   uploadPic1: function () {
		if (!$('#uploadInput1').val()) {
			this.showDialog('add', 'info', true, '未选择要上传的图片');
			return;
		}
		if (!/.+(\.gif|\.jpeg|\.png|\.jpg|\.bmp)$/.test($('#uploadInput1').val())) {
			this.showDialog('add', 'info', true, '文件格式错误');
			return;
		}
		var _this = this;
		$.ajaxFileUpload({
			url: '/awardMgmt/experienceGold/experienceGoldMgmt/upload.ajax',
			type: 'POST',
			dataType: 'json',
			fileElementId: 'uploadFileInput1',
			success: function (result) {
				if (result.error === 0) {
					$('#uploadInput1').val(result.data);
					_this.showDialog('', 'add');
				}
				else {
					_this.showDialog('add', 'info', true, result.msg);
				}
			}
		});

		},
		
		//刷新
		refresh: function(modal){
			var params = {};
			var _this = this;
			$.post({
				url: '/awardMgmt/experienceGold/experienceGoldMgmt/refresh.ajax',
				data: params,
				success: function(result) {
					if (result.error === 0) {
						_this.getTableData(0);
						_this.showDialog(modal, 'info', false, result.msg);
					} else {
						_this.showDialog(modal, 'info', false, result.msg);
					}
				}
			});
        },	

        translate: function(targetPrdType){
            var targetPrdTypeWord = '';
            if(targetPrdType == '00'){
                targetPrdTypeWord = "货币基金";
            } else if (targetPrdType == '01'){
                targetPrdTypeWord = "非货基金";
            } else if (targetPrdType == '02'){
                targetPrdTypeWord = "投顾";
            }
            return targetPrdTypeWord;
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
