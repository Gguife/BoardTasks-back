function routes(app) {
    app.use('/user', require('./routes/users.js'));
    return;
}

module.exports = routes;