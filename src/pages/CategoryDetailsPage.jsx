import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AddPose from "../components/AddPose";

import PoseCard from "../components/PoseCard";

const API_URL = "http://localhost:5005"; 


function CategoryDetailsPage (props) {
  const [category, setCategory] = useState(null);

  const { categoryId } = useParams();

  const getCategory = () => {        
  axios
      .get(
        `${API_URL}/api/categories/${categoryId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        const oneProject = response.data;
        setCategory(oneCategory);
      })
      .catch((error) => console.log(error));
  };

  useEffect(()=> {                   
    getCategory();
  }, [] );

  
  return (
    <div className="CategoryDetails">
      
      {category && (
        <>
          <h1>{category.category_name}</h1>
          <p>{category.category_description}</p>
        </>
      )}

      <AddPose refreshCategory={getCategory} categoryId={categoryId} />

      { category && category.poses.map((pose) => (
        <PoseCard key={pose._id} {...pose} /> 
      ))} 
      
 
      <Link to="/categories">
        <button>Back to categories</button>
      </Link>
      
      <Link to={`/categories/edit/${categoryId}`}>
        <button>Edit category</button>
      </Link>      
      
    </div>
  );
}
 
export default CategoryDetailsPage;
