const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')


const registerUser = asyncHandler(async(req, res) =>{
    const {name, email, password, role} = req.body

    if(!name||!email||!password){
        res.status(400)
        throw new Error('Please add all fields')
    }

    // check if exists

    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    //hash pass

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // create user
    
    const user = await User.create({
        name,
        email,
        role,
        password: hashedPassword
    })
    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user. email,
            role: 'student',
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data ')
    }
})

///deleteuser

const deleteUser = asyncHandler(async (req, res)=>{
    const user = await User.findById(req.params.id)

    if(!user){
        res.status(400)
        throw new Error('user not found')
    }

    await user.remove()

    res.status(200).json( {id : req.params.id})
})

//teacher///////////////////////////////////////////
const registerTeacher = asyncHandler(async(req, res) =>{
    const {name, email, password, role} = req.body

    if(!name||!email||!password){
        res.status(400)
        throw new Error('Please add all fields')
    }

    // check if exists

    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    //hash pass

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // create user
    
    const user = await User.create({
        name,
        email,
        role,
        password: hashedPassword
    })
    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user. email,
            role: 'teacher',
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data ')
    }
})
//////////////////////////////////////////////////////

////////get users////
const getUsers = asyncHandler(async (req, res)=>{
    const users = await User.find()

    res.status(200).json(users)
})
/////

const loginUser = asyncHandler(async(req, res) =>{
    const {email, password}=req.body

    //check for email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid login data ')
    }

})


const getMe = asyncHandler(async(req, res) =>{
    res.json({message: 'User data'})
})


//JWT
const generateToken=(id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn: '90d'
    })
}

module.exports={
    registerTeacher,
    registerUser,
    loginUser,
    getUsers,
    getMe,
    deleteUser
}