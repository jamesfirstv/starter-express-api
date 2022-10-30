// Главный роутер
function main(msg) {
  console.log('Респондер прислал:\n' + msg + '\n')

  if (msg.match(/💬 чат лагеря/))
    return '🏘В Нью-Рино'

  let parse = msg.match(/👣(\d+)км/)
  if (parse) parse = actPath(parse)
  if (parse) return parse

  if (
    msg.match('/view')
    || msg.match(/ты одержал победу!/)
    || msg.match(/и его/)
    || msg.match(/\n🐐/)
    || msg.match(/\s🤘/)
    || msg.match(/\(без банды\)/)
    || msg.match(/водохранилище\n 🕳+/)
    || msg.match(/датацентр\n 🕳+/)
  ) return '👣Идти дaльше'

  if (msg.match('Ты очень голоден'))
    return '/myfood'
  parse = msg.match(/\/use_1[0-2]\d/g)
  if (parse) return parse[0]

  if (msg.match('🤝передать /givestuff'))
      return '/givestuff'

  if (
    msg.match(/ты не сможешь увильнуть от противника/)
    || msg.match(/во время вылазки на тебя напал/)
  ) return '⚔️Дать отпор'

  if (msg.match('Путь займёт несколько минут'))
    return '/cstock'
  if (msg.match('/dl_'))
    return actClean(msg)
}

// --------------------
// Ветка километража
function actPath(parse) {
  let x = Number(parse[1])

  switch (x) {
    case 2: return '👣Идти дaльше'
    case 22: return '🚷В Темную зону'
    case 52: return '🚷В Темную зону'
    case 63: return '/voevat_suda'
    case 74: case 75: return '⛺️Вернуться<#>Вернуться в лагерь'
    default: return false
  }
}

// --------------------
// Ветка очистки
function actClean(msg) {
  console.log('actClean:\n')
  const badGoods = [
    'BFGzzv-4000',
    'Боевая броня',
    'Броня братства',
    'Кинжал',
    'Кожанный нагрудник',
    'Мачате',
    'Мото-защита',
    'Плотный капюшон',
    'Противогаз',
    'Супермолот',
    'Фалмерский клинок',
    'Фусронет',
    'Хлыст',
    'Электромеч'
  ]

  let parse
  for (let i=0; i<badGoods.length; i++) {
    console.log(i+'\n')
    parse = msg.match(new RegExp(badGoods[i]+'.*(\/dl_\d+)'))
    if (parse) break
  }
  if (parse) return parse[1]
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
