const request = require('request');
const obs_config = global.envConfig.obs;

function request_obs(uri, options, callback) {
    return new Promise((resolve, reject) => {
        let origin_option = request.initParams(uri, options, callback);
        // 未传objectName
        if (!origin_option.body || !origin_option.body.objectName) {
            reject({message: '未传objectName'});
        }

        const token_uri = (origin_option.url || origin_option.uri) || obs_config.keyStoneUrl;
        const keyStoneName = origin_option.body.keyStoneName || obs_config.keyStoneName;
        const domain = origin_option.body.domain || obs_config.domain;
        const keyStonePassword = origin_option.body.keyStonePassword || obs_config.keyStonePassword;
        const projectId = origin_option.body.projectId || obs_config.projectId;
        const container = origin_option.body.container || obs_config.container;
        const swiftUrl = origin_option.body.swiftUrl || obs_config.swiftUrl;
        const objectName = origin_option.body.objectName;
        const method = String(origin_option.body.method || 'get').toLowerCase() ;   // put: 新增OR修改，delete/del：删除

        let option_for_token = {};
        option_for_token.uri = token_uri;
        option_for_token.body = {
            auth: {
                identity: {
                    methods: ['password'],
                    password: {
                        user: {
                            name: keyStoneName,
                            domain: {
                                id: domain
                            },
                            password: keyStonePassword
                        }
                    }
                },
                scope: {
                    project: {
                        id: projectId
                    }
                }
            }
        };
        option_for_token.json = true;

        // console.log('option_for_token:', JSON.stringify(option_for_token));
        request.post(option_for_token, (error, response, body) => {
            // console.log('option_for_token error:', error);
            // console.log('option_for_token statusCode:', response && response.statusCode);
            // console.log('option_for_token body:', body);
            if (error) {
                reject({message: '获取token出错'});
            }
            // 获取token成功(success or created)
            if ((response.statusCode == 200 || response.statusCode == 201) && response.headers['x-subject-token']) {
                let option_for_file = {
                    url: `${swiftUrl}/AUTH_${projectId}/${container}/${objectName}`,
                    headers: {
                        'X-Auth-Token': response.headers['x-subject-token']
                    }
                };
                // console.log('option_for_file:', JSON.stringify(option_for_file));
                if(method == 'put' || method == 'delete'|| method == 'del'){
                    // put: 新增OR修改，delete：删除
                    resolve(request[method](option_for_file));
                } else {
                    // 获取obs存储内容
                    resolve(request(option_for_file));
                }
            }
            else {
                reject({message: '获取token出错'});
            }
        });
    });
}

// function verbFunc(verb) {
//     let method = verb.toUpperCase();
//     return function (uri, options, callback) {
//         let params = request.initParams(uri, options, callback);
//         params.method = method;
//         return request_obs(params, params.callback);
//     }
// }
//
// request_obs.get = verbFunc('get');
// request_obs.head = verbFunc('head');
// request_obs.options = verbFunc('options');
// request_obs.post = verbFunc('post');
// request_obs.put = verbFunc('put');
// request_obs.patch = verbFunc('patch');
// request_obs.del = verbFunc('delete');
// request_obs['delete'] = verbFunc('delete');

module.exports = request_obs;
