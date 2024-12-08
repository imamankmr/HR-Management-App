

const fs = require("fs");
const path = require("path");
const Candidates = require("../models/Candidates");
const { default: mongoose } = require("mongoose");

// Fetch all candidates
const getCandidates = async (req, res) => {
  try {
    const candidates = await Candidates.find();
    res.json(candidates);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// Add a new candidate
const addCandidate = async (req, res) => {
  try {
    const { fullName, email, phone, department, experience } = req.body;

    if (!fullName || !email || !phone || !department || !experience) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newCandidate = new Candidates({
      fullName,
      email,
      phone,
      department,
      experience,
    });

    await newCandidate.save();
    res.status(201).json(newCandidate);
  } catch (error) {
    console.error("Error adding candidate:", error);
    res.status(500).json({ message: "Error adding candidate." });
  }
};


// Update candidate (e.g., mark as employee)
const updateCandidate = async (req, res) => {
  const { candidateId } = req.params;
  try {
    const candidate = await Candidates.findById(candidateId);

    if (!candidate) {
      return res.status(404).json({ msg: "Candidate not found" });
    }

    candidate.isEmployee = true; // Update the status to employee
    await candidate.save();
    res.json(candidate);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// Delete a candidate
const deleteCandidate = async (req, res) => {
  const { candidateId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(candidateId)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  const deletedCandidate = await Candidates.findByIdAndDelete(candidateId);
  if (!deletedCandidate) {
    return res.status(404).json({ message: "Candidate not found" });
  }

  res.status(200).json({ message: "Deleted successfully" });
};

module.exports = { getCandidates, addCandidate, updateCandidate, deleteCandidate };
