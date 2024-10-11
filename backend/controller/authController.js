const User = require('../models/user');
const jwt = require('jsonwebtoken');


 const createYourToken = (_id)=>{
    return jwt.sign({_id}, process.env.SECRET,{expiresIn:'3d'})
 }

module.exports.signupFucntion = async(req,res)=>{
const {email,password} = req.body;
    try {
        const data = await User.signupFunc(email,password)
        const token = createYourToken(data._id);
        res.status(200).json({email,token});
        
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

module.exports.loginFunction = async(req,res)=>{
    const {email,password} = req.body;
    try {
        const data = await User.loginFunc(email,password);
        const token = createYourToken(data._id);
        res.status(200).json({email,token});
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}