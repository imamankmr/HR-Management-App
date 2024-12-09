const express = require("express");
const { getCandidates, addCandidate, updateCandidate, deleteCandidate } = require("../controllers/candidatesController");

const router = express.Router();

// GET all candidates
router.get("/", getCandidates);

router.post("/", addCandidate);


router.patch("/:candidateId", updateCandidate);


router.delete("/:candidateId", deleteCandidate);


module.exports = router;
