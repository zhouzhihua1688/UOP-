var vm= new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        //查询条件
        jobFrom: '',
        jobName: '',
        jobTriggerFrequency: '',
        tableData: [],
        handlerList:{},

        userId: '',
        diaMsg: '',
        loadingStatus: '数据获取中...',
        updateId: '',
        deleteId: '',
        isUpdate: false,
        loadingShow: false,
        //dialog新增修改数据
        diajobName: '',
        diajobHandler: 'xxljob-cdn-cacheFlush-handler',
        diajobTriggerFrequency: '1',
        diajobValidDate:'',
        timeInfo: [],
        timeInfo2: [],
        timeInfo3: [],
        cycle: '',
        // 位置主题管理传来的字段
        realJobFrom:'',
        objconfigId:'',
        thmconfigId:'',
        startTime:'',
        endTime:'',
        // 设置第一次跳转页面的flag
        flag:true,
        
        weekList:[{name:'周一',value:2},{name:'周二',value:3},{name:'周三',value:4},{name:'周四',value:5},{name:'周五',value:6},{name:'周六',value:7},{name:'周日',value:1}],
        monthList:[],
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10
        
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
    mounted: function () {
        var _this = this;
       
        var dialogs = ['info', 'rejectCheck', 'delete1'];
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
        for(var i=1;i<=31;i++){
            this.monthList.push({name:i,value:parseInt(i)});
        }
        this.objconfigId=this.getUrlParam('objconfigId')?this.getUrlParam('objconfigId'):'';
        this.thmconfigId=this.getUrlParam('thmconfigId')?this.getUrlParam('thmconfigId'):'';
        this.startTime=this.getUrlParam('startTime')?this.getUrlParam('startTime'):'';
        this.endTime=this.getUrlParam('endTime')?this.getUrlParam('endTime'):'';
        if(this.objconfigId&&this.thmconfigId){
            this.showAdd();
        }
        this.getTableData(0);
        this.getHandler();
    },
    methods: {
        moment:moment,
        getHandler:function(){
            $.post({
                url: '/recommendSystem/recommendSystemConfigMgmt/customTimingTaskMgmt/queryHandler.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        this.handlerList=result.data;
                    } else {
                        this.handlerList = {};
                        this.showDialog('', 'info', false, result.msg);
                        
                    }
                }.bind(this)
            });
        },
        getTableData: function (currentIndex) {
            var params = {};
            var _this = this;
            params.pageNo = currentIndex + 1;
            params.pageSize = this.pageMaxNum;
            params.jobFrom = this.jobFrom;
            params.jobName = this.jobName;
            params.jobTriggerFrequency = this.jobTriggerFrequency;
            // console.log(params);
            _this.loadingStatus = '数据获取中...';
            $.post({
                url: '/recommendSystem/recommendSystemConfigMgmt/customTimingTaskMgmt/queryInfo.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        if (result.data.rows && result.data.rows.length > 0) {
                            _this.tableData = result.data.rows;
                            _this.currentIndex = result.data.pageNum - 1;
                            _this.totalPage = result.data.pages;
                        } else {
                            _this.tableData = [];
                            _this.currentIndex = 0;
                            _this.totalPage = 0;
                            _this.loadingStatus = '没有数据';
                        }

                    } else {
                        _this.tableData = [];
                        _this.currentIndex = 0;
                        _this.totalPage = 0;
                        _this.showDialog('', 'info', false, result.msg);
                        _this.loadingStatus = '没有数据';
                    }
                }
            });
        },
        //新增活动配置
        setAddData: function (obj) {
            this.diajobName = obj.jobName ? obj.jobName : '';
            this.diajobValidDate = obj.jobValidDate?this.moment(obj.jobValidDate).format('YYYY-MM-DD HH:mm:ss') : '';
            this.realJobFrom = obj.jobFrom ? obj.jobFrom : '';
            this.diajobHandler = obj.jobHandler ? obj.jobHandler : 'xxljob-cdn-cacheFlush-handler';
            this.diajobTriggerFrequency = obj.jobTriggerFrequency ? obj.jobTriggerFrequency : '1';
        },
        showAdd: function () {
            var _this=this;
            if(this.flag){
                var timeArr=[];
                this.timeInfo = [];
                this.flag=false;
                if(this.objconfigId&&this.thmconfigId){
                    this.realJobFrom = this.objconfigId+'_'+this.thmconfigId;
                }else{
                    this.realJobFrom = '';
                }
                this.startTime&&(timeArr.push(this.startTime));
                this.endTime&&(timeArr.push(this.endTime));
                console.log(timeArr);
                timeArr.forEach(function(item,index){
                    var toDate={
                        triggerType: '1',
                        timingTime: '',
                        cycle: '',
                        weekTime: '',
                        monthday: ''
                    };
                    var time=this.moment(parseInt(item)).format('YYYY-MM-DD HH:mm:ss');
                    this.timeInfo.push(toDate);
                    setTimeout(function(){
                        this.timeInfo[index].timingTime=time;
                    }.bind(this),100)
                }.bind(this))
                // this.timeInfo.forEach(function(item,index){
                //    
                //     console.log(time);
                //     setTimeout(function(){
                //         // item.timingTime= 
                //     }.bind(this),100)
                // }.bind(this))
            }else{
                this.realJobFrom='';
                this.timeInfo = [];
            }
            this.setAddData({jobFrom:this.realJobFrom?this.realJobFrom:''});
            this.isUpdate = false;
            
            this.timeInfo2 = [];
            this.timeInfo3 = [];
            this.updateId = '';
            this.showDialog('', 'add');
        },
        showUpdate: function (item) {
            this.timeInfo=[];
            this.timeInfo2 = [];
            this.timeInfo3 = [];
            var toDate={
                triggerType: '',
                timingTime: '',
                cycle: '',
                weekTime: '',
                monthday: ''
            };
            this.isUpdate = true;
            this.updateId = item.jobId;
            this.setAddData(item);
            if(item.jobTriggerFrequency==1){
                Object.assign(toDate,this.translateCronToDate(item.triggerCron));
                toDate.timingTime=this.translateCronToDate(item.triggerCron).result;
                this.timeInfo.push(toDate);
            }else if(item.jobTriggerFrequency==2){
                Object.assign(toDate,this.translateCronToDate(item.triggerCron));
                if(toDate.cycle=="week"){
                    var arr=[];
                    for(var i=0;i<toDate.weekTime.length;i++){
                        arr=arr.concat(this.weekList.filter(function(item){
                            return item.value==toDate.weekTime[i];
                        }))
                    }
                    toDate.weekTime=arr;
                }else if(toDate.cycle=="month"){
                    var brr=[];
                    for(var i=0;i<toDate.monthday.length;i++){
                        brr=brr.concat(this.monthList.filter(function(item){
                                return item.value==toDate.monthday[i];
                        }));
                    }
                    toDate.monthday=brr;
                }
                // toDate.timingTime=
                // console.log(toDate);
                this.timeInfo2.push(toDate);
                setTimeout(function(){
                    this.timeInfo2[0].timingTime=this.translateCronToDate(item.triggerCron).result;
                }.bind(this),100)
            }else{
                this.timeInfo3.push(item.triggerCron) 
            }
            this.showDialog('', 'add');
        },
        add: function () {
            if(!this.diajobName){
                this.showDialog('add', 'info', true, '任务名称为必填');
                return;
            }
            if(!this.diajobValidDate){
                this.showDialog('add', 'info', true, '任务过期时间为必填');
                return;
            }
            var _this = this;
            var params = {};
            var triggerCronList=[];
            if(this.diajobTriggerFrequency==2){
                this.timeInfo2.forEach(function(item){
                    if(item.weekTime.length>0){
                        item.weekTime=item.weekTime.map(function(childitem){
                            return childitem.value;
                        })
                    }
                    if(item.monthday.length>0){
                        item.monthday=item.monthday.map(function(childitem){
                            return childitem.value;
                        })
                    }
                });
                triggerCronList = this.timeInfo2.map(function(item){
                    return _this.translateDateToCron(item);
                });
            }else if(this.diajobTriggerFrequency==1){
                triggerCronList = this.timeInfo.map(function(item){
                    return _this.translateDateToCron(item);
                });
            }else{
                triggerCronList=this.timeInfo3
            }

            params.jobName = this.diajobName;
            params.jobHandler = this.diajobHandler;
            params.jobTriggerFrequency = this.diajobTriggerFrequency;
            params.jobStatus = '0';
            params.triggerCronList=triggerCronList;
            params.jobValidDate = this.diajobValidDate;
            this.realJobFrom&&(params.jobFrom=this.realJobFrom);
            this.isUpdate && (params.jobId = this.updateId);
            console.log(params);
            var url = '/recommendSystem/recommendSystemConfigMgmt/customTimingTaskMgmt/';
            url += this.isUpdate ? 'update.ajax' : 'add.ajax';
            $.post({
                url: url,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0);
                    }
                    _this.showDialog('add', 'info', false, result.msg);
                }
            });

        },

        //删除
        deleteParams: function (item) {
            this.deleteId = item.jobId;
            this.showDialog('', 'delete1', false);
        },
        deleteConfirm: function () {
            var _this = this;
            $.post({
                url: '/recommendSystem/recommendSystemConfigMgmt/customTimingTaskMgmt/delete.ajax',
                data: {
                    jobId: this.deleteId
                },
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('', 'info', false, '操作成功');
                        _this.getTableData(_this.currentIndex);
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            })
        },
        translateDateToCron: function (dateInfo) { // 入参格式: {triggerType,timingTime,cycle,weekTime,monthday}
            var triggerType = dateInfo.triggerType; // 1: 单次 2: 重复
            if (!triggerType) {
                return '未传triggerType,无法确认触发类型';
            }
            var timingTime = dateInfo.timingTime;
            if (triggerType == 1) {
                if (!/\d{4}-\d{2}-\d{2} \d{2}:\d{2}/.test(timingTime)) {
                    return 'timingTime格式有误';
                }
                var year = Number(timingTime.split(' ')[0].split('-')[0]);
                var month = Number(timingTime.split(' ')[0].split('-')[1]);
                var day = Number(timingTime.split(' ')[0].split('-')[2]);
                var hour = Number(timingTime.split(' ')[1].split(':')[0]);
                var minutes = Number(timingTime.split(' ')[1].split(':')[1]);
                return '0 ' + minutes + ' ' + hour + ' ' + day + ' ' + month + ' ? ' + year;
            } else if (triggerType == 2) {
                var cycle = dateInfo.cycle;
                if (!cycle) {
                    return '未传cycle,无法确认触发类型';
                }
                var hour = Number(timingTime.split(':')[0]);
                var minutes = Number(timingTime.split(':')[1]);
                if (cycle == 'day') {
                    return '0 ' + minutes + ' ' + hour + ' ' + '* * ?';
                } else if (cycle == 'week') {
                    var weekTime = dateInfo.weekTime.join(',');
                    return '0 ' + minutes + ' ' + hour + ' ' + '? * ' + weekTime;
                } else if (cycle == 'month') {
                    var monthday = dateInfo.monthday.join(',');
                    return '0 ' + minutes + ' ' + hour + ' ' + monthday + ' * ?';
                } else {
                    return '未知错误,请检查入参';
                }
            } else {
                return '未知错误,请检查入参';
            }
        },
        translateCronToDate: function (cron) {
            var fixZero = function (number) {
                return number < 10 ? '0' + number : number;
            };
            var cronArr = cron.split(' ');
            if (cronArr.length === 7) {
                return {
                    triggerType: 1,
                    result: cronArr[6] + '-' + fixZero(cronArr[4]) + '-' + fixZero(cronArr[3]) + ' ' + fixZero(cronArr[2]) + ':' + fixZero(cronArr[1])
                };
            } else if (cronArr.length === 6) {
                var obj = {
                    triggerType: 2
                };
                if (cronArr[cronArr.length - 1] !== '?') {
                    obj.cycle = 'week';
                    obj.weekTime = cronArr[cronArr.length - 1].split(',');
                } else {
                    if (cronArr[cronArr.length - 3] === '*') {
                        obj.cycle = 'day';
                    } else {
                        obj.cycle = 'month';
                        obj.monthday = cronArr[cronArr.length - 3].split(',');
                    }
                }
                obj.result = fixZero(cronArr[2]) + ':' + fixZero(cronArr[1]);
                return obj;
            } else {
                return '未知错误,请检查入参';
            }
        },
        addTimeCron:function(){
            var obj={
                triggerType: this.diajobTriggerFrequency,
                timingTime: '',
                cycle: '',
                weekTime: '',
                monthday: ''
            }
            if(this.diajobTriggerFrequency==1){
                this.timeInfo.push(obj)
            }else if(this.diajobTriggerFrequency==2){
                this.timeInfo2.push(obj)
            }else{
                this.timeInfo3.push('')
            }
        },
        delTimeCron:function(index){
            this.timeInfo.splice(index,1);
        },
        delTimeCron2:function(index){
            this.timeInfo2.splice(index,1);
        },
        delTimeCron3:function(index){
            this.timeInfo3.splice(index,1);
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
        //公共方法
        getUrlParam: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg); //匹配目标参数
            if (r != null) return unescape(r[2]);
            return '';
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
        }
    },
    components: {
        'date-picker': VueBootstrapDatetimePicker,
        Multiselect: window.VueMultiselect.default
    },
});