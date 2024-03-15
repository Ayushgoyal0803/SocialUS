import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter,Route, RouterProvider } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Posts from './Posts';
import Counter from './Counter';
import ViewPosts from './ViewPosts';
import Registeration from './Registeration';
import CreatePost from './CreatePost';
import ContactUs from './ContactUs';

const router = createBrowserRouter([
  {
    path : '/',
    element : <Home></Home>,
    errorElement : <h1>Page Not Found</h1>
  },
  {
    path : '/login',
    element : <Login></Login>
  },
  {
    path : '/post/:postId',
    element : <Posts></Posts>
  },
  {
    path : '/register',
  element : <Registeration/>
  },
  {
    path : '/posts',
    element : <ViewPosts/>
  },
  {
    path : '/Counter',
    element : <Counter></Counter>
  },
  {
    path : '/createpost',
    element : <CreatePost></CreatePost>
  },
  {
    path : '/contacts',
    element : <ContactUs></ContactUs>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router = {router}></RouterProvider>
  </React.StrictMode>
);