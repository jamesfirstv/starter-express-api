// Подготовка сервера
const srv = require('express')()     // Загрузка либы Express
srv.all('/mrwtd', main)              // Обрабатывать будем запросы на /mrwtd ("Message reserved, what to do?")
srv.listen(process.env.PORT || 3000) // Стартуем сервак

// Функция main()
function main(req, res) {
  res.send('Yo!')
//  res.send(JSON.stringify(req))
}
