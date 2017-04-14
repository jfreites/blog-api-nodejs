module.exports = (req, res, next) => {

    let token = (req.body && req.body.token) || req.headers.token;

    if (token) {
        if (token != 'my-super-secure-auth-token') {
            res.status(401);
            res.json({
                "message": "Invalid Token"
            });
            return;
        } else {
            next();
        }
    } else {
        res.status(403);
        res.json({
            "message": "Not Authorized"
        });
        return;
    }
}
