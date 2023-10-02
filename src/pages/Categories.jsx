import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//import { Link, useNavigate } from "react-router-dom";

function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  //const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Fetch categories
        const response = await fetch(
          "https://yoga-api-nzy4.onrender.com/v1/categories"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const categoryData = await response.json();

        // Fetch poses for each level and add them as categories
        const levels = ["beginner", "intermediate", "expert"];
        const levelCategories = await Promise.all(
          levels.map(async (level) => {
            const levelResponse = await fetch(
              `https://yoga-api-nzy4.onrender.com/v1/poses?level=${level}`
            );
            if (!levelResponse.ok) {
              throw new Error(`Failed to fetch ${level} level poses`);
            }
            const levelData = await levelResponse.json();
            return {
              id: level,
              category_name: level.charAt(0).toUpperCase() + level.slice(1), 
              poses: levelData.poses,
            };
          })
        );

        // Combine the original categories with the level categories
        const allCategories = [...categoryData, ...levelCategories];
        setCategories(allCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <h2>Choose a Category</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <Link to={`/poses/${category.category_name}`}>
              {category.category_name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoriesPage;


// // CategorySelectionPage.js

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// function CategorySelectionPage() {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await fetch(
//           "https://yoga-api-nzy4.onrender.com/v1/categories"
//         );
//         if (response.ok) {
//           const data = await response.json();
//           setCategories(data);
//         } else {
//           throw new Error("Failed to fetch categories");
//         }
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   return (
//     <div>
//       <h2>Choose a Category</h2>
//       <ul>
//         {categories.map((category) => (
//           <li key={category.id}>
//             <Link to={`/poses/${category.category_name}`}>
//               {category.category_name}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default CategorySelectionPage;
