import React, { useState } from 'react';
import Style from './Signin.module.css';


export default function Signin() {
  const [email, setEmail] = useState('');
  const [password,setPassword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://DESKTOP-D0S75ME:8000/authenticate',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      }),
    })
    .then((res)=> res.json())
    .then((data)=>{
      console.log('sei la como mas deu bom!', data);
    });
  };

  return (
    <>
      <form className={Style.classLogInform} onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor='exampleInputPassword1' className="form-label">Password</label>
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </>
  );
}