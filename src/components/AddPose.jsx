import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";


function AddPose(props) {
  const [english_name, setenglish_name] = useState("");
  const [sanskrit_name, setsanskrit_name] = useState("");
  const [pose_description, setpose_description] = useState("");
  const [pose_benefits, setpose_benefits] = useState("");

  const getToken = () => {
    return localStorage.getItem("authToken")
  }

  const handleSubmit = (e) => {      
    e.preventDefault();

    // We need the category id when creating the new pose
    const { favoritesId } = props;
    const requestBody = { 
      english_name, 
      sanskrit_name,
      pose_description,
      pose_benefits,
     };
 
    axios
      .post(`${API_URL}/api/my-favorites/${favoritesId}/add-pose`, 
      requestBody, 
        { headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {

        setenglish_name("");
        setsanskrit_name("");
        setpose_description("");
        setpose_benefits("");
      
        props.refreshFavorite();
      })
      .catch((error) => console.log(error));
  };

  
  return (
    <div className="AddPose">
      <h3>Add New Pose</h3>
      
      <form onSubmit={handleSubmit}>
        <label>English Name:</label>
        <input
          type="text"
          name="english_name"
          value={english_name}
          onChange={(e) => setenglish_name(e.target.value)}
        />

        <label>Sanskrit Name:</label>
        <textarea
          type="text"
          name="sanskrit_name"
          value={sanskrit_name}
          onChange={(e) => setsanskrit_name(e.target.value)}
        />

        <label>Pose Description:</label>
        <textarea
          type="text"
          name="pose_description"
          value={pose_description}
          onChange={(e) => setpose_description(e.target.value)}
        />

        <label>Pose Benefits:</label>
        <textarea
          type="text"
          name="pose_benefits"
          value={pose_benefits}
          onChange={(e) => setpose_benefits(e.target.value)}
        />

        <button type="submit">Add Pose</button>
      </form>
    </div>
  );
}

export default AddPose;