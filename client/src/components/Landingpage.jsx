import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import bscslogs from "../assets/bscslogs.png";
import wmsulogs from "../assets/wmsulogs.png";
import { BiSolidChevronLeft, BiSolidChevronRight } from "react-icons/bi";
import { MdWorkOff, MdWork } from "react-icons/md";
import { BsBuildingCheck } from "react-icons/bs";
import pic1 from "../assets/pic1.jpg";
import pic2 from "../assets/pic2.jpg";
import pic3 from "../assets/pic3.jpg";
import pic4 from "../assets/pic4.jpg";
import pic5 from "../assets/pic5.jpg";
import pic6 from "../assets/pic6.jpg";
import pic7 from "../assets/pic7.jpg";
import pic8 from "../assets/pic8.jpg";
import pic9 from "../assets/pic9.jpg";
import pic10 from "../assets/pic10.jpg";
import pic11 from "../assets/pic11.jpg";
import pic12 from "../assets/pic12.jpg";
import pic13 from "../assets/pic13.jpg";
import pic14 from "../assets/pic14.jpeg";
import pic15 from "../assets/pic15.jpeg";
import pic16 from "../assets/pic16.jpeg";
import pic17 from "../assets/pic17.jpeg";
import backgroundImage from "../assets/bg2.png";
import axios from "./../configs/axios-base-url";
import api from "../configs/axios-base-url";
import { FaEllipsisV, FaUserGraduate, FaTimes } from "react-icons/fa";
import Axios from "../configs/axios-base-url";
import LineGraph from "../components/LineGraph";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";

const Landingpage = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [data, setData] = useState([]); // Define the data state
  const [loading, setLoading] = useState(true);
  const [newsResponse, setNewsResponse] = useState([]); // Store news data
  const [eventsResponse, setEventsResponse] = useState([]); // Store events data
  const [jobOppResponse, setJobOppResponse] = useState([]); // Store job opportunities data
  const [alumnidata, setAlumniData] = useState([]);
  const [alumniDataLG, setAlumniDataLG] = useState([]);

  const fetchAlumniDataLG = async () => {
    try {
      const res = await Axios.get("/alumni");
      setAlumniDataLG(res.data);
    } catch (err) {
      console.error("Error fetching alumni data:", err);
    }
  };

  useEffect(() => {
    fetchAlumniDataLG();
  }, []);

  const [YearOptions, setYearOptions] = useState(["All"]);

  const updateYearOptions = () => {
    const uniqueYears = [
      ...new Set(alumniDataLG.map((alumni) => alumni.yeargrad)),
    ];
    setYearOptions(["All", ...uniqueYears]);
  };

  useEffect(() => {
    updateYearOptions();
  }, [alumniDataLG]);

  const Totalyeargrad = alumniDataLG?.length || 0;

  const graduatesByYear = alumniDataLG.reduce((acc, item) => {
    acc[item.yeargrad] = (acc[item.yeargrad] || 0) + 1;
    return acc;
  }, {});

  const dataLG = Object.entries(graduatesByYear).map(([year, graduates]) => ({
    name: year,
    Graduates: graduates,
  }));

  const slides = [
    {
      url: pic1,
    },
    {
      url: pic2,
    },
    {
      url: pic3,
    },
    {
      url: pic4,
    },
    {
      url: pic5,
    },
    {
      url: pic6,
    },
    {
      url: pic7,
    },
    {
      url: pic8,
    },
    {
      url: pic9,
    },
    {
      url: pic10,
    },
    {
      url: pic11,
    },
    {
      url: pic12,
    },
    {
      url: pic13,
    },
    {
      url: pic14,
    },
    {
      url: pic15,
    },
    {
      url: pic16,
    },
    {
      url: pic17,
    },
    // Pictures Slideshow
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/register");
        setAlumniData(res.data);
      } catch (err) {
        console.error("Error fetching alumni data:", err);
      } finally {
        setLoading(false);
      }

      try {
        const eventsResponse = await axios.get("/events");
        const jobOppResponse = await axios.get("/jobopp");
        const newsResponse = await axios.get("/news");

        const mergedData = [
          ...eventsResponse.data,
          ...jobOppResponse.data,
          ...newsResponse.data,
        ];

        setData(mergedData);
        setNewsResponse(newsResponse.data);
        setEventsResponse(eventsResponse.data);
        setJobOppResponse(jobOppResponse.data);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (category) => {
    setSelectedFilter(category);
  };

  // Filter the data based on the selected category
  // Determine which data to use based on the selected category
  let selectedData;
  if (selectedFilter === "all") {
    selectedData = data.sort((a, b) => a.title.localeCompare(b.title));
  } else if (selectedFilter === "News") {
    // Show the newest 5 news items
    selectedData = newsResponse
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(-5);
  } else if (selectedFilter === "Events") {
    // Show the newest 5 events
    selectedData = eventsResponse
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(-5);
  } else if (selectedFilter === "Job Opportunities") {
    // Show the newest 5 job opportunities
    selectedData = jobOppResponse
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(-5);
  } else {
    // Handle other categories or filters here
    selectedData = [];
  }

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) =>
      prevSlide === slides.length - 1 ? 0 : prevSlide + 1
    );
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(timer);
  }, [currentSlide, nextSlide]);

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };
  const AlumniEmployed = alumnidata.filter(
    (item) => item.employment_status === "Employed"
  ).length;

  const AlumniUnemployed = alumnidata.filter(
    (item) => item.employment_status === "Unemployed"
  ).length;
  const AlumniEligibility = alumnidata.filter(
    (item) => item.eligibility
  ).length;

  const chartWidth2 = Math.max(1200, data.length * 10);

  return (
    <div className="flex justify-center items-center">
      <div
        className="container mx-auto py-8"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex items-center justify-center mb-8">
          <div className="relative inline-block w-32 lg:w-25">
            <img src={wmsulogs} className="sm:w-auto" alt="WMSU Logo" />
          </div>
          <div className="text-4xl font-bold mx-20 animate-pulse ">
            {" "}
            BSCS ALUMNI TRACKING SYSTEM
          </div>
          <div className="relative inline-block float-right w-32 lg:w-25">
            <img src={bscslogs} className="sm:w-auto" alt="BSCS Logo" />
          </div>
        </div>
        {/* Carousel*/}
        <div className="max-w-[1800px] h-[400px] relative mx-auto">
          <div
            style={{
              backgroundImage: `url(${slides[currentSlide].url})`,
              backgroundSize: "cover", // This makes the image cover the container
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat", // Center the image within the container
            }}
            className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
          ></div>
          <span
            onClick={prevSlide}
            className="carousel-control prev absolute top-1/2 left-4 transform -translate-y-1/2 cursor-pointer bg-white"
          >
            <BiSolidChevronLeft size={30} />
          </span>
          <span
            className="carousel-control next absolute top-1/2 right-4 transform -translate-y-1/2 bg-white"
            onClick={nextSlide}
          >
            <BiSolidChevronRight size={30} />
          </span>
        </div>
        <Link to="/Login">
          <div className="flex items-center gap-[10px] float-right bg-green-500 p-2 mt-1 rounded">
            <p className="text-[20px] leading-[20px] font-normal text-black ">
              Login
            </p>
          </div>
        </Link>
        <br />
        {/* Contents below*/}
        <div className="flex  mt-5">
          {/* Buttons left */}
          <div className="flex flex-col items-center mr-8">
            {["all", "News", "Job Opportunities", "Events"].map((category) => (
              <button
                key={category}
                className={`px-4 py-2 mb-2 rounded-md sm:w-full mt-2 ${
                  selectedFilter === category
                    ? "bg-yellow-500 text-white"
                    : "bg-blue-500 text-gray-700"
                } ${category === "all" && "mr-2"}`}
                onClick={() => handleFilterChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
          {/* List of Contents */}
          <div className="container mx-auto overflow-y-scroll max-h-64  bg-gray-300 p-5 rounded-md">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left font-medium">Title</th>
                  <th className="px-6 py-3 text-left font-medium">
                    Posted Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedData.map((item, index) => (
                  <tr
                    key={`${item.Type}-${item.id}-${index}`}
                    className="bg-white p-4 rounded shadow-md"
                  >
                    <td className="text-gray-600">{item.title}</td>
                    <td className="text-gray-600">{item.pdate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-[10px] mt-[25px] pb-[15px] h-24">
          <Link to="/Login">
            <div className="rounded-lg bg-[#00C49F] flex flex-col border border-[#b63d95c4] w-auto mt-2 cursor-pointer hover:shadow-lg transform hover:scale-103 transition duration-300 ease-out">
              <div className="w-full items-center justify-between">
                <h2 className="text-purple-700 text-xs sm:font-size-[5px] md:text-lg lg:text-xl xl:text-2xl leading-[17px] font-bold text-center">
                  ALUMNI
                </h2>
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-[24px] font-bold text-zinc-600 text-center mt-2 sm:mt-0">
                  {alumnidata.length}
                </h3>
              </div>
              <div className="self-end pr-2 sm:self-end sm:pb-2 w-auto">
                <FaUserGraduate fontSize={25} color="#b63d95c4" />
              </div>
            </div>
          </Link>
          <Link to="/Login">
            <div className="rounded-lg bg-[#0088FE] flex flex-col border border-[#b63d95c4] w-auto mt-2 cursor-pointer hover:shadow-lg transform hover:scale-103 transition duration-300 ease-out">
              <div className="w-full items-center justify-between">
                <h2 className="text-purple-700 text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl leading-[17px] font-bold text-center">
                  EMPLOYED
                </h2>
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-[24px] font-bold text-zinc-600 text-center mt-2 sm:mt-0">
                  {AlumniEmployed}
                </h3>
              </div>
              <div className="self-end pr-2 sm:self-end sm:pb-2 w-auto">
                <MdWork fontSize={28} color="#b63d95c4" />
              </div>
            </div>
          </Link>
          <Link to="/Login">
            <div className="rounded-lg bg-[#FFBB28] flex flex-col border border-[#b63d95c4] w-auto mt-2 cursor-pointer hover:shadow-lg transform hover:scale-103 transition duration-300 ease-out">
              <div className="w-full items-center justify-between">
                <h2 className="text-purple-700 text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl leading-[17px] font-bold text-center">
                  UNEMPLOYED
                </h2>
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-[24px] font-bold text-zinc-600 text-center mt-2 sm:mt-0">
                  {AlumniUnemployed}
                </h3>
              </div>
              <div className="self-end pr-2 sm:self-end sm:pb-2 w-auto">
                <MdWorkOff fontSize={28} color="#b63d95c4" />
              </div>
            </div>
          </Link>
          <Link to="/Login">
            <div className="rounded-lg bg-[#FF8042] flex flex-col border border-[#b63d95c4] w-auto mt-2 cursor-pointer hover:shadow-lg transform hover:scale-103 transition duration-300 ease-out">
              <div className="w-full items-center justify-between">
                <h2 className="text-purple-700 text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl leading-[17px] font-bold text-center">
                  ELIGIBILITY
                </h2>
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-[24px] font-bold text-zinc-600 text-center mt-2 sm:mt-0">
                  {AlumniEligibility}
                </h3>
              </div>
              <div className="self-end pr-2 sm:self-end sm:pb-2 w-auto">
                <BsBuildingCheck fontSize={28} color="#b63d95c4" />
              </div>
            </div>
          </Link>
        </div>
        <Link to="/Login">
          <div className="basis-[70%] border bg-white shadow-md cursor-pointer rounded-[4px] w-auto mt-10">
            <div className="bg-zinc-100 flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-zinc-200 mb-[20px]">
              <h2 className="text-green-700 text-[16px] leading-[19px] font-bold">
                Total Graduates per Academic Year
              </h2>
            </div>
            <div>
              <LineChart
                width={chartWidth2}
                height={400}
                data={dataLG}
                zoom={{ type: "x", enabled: true }}
                margin={{
                  top: 10,
                  right: 10,
                  left: 5,
                }}
                style={{ cursor: "zoom-in" }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Graduates" stroke="#82ca9d" />
              </LineChart>
              <p className="text-black/180 text-center text-sm justify-center m-4">
                Total Graduates: {Totalyeargrad}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Landingpage;
