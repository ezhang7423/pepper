const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const path = require('path')
const bodyParser = require('body-parser');
const {storeFile} = require(__dirname + '/src/index.js') 


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile('index.html')
})

app.get('/api/:name', (req, res, next) => {
    return res.sendFile(__dirname + '/data/'+ req.params.name)
    next()
})

app.post('/api/upload', (req, res, next) => {
     let username = req.body.username;
     let token = req.body.token;
     let orgName = req.body.orgName;
     return storeFile(username, token, orgName)
})

app.use('/api', function (req, res, next) {
    return res.send("This is pepper's api endpoint")
}),


// app.post('/api', (req, res) => {
//     console.log(req)
//     return res.send('Received a POST HTTP method')
// })

app.listen(port, () => console.log(`Listening on port ${port}`))