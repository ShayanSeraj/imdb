import { useState } from 'react'
import Joi from 'joi-browser'
import { Form } from './Form'


export default function LoginForm() {

    const [accounts, setAccounts] = useState({ username: '', password: '' })
    const [errors, setErrors] = useState({})

    const schema = {
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().label("Password")
    }

    const doSubmit = () => {

    }
    const { handleSubmit, renderButton, renderInput } = Form(schema, accounts, setAccounts, errors, setErrors, doSubmit)

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                {renderInput('username', 'Username', 'text', true)}
                {renderInput('password', 'Password', 'password')}
                {renderButton('Login')}
            </form>
        </div>
    )
}
