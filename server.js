const express = require('express');
const PORT = process.env.PORT || 5555

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.listen(5555, ()=>console.log(`Listening...\nhttp://localhost:`+ PORT))
