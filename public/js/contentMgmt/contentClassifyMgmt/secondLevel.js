
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
            loadingShow: false,  //loading动画
            showText:'数据加载中...',
            // 查询字段
            searchId:'',//查询字段-一级分类
            categoryIdList:[], //获取分类idList
            
        //新增添加字段
            firstCategoryId:'',//一级分类id-地址传过来的
            categoryId:'',  //分类ID
            categoryName:'', //分类名称   
            modifyStatus:'',
            tagCategoryId:'',////标签分类id
            tagCategoryName:'', //标签分类名称
            parentCategoryId:'',
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
        
        // 获取一级分类ID
        var _this=this;
        _this.parentCategoryId=this.getUrlParam("categoryId");
        console.log(_this.categoryId);
        $.post({
            url: '/contentMgmt/contentClassifyMgmt/secondLevel/getCategoryIdList.ajax',
            // data: params,
            success: function (result) {
                if (result.error === 0) {
                    _this.categoryIdList=result.data.body.ncmsContentCategoryConfigList;  //获取一级list列表
                    for(var i=0;i< _this.categoryIdList.length;i++){
                        if(_this.parentCategoryId==_this.categoryIdList[i].categoryId){
                            _this.searchId=_this.categoryIdList[i].categoryId;        //一级分类跳转二级选中查询条件
                        }
                    }
                }else {
                    _this.categoryIdList = [];
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });
        if(this.parentCategoryId){
            _this.searchId=_this.parentCategoryId;
            this.getTableData(0);
        }      
    },
    computed: {
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
    },
    watch: {
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
        // 主表格数据
        getTableData: function (currentIndex) {
            var _this = this;
            var params = {};
            this.currentIndex= 0;
            // params.pageNo = currentIndex + 1;
            // params.pageSize = this.pageMaxNum;
            if(!_this.searchId){
                _this.showDialog('', 'info', false, '请输入查询条件');
                return false;
            }
            params.parentCategoryId=_this.searchId?_this.searchId:_this.parentCategoryId;
            console.log(params);
            $.post({
                url: '/contentMgmt/contentClassifyMgmt/secondLevel/getTableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.currentIndex = 0;
                        _this.tableData = result.data.body.ncmsContentCategoryConfigList;
                        console.log( _this.tableData);
                        // _this.currentIndex = currentIndex;
                        // _this.totalPage = Math.ceil(result.data.body.total / params.pageSize);
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
           var _this=this;
           _this.modifyStatus=0;  //弹出新增弹窗
        //    _this.parentCategoryId=_this.parentCategoryId;
           _this.parentCategoryId='';
           _this.categoryId='C';
           _this.categoryName='';
           _this.updateId='';
           _this.showDialog('', 'add');
        },
        // 新增必填弹框
        diaInfoCheck: function () {
            var _this = this;
            if (!this.parentCategoryId) {
                this.showDialog('add', 'info', true, '一级分类ID不能为空');
                return false;
            }
            if (!this.categoryId) {
                this.showDialog('add', 'info', true, '分类ID不能为空');
                return false;
            }
            if (!/(^C[0-9]{6})$/.test(this.categoryId)) {
                this.showDialog('add', 'info', true, '分类ID格式错误，应以T开头后面6位数字');
                return false;
            }
            if (!this.categoryName) {
                this.showDialog('add', 'info', true, '分类名称不能为空');
                return false;
            }
            return true;
        },
        add:function(){
            var _this=this;
            let url='';
            var params={}
            if(!this.updateId){
               url='/contentMgmt/contentClassifyMgmt/secondLevel/add.ajax'
            }else{
               url='/contentMgmt/contentClassifyMgmt/secondLevel/update.ajax'
            }
            if (this.diaInfoCheck()) {
                params.categoryDepth=2; //二级分类
                params.categoryId=this.categoryId;
                params.categoryName=this.categoryName;
                params.parentCategoryId=_this.parentCategoryId;
                console.log(params);
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
            _this.updateId=item.categoryId;
            _this.categoryId=item.categoryId;
            _this.categoryName=item.categoryName;
            _this.parentCategoryId=item.parentCategoryId;
            this.showDialog('', 'add');
        },
             // 删除
        showDelete: function(item) {
            this.categoryId = item.categoryId;
            this.showDialog('', 'del');
        },
        del: function() {
                var _this = this;
                var params = {};
                params.categoryId = this.categoryId;
                console.log(params);
                $.post({
                    url: '/contentMgmt/contentClassifyMgmt/secondLevel/deleteParam.ajax',
                    data: params,
                    success: function(result) {
                        if (result.error === 0) {
                            _this.getTableData();
                            _this.showDialog('del', 'info', false, result.msg);
                        } else {
                            _this.showDialog('del', 'info', false, result.msg);
                        }
                    }
                });
        },
  
       // 地址传入
        getUrlParam: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg); //匹配目标参数
            if (r != null) return unescape(r[2]);
            return ''; //返回参数值
        },
           // 跳转到三级分类
        toThreeLevel:function(item){
            window.location.href="/contentMgmt/contentClassifyMgmt/threeLevel.html?parentCategoryId="+item.parentCategoryId+'&categoryId='+item.categoryId; 
        },
  
        //主表格分页方法
        prev: function () {
            this.currentIndex<= 0 ? 0 : this.currentIndex--;
        },
        next: function () {
            this.currentIndex>= this.middleData.length - 1 ? this.middleData.length - 1 : this.currentIndex++;
        },
        changeIndex: function (index) {
            this.currentIndex= index - 1;
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