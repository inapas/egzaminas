import React, {useState} from 'react'
import {courseValidation} from './courseValidation'
import axios from 'axios'

const CreateCourse = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const [values, setValues]=useState({
    user:user._id,
    userName:user.name,
    courseName:"",
    courseDescription:"",
    coursePhoto:"",
    category:""
  })

  const [success, setSuccess] = useState(false);

  const [errors,setErrors]=useState({

  }) 

  const handleFormSubmit = async()=>{
    setErrors(courseValidation(values))
    console.log(values);

    await axios.post('http://localhost:5000/courses', values)
    .then(response=>{
      console.log(response);
      setSuccess(true);
    })
    .catch(error=>{
      console.log(error);
    })
  }

  const handleChange =(event)=>{
    setValues({
      ...values,
      [event.target.name]:  event.target.value,
    })
  }
  return (
    <>
    {success ? (
                <section>
                    <h1>You successfuly created a course!</h1>
                    <br />
                    <p>
                        <a href="/profile">Your Profile</a>
                    </p>
                </section>
  ) : (
    <div className='main'>
    <div className="container-reg">
      <div className="app-wrapper">
        <div>
          <h2 className="title">Create Course</h2>
        </div>
        <form className="form-wrapper">
          <div className="name">
            <label className="label">Course Title</label>
            <input type="text" className="input" name="courseName" value={values.courseName} onChange={event => handleChange(event)}/>
            {errors.courseName && <p className='error'>{errors.courseName}</p>}
          </div>
          <div className="category">
            <label className="label">Category</label>
            <select type="text" className="text" name="category" value={values.category} onChange={event => handleChange(event)}>
              <option selected values=""> -- select an option -- </option>
              <option values="javascript">JavaScript</option>
              <option values="python">Python</option>
              <option values="java">Java</option>
              <option values="php">php</option>  
            </select>
          </div>
          <div className="courseDescription">
            <label className="label">Description</label>
            <input type="text" className="courseDescription" name="courseDescription" value={values.courseDescription} onChange={event => handleChange(event)}/>
            {errors.courseDescription && <p className='error'>{errors.courseDescription}</p>}
          </div>
          <div className="coursePhoto">
            <label className="label">Upload Photo</label>
            <input type="text" className="coursePhoto" name="coursePhoto" value={values.coursePhoto} onChange={event => handleChange(event)}/>
            {errors.coursePhoto && <p className='error'>{errors.coursePhoto}</p>}
          </div>
          <div>
            <button type='button' className='submit' onClick={()=>handleFormSubmit()}>Upload Course</button>
          </div>
        </form>
      </div>
    </div>
  </div> 
   )}
    </>
    )
}

//courseName
//courseDescription
//coursePhoto

export default CreateCourse