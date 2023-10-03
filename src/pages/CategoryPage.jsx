// CategoryPage.js

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function CategoryPage() {
  const { categoryName } = useParams();
  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get(
          `https://yoga-api-nzy4.onrender.com/v1/categories?name=${categoryName}`
        );
        setCategoryData(response.data[0]);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    fetchCategoryData();
  }, [categoryName]);

  if (!categoryData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{categoryData.category_name}</h2>
      <p>{categoryData.category_description}</p>
    </div>
  );
}

export default CategoryPage;
