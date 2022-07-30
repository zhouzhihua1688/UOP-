 var vm = new Vue({
     el: '#content',
     data: {
         // 主页面相关数据
         tableData: [],
         diaMsg: '',

         //主表格分页数据
         currentIndex: 0,
         maxSpace: 5,
         totalPage: 0,
         pageMaxNum: 10,
         // 新增
         userName: '',
         awardValue: '',
         receiveTime: '',
         expireTime: '',
         awardType: [],
         receiveTimeType: '0',
         expireTimeType: '0',
         expireRelativeTime: '0',
         sendTotal: '',
         awardTypeId: '',
         awardDesc: '',
         //查看修改
         viewChange: {
             id: '',
             awardValue: '',
             receiveTime: '',
             expireRelativeTime: '',
             expireTime: '',
             receiveTimeType: '',
             expireTimeType: '',
             sendTotal: '',
             awardTypeId: '',
             awardDesc: '',
         },
         queryAwardNo: '', //查询
         filePath: '', //导入


         deleteinfo: {}
     },
     created: function () {
         var _this = this;
         $.post({
             url: '/marketingActive/activeRun/awardBase/awardType.ajax',
             success: function (result) {
                 if (result.error === 0) {
                     _this.awardType = result.data.mcpAwardTypeConfigs;
                     console.log(result)
                 } else {
                     _this.showDialog('', 'info', false, result.msg);
                 }
             }
         });

     },
     mounted: function () {
         var dialogs = ['info', 'addNotice', 'changeNotice', 'addfile', 'deleteDialog'];
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
         $('.date-timepicker').datetimepicker({
             format: 'YYYY-MM-DD HH:mm:ss', //use this option to display seconds
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
         checkAll: function () {
             if (this.tableData.length == 0) {
                 return false;
             }
             for (var i = 0; i < this.tableData.length; i++) {
                 if (!this.tableData[i].check) {
                     return false;
                 }
             }
             return true;
         }
     },
     watch: {
         pageMaxNum: function () {
             this.getTableData(0);
         },
     },
     methods: {
         getTableData: function (currentIndex) {
             var params = {};
             var _this = this;
             params.awardNo = this.queryAwardNo;
             params.pageNo = currentIndex + 1;
             params.pageSize = this.pageMaxNum;
             $.post({
                 url: '/marketingActive/activeRun/awardBase/getList.ajax',
                 data: params,
                 success: function (result) {
                     if (result.error === 0) {
                         _this.tableData = result.data.rows;
                         _this.currentIndex = result.data.pageNum - 1;
                         _this.totalPage = result.data.pages;
                         _this.userName = result.data.userName;
                         console.log(result)
                         _this.queryStockByAwardno();
                     } else {
                         _this.tableData = [];
                         _this.currentIndex = 0;
                         _this.totalPage = 0;
                         _this.showDialog('', 'info', false, result.msg);
                     }
                 }
             });
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
         check: function (item) {
             item.check = !item.check;
         },
         allCheck: function () {
             var _this = this;
             var flag = this.checkAll;
             this.tableData.forEach(function (item) {
                 item.check = !flag;
             });
         },
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
         add: function () {
             if (this.awardValue === '') {
                 this.showDialog('addNotice', 'info', true, '请填写奖励内容');
                 return;
             }
             if (this.awardTypeId === '') {
                 this.showDialog('addNotice', 'info', true, '请选择奖励类型');
                 return;
             }
             var params = {
                 modifyBy: this.userName,
                 awardValue: this.awardValue,
                 sendTotal: this.sendTotal,
                 awardTypeId: this.awardTypeId,
                 awardDesc: this.awardDesc,
             };
             if (params.awardTypeId == 7) {
                 params.receiveTimeType = this.receiveTimeType;
                 params.expireTimeType = this.expireTimeType;
                 if (this.receiveTimeType == 0) {
                     if (this.receiveTime === '') {
                         this.showDialog('addNotice', 'info', true, '请选择生效时间');
                         return;
                     }
                     params.receiveTime = this.receiveTime;
                 }
                 if (this.expireTimeType == 0) {
                     if (this.expireTime === '') {
                         this.showDialog('addNotice', 'info', true, '请选择失效时间');
                         return;
                     }
                     params.expireTime = this.expireTime;
                 } else {
                     if (this.expireRelativeTime == 0) {
                         this.showDialog('addNotice', 'info', true, '请填写失效时间');
                         return;
                     }
                     if (!/^[1-9]\d*$/.test(this.expireRelativeTime)) {
                         this.showDialog('addNotice', 'info', true, '有效时间格式填写错误，请填写正整数');
                         return ;
                     }
                     params.expireRelativeTime = this.expireRelativeTime;
                 }
             }
             console.log(params)
             var _this = this;
             $.post({
                 url: '/marketingActive/activeRun/awardBase/dataAdd.ajax',
                 data: params,
                 success: function (result) {
                     if (result.error === 0) {
                         _this.showDialog('addNotice', 'info', false, result.msg);
                         _this.getTableData(0)
                         _this.awardValue = '';
                         _this.awardDesc = '';
                         _this.awardTypeId = '';
                         console.log(result)
                     } else {
                         _this.showDialog('addNotice', 'info', false, result.msg);
                     }
                 }
             });
         },
         deleteDialog: function (id) {
             this.deleteinfo.id = id
             this.showDialog("", "deleteDialog")
         },
         deleteData: function () {
             var params = {
                 id: this.deleteinfo.id,
                 modifyBy: this.userName
             };
             console.log(params)
             var _this = this;
             $.post({
                 url: '/marketingActive/activeRun/awardBase/dataDelete.ajax',
                 data: params,
                 success: function (result) {
                     if (result.error === 0) {
                         _this.showDialog('deleteDialog', 'info', false, '删除成功');
                         _this.getTableData(0)
                         console.log(result)
                     } else {
                         _this.showDialog('deleteDialog', 'info', false, '删除失败');
                     }
                 }
             });
         },
         showView: function (id) {

             var params = {
                 id: id,
             };
             console.log(params)
             var _this = this;
             $.post({
                 url: '/marketingActive/activeRun/awardBase/dataQuery.ajax',
                 data: params,
                 success: function (result) {
                     if (result.error == 0) {
                         for (var x in _this.viewChange) {
                             _this.viewChange[x] = result.data[x]
                         }
                     } else {
                         _this.showDialog('', 'info', false, '查询失败');
                     }
                 }
             });

             this.showDialog('', 'changeNotice', false)
         },
         changeDate: function () {
             if (this.viewChange.awardValue === '') {
                 this.showDialog('changeNotice', 'info', true, '请填写奖励内容');
                 return;
             }
             var params = {
                 modifyBy: this.userName,
                 id: this.viewChange.id,
                 awardTypeId: this.viewChange.awardTypeId,
                 awardDesc: this.viewChange.awardDesc,
                 sendTotal: this.viewChange.sendTotal,
                 awardValue: this.viewChange.awardValue,
             };
             if (params.awardTypeId == 7) {
                 params.receiveTimeType = this.viewChange.receiveTimeType;
                 params.expireTimeType = this.viewChange.expireTimeType;
                 if (this.viewChange.receiveTimeType == 0) {
                     params.receiveTime = this.viewChange.receiveTime;
                 }
                 if (this.viewChange.expireTimeType == 0) {
                     params.expireTime = this.viewChange.expireTime;
                 } else {
                     params.expireRelativeTime = this.viewChange.expireRelativeTime;
                 }
             }
             console.log(params)
             var _this = this;
             $.post({
                 url: '/marketingActive/activeRun/awardBase/dataChange.ajax',
                 data: params,
                 success: function (result) {
                     if (result.error === 0) {
                         _this.showDialog('changeNotice', 'info', false, '修改成功');
                         _this.getTableData(0)
                         console.log(result)
                     } else {
                         _this.showDialog('changeNotice', 'info', false, '修改失败');
                     }
                 }
             });
         },
         queryData: function () {
             var params = {};
             var _this = this;
             params.pageNo = 1;
             params.awardNo = this.queryAwardNo;
             params.pageSize = this.pageMaxNum;
             $.post({
                 url: '/marketingActive/activeRun/awardBase/getList.ajax',
                 data: params,
                 success: function (result) {
                     if (result.error === 0) {
                         _this.tableData = result.data.rows;
                         _this.currentIndex = result.data.pageNum - 1;
                         _this.totalPage = result.data.pages;
                         _this.userName = result.data.userName;
                         console.log(result)
                         _this.queryStockByAwardno();
                     } else {
                         _this.tableData = [];
                         _this.currentIndex = 0;
                         _this.totalPage = 0;
                         _this.showDialog('', 'info', false, result.msg);
                     }
                 }
             });
         },
         fileUpload: function (item) {
             var _this = this;
             var filePath = this.filePath;
             var afterFile = filePath.indexOf('.');
             afterFile = filePath.substr(afterFile - 0 + 1) //获取文件后缀名
             afterFile = afterFile.toLocaleLowerCase() //转为小写
             if (afterFile != 'xls' && afterFile != 'xlsx') {
                 _this.showDialog('addfile', 'info', true, '只能上传Excel表格');
                 return;
             }

             if (this.filePath)
                 var fileElementId = 'uploadFileInput';

             console.log(fileElementId)
             $.ajaxFileUpload({
                 url: '/marketingActive/activeRun/awardBase/ExcelUpload.ajax',
                 type: 'POST',
                 dataType: 'json',

                 secureuri: false,
                 fileElementId: fileElementId,
                 success: function (result) {
                     console.log(result)
                     if (result.error == 0) {
                         _this.getTableData(0)
                         _this.showDialog('addfile', 'info', false, '上传成功')
                     } else {

                         _this.showDialog('addfile', 'info', true, '上传失败')
                     }
                 }
             });
         },
         select: function (item) {
             document.getElementById("uploadFileInput").click();
         },
         showFileName: function (event) {
             this.filePath = event.target.files[0].name
             this.viewChange.filePath = event.target.files[0].name
         },
        // 页面list中逐条获取库存数量inventorySurplus
        queryStockByAwardno(){
            // inventorySurplus
            // 真分页,tableData直接逐条获取
            var _this = this;
            this.tableData.forEach((item, index)=>{
                item.inventorySurplus = '';
                // Vue.set(item, "inventorySurplus", 99)
                $.post({
                    url: '/marketingActive/activeRun/awardBase/queryStockByAwardno.ajax',
                    data: {awardNo: item.awardNo},
                    success: function (result) {
                        if (result.error === 0) {
                            item.inventorySurplus = result.data;
                            Vue.set(_this.tableData, index, item); // 更新页面数据
                            // console.log(result)
                        } else {
                            // 库存获取失败，不做更新
                            _this.showDialog('', 'info', false, result.msg);
                        }
                    }.bind(this)
                });

            })

        },
     },
     components: {
         datePicker: VueBootstrapDatetimePicker,

     }
 });