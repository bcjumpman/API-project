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

//* Get current users bookings
router.get("/current", requireAuth, async (req, res) => {
  const user = req.user.id;
  if (!user) {
    return res
      .status(403)
      .json({ message: "Please sign in first in order to return bookings." });
  }
  const bookings = await Booking.findAll({
    where: {
      userId: user,
    },
    include: {
      model: Spot,
      attributes: {
        exclude: ["description", "createdAt", "updatedAt"],
      },
    },
  });
  let bookingsArr = [];
  for (let booking of bookings) {
    let bookingObj = booking.toJSON();
    bookingsArr.push(bookingObj);
  }
  for (let i = 0; i < bookingsArr.length; i++) {
    let spotId = bookingsArr[i]["Spot"]["id"];
    const previewImage = await SpotImage.findOne({
      where: {
        spotId: spotId,
        preview: true,
      },
      attributes: ["url"],
    });
    if (!previewImage)
      bookingsArr[i]["Spot"]["id"].previewImage = "no preview image set";
    if (previewImage) {
      let image = previewImage.toJSON();
      let spot = bookingsArr[i]["Spot"];
      spot.previewImage = image.url;
      bookingsArr[i].Spot = spot;
    }
  }
  return res.json({ Bookings: bookingsArr });
});

//* Edit existing booking
router.put("/:bookingId", requireAuth, async (req, res) => {
  const userId = req.user.id;
  const { startDate, endDate } = req.body;
  const bookingId = req.params.bookingId;

  const booking = await Booking.findByPk(bookingId);

  if (!booking) {
    res.status(404);
    return res.json({
      message: "Booking couldn't be found",
    });
  }

  if (userId !== booking.userId) {
    res.status(403);
    return res.json({
      message: "Forbidden",
    });
  }

  if (new Date(endDate) < Date.now()) {
    res.status(403);
    return res.json({
      message: "Past bookings can't be modified",
    });
  }

  if (new Date(startDate) < Date.now()) {
    res.status(400);
    return res.json({
      message: "Bad Request",
      errors: {
        startDate: "startDate cannot be in the past",
      },
    });
  }

  if (new Date(startDate) >= new Date(endDate)) {
    res.status(400);
    return res.json({
      message: "Bad Request",
      errors: {
        startDate: "endDate cannot be on or before startDate",
      },
    });
  }

  const conflictBooking = await Booking.findOne({
    where: {
      id: { [Op.ne]: booking.id },
      spotId: booking.spotId,
      [Op.and]: [
        { startDate: { [Op.lte]: new Date(endDate) } },
        { endDate: { [Op.gte]: new Date(startDate) } },
      ],
    },
  });

  if (conflictBooking) {
    res.status(403);
    return res.json({
      message: "Sorry, this spot is already booked for the specified dates",
      errors: {
        startDate: "Start date conflicts with an existing booking",
        endDate: "End date conflicts with an existing Booking",
      },
    });
  }

  booking.startDate = startDate || booking.startDate;
  booking.endDate = endDate || booking.endDate;

  await booking.save();
  res.json(booking);
});

//* delete an existing booking
router.delete("/:bookingId", requireAuth, async (req, res) => {
  const booking = await Booking.findByPk(req.params.bookingId);

  if (!booking) {
    return res.status(404).json({ message: "Booking couldn't be found" });
  }

  const spot = await Spot.findByPk(booking.spotId);

  if (booking.userId !== req.user.id && spot.ownerId !== req.user.id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const now = new Date().getTime();

  const startDate = new Date(booking.startDate).getTime();

  if (startDate < now) {
    return res
      .status(403)
      .json({ message: "Bookings that have been started can't be deleted" });
  }

  await booking.destroy();

  res.json({ message: "Successfully deleted" });
});

module.exports = router;
