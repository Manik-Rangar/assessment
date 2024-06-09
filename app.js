require('dotenv').config()
const express = require("express")
const app = express()
const PORT = process.env.PORT
require('./Database/configuration')

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(require('./midlewares/response'))
const routes = require('./controllers/controllers')
app.use('/api', routes)
// Endpoint To Check Server Health
app.get('/health', (req, res) => {
    res.json({ message: "HEALTHY" })
})
app.listen(PORT, (err, data) => {
    console.log(`Server is successfully started at: http://localhost${PORT}`)
})