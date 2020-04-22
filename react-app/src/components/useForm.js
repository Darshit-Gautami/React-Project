import React, { useState, useEffect } from "react";

const useForm = (initialFieldValues, validate, setCurrentId) => {
    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})
    var fieldValue=null; 
    const handleInputChange = e => {
        debugger
        const { name, value } = e.target
        
        if(name === "cost")
        {
            fieldValue = { [name]: parseInt(value)}    
        }
        else if(name === 'category')
        {
            fieldValue = { [name]:value}    
        }
        else
        {
            fieldValue = { [name]: value }
        }
        setValues({
            ...values,
            ...fieldValue
        })
        validate(fieldValue)
    }
    
    const handlecheckedchange = e =>{

        const { name, value ,checked } = e.target
            
        const fieldValue = { [name]: checked == true ? parseInt(1):parseInt(0)}
        setValues({
            ...values,
            ...fieldValue
        })
        validate(fieldValue)
        
    }

    const resetForm = () => {
        setValues({
            ...initialFieldValues
        })
        setErrors({})
        setCurrentId(0)
    }

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        handlecheckedchange,
        resetForm
    };
}

export default useForm;