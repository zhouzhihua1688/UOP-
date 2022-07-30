const request = require('request');
const extend = require('extend');
const userMgmt_apiConfig = require('../routes/userMgmt/apiConfig');
// const userMgmt_apiConfig = {
//     Authorization: 'Basic dW9wOjEyMzQ1Ng==',
//     user:{
//         login: 'http://10.50.115.125:8089/inner-uaa/v1/oauth/token'
//     }
// };
const authorization = userMgmt_apiConfig.Authorization;
const login_url = userMgmt_apiConfig.user.login;

// const authorization = global.envConfig.inner_uaa.Authorization;
// const authorization = 'Basic dW9wOjEyMzQ1Ng==';


function requestWrapper(uri, option, callback) {
    // if (typeof uri === 'undefined') {
    //   throw new Error('undefined is not a valid uri or option object.')
    // }

    // var params = requset.initParams(uri, option, callback)

    // if (params.method === 'HEAD' && paramsHaveRequestBody(params)) {
    //   throw new Error('HTTP HEAD requests MUST NOT include a request body.')
    // }

    // return new request.Request(params)

    let params = request.initParams(uri, option, callback);

    callback = params.callback;
    option = params;

    if (option && option.hasOwnProperty('req') && !option.hasOwnProperty('session')) { // option直接传req的情况
        option.session = option['req'].session;
    }

    if (option && !option.session) {
        return !!callback && callback(new Error('------requestWrapper------error, session must be set in option to use access_token and refresh_token!!!'));
    }

    !option.headers && (option.headers = {});
    // extend(option.headers, { Authorization: authorization })
    extend(option.headers, {Authorization: option.session['access_token'], 'X-Invoker': 'UOP'});

    // 20220310 添富赢家，外部网关接口鉴权添加 S
    if(~option.url.indexOf(global.envConfig.advertising) || ~option.url.indexOf(global.envConfig.advertisingUploadFile || option.advertisingUrlFlag)) {
        option.headers.Authorization = global.envConfig.advertisingAuthorization;
        option.session = undefined;
    }
    // 20220310 添富赢家，外部网关接口鉴权添加 E


    option.pageUrl && console.log(`${option.pageUrl} option:`, option.req ? {...option, req: '#'} : option);

    return request(option, (error, response, body) => {
        option.pageUrl && console.log(`${option.pageUrl} error:`, error);
        option.pageUrl && console.log(`${option.pageUrl} statusCode:`, response && response.statusCode);
        option.pageUrl && console.log(`${option.pageUrl} body:`, (String(body).length>5000? String(body).slice(0, 5000) : body));
        if (option.hasOwnProperty('req') && option.hasOwnProperty('operateType')) {
            sysLogger(option.operateType, option.req, option, body);
        }
        if (error) {
            return !!callback && callback(error, response, body);
        }
        try {
            let result = typeof body == 'string' ? JSON.parse(body) : body;

            if (response.statusCode == 200/*  && result.returnCode == 0 */) {
                return !!callback && callback(error, response, body);
            }

            // 20220310 添富赢家，外部网关接口鉴权添加 S
            if(~option.url.indexOf(global.envConfig.advertising) || ~option.url.indexOf(global.envConfig.advertisingUploadFile)) {
                return !!callback && callback(new Error('------requestWrapper------error, 添富赢家，外部网关接口返回错误code=' + response.statusCode));
            }
            // 20220310 添富赢家，外部网关接口鉴权添加 E


            if (response.statusCode == 400) {
                return !!callback && callback(new Error('------requestWrapper------unknown error, check requst header'));
            }

            if (response.statusCode == 403) {
                return !!callback && callback(new Error('------requestWrapper------403, UAA未配置对应url，未关联到角色'));
            }

            if (response.statusCode == 404) {
                if (result && result.returnCode == 1001) {
                    return !!callback && callback(new Error('------requestWrapper------404, returnCode=1001，UAA未配置对应url，未导入'));
                }
                return !!callback && callback(new Error('------requestWrapper------404, Not Found'));
            }

            if (response.statusCode > 401) {
                return !!callback && callback(error, response, body);
            }

            if (response.statusCode == 401 && result && result.returnCode == 1000) {
                console.log('------requestWrapper------access_token expired, need to get refresh_token');

                let option_refresh = {
                    auth: {
                        username: 'uop',
                        password: '123456'
                    },
                    url: login_url,
                    formData: {
                        grant_type: 'refresh_token',
                        scope: 'all',
                        refresh_token: option.session['refresh_token'].slice(7)
                    },
                    timeout: 15000
                };

                console.log('get refresh_token option:', option_refresh);
                request.post(option_refresh, (error, response, body) => {
                    console.log('get refresh_token error:', error);
                    console.log('get refresh_token statusCode:', response && response.statusCode);
                    // console.log('requestWrapper 2 body:', body);
                    if (error) {
                        return !!callback && callback(error, response, body);
                    }
                    try {
                        let result = typeof body == 'string' ? JSON.parse(body) : body;
                        delete result.loginUserDto;
                        console.log('get refresh_token result:', result);

                        if (response.statusCode == 400) {
                            console.log('------requestWrapper------refresh_token expired, please relogin!!!');
                            return !!callback && callback(new Error('会话过期，请重新登录'));
                        }

                        if (response.statusCode == 200 && result.returnCode == 0) {
                            console.log('------requestWrapper------got new access_token=', result['access_token']);
                            console.log('------requestWrapper------got new refresh_token=', result['refresh_token']);
                            option.session['access_token'] = 'bearer ' + result['access_token'];
                            option.session['refresh_token'] = 'bearer ' + result['refresh_token'];
                            option.headers['Authorization'] = 'bearer ' + result['access_token'];
                            console.log('------requestWrapper------ new option=', option);
                            return request(option, callback);
                        }
                    } catch (e) {
                        return !!callback && callback(new Error(e));
                    }

                })

            }
        } catch (e) {
            return !!callback && callback(new Error(e));
        }
    })
}

function paramsHaveRequestBody(params) {
    return (
        params.body ||
        params.requestBodyStream ||
        (params.json && typeof params.json !== 'boolean') ||
        params.multipart
    )
}

function verbFunc(verb) {
    let method = verb.toUpperCase();
    return function (uri, option, callback) {
        let params = request.initParams(uri, option, callback);
        params.method = method;
        return requestWrapper(params, params.callback);
    }
}

// define like this to please codeintel/intellisense IDEs
requestWrapper.get = verbFunc('get');
requestWrapper.head = verbFunc('head');
requestWrapper.options = verbFunc('options');
requestWrapper.post = verbFunc('post');
requestWrapper.put = verbFunc('put');
requestWrapper.patch = verbFunc('patch');
requestWrapper.del = verbFunc('delete');
requestWrapper['delete'] = verbFunc('delete');

module.exports = requestWrapper;
