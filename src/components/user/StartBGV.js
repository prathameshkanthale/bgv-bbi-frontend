import React, { useState, useEffect } from "react";
import "../Styles/startBGV.css"; // Ensure this CSS file exists
import Header from "../header/Header"; 

const StartBGV = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    education: "",
    currentEmployer: "",
    designation: "",
    experience: "",
    passportId: "",
    pfId: "",
    panNo: "",
    profilePhoto: null,
    resume: null,
    aadharProof: null,
    tenthMarksheet: null,
    twelfthMarksheet: null,
    graduationMarksheet: null,
    postGraduationMarksheet: null,
    experienceLetter: null,
    skills: [],
  });

  const [step, setStep] = useState(1);
  const predefinedSkills = [
    "Java",
    "React",
    "SQL",
    "Python",
    "Spring Boot",
    "JavaScript",
    "Other",
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const handleChange = (e) => {
    const { name, value, files, options } = e.target;

    if (name === "skills") {
      const selectedSkills = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);
      setFormData({ ...formData, skills: selectedSkills });
    } else {
      setFormData({
        ...formData,
        [name]: files ? files[0] || null : value,
      });
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div>
       <Header/>
       <section className="form-container">

       
<div className="progress-indicator">
  <div className={`step ${step >= 1 ? 'active' : ''}`}>1</div>
  <div className="line"></div>
  <div className={`step ${step >= 2 ? 'active' : ''}`}>2</div>
  <div className="line"></div>
  <div className={`step ${step >= 3 ? 'active' : ''}`}>3</div>
</div>

    
    <div className="start-bgv-container">
      {step === 1 && <h2 className="page-heading">Start Background Verification</h2>}

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="form-section active">
            <h3>Personal Details</h3>

            <div className="form-group name-group">
              <label>Full Name</label>
              <div className="name-fields">
                <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
                <input type="text" name="middleName" placeholder="Middle Name" onChange={handleChange} />
                <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
              </div>
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" placeholder="Enter Email" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input type="tel" name="phone" placeholder="Enter Phone Number" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Address</label>
              <textarea name="address" placeholder="Enter Address" onChange={handleChange} required></textarea>
            </div>
            <div className="form-group">
              <label>Profile Photo</label>
              <input type="file" name="profilePhoto" onChange={handleChange} />
            </div>
            <button type="button" className="next-btn" onClick={nextStep}>Next</button>
          </div>
        )}

        {step === 2 && (
          <div className="form-section active">
            <h3>Education & Experience</h3>
            <div className="form-group">
              <label>Education</label>
              <input type="text" name="education" placeholder="Highest Qualification" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Current Employer</label>
              <input type="text" name="currentEmployer" placeholder="Employer Name" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Designation</label>
              <input type="text" name="designation" placeholder="Designation" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Experience (Years)</label>
              <input type="number" name="experience" placeholder="Years of Experience" onChange={handleChange} required />
            </div>
            <button type="button" className="prev-btn" onClick={prevStep}>Back</button>
            <button type="button" className="next-btn" onClick={nextStep}>Next</button>
          </div>
        )}

        {step === 3 && (
          <div className="form-section active">
            <h3>Skills & Documents</h3>
            <div className="form-group">
              <label>Skills</label>
              <select name="skills" onChange={handleChange} multiple>
                {predefinedSkills.map((skill, index) => (
                  <option key={index} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
            </div>
            {[
              "resume",
              "aadharProof",
              "tenthMarksheet",
              "twelfthMarksheet",
              "graduationMarksheet",
              "postGraduationMarksheet",
              "experienceLetter",
            ].map((file) => (
              <div className="form-group file-upload" key={file}>
                <label>{file.replace(/([A-Z])/g, " $1").trim()}</label>
                <input type="file" name={file} onChange={handleChange} />
              </div>
            ))}
            <button type="button" className="prev-btn" onClick={prevStep}>Back</button>
            <button type="submit" className="submit-btn">Submit</button>
          </div>
        )}
      </form>
    </div>
    </section>
    </div>

  );
};

export default StartBGV;
