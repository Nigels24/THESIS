import React from "react";
import AAlumniboardView from "../../components/AlumniSide/AAlumniboardView";
import ASidebar from "../../components/AlumniSide/ASidebar";
import { VscChevronDown } from "react-icons/vsc";
import { useHooks } from "../hooks";

const AAlumni = () => {
  const {
    alumnidata,
    setAlumniData,
    newAlumniData,
    setNewAlumniData,
    isDate,
    setIsDate,
    selectedDate,
    setSelectedAlumni,
    filteredAlumni,
    setFilteredAlumni,
    YearOptions,
    filterAlumnibyYear,
    selectDate,
    searchTerm,
    setSearchTerm,
    selectedAlumni,
    setSelectedDate,
    openDetailsModal,
    closeDetailsModal,
    handleChange,
    handleSearch,
    handleKeyPress,
    fetchAlumniData,
    alumnisToDisplay,
  } = useHooks();
  return (
    <div className="flex">
      <div className="basis-[12%] h-[100vh] border">
        <ASidebar />
      </div>
      <div className="basis-[88%] border h-[100vh] overflow-scroll">
        <AAlumniboardView />
        <div className="flex-grow bg-gray-300 p-5 rounded-md container overflow-x-auto h-full">
          <h3 className="text-2xl font-bold mb-3">Alumni</h3>
          <div className="container mx-auto w-auto flex justify-between items-center">
            <div className="inline-block">
              <input
                type="text"
                className="bg-zinc-100 h-10 outline-none pl-4 w-[70px] sm:w-64 rounded-full sm:rounded-[5px] placeholder:text-[14px] leading-[20px] font-normal ml-2"
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
                  <ul className="absolute bg-white border rounded-lg shadow-md overflow-x-auto max-h-40">
                    {YearOptions.map((stat, index) => (
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
          <div className="container mx-auto p-4 overflow-x-auto max-w-full">
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left font-medium">Picture</th>
                  <th className="px-6 py-3 text-left font-medium">Name</th>
                  <th className="px-6 py-3 text-left font-medium">
                    Year Graduate
                  </th>
                  <th className="px-6 py-3 text-left font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {alumnisToDisplay.map((alumni) => (
                  <tr
                    key={alumni.id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="px-6 py-4">
                      {/* Display the image using an img tag */}
                      <img
                        src={alumni.Image} // Update with the actual property name in your data
                        alt={`Image of ${alumni.fname} ${alumni.lname}`}
                        className="w-10 h-10 rounded-full"
                      />
                    </td>
                    <td className="px-6 py-4">
                      {alumni.lname} {alumni.fname} {alumni.mname}
                    </td>
                    <td className="px-6 py-4">{alumni.yeargrad}</td>
                    <td className="px-6 py-4 cursor-pointer">
                      <button
                        className="text-blue-500 hover:underline"
                        onClick={() => openDetailsModal(alumni)}
                      >
                        View
                      </button>
                      {selectedAlumni && (
                        <div className="fixed inset-0 flex items-center justify-center z-10">
                          <div className="bg-white w-full sm:w-2/3 p-4 rounded shadow-lg z-20">
                            <h2 className="text-lg font-semibold mb-2 text-center">
                              Alumni Details
                            </h2>
                            <div className="mb-4 flaot">
                              <strong>Picture</strong>Image
                            </div>
                            <div className="mb-4 ">
                              <strong>Name:</strong>
                              {selectedAlumni.lname} {selectedAlumni.fname}{" "}
                              {selectedAlumni.mname}
                            </div>
                            <div className="mb-4">
                              <strong>Year Graduate:</strong>{" "}
                              {selectedAlumni.yeargrad}
                            </div>
                            <div className="mb-4">
                              <strong>Address:</strong> {selectedAlumni.address}
                            </div>
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

export default AAlumni;
