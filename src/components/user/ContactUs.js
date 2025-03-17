import React from "react";
import "../Styles/Contact.css";

const ContactUs = () => {
  return (
    <div className="contact-us-container">
      <h2>Contact Us</h2>
      <p>If you have any questions, please reach out to us.</p>
      
      <div className="contact-info">
        <p><strong>Email:</strong> support@bgi-portal.com</p>
        <p><strong>Phone:</strong> +91 98765 43210</p>
        <p><strong>Address:</strong>Bangalore
Karle Infra Special Economic Zone,
Karle Town Center, North - East Bay, 1st Floor,
Hub - 1 Building, SEZ Tower,
North, Taluk, Nagavara Village,
Bengaluru, Karnataka, India 560045</p>
      </div>
      
      {/* Google Map Embed */}
      <div className="map-container">
        <iframe
           title="Google Map Location"
           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.8728713174983!2d77.6139869102751!3d13.043763087225209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1771bc840127%3A0x17470ca3094ee16e!2sKarle%20Town%20centre%20HUB%201!5e0!3m2!1sen!2sin!4v1742238946749!5m2!1sen!2sin"
           width="100%"
           height="400"
           style={{ border: "0", borderRadius: "10px" }}
           allowFullScreen
           loading="lazy"
           referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;
