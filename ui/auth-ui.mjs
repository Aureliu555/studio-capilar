import express from 'express'
import expressSession from 'express-session'
import passport from 'passport'

function authUiFunction(services) {
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
        resp.render('login', {loginOrSignup: true})
    }

    async function postLogin(req, resp) {
        const email = req.body.email
        const password = req.body.password
        try {
            const serializableUser = await services.login(email, password)
            await login(req, serializableUser)
            resp.redirect('/') // needs to be redirected to the page it was before needing authentication
        } catch (error) {
            // error mapping needs to be implemented
            resp.render("login", {loginOrSignup: true, error: error})
        }
    }

    function getSignUpView(req, resp){
        resp.render('signup', {loginOrSignup: true})
    }

    async function postSignUp(req, resp) {
        try {
            const user = await services.signUp(req.body.username, req.body.email, req.body.password)
            await login(req, user)
            resp.redirect('/') // needs to be redirected to the page it was before needing authentication
        } catch(error) {
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
}

export default authUiFunction