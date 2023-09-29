import { useState, useEffect } from "react";
import axios from "axios";

function SingleCategory({ categoryId }) {
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          `https://yoga-api-nzy4.onrender.com/v1/categories?id=${categoryId}`
        );
        setCategory(response.data[0]); // Assuming the API returns an array with one category
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    fetchCategory();
  }, [categoryId]);

  if (!category) {
    return <div>Loading...</div>;
  }

  return (
    <div className="SingleCategory">
      <h2>{category.category_name}</h2>
      <p>{category.category_description}</p>
      <ul>
        {category.poses.map((pose) => (
          <li key={pose.id}>
            <h4>{pose.english_name}</h4>
            <p>{pose.pose_description}</p>
            <img src={pose.url_svg} alt={pose.english_name} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SingleCategory;
