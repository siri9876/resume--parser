const express = require("express")
const router = express.Router()

const {
  getCandidates,
  getCandidate,
  saveCandidate
} = require("../controllers/candidateController")

router.get("/", getCandidates)
router.get("/:id", getCandidate)
router.post("/", saveCandidate)

module.exports = router