import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`https://yogamuse.onrender.com/api/user`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setUser(response.data); 
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  }, []);

  const handleLogout = () => {
    // Clear the authentication token from local storage
    localStorage.removeItem("authToken");
    // Redirect to the homepage ("/")
    navigate("/");
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      // Send a PUT request to update user information
      const updatedUserInfo = {
        name: user.name,
        email: user.email,
        password: user.password,
      };
  
      const storedToken = localStorage.getItem('authToken');
      axios
        .put(`https://yogamuse.onrender.com/api/user`, updatedUserInfo, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          // Handle successful update
          console.log('User updated:', response.data);
        })
        .catch((error) => {
          console.error('Error updating user:', error);
        });
    } else {
      // Send a DELETE request to delete the user profile
      const storedToken = localStorage.getItem('authToken');

      axios
        .delete(`https://yogamuse.onrender.com/api/user`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          // Handle successful deletion
          console.log('User deleted:', response.data);
          handleLogout();
          // navigate( '/' );
        })
        .catch((error) => {
          console.error('Error deleting user:', error);
        });

        axios
        .post(`https://yogamuse.onrender.com/api/logout`, {}, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then(() => {
          // Clear the authentication token from local storage
          localStorage.removeItem("authToken");
          // Redirect to the homepage ("/")
          navigate("/");
        })
        .catch((error) => {
          console.error("Error logging out:", error);
        });
    }

    setIsEditing(false);
    setIsDeleting(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
      // [email]: value,
      // [password]: value,
    }));
  };

  return (
    <div className="LoginPage"> {/* Reusing the LoginPage class */}
      <h2>User Profile</h2>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={user.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <button type="submit">Save</button>
          </div>
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
          <button onClick={() => setIsDeleting(true)}>Delete Profile</button>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {isDeleting && (
          <div>
            <p>
              Are you sure you want to delete your profile? This action cannot
              be undone.
            </p>
            <button type="submit">Confirm Deletion</button>
          </div>
        )}
      </form>
    </div>
      );
      };

      {/* Rest of your code */}

export default UserProfile;



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
