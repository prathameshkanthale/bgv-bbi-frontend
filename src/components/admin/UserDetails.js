import React, { useEffect, useState } from 'react';

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch user data from your API or local storage (replace with your actual data source)
    const fetchUsers = async () => {
      // Sample static data for demonstration; replace with actual fetch logic.
      const sampleUsers = [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          password: 'password123',
          verificationStatus: 'Verified',
        },
        {
          id: 2,
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@example.com',
          password: 'password456',
          verificationStatus: 'Pending',
        },
      ];

      setUsers(sampleUsers);
    };

    fetchUsers();
  }, []);

  // Define actions for buttons here (you can implement real logic later)
  const handleUpdate = (id) => {
    console.log(`Update user with id: ${id}`);
    // Logic to update user
  };

  const handleDelete = (id) => {
    console.log(`Delete user with id: ${id}`);
    // Logic to delete user
  };

  const handleMore = (id) => {
    console.log(`View more details for user with id: ${id}`);
    // Logic to view more user details
  };
  const filteredUsers = users.filter(user => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const email = user.email.toLowerCase();
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase())
    );
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