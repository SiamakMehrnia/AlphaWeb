import cookie from "cookie";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Only GET requests are allowed" });
  }

  const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};

  if (cookies.auth === "true") {
    return res.status(200).json({ authenticated: true });
  } else {
    return res.status(401).json({ authenticated: false });
  }
}