import { useState } from "react";
import PropTypes from "prop-types";

function AddPose(props) {
  // const [id, setId] = useState("");
  const { onPoseAdded, 
    english_name, 
    setenglish_name,
    sanskrit_name, 
    setsanskrit_name,
    pose_description,
    setpose_description, 
    pose_benefits,
    setpose_benefits,
    url_png,
    seturl_png } = props;

  const handleSubmit = (e) => {      
    e.preventDefault();

    onPoseAdded();

    setenglish_name("");
    setsanskrit_name("");
    setpose_description("");
    setpose_benefits("");
    seturl_png("");
    };
}

AddPose.propTypes = {
  onPoseAdded: PropTypes.func.isRequired,
  english_name: PropTypes.string.isRequired,
  setenglish_name: PropTypes.string.isRequired,
  sanskrit_name: PropTypes.string.isRequired,
  setsanskrit_name: PropTypes.string.isRequired,
  pose_description: PropTypes.func.isRequired,
  setpose_description: PropTypes.func.isRequired,
  pose_benefits: PropTypes.func.isRequired,
  setpose_benefits: PropTypes.func.isRequired,
  url_png: PropTypes.func.isRequired,
  seturl_png: PropTypes.func.isRequired,


};

export default AddPose;


// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Link, useParams } from "react-router-dom";
// import AddPose from "../components/AddPose";
// import PoseCard from "../components/PoseCard";

// const API_URL = "http://localhost:5005"; 


// function AddNewPose (props) {
//   const [newPose, setNewPose] = useState(null);
//   const { poseId } = useParams();

//   const getPose = () => {      
//     const storedToken = localStorage.getItem("authToken");
//   axios
//       .get(
//         `${API_URL}/api/categories/${poseId}`,
//         { headers: { Authorization: `Bearer ${storedToken}` } }
//       )
//       .then((response) => {
//         const onePose = response.data;
//         setNewPose(onePose);
//       })
//       .catch((error) => console.log(error));
//   };

//   useEffect(()=> {                   
//     getPose();
//   }, [poseId] );

  
//   return (
//     <div className="PoseDetails">
      
//       {newPose && (
//         <>
//           <h1>{newPose.category_name}</h1>
//           <p>{newPose.category_description}</p>
//         </>
//       )}

//       <AddPose refreshNewPose={getPose} poseId={poseId} favoritesId={favoritesId} />

//       { newPose && newPose.poses.map((pose) => (
//         <PoseCard key={pose._id} {...pose} /> 
//       ))} 
      
//       <Link to={"/my-favorites"}>
//         <button>Go to my favorites</button>
//       </Link>      
      
//     </div>
//   );
// }
 
// export default AddNewPose;