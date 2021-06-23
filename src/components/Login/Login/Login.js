import { EyeIcon, EyeOffIcon, LockClosedIcon } from '@heroicons/react/outline';
import React, { useContext, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useHistory, useLocation } from 'react-router-dom';
import swal from 'sweetalert';
import { context } from '../../../App';
import googleIcon from '../../../images/google.svg';
import Navbar from '../../Shared/Navbar/Navbar';
import { createUser, googleLogin, signingUser } from '../authManager';
import './Login.css';

const Login = () => {

    const { setLoggedInUser } = useContext(context);

    const [newUser, setNewUser] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const [inputData, setInputData] = useState({});

    const [error, setError] = useState({});

    const history = useHistory();

    const location = useLocation();

    const { from } = location.state || { from: { pathname: "/" } };

    const handleShowPassword = () => setShowPassword(preValue=> !preValue);

    const handleInput = (e, name) => {
        const { value } = e.target;
        if (name==='email') {
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
        else if (name==='password') {
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
        else if (name==='confirmPassword') {
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
        else if (value.length<1) {
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

    const setUser = user => {
        if(!user.message){
            setLoggedInUser(user);
            history.replace(from);
            swal("Logged In", "Successfully Logged In", "success");
        }
        else{
            swal("Error", user.message, "error");
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        const { email, password, name, confirmPassword } = inputData;
        const errorData = Object.values(error);
        const found = errorData.find(data => data===true);
        const login = !error.password&&!error.email;
        if (newUser){
            if (errorData.length===4&&!found) {
                toast.promise(
                createUser(email, password, name)
                .then(user => setUser(user)),
                {
                    loading: 'Loading...',
                    success: <b>Loading Finished</b>
                })
                e.target.reset();
            }
        }
        else{
            if (email&&password&&login) {
                toast.promise(
                signingUser(email, password)
                .then(user => setUser(user)),
                {
                    loading: 'Loading...',
                    success: <b>Loading Finished</b>
                })
                e.target.reset();
            }
        }

        if (!email) {
            setError(previousError => ({...previousError, email: true}));
        }
        if (!password) {
            setError(previousError => ({...previousError, password: true}));
        }
        if (!name){
            setError(previousError => ({...previousError, name: true}));
        }
        if (!confirmPassword){
            setError(previousError => ({...previousError, confirmPassword: true}));
        }
    }

    const handleGoogle = () => {
        toast.promise(
        googleLogin()
        .then(user => setUser(user)),
        {
            loading: 'Loading...',
            success: <b>Loading Finished</b>
        })
    }

    return (
        <div className='min-h-screen'>
            <Toaster />
            <Navbar />
            <div className="login-container flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-7">
                    <img
                        className="mx-auto h-16 w-16 rounded-full"
                        src="https://cdn.dribbble.com/users/68544/screenshots/2129380/book.png"
                        alt="retro-blog"
                    />
                    <h2 className="text-center text-3xl font-extrabold text-gray-900">{newUser?"Create An Account":"Sign in"}</h2>
                    <form onSubmit={handleSubmit} className="mt-8 space-y-6" action="#" method="POST">
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="">
                           {newUser&&
                            <input
                                name="name"
                                type="text"
                                autoComplete="user-name"
                                className="block w-full p-3 border-b-2 border-gray-600 rounded-md placeholder-gray-500 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Name"
                                onChange={e => handleInput(e, 'name')}
                            />}
                            {newUser&&error.name&&<span className="text-red-500 ml-2 mt-2 block">Name is Required</span>}
                            <input
                                name="email"
                                type="email"
                                autoComplete="email"
                                className="mt-5 block w-full p-3 border-b-2 border-gray-600 rounded-md placeholder-gray-500 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Email address"
                                onChange={e => handleInput(e, 'email')}
                            />
                            {error.email&&<span className="text-red-500 block mt-2 ml-2">Valid email is Required</span>}
                            <div className="relative">
                            <input
                                name="password"
                                type={showPassword?"text":"password"}
                                autoComplete="current-password"
                                className="mt-5 block w-full p-3 border-b-2 border-gray-600 rounded-md placeholder-gray-500 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Password"
                                onChange={e => handleInput(e, 'password')}
                            />
                            {   showPassword?
                                <EyeIcon onClick={handleShowPassword} className="h-6 w-6 absolute top-1/2 transform -translate-y-2/4 right-1 z-50 text-indigo-500 group-hover:text-indigo-400 cursor-pointer" aria-hidden="true" />
                                :<EyeOffIcon onClick={handleShowPassword} className="h-6 w-6 absolute top-1/2 transform -translate-y-2/4 right-1 z-50 text-indigo-500 group-hover:text-indigo-400 cursor-pointer" aria-hidden="true" />
                            }
                            </div>
                            {error.password&&<span className="text-red-500 block mt-2 ml-2">Password is Required minimum 6 characters</span>}
                            {newUser&&
                            <div className="relative">
                                <input
                                name="confirmPassword"
                                type={showPassword?"text":"password"}
                                autoComplete="current-password"
                                className="mt-5 block w-full p-3 border-b-2 border-gray-600 rounded-md placeholder-gray-500 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Confirm Password"
                                onChange={e => handleInput(e, 'confirmPassword')}
                                />
                                {
                                showPassword?
                                    <EyeIcon onClick={handleShowPassword} className="h-6 w-6 absolute top-1/2 transform -translate-y-2/4 right-1 z-50 text-indigo-500 group-hover:text-indigo-400 cursor-pointer" aria-hidden="true" />
                                    :<EyeOffIcon onClick={handleShowPassword} className="h-6 w-6 absolute top-1/2 transform -translate-y-2/4 right-1 z-50 text-indigo-500 group-hover:text-indigo-400 cursor-pointer" aria-hidden="true" />
                                }
                            </div>}
                            {newUser&&error.confirmPassword&&<span className="text-red-500 block mt-2 ml-2">Confirm Password Not Matched</span>}
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                            <input
                                id="remember_me"
                                name="remember_me"
                                type="checkbox"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                            </div>

                            <div className="text-sm">
                            <a href="#d" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Forgot password?
                            </a>
                            </div>
                        </div>

                        <div>
                            <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                            </span>
                            {newUser?"Create An Account":"Sign in"}
                            </button>
                            <h2 className="text-center mt-5">
                                {newUser?"Already":"Don't"} have an account?
                                <span onClick={()=> setNewUser(preValue=> !preValue)} className="text-blue-500 ml-3 cursor-pointer">{newUser?"Login":"Create an account"}</span>
                            </h2>
                        </div>
                    </form>
                    <button className="block mx-auto rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800" onClick={handleGoogle}>
                        <img src={googleIcon} className='h-11' alt="" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;