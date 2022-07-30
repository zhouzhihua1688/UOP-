new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        tableData: [],
        diaMsg: '',
        fundId: '',
        fundName: '',
        tagValue: '',
        tagDesc: '',
        tagCategoryId: '',
        tagCategoryName: '',
        showflag: '',
        priority: '',
        isValid: '',
        endDate: '',
        // 查询
        fundIds: '',
        tagValues: '',
        tagCategoryIds: '',
        productCategory: '',
        isHtf: '',
        isValid: '',
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10,
        condition: "",
        // 增加基金标签
        listDate: [],
        // 新增弹窗一级菜单名称
        tagListName: [],
        // 新增弹窗二级菜单名称
        tagDescName: [],
        // 修改
        fundid: "",
        // 全选
        allCheck: false,
        // 批量删除
        deleteList: [],

        uploading: false,//上传gif
    },
    // created: function () {
    //     this.getTagName();
    // },
    mounted: function () {
        var dialogs = ['info', 'del', 'add', 'revise', 'uploadFile'];
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
        this.getTagName();
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
            }
            else {
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
            }
            else if (this.currentIndex <= this.maxSpace && this.middleData.length - this.currentIndex > this.maxSpace) {
                for (var i = 0; i < this.currentIndex + (2 * this.maxSpace - this.currentIndex); i++) {
                    arr.push(i + 1);
                }
            }
            else if (this.currentIndex > this.maxSpace && this.middleData.length - this.currentIndex <= this.maxSpace) {
                var space = this.middleData.length - this.currentIndex;
                for (var i = this.currentIndex - (2 * this.maxSpace - space); i < this.middleData.length; i++) {
                    arr.push(i + 1);
                }
            }
            else {
                for (var i = 0; i < this.middleData.length; i++) {
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
        },
    },
    watch: {
        // 假分页
        pageMaxNum: {
            handler: function (val, oldval) {
                this.currentIndex = 0;
                this.getTableData(0)
            }
        },
        condition: {
            handler: function (val, oldval) {
                this.currentIndex = 0;
            }
        },
    },
    methods: {
        getTableData: function (currentIndex) {
            var _this = this;
            var params = {};
            params.tagVersion = 1;
            params.fundId = this.fundIds;
            params.tagValue = this.tagValues;
            params.tagCategoryId = this.tagCategoryIds;
            params.productCategory = this.productCategory;
            params.isHtf = this.isHtf;
            params.isValid = this.isValid;

            // if(params.fundId==''){
            //     return _this.showDialog('', 'info', false, "基金代码不能为空");
            // }
            $.post({
                url: '/businessMgmt/fundTag/fundTagSettingNew/getTableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.currentIndex = 0;
                        _this.tableData = result.data.body.filter(function (item) {
                            item.productCategory = item.productCategory ? item.productCategory : '';
                            return item.fundId.indexOf(params.fundId) > -1
                                && item.tagValue.indexOf(params.tagValue) > -1
                                && item.tagCategoryId.indexOf(params.tagCategoryId) > -1
                                && item.productCategory.toString().indexOf(params.productCategory) > -1
                                && item.isHtf.toString().indexOf(params.isHtf) > -1
                                && item.isValid.toString().indexOf(params.isValid) > -1;
                        });
                    }
                    else {
                        _this.tableData = [];
                        _this.currentIndex = 0;
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });

        },

        // 获取新增弹窗里基金代码一级菜单名称
        getTagName: function () {
            var _this = this;
            var params = {};
            $.post({
                url: '/businessMgmt/fundTag/fundTagSettingNew/getTagName.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.tagListName = result.data.body;
                    }
                    else {
                        _this.tagListName = [];
                        _this.currentIndex = 0;
                        _this.totalPage = 0;
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        // 获取新增弹窗里基金代码二级菜单名称
        tagList: function (tagItem,id) {
            console.log(tagItem);
            var obj = this.listDate.filter(function (item) {
                return item.id === id;
            })[0];
            obj.fundListSelect2 = '';
            obj.fundList2 = [];
            $.post({
                url: '/businessMgmt/fundTag/fundTagSettingNew/getDescName.ajax',
                data: {tagId: obj.fundListSelect},
                success: function (result) {
                    if (result.error == 0) {
                        obj.fundList2 = result.data.body;
                        console.log(obj);
                    } else {
                        obj.fundList2 = [];
                    }
                }
            });
        },
        // 新增基金标签
        showAdd: function () {
            var _this = this;
            this.fundId = ""
            this.priority = ""
            this.showFlag = ""
            this.tagCategoryName = ""
            this.tagDesc = "";
            this.isValid = "";
            this.endDate = "";
            _this.listDate = []
            _this.showDialog('', 'add', false);
        },
        addList: function () {
            var _this = this;
            this.listDate.push({
                id: new Date().getTime(), //加入时间戳判断用
                check: false,
                fundId: this.listDate.fundId,
                tagDesc: this.listDate.tagDesc,
                tagCategoryName:this.listDate.tagCategoryName,
                showFlag: this.listDate.showFlag,
                priority: this.listDate.priority,
                isValid: this.listDate.isValid,
                endDate: this.listDate.endDate,
                // 分别存储一级,二级菜单
                fundListSelect:"",
                fundListSelect2:"",
                fundList2:[]
            });
            console.log("this.listDate",this.listDate)
        },
        saveParam: function () {
            var _this = this;
            // var arr = []
            // arr = this.listDate
            var arrList=this.listDate.map(function(item){
                let content ={};
                content.fundId = item.fundId;
                content.showFlag = item.showFlag;
                content.priority = item.priority;
                content.isValid = item.isValid;
                content.endDate = item.endDate;
                content.tagDesc = item.fundListSelect2;
                content.tagCategoryName = _this.tagListName.filter(function (tagItem) {
                    return tagItem.tagid == item.fundListSelect;
                })[0].tagnm;
                return content;
            });

            console.log("arrList",arrList)
            if (arrList == "") {
                _this.showDialog('', 'info', false, "变量为空不通过");
                return false
            }
            $.post({
                url: '/businessMgmt/fundTag/fundTagSettingNew/saveBatch.ajax',
                data: {
                    arr: JSON.stringify(arrList)
                },
                success: function (result) {
                    if (result.error === 0) {
                        _this.listDate = []
                        setTimeout(function () {
                            _this.getTableData(_this.currentIndex);
                        }, 2000);
                    }
                    _this.showDialog('', 'info', false, result.msg);
                }
            });
        },
        // 删除行
        delList: function (index) {
            var index = this.listDate.findIndex(item => {
                if (item.id == index) {
                    return true
                }
            })
            // if (this.listDate.length > 1) {
            this.listDate.splice(index, 1)
            // }
        },
        // 修改数据
        showUpdate: function (item) {
            var _this = this;
            this.fundId = item.fundId;
            this.tagId = item.tagId
            this.tagValue = item.tagValue;
            this.tagDesc = item.tagDesc;
            this.tagCategoryId = item.tagCategoryId;
            this.tagCategoryName = item.tagCategoryName;
            this.showflag = item.showflag;
            this.priority = item.priority;
            this.isValid = item.isValid;
            this.endDate = item.endDate;
            _this.showDialog('', 'revise', false);
        },
        update: function () {
            var _this = this
            var params = {}
            params.fundid = this.fundId
            params.tagid = this.tagCategoryId
            params.tagvalue = this.tagValue
            params.priority = this.priority
            params.showflag = this.showflag;
            params.isValid = this.isValid;
            params.endDate = this.endDate;

            $.post({
                url: '/businessMgmt/fundTag/fundTagSettingNew/update.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        // _this.getTableData(0);
                        // window.location.reload()
                        // setTimeout(function(){
                        //    _this.getTableData(0)
                        // },1000);
                        $("#info").click(function () {
                            _this.getTableData(0)
                        })
                    }
                    _this.showDialog('revise', 'info', false, result.msg);
                }
            });
        },
        // 批量删除
        showDelete: function () {
            var _this = this;
            var hasCheck = false;
            for (var i = 0; i < this.tableData.length; i++) {
                if (this.tableData[i].check) {
                    hasCheck = true;
                }
            }
            if (!hasCheck) {
                this.showDialog('', 'info', false, '请选择相关记录');
                return;
            }
            this.showDialog('', 'del', false);
        },
        deleteParam: function () {
            var _this = this;
            var params = {};
            // 组合删除
            var fundIds = [];
            for (var i = 0; i < this.tableData.length; i++) {
                if (this.tableData[i].check) {
                    fundIds.push({
                        fundId: this.tableData[i].fundId,
                        tagCategoryId: this.tableData[i].tagCategoryId,
                        tagValue: this.tableData[i].tagValue,
                    });
                }
            }
            this.deleteList = fundIds
            params.fundIds = JSON.stringify(this.deleteList)
            console.log(params)
            $.post({
                url: '/businessMgmt/fundTag/fundTagSettingNew/deleteParam.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        setTimeout(function () {
                            _this.getTableData(0)
                        }, 2000);
                    }
                    _this.showDialog('del', 'info', false, result.msg);
                }
            });
        },
        // 全量导出
        exportAll: function () {

            var _this = this;
            var url;
            url = '/businessMgmt/fundTag/fundTagSettingNew/exportAll.ajax'
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
        // //主表格分页方法
        // check: function (item) {
        //     item.check = !item.check;
        // },
        // allCheck: function () {
        //     var _this = this;
        //     var flag = this.checkAll;
        //     this.tableData.forEach(function (item) {
        //         item.check = !flag;
        //     });
        // },
        // prev: function () {
        //     if (this.currentIndex <= 0) {
        //         return;
        //     }
        //     this.getTableData(this.currentIndex - 1);
        // },
        // next: function () {
        //     if (this.currentIndex >= this.totalPage - 1) {
        //         return;
        //     }
        //     this.getTableData(this.currentIndex + 1);
        // },
        // changeIndex: function (index) {
        //     this.getTableData(index - 1);
        // },
        // toFirst: function () {
        //     this.getTableData(0);
        // },
        // toLast: function () {
        //     this.getTableData(this.totalPage - 1);
        // },
        // 单选
        check: function (index) {
            index.check = !index.check;
        },
        // 用户全选
        selectAll: function (allCheck) {
            var _this = this;
            //如果父级被选中，那么子集循环，全被给checked=true
            if (!allCheck) {
                _this.tableData.forEach(function (item) {
                    item.check = true;
                });
            } else {
                //相反，如果没有被选中，子集应该全部checked=false
                _this.tableData.forEach(function (item) {
                    item.check = false;
                });
            }
        },
        //主表格假分页方法
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
        upload: function () {
            var file = this.$refs.file.files[0];
            if (!file) {
                this.showDialog('uploadFile', 'info', true, '请选择文件');
                return;
            }
            var index = file.name.lastIndexOf('.')
            if (index === -1) {
                this.showDialog('uploadFile', 'info', true, '文件名格式错误');
                return;
            }
            var ext = file.name.substr(index + 1).toLocaleLowerCase()//截取后缀并转化为小写
            var fileType = ['xls', 'xlsx']
            if (fileType.indexOf(ext) === -1) {
                this.showDialog('uploadFile', 'info', true, '仅支持xls、xlsx格式文件');
                return;
            }
            this.uploading = true;
            var _this = this;
            var formData = new FormData()
            formData.append('file', file)
            $.post({
                url: '/businessMgmt/fundTag/fundTagSettingNew/upload.ajax',
                data: formData,
                contentType: false, // 不设置内容类型  
                processData: false, // 不处理数据
                success: function (result) {
                    _this.uploading = false;
                    if (result.error === 0) {
                        _this.$refs.file.value = '';
                        // _this.getTableData(0);
                        setTimeout(function () {
                            _this.getTableData(0)
                        }, 2000);
                        _this.showDialog('uploadFile', 'info', false, result.msg);
                    } else {
                        _this.showDialog('uploadFile', 'info', true, result.msg);
                    }
                }
            });
        }
    },
    // 类型状态
    filters: {
        // status: function (item) {
        //     if (item === "0") {
        //         return "已关注"
        //     } else if (item === "1") {
        //         return "取消关注"
        //     } else {
        //         return "其他"
        //     }
        // },  
    },
    components: {
        'date-picker': VueBootstrapDatetimePicker
    }
});

