var vm = new Vue({
    el: '#content',
    data: {
        // table data
        diaMsg: '',
        // 表格分页数据
        tableData: [],
        saleMonthData:[],
        currentIndex: 0,
        pageMaxNum: '200',
        condition: '',
        status: '',
        onlywrite:'',
        // 按钮显示隐藏,不可编辑
        anew: false,
        anewSign: true,

        ymonth: "",
        // 分成，调整
        formerData: '',
        xiaofuDivide: '',
        weiyongDivide: '',
        pageData: {
            weiyong: '',
            xiaofu: '',
            weiyongUp: '',
            xiaofuUp: '',
            weiyongExplain: '',
            xiaofuExplain: ''
        },
        userid: '',
        // 初始数据
        branchcode: '',
        fundid: '',
        operater: '',
        edition:'',
        feedbackgo:''
    },
    computed: {
        middleData: function () {
            var middleData = [];
            var filterData = [];
            var pageMaxNum = parseInt(this.pageMaxNum);
            var _this = this;
            _this.feedbackgo=_this.getUrlParam("feedbackgo");
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
        btnshow: function () {
            if (this.anew && this.anewSign) {
                return true;
            } else {
                return false;
            }
        },
        summar:function () {
            var obj={};
            obj.tailfarereal=0;
            obj.thirdshare=0;
            obj.percentage=0;
            obj.branchcode="";
            obj.branchnm="";
            obj.holddate="合计";
            for(var i=0; i<this.tableData.length;i++){
                obj.tailfarereal=Number((this.pageData.weiyongUp));
                obj.servicefare=Number((this.pageData.xiaofuUp)
                );
                obj.branchcode=this.tableData[i].branchcode;
                obj.branchnm=this.tableData[i].branchnm;
            }
            obj.servicefare=(obj.servicefare).toFixed(2);
            obj.thirdshare=(obj.thirdshare).toFixed(2);
            obj.tailfarereal=(obj.tailfarereal).toFixed(2);
            obj.percentage=(obj.percentage).toFixed(2);
            return obj;
        },
        //两位保留
        filters:function () {
            return function (value) {
                var realVal = parseFloat( Number(value).toFixed(2));
                return Number(realVal)
            }
        },
        //尾佣
        weiyongLink: function () {
            var _this=this;
            return function(item1) {
                var val = _this.pageData.weiyong ;
                var natualDays =_this.natualDays;
                var num=0;
                if(item1!=0){
                     num = (Number(item1)/Number(natualDays)*(val/100)).toFixed(2);
                     num = Number(num);
                }
                console.log(num)
                 if(isNaN(num)){
                    const num =0;
                    return num; 
                }else{
                    return num; 
                } 
            }
        },
        xiaofuLink: function () {
            var _this=this;
            return function(item) {
                var val = _this.pageData.xiaofu ;
                var num = (item * val/100).toFixed(2);
                num = Number(num);
                return num;
            }
        },
        weiyongSum:function () {
            var _this=this;
            var newSum=0;
            var natualDays =_this.natualDays;
            
            if(Number(_this.saleMonthData[0].thirdshare)!=0&&Number(natualDays)){
               
                var oldsum=Number(_this.saleMonthData[0].thirdshare)/Number(natualDays);
                var val=_this.pageData.weiyong;
                newSum=(Number(oldsum)*val/100).toFixed(2);
                newSum = Number(newSum)+Number(_this.pageData.weiyongUp);
            }else if(Number(_this.saleMonthData[0].thirdshare)==0){
                newSum = Number(_this.pageData.weiyongUp);
            }
            return newSum;
        },

        xiaofuSum:function () {
            var _this=this;
            var oldsum=_this.saleMonthData[0].servicefare;
            console.log(_this.saleMonthData[0]);
            var val=_this.pageData.xiaofu;
            var newSum=(Number(oldsum)*val/100).toFixed(2);
            newSum = Number(newSum)+Number(_this.pageData.xiaofuUp);
            console.log(newSum);
            return newSum;

        }
    },

    created: function () {
        var _this = this;
        this.ymonth = this.getUrlParam('ymonth');
        this.fundid = this.getUrlParam('fundid')
        this.branchcode = this.getUrlParam('branchcode');
        this.edition = this.getUrlParam('edition');
        this.operater = this.getUrlParam('operater');


    },

    mounted: function () {
        var _this = this;
        var dialogs = ['', '', 'showdialog', 'info'];
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
        //只读字段
        _this.onlywrite=_this.getUrlParam('onlywrite');


        this.formerData = JSON.parse(JSON.stringify(this.pageData));
        if(_this.onlywrite=='1'){
            var params = {};
            params.ymonth = this.ymonth;
            params.fundid = this.fundid;
            params.branchcode = this.branchcode;
            params.edition=this.edition;
            console.log(params)
            $.post({
                url: '/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/versionDialog.ajax',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        console.log(result);
                        _this.tableData = result.data.saleDaysHisList;
                        for(var i=0;i<_this.tableData.length;i++){
                            _this.tableData[i].percentage=Number(Number(_this.tableData[i].percentage).toFixed(2));
                        }
                        _this.status=result.data.saleMonthHis.status;
                        _this.saleMonthData=[result.data.saleMonthHis];

                        _this.saleMonthData[0].tailfarereal =Number(Number(_this.saleMonthData[0].tailfarereal).toFixed(2));
                        _this.saleMonthData[0].percentage=Number(Number(_this.saleMonthData[0].percentage).toFixed(2));

                        _this.saleMonthData[0].servicefare=Number(Number(_this.saleMonthData[0].servicefare).toFixed(2));
                        _this.userid = result.data.saleMonthHis.operater;
                        _this.pageData.weiyongExplain=result.data.saleMonthHis.tailfareremark;
                        _this.pageData.xiaofuExplain=result.data.saleMonthHis.servicefareremark;
                        // 分成，调整
                        _this.pageData.weiyong = (Number(result.data.saleMonthHis.tailfarerate) * 100).toFixed(2);
                        _this.pageData.xiaofu = (Number(result.data.saleMonthHis.servicefarerate) * 100).toFixed(2);
                        _this.pageData.weiyongUp =(Number(result.data.saleMonthHis.tailfarechg)).toFixed(2);
                        _this.pageData.xiaofuUp =(Number(result.data.saleMonthHis.servicefarechg)).toFixed(2);
                        //销服调增
                        _this.weiyongDivide=_this.pageData.weiyong;
                        _this.xiaofuDivide=_this.pageData.xiaofu;
                        console.log(_this.tableData);
                        if (_this.status =="S" ) {
                            _this.disabled = true;
                            _this.anew = true
                        }
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
            return;
        }
        // 明细列表
        var params = {};
        params.ymonth = this.ymonth;
        params.fundid = this.fundid;
        params.branchcode = this.branchcode;
        $.post({
            url: '/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/adjust.ajax',
            data: params,
            success: function (result) {
                console.log(result)
                if (result.error == 0) {
                    _this.tableData = result.data.saleDaysList;
                    _this.natualDays= result.data.natualDays;
                   
                    for(var i=0;i<_this.tableData.length;i++){
                        _this.tableData[i].percentage=Number(Number(_this.tableData[i].percentage).toFixed(2));
                    }
                    _this.status=result.data.saleMonth.status;
                    console.log(_this.status)
                    _this.saleMonthData=[result.data.saleMonth];
                    _this.saleMonthData[0].thirdshare=Number(Number(_this.saleMonthData[0].thirdshare).toFixed(2));
                    _this.saleMonthData[0].tailfarereal =Number(Number(_this.saleMonthData[0].tailfarereal).toFixed(2));
                    _this.saleMonthData[0].percentage=Number(Number(_this.saleMonthData[0].percentage).toFixed(2));

                    _this.saleMonthData[0].servicefare=Number(Number(_this.saleMonthData[0].servicefare).toFixed(2));
                    _this.userid = result.data.saleMonth.operater;
                    _this.pageData.weiyongExplain=result.data.saleMonth.tailfareremark;
                    _this.pageData.xiaofuExplain=result.data.saleMonth.servicefareremark;
                    // 分成，调整
                    _this.pageData.weiyong = (Number(result.data.saleMonth.tailfarerate) * 100).toFixed(2);
                    _this.pageData.xiaofu = (Number(result.data.saleMonth.servicefarerate) * 100).toFixed(2);
                    _this.pageData.weiyongUp =(Number(result.data.saleMonth.tailfarechg)).toFixed(2);
                    _this.pageData.xiaofuUp =(Number(result.data.saleMonth.servicefarechg)).toFixed(2);
                    //销服调增
                    _this.weiyongDivide=_this.pageData.weiyong;
                    _this.xiaofuDivide=_this.pageData.xiaofu;
                    console.log(_this.tableData);
                    if (_this.status =="S" ) {
                        _this.disabled = true;
                        _this.anew = true
                    }
                } else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });
    },
    methods: {
        // 刷新参数
        breakRatio: function () {
            if (this.getUrlParam("fundid", "branchcode")) {
                var _this = this;
                var params = {};
                params.fundid = this.getUrlParam('fundid');
                params.branchcode = this.getUrlParam('branchcode');
                $.post({
                    url: '/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/breakRatio.ajax',
                    data: params,
                    success: function (result) {
                        console.log(result)
                        if (result.error == 0) {
                            _this.xiaofuDivide = (Number(result.data.servicefareRatio)).toFixed(2);
                            _this.weiyongDivide = (Number(result.data.tailfareRatio)).toFixed(2);
                            _this.showDialog('', 'info', false, '刷新成功');
                        } else {
                            _this.showDialog('', 'info', false, '数据获取失败');
                        }
                    },
                    error: function () {
                        _this.showDialog('', 'info', false, '数据获取失败');
                    }
                });
            }
        },
        //刷新列表
        relist:function () {
            var params = {};
            var _this=this;
            params.ymonth = _this.ymonth;
            params.fundid = _this.fundid;
            params.branchcode = _this.branchcode;
            console.log(params.branchcode);
            $.post({
                url: '/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/adjust.ajax',
                data: params,
                success: function (result) {
                    console.log(result)
                    if (result.error == 0) {
                        _this.tableData = result.data.saleDaysList;
                        _this.saleMonthData=[result.data.saleMonth];
                        _this.saleMonthData[0].thirdshare=Number(Number(_this.saleMonthData[0].thirdshare).toFixed(2));
                        _this.saleMonthData[0].tailfarereal =Number(Number(_this.saleMonthData[0].tailfarereal).toFixed(2));
                        _this.saleMonthData[0].percentage=Number(Number(_this.saleMonthData[0].percentage).toFixed(2));

                        _this.saleMonthData[0].servicefare=Number(Number(_this.saleMonthData[0].servicefare).toFixed(2));
                        _this.userid = result.data.saleMonth.operater;
                        _this.pageData.weiyongExplain=result.data.saleMonth.tailfareremark;
                        _this.pageData.xiaofuExplain=result.data.saleMonth.servicefareremark;
                        // 分成，调整
                        _this.pageData.weiyong = (Number(result.data.saleMonth.tailfarerate) * 100).toFixed(2);
                        _this.pageData.xiaofu = (Number(result.data.saleMonth.servicefarerate) * 100).toFixed(2);
                        _this.pageData.weiyongUp =(Number(result.data.saleMonth.tailfarechg)).toFixed(2);
                        _this.pageData.xiaofuUp =(Number(result.data.saleMonth.servicefarechg)).toFixed(2);
                        //销服调增
                        _this.weiyongDivide=_this.pageData.weiyong;
                        _this.xiaofuDivide=_this.pageData.xiaofu;
                        console.log(_this.tableData)
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        checkObj: function (obj, formerObj) { //对比数据
            var keyNew = {};
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (obj[key] != formerObj[key]) {
                        keyNew[key] = obj[key]
                    }

                }
            }
            if (JSON.stringify(keyNew) == '{}') {
                return obj;
            }
            return keyNew;

        },
        // 保存
        keepSave: function (or) {
            var _this = this,
                // sign = this.checkObj(this.pageData, this.formerData),

                objLength = Object.keys(this.pageData),
                params = {};
            // if (!sign) {
            //     this.showDialog('', 'info', false, '请调整数据后再操作');
            //     return;
            // }
            console.log(_this.anewSign);
            if (this.anewSign) {
                params = {
                    ymonth: this.ymonth,
                    fundid: this.fundid,
                    branchcode: this.branchcode,
                   
                    checkflag: 'N'
                }
            } else {
                params = {
                    ymonth: this.ymonth,
                    fundid: this.fundid,
                    branchcode: this.branchcode,
                    
                    checkflag: 'Y'
                }
            }

            params.attachList = [];
            for (const key in this.formerData) {
                if (this.formerData.hasOwnProperty(key)) {
                    if (objLength.indexOf(key) == 2) {
                        params.attachList.push({
                            ymonth: this.ymonth,
                            fundid: this.fundid,
                            branchcode: this.branchcode,
                            faretype: 1,
                            changetype: objLength.indexOf(key),
                            oldvalue: this.formerData[key],
                            newvalue: this.pageData[key],
                            remark: this.pageData.weiyongExplain,
                            operater: this.userid
                        })
                    } else if (objLength.indexOf(key) == 3) {
                        params.attachList.push({
                            ymonth: this.ymonth,
                            fundid: this.fundid,
                            branchcode: this.branchcode,
                            faretype: 1,
                            changetype: objLength.indexOf(key),
                            oldvalue: this.formerData[key],
                            newvalue: this.pageData[key],
                            remark: this.pageData.xiaofuExplain,
                            operater: this.userid
                        })
                    } else {
                        params.attachList.push({
                            ymonth: this.ymonth,
                            fundid: this.fundid,
                            branchcode: this.branchcode,
                            faretype: 1,
                            changetype: objLength.indexOf(key),
                            oldvalue: this.formerData[key],
                            newvalue: (this.pageData[key])/100,
                            operater: this.userid
                        })
                    }

                }
            };
          
           
            //console.log(params.attachList.splice(3,1)) 
            /* if(params.attachList[3].newvalue==0&&params.attachList[2].newvalue==0){
                params.attachList = params.attachList.splice(0,2)
            }else if(params.attachList[2].newvalue==0&&params.attachList[3].newvalue!==0){
                var shanchu4 = params.attachList.splice(3,1);
                var shanchu12 =params.attachList.splice(0,2);
                params.attachList = shanchu4.concat(shanchu12);
            }else if(params.attachList[3].newvalue==0&&params.attachList[2].newvalue!==0){
                var shanchu3 =params.attachList.splice(2,1);
                var shanchu12 =params.attachList.splice(0,2);
                params.attachList = shanchu3.concat(shanchu12);  
            }else{
                params.attachList = params.attachList.splice(0,4);
            }     */
            params.attachList = params.attachList.splice(0,4);
            //console.log(params.attachList[2].newvalue)
            // if (params.attachList.length == 0) {
            //     // if (!rengExplain || !shenExplain || !shuExplain) {
            //     this.showDialog('', 'info', false, '请调整数据后再操作');
            //     // }
            //     return;
            // }
             
           /*  if(params.attachList[3].newvalue==0&&params.attachList[2].newvalue==0){
                params.attachList = params.attachList.splice(0,2)
            }else{
                params.attachList = params.attachList.splice(0,4);
            }  */
            //params.attachList = newparams;
            params.attachList = JSON.stringify(params.attachList)
            var url;
            if (or == 'review') {
                url = '/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/checkDone.ajax'
                $.post({
                    url: url,
                    data: params,
                    success: function (result) {
                        if (result.error == 0) {
                            console.log(result)
                            _this.showDialog('', 'info', false, '复核成功');
                            if(or!='keep'){
                                _this.anew = true;
                                _this.anewSign = true
                            }
                            _this.relist();
                        } else {
                            _this.showDialog('', 'info', false, '数据获取失败');
                        }
                    },
                    error: function () {
                        _this.showDialog('', 'info', false, '数据获取失败');
                    }
                });
            } else if (or == 'keep') {
                url = '/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/keepSave.ajax'
                $.post({
                    url: url,
                    data: params,
                    success: function (result) {
                        if (result.error == 0) {
                            console.log(result)
                            _this.showDialog('', 'info', false, '保存成功');
                            if(or!='keep'){
                                _this.anew = true;
                                _this.anewSign = true
                            }
                            _this.relist();
                        } else {
                            _this.showDialog('', 'info', false, '数据获取失败');
                        }
                    },
                    error: function () {
                        _this.showDialog('', 'info', false, '数据获取失败');
                    }
                });
            }
            /* $.post({
                url: url,
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        console.log(result)
                        _this.showDialog('', 'info', false, '保存成功');
                        if(or!='keep'){
                            _this.anew = true;
                            _this.anewSign = true
                        }
                        _this.relist();
                    } else {
                        _this.showDialog('', 'info', false, '数据获取失败');
                    }
                },
                error: function () {
                    _this.showDialog('', 'info', false, '数据获取失败');
                }
            }); */
        },


        // 返回
        back: function () {
            history.back()
        },
        prev: function () {
            this.currentIndex <= 0 ? 0 : this.currentIndex--;
        },
        next: function () {
            this.currentIndex >= this.middleData.length - 1 ? this.middleData.length - 1 : this.currentIndex++;
        },
        changeIndex: function (index) {
            this.currentIndex = index - 1;
        },
        getUrlParam: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg); //匹配目标参数
            if (r != null) return unescape(r[2]);
            return ''; //返回参数值
        },
        showdialog: function () {
            var _this = this;
            _this.showDialog("", "info", false)
        },
        // 公共方法
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
    watch: {
        pageMaxNum: {
            handler: function (val, oldval) {
                this.currentIndex = 0;
            }
        },
        condition: {
            handler: function (val, oldval) {
                this.currentIndex = 0;
            }
        }
    },
    filters: { //格式化时间戳
        time: function (obj) {
            var date = new Date(obj);
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;
            var d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            var h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            var minute = date.getMinutes();
            var second = date.getSeconds();
            minute = minute < 10 ? ('0' + minute) : minute;
            second = second < 10 ? ('0' + second) : second;
            return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
        }
    }
})