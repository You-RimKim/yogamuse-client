import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
//import { Link, useNavigate } from "react-router-dom";

export default function CategoryDetailsPage() {
  const [onePose, setOnePose] = useState({});

  const { category } = useParams()

  //const navigate = useNavigate();

  async function fetchPose() {
    const resp = await fetch(`https://yoga-api-nzy4.onrender.com/v1/categories?name=${category}`)
    const data = await resp.json();
    setOnePose(data)
  }

  function addToFavorites() {
    const storedToken = localStorage.getItem("authToken")
    axios.post("https://yogamuse.onrender.com/api/add-favorite", {...onePose}, { headers: { Authorization: `Bearer ${storedToken}` } })

  }

  useEffect(() => {
    fetchPose()
  }, [])

  console.log(onePose)
  return (
    <div className="ChosenCategory">
      <h2>Chosen Category</h2>
      <h3>{onePose.category_name}</h3>
      <div className="categoryDescription">
        <p>{onePose.category_description}</p>
      </div>
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