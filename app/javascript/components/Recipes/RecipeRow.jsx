import React from "react";
import PropTypes from "prop-types";
import { useNavigate, useSearchParams } from "react-router-dom";

const RecipeRow = ({ recipe }) => {
  const [queryParameters] = useSearchParams()
  const navigate = useNavigate();

  const { id, image, title } = recipe;

  const handleOnClick = () => navigate("/recipe/" + id, { state: { historyParams: queryParameters.toString() } });

  return (
    <div
      className="border-2 rounded-md p-3 flex justify-between flex-col cursor-pointer"
      style={{ height: "350px" }}
      onClick={handleOnClick}
    >
      <p className="p-0 m-0">
        <img src={image} loading="lazy" alt="Image" style={{ width: "100%", maxHeight: "250px" }}/>
      </p>
      <p className="p-0 m-0 text-center pt-3">{title}</p>
    </div>
  );
};

RecipeRow.propTypes = {
  recipe: PropTypes.object.isRequired,
};

export default RecipeRow;
