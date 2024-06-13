import db from "../config/db.js";
import md5 from "md5";
import { createUserSchema } from "../schemas/schema.js";

export const createUser = async (req, res, next) => {
  try {
    if (!req.body.username) {
      throw { errors: ["username is required"] };
    }

    const params = {
      username: req.body.username,
      id: md5(req.body.username),
    };

    await createUserSchema.validate(params);

    const user = await db.User.create(params);

    res.status(201).json({ data: user });
  } catch (err) {
    console.error(err);
    next(err.errors);
  }
};

export const getUserList = async (req, res, next) => {
  try {
    const users = await db.User.findAll();

    res.status(200).json({ data: users });
  } catch (err) {
    console.error(err);
    next(err.errors);
  }
};
