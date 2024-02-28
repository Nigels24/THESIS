import React, { useState, useEffect } from "react";
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
import { FaEllipsisV, FaUserGraduate, FaTimes } from "react-icons/fa";
import { MdWorkOff, MdWork } from "react-icons/md";
import { BsBuildingCheck } from "react-icons/bs";
import PieComponent from "./PieComponent";
import { Progress } from "antd";
import LineGraph from "./LineGraph";
import api from "../configs/axios-base-url";
import BarComponent from "./BarComponent";
import PieCompEduc from "./PieCompEduc";

const Main = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [alumnidata, setAlumniData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const data = Object.entries(graduatesByYear).map(([year, graduates]) => ({
    name: year,
    Graduates: graduates,
  }));

  const [alumnidataBG, setAlumniDataBG] = useState([]);
  const fetchAlumniDataBG = async () => {
    try {
      const res = await api.get("/register");
      setAlumniDataBG(res.data);
    } catch (err) {
      console.error("Error fetching alumni data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlumniDataBG();
  }, []);

  const years = [
    "2014-2015",
    "2015-2016",
    "2016-2017",
    "2017-2018",
    "2018-2019",
    "2019-2020",
    "2020-2021",
    "2021-2022",
    "2022-2023",
  ];

  const barWidth = Math.min(window.innerWidth - 20, 1000);
  const alignmentData = years.map((year) => {
    const jobAlignCount = alumnidataBG.filter(
      (item) =>
        item.yeargrad === year &&
        [
          "Software Engineer",
          "System Software Developer",
          "Research and Development computing professional",
          "Application Software Developer",
          "Computer Programmer",
          "Software Architect",
          "Software Development Engineer",
          "Software Development Lead",
          "Software Development Manager",
          "Application Developer",
          "Cybersecurity Analyst",
          "Network Administrator",
          "Database Administrator",
          "IT Consultant",
          "System Analyst",
          "Data Analyst",
          "Quality Assurance Specialist",
          "Software Support Specialist",
          "Business Intelligence Analyst",
          "Network Engineer",
          "Web Developer",
          "Project Manager",
          "IT Auditor",
        ].includes(item.current_job)
    ).length;

    const misAlignCount = alumnidataBG.filter(
      (item) =>
        item.yeargrad === year &&
        ![
          "Software Engineer",
          "System Software Developer",
          "Research and Development computing professional",
          "Application Software Developer",
          "Computer Programmer",
          "Software Architect",
          "Software Development Engineer",
          "Software Development Lead",
          "Software Development Manager",
          "Application Developer",
          "Cybersecurity Analyst",
          "Network Administrator",
          "Database Administrator",
          "IT Consultant",
          "System Analyst",
          "Data Analyst",
          "Quality Assurance Specialist",
          "Software Support Specialist",
          "Business Intelligence Analyst",
          "Network Engineer",
          "Web Developer",
          "Project Manager",
          "IT Auditor",
        ].includes(item.current_job)
    ).length;

    return {
      name: year,
      Aligned: jobAlignCount,
      MisAligned: misAlignCount,
    };
  });

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const fetchAlumniData = async () => {
    try {
      const res = await api.get("/register");
      setAlumniData(res.data);
    } catch (err) {
      console.error("Error fetching alumni data:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAlumniData();
  }, []);
  if (loading) {
    return <p>Loading...</p>;
  }

  const AlumniEmployed = alumnidata.filter(
    (item) => item.employment_status === "Employed"
  ).length;

  const AlumniUnemployed = alumnidata.filter(
    (item) => item.employment_status === "Unemployed"
  ).length;
  const AlumniEligibility = alumnidata.filter(
    (item) => item.eligibility
  ).length;
  const StatusRegular = alumnidata.filter(
    (item) => item.employment_type === "Regular"
  ).length;
  const StatusCasual = alumnidata.filter(
    (item) => item.employment_type === "Casual"
  ).length;
  const StatusSeasonal = alumnidata.filter(
    (item) => item.employment_type === "Seasonal"
  ).length;
  const StatusFixedTerm = alumnidata.filter(
    (item) => item.employment_type === "Fixed-Term"
  ).length;
  const StatusProbationary = alumnidata.filter(
    (item) => item.employment_type === "Probationary"
  ).length;
  const EligibilityBar = alumnidata.filter(
    (item) => item.eligibility === "Bar and Board Examination"
  ).length;
  const EligibilityPilot = alumnidata.filter(
    (item) => item.eligibility === "Pilot Eligibility for Military Aviators"
  ).length;
  const EligibilityNational = alumnidata.filter(
    (item) => item.eligibility === "National Service Training Eligibility"
  ).length;
  const EligibilityPhilippine = alumnidata.filter(
    (item) =>
      item.eligibility ===
      "Philippine National Police (PNP) Entrance Eligibility"
  ).length;
  const EligibilityProfessional = alumnidata.filter(
    (item) => item.eligibility === "Career Service Professional Eligibility"
  ).length;
  const EligibilitySubProfessional = alumnidata.filter(
    (item) => item.eligibility === "Career Service Sub Professional"
  ).length;
  const EligibilityBarangay = alumnidata.filter(
    (item) => item.eligibility === "Barangay Health Workers"
  ).length;
  const EligibilityHonor = alumnidata.filter(
    (item) => item.eligibility === "Honor Graduate Eligibility"
  ).length;
  const EligibilityIndustrial = alumnidata.filter(
    (item) => item.eligibility === "Industrial Safety and Health Eligibility"
  ).length;
  const EligibilityPVAO = alumnidata.filter(
    (item) =>
      item.eligibility ===
      "Philippine Veterans Affairs Office (PVAO) Eligibility"
  ).length;
  const EligibilityFire = alumnidata.filter(
    (item) => item.eligibility === "Fire Officer Eligibility"
  ).length;
  const EligibilityLicensed = alumnidata.filter(
    (item) => item.eligibility === "Licensed Professional Teacher Eligibility"
  ).length;

  const positionStatusContent = (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg w-[50%] h-[70%]">
      <h2 className="text-green-700 text-[16px] leading-[19px] font-bold mt-0 mb-4 text-center">
        Employment Type
      </h2>
      <div className="px-[25px] space-y-[15px] py-[15px]">
        <div>
          <h2>
            Regular<span className=" float-right">{StatusRegular}</span>
          </h2>
          <Progress
            percent={((StatusRegular / AlumniEmployed) * 100).toFixed(0)}
            status="active"
            strokeColor="#00C49F"
          />
        </div>
        <div>
          <h2>
            Casual<span className=" float-right">{StatusCasual}</span>
          </h2>
          <Progress
            percent={((StatusCasual / AlumniEmployed) * 100).toFixed(0)}
            status="active"
            strokeColor="#0088FE"
          />
        </div>
        <div>
          <h2>
            Seasonal<span className=" float-right">{StatusSeasonal}</span>
          </h2>
          <Progress
            percent={((StatusSeasonal / AlumniEmployed) * 100).toFixed(0)}
            status="active"
            strokeColor="#FFBB28"
          />
        </div>
        <div>
          <h2>
            Fixed-term<span className=" float-right">{StatusFixedTerm}</span>
          </h2>
          <Progress
            percent={((StatusFixedTerm / AlumniEmployed) * 100).toFixed(0)}
            status="active"
            strokeColor="#FF8042"
          />
        </div>
        <div>
          <h2>
            Probationary
            <span className=" float-right">{StatusProbationary}</span>
          </h2>
          <Progress
            percent={((StatusProbationary / AlumniEmployed) * 100).toFixed(0)}
            status="active"
            strokeColor="#FFBB28"
          />
        </div>
      </div>
      <button
        className="absolute top-2 right-2 text-gray-500"
        onClick={closeModal}
      >
        <FaTimes fontSize={20} />
      </button>
    </div>
  );

  const eligibilityStatusContent = (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg overflow-x-auto w-[40%] h-full">
      <h2 className="text-green-700 text-[16px] leading-[19px] font-bold mt-0 mb-4 text-center">
        Eligibility Status
      </h2>
      <div className="px-[25px] space-y-[15px] py-[15px]">
        <div>
          <h2>
            Bar and Board Examination
            <span className=" float-right">{EligibilityBar}</span>
          </h2>
          <Progress
            percent={((EligibilityBar / AlumniEligibility) * 100).toFixed(0)}
            status="active"
            strokeColor="#00C49F"
          />
        </div>
        <div>
          <h2>
            {" "}
            Pilot Eligibility for Military Aviators
            <span className=" float-right">{EligibilityPilot}</span>
          </h2>
          <Progress
            percent={((EligibilityPilot / AlumniEligibility) * 100).toFixed(0)}
            status="active"
            strokeColor="#0088FE"
          />
        </div>
        <div>
          <h2>
            {" "}
            National Service Training Eligibility
            <span className=" float-right">{EligibilityNational}</span>
          </h2>
          <Progress
            percent={((EligibilityNational / AlumniEligibility) * 100).toFixed(
              0
            )}
            status="active"
            strokeColor="#FFBB28"
          />
        </div>
        <div>
          <h2>
            Philippine National Police (PNP) Entrance Eligibility
            <span className=" float-right">{EligibilityPhilippine}</span>
          </h2>
          <Progress
            percent={(
              (EligibilityPhilippine / AlumniEligibility) *
              100
            ).toFixed(0)}
            status="active"
            strokeColor="#FF8042"
          />
        </div>
        <div>
          <h2>
            Barangay Health Workers Eligibility
            <span className=" float-right">{EligibilityBarangay}</span>
          </h2>
          <Progress
            percent={((EligibilityBarangay / AlumniEligibility) * 100).toFixed(
              0
            )}
            status="active"
            strokeColor="#FFBB28"
          />
        </div>
        <div>
          <h2>
            Career Service Professional
            <span className=" float-right">{EligibilityProfessional}</span>
          </h2>
          <Progress
            percent={(
              (EligibilityProfessional / AlumniEligibility) *
              100
            ).toFixed(0)}
            status="active"
            strokeColor="#FFBB28"
          />
        </div>
        <div>
          <h2>
            Career Service Sub Professional
            <span className=" float-right">{EligibilitySubProfessional}</span>
          </h2>
          <Progress
            percent={(
              (EligibilitySubProfessional / AlumniEligibility) *
              100
            ).toFixed(0)}
            status="active"
            strokeColor="#FFBB28"
          />
        </div>
        <div>
          <h2>
            {" "}
            Honor Graduate Eligibility
            <span className=" float-right">{EligibilityHonor}</span>
          </h2>
          <Progress
            percent={((EligibilityHonor / AlumniEligibility) * 100).toFixed(0)}
            status="active"
            strokeColor="#FFBB28"
          />
        </div>
        <div>
          <h2>
            Industrial Safety and Health Eligibility
            <span className=" float-right">{EligibilityIndustrial}</span>
          </h2>
          <Progress
            percent={(
              (EligibilityIndustrial / AlumniEligibility) *
              100
            ).toFixed(0)}
            status="active"
            strokeColor="#FFBB28"
          />
        </div>
        <div>
          <h2>
            {" "}
            Philippine Veterans Affairs Office (PVAO) Eligibility
            <span className=" float-right">{EligibilityPVAO}</span>
          </h2>
          <Progress
            percent={((EligibilityPVAO / AlumniEligibility) * 100).toFixed(0)}
            status="active"
            strokeColor="#FFBB28"
          />
        </div>
        <div>
          <h2>
            Fire Officer Eligibility
            <span className=" float-right">{EligibilityFire}</span>
          </h2>
          <Progress
            percent={((EligibilityFire / AlumniEligibility) * 100).toFixed(0)}
            status="active"
            strokeColor="#FFBB28"
          />
        </div>
        <div>
          <h2>
            {" "}
            Licensed Professional Teacher Eligibility
            <span className=" float-right">{EligibilityLicensed}</span>
          </h2>
          <Progress
            percent={((EligibilityLicensed / AlumniEligibility) * 100).toFixed(
              0
            )}
            status="active"
            strokeColor="#FFBB28"
          />
        </div>
      </div>
      <button
        className="absolute top-2 right-2 text-gray-500"
        onClick={closeModal}
      >
        <FaTimes fontSize={20} />
      </button>
    </div>
  );

  const chartWidth2 = Math.min(window.innerWidth - 20, 1000);
  const LineChart2 = (
    <div>
      <button className="close-button" onClick={closeModal}>
        &times;
      </button>
      <div style={{ overflowX: "auto", maxWidth: "800px" }}>
        <LineChart
          width={chartWidth2}
          height={450}
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Graduates" stroke="#82ca9d" />
        </LineChart>
      </div>
      <p className="text-black/180 text-center text-sm justify-center mt-4 ">
        Total Graduates: {Totalyeargrad}
      </p>
    </div>
  );
  const BarChart2 = (
    <div>
      <button className="close-button" onClick={closeModal}>
        &times;
      </button>
      <div style={{ overflowX: "auto", maxWidth: "800px" }}>
        <BarChart
          width={barWidth}
          height={400}
          data={alignmentData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Aligned" fill="#8884d8" name="Aligned" />
          <Bar dataKey="MisAligned" fill="#82ca9d" name="MisAligned" />
        </BarChart>
      </div>
    </div>
  );

  return (
    <div className="pt-[25px] px-[25px] bg-black">
      <div className="flex items-center justify-between">
        <h1 className="text-zinc-300 text-[28px] leading-[34px] font-normal cursor-pointer w-auto">
          Dashboard
        </h1>
      </div>
      <div className="grid grid-cols-4 gap-[10px] mt-[25px] pb-[15px] h-24">
        <div className="rounded-lg bg-[#00C49F] flex flex-col border border-[#b63d95c4] w-auto mt-2 cursor-pointer hover:shadow-lg transform hover:scale-103 transition duration-300 ease-out">
          <div className="w-full items-center justify-between">
            <h2 className="text-purple-700 text-xs sm:font-size-[5px] md:text-lg lg:text-xl xl:text-2xl leading-[17px] font-bold text-center">
              REGISTERED ALUMNI
            </h2>
            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-[24px] font-bold text-zinc-600 text-center mt-2 sm:mt-0">
              {alumnidata.length}
            </h3>
          </div>
          <div className="self-end pr-2 sm:self-end sm:pb-2 w-auto">
            <FaUserGraduate fontSize={25} color="#b63d95c4" />
          </div>
        </div>
        <div
          className="rounded-lg bg-[#0088FE] flex flex-col border border-[#b63d95c4] w-auto mt-2 cursor-pointer hover:shadow-lg transform hover:scale-103 transition duration-300 ease-out"
          onClick={() => openModal(positionStatusContent)}
        >
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
        <div
          className="rounded-lg bg-[#FF8042] flex flex-col border border-[#b63d95c4] w-auto mt-2 cursor-pointer hover:shadow-lg transform hover:scale-103 transition duration-300 ease-out"
          onClick={() => openModal(eligibilityStatusContent)}
        >
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
      </div>
      <div className="flex mt-[22px] w-full gap-[40px]">
        <div className="basis-[70%] border bg-white shadow-md cursor-pointer rounded-[4px] w-auto">
          <div className="bg-zinc-100 flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-zinc-200 mb-[20px]">
            <h2 className="text-green-700 text-[16px] leading-[19px] font-bold">
              Total Graduate per School Year
            </h2>
          </div>
          <div>
            <div onClick={() => openModal(LineChart2)}>
              <LineGraph />
            </div>
          </div>
        </div>
        <div className="basis-[30%] border bg-white shadow-md cursor-pointer rounded-[4px] w-auto">
          <div className="bg-zinc-100 flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-zinc-200 mb-[20px]">
            <h2 className="text-green-700 text-[16px] leading-[19px] font-bold">
              Employment Rate
            </h2>
          </div>
          <div>
            <div>
              <PieComponent />
            </div>
          </div>
        </div>
      </div>
      <div className="flex mt-[22px] w-full gap-[40px] h-1/3 mb-5">
        <div className="basis-[70%] border bg-white shadow-md cursor-pointer rounded-[4px] w-auto">
          <div className="bg-zinc-100 flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-zinc-200 mb-[20px]">
            <h2 className="text-green-700 text-[16px] leading-[19px] font-bold">
              Job Alignment Status
            </h2>
          </div>
          <div>
            <div onClick={() => openModal(BarChart2)}>
              <BarComponent />
            </div>
          </div>
        </div>
        <div className="basis-[30%] border bg-white shadow-md cursor-pointer rounded-[4px] w-auto">
          <div className="bg-zinc-100 flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-zinc-200 mb-[20px]">
            <h2 className="text-green-700 text-[16px] leading-[19px] font-bold">
              Continuos Education
            </h2>
          </div>
          <div>
            <PieCompEduc />
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg">
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={closeModal}
            >
              <FaTimes fontSize={20} />
            </button>
            {modalContent}
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
