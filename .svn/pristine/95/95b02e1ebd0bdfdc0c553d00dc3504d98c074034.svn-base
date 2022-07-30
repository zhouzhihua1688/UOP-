new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        pointNo: '',
        deleteId: '',
        updateId: '',
        tableData: [],
        diaMsg: '',
        rightno:'',//查询字段
        // 弹窗相关数据
        id:'',
        rightNo:'',
        rightTitle:'',
        rightPartnerId:'',
        rightDescUrl:'',
        rightReceiveUrl:'',
        rightDesc:'',
        expireTime:'',
        partnersList:[],
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        pageMaxNum: 10,
        condition: '',
        id:'',
        iconUrl:""   //20210721增加图标地址url
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
        pageMaxNum: function () {
            this.currentIndex = 0;
        },
        condition: function () {
            this.currentIndex = 0;
        }
    },
    mounted: function () {
        var dialogs = ['info', 'operate','revise','del'];
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
            format: 'YYYY-MM-DD HH:mm:ss',//use this option to display seconds
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
        this.getTableData();
        this.partners();
    },
    methods: {
        // 提供合作方接口
        partners: function () {
            var _this = this;
            var params = {};
            params.pageNo ="1";
            params.pageSize ="9999";
            $.post({
                url: '/awardMgmt/highNetWorthEquityMgmt/basicInterestConfig/partnersParams.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.partnersList = result.data.tableData.rows;
                    }
                    else {
                        _this.partnersList = [];
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        //获取表格数据
        getTableData: function () {
            var _this = this;
            var params = {};
            params.rightNo = this.rightno;
            params.pageNo="1";
            params.pageSize="9999";
            $.post({
                url: '/awardMgmt/highNetWorthEquityMgmt/basicInterestConfig/getTableData.ajax',
                data:params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.currentIndex = 0;
                        _this.tableData = result.data.rows;
                        if(_this.tableData==null){
                            _this.tableData=[];
                        }
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },

        showAdd: function () {
            var _this = this;
            this.rightTitle = '';
            this.rightPartnerId = '';
            this.rightDescUrl = '';
            this.rightReceiveUrl = '';
            this.rightDesc = '';
            this.iconUrl='';
            $("#expireTime").val("");
            this.showDialog('', 'operate');
        },

        saveParam:function(){
            var _this=this;
            // if (this.diaInfoCheck()) {
                var params={}
                params.rightTitle=this.rightTitle;
                params.rightPartnerId=this.rightPartnerId;
                params.rightDescUrl=this.rightDescUrl;
                params.rightReceiveUrl=this.rightReceiveUrl;
                params.rightDesc=this.rightDesc;
                var expireTime = this.$refs.expireTime.value;
                params.expireTime = expireTime.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1$2$3$4$5$6');
                params.iconUrl=this.iconUrl;
                console.log(params);
                $.post({
                    url: '/awardMgmt/highNetWorthEquityMgmt/basicInterestConfig/saveParam.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.getTableData();
                            _this.showDialog('operate', 'info', false, result.msg);
                        }else {
                            _this.showDialog('operate', 'info', true, result.msg);
                        }
                    }
                });
            // }
        },

        // 修改数据
        showUpdate:function (item) {
            var _this=this;
            this.id=item.id;
            this.rightNo = item.rightNo;
            this.rightTitle=item.rightTitle;
            this.rightPartnerId=item.rightPartnerId;
            this.rightDescUrl=item.rightDescUrl;
            this.rightReceiveUrl=item.rightReceiveUrl;
            this.rightDesc=item.rightDesc;
            this.expireTime =$("#expireTimes").val(item.expireTime) ;
            this.iconUrl=item.iconUrl;
            this.showDialog('', 'revise');
        },
        update: function () {
            var _this = this;
            var params = {};
            params.id=this.id;
            params.rightNo = this.rightNo;
            params.rightTitle=this.rightTitle;
            params.rightPartnerId=this.rightPartnerId;
            params.rightDescUrl=this.rightDescUrl;
            params.rightReceiveUrl=this.rightReceiveUrl;
            params.rightDesc=this.rightDesc;
            params.expireTime =$("#expireTimes").val().replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1$2$3$4$5$6');
            params.iconUrl=this.iconUrl;
            console.log(params);
            $.post({
                url: '/awardMgmt/highNetWorthEquityMgmt/basicInterestConfig/update.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData();
                        _this.showDialog('revise', 'info', false, result.msg);
                    }
                    _this.showDialog('revise', 'info', false, result.msg);
                }
            });
        },


        showDelete: function (item) {
            this.id = item.id;
            this.showDialog('', 'del');
        },
        deleteData: function () {
            var _this = this;
            $.post({
                url: '/awardMgmt/highNetWorthEquityMgmt/basicInterestConfig/del.ajax',
                data: {id: this.id},
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData();
                        _this.showDialog('del', 'info', false, result.msg);
                    }
                    else {
                        _this.showDialog('del', 'info', false, result.msg);
                    }
                }
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
        },
        //公共方法
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
        }
    }
});
