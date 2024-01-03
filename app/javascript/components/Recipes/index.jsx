import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Select from 'react-select';
import { Pagination } from 'flowbite-react';

import Spinner from './../Spinner';

const Recipes = () => {
  const [queryParameters] = useSearchParams()
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(Number(queryParameters.get("page")) || 1);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [recipes, setRecipes] = useState([]);

  const onPageChange = (page) => {
    setCurrentPage(page);
    setRecipes([]);

    const url = `/api/v1/recipes/index?page=${currentPage}`;
    fetch(url)
      .then((res) => {
        if (res.ok) {
          setTotalCount(res.headers.get("Total-Count"));
          setTotalPages(res.headers.get("Total-Pages"));
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => setRecipes(res))
      .catch(() => navigate("/"));
  }

  useEffect(() => {
    const url = `/api/v1/recipes/index?page=${currentPage}`;
    fetch(url)
      .then((res) => {
        if (res.ok) {
          setTotalCount(res.headers.get("Total-Count"));
          setTotalPages(res.headers.get("Total-Pages"));
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
        <div className="mt-10">Showing <b>{currentPage}</b> of {totalPages} entries. Total count: <b>{totalCount}</b>.</div>

        <div className="mt-2 grid gap-2 grid-cols-5">
          {recipes.map(recipe => (
              <div className="border-2 rounded-md p-3 flex justify-between flex-col">
                <p className="p-0 m-0">
                  <img src={recipe.image} style={{ maxHeight: "300px" }}/>
                </p>
                <p className="p-0 m-0 text-center pt-3">{recipe.title}</p>
              </div>
          ))}
        </div>

        <div className="mt-10 flex overflow-x-auto sm:justify-center">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} showIcons />
        </div>
      </>}
    </div>
  )
};

export default Recipes;
