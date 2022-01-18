import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Edit from "./components/Edit";
import Aside from "./components/Aside";
import Add from "./components/Add";
import ShowAllQuestions from "./components/ShowAllQuestions";

function App() {

  return (
    <>
      <Router>
        <Aside />
        <Routes>
          <Route
            path="/"
            element={
              <ShowAllQuestions
              />
            }
          />
          <Route
            path="/questions/:id"
            element={<Edit />}
          />
          <Route path="/add" element={<Add />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
