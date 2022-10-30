// Главный роутер
function main(msg) {
  console.log('Респондер прислал:\n' + msg + '\n')
  if (msg.match(/💬 чат лагеря/))
    return '🏘В Нью-Рино'
  if (msg.match(/👣/))
    return actPath(msg)
  if (msg.match(/ты очень голоден/))
    return '/myfood'
  if (msg.match(/use_1[0-2]\d/):
      return actFood(msg)
  if (msg.match(/🤝передать \/givestuff/))
      return '/givestuff'
  if (
    msg.match(/ты не сможешь увильнуть от противника/)
    || msg.match(/во время вылазки на тебя напал/)
  ) return '⚔️Дать отпор'


    case 'Осмотреться':
      console.log('ok!\n')
    case /ты одержал победу!/:
    case /и его/:
    case /\n🐐/:
    case /\s🤘/:
    case /\(без банды\)/:
    case /водохранилище\n 🕳+/:
    case /датацентр\n 🕳+/:
      return '👣Идти дaльше'
  }
}

// --------------------
// Ветка километража
function actPath(msg) {
  let x = Number(msg.match(/👣(\d)+км/)[1])
  switch (x) {
    case 2: return '👣Идти дaльше'
    case 22: return '🚷В Темную зону'
    case 52: return '🚷В Темную зону'
    case 63: return '/voevat_suda'
    case 74: case 75: return '⛺️Вернуться<#>Вернуться в лагерь'
  }
}

// --------------------
// Ветка жрачки
function actFood() {
  let food = Number(msg.match(/use_(\d{3})/)[1])
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
