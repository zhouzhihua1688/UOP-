// 多个分页器的类
// class Page {
//     constructor(option) {
//         console.log(option)
//         for (let key in option) {
//             this[key] = option[key];
//         }
//         // this.currentIndex = 0;
//         // this.maxSpace = 5;
//         // this.totalPage =0;
//         // this.pageMaxNum = 10;
//     }
//
//     // method(fn, arg) {
//     //     fn(arg);
//     // }
// };
// 使用剪切图片插件
// Vue.use(window['vue-cropper']);
var vm = new Vue({
    el: '#content',
    data: function () {
        return {
            // page1: new Page({
                startTime: '', //开始时间
                endTime: '', //结束时间
                isSeparate: {
                    value: 'N',
                    checked: false
                }, //y时段UA单独统计n时段UA不单独统计
                searchMaterial: '', //搜索-访问内容
                searchName:'',      //搜索-姓名  
                tableData: [],
                productData: [],
                currentIndex: 0,
                maxSpace: 5,
                totalPage: 0,
                pageMaxNum: 10,
                // method: function (currentIndex) {
                //     this.getTableData1(currentIndex)
                // }.bind(this)
            // }),
            // page2: new Page({
                currentIndex2: 0,
                maxSpace2: 5,
                totalPage2: 0,
                pageMaxNum2: 10,
                invitationData: [],
                detailList:[],
                // method: function (currentIndex) {
                //     this.getInvitationData(currentIndex)
                // }.bind(this)
            // }),
            // vue-cropper的配置项
         
            diaMsg: '',
            fundCode: '',
            fundName: '',  
            unionId:'',    
            updateId: '',   //用做判断
            userTypeList: [],//用户类型枚举
            roleId: '',
            channelList: [], //渠道一级枚举数据
            channelData: '', //单个一级渠道数据
            channeSublList: [],//渠道二级级枚举数据
            channelSubData: '',//单个二级渠道数据
            pvFundCode: '',  //获取pv产品代码值
            fileName: '',
            loadingShow: false,  //loading动画
            showText:'数据加载中...',
        }
    },
    mounted: function () {
        var dialogs = ['info', 'del', "selectAuthor"];
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
        // this.getTableData(0);
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
        this.getTableData1(0);
        this.getUserType();
        this.getChannel(); 
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
        // 'page1.pageMaxNum': {
        //     handler: function () {
        //         this.getTableData1(0);
        //     }
        // },
        pageMaxNum: function () {
            this.getTableData1(0);
        },
        pageMaxNum2: function () {
            this.getInvitationData(0,'');
        },
        // 渠道二级选择哪个
        channelData: function () {
            for (var i = 0; i < this.channelList.length; i++) {
                if (this.channelData == this.channelList[i].agencyLvl1Id) {
                    this.channeSublList = this.channelList[i].agencyTwoList;
                    // this.channelSubData = this.channelList[i].agencyTwoList[0].agencyLvl2Id;
                }
                if (!this.channelData) {
                    this.channelSubData = '';
                    this.channeSublList=[];
                    this.$set(this.channeSublList);
                }
            }
        },
        fundCode: function () {
            var _this = this;
            console.log(_this.fundCode);
            console.log(_this.modifyStatus);
            var resultOne = this.productData.some(function (item) {
                if (item.fundCode == _this.fundCode) {
                    _this.fundName = item.fundName;
                    return true;
                }
            })

            // if(resultOne==true){
            //     this.showDialog('add', 'info', true, '产品代码已存在');
            //     return false;
            // }
        }

    },
    methods: {
        // moment: moment,

        // 主表格数据
        getTableData1: function (currentIndex) {
            //   console.log(currentIndex);
            var _this = this;
            var params = {};
            params.userType = this.roleId; //用户类型
            if(this.channelSubData){
              params.channel = this.channelData+'-'+this.channelSubData; //一级加二级渠道
            }else{
              params.channel = this.channelData; //一级渠道
            }
            params.searchMaterial = this.searchMaterial; //访问内容
            params.searchName = this.searchName; //姓名
            params.startTime = this.startTime;
            params.endTime = this.endTime;
            params.page = currentIndex + 1;
            params.size = this.pageMaxNum;
            console.log(params);
            $(".cover").show();
            _this.tableData=[];
            $.post({
                url: '/advertising/userMgmt/userList/getTableData.ajax',
                data: params,
                success: function (result) {
                    $(".cover").hide();
                    if (result.error === 0) {
                        _this.currentIndex = currentIndex;
                        _this.totalPage = Math.ceil(result.data.body.total / params.size);
                        if(result.data.body.data) {
                            _this.tableData = result.data.body.data?result.data.body.data:[];
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
                // 获取用户类型

        getUserType() {  
            var _this = this;
            $.post({
                url: '/advertising/userMgmt/userList/getUserParam.ajax',
                // data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.userTypeList = result.data.body;
                        console.log("用户类型", _this.userTypeList)
                    } else {
                        _this.showDialog('', 'info', true, result.msg);
                    }
                }
            });
        },
        // 获取渠道
        getChannel() {
            var _this = this;
            $.post({
                url: '/advertising/userMgmt/userList/getChannel.ajax',
                // data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.channelList = result.data.body;
                        console.log("渠道:", _this.channelList)
                    } else {
                        _this.showDialog('', 'info', true, result.msg);
                    }
                }
            });
        },
        // 分享标题超过字数
        // change() {
        //     if (this.shareTitle.length > 26) {
        //         let str = this.shareTitle.substr(0, 26);
        //         this.shareTitle = str;
        //     }
        // },
        
        // 查看
        modify:function(item){
            var _this=this;
            _this.detailList=[];
            _this.detailList.push(item);
            this.showDialog('', 'details');
        },
        
        // 点击操作里的邀请
        invitation(item) {
            var _this = this;
            _this.unionId=item.unionId;
            this.showDialog('', 'invitation');
            this.getInvitationData(0, item.unionId);
        },
        // 点击邀请记录弹窗里查询按钮
        
        // searchInvitationData() {
        //     this.getInvitationData(0, this.pvFundCode);
        // },
        //获取邀请记录弹窗里的数据
        getInvitationData: function (currentIndex, unionId) {
            //   console.log(currentIndex);
            var _this = this;
            var params = {};
            _this.invitationData=[];
            params.unionId = unionId;
            params.page = currentIndex + 1;
            params.size = this.pageMaxNum2;
            console.log(params);
            $(".cover").show();
            $.post({
                url: '/advertising/userMgmt/userList/getInvitationData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        $(".cover").hide();
                        _this.currentIndex2 = currentIndex;
                        _this.totalPage2 = Math.ceil(result.data.body.total / params.size);
                        if(result.data.body.data){
                            _this.invitationData = result.data.body.data;
                        }else{
                            _this.invitationData=[];
                            _this.showText='暂无数据';
                        }
                    }
                    else {
                        $(".cover").hide();
                        _this.invitationData = [];
                        _this.currentIndex2 = 0;
                        _this.showText='暂无数据';
                        _this.showDialog('invitation', 'info', false, result.msg);
                    }
                }
            });

        },
    
        //公共方法
        awaitWrap(promise) { // await 异常处理包装
            return promise.then(res => [null, res], error => [error, null]);
        },
        verify: function () { // 校验

        },
        //主表格分页方法
        prev: function () {
            if (this.currentIndex <= 0) {
                return;
            }
            this.getTableData1(this.currentIndex - 1);
        },
        next: function () {
            if (this.currentIndex >= this.totalPage - 1) {
                return;
            }
            this.getTableData1(this.currentIndex + 1);
        },
        changeIndex: function (index) {
            this.getTableData1(index - 1);
        },
        toFirst: function () {
            this.getTableData1(0);
        },
        toLast: function () {
            this.getTableData1(this.totalPage - 1);
        },
        //弹窗表格分页方法
        prev2: function () {
            if (this.currentIndex2 <= 0) {
                return;
            }
            this.getInvitationData(this.currentIndex2 - 1,this.unionId);
        },
        next2: function () {
            if (this.currentIndex >= this.totalPage2 - 1) {
                return;
            }
            this.getInvitationData(this.currentIndex2 + 1,this.unionId);
        },
        changeIndex2: function (index) {
            this.getInvitationData(index - 1,this.unionId);
        },
        toFirst2: function () {
            this.getInvitationData(0,this.unionId);
        },
        toLast2: function () {
            this.getInvitationData(this.totalPage2 - 1,this.unionId);
        },

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
        }
    },
    components: {
        'date-picker': VueBootstrapDatetimePicker
    },
});