import React from 'react'
import { useNavigate } from 'react-router-dom';



export default function Home() {

    const navigate = useNavigate();
    const pageChanger = (path) => navigate(path);

  return (
    <div>
        <button onClick={() => pageChanger('/comp/Admin')}>Admin</button>
        <button onClick={() => pageChanger('/comp/Staff')}>Staff</button>
        

    </div>
  )
}
