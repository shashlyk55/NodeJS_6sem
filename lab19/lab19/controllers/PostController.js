const Post = require('../models/Post')

const PostController = {
    get: async (id) => {
        const post = await Post.findById(id);
        return post
    },
    write: async (req, res) => {
        try{            
            const { title, content } = req.body
            const newPost = new Post({
                title: title,
                content: content,
                publisher: req.userId
            })
            await newPost.save()
            
            if(!newPost){
                return res.status(500).send('create post error')
            }

            res.redirect('/user/profile')
        } catch(err){
            return res.status(500).send('create post error')
        }
    },
    delete: async (req, res) => {
        try{
            const { id } = req.params
            const deletedPost = await Post.findOneAndDelete({_id: id})
            if(!deletedPost){
                return res.status(500).send('delete post error')
            }

            res.redirect('/user/profile')
        } catch(err){
            return res.status(500).send('delete post error')
        }
    },
    update: async (req, res) => {
        try{
            const { id } = req.params
            const { title, content } = req.body
            const newPost = await Post.findByIdAndUpdate(id, { title, content })
            if(newPost){
                return res.redirect('/user/profile')
            }
            return res.status(500).send('update post error')
        } catch(err){
            return res.status(500).send('delete post error')
        }
    }
}

module.exports = PostController
