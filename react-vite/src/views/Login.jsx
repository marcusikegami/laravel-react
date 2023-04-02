import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import axiosClient from '../axios-client';
import { useStateContext } from '../context/ContextProvider';

export default function () {
  
    const emailRef = useRef();
    const passwordRef = useRef();
    const [errors, setErrors] = useState(null);
    const {setUser, setToken} = useStateContext();

    const onSubmit = (e) => {
      e.preventDefault();
      const payload = {
          email: emailRef.current.value,
          password: passwordRef.current.value,
      }
      setErrors({});
      axiosClient.post('/login', payload)
          .then(({data}) => {
              setUser(data.user);
              setToken(data.token);
          }) // There is no need to redirect the user to a specific page because the useStateContext function will redirect the user to the dashboard page
          .catch(error => {
            debugger;
            console.error;
              const response = error.response;
              if(response && response.status === 422) {
                if (response.data.errors) {
                  setErrors(response.data.errors);
                } else {
                  setErrors({
                    email: [response.data.message]
                  })
                }
              }
          });
  }

    return (
        <div className="login-signup-form animated fadeInDown">
          <div className="form">
            <form onSubmit={onSubmit}>
              <h1 className="title">Login into your account</h1>
    
              {errors &&
                <div className="alert">
                    {Object.keys(errors).map(key => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>
              }
    
              <input ref={emailRef} type="email" placeholder="Email"/>
              <input ref={passwordRef} type="password" placeholder="Password"/>
              <button className="btn btn-block">Login</button>
              <p className="message">Not registered? <Link to="/signup">Create an account</Link></p>
            </form>
          </div>
        </div>
      )
}