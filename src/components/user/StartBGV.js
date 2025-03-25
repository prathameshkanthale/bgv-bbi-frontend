import React, { useState, useEffect } from "react";
import "../Styles/startBGV.css";
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
  const [errors, setErrors] = useState({});
  const [customSkill, setCustomSkill] = useState("");
  const [showCustomSkillInput, setShowCustomSkillInput] = useState(false);
  
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

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First Name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Phone must be 10 digits";
    if (!formData.address.trim()) newErrors.address = "Address is required";

    if (formData.profilePhoto) {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!allowedTypes.includes(formData.profilePhoto.type)) {
        newErrors.profilePhoto = "Profile photo must be a JPEG, JPG, or PNG file";
      } else if (formData.profilePhoto.size > 10 * 1024 * 1024) {
        newErrors.profilePhoto = "Profile photo must be less than 10 MB";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.education.trim()) newErrors.education = "Education is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};
    if (formData.skills.length === 0) newErrors.skills = "At least one skill is required";

    const pdfFiles = [
      { name: "resume", file: formData.resume },
      { name: "aadharProof", file: formData.aadharProof },
      { name: "tenthMarksheet", file: formData.tenthMarksheet },
      { name: "twelfthMarksheet", file: formData.twelfthMarksheet },
      { name: "graduationMarksheet", file: formData.graduationMarksheet },
      { name: "postGraduationMarksheet", file: formData.postGraduationMarksheet },
      { name: "experienceLetter", file: formData.experienceLetter },
    ];

    pdfFiles.forEach(({ name, file }) => {
      if (file) {
        if (file.type !== "application/pdf") {
          newErrors[name] = "File must be a PDF";
        } else if (file.size > 10 * 1024 * 1024) {
          newErrors[name] = "File must be less than 10 MB";
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] || null : value,
    });
  };

  const handleSkillChange = (e) => {
    const selectedSkill = e.target.value;
    if (selectedSkill === "Other") {
      setShowCustomSkillInput(true);
    } else if (selectedSkill && !formData.skills.includes(selectedSkill)) {
      setFormData({
        ...formData,
        skills: [...formData.skills, selectedSkill],
      });
    }
  };

  const handleCustomSkillAdd = () => {
    if (customSkill.trim() && !formData.skills.includes(customSkill)) {
      setFormData({
        ...formData,
        skills: [...formData.skills, customSkill],
      });
      setCustomSkill("");
      setShowCustomSkillInput(false);
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(skill => skill !== skillToRemove),
    });
  };

  const nextStep = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep3()) {
      console.log("Form Submitted:", formData);
    }
  };

  return (
    <div>
      <Header />
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
                    {errors.firstName && <span className="error">{errors.firstName}</span>}
                    <input type="text" name="middleName" placeholder="Middle Name" onChange={handleChange} />
                    <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
                    {errors.lastName && <span className="error">{errors.lastName}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input type="email" name="email" placeholder="Enter Email" onChange={handleChange} required />
                  {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input type="tel" name="phone" placeholder="Enter Phone Number" onChange={handleChange} required />
                  {errors.phone && <span className="error">{errors.phone}</span>}
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <textarea name="address" placeholder="Enter Address" onChange={handleChange} required></textarea>
                  {errors.address && <span className="error">{errors.address}</span>}
                </div>
                <div className="form-group">
                  <label>Profile Photo</label>
                  <input type="file" name="profilePhoto" onChange={handleChange} accept=".jpeg, .jpg, .png" />
                  {errors.profilePhoto && <span className="error">{errors.profilePhoto}</span>}
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
                  {errors.education && <span className="error">{errors.education}</span>}
                </div>
                <div className="form-group">
                  <label>Current Employer</label>
                  <input type="text" name="currentEmployer" placeholder="Employer Name" onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Designation</label>
                  <input type="text" name="designation" placeholder="Designation" onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Experience (Years)</label>
                  <input type="number" name="experience" placeholder="Years of Experience" onChange={handleChange} />
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
      <div className="skills-input-container">
        <select 
          name="skills" 
          onChange={handleSkillChange}
          value=""
          className="skills-dropdown"
        >
          <option value="" disabled>Select a skill</option>
          {predefinedSkills.map((skill, index) => (
            <option key={index} value={skill}>
              {skill}
            </option>
          ))}
        </select>
        
        {showCustomSkillInput && (
          <div className="custom-skill-input">
            <input
              type="text"
              value={customSkill}
              onChange={(e) => setCustomSkill(e.target.value)}
              placeholder="Enter skill"
              className="custom-skill-text"
            />
            <button 
              type="button" 
              onClick={handleCustomSkillAdd}
              className="add-skill-btn"
            >
              +
            </button>
          </div>
        )}
      </div>
      
      <div className="selected-skills-container">
        {formData.skills.map((skill, index) => (
          <span key={index} className="skill-tag">
            {skill}
            <button 
              type="button" 
              onClick={() => removeSkill(skill)}
              className="remove-skill"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      
      {errors.skills && <span className="error">{errors.skills}</span>}
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
                    <input type="file" name={file} onChange={handleChange} accept=".pdf" />
                    {errors[file] && <span className="error">{errors[file]}</span>}
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