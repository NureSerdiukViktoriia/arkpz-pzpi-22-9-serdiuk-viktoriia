const Booking = require("../models/Booking");
const Location = require("../models/Location");

const createBooking = async (req, res) => {
  try {
    const { start_date, end_date, location_id } = req.body;
    if (new Date(end_date) < new Date(start_date)) {
      return res
        .status(400)
        .json({ message: "End date cannot be earlier than start date." });
    }
    const location = await Location.findOne({ where: { id: location_id } });
    if (!location || !location.availability) {
      return res
        .status(400)
        .json({ message: "Location is not available for booking." });
    }
    const start = new Date(start_date);
    const end = new Date(end_date);
    const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const totalPrice = duration * location.price;

    const newBooking = await Booking.create({
      ...req.body,
      total_price: totalPrice,
    });

    await Location.update(
      { availability: false },
      { where: { id: location_id } }
    );
    return res
      .status(201)
      .json({ message: "Booking created!", booking: newBooking });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({});
    return res.status(200).json(bookings);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};
const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { start_date, end_date, location_id } = req.body;
    if (new Date(end_date) < new Date(start_date)) {
      return res
        .status(400)
        .json({ message: "End date cannot be earlier than start date." });
    }
    const location = await Location.findOne({ where: { id: location_id } });
    if (!location || !location.availability) {
      return res
        .status(400)
        .json({ message: "Location is not available for booking." });
    }
    const [updated] = await Booking.update(req.body, { where: { id: id } });
    if (updated) {
      const updatedBooking = await Booking.findOne({ where: { id: id } });
      return res
        .status(200)
        .json({ message: "Booking updated!", booking: updatedBooking });
    }
    throw new Error("Booking not found");
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};
const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Booking.destroy({
      where: { id: id },
    });
    if (deleted) {
      return res.status(204).json();
    }
    throw new Error("Booking not found");
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  updateBooking,
  deleteBooking,
};
