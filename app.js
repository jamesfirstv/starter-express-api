// Главный роутер
function main(msg) {
  switch (msg) {
    case /💬 чат лагеря/:
    case /🚫 недостаточно ресурсов!/:
      return: '🏘В Нью-Рино'
    case /👣/:
      return actPath(msg)
    case /ты очень голоден/:
      return '/myfood'
    case /use_1[1-2]\d/:
      return actFood(msg)
    case /🤝передать \/givestuff/:
      return '/givestuff'
  }
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
    case 64: case 65: return '⛺️Вернуться<#>Вернуться в лагерь'
  }
}

// --------------------
// Ветка жрачки
function actFood() {
  let food = msg.match(/use_(\d{3})/)[1]
  switch (food) {
    case 101: case 104: case 117: case 119:
    case 121: case 122: return '/use_'+food
  }
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
