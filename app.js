function main(req) {
  return req.query.message
}

// ====================
// Подготовка сервера
const express       = require("express")
const bodyParser = require("body-parser")
const app               = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.all('*', (req, res) => {
  res.send(JSON.stringify({"replies": [
		{"message": main(req.body)}
  ]}))
})
app.listen(process.env.PORT || 3000)
