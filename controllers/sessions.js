const User = require("../users/user")
const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('works')
}) 

router.get('/signUp', (req, res)=>{
    // set registration route folder
    res.render('')
})
router.post('/register', async (req,res, next)=>{
    try {
        if(req.body.password === req.body.verifyPassword) {
            const wantedUsername = req.body.username
            const userExists = await User.findOne({ username: wantedUsername})
            if (userExists) {
                res.send('username taken')
            } else {
                const salt = bcrypt.genSaltSync(10)
                const hashedPassword = bcrypt.hashSync(req.body.password, salt)
                req.body.password = hashedPassword
                const newUser = await User.create(req.body)
                console.log(newUser)
             res.send('terminal')
            }
        } else {
            res.send('passwords dont match')
        }
    } catch(err){
        next(err)
    }
})
    router.post('/login', async(req,res,next) =>{
        try { const userLogin =await User.findOne({ username: req.body.username})
        if (userLogin) {
            const validPassword = bcrypt.compareSync(req.body.password, userLogin.password)
        if(validPassword) {
            res.send(`${userLogin} loged in`)
        } else {
            // redirect to login
            res.redirect()
            console.log(next)
        }
    } else {
        // redirect to login
        res.redirect()
    }
} catch (err) {
    next(err)
}
}
)

module.exports = router