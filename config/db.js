import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import userModel from "../models/user.js";
import exerciseModel from "../models/excercise.js";

dotenv.config();
const isTest = process.env.NODE_ENV === "test";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: isTest ? "test.sqlite" : "db.sqlite",
  logging: !isTest,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = userModel(sequelize, Sequelize);
db.Exercise = exerciseModel(sequelize, Sequelize);

sequelize.sync();

export default db;
