import React, { useState, useEffect, useCallback } from "react";
import { VscChevronDown } from "react-icons/vsc";
import axios from "axios";
import ASidebar from "../../components/AlumniSide/ASidebar";
import AAlumniboardView from "../../components/AlumniSide/AAlumniboardView";

const ANews = () => {
  const [newsdata, setNewsData] = useState([]);
  const [newsdatalist, setNewsDatalist] = useState({
    title: "",
    ptime: "",
    pdate: "",
    description: "",
  });

  const [isDate, setIsDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState("All");
  const [filteredNews, setFilteredNews] = useState([]);

  const DateOptions = [
    "All",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const filteredNewsByMonth = (month) => {
    const selectedMonth = month.toLowerCase();

    if (selectedMonth === "all") {
      return newsdata; // Show all news
    } else {
      const filtered = newsdata.filter((dnews) => {
        const newsDate = new Date(dnews.pdate);
        const newsMonth = newsDate
          .toLocaleString("default", { month: "long" })
          .toLowerCase();
        return newsMonth === selectedMonth;
      });

      if (filtered.length === 0) {
        return ["None"]; // Set a special value to indicate no news for the selected month
      } else {
        return filtered;
      }
    }
  };

  const selectDate = (stat) => {
    setSelectedDate(stat);
    setIsDate(false);

    const filtered = filteredNewsByMonth(stat);
    setFilteredNews(filtered);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const openDetailsModal = (dnews) => {
    setSelectedNews(dnews);
  };

  const closeDetailsModal = () => {
    setSelectedNews(null);
  };

  const toggleNews = () => {
    setIsOpen(!isOpen);
  };
  const handleChange = (e) => {
    setNewsDatalist((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSearch = (searchTerm, newsdata) => {
    if (searchTerm.trim() === "") {
      setFilteredNews(newsdata);
    } else {
      const filtered = newsdata.filter((dnews) =>
        dnews.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (filtered.length === 0) {
        setFilteredNews(["NONE"]);
      } else {
        setFilteredNews(filtered);
      }
    }
  };

  const memoizedHandleSearch = useCallback(
    (searchTerm) => {
      handleSearch(searchTerm, newsdata);
    },
    [newsdata]
  );

  useEffect(() => {
    memoizedHandleSearch(searchTerm);
  }, [searchTerm, memoizedHandleSearch]);

  const fetchNewsData = async () => {
    try {
      const res = await axios.get("http://localhost:3001/news"); // Update the URL to the correct endpoint
      setNewsData(res.data); // Update the state with the fetched data
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchNewsData();
  }, []);

  const newsToDisplay = filteredNews.length > 0 ? filteredNews : newsdata;
  return (
    <div className="flex">
      <div className="basis-[12%] h-[100vh] border">
        <ASidebar />
      </div>
      <div className="basis-[88%] border h-[100vh] overflow-scroll">
        <AAlumniboardView />
        <div className="flex-grow bg-gray-300 p-5 rounded-md container mx-auto overflow-x-auto h-full">
          <h3 className="text-2xl font-bold mb-3">News</h3>

          {/* Search Bar */}
          <div className="container mx-auto w-auto flex justify-between items-center">
            <div className="inline-block">
              <input
                type="text"
                className="bg-zinc-100 h-10  outline-none pl-4 w-[70px] sm:w-64 rounded-full sm:rounded-[5px] placeholder:text-[14px] leading-[20px] font-normal ml-2"
                placeholder="Search for..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="inline-block">
                <button
                  className="py-2 px-2 bg-white rounded-lg focus:outline-none w-auto flex"
                  onClick={() => setIsDate(!isDate)}
                >
                  {selectedDate} <VscChevronDown size={25} className="pl-1" />
                </button>
                {isDate && (
                  <ul className="absolute  bg-white border rounded-lg shadow-md overflow-x-auto max-h-40">
                    {DateOptions.map((stat, index) => (
                      <li
                        key={index}
                        className="cursor-pointer py-2 px-4 hover:bg-blue-100"
                        onClick={() => selectDate(stat)}
                      >
                        {stat}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div className="container mx-auto p-4 overflow-y-scroll h-full   w-full md:overflow-x-auto overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left font-medium">Image</th>
                  <th className="px-6 py-3 text-left font-medium">Name</th>
                  <th className="px-6 py-3 text-left font-medium">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left font-medium">
                    Posted Time
                  </th>
                  <th className="px-6 py-3 text-left font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {newsToDisplay.map((dnews) => (
                  <tr
                    key={dnews.id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="px-6 py-4">
                      {dnews.imagePath && (
                        <div className="w-full h-48 rounded border overflow-hidden">
                          <img
                            src={dnews.imagePath}
                            alt="Validation"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">{dnews.title}</td>
                    <td className="px-6 py-4">{dnews.description}</td>
                    <td className="px-6 py-4">
                      {dnews.ptime} {dnews.pdate}
                    </td>
                    <td className="px-6 py-4 cursor-pointer">
                      <button
                        className="text-blue-500 hover:underline"
                        onClick={() => openDetailsModal(dnews)}
                      >
                        View
                      </button>
                      {/* News Details Modal */}
                      {selectedNews && (
                        <div className="fixed inset-0 flex items-center justify-center z-10">
                          <div className="bg-white w-1/4 p-4 rounded shadow-lg z-20">
                            <h2 className="text-lg font-semibold mb-2 text-center">
                              News Details
                            </h2>
                            <div className="mb-4 flaot">
                              <strong>News Number:</strong> {selectedNews.id}
                            </div>
                            <div className="mb-4">
                              <strong>Title:</strong> {selectedNews.title}
                            </div>

                            <div className="mb-4">
                              <strong>Posted Time:</strong> {selectedNews.ptime}
                              <strong className="ml-16">Date:</strong>{" "}
                              {selectedNews.pdate}
                            </div>
                            <div className="mb-4">
                              <strong>Description:</strong>{" "}
                              {selectedNews.description}
                            </div>
                            <div className="mb-4">
                              {selectedNews.imagePath && (
                                <div className="w-full h-48 rounded border overflow-hidden">
                                  <img
                                    src={selectedNews.imagePath}
                                    alt="Validation"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                            </div>
                            <button
                              className="bg-red-500 text-white px-4 py-2 rounded"
                              onClick={() => {
                                closeDetailsModal();
                              }}
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ANews;
