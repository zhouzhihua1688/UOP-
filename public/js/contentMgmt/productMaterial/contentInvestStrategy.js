// 使用剪切图片插件
Vue.use(window['vue-cropper']);
var vm = new Vue({
    el: '#content',
    data: function () {
        return {
  
            tableData: [],
            productData: [],

            currentIndex: 0,
            maxSpace: 5,
            totalPage: 0,
            pageMaxNum: 10,

            currentIndex2: 0,
            maxSpace2: 5,
            totalPage2: 0,
            pageMaxNum2: 10,
            condition: "",
            diaMsg: '',
            loadingShow: false,  //loading动画
            showText:'数据加载中...',

            //查询字段
            productId:"", //基金代码
            searchRightType:'',//材料权限
            managerList:[],  //查询字段基金经理列表
            managerId:'',   //基金经理
            keyword:'',    //标题 
            
        //主页面所用字段
            classifyList:[],//获取一二级分类数据
            firstClassifyId:'',   //一级分类ID
            secondClassifyId:'',  //二级分类ID
            threeClassifyId:'',   //三级分类ID
            allChecked:{'checked':true},    //全部
            secondClassifyList:[],//获取二级分类数据
            menuList:[], //三级分类
            materialList:[],  //现有材料一级下拉数据
            secondMaterialList:[],//现有材料二级下拉数据
            searchMaterialList:[],  //现有材料查询数据
            // menuList:[{'name':'定投','checked':true},
            // {'name':'债基','checked':true},{'name':'FOF','checked':true},
            // {'name':'回收+','checked':true},{'name':'其他','checked':true}],  //单个标签
            modifyStatus:'1',
            updateId:'',
            bgIndex:'0',//用于背景颜色的切换
       // 弹窗字段
            // diaTagParams:'',
            diaTagManager:'',    //基金经理
            diaTagProduct:'',   //相关产品
            categoryIdList:[],
            tagList:[],  //关联标签数据-一级
            secondTagList:[],  //关联标签数据-二级下拉框
            tagCategoryId:'',//关联标签-一级下拉框
            tagId:'',        //关联标签数据-二级下拉框
            singLableFirst:' ',   //关联标签
            singLableSecond:' ',   //关联标签
            flag:false,
            // 添加修改弹窗里的材料熟悉类型---0-新增，1-现有材料关联
            title:'',  //标题
            url:'',   //上传url
            description:'',// 素材描述 , 
            mediaConfigMode:'',  //材料属性
            materialProperty:[{value: '1',name: '现有材料',checked: false},{value: '0',name: '新增材料',checked: true}],

            rightType:'', // 素材权限类型：00-公开材料，01-内部材料，03-一对一材料 
            sourceType:'00',//来源分类渠道：00-uop,01-微信，02-现金宝 
            sourceTypeChannel:'00',//渠道权限 
            branchList:[], //获取渠道权限数组数据
            watermarkFlag:'',//水印标识：0-不打水印，1-添加水印
            timelinessType:'',// 素材时效性：0-无，1-有 ,
            timelinessCycleValue:'',// 素材时效性周期值
            timelinessCycleType:'',// 素材时效性周期类型：1-日，2-月，3-周 ,
            pushStatus:'0', // 素材上下架状态：0-下架，1上架 ,//素材上下架状态-发布状态的选择 
            content:'',     //类型为文本的-内容字段
            
            // 添加修改弹窗里的-类型
            mediaType:'', //类型字段
            typeList: [{value: 'file',name: '文件',checked: false},  
                {value: 'text', name: '文字',checked: false}, 
                {value: 'image', name: '图片',checked: false}, 
                {value: 'link',name: '链接',checked: false},
                // {value: 'dynamics',name: '动态',checked: false}
            ],
            // 删除字段
            mediaId:'', //删除
            // 上传文件所用字段
            fileUrl:'',  //添加弹窗里上传文件所用字段
            imagesUrl:[], //上传图片--预览图片列表文字类型
            imgUrl:[],    //图片类型
            uploadingFile: {   //上传文件
                name: '',
                progressRate: ''
            },
            createBy:'',//创建人
            modifyBy:'',//修改人
            getArr:[],
            getTagArrList:[],
            getArr2:[],
            getTagArrList2:[],
            // 现有材料字段弹窗-查询字段
            searchMaterialTitle:'',  //现有材料标题查询
            materialId:'',  //一级分类查询字段
            secondMaterial:'', //二级分类查询字段
            threeMaterial:'',  //三级分类查询字段
            categoryConfigList:[], //二级分类下拉框数据
            threeMaterialIdList:[], //三级分类下拉框数据
            flag:true, //默认新增取消按钮
            updateTime:'', //新增修改弹窗的最新更新时间
            publishTime:'',   //上架时间
            contentId:'',  //当类型为文本的时候-修改数据时传这个字段
            indexImg:'',     //删除图片索引
            boundMediaId:'',  //现有材料id

            // 添加弹窗封面图片
            // 上传封面图片内容配置
			// vue-cropper的配置项
			option: {
				img: '',
				size: 1,
				full: false,
				outputType: 'png',
				canMove: true,
				fixedBox: false, // 20220408修改，可以自定义拖动大小
				original: false,
				canMoveBox: true,
				autoCrop: true,
				// 只有自动截图开启 宽度高度才生效
				autoCropWidth: 200,
				autoCropHeight: 200,
				centerBox: false,
				high: true,
				max: 99999
            },
            fileName: '', //上传封面图片本地文件path
			previews: {}, //剪切后预览
            limitSize: 10000, //compress压缩文件的最大kb
            displayImageUrl:'',  //封面图片
        }
    },
    updated:function(){
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

        // middleData2: function () {
        //     var middleData = [];
        //     var filterData = [];
        //     var pageMaxNum = parseInt(this.pageMaxNum2);
        //     var _this = this;
        //     _this.searchMaterialList.forEach(function (jsonObj) {
        //         var valueArr = [];
        //         for (var prop in jsonObj) {
        //             valueArr.push(jsonObj[prop]);
        //         }
        //         for (var i = 0, len = valueArr.length; i < len; i++) {
        //             if (valueArr[i]) {
        //                 if (valueArr[i].toString().indexOf(_this.condition) != -1) {
        //                     filterData.push(jsonObj);
        //                     break;
        //                 }
        //             }
        //         }
        //     });
        //     if (filterData.length <= pageMaxNum) {
        //         middleData.push(filterData);
        //         return middleData;
        //     } else {
        //         var i = 0;
        //         while ((i + 1) * pageMaxNum < filterData.length) {
        //             middleData.push(filterData.slice(i * pageMaxNum, (i + 1) * pageMaxNum));
        //             i++;
        //         }
        //         middleData.push(filterData.slice(i * pageMaxNum, filterData.length));
        //         return middleData;
        //     }
        // },
        // viewData2: function () {
        //     var currentIndex = parseInt(this.currentIndex2);
        //     return this.middleData2[currentIndex];
        // },
        pageList2: function () {
            var arr = [];
            if (this.totalPage2 <= 2 * this.maxSpace2) {
                for (var i = 0; i < this.totalPage2; i++) {
                    arr.push(i + 1);
                }
                return arr;
            }
            if (this.currentIndex2 > this.maxSpace2 && this.totalPage2 - this.currentIndex2 > this.maxSpace2) {
                for (var i = this.currentIndex2 - this.maxSpace2; i < this.currentIndex2 + this.maxSpace2; i++) {
                    arr.push(i + 1);
                }
            } else if (this.currentIndex2 <= this.maxSpace2 && this.totalPage2 - this.currentIndex2 > this.maxSpace2) {
                for (var i = 0; i < this.currentIndex2 + (2 * this.maxSpace2 - this.currentIndex2); i++) {
                    arr.push(i + 1);
                }
            } else if (this.currentIndex2 > this.maxSpace2 && this.totalPage2 - this.currentIndex2 <= this.maxSpace2) {
                var space = this.totalPage2 - this.currentIndex2;
                for (var i = this.currentIndex2 - (2 * this.maxSpace2 - space); i < this.totalPage2; i++) {
                    arr.push(i + 1);
                }
            } else {
                for (var i = 0; i < this.totalPage2; i++) {
                    arr.push(i + 1);
                }
            }
            return arr;
        },
    },
    watch: {
        pageMaxNum: function () {
            this.getTableData(0);
        },
        pageMaxNum2: function () {
            this.searchMaterial(0);
        }
    },
    mounted: function () {
        var dialogs = ['info', 'del','delImg'];
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
        $('.date-timepicker').datetimepicker({
            format: 'YYYY-MM-DD', //use this option to display seconds
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

        var _this=this;
        var managerArr = ["managerList"];
        managerArr.forEach(function (value) {
            $('#' + value).chosen({
                search_contains:true,
                no_results_text: '未找到相关基金信息',
                disable_search_threshold:6,
                width: '150px'
            });
        });
        $('#managerList').on('change', function (e, params) {
            _this.managerId = params ? params.selected : '';
        });
        // 产品代码
        //下拉列表自带搜索功能
        var fundArr = ['fundNameList'];
        fundArr.forEach(function (value) {
            $('#' + value).chosen({
                search_contains:true,
                no_results_text: '未找到相关基金信息',
                disable_search_threshold:6,
                width: '150px'
            });
        });
        $('#fundNameList').on('change', function (e, params) {
            _this.productId = params ? params.selected : '';
        });

        // 获取渠道权限列表
        $('#dialogBranch').css({
			'width': '184px'
		}).select2({
			closeOnSelect: false
		})
		$("#dialogBranch").on("select2:close", function (e) {
			var value = $("#dialogBranch").val();
			if (value && value.length > 1 && value.includes('00')) {
				value=['00']
				$("#dialogBranch").val(value).trigger('change')
            }
            if (value && value.length > 1 && value.includes('-1')) {
				value=['-1']
				$("#dialogBranch").val(value).trigger('change')
			}
			// e 的话就是一个对象 然后需要什么就 “e.参数” 形式 进行获取
			this.sourceTypeChannel = $("#dialogBranch").val() ? $("#dialogBranch").val().join(',') : ''
        }.bind(this));
        $('.select2').css('width','150px').select2({allowClear:true});
        $("#getTag").on("select2:close", function () {
            _this.diaTagManager=$("#getTag").val()? $("#getTag").val().join(','):'';  
        }.bind(this));
        $("#getTag2").on("select2:close", function () {
            _this.diaTagProduct=$("#getTag2").val()? $("#getTag2").val().join(','):'';   
        }.bind(this));
    // 获取渠道
        $.post({
            url:'/contentMgmt/productMaterial/contentInvestStrategy/getbranchList.ajax',
            success: function (result) {
                if (result.error === 0) {
                    this.branchList = result.data;
                    this.branchList.unshift({
                        branchCode: '-1',
                        branchFullName: '均无权限'
                    })
                    this.branchList.unshift({
                        branchCode: '00',
                        branchFullName: '全部'
                    })
                } 
            }.bind(this)
        });

        _this.getTagAll(); //内容分类
        _this.getTagList();  //关联标签
        _this.fundList();  //基金代码   
        _this.getManagerList(); //基金经理     
        // _this.getTableData(0);
    },
    methods: {
        getTagAll:function(){
           // 获取一级二级分类
           var _this=this;
            $.post({
                url:'/contentMgmt/productMaterial/contentInvestStrategy/getTagAll.ajax',
                data:{
                    parentCategoryId:''
                },
                success: function (result) {
                    if (result.error === 0) {
                        console.log(result.data);
                        _this.materialList=result.data.allTagList;  //现有材料弹窗数据
                        // 新增弹窗和查询
                        _this.classifyList=result.data.investTag;  //拿到所有一级分类菜单数据
                        _this.secondClassifyList.push(result.data.teachTag);
                        _this.secondClassifyId=result.data.teachTag.categoryId;  //获取二级分类ID
                        console.log(_this.secondClassifyId)
                        //拿到三级分类数据
                        _this.menuList=result.data.menuList.ncmsContentCategoryConfigList.map(function(item){
                            item.checked=true;  //设置全部为true,选中
                            return item;
                        });
                    }else {
                        _this.classifyList=[];
                        _this.menuList=[];
                        _this.showDialog('', 'info', false,result.msg);
                    }
                    _this.getTableData(0);
                }
            });
        },
    // 获取基金列表
        fundList:function(){
            var _this = this;
            $.post({
                url: '/contentMgmt/productMaterial/contentInvestStrategy/fundList.ajax',
                success: function (result) {
                    if (result.error === 0) {

                        // 下拉列表
                        var str = '';
                        result.data.listData.forEach(function (item) {
                            str += '<option value="' + item.fundId + '">' + item.fundId + ' ' + item.fundName + '</option>';
                        });
                        var fundArr = ['fundNameList'];
                        fundArr.forEach(function (value) {
                            $('#' + value).html('<option value="">全部</option>' + str);
                            $('#' + value).trigger('chosen:updated');
                        });
                    }else{
                        _this.showDialog('', 'info', false,result.msg);
                    }
                }
            });
        },
// 添加弹窗的操作        
        // 切换主页面menuList背景颜色--选择标签
        // 全选按钮
        checkAll($event){
            // return;
            $event.preventDefault();
            this.allChecked.checked= !this.allChecked.checked;
            for (p in this.menuList) {
                this.menuList[p].checked = this.allChecked.checked;
            }
        },
        // 点击单个标签点击选中
        checkSingle:function($event,item,index){
            var _this=this;
            $event.preventDefault();
            // this.bgIndex = index;   //背景索引
            _this.menuList[index].checked = !_this.menuList[index].checked;
            let checkAllFlag = true;
            for (p in _this.menuList) {
                if(p =='checked') continue;
                if(!_this.menuList[p].checked){
                    // 有一个没有选中，则全选也不选中
                    checkAllFlag = false;
                    break
                }
            }
            _this.threeClassifyId=item.categoryId;

            // if(_this.menuList[index].checked){
            //     _this.getTableData(0);
            // }
            _this.allChecked.checked = checkAllFlag;
        },
        //添加修改弹窗里选择材料属性checkbox-单选
        chooseSingle(index) {
            var _this=this;
            _this.materialProperty.forEach(item => {
               item.checked = false;  
            })
            // 选中当前
            _this.materialProperty[index].checked = true;
            _this.mediaConfigMode=_this.materialProperty[index].value;
        },
        //添加修改弹窗里选择类型radio-单选
        changeTypeList(item, index) {
            var _this = this;
            $.each(_this.typeList, function (index, item) {
                item.checked = false;
            })
            _this.typeList[index].checked = true;
            _this.mediaType = _this.typeList[index].value;
           
        },
         // 添加弹窗里选择上架状态
         changeAddStatus() {
            var _this = this;
            if (_this.pushStatus == '0') {
                _this.pushStatus = '1'
            } else {
                _this.pushStatus = '0'
            }
        },
        // 添加弹窗里关联标签
        chooseLableFirst:function(value){
           this.singLableFirst=value;
        },
        chooseLableSecond:function(value){
           this.singLableSecond=value;
         },
// 获取基金经理列表 
        getManagerList: function() {
            var _this = this;
            $.post({
                url: '/contentMgmt/productMaterial/contentInvestStrategy/getManagerList.ajax',
                success: function(result) {
                    if (result.error === 0) {
                        for(var i in result.data.body){
                            _this.managerList.push(JSON.parse(result.data.body[i]));  //把数据处理一下
                        }
                
                        var str = '';
                        _this.managerList.forEach(function(item) {
                            str += '<option value="' + item.name + '">' + item.id + '-' + item.name + '</option>';
                        });
                        var fundArr = ["managerList"];
                        fundArr.forEach(function (value) {
                            $('#' + value).html('<option value="">请选择</option>' + str);
                            $('#' + value).trigger('chosen:updated');
                        });

                    }else{
                        _this.managerList
                        _this.showDialog('', 'info', false,result.msg);
                    }
                }
            });
        },

 // 主页面数据
        // 主表格数据
        getTableData: function (currentIndex) {
            //   console.log(currentIndex);
            var _this = this;
            var params = {};
            // params.mediaType=_this.mediaType;   //类型，在弹窗现有材料才有

            // let flag=_this.menuList.every(item=>item.checked==true)
            let arrId=[]
            _this.menuList.forEach(function(item){
                if(item.checked){
                    arrId.push(item.categoryId);
                }           
            })
            params.categoryId=arrId.toString();
            params.fundManager= _this.managerId;
            params.keyword= _this.keyword;
            params.product=_this.productId;
            params.rightType= _this.searchRightType;        
            params.pageNo = currentIndex + 1;
            params.pageSize = this.pageMaxNum;
            console.log(params);
            // $(".cover").show();
            _this.tableData=[];
            $.post({
                url: '/contentMgmt/productMaterial/contentInvestStrategy/getTableData.ajax',
                data: params,
                success: function (result) {
                    $(".cover").hide();
                    if (result.error === 0) {
                        _this.currentIndex = currentIndex;
                        console.log(result);
                        _this.totalPage = Math.ceil(result.data.body.total / params.pageSize);
                        if(result.data.body) {
                            if(result.data.body.mediaUopVos.length>0){
                                // 用 MediaId获取材料主题
                               let getMediaId=result.data.body.mediaUopVos.map(function(item){
                                    return item.mediaId;
                                })
                                if(getMediaId.length>0&&result.data.body.mediaUopVos){
                                    _this.getThemeList(getMediaId.toString());  //获取对应的材料主题
                                } 
                                // _this.getThemeList(getMediaId.toString());  //获取对应的材料主题
                            }
                               _this.tableData = result.data.body.mediaUopVos?result.data.body.mediaUopVos:[];
                         
                        }else{
                            _this.showText='暂无数据';
                        }
                    }
                    else {
                        $(".cover").hide();
                        _this.tableData = [];
                        _this.showText='暂无数据';
                        _this.currentIndex = 0;
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });

        },

         // 主页面:根据mediaIdList查询parentCategoryId下的素材分类，材料主题
         getThemeList:function(mediaIdList){
            var _this=this;
            var params={};
            params.parentCategoryId= _this.secondClassifyId;
            params.mediaIdList= mediaIdList;
            console.log(params);
            $.post({
                 url: '/contentMgmt/productMaterial/contentInvestStrategy/getThemeList.ajax',
                 data: params,
                 success: function (result) {
                     if (result.error === 0) {
                         let newList=_this.tableData.map(function(item){
                            for(i in result.data.body){
                               if(item.mediaId==i){
                                   item.themeName=result.data.body[i];   //新填入材料主题字段
                               }
                            }
                             return item;     
                         })
                         _this.tableData=newList;
                     }
                     else {
                         _this.showDialog('', 'info', false, result.msg);
                     }
                 }
             });
         },

        // 新增修改弹窗
        // 默认取消添加
        canaleAdd:function(){
            var _this=this;
            _this.flag=false;
          },
        showAdd:function(){
           var _this=this;
           if(_this.flag){  //默认取消的再点添加的话不清空  
                _this.modifyStatus=0;  //弹出新增弹窗
                _this.updateId='';
                _this.categoryIdList =[];                //*分类
                _this.mediaConfigMode='0';              //材料属性 --默认0-新增材料
                _this.title ='';                      //标题
                _this.description='';                // 描述 
                _this.rightType='00';                   // 素材权限类型：00-公开材料，01-内部材料，03-一对一材料 
                _this.sourceType='';                   //来源分类渠道：00-uop,01-微信，02-现金宝 
                _this.sourceTypeChannel='00'; //默认渠道权限00-全部
                _this.watermarkFlag='0';                 //水印标识：0-不打水印，1-添加水印
                _this.timelinessType='0';                 // 素材时效性：0-无，1-有 ,
                _this.timelinessCycleValue='3';            // 素材时效性周期值
                _this.timelinessCycleType='2';           // 素材时效性周期类型：1-日，2-月，3-周 ,
                _this.tagList=[];                      //关联标签
                _this.tagId='';
                _this.tagCategoryId='';
                _this.mediaType ='';                   //上传文件类型
                _this.pushStatus='0';                 // 素材上下架状态：0-下架，1上架 ,
                _this.contentId='';
                _this.modifyBy='';
                _this.updateTime='';
                _this.publishTime='';
                _this.threeClassifyId='';
                _this.content='';
                _this.indexImg='';
                _this.boundMediaId='';
                _this.fileUrl="";
                _this.url='';
                _this.imagesUrl=[];            //图片清空
                _this.imgUrl=[];
                _this.diaTagManager='';   //基金经理
                _this.diaTagProduct='';   //相关产品
                _this.option.img = '';  //显示封面图片
                _this.displayImageUrl='';  //封面图片
                $('#getTag').val('').trigger('change'); 
                $('#getTag2').val('').trigger('change'); 
                //    _this.url='http://10.50.115.48/uopStatic/advertising/productMaterialMgmt/productList/miaov.jpg' //上传文件url

                //    $("#state1").val([]).trigger('change');
                

                $.each(_this.typeList, function (index, item) {  //清空文件类型选中
                    item.checked = false;
                })

                _this.materialProperty[0].checked=false;  //每次点新增，材料属性都勾选新增-true
                _this.materialProperty[1].checked=true;
                //    $.each(_this.materialProperty, function (index, item) {  //清空材料属性的选中
                //       item.checked = false;
                //    })
        }
        // _this.updateTime=moment(new Date().getTime()).format('YYYYMMDD');  //最新更新时间
        $('#dialogBranch').val(this.sourceTypeChannel.split(',')).trigger('change');

           _this.getTagList();//获取关联标签

           _this.showDialog('', 'add');
        },
       
        // 新增必填弹框
        diaInfoCheck: function () {
            var _this = this;
            if (!_this.title) {
                this.showDialog('add', 'info', true, '标题不能为空');
                return false;
            }
            if (!_this.rightType) {
                this.showDialog('add', 'info', true, '材料权限不能为空');
                return false;
            }
            if (!_this.sourceTypeChannel) {
                this.showDialog('add', 'info', true, '渠道权限不能为空');
                return false;
            }
            if (!_this.watermarkFlag) {
                this.showDialog('add', 'info', true, '水印不能为空');
                return false;
            }
            if (!_this.timelinessType) {
                this.showDialog('add', 'info', true, '材料时效不能为空');
                return false;
            }
            if (!_this.mediaType) {
                this.showDialog('add', 'info', true, '请选择类型');
                return false;
            }
            if (_this.mediaType=='file') {
                if(!_this.fileUrl){
                    this.showDialog('add', 'info', true, '请上传文件');
                    return false;
                } 
            }
            if (_this.mediaType=='text') {
                if(!_this.content){
                    this.showDialog('add', 'info', true, '文字类型的内容不能为空');
                    return false;
                } 
            }
            if (_this.mediaType=='image') {
                if(_this.imgUrl.length<=0){
                    this.showDialog('add', 'info', true, '请上传附加图片');
                    return false;
                } 
            }
            if (_this.mediaType=='link') {
                if(!_this.url){
                    this.showDialog('add', 'info', true, '跳转url不能为空');
                    return false;
                } 
            }
            return true;
        },
          // 确认删除图片
        showDeleteImg:function(index){
            var _this=this;
            _this.indexImg=index;
            this.showDialog('add', 'delImg');
        },
        deleteImg:function(){
             var _this=this;
             if(_this.mediaType=='image'){ 
                _this.imgUrl.splice(_this.indexImg, 1)
            }
            if(_this.mediaType=='text'){ 
                _this.imagesUrl.splice(_this.indexImg, 1)
            }
            this.showDialog('delImg', 'add');
        },
        cancleImg:function(){  //取消删除弹框
            this.showDialog('delImg', 'add');
        },
        add:function(){
          var _this=this;
        if (this.diaInfoCheck()) {
          var params={};
          if (!_this.threeClassifyId) {
            this.showDialog('add', 'info', true, '三级分类不能为空');
            return false;
          }
        //   if (!_this.diaTagManager&&!_this.diaTagProduct) {
        //     this.showDialog('add', 'info', true, '关联标签不能为空');
        //     return false;
        //   }
          _this.categoryIdList=[];
          _this.firstClassifyId=_this.classifyList[0].categoryId;
          _this.categoryIdList.push(_this.firstClassifyId,_this.secondClassifyId,_this.threeClassifyId);

          params.categoryIdList=_this.categoryIdList;          //*分类ID 一级，二级，三级
          params.mediaConfigMode=_this.mediaConfigMode;        //材料属性
          params.title =_this.title;                          //标题
          params.description=_this.description;                // 描述 
          params.rightType=_this.rightType;                   // 材料权限类型：0-公开材料，1-内部材料，3-一对一材料 
          params.watermarkFlag=_this.watermarkFlag;                 //水印标识：0-不打水印，1-添加水印
          params.timelinessType=_this.timelinessType;                 // 素材时效性：0-无，1-有 ,
          params.timelinessCycleValue=_this.timelinessType=='1'?_this.timelinessCycleValue:'';            // 素材时效性周期值
          params.timelinessCycleType=_this.timelinessType=='1'?_this.timelinessCycleType:'';           // 素材时效性周期类型：1-日，2-月，3-周 ,
          params.pushStatus=_this.pushStatus;                 // 素材上下架状态：0-下架，1上架 ,
     
          if(!_this.publishTime){
            params.publishTime='';  //上架取选择的时间
          }else{
            params.publishTime=moment(_this.publishTime).format('YYYYMMDDHHmmss');  //上架取选择的时间
          } 
        //  params.publishTime=moment(new Date().getTime()).format('YYYYMMDDHHmmss');

        //   params.tagList=_this.diaTagManager.split(',').concat(_this.diaTagProduct.split(','));   //关联标签
          let arrList=_this.diaTagManager.split(',').concat(_this.diaTagProduct.split(','));
          params.tagList=arrList.filter((s)=>{ //关联标签  
              return s&&s.trim();     //去掉数组的空值
          })
          params.sourceType='00';                   //来源分类：00-uop,01-微信，02-现金宝 
        //   params.sourceTypeChannel=_this.sourceTypeChannel;   // 来源分类渠道 ,
        //   params.branchCodeList =['00'];  //目前写死--渠道码 ,
          params.branchCodeList =_this.sourceTypeChannel.split(',');  //渠道权限--渠道码 ,
          params.mediaType =_this.mediaType;                   //上传文件类型
          params.boundMediaId=_this.boundMediaId&&_this.mediaConfigMode=='1'?_this.boundMediaId:'';  //现有材料id
          params.displayImageUrl=_this.displayImageUrl;
          if(_this.mediaType=='file'){    //file text image  link
              params.mediaInfo={
                // filePath:'http://10.50.115.48/uopStatic/advertising/productMaterialMgmt/productList/miaov.jpg'
                filePath:_this.fileUrl
              }
          }
          if(_this.mediaType=='image'){    //file text image  link
            params.mediaInfo={
            //   imagePath:'http://10.50.115.48/uopStatic/advertising/productMaterialMgmt/productList/miaov.jpg'
              imagePath:_this.imgUrl.toString()
            }
        }
        if(_this.mediaType=='text'){    //file text image  link
            if(_this.contentId){
                params.mediaInfo={   
                    content:_this.content,
                    contentId:Number(_this.contentId),
                 //    imagePaths:['http://10.50.115.48/uopStatic/advertising/productMaterialMgmt/productList/miaov.jpg']
                    imagePaths:_this.imagesUrl?_this.imagesUrl:[]
                  }
            }else{
                params.mediaInfo={   
                    content:_this.content,
                    imagePaths:_this.imagesUrl?_this.imagesUrl:[]
                }
            }
        }
        if(_this.mediaType=='link'){    //file text image  link
            params.url=_this.url;
        }
        //   params.url=_this.url;
        //   console.log(_this.diaTagParams);


        //   $("#dialogFundTp0").val([]).trigger('change');
        //   console.log($('#dialogFundTp0').val(_this.diaTagParams).trigger('change')); 
        //   params.publishTime="20220421"; 

          console.log(params);
          let url='';
          if(!_this.updateId){
             url='/contentMgmt/productMaterial/contentInvestStrategy/add.ajax'
          }else{
              params.mediaId=_this.updateId;
             url='/contentMgmt/productMaterial/contentInvestStrategy/update.ajax'
          }
            $.post({
                url:url,
                data:params,
                success: function (result) {
                    if (result.error === 0) {
                        setTimeout(function(){
                            _this.getTableData(0);
                        },2000)
                        _this.showDialog('add', 'info', false, result.msg);
                    }else {
                        _this.showDialog('add', 'info', false,result.msg);
                    }
                }
            });

           }
        },

// start-现有材料相关操作--弹窗

         //点击选择内容-显示现有材料表格内容数据弹窗
        showMaterial:function(){
           var _this=this;
           _this.imagesUrl=[];
           _this.imgUrl=[];
           _this.searchMaterialList=[];  //现清空
           _this.showDialog('add', 'materialShow',false);
        },
        // 根据一级分类查询二级分类数据
        firstMaterialId:function(materialId,num){
            var _this=this; 
            _this.chooseMaterialId(materialId,num);  
        },
        // 根据二级分类查询三级分类数据
        secondMaterialId:function(secondMaterial,num){
            var _this=this;
            _this.chooseMaterialId(secondMaterial,num);
        },
        chooseMaterialId:function(materialId,num){
            var _this=this; 
            var params={}; 
            params.parentCategoryId=materialId;
            console.log(params);
            $.post({
                url: '/contentMgmt/productMaterial/contentInvestStrategy/threeClassifyList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        console.log(result)
                            if(num==0){
                                _this.categoryConfigList=result.data.body.ncmsContentCategoryConfigList;//二级下拉框数据
                             }
                            else{
                                _this.threeMaterialIdList=result.data.body.ncmsContentCategoryConfigList; //三级下拉框数据
                            }
                        
                    }else {
                        _this.categoryConfigList = [];
                        _this.threeMaterialIdList = [];
                        _this.showDialog('materialShow', 'info', false, result.msg);
                    }
                }
            }); 
        },

        // 查询现有材料表格数据
        searchMaterial:function(currentIndex){
            var _this=this;
                var _this = this;
                var params = {};
                console.log(_this.threeMaterial);
                if(!_this.materialId&&!_this.secondMaterial&&!_this.threeMaterial){
                    _this.showDialog('materialShow', 'info', true, '请输入查询条件查询');
                    return false;
                }
                if(_this.materialId){
                    params.categoryId =_this.materialId; //一级分类ID    
                }
                if(_this.secondMaterial){
                    params.categoryId =_this.secondMaterial; //二级分类ID  
                }
                if(_this.threeMaterial){
                    params.categoryId =_this.threeMaterial; //三级分类ID  
                }
                if(currentIndex){
                    params.pageNo=currentIndex+1;
                }else{
                    params.pageNo=1; 
                }
                params.pageSize=_this.pageMaxNum2;
                params.title=_this.searchMaterialTitle;
                console.log(params);
                _this.searchMaterialList=[];
                $.post({
                    url: '/contentMgmt/productMaterial/contentInvestStrategy/searchMaterial.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            if(currentIndex){
                                _this.currentIndex2 =currentIndex;
                            }else{
                                _this.currentIndex2 =0;
                            }
                            _this.totalPage2 = Math.ceil(result.data.body.total / params.pageSize);
                            if(result.data.body) {
                                _this.searchMaterialList = result.data.body.rows?result.data.body.rows:[];
                            }
                        }else {
                            _this.searchMaterialList = [];
                            _this.showDialog('', 'info', false, result.msg);
                        }
                    }
                });      
        },
        // 现有材料确认
        checkMaterial:function(item){
           var _this=this;
           _this.categoryIdList=[];
           _this.fileUrl="";
           _this.url='';
           _this.content='';
           _this.imagesUrl=[];            //图片清空
           _this.imgUrl=[];
           _this.diaTagManager='';   //基金经理
           _this.diaTagProduct='';   //相关产品
           _this.option.img = '';  //显示封面图片
           _this.displayImageUrl='';
        //    _this.firstClassifyId=_this.classifyList[0].categoryId;

        //    _this.threeClassifyId=item.categoryList[2];

        //    _this.categoryIdList.push(_this.firstClassifyId,_this.secondClassifyId,_this.threeClassifyId);

           // start-用mediaId调取details数据获取分类id和关联标签的回显
           var _this = this;
           var params = {};
           params.materiaIdList =item.mediaId;
           console.log(params);
           $.post({
               url: '/contentMgmt/productMaterial/contentInvestStrategy/getUpdateDetails.ajax',
               data: params,
               success: function (result) {
                   if (result.error === 0) {
                       console.log(result.data.body);
                       // 从现有材料获取当前确认的分类
                        //   _this.firstClassifyId=_this.classifyList[0].categoryId;
                        //   _this.threeClassifyId=result.data.body[0].categoryList[2];
                        //   _this.categoryIdList.push(_this.firstClassifyId,_this.secondClassifyId,_this.threeClassifyId);   
                       // 从现有材料获取当前确认的关联标签

                       _this.categoryIdList=[];
                        _this.firstClassifyId=_this.classifyList[0].categoryId;
                        for(var i=0;i<_this.menuList.length;i++){       //回显获得第三级分类
                            for(var j=0;j<result.data.body[0].categoryList.length;j++){
                                if(_this.menuList[i].categoryId==result.data.body[0].categoryList[j]){
                                    _this.threeClassifyId=result.data.body[0].categoryList[j];
                                }
                            }
                        }
                        _this.categoryIdList.push(_this.firstClassifyId,_this.secondClassifyId,_this.threeClassifyId);
                       
                       if(result.data.body[0].tagList){
                           let managetList=[];
                           let productList=[];
                           let getmanagerList=result.data.body[0].tagList.filter(function(item){  //获取标签为基金经理的
                               return item.tagCategoryName=='相关基金经理';
                           });
                           let getProductList=result.data.body[0].tagList.filter(function(item){  //获取标签为相关产品的
                               return item.tagCategoryName==='相关产品';
                           });
                           getmanagerList.forEach(function(item){   //得到基金经理名称
                               managetList.push(item.tagName);
                           })
                           getProductList.forEach(function(item){  //得到关联产品名称
                               productList.push(item.tagName);
                           })
                           _this.diaTagManager=managetList.toString();
                           _this.diaTagProduct=productList.toString();
                          $('#getTag').val(managetList.toString().split(',')).trigger('change');  //多选赋值上去
                          $('#getTag2').val(productList.toString().split(',')).trigger('change');  //多选赋值上去
                       }
                        _this.sourceTypeChannel=result.data.body[0].branchCodeList?result.data.body[0].branchCodeList.toString():'';   //渠道权限
                         $('#dialogBranch').val(_this.sourceTypeChannel.split(',')).trigger('change');

                         _this.mediaType =result.data.body[0].mediaType;                   //上传文件类型
                         _this.boundMediaId =result.data.body[0].mediaId;                 //现有材料的id
                         _this.displayImageUrl = result.data.body[0].displayImageUrl;//显示封面图片

                        //选中类型
                        $.each(_this.typeList, function (index, item) {  //清空文件类型选中
                            item.checked = false;
                        })
                        $.each(_this.materialProperty, function (index, item) {  //清空材料属性的选中
                            item.checked = false;
                        })
                            for(var i=0; i<_this.typeList.length;i++){
                                if(_this.mediaType==_this.typeList[i].value){
                                    _this.typeList[i].checked = true;
                                }
                            }
                            for(var i=0; i<_this.materialProperty.length;i++){
                                if(_this.mediaConfigMode==_this.materialProperty[i].value){
                                    _this.materialProperty[i].checked = true;
                                }
                            }
                            _this.$set(_this.typeList);

                         if(_this.mediaType=='file'){
                            _this.fileUrl=result.data.body[0].mediaDataMap&&result.data.body[0].mediaDataMap.filePath?result.data.body[0].mediaDataMap.filePath:'';//把数据处理一下
                             
                        }
                        if(_this.mediaType=='image'){    //file text image  link
                            _this.imgUrl=result.data.body[0].mediaDataMap&&result.data.body[0].mediaDataMap.imagePath?result.data.body[0].mediaDataMap.imagePath.split(','):[];//把数据处理一下
                        }
                        if(_this.mediaType=='text'){    //file text image  link
                            _this.content=result.data.body[0].mediaDataMap?result.data.body[0].mediaDataMap.content:'';//把数据处理一下
                            _this.imagesUrl=result.data.body[0].mediaDataMap&&result.data.body[0].mediaDataMap.imagePaths?result.data.body[0].mediaDataMap.imagePaths:[];//把数据处理一下
                        }
                        if(_this.mediaType=='link'){    //file text image  link
                            _this.url=result.data.body[0].url;
                        } 
                        _this.updateTime=result.data.body[0].modifyTime?result.data.body[0].modifyTime.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/g, '$1-$2-$3 $4:$5:$6'):'';
                        _this.publishTime=result.data.body[0].publishTime?result.data.body[0].publishTime.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/g, '$1-$2-$3 $4:$5:$6'):''; 

                   } else {
                       _this.showDialog('del', 'info', false, result.msg);
                   }
               }
           });
            // end-用mediaId调取details数据获取分类id和关联标签的回显

          
           _this.mediaConfigMode=1;        //材料属性
           _this.title =item.title;                          //标题
           _this.description=item.description;                // 描述 
           _this.rightType=item.rightType;                   // 材料权限类型：00-公开材料，01-内部材料，03-一对一材料 
           _this.sourceType=item.sourceType;                   //来源分类渠道：00-uop,01-微信，02-现金宝 
        //    _this.sourceTypeChannel=item.branchCodeList.toString();   //目前写死 
        //    $('#dialogBranch').val(item.sourceTypeChannel.split(',')).trigger('change');

           _this.watermarkFlag=item.watermarkFlag;                 //水印标识：0-不打水印，1-添加水印
           _this.timelinessType=item.timelinessType;                 // 素材时效性：0-无，1-有 ,
           
           _this.timelinessCycleValue=item.timelinessCycleValue;            // 素材时效性周期值
           _this.timelinessCycleType=item.timelinessCycleType;           // 素材时效性周期类型：1-日，2-月，3-周 ,
        //    _this.mediaType =item.mediaType;                   //上传文件类型
        //    if(_this.mediaType=='file'){
        //     _this.fileUrl=item.mediaDataMap?item.mediaDataMap.filePath:'';//把数据处理一下
             
        //     }
        //     if(_this.mediaType=='image'){    //file text image  link
        //         _this.imagesUrl.push(item.mediaDataMap?item.mediaDataMap.imagePath:'');//把数据处理一下
        //     }
        //     if(_this.mediaType=='text'){    //file text image  link
        //         _this.content=item.mediaDataMap?item.mediaDataMap.content:'';//把数据处理一下
        //         _this.imagesUrl=item.mediaDataMap?item.mediaDataMap.imagePaths:'';//把数据处理一下
        //     }
        //     if(_this.mediaType=='link'){    //file text image  link
        //     _this.url=item.url;
        //     }

           // _this.content=result.data.body[0].mediaType; 
           _this.pushStatus=item.pushStatus;                 // 素材上下架状态：0-下架，1上架 ,
        //    _this.tagList=[_this.tagId]; 
           _this.modifyBy=item.modifyBy;                     //修改人
           _this.createBy=item.createBy;                     //创建人
        //    _this.updateTime=item.publishTime;
        //    if(_this.pushStatus=='1'){   //当为上架状态时候
        //     _this.publishTime=item.publishTime;
        //    }
         
            _this.showDialog('materialShow', 'add');
        },
 // end-现有材料相关操作--弹窗


//start-- 修改数据

        // 修改数据
        showUpdate:function (item) {
            var _this=this;
            _this.modifyStatus=1;
            _this.fileUrl="";
            _this.url='';
            _this.content='';
            _this.imagesUrl=[];
            _this.imgUrl=[];
            _this.diaTagManager='';   //基金经理
            _this.diaTagProduct='';   //相关产品
            _this.updateId=item.mediaId;
            _this.option.img = '';  //显示封面图片
            _this.displayImageUrl='';
            _this.getUpdateDetails(item.mediaId);//调取修改呃数据;
            _this.getTagList();//获取关联标签
            _this.showDialog('', 'add');
        },

        // 修改调取details数据
        getUpdateDetails:function(mediaId){
            var _this = this;
            var params = {};
            params.materiaIdList =mediaId;
            console.log(params);
            $.post({
                url: '/contentMgmt/productMaterial/contentInvestStrategy/getUpdateDetails.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        console.log(result.data.body);
                        
                        

                        // _this.categoryIdList=[];

                        // _this.categoryIdList.push(_this.firstClassifyId,_this.secondClassifyId,_this.threeClassifyId); 
            
                        // _this.categoryIdList=_this.categoryIdList;          //*分类ID 一级，二级，三级

                        _this.categoryIdList=[];
                        _this.firstClassifyId=_this.classifyList[0].categoryId;
                        // _this.threeClassifyId=result.data.body[0].categoryList[2];
                        for(var i=0;i<_this.menuList.length;i++){       //回显获得第三级分类
                            for(var j=0;j<result.data.body[0].categoryList.length;j++){
                                if(_this.menuList[i].categoryId==result.data.body[0].categoryList[j]){
                                    _this.threeClassifyId=result.data.body[0].categoryList[j];
                                }
                            }
                        }

                        _this.categoryIdList.push(_this.firstClassifyId,_this.secondClassifyId,_this.threeClassifyId);
            
                        _this.mediaConfigMode=result.data.body[0].mediaConfigMode;        //材料属性
                        _this.title =result.data.body[0].title;                          //标题
                        _this.description=result.data.body[0].description;                // 描述 
                        _this.rightType=result.data.body[0].rightType;                   // 材料权限类型：00-公开材料，01-内部材料，03-一对一材料 
                        _this.sourceType=result.data.body[0].sourceType;                   //来源分类渠道：00-uop,01-微信，02-现金宝 
                        _this.sourceTypeChannel=result.data.body[0].branchCodeList?result.data.body[0].branchCodeList.toString():'';   //目前写死 
                        $('#dialogBranch').val(_this.sourceTypeChannel.split(',')).trigger('change');

                        _this.watermarkFlag=result.data.body[0].watermarkFlag;                 //水印标识：0-不打水印，1-添加水印
                        _this.timelinessType=result.data.body[0].timelinessType;                 // 素材时效性：0-无，1-有 ,
                        
                        _this.timelinessCycleValue=result.data.body[0].timelinessCycleValue;            // 素材时效性周期值
                        _this.timelinessCycleType=result.data.body[0].timelinessCycleType;           // 素材时效性周期类型：1-日，2-月，3-周 ,
                        _this.mediaType =result.data.body[0].mediaType;                   //上传文件类型
                        _this.boundMediaId =result.data.body[0].boundMediaId;            //现有材料的id
                        _this.displayImageUrl = result.data.body[0].displayImageUrl;//显示封面图片
                        if(_this.mediaType=='file'){
                            _this.fileUrl=result.data.body[0].mediaDataMap&&result.data.body[0].mediaDataMap.filePath?result.data.body[0].mediaDataMap.filePath:'';//把数据处理一下
                             
                        }
                        if(_this.mediaType=='image'){    //file text image  link
                            _this.imgUrl=result.data.body[0].mediaDataMap&&result.data.body[0].mediaDataMap.imagePath?result.data.body[0].mediaDataMap.imagePath.split(','):[];//把数据处理一下
                        }
                        if(_this.mediaType=='text'){    //file text image  link
                            _this.content=result.data.body[0].mediaDataMap?result.data.body[0].mediaDataMap.content:'';//把数据处理一下
                            _this.imagesUrl=result.data.body[0].mediaDataMap&&result.data.body[0].mediaDataMap.imagePaths?result.data.body[0].mediaDataMap.imagePaths:[];//把数据处理一下
                            _this.contentId=result.data.body[0].contentId;
                        }
                        if(_this.mediaType=='link'){    //file text image  link
                           _this.url=result.data.body[0].url;
                        }

                        // _this.content=result.data.body[0].mediaType; 
                        _this.pushStatus=result.data.body[0].pushStatus;                 // 素材上下架状态：0-下架，1上架 ,
                        _this.modifyBy=result.data.body[0].modifyBy;                     //修改人
                        _this.createBy=result.data.body[0].createBy;                     //创建人
                        // _this.updateTime=result.data.body[0].publishTime;

                        // if(_this.pushStatus=='1'){   //当为上架状态时候
                        //     _this.publishTime=result.data.body[0].publishTime;
                        // }
                        _this.updateTime=result.data.body[0].modifyTime?result.data.body[0].modifyTime.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/g, '$1-$2-$3 $4:$5:$6'):'';
                        _this.publishTime=result.data.body[0].publishTime?result.data.body[0].publishTime.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/g, '$1-$2-$3 $4:$5:$6'):''; 
                        
                        // 关联标签的处理
                        if(result.data.body[0].tagList){
                            let managetList=[];
                            let productList=[];
                            let getmanagerList=result.data.body[0].tagList.filter(function(item){  //获取标签为基金经理的
                                return item.tagCategoryName=='相关基金经理';
                            });
                            let getProductList=result.data.body[0].tagList.filter(function(item){  //获取标签为相关产品的
                                return item.tagCategoryName==='相关产品';
                            });
                            getmanagerList.forEach(function(item){   //得到基金经理名称
                                managetList.push(item.tagName);
                            })
                            getProductList.forEach(function(item){  //得到关联产品名称
                                productList.push(item.tagName);
                            })
                            _this.diaTagManager=managetList.toString();
                            _this.diaTagProduct=productList.toString();
                           $('#getTag').val(managetList.toString().split(',')).trigger('change');  //多选赋值上去
                           $('#getTag2').val(productList.toString().split(',')).trigger('change');  //多选赋值上去
                        }

            
                       //选中类型
                       $.each(_this.typeList, function (index, item) {  //清空文件类型选中
                        item.checked = false;
                       })
                       $.each(_this.materialProperty, function (index, item) {  //清空材料属性的选中
                        item.checked = false;
                       })
                        for(var i=0; i<_this.typeList.length;i++){
                            if(_this.mediaType==_this.typeList[i].value){
                                _this.typeList[i].checked = true;
                            }
                        }
                        for(var i=0; i<_this.materialProperty.length;i++){
                            if(_this.mediaConfigMode==_this.materialProperty[i].value){
                                _this.materialProperty[i].checked = true;
                            }
                        }
                        _this.$set(_this.typeList);
                        
                    } else {
                        _this.showDialog('del', 'info', false, result.msg);
                    }
                }
            });
        },

//end-- 修改数据
       // 上传封面图片
        // 上传封面图片
        uploadImgCover(e) {
            //上传图片
            // this.option.img
            var file = e.target.files[0];
            this.fileName = file.name;
            // this.shareCoverImage=''; //这里是用作删除图片，每次点击先隐藏按钮
            // console.log("fileName===", this.fileName);
            if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
                alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
                return false
            }
            var reader = new FileReader()
            reader.onload = (e) => {
                let data
                if (typeof e.target.result === 'object') {
                    // 把Array Buffer转化为blob 如果是base64不需要
                    data = window.URL.createObjectURL(new Blob([e.target.result]))
                } else {
                    data = e.target.result
                }
                this.option.img = data
                // $('#uploads').attr('type', 'text');   //解决不能重复添加问题-先变成text
            }
            // 转化为base64
            // reader.readAsDataURL(file)
            // 转化为blob
            this.$refs.uploadsCover.value='';
            reader.readAsArrayBuffer(file)
        },
		uploadForServer() {
			// 输出裁剪过的blob
			var _this = this;
                this.$refs.cropper.getCropBlob(async (data) => {

                    let [error, res] = await this.awaitWrap(compress(data, this.limitSize));//获得压缩过的blob
                    if (error) {
                        console.log(error);
                        return
                    }
                    console.log('res', res);
                    var formdata = new FormData();
                    let file = new File([res.compressFile], this.fileName);
                    console.log(file);
                    if (!file.name) {
                        _this.showDialog('add', 'info', true, '请选择要上传的图片!');
                        return false;
                    }
                    console.log(file.name);
                    formdata.append('file', file);
                    $(".cover").show(); 
                    $('#uploadsCover').attr('type', 'text');   //解决不能重复添加问题-先变成text
				$.post({
					url: '/contentMgmt/productMaterial/contentInvestStrategy/uploadImgCover.ajax',
					// data: res.compressBase64,
					cache: false,
					data: formdata,
					processData: false,
					contentType: false,
					success: function (result) {
						if (result.error === 0) {
                            $(".cover").hide();
                            _this.displayImageUrl = result.data.imageUrl;
                            $('#uploadsCover').attr('type', 'file');   //解决不能重复添加问题-再变成File
							_this.showDialog('add', 'info', true, result.msg);
						} else {
                            $(".cover").hide();
                            $('#uploadsCover').attr('type', 'file');   //解决不能重复添加问题-再变成File
							_this.showDialog('add', 'info', true, result.msg);
						}
					}
				});
			})
		},
		awaitWrap(promise) { // await 异常处理包装
			return promise.then(res => [null, res], error => [error, null]);
		},
        // 实时预览函数
        realTime(data) {
            this.previews = data
            // console.log(data)
        },

//start-删除数据
        // 删除数据
        showDelete:function(item){
           var _this=this;
           _this.mediaId=item.mediaId;
           _this.showDialog('', 'del');
        },
        del:function(){
            var _this = this;
            var params = {};
            params.mediaId = _this.mediaId;
            console.log(params);
            $.post({
                url: '/contentMgmt/productMaterial/contentInvestStrategy/del.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        setTimeout(function(){
                            _this.getTableData(0);
                        },1000)
                        _this.showDialog('del', 'info', false, result.msg);
                    } else {
                        _this.showDialog('del', 'info', false, result.msg);
                    }
                }
            });
        },
//end-删除数据
        
    // 获取新增里面关联标签
        addTag: function () {
            var _this = this;

            // 先注释点击加号
            // _this.getTagArrList.push({
            //     tagList:[],
            //     secondTagList:[],
            // })
            console.log(_this.getTagArrList);
            _this.getTagList();
        },
    //    一级标签
        getTagList:function(){
            var _this=this;
            var params={}
            $.post({
                url:'/contentMgmt/productMaterial/contentInvestStrategy/getTagList.ajax',
                // data:params,
                success: function (result) {
                    if (result.error === 0) {
                        // _this.getTagArrList.forEach(function(item){  //注释点击加号
                        //    item.tagList=result.data.body.rows;
                        // })
                        // _this.getTagArrList=result.data.body.rows; 
                        // console.log( _this.getTagArrList);
                        // for (var i= 0; i<  _this.getTagArrList.length; i++) {
                        //     _this.getSecondTagList(_this.getTagArrList[i].tagCategoryId,i);
                        // }
                        _this.getTagArrList.push(result.data.body.rows[0]);
                        _this.getSecondTagList(result.data.body.rows[0].tagCategoryId,0);

                        _this.getTagArrList2.push(result.data.body.rows[1]);
                        _this.getProductTagList(result.data.body.rows[1].tagCategoryId,1);
                    
                    }else {
                        _this.showDialog('', 'info', false,result.msg);
                    }
                }
            })
        },

        // 获取关联标签的二级标签
        getSecondTagList:function(tagCategoryId,i){
            var _this=this;
            var params={}
            // console.log(e.target.value);
            // console.log(e.target.selectedIndex);
            params.tagCategoryId=tagCategoryId;
            console.log(params);
            $.post({
                url:'/contentMgmt/productMaterial/contentInvestStrategy/getSecondTagList.ajax',
                data:params,
                success: function (result) {
                    if (result.error === 0) {
                        console.log(result);
                        // result.data.body.tagInfoList.forEach(function(item){
                        //    _this.getArr.push(item); 
                        // })

                        // _this.getArr=result.data.body.tagInfoList.map(function(item){
                        //      return result.data.body.tagInfoList;
                        // })

                        // let arr=result.data.body.tagInfoList.map(function(item){
                        //     let obj={};
                        //         obj[i]=item;
                        //     return item;
                        // })
                        // console.log(arr);
                        // _this.getArr=arr;

                        _this.getArr=result.data.body.tagInfoList;
                        // console.log(_this.getArr);


                        // _this.getArr[i]= result.data.body.tagInfoList;
                     

                        // _this.getArr.push({
                        //     secondTagList:[],
                        // })

                        // _this.getArr.map(function(item){
                        //     item.secondTagList[index]=result.data.body.tagInfoList;
                        //     return item;
                        // })
                        console.log(_this.getArr);
   
                        // _this.getTagArrList.map(function(item){
                        //     item.secondTagList[index]=result.data.body.tagInfoList;
                        //     return item;
                        // })
                        // console.log(_this.getTagArrList);
                    }else {
                        _this.showDialog('', 'info', false,result.msg);
                    }
                }
            })
        },
        // 获取关联标签相关产品的二级标签
        getProductTagList:function(tagCategoryId,i){
            var _this=this;
            var params={}
            params.tagCategoryId=tagCategoryId;
            console.log(params);
            $.post({
                url:'/contentMgmt/productMaterial/investPrefecture/getSecondTagList.ajax',
                data:params,
                success: function (result) {
                    if (result.error === 0) {
                        console.log(result);
                      
                        _this.getArr2=result.data.body.tagInfoList;
   
                    }else {
                        _this.showDialog('', 'info', false,result.msg);
                    }
                }
            })
        },
        // 先注释掉
        // getSecondTagList:function(e,index){
        //     var _this=this;
        //     var params={}
        //     console.log(e.target.value);
        //     console.log(e.target.selectedIndex);
        //     params.tagCategoryId=e.target.value;
        //     console.log(params);
        //     $.post({
        //         url:'/contentMgmt/productMaterial/contentInvestStrategy/getSecondTagList.ajax',
        //         data:params,
        //         success: function (result) {
        //             if (result.error === 0) {
        //                 console.log(result);
        //                 // result.data.body.tagInfoList.forEach(function(item){
        //                 //    _this.getArr.push(item); 
        //                 // })

        //                 // _this.getArr= result.data.body.tagInfoList;
   
        //                 _this.getTagArrList.map(function(item){
        //                     item.secondTagList[index]=result.data.body.tagInfoList;
        //                 })
        //                 console.log(_this.getTagArrList);
        //                 // let aa=_this.getTagArrList.map(function(item){
        //                 //     item.getArr=_this.getArr;
        //                 //     return item;
        //                 // })
        //                 // console.log("aa==",aa)
                        
        //                 // console.log(_this.getTagArrList);
        //             }else {
        //                 _this.showDialog('', 'info', false,result.msg);
        //             }
        //         }
        //     })
        // },

        // getSecondTagId:function(e){
        //     var _this=this;
        //     console.log(e.target.value);
        // },
       
        //文件上传-有进度条
        uploadsFile(e) {
            var _this = this;
            let file = e.target.files[0];
            this.uploadingFile.name = file.name;
            console.log("fileName===", file.name);
            var formdata = new FormData(); //创建formdata对象
            formdata.append('file', file);
            $(".cover").show();
            $.post({
                url: '/contentMgmt/productMaterial/contentInvestStrategy/uploadFile.ajax',
                type: 'post',
                dataType: 'json',
                data: formdata,
                processData: false,
                contentType: false,
                xhr: function () {
                    var xhr = new XMLHttpRequest();
                    //使用XMLHttpRequest.upload监听上传过程，注册progress事件，打印回调函数中的event事件
                    xhr.upload.addEventListener('progress', function (e) {
                        //loaded代表上传了多少
                        //total代表总数为多少
                        _this.uploadingFile.progressRate = (e.loaded / e.total) * 100 + '%';
                        $('.g-progress').css('width', (e.loaded / e.total) * 100 + '%');
                    })
                    return xhr;
                },
                success: function (result) {
                    if (result.error === 0) {
                        $(".cover").hide();
                        _this.fileUrl = result.data.imageUrl;
                        console.log(result);
                        // console.log(result.data.imageUrl);
                        //解决不能重复添加问题
                        $('#uploadsFile').attr('type', 'text')
                        $('#uploadsFile').attr('type', 'file')
                        _this.showDialog('add', 'info', true, result.msg);
                    } else {
                        _this.showDialog('add', 'info', true, result.msg);
                        //解决不能重复添加问题
                        $('#uploadsFile').attr('type', 'text')
                        $('#uploadsFile').attr('type', 'file')
                    }
                }
            })
                
        },

        // 上传图片
        uploadImg:function(e){
            var _this = this
            var file = e.target.files[0];
            // console.log("fileName===", this.fileName);
            if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
                alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
                return false
            }
            var reader = new FileReader()
                reader.readAsDataURL(e.target.files[0])
                reader.onload = (e) => {
                    // this.$nextTick(() => {
                    //     this.imagesUrl.push(e.target.result)
                    // })
                    console.log('imagesUrl', _this.imagesUrl)
                    var formdata = new FormData();
                    formdata.append('file', file);
                     $(".cover").show();
                     $('#uploads3').attr('type', 'text');   //解决不能重复添加问题-先变成text
                    $.post({
                        url: '/contentMgmt/productMaterial/contentInvestStrategy/uploadImg.ajax',
                        // data: res.compressBase64,
                        cache: false,
                        data: formdata,
                        processData: false,
                        contentType: false,
                        success: function (result) {
                            if (result.error === 0) {  
                                $(".cover").hide();
                                if(_this.mediaType=='text'){
                                    _this.imagesUrl.push(result.data.imageUrl);
                                }else{
                                    _this.imgUrl.push(result.data.imageUrl);
                                }
                                console.log('文字类型图片',_this.imageUrl);
                                console.log('图片类型',_this.imgUrl);
                                $('#uploads3').attr('type', 'file')
                                _this.showDialog('add', 'info', true, result.msg);
                            } else {
                                $('#uploads3').attr('type', 'file')
                                _this.showDialog('add', 'info', true, result.msg);
                            }
                        }
                    });
                }
        },
  
        //主表格分页方法
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
//现有材料弹窗表格分页方法
            prev2: function () {
                if (this.currentIndex2 <= 0) {
                    return;
                }
                this.searchMaterial(this.currentIndex2 - 1);
            },
            next2: function () {
                if (this.currentIndex2 >= this.totalPage2 - 1) {
                    return;
                }
                this.searchMaterial(this.currentIndex2 + 1);
            },
            changeIndex2: function (index) {
                this.searchMaterial(index - 1);
            },
            toFirst2: function () {
                this.searchMaterial(0);
            },
            toLast2: function () {
                this.searchMaterial(this.totalPage2 - 1);
            },
        // prev2: function () {
        //     this.currentIndex2<= 0 ? 0 : this.currentIndex2--;
        // },
        // next2: function () {
        //     this.currentIndex2>= this.middleData2.length - 1 ? this.middleData2.length - 1 : this.currentIndex2++;
        // },
        // changeIndex2: function (index) {
        //     this.currentIndex2= index - 1;
        // },
  
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
        transformTime(createTime) {
            let date = new Date(Number(createTime));
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let h = date.getHours()
            let i = date.getMinutes()
            let s = date.getSeconds();
            month = month < 10 ? '0' + month : month;
            day = day < 10 ? '0' + day : day;
            if (h < 10) {
                h = '0' + h;
            }
            if (i < 10) {
                i = '0' + i;
            }
            if (s < 10) {
                s = '0' + s;
            }
            let dateT = year + '-' + month + '-' + day + " " + h + ':' + i + ':' + s
            return dateT
        },
        transFormatTime:function(value){
            return moment(value).format('YYYY-MM-DD HH:mm:ss');
        },
        formatTime:function(time){
            if(time&&time.length===14){
                return time.slice(0,4)+'-'+time.slice(4,6)+'-'+time.slice(6,8)+' '+time.slice(8,10)+':'+time.slice(10,12)+':'+time.slice(12,14)
            }else{
                return time
            }
        },
        overflowHide: function (val) {
            var str = '';
            if (val) {
                str = val.toString();
                if (str.length > 10) {
                    str = str.substring(0, 10) + '...'
                }
            } else {
                str = '-'
            }
            return str;
        }
    },
    components: {
        'date-picker': VueBootstrapDatetimePicker
    },
});