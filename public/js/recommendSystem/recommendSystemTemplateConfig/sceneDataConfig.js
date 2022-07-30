new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        //查询
        sceneKey: '',
        sceneName: '',
        tableData: [],

        userId: '',
        diaMsg: '',
        previewPath: '',
        loadingStatus: '数据获取中...',
        updateId: '',
        deleteId: '',
        isUpdate: false,
        loadingShow: false,
        uploadSuccessed1: false,
        //dialog新增修改数据
        diasceneKey: "",
        diasceneName: "",
        diasceneDesc: "",
        diasceneDataPath: "",
        diafileReadWays: "",
        diadataFields: "",
        diaverifyFilePath: "",
        diacontentTp: "",
        diadatafileFrom:"0",
      
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10
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
        }
    },
    watch: {
        pageMaxNum: function () {
            this.getTableData(0);
        },
        diafileReadWays:{
            handler:function(val,oldval){
                console.log(val);
                if(val=='excel'){
                    this.diadatafileFrom='1'
                }else{
                    this.diadatafileFrom='0'
                }
            }
        }
    },
    mounted: function () {
        var _this = this;
        var dialogs = ['info', 'rejectCheck','delete1'];
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
        $('#uploadBtn1').click(function () {
            $('#uploadFileInput1').click();
        });
        $('#uploadFileInput1').on('change', function (e) {
            _this.uploadSuccessed1 = false;
            $('#uploadInput1').val($(this).val());
          
        });
       
        // 获取视图列表
        this.getTableData(0);
        if(this.getUrlParam('openNewDialog')){
            this.showAdd();
        }
    },
    methods: {
       
        //list
        getTableData: function (currentIndex) {
            var params = {};
            var _this = this;
            params.pageNo = currentIndex + 1;
            params.pageSize = this.pageMaxNum;
            params.sceneKey = this.sceneKey;
            params.sceneName = this.sceneName;
            // console.log(params);
            _this.loadingStatus = '数据获取中...';
            $.post({
                url: '/recommendSystem/recommendSystemTemplateConfig/sceneDataConfig/queryInfo.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        if (result.data.rows && result.data.rows.length > 0) {
                            _this.userId = result.data.userId;
                            _this.tableData = result.data.rows;
                            _this.currentIndex = result.data.pageNum - 1;
                            _this.totalPage = result.data.pages;
                        } else {
                            _this.tableData = [];
                            _this.currentIndex = 0;
                            _this.totalPage = 0;
                            _this.loadingStatus = '没有数据';
                        }

                    } else {
                        _this.tableData = [];
                        _this.currentIndex = 0;
                        _this.totalPage = 0;
                        _this.showDialog('', 'info', false, result.msg);
                        _this.loadingStatus = '没有数据';
                    }
                }
            });
        },
        //新增活动配置
        setAddData: function (obj) {
            this.diasceneKey = obj.sceneKey ? obj.sceneKey : '';
            this.diasceneName = obj.sceneName ? obj.sceneName : '';
            this.diasceneDesc = obj.sceneDesc ? obj.sceneDesc : '';
            this.diasceneDataPath = obj.sceneDataPath ? obj.sceneDataPath : '';
            this.diafileReadWays = obj.fileReadWays ? obj.fileReadWays : '';
            this.diaverifyFilePath = obj.verifyFilePath ? obj.verifyFilePath : '';
            this.diadataFields = obj.dataFields ? obj.dataFields : '';
            this.diacontentTp = obj.contentTp ? obj.contentTp : '';
            this.diadatafileFrom = obj.datafileFrom ? obj.datafileFrom : '';
            $('#uploadInput1').val(obj.temporaryPath ? obj.temporaryPath : '');
        },
        showAdd: function () {
            var _this=this;
            this.isUpdate = false;
            this.uploadSuccessed1 = false;
            // $('#uploadFileInput1').on('change', function () {
            //     _this.uploadSuccessed1 = false;
            //     $('#uploadInput1').val($(this).val());
            // });
            this.updateId = '';
            this.setAddData({fileReadWays:'txt',contentTp:'wap_advice',datafileFrom:'0'});
            this.showDialog('', 'add');
            $("#sceneKey").removeAttr('disabled').css("background",'#fff');
        },
        showUpdate: function (item) {
            var _this=this;
            if(item.previewTemid){
                this.getViewData(item.previewTemid,true);
            }else{
                for(var ele in this.elementShow ){
                    this.elementShow[ele]=true;
                }
            }
            this.uploadSuccessed1 = true;
            this.isUpdate = true;
          
            this.updateId = item.sceneKey;
            this.setAddData(item);
            this.showDialog('', 'add');
            $("#sceneKey").attr('disabled','disabled').css("background",'#333');
        },
        add: function () {
            if($("#uploadInput1").val()&&$("#uploadInput1").val().indexOf('/res/')==-1 && $("#uploadInput1").val().indexOf('/mss/')==-1){
                this.showDialog('add', 'info', true, '选择后请上传！');
                return false;
            }
            // if(!this.diasceneDataPath){
            //     this.showDialog('add', 'info', true, '数字文件路径为必填');
            //     return false;
            // }
            var _this = this;
            var params = {};
            params.sceneKey = this.diasceneKey;
            params.sceneName = this.diasceneName;
            params.sceneDesc = this.diasceneDesc;
            params.sceneDataPath = this.diasceneDataPath;
            params.fileReadWays = this.diafileReadWays;
            params.verifyFilePath = this.diaverifyFilePath;
            params.dataFields = this.diadataFields;
            params.contentTp = this.diacontentTp;
            params.datafileFrom = this.diadatafileFrom;
            params.modifyBy = this.userId;

    
            params.temporaryPath  = $('#uploadInput1').val();
            // this.isUpdate && (params.sceneKey = this.updateId);
            if(!this.diasceneKey){
                _this.showDialog('add', 'info', false, "必须填写场景Key");
                return false;
            }
            var url = '/recommendSystem/recommendSystemTemplateConfig/sceneDataConfig/';
            url += this.isUpdate ? 'update.ajax' : 'add.ajax';
            $.post({
                url: url,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0);
                    }
                    _this.showDialog('add', 'info', false, result.msg);
                }
            });

        },

        //启用或禁用
        enableOrDisable: function (item) {
            var _this = this;
            $.post({
                url: '/recommendSystem/recommendSystemTemplateConfig/sceneDataConfig/enable.ajax',
                data: {sceneKey: item.sceneKey},
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('', 'info', false, '操作成功');
                        _this.getTableData(_this.currentIndex);
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            })
        },
        //删除
        deleteParams: function (item) {
            this.deleteId= item.sceneKey;
            this.showDialog('', 'delete1', false);
        },
        deleteConfirm: function (item) {
            var _this = this;
            $.post({
                url: '/recommendSystem/recommendSystemTemplateConfig/sceneDataConfig/delete.ajax',
                data: {sceneKey: this.deleteId},
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('', 'info', false, '操作成功');
                        _this.getTableData(_this.currentIndex);
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            })
        },
         // 上传文件
         uploadFiles: function () {
            if (!$('#uploadInput1').val()) {
                this.showDialog('add', 'info', true, '未选择要上传的文件');
                return;
            }
            if (!/.+(\.xlsx)$/.test($('#uploadInput1').val())) {
                this.showDialog('add', 'info', true, '文件格式必须为excel文件格式');
                return;
            }
            this.loadingShow = true;
            this.uploadSuccessed1 = false;
            var _this = this;
           
            $.ajaxFileUpload({
                url: '/recommendSystem/recommendSystemTemplateConfig/sceneDataConfig/upload1.ajax',
                type: 'POST',
                dataType: 'json',
                fileElementId: 'uploadFileInput1',
                success: function (result) {
                    // console.log(result,'123');
                    $('#uploadFileInput1').val('')
                    _this.loadingShow = false;
                    if (result.error === 0) {
                        _this.uploadSuccessed1 = true;
                        $('#uploadInput1').val(result.data);
                        // _this.diasceneDataPath=result.data;
                        $('#uploadFileInput1').on('change', function (e) {
                            _this.uploadSuccessed1 = false;
                            $('#uploadInput1').val($(this).val());
                            // console.log(e);
                        });
                        _this.showDialog('', 'add');
                    }
                    else {
                        _this.showDialog('add', 'info', true, result.msg);;
                    }
                }
            });
        },
        downloadFile: function (val) {
            if (val) {
                console.log(val)
                url = '/recommendSystem/recommendSystemTemplateConfig/sceneDataConfig/downloadFile.ajax?filePath=' + val;
                window.location.href = url;
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
        //公共方法
        getUrlParam: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg); //匹配目标参数
            if (r != null) return unescape(r[2]);
            return '';
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
        }
    }
});
