import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

export default function FavoriteDetailsPage() {
  const [favorite, setFavorite] = useState(null);
  const { id } = useParams();
  const {getToken} = useContext(AuthContext)


console.log(getToken())

console.log("Here is the Id that we are looking for ---",id)

useEffect(() => {
  const fetchFavorite = async () => {
    try {
      const response = await fetch(
        `http://localhost:5005/api/my-favorites/${id}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        }
      );
      const data = await response.json()
      setFavorite(data)
      console.log("RESPONSE-----------",data);

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


// useEffect(() => {
//     const fetchFavorite = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:5005/api/my-favorites/${favoriteId}`, {...favorite}
//           , { headers: { Authorization: `Bearer ${getToken()}` },
//         });
        
//         console.log(response)

//         if (!response.ok) {
//           throw new Error("Failed to fetch favorites");
//         }
//         // const categoryData = await response.json();

    
//       } catch (error) {
//         console.error("Error fetching favorites:", error);
//       }
//     };

//     fetchFavorite();
// //  axios.get()



//   }, []);
  

    return (
        <div className="FavoriteCategory">
        <h2>Favorite Categories</h2>
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
        <Link to="/my-favorites">
        <button>Back to my favorites</button>
      </Link>
        </div>
    );
    }
