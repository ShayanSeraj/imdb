
import Joi from 'joi-browser'
import InputForm from './InputForm'
import Select from './Select'


export const Form = (schema, accounts, setAccounts, errors, setErrors , doSubmit) => {


    const validate = () => {

        const options = { abortEarly: false }
        const { error } = Joi.validate(accounts, schema, options)
        if (!error) {
            return null
        }
        const err = {}
        for (let item of error.details) {
            err[item.path[0]] = item.message
        }
        return err
    }

    const validateProperty = ({ name, value }) => {
        const obj = { [name]: value }
        const schemaNew = { [name]: schema[name] }
        const { error } = Joi.validate(obj, schemaNew)
        return error ? error.details[0].message : null
    }

    const handleChange = ({ currentTarget: input }) => {
        const err = { ...errors }
        const errorMessage = validateProperty(input)
        if (errorMessage) {
            err[input.name] = errorMessage
        } else {
            delete err[input.name]
        }

        const account = { ...accounts }
        account[input.name] = input.value
        setAccounts(account)
        setErrors(err)

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const err = validate()
        setErrors(err || {})

        if (err) {
            return
        }
        doSubmit()
    }


    const renderButton = (label) => {
        return (
            <button disabled={validate()} className="btn btn-primary my-2">{label}</button>
        )
    }

    const renderSelect = (name , label , options)=>{
        return (
            <Select name={name} value={accounts[name]}
            label={label}  options={options}
            onChange={handleChange} errors={errors[name]} />
        )
    }

    const renderInput = (name, label, type, focus) => {
        return (
            <InputForm
                name={name} label={label} type={type}
                onChange={handleChange} autofocus={focus}
                value={accounts[name]} error={errors[name]} />
        )
    }


    return { handleSubmit, renderButton, renderInput , renderSelect }
}