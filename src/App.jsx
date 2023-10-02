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
import CategoryDetailsPage from "./pages/CategoryDetailsPage";
import UserProfile from "./pages/UserProfile";
import FavoritesPage from "./pages/FavoritesPage";
import EditPosePage from "./pages/EditPosePage";

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
          path="/add-pose/:poseId"
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

        <Route path="/poses" element={<IsAnon> <AllPoses /> </IsAnon>} />
        <Route
          path="/poses/edit/:poseId"
          element={<EditPosePage /> }
          // element={ <IsPrivate> <EditPosePage /> </IsPrivate> } 
        />

        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/categories/:category" element={<CategoryDetailsPage />} />

        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </div>
  );
}
 
export default App;
