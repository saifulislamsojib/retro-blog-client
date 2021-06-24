import { useState } from "react";

const useForm = required => {
    const [inputData, setInputData] = useState({});

    const [error, setError] = useState({});

    const handleInput = e => {
        const { value, name } = e.target;
        const req = required.indexOf(name)!==-1;
        if (req&&name==='email') {
            const isValid = /\S+@\S+\.\S+/.test(value);
            if (isValid) {
                const newError = {...error};
                newError[name] = false;
                setError(newError);
            }
            else {
                const newError = {...error};
                newError[name] = true;
                setError(newError);
            }
        }
        else if (req&&name==='password') {
            const isValid = value.length>=6;
            if (isValid) {
                const newError = {...error};
                newError[name] = false;
                setError(newError);
            }
            else {
                const newError = {...error};
                newError[name] = true;
                setError(newError);
            }
        }
        else if (req&&name==='confirmPassword') {
            const isValid = value.length>=6;
            const match = inputData.password === value;
            if (isValid&&match) {
                const newError = {...error};
                newError[name] = false;
                setError(newError);
            }
            else {
                const newError = {...error};
                newError[name] = true;
                setError(newError);
            }
        }
        else if (req&&value.length<1) {
            const newError = {...error};
            newError[name] = true;
            setError(newError);
        }
        else{
            const newError = {...error};
            newError[name] = false;
            setError(newError);
        }
        const newInputData = {...inputData}
        newInputData[name] = value;
        setInputData(newInputData);
    }

    const handleSubmit = submit => e => {
        e.preventDefault();
        required.forEach(item => {
            if (!inputData[item]) {
                setError(previousError => ({...previousError, [item]: true}));
            }
        })
        const filtered = required.filter(item => !inputData[item]);
        if (!filtered.length){
            submit(inputData);
            e.target.reset();
        }
    }

    return {
        handleInput,
        handleSubmit,
        error
    }
};

export default useForm;