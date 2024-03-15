import React, { useState } from 'react';
import axios from 'axios';
import './CSS/contact.css';
import Navbar from './Navbar';

function ContactUs() {
    

    const [Name ,setName]= useState('')
    const [Email ,setEmail]= useState('')
    const [Message ,setMessage]= useState('')

    const handleName = (event)=>{
        setName(event.target.value)
    }

    const handleEmail = (event)=>{
        setEmail(event.target.value)
    }

    const handleMessage = (event)=>{
        setMessage(event.target.value)
    }
    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData(prevState => ({
    //         ...prevState,
    //         [name]: value
    //     }));
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           const response =  await axios.post('http://localhost:3000/contacts', {
                name: Name,
                email : Email,
                message : Message
            })
            console.log(response);
            if(response.status === 201){
                alert('Contact form submitted successfully!');
                window.location.reload();
            }

            

        } catch (error) {
            console.error('Error submitting contact form:', error);
            alert('Error submitting contact form. Please try again later.');
        }
    };

    return (
        <>
        <Navbar />
        <div className="contact-container">
            <h1 className="contact-heading">Contact Us</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name" className="contact-label">Name:</label>
                <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={Name} 
                    onChange={handleName} 
                    className="contact-input"
                    required 
                    />
                
                <label htmlFor="email" className="contact-label">Email:</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={Email} 
                    onChange={handleEmail} 
                    className="contact-input"
                    required 
                    />
                
                <label htmlFor="message" className="contact-label">Message:</label>
                <textarea 
                    id="message" 
                    name="message" 
                    value={Message} 
                    onChange={handleMessage} 
                    className="contact-textarea"
                    rows="4" 
                    required 
                    />
                
                <button type="submit" className="contact-submit">Submit</button>
            </form>
        </div>
        </>
    );
}

export default ContactUs;
