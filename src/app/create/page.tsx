"use client";
import RecipeModal from "@/components/recipe-modal/RecipeModal";
import { debounce } from "lodash";
import { useRecipeStore } from "@/store/store";
import { useState } from "react";
import { Cart } from "@/components/cart/Cart";
import { Recipe, RecipeState } from "../types";

export default function CreateRecipePage() {
  const [search, setSearch] = useState("");
  const [showModal, setModalStatus] = useState(false);
  const recipes = useRecipeStore((state: RecipeState) => state.recipes);
  const searchRecipe = useRecipeStore(
    (state: RecipeState) => state.searchRecipe
  );

  const debounceTime = debounce(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      searchRecipe(event.target.value);
    },
    1000
  );

  const searchForRecipe = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearch(event.target.value);
    debounceTime(event);
  };
  return (
    <div className="recipe_create_wrapper">
      <div className="recipe_create_topbar mt-6">
        <div>
          <form className="max-w-md mx-auto">
            <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                value={search}
                onChange={(e) => searchForRecipe(e)}
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for recipe..."
                required
              />
            </div>
          </form>
        </div>
        <button onClick={() => setModalStatus(true)}>Create recipe</button>
      </div>

      <div className="recipe-list mt-6">
        <div className="grid grid-cols-4 gap-4 pr-6 pl-6">
          {recipes?.map((recipe: Recipe, index: number) => (
            <Cart index={index} key={index} recipe={recipe} />
          ))}
        </div>
      </div>

      <RecipeModal show={showModal} setModalStatus={setModalStatus} />
    </div>
  );
}
