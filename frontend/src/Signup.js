import { useState } from "react";
import axios from "axios";

export default function Signup({ setPage }) {
  const [username, setU] = useState("");
  const [password, setP] = useState("");

  const submit = async () => {
    try {
      await axios.post("http://localhost:5000/signup", { username, password });
      alert("Signup successful");
      setPage("login");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <input placeholder="Username" onChange={e => setU(e.target.value)} /><br /><br />
      <input placeholder="Password" type="password" onChange={e => setP(e.target.value)} /><br /><br />
      <button onClick={submit}>Signup</button>
      <p onClick={() => setPage("login")} style={{ cursor: "pointer" }}>Already have an account? Login</p>
    </div>
  );
}
