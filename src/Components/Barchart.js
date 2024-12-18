import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { database } from "../Firebase"; // Adjust path if necessary
import { ref, get } from "firebase/database";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CategoryQuantityBarChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Quantity",
        data: [],
        backgroundColor: "rgba(75,192,192,0.6)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    fetchItemsData();
  }, []);

  const fetchItemsData = async () => {
    try {
      const snapshot = await get(ref(database, "items"));
      if (snapshot.exists()) {
        const data = snapshot.val();
        const categories = [];
        const quantities = [];

        // Extract categories and quantities from the items
        Object.values(data).forEach((item) => {
          if (item.category && item.quantity) {
            categories.push(item.category);
            quantities.push(item.quantity);
          }
        });

        // Update chart data
        setChartData((prevData) => ({
          ...prevData,
          labels: categories,
          datasets: [
            {
              ...prevData.datasets[0],
              data: quantities,
            },
          ],
        }));
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error("Error fetching data from Firebase:", error);
    }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Item Quantity by Category",
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Category",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Quantity",
        },
      },
    },
  };

  return (
    <div>
      <h2>Item Quantity by Category</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default CategoryQuantityBarChart;
