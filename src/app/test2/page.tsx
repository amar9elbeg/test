"use client";

import { useEffect, useState } from "react";

type FormData = {
  name: string;
  email: string;
  password: string;
};

export default function TestTwo() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = (): boolean => {
    if (!form.name || !form.email || !form.password) {
      setError("All fields are required");
      return false;
    }

    if (!form.email.includes("@")) {
      setError("Invalid email");
      return false;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    // Simulated API
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  // Effect: reset form after success
  useEffect(() => {
    if (!success) return;

    const timeoutId = setTimeout(() => {
      setForm({ name: "", email: "", password: "" });
      setSuccess(false);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [success]);

  return (
    <div className="page-container">
      <div className="page-container">
        <h2>Signup Form</h2>

        <form className="form" onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>

        {error && (
          <p className="error" style={{ color: "red" }}>
            {error}
          </p>
        )}
        {success && <p className="success">Success! Form submitted.</p>}
      </div>
    </div>
  );
}
