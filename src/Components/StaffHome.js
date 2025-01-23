import React from 'react'
import SignOut from './SignOut'
import { useNavigate } from 'react-router-dom';

export default function StaffHome() {
    const navigate = useNavigate();
    const pageChanger = (path) => navigate(path);
  return (
    <div className='bg'> 
    <table border={0} width='100%'height='70px'>
      <tr>
        <td className='heading'>Staff Home</td>
        <td width='150px'><SignOut/></td>
        </tr></table>

        <button className='allItm'onClick={() => pageChanger('/comp/Display')}>Show all items</button>
        <button className='count'onClick={() => pageChanger('/comp/GetCount')}>Count items</button><br></br>
        <button className='upQuantity'onClick={() => pageChanger('/comp/updateCount')}>Update Quantity</button>
        <button className='overall'onClick={() => pageChanger('/comp/showChart')}>Item Overall</button>

    </div>
  )
}
