import { useState, useEffect } from "react";
import axios from "axios";

function AllPoses() {
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    axios.get("https://yogamuse.onrender.com/api/poses")
    .then((response)=> {
      console.log(response)
    })

  },[])

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://yoga-api-nzy4.onrender.com/v1/categories"
  //       );
  //       setCategories(response.data);
  //     } catch (error) {
  //       console.error("Error fetching categories:", error);
  //     }
  //   };

  //   fetchCategories();
  // }, []);

  return (
    <div className="allPoses">
      <h2>Yoga Poses</h2>
      {categories.map((category) => (
        <div key={category.id} className="allPoses">
          <h3>{category.category_name}</h3>
          <p>{category.category_description}</p>
          <ul>
            {category.poses.map((pose) => (
              <li key={pose.id}>
                <h4>{pose.english_name}</h4>
                <h4>{pose.sanskrit_name}</h4>
                <p>{pose.pose_description}</p>
                <p>{pose.pose_benefits}</p>
                <img src={pose.url_svg} alt={pose.english_name} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default AllPoses;
