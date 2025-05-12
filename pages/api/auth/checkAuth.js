import Cors from "cors";
import cookie from "cookie";
import jwt from "jsonwebtoken";

// Initializing the cors middleware
const cors = Cors({
  origin: ["http://localhost:3000", "https://alphaweb-bs3c.onrender.com"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
});

// Helper method to wait for a middleware to execute before continuing
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  const { auth } = cookie.parse(req.headers.cookie || "");

  if (!auth) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(auth, process.env.JWT_SECRET);
    return res.status(200).json({ message: "Authenticated", user: decoded });
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}