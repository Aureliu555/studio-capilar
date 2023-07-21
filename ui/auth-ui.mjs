import express from 'express'
import expressSession from 'express-session'
import passport from 'passport'

function authUiFunction(services, appMiddlewares) {
    const router = express.Router()

    router.use(expressSession({secret : process.env.SESSION_SECRET, resave : true, saveUninitialized : true}))
    router.use(passport.initialize())
    router.use(passport.session())

    passport.serializeUser((serializableUser, done) => done(null, serializableUser))
    passport.deserializeUser((user, done) => done(null, user))

    router.get("/login", getLoginView)
    router.get("/signup", getSignUpView)
    router.post("/signup", postSignUp)
    router.post("/logout", postLogout)
    router.post("/login", postLogin)

    return router

    function getLoginView(req, resp) { 
        resp.render('login', {loginOrSignup: true, redirectUrl: getRedirectUrl(req)})
    }

    async function postLogin(req, resp) {
        const email = req.body.email
        const password = req.body.password
        try {
            const serializableUser = await services.login(email, password)
            await loginAndRedirect(req, resp, serializableUser)
        } catch (error) {
            // error mapping needs to be implemented
            resp.render("login", {loginOrSignup: true, error: error})
        }
    }

    function getSignUpView(req, resp){
        resp.render('signup', {loginOrSignup: true, redirectUrl: getRedirectUrl(req)})
    }

    async function postSignUp(req, resp) {
        try {
            // the user needs to be serializable one
            const user = await services.signUp(req.body.username, req.body.email, req.body.password)
            await loginAndRedirect(req, resp, user)
        } catch(error) {
            // error mapping needs to be implemented
            resp.render('signup', {loginOrSignup: true, error: error})
        }
    }

    function postLogout(req, resp) {
        req.logout(() => resp.redirect('/'))
    }

    function login(req, user) {
        return new Promise( (resolve,reject) => {
            req.login(user, (error, result) => {
                if(error) reject(error)
                else resolve(result)
            })
        })
    }

    async function loginAndRedirect(req, resp, user) {
        await login(req, user)
        if (req.query.redirectUrl) resp.redirect(req.query.redirectUrl) 
        else resp.redirect('/')
    }

    function getRedirectUrl(req) {
        let redirectUrl = ''
        if (req.query.redirectUrl) redirectUrl = '?redirectUrl=' + req.query.redirectUrl
        return redirectUrl
    }
}

export default authUiFunction