import React, { useEffect,useState } from 'react'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
import "./CSS/allPosts.css"
import post from './images/post.png'
import Navbar from './Navbar'
export default function ViewPosts() {
  const [apiData,setApiData]=useState([])
  const [loading, isLoading] = useState(true)
  const [apiError, setApiError] = useState(false)
  const navigate = useNavigate()
    useEffect( ()=>{
    //  axios.get("https://jsonplaceholder.typicode.com/posts")
    if (localStorage.getItem("jwtToken")) {
      (async()=>{
         try
         {
            const response = await axios.get("http://localhost:3000/posts",{
              headers: {
                authorization : "Bearer " + localStorage.getItem("jwtToken")
              }
            })
            
            console.log(response);
            setApiData(response.data)
            isLoading(false)
          }
          catch (error) {
            setApiError(true)
          }
      })()
    } else {
      navigate('/login')
    }
    },[])
    
    useEffect(() => {
      const cards = document.querySelectorAll('.postCard');
      cards.forEach(card => {
        card.classList.add('animate');
      });
    }, [apiData]);
    
    const displayData = apiData.map((data)=>(
      <div className="postCard" key={data.id}>
      <div className="postContent">
        <img src={post} className='imagepost'></img>
        <h2 className="postTitle">{data.title}</h2>
        <p className="postDescription">{data.content}</p>
      </div>
    </div>
    ))

    if(loading)
    {
      return <h1>Loading.......</h1>
    }
    if(apiError)
    {
      return <h1>Something went wrong</h1>
    }
  return (
    <>
      <Navbar />
    <div className='mainContainer'>
      <h1>All Posts</h1>
      <div className="postContainer">
        {displayData}
      </div>
    </div>
    </>
  )
}