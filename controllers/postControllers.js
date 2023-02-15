const Post = require('../models/Post')

exports.addPost = async (req,res) => {
    await Post.create(req.body)
    await res.redirect('/')
}

exports.editPost = async (req,res) => {
    const post = await Post.findById(req.params.id)
    post.author = req.body.author
    post.title = req.body.title
    post.post = req.body.post
    post.postDate = Date.now()
    post.save()
    await res.redirect(`/post/${post.id}`)
}

exports.deletePost = async (req,res) => {
    await Post.findByIdAndDelete(req.params.id)
    res.redirect('/')
}

