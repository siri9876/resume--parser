const mongoose = require("mongoose")

const candidateSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  company: String,
  education: String,
  experience: Number,
  skills: [String],
  resumeFile: String,
  createdAt: String
})

module.exports = mongoose.model("Candidate", candidateSchema)