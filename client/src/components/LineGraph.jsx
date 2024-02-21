import React, { useEffect, useState } from "react";
import Axios from "../configs/axios-base-url";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
// ... (imports)

const MyLineChart = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
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

  const chartWidth = Math.max(600, data.length * 10);

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalContent(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <LineChart
        width={chartWidth}
        height={300}
        data={data}
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
      <p className="text-black/180 text-center text-sm justify-center mt-4">
        Total Graduates: {Totalyeargrad}
      </p>

      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            {modalContent}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyLineChart;
