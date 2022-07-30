new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        tableData: [],
        diaMsg: '',
        zoneId: "",
        zoneName: "",
        zoneType: "",
        displayOrder: "",
        onsaleFlag: "",
        // 新增数据
        attachBanner: "",
        attachBannerMb: "",
        displayStyle: "",
        expectYieldDesc: "",
        investPeriod: "",
        onsaleDate: "",
        remarkMb1: "",
        remarkMb2: "",
        // 查看详情
        checkParam: [],
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10,

        // 详情转换显示
        displayCheck: true,
        moment: moment,
        // 全选
        allCheck: false,
        checkAll: false,
        // 删除数据
        deleteId: [],
        // 获取到关联产品
        fundList: [],
        //关联产品获取
        nameList: [],
        // 关联产品参数数组
        // hlvlFundList:[{
        //     zoneId:'',
        //     fundId:'',
        //     displayOrder:'',
        // }],
        displayOrders: '',
        // 上传图片
        filePath: '',
        filePaths: '',
    },

    mounted: function () {
        var dialogs = ['info', 'add', 'revise', 'relation', 'detailed', 'del'];
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
        // 时间插件
        $('.date-timepicker').datetimepicker({
            format: 'YYYYMMDD',//use this option to display seconds
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
    },
    watch: {
        pageMaxNum: function () {
            this.getTableData(0);
        }
    },
    methods: {
        getTableData: function (currentIndex) {
            var _this = this;
            var params = {};
            params.pageNo = currentIndex + 1;
            params.pageSize = this.pageMaxNum;
            $.post({
                url: '/businessMgmt/highFinancialMgmt/productAreaMgmt/getTableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        // _this.tableData = result.data;
                        // 后端分页 展示
                        _this.tableData = result.data.tableData;
                        _this.currentIndex = result.data.pageNo - 1;
                        _this.totalPage = result.data.totalSize;
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

        // 新增数据
        showAdd: function () {
            var _this = this;
            this.zoneId = "";
            this.zoneName = "";
            this.zoneType = "";
            this.displayOrder = "";
            this.onsaleFlag = "";
            this.filePath = "";
            this.filePaths = "";
            $("#uploadFileInput1").val("")
            $("#uploadFileInput2").val("")
            this.displayStyle = "";
            this.expectYieldDesc = "";
            this.investPeriod = "";
            this.onsaleDate = "";
            this.remarkMb1 = "";
            this.remarkMb2 = "";

            $('#uploadFileInput1').on('change', function () {
                $('#uploadInput').val($(this).val());
            });

            this.showDialog('', 'add', "false");
        },
        saveParam: function () {
            var _this = this;
            var hlvlFundList = [];
            var params = {};
            params.zoneId = this.zoneId;
            params.zoneName = this.zoneName;
            params.zoneType = this.zoneType;
            params.displayOrder = this.displayOrder;
            params.onsaleFlag = this.onsaleFlag;
            params.attachBanner = this.filePath;
            params.attachBannerMb = this.filePaths;
            params.displayStyle = this.displayStyle;
            params.expectYieldDesc = this.expectYieldDesc;
            params.investPeriod = this.investPeriod;
            params.onsaleDate = this.$refs.onsaleDate.value;
            params.remarkMb1 = this.remarkMb1;
            params.remarkMb2 = this.remarkMb2;
            hlvlFundList.push({
                zoneId: "",
                displayOrder: "",
                fundId: "",
                fundNm: '',
            })
            var arr = JSON.stringify(hlvlFundList)
            params.hlvlFundZoneMappingList = arr
            if (params.zoneId == "") {
                return _this.showDialog('add', 'info', true, "请输入专区代码！");
            }
            if (params.zoneId.length < 6) {
                return _this.showDialog('add', 'info', true, "专区代码必须为6位数字！");
            }
            if (isNaN(params.zoneId)) {
                return _this.showDialog('add', 'info', true, "专区代码必须为6位数字！");
            }
            $.post({
                url: '/businessMgmt/highFinancialMgmt/productAreaMgmt/saveParam.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0);
                        _this.showDialog('add', 'info', false, result.msg);
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        // 修改数据
        showUpdate: function (item) {
            var _this = this;
            this.fundList = []
            $("#uploadFileInput3").val("")
            $("#uploadFileInput4").val("")
            // this.zoneId=item.zoneId;
            // this.zoneName=item.zoneName;
            // this.zoneType=item.zoneType;
            // this.displayOrder=item.displayOrder;
            // this.onsaleFlag=item.onsaleFlag;
            // this.attachBanner=item.attachBanner;
            // this.attachBannerMb=item.attachBannerMb;
            // this.displayStyle=item.displayStyle;
            // this.expectYieldDesc=item.expectYieldDesc;
            // this.investPeriod=item.investPeriod;
            // this.onsaleDate=item.onsaleDate;
            // this.remarkMb1=item.remarkMb1;
            // this.remarkMb2=item.remarkMb2;
            var params = {};
            this.zoneId = item.zoneId;
            params.zoneId = this.zoneId;
            this.showDialog('', 'revise');
            $.post({
                url: '/businessMgmt/highFinancialMgmt/productAreaMgmt/checklist.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        // _this.getTableData(0);
                        _this.checkParam = result.data.body;
                        _this.fundList = result.data.body.hlvlFundZoneMappingList ? result.data.body.hlvlFundZoneMappingList.map(function (item) {
                            return {
                                displayOrder: item.displayOrder,
                                fundId: item.fundId,
                                fundName: item.fundNm
                            };
                        }) : [];
                    }
                    _this.showDialog('', 'revise', false, result.msg);
                }
            });
        },
        //关联产品添加新增
        relation: function (currentIndex) {
            var _this = this;
            var fundDetails = this.fundList.map(function (item) {
                return {
                    fundId: item.fundId,
                    displayOrder: item.displayOrder
                };
            });
            //关联产品名称
            var params = {};
            params.pageNum = currentIndex + 1;
            params.pageSize = this.pageMaxNum + 9980;
            if (this.nameList.length === 0) {
                $.post({
                    url: '/businessMgmt/highFinancialMgmt/productAreaMgmt/fundList.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.nameList = result.data.listData;
                            _this.setListCheckStatus(fundDetails, _this.nameList);
                            _this.currentIndex = result.data.pageNum - 1;
                            _this.totalPage = result.data.totalSize;
                            _this.showDialog('revise', 'relation', false);
                        }
                        else {
                            _this.nameList = [];
                            _this.showDialog('revise', 'info', true, result.msg);
                        }
                    }
                });
            }
            else {
                _this.setListCheckStatus(fundDetails, _this.nameList);
                _this.showDialog('revise', 'relation', false);
            }

            if (this.checkParam.hlvlFundZoneMappingList == null) {
                return
            } else {
                this.checkParam.hlvlFundZoneMappingList.forEach(function (item) {
                    for (var i = 0; i < _this.nameList.length; i++) {
                        if (item.fundId === _this.nameList[i].fundId) {
                            _this.nameList[i].check = true;
                            break;
                        }
                    }
                });
            }
        },
        setListCheckStatus: function (fundDetails, list) {
            list.forEach(function (item) {
                item.displayOrder = '',
                    item.check = false;
            });
            fundDetails.forEach(function (item) {
                for (var i = 0; i < list.length; i++) {
                    if (item.fundId === list[i].fundId) {
                        list[i].check = true;
                        list[i].displayOrder = item.displayOrder;
                        break;
                    }
                }
            });

            if (this.checkParam.hlvlFundZoneMappingList == null) {
                return
            } else {
                this.checkParam.hlvlFundZoneMappingList.forEach(function (item) {
                    for (var i = 0; i < list.length; i++) {
                        if (item.fundId === list[i].fundId) {
                            list[i].check = true;
                            break;
                        }
                    }
                });
            }
        },
        //提交按钮-添加到关联表格中
        checkList: function () {
            this.fundList = this.nameList.filter(function (item) {
                return item.check;
            }).map(function (item) {
                return {
                    fundId: item.fundId,
                    fundName: item.fundName,
                    displayOrder: item.displayOrder
                };
            });
            if (this.fundList.length === 0) {
                this.showDialog('relation', 'info', true, '未选择任何数据');
                return;
            }
            this.showDialog('relation', 'revise', false);
        },
        update: function () {
            var _this = this;
            var params = {};
            var hlvlFundList = [];
            // 主基金产品
            params.zoneId = this.checkParam.zoneId;
            params.zoneName = this.checkParam.zoneName;
            params.zoneType = this.checkParam.zoneType;
            params.displayOrder = this.checkParam.displayOrder;
            params.onsaleFlag = this.checkParam.onsaleFlag;
            params.attachBanner = this.checkParam.attachBanner;
            params.attachBannerMb = this.checkParam.attachBannerMb;
            params.displayStyle = this.checkParam.displayStyle;
            params.expectYieldDesc = this.checkParam.expectYieldDesc;
            params.investPeriod = this.checkParam.investPeriod;
            params.onsaleDate = this.$refs.onsaleDate.value;
            params.remarkMb1 = this.checkParam.remarkMb1;
            params.remarkMb2 = this.checkParam.remarkMb2;

            // 关联产品
            for (var i = 0; i < this.fundList.length; i++) {
                hlvlFundList.push({
                    zoneId: this.zoneId,
                    displayOrder: this.fundList[i].displayOrder,
                    fundId: this.fundList[i].fundId,
                    fundNm: this.fundList[i].fundName,
                })
            }
            params.hlvlFundZoneMappingList = JSON.stringify(hlvlFundList);
            console.log(params)
            $.post({
                url: '/businessMgmt/highFinancialMgmt/productAreaMgmt/update.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0);
                        // _this.showDialog('revise', 'info', false, result.msg);
                    }
                    _this.showDialog('revise', 'info', false, result.msg);
                }
            });
        },
        //关联产品删除行
        delList: function (index) {
            // console.log("this",this.fundList)
            // console.log("other",this.checkParam.hlvlFundZoneMappingList)
            // var arrList=this.checkParam.hlvlFundZoneMappingList
            // this.fundList.forEach(function(item){
            //     for (var i = 0; i < arrList.length; i++) {
            //         if(item.fundId===arrList[i].fundId){
            //             this.fundList.slice(arrList[0],1)
            //             // this.checkParam.hlvlFundZoneMappingList.splice(arrList[0], 1)
            //         }
            //     }
            // })

            // var index = this.fundList.findIndex(item => {
            //     console.log(1111)
            //     if (item.index == index) {
            //         return true
            //     }
            // })  
            this.fundList.splice(index, 1)
        },
        delList2: function (index) {
            // var index = this.checkParam.hlvlFundZoneMappingList.findIndex(item => {
            //     if (item.index == index) {
            //         return true
            //     }
            // }) 
            this.checkParam.hlvlFundZoneMappingList.splice(index, 1)
        },
        // 查看详情
        checklist: function (item) {
            var _this = this;
            var params = {};
            this.zoneId = item.zoneId;
            params.zoneId = this.zoneId;
            $.post({
                url: '/businessMgmt/highFinancialMgmt/productAreaMgmt/checklist.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        // _this.getTableData(0);
                        console.log("获取成功", result.data.body)
                        _this.checkParam = result.data.body;
                    }
                    _this.showDialog('del', 'info', false, result.msg);
                }
            });
            this.showDialog('', 'detailed');
        },
        // 删除数据
        showDelete: function () {
            var _this = this
            var hasCheck = false;
            for (var i = 0; i < this.tableData.length; i++) {
                if (this.tableData[i].check) {
                    hasCheck = true;
                }
            }
            if (!hasCheck) {
                this.showDialog('', 'info', false, '未选择任何数据');
                return;
            }
            this.showDialog('', 'del');
        },
        deleteList: function () {
            var _this = this;
            var params = {};
            // 组合删除
            var zoneIds = [];
            for (var i = 0; i < this.tableData.length; i++) {
                if (this.tableData[i].check) {
                    zoneIds.push(this.tableData[i].zoneId);
                }
            }
            this.deleteId = zoneIds
            params.zoneIds = JSON.stringify(this.deleteId)
            $.post({
                url: '/businessMgmt/highFinancialMgmt/productAreaMgmt/deleteParam.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0);
                        _this.showDialog('del', 'info', false, result.msg);
                    }
                    _this.showDialog('del', 'info', false, result.msg);
                }
            });
        },

        // 文件上传-图片
        choose: function (index) {
            if (index == 1) {
                return document.getElementById("uploadFileInput1").click();
            }
            if (index == 2) {
                return document.getElementById("uploadFileInput2").click();
            }
        },
        showFileName: function (event) {
            this.filePath = event.target.files[0].name
        },
        showFileNames: function (event) {
            this.filePaths = event.target.files[0].name
        },
        updateFile: function (index) {
            if (index == 1) {
                return document.getElementById("uploadFileInput3").click();
            }
            if (index == 2) {
                return document.getElementById("uploadFileInput4").click();
            }
        },
        FileName: function (event) {
            var _this = this;
            this.checkParam.attachBanner = event.target.files[0].name;
        },
        FileNames: function (event) {
            var _this = this;
            this.checkParam.attachBannerMb = event.target.files[0].name;
        },
        // 新增文件上传
        fileUpload: function (index) {
            var _this = this;
            if (index == 1) {
                var filePath = this.filePath;
                console.log(filePath)
            }
            if (index == 2) {
                var filePath = this.filePaths;
            }
            var afterFile = filePath.indexOf('.');
            afterFile = filePath.substr(afterFile - 0 + 1) //获取文件后缀名
            afterFile = afterFile.toLocaleLowerCase() //转为小写
            if ((this.filePaths !== '' && this.filePath !== '') && afterFile != 'png' && afterFile != 'jpg' && afterFile != 'gif') {
                this.showDialog('add', 'info', true, '只能上传png、jpg、gif格式图片');
                return;
            }
            if (index == 1 && this.filePath != "") {
                var file = document.getElementById("uploadFileInput1")
                var formdata = new FormData();
                formdata.append('file', file.files[0])
                // $.ajaxFileUpload({
                //     url: '/businessMgmt/highFinancialMgmt/productAreaMgmt/upload.ajax',
                //     type: 'POST',
                //     dataType: 'json',
                //     secureuri: false,
                //     fileElementId: fileElementId,
                //     success: function (result) {
                //         if (result.error == 0) {
                //             _this.filePath = result.data
                //             _this.showDialog('add', 'info', true, result.msg)
                //             _this.getTableData(0)
                //         } else {
                //
                //             _this.showDialog('add', 'info', true, result.msg)
                //         }
                //     }
                // });

                $.post({
                    url: '/businessMgmt/highFinancialMgmt/productAreaMgmt/upload.ajax',
                    cache: false,
                    data: formdata,
                    processData: false,
                    contentType: false,
                }).done(function (result) {
                    if (result.error === 0) {
                        _this.filePath = result.data
                        _this.showDialog('add', 'info', true, result.msg);
                        _this.getTableData(0)
                    } else {
                        _this.showDialog('add', 'info', true, result.msg);
                    }
                }).fail(function (err) {
                    console.log(err)
                    _this.showDialog('add', 'info', true, '上传失败');
                });
            }
            if (index == 2 && this.filePaths != "") {
                // var fileElementId = 'uploadFileInput2';
                var file = document.getElementById("uploadFileInput2")
                var formdata = new FormData();
                formdata.append('file', file.files[0])
                $.post({
                    url: '/businessMgmt/highFinancialMgmt/productAreaMgmt/upload.ajax',
                    cache: false,
                    data: formdata,
                    processData: false,
                    contentType: false,
                }).done(function (result) {
                    _this.filePaths = true;
                    if (result.error === 0) {
                        _this.filePaths = result.data
                        _this.showDialog('add', 'info', true, result.msg);
                        _this.getTableData(0)
                    } else {
                        _this.showDialog('add', 'info', true, result.msg);
                    }
                }).fail(function (err) {
                    // _this.filePaths = true;
                    console.log(err)
                    _this.showDialog('add', 'info', true, '上传失败');
                });
            }
        },
        // 修改文件上传
        fileUploads: function (index) {
            var _this = this;
            if (index == 1) {
                var filePath =this.checkParam.attachBanner;
            }
            if (index == 2) {
                var filePath =this.checkParam.attachBannerMb;
            }
            var afterFile = filePath.indexOf('.');
            afterFile = filePath.substr(afterFile - 0 + 1) //获取文件后缀名
            afterFile = afterFile.toLocaleLowerCase() //转为小写
            if ((this.checkParam.attachBanner !== '' && this.checkParam.attachBannerMb !== '') && afterFile != 'png' && afterFile != 'jpg' && afterFile != 'gif') {
                this.showDialog('revise', 'info', true, '只能上传png、jpg、gif格式图片');
                return;
            }
            if (index == 1 && this.checkParam.attachBanner != "") {
                // var fileElementId = 'uploadFileInput3';
                var file = document.getElementById("uploadFileInput3")
                var formdata = new FormData();
                formdata.append('file', file.files[0])
                // $.ajaxFileUpload({
                //     url: '/businessMgmt/highFinancialMgmt/productAreaMgmt/uploads.ajax',
                //     type: 'POST',
                //     dataType: 'json',
                //     secureuri: false,
                //     fileElementId: fileElementId,
                //     success: function (result) {
                //         if (result.error == 0) {
                //             _this.showDialog('revise', 'info', true, result.msg)
                //             _this.getTableData(0)
                //         } else {
                //
                //             _this.showDialog('revise', 'info', true, result.msg)
                //         }
                //     }
                // });
                $.post({
                    url: '/businessMgmt/highFinancialMgmt/productAreaMgmt/uploads.ajax',
                    cache: false,
                    data: formdata,
                    processData: false,
                    contentType: false,
                }).done(function (result) {
                    if (result.error === 0) {
                        _this.checkParam.attachBanner = result.data
                        _this.showDialog('revise', 'info', true, result.msg);
                        _this.getTableData(0)
                    } else {
                        _this.showDialog('revise', 'info', true, result.msg);
                    }
                }).fail(function (err) {
                    console.log(err)
                    _this.showDialog('revise', 'info', true, '上传失败');
                });
            }
            if (index == 2 && this.checkParam.attachBannerMb != "") {
                // var fileElementId = 'uploadFileInput4';
                var file = document.getElementById("uploadFileInput4")
                var formdata = new FormData();
                formdata.append('file', file.files[0])
                $.post({
                    url: '/businessMgmt/highFinancialMgmt/productAreaMgmt/uploads.ajax',
                    cache: false,
                    data: formdata,
                    processData: false,
                    contentType: false,
                }).done(function (result) {
                    if (result.error === 0) {
                         _this.checkParam.attachBannerMb = result.data
                        _this.showDialog('revise', 'info', true, result.msg);
                        _this.getTableData(0)
                    } else {
                        _this.showDialog('revise', 'info', true, result.msg);
                    }
                }).fail(function (err) {
                    console.log(err)
                    _this.showDialog('revise', 'info', true, '上传失败');
                });
            }
        },
        // 清除文件
        clear: function (index) {
            if (index == 1) {
                this.filePath = ""
                this.checkParam.attachBanner = ''
            }
            if (index == 2) {
                this.filePaths = ""
                this.checkParam.attachBannerMb = ''
            }
        },
        // 下载文件
        download: function (fileName) {
            var _this = this;
            console.log(fileName)
            if (fileName == null) {
                return
            }
            if (fileName == _this.filePath || fileName == _this.checkParam.attachBanner) {
                var url = '/businessMgmt/highFinancialMgmt/productAreaMgmt/upload.ajax?filePath=' + fileName;
            }
            else if (fileName == _this.filePaths || fileName == _this.checkParam.attachBannerMb) {
                var url = '/businessMgmt/highFinancialMgmt/productAreaMgmt/uploads.ajax?filePaths=' + fileName;
            }
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
        single: function (index) {
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
        select: function (checkAll) {
            var _this = this;
            //如果父级被选中，那么子集循环，全被给checked=true
            if (!checkAll) {
                _this.nameList.forEach(function (item) {
                    item.check = true;
                });
            } else {
                //相反，如果没有被选中，子集应该全部checked=false
                _this.nameList.forEach(function (item) {
                    item.check = false;
                });
            }
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
    },
    // 类型状态
    filters: {
        zoneType: function (item) {
            if (item === "0") {
                return "普通专区"
            } else if (item === "1") {
                return "品牌专区"
            } else {
                return "其他"
            }
        },
        onsaleFlag: function (item) {
            if (item === "0") {
                return "下架"
            } else if (item === "1") {
                return "上架"
            } else {
                return "其他"
            }
        },
    }
});

