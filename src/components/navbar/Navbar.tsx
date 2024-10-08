"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const path = usePathname();

  return (
    <>
      <nav className="bg-white border-gray-20 border-b-2 border-grey">
        <div className="pl-9 pr-9 flex flex-wrap items-center justify-between mx-auto p-4 ">
          <Link
            href={path}
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <svg
              className="h-8 w-8 text-red-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {" "}
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />{" "}
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span
              className={`self-center text-2xl font-semibold whitespace-nowrap dark:text-white}`}
            >
              {path === "/" ? "Recipe library" : "Make a recipe"}
            </span>
          </Link>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  href="/"
                  className={`block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent  md:p-0 dark:text-white ${
                    path == "/" ? "md:text-blue-500" : "md:text-gray-900"
                  }`}
                  aria-current="page"
                >
                  Recipe Library
                </Link>
              </li>
              <li>
                <Link
                  href="create"
                  className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${
                    path == "/create" ? "md:text-blue-500" : ""
                  }`}
                >
                  Make a recipe
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
