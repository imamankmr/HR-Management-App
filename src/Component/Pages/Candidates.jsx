import React, { useEffect, useState } from "react";
import "./Candidates.css";
import Navbar from "./Navbar";
import axios from "axios";

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCandidate, setNewCandidate] = useState({
    fullName: "",
    email: "",
    phone: "",
    department: "",
    experience: "",
  });
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCandidate({ ...newCandidate, [name]: value });
  };

  const fetchCandidates = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/candidates");
      setCandidates(data);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !newCandidate.fullName ||
      !newCandidate.email ||
      !newCandidate.phone ||
      !newCandidate.department ||
      !newCandidate.experience
    ) {
      alert("fill out all fields.");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/candidates", newCandidate);
      fetchCandidates();
      setShowModal(false);
      setNewCandidate({
        fullName: "",
        email: "",
        phone: "",
        department: "",
        experience: "",
      });
    } catch (error) {
      console.error("Error adding candidate:", error);
    }
  };

  const handleUpdate = async (candidateId) => {
    try {
      await axios.patch(`http://localhost:5000/api/candidates/${candidateId}`, {
        isEmployee: true,
      });
      fetchCandidates();
    } catch (error) {
      console.error("Error updating candidate:", error);
    }
  };

  const handleDelete = async (candidateId) => {
    console.log("Delete  candidateID:", candidateId);
    try {
      await axios.delete(`http://localhost:5000/api/candidates/${candidateId}`);
      fetchCandidates();
    } catch (error) {
      console.error("Error deleting candidate:", error);
    }
  };

  const filteredCandidates = candidates.filter(
    (candidate) =>
      candidate.fullName.toLowerCase().includes(search.toLowerCase()) ||
      candidate.email.toLowerCase().includes(search.toLowerCase()) ||
      candidate.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="candidate-page">
      <h1 className="title">Candidates Management</h1>
      <Navbar />

      <div className="search-container">
        <input
          type="text"
          id="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
          placeholder="Search candidates"
        />
      </div>

      <button className="add-button" onClick={() => setShowModal(true)}>
        Add Candidate
      </button>

      <table className="candidate-table">
        <thead>
          <tr>
            <th>Sl no.</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Experience</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCandidates.map((candidate, index) => (
            <tr key={candidate.id}>
              <td>{index + 1}</td>
              <td>{candidate.fullName}</td>
              <td>{candidate.email}</td>
              <td>{candidate.phone}</td>
              <td>{candidate.department}</td>
              <td>{candidate.experience}</td>
              <td>
                <button
                  className="move-button"
                  onClick={() => handleUpdate(candidate.id)}
                >
                  Add Employee
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(candidate._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add New Candidate</h3>
            <form className="modal-form" onSubmit={handleSubmit}>
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={newCandidate.fullName}
                onChange={handleChange}
                required
              />
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={newCandidate.email}
                onChange={handleChange}
                required
              />
              <label>Phone Number</label>
              <input
                type="text"
                name="phone"
                value={newCandidate.phone}
                onChange={handleChange}
                required
              />
              <label>Department</label>
              <input
                type="text"
                name="department"
                value={newCandidate.department}
                onChange={handleChange}
                required
              />
              <label>Experience</label>
              <input
                type="text"
                name="experience"
                value={newCandidate.experience}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="cancel-button"
              >
                Cancel
              </button>
              <button type="submit" className="submit-button">
                Add Candidate
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Candidates;
