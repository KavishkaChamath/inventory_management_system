import React, { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { database } from "../Firebase";

const SortingComponent = () => {
  const [items, setItems] = useState([]);
  const [sortedItems, setSortedItems] = useState([]);
  const [sortField, setSortField] = useState("price");
  const [sortOrder, setSortOrder] = useState("ascending");

  // Add these new state variables
const [minPrice, setMinPrice] = useState(0);
const [maxPrice, setMaxPrice] = useState(1000); // You can adjust the default maxPrice as needed
const [minQuantity, setMinQuantity] = useState(0);

// Function to handle price range filter
const handlePriceRangeChange = (e) => {
  const { name, value } = e.target;
  if (name === "minPrice") setMinPrice(value);
  if (name === "maxPrice") setMaxPrice(value);
};

// Function to handle minimum quantity filter
const handleMinQuantityChange = (e) => {
  setMinQuantity(e.target.value);
};

// Function to filter items based on price range and minimum quantity
const filterItems = () => {
  let filteredItems = [...items];

  // Filter by price range
  filteredItems = filteredItems.filter(
    (item) => item.price >= minPrice && item.price <= maxPrice
  );

  // Filter by minimum quantity
  filteredItems = filteredItems.filter(
    (item) => item.quantity >= minQuantity
  );

  setSortedItems(filteredItems); // Update the sortedItems with filtered results
};


  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    handleSort();
  }, [sortField, sortOrder, items]);

  // Fetch Items from Firebase Realtime Database
  const fetchItems = async () => {
    try {
      const snapshot = await get(ref(database, "items"));
      if (snapshot.exists()) {
        const data = Object.values(snapshot.val());
        setItems(data);
        setSortedItems(data); // Initial state
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  // Quick Sort Implementation
  const quickSort = (arr, key, descending) => {
    if (arr.length <= 1) return arr;

    const pivot = arr[arr.length - 1];
    const left = [], right = [];

    for (let i = 0; i < arr.length - 1; i++) {
      if (descending) {
        arr[i][key] > pivot[key] ? left.push(arr[i]) : right.push(arr[i]);
      } else {
        arr[i][key] < pivot[key] ? left.push(arr[i]) : right.push(arr[i]);
      }
    }

    return [
      ...quickSort(left, key, descending),
      pivot,
      ...quickSort(right, key, descending),
    ];
  };

  // Merge Sort Implementation for Category
  const mergeSort = (arr, descending) => {
    if (arr.length <= 1) return arr;

    const middle = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, middle), descending);
    const right = mergeSort(arr.slice(middle), descending);

    return merge(left, right, descending);
  };

  const merge = (left, right, descending) => {
    const result = [];
    while (left.length && right.length) {
      if (
        (left[0].category.localeCompare(right[0].category) < 0 && !descending) ||
        (left[0].category.localeCompare(right[0].category) > 0 && descending)
      ) {
        result.push(left.shift());
      } else {
        result.push(right.shift());
      }
    }
    return [...result, ...left, ...right];
  };

  // Handle Sort based on the selected field and order
  const handleSort = () => {
    let sorted = [...items];
    if (sortField === "category") {
      sorted = mergeSort(sorted, sortOrder === "descending");
    } else {
      sorted = quickSort(
        sorted,
        sortField,
        sortOrder === "descending"
      );
    }
    setSortedItems(sorted);
  };
  

  return (
    <div>
      <h2>Inventory Management</h2>

      <div>
        <label>Sort By:</label>
        <select value={sortField} onChange={(e) => setSortField(e.target.value)}>
          <option value="price">Price</option>
          <option value="quantity">Quantity</option>
          <option value="category">Category</option>
        </select>

        <label>Order:</label>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
      </div>

      
      <div>
          <h3>Filter Items</h3>

          <div>
            <label>Min Price:</label>
            <input
              type="number"
              name="minPrice"
              value={minPrice}
              onChange={handlePriceRangeChange}
            />

            <label>Max Price:</label>
            <input
              type="number"
              name="maxPrice"
              value={maxPrice}
              onChange={handlePriceRangeChange}
            />
          </div>

          <div>
            <label>Min Quantity:</label>
            <input
              type="number"
              value={minQuantity}
              onChange={handleMinQuantityChange}
            />
          </div>

          <button onClick={filterItems}>Apply Filters</button>
        </div>


      <h3>Items</h3>
      <ul>
        {sortedItems.map((item, index) => (
          <li key={index}>
            <strong>ID:</strong> {item.id}, <strong>Category:</strong>{" "}
            {item.category}, <strong>Price:</strong> {item.price},{" "}
            <strong>Quantity:</strong> {item.quantity},{" "}
            <strong>Date:</strong> {item.date}
          </li>
        ))}
      </ul>


    </div>
    
  );
};

export default SortingComponent;
