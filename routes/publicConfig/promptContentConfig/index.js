module.exports = function (app) {
    require('./businessPromptContent')(app);
    require('./staticTextContent')(app);
};
