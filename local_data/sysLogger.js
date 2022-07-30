const tableName = 'uop_log';// operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码

module.exports = function (operateType, req, option, res, paramsTableName) {
    let session = req.session;
    try {
        pool.getConnection((error, connection) => {
            if (error) {
                throw error;
            }
            try {
                let operator = session.loginInfo.userid;
                let menuId = '';
                let operateDesc = '';
                if (operateType == 0) {
                    operateDesc = '登录系统';
                }
                else if (operateType == 4) {
                    operateDesc = '修改密码';
                }
                else {
                    let channelStr = getMenuInfo(session.loginInfo.urls, req.originalUrl.match(/(^\/\w+)/g)[0]).name;
                    let menuStr = getMenuInfo(session.loginInfo.urls, req.originalUrl.match(/(^\/\w+)(\/\w+)/g)[0]).name;
                    let pageStr = getMenuInfo(session.loginInfo.urls, req.originalUrl.replace(/(^\/\w+)(\/\w+)(\/\w+)(\/\w+.ajax$)/, '$1$2$3.html')).name;
                    operateDesc = `${channelStr} > ${menuStr} > ${pageStr} 执行操作：${translateOperateType(operateType)}`;
                    menuId = getMenuInfo(session.loginInfo.urls, req.originalUrl.replace(/(^\/\w+)(\/\w+)(\/\w+)(\/\w+.ajax$)/, '$1$2$3.html')).id;
                }

                // console.log('------test------ x-forwarded-for=', req.headers['x-forwarded-for'])
                // console.log('------test------ x-real-ip=', req.headers['x-real-ip'])
                // console.log('------test------ remote_addr=', req.headers['remote_addr'])
                // console.log('------test------ req.headers=', req.headers)
                // console.log('------test------ req.ip=', req.ip)
                // console.log('------test------ req.ips=', req.ips)

                let ip = req.headers['x-forwarded-for'] || req.headers['remote_addr'] || req.headers['x-real-ip'] || req.ip;
                let optionBody = {};
                let besideKeyArr = ['req', 'session'];
                for (let key in option) {
                    !besideKeyArr.includes(key) && (optionBody[key] = option[key]);
                }
                let option_json = JSON.stringify(optionBody).replace(/\\/g, '/');
                option_json = option_json.replace(/\/"/g, '\\\\"');
                let res_json = typeof res === 'string' ? res : JSON.stringify(res);
                let SQL = `INSERT INTO ${paramsTableName?paramsTableName:tableName} (operator,menu_id,operate_type,operate_desc,ip,request_body,response_body) VALUES ('${operator}','${menuId}','${operateType}','${operateDesc}','${ip}','${option_json}','${res_json}')`;
                connection.query(SQL, (error, results) => {
                    connection.release();
                    if (error) {
												console.log('------------------------------ uop系统日志记录失败，错误日志:', error)
                        // throw error;
                    }
                });
            } catch (error) {
                connection.release();
                console.log('------------------------------ uop系统日志记录失败，错误日志:', error)
            }
        });

        function getMenuInfo(menuList, menuUrl) {
            let menuInfo = null;
            let searchNode = function (menuList, menuUrl) {
                menuList.forEach(item => {
                    if (item.url === menuUrl) {
                        menuInfo = item;
                        return;
                    }
                    if (Array.isArray(item.child)) {
                        searchNode(item.child, menuUrl);
                    }
                });
            };
            searchNode(menuList, menuUrl);
            return menuInfo;
        }

        function translateOperateType(operateType) {
            if (operateType == 0) {
                return '登录系统';
            }
            else if (operateType == 1) {
                return '新增操作';
            }
            else if (operateType == 2) {
                return '修改操作';
            }
            else if (operateType == 3) {
                return '删除操作';
            }
            else if (operateType == 4) {
                return '修改密码';
            }
        }
    } catch (error) {
        console.log('------------------------------ uop系统日志记录失败，错误日志:', error)
    }
};
