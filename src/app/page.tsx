"use client";
import { getData } from "@/actions";
import { useState, useEffect } from "react";

export default function RecipesLibrary() {
  const [dataItems, setDataItems] = useState([]);
  const [per_page, setPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const pages = [
    { key: 1, page: 1 },
    { key: 2, page: 2 },
    { key: 3, page: 3 },
    { key: 4, page: 4 },
    { key: 5, page: 5 },
  ];

  const nextOrPrevious = (type: string) => {
    if (type == "next") {
      if (page === 5) {
        return;
      }
      setPage(page + 1);
    }

    if (type == "previous") {
      if (page === 1) {
        return;
      }
      setPage(page - 1);
    }
  };
  useEffect(() => {
    setLoading(true);
    const data = getData(per_page, page);
    data.then((items: any) => {
      setDataItems(items);
      setLoading(false);
    });
  }, [page]);

  return (
    <>
      {loading && (
        <div role="status" className="fixed top-1/2 left-1/2">
          <svg
            aria-hidden="true"
            className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}

      <div
        className="relative overflow-x-auto"
        style={{ visibility: loading ? "hidden" : "visible" }}
      >
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Url
              </th>
              <th scope="col" className="px-6 py-3">
                Repository Url
              </th>
              <th scope="col" className="px-6 py-3">
                Comments Url
              </th>
            </tr>
          </thead>
          <tbody>
            {dataItems?.map((item: any) => (
              <tr
                key={item.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.title}
                </th>
                <td className="px-6 py-4">{item.url}</td>
                <td className="px-6 py-4">{item.repository_url}</td>
                <td className="px-6 py-4">{item.comments_url}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {dataItems.length > 0 && (
        <nav
          aria-label="Page navigation example"
          className="flex justify-center mt-6"
        >
          <ul className="inline-flex  -space-x-px text-base h-10">
            <li>
              <a
                style={{ opacity: page === 1 ? 0.5 : "" }}
                onClick={() => nextOrPrevious("previous")}
                className="cursor-pointer flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </a>
            </li>
            {pages.map((item) => (
              <li key={item.key}>
                <a
                  style={{ color: item.page === page ? "blue" : "" }}
                  onClick={() => setPage(item.page)}
                  className="cursor-pointer flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  {item.page}
                </a>
              </li>
            ))}

            <li>
              <a
                onClick={() => nextOrPrevious("next")}
                className="cursor-pointer flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                style={{ opacity: page === 5 ? 0.5 : "" }}
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}
