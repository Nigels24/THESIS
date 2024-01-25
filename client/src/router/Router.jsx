import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import Main from "../components/Main";
import Alumni from "../pages/Alumni";
import Events from "../pages/Events";
import Approvals from "../pages/Approvals";
import Forums from "../pages/Forums"; // Import Forums component
import JobOpportunities from "../pages/JobOpportunities";
import Stories from "../pages/Stories/Stories";
import News from "../pages/News";
import Landingpage from "../components/Landingpage";
import Adminpage from "../components/Adminpage";
import Logs from "../pages/Logs";

const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Main />} />
            <Route path="alumni" element={<Alumni />} />
            <Route path="event" element={<Events />} />
            <Route path="job" element={<JobOpportunities />} />
            <Route path="news" element={<News />} />
            <Route path="stories" element={<Stories />} />
            <Route path="forum" element={<Forums />} />
            <Route path="approval" element={<Approvals />} />
            <Route path="logs" element={<Logs />} />
            <Route path="Adminpage" element={<Adminpage />} />
            <Route path="Landingpage" element={<Landingpage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
