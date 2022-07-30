new Vue({
	el: '#content',
	data: {
			// 主页面相关数据
			tableData: [],
			diaMsg: '',
			imageDesc: '', //查询

			// 新增
			operateData:{
				imageDesc:'',//描述
				url:'',//上传后index页面地址
				imagePath:'',//转换位图片后存储的相对路径
				expiryDate:'',//失效时间
				zipPath:''//文件地址
			},
			uploadSuccessed:false,//选择后是否上传
			isUpdate:false,
			deleteinfo: {},
			//主表格分页数据
			currentIndex: 0,
			maxSpace: 5,
			totalPage: 0,
			pageMaxNum: 10,
			condition: "",
	},
	created: function () {
		this.getTableData();
	},
	mounted: function () {
			var dialogs = ['info', 'addNotice', 'changeNotice', 'deleteDialog','checkFiles'];
			var _this = this;
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
			$('#uploadBtn').click(function () {
				$('#uploadFileInput').click();
		});
	},
	computed: {
			//主表格假分页
		middleData: function () {
				var middleData = [];
				var filterData = [];
				var pageMaxNum = parseInt(this.pageMaxNum);
				var _this = this;
				this.tableData.forEach(function (jsonObj) {
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
			// 假分页
			pageMaxNum: {
				handler: function (val, oldval) {
						this.currentIndex= 0;
						}
				},
				condition: {
						handler: function (val, oldval) {
								this.currentIndex= 0;
						}
				},
	},
	methods: {
			getTableData: function () {
					var params = {};
					this.imageDesc&&(params.imageDesc = this.imageDesc);
					$.post({
							url: '/publicConfig/automatedTool/webPicGenerator/getList.ajax',
							data: params,
							success: function (result) {
								if (result.error === 0) {
									this.tableData = result.data;
								}
								else {
										this.tableData = [];
										this.currentIndex = 0;
										this.totalPage = 0;
										this.showDialog('', 'info', false, result.msg);
								}
							}.bind(this)
					});
			},
			addDialog: function () {
				var _this = this; 
				this.uploadSuccessed = false;
				$('#uploadFileInput').on('change', function () {
					_this.uploadSuccessed = false;
					$('#uploadInput').val($(this).val());
				});
				this.setData();
				this.isUpdate = false;
				this.showDialog('', 'addNotice', false);
			},
			add: function () {
					if (this.operateData.imageDesc == '') {
							this.showDialog('addNotice', 'info', true, '请填写描述');
							return;
					}
					if(!this.uploadSuccessed){
						this.showDialog('addNotice', 'info', true, '请上传文件');
						return;
					}
					var param = Object.assign({},this.operateData);
					if(param.expiryDate){
						param.expiryDate = param.expiryDate.replace(/-/g,'')
					}
					$.post({
							url: '/publicConfig/automatedTool/webPicGenerator/dataAdd.ajax',
							data: param,
							success: function (result) {
									if (result.error === 0) {
										this.getTableData()
											this.showDialog('addNotice', 'info', false, result.msg);
									} else {
											this.showDialog('addNotice', 'info', true, result.msg);
									}
							}.bind(this)
					});
			},
			setData:function(item){
				if(item){
					for(var keys1 in this.operateData){
						this.operateData[keys1] = item[keys1]
					}
					this.operateData.expiryDate&&(this.operateData.expiryDate = moment(this.operateData.expiryDate).format('YYYY-MM-DD'))
					$('#uploadInput').val(item.zipPath ? item.zipPath : '');
				}else{
					for(var keys in this.operateData){
						this.operateData[keys] = ''
					}
					$('#uploadInput').val('');
				}
			},
			// 删除部分
			deleteDialog: function (item) {
					this.deleteinfo.url = item.url;
					this.deleteinfo.fileName = item.imagePath? item.imagePath.split('/')[0] : '';
					this.showDialog("", "deleteDialog")
			},
			deleteData: function () {
					var params = Object.assign({},this.deleteinfo);
					var _this = this;
					$.post({
							url: '/publicConfig/automatedTool/webPicGenerator/dataDelete.ajax',
							data: params,
							success: function (result) {
									if (result.error == 0) {
											_this.showDialog('deleteDialog', 'info', false, '删除成功');
											_this.getTableData()
									} else {
											_this.showDialog('deleteDialog', 'info', false, '删除失败');
									}
							}
					});
			},
			// 修改部分
			showView: function (item) {
				var _this = this;
				this.uploadSuccessed = true;
				$('#uploadFileInput').on('change', function () {
					_this.uploadSuccessed = false;
					$('#uploadInput').val($(this).val());
				});
				this.setData(item);
				this.isUpdate = true;
				this.showDialog('', 'addNotice', false);
			},
			// 检查是否有同名文件
			checkFile:function(){
				if (!$('#uploadFileInput').val()) {
					this.showDialog('addNotice', 'info', true, '请选择要上传的文件');
					return false;
				}
				if(!/(.+(?=[.zip]$))/.test($('#uploadFileInput').val())){
						this.showDialog('addNotice', 'info', true, '请上传格式为zip的压缩文件');
						return false;
				}
				var uploadFileName = $('#uploadFileInput')[0].files[0].name;
				var formatFileName = uploadFileName?uploadFileName.substring(0,uploadFileName.lastIndexOf('.')):'';
				$.post({
					url: '/publicConfig/automatedTool/webPicGenerator/checkFile.ajax',
					data: {fileName:formatFileName},
					success: function (result) {
							console.log(result);
							if (result.error === 0) {
									if(result.data == '1'){//1表示存在
										this.showDialog('addNotice', 'checkFiles', true, result.msg);
									}else{
										this.fileUpload();
									}
							} else {
									this.showDialog('addNotice', 'info', true, result.msg);
							}
					}.bind(this)
				});
			},
			checkConfirm:function(){
				this.fileUpload();
			},
			// 上传
			fileUpload: function () {
					if (!$('#uploadFileInput').val()) {
						this.showDialog('addNotice', 'info', true, '请选择要上传的文件');
						return false;
					}
					if(!/(.+(?=[.zip]$))/.test($('#uploadFileInput').val())){
							this.showDialog('addNotice', 'info', true, '请上传格式为zip的压缩文件');
							return false;
					}
					if(this.isUpdate){
						var uploadFileName = $('#uploadFileInput')[0].files[0].name;
						var formatFileName = uploadFileName?uploadFileName.substring(0,uploadFileName.lastIndexOf('.')):'';
						var currentFileName = this.operateData.imagePath.split('/')[0];
					
						if(formatFileName!=currentFileName){
							this.showDialog('addNotice', 'info', true, '请上传同名的压缩文件覆盖');
							return false;
						}
					}
					this.uploadSuccessed = false;
					$.ajaxFileUpload({
							url: "/publicConfig/automatedTool/webPicGenerator/upLoad.ajax",
							type: 'POST',
							dataType: 'json',
							fileElementId: 'uploadFileInput',
							success: function (result) {
								$('#uploadFileInput').val('');
								$('#uploadInput').val('');
								if (result.error == 0) {
										this.uploadSuccessed = true;
										this.operateData.url = result.data.requestUrl;
										this.operateData.zipPath = result.data.filePath;
										var fileName = result.data.fileName;
										fileName = fileName.substring(0,fileName.lastIndexOf('.'));
										this.operateData.imagePath = fileName+'/index.png';
										$('#uploadInput').val(result.data.filePath);
								}
								this.showDialog('addNotice', 'info', true, result.msg);
							}.bind(this)
					});
			},
			downloadFile: function (item) {
					if (item) {
							var fileName = item.imagePath? item.imagePath.split('/')[0] : '';
							url = '/publicConfig/automatedTool/webPicGenerator/downloadFile.ajax?fileName=' + fileName;
							window.location.href = url;
					}
			},
			showDialog: function (dia1, dia2, callback, msg) {
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
		}
	},
	components: {
		'date-picker': VueBootstrapDatetimePicker
	},
	filters:{
		timeFormat(val){
			if(val){
				return moment(val).format('YYYY-MM-DD')
			}else{
				return val
			}
		}
	}
});