
var vm = new Vue({
    el: '#content',
    data: function () {
        return {
  
            tableData: [],
            tagClassify:[],  //查询字段标签分类
            currentIndex: 0,
            maxSpace: 5,
            totalPage: 0,
            pageMaxNum: 10,
            diaMsg: '',
            loadingShow: false,  //loading动画
            showText:'数据加载中...',
            
			// 查询字段
			serachTagCategoryId:'',
        	//新增添加字段
            modifyStatus:'',
            tagCategoryId:'',//标签分类id
            tagId :'',   //标签id
            tagName :'', //标签名称
            updateId:'',
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
        }).next().on(ace.click_event, function () {
            $(this).prev().focus();
        });
        this.getTableData(0);

        // 获取查询条件标签分类
        var _this=this;
        $.post({
            url: '/contentMgmt/tagMgmt/tagContentMgmt/getTagClassify.ajax',
            // data: params,
            success: function (result) {
                if (result.error === 0) {
                    _this.tagClassify = result.data.body.rows;
                    console.log( result.data.body.rows);
                }else {
                    _this.tagClassify = [];
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });
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
     
    },
    methods: {
        // 主表格数据
        getTableData: function (currentIndex) {
            var _this = this;
            var params = {};
            // this.currentIndex= 0;
            params.pageNo = currentIndex + 1;
            params.pageSize = this.pageMaxNum;
            params.tagCategoryId=this.serachTagCategoryId;
            console.log(params)
            $.post({
                url: '/contentMgmt/tagMgmt/tagContentMgmt/getTableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        // _this.currentIndex = 0;
                        _this.tableData = result.data.body.rows;
                        _this.currentIndex = currentIndex;
                        _this.totalPage = Math.ceil(result.data.body.total / params.pageSize);
                        console.log( result.data.body.rows);
                    }else {
                        _this.tableData = [];
                        _this.currentIndex = 0;
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        // 新增修改弹窗
        showAdd:function(){
           this.modifyStatus=0;  //弹出新增弹窗
           this.tagCategoryId=this.serachTagCategoryId;
           this.tagId='';
           this.tagName='';
           this.updateId='';
           this.showDialog('', 'add');
        },
        // 新增必填弹框
        diaInfoCheck: function () {
            var _this = this;
            if (!this.tagCategoryId) {
                this.showDialog('add', 'info', true, '标签分类ID不能为空');
                return false;
            }
			// 兼容乱填tagCategoryId的脏数据
			if(this.tagCategoryId&&!this.tagClassify.some(function(item){
				console.log(item.tagCategoryId,this.tagCategoryId);
				return item.tagCategoryId == this.tagCategoryId
			}.bind(this))){
				this.showDialog('add', 'info', true, '标签分类ID不能为空');
                return false;
			}
            if (!this.tagName) {
                this.showDialog('add', 'info', true, '标签名称不能为空');
                return false;
            }
            return true;
        },
        add:function(){
            var _this=this;
            let url='';
            if(!this.updateId){
               url='/contentMgmt/tagMgmt/tagContentMgmt/add.ajax'
            }else{
               url='/contentMgmt/tagMgmt/tagContentMgmt/update.ajax'
            }
            if (this.diaInfoCheck()) {
                var params={}
                params.tagCategoryId=this.tagCategoryId;
                this.tagId&&(params.tagId=this.tagId);
                params.tagName=this.tagName;
                $.post({
                    url:url,
                    data:params,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.getTableData(0);
                            _this.showDialog('add', 'info', false, result.msg);
                        }else {
                            _this.showDialog('add', 'info', false,result.msg);
                        }
                    }
                });
            }
        },

         // 修改数据
         showUpdate:function (item) {
            var _this=this;
            _this.modifyStatus=1;
            _this.updateId=item.tagId;
            _this.tagCategoryId=item.tagCategoryId;
            _this.tagId=item.tagId;
            _this.tagName=item.tagName;
            this.showDialog('', 'add');
        },
             // 删除
        showDelete: function(item) {
            this.tagId = item.tagId;
            this.showDialog('', 'del');
        },
        del: function() {
                var _this = this;
                var params = {};
                params.tagId = this.tagId;
                $.post({
                    url: '/contentMgmt/tagMgmt/tagContentMgmt/deleteParam.ajax',
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
        transformTime(createTime) {
            let date = new Date(Number(createTime));
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let h = date.getHours()
            let i = date.getMinutes()
            let s = date.getSeconds();
            month = month < 10 ? '0' + month : month;
            day = day < 10 ? '0' + day : day;
            if (h < 10) {
                h = '0' + h;
            }
            if (i < 10) {
                i = '0' + i;
            }
            if (s < 10) {
                s = '0' + s;
            }
            let dateT = year + '-' + month + '-' + day + " " + h + ':' + i + ':' + s
            return dateT
        }
    },
    components: {
        'date-picker': VueBootstrapDatetimePicker
    },
});