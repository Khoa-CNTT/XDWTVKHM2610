const userService = require("../services/userService");


const getUserById = async (req, res) => {
  const result = await userService.getUserById(req.params.id);
  return res.status(result.code).json(result);
};

const createUser = async (req, res) => {
  const result = await userService.createUser(req.body);
  return res.status(result.code).json(result);
};

const updateUser = async (req, res) => {
  const result = await userService.updateUser(req.params.id, req.body);
  return res.status(result.code).json(result);
};



module.exports = {
  getUserById,
  createUser,
  updateUser,

};
