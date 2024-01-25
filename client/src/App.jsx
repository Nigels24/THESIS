import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import Alumni from "./pages/Alumni";
import Events from "./pages/Events";
import Approvals from "./pages/Approvals";
import JobOpportunities from "./pages/JobOpportunities";
import Stories from "./pages/Stories/Stories";
import News from "./pages/News";
import Landingpage from "./components/Landingpage";
import Adminpage from "./components/Adminpage";
import Registration from "./components/Registration/Registration";
import Dashboardview from "./components/Dashboardview";
import AAlumnipage from "./components/AlumniSide/AAlumnipage";
import AAlumniboardView from "./components/AlumniSide/AAlumniboardView";
import ANews from "./pages/AlumniSide/ANews";
import AStories from "./pages/Stories/AStories";
import AJobOpportunities from "./pages/AlumniSide/AJobOpportunities";
import AEvents from "./pages/AlumniSide/AEvents";
import AForums from "./pages/AlumniSide/AForums";
import AAlumni from "./pages/AlumniSide/AAlumni";
import AProfile from "./pages/AlumniSide/AProfile";
import Login from "./components/Login";
import Forums from "./pages/Forums";
import Logs from "./pages/Logs";
import PieCompEduc from "./components/PieCompEduc";
import BarComponent from "./components/BarComponent";
import LineGraph from "./components/LineGraph";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/alumni" element={<Alumni />} />
          <Route path="/event" element={<Events />} />
          <Route path="/job" element={<JobOpportunities />} />
          <Route path="/news" element={<News />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/forum" element={<Forums />} />
          <Route path="/approval" element={<Approvals />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/Adminpage" element={<Adminpage />} />
          <Route path="/Dashboardview" element={<Dashboardview />} />
          <Route path="/Main" element={<Main />} />
          <Route path="/AAlumnipage" element={<AAlumnipage />} />
          <Route path="/AAlumniboard" element={<AAlumniboardView />} />
          <Route path="/AAlumni" element={<AAlumni />} />
          <Route path="/AEvents" element={<AEvents />} />
          <Route path="/AForums" element={<AForums />} />
          <Route path="/AJobOpportunities" element={<AJobOpportunities />} />
          <Route path="/AStories" element={<AStories />} />
          <Route path="/ANews" element={<ANews />} />
          <Route path="/AProfile" element={<AProfile />} />
          <Route path="/Registration" element={<Registration />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Logs" element={<Logs />} />
          <Route path="/PieEducation" element={<PieCompEduc />} />
          <Route path="/BarComponents" element={<BarComponent />} />
          <Route path="/LineGraph" element={<LineGraph />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
