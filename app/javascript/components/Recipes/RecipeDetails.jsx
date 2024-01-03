import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';

import Spinner from './../Spinner';

const RecipeDetails = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { id } = params;
  const [isLoading, setIsLoading] = useState(true);
  const [recipe, setRecipe] = useState({});

  const {
    title,
    cook_time,
    prep_time,
    ingredients,
    rating,
    cuisine,
    author,
    image,
  } = recipe;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await getRecipe();
      setIsLoading(false);
    }

    fetchData()
  }, []);

  const getRecipe = async () => {
    fetch(`/api/v1/recipe/${id}`)
    .then((res) => {
      if (res.ok) return res.json();
      throw new Error("Something went wrong");
    })
    .then((res) => setRecipe(res))
    .catch(() => navigate("/"));
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mx-auto justify-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          {title} ({rating})
        </h1>

        <p className="mt-10">
          <img src={image} loading="lazy" className="mx-auto" style={{ maxHeight: "250px" }}/>
        </p>
      </div>

      <div className="mt-10 rounded-md border-2">
        <div className="p-2 flex items-center">
          <span style={{ width: "200px" }}>Title</span>
          <span>{title}</span>
        </div>
        <div className="p-2 flex items-center bg-gray-200">
          <span style={{ width: "200px" }}>Cook Time</span>
          <span>{cook_time}</span>
        </div>
        <div className="p-2 flex items-center">
          <span style={{ width: "200px" }}>Prepration Time</span>
          <span>{prep_time}</span>
        </div>
        <div className="p-2 flex items-center bg-gray-200">
          <span style={{ width: "200px" }}>Ingredients</span>
          <ul>
            {ingredients?.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        <div className="p-2 flex items-center">
          <span style={{ width: "200px" }}>Rating</span>
          <span>{rating}</span>
        </div>
        <div className="p-2 flex items-center bg-gray-200">
          <span style={{ width: "200px" }}>Cuisine</span>
          <span>{cuisine || "N/A"}</span>
        </div>
        <div className="p-2 flex items-center">
          <span style={{ width: "200px" }}>Author</span>
          <span>{author}</span>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;