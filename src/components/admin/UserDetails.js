import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data (replace with actual API call)
    const fetchUsers = async () => {
      const response = await fetch(`/user-login/getInfo`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const users=await response.json();
      console.log(users);
      setUsers(users);
    };

    fetchUsers();
  }, []);

  // Button Actions
  const handleUpdate = (id) => {
    console.log(`Update user with id: ${id}`);
  };

  const handleDelete = (userId) => {
    setUsers(prevUsers => prevUsers.filter(user => user.userId !== userId));
  };

  const handleMore = (id) => {
    navigate(`/admin/user-details/${id}`);
  };

  // Search filter
  const filteredUsers = users.filter(user => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <h1>User Details</h1>
      <input
        type="text"
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table>
        <thead>
          <tr>
           <th>User Id </th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email Id</th>
            <th>Password</th>
            <th>Verification Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.userId}>
             <td>{user.userId}</td>
              <td>{user.user.firstName}</td>
              <td>{user.user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.user.verificationStatus}</td>
              <td>
                <button className="small-button update-button" onClick={() => handleUpdate(user.id)}>Update</button>
                <button className="small-button delete-button" onClick={() => handleDelete(user.userId)}>Delete</button>
                <button className="small-button more-button" onClick={() => handleMore(user.user.detailId)}>More</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserDetails;
