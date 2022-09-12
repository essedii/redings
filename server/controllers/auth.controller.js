const userService = require("../services/auth.service");

exports.authenticate = function (req, res, next) {
  userService
    .authenticate(req.body)
    .then((user) =>
      user
        ? res.json(user)
        : res.status(400).json({ message: "Username or password is incorrect" })
    )
    .catch((err) => next(err));
};

exports.create = function (req, res, next) {
  userService
    .create(req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
};

exports.getAll = function (req, res, next) {
  userService
    .getAll()
    .then((users) => res.json(users))
    .catch((err) => next(err));
};

exports.loginRequired = function (req, res, next) {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized user!!" });
  }
};

// TODO CURRENT
// exports.getCurrent = function (req, res, next) {
//   if (req.user) {
//     res.send(req.user);
//     next();
//   } else {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

exports.getById = function (req, res, next) {
  userService
    .getById(req.params.id)
    .then((user) => (user ? res.json(user) : res.sendStatus(404)))
    .catch((err) => next(err));
};

exports.update = function (req, res, next) {
  userService
    .update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
};

exports._delete = function (req, res, next) {
  userService
    ._delete(req.params.id)
    .then(() => res.json({}))
    .catch((err) => next(err));
};
