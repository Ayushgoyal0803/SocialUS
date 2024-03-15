// import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import './CSS/home.css'
import logo from './images/v_people.png'

import Navbar from './Navbar'


export default function Home(){
   
    return (
        <div>
            <Navbar/>
            <div className='body'>
                <div className='body1'>
                    <p className='head1'>Connect and Share with SOCIALUP</p>
                    <p className='head2'>Your Trusted Companion in Digital World</p><br/><br/>
                    <Link className='part1' to="/login">Login</Link>
                    <Link className='part2' to="/register">Sign-Up</Link>
                </div>
                <div className='body2'>
                    <img className='img1' src={logo} alt='Internal Error'/>
                </div>
            </div>
        </div>
    )
}