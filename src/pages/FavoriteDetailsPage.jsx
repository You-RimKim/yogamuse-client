import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function FavoriteDetailsPage() {
  const [favorite, setFavorite] = useState(null);
  const { favoriteId } = useParams();

  async function fetchFavorite() {
    const resp = await fetch(`https://yoga-api-nzy4.onrender.com/v1/categories?name=${category}`)
    const data = await resp.json();
    setFavorite(data)
  }

  useEffect(() => {
    fetchFavorite()
  }, [])

//   useEffect(() => {
//     // Fetch the content of the selected favorite based on favoriteId
//     const storedToken = localStorage.getItem("authToken");
//     axios.get(`http://localhost:5005/api/favorites/${favoriteId}`, {
//       headers: { Authorization: `Bearer ${storedToken}` },
//     })
//     .then((response) => {
//       setFavorite(response.data);
//     })
//     .catch((error) => {
//       console.error("Error fetching favorite content:", error);
//     });
//   }, [favoriteId]);

//   return (
//     <div className="FavoriteDetailsPage">
//       <h2>{favorite.category_name}</h2>
//       {/* Display the content of the favorite here */}
//       <p>{favorite.content}</p>
//       {/* Add more details if needed */}
//     </div>
//   );

  return (
    <div className="FavoriteCategory">
      <h2>Favorite Categories</h2>
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
    </div>
  );
}
