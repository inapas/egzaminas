const asyncHandler = require('express-async-handler')

const Course = require('../model/courseModel')

const getCourses = asyncHandler(async (req, res)=>{
    const courses = await Course.find()

    res.status(200).json(courses)
})

const postCourses = asyncHandler(async (req, res)=>{
    if(!req.body.user, !req.body.category, !req.body.courseDescription , !req.body.courseName, !req.body.coursePhoto){
        res.status(400)
        throw new Error('Please fill all fields')
    }

    const courses = await Course.create({
        user: req.body.user,
        courseName: req.body.courseName,
        coursePhoto: req.body.coursePhoto,
        courseDescription: req.body.courseDescription,
        category:req.body.category,

        
    })
    res.status(200).json(courses)
})

const putCourses = asyncHandler(async (req, res)=>{
    const course = await Course.findById(req.params.id)

    if(!course){
        res.status(400)
        throw new Error('course not found')
    }

    const updateCourse = await Course.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updateCourse)
})

const deleteCourses = asyncHandler(async (req, res)=>{
    const course = await Course.findById(req.params.id)

    if(!course){
        res.status(400)
        throw new Error('course not found')
    }

    await course.remove()

    res.status(200).json( {id : req.params.id})
})

module.exports = {
    getCourses,
    postCourses,
    putCourses,
    deleteCourses
}