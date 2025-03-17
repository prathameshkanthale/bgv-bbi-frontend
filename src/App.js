import React from "react";
import {BrowserRouter, Routes, Route } from "react-router-dom"; 
import Login from "./Login"; 
import Admin from "./components/admin/Admin";
import User from "./components/user/User";
import StartBGV from "./components/user/StartBGV"; 
import ChangePassword from "./components/user/ChangePassword";
import AddUser from "./components/admin/AddUser";


function App() {
  return (
    <BrowserRouter>
     <Routes>
      <Route index element={<Login />} />
      <Route path="/user" element={<User />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/user/start-bgv" element={<StartBGV />} />
      <Route path="/user/change-password" element={<ChangePassword />} /> 
      <Route path="/admin/add-user" element={<AddUser />}/>
      
    </Routes>
    </BrowserRouter>
   
  );
}

export default App;
