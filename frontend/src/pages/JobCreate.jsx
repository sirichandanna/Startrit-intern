import { useState } from "react";
import API from "../api/axiosConfig";

export default function JobCreate() {
  const [form, setForm] = useState({ title: "", description: "", salary: "", company: "" });

  const submit = async () => {
    await API.post("/api/jobs", { ...form, skills: ["React"] });
    alert("Job created");
  };

  return (
    <div>
      <h1>Create Job</h1>
      <input placeholder="title" onChange={e => setForm({ ...form, title: e.target.value })} />
      <input placeholder="company" onChange={e => setForm({ ...form, company: e.target.value })} />
      <button onClick={submit}>Submit</button>
    </div>
  );
}
