const express = require('express');
const userModel = require('../dao/models/user.model');
const router = express.Router();

router.post('/login', async(req, res)=>{
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if(user){
            if(user.password === password){
                req.session.login = true;
                req.session.user = {
                    email: user.email,
                    age: user.age,
                    first_name: user.first_name,
                    last_name: user.last_name
                };
                res.redirect('/profile');
            }else {
                return res.status(401).json({message: 'contraseña no valida'});
            }
        }else {
            return res.status(400).json({message: `usuario con email ${email} no encontrado`})
        }
    } catch (error) {
        res.status(400).json({message: error});
    }
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

module.exports = router;