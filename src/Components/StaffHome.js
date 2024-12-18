import React from 'react'
import SignOut from './SignOut'
import { useNavigate } from 'react-router-dom';

export default function StaffHome() {
    const navigate = useNavigate();
    const pageChanger = (path) => navigate(path);
  return (
    <div>StaffHome
        <SignOut/>
        
        <button onClick={() => pageChanger('/comp/Display')}>Show all items</button>
        <button onClick={() => pageChanger('/comp/GetCount')}>Count items</button>
        <button onClick={() => pageChanger('/comp/updateCount')}>Update Quantity</button>
        <button onClick={() => pageChanger('/comp/showChart')}>Item Overall</button>

    </div>
  )
}
