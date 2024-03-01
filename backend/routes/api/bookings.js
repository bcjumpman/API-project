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
  Booking,
} = require("../../db/models");
const { Op, ValidationError } = require("sequelize");

//* Get all of the Current User's Bookings
router.get("/current", requireAuth, async (req, res) => {
  const userId = req.user.id;
  const bookings = await Booking.findAll({
    where: {
      userId: userId,
    },
    include: {
      model: Spot,
      attributes: {
        exclude: ["description", "createdAt", "updatedAt"],
      },
    },
  });

  for (const booking of bookings) {
    const spot = booking.dataValues.Spot;
    const spotImg = await SpotImage.findOne({
      where: {
        spotId: spot.dataValues.id,
      },
    });
    spot.dataValues.previewImage = spotImg.dataValues.preview
      ? spotImg.dataValues.url
      : "Preview not available";
  }

  res.json({
    Bookings: bookings,
  });
});

//* Edit a Booking
router.put("/:bookingId", requireAuth, async (req, res) => {
  //find the booking to edit
  const booking = await Booking.findByPk(req.params.bookingId);
  //if booking can't be found, error
  if (!booking) {
    return res.status(404).json({ message: "Booking couldn't be found" });
  }
  const oldEnd = new Date(booking.endDate).getTime();

  //if booking doesn't belong to the request user, error
  if (booking.userId !== req.user.id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  //finds the incoming booking's end date
  const newEnd = new Date(req.body.endDate).getTime();
  const newStart = new Date(req.body.startDate).getTime();
  //generates current time
  const now = Date.now();

  //if past booking end date is prior to now === error
  if (oldEnd <= now || newEnd <= now || newStart <= now) {
    return res.status(403).json({ message: "Past bookings can't be modified" });
  }

  if (newEnd <= newStart) {
    return res
      .status(403)
      .json({ message: "endDate cannot be on or before startDate" });
  }

  const bookings = await Booking.findAll({
    where: {
      spotId: booking.spotId,
      id: {
        [Op.not]: req.params.bookingId,
      },
    },
    attributes: ["startDate", "endDate"],
  });

  const errors = {};

  bookings.forEach((booking) => {
    const bookingJSON = booking.toJSON();
    const existingStartDate = new Date(bookingJSON.startDate).getTime();
    const existingEndDate = new Date(bookingJSON.endDate).getTime();
    if (existingEndDate === newStart) {
      errors.startDate = "Start date conflicts with an existing booking";
    }
    if (existingStartDate <= newStart && newStart < existingEndDate) {
      errors.startDate = "Start date conflicts with an existing booking";
    }
    if (existingStartDate <= newEnd && newEnd <= existingEndDate) {
      errors.endDate = "End date conflicts with an existing booking";
    }
    if (newStart <= existingStartDate && newEnd >= existingEndDate) {
      errors.startDate = "Start date conflicts with an existing booking";
      errors.endDate = "End date conflicts with an existing booking";
    }
  });

  if (errors.startDate || errors.endDate) {
    res.status(403);
    const resObj = {};
    resObj.message =
      "Sorry, this spot is already booked for the specified dates";
    resObj.errors = errors;
    return res.json(resObj);
  }

  booking.startDate = req.body.startDate;
  booking.endDate = req.body.endDate;
  await booking.save();
  res.json(booking);
});

//* Delete a Booking
router.delete("/:bookingId", requireAuth, async (req, res) => {
  const { bookingId } = req.params;
  const userId = req.user.id;

  const booking = await Booking.findByPk(bookingId);

  if (!booking) {
    res.status(404);
    return res.json({
      message: "Booking couldn't be found",
    });
  }

  const spot = await Spot.findOne({
    where: {
      id: booking.spotId,
    },
  });

  if (userId !== booking.userId && userId !== spot.ownerId) {
    res.status(403);
    return res.json({
      message: "Forbidden",
    });
  }

  if (new Date(booking.startDate) <= Date.now()) {
    res.status(403);
    return res.json({
      message: "Bookings that have been started can't be deleted",
    });
  }

  await booking.destroy();

  res.json({
    message: "Successfully deleted",
  });
});

module.exports = router;
