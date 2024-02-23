const express = require('express');
const UserModel = require('../dao/models/user.model');
const router = express.Router();
    
router.post('/',async(req, res)=>{
    const {first_name, last_name, email, password, age} = req.body;
    try {
        const userExists = await UserModel.findOne({email});
        if(userExists){
            return res.status(400).send({error: 'email ya registrado'});
        }
        const newUser = await UserModel.create({first_name, last_name, email, password, age});
        req.session.login = true;
        req.session.user = {
            ...newUser._doc
        }
        res.status(200).json({
            message: 'Usuario creado con éxito',
            user: {first_name, last_name, email, password, age}
    });
    } catch (error) {
        res.status(400).json({message: 'error al crear el usuario ' + error})
    }
});

module.exports = router;