function redirectIfNotAuthenticated(req, resp, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    const redirectUrl = '/login?redirectUrl=' + req.url
    resp.redirect(redirectUrl)
}

function checkIfAuthenticated(req, resp, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    resp.redirect('/signup')
}

const middlewares = {
    redirectIfNotAuthenticated,
    checkIfAuthenticated
}

export default middlewares