import React, { useState, useEffect, useRef } from "react";
import "../Styles/startBGV.css";
import Header from "../header/Header";
import { useLocation } from "react-router-dom";

const StartBGV = () => {

  const [formData, setFormData] = useState({ 
    firstName: "",
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: "", text: "" });
  const [detailId, setDetailId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const fileInputRef = useRef(null);
  const location=useLocation();
  const userData=location.state?.User;

  
  const predefinedSkills = [
    "Java",
    "React",
    "SQL",
    "Python",
    "Spring Boot",
    "JavaScript",
    "Other",
  ];

  const documentSteps = [
    "resume",
    "tenthMarksheet",
    "twelfthMarksheet",
    "aadharProof",
    "graduationMarksheet",
    "postGraduationMarksheet",
    "experienceLetter",
    "profilePhoto",
    "skills"
  ];



  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId= userData?.userDetailId;
        console.log("userId",userId);

        const response = await fetch(`/users/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        
        if (data) {
          setFormData(prev => ({
            ...prev,
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            email: data.email || "",
            phone: data.phone || "",
            address: data.address || "",
            education: data.education || "",
            currentEmployer: data.currentEmployer || "",
            designation: data.designation || "",
            experience: data.experience || "",
            passportId: data.passportId || "",
            pfId: data.pfId || "",
            panNo: data.panNo || "",
            skills: data.skills || []
          }));

          if (data.detailId) {
            setDetailId(data.detailId);
            if (data.firstName && data.lastName && data.email) {
              setStep(2);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setSubmitMessage({ type: "error", text: "Failed to load user data. Please refresh the page." });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  useEffect(() => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
    if (!formData.education.trim()) newErrors.education = "Education is required";
    if (!formData.panNo.trim()) newErrors.panNo = "PAN Number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateDocumentStep = (docName) => {
    const newErrors = {};
    
    const optionalDocuments = ["postGraduationMarksheet", "experienceLetter"];
    if (optionalDocuments.includes(docName)) {
      return true;
    }

    if (docName === "profilePhoto") {
      if (formData.profilePhoto) {
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
        if (!allowedTypes.includes(formData.profilePhoto.type)) {
          newErrors.profilePhoto = "Profile photo must be a JPEG, JPG, or PNG file";
        } else if (formData.profilePhoto.size > 10 * 1024 * 1024) {
          newErrors.profilePhoto = "Profile photo must be less than 10 MB";
        }
      } else {
        newErrors.profilePhoto = "Profile photo is required";
      }
    } else if (docName !== "skills") {
      const file = formData[docName];
      if (file) {
        if (file.type !== "application/pdf") {
          newErrors[docName] = "File must be a PDF";
        } else if (file.size > 10 * 1024 * 1024) {
          newErrors[docName] = "File must be less than 10 MB";
        }
      } else {
        newErrors[docName] = "This document is required";
      }
    } else if (docName === "skills") {
      if (formData.skills.length === 0) {
        newErrors.skills = "At least one skill is required";
      }
    }

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

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] || null : null,
    });
    e.target.value = "";
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

  const submitPersonalInfo = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/users/{$detailId}/bgv',  { 
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          education: formData.education,
          currentEmployer: formData.currentEmployer,
          designation: formData.designation,
          experience: formData.experience,
          passportId: formData.passportId,
          pfId: formData.pfId,
          panNo: formData.panNo
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save personal information');
      }

      const data = await response.json();
      setDetailId(data.detailId); 
      setSubmitMessage({ type: "success", text: "Personal information saved successfully!" });
      return true; 
    } catch (error) {
      console.error('Error:', error);
      setSubmitMessage({ type: "error", text: error.message || "Failed to save personal information. Please try again." });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const uploadDocument = async (type, file) => {
    if (!detailId) {
      setSubmitMessage({ type: "error", text: "Please complete personal information first" });
      return false;
    }

    if (!file && !["postGraduationMarksheet", "experienceLetter"].includes(type)) {
      setSubmitMessage({ type: "error", text: "Please select a file to upload" });
      return false;
    }

    if (!file && ["postGraduationMarksheet", "experienceLetter"].includes(type)) {
      return true;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`/users/${detailId}/upload/${type}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to upload ${type}`);
      }

      const data = await response.text;
      setSubmitMessage({ type: "success", text: `${getDocumentLabel(type)} uploaded successfully!` });
      return true;
    } catch (error) {
      console.error(`Upload error:`, error);
      setSubmitMessage({ 
        type: "error", 
        text: error.message || `Failed to upload ${getDocumentLabel(type)}. Please try again.` 
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = async () => {
    if (step === 1) {
      if (!validateStep1()) return;
      const success = await submitPersonalInfo();
      if (!success) return;
    } else if (step > 1 && step <= documentSteps.length + 1) {
      const currentDoc = documentSteps[step - 2];
      if (!validateDocumentStep(currentDoc)) return;
      
      if (currentDoc !== "skills") {
        const uploadSuccess = await uploadDocument(currentDoc, formData[currentDoc]);
        if (!uploadSuccess) return;
      }
    }
    
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateDocumentStep("skills")) return;

    setIsSubmitting(true);
    try {
      if (detailId && formData.skills.length > 0) {
        const response = await fetch(`/users/${detailId}/skills`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ skills: formData.skills })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to save skills');
        }

        const data = await response.json();
        setSubmitMessage({ type: "success", text: "Background verification submitted successfully!" });
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitMessage({ type: "error", text: error.message || "Failed to complete submission. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCurrentDocumentName = () => {
    if (step > 1 && step <= documentSteps.length + 1) {
      return documentSteps[step - 2];
    }
    return "";
  };

  const getDocumentLabel = (docName) => {
    const labels = {
      resume: "Resume",
      tenthMarksheet: "10th Marksheet",
      twelfthMarksheet: "12th Marksheet",
      aadharProof: "Aadhaar Proof",
      graduationMarksheet: "Graduation Marksheet",
      postGraduationMarksheet: "Post Graduation Marksheet",
      experienceLetter: "Experience Letter",
      profilePhoto: "Profile Photo",
      skills: "Skills"
    };
    return labels[docName] || docName;
  };

  if (isLoading) {
    return (
      <div>
        <Header />
        <div className="loading-container">
          <p>Loading your information...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <section className="form-container">
        <div className="progress-indicator">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>1</div>
          {documentSteps.map((_, index) => (
            <React.Fragment key={index}>
              <div className="line"></div>
              <div className={`step ${step >= index + 2 ? 'active' : ''}`}>{index + 2}</div>
            </React.Fragment>
          ))}
        </div>

        <div className="start-bgv-container">
          {step === 1 && <h2 className="page-heading">Start Background Verification</h2>}

          {submitMessage.text && (
            <div className={`submit-message ${submitMessage.type}`}>
              {submitMessage.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="form-section active">
                <h3>Personal Information</h3>

                <div className="form-group">
                  <label>First Name</label>
                  <input 
                    type="text" 
                    name="firstName" 
                    placeholder="First Name" 
                    value={formData.firstName}
                    onChange={handleChange} 
                    required 
                  />
                  {errors.firstName && <span className="error">{errors.firstName}</span>}
                </div>

                <div className="form-group">
                  <label>Last Name</label>
                  <input 
                    type="text" 
                    name="lastName" 
                    placeholder="Last Name" 
                    value={formData.lastName}
                    onChange={handleChange} 
                    required 
                  />
                  {errors.lastName && <span className="error">{errors.lastName}</span>}
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="Enter Email" 
                    value={formData.email}
                    onChange={handleChange} 
                    required 
                  />
                  {errors.email && <span className="error">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label>Phone</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    placeholder="Enter Phone Number" 
                    value={formData.phone}
                    onChange={handleChange} 
                    required 
                  />
                  {errors.phone && <span className="error">{errors.phone}</span>}
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <textarea 
                    name="address" 
                    placeholder="Enter Address" 
                    value={formData.address}
                    onChange={handleChange} 
                    required
                  ></textarea>
                  {errors.address && <span className="error">{errors.address}</span>}
                </div>

                <div className="form-group">
                  <label>Education</label>
                  <input 
                    type="text" 
                    name="education" 
                    placeholder="Highest Qualification" 
                    value={formData.education}
                    onChange={handleChange} 
                    required 
                  />
                  {errors.education && <span className="error">{errors.education}</span>}
                </div>

                <div className="form-group">
                  <label>Current Employer (Optional)</label>
                  <input 
                    type="text" 
                    name="currentEmployer" 
                    placeholder="Employer Name" 
                    value={formData.currentEmployer}
                    onChange={handleChange} 
                  />
                </div>

                <div className="form-group">
                  <label>Designation (Optional)</label>
                  <input 
                    type="text" 
                    name="designation" 
                    placeholder="Designation" 
                    value={formData.designation}
                    onChange={handleChange} 
                  />
                </div>

                <div className="form-group">
                  <label>Experience (Years)</label>
                  <input 
                    type="number" 
                    name="experience" 
                    placeholder="Years of Experience" 
                    value={formData.experience}
                    onChange={handleChange} 
                  />
                </div>

                <div className="form-group">
                  <label>Passport ID (Optional)</label>
                  <input 
                    type="text" 
                    name="passportId" 
                    placeholder="Passport ID" 
                    value={formData.passportId}
                    onChange={handleChange} 
                  />
                </div>

                <div className="form-group">
                  <label>PF ID (Optional)</label>
                  <input 
                    type="text" 
                    name="pfId" 
                    placeholder="PF ID" 
                    value={formData.pfId}
                    onChange={handleChange} 
                  />
                </div>

                <div className="form-group">
                  <label>PAN Number</label>
                  <input 
                    type="text" 
                    name="panNo" 
                    placeholder="PAN Number" 
                    value={formData.panNo}
                    onChange={handleChange} 
                    required 
                  />
                  {errors.panNo && <span className="error">{errors.panNo}</span>}
                </div>

                <button 
                  type="button" 
                  className="next-btn" 
                  onClick={nextStep}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Next"}
                </button>
              </div>
            )}

            {step > 1 && step <= documentSteps.length + 1 && (
              <div className="form-section active">
                <h3>Upload {getDocumentLabel(getCurrentDocumentName())}</h3>
                
                {getCurrentDocumentName() !== "skills" ? (
                  <div className="form-group file-upload">
                    <input 
                      type="file" 
                      name={getCurrentDocumentName()} 
                      onChange={handleFileChange} 
                      accept={getCurrentDocumentName() === "profilePhoto" ? ".jpeg, .jpg, .png" : ".pdf"}
                      ref={fileInputRef}
                      key={`file-input-${step}`}
                      required={!["postGraduationMarksheet", "experienceLetter"].includes(getCurrentDocumentName())}
                    />
                    {errors[getCurrentDocumentName()] && (
                      <span className="error">{errors[getCurrentDocumentName()]}</span>
                    )}
                    <p className="file-upload-hint">
                      {getCurrentDocumentName() === "profilePhoto" 
                        ? "Please upload a JPEG, JPG, or PNG file (max 10MB)"
                        : "Please upload a PDF file (max 10MB)"}
                      {["postGraduationMarksheet", "experienceLetter"].includes(getCurrentDocumentName()) && " (Optional)"}
                    </p>
                    {formData[getCurrentDocumentName()] && (
                      <p className="file-selected">
                        Selected file: {formData[getCurrentDocumentName()].name}
                      </p>
                    )}
                  </div>
                ) : (
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
                        <div className="custom-skill-input" style={{ marginTop: '10px', width: '100%' }}>
                          <input
                            type="text"
                            value={customSkill}
                            onChange={(e) => setCustomSkill(e.target.value)}
                            placeholder="Enter custom skill"
                            className="custom-skill-text"
                            style={{ width: '70%', padding: '8px' }}
                          />
                          <button 
                            type="button" 
                            onClick={handleCustomSkillAdd}
                            className="add-skill-btn"
                            style={{ 
                              marginLeft: '10px',
                              padding: '8px 15px',
                              backgroundColor: '#4CAF50',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer'
                            }}
                          >
                            Add Skill
                          </button>
                        </div>
                      )}
                    </div>
                    
                    <div className="selected-skills-container" style={{ marginTop: '10px' }}>
                      {formData.skills.map((skill, index) => (
                        <span key={index} className="skill-tag" style={{ 
                          display: 'inline-block',
                          backgroundColor: '#f1f1f1',
                          padding: '5px 10px',
                          margin: '5px',
                          borderRadius: '20px',
                          fontSize: '14px'
                        }}>
                          {skill}
                          <button 
                            type="button" 
                            onClick={() => removeSkill(skill)}
                            className="remove-skill"
                            style={{
                              marginLeft: '5px',
                              backgroundColor: 'transparent',
                              border: 'none',
                              color: '#ff0000',
                              cursor: 'pointer',
                              fontSize: '12px'
                            }}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    
                    {errors.skills && <span className="error">{errors.skills}</span>}
                  </div>
                )}

                <div className="form-navigation">
                  <button type="button" className="prev-btn" onClick={prevStep}>Back</button>
                  {step <= documentSteps.length ? (
                    <button 
                      type="button" 
                      className="next-btn" 
                      onClick={nextStep}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Uploading..." : "Next"}
                    </button>
                  ) : (
                    <button 
                      type="submit" 
                      className="submit-btn"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                  )}
                </div>
              </div>
            )}
          </form>
        </div>
      </section>
    </div>
  );
};

export default StartBGV;