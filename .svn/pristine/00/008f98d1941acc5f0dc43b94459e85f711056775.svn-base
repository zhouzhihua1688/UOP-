new Vue({
    el: '#content',
    data: {
        branchTableData:[],
        fileCodes:'',
        pauseExpIds:'',
        pauseUpIds:'',
        // page data
        title: '',
        branchcode:'',
        branchnm:'',
        fileCode:'',
        fileDesc:'',
        tano:'',
        ioType:'',
        expSt:'',
        uploadSt:'',
        status: '',
        diaMsg: '',
        today:'',
        operator: '',
        userId: '',
        dialogData: [],
        // table data
        tableData: [],
        currentIndex: 0,
        pageMaxNum: '50',
        condition: '',
        currentIndex2: 0,
        pageMaxNum2: '20',
        condition2: '',
        // loading动画
        progress: false,
        branchTableRowSize:3,
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

        middleData2: function () {
            var middleData2 = [];
            var filterData = [];
            var pageMaxNum = parseInt(this.pageMaxNum2);
            var _this = this;
            this.dialogData.forEach(function (jsonObj) {
                var valueArr = [];
                for (var prop in jsonObj) {
                    valueArr.push(jsonObj[prop]);
                }
                for (var i = 0, len = valueArr.length; i < len; i++) {
                    if (valueArr[i]) {
                        if (valueArr[i].toString().indexOf(_this.condition2) != -1) {
                            filterData.push(jsonObj);
                            break;
                        }
                    }
                }
            });
            if (filterData.length <= pageMaxNum) {
                middleData2.push(filterData);
                return middleData2;
            } else {
                var i = 0;
                while ((i + 1) * pageMaxNum < filterData.length) {
                    middleData2.push(filterData.slice(i * pageMaxNum, (i + 1) * pageMaxNum));
                    i++;
                }
                middleData2.push(filterData.slice(i * pageMaxNum, filterData.length));
                return middleData2;
            }
        },
        viewData2: function () {
            let currentIndex = parseInt(this.currentIndex2);
            return this.middleData2[currentIndex];
        },
        allCheck: function () {
            if (this.viewData.length == 0) {
                return false;
            }
            var flag = true;
            this.viewData.forEach(function (item) {
                if (!item.check) {
                    flag = false;
                }
            });
            return flag;
        },
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
        },
        pageMaxNum2: {
            handler: function (val, oldval) {
                this.currentIndex2 = 0;
            }
        },
        condition2: {
            handler: function (val, oldval) {
                this.currentIndex2 = 0;
            }
        }
    },
    mounted: function () {
        var _this=this;
        var dialogs = ['', '', '', 'info'];
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


        var urlDate=_this.getUrlParam("date");
        if(!urlDate){
            var date= new Date();
            var year = date.getFullYear();
            var month = date.getMonth()+1;
            var day = date.getDate();
            if(month<10){
                month="0"+month;
            }
            if(day<10){
                day="0"+day;
            }
            year=year.toString();
            month=month.toString();
            day=day.toString();
            var newDate = year+month+day;
            _this.today = newDate;
            var params = {};
            params.date= newDate;
            $.get({
                url: '/thirdPartyOperation/channelMaintain/fileInteraction/search.ajax',
                data: params,
                success: function (result) {
                    console.log(result)
                    if (result.error == 0) {
                        _this.tableData = result.data;
                    }
                    else {
                        _this.showDialog('', 'info1', false);
                    }
                },
                error: function () {
                    _this.showDialog('', 'info', false, result.msg);
                }
            });

        }else{
            _this.today = urlDate;
            var params = {};
            params.date= urlDate;

            console.log(params.date);
            $.get({
                url: '/thirdPartyOperation/channelMaintain/fileInteraction/search.ajax',
                data: params,
                success: function (result) {
                    console.log(params)
                    console.log(result)
                    if (result.error == 0) {

                        _this.tableData = result.data;

                    }
                    else {
                        _this.showDialog('', 'info1', false);
                    }
                },
                error: function () {
                    _this.showDialog('', 'info', false,  result.msg);
                }
            });
        };

        $('.date-picker').datepicker({
            autoclose: true,
            todayHighlight: true,
            format: 'yyyymmdd',
            language: 'cn'
        })
        //show datepicker when clicking on the icon
            .next().on(ace.click_event, function () {
            $(this).prev().focus();
        });

        if (_this.branchTableData.length > 0) {
            _this.branchTableData = _this.convertTableData(_this.branchTableData, _this.branchTableRowSize);
        }
    },
    methods: {
        prev: function () {
            this.currentIndex <= 0 ? 0 : this.currentIndex--;
        },
        next: function () {
            this.currentIndex >= this.middleData.length - 1 ? this.middleData.length - 1 : this.currentIndex++;
        },
        changeIndex: function (index) {
            this.currentIndex = index - 1;
        },
        prev2: function () {
            this.currentIndex2 <= 0 ? 0 : this.currentIndex2--;
        },
        next2: function () {
            this.currentIndex2 >= this.middleData2.length - 1 ? this.middleData2.length - 1 : this.currentIndex2++;
        },
        changeIndex2: function (index) {
            this.currentIndex2 = index - 1;
        },
        add: function (index) {
            var _index = this.inSelected(this.viewData[index], this.tableData, 'seqNo');
            this.tableData[_index].check = !this.tableData[_index].check;
        },
        inSelected: function (item, arr, prop) {
            var _index = -1;
            arr.forEach(function (value, index) {
                if (item[prop] == value[prop]) {
                    _index = index;
                }
            });
            return _index;
        },
        selectAll: function () {
            var _this = this;
            var _index = -1;
            if (_this.allCheck) {
                this.viewData.forEach(function (item) {
                    _index = _this.inSelected(item, _this.tableData, 'seqNo');
                    _this.tableData[_index].check = false;
                });
            } else {
                this.viewData.forEach(function (item) {
                    _index = _this.inSelected(item, _this.tableData, 'seqNo');
                    _this.tableData[_index].check = true;
                    // console.log("ind", _this.tableData[_index])

                });
            }
        },
        convertTableData: function (data, length) {
            var strLength = Math.ceil(data.length / length);
            var ret = new Array(strLength);
            for (var i = 0; i < strLength; i++) {
                let l = data.length - length * (i + 1);
                let len = length;
                if (l < 0) len = data.length - length * i;
                ret[i] = new Array(len);
                for (var j = 0; j < len; j++) {
                    ret[i][j] = data[i * length + j];
                }
            }
            console.log(ret);
            return ret;
        },
        search: function () {
            var _this = this;
            _this.currentIndex = 0;
            var date=$(".date-picker").val();

            //  function replaceParamVal(paramName,replaceWith){
            //     var oUrl = this.location.href.toString();
            //     var re = eval('/('+paramName+'=)([^&]*)/gi');
            //     var nUrl = oUrl.replace(re,paramName+'='+replaceWith);
            //      this.location = nUrl;
            //     window.location.href = nUrl
            //  }
            //   replaceParamVal("date",date);



            console.log(date);
            _this.today = date;

            var params = {};
            params.date= date;
            params.branchnm = this.branchnm;
            params.fileDesc = this.fileDesc;
            console.log(params.branchnm);
            console.log(params.fileDesc);
            $.get({
                url: '/thirdPartyOperation/channelMaintain/fileInteraction/search.ajax',
                data: params,
                success: function (result) {
                    console.log("params",params);
                    console.log("result",result);
                    if (result.error === 0) {

                        _this.tableData = result.data;

                    }
                    else {
                        _this.showDialog('', 'info1', false);
                    }
                },
                error: function () {
                    _this.showDialog('', 'info', false, '数据获取失败');
                }
            });

        },
        //人工执行
        implement: function () {
            var _this = this;
            var forceIds = [];
            for (var i = 0; i < this.tableData.length; i++) {
                if (this.tableData[i].check) {
                    forceIds.push(this.tableData[i].seqNo);
                }
            }
            console.log(forceIds);
            var params = {};
            params.forceIds = forceIds;
            params.operator = this.operator;

            console.log(params);
            $.post({
                url: '/thirdPartyOperation/channelMaintain/fileInteraction/implement.ajax',
                data: params,
                success: function (result) {
                    console.log(params)
                    console.log(result)
                    if (result.error == 0) {

                        _this.tableData = result.data;
                    }
                    else {
                        _this.showDialog('', 'info', false, '数据获取失败');
                    }
                },
                error: function () {
                    _this.showDialog('', 'info', false, '数据获取失败');
                }
            });
        },
        //人工执行弹框
        showimplement: function(){
            var _this = this;
            var flag = false;
            var forceIds = [];
            for (var i = 0; i < this.tableData.length; i++) {
                if (this.tableData[i].check) {
                    forceIds.push(this.tableData[i]);
                    flag = true;
                }
            }
            if (!flag) {
                _this.showDialog('', 'gouxuan', false);
                return;
            }
            _this.showDialog('', 'option', false);
        },
        //人工执行刷新页面
        breaksimplement: function () {
            var _this = this;
            _this.implement();
            var date=$(".date-picker").val();
            window.location.href="/thirdPartyOperation/channelMaintain/fileInteraction.html?date="+date;

        },
        //系统执行刷新页面
        breaksimplements: function () {
            var _this = this;
            _this.implements();
            var date=$(".date-picker").val();
            //var branchnm = _this.branchnm;
            // var fileDesc = _this.fileDesc;
            window.location.href="/thirdPartyOperation/channelMaintain/fileInteraction.html?date="+date;

        },
        //初始化当日对账清单刷新页面
        breaks: function () {
            var _this = this;
            _this.resetTask();
            var date=$(".date-picker").val();
            setTimeout(function(){
                var date=$(".date-picker").val();
                window.location.href="/thirdPartyOperation/channelMaintain/fileInteraction.html?date="+date;
            },500)
        },

        showCreateRemind:function(){
            var _this = this;
            var date=$(".date-picker").val();
            if(date){
                _this.showDialog('restartCh', 'createRemid', false,"确定要重新生成清单？")
            }else {
                _this.showDialog('restartCh', 'info', false,"选择日期不能为空！")
            }
        },
        newCreateCheck:function(){
            let _this = this;
            let checkedBranch = [];
            let fileCodeList = [];
            let type = '';
            $("[name='checkBranch']:checked").each(function () {
                checkedBranch.push($(this).val());
            });
            if (_this.fileCodes) {
                fileCodeList = _this.fileCodes.trim().split(",");
            }

            if (!_this.fileCodes && checkedBranch.length ===0) {
                //全量生成
                type = 'ALL';
            }
            if (!_this.fileCodes && checkedBranch.length > 0) {
                //渠道生成
                type = 'BRANCHCODE';
            }
            if (_this.fileCodes && checkedBranch.length === 0) {
                //文件码生成
                type = 'FILECODE';
            }
            if (_this.fileCodes && checkedBranch.length > 0) {
                //
                type = 'DETAIL';
            }

            var date=$(".date-picker").val();
            if (!date){
                _this.showDialog('restartCh', 'info', false,"选择日期不能为空！");
                return;
            }
            if (!type){
                _this.showDialog('restartCh', 'info', false,"参数异常！");
                return;
            }

            var params = {};
            params.operater = 'admin';
            params.date = date;
            params.fileJobListEnum  = type;
            params.branchCodes = checkedBranch;
            params.fileCodes = fileCodeList;

            console.log(params);
            $.post({
                url: '/thirdPartyOperation/channelMaintain/fileInteraction/resetPart.ajax',
                data: params,
                success: function (result) {
                    console.log(params);
                    console.log("resutl",result);
                    if (result.error === 0) {
                        //延时刷新
                        setTimeout(function () {
                            window.location.reload();
                        },650);
                    }
                    else {
                        _this.showDialog('', 'info', false, '数据获取失败');
                        //延时刷新
                        setTimeout(function () {
                            window.location.reload();
                        },1500);
                    }
                },
                error: function () {
                    _this.showDialog('', 'info', false, '数据获取失败');

                }
            });

        },
        showresetTask: function(){
            var _this = this;
            _this.qryBranchInfo();
            _this.showDialog('', 'restartCh', false)
        },

        //查询当日渠道信息
        qryBranchInfo:function(){
            let _this = this;
            let date=$(".date-picker").val();
            let params = {};
            params.fileDate= date;
            $.get({
                url: '/thirdPartyOperation/channelMaintain/fileInteraction/qrybranchInfo.ajax',
                data: params,
                success: function (result) {
                    console.log(params);
                    console.log(result);
                    if (result.error === 0) {
                        _this.branchTableData = _this.convertTableData(result.data, _this.branchTableRowSize);
                    }
                    else {
                        _this.showDialog('', 'info', false, '数据获取失败');
                    }
                },
                error: function () {
                    _this.showDialog('', 'info', false, '数据获取失败');
                }
            });


        },
        //系统执行弹框
        showimplements: function(){
            var _this = this;
            var flag = false;
            var resetIds = [];
            for (var i = 0; i < this.tableData.length; i++) {
                if (this.tableData[i].check) {
                    resetIds.push(this.tableData[i]);
                    flag = true;
                }
            }
            if (!flag) {
                _this.showDialog('', 'gouxuan', false);
                return;
            }
            _this.showDialog('', 'syst', false);
        },
        //系统执行
        implements: function () {
            var _this = this;
            var resetIds = [];
            for (var i = 0; i < this.tableData.length; i++) {
                if (this.tableData[i].check) {
                    resetIds.push(this.tableData[i].seqNo);
                }
            }
            console.log(resetIds);
            var params = {};
            params.resetIds = resetIds;
            params.operator = this.operator;

            console.log(params);
            $.post({
                url: '/thirdPartyOperation/channelMaintain/fileInteraction/implements.ajax',
                data: params,
                success: function (result) {
                    console.log(params);
                    console.log(result);
                    if (result.error === 0) {

                        _this.tableData = result.data;
                    }
                    else {
                        _this.showDialog('', 'info', false, '数据获取失败');
                    }
                },
                error: function () {
                    _this.showDialog('', 'info', false, '数据获取失败');
                }
            });


        },
        //初始化当日任务清单 过时
        resetTask: function () {
            var _this = this;
            var date=$(".date-picker").val();
            var params = {};
            params.date= date;
            params.operator = this.operator;
            $.get({
                url: '/thirdPartyOperation/channelMaintain/fileInteraction/resetTask.ajax',
                data: params,
                success: function (result) {
                    console.log(params);
                    console.log(result);
                    if (result.error === 0) {

                        _this.tableData = result.data;
                    }
                    else {
                        _this.showDialog('', 'info', false, '数据获取失败');
                    }
                },
                error: function () {
                    _this.showDialog('', 'info', false, '数据获取失败');
                }
            });

        },
        //操作日志
        record: function () {
            var _this = this;
            this.showDialog('', 'create');
            var params = {};
            $.get({
                url: '/thirdPartyOperation/channelMaintain/fileInteraction/record.ajax',
                data: params,
                success: function (result) {
                    console.log(params);
                    console.log(result);
                    if (result.error === 0) {

                        _this.dialogData = result.data;
                        console.log(result.data);
                        _this.showDialog('', 'create', false, '');

                    }
                    else {
                        _this.showDialog('', 'info', false, '数据获取失败');
                    }
                },
                error: function () {
                    _this.showDialog('', 'info', false, '数据获取失败');
                }
            });

        },
        // 公共方法
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
        getUrlParam:function (name) {
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg);  //匹配目标参数
            if (r!=null) return unescape(r[2]); return ''; //返回参数值
        },

        //暂停导出
        pauseExport:function () {
            var _this = this;
            var pauseExpIds = [];
            for (var i = 0; i < this.tableData.length; i++) {
                if (this.tableData[i].check) {
                    pauseExpIds.push(this.tableData[i].seqNo);
                }
            }
            var params = {};
            params.seqNos = pauseExpIds;
            params.operator = this.operator;
            console.log("export param ",params);
            $.post({
                url: '/thirdPartyOperation/channelMaintain/fileInteraction/pauseExport.ajax',
                data: params,
                success: function (result) {
                    console.log(params);
                    console.log(result);
                    if (result.error === 0) {
                        // //延时刷新
                        setTimeout(function () {
                            window.location.reload();
                        },650);
                    }
                    else {
                        _this.showDialog('', 'info', false, '数据获取失败');
                        //延时刷新
                        setTimeout(function () {
                            window.location.reload();
                        },1500);
                    }
                },
                error: function () {
                    _this.showDialog('', 'info', false, '数据获取失败');
                }
            });

        },
        pauseUpload:function () {
            var _this = this;
            var seqNos = [];
            for (var i = 0; i < this.tableData.length; i++) {
                if (this.tableData[i].check) {
                    seqNos.push(this.tableData[i].seqNo);
                }
            }
            var params = {};
            params.seqNos = seqNos;
            params.operator = this.operator;
            console.log(params);
            $.post({
                url: '/thirdPartyOperation/channelMaintain/fileInteraction/pauseUpload.ajax',
                data: params,
                success: function (result) {
                    console.log(params);
                    console.log(result);
                    if (result.error === 0) {
                        //延时刷新
                        setTimeout(function () {
                            window.location.reload();
                        },650);
                    }
                    else {
                        _this.showDialog('', 'info', false, '数据获取失败');
                        //延时刷新
                        setTimeout(function () {
                            window.location.reload();
                        },1500);
                    }
                },
                error: function () {
                    _this.showDialog('', 'info', false, '数据获取失败');
                }
            });

        },
        showPauseExport:function () {
            var _this = this;
            var flag = false;
            var themeInfo = [];
            for (var i = 0; i < this.tableData.length; i++) {
                if (this.tableData[i].check) {
                    themeInfo.push(this.tableData[i]);
                    flag = true;
                }
            }
            if (!flag) {
                _this.showDialog('', 'gouxuan', false);
                return;
            }
            _this.showDialog('', 'pedia', false);
        },
        showPauseUpload: function () {
            var _this = this;
            var flag = false;
            var themeInfo = [];
            for (var i = 0; i < this.tableData.length; i++) {
                if (this.tableData[i].check) {
                    themeInfo.push(this.tableData[i]);
                    flag = true;
                }
            }
            if (!flag) {
                _this.showDialog('', 'gouxuan', false);
                return;
            }
            _this.showDialog('', 'pudia', false);
        },


    },
    filters: {//格式化时间戳
        time: function (obj) {
            if (!obj){
                return null;
            }
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
            return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
        },
        // 状态
        isUploadStatus:function(item){
            if (!item){
                return "-";
            }
            item = item.toUpperCase();
            if (item==="N") {
                return "是"
            }else if(item==="C"){
                return "否"
            }else{
                return "否"
            }
        },
        uploadStatus:function(item){
            if (!item){
                return "-";
            }
            item = item.toUpperCase();
            if (item==="N") {
                return "初始化"
            }else if(item==="S"){
                return "完成"
            }else if(item==="F"){
                return "失败"
            }else if(item==="P"){
                return "暂停中"
            }else{
                return item
            }
        },
        expStatus:function(item){
            if (!item){
                return item;
            }
            item = item.toUpperCase();
            if (item==="N") {
                return "初始化"
            }else if(item==="S"){
                return "成功"
            }else if(item==="E"){
                return "失败"
            }else if(item==="R"){
                return "执行中"
            }else if(item==="P"){
                return "暂停中"
            }else{
                return item
            }
        },
        chkStatusEnd:function(item){
            if (!item){
                return item;
            }
            item = item.toUpperCase();
            if (item==="N") {
                return "初始化"
            }else if(item==="S"){
                return "成功"
            }else if(item==="E"){
                return "失败"
            }else if(item==="R"){
                return "执行中"
            }else{
                return item
            }
        },
    }
});