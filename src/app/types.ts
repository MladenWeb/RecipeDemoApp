export type Params = {
  [param: string]: string | string[] | undefined;
};
export type SearchParams = {
  [param: string]: string | string[] | undefined;
};
export type PageProps = {
  params: Params;
  searchParams: SearchParams;
};
export type LayoutProps = {
  params: Params;
  children: React.ReactElement;
};

export type RecipeData = {
  id: number;
  title: string;
  url: string;
  repository_url: string;
  comments_url: string;
};

export type Recipe = {
  recipe_name: string;
  description: string;
};

export type RecipeState = {
  recipes: Recipe[];
  originalRecipes: Recipe[];
  addRecipe: (data: Recipe) => void;
  deleteRecipe: (data: Recipe) => void;
  searchRecipe: (data: string) => void;
  updateRecipe: (data: Recipe) => void;
};
