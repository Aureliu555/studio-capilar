import express from 'express'

import uiFunctions from './ui/ui.mjs'
const ui = uiFunctions(undefined)
const PORT = process.env.PORT || 5555

const app = express()

app.set('views', 'views')
app.set('view engine', 'hbs')

app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(express.static('public'))

app.get("/", ui.homePage)

app.listen(PORT, () => console.log(`Listening...\nhttp://localhost:`+ PORT))
