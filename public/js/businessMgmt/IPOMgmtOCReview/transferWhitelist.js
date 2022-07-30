new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        exportFundid: '',    //转出基金代码
        importFundid: '',    //转入基金代码
        fundIdNameList: [],
     
		tableData: [],
		diaMsg: '',
		//主表格分页数据
		currentIndex: 0,
		maxSpace: 5,
		totalPage: 0,
		pageMaxNum: 10,
		// 弹窗数据
		updateId: '',
		deleteId: '',

        serialno_dialog: '',
        exportFundid_dialog: '',
        importFundid_dialog: '',
        
    },
    created: function(){
        // this.getFundIdList();
        this.getTableData();
    },
    
    mounted: function () {
        var dialogs = ['info', 'addDlg', 'updDlg', 'deleteDialog'];
        dialogs.forEach(function (id) {
            $('#' + id).on('shown.bs.modal', function () {
                var $this = $(this);
                var dialog = $this.find('.modal-dialog');
                var top = ($(window).height() - dialog.height()) / 2;
                dialog.css({
                    marginTop: top
                });
            });
        });
        $('#menu1, #menu2').css('width', '180px').select2({});
        $("#menu1").on("select2:select", function (e) {
            // e 的话就是一个对象 然后需要什么就 “e.参数” 形式 进行获取
            this.exportFundid = e.params.data.id;
        }.bind(this));
        $("#menu2").on("select2:select", function (e) {
            // e 的话就是一个对象 然后需要什么就 “e.参数” 形式 进行获取
            this.importFundid = e.params.data.id;
        }.bind(this));
    },
    computed: {
        //主表格分页
        middleData: function () {
            var middleData = [];
            var pageMaxNum = parseInt(this.pageMaxNum);
            if (this.tableData.length <= pageMaxNum) {
                middleData.push(this.tableData);
                return middleData;
            }
            else {
                var i = 0;
                while ((i + 1) * pageMaxNum < this.tableData.length) {
                    middleData.push(this.tableData.slice(i * pageMaxNum, (i + 1) * pageMaxNum));
                    i++;
                }
                middleData.push(this.tableData.slice(i * pageMaxNum, this.tableData.length));
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
        },

    },
    watch: {
        pageMaxNum: function () {
            this.currentIndex = 0;
        }
    },
    methods: {
        showDialog: function (dia1, dia2, callback, msg) {
            this.diaMsg = msg ? msg : '输入条件错误';
            if (!dia1) {
                $('#' + dia2).modal('show');
            } else if (!dia2) {
                $('#' + dia1).modal('hide');
            } else if (!callback) {
                $('#' + dia1).on("hidden.bs.modal", function () {
                    $('#' + dia2).modal('show');
                    $('#' + dia1).off().on("hidden", "hidden.bs.modal");
                });
                $('#' + dia1).modal('hide');
            } else {
                $('#' + dia1).on("hidden.bs.modal", function () {
                    $('#' + dia2).on("hidden.bs.modal", function () {
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
        getFundIdList: function () {
            $.post({
                url: '/businessMgmt/IPOMgmtOCReview/transferWhitelist/fundIdNameList.ajax ',
                success: function (result) {
                    if (result.error == 0) {
                        this.fundIdNameList = result.data
                    }
                    else {
                        this.showDialog('', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },
        getTableData: function () {
            var params = {};
            (this.exportFundid&&this.exportFundid!=='ALL')&&(params.exportFundid=this.exportFundid);
            (this.importFundid&&this.importFundid!=='ALL')&&(params.importFundid=this.importFundid);
            $.post({
                url: '/businessMgmt/IPOMgmtOCReview/transferWhitelist/tableData.ajax ',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        if (result.data.length === 0) {
                            this.tableData = []
                        } else {
                            this.tableData = result.data
                        }
                    }
                    else {
                        this.showDialog('', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },
        showAddDialog: function() {
            if(this.updateId || this.deleteId){
                this.updateId = '';
                this.deleteId = '';
                this.exportFundid_dialog = '';
                this.importFundid_dialog = '';
            }
			this.showDialog('', 'addDlg');
		},
		checkDialog: function() {
            if (!this.exportFundid_dialog) {
				this.showDialog('addDlg', 'info', true, '请填写转出产品代码！');
				return false;
			}
			if (!this.importFundid_dialog) {
				this.showDialog('addDlg', 'info', true, '请填写转入产品代码！');
				return false;
			}
			return true;
		},
        addSave: function() {
			if (!this.checkDialog()) return;
			var params = {};
            params.exportFundid = this.exportFundid_dialog;
            params.importFundid = this.importFundid_dialog;
			// this.updateId && (params.id = this.productId_dialog);

			var url = this.updateId ? '/update.ajax' : '/add.ajax';
			var _this = this;
			$.post({
				url: '/businessMgmt/IPOMgmtOCReview/transferWhitelist' + url,
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
			this.deleteId = item.serialno;
            this.serialno_dialog = item.serialno;
            this.exportFundid_dialog = item.exportFundid;
            this.importFundid_dialog = item.importFundid;
			this.showDialog('', 'deleteDialog');
		},
		deleteData: function() {
			var _this = this;
            var params = {};
            params.serialno = this.serialno_dialog;
            params.exportFundid = this.exportFundid_dialog;
            params.importFundid = this.importFundid_dialog;
			$.post({
				url: '/businessMgmt/IPOMgmtOCReview/transferWhitelist/delete.ajax',
				// data: {productId: this.deleteId},
                data: params,
				success: function(result) {
					if (result.error === 0) {
						_this.getTableData();
						_this.showDialog('deleteDialog', 'info', false, result.msg);
					} else {
						_this.showDialog('deleteDialog', 'info', true, result.msg);
					}
				}
			});
		},
		
    },
    filters: {
        
    }
});