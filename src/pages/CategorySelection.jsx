// CategorySelectionPage.js

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function CategorySelectionPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://yoga-api-nzy4.onrender.com/v1/categories"
        );
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          throw new Error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  console.log(categories)
  return (
    <div>
      <h2>Choose a Category</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <Link to={`/poses/${category.category_name}`}>
              {category.category_name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategorySelectionPage;
