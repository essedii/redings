const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  const foundUser = await User.findOne({ username: username }).exec();
  if (!foundUser) return res.sendStatus(401); //Unauthorized
  // evaluate password
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    // create JWTs
    const token = jwt.sign(
      { username: foundUser.username },
      process.env.TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      token: token,
    });
    next(err);
  }
};
module.exports = { handleLogin };
