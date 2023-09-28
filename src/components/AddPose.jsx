import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";


function AddPose(props) {
  // const [id, setId] = useState("");
  const [english_name, setEnglishName] = useState("");
  const [sanskrit_name, setSanskritName] = useState("");
  const [pose_description, setPoseDescription] = useState("");
  const [pose_benefits, setPoseBenefits] = useState("");
  const [url_png, setUrlPng] = useState("");

  
  const handleSubmit = (e) => {      
    e.preventDefault();

    // We need the category id when creating the new pose
    const { categoryId } = props;
    // Create an object representing the body of the POST request
    const requestBody = { 
      id, 
      english_name, 
      sanskrit_name,
      pose_description,
      pose_benefits,
      url_png,
      category };
 
    axios
      .post(`${API_URL}/api/poses`, requestBody)
      .then((response) => {
        // Reset the state to clear the inputs
        setEnglishName("");
        setSanskritName("");
        setPoseDescription("");
        setPoseBenefits("");
        setUrlPng("");
      
        // Invoke the callback function coming through the props
        // from the CategoryDetailsPage, to refresh the category details
        props.refreshCategory();
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
          onChange={(e) => setEnglishName(e.target.value)}
        />

        <label>Sanskrit Name:</label>
        <textarea
          type="text"
          name="sanskrit_name"
          value={sanskrit_name}
          onChange={(e) => setSanskritName(e.target.value)}
        />

        <label>Pose Description:</label>
        <textarea
          type="text"
          name="pose_description"
          value={pose_description}
          onChange={(e) => setPoseDescription(e.target.value)}
        />

        <label>Pose Benefits:</label>
        <textarea
          type="text"
          name="pose_benefits"
          value={pose_benefits}
          onChange={(e) => setPoseBenefits(e.target.value)}
        />

        {/* url_png here */}

        <button type="submit">Add Pose</button>
      </form>
    </div>
  );
}

export default AddPose;
