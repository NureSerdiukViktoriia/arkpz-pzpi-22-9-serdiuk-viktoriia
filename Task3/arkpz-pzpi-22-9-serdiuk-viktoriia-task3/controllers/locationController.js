const Location = require("../models/Location");

const createLocation = async (req, res) => {
  try {
    const { availability } = req.body;
    if (availability === "false") {
      throw new Error("Location must not be booked");
    }
    const newLocation = await Location.create(req.body);
    return res
      .status(201)
      .json({ message: "Location created!", location: newLocation });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.findAll({});
    if (locations && locations.length > 0) {
      return res.status(200).json(locations);
    }
    throw new Error("Locations do not exist");
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};
const updateLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { availability } = req.body;
    if (availability === "false") {
      throw new Error("Location must not be booked");
    }
    const [updated] = await Location.update(req.body, {
      where: { id: id },
    });
    if (updated) {
      const updatedLocation = await Location.findOne({ where: { id: id } });
      return res
        .status(200)
        .json({ message: "Location updated!", location: updatedLocation });
    }
    throw new Error("Location not found");
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};
const deleteLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Location.destroy({
      where: { id: id },
    });
    if (deleted) {
      return res.status(204).json();
    }
    throw new Error("Location not found");
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

module.exports = {
  createLocation,
  getAllLocations,
  updateLocation,
  deleteLocation,
};
