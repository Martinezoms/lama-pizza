import cookie from "cookie";

// /api/login

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { username, password } = req.body;

    const { MY_USERNAME, MY_PASSWORD, TOKEN } = process.env;

    if (username === MY_USERNAME && password === MY_PASSWORD) {
      await res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", TOKEN, { maxAge: 60 * 60, sameSite: "strict", path: "/" })
      );

      res.status(200).json({ message: "Authorized" });
    } else {
      res.status(405).json({ message: "Unauthorized" });
    }
  }
};

export default handler;
