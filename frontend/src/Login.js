import { useState } from "react";
import axios from "axios";

export default function Login({ setPage }) {
  const [username, setU] = useState("");
  const [password, setP] = useState("");

  const submit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", { username, password });
      sessionStorage.setItem("token", res.data.token);
      setPage("dashboard");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Username" onChange={e => setU(e.target.value)} /><br /><br />
      <input placeholder="Password" type="password" onChange={e => setP(e.target.value)} /><br /><br />
      <button onClick={submit}>Login</button>
      <p onClick={() => setPage("signup")} style={{ cursor: "pointer" }}>Create account</p>
    </div>
  );
}
