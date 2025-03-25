import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import AdminLayout from "./components/admin/AdminLayout";  
import Admin from "./components/admin/Admin";  
import AddUser from "./components/admin/AddUser";  
import User from "./components/user/User";
import UserHome from "./components/user/UserHome";
import StartBGV from "./components/user/StartBGV";
import ChangePassword from "./components/user/ChangePassword";
import ContactUs from "./components/user/ContactUs";
import UserDetails from './components/admin/UserDetails';
import UserDetailPage from './components/admin/UserDetailPage';  // Fixed import

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login Page */}
        <Route index element={<Login />} />

        {/* User Pages (User acts as a layout) */}
        <Route path="/user" element={<User />}>
          <Route index element={<UserHome />} />  
          <Route path="start-bgv" element={<StartBGV />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="contact-us" element={<ContactUs />} />
        </Route>

        {/* Admin Pages inside AdminLayout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Admin />} /> 
          <Route path="user-details" element={<UserDetails />} />
          <Route path="add-user" element={<AddUser />} />
          <Route path="search-user" element={<div>Search User Page</div>} />
          <Route path="user-details/:id" element={<UserDetailPage />} />  {/* Fixed Path */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
