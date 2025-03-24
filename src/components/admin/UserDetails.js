import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data (replace with actual API call)
    const fetchUsers = async () => {
      const sampleUsers = [
        { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'password123', verificationStatus: 'Verified' },
        { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', password: 'password456', verificationStatus: 'Pending' }
      ];
      setUsers(sampleUsers);
    };

    fetchUsers();
  }, []);

  // Button Actions
  const handleUpdate = (id) => {
    console.log(`Update user with id: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete user with id: ${id}`);
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
            <th>User Id</th>
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
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.verificationStatus}</td>
              <td>
                <button className="small-button update-button" onClick={() => handleUpdate(user.id)}>Update</button>
                <button className="small-button delete-button" onClick={() => handleDelete(user.id)}>Delete</button>
                <button className="small-button more-button" onClick={() => handleMore(user.id)}>More</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserDetails;
