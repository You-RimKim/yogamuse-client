import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import AddPose from "../components/AddPose";

export default function FavoriteDetailsPage() {
  const [favorite, setFavorite] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isAddingPose, setIsAddingPose] = useState(false);
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

// Function to toggle the Add Pose form visibility
const toggleAddPoseForm = () => {
  setIsAddingPose(!isAddingPose);
};

const handleAddPose = async () => {
  try {
    const storedToken = localStorage.getItem("authToken");
    const response = await axios.post(
      `http://localhost:5005/api/my-favorites/${favoritesId}`,

      { 
        english_name,
        sanskrit_name,
        pose_description,
        pose_benefits,
        url_png, },
      {
        headers: { Authorization: `Bearer ${storedToken}` },
      }
    );

    const newFavoritePose = response.data;
    setFavoritePose((prevFavoritePose) => [...prevFavoritePose, newFavoritePose]);

    toggleAddPoseForm();
    fetchFavorites()
  } catch (error) {
    console.error("Error adding favorite pose:", error);
  }
};

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

        <Link to="/my-favorites/edit/:favoritesId">
        <button>Update category</button>
        </Link>

        <Link to="/add-pose/:poseId">
        <button>Add a pose</button>
        </Link>

        <button onClick={() => handleDeleteCategory(favorite.category_id)}>
          Delete Category
        </button>

        {/* <button onClick={toggleAddPoseForm}>
          "Add Pose"
        </button> */}

        {isAddingPose && (
          <AddPose
            onPoseAdded={handleAddPose}
            // Pass any necessary props to the AddPose component
          />
        )}

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