export async function getData(per_page: number, page: number) {
  const response = await fetch(
    `https://api.github.com/repositories/1300192/issues?per_page=${per_page}&page=${page}`
  );

  return await response.json();
}
