
new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        tableData: [],
        diaMsg:'',
        tagid:'',
        tagnm:'',
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10,
        condition: "",
        // 详细属性列表
        detailList:[],
        serialno:'',
        tagvalue:'',
        tagdesc:'',
        // 详细属性里批量删除
        tagValueList:[],
         // 全选
        allCheck: false,
    },
    mounted: function () {
        var dialogs = ['info','add', 'del', 'revise','detail','modify','delete','putAdd','delete2'];
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
        this.getTableData(0);
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
    },
    watch: {
        // pageMaxNum: function () {
        //     this.getTableData(0);
        // },

        // 假分页
        pageMaxNum: {
            handler: function (val, oldval) {
                this.currentIndex= 0;
                // this.getTableData(0, this.type)
            }
        },
        condition: {
            handler: function (val, oldval) {
                this.currentIndex= 0;
            }
        },
    },
    methods: {
        getTableData: function (currentIndex) {
            var _this = this;
            var params = {};
            // params.pageNum = currentIndex + 1;
            // params.pageSize = this.pageMaxNum;
            this.currentIndex= 0;
            $.post({
                url: '/businessMgmt/fundTag/fundTagMgmt/getTableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.tableData = result.data.body;
                    }
                    else {
                        _this.tableData = [];
                        _this.currentIndex = 0;
                        _this.totalPage = 0;
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        // 新增配置
        showAdd:function(){
           var _this=this;
           this.tagid='';
           this.tagnm='';
           _this.showDialog('', 'add', false);  
        },
        saveParam:function(){
          var _this=this;
          var tagNameList=[]
          var tagNameIdList=[]
          var params={}
          params.tagid=this.tagid
          params.tagnm=this.tagnm.trim()
          _this.tableData.forEach(item=>{
              tagNameList.push(item.tagnm)
              tagNameIdList.push(item.tagid)
          })
            if (this.tagid==""||isNaN(Number(this.tagid))) {
                _this.showDialog('add', 'info', true, '基金标签ID不能为空或者不是数字');
                return false;
            }
            if(tagNameIdList.indexOf(params.tagid.toString()) != -1){
                return _this.showDialog('add', 'info', true,'不允许添加相同基金标签ID!');
            }
          if(tagNameList.indexOf(params.tagnm.toString()) != -1){
                return _this.showDialog('add', 'info', true,'不允许添加同名标签!');
            }
          $.post({
                url: '/businessMgmt/fundTag/fundTagMgmt/saveParam.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        $("#info").click(function(){
                            _this.getTableData(0)
                        })
                    }
                        _this.showDialog('add', 'info', false, result.msg);
                }
            });
        },
        // 修改配置
        showUpdate:function(item){
           var _this=this
           this.tagid=item.tagid
           this.tagnm=item.tagnm
           this.serialno=item.serialno
           _this.showDialog('', 'revise', false);
        },
        update:function(){
           var _this=this
           var params={}
           var tagNameList=[]
           params.tagid=this.tagid;
           params.tagnm=this.tagnm.trim();
           params.serialno=this.serialno;
           _this.tableData.forEach(item=>{
              tagNameList.push(item.tagnm)
          })
          if(tagNameList.indexOf(params.tagnm.toString()) != -1){
                return _this.showDialog('revise', 'info', true,'不允许修改成同名标签!');
            }
           $.post({
                url: '/businessMgmt/fundTag/fundTagMgmt/update.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        $("#info").click(function(){
                            _this.getTableData(0)
                        })
                    }
                        _this.showDialog('revise', 'info', false, result.msg);
                }
            });
        },
        // 删除标签配置
        showDelete:function(item){
           var _this=this
           this.tagid=item.tagid
           _this.showDialog('', 'del', false);  
        },
        deleteParam:function(){
           var _this=this
           var params={}
           params.tagId=this.tagid;
            $.post({
                url: '/businessMgmt/fundTag/fundTagMgmt/deleteParam.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        // _this.getTableData(0);
                        $("#info").click(function(){
                            _this.getTableData(0)
                        })
                    }
                        _this.showDialog('del', 'info', false, result.msg);
                }
            });
        },
        //详细属性
        attribute:function(item){
            var _this=this
            this.tagid = item.tagid;
            var params={}
            params.tagId=item.tagid
             $.post({
                url: '/businessMgmt/fundTag/fundTagMgmt/attribute.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.detailList=result.data.body;
                    }else{
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
            _this.showDialog('', 'detail', false);
        },
        // 详细属性-新增、
        putAdd:function(){
           var _this=this
           this.tagvalue=""
           this.tagdesc=""
           _this.showDialog('detail', 'putAdd', false); 
        },
        AddList:function(){
           var _this=this
           var tagdescList=[]
           var tagdescIdList=[]
           var params={}
            // 标签描述ID按时间格式添加
            var myDate = new Date();
            var year = myDate.getFullYear();
            //获取当前月
            var month = myDate.getMonth() + 1;
            //获取当前日
            var date = myDate.getDate();
            var h = myDate.getHours(); //获取当前小时数(0-23)
            var m = myDate.getMinutes(); //获取当前分钟数(0-59)
            var s = myDate.getSeconds();
            // var now = year + '-' + conver(month) + "-" + conver(date) + " " + conver(h) + ':' + conver(m) + ":" + conver(s);
            // var tagvalue=now.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1$2$3$4$5$6')
             var tagvalue=this.tagvalue;
            //日期时间处理
            function conver(s) {
                return s < 10 ? '0' + s : s;
            }
            params.tagid=this.tagid;
            params.tagvalue=tagvalue;
            params.tagdesc=this.tagdesc.trim();
           _this.detailList.forEach(item=>{
               tagdescList.push(item.tagdesc)
               tagdescIdList.push(item.tagvalue)
            })
            if (params.tagvalue==""||isNaN(Number(params.tagvalue))) {
                _this.showDialog('putAdd', 'info', true, '标签描述ID不能为空或者不是数字');
                return false;
            }
            if(tagdescIdList.indexOf(params.tagvalue.toString()) != -1){
                _this.showDialog('putAdd', 'info', true,'不允许添加相同标签描述ID!');
                return false;
            }
           if(tagdescList.indexOf(params.tagdesc.toString()) != -1){
                return _this.showDialog('putAdd', 'info', true,'不允许添加同名标签!');
            }
            $.post({
                url: '/businessMgmt/fundTag/fundTagMgmt/AddList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0);
                    }
                        _this.showDialog('putAdd', 'info', false, result.msg);
                }
            });
        },
        // 详细属性-修改标签描述
        // modify:function(item){
        //    var _this=this
        //    this.tagid=item.tagid
        //    this.tagvalue=item.tagvalue
        //    this.tagdesc=item.tagdesc
        //    this.serialno=item.serialno
        //    _this.showDialog('detail', 'modify', false);
        // },
        // modifyUpdate:function(){
        //    var _this=this
        //    var tagdescList=[]
        //    var params={}
        //    params.tagid=this.tagid
        //    params.tagvalue=this.tagvalue
        //    params.tagdesc=this.tagdesc.trim()
        //    params.serialno=this.serialno
        //    _this.detailList.forEach(item=>{
        //         tagdescList.push(item.tagdesc)
        //     })
        //   if(tagdescList.indexOf(params.tagdesc.toString()) != -1){
        //         return _this.showDialog('modify', 'info', true,'不允许修改成同名标签!');
        //     }
        //    $.post({
        //         url: '/businessMgmt/fundTag/fundTagMgmt/modifyUpdate.ajax',
        //         data: params,
        //         success: function (result) {
        //             if (result.error === 0) {
        //                 _this.getTableData(0);
        //             }
        //                 _this.showDialog('modify', 'info', false, result.msg);
        //         }
        //     });
        // },
        // 详细属性-删除标签描述
        delList:function(item){
           var _this=this
           this.tagid=item.tagid
           this.tagvalue=item.tagvalue
           this.tagdesc=item.tagdesc
           _this.showDialog('detail', 'delete', false); 
        },
        deleteList:function(){
           var _this=this
           var params={}
           params.tagId=this.tagid
           params.tagValue=this.tagvalue
           console.log(params)
           $.post({
                url: '/businessMgmt/fundTag/fundTagMgmt/deleteList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0);
                    }
                        _this.showDialog('delete', 'info', false, result.msg);
                }
            });
        },
        // 详细属性-批量删除标签描述
        // 批量删除
        showDeleteList:function () {
            var _this = this;
            var hasCheck = false;
            for (var i = 0; i < this.detailList.length; i++) {
                if (this.detailList[i].check) {
                    hasCheck = true;
                }
            }
            if (!hasCheck) {
                this.showDialog('detail', 'info', true, '请选择相关记录');
                return;
            }
            this.showDialog('', 'delete2',false);
           
        },
        deleteAll:function(){
            var _this=this;
            var params={};
             params.tagId=this.tagid
            // 组合删除
            var fundIds= [];
            for (var i = 0; i < this.detailList.length; i++) {
                if (this.detailList[i].check) {
                   fundIds.push(this.detailList[i].tagvalue)
                }
            }
            // var mapResult = fundIds.map(function(item,index,array){
            //     return item-0;
            // });
            params.tagValueList=JSON.stringify(fundIds)
            console.log(params)
            $.post({
                url: '/businessMgmt/fundTag/fundTagMgmt/deleteAll.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0);
                        _this.showDialog('delete2', 'info', false, result.msg);
                        _this.showDialog('detail', '', false);
                    }
                    // _this.showDialog('delete2', 'info', false, result.msg);
                }
            });
        },
        // 全量导出
        exportAll:function(){
                var _this = this;
                var url;
                    url = '/businessMgmt/fundTag/fundTagMgmt/exportAll.ajax'
                window.location.href = url;
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
        // 单选
        check: function (index) {
            index.check = !index.check;
        },
        // 用户全选
        selectAll: function (allCheck) {
            var _this = this;
            //如果父级被选中，那么子集循环，全被给checked=true
            if (!allCheck) {
                _this.detailList.forEach(function (item) {
                    item.check = true;
                });
            } else {
                //相反，如果没有被选中，子集应该全部checked=false
                _this.detailList.forEach(function (item) {
                    item.check = false;
                });
            }
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
    },
    // 类型状态
    filters: {
        status: function (item) {
            if (item === "0") {
                return "已关注"
            } else if (item === "1") {
                return "取消关注"
            } else {
                return "其他"
            }
        }
    }
});

