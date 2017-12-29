//check if user has sufficient credits before deducting credits when creating a new survey.
module.exports = (req, res, next) => {
  if (req.user.credits < 1) {
    return res.status(403).send({ error: "You dont have sufficient credits!" });
  }
  next();
};
