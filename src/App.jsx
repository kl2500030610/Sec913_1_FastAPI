import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { imgurl } from './lib';
import './App.css';

const App = () => {
    const [isSignin, setIsSignIn] = useState(true);
    const finput = useRef();

    const [signinData, setSigninData] = useState({
        username: "",
        password: ""
    });

    const [signupData, setSignupData] = useState({
        username: "",
        password: ""
    });

    useEffect(()=>{
        finput.current.focus();
    },[]);

    function switchWindow(){
        setIsSignIn(prev => !prev);
        setTimeout(() => finput.current.focus(), 0);
    }

    // ================= SIGNIN =================
    async function signin(){
        try {
            const res = await axios.post("http://127.0.0.1:8000/login", signinData);

            if(res.data.UserStatus === 1){
                alert(`Login Success\nRole: ${res.data.UserRole}\nPending: ${res.data.UserPendingTask}`);
            } else {
                alert("Invalid credentials");
            }

        } catch (err) {
            console.error(err);
            alert("Error connecting to server");
        }
    }

    // ================= SIGNUP =================
    async function signup(){
        try {
            const res = await axios.post("http://127.0.0.1:8000/register", signupData);
            alert(res.data.message);
        } catch (err) {
            console.error(err);
            alert("Error registering user");
        }
    }

    return (
        <div className='app'>
            <div className='container' key={isSignin ? "signin" : "signup"}>

                <div className='container-header'>
                    <label>{isSignin ? "Login": "Create Account"}</label>
                    <img src={imgurl + "logo.png"} alt='' />
                </div>

                <div className='container-content'>

                    {isSignin ? 
                        <>
                        <label>Username*</label>
                        <div className='input-group'>
                            <img src={imgurl + "user.png"} />
                            <input
                                type='text'
                                ref={finput}
                                placeholder='Enter username'
                                onChange={(e)=>setSigninData({...signinData, username: e.target.value})}
                            />
                        </div>

                        <label>Password*</label>
                        <div className='input-group'>
                            <img src={imgurl + "padlock.png"} />
                            <input
                                type='password'
                                placeholder='Enter password'
                                onChange={(e)=>setSigninData({...signinData, password: e.target.value})}
                            />
                        </div>

                        <button onClick={signin}>Let's start</button>

                        <label onClick={switchWindow}>
                            Don't have an account? <span>Sign up</span>
                        </label>
                        </>
                    :
                        <>
                        <label>Username*</label>
                        <div className='input-group'>
                            <img src={imgurl + "user.png"} />
                            <input
                                type='text'
                                ref={finput}
                                placeholder='Enter username'
                                onChange={(e)=>setSignupData({...signupData, username: e.target.value})}
                            />
                        </div>

                        <label>Password*</label>
                        <div className='input-group'>
                            <img src={imgurl + "padlock.png"} />
                            <input
                                type='password'
                                placeholder='Enter password'
                                onChange={(e)=>setSignupData({...signupData, password: e.target.value})}
                            />
                        </div>

                        <button onClick={signup}>Register</button>

                        <label onClick={switchWindow}>
                            Already have an account? <span>Sign in</span>
                        </label>
                        </>
                    }

                </div>

                <div className='container-footer'>
                    Copyright @ 2026. All rights reserved.
                </div>
            </div>
        </div>
    );
}

export default App;