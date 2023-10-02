import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import FavoriteDetailsPage from "./FavoriteDetailsPage";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Fetch the user's favorites from the backend
    const storedToken = localStorage.getItem("authToken");
    axios.get("http://localhost:5005/api/my-favorites", {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
    .then((response) => {
      setFavorites(response.data);
    })
    .catch((error) => {
      console.error("Error fetching favorites:", error);
    });
  }, []);

  return (
    <div className="FavoritesPage">
      <h2>My Favorites</h2>
      <ul>
        {favorites.map((favorite) => (
           <li key={favorite._id}>
           <Link to={`/my-favorites/${favorite._id}`}>{favorite.category_name}</Link>
         </li>
        ))}
      </ul>
    </div>
  );
}


// import { useEffect, useState } from "react";

// function FavoritesPage() {
//   const [favoriteCategories, setFavoriteCategories] = useState([]);

//   useEffect(() => {
//     // Replace 'userId' with the actual user's ID or identifier.
//     const userId = '';

//     // Fetch user's favorite categories from the backend.
//     fetch(`/api/favorite-categories/${userId}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setFavoriteCategories(data.favoriteCategories);
//       })
//       .catch((error) => {
//         console.error("Error fetching favorite categories:", error);
//       });
//   }, []);

//   return (
//     <div>
//       <h2>Favorite Categories</h2>
//       <ul>
//         {favoriteCategories.map((category) => (
//           <li key={category}>{category}</li>
//         ))}
//       </ul>

//       <Link to="/categories/edit/:categoryId">
//         <button>Edit category</button>
//       </Link>

//       <Link to="/add-pose/:poseId">
//         <button>Add new pose</button>
//       </Link>

//     </div>
//   );
// }

// export default FavoritesPage;
