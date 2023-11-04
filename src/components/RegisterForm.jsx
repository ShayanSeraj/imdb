import Joi from 'joi-browser'
import { Form } from './Form'
import { useState } from 'react'

export default function RegisterForm() {

    const [accounts, setAccounts] = useState({username : '' , password : '', name:''})
    const [errors, setErrors] = useState({})

    const schema = {
        username : Joi.string().required().email().label("Username"),
        password : Joi.string().required().min(5).label("Password"),
        name : Joi.string().required().label("Name")
    }
    const doSubmit = ()=>{
      
    }
    const { handleSubmit, renderButton, renderInput } = Form(schema, accounts , setAccounts , errors , setErrors , doSubmit)

  return (
    <div>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            {renderInput('username','Username','text',true)}
            {renderInput('password','Password','password',false)}
            {renderInput('name','Name','text',false)}
            {renderButton('Register')}
        </form>
    </div>
  )
}
