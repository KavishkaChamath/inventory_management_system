import React, { useState } from "react";
import { database } from "../Firebase"; // Import your Firebase database instance
import { ref, update } from "firebase/database";

const UploadAndStoreData = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  // Function to handle file selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Function to read JSON file and add data to Firebase
  const handleUpload = () => {
    if (!selectedFile) {
      alert("Please select a JSON file!");
      return;
    }
  
    const reader = new FileReader();
  
    reader.onload = async (e) => {
      try {
        const jsonData = JSON.parse(e.target.result);
  
        if (typeof jsonData !== "object" || Array.isArray(jsonData)) {
          alert("Invalid JSON structure. Must be an object.");
          return;
        }
  
        // Show confirmation dialog to the user
        const userConfirmed = window.confirm(
          "This action will add new data or update existing data in the database. Do you want to proceed?"
        );
  
        if (!userConfirmed) {
          alert("Upload canceled by user.");
          return;
        }
  
        // Add JSON data to the `items` node without removing existing data
        const itemsRef = ref(database, "items");
        await update(itemsRef, jsonData);
  
        alert("Data uploaded and added to Firebase successfully!");
        setSelectedFile(null); // Reset file input
      } catch (error) {
        alert("Error reading or storing file: " + error.message);
      }
    };
  
    reader.readAsText(selectedFile);
  };
  

  const jsonData = {
    "1001": {
      "category": "Table",
      "date": "2024-12-05",
      "id": "1001",
      "price": "1500",
      "quantity": 5
    }
  };

  return (
      <div className='bg'> 
    <table border={0} width='100%'height='70px'>
      <tr>
        <td className='heading'>Upload JSON File</td>
        </tr></table><center>
        <div className="uploadBox">
      <input
        type="file"
        accept=".json"
        onChange={handleFileChange}
        style={{ marginBottom: "10px" }}
      />
      <br />
      <button
        onClick={handleUpload}
        style={{
          padding: "10px 20px",
          backgroundColor: "#28a745",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Upload and Add to Database
      </button>
      <div>
      <h2>json file should be in this format</h2>
      <h4>Check before uploding data to database</h4>
      <pre >
        <code>{JSON.stringify(jsonData, null, 2)}</code>
      </pre>
      </div>
    </div></center>
    </div>
  );
};

export default UploadAndStoreData;
