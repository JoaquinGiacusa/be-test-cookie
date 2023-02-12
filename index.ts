import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import cookie, { serialize } from "cookie";
const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  next();
});
app.use(cookieParser());
app.use(express.json());

app.get("/test", async (req, res) => {
  const token = "sadasdasdasdasdsaadsd";
  const serialized = serialize("token", token, {
    // httpOnly: true,
    path: "/",
    maxAge: 1000 * 60 * 60 * 24 * 7,
    // domain: "ec2-100-26-232-24.compute-1.amazonaws.com",
  });
  res.setHeader("Set-Cookie", serialized);

  return res.json({ message: "test" });
});

app.post("/post", async (req, res) => {
  console.log(req.cookies.token);
  return res.json("post");
});

app.listen(3000, () => {
  return console.log(`Server running on 3000`);
});
