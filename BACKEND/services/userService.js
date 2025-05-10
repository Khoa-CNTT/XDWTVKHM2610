const bcrypt = require("bcrypt");
const User = require("../models/User");
const { STATUS_CODE } = require("../Helper/enums");

const formatAvatarUrl = (req, avatarUrl) => {
  if (!avatarUrl) return null;
  const baseUrl = `${req.protocol}://${req.get("host")}`;
  return avatarUrl.startsWith("http") ? avatarUrl : `${baseUrl}${avatarUrl}`;
};

const formatUser = (req, user) => ({
  ...user,
  avatarUrl: formatAvatarUrl(req, user.avatarUrl),
});

const formatUsers = (req, users) => users.map((user) => formatUser(req, user));

const getAllUsers = async (req) => {
  try {
    const users = await User.find().select("-password").lean();
    return {
      code: STATUS_CODE.SUCCESS,
      success: true,
      data: formatUsers(req, users),
    };
  } catch (error) {
    return { code: STATUS_CODE.ERROR, success: false, message: error.message };
  }
};

const getUserById = async (req, id) => {
  try {
    const user = await User.findById(id).select("-password").lean();
    if (!user) {
      return {
        code: STATUS_CODE.BAD_REQUEST,
        success: false,
        message: "User not found",
      };
    }
    return {
      code: STATUS_CODE.SUCCESS,
      success: true,
      data: formatUser(req, user),
    };
  } catch (error) {
    return { code: STATUS_CODE.ERROR, success: false, message: error.message };
  }
};

const createUser = async (userData) => {
  try {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      return {
        success: false,
        code: STATUS_CODE.BAD_REQUEST,
        message: "Email already exists",
      };
    }

    const saltRounds = 10;
    userData.password = await bcrypt.hash(userData.password, saltRounds);

    const user = await User.create(userData);

    return {
      code: STATUS_CODE.SUCCESS,
      success: true,
      data: user,
    };
  } catch (error) {
    return {
      success: false,
      code: STATUS_CODE.ERROR,
      message: error.message,
    };
  }
};

const updateUser = async (req, id, userData) => {
  try {
    if (userData.password) {
      const saltRounds = 10;
      userData.password = await bcrypt.hash(userData.password, saltRounds);
    }

    if (req.file) {
      userData.avatarUrl = `/img/${req.file.filename}`;
    }
    console.log(req.file);
    const user = await User.findByIdAndUpdate(id, userData, { new: true })
      .select("-password")
      .lean();

    if (!user) {
      return {
        code: STATUS_CODE.BAD_REQUEST,
        success: false,
        message: "User not found",
      };
    }

    return {
      code: STATUS_CODE.SUCCESS,
      success: true,
      data: formatUser(req, user),
    };
  } catch (error) {
    return { code: STATUS_CODE.ERROR, success: false, message: error.message };
  }
};

const deleteUser = async (id) => {
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return {
        code: STATUS_CODE.BAD_REQUEST,
        success: false,
        message: "User not found",
      };
    }
    return {
      code: STATUS_CODE.SUCCESS,
      success: true,
      data: user,
    };
  } catch (error) {
    return { code: STATUS_CODE.ERROR, success: false, message: error.message };
  }
};

const searchUser = async (req, searchData) => {
  try {
    const query = {};

    if (searchData.role) {
      query.role = searchData.role;
    }

    if (searchData.searchParam) {
      query.$or = [
        { fullName: { $regex: searchData.searchParam, $options: "i" } },
        { email: { $regex: searchData.searchParam, $options: "i" } },
      ];
    }

    const sortOrder = searchData.sort === "DESC" ? -1 : 1;
    const users = await User.find(query)
      .select("-password")
      .sort({ fullName: sortOrder })
      .lean();

    return {
      code: STATUS_CODE.SUCCESS,
      success: true,
      message: "Users retrieved successfully",
      data: formatUsers(req, users),
    };
  } catch (error) {
    return {
      code: STATUS_CODE.ERROR,
      success: false,
      message: error.message,
      data: null,
    };
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  searchUser,
};
