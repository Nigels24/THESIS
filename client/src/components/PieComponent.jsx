import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell } from "recharts";
import api from "../configs/axios-base-url";
import { FaTimes } from "react-icons/fa";
import { Progress } from "antd";

const PieComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleButtonClick = (response) => {
    if (response === "Employed") {
      openModal();
    } else if (response === "Unemployed") {
      // Handle "NO" button click
      // Add your logic here
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

  if (loading) {
    return <p>Loading...</p>; // or some loading indicator
  }
  const totalAlumni = alumnidata.length;
  const AlumniEmployed = alumnidata.filter(
    (item) => item.employment_status === "Employed"
  ).length;

  const AlumniUnemployed = alumnidata.filter(
    (item) => item.employment_status === "Unemployed"
  ).length;

  const data = [
    { name: "Employed", value: AlumniEmployed },
    { name: "Unemployed", value: AlumniUnemployed },
  ];

  const TotalEmployed2015 = alumnidata.filter(
    (item) => item.yeargrad === "2014-2015"
  ).length;
  const Employed2015 = alumnidata.filter(
    (item) =>
      item.yeargrad === "2014-2015" && item.employment_status === "Employed"
  ).length;
  const UnEmployed2015 = alumnidata.filter(
    (item) =>
      item.yeargrad === "2014-2015" && item.employment_status === "Unemployed"
  ).length;

  const TotalEmployed2016 = alumnidata.filter(
    (item) => item.yeargrad === "2015-2016"
  ).length;
  const Employed2016 = alumnidata.filter(
    (item) =>
      item.yeargrad === "2015-2016" && item.employment_status === "Employed"
  ).length;
  const UnEmployed2016 = alumnidata.filter(
    (item) =>
      item.yeargrad === "2015-2016" && item.employment_status === "Unemployed"
  ).length;

  const TotalEmployed2017 = alumnidata.filter(
    (item) => item.yeargrad === "2016-2017"
  ).length;
  const Employed2017 = alumnidata.filter(
    (item) =>
      item.yeargrad === "2016-2017" && item.employment_status === "Employed"
  ).length;
  const UnEmployed2017 = alumnidata.filter(
    (item) =>
      item.yeargrad === "2016-2017" && item.employment_status === "Unemployed"
  ).length;

  const TotalEmployed2018 = alumnidata.filter(
    (item) => item.yeargrad === "2017-2018"
  ).length;
  const Employed2018 = alumnidata.filter(
    (item) =>
      item.yeargrad === "2017-2018" && item.employment_status === "Employed"
  ).length;
  const UnEmployed2018 = alumnidata.filter(
    (item) =>
      item.yeargrad === "2017-2018" && item.employment_status === "Unemployed"
  ).length;

  const TotalEmployed2019 = alumnidata.filter(
    (item) => item.yeargrad === "2018-2019"
  ).length;
  const Employed2019 = alumnidata.filter(
    (item) =>
      item.yeargrad === "2018-2019" && item.employment_status === "Employed"
  ).length;
  const UnEmployed2019 = alumnidata.filter(
    (item) =>
      item.yeargrad === "2018-2019" && item.employment_status === "Unemployed"
  ).length;

  const TotalEmployed2020 = alumnidata.filter(
    (item) => item.yeargrad === "2019-2020"
  ).length;
  const Employed2020 = alumnidata.filter(
    (item) =>
      item.yeargrad === "2019-2020" && item.employment_status === "Employed"
  ).length;
  const UnEmployed2020 = alumnidata.filter(
    (item) =>
      item.yeargrad === "2019-2020" && item.employment_status === "Unemployed"
  ).length;

  const TotalEmployed2021 = alumnidata.filter(
    (item) => item.yeargrad === "2020-2021"
  ).length;
  const Employed2021 = alumnidata.filter(
    (item) =>
      item.yeargrad === "2020-2021" && item.employment_status === "Employed"
  ).length;
  const UnEmployed2021 = alumnidata.filter(
    (item) =>
      item.yeargrad === "2020-2021" && item.employment_status === "Unemployed"
  ).length;

  const TotalEmployed2022 = alumnidata.filter(
    (item) => item.yeargrad === "2021-2022"
  ).length;
  const Employed2022 = alumnidata.filter(
    (item) =>
      item.yeargrad === "2021-2022" && item.employment_status === "Employed"
  ).length;
  const UnEmployed2022 = alumnidata.filter(
    (item) =>
      item.yeargrad === "2021-2022" && item.employment_status === "Unemployed"
  ).length;

  const TotalEmployed2023 = alumnidata.filter(
    (item) => item.yeargrad === "2022-2023"
  ).length;
  const Employed2023 = alumnidata.filter(
    (item) =>
      item.yeargrad === "2022-2023" && item.employment_status === "Employed"
  ).length;
  const UnEmployed2023 = alumnidata.filter(
    (item) =>
      item.yeargrad === "2022-2023" && item.employment_status === "Unemployed"
  ).length;

  const COLORS = ["#0088FE", "#FFBB28"];

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
      <PieChart width={400} height={400}>
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
          onClick={() => handleButtonClick("Employed")}
          className="bg-green-500 text-white py-2 rounded"
        >
          See Details...
        </button>
      </div>
      {isModalOpen && (
        <div>
          {/* Modal content */}
          <div>
            <div>
              <b className=" font-semibold">
                Total Alumni Registered in 2014-2015
              </b>
              <span className=" float-right">{TotalEmployed2015}</span>
            </div>
            <label>
              <b className=" font-medium">Employed</b>
              <span className=" float-right">{Employed2015}</span>
              <Progress
                percent={((Employed2015 / totalAlumni) * 100).toFixed(0)}
                status="active"
                strokeColor="#00C49F"
              />
              <b className=" font-medium">Unemployed</b>
              <span className=" float-right">{UnEmployed2015}</span>
              <Progress
                percent={((UnEmployed2015 / totalAlumni) * 100).toFixed(0)}
                status="active"
                strokeColor="#00C49F"
              />
            </label>
          </div>
          <div>
            <div>
              <b className=" font-semibold">
                Total Alumni Registered in 2015-2016
              </b>
              <span className=" float-right">{TotalEmployed2016}</span>
            </div>
            <label>
              <b className=" font-medium">Employed</b>
              <span className=" float-right">{Employed2016}</span>
              <Progress
                percent={((Employed2016 / totalAlumni) * 100).toFixed(0)}
                status="active"
                strokeColor="#00C49F"
              />
              <b className=" font-medium">Unemployed</b>
              <span className=" float-right">{UnEmployed2016}</span>
              <Progress
                percent={((UnEmployed2016 / totalAlumni) * 100).toFixed(0)}
                status="active"
                strokeColor="#00C49F"
              />
            </label>
          </div>

          <div>
            <div>
              <b className=" font-semibold">
                Total Alumni Registered in 2016-2017
              </b>
              <span className=" float-right">{TotalEmployed2017}</span>
            </div>
            <label>
              <b className=" font-medium">Employed</b>
              <span className=" float-right">{Employed2017}</span>
              <Progress
                percent={((Employed2017 / totalAlumni) * 100).toFixed(0)}
                status="active"
                strokeColor="#00C49F"
              />
              <b className=" font-medium">Unemployed</b>
              <span className=" float-right">{UnEmployed2017}</span>
              <Progress
                percent={((UnEmployed2017 / totalAlumni) * 100).toFixed(0)}
                status="active"
                strokeColor="#00C49F"
              />
            </label>
          </div>
          <div>
            <div>
              <b className=" font-semibold">
                Total Alumni Registered in 2017-2018
              </b>
              <span className=" float-right">{TotalEmployed2018}</span>
            </div>
            <label>
              <b className=" font-medium">Employed</b>
              <span className=" float-right">{Employed2018}</span>
              <Progress
                percent={((Employed2018 / totalAlumni) * 100).toFixed(0)}
                status="active"
                strokeColor="#00C49F"
              />
              <b className=" font-medium">Unemployed</b>
              <span className=" float-right">{UnEmployed2018}</span>
              <Progress
                percent={((UnEmployed2018 / totalAlumni) * 100).toFixed(0)}
                status="active"
                strokeColor="#00C49F"
              />
            </label>
          </div>
          <div>
            <div>
              <b className=" font-semibold">
                Total Alumni Registered in 2018-2019
              </b>
              <span className=" float-right">{TotalEmployed2019}</span>
            </div>
            <label>
              <b className=" font-medium">Employed</b>
              <span className=" float-right">{Employed2019}</span>
              <Progress
                percent={((Employed2019 / totalAlumni) * 100).toFixed(0)}
                status="active"
                strokeColor="#00C49F"
              />
              <b className=" font-medium">Unemployed</b>
              <span className=" float-right">{UnEmployed2019}</span>
              <Progress
                percent={((UnEmployed2019 / totalAlumni) * 100).toFixed(0)}
                status="active"
                strokeColor="#00C49F"
              />
            </label>
          </div>
          <div>
            <div>
              <b className=" font-semibold">
                Total Alumni Registered in 2019-2020
              </b>
              <span className=" float-right">{TotalEmployed2020}</span>
            </div>
            <label>
              <b className=" font-medium">Employed</b>
              <span className=" float-right">{Employed2020}</span>
              <Progress
                percent={((Employed2020 / totalAlumni) * 100).toFixed(0)}
                status="active"
                strokeColor="#00C49F"
              />
              <b className=" font-medium">Unemployed</b>
              <span className=" float-right">{UnEmployed2020}</span>
              <Progress
                percent={((UnEmployed2020 / totalAlumni) * 100).toFixed(0)}
                status="active"
                strokeColor="#00C49F"
              />
            </label>
          </div>
          <div>
            <div>
              <b className=" font-semibold">
                Total Alumni Registered in 2020-2021
              </b>
              <span className=" float-right">{TotalEmployed2021}</span>
            </div>
            <label>
              <b className=" font-medium">Employed</b>
              <span className=" float-right">{Employed2021}</span>
              <Progress
                percent={((Employed2021 / totalAlumni) * 100).toFixed(0)}
                status="active"
                strokeColor="#00C49F"
              />
              <b className=" font-medium">Unemployed</b>
              <span className=" float-right">{UnEmployed2021}</span>
              <Progress
                percent={((UnEmployed2021 / totalAlumni) * 100).toFixed(0)}
                status="active"
                strokeColor="#00C49F"
              />
            </label>
          </div>
          <div>
            <div>
              <b className=" font-semibold">
                Total Alumni Registered in 2021-2022
              </b>
              <span className=" float-right">{TotalEmployed2022}</span>
            </div>
            <label>
              <b className=" font-medium">Employed</b>
              <span className=" float-right">{Employed2022}</span>
              <Progress
                percent={((Employed2022 / totalAlumni) * 100).toFixed(0)}
                status="active"
                strokeColor="#00C49F"
              />
              <b className=" font-medium">Unemployed</b>
              <span className=" float-right">{UnEmployed2022}</span>
              <Progress
                percent={((UnEmployed2022 / totalAlumni) * 100).toFixed(0)}
                status="active"
                strokeColor="#00C49F"
              />
            </label>
          </div>
          <div>
            <div>
              <b className=" font-semibold">
                Total Alumni Registered in 2022-2023
              </b>
              <span className=" float-right">{TotalEmployed2023}</span>
            </div>
            <label>
              <b className=" font-medium">Employed</b>
              <span className=" float-right">{Employed2023}</span>
              <Progress
                percent={((Employed2023 / totalAlumni) * 100).toFixed(0)}
                status="active"
                strokeColor="#00C49F"
              />
              <b className=" font-medium">Unemployed</b>
              <span className=" float-right">{UnEmployed2023}</span>
              <Progress
                percent={((UnEmployed2023 / totalAlumni) * 100).toFixed(0)}
                status="active"
                strokeColor="#00C49F"
              />
            </label>
          </div>

          <div>
            <b className=" font-semibold">Total Number of Alumni Employed: </b>
            <span className=" float-right">{AlumniEmployed}</span>
          </div>
          <div>
            <b className=" font-semibold">
              Total Number of Alumni Unemployed:{" "}
            </b>
            <span className=" float-right">{AlumniUnemployed}</span>
          </div>
          <button onClick={closeModal}>
            <FaTimes />
          </button>
        </div>
      )}
    </div>
  );
};

export default PieComponent;
