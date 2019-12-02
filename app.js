const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const path = require('path')

app.use(express.static('public'))
app.get('/', (req, res) => {
    res.sendFile('index.html')
})

app.get('/api/:name', (req, res, next) => {
    return res.sendFile(__dirname + '/data/'+ req.params.name)
    next()
})
app.use('/api', function (req, res, next) {
    return res.send("This is pepper's api endpoint")
}),


// app.post('/api', (req, res) => {
//     console.log(req)
//     return res.send('Received a POST HTTP method')
// })

app.listen(port, () => console.log(`Listening on port ${port}`))