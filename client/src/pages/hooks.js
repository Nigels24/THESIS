import { useState, useEffect } from "react";
import { decodeToken } from "../utils/token";
import api from "../configs/axios-base-url";

export const useHooks = () => {
  const token = localStorage.getItem("token");
  const [alumnidata, setAlumniData] = useState([]);
  const [newAlumniData, setNewAlumniData] = useState({
    lname: "",
    fname: "",
    mname: "",
    yearGraduated: "",
    currentAddress: "",
  });

  const [isDate, setIsDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState("All");
  const [filteredAlumni, setFilteredAlumni] = useState([]);

  const YearOptions = [
    "All",
    "2014-2015",
    "2015-2016",
    "2016-2017",
    "2017-2018",
    "2018-2019",
    "2019-2020",
    "2020-2021",
    "2021-2022",
    "2022-2023",
    "2023-2024",
  ];

  const filterAlumnibyYear = (year) => {
    if (year === "All") {
      return alumnidata;
    } else {
      const filtered = alumnidata.filter((alumni) => alumni.yeargrad === year);
      return filtered;
    }
  };

  const selectDate = (stat) => {
    setSelectedDate(stat);
    setIsDate(false);

    const filtered = filterAlumnibyYear(stat);
    setFilteredAlumni(filtered);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAlumni, setSelectedAlumni] = useState(null);

  const openDetailsModal = (alumni) => {
    setSelectedAlumni(alumni);
  };

  const closeDetailsModal = () => {
    setSelectedAlumni(null);
  };

  const handleChange = (e) => {
    setNewAlumniData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === "") {
      setFilteredAlumni(alumnidata);
    } else {
      const filtered = alumnidata.filter((alumni) =>
        alumni.lname.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (filtered.length === 0) {
        setFilteredAlumni([]);
      } else {
        setFilteredAlumni(filtered);
      }
    }
  };

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // Define or remove the following line based on your implementation
      // CreateAlumni(e);
    }
  };

  const fetchAlumniData = async () => {
    try {
      const res = await api.get("/register");
      setAlumniData(res.data);
    } catch (err) {
      console.error("Error fetching alumni data:", err);
    }
  };

  useEffect(() => {
    fetchAlumniData();
  }, []);

  const alumnisToDisplay =
    filteredAlumni.length > 0 ? filteredAlumni : alumnidata;

  return {
    alumnidata,
    setAlumniData,
    newAlumniData,
    setNewAlumniData,
    isDate,
    setIsDate,
    selectedDate,
    setSelectedDate,
    filteredAlumni,
    setFilteredAlumni,
    YearOptions,
    filterAlumnibyYear,
    selectDate,
    searchTerm,
    setSearchTerm,
    selectedAlumni,
    setSelectedAlumni,
    openDetailsModal,
    closeDetailsModal,
    handleChange,
    handleSearch,
    handleKeyPress,
    fetchAlumniData,
    alumnisToDisplay,
  };
};
