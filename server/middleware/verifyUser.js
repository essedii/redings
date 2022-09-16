const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) res.sendStatus(401);

  const token = authHeader.split(" ")[1];

  console.log(token);
  jwt.verify(token, process.env.TOKEN_SECRET, (err) => {
    if (err) return res.sendStatus(403); //invalid token

    next();
  });
};

