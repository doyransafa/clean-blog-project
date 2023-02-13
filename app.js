const express = require('express')
const mongoose = require("mongoose");
const ejs = require('ejs')
const methodOverride = require('method-override');
const path = require('path')
const Post = require('./models/Post')
const pageControllers = require('./controllers/pageControllers')
const postControllers = require('./controllers/postControllers')


const app = express()
mongoose.set('strictQuery', false);
mongoose
    .connect("mongodb://127.0.0.1:27017/cleanblog-test-db")
    .then(() => console.log("Connected to CleanBlog Posts database!"));

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(methodOverride('_method', {methods: ['POST','GET']}))


app.get('/', pageControllers.getAllPosts)
app.get('/post/:id', pageControllers.getPostByID)
app.get('/about', pageControllers.getAboutPage)
app.get('/add_post', pageControllers.getAddPostPage)
app.get('/post/edit/:id', pageControllers.getEditPage)

app.post('/add', postControllers.addPost)
app.put('/edit/:id', postControllers.editPost)
app.delete('/delete/:id', postControllers.deletePost)

const port = 4000
app.listen(port, () => {
    console.log(`${port} ile sunucuya baglanildi`)
})