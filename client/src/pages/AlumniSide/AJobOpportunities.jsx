import React, { useState, useEffect } from "react";
import { VscChevronDown } from "react-icons/vsc";
import axios from "axios";
import ASidebar from "../../components/AlumniSide/ASidebar";
import AAlumniboardView from "../../components/AlumniSide/AAlumniboardView";

const AJobOpportunities = () => {
  const [joboppdata, setJobOppData] = useState([]);
  const [newJobData, setNewJobData] = useState({
    title: "",
    description: "",
    ptime: "",
    pdate: "",
    link: "",
    img: "",
  });

  const [isDate, setIsDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState("All");
  const [filteredJob, setFilteredJob] = useState([]);
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

  const filterEventsByMonth = (month) => {
    const selectedMonth = month.toLowerCase();

    if (selectedMonth === "all") {
      return joboppdata; // Show all events
    } else {
      const filtered = joboppdata.filter((event) => {
        const eventDate = new Date(event.pdate);
        const eventMonth = eventDate
          .toLocaleString("default", { month: "long" })
          .toLowerCase();
        return eventMonth === selectedMonth;
      });

      if (filtered.length === 0) {
        return ["None"]; // Set a special value to indicate no events for the selected month
      } else {
        return filtered;
      }
    }
  };

  const selectDate = (stat) => {
    setSelectedDate(stat);
    setIsDate(false);

    const filtered = filterEventsByMonth(stat);
    setFilteredJob(filtered);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const openDetailsModal = (event) => {
    setSelectedJob(event);
  };

  const closeDetailsModal = () => {
    setSelectedJob(null);
  };

  const toggleJob = () => {
    setIsOpen(!isOpen);
  };
  const handleChange = (e) => {
    setNewJobData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === "") {
      // If the search term is empty, display all events
      setFilteredJob(joboppdata);
    } else {
      const filtered = joboppdata.filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (filtered.length === 0) {
        setFilteredJob(["NONE"]); // Set a special value to indicate no matching events
      } else {
        setFilteredJob(filtered);
      }
    }
  };

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      CreateJob(e);
    }
  };

  const CreateJob = async () => {
    try {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      const formattedDate = now.toLocaleDateString();

      const newJobOpp = {
        ...newJobData,
        ptime: formattedTime, // Posted time (automated)
        pdate: formattedDate, // Posted date (automated)
        img: imageFile,
      };
      const formData = new FormData();
      formData.append("title", newJobData.title);
      formData.append("ptime", formattedTime); // Use the formatted selected time
      formData.append("pdate", formattedDate); // Use the formatted current date
      formData.append("description", newJobData.description);
      formData.append("link", newJobData.link);
      formData.append("image", imageFile);

      await axios.post("http://localhost:3001/jobopp", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Assuming your API returns the newly added event, you can update the state accordingly.
      fetchJobOppData();
      setNewJobData({
        title: "",
        ptime: "", // Posted time (automated)
        pdate: "", // Posted date (automated)
        description: "", // Event description (if needed)
        link: "",
        img: "",
      });
      setImageFile(null);
      setIsOpen(false); // Reset form fields after creating an event
    } catch (err) {
      console.log(err);
    }
  };
  const fetchJobOppData = async () => {
    try {
      const res = await axios.get("http://localhost:3001/jobopp/alumnijob", {
        params: { status: true }, // Add this query parameter to filter by status=true
      });

      setJobOppData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchJobOppData();
  }, []);

  const eventsToDisplay = filteredJob.length > 0 ? filteredJob : joboppdata;
  return (
    <div className="flex">
      <div className="basis-[12%] h-[100vh] border">
        <ASidebar />
      </div>
      <div className="basis-[88%] border h-[100vh] overflow-scroll">
        <AAlumniboardView />
        <div className="flex-grow bg-gray-300 p-5 rounded-md container mx-auto overflow-x-auto h-full">
          <h3 className="text-2xl font-bold mb-3">Job Opportunities</h3>

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

            {/* Create Job Button */}
            <div className="inline-block">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={toggleJob}
              >
                Create Job
              </button>
            </div>
          </div>
          {/* Create a new Job */}
          {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-10 overflow-x-auto m-10">
              <div className="absolute inset-0 bg-black opacity-30"></div>
              <div className="bg-white p-4 rounded w-2/3 shadow-lg z-20">
                <h2 className="text-lg font-semibold mb-2 text-center">
                  Create New Job
                </h2>
                <form>
                  <div className="mb-4">
                    <label className="block mb-1">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={joboppdata.title}
                      onChange={handleChange}
                      className="w-full border rounded p-2"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1">Description</label>
                    <textarea
                      type="text"
                      name="description"
                      value={joboppdata.description}
                      onChange={handleChange}
                      className="w-full border rounded p-2"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block mb-1">Link</label>
                    <input
                      type="message"
                      name="link" // Change "link" to "links"
                      value={joboppdata.link}
                      onChange={handleChange}
                      className="w-full border rounded p-2"
                    />
                  </div>

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
                          className="w-full h-full object-cover"
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
                  <button
                    type="button"
                    onClick={CreateJob}
                    onKeyDown={handleKeyPress}
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
                  >
                    Create
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded text-center "
                    onClick={toggleJob}
                  >
                    Close
                  </button>
                </form>
              </div>
            </div>
          )}

          <div className="container mx-auto p-4 overflow-y-scroll h-full w-full md:overflow-x-auto overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left font-medium">Event No</th>
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
                {eventsToDisplay.map((event) => (
                  <tr
                    key={event.id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="px-6 py-4">{event.id}</td>
                    <td className="px-6 py-4">{event.title}</td>
                    <td className="px-6 py-4">{event.description}</td>
                    <td className="px-6 py-4">
                      {event.ptime} {event.pdate}
                    </td>
                    <td className="px-6 py-4 cursor-pointer">
                      <button
                        className="text-blue-500 hover:underline"
                        onClick={() => openDetailsModal(event)}
                      >
                        View
                      </button>

                      {/* Event Details Modal */}
                      {selectedJob && (
                        <div className="fixed inset-0 flex items-center justify-center z-10">
                          <div className="bg-white w-1/4 p-4 rounded shadow-lg z-20 ">
                            <h2 className="text-lg font-semibold mb-2 text-center">
                              Job Details
                            </h2>
                            <div className="mb-4 flaot">
                              <strong>Event Number:</strong> {selectedJob.id}
                            </div>
                            <div className="mb-4 ">
                              <strong>Title:</strong> {selectedJob.title}
                            </div>
                            <div
                              className="mb-4"
                              style={{ maxHeight: "100px", overflowY: "auto" }}
                            >
                              <strong>Description:</strong>{" "}
                              {selectedJob.description}
                            </div>
                            <div className="mb-4">
                              <strong>Posted Time:</strong> {selectedJob.ptime}
                              <strong className="ml-16">Date:</strong>{" "}
                              {selectedJob.pdate}
                            </div>
                            <div className="mb-4">
                              <strong>Link:</strong> {selectedJob.link}
                            </div>
                            <div className="mb-4">
                              <strong>Validation Image:</strong>
                              {selectedJob.imagePath && (
                                <div className="w-full h-48 rounded border overflow-hidden">
                                  <img
                                    src={selectedJob.imagePath}
                                    alt="Validation"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                            </div>

                            <button
                              className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
                              onClick={() => {
                                window.open(selectedJob.link, "_blank");
                              }}
                            >
                              Visit Link
                            </button>
                            <button
                              className="bg-red-500 text-white px-4 py-2 rounded"
                              onClick={closeDetailsModal}
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

export default AJobOpportunities;
