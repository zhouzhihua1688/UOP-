var vm = new Vue({
	el: '#content',
	data: {
		// 主页面相关数据
		experienceCouponId: '', //体验券ID
        custNo: '', //客户号 
        source: '',//发放来源
        sourceDetail: '',//来源详情
		sourceList:[], //发放来源列表
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
		this.getSourceList();
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
            params.source = this.source;
            params.sourceDetail = this.sourceDetail;
			params.pageNo = currentIndex + 1;
			params.pageSize = this.pageMaxNum;
			var _this = this;
			$.post({
				url: '/awardMgmt/experienceGold/sendQuery/query.ajax',
				data: params,
				success: function(result) {
					if (result.error === 0) {
						_this.tableData = result.data.rows.filter(function (item) {
                            return item.experienceCouponId.indexOf(params.experienceCouponId) > -1
                                && item.custNo.indexOf(params.custNo) > -1
                                && item.source.indexOf(params.source) > -1
                                && item.sourceDetail.indexOf(params.sourceDetail) > -1;
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
		getSourceList: function() {
			var params = {};
			var _this = this;
			$.post({
				url: '/awardMgmt/experienceGold/sendQuery/querySourceList.ajax',
				data: params,
				success: function(result) {
					if (result.error === 0) {
						_this.sourceList = result.data;
					} else {
						_this.sourceList = [];
					}
				}
			});
		},
        translate: function(status){
            var statusWord = '';
            if(status == '00'){
                statusWord = "未体验";
            } else if (status == '01'){
                statusWord = "体验中";
            } else if (status == '02'){
                statusWord = "体验完成";
            } else if (status == '09'){
                statusWord = "未体验且已过期";
            }
            return statusWord;
        },
		translateSource: function(source){
            var sourceDetail = source;
            if(source == '0'){
                sourceDetail = "人工发放";
            } else if (source == '1'){
                sourceDetail = "营销活动";
            } else if (source == '2'){
                sourceDetail = "转赠";
            } else if (source == '3'){
                sourceDetail = "任务";
            } else if (source == '4'){
                sourceDetail = "特权";
            } else if (source == '5'){
                sourceDetail = "自动化运营";
            }
            return sourceDetail;
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
