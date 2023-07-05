import express from 'express'

import uiFunctions from './ui/ui.mjs'
import servicesFunctions from './services/services.mjs'
import dataFunctions from './data/memory/memory.mjs'

const data = dataFunctions()
const services = servicesFunctions(data)
const ui = uiFunctions(services)

const PORT = process.env.PORT || 5555

const app = express()

app.set('views', 'views')
app.set('view engine', 'hbs')

app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(express.static('public'))

app.get("/", ui.homePage)
app.get("/schedules", ui.schedulesPage)

app.listen(PORT, () => console.log(`Listening...\nhttp://localhost:`+ PORT))
