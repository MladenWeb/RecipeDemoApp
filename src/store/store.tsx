import { Recipe, RecipeState } from "@/app/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useRecipeStore = create(
  persist(
    (set) => ({
      recipes: [],
      originalRecipes: [],
      addRecipe: (newRecipe: Recipe) =>
        set((state: RecipeState) => ({
          recipes: [newRecipe, ...state.recipes],
          originalRecipes: [newRecipe, ...state.recipes],
        })),

      updateRecipe: (newRecipe: Recipe, index: number) =>
        set((state: RecipeState) => {
          const element = state.recipes[index];
          element.recipe_name = newRecipe.recipe_name;
          element.description = newRecipe.description;

          return { recipes: state.recipes, originalRecipes: state.recipes };
        }),
      searchRecipe: (search: string) =>
        set((state: RecipeState) => ({
          recipes: state.originalRecipes.filter((recipe: Recipe) =>
            recipe.recipe_name.toLowerCase().includes(search.toLowerCase())
          ),
        })),
      deleteRecipe: (recipe: Recipe) =>
        set((state: RecipeState) => ({
          recipes: state.recipes.filter(
            (r: Recipe, index: number) =>
              index !== state.recipes.indexOf(recipe)
          ),
          originalRecipes: state.originalRecipes.filter(
            (r: Recipe, index) => index !== state.recipes.indexOf(recipe)
          ),
        })),
    }),

    {
      name: "recipes",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
