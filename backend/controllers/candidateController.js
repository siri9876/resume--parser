const Candidate = require("../models/Candidate")

exports.getCandidates = async (req, res) => {
  const candidates = await Candidate.find()
  res.json(candidates)
}

exports.getCandidate = async (req, res) => {
  const candidate = await Candidate.findById(req.params.id)
  res.json(candidate)
}

exports.saveCandidate = async (req, res) => {
  const candidate = new Candidate(req.body)
  await candidate.save()
  res.json(candidate)
}