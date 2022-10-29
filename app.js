// Подготовка сервера
const express       = require("express")
const bodyParser = require("body-parser")
const app               = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.all('*', main)
app.listen(process.env.PORT || 3000)

// Функция main()
function main(req, res) {
  res.send('Yo!')
  json_encode(array("replies" => array(
		array("message" => "Hey " . $sender . "!\nThanks for sending: " . $message),
		array("message" => "Success ✅")
	)));
  console.log(req.body)
//  res.send(JSON.stringify(req))
}
