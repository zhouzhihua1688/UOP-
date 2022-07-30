
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

        daydef: "",
        endtm: "",
        idno: "",
        invnm: "",
        monthdef: "",
        singledef: "",
        starttm: ""

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
        // this.getTableData(0);
    },

    methods: {
        getTableData: function (currentIndex) {
            var _this=this;
            if (this.invnm === '') {
                return this.showDialog('', 'info', false, '请输入客户姓名')
            }
            if (this.idno === '') {
                return this.showDialog('', 'info', false, '身份证号')
            }
            var params = {
                invnm: this.invnm,
                // tranAcco: this.tranAcco,
                // idno: this.idno,
                idno: this.idno,
                // pageNo: currentIndex + 1,
                // pageSize: this.pageMaxNum
                invTp:"1",
                idTp:"0"
            };
            this.tableData=[];
            $.post({
                url: '/customerService/topUpOrtake/specialCust/getTableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        // this.tableData.push(result.data)
                        console.log(result.data)
                        if(result.data!=""){
                            $.post({
                                url: '/customerService/topUpOrtake/specialCust/geiInfo.ajax',
                                data: {
                                    custno:result.data.custNo,
                                    branchCode:"247",
                                },
                                success: function (result) {
                                    if (result.error === 0) {
                                        this.tableData.push(result.data)
                                    } else {
                                        this.showDialog("", "info", false, result.msg)
                                    }
                                }.bind(this)
                            });
                        }else{
                            this.showDialog("", "info", false,"未查到相关客户信息")
                        }

                        // this.tableData = result.data.map(function (item) {
                        //     item.check = false;
                        //     return item;
                        // });
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
        // active: function (item) {
        //     this.$set(item, 'check', !item.check)
        // },
        submitTips: function () {
            var _this=this;
            // var status = this.tableData.some(function (item) {
            //     if (item.check) {
            //         return true;
            //     }
            // })
            // if (!status) {
            //     return this.showDialog('', 'info', false, '请选择需要提交的数据');
            // }
            // this.showDialog('', 'submitInfo', false, '确定提交数据吗?')
           _this.tableData.forEach(function(item){
               console.log(item)
                   _this.daydef=item.daydef,
                   _this.endtm=item.endtm,
                   _this.idno= item.idno,
                   _this.invnm= item.invnm,
                   _this.monthdef= item.monthdef,
                   _this.singledef= item.singledef,
                   _this.starttm= item.starttm
           })
            this.showDialog('', 'submitInfo', false, '确定提交数据吗?')
        },
        submitData: function () {
            var _this=this;
            var params={}
                params.daydef=this.daydef;
                params.endtm=this.endtm;
                params.idno=this.idno;
                params.invnm=this.invnm;
                params.monthdef=this.monthdef;
                params.singledef=this.singledef;
                params.starttm=this.starttm;
            console.log(params)
            $.post({
                url: '/customerService/topUpOrtake/specialCust/submitData.ajax',
                data: params,
                traditional: true,
                success: function (result) {
                    this.getTableData(0)
                    this.showDialog("submitInfo", "info", false, result.msg)
                }.bind(this)
            });
        }

        //     var params = {
        //         data: []
        //     };
        //     this.tableData.forEach(function (item) {
        //         if (item.check) {
        //             var obj = {
        //                 bankAcco: item.bankAcco,
        //                 bankChannelName: item.bankChannelName,
        //                 bankNo: item.bankNo,
        //                 branchCode: item.branchCode,
        //                 currentPrincipal: item.currentPrincipal,
        //                 custNo: item.custNo,
        //                 modifyPrincipal: item.modifyPrincipal
        //             }
        //             params.data.push(obj)
        //         }
        //     })
        //     params.data = JSON.stringify(params.data)
        //     console.log(params.data)
        //     $.post({
        //         url: '/customerService/selfFundManage/staticFund/submitData.ajax',
        //         data: params,
        //         traditional: true,
        //         success: function (result) {
        //             this.getTableData()
        //             this.showDialog("submitInfo", "info", false, result.msg)
        //         }.bind(this)
        //     });
        // }
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