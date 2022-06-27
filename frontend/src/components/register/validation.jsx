export const validation = (values) => {

    let errors={}

    if(!values.name){
        errors.name="name is required"
    }
    if(!values.email){
        errors.email="email is required"
    }else if(!/\S+@\S+\.\S+/.test(values.email)){
        errors.email="Email is invalid"
    }
    if(!values.password){
        errors.password="password is required"
    }else if(values.password.lenght < 5){
        errors.password="password must contain more than 5 characters"
    }

  return errors
}