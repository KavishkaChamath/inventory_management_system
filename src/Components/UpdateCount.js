import React, { useState } from "react";
import { ref, get, update } from "firebase/database";
import { database } from "../Firebase";

const UpdateQuantityComponent = () => {
  const [itemId, setItemId] = useState("");
  const [itemData, setItemData] = useState(null);
  const [quantityInput, setQuantityInput] = useState("");
  const [error, setError] = useState("");

  // Fetch item details based on ID
  const fetchItemById = async () => {
    if (!itemId.trim()) {
      setError("Please enter a valid ID.");
      setItemData(null);
      return;
    }

    try {
      const snapshot = await get(ref(database, `items/${itemId}`));
      if (snapshot.exists()) {
        setItemData(snapshot.val());
        setError("");
      } else {
        setError("Item not found with the given ID.");
        setItemData(null);
      }
    } catch (err) {
      console.error("Error fetching item:", err);
      setError("Failed to fetch data. Please try again.");
      setItemData(null);
    }
  };

  // Increment quantity
  const addQuantity = async () => {
    if (!itemData) return;

    const quantityToAdd = parseInt(quantityInput, 10);
    if (isNaN(quantityToAdd) || quantityToAdd <= 0) {
      setError("Please enter a valid positive number for quantity.");
      return;
    }

    const currentQuantity = parseInt(itemData.quantity, 10) || 0;
    const updatedQuantity = currentQuantity + quantityToAdd;

    try {
      await update(ref(database, `items/${itemId}`), {
        quantity: updatedQuantity,
      });

      setItemData((prev) => ({
        ...prev,
        quantity: updatedQuantity,
      }));
      setQuantityInput("");
      setError("");
    } catch (err) {
      console.error("Error updating quantity:", err);
      setError("Failed to update quantity. Please try again.");
    }
  };

  // Decrease quantity
  const reduceQuantity = async () => {
    if (!itemData) return;

    const quantityToReduce = parseInt(quantityInput, 10);
    if (isNaN(quantityToReduce) || quantityToReduce <= 0) {
      setError("Please enter a valid positive number for quantity.");
      return;
    }

    const currentQuantity = parseInt(itemData.quantity, 10) || 0;
    const updatedQuantity = Math.max(currentQuantity - quantityToReduce, 0); // Ensure it doesn't go below zero

    try {
      await update(ref(database, `items/${itemId}`), {
        quantity: updatedQuantity,
      });

      setItemData((prev) => ({
        ...prev,
        quantity: updatedQuantity,
      }));
      setQuantityInput("");
      setError("");
    } catch (err) {
      console.error("Error updating quantity:", err);
      setError("Failed to update quantity. Please try again.");
    }
  };

  return (

    <div className='bg'> 
    <table border={0} width='100%'height='70px'>
      <tr>
        <td className='heading'>Update Item Quantity</td>
        </tr></table>
      <div>
        <label className="entID">Enter Item ID: </label>
        <input className="itemBox"
          type="text"
          value={itemId}
          onChange={(e) => setItemId(e.target.value)}
          placeholder="Enter Item ID"
        />
        <button className="fetchBtn" onClick={fetchItemById}>Fetch Item</button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {itemData && (
        <div>
          <h3>Item Details</h3>
          <p>
            <strong>Category:</strong> {itemData.category}
          </p>
          <p>
            <strong>Current Quantity:</strong> {itemData.quantity}
          </p>
          <p>
            <strong>Price:</strong> {itemData.price}
          </p>

          <div>
            <label>Enter Quantity to Add/Reduce:</label>
            <input
              type="number"
              value={quantityInput}
              onChange={(e) => setQuantityInput(e.target.value)}
              placeholder="Enter Quantity"
            />
          </div>

          <div>
            <button onClick={addQuantity} style={{ marginRight: "10px" }}>
              Add Quantity
            </button>
            <button onClick={reduceQuantity} style={{ marginLeft: "10px" }}>
              Reduce Quantity
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateQuantityComponent;
