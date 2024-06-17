import { Router } from "express";
import {
  createExercise,
  createUser,
  getUserList,
  getUserExerciseList,
} from "../controllers/user.js";
const router = Router();

router.post("/", (req, res, next) => {
  createUser(req, res, next);
});

router.get("/", (req, res, next) => {
  getUserList(req, res, next);
});

router.post("/:id/exercises", (req, res, next) => {
  createExercise(req, res, next);
});

router.get("/:id/logs", (req, res, next) => {
  getUserExerciseList(req, res, next);
});

export default router;
