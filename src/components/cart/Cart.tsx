"use client";
import { useRecipeStore } from "@/store/store";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Recipe, RecipeState } from "@/app/types";
import CustomInput from "../input/Input";

const schema = z.object({
  recipe_name: z
    .string()
    .min(2, { message: "Recipe name must have minimum 2 characters" }),
  description: z
    .string()
    .min(2, { message: "Description must have minimum 2 characters." }),
});

export function Cart({ recipe, index }: { recipe: Recipe; index: number }) {
  const form = useForm<Recipe>({
    defaultValues: recipe,
    resolver: zodResolver(schema),
  });
  const { register, handleSubmit, formState, setValue, clearErrors } = form;
  const [edit, setEdit] = useState(false);
  const removeRecipe = useRecipeStore(
    (state: RecipeState) => state.deleteRecipe
  );
  const updateRecipe = useRecipeStore(
    (state: RecipeState) => state.updateRecipe
  );
  const { errors } = formState;

  const closeEditMode = () => {
    clearErrors();
    setValue("recipe_name", recipe.recipe_name);
    setValue("description", recipe.description);

    setEdit(false);
  };

  const formSubmit = (data: Recipe) => {
    updateRecipe(data, index);
    setEdit(false);
  };
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
      {!edit && (
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {recipe?.recipe_name}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {recipe.description}
          </p>
          <a
            onClick={() => removeRecipe(recipe)}
            className="cursor-pointer inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            Remove
          </a>
          <a
            onClick={() => setEdit(!edit)}
            className="cursor-pointer ml-3 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Modify
          </a>
        </div>
      )}
      {edit && (
        <div className="p-5">
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="flex flex-col">
              <label>Recipe name</label>
              <CustomInput
                register={register("recipe_name")}
                name="recipe_name"
                type="text"
                placeholder="Enter recipe name..."
              />
              <span style={{ color: "red", fontSize: "12px" }}>
                {errors.recipe_name?.message}
              </span>
            </div>
            <div className="flex flex-col">
              <label>Description</label>
              <textarea
                className="border-solid border-2 border-grey-600 rounded-2xl p-2"
                placeholder="Enter description..."
                style={{ height: "4rem", padding: "0.7rem" }}
                id="ingredient_name"
                {...register("description")}
              />
              <span style={{ color: "red", fontSize: "12px" }}>
                {errors.description?.message}
              </span>
            </div>
            <button
              type="submit"
              className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>

            <button
              onClick={() => closeEditMode()}
              className=" mt-3 ml-3 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
