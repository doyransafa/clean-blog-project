const { exists } = require('../models/Post')
const Post = require('../models/Post')

exports.getAllPosts = ( async (req,res) => {
    // var posts = await Post.find({author: {$exists:true} }).sort({postDate: -1})
    let posts = await Post.find().sort({postDate: -1})
    let authorName = req.query.author
    let authorPosts = await Post.find({author: authorName}).sort({postDate: -1})
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    res.render("index", {
        posts,
        options,
    });
})

exports.getPostByID = (async (req,res) => {
    const post = await Post.findById(req.params.id)
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    res.render('post', {
        post, 
        options
    })
})

exports.getAboutPage = ((req,res) => {
    res.render('about')
})

exports.getAddPostPage = ((req,res) => {
    res.render('add_post')
})

exports.getEditPage = (async (req,res) => {
    const post = await Post.findById(req.params.id)
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    res.render('edit', {
        post, 
        options
    })
})

exports.getAuthorPage = (async (req,res) => {
    const post = await Post.find({autohr: req.params.author})
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    res.render("index", {
        posts,
        options,
    });
})