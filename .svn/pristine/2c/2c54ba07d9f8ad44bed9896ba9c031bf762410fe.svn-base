
new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        tableData: [],
        diaMsg: '',

        // 查询
        custno: '',//客户号
        idno: '',//511126198411035926
        // tranAcco: '',
        branchCode: '',  //网点号247
        moment: moment,
        channelList:[], //  获取渠道列表信息
        pushList:{
            branchnm:"",
            branchcode:'',
            apkind:"",
            subapkind:"",
            daydef:"200000",
            remark:"",
            // status:"1",
            seqid:"",
            starttm:moment(new Date().getTime()).format("YYYYMMDD"+'000000'),
            endtm:"20991230235959",
            type:'02'
        },
        num:0,
    },
    mounted: function () {
        var dialogs = ['info', 'submitInfo'];
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
        this.getTableData(0);
        this.getChannel();
    },

    methods: {
        getTableData: function (currentIndex) {
            var params = {
                custno: this.custno,
                // tranAcco: this.tranAcco,
                // idno: this.idno,
                branchCode: this.branchCode,
                // pageNo: currentIndex + 1,
                // pageSize: this.pageMaxNum
            };
            $.post({
                url: '/customerService/topUpOrtake/dealQuota/getTableData.ajax',
                // data: params,
                success: function (result) {
                    if (result.error === 0) {
                        // this.tableData=result.data
                        // console.log("***",result.data)
                        this.tableData = result.data.map(function (item) {
                            item.check = false;
                            return item;
                        });
                        // this.currentIndex = result.data.pageNo - 1;
                        // this.totalPage = result.data.totalPage;
                    } else {
                        this.tableData = [];
                        // this.currentIndex = 0;
                        // this.totalPage = 0;
                        this.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
//获取渠道信息
        getChannel:function(){
            var _this=this;
            $.post({
                url: '/customerService/topUpOrtake/dealQuota/getChannel.ajax',
                // data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.channelList=result.data
                    } else {
                        this.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },

        // 点击添加
        savaData:function() {
            var _this = this;
            var arrList=this.pushList
            if(this.num==0){
                _this.tableData.push(arrList)
                this.num++;
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
        active: function (item) {
            this.$set(item, 'check', !item.check)
        },
        submitTips: function () {
            var hasCheck = false;
            var num=0;
            for (var i = 0; i < this.tableData.length; i++) {
                if (this.tableData[i].check) {
                    hasCheck = true;
                    num++
                }
            }
            if (num>1){
                this.showDialog('', 'info', false, '暂不支持批量操作,请选择一条记录提交!');
                return;
            }
            if (!hasCheck) {
                return this.showDialog('', 'info', false, '请选择需要提交的数据');
            }
            this.showDialog('', 'submitInfo', false, '确定提交数据吗?')
        },
        submitData: function () {
            var _this=this;
            var params = {
                // data: []
            };
            var branchcode=""
            this.tableData.forEach(function (item) {
                _this.channelList.forEach(function(itemName){
                    if(item.branchnm==itemName.partnerName){
                        branchcode=itemName.branchCode
                    }
                })
                if (item.check) {
                     params = {
                        branchnm:item.branchnm,
                        branchcode:branchcode,
                        apkind:item.apkind,
                        subapkind: item.subapkind,
                        daydef:item.daydef,
                        remark:item.remark,
                        // seqid:"5F3A4207903",
                        seqid:item.seqid,
                        starttm:item.starttm,
                        endtm:item.endtm,
                        type:'02'
                    }
                    // params.data.push(obj)
                }
            })
            // params.data = JSON.stringify(params.data)
            var getUrl=""
            if(params.seqid==""){
                getUrl='/customerService/topUpOrtake/dealQuota/submitData.ajax'
            }else{
                getUrl='/customerService/topUpOrtake/dealQuota/submitUpdate.ajax'
            }
            $.post({
                url: getUrl,
                data: params,
                traditional: true,
                success: function (result) {
                    this.getTableData(0)
                    this.showDialog("submitInfo", "info", false, result.msg)
                }.bind(this)
            });
        }
    },
    // 类型状态
    filters: {
        status: function (item) {
            if (item) {
                return item.replace(/1/g, '有效').replace(/0/g, '无效');
            }
        },
    }
});