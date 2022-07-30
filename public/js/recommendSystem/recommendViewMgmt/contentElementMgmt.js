new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        elementName:'',
        elementKey:'',
        contentTp:'',
        tableData: [],
        contentTpList:[],
        userId: '',
        diaMsg: '',
        previewPath: '',
        loadingStatus: '数据获取中...',
        isUpdate: false,
        updateId:'',
        deleteId1:'',
        deleteTp1:'',
        loadingShow: false,
        //dialog新增修改数据
        diacontentTp: '',
        diaelementName: '',
        diaelementKey: '',
        diaremark: '',



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
        }
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
        //内容类型list获取
        $.post({
            url: '/recommendSystem/recommendViewMgmt/contentElementMgmt/contentTp.ajax',
            data: {pageNo: 1,pageSize:9999},
            success: function (result) {
                if (result.error === 0) {
                    if(result.data.rows.length>0){
                        _this.contentTpList=result.data.rows;
                    }else{
                        _this.showDialog('', 'info', false, '内容类型暂无数据');
                    }

                } else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });
        this.getTableData(0);
    },
    methods: {
        //getlist
        getTableData: function (currentIndex) {
            var params = {};
            var _this = this;
            params.pageNo = currentIndex + 1;
            params.pageSize = this.pageMaxNum;
            params.elementName = this.elementName;
            params.elementKey = this.elementKey;
            params.contentTp = this.contentTp;
            _this.loadingStatus = '数据获取中...';
            $.post({
                url: '/recommendSystem/recommendViewMgmt/contentElementMgmt/queryInfo.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        console.log(result);
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
            this.diacontentTp = obj.contentTp ? obj.contentTp : '';
            this.diaelementKey = obj.elementKey ? obj.elementKey : '';
            this.diaelementName = obj.elementName ? obj.elementName : '';
            this.diaremark = obj.remark ? obj.remark : '';
        },
        showAdd: function () {
            // $("#key").removeAttr('disabled').css("background",'#fff');
            this.isUpdate = false;
            this.setAddData({});
            this.showDialog('', 'add');
        },
        showUpdate: function (item) {
            this.updateId=item.id;
            // $("#key").attr('disabled','disabled').css("background",'#eee');
            this.isUpdate = true;
            this.setAddData(item);
            this.showDialog('', 'add');
        },
        add: function () {
            var _this = this;
            var params = {};
            if(this.diaelementName==''){
                _this.showDialog('add', 'info', true, '名称必须填写！');
                return;
            }
            if(this.diaelementKey==''){
                _this.showDialog('add', 'info', true, 'key必须填写！');
                return;
            }
            if(this.diacontentTp==''){
                _this.showDialog('add', 'info', true, '内容类型必选！');
                return;
            }
            params.contentTp = _this.diacontentTp;
            params.elementName = _this.diaelementName;
            params.elementKey = _this.diaelementKey;
            params.remark = _this.diaremark;
            !_this.isUpdate&&(params.createBy=_this.userId);
            _this.isUpdate&&(params.modifyBy=_this.userId);
            _this.isUpdate&&(params.id=_this.updateId);
            var url = '/recommendSystem/recommendViewMgmt/contentElementMgmt/';
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
        //删除
        deleteParams: function (item) {
            this.deleteId1=item.id;
            // this.deleteTp1=item.contentTp;
            this.showDialog('', 'delete1', false);
        },
        deleteConfirm:function () {
            var _this = this;
            $.post({
                url: '/recommendSystem/recommendViewMgmt/contentElementMgmt/delete.ajax',
                data: {id: _this.deleteId1},
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
    }
});
