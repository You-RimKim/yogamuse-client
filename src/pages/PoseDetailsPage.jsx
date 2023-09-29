import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export default function PoseDetailsPage () {
    const [onePose, setOnePose] = useState({});

    const {category} = useParams()

    async function fetchPose () {
        const resp = await fetch(`https://yoga-api-nzy4.onrender.com/v1/categories?name=${category}`)
        const data = await resp.json();
        setOnePose(data)
    }

    useEffect(()=>{
        fetchPose()
    },[])

    return (
        <div className="ChosenCategory">
          <h2>Chosen Category</h2>
          <h3>{onePose.category_name}</h3>
          <p>{onePose.category_description}</p>
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
    
    // <div> {JSON.stringify(onePose)} </div>
}