// FavoriteDetailsPage.jsx

import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import AddPose from "../components/AddPose";
import PoseCard from "../components/PoseCard";
import { AuthContext } from "../context/auth.context";


const API_URL = "http://localhost:5005";

function FavoriteDetailsPage() {
  const [favorite, setFavorite] = useState(null);
  const { favoritesId } = useParams();
  const navigate = useNavigate();
  const {getToken} = useContext(AuthContext);


    const fetchFavorite = async () => {
      try {
        const storedToken = localStorage.getItem("authToken");
        const response = await 
        axios
        .get(
          `${API_URL}/api/my-favorites/${favoritesId}`,
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        );

        const data = response.data;
        setFavorite(data);
      } catch (error) {
        console.error("Error fetching favorite:", error);
      }
    };

    useEffect(() => {
    fetchFavorite();
  }, [favoritesId]);

  const refreshPoseList = () => {
    fetchFavorite();
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
        console.log("Category deleted:", response.data);

        navigate("/my-favorites");
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
      });
  };

  return (
    <div className="favoriteDetailsPage">
      <div className="favoriteDetailsPageLinks">
        <h2>Favorite Categories</h2>

        {/* <Link to={`/my-favorites/edit/${favoritesId}`}>
          <button>Update category</button>
        </Link> */}

        <div className="deleteCategory">
          <button onClick={handleDeleteCategory}>Delete Category</button>
        </div>

        <div classname="newFaveCategory">
        {favorite && (
          <>
            <h3>{favorite.category_name}</h3>
            <p>{favorite.category_description}</p>
          </>
        )}
        </div>

        <div>
        <AddPose favoritesId={favoritesId}
        refreshFavorite={refreshPoseList} />
        </div>

        {favorite &&
          favorite.poses &&
          favorite.poses.map((pose) => (
            <PoseCard key={pose._id} {...pose} />
          ))}
      </div>

      <Link to={"/my-favorites"}>
        <button>Go to my favorites</button>
      </Link>
    </div>
  );
}

export default FavoriteDetailsPage;