import React, { useState, useEffect } from "react";
import { VscChevronDown } from "react-icons/vsc";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Dashboardview from "../components/Dashboardview";

const Approvals = () => {
  const [joboppdata, setJobOppData] = useState([]);
  const [newJobData, setNewJobData] = useState({
    title: "",
    description: "",
    ptime: "",
    pdate: "",
    link: "",
    validation: "",
    status: "",
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
      Approved(e);
    }
  };

  const Approved = async (eventToApprove) => {
    try {
      if (!eventToApprove) {
        // Handle the case where eventToApprove is null
        console.error("No job is selected for approval.");
        return;
      }

      // Construct the job opportunity data from the eventToApprove
      const newJobOpp = {
        title: eventToApprove.title,
        description: eventToApprove.description,
        ptime: eventToApprove.ptime,
        pdate: eventToApprove.pdate,
        link: eventToApprove.link,
        status: true,
        validation: "", // Use validation image from eventToApprove
      };

      // Make an API request to add the job opportunity
      await axios.put(
        `http://localhost:3001/jobopp/${eventToApprove.id}/jobstatus`,
        newJobOpp
      );

      // Assuming your API returns the newly added job opportunity, you can update the state accordingly.
      fetchJobOppData();

      // Close the "View Details" modal
      closeDetailsModal();
    } catch (err) {
      console.error(err);
    }
  };
  const handleDelete = async (eventToDelete) => {
    try {
      if (!eventToDelete) {
        console.error("No job is selected for deletion.");
        return;
      }

      // Make an API request to delete the job opportunity
      // await axios.delete(http://localhost:3001/approvals/${eventToDelete.id});

      // Assuming your API returns a success response, you can update the state accordingly.
      fetchJobOppData();
    } catch (err) {
      console.error(err);
    }
  };

  const fetchJobOppData = async () => {
    try {
      const res = await axios.get("http://localhost:3001/jobopp/falsejob");
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
      <div className="h-[100vh] border">
        <Sidebar />
      </div>
      <div className="basis-[90%] border h-[90vh]">
        <Dashboardview />
        <div className="flex-grow bg-gray-300 p-5 rounded-md container mx-auto overflow-x-auto h-full">
          <h3 className="text-2xl font-bold mb-3">Approvals</h3>

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

          <div className="container mx-auto p-4 max-h-64 w-full overflow-x-auto ">
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
                {eventsToDisplay.map((event, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{event.title}</td>
                    <td className="px-6 py-4">{event.description}</td>
                    <td className="px-6 py-4">
                      {event.ptime} {event.pdate}
                    </td>
                    <td className="px-6 py-4 cursor-pointer">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                        onClick={() => openDetailsModal(event)}
                      >
                        View
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          Approved(event);
                          handleDelete(event);
                        }}
                        onKeyDown={handleKeyPress}
                        className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(event)}
                        onKeyDown={handleKeyPress}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Reject
                      </button>

                      {/* Event Details Modal */}
                      {selectedJob && (
                        <div className="fixed inset-0 flex items-center justify-center z-10">
                          <div className="bg-white w-1/4 p-4 rounded shadow-lg z-20 ">
                            <h2 className="text-lg font-semibold mb-2 text-center">
                              Job Details
                            </h2>
                            <div className="mb-4 ">
                              <strong>Title:</strong> {selectedJob.title}
                            </div>
                            <div
                              className="mb-4"
                              style={{ maxHeight: "100px", overflowY: "auto" }}
                            >
                              <strong>Description:</strong>
                              {selectedJob.description}
                            </div>
                            <div className="mb-4">
                              <strong>Posted Time:</strong> {selectedJob.ptime}
                              <strong className="ml-16">Date:</strong>
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
                              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                              onClick={() => {
                                window.open(selectedJob.link, "_blank");
                              }}
                            >
                              Visit Link
                            </button>
                            <button
                              className="bg-blue-500 text-white px-4 py-2 rounded"
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

export default Approvals;
