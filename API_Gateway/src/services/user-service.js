const { StatusCodes } = require("http-status-codes");
const { UserRepository, RoleRepository } = require("../repositories");
const AppError = require("../utils/error/app-error");
const userRepository = new UserRepository();
const roleRepository = new RoleRepository();
const bcrypt = require("bcrypt");
const { checkPassword, createToken, verifyToken } = require("../utils/common/auth");
const { USER_ROLES_ENUMS } = require('../utils/common/enum');

async function createUser(data) {
  try {
    const user = await userRepository.create(data);
    const role = await roleRepository.getRoleByName(USER_ROLES_ENUMS.CUSTOMER);
    user.addRole(role);
    return user;
  } catch (error) {
    if (
      error.name == "SequelizeValidationError" ||
      error.name == "SequelizeUniqueConstraintError"
    ) {
      let explanations = [];
      error.errors.forEach((err) => {
        explanations.push(err.message);
      });
      throw new AppError(explanations, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      `Cannot create a new user object, ${error.message}`,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function signIn(data) {
  try {
    const user = await userRepository.getUserByEmail(data.email);
    if (!user) {
      throw new AppError("User not found !", StatusCodes.NOT_FOUND);
    }
    const passwordMatch = checkPassword(data.password, user.password);
    if (!passwordMatch) {
      throw new AppError("Invalid password!", StatusCodes.BAD_REQUEST);
    }

    const jwt = createToken({ id: user.id, email: user.email });

    return jwt;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      `Something went wrong - ${error.message}`,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function isAuthenticated(token) {
    try {
        if (!token) {
            throw new AppError("Missing token", StatusCodes.BAD_REQUEST);
        }
        const response = verifyToken(token);
        const user = await userRepository.get(response.id);
        if (!user) {
            throw new AppError("User not found", StatusCodes.NOT_FOUND);
        }
        return user.id;
    } catch (error) {
        if (error instanceof AppError) throw error;
        if (error.name == 'JsonWebTokenError') {
             throw new AppError("Invalid token", StatusCodes.BAD_REQUEST);
        }
        if (error.name == 'TokenExpiredError') {
             throw new AppError("Token expired", StatusCodes.BAD_REQUEST);
        }
       throw new AppError(
         `Something went wrong - ${error.message}`,
         StatusCodes.INTERNAL_SERVER_ERROR
       );
    }
}

async function addRoleToUser(data) {
  try {
    const user = await userRepository.get(data.id);
    if (!user) {
      throw new AppError("User not found !", StatusCodes.NOT_FOUND);
    }
    const role = await roleRepository.getRoleByName(data.role);
    if (!role) {
      throw new AppError("Role not found !", StatusCodes.NOT_FOUND);
    }
    user.addRole(role);
    return user;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      `Something went wrong - ${error.message}`,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function isAdmin(id) {
  try {
    const user = await userRepository.get(id);
    if (!user) {
      throw new AppError("User not found !", StatusCodes.NOT_FOUND);
    }
    const adminRole = await roleRepository.getRoleByName(USER_ROLES_ENUMS.ADMIN);
    if (!adminRole) {
      throw new AppError("Role not found !", StatusCodes.NOT_FOUND);
    }
    return user.hasRole(adminRole);
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      `Something went wrong - ${error.message}`,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createUser,
  signIn,
  isAuthenticated,
  addRoleToUser,
  isAdmin,
};
