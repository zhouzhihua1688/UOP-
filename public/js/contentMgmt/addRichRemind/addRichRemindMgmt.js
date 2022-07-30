
var vm = new Vue({
    el: '#content',
    data: function () {
        return {
            tableData: [],
            currentIndex: 0,
            maxSpace: 5,
            totalPage: 0,
            pageMaxNum: 10,
            condition: "",
            diaMsg: '',
			modifyStatus:'0',
        	//新增添加字段
			operateData:{
				branchCodeList:[],
				content:'',
				createTime:'',
				startDate:'',
				endDate:'',
				url:'',
			},
			initData:{
				branchCodeList:[],
				content:'',
				createTime:'',
				startDate:'',
				endDate:'',
				url:'',
			},
			tableSearch:{
				startDate:'',
				endDate:'',
				branchCodeList:'',
				pageNum:1,
				pageSize:10,
			},
			branchList:[],
			deleteId:'',
			baseUrl:'/contentMgmt/addRichRemind/addRichRemindMgmt'	,
			searchContent:'',//名称查询
			shelfStatus :'0', //上架状态  shelfStatus (string, optional): 上架状态 1-上架 0-下架 ,		
        }
    },
    mounted: function () {
        var dialogs = ['info', 'del','add'];
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
		$('#queryBranch').css({
			'width': '184px'
		}).select2({
				closeOnSelect: false
		})
		$("#queryBranch").on("select2:close", function (e) {
			var value = $("#queryBranch").val();
			if (value && value.length > 1 && value.includes('-1')) {
				value=['-1']
				$("#queryBranch").val(value).trigger('change')
			}
			if (value && value.length > 1 && value.includes('00')) {
				value=['00']
				$("#queryBranch").val(value).trigger('change')
			}
			
			// e 的话就是一个对象 然后需要什么就 “e.参数” 形式 进行获取
			this.tableSearch.branchCodeList = $("#queryBranch").val() ? $("#queryBranch").val().join(',') : ''
		}.bind(this));
		$('#dialogBranch').css({
			'width': '184px'
		}).select2({
				closeOnSelect: false
		})
		$("#dialogBranch").on("select2:close", function (e) {
			var value = $("#dialogBranch").val();
			if (value && value.length > 1 && value.includes('-1')) {
				value=['-1']
				$("#dialogBranch").val(value).trigger('change')
			}
			if (value && value.length > 1 && value.includes('00')) {
				value=['00']
				$("#dialogBranch").val(value).trigger('change')
			}
				// e 的话就是一个对象 然后需要什么就 “e.参数” 形式 进行获取
			this.operateData.branchCodeList = $("#dialogBranch").val() ? $("#dialogBranch").val() : []
		}.bind(this));
        this.getTableData(0);
		this.getBranchList();
    },
    computed: {
		pageList: function () {
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
        pageMaxNum: function () {
			this.getTableData(0);
		},
		condition: {
            handler: function (val, oldval) {
                this.currentIndex= 0;
            }
        },
    },
    methods: {
        // 主表格数据
        getTableData: function (currentIndex) {
            this.tableSearch.pageNum = currentIndex+1;
			this.tableSearch.pageSize = this.pageMaxNum;
			var params = JSON.parse(JSON.stringify(this.tableSearch));
			params.startDate = params.startDate.replace(/-/g,'');
			params.endDate = params.endDate.replace(/-/g,'');
			params.content=this.searchContent;
            $.post({
                url: this.baseUrl+'/getTableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.currentIndex = currentIndex;
						this.totalPage = Math.ceil(result.data.total / this.tableSearch.pageSize);
                        this.tableData = result.data.rows;
                    }else {
                        this.tableData = [];
                        this.currentIndex = 0;
                        this.showDialog('', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },
		// 获取渠道权限列表
		getBranchList: function () {
			$.post({
				url: this.baseUrl+'/getbranchList.ajax',
				success: function (result) {
					if (result.error === 0) {
						this.branchList = result.data;
						this.branchList.unshift({
							branchCode: '-1',
							branchFullName: '均无权限'
						})
						this.branchList.unshift({
							branchCode: '00',
							branchFullName: '全部'
						})
						// setTimeout(function(){
						// 	$("#queryBranch").val(['00']).trigger('change')
						// },0)
					} 
				}.bind(this)
			});
		},
		setData:function(item){
			if(item){
				this.operateData = JSON.parse(JSON.stringify(item));
				this.operateData.branchCodeList = this.operateData.branchCodeList.map(function(item){
					return item.branchCode
				})
				this.operateData.createTime = moment(this.operateData.createTime).format('YYYY-MM-DD HH:mm:ss');
				this.operateData.startDate = moment(this.operateData.startDate).format('YYYY-MM-DD');
				this.operateData.endDate = moment(this.operateData.endDate).format('YYYY-MM-DD');
			}else{
				this.operateData = JSON.parse(JSON.stringify(this.initData));
				this.operateData.createTime = moment(new Date().getTime()+5*60*1000).format('YYYY-MM-DD HH:mm:ss');  // bug39391，生成时间向后推5分钟
				this.operateData.startDate = moment(new Date().getTime()).format('YYYY-MM-DD');
				this.operateData.endDate = moment(new Date().getTime()).format('YYYY-MM-DD');
				this.operateData.branchCodeList = (this.branchList&&this.branchList)?[this.branchList[0].branchCode]:'';  // bug39500，新建dialog里渠道默认为全部00
			}
			$('#dialogBranch').val(this.operateData.branchCodeList).trigger('change');
		},
        // 新增修改弹窗
        showAdd:function(){
			this.modifyStatus = '0'
            this.shelfStatus = '0';  // 20220615，新建dialog里，上架状态默认为关闭
			this.setData();
            this.showDialog('', 'add');
        },
        // 新增必填弹框
        diaInfoCheck: function () {
            if (!this.operateData.content) {
                this.showDialog('add', 'info', true, '提醒内容不能为空');
                return false;
            }
			if (!this.operateData.createTime) {
                this.showDialog('add', 'info', true, '生成时间不能为空');
                return false;
            }
			if (!this.operateData.startDate) {
                this.showDialog('add', 'info', true, '开始时间不能为空');
                return false;
            }
			if (!this.operateData.endDate) {
                this.showDialog('add', 'info', true, '结束时间不能为空');
                return false;
            }
            if ((new Date(this.operateData.startDate)).getTime() > (new Date(this.operateData.endDate)).getTime()) {
                this.showDialog('add', 'info', true, '开始时间大于结束时间');
                return false;
            }
            // bug39393，修改提醒，不再检验生成时间是否晚于当前时间；新增弹窗还要校验
            if(this.modifyStatus=='0' && new Date(this.operateData.createTime).getTime()<new Date().getTime()){
            	this.showDialog('add', 'info', true, '请重新选择生成时间');
                return false;
            }

            return true;
        },
        add:function(){
            var _this=this;
            let url='';
            if(this.modifyStatus=='0'){
               url=this.baseUrl+'/add.ajax'
            }else{
               url=this.baseUrl+'/update.ajax'
            }
            if (this.diaInfoCheck()) {
				var params = JSON.parse(JSON.stringify(this.operateData));
				params.branchCodeList = params.branchCodeList.map(function(item){
					return {branchCode:item}
				})
				params.startDate = params.startDate.replace(/-/g,'');
				params.endDate = params.endDate.replace(/-/g,'');
				params.createTime = new Date(params.createTime).getTime();
				params.shelfStatus=_this.shelfStatus;  //上架状态
                $.post({
                    url,
                    data:params,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.getTableData(0);
                            _this.showDialog('add', 'info', false, result.msg);
                        }else {
                            _this.showDialog('add', 'info', true,result.msg);
                        }
                    }
                });
            }
        },

         // 修改数据
        showUpdate:function (item) {
			this.modifyStatus=1;
			this.shelfStatus=item.shelfStatus;
            this.setData(item);
            this.showDialog('', 'add');
        },
             // 删除
        showDelete: function(item) {
            this.deleteId = item.serialNo;
            this.showDialog('', 'del');
        },
        del: function() {
                var _this = this;
                var params = {};
                params.serialno = this.deleteId;
                $.post({
                    url: this.baseUrl+'/del.ajax',
                    data: params,
                    success: function(result) {
                        if (result.error === 0) {
                            _this.getTableData(0);
                            _this.showDialog('del', 'info', false, result.msg);
                        } else {
                            _this.showDialog('del', 'info', true, result.msg);
                        }
                    }
                });
		},
		 // 添加弹窗里选择上架状态
		 changeAddStatus() {
			var _this = this;
            if (_this.shelfStatus == '0') {
                _this.shelfStatus = '1'
            } else {
                _this.shelfStatus = '0'
            }
        },
		// 鼠标放至物料包状态右侧的注释按钮上时
        showTips() {
            // this.showTipText=true;
            $("#showTipText").show()
        },
        showLeave() {
            // this.showTipText=false;
            $("#showTipText").hide()
		},
		//上架状态
        changeStatus(item, index) {
            console.log(item);
            var _this = this;
            //ajax后执行
            if (this.tableData[index].shelfStatus == '1') {
                this.$set(this.tableData[index], 'shelfStatus', '0')
                _this.switchUpdate(item.serialNo, this.tableData[index].shelfStatus);
            } else {
                this.$set(this.tableData[index], 'shelfStatus', '1')
                _this.switchUpdate(item.serialNo, this.tableData[index].shelfStatus);
            }
		},
		// 弹窗列表修改发布的状态-开关
        switchUpdate(serialno, shelfStatus) {
            var _this = this;
            var params = {};
            params.serialno = serialno;
            params.shelfStatus = shelfStatus;
            console.log(params);
            $.post({
                url: this.baseUrl+'/switchUpdate.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        // _this.getTableData(_this.currentIndex);
						// _this.page1.tableData = result.data;
						_this.showDialog('', 'info', false, result.msg);
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        //主表格分页方法
        prev: function () {
			if (this.currentIndex <= 0) {
				return;
			}
			this.getTableData(this.currentIndex - 1);
		},
		next: function () {
			if (this.currentIndex >= this.totalPage - 1) {
				return;
			}
			this.getTableData(this.currentIndex + 1);
		},
		changeIndex: function (index) {
			this.getTableData(index - 1);
		},
		toFirst: function () {
			this.getTableData(0);
		},
		toLast: function () {
			this.getTableData(this.totalPage - 1);
		},
        showDialog: function (dia1, dia2, callback, msg) {
            if (msg) {
                this.diaMsg = msg;
            }
            else {
                msg = '输入条件错误';
            }
            if (!dia1) {
                $('#' + dia2).modal('show');
            }
            else if (!dia2) {
                $('#' + dia1).modal('hide');
            }
            else if (!callback) {
                $('#' + dia1).on("hidden.bs.modal", function () {
                    $('#' + dia2).modal('show');
                    $('#' + dia1).off().on("hidden", "hidden.bs.modal");
                });
                $('#' + dia1).modal('hide');
            }
            else {
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
		tableBrachCodeTranfer:function(val){
			if(val&&Array.isArray(val)&&val.length>0){
				var branchCodeList = val.map(function(item){
					return item.branchCode
				},this)
				var str="";
				this.branchList.forEach(function(item){
					branchCodeList.forEach(function(citem){
						if(item.branchCode==citem){
							str+=item.branchFullName+','
						}
					})
				})
				str = str.substring(0,str.length-1);
				return str
			}else{
				return '-'
			}
		}
    },
    components: {
        'date-picker': VueBootstrapDatetimePicker
    },
	filters:{
		tableTimeTransfer:function(val){
			if(val){
				return moment(val).format('YYYY-MM-DD')
			}else{
				return '-'
			}
		},
		
	}
});