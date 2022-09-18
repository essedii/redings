const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res, next) => {
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
      username: username
    });
    next();
  }
};

const getCurrent = async (req, res) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) res.sendStatus(401);

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); //invalid token

    res.status(200).json({
      username: decoded.username,
      isLogged: true
    })
  });
};
module.exports = { handleLogin, getCurrent };
