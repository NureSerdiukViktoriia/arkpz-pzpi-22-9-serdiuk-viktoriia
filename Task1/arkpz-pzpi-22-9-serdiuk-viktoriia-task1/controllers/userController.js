const User = require("../models/User");

const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    return res.status(201).json({ message: "User created!", user: newUser });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: { id: id },
    });
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).send("User with this ID does not exists");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await User.update(req.body, {
      where: { id: id },
    });
    if (updated) {
      const updatedUser = await User.findOne({ where: { id: id } });
      return res
        .status(200)
        .json({ message: "User updated!", user: updatedUser });
    }
    throw new Error("User not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.destroy({
      where: { id: id },
    });
    if (deleted) {
      return res.status(204).json();
    }
    throw new Error("User not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { createUser, getUserById, updateUser, deleteUser };
