import React from 'react'

export default function InputForm({ name , label, autofocus, error , ...rest }) {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input 
                {...rest}
                name={name}
                autoFocus={autofocus}
                id={name}
                className="form-control my-2" />
                {error && <div className="alert alert-danger">{error}</div> }
        </div>
    )
}
