// Подготовка сервера
const express       = require("express")
const bodyParser = require("body-parser")
const router           = express.Router()
const app               = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
router.post(‘/mrwtd’, main)

// Функция main()
function main(req, res) {
  res.send('Yo!')
//  res.send(JSON.stringify(req))
}
