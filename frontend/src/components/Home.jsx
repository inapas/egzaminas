import React, { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";
import test from './test.png'
import "./home.css"

const Home = () => {
  //const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'))
  const [category, setCategory] = useState()

  const categories = [
    'JavaScript',
    'Python',
    'Java',
    'php'
  ]
  
  useEffect(() => {
   fetch('http://localhost:5000/courses')
    .then(response =>{
      return response.json()
    })
    .then(data=>{
     setCourses(data)
     console.log(data)
    })
  }, []);

  const handleBuy = (courses) =>{
    console.log(courses);
  }

  return(
    <div>
    <div className="card-container">
      {courses.map((courses)=>{
        return(
          <div className="card" key={courses._id}>
              <img src={test} alt={courses.coursePhoto} />
              <div className="container">
                <h2>{courses.courseName}</h2>
                <p>category: {courses.category}</p>
                <h4>{courses.courseDescription}</h4>
              </div>
              {!user || user._id !== courses.user?(<button className="button-32" onClick={()=> handleBuy(courses)}>Get Course</button>):<h3>Thats your course!</h3>}
          </div>
        )
      })}
    </div>
    </div>
  )

};
//courses.courseName
export default Home;