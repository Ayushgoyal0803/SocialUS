import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./CSS/login.css"

export default function Login() {
  const navigate = useNavigate()
  const [UserName ,setUsername]= useState('')
  const [Password ,setPassword]= useState('')
  const [loginError ,setLoginError]= useState('')
//   const btnHandeller = ()=>{
//     navigate("/post") 
//  }
const handleUserName = (event)=>{
  setUsername(event.target.value)
}
const handlePassword = (event)=>{
  setPassword(event.target.value)
}
const reg=()=>{
  navigate('/register')
}
const handleForm = async (event) =>{
  try {
    event.preventDefault()
    const response = await axios.post("http://localhost:3000/login",{
      username : UserName,
      password : Password
    })
    if(response.status==200){
      localStorage.setItem("jwtToken", response.data.token)
      navigate('/createpost')
    }
  } catch (error) {
    setLoginError("Invalid Username or Password")
  }
}
  return (
    <div className='loginContainer'>
      <h1 className='loginText'>Login</h1>
      <form onSubmit = {handleForm}>
        <label>UserName :</label>
        <input type='text' value={UserName} onChange={handleUserName} required></input><br></br><br></br>
        <label>Password :</label>
        <input type='password' value={Password} onChange={handlePassword} required></input><br></br><br></br>
        <button className='submitButton'>Submit</button>
        <h2>or</h2>
        <button onClick={reg} className='registrationButton'>Registeration</button>
      </form>
      <h2>{loginError}</h2>
      {/* <button onClick={btnHandeller}>Login</button> */}
    </div>
  )
}
