new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        tableData: [],
        diaMsg:'',
        // 查询
        groupid:'',
        fundid:'',
        // fundId:"",
        // fundnm:'',
        // fundType:'',
        // status:"",
        // tano:'',
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10,
        condition: "",
        // 
        filePath:'',
        deleteIdList:[],
        // 留痕数据
        recordList:[]
        // // 全选
        // allCheck: false,
    },
    mounted: function () {
        var dialogs = ['info','add', 'del','addfile', 'revise','detail','modify','delete','putAdd','delete2'];
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
        $('#fundGroupsList').chosen({
            search_contains:true,
            no_results_text: '未找到相关基金信息',
            disable_search_threshold:6,
            width: '175px'
        });
        $('#fundGroupsList').on('change', function (e, params) {
            this.groupid = params ? params.selected : '';
        }.bind(this));
        this.getTableData(0);
        this.fundGroup();
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
        allCheck: function () {
            return this.viewData.length ? this.viewData.every(function (item) {
                return item.check;
            }) : false;
        },
        updateTime: function(){
            let d = new Date();
            return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()} 02:00:00`;
        } 
    },
    watch: {
        // 假分页
        pageMaxNum: {
            handler: function (val, oldval) {
                this.currentIndex= 0;
            }
        },
        condition: {
            handler: function (val, oldval) {
                this.currentIndex= 0;
            }
        },
    },
    methods: {
        getTableData: function (currentIndex) {
            var _this = this;
            var params = {};
            this.fundid&&(params.fundid = this.fundid);
            this.groupid&&(params.groupid = this.groupid);
            this.currentIndex= 0;
            $.post({
                url: '/investmentMgmt/investmentStrategy/alternativePoolMgmt/getTableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.tableData = result.data.body;
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
        fundGroup: function () {
            var _this = this;
            $.post({
                url: '/investmentMgmt/investmentStrategy/alternativePoolMgmt/fundGroups.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        var str = '';
                        var filterList=[];
                        filterList=result.data.body.filter((item)=>{
                            return item.isInvestment=='Y'
                        });
                        filterList.sort((a,b)=>a.groupId.replace('A','')-b.groupId.replace('A',''));
                        filterList.forEach(function(item) {
                            str += '<option value="' + item.groupId + '">' + item.groupId + '-' + item.groupName + '</option>';
                        });
                        var fundArr = ["fundGroupsList"];
                        fundArr.forEach(function (value) {
                            $('#' + value).html('<option value=""></option>' + str);
                            $('#' + value).trigger('chosen:updated');
                        });
                    }
                }
            });
        },
        showDelete:function(){
            this.deleteIdList=[];
            this.deleteIdList=this.viewData.filter(function(item){
                return item.check===true;
            }).map(function(item){
                return item.serialno
            });
            this.recordList = this.viewData.filter(function(item){
                return item.check===true;
            }).map(function(item){
                return {fundid:item.fundid,groupid:item.groupid}
            })
            // console.log(this.deleteIdList);
            if(this.deleteIdList.length>0){
                this.showDialog('', 'del', false);
            }else{
                this.showDialog('', 'info', false, '未选择要删除的内容')
            }
        },
        deleteList:function(){
            var _this=this;
            $.post({
                url: '/investmentMgmt/investmentStrategy/alternativePoolMgmt/deleteList.ajax',
                data: {deleteIdList:this.deleteIdList,recordList:this.recordList},
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0);
                        _this.showDialog('', 'info', false, '删除成功');
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        downloadFile: function () {
            var elt = document.getElementById('data-table');
            var wb = XLSX.utils.table_to_book(elt, { sheet: 'Sheet JS' });
            XLSX.writeFile(wb, '模板示例.xlsx');
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
                    url: "/investmentMgmt/investmentStrategy/alternativePoolMgmt/uploadXls.ajax",
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
                            this.getTableData(0);
                            this.showDialog('addfile', 'info', false,'批量上传成功');
                        } else {
                            this.showDialog('addfile', 'info', true, result.msg)
                        }
                        document.getElementById('uploadFileInput').value = '';
                        this.filePath = '';
                    }.bind(this)
                });
            }

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
        selectAll: function () {
            var flag = true;
            if (this.allCheck) {
                flag = false;
            }
            this.viewData.forEach(function (item) {
                item.check = flag;
            });
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
        }
    },
    // 类型状态
    filters: {
        fundTypeForFundgroup: function (value) {
            var obj = {
                "V": "货币类",
                "R": "权益类",
                "F": "固收类",
                "O": "其他",
            }
            if (obj[value]) {
                return obj[value];
            }
            return value;
        },
    }
});

