// Настройки от хостера
const dbName = 'apricot-calf-garbCyclicDB'

// Подключаем базу данных
const CyclicDB = require('cyclic-dynamodb')
const db = CyclicDB(dbName)

const run = async function() {
    let animals = db.collection('settings')

    // create an item in collection with key "leo"
    let leo = await animals.set('tgApiId', '')

    // get an item at key "leo" from collection animals
    let item = await animals.get('leo')
    console.log(item)
}
run()
console.log('==========')


/*
const MTProto  = require('@mtproto/core')
const tempStor = require('@mtproto/core/src/storage/temp')
const api_id   = YOU_API_ID
const api_hash = YOU_API_HASH
const mtproto  = new MTProto({
  api_id, api_hash,
  storageOptions: {instance: tempStor}
})


// 2. Print the user country code
mtproto.call('help.getNearestDc').then(result => {
  console.log('country:', result.country)
})
*/




/*
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
    msg.match('Ты не сможешь увильнуть от противника')
    || msg.match('Тебе не уйти от противника')
    || msg.match('Во время вылазки на тебя напал')
  ) return '⚔️Дать отпор'


  let parse = msg.match(/👣(\d+)км/)
  if (parse) parse = actPath(parse)
  if (parse) return parse

  if (msg.match('/view'))
    return '👣Идти дaльше'

  if (
    msg.match('Ты съел ')
    || msg.match('Ты одержал победу!')
    || msg.match(' и его')
    || msg.match('\n🐐')
    || msg.match('\s🤘')
    || msg.match('(без банды)')
    || msg.match('водохранилище\n 🕳+')
    || msg.match('датацентр\n 🕳+')
  ) return '🔎Дeйствие'

  if (msg.match('Ты очень голоден.'))
    return '/myfood'
  parse = msg.match(/\/use_1[0-2]\d/g)
  if (parse) return parse[0]
  


  if (msg.match('Ты встретил бродячего торговца,'))
      return '/buy_5i<#>🔎Дeйствие'
      


  
  if (msg.match('/dl_'))
    return actClean(msg)
  parse = msg.match(/\/del_\d+/)
  if (parse)
    return parse[0]
}

// --------------------
// Ветка километража
function actPath(parse) {
  let x = Number(parse[1])

  switch (x) {
    case 2: return '👣Идти дaльше'
    case 22: return '🚷В Темную зону'
    case 52: return '🚷В Темную зону'
//    case 50: return '/mystuff'
    case 20: return '/voevat_suda'
    case 68: case 69: return '⛺️Вернуться<#>Вернуться в лагерь'
    default: return false
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
    'Мачате',
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
*/

