import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AsyncSelect from 'react-select/async';
import { Pagination } from 'flowbite-react';

import RecipeRow from './RecipeRow';
import Spinner from './../Spinner';

const Recipes = () => {
  const [queryParameters, setSearchParams] = useSearchParams()
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isIngredientsFilterButtonEnabled, setIsIngredientsFilterButtonEnabled] = useState(false);
  const [currentPage, setCurrentPage] = useState(Number(queryParameters.get("page")) || 1);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [titleFilter, setTitleFilter] = useState(queryParameters.get("title") || "");
  const [categoriesFilter, setCategoriesFilter] = useState([]);
  const categoriesFilterIds = categoriesFilter.map(category => category.value);
  const ingredientsFromQuery = queryParameters.get("ingredients");
  const [ingredientsFilter, setIngredientsFilter] = useState(
    ingredientsFromQuery ? ingredientsFromQuery.split(",") : []
  );

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await getRecipes();
    }

    updateSearchParams();
    fetchData();
  }, [currentPage, categoriesFilter, titleFilter, ingredientsFilter]);

  const updateSearchParams = () => {
    setSearchParams(`?${new URLSearchParams({
      page: currentPage,
      title: titleFilter,
      category_ids: categoriesFilterIds,
      ingredients: ingredientsFilter,
    })}`)
  };

  const fetchCategories = async (inputValue, callback) => {
    const response =
      await fetch(`/api/v1/categories/index?title=${inputValue}`)
        .then(response => response.json());
    await callback(response.map(category => {
      return { value: category.id, label: category.title }
    }));
  };

  const onChangeSelectedOption = async (options) =>
    setCategoriesFilter(options);

  const handleIngredientsFilterButton = () => {
    const input = document.querySelector('#ingredients_filter');
    const inputValue = input.value;
    setIngredientsFilter([...ingredientsFilter, inputValue]);
    input.value = "";
  };

  const deleteIngredient = (e) => {
    const filteredValues = ingredientsFilter.filter(ingredient => ingredient !== e.target.innerText);
    setIngredientsFilter(filteredValues);
  };

  const getRecipes = async () => {
    let url = `/api/v1/recipes/index?page=${currentPage}`;
    if (categoriesFilter.length > 0) url += `&category_ids=${categoriesFilterIds.join(',')}`;
    if (titleFilter.length > 0) url += `&title=${titleFilter}`;
    if (ingredientsFilter.length > 0) url += `&ingredients=${ingredientsFilter.join(',')}`;

    fetch(url)
      .then((res) => {
        if (res.ok) {
          setTotalCount(res.headers.get("Total-Count"));
          setTotalPages(res.headers.get("Total-Pages"));
          return res.json();
        }
        throw new Error("Something went wrong");
      })
      .then((res) => {
        setRecipes(res);
        setIsLoading(false);
      })
      .catch(() => navigate("/"));
  };

  const clearFilters = () => {
    setTitleFilter("");
    setCategoriesFilter([]);
    setIngredientsFilter([]);
    document.querySelector("#title_filter").value = "";
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mx-auto justify-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Recipes Search
        </h1>
      </div>

      <div className="mt-10 rounded-md border-2 p-6">
        <div className="flex items-center">
          <span style={{ width: "200px" }}>By title:</span>
          <input
            defaultValue={titleFilter}
            type="text"
            name="title-filter"
            id="title_filter"
            className="block w-1/2 rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Type your title..."
            onKeyUp={(e) => setTitleFilter(e.target.value)}
          />
        </div>

        <div className="mt-2 flex items-center">
          <span style={{ width: "200px" }}>By categories:</span>
          <AsyncSelect
            isMulti
            cacheOptions
            value={categoriesFilter}
            loadOptions={fetchCategories}
            onChange={onChangeSelectedOption}
            className="block w-1/2 rounded-md border-0 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Type your category..."
          />
        </div>

        <div className="mt-2 flex items-center">
          <span style={{ width: "200px" }}>By ingredients:</span>
          <input
            type="text"
            name="ingredients-filter"
            id="ingredients_filter"
            className="block w-1/2 rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Type your ingredient..."
            onKeyUp={(e) => e.target.value.length > 0 ? setIsIngredientsFilterButtonEnabled(true) : setIsIngredientsFilterButtonEnabled(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleIngredientsFilterButton();
              }
            }}
          />
          <button
            className="ml-2 disabled:opacity-75 bg-blue-500 enabled:hover:bg-blue-700 text-white font-bold py-2 px-4 text-xs rounded"
            disabled={!isIngredientsFilterButtonEnabled}
            onClick={handleIngredientsFilterButton}
          >
            Add ingredient
          </button>
        </div>

        <hr className="mt-5" />

        <div className="mt-5 flex items-center">
          <div style={{ width: "200px" }}>
            <p>Selected ingredients:</p>
            <small>(click the button to delete)</small>
          </div>

          {ingredientsFilter.length > 0 && ingredientsFilter.map((ingredient, index) => <>
            <span
              className="inline-flex items-center cursor-pointer rounded-md bg-gray-50 mr-2 p-3 hover:bg-gray-300 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
              onClick={deleteIngredient}
              key={index}
            >
              {ingredient}
            </span>
          </>)}
        </div>

        <div className="mt-5 flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={clearFilters}
          >
            Clear filters
          </button>
        </div>
      </div>

      {isLoading && <Spinner />}
      {!isLoading && <>
        <div className="mt-10">Showing <b>{currentPage}</b> of {totalPages} entries. Total count: <b>{totalCount}</b>.</div>

        <div className="mt-2 grid gap-2 grid-cols-5">
          {recipes.map((recipe, index) => <RecipeRow key={index} recipe={recipe} />)}
        </div>

        <div className="mt-10 flex overflow-x-auto sm:justify-center">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} showIcons />
        </div>
      </>}
    </div>
  )
};

export default Recipes;
