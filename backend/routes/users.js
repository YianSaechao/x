const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/Users.js');

const router = express.Router();

router.post('/register', async (req, res) =>{
    
   try {
    const {username, password} = req.body;

    const user = await UserModel.findOne({username: username});
    
    if (user) {
        return res.json({message: 'User already exists'});
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();

    res.json({message: 'User registration successful'});

} catch (error) {
    console.error(error);
    res.status(500).json({message: 'User registration failed'})
    }

});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.json({ message: "User doesn't exist!" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.json({ message: "Username or Password is invalid" });
        }

        
        const token = jwt.sign({ username: user.username }, 'your_secret_key');
        res.json({ message: "Login successful", token });
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Login Failed!" });
    }
});


module.exports = { userRouter: router};

