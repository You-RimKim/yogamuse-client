function PoseCard({ 
  id, 
  english_name, 
  sanskrit_name, 
  pose_description,
  pose_benefits,
  url_png
  }) {
    return (
      <div className="PoseCard card">
        <p>{url_png}</p>
        <h3>{id}</h3>
        <h4>English Name:</h4>
        <p>{english_name}</p>
        <h4>Sanskrit Name:</h4>
        <p>{sanskrit_name}</p>
        <h4>Pose Description:</h4>
        <p>{pose_description}</p>
        <h4>Pose Benefits:</h4>
        <p>{pose_benefits}</p>
      </div>
    );
  }
  
  export default PoseCard;
  