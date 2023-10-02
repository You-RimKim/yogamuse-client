import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
//import { Link, useNavigate } from "react-router-dom";

export default function CategoryDetailsPage () {
    const [onePose, setOnePose] = useState({});

    const {category} = useParams()

    //const navigate = useNavigate();

    async function fetchPose () {
        const resp = await fetch(`https://yoga-api-nzy4.onrender.com/v1/categories?name=${category}`)
        const data = await resp.json();
        setOnePose(data)
    }

    function addToFavorites() {
      if (!favoriteCategories.includes(onePose.category_name)) {
        setFavoriteCategories([...favoriteCategories, onePose.category_name]);
      }
    }  

    useEffect(()=>{
        fetchPose()
    },[])

    return (
        <div className="ChosenCategory">
          <h2>Chosen Category</h2>
          <h3>{onePose.category_name}</h3>
          <p>{onePose.category_description}</p>
          <button onClick={addToFavorites}>Add to Favorites</button>
          <h4>Poses in {onePose.category_name}</h4>
          <ul>
            {onePose.poses &&
              onePose.poses.map((pose) => (
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

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// export default function PoseDetailsPage() {
//   const [data, setData] = useState({});
//   const { category, difficulty_level } = useParams();

//   async function fetchData() {
//     try {
//       let url = "";

//       if (category) {
//         // Fetch poses for the specified category
//         url = `https://yoga-api-nzy4.onrender.com/v1/categories?name=${category}`;
//       } else if (difficulty_level) {
//         // Fetch poses for the specified difficulty level
//         url = `https://yoga-api-nzy4.onrender.com/v1/poses?level=${difficulty_level}`;
//       } else {
//         // Handle invalid URL or other cases
//         return;
//       }

//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error("Failed to fetch data");
//       }
//       const result = await response.json();
//       setData(result);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   }

//   useEffect(() => {
//     fetchData();
//   }, [category, difficulty_level]);

//   return (
//     <div className="PoseDetailsPage">
//       <h2>
//         {category ? `Category: ${category}` : ""}
//         {difficulty_level ? `Level: ${difficulty_level}` : ""}
//       </h2>
//       <p>{category ? data.category_description : ""}</p>
//       <h4>Poses</h4>
//       <ul>
//         {data.poses &&
//           data.poses.map((pose) => (
//             <li key={pose.id}>
//               <h5>{pose.english_name}</h5>
//               <h5>{pose.sanskrit_name}</h5>
//               <img src={pose.url_svg} alt={pose.english_name} />
//               <p>{pose.pose_description}</p>
//               <p>{pose.pose_benefits}</p>
//             </li>
//           ))}
//       </ul>
//     </div>
//   );
// }



