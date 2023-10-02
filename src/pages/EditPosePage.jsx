import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005";

function EditPosePage(props) {
//   const [category_name, setCategoryName] = useState("");
//   const [category_description, setCategoryDescription] = useState("");
  const [english_name, setEnglishName] = useState("");
  const [sanskrit_name, setSanskritName] = useState("");
  const [pose_description, setPoseDescription] = useState("");
  const [pose_benefits, setPoseBenefits] = useState("");
  const [url_png, setUrlPng] = useState("");

  const { poseId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {        
    
    const storedToken = localStorage.getItem('authToken');

  axios
        // API url needs to be adjusted
      .get(
        `${API_URL}/api/categories/${poseId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }    
      )
      .then((response) => {
        const onePose = response.data;
        // setTitle(onePose.category_name);
        // setDescription(onePose.category_description);
        setEnglishName(onePose.english_name);
        setSanskritName(onePose.sanskrit_name);
        setPoseDescription(onePose.pose_description);
        setPoseBenefits(onePose.pose_benefits);
        setUrlPng(onePose.url_png);
      })
      .catch((error) => console.log(error));
    
  }, [poseId]);

  const handleFormSubmit = (e) => {                     
    e.preventDefault();

    const requestBody = { 
        english_name,
        sanskrit_name, 
        pose_description,
        pose_benefits,
        url_png
     };

    const storedToken = localStorage.getItem('authToken');  

    axios
    .put(
        // API url needs to be adjusted
      `${API_URL}/api/categories/${poseId}`,
      requestBody,
      { headers: { Authorization: `Bearer ${storedToken}` } }              
    )
    .then((response) => {
        // url needs to be adjusted
      navigate(`/categories/${poseId}`)
    });
  };

  const deletePose = () => {                   

    const storedToken = localStorage.getItem('authToken');      

    axios
    // url needs to be adjusted
        .delete(
          `${API_URL}/api/categories/${poseId}`,
          { headers: { Authorization: `Bearer ${storedToken}` } }           
        )
        .then(() => navigate("/categories"))
        .catch((err) => console.log(err));
    };
  
  return (
    <div className="EditPosePage">
      <h3>Edit the Pose</h3>

      <form onSubmit={handleFormSubmit}>
        <label>English Name:</label>
        <input
          type="text"
          name="english_name"
          value={english_name}
          onChange={(e) => setEnglishName(e.target.value)}
        />
        
        <label>Sanskrit Name:</label>
        <textarea
          name="sanskrit_name"
          value={sanskrit_name}
          onChange={(e) => setSanskritName(e.target.value)}
        />

        <label>Pose Description:</label>
        <textarea
          name="pose_description"
          value={pose_description}
          onChange={(e) => setPoseDescription(e.target.value)}
        />

        <label>Pose Benefits:</label>
        <textarea
          name="pose_benefits"
          value={pose_benefits}
          onChange={(e) => setPoseBenefits(e.target.value)}
        />

        <label>Image:</label>
        <textarea
          name="url_png"
          value={url_png}
          onChange={(e) => setUrlPng(e.target.value)}
        />

        <button type="submit">Update Pose</button>

        {/* <input type="submit" value="Submit" /> */}
      </form>

      <button onClick={deletePose}>Delete Pose</button>

    </div>
  );
}

export default EditPosePage;
