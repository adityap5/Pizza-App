const User = require('../../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')
function authController() {    //factory function
    return {
        login(req, res) {
            res.render('auth/login')
        },
        postLogin(req, res,next) {
            passport.authenticate('local',(err, user ,info) => {
                if(err){
                    req.flash('error',info.message)
                    return next(err)
                }
                if(!user){
                    req.flash('error',info.message)
                    return res.redirect('/login')
                }
                req.login(user,(err)=>{
                    if(err){
                        req.flash('error',info.message)
                        return next(err)
                    }

                    return res.redirect('/')
                })
            })(req,res,next)
        },
        register(req, res) {
            res.render('auth/register')
        },
        async postRegister(req, res) {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                req.flash('error', "All fields are required!!!")
                req.flash('name', name)
                req.flash('email', email)
                return res.redirect('/register')
            }

            const findUser = await User.findOne({email})
            if(findUser){
                req.flash("error", "Already Registred..!!")
                 return res.redirect("/register")
            }

            const hashPassword = await bcrypt.hash(password, 10)

            const user = new User({
                name,
                email,
                password: hashPassword
            })

            user.save().then((user) => {
                return res.redirect('/')
            }).catch(err => {
                req.flash('error', "Something went wrong!!!")
                return res.redirect('/register')
            })
        }
        ,
        logout(req, res) {
            req.logOut()
            return res.redirect('/login')

        }

    }
}

module.exports = authController;