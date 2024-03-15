import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./CSS/register.css"

export default function Registeration() {
    const [UserName ,setUsername]= useState('')
    const [Password ,setPassword]= useState('')
    const navigate = useNavigate()
    const handleUserName = (event)=>{
        setUsername(event.target.value)
      }
      const handlePassword = (event)=>{
        setPassword(event.target.value)
      }
      const handleForm = async (event) =>{
        try{
          event.preventDefault();
          const response = await axios.post("http://localhost:3000/register",{
              username :UserName,
              password : Password
          })
          console.log(response)
          if(response.status==201){
            navigate('/login')
          }
        }catch(error){
          
        }
      }
  return (
    <div className='registerContainer'>
        <h1 className='registerText'>Registeration</h1>
        <form onSubmit = {handleForm}>
        <label>UserName :</label>
        <input type='text' value={UserName} onChange={handleUserName}></input><br></br><br></br>
        <label>Password :</label>
        <input type='password' value={Password} onChange={handlePassword}></input><br></br><br></br>
        <button className='submitButton'>Submit</button>
        <h2>or</h2>
        <button a href="./login" className='orButton'>Login</button>
      </form>
    </div>
  )
}