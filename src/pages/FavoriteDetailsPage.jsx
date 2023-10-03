import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

export default function FavoriteDetailsPage() {
  const [favorite, setFavorite] = useState(null);
  const [categories, setCategories] = useState([]);
  const { favoritesId } = useParams();
  const {getToken} = useContext(AuthContext)
  const navigate = useNavigate();

useEffect(() => {
  const fetchFavorite = async () => {
    try {
      const response = await fetch(
        `http://localhost:5005/api/my-favorites/${favoritesId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        }
      );
      const data = await response.json()
      setFavorite(data)

      if (!response.ok) {
        throw new Error("Failed to fetch favorites");
      }
      // const favoriteData = await response.json();
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  fetchFavorite();
}, []);

const handleDeleteCategory = () => {
  const storedToken = getToken();

  axios
    .delete(`http://localhost:5005/api/my-favorites/${favoritesId}`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    })
    .then((response) => {
      console.log('Category deleted:', response.data);

      setCategories((prevCategories) =>
      prevCategories.filter(
        (category) => category.category_id !== favoritesId
      )
    );

      navigate( '/my-favorites' );
    })
    .catch((error) => {
      console.error('Error deleting category:', error);
    });
}
  

    return (
        <div className="FavoriteCategory">
        <h2>Favorite Categories</h2>

        <button onClick={() => handleDeleteCategory(favorite.category_id)}>
          Delete Category
        </button>

        <Link to="/my-favorites/edit/:favoritesId">
        <button>Edit my favorites</button>
        </Link>

        <Link to="/my-favorites/edit/:favoritesId">
        <button>Add a pose</button>
        </Link>

        {favorite && (
            <>
            <h3>{favorite.category_name}</h3>
            <p>{favorite.category_description}</p>
            <h4>Poses in {favorite.category_name}</h4>
            <ul>
                {favorite.poses &&
                favorite.poses.map((pose) => (
                    <li key={pose.id}>
                    <h5>{pose.english_name}</h5>
                    <h5>{pose.sanskrit_name}</h5>
                    <img src={pose.url_svg} alt={pose.english_name} />
                    <p>{pose.pose_description}</p>
                    <p>{pose.pose_benefits}</p>
                    </li>
                ))}
            </ul>
            </>
        )}

        
        </div>
    );
    }
