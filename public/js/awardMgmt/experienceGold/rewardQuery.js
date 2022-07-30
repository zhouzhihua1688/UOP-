var vm = new Vue({
	el: '#content',
	data: {
		// 主页面相关数据
		experienceCouponId: '', //体验券ID
        custNo: '', //客户号 
        rewardType: '',//奖励类型
        rewardDetail: '',//奖励详情
		tableData: [],
		diaMsg: '',
		//主表格分页数据
		currentIndex: 0,
		maxSpace: 5,
		totalPage: 0,
		pageMaxNum: 10,
	},
	mounted: function() {
		var dialogs = ['info'];
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
			params.experienceCouponId = this.experienceCouponId;
            params.custNo = this.custNo;
            params.rewardType = this.rewardType;
            params.rewardDetail = this.rewardDetail;
			params.pageNo = currentIndex + 1;
			params.pageSize = this.pageMaxNum;
			var _this = this;
			$.post({
				url: '/awardMgmt/experienceGold/rewardQuery/query.ajax',
				data: params,
				success: function(result) {
					if (result.error === 0) {
						_this.tableData = result.data.rows.filter(function (item) {
                            return item.experienceCouponId.indexOf(params.experienceCouponId) > -1
                                && item.custNo.indexOf(params.custNo) > -1
                                && item.rewardType.indexOf(params.rewardType) > -1
                                && item.rewardDetail.indexOf(params.rewardDetail) > -1;
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
        translate : function(rewardType){
            var rewardTypeWord = '';
            if(rewardType == '00'){
                rewardTypeWord = "奖励包";
            } else if (rewardType == '01'){
                rewardTypeWord = "活动";
            }
            return rewardTypeWord;
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
