require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const candidateRoutes = require("./routes/candidateRoutes")
const jobRoutes = require("./routes/jobRoutes")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/candidates", candidateRoutes)
app.use("/api/jobs", jobRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err))

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})