const tableName = 'uop_log_invest';

module.exports = function (app) {
    // 获取本地数据
    app.post('/investmentMgmt/recordMgmt/operateMgmt/getTableData.ajax', (req, res, next) => {
        try {
            // 获取本地数据库列表
            pool.getConnection(function (error, connection) {
                if (error) {
                    console.log('/investmentMgmt/recordMgmt/operateMgmt/getTableData.ajax 链接本地数据库失败', error.message);
                    return res.send({error: 1, msg: '链接本地数据库失败', data: null});
                }
                let SQL = `SELECT * FROM ${tableName} WHERE delete_flag='F'`;
                if (req.body.operator) {
                    SQL += ` AND operator LIKE '%%${req.body.operator}%%'`;
                }
                if (req.body.operateType) {
                    SQL += ` AND operate_type='${req.body.operateType}'`;
                }
                if (req.body.operateTime) {
                    SQL += ` AND DATE_FORMAT(operate_timestamp,'%Y-%m-%d')='${req.body.operateTime}'`;
                }
                if(String(process.env.NODE_ENV).toLowerCase() == 'production'){
                    SQL += ` AND operator <> 'admin'`;
					// 暂时屏蔽掉 投顾组合维护和业务人员操作管理优化操作人员为：qinlei zhangjunling   zhulinyuan dingjun
					SQL += ` AND operator <> 'qinlei'`;
					SQL += ` AND operator <> 'zhangjunling'`;
					SQL += ` AND operator <> 'zhulinyuan'`;
					SQL += ` AND operator <> 'dingjun'`;
                }
                SQL += ' ORDER BY operate_timestamp DESC';
                SQL += ` LIMIT ${(req.body.pageNo - 1) * req.body.pageSize},${req.body.pageSize}`;
                console.log('/investmentMgmt/recordMgmt/operateMgmt/getTableData.ajax run SQL:', SQL);
                let getTableData = new Promise((resolve, reject) => {
                    connection.query(SQL, function (error, results) {
                        console.log('/investmentMgmt/recordMgmt/operateMgmt/getTableData.ajax run SQL error', error);
                        console.log('/investmentMgmt/recordMgmt/operateMgmt/getTableData.ajax run SQL results:', Array.from(results).filter(item => (item.operate_type != 0 && item.operate_type != 4)));
                        if (error) {
                            reject({error: '运行SQL语句失败'});
                        }
                        resolve(Array.from(results));
                    });
                });
                let SQL2 = `SELECT COUNT(id) FROM ${tableName} WHERE delete_flag='F'`;
                if (req.body.operator) {
                    SQL2 += ` AND operator LIKE '%%${req.body.operator}%%'`;
                }
                if (req.body.operateType) {
                    SQL2 += ` AND operate_type='${req.body.operateType}'`;
                }
                if (req.body.operateTime) {
                    SQL2 += ` AND DATE_FORMAT(operate_timestamp,'%Y-%m-%d')='${req.body.operateTime}'`;
                }
                if(String(process.env.NODE_ENV).toLowerCase() == 'production'){
                    SQL2 += ` AND operator <> 'admin'`;
					// 暂时屏蔽掉 投顾组合维护和业务人员操作管理优化操作人员为：qinlei zhangjunling   zhulinyuan dingjun
					SQL2 += ` AND operator <> 'qinlei'`;
					SQL2 += ` AND operator <> 'zhangjunling'`;
					SQL2 += ` AND operator <> 'zhulinyuan'`;
					SQL2 += ` AND operator <> 'dingjun'`;
                }
                let getTotalCount = new Promise((resolve, reject) => {
                    connection.query(SQL2, function (error, results) {
                        console.log('/investmentMgmt/recordMgmt/operateMgmt/getTableData.ajax run SQL error', error);
                        console.log('/investmentMgmt/recordMgmt/operateMgmt/getTableData.ajax run SQL results:', results);
                        if (error) {
                            reject({error: '运行SQL语句失败'});
                        }
                        resolve(results);
                    });
                });
                Promise.all([getTableData, getTotalCount]).then(([arr, total]) => {
                    connection.release();
                    let formatTime = function (str) {
                        let d = new Date(str);
                        let fix = n => n < 10 ? '0' + n : n;
                        return [d.getFullYear(), d.getMonth() + 1, d.getDate()].map(fix).join('-') + ' ' + [d.getHours(), d.getMinutes(), d.getSeconds()].map(fix).join(':');
                    };
                    arr.forEach(item => {
                        let requestBody = JSON.parse(item.request_body);
                        // 登录时密码特殊处理
                        if (item.operate_type == 0) {
                            if (requestBody['auth']) {
                                requestBody['auth'].password && (requestBody['auth'].password = '******');
                                requestBody['auth'].pass && (requestBody['auth'].pass = '******');
                            }
                            if (requestBody['form']) {
                                requestBody['form'].password && (requestBody['form'].password = '******');
                            }
                        }
                        // 更改密码特殊处理
                        else if (item.request_body == 4) {
                            if (requestBody['qs']) {
                                requestBody['qs'].oldPassword && (requestBody['qs'].oldPassword = '******');
                                requestBody['qs'].newPassword && (requestBody['qs'].newPassword = '******');
                            }
                        }
                        item.request_body = JSON.stringify(requestBody);
                        item.operateType_show = item.operate_type;
                        item.operateTime = formatTime(item.operate_timestamp);
                        if (item.operate_type == 0) {
                            item.operateType_show = '登录系统';
                        }
                        else if (item.operate_type == 1) {
                            item.operateType_show = '新增操作';
                        }
                        else if (item.operate_type == 2) {
                            item.operateType_show = '修改操作';
                        }
                        else if (item.operate_type == 3) {
                            item.operateType_show = '删除操作';
                        }
                        else if (item.operate_type == 4) {
                            item.operateType_show = '修改密码';
                        }
                    });
                    let totalCount = Object.values(total[0])[0];
                    let pageNum = arr.length > 0 ? Number(req.body.pageNo) : 1;
                    let pages = Math.ceil(totalCount / req.body.pageSize);
                    let pageDetail = {
                        rows: arr,
                        pageNum,
                        pages
                    };
                    res.send({error: 0, msg: '请求成功', data: pageDetail});
                }).catch(error => {
                    connection.release();
                    res.send({error: 1, msg: error.message, data: null});
                });
            });
        } catch (error) {
            console.log('pool error=', error)
        }
    });
};



