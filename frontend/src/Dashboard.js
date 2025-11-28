import axios from "axios";
import { useState, useEffect } from "react";

export default function Dashboard({ setPage }) {
  const userId = sessionStorage.getItem("token");
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const load = async () => {
    const res = await axios.get(`http://localhost:5000/tasks/${userId}`);
    setTasks(res.data);
  };

  const add = async () => {
    await axios.post("http://localhost:5000/tasks", { userid: userId, title, status: "pending" });
    load();
  };

  const update = async (id, status) => {
    await axios.put(`http://localhost:5000/tasks/${id}`, { status });
    load();
  };

  const remove = async id => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    load();
  };

  const logout = () => {
    sessionStorage.clear();
    setPage("login");
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <h2>My Dashboard</h2>
      <input placeholder="Task Title" onChange={e => setTitle(e.target.value)} />
      <button onClick={add}>Add Task</button>
      <br /><br />
      {tasks.map(t => (
        <div key={t.id} style={{ margin: "8px" }}>
          <b>{t.title}</b> — {t.status}
          <button onClick={() => update(t.id, "completed")}>Complete</button>
          <button onClick={() => remove(t.id)}>Delete</button>
        </div>
      ))}
      <br />
      <button onClick={logout}>Logout</button>
    </div>
  );
}
