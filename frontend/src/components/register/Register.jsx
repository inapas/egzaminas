import React, {useState} from 'react'
import { validation } from './validation'
import axios from 'axios'

const Register = ({submitForm}) => {

  const [success, setSuccess] = useState(false);

  const [values, setValues]=useState({
    name:"",
    email:"",
    password:"",
    role:"student"
  })

  const [errors,setErrors]=useState({

  })

  const handleFormSubmit =async(event)=>{
    // event.preventDefault()
    setErrors(validation(values))
    console.log(values);

    await axios.post('http://localhost:5000/users/register', values)
      .then(response=>{
        console.log(response);
        setSuccess(true)
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
                    <h1>You successfuly registered as a student!</h1>
                    <br />
                    <p>
                        <a href="/login">Log In</a>
                    </p>
                </section>
  ) : (
  <div className='main'>
    <div className="container-reg">
      <div className="app-wrapper">
        <div>
          <h2 className="title">Create Account</h2>
        </div>
        <form className="form-wrapper">
          <div className="name">
            <label className="label">Name</label>
            <input type="text" className="input" name="name" value={values.name} onChange={event => handleChange(event)}/>
            {errors.name && <p className='error'>{errors.name}</p>}
          </div>
          <div className="email">
            <label className="label">Email</label>
            <input type="text" className="email" name="email" value={values.email} onChange={event => handleChange(event)}/>
            {errors.email && <p className='error'>{errors.email}</p>}
          </div>
          <div className="password">
            <label className="label">Password</label>
            <input type="password" className="password" name="password" value={values.password} onChange={event => handleChange(event)}/>
            {errors.password && <p className='error'>{errors.password}</p>}
          </div>
          <div>
            <button type='button' className='submit' onClick={()=>handleFormSubmit()}>Sing Up</button>
          </div>
        </form>
      </div>
    </div>
  </div> 
  )}
  </>
  )
}

export default Register