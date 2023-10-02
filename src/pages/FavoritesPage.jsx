import { useEffect, useState } from "react";

function FavoritesPage() {
  const [favoriteCategories, setFavoriteCategories] = useState([]);

  useEffect(() => {
    // Replace 'userId' with the actual user's ID or identifier.
    const userId = '123';

    // Fetch user's favorite categories from the backend.
    fetch(`/api/favorite-categories/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setFavoriteCategories(data.favoriteCategories);
      })
      .catch((error) => {
        console.error("Error fetching favorite categories:", error);
      });
  }, []);

  return (
    <div>
      <h2>Favorite Categories</h2>
      <ul>
        {favoriteCategories.map((category) => (
          <li key={category}>{category}</li>
        ))}
      </ul>

      <Link to="/categories/edit/:categoryId">
        <button>Edit category</button>
      </Link>

      <Link to="/add-pose/:poseId">
        <button>Add new pose</button>
      </Link>

    </div>
  );
}

export default FavoritesPage;
