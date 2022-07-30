
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
        classify: 'ALL',
        userId: '',
        qFundid: '476026',//查询
        lineFundIdList: [],

        fundDetail: {
            attachcontract: '',//附件   产品合同
            attachriskexp: '',//附件   认购风险申明书	
            deposit: '',//附件   保证金协议		
            attachaddendum: '',//附件   补充协议			
            onepage: '',//附件   一页通	
            attachinvestexp: '',//附件   投资说明书	
            attachpdtprom: '',//附件   产品宣传册	
            commitment: '',//附件   承诺函		
            attachpledge: '',//附件   质押借款协议	

            attachbanner: '',//附件   Banner			
            attachbannermob: '',//附件   Banner(手机)		
            attachcustomdetail: '',//附件   上传自定义详情(仅支持zip格式)	
            attachcustomdetailm: '',//附件   上传手机自定义详情(仅支持zip格式)

            attachcontractfile: '',//附件   产品合同
            attachriskexpfile: '',//附件   认购风险申明书	
            depositfile: '',//附件   保证金协议		
            attachaddendumfile: '',//附件   补充协议			
            onepagefile: '',//附件   一页通	
            attachinvestexpfile: '',//附件   投资说明书	
            attachpdtpromfile: '',//附件   产品宣传册	
            commitmentfile: '',//附件   承诺函		
            attachpledgefile: '',//附件   质押借款协议	
            serialno: '',
            fundid: '',
        },
        clearFiles: [],
        initialData: {},
        alwaysClick: true,//阻止连续点击
    },
    created: function () {
        var _this = this;
        $.post({//基金名称查询
            url: '/businessMgmt/IPOMgmtEC/IPOUpload/collection.ajax',
            data: {
                fundTypeCustomized: this.classify
            },
            success: function (result) {
                if (result.error === 0) {
                    _this.lineFundIdList = result.data
                } else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });
    },
    mounted: function () {
        var dialogs = ['info', 'operation', 'detail'];
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
        },
        classify: function (oldval, newval) {
            var _this = this;
            $.post({//基金名称查询
                url: '/businessMgmt/IPOMgmtEC/IPOUpload/collection.ajax',
                data: {
                    fundTypeCustomized: newval
                },
                success: function (result) {
                    if (result.error === 0) {
                        _this.qFundid = ''
                        _this.selectOption.lineFundIdList = result.data.map(function (item) {
                            return {
                                fundId: item.fundid,
                                fundName: item.fundnm
                            }
                        })
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        }
    },
    methods: {
        getTableData: function (currentIndex) {
            var _this = this;

            var params = {
                fundIdList: this.qFundid
            };
            $.post({
                url: '/businessMgmt/IPOMgmtEC/IPOUpload/getLineList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.tableData = result.data;
                        _this.userid = result.userid;
                    } else {
                        _this.tableData = [];
                        _this.currentIndex = 0;
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
        checkFileExt: function (file, type) {
            var index = file.lastIndexOf('.')
            if (index === -1) {
                return false
            }
            var ext = file.substr(index + 1).toLocaleLowerCase()//截取后缀并转化为小写
            console.log('ext', ext)
            var fileType = ['doc', 'docx', 'pdf'], banner = ['jpg', 'jpeg', 'gif', 'bmp', 'tiff', 'psd', 'png'], zip = ['zip'];
            if (type === 'file') {
                if (fileType.indexOf(ext) === -1) {
                    return false
                }
            } else if (type === 'banner') {
                if (banner.indexOf(ext) === -1) {
                    return false
                }
            } else if (type === 'detail') {
                if (zip.indexOf(ext) === -1) {
                    return false
                }
            } else {
                return false
            }
            return true;
        },
        uploadFile: function (id) {
            var _this = this;
            var file = document.getElementById(id)
            if (file.files.length === 0) {
                return _this.showDialog('operation', 'info', true, '请选择文件');
            }
            if (this.checkFileExt(file.files[0].name, 'file') === false) {
                return _this.showDialog('operation', 'info', true, '上传的文件只能为doc、docx或pdf格式文件');
            }
            var formdata = new FormData();
            formdata.append('file', file.files[0])
            if (this.alwaysClick) {
                this.alwaysClick = false;
                $.post({
                    url: '/businessMgmt/IPOMgmtEC/IPOUpload/uploadFileAttach.ajax',
                    cache: false,
                    data: formdata,
                    //dataType: 'json',
                    //async: false,
                    processData: false,
                    contentType: false,
                }).done(function (result) {
                    _this.alwaysClick = true;
                    if (result.error === 0) {
                        _this.fundDetail[id + 'file'] = result.data
                        _this.showDialog('operation', 'info', true, result.msg);
                    } else {
                        _this.showDialog('operation', 'info', true, result.msg);
                    }
                }).fail(function (err) {
                    _this.alwaysClick = true;
                    console.log(err)
                    _this.showDialog('operation', 'info', true, '上传失败');
                });
            }
        },
        uploadBanner: function (id) {
            var _this = this;
            var file = document.getElementById(id)
            if (file.files.length === 0) {
                return _this.showDialog('operation', 'info', true, '请选择文件');
            }
            if (this.checkFileExt(file.files[0].name, 'banner') === false) {
                return _this.showDialog('operation', 'info', true, '请上传正确的图片格式文件');
            }
            var formdata = new FormData();
            formdata.append('file', file.files[0])
            if (this.alwaysClick) {
                this.alwaysClick = false;
                $.post({
                    url: '/businessMgmt/IPOMgmtEC/IPOUpload/uploadFileBanner.ajax',
                    cache: false,
                    data: formdata,
                    //dataType: 'json',
                    //async: false,
                    processData: false,
                    contentType: false,
                }).done(function (result) {
                    _this.alwaysClick = true;
                    if (result.error === 0) {
                        _this.fundDetail[id] = result.data
                        _this.showDialog('operation', 'info', true, result.msg);
                    } else {
                        _this.showDialog('operation', 'info', true, result.msg);
                    }
                }).fail(function (err) {
                    _this.alwaysClick = true;
                    console.log(err)
                    _this.showDialog('operation', 'info', true, '上传失败');
                });
            }
        },
        uploadDetail: function (id) {
            var _this = this;
            var file = document.getElementById(id)
            if (file.files.length === 0) {
                return _this.showDialog('operation', 'info', true, '请选择文件');
            }
            if (this.checkFileExt(file.files[0].name, 'detail') === false) {
                return _this.showDialog('operation', 'info', true, '只能上传zip格式文件');
            }
            var formdata = new FormData();
            formdata.append('file', file.files[0])
            if (this.alwaysClick) {
                this.alwaysClick = false;
                $.post({
                    url: '/businessMgmt/IPOMgmtEC/IPOUpload/uploadFileDetail.ajax',
                    cache: false,
                    data: formdata,
                    //dataType: 'json',
                    //async: false,
                    processData: false,
                    contentType: false,
                }).done(function (result) {
                    _this.alwaysClick = true;
                    if (result.error === 0) {
                        _this.fundDetail[id] = result.data
                        _this.showDialog('operation', 'info', true, result.msg);
                    } else {
                        _this.showDialog('operation', 'info', true, result.msg);
                    }
                }).fail(function (err) {
                    _this.alwaysClick = true;
                    console.log(err)
                    _this.showDialog('operation', 'info', true, '上传失败');
                });
            }
        },
        download: function (fileName) {
            var url = '/businessMgmt/IPOMgmtEC/IPOUpload/download.ajax?fileName=' + fileName;;
            window.location.href = url;
        },
        showFileData: function (fundid, dialog) {
            this.clearFiles = [];
            var _this = this;
            var params = {
                fundid: fundid
            };
            $.post({
                url: '/businessMgmt/IPOMgmtEC/IPOUpload/getDetail.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        for (var key in _this.fundDetail) {
                            _this.fundDetail[key] = result.data[key];
                            _this.initialData[key] = result.data[key];
                        }
                        _this.showDialog('', dialog)
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            })
        },
        saveData: function () {
            var _this = this;
            var change = {};
            for (var key in this.fundDetail) {
                if (this.fundDetail[key] !== this.initialData[key]) {
                    change[key] = this.fundDetail[key]
                    change['serialno'] = this.fundDetail['serialno']
                    change['fundid'] = this.fundDetail['fundid']
                }
            }
            console.log(change)
            if (JSON.stringify(change) === '{}') {
                _this.showDialog('operation', '', false);
                return;
            }

            $.post({
                url: "/businessMgmt/IPOMgmtEC/IPOUpload/modifyDetail.ajax",
                traditional: true,
                data: {
                    modify: JSON.stringify(change),
                    clearFiles: JSON.stringify(this.clearFiles)
                },
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('operation', 'info', false, result.msg);
                    } else {
                        _this.showDialog('operation', 'info', false, result.msg);
                    }
                }
            })

        },
        clearFile: function (file, key) {
            console.log(file)
            if (!file) {
                return;
            }
            this.clearFiles.push(file)
            this.fundDetail[key] = ''
        }
    },
    components: {
        vueSelect: vueSelect
    }

});

