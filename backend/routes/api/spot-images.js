const express = require("express");
const { requireAuth } = require("../../utils/auth");

const { Spot, SpotImage } = require("../../db/models");

const router = express.Router();
//* Delete image by ID
router.delete("/:imageId", requireAuth, async (req, res) => {
  const userId = req.user.id;
  const imageId = req.params.imageId;
  const spotImage = await SpotImage.findByPk(imageId);

  if (!spotImage) {
    res.status(404);
    return res.json({
      message: "Spot Image couldn't be found",
    });
  }

  const spot = await Spot.findByPk(spotImage.spotId);
  if (userId !== spot.ownerId) {
    res.status(403);
    return res.json({
      message: "Forbidden",
    });
  }

  await spotImage.destroy();

  res.json({
    message: "Successfully deleted",
  });
});

module.exports = router;
