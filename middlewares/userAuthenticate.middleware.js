const jwt = require("jsonwebtoken");

const userAuthenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "mock13", function (err, decoded) {
      if (err) throw err;
      if (decoded) {
        req.body.userId = decoded.userId;
        next();
      } else {
        res.send({ msg: "please login first" });
      }
    });
  } else {
    res.send({ msg: "please login first" });
  }
};
module.exports = userAuthenticate;
