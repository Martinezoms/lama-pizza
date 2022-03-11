import cookie from "cookie";

// /api/login

const handler = async (res, req) => {
  const { method, body } = req;

  if (method === "POST") {
    const { username, password } = body;

    const { MY_USERNAME, MY_PASSWORD, TOKEN } = process.env;

    if (username === MY_USERNAME && password === MY_PASSWORD) {
      res.setHeader("Set-Cookie", cookie.serialize("token", TOKEN, { maxAge: 60 * 60, sameSite: "strict", path: "/" }));
      res.status(200).json("successful");
    } else {
      res.status(400).json("wrong credentials");
    }
  }
};

export default handler;
