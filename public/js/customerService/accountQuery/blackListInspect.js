new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        tableData: [],
        currentIndex: 0,
        maxSpace: 5,
        pageMaxNum: '10',
        diaMsg: '',
        condition: '',
        loadingShow: false,
        filePath: '',
        params: ''
    },
    computed: {
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
        selectAllState: function () {
            return this.viewData.every(function (item) {
                return item.checked
            });
        }
    },
    watch: {
        pageMaxNum: {
            handler: function (val, oldval) {
                this.currentIndex = 0;
            }
        }
    },
    mounted: function () {
        var dialogs = ['info', 'addfile', 'freezeInfo'];
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
    },
    methods: {
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
        select: function () {
            document.getElementById("uploadFileInput").click();
        },
        showFileName: function (event) {
            if (event.target.files[0]) {
                this.filePath = event.target.files[0].name
            } else {
                this.filePath = ''
            }
        },
        downloadFile: function () {
            var elt = document.getElementById('data-table');
            var wb = XLSX.utils.table_to_book(elt, { sheet: 'Sheet JS' });
            XLSX.writeFile(wb, '模板示例.xlsx');
        },
        fileUpload: function () {
            var file = document.getElementById('uploadFileInput')
            var ext = file.files[0].name.lastIndexOf('.');
            ext = file.files[0].name.substr(ext - 0 + 1) //获取文件后缀名
            ext = ext.toLocaleLowerCase() //转为小写
            if (ext !== 'xls' && ext !== 'xlsx') {
                this.showDialog('addfile', 'info', true, '只能上传xls/xlsx文件表格');
                return;
            }
            if (this.filePath != '') {
                var formData = new FormData();
                // HTML 文件类型input，由用户选择
                formData.append("file", document.getElementById('uploadFileInput').files[0]);
                this.loadingShow = true;
                $.ajax({
                    url: "/customerService/accountQuery/blackListInspect/uploadXls.ajax",
                    type: "POST",
                    data: formData,
                    processData: false, // 不处理数据
                    contentType: false, // 不设置内容类型
                    success: function (result) {
                        this.loadingShow = false;
                        $("#uploadFileInput").on("change", function (event) {
                            this.showFileName(event)
                        }.bind(this));
                        if (result.error == 0) {
                            this.tableData = result.data.results.map(function (item) {
                                item.checked = false
                                return item;
                            })
                            this.currentIndex = 0;
                            if(result.data.totalPage===0){
                                this.showDialog('addfile', 'info', false,'未匹配到客户信息')
                            }
                        } else {
                            this.showDialog('addfile', 'info', true, result.msg)
                        }
                    }.bind(this)
                });
            }

        },
        selectAll: function () {
            var state = this.viewData.every(function (item) {
                return item.checked
            });
            this.viewData.forEach(function (item) {
                if (state) {
                    item.checked = false
                } else {
                    item.checked = true
                }
            })
        },
        freezeList: function () {
            this.params = this.tableData.map(function (item) {
                if (item.checked) {
                    return {
                        allowUnfreezeSelf: item.allowUnfreezeSelf,
                        idno: item.idno,
                        invnm: item.invnm
                    }
                }
            }).filter(function (item) {
                return item;
            })
            if (this.params.length === 0) {
                this.showDialog('', 'info', false, '请选择数据');
            } else {
                this.showDialog('', 'freezeInfo', false, '确认要申请冻结选中的记录么？');
            }
        },
        freeze: function () {
            this.loadingShow = true;
            $.ajax({
                url: "/customerService/accountQuery/blackListInspect/freezeList.ajax",
                type: "POST",
                data: { params: this.params },
                success: function (result) {
                    this.loadingShow = false;
                    if (result.error == 0) {
                        this.currentIndex = 0
                        this.showDialog('', 'info', false, result.msg)
                        for (var i = 0; i < this.tableData.length; i++) {
                            if (this.tableData[i].checked) {
                                this.tableData.splice(i, 1)
                                i--
                            }
                        }
                    } else {
                        this.showDialog('', 'info', false, result.msg)
                    }
                }.bind(this)
            });
        }
    }
});