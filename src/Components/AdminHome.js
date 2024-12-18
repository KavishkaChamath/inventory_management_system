import React from 'react'
import SignOut from './SignOut'
import { useNavigate } from 'react-router-dom';
import { ref, get } from "firebase/database";
import { database } from "../Firebase";

export default function AdminHome() {
    const navigate = useNavigate();
    const pageChanger = (path) => navigate(path);
    
    const handleDownload = async () => {
        try {
          const itemsRef = ref(database, "items");
          const snapshot = await get(itemsRef);
    
          if (snapshot.exists()) {
            const data = snapshot.val();
    
            // Convert data to JSON string
            const jsonData = JSON.stringify(data, null, 2);
    
            // Create a blob object and trigger download
            const blob = new Blob([jsonData], { type: "application/json" });
            const url = URL.createObjectURL(blob);
    
            // Create a temporary link element
            const link = document.createElement("a");
            link.href = url;
            link.download = "items.json"; // Name of the downloaded file
            link.click();
    
            // Clean up the URL object
            URL.revokeObjectURL(url);
    
            alert("Items data downloaded successfully!");
          } else {
            alert("No items data found!");
          }
        } catch (error) {
          alert("Error downloading data: " + error.message);
        }
      };

  return (
    <div>AdminHome
        <SignOut/>
        <button onClick={() => pageChanger('/comp/Signup')}>Add new user</button>
        <button onClick={() => pageChanger('/comp/AddItem')}>Add new item</button>
        <button onClick={() => pageChanger('/comp/DeleteItem')}>Delete Item</button>
        <button onClick={() => pageChanger('/comp/Display')}>Show all items</button>
        <button onClick={() => pageChanger('/comp/GetCount')}>Count items</button>
        <button onClick={() => pageChanger('/comp/updateCount')}>Update Quantity</button>
        <button onClick={() => pageChanger('/comp/showChart')}>Item Overall</button>

        <button onClick={() => pageChanger('/comp/uploadData')}>Upload Data to Database</button>
        <button onClick={handleDownload}> BackUp Items Data </button>
    </div>
  )
}
