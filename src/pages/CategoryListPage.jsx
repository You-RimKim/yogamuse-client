import { useState, useEffect } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
import AddCategory from "../components/AddCategory";
import CategoryCard from "../components/CategoryCard";

const API_URL = "http://localhost:5005";


function CategoryListPage() {
  const [categories, setCategories] = useState([]);

  const getAllCategories = () => {

    const storedToken = localStorage.getItem("authToken");

  axios
      .get(`${API_URL}/api/categories`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setCategories(response.data))
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllCategories();
  }, [] );

  
  return (
    <div className="CategoryListPage">
      
      <AddCategory refreshCategories={getAllCategories} />
      
      { categories.map((category) => (
        <CategoryCard key={category._id} {...category} />
      ))}     
       
    </div>
  );
}

export default CategoryListPage;
