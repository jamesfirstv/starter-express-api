// Старт сервера
const app = require('express')()
app.all('/', (req, res) => {
    res.send('Yo!')
})
app.listen(process.env.PORT || 3000)
