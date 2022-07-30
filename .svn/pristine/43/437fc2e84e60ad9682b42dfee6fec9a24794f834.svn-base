new Vue({
    el: '#content',
    data: function(){
        return {
            //查询条件
            eventName: '',
            nodeName: '',
            nodeTypeName: '',
            pname: '',
            // commondata
            userId: '',
            diaMsg: '',
            pageMaxNum1:'10',
            pageMaxNum2:'10',
            pageMaxNum3:'10',
            pageMaxNum4:'10',
            //主页面相关数据
            // templateList
            templateList:[],
            // 触发数据类型
            dataTp:{},
            dataFrom:{},
            page1: {
                tableData: [],
                SpareData:[],
                isUpdate:false,
                updateId:'',
                deleteId:'',
                titleStatus:'新增信息',
                loadingStatus:'数据获取中...',
                currentIndex: 0,
                maxSpace: 5,
                totalPage: 0,
                method: function (currentIndex) {
                    this.getTableData1(currentIndex)
                }.bind(this)
            },
            page2: {
                tableData: [],
                SpareData:[],
                isUpdate:false,
                updateId:'',
                deleteId:'',
                titleStatus:'新增信息',
                loadingStatus:'数据获取中...',
                currentIndex: 0,
                maxSpace: 5,
                totalPage: 0,
                method: function (currentIndex) {
                    this.getTableData2(currentIndex)
                }.bind(this)
            },
            page3: {
                tableData: [],
                SpareData:[],
                isUpdate:false,
                updateId:'',
                deleteId:'',
                titleStatus:'新增信息',
                loadingStatus:'数据获取中...',
                currentIndex: 0,
                maxSpace: 5,
                totalPage: 0,
                method: function (currentIndex) {
                    this.getTableData3(currentIndex)
                }.bind(this)
            },
            page4: {
                tableData: [],
                SpareData:[],
                isUpdate:false,
                updateId:'',
                deleteId:'',
                titleStatus:'新增信息',
                loadingStatus:'数据获取中...',
                currentIndex: 0,
                maxSpace: 5,
                totalPage: 0,
                method: function (currentIndex) {
                    this.getTableData4(currentIndex)
                }.bind(this),
            },
            
            // 事件tab页新增修改数据
            diaeventName:'',
            diaeventDesc:'',
            diaeventConditionParams:'',
            dianodeIds:'',
            diaeventKey:'',
            diaexpGenerateType:'',
            diaexpConfigTemplate:'',
            diatriggerDataTp:'',
            diatriggerDataFrom:'',
            diaeventFilterMethod:'',
            // 业务节点新增修改数据
            dianodeName:'',
            dianodeApkind:'',
            dianodeSubapkind:'',
            dianodeDesc:'',
            dianodeType:'',
            // 节点类型
            dianodeTypeName:'',
            dianodeTypeDesc:'',
            // 参数
            diapkey:'',
            diapname:'',
            diaparamValueTp:0,
            diainvokeMethod:'',
            diareturnMappingKey:''
        }

    },
    
    
    computed: {
        pageList: function () {
            return function () {
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
            }
        },
        //主表格分页方法
        prev: function () {
            return function () {
                if (this.currentIndex <= 0) {
                    return;
                }
                this.method(this.currentIndex - 1);
            }
        },
        next: function () {
            return function () {
                if (this.currentIndex >= this.totalPage - 1) {
                    return;
                }
                this.method(this.currentIndex + 1);
            }
        },
        changeIndex: function () {
            return function (index) {
                this.method(index - 1);
            }
        },
        toFirst: function () {
            return function () {
                this.method(0);
            }
        },
        toLast: function () {
            return function () {
                this.method(this.totalPage - 1);
            }
        }
    },
    watch: {
        pageMaxNum1: function () {
            this.getTableData1(0);
        },
        pageMaxNum2: function () {
            this.getTableData2(0);
        },
        pageMaxNum3: function () {
            this.getTableData3(0);
        },
        pageMaxNum4: function () {
            this.getTableData4(0);
        }
    },
    mounted: function () {
        var _this = this;
        var dialogs = ['info', 'add1', 'add2','add3','add4','delete1','delete2','delete3','delete4'];
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
        $('.select2').css('width','400px').select2({allowClear:true})
		
        $("#state1").on("select2:close", function () {
            this.diaeventConditionParams=$("#state1").val()? $("#state1").val().join(','):'';
            // console.log(this.diaeventConditionParams);
        }.bind(this));
        $("#state2").on("select2:close", function () {
            this.dianodeIds=$("#state2").val()? $("#state2").val().join(','):'';
            // console.log(this.dianodeIds);
        }.bind(this));
        $(".tabbable ul li").on('click',function(){
            this.getTableData2(0,99999);
            this.getTableData3(0,99999);
            this.getTableData4(0,99999);
        }.bind(this))
        this.getTableData1(0);
        this.getTableData2(0);
        this.getTableData3(0);
        this.getTableData4(0);
        this.getTamplateList();
        this.getDataTp();
        this.getDataFrom();
    },
    methods: {
        // 查询触发数据类型
         getDataTp: function () {
            $.post({
                url: '/automatedOperation/systemConfig/eventRelevantConfig/queryTriggerDataTp.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        this.dataTp=result.data;
                    } else {
                        this.dataTp={};
                        this.showDialog('', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },
        // 查询触发数据来源
        getDataFrom: function () {
            $.post({
                url: '/automatedOperation/systemConfig/eventRelevantConfig/queryTriggerDataFrom.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        this.dataFrom=result.data;
                    } else {
                        this.dataFrom={};
                        this.showDialog('', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },
        //查询事件管理页中的模板list
        getTamplateList: function () {
            $.post({
                url: '/automatedOperation/systemConfig/eventRelevantConfig/searchTemplateList.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        if (result.data) {
                            console.log(result.data);
                            for( var item in result.data){
                                this.templateList.push({value:item,key:result.data[item]})
                            }
                        } else {
                            this.templateList=[];
                        }
                    } else {
                        this.templateList=[];
                        this.showDialog('', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },
        //事件管理tab页
        getTableData1: function (currentIndex,pageSize) {
            var params = {};
            var _this = this;
            params.eventName = this.eventName;
            params.pageNo = currentIndex + 1;
            !pageSize&&(params.pageSize = this.pageMaxNum1);
            pageSize&&( params.pageSize = pageSize)
            // console.log(params);
            this.loadingStatus = '数据获取中...';
            // 获取tab2，4的备用数据
            this.getTableData2(0,99999);
            this.getTableData3(0,99999);
            this.getTableData4(0,99999);
            $.post({
                url: '/automatedOperation/systemConfig/eventRelevantConfig/searchEventList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.userId = result.data.userId;
                        if (result.data.rows && result.data.rows.length > 0) {
                            if(pageSize){
                                // 备用数组
                                _this.page1.SpareData = result.data.rows;
                            }else{
                                _this.page1.tableData = result.data.rows;
                            }
                            // _this.page1.tableData = result.data.rows;
                            _this.page1.currentIndex = result.data.pageNum - 1;
                            _this.page1.totalPage = result.data.pages;
                        } else {
                            _this.page1.tableData = [];
                            _this.page1.currentIndex = 0;
                            _this.page1.totalPage = 0;
                            _this.page1.loadingStatus = '没有数据';
                        }

                    } else {
                        _this.page1.tableData = [];
                        _this.page1.currentIndex = 0;
                        _this.page1.totalPage = 0;
                        _this.showDialog('', 'info', false, result.msg);
                        _this.page1.loadingStatus = '没有数据';
                    }
                }
            });
        },
        //新增活动配置
        setAddData1: function (obj) {
            this.diaeventName = obj.eventName ? obj.eventName : '';
            this.diaeventDesc = obj.eventDesc ? obj.eventDesc : '';
            this.diaeventConditionParams = obj.eventConditionParams ? obj.eventConditionParams : '';
            this.dianodeIds = obj.nodeIds ? obj.nodeIds : '';
            this.diaeventKey = obj.eventKey ? obj.eventKey : '';
            this.diaexpGenerateType = obj.expGenerateType ? obj.expGenerateType : '';
            this.diaexpConfigTemplate = obj.expConfigTemplate ? obj.expConfigTemplate : '';
            this.diatriggerDataTp = obj.triggerDataTp ? obj.triggerDataTp : '';
            this.diatriggerDataFrom = obj.triggerDataFrom ? obj.triggerDataFrom : '';
            this.diaeventFilterMethod = obj.eventFilterMethod ? obj.eventFilterMethod : '';
            $("#state1").val(obj.eventConditionParams?obj.eventConditionParams.split(','):[]).trigger('change');
            $("#state2").val(obj.nodeIds?obj.nodeIds.split(','):[]).trigger('change');
        },
        showAdd1: function () {
            this.page1.isUpdate = false;
            this.page1.updateId = '';
            this.page1.titleStatus = '新增信息';
            this.setAddData1({});
            this.showDialog('', 'add1');
        },
        showUpdate1: function (item) {
            this.page1.isUpdate = true;
            this.page1.updateId = item.eventId;
            this.page1.titleStatus = '修改信息';
            this.setAddData1(item);
            this.showDialog('', 'add1');
        },
        add1: function () {
            var _this = this;
            var params = {};
            params.eventName = this.diaeventName;
            params.eventDesc = this.diaeventDesc;
            params.eventConditionParams = this.diaeventConditionParams;
            params.nodeIds = this.dianodeIds;
            params.eventKey = this.diaeventKey;
            params.expGenerateType = this.diaexpGenerateType;
            params.expConfigTemplate = this.diaexpConfigTemplate;
            params.triggerDataTp = this.diatriggerDataTp;
            params.triggerDataFrom = this.diatriggerDataFrom;
            params.eventFilterMethod = this.diaeventFilterMethod;
            this.page1.isUpdate && (params.eventId = this.page1.updateId) && (params.modifyBy = this.userId);
            !this.page1.isUpdate && (params.createBy = this.userId);
            console.log(params);
            var url = '/automatedOperation/systemConfig/eventRelevantConfig/';
            url += this.page1.isUpdate ? 'update1.ajax' : 'add1.ajax';
            $.post({
                url: url,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData1(0);
                    }
                    _this.showDialog('add1', 'info', false, result.msg);
                }
            });
        },
        deleteData1:function(item){
            this.page1.deleteId=item.eventId;
            this.showDialog('', 'delete1', false);
        },
        deleteConfirm1:function(){
            var _this = this;
            $.post({
                url: '/automatedOperation/systemConfig/eventRelevantConfig/delete1.ajax',
                data: {id: this.page1.deleteId},
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('delete1', 'info', false, result.msg);
                        _this.getTableData1(0);
                    } else {
                        _this.showDialog('delete1', 'info', false, result.msg);
                    }
                }
            })
        },
        // 业务节点tab页
        getTableData2: function (currentIndex,pageSize) {
            var params = {};
            var _this = this;
            params.pageNo = currentIndex + 1;
            !pageSize&&(params.pageSize = this.pageMaxNum2);
            pageSize&&( params.pageSize = pageSize)
            params.nodeName=this.nodeName;
            // console.log(params);
            _this.page2.loadingStatus = '数据获取中...';
            $.post({
                url: '/automatedOperation/systemConfig/eventRelevantConfig/searchBusinessList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.userId = result.data.userId;
                        if (result.data.rows && result.data.rows.length > 0) {
                            if(pageSize){
                                // 备用数组
                                _this.page2.SpareData = result.data.rows;
                                return;
                            }else{
                                _this.page2.tableData = result.data.rows;
                            }
                            
                            _this.page2.currentIndex = result.data.pageNum - 1;
                            _this.page2.totalPage = result.data.pages;
                        } else {
                            _this.page2.tableData = [];
                            _this.page2.currentIndex = 0;
                            _this.page2.totalPage = 0;
                            _this.page2.loadingStatus = '没有数据';
                        }

                    } else {
                        _this.page2.tableData = [];
                        _this.page2.currentIndex = 0;
                        _this.page2.totalPage = 0;
                        _this.showDialog('', 'info', false, result.msg);
                        _this.page2.loadingStatus = '没有数据';
                    }
                }
            });
        },
        setAddData2: function (obj) {
            this.dianodeName = obj.nodeName ? obj.nodeName : '';
            this.dianodeApkind = obj.nodeApkind ? obj.nodeApkind : '';
            this.dianodeSubapkind = obj.nodeSubapkind ? obj.nodeSubapkind : '';
            this.dianodeDesc = obj.nodeDesc ? obj.nodeDesc : '';
            this.dianodeType = obj.nodeType ? obj.nodeType : '';
        },
        showAdd2: function () {
            this.page2.isUpdate = false;
            this.page2.updateId = '';
            this.page2.titleStatus = '新增信息';
            this.setAddData2({});
            this.showDialog('', 'add2');
        },
        showUpdate2: function (item) {
            this.page2.isUpdate = true;
            this.page2.updateId = item.id;
            this.page2.titleStatus = '修改信息';
            this.setAddData2(item);
            this.showDialog('', 'add2');
        },
        add2: function () {
            var _this = this;
            var params = {};
            params.nodeName = this.dianodeName;
            params.nodeApkind = this.dianodeApkind;
            params.nodeSubapkind = this.dianodeSubapkind;
            params.nodeDesc = this.dianodeDesc;
            params.nodeType = this.dianodeType;
            this.page2.isUpdate && (params.id = this.page2.updateId) && (params.modifyBy = this.userId);
            !this.page2.isUpdate && (params.createBy = this.userId);
            var url = '/automatedOperation/systemConfig/eventRelevantConfig/';
            url += this.page2.isUpdate ? 'update2.ajax' : 'add2.ajax';
            $.post({
                url: url,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData2(0);
                    }
                    _this.showDialog('add2', 'info', false, result.msg);
                }
            });

        },
        deleteData2:function(item){
            this.page2.deleteId=item.id;
            this.showDialog('', 'delete2', false);
        },
        deleteConfirm2:function(){
            var _this = this;
            $.post({
                url: '/automatedOperation/systemConfig/eventRelevantConfig/delete2.ajax',
                data: {id: this.page2.deleteId},
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('delete2', 'info', false, result.msg);
                        _this.getTableData2(0);
                    } else {
                        _this.showDialog('delete2', 'info', false, result.msg);
                    }
                }
            })
        },
        // 节点类型tab页
        getTableData3: function (currentIndex,pageSize) {
            var params = {};
            var _this = this;
            params.pageNo = currentIndex + 1;
            !pageSize&&(params.pageSize = this.pageMaxNum3);
            pageSize&&( params.pageSize = pageSize)
            params.nodeTypeName=this.nodeTypeName
            // console.log(params);
            _this.page3.loadingStatus = '数据获取中...';
            $.post({
                url: '/automatedOperation/systemConfig/eventRelevantConfig/searchNodeTypeList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.userId = result.data.userId;
                        if (result.data.rows && result.data.rows.length > 0) {
                            if(pageSize){
                                // 备用数组
                                _this.page3.SpareData = result.data.rows;
                                return;
                            }else{
                                _this.page3.tableData = result.data.rows;
                            }
                            _this.page3.currentIndex = result.data.pageNum - 1;
                            _this.page3.totalPage = result.data.pages;
                        } else {
                            _this.page3.tableData = [];
                            _this.page3.currentIndex = 0;
                            _this.page3.totalPage = 0;
                            _this.page3.loadingStatus = '没有数据';
                        }

                    } else {
                        _this.page3.tableData = [];
                        _this.page3.currentIndex = 0;
                        _this.page3.totalPage = 0;
                        _this.showDialog('', 'info', false, result.msg);
                        _this.page3.loadingStatus = '没有数据';
                    }
                }
            });
        },
        setAddData3: function (obj) {
            this.dianodeTypeName = obj.nodeTypeName ? obj.nodeTypeName : '';
            this.dianodeTypeDesc = obj.nodeTypeDesc ? obj.nodeTypeDesc : '';
        },
        showAdd3: function () {
            this.page3.isUpdate = false;
            this.page3.updateId = '';
            this.page3.titleStatus = '新增信息';
            this.setAddData3({});
            this.showDialog('', 'add3');
        },
        showUpdate3: function (item) {
            this.page3.isUpdate = true;
            this.page3.updateId = item.nodeTypeId;
            this.page3.titleStatus = '修改信息';
            this.setAddData3(item);
            this.showDialog('', 'add3');
        },
        add3: function () {
            var _this = this;
            var params = {};
            params.nodeTypeName = this.dianodeTypeName;
            params.nodeTypeDesc = this.dianodeTypeDesc;
            this.page3.isUpdate && (params.nodeTypeId = this.page3.updateId) && (params.modifyBy = this.userId);
            !this.page3.isUpdate && (params.createBy = this.userId);
            var url = '/automatedOperation/systemConfig/eventRelevantConfig/';
            url += this.page3.isUpdate ? 'update3.ajax' : 'add3.ajax';
            $.post({
                url: url,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData3(0);
                    }
                    _this.showDialog('add3', 'info', false, result.msg);
                }
            });
        },
        deleteData3:function(item){
            this.page3.deleteId=item.nodeTypeId;
            this.showDialog('', 'delete3', false);
        },
        deleteConfirm3:function(){
            var _this = this;
            $.post({
                url: '/automatedOperation/systemConfig/eventRelevantConfig/delete3.ajax',
                data: {id: this.page3.deleteId},
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('delete3', 'info', false, result.msg);
                        _this.getTableData3(0);
                    } else {
                        _this.showDialog('delete3', 'info', false, result.msg);
                    }
                }
            })
        },
        // 参数tab页面
        getTableData4: function (currentIndex,pageSize) {
            var params = {};
            var _this = this;
            params.pageNo = currentIndex + 1;
            !pageSize&&(params.pageSize = this.pageMaxNum4);
            pageSize&&( params.pageSize = pageSize)
            params.pname=this.pname;
            // console.log(params);
            _this.page4.loadingStatus = '数据获取中...';
            $.post({
                url: '/automatedOperation/systemConfig/eventRelevantConfig/searchParamList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.userId = result.data.userId;
                        if (result.data.rows && result.data.rows.length > 0) {
                            if(pageSize){
                                // 备用数组
                                _this.page4.SpareData = result.data.rows;
                                return;
                            }else{
                                _this.page4.tableData = result.data.rows;
                            }
                            
                            _this.page4.currentIndex = result.data.pageNum - 1;
                            _this.page4.totalPage = result.data.pages;
                        } else {
                            _this.page4.tableData = [];
                            _this.page4.currentIndex = 0;
                            _this.page4.totalPage = 0;
                            _this.page4.loadingStatus = '没有数据';
                        }

                    } else {
                        _this.page4.tableData = [];
                        _this.page4.currentIndex = 0;
                        _this.page4.totalPage = 0;
                        _this.showDialog('', 'info', false, result.msg);
                        _this.page4.loadingStatus = '没有数据';
                    }
                }
            });
        },
        setAddData4: function (obj) {
            this.diapkey = obj.pkey ? obj.pkey : '';
            this.diapname = obj.pname ? obj.pname : '';
            this.diaparamValueTp = obj.paramValueTp ? obj.paramValueTp : '';
            this.diainvokeMethod = obj.invokeMethod ? obj.invokeMethod : '';
            this.diareturnMappingKey = obj.returnMappingKey ? obj.returnMappingKey : '';
        },
        showAdd4: function () {
            this.page4.isUpdate = false;
            this.page4.updateId = '';
            this.page4.titleStatus = '新增信息';
            this.setAddData4({});
            this.showDialog('', 'add4');
        },
        showUpdate4: function (item) {
            this.page4.isUpdate = true;
            this.page4.updateId = item.pkey;
            this.page4.titleStatus = '修改信息';
            this.setAddData4(item);
            this.showDialog('', 'add4');
        },
        add4: function () {
            var _this = this;
            var params = {};
            params.pkey = this.diapkey;
            params.pname = this.diapname;
            params.paramValueTp = this.diaparamValueTp;
            params.invokeMethod = this.diainvokeMethod;
            params.returnMappingKey = this.diareturnMappingKey;
            this.page4.isUpdate && (params.modifyBy = this.userId);
            !this.page4.isUpdate && (params.createBy = this.userId);
            var url = '/automatedOperation/systemConfig/eventRelevantConfig/';
            url += this.page4.isUpdate ? 'update4.ajax' : 'add4.ajax';
            $.post({
                url: url,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData4(0);
                    }
                    _this.showDialog('add4', 'info', false, result.msg);
                }
            });

        },
        deleteData4:function(item){
            this.page4.deleteId=item.pkey;
            this.showDialog('', 'delete4', false);
        },
        deleteConfirm4:function(){
            var _this = this;
            $.post({
                url: '/automatedOperation/systemConfig/eventRelevantConfig/delete4.ajax',
                data: {pkey: this.page4.deleteId},
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('delete4', 'info', false, result.msg);
                        _this.getTableData4(0);
                    } else {
                        _this.showDialog('delete4', 'info', false, result.msg);
                    }
                }
            })
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
        },
        inSelected: function (item, arr, prop) {
            var _index = -1;
            arr.forEach(function (value, index) {
                if (item[prop] == value[prop]) {
                    _index = index;
                }
            });
            return _index;
        },
        formatTime: function (timestamp) {
            if (timestamp) {
                var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
                var Y = date.getFullYear() + '-';
                var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
                var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
                var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
                var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
                return Y + M + D + h + m + s;
            } else {
                return '-';
            }

        },
        overflowHide: function (val) {
            var str = '';
            if (val) {
                str = val.toString();
                if (str.length > 10) {
                    str = str.substring(0, 10) + '...'
                }
            } else {
                str = '-'
            }
            return str;
        },
        stringTimeFat: function (val) {
            if (val) {
                return val.slice(0, 19);
            } else {
                return ''
            }
        },
        backTimeFat: function (val) {
            if (val) {
                val = val.toString();
                var arr = val.split("-");
                var brr = arr[arr.length - 1].split('.');
                try {
                    arr[1] = arr[1].length > 1 ? arr[1] : '0' + arr[1];
                    brr[0] = brr[0].length > 1 ? brr[0] : '0' + brr[0];
                    brr[1] = brr[1].length > 1 ? brr[1] : '0' + brr[1];
                    brr[2] = brr[2].length > 1 ? brr[2] : '0' + brr[2];
                    brr[3] = brr[3].trim().length > 1 ? brr[3].trim() : '0' + brr[3].trim();
                    val = arr[0] + '-' + arr[1] + '-' + brr[0] + ' ' + brr[1] + ':' + brr[2] + ':' + brr[3]
                } catch (err) {
                    val = val.toString();
                }
            } else {
                val = '-'
            }
            return val;
        }
    }
});