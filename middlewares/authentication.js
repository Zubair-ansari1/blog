const { validateToken } = require("../services/auth");

function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];
        if(!tokenCookieValue) {
           return next();
        }

        try {         
            const userPaylod = validateToken(tokenCookieValue);
            req.user = userPaylod
        } catch (error) {}
        return next();
    }
}

module.exports = { 
    checkForAuthenticationCookie,
}