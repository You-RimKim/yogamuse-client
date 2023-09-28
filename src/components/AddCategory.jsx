import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";

function AddCategory(props) {
  const [category_name, setCategoryName] = useState("");
  const [category_description, setCategoryDescription] = useState("");

  const handleSubmit = (e) => {                        
    e.preventDefault();
 
    const requestBody = { category_name, category_description };

    axios
      .post(`${API_URL}/api/categories`, requestBody)
      .then((response) => {
        // Reset the state
        setCategoryName("");
        setCategoryDescription("");

        props.refreshCategories();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddCategory">
      <h3>Add Category</h3>

      <form onSubmit={handleSubmit}>  
        <label>Category Name:</label>
        <input
          type="text"
          name="category_name"
          value={category_name}
          onChange={(e) => setCategoryName(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          type="text"
          name="category_description"
          value={category_description}
          onChange={(e) => setCategoryDescription(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddCategory;
