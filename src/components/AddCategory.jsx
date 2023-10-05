import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes for type checking

function AddCategory(props) {
  const { onCategoryAdded, category_name, category_description, setCategoryName, setCategoryDescription } = props;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Call the parent component's function to handle category addition
    onCategoryAdded();

    // Reset form fields after submission
    setCategoryName("");
    setCategoryDescription("");
  };
}

// Define PropTypes to specify the expected props types
AddCategory.propTypes = {
  onCategoryAdded: PropTypes.func.isRequired,
  category_name: PropTypes.string.isRequired,
  category_description: PropTypes.string.isRequired,
  setCategoryName: PropTypes.func.isRequired,
  setCategoryDescription: PropTypes.func.isRequired,
};

export default AddCategory;