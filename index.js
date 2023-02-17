const express = require('express')
const mongoose = require("mongoose");
const ejs = require('ejs')
const methodOverride = require('method-override');
const pageControllers = require('./controllers/pageControllers')
const postControllers = require('./controllers/postControllers')


const app = express()
mongoose.set('strictQuery', false);
mongoose
    .connect("mongodb+srv://doyransafa:546800asd@cluster0.bz5lozb.mongodb.net/?retryWrites=true&w=majority")
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

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`${PORT} ile sunucuya baglanildi`)
})