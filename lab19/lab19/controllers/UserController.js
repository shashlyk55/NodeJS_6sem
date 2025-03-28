const User = require('../models/User')
const jwt = require('jsonwebtoken')
const Post = require('../models/Post')

const UserController = {
    login: async (req, res) => {
        try{
            const user = req.body            
            const newUser = await User.findOne({unique_username: user.unique_username})
            
            if(newUser.password != user.password){
                return res.status(401).json(`wrong data`)
            }

            const token = jwt.sign({ userId: newUser._id}, 'secret_key', { expiresIn: '1h'})
            
            await res.cookie('token', token, { httpOnly: true})            
            res.redirect('/user/profile')
        } catch(err){
            res.status(500).json({
                message: `login error ${err}`
            })
        }
    },
    register: async (req, res) => {
        try{
            const {unique_username, password} = req.body
            const newUser = new User({
                unique_username: unique_username,
                password: password
            })

            await newUser.save()

            res.redirect('/user/login')
        } catch(err){
            res.status(500).send(`register error ${err}`)
        }
    },
    logout: async (req, res) => {
        res.clearCookie('userId')
        res.redirect('/user/login')
    },
    profile: async (req, res) => {
        const posts = await Post.find({ publisher: req.userId });
        res.render('profile', { posts, username: req.username })
    }
}

module.exports = UserController