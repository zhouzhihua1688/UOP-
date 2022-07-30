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
        showDefaultCycle:'',
        showModifyDefaultDayOfCycle:false,
        accountType: '',
        sceneList: [],
        bgcList: ['education_background_child.png', 'education_background_domestic.png', 'education_background_foreign.png'],
        staticUrl: 'https://static.99fund.com//mobile/app_inner/area/familyAccount/',
        addData: {
            accountType: '',
            planTypeName: '',
            planDesc: '',
            backgroundUrl: '',
            orderNum: '',
            status: 0,
            defaultPlanAmount: '',
            bigIcon:'',
            // 9511新增
            modeTer:'',
            defaultCycle:'1',
        },
        // 9511新增
        investmentList:[],

        modifyData: {
            planDesc: '',
            planTypeName: '',
            // 9511新增
            modeTer:'',
            productId:'',
            defaultCycle:'',
            defaultDayOfCycle:''

        },
        deleteId: '',
        splitUrl:'',
        isUpdate:false
    },
    created: function () {
        this.queryScene()
    },
    mounted: function () {
        var dialogs = ['delete', 'info', 'operate', 'modifyData'];
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
        $('#selectBtn1').click(function () {
            $('#uploadFileInput1').click();
        });
        $('#uploadFileInput1').on('input', function () {
            $('#uploadInput1').val($(this).val());
        });
        $('#selectBtn2').click(function () {
            $('#uploadFileInput2').click();
        });
        $('#uploadFileInput2').on('input', function () {
            $('#uploadInput2').val($(this).val());
        });
        // 小图标
        $('#selectBtn3').click(function () {
            $('#uploadFileInput3').click();
        });
        $('#uploadFileInput3').on('input', function () {
            $('#uploadInput3').val($(this).val());
        });
        $('#selectBtn4').click(function () {
            $('#uploadFileInput4').click();
        });
        $('#uploadFileInput4').on('input', function () {
            $('#uploadInput4').val($(this).val());
        });
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
        },
        "addData.planDesc": function (newval) {
            if (newval.length > 100) {
                this.addData.planDesc = newval.substring(0, 100)
            }
        },
        "modifyData.planDesc": function (newval) {
            if (newval && newval.length > 100) {
                this.modifyData.planDesc = newval.substring(0, 100)
            }
        },
        "addData.planTypeName": function (newval) {
            if (newval.length > 15) {
                this.addData.planTypeName = newval.substring(0, 15)
            }
        },
        "modifyData.planTypeName": function (newval) {
            if (newval && newval.length > 15) {
                this.modifyData.planTypeName = newval.substring(0, 15)
            }
        },
   
    },
    methods: {
        changeModeTer(val) {
            this.modifyData.modeTer=val
           val=='1'?this.showDefaultCycle=false:this.showDefaultCycle=true
        },

        // 9511 增加是否一次投入还是周期投入配置，默认一次投入，如果选择周期定投，则出现下拉框：
        // 每月，对应选择1日-28日; 每双周，每周，对应选项周一到周五;  每日，无;
        investmentChange(defaultCycle,showModifyDefaultDayOfCycle) {
            this.showModifyDefaultDayOfCycle=false
            this.investmentList=[]
            showModifyDefaultDayOfCycle&&(this.showModifyDefaultDayOfCycle=false)
            if (defaultCycle == 'MM') {
                for (var i = 1; i <= 28; i++) {
                    this.investmentList.push({defaultDayOfCycle:`${i}`})
                }
            }else if (defaultCycle =='WW'||defaultCycle =='2W'){
                this.investmentList=[
                   {defaultDayOfCycle:'1'},
                   {defaultDayOfCycle:'2'},
                   {defaultDayOfCycle:'3'},
                   {defaultDayOfCycle:'4'},
                   {defaultDayOfCycle:'5'}
                ]
            }

        },
        showModify: function (item) {
            // this.modifyData = Object.assign({}, item);
            this.modifyData =  item;
            this.showDialog('', 'modifyData');
            this.modifyData.bigIcon&&$('#uploadInput2').val(this.modifyData.bigIcon);
            !this.modifyData.bigIcon&&$('#uploadInput2').val('');
            console.log(this.modifyData )

            this.modifyData.defaultCycle=='SS'? this.modifyData.modeTer=1:(this.modifyData.modeTer=2,this.showDefaultCycle=true);

            this.modifyData.defaultDayOfCycle&&(this.showModifyDefaultDayOfCycle=true)
            this.modifyData.icon&&$('#uploadInput4').val(this.modifyData.icon);
            !this.modifyData.icon&&$('#uploadInput4').val('');

            this.isUpdate=true;
        },
        showAdd:function(){
            this.addData= {
                accountType: '',
                planTypeName: '',
                planDesc: '',
                backgroundUrl: '',
                orderNum: '',
                status: 0,
                defaultPlanAmount: '',
                bigIcon:''
            }
            $('#uploadInput1').val('');
            this.isUpdate=false;
            this.showDialog('', 'operate');
        },
        modify: function () {
            if (!this.modifyData.accountType) {
                this.showDialog('modifyData', 'info', true, '请选择场景');
                return;
            }
            if (!this.modifyData.orderNum) {
                this.showDialog('modifyData', 'info', true, '请填写展示序号');
                return;
            }
            if (!this.modifyData.planTypeName) {
                this.showDialog('modifyData', 'info', true, '请填写计划名称');
                return;
            }
            this.modifyData.bigIcon=$('#uploadInput2').val();
            this.modifyData.icon=$('#uploadInput4').val();
            this.modifyData.modeTer==1?this.modifyData.defaultCycle='SS':''
            this.modifyData.productType='1'

            $.post({
                url: '/publicConfig/familyAffectionAccount/sceneName/modifyData.ajax',
                data: this.modifyData,
                success: function (result) {
                    if (result.error === 0) {
                        this.getTableData()
                        this.showDialog('modifyData', 'info', false, result.msg);
                    } else {
                        this.showDialog('modifyData', 'info', true, result.msg);
                    }
                }.bind(this)
            });
        },
        add: function () {
            if (!this.addData.accountType) {
                this.showDialog('operate', 'info', true, '请选择场景');
                return;
            }
            if (!this.addData.orderNum) {
                this.showDialog('operate', 'info', true, '请填写展示序号');
                return;
            }
            if (!this.addData.planTypeName) {
                this.showDialog('operate', 'info', true, '请填写计划名称');
                return;
            }
            this.addData.bigIcon=$('#uploadInput1').val();
            this.addData.icon=$('#uploadInput3').val();
            console.log(this.addData)
            this.addData.modeTer==1?this.addData.defaultCycle='SS':''

            this.addData.productType='1'

            $.post({
                url: '/publicConfig/familyAffectionAccount/sceneName/add.ajax',
                data: this.addData,
                success: function (result) {
                    if (result.error === 0) {
                        this.getTableData()
                        this.showDialog('operate', 'info', false, result.msg);
                    } else {
                        this.showDialog('operate', 'info', true, result.msg);
                    }
                }.bind(this)
            });
        },
        getTableData: function () {
            if (!this.accountType) {
                this.showDialog('', 'info', false, '请选择');
                return;
            }
            $.post({
                url: '/publicConfig/familyAffectionAccount/sceneName/tableData.ajax',
                data: {
                    accountType: this.accountType
                },
                success: function (result) {
                    if (result.error === 0) {
                        this.currentIndex = 0;
                        this.tableData = result.data;
                    } else {
                        this.showDialog('', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },
        queryScene: function () {
            $.post({
                url: '/publicConfig/familyAffectionAccount/sceneName/queryScene.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        this.sceneList = result.data;
                        this.splitUrl=result.splitUrl;
                    } else {
                        this.showDialog('', 'info', true, result.msg);
                    }
                }.bind(this)
            });
        },
        showDelete: function (item) {
            this.deleteId = item.planTypeId;
            this.showDialog('', 'delete');
        },
        deleteData: function () {
            $.post({
                url: '/publicConfig/familyAffectionAccount/sceneName/del.ajax',
                data: {
                    planTypeId: this.deleteId,
                    status: 1
                },
                success: function (result) {
                    if (result.error === 0) {
                        this.getTableData()
                        this.showDialog('delete', 'info', false, result.msg);
                    } else {
                        this.showDialog('delete', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },
        // 大图标
        uploadPostPicFile1: function () {
            if (!$('#uploadFileInput1').val()) {
                this.showDialog('operate', 'info', true, '请选择要上传的文件');
                return false;
            }
            if (/[\u4E00-\u9FA5]/i.test($('#uploadFileInput1').val())) {
                this.showDialog('operate', 'info', true, '图片名称不支持中文,请重新上传');
                return false;
            }
            if (!/.+(\.gif|\.jpeg|\.png|\.jpg|\.bmp)$/.test($('#uploadFileInput1').val())) {
                this.showDialog('add', 'info', true, '文件格式错误');
                return;
            }
            var _this = this;
            $.ajaxFileUpload({
                url: '/publicConfig/familyAffectionAccount/sceneName/uploadPostPicFile1.ajax',
                type: 'POST',
                dataType: 'json',
                fileElementId: 'uploadFileInput1',
                success: function (result) {
                    $('#uploadFileInput1').val('');
                    $('#uploadInput1').val('');
                    $('#uploadFileInput1').on('input', function () {
                        $('#uploadInput1').val($(this).val());
                    });
                    if (result.error == 0) {
                        $('#uploadInput1').val(result.data.filePath);
                    }
                    _this.showDialog('operate', 'info', true, result.msg);
                },
                error: function () {
                    _this.showDialog('operate', 'info', true, '网络超时，请稍后重试');
                }
            });
        },
        uploadPostPicFile2: function () {
            if (!$('#uploadFileInput2').val()) {
                this.showDialog('modifyData', 'info', true, '请选择要上传的文件');
                return false;
            }
            if (/[\u4E00-\u9FA5]/i.test($('#uploadFileInput2').val())) {
                this.showDialog('modifyData', 'info', true, '图片名称不支持中文,请重新上传');
                return false;
            }
            if (!/.+(\.gif|\.jpeg|\.png|\.jpg|\.bmp)$/.test($('#uploadFileInput2').val())) {
                this.showDialog('add', 'info', true, '文件格式错误');
                return;
            }
            var _this = this;
            $.ajaxFileUpload({
                url: '/publicConfig/familyAffectionAccount/sceneName/uploadPostPicFile1.ajax',
                type: 'POST',
                dataType: 'json',
                fileElementId: 'uploadFileInput2',
                success: function (result) {
                    $('#uploadFileInput2').val('');
                    $('#uploadInput2').val('');
                    $('#uploadFileInput2').on('input', function () {
                        $('#uploadInput2').val($(this).val());
                    });
                    if (result.error == 0) {
                        $('#uploadInput2').val(result.data.filePath);
                    }
                    _this.showDialog('modifyData', 'info', true, result.msg);
                },
                error: function () {
                    _this.showDialog('modifyData', 'info', true, '网络超时，请稍后重试');
                }
            });
        },
        // 小图标
        uploadPostPicFile3: function () {
            if (!$('#uploadFileInput3').val()) {
                this.showDialog('operate', 'info', true, '请选择要上传的文件');
                return false;
            }
            if (/[\u4E00-\u9FA5]/i.test($('#uploadFileInput3').val())) {
                this.showDialog('operate', 'info', true, '图片名称不支持中文,请重新上传');
                return false;
            }
            if (!/.+(\.gif|\.jpeg|\.png|\.jpg|\.bmp)$/.test($('#uploadFileInput3').val())) {
                this.showDialog('add', 'info', true, '文件格式错误');
                return;
            }
            var _this = this;
            $.ajaxFileUpload({
                url: '/publicConfig/familyAffectionAccount/sceneName/uploadPostPicFile1.ajax',
                type: 'POST',
                dataType: 'json',
                fileElementId: 'uploadFileInput3',
                success: function (result) {
                    $('#uploadFileInput3').val('');
                    $('#uploadInput3').val('');
                    $('#uploadFileInput3').on('input', function () {
                        $('#uploadInput3').val($(this).val());
                    });
                    if (result.error == 0) {
                        $('#uploadInput3').val(result.data.filePath);
                    }
                    _this.showDialog('operate', 'info', true, result.msg);
                },
                error: function () {
                    _this.showDialog('operate', 'info', true, '网络超时，请稍后重试');
                }
            });
        },
        uploadPostPicFile4: function () {
            if (!$('#uploadFileInput4').val()) {
                this.showDialog('modifyData', 'info', true, '请选择要上传的文件');
                return false;
            }
            if (/[\u4E00-\u9FA5]/i.test($('#uploadFileInput4').val())) {
                this.showDialog('modifyData', 'info', true, '图片名称不支持中文,请重新上传');
                return false;
            }
            if (!/.+(\.gif|\.jpeg|\.png|\.jpg|\.bmp)$/.test($('#uploadFileInput4').val())) {
                this.showDialog('add', 'info', true, '文件格式错误');
                return;
            }
            var _this = this;
            $.ajaxFileUpload({
                url: '/publicConfig/familyAffectionAccount/sceneName/uploadPostPicFile1.ajax',
                type: 'POST',
                dataType: 'json',
                fileElementId: 'uploadFileInput4',
                success: function (result) {
                    $('#uploadFileInput4').val('');
                    $('#uploadInput4').val('');
                    $('#uploadFileInput4').on('input', function () {
                        $('#uploadInput4').val($(this).val());
                    });
                    if (result.error == 0) {
                        $('#uploadInput4').val(result.data.filePath);
                    }
                    _this.showDialog('modifyData', 'info', true, result.msg);
                },
                error: function () {
                    _this.showDialog('modifyData', 'info', true, '网络超时，请稍后重试');
                }
            });
        },
        // 查看大图标
        checkPicUri:function(){
            var url=this.splitUrl;
            if(this.isUpdate){
                if(!$('#uploadInput2').val()){
                    this.showDialog('modifyData', 'info', true, '暂无地址，请上传后查看');
                    return;
                }
                $('#uploadInput2').val()&&(url+=$('#uploadInput2').val());
            }else{
                if(!$('#uploadInput1').val()){
                    this.showDialog('operate', 'info', true, '暂无地址，请上传后查看')
                    return;
                }
                $('#uploadInput1').val()&&(url+=$('#uploadInput1').val()); 
            }
            window.open(url);
        },
        //  // 查看小图标
         checkPicUriSmall:function(){
            var url=this.splitUrl;
            if(this.isUpdate){
                if(!$('#uploadInput4').val()){
                    this.showDialog('modifyData', 'info', true, '暂无地址，请上传后查看');
                    return;
                }
                $('#uploadInput4').val()&&(url+=$('#uploadInput4').val());
            }else{
                if(!$('#uploadInput3').val()){
                    this.showDialog('operate', 'info', true, '暂无地址，请上传后查看')
                    return;
                }
                $('#uploadInput3').val()&&(url+=$('#uploadInput3').val()); 
            }
            window.open(url);
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
    }
});