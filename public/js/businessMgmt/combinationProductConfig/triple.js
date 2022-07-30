new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        tableData: [],
        diaMsg: '',

        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        pageMaxNum: '10',
        condition: '',
        fundGroupType: 'ALL',
        loadingShow: false,
        fundGroupTypeList: {
            "01": '智投组合',
            "02": '养老组合',
            "03": '指数宝',
            "04": '三方组合',
            "05": '自建组合',
            "06": '策略组合',
            "08": '现金+',
            "10": '实盘',
            "11": '企业版现金+',
            "12": '发车组合',
            "ALL": '全部'
        },
        // // 查询
        // invnm: '',
        filePath: ''
    },
    mounted: function () {
        var dialogs = ['info', 'uploadFile', 'exportDirect'];
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
        pageMaxNum: function (val, oldval) {
            this.currentIndex = 0;
        },
        condition: function () {
            this.currentIndex = 0;
        }
    },
    methods: {
        getTableData: function (currentIndex) {

            $.post({
                url: '/businessMgmt/combinationProductConfig/triple/getList.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        this.tableData = result.data;
                    } else {
                        this.tableData = [];
                        this.currentIndex = 0;
                        this.totalPage = 0;
                        this.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
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
        //直销导出excel
        exportDirect: function () {
            window.location.href = url = '/businessMgmt/combinationProductConfig/triple/exportDirect.ajax?fundgroupType=' + this.fundGroupType;

        },
        //列表下载
        exportList: function () {
            window.location.href = url = '/businessMgmt/combinationProductConfig/triple/exportList.ajax';
        },
        selectFile: function () {
            document.getElementById("uploadFileInput").click();
        },
        showFileName: function (event) {
            if (event.target.files[0]) {
                this.filePath = event.target.files[0].name
            } else {
                this.filePath = ''
            }
        },
        fileUpload: function () {
            var file = document.getElementById('uploadFileInput')
            var ext = file.files[0].name.lastIndexOf('.');
            ext = file.files[0].name.substr(ext - 0 + 1) //获取文件后缀名
            ext = ext.toLocaleLowerCase() //转为小写
            if (ext !== 'xls' && ext !== 'xlsx') {
                this.showDialog('uploadFile', 'info', true, '只能上传xls/xlsx文件表格');
                return;
            }
            var formData = new FormData();
            // HTML 文件类型input，由用户选择
            formData.append("file", document.getElementById('uploadFileInput').files[0]);
            this.loadingShow = true;
            $.ajax({
                url: "/businessMgmt/combinationProductConfig/triple/uploadXls.ajax",
                type: "POST",
                data: formData,
                processData: false, // 不处理数据
                contentType: false, // 不设置内容类型
                success: function (result) {
                    $("#uploadFileInput").on("change", function (event) {
                        this.showFileName(event)
                    }.bind(this));
                    this.loadingShow = false;
                    if (result.error == 0) {
                        this.getTableData()
                        this.showDialog('uploadFile', 'info', false, result.msg)
                    } else {
                        this.showDialog('uploadFile', 'info', true, result.msg)
                    }
                }.bind(this)
            });

        },
    }
});