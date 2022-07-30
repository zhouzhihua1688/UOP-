Vue.component('selectChosen', {
    template: `
        <select class="chosen-select form-control" ref="sele">
                <option value="">请选择</option>
                <option :value="item[keyName[0]]"
                 v-for="(item,index) in list">
                 {{item[keyName[0]]}}-{{item[keyName[1]]}}
                </option>
        </select>
        `,
    model: {
        prop: "value",
        event: "change",
    },
    props: {
        value: {
            validator: () => true,
        },
        list: {
            type: [Object, Array],
            default: () => [],
        },
        keyName:{
            type:Array,
            default:()=> ['','']
        }
    },
    watch: {
        value(newval) {
            $(this.$refs.sele).val(newval).trigger("chosen:updated");
        }
    },
    mounted() {
        $(this.$refs.sele).chosen({
            search_contains: true,
            no_results_text: '未找到',
            disable_search_threshold: 6,
            width: '168px'
        });
        $(this.$refs.sele).on('change', function (e, params) {
            this.$emit('change', params ? params.selected : '')
        }.bind(this));
    },
    updated() {
        $(this.$refs.sele).trigger("chosen:updated");
    },
})

new Vue({
    el: '#content',
    data: {
        // 查询
        groupId:'',
        branchCode:'',
        acceptMode:'',
        // 主页面相关数据
        tableData: [],
        acceptModeList:[{value:'0',name:'柜台'},{value:'2',name:'线上直销'},{value:'6',name:'第三方'},{value:'7',name:'企业版'}],
        branchCodeList:[],
        fundGroupList:[],
        opreateData:[],
        opreateInitData:{
            acceptMode: "",
            branchCode: "",
            channelOnlineDate: "",
            channelOnlineTime: "",
            groupid: "",
            allTime:""
        },
        deleteData:{},
        diaMsg:'',
        //主表格分页数据
        currentIndex: 1,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10,
        loadingStatus:'暂无数据'
    },
    mounted: function () {
        var dialogs = ['info','add', 'del'];
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
        this.getTableData();
        this.fundGroup();
        this.branchCodeLists();
    },
    computed: {
        // pageList: function () {
        //     var arr = [];
        //     if (this.totalPage <= 2 * this.maxSpace) {
        //         for (var i = 0; i < this.totalPage; i++) {
        //             arr.push(i + 1);
        //         }
        //         return arr;
        //     }
        //     if (this.currentIndex > this.maxSpace && this.totalPage - this.currentIndex > this.maxSpace) {
        //         for (var i = this.currentIndex - this.maxSpace; i < this.currentIndex + this.maxSpace; i++) {
        //             arr.push(i + 1);
        //         }
        //     } else if (this.currentIndex <= this.maxSpace && this.totalPage - this.currentIndex > this.maxSpace) {
        //         for (var i = 0; i < this.currentIndex + (2 * this.maxSpace - this.currentIndex); i++) {
        //             arr.push(i + 1);
        //         }
        //     } else if (this.currentIndex > this.maxSpace && this.totalPage - this.currentIndex <= this.maxSpace) {
        //         var space = this.totalPage - this.currentIndex;
        //         for (var i = this.currentIndex - (2 * this.maxSpace - space); i < this.totalPage; i++) {
        //             arr.push(i + 1);
        //         }
        //     } else {
        //         for (var i = 0; i < this.totalPage; i++) {
        //             arr.push(i + 1);
        //         }
        //     }
        //     return arr;
        // }
    },
    watch: {
        pageMaxNum: function () {
            this.currentIndex = 1;
            this.getTableData();
        },
        groupId:function(){
            this.currentIndex = 1;
        },
        branchCode:function(){
            this.currentIndex = 1;
        },
        acceptMode:function(){
            this.currentIndex = 1;
        }
    },
    methods: {
        moment,
        getTableData: function () {
            var params = {};
            params.pageNo = this.currentIndex;
            this.pageMaxNum&&(params.pageSize = this.pageMaxNum);
            this.groupId&&(params.groupId = this.groupId);
            this.branchCode && (params.branchCode = this.branchCode);
            this.acceptMode && (params.acceptMode = this.acceptMode);
            this.loadingStatus = '数据获取中...';
            $.post({
                url: '/investmentMgmt/investmentStrategy/publishSetting/getTableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        if(result.data.length>0){
                            this.tableData = result.data;
                        }else{
                            this.tableData = [];
                            this.loadingStatus = '没有数据';
                        }
                        // if (result.data.rows && result.data.rows.length > 0) {
                        //     _this.userId = result.data.userId;
                        //     _this.tableData = result.data.rows;
                        //     _this.currentIndex = result.data.pageNum - 1;
                        //     _this.totalPage = result.data.pages;
                        // } else {
                        //     _this.tableData = [];
                        //     _this.currentIndex = 0;
                        //     _this.totalPage = 0;
                        //     _this.loadingStatus = '没有数据';
                        // }

                    } else {
                        this.tableData = [];
                        this.currentIndex = 0;
                        this.totalPage = 0;
                        this.showDialog('', 'info', false, result.msg);
                        this.loadingStatus = '没有数据';
                    }
                }.bind(this)
            });
        },
        fundGroup: function () {
            var _this = this;
            $.post({
                url: '/investmentMgmt/investmentStrategy/publishSetting/fundGroups.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        var str = '';
                        var filterList=[];
                        filterList=result.data.body.filter((item)=>{
                            return item.fundgroupType=='13'||item.fundgroupType=='14'||item.fundgroupType=='15'||item.fundgroupType=='16'||item.fundgroupType=='17'
                        });
                        this.fundGroupList = filterList;
                        // console.log('filterList=',filterList);
                        // filterList.sort((a,b)=>a.groupId.replace('A','')-b.groupId.replace('A',''));
                        // filterList.forEach(function(item) {
                        //     str += '<option value="' + item.groupId + '">' + item.groupId + '-' + item.groupName + '</option>';
                        // });
                        // var fundArr = ["fundGroupsList"];
                        // fundArr.forEach(function (value) {
                        //     $('#' + value).html('<option value="">全部</option>' + str);
                        //     $('#' + value).trigger('chosen:updated');
                        // });
                    }
                }.bind(this)
            });
        },
        branchCodeLists: function () {
            $.post({
                url: '/investmentMgmt/investmentStrategy/combinationProductHandle/branchCodeList.ajax',
                data: {
                    pmst: "SYSTEM",
                    pmkey: "BRANCHCODE"
                },
                success: function (result) {
                    if (result.error === 0) {
                        
                        this.branchCodeList = result.data.body;
                    }
                }.bind(this)
            });
        },
        showAdd:function(){
            // alert(123)
            this.opreateData = [];
            this.opreateData.push(JSON.parse(JSON.stringify(this.opreateInitData)));
            this.showDialog('','add');
        },
        delInitData:function(index){
            this.opreateData.splice(index,1)
        },
        add:function(){
            var params = [];
            this.opreateData.forEach(function(item,index){
                if(item.acceptMode=='0'||item.acceptMode=='2'||item.acceptMode=='7'){
                    item.branchCode = '247'
                }
                if(item.allTime){
                    item.channelOnlineDate = this.moment(item.allTime).format('YYYY-MM-DD');
                    item.channelOnlineTime = this.moment(item.allTime).format('HH:mm:ss');
                }
            }.bind(this));
            // check
            for(var i of this.opreateData){
                for(var key in i){
                    if(!i[key]){
                        this.showDialog('add','info',true,'所有项都为必填项！')
                        return false;
                    }
                }
            }
            params = this.opreateData;
            $.post({
                url: '/investmentMgmt/investmentStrategy/publishSetting/add.ajax',
                data: {params},
                success: function (result) {
                    this.showDialog('add','info',false,result.msg)
                    this.getTableData()
                    // if (result.error === 0) {}
                    // }else{
                    //     this.showDialog('add','info',true,result.msg)
                    // }
                }.bind(this)
            });
        },
        setDatePicker: function (value, index,timeType) {
            let str

            this.opreateData.forEach((i, inde) => {
                if (inde == index) {
                     str =i[`${timeType}`]
                }
            })
            console.log( 'str:',str)
            if(str!==''){
                if (value === 'now') {
                    str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, this.getNowTime() + ' $4:$5:$6');
                } else if (value === 'future') {
                    str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '2099-12-31 $4:$5:$6' + '');
                } else if (value == 0) {
                    str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1-$2-$3 00:00:00');
                } else if (value == 15) {
                    str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1-$2-$3 15:00:00');
                }
            }else{
                if (value == 'now') {
                    str = this.getNowTime().concat(' 09:00:00')
                }else if (value == 0) {
                    str = this.getNowTime().concat(' 00:00:00')
                }else if (value == 15) {
                    str = this.getNowTime().concat(' 15:00:00')
                }else{
                    str = '2099-12-31 00:00:00'
                }
            }
            this.opreateData.forEach((i, inde) => {
                if (inde == index) {
                    i[`${timeType}`] = str
                }
            })
        },
        getNowTime: function () {
            var d = new Date();
            var fixZero = function (num) {
                return num < 10 ? '0' + num : num;
            };
            return [d.getFullYear(), d.getMonth() + 1, d.getDate()].map(function (value) {
                return fixZero(value)
            }).join('-');
        },
        deleteParams:function(item){
            this.deleteData={};
            this.deleteData.groupId = item.groupId;
            this.deleteData.acceptMode = item.acceptMode;
            this.deleteData.branchCode = item.branchCode;
            this.showDialog('','del',false,'确定要删除'+item.groupId+'吗？')
        },
        deleteConfirm:function(){
            $.post({
                url: '/investmentMgmt/investmentStrategy/publishSetting/del.ajax',
                data: {...this.deleteData},
                success: function (result) {
                    this.showDialog('del','info',false,result.msg)
                    this.getTableData()
                    // if (result.error === 0) {}
                    // }else{
                    //     this.showDialog('add','info',true,result.msg)
                    // }
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
            if (this.currentIndex <= 1) {
                return;
            }
            this.currentIndex--;
            this.getTableData()
            // this.getTableData(this.currentIndex - 1);
        },
        next: function () {
            // if (this.currentIndex >= this.totalPage - 1) {
            //     return;
            // }
            // this.getTableData(this.currentIndex + 1);
            if(this.tableData.length<this.pageMaxNum){
                return
            }
            this.currentIndex++
            this.getTableData()
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
        acceptModeTransfer:function(value){
            var obj={
                '0':'柜台',
                '2':'线上直销',
                '6':'第三方',
                '7':'企业版'
            }
            if (obj[value]) {
                return obj[value];
            }
            return value;
        },
        statusTransfer:function(value){
            var obj={
                'N':'正常',
                'C':'删除'
            }
            if (obj[value]) {
                return obj[value];
            }
            return value;
        },
        branchCodeTransfer:function(value,list){
            if(value){
                let obj = {};
                obj= list.find(function(item,index){
                    return item.pmco == value
                });
                if(obj&&Object.keys(obj).length>0){
                    return obj.pmnm
                }else{
                    return value
                }
            }else{
                return '-'
            }
        }
    },
    components:{
        datePicker: VueBootstrapDatetimePicker,
    }
});

