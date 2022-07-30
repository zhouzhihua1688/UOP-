new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        themeInfoData: [],
        themeContentData: [],
        deleteData: [],
        userId: '',
        diaMsg: '',
        loadingStatus: '数据获取中...',
        contentTp: '',
        channelId: '',
        objconfigId: '',
        thmconfigId: [],
        hasthemeInfoData: false,
        searchList: '',
        filterData: []

    },
    computed: {
        // positionName:function () {
        //
        // }
    },
    watch: {
        thmconfigId: {
            handler(newValue, oldValue) {
                var _this = this;
                this.themeContentData = [];
                this.thmconfigId.forEach(function (item, index) {
                    console.log('(item:'+item+'value:'+newValue[index]+')');
                    _this.checkThemeContent(item, newValue[index])
                });
            }
        },
        searchList: {
            handler(newValue, oldValue) {
                this.filterData=[];
                this.themeInfoData.forEach(function (item) {
                    // console.log(item);
                    if (item.layoutString.toUpperCase().indexOf(newValue.toUpperCase())!=-1) {
                        this.filterData.push(item)
                    }
                }.bind(this))
            }
        },
        deep: true
    },
    mounted: function () {
        var _this = this;
        var dialogs = ['info', 'excelUpdate', 'delete1', 'delete2'];
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
        Array.prototype.delete = function (delIndex) {
            var temArray = [];
            for (var i = 0; i < this.length; i++) {
                if (i != delIndex) {
                    temArray.push(this[i]);
                }
            }
            return temArray;
        }
        this.getUrlParam('contentTp') && (this.contentTp = this.getUrlParam('contentTp'));
        this.getUrlParam('channelId') && (this.channelId = this.getUrlParam('channelId'));
        this.getUrlParam('objconfigId') && (this.objconfigId = this.getUrlParam('objconfigId'));
        if(this.getUrlParam('objconfigId')){
            this.checkThemeInfoData();
        }else{
            this.getThemeInfoData();
        }

    },
    methods: {
        //根据contentTp获取主题信息
        getThemeInfoData: function () {
            var params = {
                contentTp: this.contentTp,
                channelId: this.channelId
            };
            $.post({
                url: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/themeInfoForContentTp.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.userId = result.data.userId;
                        this.themeInfoData = result.data.resultData;
                        this.filterData = result.data.resultData;
                        this.hasthemeInfoData = true;
                    } else {
                        this.hasthemeInfoData = false;
                        this.themeInfoData = [];
                        this.showDialog('', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },
        // 获主题信息和包含objconfigId的信息标记列表
        checkThemeInfoData: function () {
            var params = {
                contentTp: this.contentTp,
                channelId: this.channelId,
                objectId: this.objconfigId,
            };
            var _this=this;
            $.post({
                url: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/queryThemeInfoDisplay.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.userId = result.data.userId;
                        this.themeInfoData = result.data.resultData;
                        this.filterData = result.data.resultData;
                        this.hasthemeInfoData = true;
                        result.data.resultData.forEach(function(item,index){
                            console.log(item);
                            if(item.checkFlag=='1'){
                                _this.thmconfigId.push(item.thmconfigId);
                                console.log(item.thmconfigId);
                            }
                        })
                        // console.log(_this.thmconfigId,'123123');
                    } else {
                        this.hasthemeInfoData = false;
                        this.themeInfoData = [];
                        this.showDialog('', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },
        //查看主题内容
        checkThemeContent: function (item) {
            var layoutString = '';
						var showTarget = false;//是否可填写目标过滤因子
            this.themeInfoData.forEach(function (themeInfo) {
                if (themeInfo.thmconfigId == item) {
                    layoutString = themeInfo.layoutString
                }
								if((themeInfo.thmconfigId == item)&&(themeInfo.dataFrom==4)){
									showTarget = true;
								}
            })
            $.post({
                url: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/checkThemeContent.ajax',
                data: {
                    thmconfigId: item,
                    themType: this.contentTp,
                    channelId: this.channelId
                },
                success: function (result) {
                    if (result.error === 0) {
                        // console.log(result.data,'check');
                        var resultData = result.data;
                        var storage = window.localStorage;
                        var localData = storage.getItem(this.contentTp) ? JSON.parse(storage.getItem(this.contentTp)) : [];
                        if (resultData.length > 0) {
                            resultData.forEach(function (resultItem) {
                                resultItem.dataType = "server";
                                localData.forEach(function (localItem, localIndex) {
                                    if (resultItem.objconfigId == localItem.objconfigId) {
                                        localData = localData.delete(localIndex);
                                    }
                                })
                            })
                        }
                        if (localData.length > 0) {
                            localData.forEach(function (localItem) {
                                localItem.thmconfigId = item;
                                localItem.position = 1;
																localItem.targetobjectkey = '' //目标过滤因子传值
                            })
                        }
                        var allData = resultData.concat(localData);
												
												
                        this.themeContentData.push({
                            thmconfigId: item,
                            allData: allData,
                            layoutString: layoutString,
														showTarget
                        });

                        setTimeout(function () {
                            $('.date-timepicker').datetimepicker({
                                format: 'YYYY-MM-DD HH:mm:ss', //use this option to display seconds
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
                            allData.forEach(function (allItem, allIndex) {
                                if (allItem.startTime && allItem.endTime) {
                                    $("#startTime_" + allItem.thmconfigId + "_" + allIndex).val(this.formatTime(allItem.startTime));
                                    $("#endTime_" + allItem.thmconfigId + "_" + allIndex).val(this.formatTime(allItem.endTime));
                                } else {
                                    $("#startTime_" + allItem.thmconfigId + "_" + allIndex).val('')
                                    $("#endTime_" + allItem.thmconfigId + "_" + allIndex).val('')
                                }

                            }.bind(this))
                        }.bind(this), 0)
                    } else {
                        this.showDialog('', 'info', false, result.msg);
                    }
                }.bind(this)
            })
        },
        deleteParams: function (item, parentIndex, index) {
            // server假删除，将数据存储在deleteData，local真删除从保存的数组中删除
            if (item.dataType == 'server') {
                this.themeContentData[parentIndex].allData.splice(index, 1)
                this.deleteData.push(item)
            } else {
                this.themeContentData[parentIndex].allData.splice(index, 1)
            }
            this.themeContentData[parentIndex].allData.forEach(function (allItem, allIndex) {
                if (allItem.startTime && allItem.endTime) {
                    $("#startTime_" + allItem.thmconfigId + "_" + allIndex).val(this.formatTime(allItem.startTime));
                    $("#endTime_" + allItem.thmconfigId + "_" + allIndex).val(this.formatTime(allItem.endTime));
                } else {
                    $("#startTime_" + allItem.thmconfigId + "_" + allIndex).val('')
                    $("#endTime_" + allItem.thmconfigId + "_" + allIndex).val('')
                }
            }.bind(this))
        },
        saveParams: function (parentItem) {
            var realDeleteParams = [];
            var itemData = parentItem.allData;
            if (itemData && itemData.length > 0) {
                try {
                    itemData.forEach(function (item, index) {
                        item.startTimein = $("#startTime_" + item.thmconfigId + "_" + index).val();
                        item.endTimein = $("#endTime_" + item.thmconfigId + "_" + index).val();
                        item.modifyBy = this.userId;
                        if(item.startTimein==''||item.endTimein==''||item.position==''){
                            throw new Error('每条数据的开始时间结束时间和排序为必填!')
                        }
                    }.bind(this))
                } catch (error) {
                    this.showDialog('','info',false,error.message);
                    return false;
                }
                
                // 保存
                $.post({
                    url: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/themeContentSave.ajax',
                    data: {
                        saveParams: itemData
                    },
                    success: function (result) {
                        if (result.error === 0) {
                            // console.log(result,'add');
                            // window.localStorage.removeItem(this.contentTp);
                            this.showDialog('', 'info', false, '保存成功');
                        } else {
                            this.showDialog('', 'info', false, result.msg);
                        }
                    }.bind(this)
                })
            }
            if (this.deleteData.length > 0) {
                // 遍历deleteData 找出属于当前table中的删除数据再进行删除
                this.deleteData.forEach(function (deleteItem) {
                    if (deleteItem.thmconfigId == parentItem.thmconfigId) {
                        realDeleteParams.push(deleteItem);
                    }
                })
                $.post({
                    url: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/themeContentDelete.ajax',
                    data: {
                        deleteParams: realDeleteParams
                    },
                    success: function (result) {
                        if (result.error === 0) {
                            this.showDialog('', 'info', false, '删除成功');

                        } else {
                            this.showDialog('', 'info', false, result.msg);
                        }
                    }.bind(this)
                })
            }
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
        },
        formatTime: function (timestamp) {
            if (timestamp) {
                var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
                var Y = date.getFullYear() + '-';
                var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
                var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
                var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
                var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
                return Y + M + D + h + m + s;
            } else {
                return '';
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
        },
    }
});