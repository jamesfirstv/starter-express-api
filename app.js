// Главный роутер
function main(msg) {
  if (msg.match('Чат лагеря'))
    return '🏘В Нью-Рино'

  if (msg.match('уютный город Рино,'))
    return '/eat1<#>/eat1<#>/eat1<#>👣Пустошь'

  if (msg.match('в этот раз уже буквально.'))
    return '⛺️Вернуться<#>Вернуться в лагерь'

  if (
    msg.match('Твой путь преградил исполинских размеров монстр.')
    || msg.match('в этот раз ты не получил сдачи.')
  ) return '⚔️Атаковать'

  if (
    msg.match('📯🚷 ❤️')
    || msg.match('📯❤️')
  ) return 'Двигаться дальше'

  if (
    msg.match('Ты не сможешь увильнуть от противника')
    || msg.match('Тебе не уйти от противника')
    || msg.match('Во время вылазки на тебя напал')
  ) return '⚔️Дать отпор'

  let parse = msg.match(/🚷.*👣(\d+)км/)
  if (parse) parse = actPath(parse, false)
  if (parse) return parse
  parse = msg.match(/👣(\d+)км/)
  if (parse) parse = actPath(parse)
  if (parse) return parse
  parse = msg.match(/👣(\d+)\sкм/)
  if (parse) parse = actPath(parse)
  if (parse) return parse
  parse = msg.match(/🚷(\d+)\sкм/)
  if (parse) parse = actPath(parse, false)
  if (parse) return parse

  if (msg.match('Ты встретил бродячего торговца,'))
    return '/buy_5i<#>/view'

  if (
    msg.match('Ты оценил обстановку вокруг.')
    || msg.match('Ты огляделся вокруг себя.')
    || msg.match('Рейд в 01:00')
    || msg.match('Рейд в 9:00')
    || msg.match('Рейд в 17:00')
  )
    return '👣Идти дaльше'

  if (
    msg.match('Ты съел ')
    || msg.match('/view')
    || msg.match('Ты одержал победу!')
    || msg.match('Ты готов снова отправиться в Пустошь!')
    || msg.match(' и его')
    || msg.match('с виду зверька. Это был кот,')
    || msg.match('— Кис-кис-кис..')
    || msg.match('\n🐐')
    || msg.match('\s🤘')
    || msg.match('(без банды)')
    || msg.match('водохранилище\n 🕳+')
    || msg.match('датацентр\n 🕳+')
  ) return '/view'

  if (msg.match('Ты очень голоден.'))
    return '/myfood'
  parse = msg.match(/\/use_1[0-2]\d/g)
  if (parse) return parse[0]

  
  if (msg.match('/dl_'))
    return actClean(msg)
  parse = msg.match(/\/del_\d+/)
  if (parse)
    return parse[0]
}

// --------------------
// Ветка километража
function actPath(parse, light=true) {
  let x = Number(parse[1])

  if (light) {
    switch (x) {
      case 2: return '👣Идти дaльше'
      case 22: return '🚷В Темную зону'
      case 27: return '👣Идти дaльше'
      case 11: return 'Старая шахта<#>Двигаться дальше'
      case 45: return '🌁Высокий Хротгар<#>Двигаться дальше'
      case 51: return '🛏Безопасный привал<#>/deeprest'
//      case 52: return '🚷В Темную зону'
//      case 50: return '/mystuff'
      case 54: return '/voevat_suda'
      case 68: case 69: return '⛺️Вернуться<#>Вернуться в лагерь'
      default: return false
    }
  } else {
    switch (x) {
      case 56: return '🔬Научный комплекс<#>Двигаться дальше'
//      case 39: return '🦇Бэт-пещера<#>Двигаться дальше'
      case 23: return '🚽Сточная труба<#>Двигаться дальше'
      default: return false
    }
  }
}

// --------------------
// Ветка очистки
function actClean(msg) {
  const badGoods = [
    'BFGzzv-4000',
    'Боевая броня',
    'Броня братства',
    'Кинжал',
    'Кожанный нагрудник',
    'Кожаный жилет',
    'Титановые щитки',
    'Мачате',
    'Шипастая бита',
    'Лазерный тесак',
    'Мото-защита',
    'Плотный капюшон',
    'Противогаз',
    'Супермолот',
    'Фалмерский клинок',
    'Фусронет',
    'Ушанка',
    'Вязаная шапка',
    'Хлыст',
    'Электромеч'
  ]

  let parse
  for (let i=0; i<badGoods.length; i++) {
    parse = msg.match(new RegExp(badGoods[i]+'.*(\\/dl_\\d+)'))
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
  let msg = req.body.query.message
  console.log('Респондер прислал:\n' + msg + '\n---\n')
  let ans = main(msg)
  console.log('Мы отвечаем: ' + ans + '\n---\n')
  res.send(JSON.stringify({"replies": [{"message": ans}]}))
})
app.listen(process.env.PORT || 3000)
