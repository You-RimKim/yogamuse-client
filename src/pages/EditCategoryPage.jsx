import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "https://yogamuse.onrender.com";

function EditCategoryPage(props) {
  const [category_name, setcategory_name] = useState("");
  const [category_description, setcategory_description] = useState("");

  const { categoryId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {        
    
    const storedToken = localStorage.getItem('authToken');

  axios
      .get(
        `${API_URL}/api/categories/${categoryId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }    
      )
      .then((response) => {
        const oneCategory = response.data;
        setTitle(oneCategory.category_name);
        setDescription(oneCategory.category_description);
      })
      .catch((error) => console.log(error));
    
  }, [categoryId]);

  const handleFormSubmit = (e) => {                     
    e.preventDefault();

    const requestBody = { category_name, category_description };

    const storedToken = localStorage.getItem('authToken');  

    axios
    .put(
      `${API_URL}/api/categoriescategories/${categoryId}`,
      requestBody,
      { headers: { Authorization: `Bearer ${storedToken}` } }              
    )
    .then((response) => {
      navigate(`/categories/${categoryId}`)
    });
  };

  const deleteCategory = () => {                   

    const storedToken = localStorage.getItem('authToken');      

    axios
        .delete(
          `${API_URL}/api/categories/${categoryId}`,
          { headers: { Authorization: `Bearer ${storedToken}` } }           
        )
        .then(() => navigate("/categories"))
        .catch((err) => console.log(err));
    };
  
  return (
    <div className="EditCategoryPage">
      <h3>Edit the Category</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Category Name:</label>
        <input
          type="text"
          name="category_name"
          value={category_name}
          onChange={(e) => setcategory_name(e.target.value)}
        />
        
        <label>Category Description:</label>
        <textarea
          name="category_description"
          value={category_description}
          onChange={(e) => setcategory_description(e.target.value)}
        />

        <button type="submit">Update Category</button>

      </form>

      <button onClick={deleteCategory}>Delete Category</button>

    </div>
  );
}

export default EditCategoryPage;
