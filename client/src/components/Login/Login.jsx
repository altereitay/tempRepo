import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../Login/Login.css"





const Login = (props) => {
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const onButtonClick = async () => {
    setEmailError('');
    setPasswordError('');

    if ('' === email) {
        setEmailError('Please enter your email');
        return;
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        setEmailError('Please enter a valid email');
        return;
    }

    if ('' === password) {
        setPasswordError('Please enter a password');
        return;
    }

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const result = await response.json();

        if (!response.ok) {
            if (response.status === 401) {
                setPasswordError(result.error);
            } else if (response.status === 400) {
                setEmailError(result.error);
            } else {
                throw new Error("Network response was not ok");
            }
            setPassword("");
        } else {
            nav("/Home");
        }
    } catch (error) {
        console.error('Error:', error);
        setEmailError('Something went wrong, please try again later');
    }
};


  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Login</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
          type='password'
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'} />
      </div>
    </div>
  )
}

export default Login