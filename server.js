const express = require("express")

const app = express()

const port = '8000'

app.listen(port, () => console.log(`listening on port ${port}`))

app.use(express.static(__dirname + '/src/pages/home'))