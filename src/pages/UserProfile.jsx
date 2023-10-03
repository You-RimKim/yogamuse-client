import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserProfile = () => {
  const { id } = useParams(); 

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  //const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`http://localhost:5005/api/user/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setUser(response.data); 
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  }, [id]);


  const handleSubmit = (e) => {
    e.preventDefault();
    // You can implement logic to update user data on the server here
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={user.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Save</button>
        </form>
      ) : (
        <div>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Password:</strong> {user.password}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}

      {/* Rest of your code */}
    </div>
  );
};

export default UserProfile;



// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const UserProfile() => {
//   const { id } = useParams(); 

//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     const storedToken = localStorage.getItem("authToken");
//     axios.get(`http://localhost:5005/api/user/${user.id}`, {
//       headers: { Authorization: `Bearer ${storedToken}` },
//     })
//     .then((response) => {
//       setFavorites(response.data);
//     })
//     .catch((error) => {
//       console.error("Error fetching favorites:", error);
//     });
//   }, []);


// // const UserProfile = () => {
// //   // Sample user data (you can replace this with actual user data)
// //   const [user, setUser] = useState({
// //     firstName: 'John',
// //     lastName: 'Doe',
// //     email: 'johndoe@example.com',
// //   });

// //   const [isEditing, setIsEditing] = useState(false);

// //   // Function to handle form submission when editing
// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     // You can implement logic to update user data on the server here
// //     setIsEditing(false);
// //   };

//   const [selectedYogaStyle, setSelectedYogaStyle] = useState(''); // To store the selected yoga style
//   const [selectedTeachingLevel, setSelectedTeachingLevel] = useState(''); // To store the selected teaching level

//   // Define the list of yoga styles and teaching levels
//   const yogaStyles = [
//     'Vinyasa',
//     'Yin',
//     'Hatha',
//     'Ashtanga',
//     'Power',
//     'Rocket',
//     'Budokon',
//     'Inside Flow',
//     'Anusara',
//     'Jivamukti',
//     'Hot',
//   ];

//   const teachingLevels = ['Beginner Classes', 'Intermediate Classes', 'Advanced Classes', 'For Everyone'];

//   // Handle the change in the yoga style dropdown
//   const handleYogaStyleChange = (event) => {
//     setSelectedYogaStyle(event.target.value);
//   };

//   // Handle the change in the teaching level dropdown
//   const handleTeachingLevelChange = (event) => {
//     setSelectedTeachingLevel(event.target.value);
//   };

//   return (
//     <div className="user-profile">
//       <h2>User Profile</h2>
//       {isEditing ? (
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="name">Name:</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={user.name}
//               onChange={(e) => setUser({ ...user, {user.name}: e.target.value })}
//             />
//           </div>
//           <div>
//             <label htmlFor="password">Password:</label>
//             <input
//               type="text"
//               id="password"
//               name="password"
//               value={user.passwordd}
//               onChange={(e) => setUser({ ...user, {user.password}: e.target.value })}
//             />
//           </div>
//           <div>
//             <label htmlFor="email">Email:</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={user.email}
//               onChange={(e) => setUser({ ...user, {user.email}: e.target.value })}
//             />
//           </div>
//           <button type="submit">Save</button>
//         </form>
//       ) : (
//         <div>
//           <p>
//             <strong>Name:</strong> {user.name}
//           </p>
//           <p>
//             <strong>Password:</strong> {user.password}
//           </p>
//           <p>
//             <strong>Email:</strong> {user.email}
//           </p>
//           <button onClick={() => setIsEditing(true)}>Edit Profile</button>
//         </div>
//       )}

//       <div className="profile-details">
//         <h3>Yoga Style</h3>
//         <select value={selectedYogaStyle} onChange={handleYogaStyleChange}>
//           <option value="">Select Yoga Style</option>
//           {yogaStyles.map((style) => (
//             <option key={style} value={style}>
//               {style}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div className="profile-details">
//         <h3>Teaching Level</h3>
//         <select value={selectedTeachingLevel} onChange={handleTeachingLevelChange}>
//           <option value="">Select Teaching Level</option>
//           {teachingLevels.map((level) => (
//             <option key={level} value={level}>
//               {level}
//             </option>
//           ))}
//         </select>
//       </div>
//       {/* Display the selected values */}
//       {selectedYogaStyle && (
//         <div className="selected-info">
//           <h4>Selected Yoga Style:</h4>
//           <p>{selectedYogaStyle}</p>
//         </div>
//       )}
//       {selectedTeachingLevel && (
//         <div className="selected-info">
//           <h4>Selected Teaching Level:</h4>
//           <p>{selectedTeachingLevel}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserProfile;
