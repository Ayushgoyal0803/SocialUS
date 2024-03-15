import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./CSS/createPost.css"
import Navbar from './Navbar'

export default function CreatePost() {
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [content , setContent] = useState('')
    useEffect(() =>{
        if(!localStorage.getItem("jwtToken")){
            navigate('/login')
        }
    },[])

    const handleTitle = (event) => {
        setTitle(event.target.value)
    }
    const handleContent = (event) => {
        setContent(event.target.value)
    }

    const handleFormData = async (event) =>{
        try {
            event.preventDefault()
            const response = await axios.post('http://localhost:3000/posts',{
                title : title,
                content : content
            },{
                headers : {
                    authorization : "Bearer " + localStorage.getItem("jwtToken")
                }
            })
            console.log(response)
            
            if(response.status===201){
                navigate('/posts')
            }
        } catch (error) {
            
        }
    }

  return (
    <>
    <Navbar />
    <div className="container">
        <h1>Create Post</h1>
        <form onSubmit={handleFormData}>
            <div className="labelContainer">
                <label>Title :</label>
                <input type='text' value={title} onChange={handleTitle} required></input>
            </div>
            <div className="inputContainer">
                <label>Content :</label>
                <textarea type='text' className='content' rows={10} cols={4} value={content} onChange={handleContent}></textarea>
            </div>
        <button type="submit">Submit</button>
        </form>
    </div>
    </>
    )
}