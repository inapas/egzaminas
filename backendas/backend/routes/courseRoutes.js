const express = require('express')
const router = express.Router()
const {getCourses, postCourses, putCourses, deleteCourses} = require('../controllers/courseController')

router.get('/', getCourses)
router.post('/', postCourses)
router.put('/:id', putCourses)
router.delete('/:id', deleteCourses)

module.exports = router