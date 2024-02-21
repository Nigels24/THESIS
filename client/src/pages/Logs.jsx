import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Dashboardview from "../components/Dashboardview";
import api from "../configs/axios-base-url";
import moment from "moment";
import { VscChevronDown } from "react-icons/vsc";

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [objectLogs, setObjectLogs] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLogs, setFilteredLogs] = useState([]);

  const viewAlumni = (logs) => {
    setObjectLogs(logs);
    setIsOpen(true);
  };

  const closeAlumni = () => {
    setIsOpen(false);
  };

  const openDetailsModal = (alumni) => {
    setSelectedAlumni(alumni);
  };

  const closeDetailsModal = () => {
    setSelectedAlumni(null);
  };

  const getLogs = async () => {
    try {
      const logs = await api.get("/logs");
      if (logs && logs.data && logs.data.data && logs.data.data.length) {
        const parseData = logs.data.data.map((value) => {
          if (value.before && typeof value.before === "string") {
            value.before = JSON.parse(value.before);
          }

          if (value.after && typeof value.after === "string") {
            value.after = JSON.parse(value.after);
          }

          value.date_created = moment(value.date_created).format("YYYY-MM-DD");
          value.date_modified = moment(value.date_modified).format("hh:mm A"); // Changed to display time in 11:24am/pm format

          return value;
        });

        setLogs(parseData);
        setFilteredLogs(parseData); // Set filtered logs initially
      }
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  useEffect(() => {
    getLogs();
  }, []);

  const handleSearch = (searchTerm) => {
    if (!logs) return;
    if (searchTerm.trim() === "") {
      setFilteredLogs(logs);
    } else {
      const filtered = logs.filter((log) => {
        // Add checks to ensure log.before exists
        if (!log.before) return false;

        const fullName = `${log.before.lname} ${log.before.fname} ${log.before.mname}`;
        const fnameInitial =
          log.before && log.before.fname ? log.before.fname[0] : ""; // Extracts the first character of fname if it exists, otherwise assigns an empty string
        const mnameInitial =
          log.before && log.before.mname ? log.before.mname[0] : ""; // Extracts the first character of mname if it exists, otherwise assigns an empty string
        const lnameInitial =
          log.before && log.before.lname ? log.before.lname[0] : ""; // Extracts the first character of lname if it exists, otherwise assigns an empty string
        const initials = `${fnameInitial}${mnameInitial}${lnameInitial}`;
        const year = log.date_created.split("-")[0];
        const time = log.date_modified.toLowerCase();

        return (
          fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          initials.toLowerCase().includes(searchTerm.toLowerCase()) ||
          year.includes(searchTerm) ||
          time.includes(searchTerm.toLowerCase())
        );
      });

      setFilteredLogs(filtered.length > 0 ? filtered : ["NONE"]);
    }
  };

  useEffect(() => {
    handleSearch(searchTerm);
  }, [logs, searchTerm]);

  return (
    <>
      <div className="flex">
        <div className="basis-[12%] h-[100vh] border">
          <Sidebar />
        </div>
        <div className="basis-[88%] border h-[100vh] overflow-scroll">
          <Dashboardview />
          <div className="flex-grow bg-gray-300 p-5 rounded-md container mx-auto overflow-x-auto h-full">
            <h3 className="text-2xl font-bold mb-3">Logs</h3>

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
              </div>
            </div>

            <div className="container mx-auto p-4 overflow-y-scroll h-full w-full md:overflow-x-auto overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left font-medium">ID</th>
                    <th className="px-6 py-3 text-left font-medium">Image </th>
                    <th className="px-6 py-3 text-left font-medium">Alumni </th>
                    <th className="px-6 py-3 text-left font-medium">
                      Date Created
                    </th>
                    <th className="px-6 py-3 text-left font-medium">
                      Date Modified
                    </th>
                    <th className="px-6 py-3 text-left font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map((log, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="px-6 py-4">{index}</td>
                      <td className="px-6 py-4">
                        {log.before && log.before.Image && (
                          <img
                            src={log.before.Image}
                            alt={`Image of ${log.before.fname} ${log.before.lname}`}
                            className="w-10 h-10 rounded-full"
                          />
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {log.before &&
                          `${log.before.lname} ${log.before.fname} ${log.before.mname}`}
                      </td>
                      <td className="px-6 py-4">{log.date_created}</td>
                      <td className="px-6 py-4">{log.date_modified}</td>
                      <td className="px-6 py-4 cursor-pointer">
                        <button
                          className="text-blue-500 hover:underline"
                          onClick={() => viewAlumni(log)}
                        >
                          View
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
      {/* Modal */}
      {isOpen && objectLogs && (
        <Modal objectLogs={objectLogs} closeAlumni={closeAlumni} />
      )}
    </>
  );
};

const Modal = ({ objectLogs, closeAlumni }) => {
  const log = objectLogs;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div className="bg-white w-full sm:w-1/3 p-4 rounded shadow-lg z-20">
        <h2 className="text-lg font-semibold mb-2 text-center">
          Alumni Details
        </h2>
        <div className="grid gap-2 grid-cols-2">
          <div>
            <div className="flex justify-center mt-2 mb-2 text-green-900">
              BEFORE
            </div>
            <div>
              {log.before && log.before.lname} {log.before && log.before.fname}{" "}
              {log.before && log.before.mname}
            </div>
            <div>{log.before && log.before.phoneno}</div>
            <div>{log.before && log.before.address}</div>
            <div>{log.before && log.before.employment_status}</div>
            {log.before && log.before.employment_status === "Employed" && (
              <>
                <div>{log.before.current_job}</div>
                <div>{log.before.year_current_job}</div>
                <div>{log.before.position_current_job}</div>
                <div>{log.before.employment_type}</div>
                <div>{log.before.place_current_job}</div>
              </>
            )}
            <div>{log.before && log.before.engage_studies}</div>
            <div>{log.before && log.before.enroll_studies}</div>
            <div>{log.before && log.before.eligibility}</div>
          </div>
          <div>
            <div className="flex justify-center mt-2 mb-2 text-green-900">
              AFTER
            </div>
            <div>
              {log.after && log.after.lname} {log.after && log.after.fname}{" "}
              {log.after && log.after.mname}
            </div>
            <div>{log.after && log.after.phoneno}</div>
            <div>{log.after && log.after.address}</div>
            <div>{log.after && log.after.employment_status}</div>
            {log.after && log.after.employment_status === "Employed" && (
              <>
                <div>{log.after.current_job}</div>
                <div>{log.after.year_current_job}</div>
                <div>{log.after.position_current_job}</div>
                <div>{log.after.employment_type}</div>
                <div>{log.after.place_current_job}</div>
              </>
            )}

            <div>{log.after && log.after.engage_studies}</div>
            <div>{log.after && log.after.enroll_studies}</div>
            <div>{log.after && log.after.eligibility}</div>
          </div>
        </div>
        <div className="flex justify-center mt-2">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={closeAlumni}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logs;
