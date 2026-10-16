require('dotenv').config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

mongoose
.connect(process.env.MONGODB_URI)
.then(() => console.log("database connected"))
.catch((err) => console.error("database error", err.message));

const User = mongoose.model(
    "User" ,
    new mongoose.Schema({
        fullname: {type: String, required: true},
        email: {type: String, required: true, unique: true, lowercase: true},
        password: {type: String, required: true},
    })
);
    app.post("/register", async (req, res) => {
        try {
            const { fullname, email, password } = req.body;

            if (!fullname || !email || !password) {
                return res.status(400).json({ message: "please fill in all fields" });
        }
        if (password.length <8) {
            return res.status(400).json({ message: "password must be at least 8 characters long" });
        }
        const exist = await User.findOne({ email: email.toLowerCase() });
        if (exist) {
            return res.status(400).json({ message: "this email already exists" });
        }
        const hashed = await bcrypt.hash(password, 10);
        await User.create({ fullname, email: email.toLowerCase(), password: hashed });
        res.status(201).json({ message: "user registered successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "server error.try again later" });
    }
});
    ///login checks the email and password and gives the app a token (proof that the user is logged in). /me returns the logged-in user’s info for your profile avatar. Restart the server afterwards.       
const jwt = require("jsonwebtoken");

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "please fill in all fields" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    const ok = user && (await bcrypt.compare(password, user.password));
    if (!ok) {
      return res.status(401).json({ message: "wrong email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: { fullname: user.fullname, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error. try again later" });
  }
});

function auth(req, res, next) {
  const token = (req.headers.authorization || "").replace("Bearer ", "");
  try {
    req.userId = jwt.verify(token, process.env.JWT_SECRET).id;
    next();
  } catch {
    res.status(401).json({ message: "please log in again" });
  }
}

app.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  res.json(user);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("server is running");
});