function main(req, res) {
  console.log(req.body.query.message)
  return "Success ✅"
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
		{"message": main(req, res)}
  ]}))
})
app.listen(process.env.PORT || 3000)
