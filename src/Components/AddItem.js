import React, { useState } from "react";
import { database } from "../Firebase"; // Import your Firebase database instance
import { ref, set, get } from "firebase/database";

const AddItem = () => {
  const [id, setId] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  // Function to check if ID is a valid number
  const validateId = (id) => {
    return /^\d+$/.test(id); // Ensures the ID is numeric
  };

  const validateQuantity = (quantity) => {
    const numericValue = Number(quantity); // Explicitly convert to a number
    return !isNaN(numericValue) && numericValue > 0;
  };

  const validatePrice = (price) => {
    const numericValue = Number(price); // Explicitly convert to a number
    return !isNaN(numericValue) && numericValue > 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id || !date || !category || !price || !quantity) {
      alert("All fields are required!");
      return;
    }

    // Validate the ID field
    if (!validateId(id)) {
      alert("ID must be a valid number!");
      return;
    }

    if (!validateQuantity(quantity)) {
        alert("Quantity should be greater than 0");
        return;
    }

    if (!validateQuantity(price)) {
        alert("Price should be greater than 0");
        return;
    }

    try {
      // Check if an item with the same ID already exists
      const itemRef = ref(database, `items/${id}`);
      const snapshot = await get(itemRef);

      if (snapshot.exists()) {
        alert("An item with this ID already exists!");
        return;
      }

      // If no item exists with the same ID, proceed to save the new item
      await set(itemRef, {
        id,
        date,
        category,
        price,
        quantity,
      });

      alert("Item added successfully!");

      // Clear the form fields
      setId("");
      setDate("");
      setCategory("");
      setPrice("");
      setQuantity("");
    } catch (error) {
      alert("Error adding item: " + error.message);
    }
  };

  return (
    <div className='bg'> 
    <table border={0} width='100%'height='70px'>
      <tr>
        <td className='heading'>Add Item</td>
        </tr></table><center>
      <div className="addItmBox">
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>
            ID:<br></br>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              style={{ width: "400px", padding: "8px" }}
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Date:<br></br>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{ width: "400px", padding: "8px" }}
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Category:<br></br>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ width: "400px", padding: "8px" }}
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Price:<br></br>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={{ width: "400px", padding: "8px" }}
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Quantity:<br></br>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              style={{ width: "400px", padding: "8px" }}
              required
            />
          </label>
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Add Item
        </button>
      </form></div></center>
    </div>
  );
};

export default AddItem;
