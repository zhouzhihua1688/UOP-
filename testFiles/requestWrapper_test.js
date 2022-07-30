
const request = require('request');
const extend = require('extend')
// const userMgmt_apiConfig = require('../routes/userMgmt/apiConfig');
const userMgmt_apiConfig = {
    Authorization: 'Basic dW9wOjEyMzQ1Ng==',
    user:{
        login: 'http://10.50.115.125:8089/inner-uaa/v1/oauth/token'
    }
};
const authorization = userMgmt_apiConfig.Authorization;
const login_url = userMgmt_apiConfig.user.login;

// const authorization = global.envConfig.inner_uaa.Authorization;
// const authorization = 'Basic dW9wOjEyMzQ1Ng==';


function requestWrapper (uri, options, callback) {
  // if (typeof uri === 'undefined') {
  //   throw new Error('undefined is not a valid uri or options object.')
  // }

  // var params = requset.initParams(uri, options, callback)

  // if (params.method === 'HEAD' && paramsHaveRequestBody(params)) {
  //   throw new Error('HTTP HEAD requests MUST NOT include a request body.')
  // }

  // return new request.Request(params)

  var params = request.initParams(uri, options, callback)

  callback = params.callback;
  options = params;

  if(options && !options.session) {
    return callback(new Error('------requestWrapper------error, session must be set in options to use access_token and refresh_token!!!'))
  }

  !options.headers && (options.headers = {})
  // extend(options.headers, { Authorization: authorization })
  extend(options.headers, { Authorization: options.session['access_token'] })

  // console.log('requestWrapper 1 params options=', options);
  // console.log('requestWrapper 1 params callback=', callback);

  request(options, (error, response, body) => {
    // console.log('requestWrapper 1 error:', error);
    // console.log('requestWrapper 1 statusCode:', response && response.statusCode);
    // console.log('requestWrapper 1 body:', body);
    // body = '{xzcv:'
    try{
        let result = typeof body == 'string' ? JSON.parse(body) : body;
    
        if(response.statusCode == 200 && result.returnCode == 0){
            return callback(error, response, body);
        }

        if(response.statusCode == 400){
            return callback(new Error('------requestWrapper------unknown error, check requst header'));
        }

        if(response.statusCode == 401 && result.returnCode == 1000){
            console.log('------requestWrapper------access_token expired, need to get refresh_token');
            
            options_refresh = { 
                headers: { Authorization: authorization },
                // url: 'http://10.50.115.163:8037/inner-uaa/v1/oauth/token',
                // url: 'http://10.50.110.182:8089/inner-uaa/v1/oauth/token',
                url: login_url,
                form:{ 
                    grant_type: 'refresh_token',
                    scope: 'all',
                    // loginName: 'admin',
                    // password: 'admin'
                    refresh_token: req.session['refresh_token']
                },
                timeout: 15000
            }

            console.log('requestWrapper 2 options_refresh:', options_refresh);
            request.post(options_refresh, (error, response, body) => {
                console.log('requestWrapper 2 error:', error);
                console.log('requestWrapper 2 statusCode:', response && response.statusCode);
                // console.log('requestWrapper 2 body:', body);
                try {
                    let result = typeof body == 'string' ? JSON.parse(body) : body;
                    delete result.loginUserDto
                    console.log('requestWrapper 2 result:', result);

                    if (response.statusCode == 400) {
                        return callback(new Error('------requestWrapper------refresh_token expired'));
                    }

                    if (response.statusCode == 200 && result.returnCode == 0) {
                        console.log('------requestWrapper------got new access_token=', result['access_token']);
                        console.log('------requestWrapper------got new refresh_token=', result['refresh_token']);
                        options.session['access_token'] = result['access_token'];
                        options.session['refresh_token'] = result['refresh_token'];

                        console.log('------requestWrapper------options=', options);

                        options.headers['Authorization'] = result['access_token'];

                        return request(options, callback)
                    }
                } catch (e) {
                    return callback(new Error(e));
                }
                
            })

        }

    }catch (e){
        return callback(new Error(e));
    }
  })
}

function paramsHaveRequestBody (params) {
  return (
    params.body ||
    params.requestBodyStream ||
    (params.json && typeof params.json !== 'boolean') ||
    params.multipart
  )
}

function verbFunc (verb) {
  var method = verb.toUpperCase()
  return function (uri, options, callback) {
    var params = request.initParams(uri, options, callback)
    params.method = method
    return requestWrapper(params, params.callback)
  }
}

// define like this to please codeintel/intellisense IDEs
requestWrapper.get = verbFunc('get')
requestWrapper.head = verbFunc('head')
requestWrapper.options = verbFunc('options')
requestWrapper.post = verbFunc('post')
requestWrapper.put = verbFunc('put')
requestWrapper.patch = verbFunc('patch')
requestWrapper.del = verbFunc('delete')
requestWrapper['delete'] = verbFunc('delete')

module.exports = requestWrapper




var req = {}
req.session = {
"access_token": "8c453ce0-976d-4379-9efa-d54a2f548a50",
    "token_type": "bearer",
    "refresh_token": "d78cd9c8-7483-484c-b5f8-58c5443736e7",
    "expires_in": 59,
    scope: 'all',
    returnCode: 0,
    returnMsg: 'ok'
}

let options = {
    // headers: {
    //     'Authorization': req.session['access_token'],
    // },
    url: 'http://10.50.115.125:8089/inner-uaa/v1/role',
    json: true,
    session: req.session,
    timeout: 15000
};

requestWrapper.get(options, (error2, response2, body2) => {
    console.log('test_token error2:', error2);
    console.log('test_token statusCode2:', response2 && response2.statusCode);
    console.log('test_token body2:', body2);
    // let result2 = JSON.parse(body2);
    let result = typeof body2 == 'string' ? JSON.parse(body2) : body2;

})


process.on("uncaughtException", function (err) {
    console.log("******process uncaughtException occur, err=", err);
    // console.log("******process uncaughtException err.stack)=", err.stack);
    // process.exit(1);
})
