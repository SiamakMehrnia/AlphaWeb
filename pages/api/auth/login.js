import cookie from "cookie";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests are allowed" });
  }
  
  const { password } = req.body;
  
  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }
  
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  
  console.log("Password from Request:", password);
  
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Invalid password" });
  }
  
  const token = jwt.sign({ loggedIn: true }, process.env.JWT_SECRET, { expiresIn: "1h" });

  console.log("Token generated:", token);
  console.log("Setting cookie with token:", token);

  res.setHeader(
    "Set-Cookie",
        cookie.serialize("auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 60 * 60, // 1 ساعت
      path: "/",
    })
  );
 

  return res.status(200).json({ message: "Login successful" });
}