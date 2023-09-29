import "./App.css";
import { Routes, Route } from "react-router-dom"; 
 
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage"; 
import CategoryListPage from "./pages/CategoryListPage";
import CategoryDetailsPage from "./pages/CategoryDetailsPage";
import EditCategoryPage from "./pages/EditCategoryPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsPrivate from "./components/IsPrivate"; 
import IsAnon from "./components/IsAnon";

import AllCategories from "./pages/AllCategories";
import CategorySelectionPage from "./pages/CategorySelection";
import PoseDetailsPage from "./pages/PoseDetailsPage";

function App() {
  return (
    <div className="App">
      <Navbar />
 
      <Routes>      
        <Route path="/" element={ <HomePage /> } />
 
        <Route
          path="/categories"
          element={<CategoryListPage /> } 
          // element={ <IsPrivate> <CategoryListPage /> </IsPrivate> } 
        />
 
        <Route
          path="/categories/:categoryId"
          element={<CategoryDetailsPage />}
          // element={ <IsPrivate> <CategoryDetailsPage /> </IsPrivate> }
        />
 
        <Route
          path="/categories/edit/:categoryId"
          element={<EditCategoryPage /> }
          // element={ <IsPrivate> <EditCategoryPage /> </IsPrivate> } 
        />
        
        <Route path="/signup" element={<IsAnon> <SignupPage /> </IsAnon>} />
        <Route path="/login" element={<IsAnon> <LoginPage /> </IsAnon>} />

        <Route path="/allcat" element={<IsAnon> <AllCategories /> </IsAnon>} />
        <Route path="/singlecat" element={<IsAnon> <AllCategories /> </IsAnon>} />

        <Route path="/poses" element={<CategorySelectionPage />} />
        <Route path="/poses/:category" element={<PoseDetailsPage />} />

      </Routes>
    </div>
  );
}
 
export default App;
