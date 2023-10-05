// import { useState } from "react";
// import PropTypes from "prop-types";

// function AddNewPose(props) {
//   const {
//     onPoseAdded,
//     favoritesId, // Receive favoritesId from props
//   } = props;

//   const [english_name, setEnglishName] = useState("");
//   const [sanskrit_name, setSanskritName] = useState("");
//   const [pose_description, setPoseDescription] = useState("");
//   const [pose_benefits, setPoseBenefits] = useState("");
//   const [url_png, setUrlPng] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Call the onPoseAdded function passed from the parent component
//     onPoseAdded();

//     setEnglishName("");
//     setSanskritName("");
//     setPoseDescription("");
//     setPoseBenefits("");
//     setUrlPng("");
//   };

//   // ... Rest of the component code ...

//   return (
//     <div>
//       <h3>Add Pose</h3>
//       <form onSubmit={handleSubmit}> 

//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

// AddNewPose.propTypes = {
//   onPoseAdded: PropTypes.func.isRequired,
//   favoritesId: PropTypes.string.isRequired, 
// };

// export default AddNewPose;





import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AddPose from "../components/AddPose";
import PoseCard from "../components/PoseCard";

const API_URL = "http://localhost:5005"; 


function AddNewPose (props) {
  const [newPose, setNewPose] = useState(null);
  const { poseId } = useParams();
  const { favoritesId } = useParams();

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

      <AddPose refreshNewPose={getPose} poseId={poseId} favoritesId={favoritesId} />

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
