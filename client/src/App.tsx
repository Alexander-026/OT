import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import Layout from "./layout/Layout";
import ActivatePage from "./pages/ActivatePage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";

function App() {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path="/activate" element={<ActivatePage/>}/>
      <Route path="/" element={<Layout/>}>
          <Route index path="/" element={<HomePage/>}/>
          <Route path="*" element={<Navigate to="/" replace />}/>
      </Route>
    </Routes>
  );
}

export default App;
