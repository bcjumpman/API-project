const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

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
const { handleValidationErrors } = require("../../utils/validation");

validateReviews = [
  check("review")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Review text is required"),
  check("stars")
    .exists({ checkFalsy: true })
    .notEmpty()
    .isInt({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors,
];

//* Get all Reviews of the Current User
router.get("/current", requireAuth, async (req, res) => {
  const userId = req.user.id;
  const reviews = await Review.findAll({
    where: { userId },
    include: [
      { model: User, attributes: ["id", "firstName", "lastName"] },
      {
        model: Spot,
        attributes: [
          "id",
          "ownerId",
          "address",
          "city",
          "state",
          "country",
          "lat",
          "lng",
          "name",
          "price",
        ],
      },
      { model: ReviewImage, attributes: ["id", "url"] },
    ],
  });
  res.status(200).json({ Reviews: reviews });
});

//* Get all Reviews by a Spot's id
router.get("/:spotId/reviews", async (req, res) => {
  try {
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
      res.status(404).json({ message: "Spot couldn't be found" });
      return;
    }
    const reviews = await Review.findAll({ where: { spotId } });
    res.status(200).json({ Reviews: reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//* Add an Image to a Review based on the Review's id
router.post("/:reviewId/images", requireAuth, async (req, res) => {
  const { url } = req.body;
  const reviewId = req.params.id;
  const userId = req.user.id;

  console.log("REVIEW ID:", reviewId);
  const review = await Review.findByPk(reviewId);
  if (!review) {
    res.status(404).json({ message: "Review couldn't be found" });
    return;
  }
  console.log("review Id:", reviewId);

  if (review.userId !== userId) {
    res.status(403).json({ message: "Forbidden" });
    return;
  }

  const reviewImagesCount = await ReviewImage.count({ where: { reviewId } });
  if (reviewImagesCount >= 10) {
    res.status(403).json({
      message: "Maximum number of images for this resource was reached",
    });
    return;
  }
  const newImage = await ReviewImage.create({ reviewId, url });
  res.status(200).json(newImage);
});

//* Add an Image to a Review based on the Review's id
router.post("/:reviewId/images", requireAuth, async (req, res) => {
  const userId = req.user.id;
  const reviewId = req.params.reviewId;
  const { url } = req.body;

  console.log("REVIEW ID:", reviewId);

  const review = await Review.findByPk(reviewId, {
    include: ReviewImage,
  });
  console.log("REVIEW:", review);

  if (!review) {
    res.status(404);
    return res.json({
      message: "Review couldn't be found",
    });
  }

  if (userId !== review.userId) {
    res.status(403);
    return res.json({
      message: "Forbidden",
    });
  }

  if (review.ReviewImages.length >= 10) {
    res.status(403);
    return res.json({
      message: "Maximum number of images for this resource was reached",
    });
  }

  const newImage = await review.createReviewImage({ url });

  res.json({
    id: newImage.dataValues.id,
    url: newImage.dataValues.url,
  });
});

//* Edit a Review
router.put("/:reviewId", requireAuth, async (req, res) => {
  const reviewId = req.params.reviewId;
  // console.log("REVIEW ID:", req.params);
  const userId = req.user.id;
  const { review, stars } = req.body;

  let existingReview = await Review.findByPk(reviewId);

  if (!existingReview) {
    res.status(404).json({ message: "Review couldn't be found" });
    return;
  }

  if (existingReview.userId !== userId) {
    res.status(403).json({ message: "Forbidden" });
    return;
  }

  await existingReview.update({ review, stars });
  res.status(200).json(existingReview);
});

//* Delete a Review
router.delete("/:reviewId", requireAuth, async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const userId = req.user.id;

    let existingReview = await Review.findByPk(reviewId);
    if (!existingReview) {
      res.status(404).json({ message: "Review couldn't be found" });
      return;
    }

    if (existingReview.userId !== userId) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    await existingReview.destroy();
    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
