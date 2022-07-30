new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        tableData: [],
        diaMsg: '',

        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        condition: '',
        pageMaxNum: 10,

        // 查询条件
        queryKeyword: '',
        startDate: '',
        endDate: '',

    },
    mounted: function () {
        var dialogs = ['info'];
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
        this.getPastMonth();
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
            }
            else {
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
            var params = {};
            var _this = this;
            params.key = this.queryKeyword;
            params.startDate = this.$refs.startDate.value;
            params.endDate = this.$refs.endDate.value;
            if(!params.key){
                return _this.showDialog('', 'info', false, "关键词不能为空");
            }
            if(!params.startDate){
                return _this.showDialog('', 'info', false, "起始日不能为空");
            }

            var currentDay = new Date();
            var previousDay = new Date(params.startDate);
            var endDay = params.endDate ? new Date(params.endDate) : '';
            if(previousDay > currentDay){
                return _this.showDialog('', 'info', false, "起始日不能晚于当前日期");
            }
            if(endDay && previousDay > endDay){
                return _this.showDialog('', 'info', false, "起始日不能晚于截止日");
            }

            $.post({
                url: '/marketingActive/keywordQuery/template/query.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        if(result.data.length > 0){
                            _this.tableData = result.data;
                            _this.currentIndex = 0;
                            console.log(result)
                        } else {
                            _this.tableData = [];
                            _this.currentIndex = 0;
                            _this.showDialog('', 'info', false, '未查询到数据');
                        }

                    } else {
                        _this.tableData = [];
                        _this.currentIndex = 0;
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        windowGoTo: function (fileName) {
            window.location.href = '/marketingActive/activeRun/activeSettingTemplatePage.html?fileName=' + fileName;
            return;
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
        getPastMonth : function () {
            // 先获取当前时间
            var curDate = (new Date()).getTime()
            // 将一个月的时间单位换算成毫秒
            var oneMonth = 365 / 4 * 24 * 3600 * 1000
            var pastResult = curDate - oneMonth // 一个月前的时间（毫秒单位）
      
            var pastDate = new Date(pastResult)
            var pastMonth = pastDate.getMonth() + 1
            var pastDay =  pastDate.getDate()
            if (pastDay < 10)  pastDay = '0' + pastDay;
            if (pastMonth < 10)  pastMonth = '0' + pastMonth;
            this.startDate= pastDate.getFullYear() + '-' + pastMonth + '-' + pastDay;
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
    },
    components: {
        'date-picker': VueBootstrapDatetimePicker
    }
});