Vue.component('falsePage', {
    template: '#falsePage',
    data: function () {
        return {
            tableData: [],
            //主表格分页数据
            currentIndex: 0,
            maxSpace: 5,
            pageMaxNum: '10',
            condition: '',

            container: 'feedback',
            startDate: '',
            endDate: '',
            surveySceneCode: ''
        }
    },
    computed: {
        //加分页数据
        middleData: function () {
            var middleData = [];
            var filterData = [];
            var pageMaxNum = parseInt(this.pageMaxNum);
            this.tableData.forEach(function (jsonObj) {
                var valueArr = [];
                for (var prop in jsonObj) {
                    valueArr.push(jsonObj[prop]);
                }
                for (var i = 0, len = valueArr.length; i < len; i++) {
                    if (valueArr[i]) {
                        if (valueArr[i].toString().indexOf(this.condition) != -1) {
                            filterData.push(jsonObj);
                            break;
                        }
                    }
                }
            }, this);
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
        },
    },
    watch: {
        pageMaxNum: function (val, oldval) {
            this.currentIndex = 0;
        }
    },
    methods: {
        moment: moment,
        getTableData: function (currentIndex) {
            var url = '/publicConfig/questionnaire/feedback/answerList.ajax';
            var params = {
                surveySceneCode: this.surveySceneCode
            }
            this.startDate && (params.startDate = this.startDate);
            this.endDate && (params.endDate = this.endDate);
            $.post({
                url: url,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        // this.currentIndex = 0;
                        this.currentIndex = 0;
                        this.tableData = result.data.list;
                        this.$parent.showDialog('', 'falsePageComponent')
                    } else {
                        this.tableData = [];
                        this.currentIndex = 0;
                        this.$parent.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
        exportAnswerList: function () {
            var url = '/publicConfig/questionnaire/feedback/exportAnswerList.ajax?surveySceneCode=' + this.surveySceneCode;
            this.startDate && (url += ('&startDate=' + this.startDate));
            this.endDate && (url += ('&endDate=' + this.endDate));
            window.open(url);
        },
        exportImage: function (image) {
            var url = '/publicConfig/questionnaire/feedback/image.ajax?&container=' + this.container;
            image.forEach(function (item) {
                window.open(url + '&objectName=' + item)
            })
        },
        downloadImg: function (image) {
            var url = '/publicConfig/questionnaire/feedback/image.ajax?&container=' + this.container;
            image.forEach(function (item) {
                var a = document.createElement('a'); // 创建一个a节点插入的document
                var event = new MouseEvent('click') // 模拟鼠标click点击事件
                a.download = item; // 设置a节点的download属性值
                a.href = url + '&objectName=' + item;
                a.dispatchEvent(event) // 触发鼠标点击事件
            })
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
    }
})
new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        tableData: [],
        diaMsg: '',
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        pageMaxNum: 10,
        condition: '',


        issueFlag: '',
        keyWord: '',
        endDate: '',
        startDate: '',


        operateData: {
            questionVoList: [],
            // creator: "string",
            surveySceneCode: "",
            submitBtnDesc: "",
            surveyDesc: "",
            surveyTitle: ""
        },
        batchStr: '',
        optionList: [],
        issueOrStopData: {
            issueFlag: '',
            surveyId: ''
        }
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
        },
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
        var dialogs = ['dataStatus', 'info', 'batch'];
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
        this.getTableData()

    },
    methods: {
        showAnswer: function (surveySceneCode) {
            this.$refs.falsePage.startDate = this.moment().subtract(3, "months").format("YYYY/MM/DD HH:mm:ss");
            this.$refs.falsePage.endDate = this.moment().format("YYYY/MM/DD HH:mm:ss");
            // this.$refs.falsePage.startDate = '2021/02/26 00:00:00';
            // this.$refs.falsePage.endDate = '2021/02/27 00:00:00';
            this.$refs.falsePage.surveySceneCode = surveySceneCode;
            this.$refs.falsePage.getTableData(0)
        },
        changeStatus: function () {
            var url = '';
            if (this.issueOrStopData.issueFlag == 1 || this.issueOrStopData.issueFlag == 2) {
                url = '/publicConfig/questionnaire/feedback/issue.ajax';
            } else if (this.issueOrStopData.issueFlag == 0) {
                url = '/publicConfig/questionnaire/feedback/stop.ajax';
            }
            $.post({
                url: url,
                data: {
                    surveyId: this.issueOrStopData.surveyId
                },
                success: function (result) {
                    if (result.error === 0) {
                        this.showDialog('dataStatus', 'info', false, result.msg);
                        this.getTableData()
                    } else {
                        this.showDialog('dataStatus', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },
        showStatus: function (surveyId, issueFlag) {
            this.issueOrStopData.surveyId = surveyId;
            this.issueOrStopData.issueFlag = issueFlag;
            this.showDialog('', 'dataStatus')
        },
        showUpdate: function (surveyId, issueFlag) {
            $.post({
                url: '/publicConfig/questionnaire/feedback/singleSurvey.ajax',
                data: {
                    surveyId: surveyId
                },
                success: function (result) {
                    if (result.error === 0) {
                        if (result.data) {
                            this.operateData = {
                                questionVoList: result.data.questionVoList ? result.data.questionVoList : [],
                                // creator: "string",
                                surveyId: result.data.surveyId,
                                surveySceneCode: result.data.surveySceneCode,
                                submitBtnDesc: result.data.submitBtnDesc,
                                surveyDesc: result.data.surveyDesc,
                                surveyTitle: result.data.surveyTitle
                            }
                            this.showDialog('', issueFlag == 2 ? 'operate' : 'showOperate');
                        } else {
                            this.operateData = {
                                questionVoList: [],
                                surveySceneCode: "",
                                submitBtnDesc: "",
                                surveyDesc: "",
                                surveyTitle: ""
                            }
                            this.showDialog('', 'info', false, '数据为空，请先发布');
                        }
                    } else {
                        this.showDialog('', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },
        // showOperate:function (param) {  

        // },
        add: function () {
            var url = '';
            if (this.operateData.surveyId) {
                url = '/publicConfig/questionnaire/feedback/modify.ajax';
            } else {
                url = '/publicConfig/questionnaire/feedback/add.ajax';
            }
            var params = this.operateData;
            var reg = /[\d]{6,6}$/g;
            if (!reg.test(params.surveySceneCode)) {
                this.showDialog('operate', 'info', true, '使用场景格式：SV后面需要加上6位数字');
                return;
            }
            $.post({
                url: url,
                data: JSON.stringify(params),
                contentType: 'application/json',
                success: function (result) {
                    if (result.error === 0) {
                        this.getTableData()
                        this.showDialog('operate', 'info', false, result.msg);
                    } else {
                        this.showDialog('operate', 'info', true, result.msg);
                    }
                }.bind(this)
            });
        },
        addOptionsDialog: function (item) {
            this.batchStr = ''
            if (item.list) {
                this.optionList = item.list;
            } else {
                this.optionList = item.list = [];
            }
            this.showDialog("operate", "batch", true)
        },
        addOptions: function () {
            var options = this.batchStr.split(/[\n]/g);
            console.log('options', options)
            options.forEach(function (param) {
                this.optionList.push({
                    optionName: param
                })
            }, this)
        },
        addQuestion: function (type) {
            if (type == 1) {
                this.operateData.questionVoList.push({
                    list: [],
                    questionName: "单选",
                    questionType: type,
                    required: false,
                })
            } else if (type == 2) {
                this.operateData.questionVoList.push({
                    list: [],
                    questionName: "多选",
                    questionType: type,
                    required: false,
                    selectLowerLimit: 0,
                    selectUpperLimit: 0
                })
            } else if (type == 3) {
                this.operateData.questionVoList.push({
                    // list: [],
                    questionName: "填空",
                    questionType: type,
                    required: false,
                    selectLowerLimit: 0,
                    selectUpperLimit: 0
                })
            } else if (type == 4) {
                this.operateData.questionVoList.push({
                    questionName: "意见反馈",
                    questionType: type,
                    required: false,
                    selectLowerLimit: 0,
                    selectUpperLimit: 0
                })
            }
        },
        move: function (index, target) {
            if (target < 0) {
                this.showDialog('operate', 'info', true, '无法移动');
            } else if (target >= this.operateData.questionVoList.length) {
                this.showDialog('operate', 'info', true, '无法移动');
            }
            var targetValue = this.operateData.questionVoList[target];
            var currentValue = this.operateData.questionVoList[index];
            this.$set(this.operateData.questionVoList, index, targetValue)
            this.$set(this.operateData.questionVoList, target, currentValue)
        },
        showOperateDialog: function () {
            this.operateData = {
                questionVoList: [],
                surveySceneCode: "",
                submitBtnDesc: "",
                surveyDesc: "",
                surveyTitle: ""
            }
            this.showDialog('', 'operate')
        },
        moment: moment,
        getTableData: function () {
            var url = '/publicConfig/questionnaire/feedback/tableData.ajax';
            var params = {}
            this.issueFlag && (params.issueFlag = this.issueFlag)
            this.keyWord && (params.keyWord = this.keyWord)
            this.startDate && (params.startDate = this.startDate)
            this.endDate && (params.endDate = this.endDate)
            $.post({
                url: url,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.currentIndex = 0;
                        this.tableData = result.data;
                    } else {
                        this.showDialog('', 'info', false, result.msg);
                    }
                }.bind(this)
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
        'date-picker': VueBootstrapDatetimePicker
    },
    filters: {
        issueFlagText(value) {
            if (value == 1) {
                return '未发布';
            } else if (value == 0) {
                return '已发布';
            } else if (value == 2) {
                return '草稿';
            }
            return value;
        }
    }
});