import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddCategory from "../components/AddCategory";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);

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

  // Define a function to update favorites when a new favorite category is added
  const updateFavorites = (newFavorite) => {
    setFavorites((prevFavorites) => [...prevFavorites, newFavorite]);
  };

  const handleAddFavoriteCategory = async (category_name, category_description) => {
    try {
      const storedToken = localStorage.getItem("authToken");
      const response = await axios.post(
        "http://localhost:5005/api/my-favorites",
        { category_name, category_description },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );

      const newFavoriteCategory = response.data;
      updateFavorites(newFavoriteCategory);
      toggleAddCategoryForm();
    } catch (error) {
      console.error("Error adding favorite category:", error);
    }
  };

  return (
    <div className="FavoritesPage">
      <h2>My Favorites</h2>

      <button onClick={toggleAddCategoryForm}>Add a category</button>

      <ul>
        {favorites.map((favorite) => (
          <li key={favorite._id}>
            <Link to={`/my-favorites/${favorite._id}`}>{favorite.category_name}</Link>
          </li>
        ))}
      </ul>

      {showAddCategoryForm && (
        <AddCategory
          onCategoryAdded={handleAddFavoriteCategory}
          updateCategories={updateFavorites}
        />
      )}
    </div>
  );
}


// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import AddCategory from "../components/AddCategory";

// export default function FavoritesPage() {
//   const [favorites, setFavorites] = useState([]);
//   const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);

//   useEffect(() => {
//     const storedToken = localStorage.getItem("authToken");
//     axios.get("http://localhost:5005/api/my-favorites", {
//       headers: { Authorization: `Bearer ${storedToken}` },
//     })
//     .then((response) => {
//       console.log(response)
//       setFavorites(response.data);
//     })
//     .catch((error) => {
//       console.error("Error fetching favorites:", error);
//     });
//   }, []);
//   return (
//     <div className="FavoritesPage">
//       <h2>My Favorites</h2>
//       <ul>
//         {favorites.map((favorite) => (
//            <li key={favorite._id}>
//            <Link to={`/my-favorites/${favorite._id}`}>{favorite.category_name}</Link>
//          </li>
//         ))}
//       </ul>
//     </div>
//   );
// }