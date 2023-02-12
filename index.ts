import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import cookie, { serialize } from "cookie";
const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.get("/test", async (req, res) => {
  const token = "sadasdasdasdasdsaadsd";
  const serialized = serialize("token", token, {
    // httpOnly: true,
    path: "/",
    maxAge: 1000 * 60 * 60 * 24 * 7,
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
