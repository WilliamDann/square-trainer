const router = require('./router');

module.exports = (app, db) => {
    const userRoute = new router.Route([
        new router.Param('username', true, false, true),
        new router.Param('password', false, true, true),
        new router.Param('email', false, false, false),
    ]);

    userRoute.route('/api/user', app, db.users);
}