import React from "react";
import StudentList from "./components/StudentList";
import AddStudent from "./components/AddStudent";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <div>
      <Header />
      <AddStudent />
      <StudentList />
    </div>
  );
}

export default App;
