var vm = new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        tableData: [],
        dialog_reportName: '',
        diaMsg: '',
        searchInfo: "",
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10,
        condition: '',
        // 文件
        uploadingFile: {},
        fileUrl: '',
        fundGroupList: [],
        // 弹窗信息
        loadingShow: false,
        dialogData: {
            reportName: "",
            reportAbstract: "",
            reportDate: '',
            bottomImagePath: "",
            topImagePath: '',
            reportUrl: '',
						displayDate:'',
            groupImagePaths: {},
        },
        type: '',
        // 基金策略
        strategyArr: [
            {
                strategyName: '养老策略',
                typeof: 'forAgedStrategy',
                groupArr: [{
                    fileName: '',
                    groupName: 'htfforAged2030',
                    fileUrl: '',
                    name: '添富养老2030'
                }, {
                    fileName: '',
                    groupName: 'htfforAged2040',
                    fileUrl: '',
                    name: '添富养老2040'
                }, {
                    fileName: '',
                    fileUrl: '',
                    groupName: 'htfforAged2050',

                    name: '添富养老2050'
                }]
            }, {
                strategyName: '稳健策略',
                typeof: 'steadyStrategy',
                groupArr: [{
                    fileName: '',
                    fileUrl: '',
                    groupName: 'steadyNumberOne',

                    name: '稳稳小确幸1号'
                }, {
                    fileName: '',
                    fileUrl: '',
                    name: '稳稳小确幸2号',
                    groupName: 'steadyNumberrTwo',

                }, {
                    fileName: '',
                    groupName: 'steadyStrictSelection',
                    fileUrl: '',
                    name: '稳健严选'

                }]
            }, {
                strategyName: '权益策略',
                typeof: 'equityStrategy',

                groupArr: [{
                    fileName: '',
                    fileUrl: '',
                    groupName: 'voteWithMe',

                    name: '跟我投'
                }, {
                    fileName: '',
                    groupName: 'equityStrictSelection',
                    fileUrl: '',
                    name: '权益严选'
                }]
            },
            {
                strategyName: '活钱策略',
                typeof: 'quickStrategy',
                groupArr: [{
                    name: '理财佳',
                    groupName: 'goodFinancia',
                    fileUrl: '',
                    fileName: '',
                }]
            },


            {
                strategyName: '教育策略',
                typeof: 'educationStrategy',

                groupArr: [{
                    fileName: '',
                    fileUrl: '',
                    groupName: 'htfEducation',

                    name: '添富教育'
                }]
            }


        ],
        groupList: [],
        disableDetail: false,
        reportSerialNo: '',
        search: { reportName: '', reportDate: '' },
        bottomImagePath: "",
        bottomImageNm: "",
        topImagePath: "",
        topImageNm: "",
        // reportUrl: 'http://appuat.99fund.com.cn:7081/activity-center/act-resources/pages/investMonthlyReport/index.html'
        // 20220330 临时处理
        // reportUrl: (~location.origin.indexOf(172.)?'https://activity.99fund.com':'http://appuat.99fund.com.cn:7081') + '/activity-center/act-resources/pages/investMonthlyReport/index.html',
        reportUrl:'', 
    },
    mounted: function () {

        // this.showDialog('', 'add', false);

        var dialogs = ['info', 'add', 'relation', 'del', 'uploadFile'];
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
        // var arr = ['fundGroupsList', 'fundRelations'];

        this.getTableData('mounted');
        this.getFundGroupList()

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
            } else if (this.currentIndex <= this.maxSpace && this.middleData.length - this.currentIndex > this.maxSpace) {
                for (var i = 0; i < this.currentIndex + (2 * this.maxSpace - this.currentIndex); i++) {
                    arr.push(i + 1);
                }
            } else if (this.currentIndex > this.maxSpace && this.middleData.length - this.currentIndex <= this.maxSpace) {
                var space = this.middleData.length - this.currentIndex;
                for (var i = this.currentIndex - (2 * this.maxSpace - space); i < this.middleData.length; i++) {
                    arr.push(i + 1);
                }
            } else {
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
                this.currentIndex = 0;
            }
        },
        condition: {
            handler: function (val, oldval) {
                this.currentIndex = 0;
            }
        }
    },
    methods: {
        forFileInfo(index1, index2, file, fileUrl) {
            this.strategyArr.forEach((item, index) => {
                if (index == index1) {
                    item.groupArr.forEach((it, i) => {
                        if (i == index2) {
                            it.fileName = file.name
                            it.fileUrl = fileUrl

                            console.log('12345', this.dialogData)
                            this.dialogData.groupImagePaths[it.groupId] = it.fileUrl
                        }
                    })
                }
            })
        },

        //文件上传
        uploadsFileImg(e, ...arg) {
            if (this.dialogData.reportDate == '') {
                this.showDialog('add', 'info', true, "请先选择年度/季度！")
                return false
            } else {
                var index1 = arg[0]
                var index2 = arg[1]
                var _arg = arg
                var _this = this;
                if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
                    alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
                    return false
                }
                var file = e.target.files[0];
                console.log("fileName===", file.name);
                if (this.dialogData.reportDate) {
                    this.dialogData.reportDate = this.dialogData.reportDate.replace("-", "")
                }
                var formdata = new FormData(); //创建formdata对象
                formdata.append('file', file);

                if (arg.length == 5) {
                    formdata.append('typeName', this.dialogData.reportDate);
                    formdata.append('groupName', `${arg[3]}.png`);
                } else if (_arg[0] == 'top') {
                    formdata.append('typeName', this.dialogData.reportDate);
                    formdata.append('groupName', 'topImagePath.png');
                } else if (_arg[0] == 'bottom') {
                    formdata.append('typeName', this.dialogData.reportDate);
                    formdata.append('groupName', 'bottomImagePath.png');
                }
            }
            this.loadingShow = true
            $.post({
                url: '/investmentMgmt/investmentInformationDisclosure/monthlyReport/uploadPostPicFile.ajax',
                type: 'post',
                dataType: 'json',
                data: formdata,
                processData: false,
                contentType: false,
                success: function (result) {
                    if (result.error === 0) {
                        const fileUrl = result.data.filePath;

                        if (_arg[0] == 'top') {
                            _this.dialogData.topImagePath = fileUrl
                        } else if (_arg[0] == 'bottom') {
                            _this.dialogData.bottomImagePath = fileUrl
                        } else {
                            _this.forFileInfo(index1, index2, file, fileUrl,)
                        }

                        // this.loadingShow = false
                        _this.showDialog('add', 'info', true, result.msg);
                    } else {
                        // this.loadingShow = false
                        _this.showDialog('add', 'info', true, result.msg);
                    }
                    _this.loadingShow = false
                }
            })
        },
        preview() {
            if (this.dialogData.reportDate) {
                this.dialogData.reportDate = this.dialogData.reportDate.replace("-", "")
                window.open(`${this.reportUrl}?yearMonth=${this.dialogData.reportDate}`)
            } else {
                this.showDialog('add', 'info', true, '请先提交表单数据')
            }

        },

        // 查询表格报告数据
        getTableData: function (currentIndex) {
            var _this = this;
            if (this.search.reportDate) {
                this.search.reportDate = this.search.reportDate.replace("-", "")
            }
            var params = this.search;
            this.currentIndex = 0;
            $.post({
                url: '/investmentMgmt/investmentInformationDisclosure/monthlyReport/getTableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        // _this.currentIndex = 0;
                        _this.tableData = result.data.reports
                    } else {
                        _this.tableData = [];
                        _this.currentIndex = 0;
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        insertStr(soure, start, newStr) {
            let newdate = soure.slice(0, start) + newStr + soure.slice(start)
            return newdate;
        },
        // 弹窗
        showDetail: function (item) {
            this.reportSerialNo = item.serialNo
            this.getDetail(item.serialNo)
            this.getFundGroupList('nofor')
            this.disableDetail = true
            this.showDialog('', 'add', false);
        },
        showUpdate: function (item) {
            this.disableDetail = false
            this.getFundGroupList('nofor')
            this.getDetail(item.serialNo)
            this.showDialog('', 'add')
            this.type = 'update';
        },
        // 弹窗
        showAdd: function () {
            this.type = 'add';
            this.disableDetail = false
            this.dialogData = {
                reportName: "",
                reportAbstract: "",
                reportDate: '',
								displayDate:'',
                bottomImagePath: "",
                topImagePath: '',
                reportUrl: '',
                groupImagePaths: {},
            }
            this.getFundGroupList()
            this.showDialog('', 'add', false);
        },
        getDetail(serialNo) {
            var _this = this
            // _this.groupList=[]
            // _this.strategyArr=[]
            let params = {
                reportSerialNo: serialNo
            }
            var arr = [
                {
                    strategyName: '教育金',
                    typeof: 'educationStrategy'
                }, {
                    strategyName: '养老金',
                    typeof: 'forAgedStrategy'
                },
                {
                    strategyName: '稳健理财',
                    typeof: 'steadyStrategy'
                },
                {
                    strategyName: '长期投资',
                    typeof: 'equityStrategy'
                },
                {
                    strategyName: '活钱管理',
                    typeof: 'quickStrategy'
                }
            ]
            $.post({
                url: '/investmentMgmt/investmentInformationDisclosure/monthlyReport/getDetail.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.dialogData = result.data;
                        _this.reportUrl=result.data.reportUrl;
                        _this.dialogData.reportDate = _this.insertStr(_this.dialogData.reportDate, 4, '-')
                        _this.dialogData.displayDate = moment(_this.dialogData.displayDate).format('YYYY-MM-DD')
                        var groupImagePathsArr = []
                        var groupImagePaths = _this.dialogData.groupImagePaths
                        for (let k in groupImagePaths) {
                            groupImagePathsArr.push({
                                groupId: k,
                                fileUrl: groupImagePaths[k]
                            })
                        }

                        groupImagePathsArr.forEach((key) => {
                            _this.fundGroupList.forEach((it, i) => {
                                if (it.groupId == key.groupId) {
                                    it.fileUrl = key.fileUrl
                                    console.log('=key.fileUrl', i, it)
                                }
                            })
                        })

                        // 创建二维数组
                        // arr.forEach((groupName, index) => {
                        //     _this.groupList.push({
                        //         strategyName: groupName.strategyName,
                        //         typeof: groupName.typeof,
                        //         groupArr: []
                        //     })
                        //     _this.fundGroupList.forEach(item => {
                        //         if (item.fundgroupTypeName === groupName.strategyName) {
                        //             _this.groupList[index].groupArr.push({
                        //                 fileName: '',
                        //                 groupName: '',
                        //                 fileUrl: item.fileUrl,
                        //                 groupId: item.groupId,
                        //                 name: item.groupName
                        //             })
                        //         }
                        //     })
                        // })
                        var obj = {}
                        var newList = []
                        _this.fundGroupList.forEach(item => { if (item.isInvestment == 'Y' && item.fundgroupType >= 13 && item.fundgroupType <= 17) newList.push(item) })
                        newList.forEach((item, index) => {


                            if (!obj[item.fundgroupTypeName]) {
                                obj[item.fundgroupTypeName] = {};
                            }
                            if (!obj[item.fundgroupTypeName][item.groupName]) {
                                obj[item.fundgroupTypeName][item.groupName] = item.groupId;

                            } else {
                                obj[item.fundgroupTypeName][item.groupName] = obj[item.fundgroupTypeName][item.groupName] + '_' + item.groupId;


                            }
                        })
                        arr.forEach((groupName, index) => {
                            _this.groupList.push({
                                strategyName: groupName.strategyName,
                                typeof: groupName.typeof,
                                groupArr: []
                            })
                            for (let key in obj) {
                                if (key === groupName.strategyName) {
                                    for (let kk in obj[key]) {
                                        _this.groupList[index].groupArr.push({
                                            fileName: '',
                                            groupName: '',
                                            fileUrl: '',
                                            groupId: obj[key][kk],
                                            name: kk
                                        })
                                    }
                                }
                            }

                        })
                        newList.forEach((item, index) => {
                            if (item.fileUrl) {
                                _this.groupList.forEach((it2, ii2) => {
                                    it2.groupArr.forEach((it3, ii3) => {
                                        if (it3.groupId == item.groupId || it3.groupId.indexOf(item.groupId) !== -1) {
                                            it3.fileUrl = item.fileUrl
                                        }
                                    })
                                })
                            }
                        })
                        console.log('333333', _this.groupList)
                        _this.$set(_this.groupList)

                    } else {

                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });

        },


        saveParam: function () {
            _this = this;
            if (this.disableDetail) {
                return
            }
            console.log(this.dialogData)
            if (this.dialogData.reportDate) {
                this.dialogData.reportDate = this.dialogData.reportDate.replace("-", "")
            }
						if (this.dialogData.displayDate) {
							this.dialogData.displayDate = this.dialogData.displayDate.replace(/-/g, "")
					  }else{
							return _this.showDialog('add', 'info', true, '请填写展示时间');
						}
            var groupIdArr = []
            var newGroupImagePaths = JSON.parse(JSON.stringify(this.dialogData.groupImagePaths))
            if (newGroupImagePaths) {
                for (var key in newGroupImagePaths) {
                    if (key.indexOf("_") !== -1) {
                        console.log('_____', newGroupImagePaths[key], key.indexOf("_") !== -1)
                        const fileUrl = newGroupImagePaths[key]
                        groupIdArr = key.split('_')
                        groupIdArr.forEach((item, index) => {
                            newGroupImagePaths[item] = fileUrl
                        })

                        delete newGroupImagePaths[key]
                    }
                }
            }

            this.dialogData.groupImagePaths = newGroupImagePaths
            var params = this.dialogData
            params.reportDate = this.dialogData.reportDate
            params.displayDate = this.dialogData.displayDate

            console.log(params)

            let url = ''

            // 判断拼接的第一个参数yearMonth有没有值---当点击修改的时候弹窗
            let code='';
            let reportUrl=this.reportUrl;
            if(reportUrl.indexOf('?')!=-1){
               var str=reportUrl.substr(1);
               strs=str.split('=');
               code=strs[1];
            }
            console.log(code)
            params.reportUrl =code?this.reportUrl:this.reportUrl + `?yearMonth=${params.reportDate}`
            // params.reportUrl = this.reportUrl + `?yearMonth=${params.reportDate}`
            // http://appuat.99fund.com.cn:7081/activity-center/act-resources/pages/investMonthlyReport/index.html?yearMonth=202203
            // https://activity.99fund.com/activity-center/act-resources/pages/investMonthlyReport/index.html?yearMonth=202203

            if (this.type === 'add') {
                url = "/investmentMgmt/investmentInformationDisclosure/monthlyReport/addParam.ajax"
            } else {
                url = "/investmentMgmt/investmentInformationDisclosure/monthlyReport/upData.ajax"

            }
            $.post({
                url,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData();
                        _this.showDialog('add', 'info', false, result.msg);
                    } else {
                        _this.showDialog('add', 'info', true, result.msg);
                    }
                }
            });
        },
        // 删除
        showDelete: function (item) {
            this.deleteId = item.serialNo;
            this.showDialog('', 'del');
        },
        del: function () {
            var _this = this;
            var params = {}
            params.reportSerialNo = this.deleteId;
            params.reportType = 1
            // reportType 报表类型: 1-月报; 2-季报
            // this.showDialog('', 'del');
            $.post({
                url: '/investmentMgmt/investmentInformationDisclosure/monthlyReport/deleteParam.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData();
                        _this.showDialog('del', 'info', false, result.msg);
                    } else {
                        _this.showDialog('del', 'info', false, result.msg);
                    }
                }
            });
        },
        // 获取基金组合列表
        getFundGroupList: function (param) {
            var _this = this;
            _this.strategyArr = []
            _this.groupList = []

            var arr = [
                {
                    strategyName: '教育金',
                    typeof: 'educationStrategy'
                }, {
                    strategyName: '养老金',
                    typeof: 'forAgedStrategy'
                },
                {
                    strategyName: '稳健理财',
                    typeof: 'steadyStrategy'
                },
                {
                    strategyName: '长期投资',
                    typeof: 'equityStrategy'
                },
                {
                    strategyName: '活钱管理',
                    typeof: 'quickStrategy'
                }
            ]

            $.post({
                url: '/investmentMgmt/investmentInformationDisclosure/reportMgmt/fundGroups.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        _this.fundGroupList = result.data
                        if (param !== 'nofor') {
                            var obj = {}
                            var newList = []
                            result.data.forEach(item => { if (item.isInvestment == 'Y' && item.fundgroupType >= 13 && item.fundgroupType <= 17) newList.push(item) })
                            newList.forEach((item, index) => {
                                if (!obj[item.fundgroupTypeName]) {
                                    obj[item.fundgroupTypeName] = {};
                                }
                                if (!obj[item.fundgroupTypeName][item.groupName]) {
                                    obj[item.fundgroupTypeName][item.groupName] = item.groupId;
                                } else {
                                    obj[item.fundgroupTypeName][item.groupName] = obj[item.fundgroupTypeName][item.groupName] + '_' + item.groupId;
                                }
                            })
                            arr.forEach((groupName, index) => {
                                _this.groupList.push({
                                    strategyName: groupName.strategyName,
                                    typeof: groupName.typeof,
                                    groupArr: []
                                })
                                for (let key in obj) {
                                    if (key === groupName.strategyName) {
                                        for (let kk in obj[key]) {
                                            _this.groupList[index].groupArr.push({
                                                fileName: '',
                                                groupName: '',
                                                fileUrl: '',
                                                groupId: obj[key][kk],
                                                name: kk
                                            })
                                        }
                                    }
                                }

                            })
                        }

                        _this.strategyArr = _this.groupList
                    }
                }
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
        transformTime(time, transform) {
            console.log('time', time)

            var date = new Date(Number(time));


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
            if (transform == 'YYYYMM') {
                return year + month

            } else {
                return year + '-' + month + '-' + day + " " + h + ':' + i + ':' + s
            }

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
        }
    },
    components: {
        'date-picker': VueBootstrapDatetimePicker
    },
		filters:{
			displayDateFormat:function(val){
				if(val){
					return moment(val).format('YYYY-MM-DD')
				}else{
					return '--'
				}
			}
		}
});