new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        tableData: [],
        diaMsg: '',
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        pageMaxNum: 10,
        condition: '',
        pkeys: "",
        versions:"",
        // 新增参数
        // enable: "",
        // pkey: "",
        // plevel: "",
        // pname: "",
        // pvalue: "",
        // remark: "",
        system:"1",
        version:"",

        tagid:'',//标签ID
        openid:'',
        filePath: '', //导入
    },
    created: function () {
      this.getTableData()
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
        pageMaxNum: function () {
            this.currentIndex = 0;
        },
        condition: function () {
            this.currentIndex = 0;
        }
    },
    mounted: function () {
        var _this = this;
        var dialogs = ['delete', 'info', 'operate', 'revise','addfile'];
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
        // $('#uploadBtn').click(function () {
        //     $('#uploadFileInput').click();
        // });
        // $('#updateBtn').click(function () {
        //     $('#updateFileInput').click();
        // });
        $('#downloadExcel').click(function () {
            var elt = document.getElementById('data-table');
            var wb = XLSX.utils.table_to_book(elt, {sheet: 'Sheet JS'});
            XLSX.writeFile(wb, '标签示例.xls');
        });
    },
    methods: {
        getTableData: function (currentIndex) {
            var _this = this;
            var params = {};
            this.currentIndex= 0;
            params.system = this.system;
            console.log(params)
            $.post({
                url: '/publicConfig/wechatPublicMgmt/wechatUserLabelMgmt/getTableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.currentIndex = 0;
                        _this.tableData = result.data.tableData;
                        console.log(_this.tableData)
                    }
                    else {
                        _this.tableData = [];
                        _this.currentIndex = 0;
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        getDate:function(){
            var _this=this;
            _this.getTableData(0)
        },
        showAdd: function () {
            var _this=this;
            this.tagid="";
            this.openid="";
            // this.system="1";
            this.showDialog('', 'operate');
        },
        saveParam:function(){
            var _this = this;
            var params = {};
            params.tagid =this.tagid;
            params.openid=this.openid;
            params.system=this.system;
            console.log(params)
            // if (this.diaInfoCheck()) {
                $.post({
                    url: '/publicConfig/wechatPublicMgmt/wechatUserLabelMgmt/saveParam.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.getTableData(0);
                            _this.showDialog('operate', 'info', false, result.msg);
                        }else {
                            _this.showDialog('operate', 'info', true, result.msg);
                        }
                    }
                });
            // }
        },
        // 批量打标签-导入文件
        showBatchAdd:function(){
            var _this=this
            // this.system="1";
            // $('#uploadFileInput').change(function () {
            //     $('#uploadInput').val($(this).val());
            // });
            // $('#uploadInput').val('');
            // $('#uploadFileInput').val('');
            this.showDialog('', 'addfile');
        },
        fileUpload: function () {
            var _this=this;
            // var excelData = $('#uploadFileInput').get(0).files[0];
            // if (!excelData) {
            //     this.showDialog('addfile', 'info', true, '未选择文件');
            //     return;
            // }
            // var fileType = excelData.name.split('.')[excelData.name.split('.').length - 1];
            // if (fileType !== 'xls'&&fileType !== 'xlsx') {
            //     this.showDialog('addfile', 'info', true, '上传文件格式错误,请上传.xls文件');
            //     return;
            // }
            var filePath = this.filePath;
            var afterFile = filePath.indexOf('.');
            afterFile = filePath.substr(afterFile - 0 + 1) //获取文件后缀名
            afterFile = afterFile.toLocaleLowerCase() //转为小写
            if (afterFile != 'xls' && afterFile != 'xlsx') {
                _this.showDialog('addfile', 'info', true, '只能上传Excel表格');
                return;
            }
            //转化文件成json格式
            // var _this = this;
            // var reader = new FileReader();
            // reader.onload = function (e) {
            //     var data = e.target.result;
            //     var workbook = XLSX.read(data, {type: 'binary'});
            //     var fromTo = '';
            //     var jsonData = [];
            //     // 遍历每张表读取
            //     for (var sheet in workbook.Sheets) {
            //         if (workbook.Sheets.hasOwnProperty(sheet)) {
            //             fromTo = workbook.Sheets[sheet]['!ref'];
            //             jsonData = jsonData.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
            //             break;
            //         }
            //     }
            //     console.log('前端解析文件数据为: ', jsonData);
            var _this = this;
            var formData = new FormData()
            // formData.append('file', excelData)
            var system=this.system;
            var fileElementId = 'uploadFileInput';
            console.log(system)
            $.ajaxFileUpload({
                url: '/publicConfig/wechatPublicMgmt/wechatUserLabelMgmt/ExcelUpload.ajax',
                type: 'POST',
                dataType: 'json',
                data: {
                    system:system
                },
                secureuri: false,
                fileElementId: fileElementId,
                success: function (result) {
                    console.log(result)
                    if (result.error == 0) {
                        _this.showDialog('addfile', 'info', false, '上传成功')
                        _this.getTableData(0)

                    } else {

                        _this.showDialog('addfile', 'info', true, result.msg)
                    }
                }
            });


            // $.post({
            //     url: '/publicConfig/wechatPublicMgmt/wechatUserLabelMgmt/ExcelUpload.ajax',
            //     // data: {ExcelData: JSON.stringify(jsonData)},
            //     data:{
            //         formData:formData,
            //         system:system
            //     },
            //     // data:formData,
            //     secureuri: false,
            //     contentType: false, // 不设置内容类型
            //     processData: false, // 不处理数据
            //     success: function (result) {
            //         // if (result.error === 0) {
            //         //     _this.showDialog('addfile', 'info', false, result.msg);
            //         //     _this.search(false);
            //         // }
            //         // else {
            //         //     _this.showDialog('addfile', 'info', false, result.msg);
            //         // }
            //
            //         if (result.error === 0) {
            //             _this.getTableData(0);
            //             _this.showDialog('addfile', 'info', false, result.msg);
            //         } else {
            //             _this.showDialog('addfile', 'info', true, result.msg);
            //         }
            //     },
            //     // error: function () {
            //     //     _this.showDialog('addfile', 'info', false, '网络超时,请稍后重试');
            //     // }
            // });
            // // };

        },
        select: function (item) {
            document.getElementById("uploadFileInput").click();
        },
        showFileName: function (event) {
            this.filePath = event.target.files[0].name
            // this.viewChange.filePath = event.target.files[0].name
        },
        getUrlParam: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg); //匹配目标参数
            if (r != null) return unescape(r[2]);
            return '';
        },
        // 修改数据
        // showUpdate:function (item) {
        //     var _this=this;
        //     this.pkey=item.pkey;
        //     this.pname=item.pname;
        //     this.plevel=item.plevel;
        //     this.pvalue=item.pvalue;
        //     this.system=item.system;
        //     this.version=item.version;
        //     this.remark=item.remark;
        //     this.enable=item.enable;
        //     this.showDialog('', 'revise');
        // },
        // update: function () {
        //     var _this = this;
        //     var params = {};
        //     params.pkey =this.pkey;
        //     params.pname=this.pname;
        //     params.plevel = this.plevel;
        //     params.pvalue = this.pvalue;
        //     params.system=this.system;
        //     params.version=this.version;
        //     params.remark=this.remark;
        //     params.enable=this.enable;
        //     console.log(params)
        //     $.post({
        //         url: '/publicConfig/wechatPublicMgmt/systemConfigMgmt/update.ajax',
        //         data: params,
        //         success: function (result) {
        //             if (result.error === 0) {
        //                 _this.getTableData(0);
        //                 _this.showDialog('revise', 'info', false, result.msg);
        //             }
        //             _this.showDialog('revise', 'info', false, result.msg);
        //         }
        //     });
        // },
        // 删除
        // showDelete: function(item) {
        //     this.system = item.system;
        //     this.pkey = item.pkey;
        //     this.version = item.version;
        //     this.showDialog('', 'delete');
        // },
        // del: function() {
        //     var _this = this;
        //     var params = {};
        //     params.system = this.system
        //     params.pkey = this.pkey
        //     params.version = this.version
        //     $.post({
        //         url: '/publicConfig/wechatPublicMgmt/systemConfigMgmt/deleteParam.ajax',
        //         data: params,
        //         success: function(result) {
        //             if (result.error === 0) {
        //                 _this.getTableData();
        //                 _this.showDialog('delete', 'info', false, result.msg);
        //             } else {
        //                 _this.showDialog('delete', 'info', true, result.msg);
        //             }
        //         }
        //     });
        // },
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
        }
    },
    filters:{
        system: function (item) {
            if (item) {
                return item.replace(/0/g, '公用类型').replace(/1/g, '官方微信').replace(/2/g, '添富汇微信')
            }
        },
        enable: function (item) {
            if (item) {
                return item.replace(/0/g, '不可用').replace(/1/g, '可用')
            }
        },
    }
});