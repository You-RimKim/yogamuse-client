import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import AddCategory from "../components/AddCategory";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const [category_name,setCategoryName]  = useState("")
  const [category_description,setCategoryDescription]  = useState("")


console.log(favorites)
  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");
      const response = await axios.get("http://localhost:5005/api/my-favorites", {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      console.log("favorites ......" , favorites)
      setFavorites(response.data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const toggleAddCategoryForm = () => {
    setShowAddCategoryForm(!showAddCategoryForm);
  };

  //Define a function to update favorites when a new favorite category is added
  // const updateFavorites = (newFavorite) => {
  //   setFavorites((prevFavorites) => [...prevFavorites, newFavorite]);
  // };

  const handleAddFavoriteCategory = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");
      const response = await axios.post(
        "http://localhost:5005/api/my-favorites",

        { 
          category_name, 
          category_description },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );

      const newFavoriteCategory = response.data;
      setFavorites((prevFavorites) => [...prevFavorites, newFavoriteCategory]);

      updateFavorites(newFavoriteCategory);

      toggleAddCategoryForm();
      fetchFavorites()
    } catch (error) {
      console.error("Error adding favorite category:", error);
    }
  };

  return (
    <div className="FavoritesPage">
      <h2>My Favorites</h2>

      <button onClick={toggleAddCategoryForm}>Add a category</button>

      {!favorites.length &&
        <p>No favorites here!</p>
      }
      { 
        favorites.length &&
        <ul>
        {
        favorites.map((favorite) => (
          <li key={favorite._id}>
            <Link to={`/my-favorites/${favorite._id}`}>{favorite.category_name}</Link>
          </li>
        ))}
      </ul>
      }

      {showAddCategoryForm && (
        // <AddCategory
        //   onCategoryAdded={handleAddFavoriteCategory}
        //   updateCategories={updateFavorites}
        // />
        <div className="AddCategory">
            <h3>Add Category</h3>
        
             <form >  
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
                <button onClick={()=> handleAddFavoriteCategory()} type="submit">Submit</button>
              </form>
            </div>
      )}
    </div>
  );
}