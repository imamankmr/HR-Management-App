const express = require("express");
const { getCandidates, addCandidate, updateCandidate, deleteCandidate } = require("../controllers/candidatesController");

const router = express.Router();

// GET all candidates
router.get("/", getCandidates);

// POST a new candidate
router.post("/", addCandidate);

// PATCH to update candidate (e.g., mark as employee)
router.patch("/:candidateId", updateCandidate);

// DELETE a candidate
router.delete("/:candidateId", deleteCandidate);


module.exports = router;
