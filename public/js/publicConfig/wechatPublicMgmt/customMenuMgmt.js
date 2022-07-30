new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        tableData: [],
        diaMsg: '',
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        pageMaxNum: 10,
        condition: '',
        pkeys: "",
        versions:"",
        // 新增参数
        weixinSystem:"1",
        version:"", 
        show:false,
        // tableDateList:[],
        checkDate:[],
    },
    created: function () {
    },
    computed: {
        //主表格分页
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
        pageMaxNum: function () {
            this.currentIndex = 0;
        },
        condition: function () {
            this.currentIndex = 0;
        }
    },
    mounted: function () {
        var _this = this;
        var dialogs = ['delete', 'info', 'operate', 'revise'];
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
        this.getTableData();
        // _this.tableData.forEach(function(item){
        //     if( _this.tableData.length>0&&(item.sub_button!=""||item.sub_button!=null)){
        //         $('.noDisabled').attr("disabled","disabled").css("background-color","fff");
        //     }
        // })
    },
    methods: {
        getTableData: function (currentIndex) {
            var _this = this;
            var params = {};
            this.currentIndex= 0;
            params.weixinSystem=this.weixinSystem;
            console.log(params)
            $.post({
                url: '/publicConfig/wechatPublicMgmt/customMenuMgmt/getTableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.currentIndex = 0;
                        _this.tableData = result.data.tableData;
                        console.log(_this.tableData)
                    }
                    else {
                        _this.tableData = [];
                        _this.currentIndex = 0;
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        // 切换账号
        getDate:function(){
            var _this=this;
            _this.getTableData(0)
        },
        // 主菜单不能超过3个
        addList:function(){
            var _this=this;
            this.show=true;

            _this.tableData.push({
                type:"view",
                name:"",
                key:"",
                url:"",
                appid:"",
                pagepath:"",
                sub_button:[]
            })
            _this.tableData.forEach(function(item){
                item.noDisabled=false
            })

        },
        // 子菜单添加-不能超过5个
        addSubMenu:function(item){
            var _this=this;
            _this.show=true;
            item.type="view";
            item.url="";
            item.key="";
            // $('.noDisabled').removeAttr("disabled").css("backgroundColor","#fff");
            item.sub_button.push({
                name:"",
                type:"view",
                url:"",
                key:'',
            })
            _this.tableData.forEach(function(item){
                item.noDisabled=false
            })

        },
        // 主菜单选择选择类型
        checkType:function(type,item){
          var _this=this;
          if(type=="view"){
              return item.key="";
          }
            if(type=="click"){
                return item.url="";
            }
        },
        // 主菜单里面-子菜单选择类型
        checkSubType:function(subType,subItem){
            var _this=this;
            if(subType=="view"){
                return subItem.key="";
            }
            if(subType=="click"){
                return subItem.url="";
            }
        },
        // 修改数据
        // 修改里面删除某个数据
        delList: function (indexs, index) {
            var _this=this;
            console.log(indexs)
            console.log(index)
            console.log(this.tableData)
            _this.show=true;
            _this.tableData.forEach(function(item){ //添加一个默认值：type
                item.type="view";
                item.noDisabled=false;
            })
            _this.tableData[index].sub_button.splice(indexs, 1)
        },
        showUpdate:function (item) {
            var _this=this;
            _this.show=true;
            // $('.noDisabled').removeAttr("disabled").css("background-color","#fff");
            _this.tableData.forEach(function(item){
                item.noDisabled=false;
            })
            this.showDialog('', 'revise');
        },
        // 取消修改
        cancel:function(){
            var _this=this;
            _this.show=false;
            // $('.noDisabled').attr("disabled","disabled").css("background-color","#eee");
        },

        update: function () {
            var _this = this;
            // var reg=/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
            _this.tableData.map(function(item){
                return {
                    type:item.type,
                    name:item.name,
                    key:item.key,
                    url:item.url,
                    appid:item.appid,
                    pagepath:item.pagepath
                },
                item.sub_button.map(function(subitem){
                    return {
                        name: subitem.name,
                        type: subitem.type,
                        url: subitem.url,
                        key:subitem.key,
                    }
                })
            })
            // _this.tableData.forEach(function(item){
            //     item.sub_button.forEach(function(subitem){
            //         if(!reg.test(subitem.url)){
            //             return _this.showDialog('', 'info', true, '这网址不是以http://https://开头，或者不是网址');
            //         }
            //     })
            // })

                console.log(_this.tableData)
                var menuButtonList=JSON.stringify(_this.tableData);
                var weixinSystem=this.weixinSystem;
            if (_this.diaInfoCheck()) {
                $.post({
                    url: '/publicConfig/wechatPublicMgmt/customMenuMgmt/update.ajax',
                    data: {
                        menuButtonList: JSON.stringify(menuButtonList),
                        weixinSystem: weixinSystem
                    },
                    success: function (result) {
                        if (result.error === 0) {
                            _this.getTableData(0);
                            _this.show = false;
                            // $('.noDisabled').attr("disabled","disabled").css("background-color","#eee");
                            _this.showDialog('', 'info', false, result.msg);
                        }
                        _this.showDialog('', 'info', false, result.msg);
                    }
                });
            }
        },
        // 非空验证
        diaInfoCheck:function(){
            var _this=this;
            _this.checkDate=_this.tableData;
            console.log("checkDate",_this.checkDate)
            for(var i=0 ;i<_this.checkDate.length; i++){
                if(_this.checkDate[i].sub_button==""){
                    if (_this.checkDate[i].type== "view"&&(_this.checkDate[i].url==null||_this.checkDate[i].url=="")) {
                        console.log(333)
                        _this.showDialog('', 'info', true, "主菜单跳转关键字 or URL不能为空");
                        return false;
                    }
                    if (_this.checkDate[i].type== "click"&&(_this.checkDate[i].key==null||_this.checkDate[i].key=="")) {
                        console.log(444)
                        _this.showDialog('', 'info', true, "主菜单跳转关键字 or URL不能为空");
                        return false;
                    }
                    return true;
                }else{
                    for(var j=0 ;j<_this.checkDate[i].sub_button.length; j++){
                        if (_this.checkDate[i].sub_button[j].type == "view" &&(_this.checkDate[i].sub_button[j].url == ""||_this.checkDate[i].sub_button[j].url ==null)) {
                            _this.showDialog('', 'info', true, "子菜单跳转关键字 or URL不能为空");
                            return false;
                        }
                        if (_this.checkDate[i].sub_button[j].type == "click" &&(_this.checkDate[i].sub_button[j].key == ""||_this.checkDate[i].sub_button[j].key == null)) {
                            _this.showDialog('', 'info', true, "子菜单跳转关键字 or URL不能为空");
                            return false;
                        }
                    }
                }
            }
            return true;
        },
        // 删除
        showDelete: function(item) {
            this.system = item.system;
            this.pkey = item.pkey;
            this.version = item.version;
            this.showDialog('', 'delete');
        },
        del: function() {
            var _this = this;
            var params = {};
            params.system = this.system
            params.pkey = this.pkey
            params.version = this.version
            $.post({
                url: '/publicConfig/wechatPublicMgmt/systemConfigMgmt/deleteParam.ajax',
                data: params,
                success: function(result) {
                    if (result.error === 0) {
                        _this.getTableData();
                        _this.showDialog('delete', 'info', false, result.msg);
                    } else {
                        _this.showDialog('delete', 'info', true, result.msg);
                    }
                }
            });
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
        //公共方法
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
        }
    },
    filters:{
        system: function (item) {
            if (item) {
                return item.replace(/0/g, '公用类型').replace(/1/g, '官方微信').replace(/2/g, '添富汇微信')
            }
        },
        enable: function (item) {
            if (item) {
                return item.replace(/0/g, '不可用').replace(/1/g, '可用')
            }
        },
    }
});