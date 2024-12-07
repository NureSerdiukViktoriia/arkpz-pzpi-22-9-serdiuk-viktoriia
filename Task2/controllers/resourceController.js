const Resource = require("../models/Resource");

const createResource = async (req, res) => {
  try {
    const newResource = await Resource.create(req.body);
    return res
      .status(201)
      .json({ message: "Resource created!", resource: newResource });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getAllResources = async (req, res) => {
  try {
    const resources = await Resource.findAll({});
    if (resources && resources.length > 0) {
      return res.status(200).json(resources);
    } else {
      return res.status(404).send("Resources do not exist");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const updateResource = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Resource.update(req.body, {
      where: { id: id },
    });
    if (updated) {
      const updatedResource = await Resource.findOne({ where: { id: id } });
      return res
        .status(200)
        .json({ message: "Resource updated!", resource: updatedResource });
    }
    throw new Error("Resource not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const deleteResource = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Resource.destroy({
      where: { id: id },
    });
    if (deleted) {
      return res.status(204).json();
    }
    throw new Error("Resource not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  createResource,
  getAllResources,
  updateResource,
  deleteResource,
};
