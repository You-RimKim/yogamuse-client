import "./App.css";
import { Routes, Route } from "react-router-dom"; 
 
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage"; 
import AboutPage from "./pages/AboutPage";
import AddNewCategory from "./pages/AddNewCategory";
import AddNewPose from "./pages/AddNewPose";
import EditCategoryPage from "./pages/EditCategoryPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsPrivate from "./components/IsPrivate"; 
import IsAnon from "./components/IsAnon";

import AllPoses from "./pages/AllPoses";
import CategoriesPage from "./pages/Categories";
import PoseDetailsPage from "./pages/PoseDetailsPage";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <div className="App">
      <Navbar />
 
      <Routes>      
        <Route path="/" element={ <HomePage /> } />

        <Route path="/about" element={<AboutPage />} />
 
        <Route path="/user" element={<UserProfile />} />

        <Route
          path="/categories/add-category"
          element={<AddNewCategory /> } 
          // element={ <IsPrivate> <AddNewCategory /> </IsPrivate> } 
        />
 
        <Route
          path="/categories/:categoryId"
          element={<AddNewPose />}
          // element={ <IsPrivate> <AddNewPose /> </IsPrivate> }
        />
 
        <Route
          path="/categories/edit/:categoryId"
          element={<EditCategoryPage /> }
          // element={ <IsPrivate> <EditCategoryPage /> </IsPrivate> } 
        />
        
        <Route path="/signup" element={<IsAnon> <SignupPage /> </IsAnon>} />
        <Route path="/login" element={<IsAnon> <LoginPage /> </IsAnon>} />

        <Route path="/all-poses" element={<IsAnon> <AllPoses /> </IsAnon>} />

        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/poses/:category" element={<PoseDetailsPage />} />
      </Routes>
    </div>
  );
}
 
export default App;
