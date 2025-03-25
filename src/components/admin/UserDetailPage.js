import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './../Styles/UserDetailPage.css';

const UserDetailPage = () => {
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    // Fetch user details based on ID (Replace with actual API call)
    const fetchUserDetails = async () => {
      const sampleUserDetails = {
        id: id,
        phoneNumber: '9876543210',
        address: '123 Main Street, City',
        aadharProof: 'aadhar_card.jpg',
        tenthMarksheet: '10th_marksheet.pdf',
        twelfthMarksheet: '12th_marksheet.pdf',
        education: 'B.Tech Computer Science',
        currentEmployer: 'Tech Corp',
        designation: 'Software Engineer',
        experience: '3 Years',
        skills: ['React', 'Node.js', 'Spring Boot'],
        resume: 'resume.pdf',
        profilePhoto: 'profile.jpg',
        graduationMarksheet: 'graduation_marksheet.pdf',
        postGraduationMarksheet: 'post_graduation_marksheet.pdf',
        experienceLetter: 'experience_letter.pdf',
      };

      setUserDetails(sampleUserDetails);
    };

    fetchUserDetails();
  }, [id]);

  const handleUpdate = () => {
    console.log("Update button clicked for user ID:", id);
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
            <td>{userDetails.phoneNumber}</td>
          </tr>
          <tr>
            <td>🏠 Address:</td>
            <td>{userDetails.address}</td>
          </tr>
          <tr>
            <td>🆔 Aadhar Proof:</td>
            <td><a href={`/uploads/${userDetails.aadharProof}`} download>Download</a></td>
          </tr>
          <tr>
            <td>📜 10th Marksheet:</td>
            <td><a href={`/uploads/${userDetails.tenthMarksheet}`} download>Download</a></td>
          </tr>
          <tr>
            <td>📜 12th Marksheet:</td>
            <td><a href={`/uploads/${userDetails.twelfthMarksheet}`} download>Download</a></td>
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
            <td>{userDetails.skills.join(', ')}</td>
          </tr>
          <tr>
            <td>📄 Resume:</td>
            <td><a href={`/uploads/${userDetails.resume}`} download>Download</a></td>
          </tr>
          <tr>
            <td>🖼️ Profile Photo:</td>
            <td><img src={`/uploads/${userDetails.profilePhoto}`} alt="Profile" width="100" /></td>
          </tr>
          <tr>
            <td>🎓 Graduation Marksheet:</td>
            <td><a href={`/uploads/${userDetails.graduationMarksheet}`} download>Download</a></td>
          </tr>
          <tr>
            <td>🎓 Post Graduation Marksheet:</td>
            <td><a href={`/uploads/${userDetails.postGraduationMarksheet}`} download>Download</a></td>
          </tr>
          <tr>
            <td>📜 Experience Letter:</td>
            <td><a href={`/uploads/${userDetails.experienceLetter}`} download>Download</a></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserDetailPage;
