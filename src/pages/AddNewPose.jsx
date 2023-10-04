import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AddPose from "../components/AddPose";
import PoseCard from "../components/PoseCard";

const API_URL = "http://localhost:5005"; 


function AddNewPose (props) {
  const [newPose, setNewPose] = useState(null);
  const { poseId } = useParams();

  const getPose = () => {      
    const storedToken = localStorage.getItem("authToken");
  axios
      .get(
        `${API_URL}/api/categories/${poseId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        const onePose = response.data;
        setNewPose(onePose);
      })
      .catch((error) => console.log(error));
  };

  useEffect(()=> {                   
    getPose();
  }, [poseId] );

  
  return (
    <div className="PoseDetails">
      
      {newPose && (
        <>
          <h1>{newPose.category_name}</h1>
          <p>{newPose.category_description}</p>
        </>
      )}

      <AddPose refreshNewPose={getPose} poseId={poseId} />

      { newPose && newPose.poses.map((pose) => (
        <PoseCard key={pose._id} {...pose} /> 
      ))} 
      
      <Link to={"/my-favorites"}>
        <button>Go to my favorites</button>
      </Link>      
      
    </div>
  );
}
 
export default AddNewPose;
