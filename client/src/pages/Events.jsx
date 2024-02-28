import React, { useState, useEffect } from "react";
import { VscChevronDown } from "react-icons/vsc";
import Sidebar from "../components/Sidebar";
import Dashboardview from "../components/Dashboardview";
import api from "./../configs/axios-base-url";
const Events = () => {
  const [eventdata, setEventData] = useState([]);
  const [newEventData, setNewEventData] = useState({
    title: "",
    stime: "",
    sdate: "",
    ptime: "",
    pdate: "",
    description: "",
  });

  const [isDate, setIsDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState("All");
  const [filteredEvents, setFilteredEvents] = useState([]);

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
      return eventdata; // Show all events
    } else {
      const filtered = eventdata.filter((event) => {
        const eventDate = new Date(event.sdate);
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
    setFilteredEvents(filtered);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const openDetailsModal = (event) => {
    setSelectedEvent(event);
  };

  const closeDetailsModal = () => {
    setSelectedEvent(null);
  };
  const notify = () => {
    if (selectedEvent) {
      const eventDateTime = new Date(
        selectedEvent.sdate + " " + selectedEvent.stime
      );
      const now = new Date();

      if (eventDateTime > now) {
        const timeDiff = eventDateTime - now;
        setTimeout(() => {
          const notificationMessage = `It's time for the event: ${selectedEvent.title}`;
          window.alert(notificationMessage);
        }, timeDiff);
      } else {
        const notificationMessage = `The event ${selectedEvent.title} has already passed.`;
        window.alert(notificationMessage);
      }
    }
  };

  const toggleEvent = () => {
    setIsOpen(!isOpen);
  };
  const handleChange = (e) => {
    setNewEventData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === "") {
      // If the search term is empty, display all events
      setFilteredEvents(eventdata);
    } else {
      const filtered = eventdata.filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (filtered.length === 0) {
        setFilteredEvents(["NONE"]); // Set a special value to indicate no matching events
      } else {
        setFilteredEvents(filtered);
      }
    }
  };

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      CreateEvent(e);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (!confirmDelete) {
      return; // User canceled the delete operation
    }

    try {
      await api.delete(`/events/${id}`);
      // Assuming your API deletes the event successfully, you can update the state accordingly.
      fetchEventData();
    } catch (err) {
      console.log(err);
    }
  };
  const CreateEvent = async () => {
    try {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      const formattedDate = now.toLocaleDateString();

      // Parse the selected time for the "Scheduled Time" field.
      const selectedTimeParts = newEventData.stime.split(":");
      const selectedHours = parseInt(selectedTimeParts[0]);
      const selectedMinutes = parseInt(selectedTimeParts[1]);
      const isPM = selectedHours >= 12;
      const formattedSelectedTime = `${
        selectedHours % 12 || 12
      }:${selectedMinutes.toString().padStart(2, "0")} ${isPM ? "PM" : "AM"}`;

      const newEvent = {
        ...newEventData,
        ptime: formattedTime, // Posted time (automated)
        pdate: formattedDate, // Posted date (automated)
        stime: formattedSelectedTime, // Scheduled time (selected)
      };

      await api.post("/events/add", newEvent);

      // Assuming your API returns the newly added event, you can update the state accordingly.
      fetchEventData();
      setIsOpen(false);
      setNewEventData({
        title: "",
        stime: "",
        sdate: "",
        ptime: "", // Posted time (automated)
        pdate: "", // Posted date (automated)
        description: "", // Event description (if needed)
      }); // Reset form fields after creating an event
    } catch (err) {
      console.log(err);
    }
  };

  const fetchEventData = async () => {
    try {
      const res = await api.get("/events");
      setEventData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEventData();
  }, []);

  const eventsToDisplay =
    filteredEvents.length > 0 ? filteredEvents : eventdata;
  return (
    <div className="flex">
      <div className="basis-[12%] h-[100vh] border">
        <Sidebar />
      </div>
      <div className="basis-[88%] border h-[100vh] ">
        <Dashboardview />
        <div className="flex-grow bg-gray-300 p-5 rounded-md container mx-auto ">
          <h3 className="text-2xl font-bold mb-3">Events</h3>

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
                onClick={toggleEvent}
              >
                Create New Event
              </button>
            </div>
          </div>

          {/* Create a new Event */}
          {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-10">
              <div className="absolute inset-0 bg-black opacity-30"></div>
              <div className="bg-white p-4 rounded w-2/3 shadow-lg z-20">
                <h2 className="text-lg font-semibold mb-2 text-center">
                  Create New Event
                </h2>
                <form>
                  <div className="mb-4">
                    <label className="block mb-1">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={eventdata.title}
                      onChange={handleChange}
                      className="w-full border rounded p-2"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1">Time</label>
                    <input
                      type="time"
                      name="stime"
                      value={eventdata.stime}
                      onChange={handleChange}
                      className="w-full border rounded p-2"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1">Date</label>
                    <input
                      type="date"
                      name="sdate"
                      value={eventdata.sdate}
                      onChange={handleChange}
                      className="w-full border rounded p-2"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block mb-1">Description</label>
                    <textarea
                      type="text"
                      name="description"
                      value={eventdata.description}
                      onChange={handleChange}
                      className="w-full border rounded p-2"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={CreateEvent}
                    onKeyDown={handleKeyPress}
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
                  >
                    Create
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded text-center"
                    onClick={toggleEvent}
                  >
                    Close
                  </button>
                </form>
              </div>
            </div>
          )}

          <div className="container mx-auto p-2 overflow-y-scroll h-full w-full md:overflow-x-auto sm:w-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="px-2 py-2 text-left font-medium">Event No</th>
                  <th className="px-2 py-2 text-left font-medium">Name</th>
                  <th className="px-2 py-2 text-left font-medium">
                    Scheduled Time
                  </th>
                  <th className="px-2 py-2 text-left font-medium">
                    Posted Time
                  </th>
                  <th className="px-2 py-2 text-left font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {eventsToDisplay.map((event, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="px-2 py-2">{index + 1}</td>
                    <td className="px-2 py-2">{event.title}</td>
                    <td className="px-2 py-2">
                      {event.stime} {event.sdate}
                    </td>
                    <td className="px-2 py-2">
                      {event.ptime} {event.pdate}
                    </td>
                    <td className="px-2 py-2 cursor-pointer">
                      <button
                        className="text-blue-500 hover:underline"
                        onClick={() => openDetailsModal(event)}
                      >
                        View
                      </button>

                      {/* Event Details Modal */}
                      {selectedEvent && (
                        <div className="fixed inset-0 flex items-center justify-center z-10">
                          <div className="bg-white w-[50%] p-4 rounded shadow-lg z-20 ">
                            <h2 className="text-lg font-semibold mb-2 text-center">
                              Event Details
                            </h2>
                            <div className="mb-4 flaot">
                              <strong>Event Number:</strong> {selectedEvent.id}
                            </div>
                            <div className="mb-4 ">
                              <strong>Title:</strong> {selectedEvent.title}
                            </div>
                            <div className="mb-4">
                              <strong>Scheduled Time:</strong>{" "}
                              {selectedEvent.stime}
                              <strong className="ml-16">Date:</strong>{" "}
                              {selectedEvent.sdate}
                            </div>
                            <div className="mb-4">
                              <strong>Posted Time:</strong>{" "}
                              {selectedEvent.ptime}
                              <strong className="ml-16">Date:</strong>{" "}
                              {selectedEvent.pdate}
                            </div>
                            <div
                              className="mb-4"
                              style={{ maxHeight: "100px", overflowY: "auto" }}
                            >
                              <strong>Description:</strong>{" "}
                              {selectedEvent.description}
                            </div>

                            <button
                              className="bg-red-500 text-white rounded py-2 px-4 mr-2"
                              onClick={() => {
                                closeDetailsModal();
                              }}
                            >
                              close
                            </button>
                          </div>
                        </div>
                      )}
                      <button
                        className="text-red-500 hover:underline ml-2"
                        onClick={() => handleDelete(event.id)}
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

export default Events;
