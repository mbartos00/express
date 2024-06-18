import md5 from "md5";
import { Op } from "sequelize";
import db from "../config/db.js";
import {
  createExerciseSchema,
  createUserSchema,
  getExerciseListSchema,
} from "../schemas/schema.js";

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

export const createExercise = async (req, res, next) => {
  const params = {
    ...req.body,
    date: req.body.date,
    userId: req.params.id,
  };
  try {
    await createExerciseSchema.validate(params);

    const user = await db.User.findByPk(params.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const exercise = await db.Exercise.create(params);

    res.status(201).json({ data: exercise });
  } catch (err) {
    next(err.errors);
  }
};

export const getUserExerciseList = async (req, res, next) => {
  const params = {
    ...req.query,
    userId: req.params.id,
  };

  Object.keys(params).forEach((key) => !params[key] && delete params[key]);

  try {
    const user = await db.User.findByPk(params.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await getExerciseListSchema.validate(params);

    const query = {
      where: {
        [Op.and]: [
          { userId: params.userId },
          (params.from && { date: { [Op.gte]: params.from } }) || null,
          (params.to && { date: { [Op.lte]: params.to } }) || null,
        ],
      },
      limit: params.limit || 100,
      order: [["date", "ASC"]],
      attributes: ["id", "description", "duration", "date"],
    };

    const counterQuery = { ...query, limit: null };

    const counter = await db.Exercise.count(counterQuery);

    const exercises = await db.Exercise.findAll(query);

    res.status(200).json({ user, logs: exercises, count: counter });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
