import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "../src/components/Navbar/Navbar";
import Home from "../src/components/Home/Home";
import Admin from "../src/components/Admin/Admin";

import "./index.css";

function Main() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Navbar onSearch={handleSearch} />
                <Home searchTerm={searchTerm} />
              </div>
            }
          />

          <Route
            path="/admin"
            element={
              <div>
                <Admin />
              </div>
            }
          />
        </Routes>
      </Router>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);


