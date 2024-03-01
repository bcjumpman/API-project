const express = require("express");
const { requireAuth } = require("../../utils/auth");

const { Review, ReviewImage } = require("../../db/models");

const router = express.Router();

router.delete("/:imageId", requireAuth, async (req, res) => {
  const userId = req.user.id;
  const imageId = req.params.imageId;
  const reviewImage = await ReviewImage.findByPk(imageId);

  if (!reviewImage) {
    res.status(404);
    return res.json({
      message: "Review Image couldn't be found",
    });
  }

  const review = await Review.findByPk(reviewImage.reviewId);
  if (userId !== review.userId) {
    res.status(403);
    return res.json({
      message: "Forbidden",
    });
  }

  await reviewImage.destroy();

  res.json({
    message: "Successfully deleted",
  });
});

module.exports = router;
