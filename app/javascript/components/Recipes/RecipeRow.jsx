import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const RecipeRow = ({ recipe }) => {
  const { id, image, title } = recipe;
  const navigate = useNavigate();

  const handleOnClick = () => navigate("/recipe/" + id);

  return (
    <div
      className="border-2 rounded-md p-3 flex justify-between flex-col cursor-pointer"
      style={{ height: "350px" }}
      onClick={handleOnClick}
    >
      <p className="p-0 m-0">
        <img src={image} loading="lazy" style={{ width: "100%", maxHeight: "250px" }}/>
      </p>
      <p className="p-0 m-0 text-center pt-3">{title}</p>
    </div>
  );
};

RecipeRow.propTypes = {
  recipe: PropTypes.object.isRequired,
};

export default RecipeRow;
