import React, {useState, useEffect} from 'react'
import axios from 'axios'
import test from './test.png'
import "./home.css"

const AdminHome = () => {

  const [users, setUsers] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
   fetch('http://localhost:5000/users')
    .then(response =>{
      return response.json()
    })
    .then(data=>{
     setUsers(data)
     console.log(data)
    })
  }, []);

  const deleteUser = async (users)=>{
    
    await axios.delete(`http://localhost:5000/users/${users._id}`)
    .then(response=>{
      console.log(response);
      window.location.reload(true)
    })
    .catch(error=>{
      console.log(error);
    })

  }

  //neveikia kolkas///////
  const updateUser = async (users)=>{
    users.courseDescription = "New name"
    await axios.put(`http://localhost:5000/users/${users._id}`)
    const usersClone = [...users]
    const index = usersClone.indexOf(users)
    usersClone[index] = {...users}
    setUsers(usersClone)
  }

  return(
    <div>
    <div className="card-container">
      {users.map((users)=>{
          
            return(
              <div className="card" key={users._id}>
                  <img src={test} alt={users.coursePhoto} />
                  <div className="container">
                    <h2>{users.name}</h2>
                    <p>email: {users.email}</p>
                    <h4>{users.role}</h4>
                  </div>
                  <button className="button-32" onClick={()=>updateUser(users)}>Edit</button>
                  <button className="button-32" onClick={()=>deleteUser(users)}>Delete</button>
              </div>     
            )
          
      })}
    </div>
    </div>
  )

};

export default AdminHome

