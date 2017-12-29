// check if user is logged in before displaying survey dashboard./ accepting payment / creating a survey
module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: "You must log in!" });
  }
  next();
};
