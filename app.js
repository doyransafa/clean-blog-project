const express = require('express')
const ejs = require('ejs')
const path = require('path')

const app = express()

app.set('view engine', 'ejs')

app.use(express.static('public'))


app.get('/', (req,res) => {
    res.render('index')
})

app.get('/index', (req,res) => {
    res.render('index')
})

app.get('/about', (req,res) => {
    res.render('about')
})

app.get('/add_post', (req,res) => {
    res.render('add_post')
})

app.get('/posts', (req,res) => {
    res.render('posts')
})

const port = 3000
app.listen(port, () => {
    console.log(`${port} ile sunucuya baglanildi`)
})