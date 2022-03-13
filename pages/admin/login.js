import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import classes from "../../styles/Login.module.css";

const Login = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleSignin = async () => {
    try {
      setError(false);
      await axios.post("/api/login", { ...user });

      router.push("/admin");
    } catch (err) {
      setError(true);
      console.log(err);
      console.error("User unauthorized");
    }
  };

  return (
    <section className={classes.container}>
      <div className={classes.wrapper}>
        <h1>Admin Dashboard</h1>
        <input
          placeholder="username"
          className={classes.input}
          onChange={(e) => setUser((prev) => ({ ...prev, username: e.target.value }))}
        />
        <input
          placeholder="password"
          type="password"
          className={classes.input}
          onChange={(e) => setUser((prev) => ({ ...prev, password: e.target.value }))}
        />
        <button className={classes.button} onClick={handleSignin}>
          Sign in
        </button>
        {error && <span className={classes.error}>Wrong Credentials!</span>}
      </div>
    </section>
  );
};

export default Login;
