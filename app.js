// Старт сервера
const srv = require('express')()
srv.all('/mrwtd', (req, res) => {
    res.send('Yo!')
})
srv.listen(process.env.PORT || 3000)
