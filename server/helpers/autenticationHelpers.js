app.use((req, res, next) => {
    req.role = {};
    var auth = req.get('Authorization');
    if (typeof auth != "undefined")
        req.user.roles = auth.split(" ");
    else
        req.user.roles = [];
    next();
});