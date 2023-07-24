import fetch from "node-fetch"

function checkAuthenticated(req, resp, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    const redirectUrl = '/login?redirectUrl=' + req.url
    resp.redirect(redirectUrl)
}

function checkLogin(req, resp, next) {
    console.log(req.url)
    return next()
}

const middlewares = {
    checkAuthenticated,
    checkLogin
}

export default middlewares