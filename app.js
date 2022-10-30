function main(msg) {
  switch (msg) {
    case /👣/:
      return actPath(msg)
    case /ты очень голоден/:
      return '/myfood'
    case /use_1[1-2]\d/:
      return actFood(msg)
  }
  return msg+1
}

// --------------------
// Ветка километража
function actPath(msg) {
  let x = msg.match(/👣(\d)+км/)[1]
  switch (x) {
    case 2: return '👣Идти дaльше'
    case 22: return '🚷В Темную зону'
    case 27: return '/mystuff'
    case 54: return '/voevat_suda'
    case 
  }
}

// --------------------
// Ветка жрачки
function actFood() {
  return
}

// ====================
// Подготовка сервера
const express    = require("express")
const bodyParser = require("body-parser")
const app        = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.all('*', (req, res) => {
  res.send(JSON.stringify({"replies": [
    {"message": main(req.body.query.message)}
  ]}))
})
app.listen(process.env.PORT || 3000)
