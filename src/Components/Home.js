import React from 'react'
import { useNavigate } from 'react-router-dom';
import './inventory.css'



export default function Home() {

    const navigate = useNavigate();
    const pageChanger = (path) => navigate(path);

  return (
    <div className='bg2'>

        <button className='adminBtn'onClick={() => pageChanger('/comp/Admin')}>Admin</button>
        <button className='staffBtn'onClick={() => pageChanger('/comp/Staff')}>Staff</button>


    </div>
  )
}
