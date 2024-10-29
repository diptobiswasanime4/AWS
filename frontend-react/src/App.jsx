import { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import S3Upload from "./components/S3Upload";
import Todos from "./components/Todos";

function App() {
  return (
    <Routes>
      <Route path="/s3" element={<S3Upload />}></Route>
      <Route path="/todos" element={<Todos />}></Route>
    </Routes>
  );
}

export default App;
