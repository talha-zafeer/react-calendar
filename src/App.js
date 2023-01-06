import "bootstrap/dist/css/bootstrap.min.css";
import Calendar from "./Calendar";
import NavBar from "./NavBar";
import "./index.css";
import LogIn from "./LogIn";
import Create from "./Create";
import CreateAllDay from "./CreateAllDay";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./SignUp";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/create-event" element={<Create />} />
          <Route path="/create-all-day" element={<CreateAllDay />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          {/* <Route path="*" element={<Error404 />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
