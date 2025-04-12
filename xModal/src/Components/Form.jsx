import React, { useState, useEffect, useRef } from "react";
import "./Form.css";

export default function Form() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    dob: "",
    username: "",
  });

  const modalRef = useRef(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { phone, dob } = formData;

    if (!/^\d{10}$/.test(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    const selectedDate = new Date(dob);
    const today = new Date();
    if (selectedDate > today) {
      alert("Invalid date of birth. Date of birth cannot be in the future.");
      return;
    }

    setIsOpen(false);
    setFormData({
      username: "",
      email: "",
      phone: "",
      dob: "",
    });
  };

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>User Details Modal</h1>
      <div style={{ textAlign: "center" }}>
        <button className="openForm-button" onClick={() => setIsOpen(true)}>
          Open Form
        </button>
      </div>

      {isOpen && (
        <div className="modal">
          <div className="modal-content" ref={modalRef}>
            <h2 style={{ textAlign: "center" }}>Fill Details</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">Username:</label>
              <input
                id="username"
                type="text"
                value={formData.username}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="email">Email Address:</label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="phone">Phone Number:</label>
              <input id="phone" type="tel" value={formData.phone} onChange={handleInputChange} />

              <label htmlFor="dob">Date of Birth:</label>
              <input id="dob" type="date" value={formData.dob} onChange={handleInputChange} />

              <div style={{ textAlign: "center", marginTop: "1rem" }}>
                <button type="submit" className="submit-button">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
