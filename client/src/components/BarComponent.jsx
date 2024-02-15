import React, { useState, useEffect } from "react";
import api from "../configs/axios-base-url";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const BarComponent = () => {
  const [alumnidataBG, setAlumniDataBG] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <p>Loading...</p>; // or some loading indicator
  }

  // Calculate counts for each year
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

  const barWidth = Math.max(700);
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

  return (
    <div>
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
  );
};

export default BarComponent;
