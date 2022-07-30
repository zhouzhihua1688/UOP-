// pool引入SQL，sqlTableName表名，menuId权限，urlList有权限人物列表接口，urlDetail人物详细信息接口，request引入不走网关的request，ruleKey发送短息的规则，emailContent邮件内容，emailSubject邮件主题，定时任务的hour, minute, second时分秒
function scheduleMethod(init) {
    var emailForm='';
    if (global.envConfig.emailForm) {
        emailForm = global.envConfig.emailForm;
    } else {
        emailForm = 'zpmailtest01@htffund.com';
    }
    if(global.envConfig.notApplySchedule && process.env.NODE_ENV && global.envConfig.notApplySchedule.toString().toLowerCase()==process.env.NODE_ENV.toString().toLowerCase()) {
        return false;
    }
    var endingSetInterval = null; //是否结束5分钟循环调用false为否
    var endClockTime = null;//设置自动停止时间
    var verifyTime = null;//获取当前时间格式为yyyymmdd（20201010）
    var time = new Date();
    time.setHours(init.hour);
    time.setMinutes(init.minute);
    time.setSeconds(init.second);
    var timeDiff = null;
    if (time.getTime() - new Date().getTime() > 0) {
        timeDiff = time.getTime() - new Date().getTime()
    } else {
        timeDiff = time.getTime() + 24 * 60 * 60 * 1000 - new Date().getTime();
    }
    console.log('定时任务将在' + HHMMSS(timeDiff) + '后执行');
    setTimeout(function () {
        settingInitOption();
        setInterval(function () {
            settingInitOption();
        }, 24 * 60 * 60 * 1000)
    }, timeDiff);
    function settingInitOption() {
        endingSetInterval = false;
        endClockTime = new Date();//设置自动停止时间
        endClockTime.setHours(22);
        endClockTime.setMinutes(30);
        endClockTime.setSeconds(0);
        verifyTime = formatTime();
        verifyTimeForWorkDay();
    }
    async function opeart() {
        // 获取本地数据库列表
        let getTableData = new Promise((resolve, reject) => {
            init.pool.getConnection(function (error, connection) {
                if (error) {
                    console.log('getLocalList.ajax 链接本地数据库失败', error.message);
                    reject({error: '链接本地数据库失败'});
                }
                let SQL = `SELECT * FROM ${init.sqlTableName} WHERE delete_flag='F' AND status='2'`;
                console.log('getLocalList.ajax run SQL: ', SQL);
                connection.query(SQL, function (error, results) {
                    console.log('getLocalList.ajax run SQL error', error);
                    // console.log('getLocalList.ajax run SQL results:', results);
                    connection.release();
                    if (error) {
                        reject({error: '运行SQL语句失败'});
                    }
                    resolve(Array.from(results));
                });
            });
        });
        try {
            let tableData = await getTableData;
            let getNaturalDateForWorkDate = new Promise(((resolve, reject) => {
                let option = {
                    url: init.urlNatural,
                    qs: {naturalDate: verifyTime},
                    timeout: 15000,
                    json: true
                };
                option.headers = {'X-Invoker': 'UOP'};
                // console.log('---getWorkDate---',option);
                init.request(option, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    let result = body;
                    if (result && result.returnCode === 0) {
                        resolve(result.body);
                    }
                    else if (result && result.returnCode != 9999) {
                        reject(result.returnMsg);
                    }
                    else {
                        reject('workDate日期获取失败');
                    }
                });
            }));
            // let tableData = [];
            if (tableData && Array.isArray(tableData) && tableData.length > 0) {
                endingSetInterval = false;
                console.log('还有' + tableData.length + '条数据未复核');
                console.log('正在查询复核人');
                try {
                    let workDate = await getNaturalDateForWorkDate;
                    let params = {};
                    params.dayEndFlag = "F";
                    params.workDate = workDate;
                    params.sysName = 'UOP';
                    params.remark = '业务管理-业务参数配置_运营-折扣复核中，还有'+tableData.length+'条数据未复核';
                    let option = {
                        url: init.urlCloseCheck,
                        body: params,
                        timeout: 15000,
                        json: true
                    };
                    option.headers = {'X-Invoker': 'UOP'};
                    console.log('option:', option);
                    init.request.post(option, (error, response, body) => {
                        if (error) {
                            console.log(error);
                        }
                        let result = typeof body === 'string' ? JSON.parse(body) : body;
                        if (result && result.returnCode === 0) {
                            console.log('收市日终检查更新状态成功--未收市备注');
                        }
                        else if (result && result.returnCode != 9999) {
                            console.log(result.returnMsg)
                        }
                        else {
                            console.log('收市日终检查更新状态失败--未收市备注');
                        }
                    });
                } catch (error) {
                    console.log('workDate日期获取失败', error);
                }
            } else {
                console.log('暂无待审核数据');
                endingSetInterval = true;
               
                try {
                    let workDate = await getNaturalDateForWorkDate;
                    let params = {};
                    params.dayEndFlag = "Y";
                    params.workDate = workDate;
                    params.sysName = 'UOP';
                    params.remark = '';
                    let option = {
                        url: init.urlCloseCheck,
                        body: params,
                        timeout: 15000,
                        json: true
                    };
                    option.headers = {'X-Invoker': 'UOP'};
                    console.log('option:', option);
                    init.request.post(option, (error, response, body) => {
                        if (error) {
                            console.log(error);
                        }
                        let result = typeof body === 'string' ? JSON.parse(body) : body;
                        if (result && result.returnCode === 0) {
                            console.log('收市日终检查更新状态成功');
                        }
                        else if (result && result.returnCode != 9999) {
                            console.log(result.returnMsg)
                        }
                        else {
                            console.log('收市日终检查更新状态失败');
                        }
                    });
                } catch (error) {
                    console.log('workDate日期获取失败', error);
                }
                return;
            }
        } catch (error) {
            console.log('本地数据查询catchError', error);
        }
        //获取人物list
        let getUserInfo = new Promise((resolve, reject) => {
            let option = {
                url: init.urlList,
                timeout: 15000,
                json: true
            };
            option.headers = {'X-Invoker': 'UOP'};
            // console.log('---userinfo---',option);
            init.request(option, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                let result = typeof body == 'string' ? JSON.parse(body) : body;
                if (result && result.returnCode === 0 && Array.isArray(result.body)) {
                    let distributedUser = [];
                    result.body.forEach((item) => {
                        if (item.roleList.length > 0) {
                            distributedUser.push(item);
                        }
                    });
                    // console.log('distributedUser', distributedUser);
                    let data = distributedUser.filter((item, index) => {
                        return item.roleList.some(inItem => {
                            return inItem.menuList.includes(init.menuId)
                        })
                    });
                    resolve(data);
                }
                else if (result && result.returnCode != 9999) {
                    reject(result.returnMsg);
                }
                else {
                    reject('获取用户数据失败');
                }
            });
        });
        try {
            var userData = await getUserInfo;
        } catch (error) {
            console.log('获取人物列表catchError：', error);
        }
        //获取用户邮箱电话
        function userDetail(item, urlDetail) {
            console.log('userinfo--',item,'userinfo--');
            return new Promise((resolve, reject) => {
                let params = {userId: item};
                let option = {
                    url: urlDetail,
                    qs: params,
                    timeout: 15000,
                    json: true
                };
                option.headers = {'X-Invoker': 'UOP'};
                console.log('urlDetail--',option,'urlDetail--');
                init.request(option, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    // console.log('email',body);
                    let result = typeof body === 'string' ? JSON.parse(body) : body;
                    if (result && result.returnCode == 0) {
                        resolve(result.body);
                        console.log('人员详情结果', result);
                    }
                    else if (result.returnCode == 9999) {
                        resolve('失败信息', result.msg);
                    }
                    else {
                        resolve('其他失败信息')
                    }
                })
            })
        }
        // console.log('userData', userData, 'end');
        try {
            var userList = await Promise.all(userData.map((item) => userDetail(item.userId, init.urlDetail)));
        } catch (error) {
            console.log('查询详情错误', error);
        }
        console.log('userList', userList, 'listend');
        //发送邮件
        var emailArray = [];
        var TelArray = [];
        if (userList && Array.isArray(userList)) {
            userList.forEach(function (item) {
                if (item.email) {
                    emailArray.push(item.email)
                }
                if (item.phone) {
                    TelArray.push(item);
                }
            });
        }
        console.log('emailArray', emailArray);
        let sendEmail = new Promise((resolve, reject) => {
            let params = {};
            params.content = init.emailContent;
            params.from = emailForm;
            params.subject = init.emailSubject;
            params.to = emailArray;
            // params.to = ['497717947@qq.com'];
            let option = {
                url: init.urlEmail,
                body: params,
                timeout: 15000,
                json: true
            };
            option.headers = {'X-Invoker': 'UOP'};
            console.log('optionEmail:', option);
            // return;
            init.request.post(option, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                console.log('email-responseStatusCode', response.statusCode);
                console.log('email-responseBody', response.body);
                let result = typeof body === 'string' ? JSON.parse(body) : body;
                if (result && result.code == 0) {
                    resolve('邮件发送成功');
                    console.log('邮件发送成功');
                }
                else if (result.code == 999) {
                    reject(result.msg);
                    console.log('邮件发送失败 999', result.msg);
                }
                else {
                    reject('邮件发送失败,其他原因')
                }
            });
        });
        try {
            let sendEmailStatus = await sendEmail;
            console.log(sendEmailStatus);
        } catch (error) {
            console.log('发邮件catchError：', error);
        }
        // TelArray=[{userName:'dong',phone:17621837917}];
        if (TelArray.length > 0) {
            TelArray.forEach(function (item) {
                sendMsg(item.phone, item.userName)
            })
        }else{
            console.log("无手机号码记录");
        }

        function sendMsg(tel, custNm) {
            let params = {};
            let params1 = {};
            params.ruleKey = init.ruleKey;
            params.ruleSource = 'AOS';
            params.ruleUser = 'uop';
            params1 = {
                'msgParams': `{custNm:"${custNm}"}`,
                'phone': tel
            };
            let option = {
                url: init.urlSms,
                qs: params,
                body: params1,
                timeout: 15000,
                json: true
            };
            option.headers = {'X-Invoker': 'UOP'};
            console.log('option:', option);
            init.request.post(option, (error, response, body) => {
                if (error) {
                    console.log(error);
                }
                let result = typeof body === 'string' ? JSON.parse(body) : body;
                if (result && result.returnCode === 0) {
                    console.log('短息发送成功');
                }
                else if (result && result.returnCode != 9999) {
                    console.log('短息发送失败', result.returnMsg)
                }
                else {
                    console.log('短息发送失败');
                }
            });
        }
    }

    function isWorkDay() {
        return new Promise((resolve, reject) => {
            let option = {
                url: init.urlIsWorkDay,
                qs: {date: verifyTime},
                timeout: 15000,
                json: true
            };
            option.headers = {'X-Invoker': 'UOP'};
            console.log('---isWorkDay---', option);
            init.request(option, (error, response, body) => {
                console.log('---isWorkDay-response---', response && response.statusCode);
                if (error) {
                    reject(error);
                }
                let result = body;
                if (result && result.returnCode === 0) {
                    resolve(result.body);
                }
                else if (result && result.returnCode != 9999) {
                    reject(result.returnMsg);
                }
                else {
                    reject('校验日期失败');
                }
            });
        });
    }
    async function verifyTimeForWorkDay() {
        var isWorkDayVerify = null;//校验是否为工作日
        try {
            isWorkDayVerify = await isWorkDay();
        } catch (error) {
            console.log('校验工作日接口出错，5分钟后重试', error);
            // 20220221 5分钟后重试
            setTimeout(async ()=>{
                try {
                    isWorkDayVerify = await isWorkDay();
                    // 如果isWorkDay还是返回reject，代码执行会被中断，不再执行
                    verifyTimeFc();
                } catch (err) {
                    console.log('校验工作日接口出错，不再重试', err);
                }
            }, 5 * 60 * 1000)
        }
        // console.log('isworkday', isWorkDayVerify);
        //校验是否为工作日
        verifyTimeFc();
        function verifyTimeFc() {
            if (isWorkDayVerify === null) {

                return;
            } else {
                if (!isWorkDayVerify) {
                    console.log('非工作日已停止继续工作');
                    return;
                }
            }
            loopTime();
        }
        function loopTime() {
            opeart();
            var loopFunc = setInterval(function () {
                if (endingSetInterval || new Date().getTime() >= endClockTime) {
                    console.log('清除定时器');
                    clearInterval(loopFunc);
                    endingSetInterval = false;
                }
                else {
                    opeart();
                }
            }, 1000 * 60 * 10)
        }
    }
    function formatTime() {
        var date = new Date();
        var Y = date.getFullYear() + '';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '';
        var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
        return Y + M + D;
    }
    function HHMMSS(data) {
        var s;
        var hours = parseInt((data % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = parseInt((data % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = (data % (1000 * 60)) / 1000;
        s = hours + '小时' + minutes + '分' + seconds + '秒';
        return s;
    };
}

module.exports = scheduleMethod;