import { Link } from "react-router-dom";

// We are deconstructing props object directly in the parentheses of the function
function CategoryCard ( { category_name, category_description, _id } ) {
  
  return (
    <div className="CategoryCard card">
      <Link to={`/categories/${_id}`}>
        <h3>{category_name}</h3>
      </Link>
      <p style={{ maxWidth: "400px" }}>{category_description} </p>
    </div>
  );
}

export default CategoryCard;
