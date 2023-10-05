import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddCategory from "../components/AddCategory";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const [category_name,setCategoryName]  = useState("")
  const [category_description,setCategoryDescription]  = useState("")

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");
      const response = await axios.get("http://localhost:5005/api/my-favorites", {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      setFavorites(response.data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const toggleAddCategoryForm = () => {
    setShowAddCategoryForm(!showAddCategoryForm);
  };

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

      toggleAddCategoryForm();
      fetchFavorites()
    } catch (error) {
      console.error("Error adding favorite category:", error);
    }
  };

  return (
      <div className="favoritesPage">
        <h2>My Favorites</h2>
  
        <button onClick={toggleAddCategoryForm}>Add a category</button>
  
        {favorites.length === 0 ? (
          <p>No favorites here!</p>
        ) : (
          <ul>
            {favorites.map((favorite) => (
              <li key={favorite._id}>
                <Link to={`/my-favorites/${favorite._id}`}>{favorite.category_name}</Link>
              </li>
            ))}
          </ul>
        )}
  
      {showAddCategoryForm && (
            <div>
              <AddCategory
                onCategoryAdded={handleAddFavoriteCategory}
                category_name={category_name}
                category_description={category_description}
                setCategoryName={setCategoryName}
                setCategoryDescription={setCategoryDescription}
              />
  
            <div className="AddCategory">
              <h3>Add Category</h3>
  
              <form>
                <div>
                <label>Category Name:</label>
                <input
                  type="text"
                  name="category_name"
                  value={category_name}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
                </div>
  
                <div>
                <label>Description:</label>
                <textarea
                  type="text"
                  name="category_description"
                  value={category_description}
                  onChange={(e) => setCategoryDescription(e.target.value)}
                />
                </div>
  
                <button onClick={handleAddFavoriteCategory} type="button">
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }