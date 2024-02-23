// backend/routes/api/index.js
const router = require("express").Router();
const { setTokenCookie } = require("../../utils/auth.js");
const { User } = require("../../db/models");
const { restoreUser } = require("../../utils/auth.js");
const { requireAuth } = require("../../utils/auth.js");

router.get("/restore-user", (req, res) => {
  return res.json(req.user);
});
router.use(restoreUser);

router.get("/require-auth", requireAuth, (req, res) => {
  return res.json(req.user);
});
router.post("/test", function (req, res) {
  res.json({ requestBody: req.body });
});

router.get("/set-token-cookie", async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: "brianUser",
    },
  });
  setTokenCookie(res, user);
  return res.json({ user: user });
});

module.exports = router;
