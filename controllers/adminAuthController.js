import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

// Register Admin
export const register = async (req, res) => {
  const { name, staffId, email, password } = req.body;

  try {
    const exists = await Admin.findOne({ staffId });
    if (exists) return res.status(400).json({ message: "Staff ID already exists" });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const admin = new Admin({
      name,
      staffId,
      email,
      passwordHash,
    });

    await admin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Login Admin
export const login = async (req, res) => {
  const { staffId, password } = req.body;

  try {
    const admin = await Admin.findOne({ staffId });
    if (!admin) return res.status(404).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      {
        id: admin._id,
        role: "admin",
        staffId: admin.staffId,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        staffId: admin.staffId,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};