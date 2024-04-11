import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { GoArrowDown, GoArrowUp } from "react-icons/go";

const CityTable = ({ cities }) => {
  const [searchValue, setSearchValue] = useState("");
  const [cityList, setCityList] = useState(cities.results);
  const [rowsLimit, setRowsLimit] = useState(10);
  const [rowsToShow, setRowsToShow] = useState(cityList.slice(0, rowsLimit));
  const [customPagination, setCustomPagination] = useState([]);
  const [activeColumn, setActiveColumn] = useState([""]);
  const [sortingColumn, setSortingColumn] = useState(["population"]);
  const [totalPage, setTotalPage] = useState(
    Math.ceil(cityList.length / rowsLimit)
  );
  const [currentPage, setCurrentPage] = useState(0);

  const searchCities = (keyword) => {
    keyword = keyword.toLowerCase();
    setSearchValue(keyword);
    if (!keyword) {
      setCityList(cities.results);
    } else {
      const results = cities.results.filter((city) => {
        return (
          city.name.toLowerCase().includes(keyword),
          city.ascii_name.toLowerCase().includes(keyword)
        );
      });
      setCityList(results);
    }
    setCurrentPage(0);
  };

  const clearData = () => {
    setSearchValue("");
    setCityList(cities.results);
    setCurrentPage(0);
  };

  const sortByColumn = (column) => {
    let sortedCities;
    const isPrice = column === "population";

    // Check if the column is already active for sorting
    if (sortingColumn.includes(column)) {
      // If already sorting, toggle between ascending and descending order
      sortedCities = cityList.slice().reverse();
    } else {
      // If not sorting, sort the column in ascending order
      sortedCities = cityList.slice().sort((a, b) => {
        if (isPrice) return a[column] - b[column];
        return a[column].localeCompare(b[column]);
      });
    }

    setCityList(sortedCities);
    setActiveColumn([column]);
    setSortingColumn([column]);
    setCurrentPage(0);
  };

  const nextPage = () => {
    const startIndex = rowsLimit * (currentPage + 1);
    const endIndex = startIndex + rowsLimit;
    setRowsToShow(cityList.slice(startIndex, endIndex));
    setCurrentPage(currentPage + 1);
  };

  const changePage = (value) => {
    const startIndex = value * rowsLimit;
    const endIndex = startIndex + rowsLimit;
    setRowsToShow(cityList.slice(startIndex, endIndex));
    setCurrentPage(value);
  };

  const previousPage = () => {
    const startIndex = (currentPage - 1) * rowsLimit;
    const endIndex = startIndex + rowsLimit;
    setRowsToShow(cityList.slice(startIndex, endIndex));
    setCurrentPage(currentPage - 1);
  };

  useMemo(() => {
    setCustomPagination(
      Array(Math.ceil(cityList.length / rowsLimit)).fill(null)
    );
  }, [cityList.length, rowsLimit]);

  useEffect(() => {
    setRowsToShow(cityList.slice(0, rowsLimit));
    setTotalPage(Math.ceil(cityList.length / rowsLimit));
  }, [cityList, rowsLimit]);

  return (
    <div className="min-h-screen h-full bg-white flex items-center justify-center pt-10 pb-14">
      <div className="w-full max-w-6xl px-2">
        {/* <div>
          <h1 className="flex justify-center text-2xl font-medium items-center">
            Cities
          </h1>
        </div> */}
        <div className="flex justify-end bg-gray-200 px-2 mt-2 py-2 border-b-2 border-black">
          <div className="px-2 bg-white py-3 rounded-lg">
            <div className="flex items-center gap-2">
              <input
                type="text"
                className="sm:max-w-[150px] max-w-[120px] text-sm bg-transparent focus:ring-0 border-transparent outline-none placeholder:text-black text-black w-[85%]"
                placeholder="Keyword Search"
                onChange={(e) => searchCities(e.target.value)}
                value={searchValue}
              />
              <button
                className={`text-black cursor-pointer ${
                  searchValue.length > 0 ? "visible" : "invisible"
                }`}
                onClick={clearData}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
        <div className="w-full overflow-x-scroll md:overflow-auto max-w-7xl 2xl:max-w-none">
          <table className="table-auto overflow-scroll md:overflow-auto w-full text-left font-inter border ">
            {/* Table header */}
            <thead className="rounded-lg text-base text-white font-semibold w-full">
              <tr className="border-x-2 border-t-2 text-2xl">
                <th className="py-3 px-3 text-[#212B36] md:text-xl text-base sm:font-bold whitespace-nowrap">
                  GeoID
                </th>
                <th className="py-3 px-3 text-[#212B36] md:text-xl text-base sm:font-bold whitespace-nowrap">
                  <div className="flex items-center">
                    <span
                      className={`cursor-pointer pl-1 ${
                        activeColumn.includes("name") ? "text-black" : ""
                      }`}
                      onClick={() => sortByColumn("name")}
                    >
                      <div className="flex items-center">
                        <h2 className="pr-3">City </h2>
                        {sortingColumn.includes("name") ? (
                          <GoArrowUp />
                        ) : (
                          <GoArrowDown />
                        )}
                      </div>
                    </span>
                  </div>
                </th>
                <th className="py-3 px-3 text-[#212B36] md:text-xl text-base sm:font-bold whitespace-nowrap">
                  <div className="flex items-center">
                    <span>Ascii Name</span>
                  </div>
                </th>
                <th className="py-3 px-3 text-[#212B36] md:text-xl text-base sm:font-bold whitespace-nowrap">
                  <div className="flex items-center">
                    <span
                      className={`cursor-pointer pl-1 ${
                        activeColumn.includes("population") ? "text-black" : ""
                      }`}
                      onClick={() => sortByColumn("population")}
                    >
                      <div className="flex items-center">
                        <h2 className="pr-3">Population </h2>
                        {sortingColumn.includes("population") ? (
                          <GoArrowUp />
                        ) : (
                          <GoArrowDown />
                        )}
                      </div>
                    </span>
                  </div>
                </th>
                <th className="py-3 px-3 text-[#212B36] md:text-xl text-base sm:font-bold whitespace-nowrap">
                  <div className="flex items-center">
                    <span>Country</span>
                  </div>
                </th>
                <th className="py-3 px-3 text-[#212B36] md:text-xl text-base sm:font-bold whitespace-nowrap">
                  Timezone
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-md font-normal bg-white">
              {rowsToShow.map((city) => (
                <tr key={city.geoname_id} className="border-b border-gray-200">
                  <td className="py-3 px-3 border-r border-gray-200">
                    {city.geoname_id}
                  </td>
                  <td className="py-3 px-3 border-r hover:underline  border-gray-200">
                    <Link to={`/searchId/${city.geoname_id}`} target="_blank">
                      {city.name}
                    </Link>
                  </td>
                  <td className="py-3 px-3 border-r border-gray-200">
                    {city.ascii_name}
                  </td>
                  <td className="py-3 px-3 border-r border-gray-200">
                    {city.population}
                  </td>
                  <td className="py-3 px-3">{city.cou_name_en}</td>
                  <td className="py-3 px-3">{city.timezone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4 overflow-x-auto">
          <button
            className={`px-4 py-2 border border-gray-300 rounded-md mr-2 ${
              currentPage === 0 ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={previousPage}
            disabled={currentPage === 0}
          >
            Previous
          </button>
          {customPagination.map((item, index) => (
            <button
              key={index}
              className={`px-4 py-2 border border-gray-300 rounded-md ${
                currentPage === index ? "bg-gray-600 text-white" : ""
              }`}
              onClick={() => changePage(index)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className={`px-4 py-2 border border-gray-300 rounded-md ml-2 ${
              currentPage === totalPage - 1
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }`}
            onClick={nextPage}
            disabled={currentPage === totalPage - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CityTable;
