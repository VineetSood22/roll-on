import { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";
import Dashboard from "./Dashboard";

export default function App() {
  const [page, setPage] = useState(sessionStorage.getItem("token") ? "dashboard" : "login");

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Todo Application</h1>
      {page === "login" && <Login setPage={setPage} />}
      {page === "signup" && <Signup setPage={setPage} />}
      {page === "dashboard" && <Dashboard setPage={setPage} />}
    </div>
  );
}
