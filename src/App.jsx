import "./App.css";
import { Routes, Route } from "react-router-dom"; 
 
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage"; 
import CategoryListPage from "./pages/CategoryListPage";
import CategoryDetailsPage from "./pages/CategoryDetailsPage";
import EditCategoryPage from "./pages/EditCategoryPage";

function App() {
  return (
    <div className="App">
      
      <Navbar />
 
      <Routes>      
        <Route path="/" element={ <HomePage /> } />

        <Route path="/categories" element={<CategoryListPage />} />

        <Route path="/categories/:categoryId" element={<CategoryDetailsPage />} />

        <Route path="/categories/edit/:categoryId" element={ <EditCategoryPage /> } />
      </Routes>
      
    </div>
  );
}
export default App;
