import React, { useState, useEffect } from "react";
import { VscChevronDown } from "react-icons/vsc";
import axios from "./../configs/axios-base-url";
import Sidebar from "../components/Sidebar";
import Dashboardview from "../components/Dashboardview";

const News = () => {
  const [newsdata, setNewsData] = useState([]);
  const [newsdatalist, setNewsDatalist] = useState({
    title: "",
    ptime: "",
    pdate: "",
    description: "",
    img: "",
  });

  const [isDate, setIsDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState("All");
  const [filteredNews, setFilteredNews] = useState([]);
  const [imageFile, setImageFile] = useState(null);

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
  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === "") {
      // If the search term is empty, display all news
      setFilteredNews(newsdata);
    } else {
      const filtered = newsdata.filter((dnews) =>
        dnews.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (filtered.length === 0) {
        setFilteredNews(["NONE"]); // Set a special value to indicate no matching news
      } else {
        setFilteredNews(filtered);
      }
    }
  };

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      CreateNews(e);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this News?"
    );
    if (!confirmDelete) {
      return; // User canceled the delete operation
    }

    try {
      await axios.delete(`/news/${id}`);
      // Assuming your API deletes the News successfully, you can update the state accordingly.
      fetchNewsData();
    } catch (err) {
      console.log(err);
    }
  };
  const CreateNews = async () => {
    try {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      const formattedDate = now.toLocaleDateString();

      const newsList = {
        ...newsdatalist,
        ptime: formattedTime, // Posted time (automated)
        pdate: formattedDate, // Posted date (automated)
        img: imageFile,
      };

      const formData = new FormData();
      formData.append("title", newsdatalist.title);
      formData.append("ptime", formattedTime);
      formData.append("pdate", formattedDate);
      formData.append("description", newsdatalist.description);
      formData.append("image", imageFile);

      // Update the URL to the correct backend endpoint (likely /news)
      await axios.post("/news", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Assuming your API returns the newly added News, you can update the state accordingly.
      fetchNewsData();
      setIsOpen(false);
      setNewsDatalist({
        title: "",
        ptime: "", // Posted time (automated)
        pdate: "", // Posted date (automated)
        description: "", // Event description (if needed)
        img: "",
      }); // Reset form fields after creating a News
    } catch (err) {
      console.log(err);
    }
  };

  const fetchNewsData = async () => {
    try {
      const res = await axios.get("/news"); // Update the URL to the correct endpoint
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
        <Sidebar />
      </div>
      <div className="basis-[88%] border h-[100vh]">
        <Dashboardview />
        <div className="flex-grow bg-gray-300 p-5 rounded-md container overflow-x-auto h-full">
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

            {/* Create New Event Button */}
            <div className="inline-block">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded"
                onClick={toggleNews}
              >
                Create News
              </button>
            </div>
          </div>

          {/* Create a new News */}
          {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-10">
              <div className="absolute inset-0 bg-black opacity-30"></div>
              <div className="bg-white p-4 rounded w-2/3 shadow-lg z-20">
                <h2 className="text-lg font-semibold mb-2 text-center">
                  Create New News
                </h2>
                <form>
                  <div className="mb-4">
                    <label className="block mb-1">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={newsdatalist.title}
                      onChange={handleChange}
                      className="w-full border rounded p-2"
                    />
                  </div>{" "}
                  <div className="mb-4">
                    <label className="block mb-1">Validation</label>
                    <input
                      type="file"
                      name="image"
                      onChange={(e) => setImageFile(e.target.files[0])}
                      className="w-full border rounded p-2"
                    />
                  </div>
                  {imageFile && (
                    <div className="mb-4">
                      <label className="block mb-1">Validation Image</label>
                      <div className="w-full h-48 rounded border overflow-hidden">
                        <img
                          src={URL.createObjectURL(imageFile)}
                          alt="Validation"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded mt-2"
                        onClick={() => setImageFile(null)}
                      >
                        Remove Image
                      </button>
                    </div>
                  )}
                  <div className="mb-4">
                    <label className="block mb-1">Description</label>
                    <textarea
                      type="text"
                      name="description"
                      value={newsdatalist.description}
                      onChange={handleChange}
                      className="w-full border rounded p-2"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={CreateNews}
                    onKeyDown={handleKeyPress}
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
                  >
                    Create
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded text-center"
                    onClick={toggleNews}
                  >
                    Close
                  </button>
                </form>
              </div>
            </div>
          )}

          <div className="container mx-auto p-4 h-full w-full md:overflow-x-auto ">
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
                {newsToDisplay.map((dnews, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="px-6 py-4">
                      {dnews.imagePath && (
                        <div className="w-full h-28 rounded border overflow-hidden">
                          <img
                            src={dnews.imagePath}
                            alt="Validation"
                            className="w-full h-full object-contain"
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
                          <div className="bg-white w-[50%] p-4 rounded shadow-lg z-20 ">
                            <h2 className="text-lg font-semibold mb-2 text-center">
                              Job Details
                            </h2>
                            <div className="mb-4 ">
                              <strong>Title:</strong> {selectedNews.title}
                            </div>
                            <div
                              className="mb-4"
                              style={{ maxHeight: "100px", overflowY: "auto" }}
                            >
                              <strong>Description:</strong>{" "}
                              {selectedNews.description}
                            </div>
                            <div className="mb-4">
                              <strong>Posted Time:</strong> {selectedNews.ptime}
                              <strong className="ml-16">Date:</strong>{" "}
                              {selectedNews.pdate}
                            </div>
                            <div className="mb-4">
                              {selectedNews.imagePath && (
                                <div className="w-full h-48 rounded border overflow-hidden">
                                  <img
                                    src={selectedNews.imagePath}
                                    alt="Validation"
                                    className="w-full h-full object-contain"
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
                      <button
                        className="text-red-500 hover:underline ml-2"
                        onClick={() => handleDelete(dnews.id)}
                      >
                        Delete
                      </button>
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

export default News;
