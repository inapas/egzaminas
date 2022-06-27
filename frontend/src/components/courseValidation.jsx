export const courseValidation = (values) => {

    let errors={}

    if(!values.courseName){
        errors.courseName="Course name is required"
    }
    if(!values.courseDescription){
        errors.courseDescription="course description is required"
    }
    if(!values.coursePhoto){
        errors.coursePhoto="please upload photo"
    }
    if(values.category){
        errors.category="please select category"
    }

  return errors
}