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
import appMiddlewares from './middlewares/middlewares.mjs'

const data = dataFunctions()
const services = servicesFunctions(data)
const api = apiFunctions(services)
const authRouter = authUIFunction(services, appMiddlewares)
const ui = uiFunctions()

const PORT = process.env.PORT || 5555

const app = express()

app.set('views', 'views')
app.set('view engine', 'hbs')

app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(express.static('public'))
app.use(authRouter)

app.get("/api/professionals", api.getProfessionals)
app.get("/api/schedules", api.getSchedules)
app.get("/api/gallery", api.getGallery)
app.get("/api/test", api.getUser)

app.get("/", ui.homePage)
app.get("/schedules", ui.schedulesPage)
app.get("/classes", appMiddlewares.checkAuthenticated, ui.classes)

app.listen(PORT, () => console.log(`Listening...\nhttp://localhost:`+ PORT))
