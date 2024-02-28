import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell } from "recharts";
import api from "../configs/axios-base-url";
import { FaTimes } from "react-icons/fa";
import { Progress } from "antd";

const PieCompEduc = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chartWidth, setChartWidth] = useState(400);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleButtonClick = (response) => {
    if (response === "YES") {
      openModal();
    } else if (response === "NO") {
    }
  };

  const [alumnidata, setAlumniData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const handleResize = () => {
      setChartWidth(window.innerWidth >= 768 ? 400 : window.innerWidth - 20);
    };
    handleResize(); // Initial call to set chart width
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (loading) {
    return <p>Loading...</p>; // or some loading indicator
  }
  const totalAlumni = alumnidata.length;
  const AlumniPursue = alumnidata.filter(
    (item) => item.engage_studies === "YES"
  ).length;

  const AlumniUnPursue = alumnidata.filter(
    (item) => item.engage_studies === "NO"
  ).length;

  const data = [
    { name: "YES", value: AlumniPursue },
    { name: "NO", value: AlumniUnPursue },
  ];

  const AlumniDoctoral = alumnidata.filter(
    (item) => item.enroll_studies === "With Doctoral Units"
  ).length;

  const AlumniGraduate = alumnidata.filter(
    (item) => item.enroll_studies === "MA/MS Graduate"
  ).length;
  const AlumniUnits = alumnidata.filter(
    (item) => item.enroll_studies === "With MA/MS Units"
  ).length;
  const AlumniBaccalaureate = alumnidata.filter(
    (item) => item.enroll_studies === "Other Baccalaureate Course"
  ).length;
  const AlumniOthers = alumnidata.filter(
    (item) => item.enroll_studies === "Other"
  ).length;
  const NotApplicable = alumnidata.filter(
    (item) => item.enroll_studies === "Not Applicable"
  ).length;

  const COLORS = ["LightGreen", "Red"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${data[index].name} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className=" m-5">
      <PieChart width={chartWidth} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <div className="grid grid-cols-2 mt-[10px]">
        <button
          onClick={() => handleButtonClick("YES")}
          className="bg-green-500 text-white py-2 rounded"
        >
          See Details...
        </button>
      </div>
      {isModalOpen && (
        <div>
          <div>
            <b className=" font-medium">Total Registered Alumni</b>
            <span className=" float-right">{totalAlumni}</span>{" "}
          </div>
          <div>
            <b className=" font-medium">Continuos</b>
            <span className=" float-right">{AlumniPursue}</span>{" "}
          </div>
          <b className=" font-medium">Not Pursue</b>
          <span className=" float-right">{AlumniUnPursue}</span>
          <div className=" mt-5">
            <b className=" font-medium">Doctoral units</b>
            <span className=" float-right">{AlumniDoctoral}</span>
            <Progress
              percent={((AlumniDoctoral / totalAlumni) * 100).toFixed(0)}
              status="active"
              strokeColor="#00C49F"
            />
          </div>
          <div>
            <b className=" font-medium">MA/MS Graduate</b>
            <span className=" float-right">{AlumniGraduate}</span>
            <Progress
              percent={((AlumniGraduate / totalAlumni) * 100).toFixed(0)}
              status="active"
              strokeColor="#00C49F"
            />
          </div>
          <div>
            <b className=" font-medium">With MA/MS Units</b>
            <span className=" float-right">{AlumniUnits}</span>
            <Progress
              percent={((AlumniUnits / totalAlumni) * 100).toFixed(0)}
              status="active"
              strokeColor="#00C49F"
            />
          </div>
          <div>
            <b className=" font-medium">Other Baccalaureate Course</b>
            <span className=" float-right">{AlumniBaccalaureate}</span>
            <Progress
              percent={((AlumniBaccalaureate / totalAlumni) * 100).toFixed(0)}
              status="active"
              strokeColor="#00C49F"
            />
          </div>
          <div>
            <b className=" font-medium">Others</b>
            <span className=" float-right">{AlumniOthers}</span>
            <Progress
              percent={((AlumniOthers / totalAlumni) * 100).toFixed(0)}
              status="active"
              strokeColor="#00C49F"
            />
          </div>
          <div>
            <b className=" font-medium">Not Applicable</b>
            <span className=" float-right">{NotApplicable}</span>
            <Progress
              percent={((NotApplicable / totalAlumni) * 100).toFixed(0)}
              status="active"
              strokeColor="#00C49F"
            />
          </div>

          <button onClick={closeModal}>
            <FaTimes />
          </button>
        </div>
      )}
    </div>
  );
};

export default PieCompEduc;
