const express = require('express');
const userModel = require('../dao/models/user.model');
const router = express.Router();
const { isValidPassword } = require('../utils/hashBcrypt');
const passport = require('passport');

// router.post('/login', async(req, res)=>{
//     const {email, password} = req.body;
//     try {
//         const user = await userModel.findOne({email});
//         if(user){
//             if(isValidPassword(password, user)){
//                 req.session.login = true;
//                 req.session.user = {
//                     email: user.email,
//                     age: user.age,
//                     first_name: user.first_name,
//                     last_name: user.last_name
//                 };
//                 res.redirect('/products');
//             }else {
//                 return res.status(401).json({message: 'contraseña no valida'});
//             }
//         }else {
//             return res.status(400).json({message: `usuario con email ${email} no encontrado`})
//         }
//     } catch (error) {
//         res.status(400).json({message: error});
//     }
// });

router.post('/login', passport.authenticate('login', {
    failureRedirect: 'api/sessions/faillogin'
}), async (req, res)=>{
    if(!req.user) return res.status(400).send({status: 'error', message: 'credenciales invalidas'});
    
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        age: req.user.age,
    };
    req.session.login = true;
    res.redirect('/products');
});

router.get('/logout',(req, res)=>{
    try {
        if (req.session.login) {
            req.session.destroy();
        }
        res.redirect("/login");

    } catch (error) {
        res.status(500).json({message: error});
    }
});

router.get('faillogin', async (req, res) => {
    res.json({message: 'fallo la estrategia'});
});

module.exports = router;