const express = require('express')
const mongoose = require("mongoose");
const ejs = require('ejs')
const path = require('path')
const Post = require('./models/Post')


const app = express()
mongoose.set('strictQuery', false);
mongoose
    .connect("mongodb://127.0.0.1:27017/cleanblog-test-db")
    .then(() => console.log("Connected to CleanBlog Posts database!"));

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.get('/', async (req,res) => {
    const posts = await Post.find({}).sort({postDate: -1}).limit(5)
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    res.render("index", {
        posts,
        options
    });
})

app.get('/about', (req,res) => {
    res.render('about')
})

app.get('/add_post', (req,res) => {
    res.render('add_post')
})

app.get('/post', (req,res) => {
    res.render('post')
})

app.post('/add', async (req,res) => {
    await Post.create(req.body)
    await console.log(req.body, 'Added succesfully')
    await res.redirect('/')
})

const port = 4000
app.listen(port, () => {
    console.log(`${port} ile sunucuya baglanildi`)
})