import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from 'react-select';

import Spinner from './../Spinner';

const Recipes = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const url = "/api/v1/recipes/index";
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => setRecipes(res))
      .catch(() => navigate("/"));
  }, []);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mx-auto justify-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Recipes Search
        </h1>
      </div>

      <div className="mt-20 rounded-md border-2 p-6">
        <div className="flex items-center">
          <span style={{ width: "200px" }}>By title:</span>
          <input
            type="text"
            name="price"
            id="price"
            className="block w-1/3 rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Type your title..."
          />
        </div>

        <div className="mt-2 flex items-center">
          <span style={{ width: "200px" }}>By categories:</span>
          <Select
            isMulti
            options={[]}
            className="block w-1/3 rounded-md border-0 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <div className="mt-2 flex items-center">
          <span style={{ width: "200px" }}>By ingredients:</span>
          <input
            type="text"
            name="price"
            id="price"
            className="block w-1/3 rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Type your ingredient..."
          />
          <button className="ml-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-xs rounded">
            Add ingredient
          </button>
        </div>
      </div>

      {recipes.length === 0 && <Spinner />}
      {recipes.length > 0 && <>
        <div className="mt-10 grid gap-2 grid-cols-5">
          {recipes.map(recipe => (
              <div className="border-2 rounded-md p-3 flex justify-between flex-col">
                <p className="p-0 m-0">
                  <img src={recipe.image} style={{ maxHeight: "300px" }}/>
                </p>
                <p className="p-0 m-0 text-center pt-3">{recipe.title}</p>
              </div>
          ))}
        </div>
      </>}
    </div>
  )
};

export default Recipes;
