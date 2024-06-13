import { Router } from "express";
import { createUser, getUserList } from "../controllers/user.js";
const router = Router();

router.post("/", (req, res, next) => {
  createUser(req, res, next);
});

router.get("/", (req, res, next) => {
  getUserList(req, res, next);
});

export default router;
