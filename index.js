import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./routes/user.js";
import errorHandler from "./middlewares/errorHandler.js";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.all("*", (req, res) => {
  res.status(404).json({ error: "Not found. Check the URL and try again." });
});

app.use(errorHandler);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
