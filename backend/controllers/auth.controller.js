import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, gender } = req.body;
    // if (password !== confirmPassword) {
    //   return res.status(403).json({ error: "Passwords are not same." });
    // }

    // check username if it already exists
    const user = await User.findOne({ username });

    if (user) {
      return res.status(403).json({ error: "username already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    generateTokenAndSetCookie(newUser._id, res);
    await newUser.save();

    return res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      profilePic: newUser.profilePic,
    });
  } catch (err) {
    console.error("❌ERROR:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    console.log("comparision has done");

    if (!user || !isPasswordCorrect) {
      return res.status(403).json({ error: "Invalid username or password" });
    }

    generateTokenAndSetCookie(user._id, res);

    return res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (err) {
    console.error("❌ERROR:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("❌ERROR:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};