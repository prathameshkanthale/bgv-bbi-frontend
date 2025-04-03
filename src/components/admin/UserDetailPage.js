import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './../Styles/UserDetailPage.css';

const UserDetailPage = () => {
  const { id } = useParams(); 

  const [userDetails, setUserDetails] = useState(null); 
  

  useEffect(() => {
    // Fetch user details based on ID (Replace with actual API call) 
    const fetchUserDetails = async () => {
    
      const response = await fetch(`/users/details/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const users=await response.json();
    
       console.log(users);

      setUserDetails(users);

    };

    fetchUserDetails();
  }, []);

  const handleUpdate = () => {
   // console.log("Update button clicked for user ID:", id);
    // Implement update functionality (e.g., open form for editing)
  };

  if (!userDetails) return <div>Loading...</div>;

  return (
    <div className="user-detail-container">
      <h1>User Additional Details</h1>

      {/* Small Update Button Below Header at Top Right */}
      <div className="update-btn-container">
        <button className="update-btn" onClick={handleUpdate}>Update</button>
      </div>

      <table className="user-detail-table">
        <thead>
          <tr>
            <th>Field</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>📞 Phone Number:</td>
            <td>{userDetails.phone}</td>
          </tr>
          <tr>
            <td>🏠 Address:</td>
            <td>{userDetails.address}</td>
          </tr>
          <tr>
            <td>🆔 Aadhar Proof:</td>
            <td><a href={`http://localhost:8080/files/download/aadhar/${id}`} download>Download</a></td>
          </tr>
          <tr>
            <td>📜 10th Marksheet:</td>
            <td><a href={`http://localhost:8080/files/download/tenth-marksheet/${id}`} download>Download</a></td>
          </tr>
          <tr>
            <td>📜 12th Marksheet:</td>
            <td><a href={`http://localhost:8080/files/download/twelfth-marksheet/${id}`} download>Download</a></td>
          </tr>
          <tr>
            <td>🎓 Education Qualification:</td>
            <td>{userDetails.education}</td>
          </tr>
          <tr>
            <td>🏢 Current Employer:</td>
            <td>{userDetails.currentEmployer}</td>
          </tr>
          <tr>
            <td>💼 Job Designation:</td>
            <td>{userDetails.designation}</td>
          </tr>
          <tr>
            <td>⌛ Total Work Experience:</td>
            <td>{userDetails.experience}</td>
          </tr>
          <tr>
          <td>🛠️ Technical Skills:</td>
<td>{userDetails.skills.map((s) => s.skillName).join(', ')}</td>

            
          </tr>
          <tr>
            <td>📄 Resume:</td>
            <td><a href={`http://localhost:8080/files/download/resume/${id}`} download>Download</a></td>
          </tr>
          <tr>
            <td>🖼️ Profile Photo:</td>
            
            <td><a href={`http://localhost:8080/files/download/profile-photo/${id}`} download>Download</a></td>
          </tr>
          <tr>
            <td>🎓 Graduation Marksheet:</td>
            <td><a href={`http://localhost:8080/files/download/graduation-marksheet/${id}`} download>Download</a></td>
          </tr>
          <tr>
            <td>🎓 Post Graduation Marksheet:</td>
            <td><a href={`http://localhost:8080/files/download/postgraduation-marksheet/${id}`} download>Download</a></td>
          </tr>
          <tr>
            <td>📜 Experience Letter:</td>
            <td><a href={`http://localhost:8080/files/download/experience-letter/${id}`} download>Download</a></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserDetailPage;
