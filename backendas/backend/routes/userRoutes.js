const express = require('express')
const router = express.Router()
const {registerUser, 
    loginUser, 
    getMe, 
    registerTeacher,
    getUsers,
    deleteUser} = require('../controllers/userController')

const {protect} = require('../middleware/authMiddleware')


router.post('/register', registerUser)
router.post('/becometeacher', registerTeacher)
router.post('/login', loginUser)
router.get('/', getUsers)
router.get('/me', protect, getMe)
router.delete('/:id', deleteUser)



module.exports = router