import dotenv from 'dotenv'
if (process.env.NODE_ENV !== 'production') {
    dotenv.config()
}

import express from 'express'

import uiFunctions from './ui/ui.mjs'
import apiFunctions from './api/api.mjs'
import servicesFunctions from './services/services.mjs'
import dataFunctions from './data/memory/memory.mjs'
import authUIFunction from './ui/auth-ui.mjs'
import initialize from './authentication/passport-config.mjs'
import passport from 'passport'
import flash from 'express-flash'
import session from 'express-session'

const data = dataFunctions()
const services = servicesFunctions(data)
const api = apiFunctions(services)
const authRouter = authUIFunction(services)
const ui = uiFunctions()

const PORT = process.env.PORT || 5555

const app = express()

app.set('views', 'views')
app.set('view engine', 'hbs')

app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(express.static('public'))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

initialize(passport, services.getUserByEmail, services.getUserById)
app.get("/api/professionals", api.getProfessionals)
app.get("/api/schedules", api.getSchedules)
app.get("/api/gallery", api.getGallery)
app.get("/api/test", api.getUser)
app.post("/api/login", checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))
app.post("/api/signUp", checkNotAuthenticated, api.signUp)
app.delete("/api/logOut", api.logOut)

app.get("/", checkAuthenticated, ui.homePage)
app.get("/schedules", ui.schedulesPage)
app.get("/login", checkNotAuthenticated, ui.login)
app.get("/signUp", checkNotAuthenticated, ui.signUp)

function checkAuthenticated(req, resp, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    
    resp.redirect('/login')
}

function checkNotAuthenticated(req, resp, next) {
    if (req.isAuthenticated()) {
        return resp.redirect('/')
    }
    next()
}

app.listen(PORT, () => console.log(`Listening...\nhttp://localhost:`+ PORT))
