const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.get("/", (req, res) => res.send("API Running"));

app.use(express.json({ extended: false }));
app.use(cors());

app.use("/api/users", require("./routes/api/user"));
app.use("/api/search", require("./routes/api/search"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.all("*", (req, res) =>
  res.status(404).json({
    status: 404,
    error: "Endpoint does not exist",
  })
);
