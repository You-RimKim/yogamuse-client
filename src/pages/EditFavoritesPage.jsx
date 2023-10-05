import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005";

function EditFavoritesPage(props) {
  const [category_name, setcategory_name] = useState("");
  const [category_description, setcategory_description] = useState("");
  const [english_name, setenglish_name] = useState("");
  const [sanskrit_name, setsanskrit_name] = useState("");
  const [pose_description, setpose_description] = useState("");
  const [pose_benefits, setpose_benefits] = useState("");
  const [url_png, seturl_png] = useState("");

  const { favoritesId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {        
    
    const storedToken = localStorage.getItem('authToken');

  axios
        // API url needs to be adjusted
      .get(
        `http://localhost:5005/api/my-favorites/${favoritesId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }    
      )
      .then((response) => {
        const onePose = response.data;
        setcategory_name(onePose.category_name);
        setcategory_description(onePose.category_description);
        setenglish_name(onePose.english_name);
        setsanskrit_name(onePose.sanskrit_name);
        setpose_description(onePose.pose_description);
        setpose_benefits(onePose.pose_benefits);
        seturl_png(onePose.url_png);
      })
      .catch((error) => console.log(error));
    
  }, [favoritesId]);

  const handleFormSubmit = (e) => {                     
    e.preventDefault();

    const requestBody = { 
        category_name,
        category_description,
        english_name,
        sanskrit_name, 
        pose_description,
        pose_benefits,
        url_png
     };

    const storedToken = localStorage.getItem('authToken');  

    axios
    .put(
      `http://localhost:5005/api/my-favorites/${favoritesId}`,
      requestBody,
      { headers: { Authorization: `Bearer ${storedToken}` } }              
    )
    .then((response) => {
      navigate(`api/my-favorites/${favoritesId}`)
    });
  };

  const deleteFavorite = () => {                   

    const storedToken = localStorage.getItem('authToken');      

    axios
        .delete(
          `http://localhost:5005/api/my-favorites/${favoritesId}`,
          { headers: { Authorization: `Bearer ${storedToken}` } }           
        )
        .then(() => navigate("/my-favorites"))
        .catch((err) => console.log(err));
    };
  
  return (
    <div className="EditfavoritePage">
      <h3>Edit your favorite Category</h3>

      <form onSubmit={handleFormSubmit}>
        <label>English Name:</label>
        <input
          type="text"
          name="english_name"
          value={english_name}
          onChange={(e) => setenglish_name(e.target.value)}
        />
        
        <label>Sanskrit Name:</label>
        <textarea
          name="sanskrit_name"
          value={sanskrit_name}
          onChange={(e) => setsanskrit_name(e.target.value)}
        />

        <label>Pose Description:</label>
        <textarea
          name="pose_description"
          value={pose_description}
          onChange={(e) => setpose_description(e.target.value)}
        />

        <label>Pose Benefits:</label>
        <textarea
          name="pose_benefits"
          value={pose_benefits}
          onChange={(e) => setpose_benefits(e.target.value)}
        />

        <label>Image:</label>
        <textarea
          name="url_png"
          value={url_png}
          onChange={(e) => seturl_png(e.target.value)}
        />

        <button type="submit">Update Pose</button>

        {/* <input type="submit" value="Submit" /> */}
      </form>

      <button onClick={deleteFavorite}>Delete fave</button>

    </div>
  );
}

export default EditFavoritesPage;
