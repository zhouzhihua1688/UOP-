new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        channelType:'',
        pageName:'',
        pageSceneKey:'',
        tableData: [],
        channelMenu:[],
        diaMsg: '',
        previewPath: '',
        loadingStatus: '数据获取中...',
        isUpdate: false,
        userId:'',
        updateId:'',
        deleteObj:{},
        deleteTp1:'',
        loadingShow: false,
        //dialog新增修改数据
        diapageSceneKey:'',
        diapageName:'',
        diachannelType:'',
        diaresPlaformPagesManagementList:[],

         //主表格分页数据
         currentIndex: 0,
         maxSpace: 5,
         totalPage: 0,
         pageMaxNum: 10,
         condition: "",
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
            let currentIndex = parseInt(this.currentIndex);
            return this.middleData[currentIndex];
        },

    },
    watch: {
        // 假分页
        pageMaxNum: {
            handler: function (val, oldval) {
                this.currentIndex= 0;
                this.getTableData()
            }
        },
        condition: {
            handler: function (val, oldval) {
                this.currentIndex= 0;
            }
        },
    },
    mounted: function () {
        var _this = this;
        var dialogs = ['info', 'add','delete1','delete2','fresh'];
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
        //渠道list获取
        $.post({
            url: '/recommendSystem/recommendViewMgmt/platformPageMgmt/channelMenu.ajax',
            data: {pageNo: 1,pageSize:9999},
            success: function (result) {
                if (result.error === 0) {
                    if(result.data.rows.length>0){
                        _this.channelMenu=result.data.rows;
                    }else{
                        _this.showDialog('', 'info', false, '内容类型暂无数据');
                    }

                } else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });
        this.getTableData();
    },
    methods: {
        //getlist
        getTableData: function (currentIndex) {
            var params = {};
            var _this = this;
            params.pageName = this.pageName;
            params.channelType = this.channelType;
            params.pageSceneKey = this.pageSceneKey;
            var url='/recommendSystem/recommendViewMgmt/platformPageMgmt/queryFullData.ajax'
            _this.loadingStatus = '数据获取中...';
            $.post({
                url: url,
                data: params,
                success: function (result) {
                    console.log(result);
                    if (result.error === 0) {
                        _this.tableData=result.data;
                        if(result.data.length<=0){
                         _this.loadingStatus = '暂无数据';
                        }
                    } else {
                        _this.tableData = [];
                        _this.showDialog('', 'info', false, result.msg);
                        _this.loadingStatus = '没有数据';
                    }
                }
            });
        },
        // getDetail
        getDetail:function(item){
            var _this=this;
            var params={};
            params.channelType = item.channelType;
            params.pageSceneKey = item.pageSceneKey;
            $.post({
                url: '/recommendSystem/recommendViewMgmt/platformPageMgmt/queryDetail.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        result.data.forEach(function(item){
                            _this.diaresPlaformPagesManagementList.push(item);
                        })
                    } else {
                        _this.diaresPlaformPagesManagementList = [];
                        _this.showDialog('add', 'info', ture, result.msg);
                        
                    }
                }
            });

        },
        //新增活动配置
        setAddData: function (obj) {
            this.diapageSceneKey=obj.pageSceneKey?obj.pageSceneKey:'';
            this.diapageName=obj.pageName?obj.pageName:'';
            this.diachannelType=obj.channelType?obj.channelType:'';
            this.diaresPlaformPagesManagementList=obj.resPlaformPagesManagementList?obj.resPlaformPagesManagementList:[]
        },
        showAdd: function () {
            this.isUpdate = false;
            this.setAddData({});
            this.showDialog('', 'add');
        },
        showUpdate: function (item) {
            // this.updateId=item.channelId;
            this.isUpdate = true;
            this.setAddData(item);
            this.getDetail(item);
            this.showDialog('', 'add');
        },
        add: function () {
            var _this = this;
            var params = {};
            // if(this.diaresPlaformPagesManagementList.some(function(item){return item.pageOs==''})||this.diaresPlaformPagesManagementList.some(function(item){return item.pageViewClass==''})){
            //     this.showDialog('add', 'info', true, '前端视图列表有空值，请填写完整');
            //     return;
            // }
            if(this.diaresPlaformPagesManagementList.length===0){
                this.showDialog('add', 'info', true, '请设置前端视图再保存');
                return;
            }
            params.pageSceneKey = this.diapageSceneKey;
            params.pageName = this.diapageName;
            params.channelType = this.diachannelType;
            params.resPlaformPagesManagementList = this.diaresPlaformPagesManagementList;
            console.log('params',params);
            var url = '/recommendSystem/recommendViewMgmt/platformPageMgmt/';
            url += this.isUpdate ? 'update.ajax' : 'add.ajax';
            $.post({
                url: url,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData();
                    }
                    _this.showDialog('add', 'info', false, result.msg);
                }
            });
        },
        addView:function(){
            var initParams={};
            initParams.pageViewClass="";
            initParams.pageOs="";
            initParams.id=0;
            this.diaresPlaformPagesManagementList.push(initParams);
        },
        deleteView:function(item,index){
            console.log(item,index);
            if(item.id){
                this.deleteSingle(item.id,index);
            }else{
                // 删除临时的次级数据
                this.diaresPlaformPagesManagementList.splice(index,1);
            }
        },
        // 删除已有的次级数据
        deleteSingle:function(id,index){
            var _this = this;
            $.post({
                url: '/recommendSystem/recommendViewMgmt/platformPageMgmt/delSingle.ajax',
                data: {id},
                success: function (result) {
                    if (result.error === 0) {
                        _this.diaresPlaformPagesManagementList.splice(index,1);
                    } else {
                        _this.showDialog('add', 'info', true, result.msg);
                    }
                }
            })
        },
        //删除
        deleteParams: function (item) {
            this.deleteObj.pageSceneKey=item.pageSceneKey;
            this.deleteObj.channelType=item.channelType;
            this.showDialog('', 'delete1', false);
        },
        deleteConfirm:function () {
            var _this = this;
            $.post({
                url: '/recommendSystem/recommendViewMgmt/platformPageMgmt/deleteGroup.ajax',
                data:this.deleteObj,
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('', 'info', false, '操作成功');
                        _this.getTableData(0);
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            })
        },
         //主表格假分页方法
         prev1: function () {
            this.currentIndex<= 0 ? 0 : this.currentIndex--;
        },
        next1: function () {
            this.currentIndex>= this.middleData.length - 1 ? this.middleData.length - 1 : this.currentIndex++;
        },
        changeIndex1: function (index) {
            this.currentIndex= index - 1;
        },
        //公共方法
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
        formatTime: function (timestamp) {
            var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
            var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
            var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
            return Y + M + D + h + m + s;
        },
        overflowHide: function (val) {
            var str='';
            if(val){
                str = val.toString();
                if (str.length > 10) {
                    str = str.substring(0, 10) + '...'
                }
            }else{
                str='-'
            }
            return str;
        },
        stringTimeFat: function (val) {
            if (val) {
                if (val.length > 8) {
                    return val.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/g, '$1-$2-$3 $4:$5:$6')
                } else {
                    return val.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')
                }
            } else {
                return '-'
            }
        },
        openTyString: function (val) {
            if (val) {
                this.contentTpList.forEach(function (item) {
                    if(val==item.contentKey){
                        val=item.contentName
                    }
                })
            } else {
                val = '-'
            }
            return val;
        },
        backTimeFat: function (val) {
            if (val) {
                val=val.toString();
                var arr=val.split("-");
                var brr=arr[arr.length-1].split('.');
                try {
                    arr[1]=arr[1].length>1?arr[1]:'0'+arr[1];
                    brr[0]=brr[0].length>1?brr[0]:'0'+brr[0];
                    brr[1]=brr[1].length>1?brr[1]:'0'+brr[1];
                    brr[2]=brr[2].length>1?brr[2]:'0'+brr[2];
                    brr[3]=brr[3].trim().length>1?brr[3].trim():'0'+brr[3].trim();
                    val=arr[0]+'-'+arr[1]+'-'+brr[0]+' '+brr[1]+':'+brr[2]+':'+brr[3]
                }
                catch(err){
                    val=val.toString();
                }
            } else {
                val = '-'
            }
            return val;
        }
    },
    filters:{
        channelTranslate:function(value,arr){
            if(value){
                arr.forEach(function (item) {
                    if(value==item.channelId){
                        value=item.channelName
                    }
                })
            }else{
                value='--'
            }
            return value;
        }
    }
});
