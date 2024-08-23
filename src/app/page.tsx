import { getData } from "@/api/recipe";
import { PageProps, RecipeData } from "./types";
import Pagination from "@/components/pagination/pagination";

export default async function RecipesPage({
  searchParams: { page },
}: PageProps) {
  let pageQuery: number = Number(page);

  if (isNaN(pageQuery)) {
    pageQuery = 1;
  }

  const data: RecipeData[] = await getData(5, pageQuery);

  return <Pagination page={pageQuery} data={data} />;
}
