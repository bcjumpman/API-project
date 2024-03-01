const express = require("express");
const router = express.Router();

const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");
const {
  Spot,
  SpotImage,
  Review,
  sequelize,
  Sequelize,
  User,
  ReviewImage,
} = require("../../db/models");
const { Op, ValidationError } = require("sequelize");

router.delete("/:imageId", requireAuth, async (req, res) => {
  const review = await ReviewImage.findOne({
    where: { id: req.params.imageId },
    include: {
      model: Review,
    },
  });

  if (!review) {
    return res.status(404).json({ message: "Review Image couldn't be found" });
  }

  if (review.Review.userId !== req.user.id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  await review.destroy();

  res.json({ message: "Successfully deleted" });
});

module.exports = router;
