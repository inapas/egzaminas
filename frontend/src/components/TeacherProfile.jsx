import React, {useState, useEffect} from 'react'
import axios from 'axios'
import test from './test.png'
import "./home.css"

const TeacherProfile = () => {

  const [courses, setCourses] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'))


  

  useEffect(() => {
   fetch('http://localhost:5000/courses')
    .then(response =>{
      return response.json()
    })
    .then(data=>{
     setCourses(data)
     //console.log(data)
    })
  }, []);

//console.log(courses);

 const deleteCourse = async (courses)=>{
    
    await axios.delete(`http://localhost:5000/courses/${courses._id}`)
    .then(response=>{
      console.log(response);
      window.location.reload(true)
    })
    .catch(error=>{
      console.log(error);
    })

  }


//neveikia kolkas///////
  const updateCourse = async (courses)=>{
    courses.courseDescription = "New name"
    await axios.put(`http://localhost:5000/courses/${courses._id}`)
    const coursesClone = [...courses]
    const index = coursesClone.indexOf(courses)
    coursesClone[index] = {...courses}
    setCourses(coursesClone)
  }
  console.log(courses);
//////////////////////////////
  return(
    <div>
    <div>
        <div className="profile">
          <div className="pf-pic">
            <img src="" alt="" />
          </div>
          <div className="pf-info">
            
            <h2>Name: {user.name}</h2>
            <h2>Email: {user.email}</h2>
          </div>
        </div>
      </div>
    <div className="card-container">
      {courses.map((courses)=>{
          if(user._id === courses.user){
            return(
              <div className="card" key={courses._id}>
                  <img src={test} alt={courses.coursePhoto} />
                  <div className="container">
                    <h2>{courses.courseName}</h2>
                    <p>category: {courses.category}</p>
                    <h4>{courses.courseDescription}</h4>
                  </div>
                  <button className="button-32" onClick={()=>updateCourse(courses)}>Edit</button>
                  <button className="button-32" onClick={()=>deleteCourse(courses)}>Delete</button>
              </div>     
            )
          }
      })}
    </div>
    </div>
  )
}

export default TeacherProfile